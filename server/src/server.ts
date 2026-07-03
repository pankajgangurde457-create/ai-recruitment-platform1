import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';

// Routes imports
import jobRoutes from './routes/jobRoutes.js';
import candidateRoutes from './routes/candidateRoutes.js';
import interviewRoutes from './routes/interviewRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import assistantRoutes from './routes/assistantRoutes.js';
import profileRoutes from './routes/profileRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Startup Environment Validation ───────────────────────────────────────────
const REQUIRED_VARS = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'];
const OPTIONAL_VARS = ['GEMINI_API_KEY'];

console.log('');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  HireFlow Backend — Environment Variable Check   ');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

let missingRequired = false;
REQUIRED_VARS.forEach(key => {
  if (process.env[key]) {
    console.log(`  ✅  ${key}: configured`);
  } else {
    console.error(`  ❌  ${key}: MISSING — server may not function correctly`);
    missingRequired = true;
  }
});

OPTIONAL_VARS.forEach(key => {
  if (process.env[key]) {
    console.log(`  ✅  ${key}: configured — AI features enabled`);
  } else {
    console.warn(`  ⚠️   ${key}: NOT SET — AI sourcing, scoring, and assistant features will be disabled`);
  }
});

console.log(`  ℹ️   NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
console.log(`  ℹ️   PORT: ${PORT}`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');

if (missingRequired) {
  console.error('[FATAL] One or more required environment variables are missing. Check Render dashboard → Environment settings.');
}
// ─────────────────────────────────────────────────────────────────────────────


// Security and compression middleware
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup logging
app.use(morgan('dev'));

// CORS configuration - support local and production domains
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://ai-recruitment-platform1.vercel.app',
  'https://ai-recruitment-platform1-qdbr.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Render health checks)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // In production, log but allow (can tighten later)
      console.warn(`CORS request from unlisted origin: ${origin}`);
      callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting (100 requests per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many requests from this IP, please try again after 15 minutes' }
});
app.use('/api', limiter);

// Health check endpoint (at both / and /api/health for Render uptime checks)
app.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'HireFlow Backend', timestamp: new Date().toISOString() });
});
app.get('/health', (_req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString(), uptime: process.uptime() });
});
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    env: {
      supabaseConfigured: !!process.env.SUPABASE_URL,
      geminiConfigured: !!process.env.GEMINI_API_KEY,
      nodeEnv: process.env.NODE_ENV
    }
  });
});

// Register routes
app.use('/api/jobs', jobRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/assistant', assistantRoutes);
app.use('/api', profileRoutes);

// Centralized error handler middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled server error:', err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Start listening — bind to 0.0.0.0 required for Render
app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`[HireFlow Server] running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`[HireFlow Server] Supabase URL: ${process.env.SUPABASE_URL ? 'configured' : 'MISSING'}`);
  console.log(`[HireFlow Server] Gemini API: ${process.env.GEMINI_API_KEY ? 'configured' : 'not set'}`);
});
