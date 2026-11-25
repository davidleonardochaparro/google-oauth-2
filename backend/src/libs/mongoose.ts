/**
 * @copyright 2026 davidleo
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import mongoose from "mongoose";

/**
 * Custom modules
 */

import { db } from "@/config";

/**
 * types
 */
import type { ConnectOptions } from "mongoose";

/**
 * Mongo connection options
 */
const connectionOptions: ConnectOptions = {
    serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
    },
    dbName: "xapp-tuts",
};

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 */
export const connectDb = async (): Promise<void> => {
    // Handle case when connection string does not exist
    if (!db.MONGO_URI) {
        throw new Error("Mongo URI is missing ");
    }

    try {
        await mongoose.connect(db.MONGO_URI, connectionOptions);
        console.info("Dababase connected successfully");
    } catch (error) {
        console.error("Failed to connect database", error);
        // Re-throw so callers (e.g. server startup) can react instead of
        // continuing to run against a database that never connected.

        throw error instanceof Error
            ? error
            : new Error(`Failed to connect database: ${error}`);
    }
};

/**
 * Gracefully disconnects from the MongoDB database.
 */
export const disconnectDb = async (): Promise<void> => {
    try {
        await mongoose.disconnect();
        console.info("Database disconnected successfully");
    } catch (error) {
        console.error("Error during disconnecting from database");
    }
};
