import test from 'ava';
import fetch from 'node-fetch';
import { config as dotEnvConfig } from 'dotenv';

dotEnvConfig();

const ENDPOINT = `http://localhost:${process.env.PORT}/register`;

const VALID_USER_1 = {
  id: '7c6ac32e-42c8-11ed-b878-0242ac120002',
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

const fetchRegister = async (test, user) => {
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return response;
  } catch (err) {
    test.fail(err);
  }
};

test.before(() => {});

test('Register successfully', async (test) => {
  const EXPECTED_STATUS_CODE = 201;
  const response = await fetchRegister(test, VALID_USER_1);

  test.is(response.status, EXPECTED_STATUS_CODE);
  test.fail(`Expected status code ${EXPECTED_STATUS_CODE}, but received ${response.status}`);
});

test('Register failed - Invalid ID format', async (test) => {
  const EXPECTED_STATUS_CODE = 400;

  const user = {
    ...VALID_USER_1,
    id: 'invalid-uuid',
  };

  const response = await fetchRegister(test, user);

  test.is(response.status, EXPECTED_STATUS_CODE);
  test.fail(`Expected status code ${EXPECTED_STATUS_CODE}, but received ${response.status}`);
});

test('Register failed - Invalid email format', async (test) => {
  const EXPECTED_STATUS_CODE = 400;

  const user = {
    ...VALID_USER_1,
    email: 'emailatemail.com',
  };

  const response = await fetchRegister(test, user);

  test.is(response.status, EXPECTED_STATUS_CODE);
  test.fail(`Expected status code ${EXPECTED_STATUS_CODE}, but received ${response.status}`);
});

test('Register failed - Invalid password format', async (test) => {
  const EXPECTED_STATUS_CODE = 400;

  const user = {
    ...VALID_USER_1,
    email: '1234',
  };

  const response = await fetchRegister(test, user);

  test.is(response.status, EXPECTED_STATUS_CODE);
  test.fail(`Expected status code ${EXPECTED_STATUS_CODE}, but received ${response.status}`);
});

test('Register failed - Missing fields', async (test) => {
  const EXPECTED_STATUS_CODE = 400;

  const user = {
    id: VALID_USER_1.id,
    name: VALID_USER_1.name,
    email: VALID_USER_1.email,
    // Missing password
  };

  const response = await fetchRegister(test, user);

  test.is(response.status, EXPECTED_STATUS_CODE);
  test.fail(`Expected status code ${EXPECTED_STATUS_CODE}, but received ${response.status}`);
});

test('Register failed - Unnecesary fields', async (test) => {
  const EXPECTED_STATUS_CODE = 400;

  const user = {
    ...VALID_USER_1,
    age: 25,
  };

  const response = await fetchRegister(test, user);

  test.is(response.status, EXPECTED_STATUS_CODE);
  test.fail(`Expected status code ${EXPECTED_STATUS_CODE}, but received ${response.status}`);
});

test('Register failed - Duplicated ID', async (test) => {
  const EXPECTED_STATUS_CODE = 409;

  const user = {
    ...VALID_USER_2,
    id: VALID_USER_1.id,
  };

  const response = await fetchRegister(test, user);

  test.is(response.status, EXPECTED_STATUS_CODE);
  test.fail(`Expected status code ${EXPECTED_STATUS_CODE}, but received ${response.status}`);
});

test('Register failed - Duplicated email', async (test) => {
  const EXPECTED_STATUS_CODE = 409;

  const user = {
    ...VALID_USER_2,
    email: VALID_USER_1.email,
  };

  const response = await fetchRegister(test, user);

  test.is(response.status, EXPECTED_STATUS_CODE);
  test.fail(`Expected status code ${EXPECTED_STATUS_CODE}, but received ${response.status}`);
});

test.after(() => {});
