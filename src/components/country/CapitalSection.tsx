import CountrySection from "@/components/country/CountrySection";
import Reveal from "@/components/shared/Reveal";
import MonoLabel from "@/components/ui/MonoLabel";
import { formatCompact } from "@/lib/utils";
import type { Country } from "@/types/country";

export default function CapitalSection({ country }: { country: Country }) {
  const cap = country.capital;
  return (
    <CountrySection id="capital" index="04">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative overflow-hidden border border-white/10">
          <img
            src={cap.image}
            alt={`Cinematic view of ${cap.name}`}
            className="aspect-[4/3] w-full object-cover lg:aspect-auto lg:h-full"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <MonoLabel tone="accent">The Capital</MonoLabel>
            <h2 className="mt-2 font-display text-5xl font-semibold uppercase leading-none tracking-tight text-paper sm:text-7xl">
              {cap.name}
            </h2>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.3em] text-mist">
              {cap.coordinates}
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col justify-center">
          <Reveal>
            <MonoLabel tone="accent" className="flex items-center gap-3">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              Capital
            </MonoLabel>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-mist">
              {cap.description}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <div className="grid grid-cols-2 gap-x-10 gap-y-8">
              <div className="border-t border-white/10 pt-5">
                <MonoLabel>Population</MonoLabel>
                <p className="mt-2 font-display text-3xl font-semibold text-paper">
                  {formatCompact(cap.population ?? 0)}
                </p>
              </div>
              <div className="border-t border-white/10 pt-5">
                <MonoLabel>Province</MonoLabel>
                <p className="mt-2 font-mono text-sm uppercase leading-relaxed tracking-wide text-paper">
                  {cap.province}
                </p>
              </div>
              <div className="border-t border-white/10 pt-5">
                <MonoLabel>Timezone</MonoLabel>
                <p className="mt-2 font-mono text-sm tracking-wide text-paper">
                  {cap.timezone}
                </p>
              </div>
              <div className="border-t border-white/10 pt-5">
                <MonoLabel>Coordinates</MonoLabel>
                <p className="mt-2 font-mono text-sm tracking-wide text-paper">
                  {cap.coordinates}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </CountrySection>
  );
}
