import mongoose from 'mongoose';
import { bootstrap } from './bootstrap.js';

const main = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    connectTimeoutMS: 4000,
  });

  const app = bootstrap();
  app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`));
};

main();
