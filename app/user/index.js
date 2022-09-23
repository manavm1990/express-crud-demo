export default class User {
  #username;
  #password;

  constructor(username, password) {
    this.#username = username;
    this.#password = password;
  }

  validate() {
    const errors = [];

    if (this.#username.length < 3) {
      errors.push("Username must be at least 3 characters long.");
    }

    if (this.#password.length < 6) {
      errors.push("Password must be at least 6 characters long.");
    }

    return errors;
  }
}
