export { cn } from "cn"

export const parseCookie = (cookie: string) => {
  return Object.fromEntries(cookie.split("; ").map((item) => item.split("=")))
}
export const getAccessToken = () => parseCookie(document.cookie).access_token
