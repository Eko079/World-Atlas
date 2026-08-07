import CountrySection from "@/components/country/CountrySection";
import SectionHeader from "@/components/shared/SectionHeader";
import Reveal from "@/components/shared/Reveal";
import StatBlock from "@/components/shared/StatBlock";
import MonoLabel from "@/components/ui/MonoLabel";
import DataSourceBadge from "@/components/shared/DataSourceBadge";
import { formatCompact, formatNumber } from "@/lib/countries/format";
import type { Country } from "@/types/country";

export default function PeopleSection({ country }: { country: Country }) {
  const p = country.population;
  const totalValue = p.total?.value;
  const densityValue = p.density?.value ?? 0;
  const urbanValue = p.urbanPercentage?.value ?? 0;
  const maxDensity = 150;
  const densityBar = Math.min(100, (densityValue / maxDensity) * 100);
  const urbanBar = urbanValue;

  return (
    <CountrySection id="people" index="06">
      <SectionHeader
        index="06"
        title="People"
        subtitle="The human geography of the nation"
        accent
      />
      <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-24">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12">
          <Reveal>
            <StatBlock
              value={`${formatCompact(totalValue)}`}
              label="Total Population"
              accent
            />
            <div className="mt-3">
              <DataSourceBadge sourced={p.total} />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <StatBlock value={formatNumber(densityValue)} label="Per km²" />
          </Reveal>
        </div>

        <div className="flex flex-col gap-12">
          <Reveal>
            <div className="flex items-end justify-between">
              <MonoLabel>Urban Population</MonoLabel>
              <span className="font-display text-3xl font-semibold text-paper">
                {urbanValue}%
              </span>
            </div>
            <div className="mt-4 h-px w-full bg-white/10">
              <div
                className="h-full bg-accent"
                style={{ width: `${urbanBar}%` }}
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex items-end justify-between">
              <MonoLabel>Population Density</MonoLabel>
              <span className="font-display text-3xl font-semibold text-paper">
                {formatNumber(densityValue)} / km²
              </span>
            </div>
            <div className="mt-4 h-px w-full bg-white/10">
              <div
                className="h-full bg-accent"
                style={{ width: `${densityBar}%` }}
              />
            </div>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-mist/50">
              Relative to 150/km² benchmark
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <MonoLabel className="mb-4">Major Ethnic Groups</MonoLabel>
            <div className="flex flex-wrap gap-2">
              {p.ethnicGroups?.map((group) => (
                <span
                  key={group}
                  className="border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-mist"
                >
                  {group}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </CountrySection>
  );
}
