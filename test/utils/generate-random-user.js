import { randUuid, randEmail, randFullName, randPassword } from '@ngneat/falso';

export const generateRandomUser = () => ({
  id: randUuid(),
  name: randFullName({ size: 15 }),
  email: randEmail(),
  password: randPassword({ size: 15 }),
});
