/**
 * @copyright 2026 davidleo
 * @license Apache-2.0
 */

/**
 * Assets
 */
import { GalleryVerticalEnd } from "lucide-react"

/**
 * Components
 */
import { LoginForm } from "@/components/login-form"

export const Login = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a
          href="/app"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
        </a>
        <LoginForm />
      </div>
    </div>
  )
}
