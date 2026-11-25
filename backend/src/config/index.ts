/**
 * @copyright 2026 davidleo
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import dotenv from "dotenv";

dotenv.config();

export const googleAuthCreds = {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
    REDIRECT_URL: process.env.GOOGLE_CLIENT_REDIRECT_URL as string,
    SCOPES: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
    ],
};

export const common = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    CLIENT_URL: (process.env.CLIENT_URL as string) ?? "http://localhost:5173",
    IS_PRODUCTION: process.env.NODE_ENV === "production",
    SESSION_SECRET: process.env.SESSION_SECRET as string,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,
    ACCESS_TOKEN_MAX_AGE: process.env.ACCESS_TOKEN_MAX_AGE as string,
    REFRESH_TOKEN_MAX_AGE: process.env.REFRESH_TOKEN_MAX_AGE as string,
};

export const db = {
    MONGO_URI: process.env.MONGO_URI as string,
};
