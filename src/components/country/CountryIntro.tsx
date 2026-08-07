import CountrySection from "@/components/country/CountrySection";
import Reveal from "@/components/shared/Reveal";
import StatBlock from "@/components/shared/StatBlock";
import { formatArea, formatNumber } from "@/lib/countries/format";
import type { Country } from "@/types/country";

export default function CountryIntro({ country }: { country: Country }) {
  return (
    <CountrySection id="intro" index="01">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
        <Reveal>
          <h2 className="font-display text-4xl font-semibold uppercase leading-[0.9] tracking-tight text-paper sm:text-6xl">
            The Archipelago
          </h2>
          <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-mist">
            <p>
              Stretching across the equator between two oceans, {country.name}{" "}
              is the world&apos;s largest island nation — a chain of volcanic peaks
              rising from the sea floor, cloaked in rainforest and ringed by
              the most biodiverse reefs on Earth.
            </p>
            <p>
              For millennia its straits carried traders, faiths and languages
              between Asia and Oceania. Today the Republic holds them together
              as a single nation — one of the most plural societies on the
              planet, bound by a common language and a shared motto: unity in
              diversity.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-8 gap-y-12">
          <Reveal delay={0.05}>
            <StatBlock
              value={`${formatNumber(country.geography.islandCount.value)}+`}
              label="Islands"
              accent
            />
          </Reveal>
          <Reveal delay={0.1}>
            <StatBlock
              value={String(country.geography.provinces?.value ?? "—")}
              label="Provinces"
            />
          </Reveal>
          <Reveal delay={0.15}>
            <StatBlock
              value={String(country.geography.timeZones ?? "—")}
              label="Time Zones"
            />
          </Reveal>
          <Reveal delay={0.2}>
            <StatBlock
              value={formatArea(country.geography.area, true)}
              label="Land Area"
            />
          </Reveal>
        </div>
      </div>
    </CountrySection>
  );
}
