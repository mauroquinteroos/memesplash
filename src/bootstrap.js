import express from 'express';
import cors from 'cors';
import { config as dotenvConfig } from 'dotenv';
import { UserRoutes } from './infrastructure/routes/user.routes.js';
import { errorMiddleware } from './infrastructure/middlewares/error.middleware.js';

dotenvConfig();

export const bootstrap = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use('/user', UserRoutes);
  app.use(errorMiddleware);

  return app;
};
