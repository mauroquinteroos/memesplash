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
}