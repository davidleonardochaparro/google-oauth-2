/**
 * @copyright 2026 davidleo
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import express from "express";

/**
 * Routers
 */
import authRoutes from "@/routes/auth";
import meRoutes from "@/routes/me";

/**
 * Types
 */
import type { Router } from "express";

const router: Router = express.Router();

router.use("/auth", authRoutes);

router.use("/me", meRoutes);

export default router;
