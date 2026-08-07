import CountrySection from "@/components/country/CountrySection";
import SectionHeader from "@/components/shared/SectionHeader";
import Reveal from "@/components/shared/Reveal";
import StatBlock from "@/components/shared/StatBlock";
import MonoLabel from "@/components/ui/MonoLabel";
import type { Country } from "@/types/country";

export default function LanguagesSection({ country }: { country: Country }) {
  const l = country.languages;
  return (
    <CountrySection id="languages" index="07">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
        <SectionHeader
          index="07"
          title="Languages"
          subtitle="One voice across many tongues"
          accent
        />

        <div className="flex flex-col gap-10">
          <Reveal>
            <StatBlock
              value={`${l.livingCount ?? 700}+`}
              label="Living Languages"
              accent
            />
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-mist">
              Bahasa Indonesia unites the archipelago — one official tongue
              spoken from Sabang to Merauke — while hundreds of regional
              languages carry the traditions of the islands.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <MonoLabel className="mb-4">Official Language</MonoLabel>
            <div className="flex flex-wrap gap-2">
              {l.official.map((lang) => (
                <span
                  key={lang}
                  className="border border-accent/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-accent"
                >
                  {lang}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <MonoLabel className="mb-4">Regional Languages</MonoLabel>
            <div className="flex flex-wrap gap-2">
              {l.regional?.slice(0, 9).map((lang) => (
                <span
                  key={lang}
                  className="border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-mist"
                >
                  {lang}
                </span>
              ))}
              <span className="border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-mist/50">
                + {Math.max(0, (l.livingCount ?? 700) - 9)} more
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </CountrySection>
  );
}
