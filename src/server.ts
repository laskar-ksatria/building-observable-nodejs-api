import * as Sentry from "@sentry/node";
import { server } from "./app";
import toobusy from "toobusy-js";
import env from "./env";
import dbConnect from "./config/mongodb";

if (env.SENTRY_DSN) {
  Sentry.init({
    dsn: env.SENTRY_DSN,
    environment: process.env.NODE_ENV ?? "development",
  });
}

const versionState = [
  { name: "Version", value: process.version },
  { name: "Root", value: "server.ts" },
  { name: "Port", value: env.PORT },
];

async function main() {
  await dbConnect();

  server.listen(env.PORT, () => {
    console.table(versionState);
    console.log(`Server running on http://localhost:${env.PORT} 🚀`);
  });

  process.on("SIGINT", () => {
    toobusy.shutdown();
    process.exit();
  });
  process.on("exit", () => toobusy.shutdown());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
