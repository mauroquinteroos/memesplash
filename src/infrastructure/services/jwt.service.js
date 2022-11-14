import jwt from 'jsonwebtoken';

const jwtScret = process.env.JWT_PRIVATE_KEY || 'default_jwt_secret';

export const signAsync = (payload, signOptions) =>
  new Promise((resolve, reject) => {
    jwt.sign(payload, jwtScret, signOptions, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });

export const verifyAsync = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, jwtScret, (err, payload) => {
      if (err) {
        reject(err);
      } else {
        resolve(payload);
      }
    });
  });
