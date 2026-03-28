import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth, requireRole } from '../middleware/requireAuth.js';
import { validate } from '../middleware/validate.js';
import { updateUserSchema } from '../middleware/schemas.js';

const router = Router();
const prisma = new PrismaClient();

function safeUser(user) {
  const { passwordHash, ...safe } = user;
  return safe;
}

// All routes below require authentication
router.use(requireAuth);

// ─── GET /api/users/me ────────────────────────────────────────────────────────

router.get('/me', async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { accounts: { select: { provider: true, createdAt: true } } },
    });
    res.json({ user: safeUser(user) });
  } catch (err) {
    next(err);
  }
});

// ─── PATCH /api/users/me ──────────────────────────────────────────────────────

router.patch('/me', validate(updateUserSchema), async (req, res, next) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: req.body,
    });
    res.json({ user: safeUser(user) });
  } catch (err) {
    next(err);
  }
});

// ─── DELETE /api/users/me ─────────────────────────────────────────────────────

router.delete('/me', async (req, res, next) => {
  try {
    await prisma.user.delete({ where: { id: req.user.id } });
    res.clearCookie('access_token');
    res.clearCookie('refresh_token', { path: '/api/auth' });
    res.json({ message: 'Account deleted' });
  } catch (err) {
    next(err);
  }
});

// ─── Admin: GET /api/users ────────────────────────────────────────────────────

router.get('/', requireRole('ADMIN'), async (req, res, next) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page  ?? '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit ?? '20', 10)));
    const skip  = (page - 1) * limit;

    const [users, total] = await prisma.$transaction([
      prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true, email: true, name: true, role: true,
          emailVerified: true, createdAt: true, avatarUrl: true,
        },
      }),
      prisma.user.count(),
    ]);

    res.json({ users, meta: { total, page, limit, pages: Math.ceil(total / limit) } });
  } catch (err) {
    next(err);
  }
});

// ─── Admin: GET /api/users/:id ────────────────────────────────────────────────

router.get('/:id', requireRole('ADMIN'), async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      include: { accounts: { select: { provider: true, createdAt: true } } },
    });
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json({ user: safeUser(user) });
  } catch (err) {
    next(err);
  }
});

export default router;
