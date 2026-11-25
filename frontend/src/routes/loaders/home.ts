/**
 * @copyright 2026 davidleo
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import axios from "axios"
import { redirect } from "react-router"

/**
 * Custom modules
 */
import { getAccessToken } from "@/lib/utils"
import { endpoints } from "@/config"

/**
 * Types
 */
import type { LoaderFunction } from "react-router"
import type { User } from "@/types"

export const homeLoader: LoaderFunction = async () => {
  try {
    const response = await axios.get<User>(endpoints.me, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    console.log(response.data)

    return { user: response.data }
  } catch (err) {
    // A missing/invalid/expired token means the user isn't authenticated,
    // so sent them to the login page instead of rendering a broken screen
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      return redirect("/app/login")
    }
  }
}
