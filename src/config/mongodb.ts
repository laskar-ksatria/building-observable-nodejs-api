import mongoose from "mongoose";
import env from "../env";
import * as Sentry from "@sentry/node";

/**
 * Connect to MongoDB. Use async/await in server.ts.
 * Local MongoDB: brew services start mongodb-community
 */
export default async function dbConnect(): Promise<void> {
  try {
    await mongoose.connect(env.MONGODB_URI);
    mongoose.connection.on("error", (err) => {
      Sentry.captureException(err);
      console.error("MongoDB connection error:", err);
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    Sentry.captureException(error);
    process.exit(1);
  }
}
