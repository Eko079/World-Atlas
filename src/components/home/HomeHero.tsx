"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import MonoLabel from "@/components/ui/MonoLabel";
import type { Country } from "@/types/country";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function HomeHero({ country }: { country: Country }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
      aria-label="Featured country"
    >
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src={country.assets.hero}
          alt="Cinematic landscape of Indonesia"
          className="h-[115%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 60% at 50% 40%, transparent 40%, rgba(7,9,12,0.9) 100%)"
          }}
        />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 flex flex-1 flex-col"
      >
        <div className="flex items-center justify-between px-5 pt-28 sm:px-8">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.8, ease: EASE }}
            className="font-mono text-[11px] uppercase tracking-[0.35em] text-paper/70"
          >
            World Atlas
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="font-mono text-[11px] tracking-[0.3em] text-mist"
          >
            001 / 195
          </motion.p>
        </div>

        <div className="flex flex-1 flex-col justify-center px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.9, ease: EASE }}
          >
            <MonoLabel tone="accent" className="flex items-center gap-3">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              Explore
            </MonoLabel>
          </motion.div>

          <div className="mt-6 overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 2.2, duration: 1.1, ease: EASE }}
              className="font-display text-[18vw] font-semibold uppercase leading-[0.85] tracking-tight text-paper sm:text-[14vw] lg:text-[11rem]"
            >
              {country.name}
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.9, duration: 0.9, ease: EASE }}
            className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <p className="font-mono text-sm uppercase tracking-[0.3em] text-paper">
                {country.officialName}
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.3em] text-mist">
                {country.geography.region}
              </p>
              <div className="mt-6 flex items-center gap-8">
                <div>
                  <MonoLabel>Capital</MonoLabel>
                  <p className="mt-1 font-mono text-sm text-paper">
                    {country.capital.name}
                  </p>
                </div>
                <div>
                  <MonoLabel>Region</MonoLabel>
                  <p className="mt-1 font-mono text-sm text-paper">
                    {country.geography.region}
                  </p>
                </div>
                <div>
                  <MonoLabel>ISO</MonoLabel>
                  <p className="mt-1 font-mono text-sm text-paper">
                    {country.codes.alpha2} / {country.codes.alpha3}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button href={`/country/${country.slug}`} variant="solid">
                Explore Country
              </Button>
              <Button href="/explore" variant="outline">
                Discover World
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 1 }}
          className="flex items-center justify-between px-5 pb-8 sm:px-8"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-mist/60">
            06° S — 107° E
          </span>
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-mist/60">
              Scroll
            </span>
            <motion.span
              animate={reduce ? undefined : { y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="h-4 w-4 text-mist" />
            </motion.span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
