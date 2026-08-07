import CountrySection from "@/components/country/CountrySection";
import SectionHeader from "@/components/shared/SectionHeader";
import Reveal from "@/components/shared/Reveal";
import MonoLabel from "@/components/ui/MonoLabel";
import type { Country, CultureItem } from "@/types/country";

function CultureCard({ item }: { item: CultureItem }) {
  return (
    <article className="group relative aspect-[4/3] overflow-hidden border border-white/10 transition-colors duration-500 hover:border-accent/60">
      <img
        src={item.image}
        alt={`${item.title} — ${item.category}`}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
        <div>
          <MonoLabel tone="accent">{item.category}</MonoLabel>
          <h3 className="mt-2 font-display text-3xl font-semibold uppercase leading-none tracking-tight text-paper">
            {item.title}
          </h3>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist">
            {item.description}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function CultureSection({ country }: { country: Country }) {
  return (
    <CountrySection id="culture" index="11">
      <SectionHeader
        index="11"
        title="Culture"
        subtitle="Image-first storytelling of a living heritage"
        accent
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {country.culture.map((item, i) => (
          <Reveal key={item.title} delay={(i % 3) * 0.08}>
            <CultureCard item={item} />
          </Reveal>
        ))}
      </div>
    </CountrySection>
  );
}
