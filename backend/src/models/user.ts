/**
 * @copyright 2026 davidleo
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import mongoose, { Schema } from "mongoose";

/**
 * Types
 */
export interface IUser {
    name: {
        first: string;
        last: string;
    };
    email: string;
    photo: {
        url: string;
    };
}

const userSchema = new Schema<IUser>({
    name: {
        first: String,
        last: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    photo: {
        url: String,
    },
});

export const User = mongoose.model("User", userSchema);
