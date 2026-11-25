/**
 * @copyright 2026 davidleo
 * @license Apache-2.0
 */

/**
 * Services
 */
import { getUser } from "@/services/user";
import { verifyToken } from "@/services/tokens";

/**
 * Types
 */
import type { Request, Response } from "express";
import type { Types } from "mongoose";

export const getMe = async (req: Request, res: Response) => {
  // Retrieve authorization from request headers
  const { authorization } = req.headers;

  // Handle case when clients doesn't send request with accessToken
  if (!authorization) {
    res.status(401).json({
      code: "AccessTokenError",
      message: "Access token is required",
    });
    return;
  }
  // Retrieve only token from authorization
  const [scheme, accessToken] = authorization?.split(" ");

  // Handle malformed authorization header (expected format: "Bearer <token>")
  if (scheme !== "Bearer" || !accessToken) {
    res.status(401).json({
      code: "AccessTokenError",
      message: "malformed authorization header",
    });
    return;
  }

  // Verify the access token. An invalid or expired token is a client.
  // Error (401), so it must not be allowed to bubble up as a 500.

  let userId: Types.ObjectId;

  try {
    ({ userId } = verifyToken(accessToken) as { userId: Types.ObjectId });
  } catch (err) {
    res.status(401).json({
      code: "AccessToken",
      message: "Access token is invalid or expired",
    });
    return;
  }

  try {
    const me = await getUser(userId);

    res.json(me);
  } catch (err) {
    console.error("Error getting current user", err);
    res.sendStatus(500);
  }
};
