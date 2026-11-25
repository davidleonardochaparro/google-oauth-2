/**
 * @copyright 2026 davidleo
 * @license Apache-2.0
 */

/**
 * Models
 */
import { User } from "@/models/user";

/**
 * Types
 */
import type { IUser } from "@/models/user";
import type { Types } from "mongoose";

export const createUser = async (user: IUser) => {
  try {
    const newUser = await User.create(user);

    return newUser;
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.error(`Error creating new user: ${reason}`);
  }
};

export const getUser = async (userId: Types.ObjectId) => {
  try {
    const user = await User.findById(userId);

    return user;
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    throw new Error(`Error getting user with id: ${userId} ${reason}`);
  }
};
