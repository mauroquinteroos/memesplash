import { test as uuidTest } from 'uuid-random';
import { InvalidIdFormatException } from '../errors/invalid-id-format.exception';
import { InvalidNameFormatException } from '../errors/invalid-name-format.exception';
import { InvalidEmailFormatException } from '../errors/invalid-email-format.exception';
import { InvalidPasswordFormatException } from '../errors/invalid-password-format.exception';
import { hash } from 'bcryptjs';

const HASH_SALT = 12;

/**
 * Registered user in the application
 */
export class UserModel {
  /**
   * Constructor
   * @param {String} id User unique identifier
   * @param {String} name User name
   * @param {String} email User email
   * @param {String} password User hashed password
   * @param {String} profilePic User profile picture URL
   * @param {String[]} images User uploaded image IDs
   */
  constructor(id, name, email, password, profilePic, images) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.profilePic = profilePic;
    this.images = images;
  }

  static validateId(id) {
    return uuidTest(id);
  }

  static validateName(name) {
    const nameRegex = /ˆ[A-Z\s-]{2,30}$/i;

    if (!nameRegex.test(name) || name.includes('  ') || name.includes('--')) return false;

    const nameSplitted = name.split(' ');

    for (const word of nameSplitted) {
      if (word.startsWith('-') || word.endsWith('-')) return false;
    }

    return true;
  }

  static validateEmail(email) {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailRegex.test(email);
  }

  static validatePassword(password) {
    return password.length >= 8 && password.length <= 30 && !password.includes(' ');
  }

  static async create(id, name, email, password) {
    if (!UserModel.validateId(id)) throw new InvalidIdFormatException();

    if (!UserModel.validateName(name)) throw new InvalidNameFormatException();

    if (!UserModel.validateEmail(email)) throw new InvalidEmailFormatException();

    if (!UserModel.validatePassword(password)) throw new InvalidPasswordFormatException();

    const hashedPassword = await hash(password, HASH_SALT);

    return UserModel(id, name, email, hashedPassword, undefined, []);
  }
}
