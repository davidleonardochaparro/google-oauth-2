/**
 * @copyright 2026 davidleo
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { redirect } from "react-router"

/**
 * Custom modules
 */
import { getAccessToken } from "@/lib/utils"

/**
 * Types
 */
import type { LoaderFunction } from "react-router"

export const authLoader: LoaderFunction = () => {
  if (!getAccessToken()) return redirect("/app/login")
  return null
}
