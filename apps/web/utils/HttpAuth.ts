import { cookies } from 'next/headers'
import { JWT_KEY } from '@/constants/StorageKeys'

/**
 * Read the JWT from the HTTP-only cookie and return it as a Bearer token.
 * This is the single source of truth for authenticating server-side API calls.
 */
export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(JWT_KEY)?.value
  return token ? `Bearer ${token}` : null
}
