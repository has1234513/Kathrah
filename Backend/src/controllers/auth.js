import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import passport from '../services/passport.js';
import {
  issueTokens,
  verifyRefreshToken,
  clearAuthCookies,
} from '../services/tokens.js';

const prisma = new PrismaClient();

// ─── Helpers ──────────────────────────────────────────────────────────────────

function safeUser(user) {
  const { passwordHash, ...safe } = user;
  return safe;
}

// ─── Register ─────────────────────────────────────────────────────────────────

export async function register(req, res, next) {
  try {
    const { email, password, name } = req.body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: 'Conflict', message: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.$transaction(async (tx) => {
      const u = await tx.user.create({ data: { email, passwordHash, name } });
      await tx.account.create({
        data: {
          userId: u.id,
          provider: 'LOCAL',
          providerAccountId: u.id,
        },
      });
      return u;
    });

    const { accessToken } = issueTokens(res, user);

    return res.status(201).json({
      user: safeUser(user),
      accessToken,
    });
  } catch (err) {
    next(err);
  }
}

// ─── Login (local) ────────────────────────────────────────────────────────────

export function login(req, res, next) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized', message: info?.message ?? 'Invalid credentials' });
    }

    const { accessToken } = issueTokens(res, user);

    return res.json({
      user: safeUser(user),
      accessToken,
    });
  })(req, res, next);
}

// ─── Refresh ──────────────────────────────────────────────────────────────────

export async function refresh(req, res, next) {
  try {
    const token = req.cookies?.refresh_token;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized', message: 'No refresh token' });
    }

    let payload;
    try {
      payload = verifyRefreshToken(token);
    } catch {
      return res.status(401).json({ error: 'Unauthorized', message: 'Invalid or expired refresh token' });
    }

    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized', message: 'User not found' });
    }

    const { accessToken } = issueTokens(res, user);

    return res.json({ accessToken });
  } catch (err) {
    next(err);
  }
}

// ─── Logout ───────────────────────────────────────────────────────────────────

export function logout(req, res) {
  clearAuthCookies(res);
  return res.json({ message: 'Logged out successfully' });
}

// ─── Me ───────────────────────────────────────────────────────────────────────

export async function me(req, res, next) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        accounts: {
          select: { provider: true, createdAt: true },
        },
      },
    });
    if (!user) return res.status(404).json({ error: 'Not found' });

    const { passwordHash, ...safe } = user;
    return res.json({ user: safe });
  } catch (err) {
    next(err);
  }
}

// ─── OAuth callback (Google / GitHub) ────────────────────────────────────────

export function oauthCallback(provider) {
  return (req, res, next) => {
    passport.authenticate(provider, { session: false }, (err, user) => {
      if (err || !user) {
        const message = err?.message ?? 'OAuth authentication failed';
        const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';
        return res.redirect(`${frontendUrl}/auth/error?message=${encodeURIComponent(message)}`);
      }

      issueTokens(res, user);

      const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';
      return res.redirect(`${frontendUrl}/auth/callback`);
    })(req, res, next);
  };
}
