import CountrySection from "@/components/country/CountrySection";
import SectionHeader from "@/components/shared/SectionHeader";
import Reveal from "@/components/shared/Reveal";
import MonoLabel from "@/components/ui/MonoLabel";
import type { Country, Landmark } from "@/types/country";

function LandmarkCard({ landmark }: { landmark: Landmark }) {
  return (
    <article className="group flex w-[86vw] shrink-0 snap-start flex-col border border-white/10 transition-colors duration-500 hover:border-accent/60 sm:w-[420px]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={landmark.image}
          alt={`${landmark.name} — ${landmark.location}`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-4 top-4 border border-white/10 bg-ink/60 px-3 py-1.5 backdrop-blur-sm">
          <MonoLabel>{landmark.location}</MonoLabel>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-3xl font-semibold uppercase leading-none tracking-tight text-paper">
          {landmark.name}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-mist">
          {landmark.description}
        </p>
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <MonoLabel>Coordinates</MonoLabel>
          <span className="font-mono text-[11px] tracking-[0.15em] text-paper">
            {landmark.coordinates}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function LandmarksSection({ country }: { country: Country }) {
  return (
    <CountrySection id="landmarks" index="09" size="full">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            index="09"
            title="Landmarks"
            subtitle="Places that define the islands"
            accent
          />
          <Reveal delay={0.1}>
            <MonoLabel className="hidden sm:block">
              Scroll horizontally →
            </MonoLabel>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.15} className="mt-12">
        <div className="flex gap-5 overflow-x-auto px-5 pb-6 pt-2 no-scrollbar h-scroll sm:px-8 lg:px-[max(2rem,calc((100vw-1600px)/2+2rem))]">
          {country.landmarks.map((landmark) => (
            <LandmarkCard key={landmark.name} landmark={landmark} />
          ))}
        </div>
      </Reveal>
    </CountrySection>
  );
}
