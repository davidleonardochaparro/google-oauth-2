/**
 * @copyright 2026 davidleo
 * @license Apache-2.0
 */

export interface User {
  name: {
    first: string
    last: string
  }
  email: string
  photo: {
    url: string
  }
}
