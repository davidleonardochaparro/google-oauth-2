/**
 * @copyright 2026 davidleo
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import jwt from "jsonwebtoken";

/**
 * Custom modules
 */
import { common } from "@/config";

export const createTokens = (payload: string | Buffer | object) => {
    const access_token = jwt.sign(payload, common.ACCESS_TOKEN_SECRET, {
        expiresIn: Number(common.ACCESS_TOKEN_MAX_AGE),
    });

    const refresh_token = jwt.sign(payload, common.REFRESH_TOKEN_SECRET, {
        expiresIn: Number(common.REFRESH_TOKEN_MAX_AGE),
    });

    return { access_token, refresh_token };
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, common.ACCESS_TOKEN_SECRET)
}
