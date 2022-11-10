import mongoose from 'mongoose';
import { MongoMemoryReplSet } from 'mongodb-memory-server';

const mongoServer = await MongoMemoryReplSet.create({
  replSet: {
    count: 1,
    dbName: 'memesplash',
  },
});

export const dbConnect = async () => {
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, {
    connectTimeoutMS: 4000,
  });
};

export const dbDisconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();

  if (mongoServer) {
    await mongoServer.stop();
  }
};
