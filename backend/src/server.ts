/**
 * @copyright 2026 davidleo
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import express from "express";
import cors from "cors";
import session from "express-session";
import helmet from "helmet";
import cookieParser from "cookie-parser";

/**
 * Custom modules
 */
import { connectDb, disconnectDb } from "@/libs/mongoose";
/**
 * Routes
 */
import router from "@/routes";

/**
 * Config
 */
import { common } from "@/config";

/**
 * Initial express
 */
const app = express();

/**
 * Middlewares
 */
app.use(
  cors({
    origin: [common.CLIENT_URL],
    credentials: true,
  }),
  express.json(),
  helmet(),
  cookieParser(),
  session({
    secret: common.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: common.IS_PRODUCTION,
      sameSite: "lax",
      maxAge: 36e5,
    },
  }),
);

// Immediately Invoked Async Function to initialize the application
(async function (): Promise<void> {
  try {
    // Establish a connection to the MongoDB database
    await connectDb();

    //Register application routes under the root path
    app.use("/api/v1", router);

    // Centralized error handler. Any error thrown/forwarded from a route
    // (including rejected promises in async handlers) ends up here so we
    // return a consistent JSON response instead of leaking stack traces.
    app.use(
      (
        err: unknown,
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction,
      ) => {
        console.error("Unhandled request error", err);

        if (res.headersSent) return;

        res.status(500).json({
          code: "ServerError",
          message: "An unexpected error occurred",
        });
      },
    );

    // Start server and listen on the configured port
    app.listen(common.PORT, () => {
      console.log(`server listening at http://localhost:${common.PORT}`);
    });
  } catch (err) {
    // log a critical error if server startup fails
    console.error("failed to start server", err);

    // IN production, exit the process to avoid running in an unstable state
    if (common.NODE_ENV === "Production") {
      process.exit(1);
    }
  }
})();

// Handles graceful server shutdown on termination signals
const serverTermination = async (signal: NodeJS.Signals): Promise<void> => {
  try {
    //Disconnect from the MongoDB database
    await disconnectDb();

    // Log a warning indicating the server is shutting down
    console.info("Server shutdown", signal);

    // Exit the process cleanly
    process.exit(0);
  } catch (err) {
    // Log any errors that occcur diring the shutdown process
    console.error("Error during server shutdown", err);

    // Exit with a non-zero code so the failure is surfaced to the
    // process manager instead of leaving the process hanging.
    process.exit(1);
  }
};

// Listn for termination signal and trigger graceful shutdown
process.on("SIGTERM", serverTermination);
process.on("SIGINT", serverTermination);
