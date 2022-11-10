import supertest from 'supertest';
import { beforeAll, afterAll, describe, test, expect } from '@jest/globals';
import { bootstrap } from '../src/bootstrap.js';
import { generateRandomUser } from './utils/generate-random-user.js';
import { dbConnect, dbDisconnect } from './utils/setup-tests.js';

const request = supertest(bootstrap());

const registerPath = '/user/register';
const testUserA = generateRandomUser();
const testUserB = generateRandomUser();

console.log(testUserA);
console.log(testUserB);

beforeAll(async () => {
  await dbConnect();
});

afterAll(async () => {
  await dbDisconnect();
});

const fetchRegister = async (user) => {
  try {
    return await request.post(registerPath).send(user);
  } catch (error) {
    throw Error(`Error calling the endpoint with path ${registerPath}`);
  }
};

describe('User register tests', () => {
  test('Register successfully', async () => {
    const response = await fetchRegister(testUserA);

    expect(response.status).toBe(201);
  });

  test('Register failed - Invalid ID format', async () => {
    const user = {
      ...testUserA,
      id: 'invalid-uuid',
    };

    const response = await fetchRegister(user);

    expect(response.status).toBe(400);
  });

  test('Register failed - Invalid name format', async () => {
    const user = {
      ...testUserA,
      name: 'name-with-./*',
    };

    const response = await fetchRegister(user);

    expect(response.status).toBe(400);
  });

  test('Register failed - Invalid email format', async () => {
    const user = {
      ...testUserA,
      email: 'emailatemail.com',
    };

    const response = await fetchRegister(user);

    expect(response.status).toBe(400);
  });

  test('Register failed - Invalid password format', async () => {
    const user = {
      ...testUserA,
      password: '1234',
    };

    const response = await fetchRegister(user);

    expect(response.status).toBe(400);
  });

  test('Register failed - Missing fields', async () => {
    const user = {
      id: testUserA.id,
      name: testUserA.name,
      email: testUserA.email,
      // Missing password
    };

    const response = await fetchRegister(user);

    expect(response.status).toBe(400);
  });

  test('Register failed - Unnecesary fields', async () => {
    const user = {
      ...testUserA,
      age: 25,
    };

    const response = await fetchRegister(user);

    expect(response.status).toBe(400);
  });

  test('Register failed - Duplicated ID', async () => {
    const user = {
      ...testUserB,
      id: testUserA.id,
    };

    const response = await fetchRegister(user);

    expect(response.status).toBe(409);
  });

  test('Register failed - Duplicated email', async () => {
    const user = {
      ...testUserB,
      email: testUserA.email,
    };

    const response = await fetchRegister(user);

    expect(response.status).toBe(409);
  });
});
