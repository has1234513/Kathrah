import jwt from 'jsonwebtoken';

const {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES_IN = '15m',
  JWT_REFRESH_EXPIRES_IN = '7d',
  NODE_ENV = 'development',
} = process.env;

if (!JWT_ACCESS_SECRET || !JWT_REFRESH_SECRET) {
  throw new Error('JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must be set');
}

// ─── Signing ──────────────────────────────────────────────────────────────────

export function signAccessToken(payload) {
  return jwt.sign(payload, JWT_ACCESS_SECRET, {
    expiresIn: JWT_ACCESS_EXPIRES_IN,
  });
}

export function signRefreshToken(payload) {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
  });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, JWT_ACCESS_SECRET);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, JWT_REFRESH_SECRET);
}

// ─── Cookie helpers ───────────────────────────────────────────────────────────

const REFRESH_COOKIE = 'refresh_token';
const ACCESS_COOKIE = 'access_token';

/** Milliseconds for Set-Cookie max-age */
function parseDurationMs(str) {
  const unit = str.slice(-1);
  const value = parseInt(str, 10);
  const map = { s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 };
  return value * (map[unit] ?? 1000);
}

const cookieBase = {
  httpOnly: true,
  secure: NODE_ENV === 'production',
  sameSite: NODE_ENV === 'production' ? 'strict' : 'lax',
  path: '/',
};

export function setRefreshCookie(res, token) {
  res.cookie(REFRESH_COOKIE, token, {
    ...cookieBase,
    maxAge: parseDurationMs(JWT_REFRESH_EXPIRES_IN),
    path: '/api/auth', // scope to auth routes only
  });
}

export function setAccessCookie(res, token) {
  res.cookie(ACCESS_COOKIE, token, {
    ...cookieBase,
    maxAge: parseDurationMs(JWT_ACCESS_EXPIRES_IN),
  });
}

export function clearAuthCookies(res) {
  res.clearCookie(REFRESH_COOKIE, { path: '/api/auth' });
  res.clearCookie(ACCESS_COOKIE, { path: '/' });
}

export function issueTokens(res, user) {
  const payload = { sub: user.id, email: user.email, role: user.role };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken({ sub: user.id });

  setAccessCookie(res, accessToken);
  setRefreshCookie(res, refreshToken);

  return { accessToken, refreshToken };
}
