const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const roommateRoutes = require('./routes/roommateRoutes');

dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is not defined in .env');
  process.exit(1);
}

if (process.env.NODE_ENV === 'production' && process.env.JWT_SECRET.length < 32) {
  console.error(
    'JWT_SECRET is too short for production (use 32+ random characters).'
  );
  process.exit(1);
}

const app = express();

// CORS: always allow local dev origins, plus any origins listed in
// FRONTEND_URL (comma-separated).
// Requests with no Origin header (curl, health checks, server-to-server)
// are always allowed.
const DEV_ORIGINS = ['http://localhost:5173', 'http://127.0.0.1:5173'];
const allowedOrigins = [
  ...DEV_ORIGINS,
  ...(process.env.FRONTEND_URL || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
];

app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      // Not allowed: return without setting the CORS header.
      // The response still completes normally; the browser blocks it
      // due to the missing Access-Control-Allow-Origin header.
      cb(null, false);
    },
  })
);

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Homigo API is running',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    time: new Date().toISOString(),
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/roommates', roommateRoutes);

// Unknown API routes -> JSON 404 (instead of Express's HTML page)
app.use('/api', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Last-resort error handler: bad JSON bodies, etc. Never leaks stack traces.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Invalid JSON body' });
  }
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ message: 'Request body too large' });
  }
  console.error('unhandled error:', err);
  res.status(err.status || 500).json({ message: 'Server error' });
});

const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

// Only start accepting requests once the database is reachable.
connectDB()
  .then(() => {
    app.listen(PORT, HOST, () => {
      console.log(`Homigo server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
