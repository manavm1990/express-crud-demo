import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from ".";
import client from "../client";
import config from "../config";

const users = client.db(config.db.name).collection("users");

function validate(user) {
  const user2Validate = new User(user.username, user.password);

  return user2Validate.validate();
}

export default {
  async create(newUser) {
    const errors = validate(newUser);
    if (errors.length > 0) throw new Error(errors.join("\n"));

    const { username, password } = newUser;

    const existingUser = await users.findOne({ username });
    if (existingUser) throw new Error("Username already exists.");

    const hashedPassword = await bcrypt.hash(
      password,
      Number(config.encryption.saltRounds) || 10
    );

    const { insertedId } = await users.insertOne({
      ...newUser,
      password: hashedPassword,
    });

    return insertedId;
  },

  async login(username, password) {
    const user = await users.findOne({ username });
    const isMatch = await bcrypt.compare(password, user?.password);

    if (!isMatch) throw new Error("Access denied.");

    return jwt.sign(
      { username: user.username, id: user._id },
      config.encryption.secret || "secret",
      { expiresIn: config.encryption.expiresIn || "1d" }
    );
  },
};
