import { Router } from 'express';
import passport from '../services/passport.js';
import { validate } from '../middleware/validate.js';
import { registerSchema, loginSchema } from '../middleware/schemas.js';
import { requireAuth } from '../middleware/requireAuth.js';
import {
  register,
  login,
  refresh,
  logout,
  me,
  oauthCallback,
} from '../controllers/auth.js';

const router = Router();

// ─── Local auth ───────────────────────────────────────────────────────────────

/** POST /api/auth/register */
router.post('/register', validate(registerSchema), register);

/** POST /api/auth/login */
router.post('/login', validate(loginSchema), login);

/** POST /api/auth/refresh */
router.post('/refresh', refresh);

/** POST /api/auth/logout */
router.post('/logout', logout);

/** GET /api/auth/me */
router.get('/me', requireAuth, me);

// ─── Google OAuth ─────────────────────────────────────────────────────────────

/** GET /api/auth/google */
router.get(
  '/google',
  passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email'],
  }),
);

/** GET /api/auth/google/callback */
router.get('/google/callback', oauthCallback('google'));

// ─── GitHub OAuth ─────────────────────────────────────────────────────────────

/** GET /api/auth/github */
router.get(
  '/github',
  passport.authenticate('github', {
    session: false,
    scope: ['user:email'],
  }),
);

/** GET /api/auth/github/callback */
router.get('/github/callback', oauthCallback('github'));

export default router;
