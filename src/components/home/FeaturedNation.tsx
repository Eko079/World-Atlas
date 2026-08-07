import Link from "next/link";
import Reveal from "@/components/shared/Reveal";
import SectionHeader from "@/components/shared/SectionHeader";
import StatBlock from "@/components/shared/StatBlock";
import Button from "@/components/ui/Button";
import MonoLabel from "@/components/ui/MonoLabel";
import CountryFlag from "@/components/shared/CountryFlag";
import { formatArea, formatCompact } from "@/lib/utils";
import type { Country } from "@/types/country";

export default function FeaturedNation({ country }: { country: Country }) {
  return (
    <section className="border-t border-white/10">
      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader index="01" title="Featured Nation" accent />
          <Reveal delay={0.1}>
            <MonoLabel>First of 195 — reference blueprint</MonoLabel>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-14">
          <div className="grid border border-white/10 transition-colors duration-500 hover:border-accent/60 lg:grid-cols-[0.6fr_1.4fr]">
            <Link
              href={`/country/${country.slug}`}
              className="group relative block overflow-hidden"
              aria-label={`Enter ${country.name}`}
            >
              <img
                src={country.assets.hero}
                alt={`${country.name} landscape`}
                className="h-full min-h-[320px] w-full object-cover transition-transform duration-700 group-hover:scale-105 lg:min-h-[520px]"
                loading="lazy"
              />
              <div className="absolute left-6 top-6 flex items-center gap-3 border border-white/10 bg-ink/60 px-3 py-2 backdrop-blur-sm">
                <span className="font-display text-2xl font-semibold text-accent">
                  {String(country.index).padStart(3, "0")}
                </span>
                <MonoLabel>{country.name.toUpperCase()}</MonoLabel>
              </div>
              <div className="absolute bottom-6 right-6">
                <span className="border border-white/10 bg-ink/60 px-3 py-2 font-mono text-[11px] tracking-[0.3em] text-paper backdrop-blur-sm">
                  {country.codes.alpha3}
                </span>
              </div>
            </Link>

            <div className="flex flex-col justify-between gap-10 p-8 sm:p-12">
              <div className="grid gap-10 md:grid-cols-[auto_1fr]">
                <CountryFlag
                  src={country.assets.flag}
                  alt={`Flag of ${country.name}`}
                  className="w-24 sm:w-28"
                />
                <div>
                  <Link href={`/country/${country.slug}`} className="inline-block">
                    <h3 className="font-display text-5xl font-semibold uppercase leading-none tracking-tight text-paper transition-colors duration-300 hover:text-accent sm:text-7xl">
                      {country.name}
                    </h3>
                  </Link>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.3em] text-mist">
                    {country.officialName} — {country.geography.region}
                  </p>
                  <p className="mt-6 max-w-md text-sm leading-relaxed text-mist">
                    An archipelago of seventeen thousand islands strung across
                    the equator — a maritime nation of volcanic spines,
                    rainforest, coral and a hundred cultures. This is the first
                    nation archived in the World Atlas.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-6">
                    <div>
                      <MonoLabel>Capital</MonoLabel>
                      <p className="mt-1 font-mono text-sm text-paper">
                        {country.capital.name}
                      </p>
                    </div>
                    <div>
                      <MonoLabel>Continent</MonoLabel>
                      <p className="mt-1 font-mono text-sm text-paper">
                        {country.geography.continent}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="grid grid-cols-3 gap-6">
                  <StatBlock
                    value={`${formatCompact(country.population.total)}+`}
                    label="Population"
                    accent
                  />
                  <StatBlock
                    value={formatArea(country.geography.areaKm2)}
                    label="Land Area"
                  />
                  <StatBlock
                    value={`${formatCompact(country.geography.islands ?? 0)}+`}
                    label="Islands"
                  />
                </div>
                <div className="mt-10 flex justify-end">
                  <Button href={`/country/${country.slug}`} variant="solid">
                    Enter Indonesia
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
