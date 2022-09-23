import dotenv from "dotenv";

dotenv.config();

export default {
  baseURL: process.env.BASE_URL || "http://localhost",
  db: {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
  },
  encryption: {
    expiresIn: process.env.ENCRYPTION_EXPIRES_IN || "1d",
    saltRounds: process.env.ENCRYPTION_SALT_ROUNDS,
    secret: process.env.ENCRYPTION_SECRET,
  },
  port: process.env.PORT || 3000,
};
