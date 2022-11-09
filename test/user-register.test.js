import request from 'supertest';
import { beforeAll, afterAll, describe, test, expect } from '@jest/globals';
import { config as dotEnvConfig } from 'dotenv';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { bootstrap } from '../src/bootstrap.js';

dotEnvConfig();

const REGISTER_PATH = `/user/register`;

const VALID_USER_1 = {
  id: '72d10fcd-10f5-4651-b3a3-e5c817700529',
  name: 'Testing',
  email: 'test@gmail.com',
  password: 'test1234',
};

const VALID_USER_2 = {
  id: '5d9516b7-cec9-49da-b565-699cf6d3969e',
  name: 'Testing alt',
  email: 'testalt@test.com',
  password: 'test1234',
};

let mongoServer;
let app;

beforeAll(async () => {
  mongoServer = await MongoMemoryReplSet.create({
    replSet: {
      count: 1,
      dbName: 'memesplash',
    },
  });

  process.env.MONGODB_URI = mongoServer.getUri();

  app = await bootstrap();
});

afterAll(async () => {
  if (mongoServer) {
    await mongoServer.stop();
  }
});

const fetchRegister = async (user) => {
  try {
    return await request(app).post(REGISTER_PATH).send(user);
  } catch (error) {
    throw Error(`Error calling the endpoint with path ${REGISTER_PATH}`);
  }
};

describe('User register tests', () => {
  test('Register successfully', async () => {
    const EXPECTED_STATUS_CODE = 201;

    const response = await fetchRegister(VALID_USER_1);

    expect(response.status).toBe(EXPECTED_STATUS_CODE);
  });

  test('Register failed - Invalid ID format', async () => {
    const EXPECTED_STATUS_CODE = 400;

    const user = {
      ...VALID_USER_1,
      id: 'invalid-uuid',
    };

    const response = await fetchRegister(user);

    expect(response.status).toBe(EXPECTED_STATUS_CODE);
  });

  test('Register failed - Invalid name format', async () => {
    const EXPECTED_STATUS_CODE = 400;

    const user = {
      ...VALID_USER_1,
      name: 'name-with-./*',
    };

    const response = await fetchRegister(user);

    expect(response.status).toBe(EXPECTED_STATUS_CODE);
  });

  test('Register failed - Invalid email format', async () => {
    const EXPECTED_STATUS_CODE = 400;

    const user = {
      ...VALID_USER_1,
      email: 'emailatemail.com',
    };

    const response = await fetchRegister(user);

    expect(response.status).toBe(EXPECTED_STATUS_CODE);
  });

  test('Register failed - Invalid password format', async () => {
    const EXPECTED_STATUS_CODE = 400;

    const user = {
      ...VALID_USER_1,
      password: '1234',
    };

    const response = await fetchRegister(user);

    expect(response.status).toBe(EXPECTED_STATUS_CODE);
  });

  test('Register failed - Missing fields', async () => {
    const EXPECTED_STATUS_CODE = 400;

    const user = {
      id: VALID_USER_1.id,
      name: VALID_USER_1.name,
      email: VALID_USER_1.email,
      // Missing password
    };

    const response = await fetchRegister(user);

    expect(response.status).toBe(EXPECTED_STATUS_CODE);
  });

  test('Register failed - Unnecesary fields', async () => {
    const EXPECTED_STATUS_CODE = 400;

    const user = {
      ...VALID_USER_1,
      age: 25,
    };

    const response = await fetchRegister(user);

    expect(response.status).toBe(EXPECTED_STATUS_CODE);
  });

  test('Register failed - Duplicated ID', async () => {
    const EXPECTED_STATUS_CODE = 409;

    const user = {
      ...VALID_USER_2,
      id: VALID_USER_1.id,
    };

    const response = await fetchRegister(user);

    expect(response.status).toBe(EXPECTED_STATUS_CODE);
  });

  test('Register failed - Duplicated email', async () => {
    const EXPECTED_STATUS_CODE = 409;

    const user = {
      ...VALID_USER_2,
      email: VALID_USER_1.email,
    };

    const response = await fetchRegister(user);

    expect(response.status).toBe(EXPECTED_STATUS_CODE);
  });
});
