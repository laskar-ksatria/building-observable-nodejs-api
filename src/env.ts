import { config } from "dotenv";

config();

const required = ["PORT", "MONGODB_URI", "PRIVATE_KEY", "TOKEN_EXPIRED"] as const;
const missing = required.filter((key) => !process.env[key] || process.env[key] === "undefined");

if (missing.length > 0) {
  console.error("[env] Missing required variables:", missing.join(", "));
  console.error("Add them to your .env file. See README for details.");
  process.exit(1);
}

const env = {
  PORT: process.env.PORT!,
  REDIS_HOST: process.env.REDIS_HOST ?? "",
  REDIS_PORT: process.env.REDIS_PORT ?? "",
  SENTRY_DSN: process.env.SENTRY_DSN ?? "",
  TOKEN_EXPIRED: process.env.TOKEN_EXPIRED!,
  PRIVATE_KEY: process.env.PRIVATE_KEY!,
  MONGODB_URI: process.env.MONGODB_URI!,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD ?? "",
};

export default env;
