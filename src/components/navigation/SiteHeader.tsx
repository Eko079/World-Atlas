"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Globe, Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

const MODULES = [
  { code: "01", label: "EXPLORE NATIONS", href: "/explore", available: true },
  { code: "02", label: "WORLD MAP", available: false },
  { code: "03", label: "GLOBAL LEADERS", available: false },
  { code: "04", label: "WORLD CUISINE", available: false },
  { code: "05", label: "CAPITAL CITIES", available: false },
  { code: "06", label: "COMPARE NATIONS", available: false }
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6, ease: EASE }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-white/10 bg-ink/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-[1600px] items-center justify-between px-5 transition-all duration-500 sm:px-8",
            scrolled ? "h-14" : "h-20"
          )}
        >
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="World Atlas home"
          >
            <Globe className="h-5 w-5 text-accent transition-transform duration-500 group-hover:rotate-12" />
            <span className="font-display text-sm font-semibold uppercase tracking-[0.35em] text-paper">
              World Atlas
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            <Link
              href="/explore"
              className="group relative font-mono text-[11px] uppercase tracking-[0.25em] text-mist transition-colors hover:text-paper"
            >
              Explore
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/explore"
              className="group relative font-mono text-[11px] uppercase tracking-[0.25em] text-mist transition-colors hover:text-paper"
            >
              Nations
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-mist/40">
              Culture
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-mist/40">
              About
            </span>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/explore"
              className="flex h-9 w-9 items-center justify-center text-mist transition-colors hover:text-accent"
              aria-label="Search nations"
            >
              <Search className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-9 items-center gap-2 border border-white/15 px-4 font-mono text-[10px] uppercase tracking-[0.25em] text-paper transition-colors hover:border-accent hover:text-accent"
              aria-label="Open command center menu"
            >
              <Menu className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Menu</span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink"
            role="dialog"
            aria-modal="true"
            aria-label="Global Command Center"
          >
            <div className="absolute inset-0 opacity-60" aria-hidden="true">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(60% 50% at 50% 0%, rgba(230,57,70,0.12), transparent 60%)"
                }}
              />
            </div>

            <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist">
                Global Command Center
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex h-9 items-center gap-2 border border-white/15 px-4 font-mono text-[10px] uppercase tracking-[0.25em] text-paper transition-colors hover:border-accent hover:text-accent"
                aria-label="Close menu"
              >
                <X className="h-3.5 w-3.5" />
                Close
              </button>
            </div>

            <div className="relative mx-auto grid w-full max-w-[1200px] flex-1 content-center gap-px overflow-y-auto px-5 py-12 sm:px-8">
              <p className="mb-10 font-mono text-[10px] uppercase tracking-[0.3em] text-mist">
                195 nations — one archive
              </p>
              <div className="grid gap-px sm:grid-cols-2">
                {MODULES.map((mod, i) => (
                  <motion.div
                    key={mod.code}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.5, ease: EASE }}
                  >
                    {mod.available && mod.href ? (
                      <Link
                        href={mod.href}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-center justify-between border-t border-white/10 py-6 transition-colors hover:border-accent sm:py-8"
                      >
                        <div className="flex items-baseline gap-6">
                          <span className="font-mono text-[11px] tracking-[0.2em] text-accent">
                            {mod.code}
                          </span>
                          <span className="font-display text-2xl font-semibold uppercase tracking-tight text-paper transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl">
                            {mod.label}
                          </span>
                        </div>
                        <ArrowUpRight className="h-6 w-6 text-mist transition-colors group-hover:text-accent" />
                      </Link>
                    ) : (
                      <div className="flex items-center justify-between border-t border-white/10 py-6 opacity-50 sm:py-8">
                        <div className="flex items-baseline gap-6">
                          <span className="font-mono text-[11px] tracking-[0.2em] text-mist">
                            {mod.code}
                          </span>
                          <span className="font-display text-2xl font-semibold uppercase tracking-tight text-paper sm:text-4xl">
                            {mod.label}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist">
                          Coming soon
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative flex items-center justify-between border-t border-white/10 px-5 py-4 sm:px-8">
              <span className="font-mono text-[10px] tracking-[0.3em] text-mist/50">
                PLAN-01 — INDONESIA
              </span>
              <span className="font-mono text-[10px] tracking-[0.3em] text-mist/50">
                001 / 195
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
