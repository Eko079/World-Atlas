import CountrySection from "@/components/country/CountrySection";
import SectionHeader from "@/components/shared/SectionHeader";
import Reveal from "@/components/shared/Reveal";
import MonoLabel from "@/components/ui/MonoLabel";
import DataSourceBadge from "@/components/shared/DataSourceBadge";
import { formatArea, formatCoordinates, formatNumber } from "@/lib/countries/format";
import type { Country } from "@/types/country";

function GeoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-white/10 py-4">
      <MonoLabel>{label}</MonoLabel>
      <span className="text-right font-mono text-sm uppercase tracking-wide text-paper">
        {value}
      </span>
    </div>
  );
}

export default function GeographySection({ country }: { country: Country }) {
  const g = country.geography;
  return (
    <CountrySection id="geography" index="05">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
        <div>
          <SectionHeader
            index="05"
            title="Geography"
            subtitle="A map of the archipelago"
            accent
          />
          <Reveal delay={0.1} className="mt-12">
            <GeoRow label="Continent" value={g.continent} />
            <GeoRow label="Region" value={g.region} />
            <GeoRow label="Subregion" value={g.subregion ?? "—"} />
            <GeoRow
              label="Coordinates"
              value={formatCoordinates(g.representativeCoordinates, "deg")}
            />
            <GeoRow label="Land Area" value={formatArea(g.area, true)} />
            <GeoRow label="Water Area" value={formatArea(g.waterArea, true)} />
            <GeoRow label="Islands" value={`${formatNumber(g.islandCount.value)}+`} />
            <GeoRow label="Provinces" value={String(g.provinces?.value ?? "—")} />
            <GeoRow label="Time Zones" value={String(g.timeZones ?? "—")} />
            <GeoRow label="Highest Point" value={g.highestPoint ?? "—"} />
            <GeoRow label="Longest River" value={g.longestRiver ?? "—"} />
            <div className="flex flex-wrap gap-5 pt-4">
              <DataSourceBadge sourced={g.area} label="Area source" />
              <DataSourceBadge sourced={g.islandCount} label="Island count source" />
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col gap-12">
          <Reveal className="relative overflow-hidden border border-white/10 bg-panel">
            <div className="absolute inset-0 opacity-70" aria-hidden="true">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(50% 60% at 50% 60%, rgba(230,57,70,0.14), transparent 65%)"
                }}
              />
            </div>
            <div className="relative flex aspect-square w-full items-center justify-center p-10">
              <div className="h-full w-full">
                <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden="true">
                  <line x1="0" y1="60" x2="400" y2="60" stroke="#FFFFFF" strokeOpacity="0.05" />
                  <line x1="0" y1="150" x2="400" y2="150" stroke="#FFFFFF" strokeOpacity="0.05" />
                  <line x1="0" y1="240" x2="400" y2="240" stroke="#FFFFFF" strokeOpacity="0.05" />
                  <line x1="100" y1="0" x2="100" y2="300" stroke="#FFFFFF" strokeOpacity="0.05" />
                  <line x1="200" y1="0" x2="200" y2="300" stroke="#FFFFFF" strokeOpacity="0.05" />
                  <line x1="300" y1="0" x2="300" y2="300" stroke="#FFFFFF" strokeOpacity="0.05" />
                  <circle cx="200" cy="120" r="95" fill="none" stroke="#FFFFFF" strokeOpacity="0.15" strokeDasharray="2 4" />
                  {[
                    [150, 90], [230, 85], [180, 140], [260, 140], [140, 180],
                    [220, 190], [290, 100], [190, 60], [250, 190], [120, 130],
                    [300, 180], [170, 220], [260, 230], [320, 130], [110, 170]
                  ].map(([x, y], i) => (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r={i % 3 === 0 ? 6 : 4}
                      fill={i % 3 === 0 ? "#E63946" : "#0B0E13"}
                      stroke={i % 3 === 0 ? "#E63946" : "#FFFFFF"}
                      strokeOpacity={i % 3 === 0 ? 1 : 0.35}
                    />
                  ))}
                  <circle cx="200" cy="120" r="3" fill="#F4F4F2" />
                </svg>
              </div>
            </div>
            <div className="relative flex items-center justify-between border-t border-white/10 px-6 py-4">
              <MonoLabel>Archipelago System</MonoLabel>
              <MonoLabel tone="accent">0° 0′ — Equator</MonoLabel>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <MonoLabel className="mb-4">Surrounding Waters</MonoLabel>
            <div className="flex flex-wrap gap-2">
              {g.seas?.map((sea) => (
                <span
                  key={sea}
                  className="border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-mist"
                >
                  {sea}
                </span>
              ))}
            </div>
            <MonoLabel className="mb-4 mt-8">Neighboring Nations</MonoLabel>
            <div className="flex flex-wrap gap-2">
              {g.neighbors?.map((n) => (
                <span
                  key={n}
                  className="border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-mist"
                >
                  {n}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </CountrySection>
  );
}
