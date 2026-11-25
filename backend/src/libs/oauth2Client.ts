/**
 * @copyright 2026 davidleo
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { google } from "googleapis";

/**
 * Config
 */
import { googleAuthCreds } from "@/config";

export const oauth2Client = new google.auth.OAuth2(
    googleAuthCreds.CLIENT_ID,
    googleAuthCreds.CLIENT_SECRET,
    googleAuthCreds.REDIRECT_URL,
);