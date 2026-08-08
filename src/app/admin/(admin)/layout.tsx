import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdminAllowed } from "@/lib/supabase/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.user) {
    redirect("/admin/login");
  }

  if (!isAdminAllowed(session.user.email)) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center px-4">
        <div className="text-center">
          <p className="font-display text-2xl font-semibold text-paper uppercase">Access Denied</p>
          <p className="mt-3 font-mono text-sm text-mist">Your account is not authorized for admin access.</p>
          <p className="mt-6 font-mono text-xs text-mist/50">{session.user.email}</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
