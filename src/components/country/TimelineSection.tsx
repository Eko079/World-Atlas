import CountrySection from "@/components/country/CountrySection";
import SectionHeader from "@/components/shared/SectionHeader";
import Reveal from "@/components/shared/Reveal";
import MonoLabel from "@/components/ui/MonoLabel";
import type { Country, TimelineEvent } from "@/types/country";

function TimelineRow({ event }: { event: TimelineEvent }) {
  return (
    <div className="group relative grid gap-3 border-b border-white/10 py-10 sm:grid-cols-[160px_1fr_2fr] sm:gap-8">
      <div>
        <span className="font-display text-2xl font-semibold uppercase tracking-tight text-accent sm:text-3xl">
          {event.year}
        </span>
      </div>
      <h3 className="font-display text-2xl font-semibold uppercase leading-none tracking-tight text-paper">
        {event.title}
      </h3>
      <p className="max-w-xl text-sm leading-relaxed text-mist">
        {event.description}
      </p>
    </div>
  );
}

export default function TimelineSection({ country }: { country: Country }) {
  return (
    <CountrySection id="timeline" index="12">
      <SectionHeader
        index="12"
        title="Timeline"
        subtitle="Chapters in the history of the Republic"
        accent
      />
      <div className="mt-14">
        <div className="flex items-center gap-4 pb-2">
          <MonoLabel>Era</MonoLabel>
          <span className="h-px flex-1 bg-white/10" />
          <MonoLabel>{country.timeline.length} chapters</MonoLabel>
        </div>
        {country.timeline.map((event, i) => (
          <Reveal key={event.id} delay={i * 0.06}>
            <TimelineRow event={event} />
          </Reveal>
        ))}
      </div>
    </CountrySection>
  );
}
