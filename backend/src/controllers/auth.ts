/**
 * @copyright 2026 davidleo
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import crypto from "crypto";
import { google } from "googleapis";

/**
 * Custom modules
 */
import { googleAuthCreds } from "@/config";
import { oauth2Client } from "@/libs/oauth2Client";
import { common } from "@/config";

/**
 * Services
 */
import { createUser } from "@/services/user";
import { createTokens } from "@/services/tokens";

/**
 * Models
 */
import { User } from "@/models/user";

/**
 * Types
 */
import type { Request, Response } from "express";
import type { IUser } from "@/models/user";
import { createSecureServer } from "http2";

export const googleAuth = (req: Request, res: Response) => {
  const state = crypto.randomBytes(32).toString("hex");

  req.session.state = state;

  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: googleAuthCreds.SCOPES,
    include_granted_scopes: true,
    state,
  });
  res.redirect(authorizationUrl);
};

export const googleAuthCallback = async (req: Request, res: Response) => {
  const query = req.query;

  // Handle case when getting error from google consent screen
  if ("error" in query) return res.sendStatus(400);

  // Handle case when state isn't match
  if (query.state !== req.session.state) {
    return res
      .status(400)
      .send({ message: "State mismatch. Possible CSRF attack" });
  }

  // Exchange the authorization code and fetch the user's profile. An
  // failure here (network error, invalid/expired code, revoked consent)
  // must be reported to the client instead of crashing the handler.
  let userInfo;
  try {
    // Create google auth token
    const { tokens: googleTokens } = await oauth2Client.getToken(
      query.code as string,
    );
    oauth2Client.setCredentials(googleTokens);

    // Initial google people api
    const peopleApi = google.people({
      version: "v1",
      auth: oauth2Client,
    });

    // Get user info from google
    ({ data: userInfo } = await peopleApi.people.get({
      resourceName: "people/me",
      personFields: "names,emailAddresses,photos",
    }));
  } catch (err) {
    console.error("Google OAuth flow failed", err);
    return res.sendStatus(502);
  }

  // Handle case where necessary info isn't found for creating account
  if (
    !userInfo ||
    !userInfo.names?.[0]?.givenName ||
    !userInfo.names?.[0]?.familyName ||
    !userInfo.emailAddresses?.[0].value ||
    !userInfo.photos?.[0].url
  ) {
    console.error("Didn't get necessary user info from google");
    return res.sendStatus(500);
  }

  const userExist = await User.exists({
    email: userInfo.emailAddresses[0].value,
  });

  let userId = userExist?._id;

  if (!userExist) {
    try {
      const user: IUser = {
        name: {
          first: userInfo.names[0].givenName,
          last: userInfo.names[0].familyName,
        },
        email: userInfo.emailAddresses[0].value,
        photo: {
          url: userInfo.photos[0].url,
        },
      };
      const newUser = await createUser(user);
      userId = newUser?._id;
      console.log(newUser);
    } catch (error) {
      console.error("Error creating new user", error);
    }
  }
  // Guard against issueing tokens without a resolved user id.
  if (!userId) {
    console.error("Unable to resolve user id for token creation");
    return res.sendStatus(500);
  }

  const tokens = createTokens({ userId });

  res.cookie("access_token", tokens.access_token, {
    secure: common.IS_PRODUCTION,
    sameSite: "lax",
    maxAge: Number(common.ACCESS_TOKEN_MAX_AGE),
  });

  res.cookie("refresh_token", tokens.refresh_token, {
    httpOnly: true,
    secure: common.IS_PRODUCTION,
    sameSite: "lax",
    maxAge: Number(common.REFRESH_TOKEN_MAX_AGE),
  });

  res.redirect(`${common.CLIENT_URL}/app`);
};
