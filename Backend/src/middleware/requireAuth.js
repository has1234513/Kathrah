import passport from '../services/passport.js';

/**
 * Protect a route — requires a valid JWT (cookie or Bearer).
 * Attaches `req.user` on success.
 */
export function requireAuth(req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: info?.message ?? 'Authentication required',
      });
    }
    req.user = user;
    next();
  })(req, res, next);
}

/**
 * Require the authenticated user to have a specific role.
 * Must be used after requireAuth.
 *
 * @param {...string} roles
 */
export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Forbidden',
        message: `Requires role: ${roles.join(' or ')}`,
      });
    }
    next();
  };
}
