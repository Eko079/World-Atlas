"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import MonoLabel from "@/components/ui/MonoLabel";
import type { Country } from "@/types/country";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function CountryHero({ country }: { country: Country }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "15%"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
      aria-label={`${country.name} introduction`}
    >
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src={country.assets.hero}
          alt={`Cinematic landscape of ${country.name}`}
          className="h-[115%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/50 to-ink" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(90% 70% at 50% 30%, transparent 30%, rgba(7,9,12,0.92) 100%)"
          }}
        />
      </motion.div>

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="flex items-center justify-between px-5 pt-28 sm:px-8">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
            className="font-mono text-[11px] uppercase tracking-[0.35em] text-paper/70"
          >
            World Atlas / {country.geography.region}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-mono text-[11px] tracking-[0.3em] text-mist"
          >
            {String(country.index).padStart(3, "0")} / NATION
          </motion.p>
        </div>

        <div className="relative flex flex-1 flex-col justify-center px-5 sm:px-8">
          <div className="grid lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.8, ease: EASE }}
              >
                <MonoLabel tone="accent" className="flex items-center gap-3">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                  {country.officialName}
                </MonoLabel>
              </motion.div>

              <div className="mt-4 overflow-hidden">
                <motion.h1
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.45, duration: 1.1, ease: EASE }}
                  className="font-display text-[20vw] font-semibold uppercase leading-[0.85] tracking-tight text-paper sm:text-[15vw] lg:text-[13rem]"
                >
                  {country.name}
                </motion.h1>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.9, ease: EASE }}
                className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-3"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-paper">
                  {country.localName}
                </span>
                <span className="h-3 w-px bg-white/20" aria-hidden="true" />
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-mist">
                  {country.geography.coordinates}
                </span>
                <span className="h-3 w-px bg-white/20" aria-hidden="true" />
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-mist">
                  {country.geography.region}
                </span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.9, ease: EASE }}
              className="mt-10 hidden lg:block"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="aspect-[2/3] w-28 overflow-hidden border border-white/15">
                  <img
                    src={country.assets.flag}
                    alt={`Flag of ${country.name}`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="font-display text-3xl font-semibold text-paper">
                    {country.codes.alpha3}
                  </span>
                  <MonoLabel>{country.capital.name}</MonoLabel>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 1 }}
          className="relative z-10 flex items-center justify-between px-5 pb-8 sm:px-8"
        >
          <div className="flex items-center gap-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist/70">
              {country.codes.alpha2} / {country.codes.alpha3}
            </span>
            <span className="hidden h-3 w-px bg-white/20 sm:block" aria-hidden="true" />
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-mist/70 sm:block">
              Capital — {country.capital.name}
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-mist/60">
              Descend
            </span>
            <motion.span
              animate={reduce ? undefined : { y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="h-4 w-4 text-mist" />
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
