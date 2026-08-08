"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    // Redirect to admin dashboard
    window.location.href = "/admin";
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error && (
        <p className="font-mono text-xs text-red-400" role="alert">{error}</p>
      )}
      <div>
        <label htmlFor="email" className="block font-mono text-[10px] uppercase tracking-[0.2em] text-mist mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded border border-white/15 bg-panel px-3 py-2.5 font-mono text-sm text-paper placeholder-mist/40 focus:border-accent focus:outline-none"
          placeholder="admin@example.com"
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="password" className="block font-mono text-[10px] uppercase tracking-[0.2em] text-mist mb-2">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded border border-white/15 bg-panel px-3 py-2.5 font-mono text-sm text-paper placeholder-mist/40 focus:border-accent focus:outline-none"
          placeholder="••••••••"
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-accent px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-accent-deep disabled:opacity-50"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
