import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

import './services/passport.js'; // register strategies
import authRouter from './routes/auth.js';
import usersRouter from './routes/users.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT ?? 4000;

// ─── Security headers ─────────────────────────────────────────────────────────

app.use(helmet());

// ─── CORS ─────────────────────────────────────────────────────────────────────

const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? 'http://localhost:3000').split(',');

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow requests with no origin (e.g. curl, mobile apps in dev)
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      cb(new Error(`CORS: ${origin} not allowed`));
    },
    credentials: true, // required for httpOnly cookie exchange
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// ─── Body parsing ─────────────────────────────────────────────────────────────

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ─── Rate limiting ────────────────────────────────────────────────────────────

/** General API limiter: 100 req / 15 min per IP */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests', message: 'Please try again later' },
});

/** Strict auth limiter: 10 req / 15 min per IP */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests', message: 'Too many auth attempts, please wait' },
});

app.use('/api', apiLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
app.use('/api/auth/refresh', authLimiter);

// ─── Routes ───────────────────────────────────────────────────────────────────

app.get('/healthz', (_req, res) => res.json({ status: 'ok', ts: new Date().toISOString() }));

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

// ─── 404 ──────────────────────────────────────────────────────────────────────

app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

// ─── Error handler ────────────────────────────────────────────────────────────

app.use(errorHandler);

// ─── Start ────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`🚀  Server running on http://localhost:${PORT}`);
});

export default app;
