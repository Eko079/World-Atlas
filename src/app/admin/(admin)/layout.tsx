import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdminAllowed } from "@/lib/supabase/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center px-4">
        <div className="text-center">
          <p className="font-display text-xl font-semibold text-paper uppercase">Configuration Required</p>
          <p className="mt-3 font-mono text-sm text-mist">
            Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in your environment.
          </p>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-ink text-paper">
      <AdminSidebar />
      <main className="lg:pl-56">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
