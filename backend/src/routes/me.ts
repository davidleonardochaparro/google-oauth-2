/**
 * @copyright 2026 davidleo
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import express from "express";

/**
 * Controllers
 */
import { getMe } from "@/controllers/me";

/**
 * Types
 */
import type { Router } from "express";

const router: Router = express.Router();

router.get("/", getMe);

export default router;
