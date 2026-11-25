/**
 * @copyright 2026 davidleo
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router/dom"

/**
 * CSS
 */
import "./index.css"

/**
 * Routes
 */
import { router } from "@/routes"

/**
 * Components
 */
import { ThemeProvider } from "@/components/theme-provider.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
)
