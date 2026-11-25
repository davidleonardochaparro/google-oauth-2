/**
 * @copyright 2026 davidleo
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import express from 'express';

/**
 * Controllers
 */
import { googleAuth, googleAuthCallback } from '@/controllers/auth';

/**
 * Types
 */
import type { Router } from "express";

const router: Router = express.Router();

router.get('/google', googleAuth);

router.get("/google/callback", googleAuthCallback);

export default router;