"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import MonoLabel from "@/components/ui/MonoLabel";
import { formatCoordinates } from "@/lib/countries/format";
import type { Country } from "@/types/country";

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
          <p
            className="hero-enter font-mono text-[11px] uppercase tracking-[0.35em] text-paper/70"
            style={{ animationDelay: "1.7s" }}
          >
            World Atlas
          </p>
          <p
            className="hero-enter font-mono text-[11px] tracking-[0.3em] text-mist"
            style={{ animationDelay: "1.8s" }}
          >
            001 / 195
          </p>
        </div>

        <div className="flex flex-1 flex-col justify-center px-5 sm:px-8">
          <div
            className="hero-enter flex items-center gap-3"
            style={{ animationDelay: "1.7s" }}
          >
            <MonoLabel tone="accent" className="flex items-center gap-3">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              Explore
            </MonoLabel>
          </div>

          <div className="mt-6 overflow-hidden">
            <h1
              className="hero-title font-display text-[18vw] font-semibold uppercase leading-[0.85] tracking-tight text-paper sm:text-[14vw] lg:text-[11rem]"
              style={{ animationDelay: "1.85s" }}
            >
              {country.name}
            </h1>
          </div>

          <div
            className="hero-enter mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
            style={{ animationDelay: "2.1s" }}
          >
            <div>
              <p className="font-mono text-sm uppercase tracking-[0.3em] text-paper">
                {country.identity.officialName}
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.3em] text-mist">
                {country.geography.region}
              </p>
              <div className="mt-6 flex items-center gap-8">
                <div>
                  <MonoLabel>Capital</MonoLabel>
                  <p className="mt-1 font-mono text-sm text-paper">
                    {country.capital.primaryDisplay}
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
          </div>
        </div>

        <div
          className="hero-fade flex items-center justify-between px-5 pb-8 sm:px-8"
          style={{ animationDelay: "2.4s" }}
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-mist/60">
            {formatCoordinates(country.geography.representativeCoordinates, "deg")}
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
        </div>
      </motion.div>
    </section>
  );
}
