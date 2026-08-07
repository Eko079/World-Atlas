import CountrySection from "@/components/country/CountrySection";
import SectionHeader from "@/components/shared/SectionHeader";
import Reveal from "@/components/shared/Reveal";
import StatBlock from "@/components/shared/StatBlock";
import MonoLabel from "@/components/ui/MonoLabel";
import DataSourceBadge from "@/components/shared/DataSourceBadge";
import { formatGdpStat } from "@/lib/countries/format";
import type { Country } from "@/types/country";

export default function EconomySection({ country }: { country: Country }) {
  const c = country.economy;
  return (
    <CountrySection id="economy" index="08">
      <SectionHeader
        index="08"
        title="Economy"
        subtitle="The engine of the archipelago"
        accent
      />
      <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-24">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12">
          <Reveal>
            <StatBlock
              value={c.currency.symbol}
              label={`${c.currency.name} (${c.currency.code})`}
              accent
            />
          </Reveal>
          <Reveal delay={0.08}>
            <StatBlock value={formatGdpStat(c.gdp)} label="GDP (Nominal)" />
            <div className="mt-3">
              <DataSourceBadge sourced={c.gdp} />
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <StatBlock value={formatGdpStat(c.gdpPerCapita)} label="GDP Per Capita" />
          </Reveal>
          <Reveal delay={0.16}>
            <StatBlock value={c.currency.code} label="Currency Code" />
          </Reveal>
        </div>

        <div className="flex flex-col gap-12">
          <Reveal>
            <MonoLabel className="mb-4">Major Industries</MonoLabel>
            <div className="flex flex-wrap gap-2">
              {c.industries?.map((ind) => (
                <span
                  key={ind}
                  className="border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-mist"
                >
                  {ind}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <MonoLabel className="mb-4">Major Exports</MonoLabel>
            <div className="flex flex-wrap gap-2">
              {c.exports?.map((exp) => (
                <span
                  key={exp}
                  className="border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-mist"
                >
                  {exp}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="border border-white/10 bg-panel p-6">
              <MonoLabel tone="accent">Did You Know</MonoLabel>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-mist">
                Indonesia is the world&apos;s largest exporter of palm oil and a
                leading global supplier of nickel, coal and natural gas — the
                commodity engine of Southeast Asia&apos;s largest economy.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </CountrySection>
  );
}
