export default class Item {
  #name;
  #price;
  #description;
  #image;

  constructor(name, price, description, image) {
    this.#name = name;
    this.#price = price;
    this.#description = description;
    this.#image = image;
  }

  validate() {
    const errors = [];

    if (this.#name.length < 3) {
      errors.push("Name must be at least 3 characters long.");
    }

    if (this.#price < 0) {
      errors.push("Price must be a positive number.");
    }

    if (this.#description.length < 10) {
      errors.push("Description must be at least 10 characters long.");
    }

    if (!this.#image) {
      errors.push("Image is required.");
    }

    return errors;
  }
}
