/**
 * @copyright 2026 davidleo
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { createBrowserRouter } from "react-router"

/**
 * Pages
 */
import { Login } from "@/pages/Login"
import { Home } from "@/pages/Home"

/**
 * Loaders
 */
import { authLoader } from "@/routes/loaders/auth"
import { homeLoader } from "@/routes/loaders/home"

export const router = createBrowserRouter([
  {
    path: "/app/login",
    Component: Login,
  },
  {
    path: "/app",
    loader: authLoader,
    children: [
      {
        index: true,
        Component: Home,
        loader: homeLoader,
      },
    ],
  },
])
