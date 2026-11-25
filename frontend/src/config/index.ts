/**
 * @copyright 2026 davidleo
 * @license Apache-2.0
 */

export const API_BASE_URL = "http://localhost:3000/api/v1"

export const endpoints = {
  googleAuth: `${API_BASE_URL}/auth/google`,
  me: `${API_BASE_URL}/me`,
} as const
