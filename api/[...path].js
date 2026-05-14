import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from '../server/config/db.js';
import errorHandler from '../server/middleware/errorHandler.js';
import matchRoutes from '../server/routes/matchRoutes.js';

dotenv.config({ path: '.env.local' });
dotenv.config();

const app = express();
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || !CLIENT_ORIGIN || origin === CLIENT_ORIGIN) {
        callback(null, true);
        return;
      }

      callback(new Error('Not allowed by CORS'));
    },
  }),
);
app.use(express.json());

app.use(async (_req, _res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api', matchRoutes);
app.use(errorHandler);

export default app;
