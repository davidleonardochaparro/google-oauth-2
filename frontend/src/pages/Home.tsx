/**
 * @copyright 2026 davidleo
 * @license Apache-2.0
 */

/**
 * Components
 */
import {
  Card,
  CardHeader,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

/**
 * Hooks
 */
import { useLoaderData } from "react-router"

/**
 * Types
 */
import type { User } from "@/types"

export const Home = () => {
  const { user } = useLoaderData<{ user: User }>()
  return (
    <div className="flex h-screen items-center">
      <Card className="mx-auto w-full max-w-xs">
        <CardHeader className="flex items-start gap-4">
          <Avatar size="lg">
            <AvatarImage src={user.photo.url} />
            <AvatarFallback>{user.name.first.at(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{user.name.first + " " + user.name.last}</CardTitle>

            <CardDescription>{user.email}</CardDescription>
          </div>
        </CardHeader>
        <CardFooter>
          <Button variant="destructive" className="ms-auto">
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
