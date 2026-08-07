import CountrySection from "@/components/country/CountrySection";
import SectionHeader from "@/components/shared/SectionHeader";
import Reveal from "@/components/shared/Reveal";
import MonoLabel from "@/components/ui/MonoLabel";
import { formatTerm } from "@/lib/countries/format";
import type { Country, Leader } from "@/types/country";

function LeaderCard({ leader, accent }: { leader: Leader; accent?: boolean }) {
  return (
    <div className="group flex flex-col border border-white/10 transition-colors duration-500 hover:border-accent/60">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={leader.image}
          alt={`Portrait of ${leader.name}`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          {accent && (
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          )}
          <MonoLabel className="border border-white/10 bg-ink/60 px-2.5 py-1.5 backdrop-blur-sm">
            {leader.position}
          </MonoLabel>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-6">
        <h3 className="font-display text-2xl font-semibold uppercase tracking-tight text-paper">
          {leader.name}
        </h3>
        <MonoLabel>{leader.constitutionalRoles?.[0] ?? leader.position}</MonoLabel>
        <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-4">
          <MonoLabel>Term</MonoLabel>
          <span className="font-mono text-xs tracking-[0.15em] text-paper">
            {formatTerm(leader.term)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function LeadershipSection({ country }: { country: Country }) {
  return (
    <CountrySection id="leadership" index="03">
      <SectionHeader
        index="03"
        title="Leadership"
        subtitle="The people at the head of the Republic"
        accent
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:max-w-4xl">
        {country.government.leadership.map((leader, i) => (
          <Reveal key={leader.id} delay={i * 0.08}>
            <LeaderCard leader={leader} accent={i === 0} />
          </Reveal>
        ))}
      </div>
    </CountrySection>
  );
}
