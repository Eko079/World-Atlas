import "server-only";
import { createClient } from "./server";

export async function getAuthenticatedUser() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user;
}

export function isAdminAllowed(email: string | null | undefined): boolean {
  if (!email) return false;
  const allowed = process.env.ADMIN_EMAILS ?? "";
  return allowed.split(",").map((e) => e.trim()).includes(email);
}

export async function requireAdmin() {
  const user = await getAuthenticatedUser();
  if (!user) {
    throw new Error("UNAUTHORIZED");
  }
  if (!isAdminAllowed(user.email)) {
    throw new Error("FORBIDDEN");
  }
  return user;
}
