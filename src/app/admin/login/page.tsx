import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdminAllowed } from "@/lib/supabase/auth";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login — World Atlas",
  robots: { index: false, follow: false }
};

export default async function LoginPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (session?.user) {
    if (isAdminAllowed(session.user.email)) {
      redirect("/admin");
    }
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
    <div className="min-h-screen bg-ink flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-mist">World Atlas</p>
          <h1 className="mt-3 font-display text-2xl font-semibold uppercase tracking-[0.2em] text-paper">
            Admin Control
          </h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
