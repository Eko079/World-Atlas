"use client";

import { useFormState } from "react-dom";
import { signInAction } from "@/server/actions/admin/auth";

export default function LoginForm() {
  const [state, formAction] = useFormState(signInAction, null as { error?: string; success?: boolean } | null);

  return (
    <form action={formAction} className="space-y-5">
      {state?.error && (
        <p className="font-mono text-xs text-red-400" role="alert">{state.error}</p>
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
        />
      </div>
      <button
        type="submit"
        className="w-full rounded bg-accent px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-accent-deep"
      >
        Sign In
      </button>
    </form>
  );
}
