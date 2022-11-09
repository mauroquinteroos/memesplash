import { bootstrap } from './bootstrap.js';

const main = async () => {
  const app = await bootstrap();
  app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`));
};

main();
