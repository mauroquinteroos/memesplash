import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { config as dotenvConfig } from 'dotenv';
import { UserRoutes } from './infrastructure/routes/user.routes.js';
import { errorMiddleware } from './infrastructure/middlewares/error.middleware.js';

dotenvConfig();

const bootstrap = async () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use('/user', UserRoutes);
  app.use(errorMiddleware);

  const MONGO_URL = `${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}`;

  await mongoose.connect(`mongodb://${MONGO_URL}?authSource=admin`);

  app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`));
};

bootstrap();
