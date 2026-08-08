import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/shared/Reveal";
import MonoLabel from "@/components/ui/MonoLabel";
import CountryFlag from "@/components/shared/CountryFlag";
import { getAllCountries } from "@/lib/countries";
import Footer from "@/components/navigation/Footer";

export const metadata: Metadata = {
  title: "Explore Nations",
  description:
    "Browse the World Atlas archive. Currently featuring Indonesia — the world's largest island nation."
};

const REGIONS = ["Europe", "Africa", "Americas", "Oceania"];

export default function ExplorePage() {
  const countries = getAllCountries();

  return (
    <>
      <div className="mx-auto max-w-[1600px] px-5 pb-28 pt-36 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-10">
            <div>
              <MonoLabel tone="accent" className="flex items-center gap-3">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                World Atlas
              </MonoLabel>
              <h1 className="mt-6 font-display text-6xl font-semibold uppercase leading-[0.9] tracking-tight text-paper sm:text-8xl">
                Explore
                <br />
                Nations
              </h1>
            </div>
            <div className="text-right">
              <p className="font-display text-5xl font-semibold text-accent">
                {String(countries.length).padStart(3, "0")}
              </p>
              <MonoLabel>Available</MonoLabel>
            </div>
          </div>
        </Reveal>

        <div className="mt-16">
          <Reveal>
            <div className="flex items-center gap-4">
              <MonoLabel className="text-accent">01 — Asia</MonoLabel>
              <span className="h-px w-10 bg-white/20" />
            </div>
          </Reveal>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {countries.map((country, i) => (
              <Reveal key={country.slug} delay={i * 0.08}>
                <Link
                  href={`/country/${country.slug}`}
                  className="group flex flex-col border border-white/10 transition-colors duration-300 hover:border-accent/60 focus-within:border-accent"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={country.assets.hero}
                      alt={`${country.name} landscape`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute right-4 top-4 border border-white/10 bg-ink/60 px-3 py-1.5 backdrop-blur-sm">
                      <MonoLabel>{country.codes.alpha3}</MonoLabel>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-6">
                    <div>
                      <h2 className="font-display text-3xl font-semibold uppercase leading-none tracking-tight text-paper">
                        {country.name}
                      </h2>
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-mist">
                        {country.geography.region}
                      </p>
                    </div>
                    <ArrowUpRight className="h-6 w-6 text-mist transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" />
                  </div>
                  <div className="border-t border-white/10 px-6 py-4">
                    <CountryFlag
                      src={country.assets.flag}
                      alt={`Flag of ${country.name}`}
                      className="w-10"
                    />
                  </div>
                </Link>
              </Reveal>
            ))}

            <Reveal delay={0.1}>
              <div className="flex aspect-auto min-h-[280px] flex-col items-center justify-center gap-3 border border-dashed border-white/20 bg-panel/50 lg:aspect-[16/9]">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist/50">
                  Next Nation
                </span>
                <span className="font-display text-2xl font-semibold uppercase tracking-tight text-paper/40">
                  Coming Soon
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {REGIONS.map((region, i) => (
            <Reveal key={region} delay={i * 0.06}>
              <div className="border-t border-white/10 pt-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-semibold uppercase tracking-tight text-paper/70">
                    {region}
                  </h3>
                  <MonoLabel className="text-mist/40">00</MonoLabel>
                </div>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-mist/40">
                  Coming soon
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
