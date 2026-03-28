import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const {
  JWT_ACCESS_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  OAUTH_CALLBACK_BASE_URL = 'http://localhost:4000',
} = process.env;

// ─── Cookie extractor (prefers httpOnly cookie, falls back to Bearer) ─────────

function cookieOrBearerExtractor(req) {
  const fromCookie = req?.cookies?.access_token ?? null;
  if (fromCookie) return fromCookie;
  return ExtractJwt.fromAuthHeaderAsBearerToken()(req);
}

// ─── Local ────────────────────────────────────────────────────────────────────

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user || !user.passwordHash) {
        return done(null, false, { message: 'Invalid credentials' });
      }
      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) {
        return done(null, false, { message: 'Invalid credentials' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

// ─── JWT ──────────────────────────────────────────────────────────────────────

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieOrBearerExtractor,
      secretOrKey: JWT_ACCESS_SECRET,
      passReqToCallback: false,
    },
    async (payload, done) => {
      try {
        const user = await prisma.user.findUnique({ where: { id: payload.sub } });
        if (!user) return done(null, false);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

// ─── OAuth helper: upsert user + account ──────────────────────────────────────

async function upsertOAuthUser({ provider, providerAccountId, email, name, avatarUrl, tokens }) {
  // 1. Try to find existing account
  const existing = await prisma.account.findUnique({
    where: { provider_providerAccountId: { provider, providerAccountId } },
    include: { user: true },
  });
  if (existing) {
    // Update OAuth tokens
    await prisma.account.update({
      where: { id: existing.id },
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresAt: tokens.expiresAt,
      },
    });
    return existing.user;
  }

  // 2. Link to existing user by email, or create new user
  const user = await prisma.$transaction(async (tx) => {
    let u = email ? await tx.user.findUnique({ where: { email } }) : null;
    if (!u) {
      u = await tx.user.create({
        data: { email, name, avatarUrl, emailVerified: true },
      });
    }
    await tx.account.create({
      data: {
        userId: u.id,
        provider,
        providerAccountId,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresAt: tokens.expiresAt,
      },
    });
    return u;
  });

  return user;
}

// ─── Google ───────────────────────────────────────────────────────────────────

if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: `${OAUTH_CALLBACK_BASE_URL}/api/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value ?? null;
          const avatarUrl = profile.photos?.[0]?.value ?? null;
          const user = await upsertOAuthUser({
            provider: 'GOOGLE',
            providerAccountId: profile.id,
            email,
            name: profile.displayName,
            avatarUrl,
            tokens: { accessToken, refreshToken, expiresAt: null },
          });
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      },
    ),
  );
}

// ─── GitHub ───────────────────────────────────────────────────────────────────

if (GITHUB_CLIENT_ID && GITHUB_CLIENT_SECRET) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: `${OAUTH_CALLBACK_BASE_URL}/api/auth/github/callback`,
        scope: ['user:email'],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email =
            profile.emails?.find((e) => e.primary)?.value ??
            profile.emails?.[0]?.value ??
            null;
          const avatarUrl = profile.photos?.[0]?.value ?? null;
          const user = await upsertOAuthUser({
            provider: 'GITHUB',
            providerAccountId: String(profile.id),
            email,
            name: profile.displayName || profile.username,
            avatarUrl,
            tokens: { accessToken, refreshToken: refreshToken ?? null, expiresAt: null },
          });
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      },
    ),
  );
}

export default passport;
