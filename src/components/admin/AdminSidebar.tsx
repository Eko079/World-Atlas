"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutAction } from "@/server/actions/admin/auth";
import { Globe, LayoutDashboard, Landmark, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/countries", label: "Countries", icon: Globe }
  ];

  return (
    <>
      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 rounded border border-white/15 bg-panel p-2 text-mist hover:text-paper"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 left-0 z-40 h-full w-56 transform border-r border-white/10 bg-panel transition-transform duration-200
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <span className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-paper">
              World Atlas
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="lg:hidden text-mist hover:text-paper"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Admin navigation">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors ${
                    active
                      ? "bg-accent/10 text-accent"
                      : "text-mist hover:bg-white/5 hover:text-paper"
                  }`}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-white/10 px-3 py-4">
            <form action={signOutAction}>
              <button
                type="submit"
                className="flex w-full items-center gap-3 rounded px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-mist transition-colors hover:bg-white/5 hover:text-paper"
              >
                <LogOut className="h-4 w-4 shrink-0" />
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </aside>
    </>
  );
}
