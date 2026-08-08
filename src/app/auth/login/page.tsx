import { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false }
};

export default function LoginPage() {
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
