import { createClient } from "@/lib/supabase/server"

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized: Invalid or missing administrator session.") {
    super(message)
    this.name = "UnauthorizedError"
  }
}

const AUTHORIZED_ADMIN_EMAIL = "pearlinternational1010@gmail.com"

/**
 * Validates that the current request is executed by an authenticated administrator.
 * Enforces both session validity and authorized admin email whitelist.
 * Throws an UnauthorizedError if validation fails.
 */
export async function assertAdminSession() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    throw new UnauthorizedError("Unauthorized: Session missing or expired.")
  }

  if (user.email !== AUTHORIZED_ADMIN_EMAIL) {
    throw new UnauthorizedError("Forbidden: Unauthorized account.")
  }

  return user
}
