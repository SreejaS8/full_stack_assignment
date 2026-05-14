import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';
import matchRoutes from './routes/matchRoutes.js';

dotenv.config({ path: '.env.local' });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

console.log('[env] PORT:', PORT);
console.log('[env] MONGODB_DB_NAME:', process.env.MONGODB_DB_NAME || 'match_history');
console.log('[env] MONGODB_URI configured:', Boolean(process.env.MONGODB_URI));

app.use(
  cors({
    origin: [CLIENT_ORIGIN, 'http://127.0.0.1:5173', 'http://localhost:5173'],
  }),
);
app.use(express.json());
app.use(morgan('dev'));

app.use((req, _res, next) => {
  console.log(`[api] ${req.method} ${req.originalUrl}`);
  next();
});

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'tugmath-api',
    database: process.env.MONGODB_DB_NAME || 'match_history',
    mongoConfigured: Boolean(process.env.MONGODB_URI),
  });
});

app.use('/api', matchRoutes);
app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to start server:', error.message);
    process.exit(1);
  });
