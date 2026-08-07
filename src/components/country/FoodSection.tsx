import CountrySection from "@/components/country/CountrySection";
import SectionHeader from "@/components/shared/SectionHeader";
import Reveal from "@/components/shared/Reveal";
import MonoLabel from "@/components/ui/MonoLabel";
import type { Country, Food } from "@/types/country";

function FoodCard({ food, index }: { food: Food; index: number }) {
  return (
    <article className="group flex flex-col border border-white/10 transition-colors duration-500 hover:border-accent/60">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={food.image}
          alt={`${food.name} — ${food.region}`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute right-4 top-4 font-display text-4xl font-semibold text-paper/30">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-display text-2xl font-semibold uppercase leading-none tracking-tight text-paper">
            {food.name}
          </h3>
          <MonoLabel tone="accent">{food.region}</MonoLabel>
        </div>
        <p className="flex-1 text-sm leading-relaxed text-mist">
          {food.description}
        </p>
      </div>
    </article>
  );
}

export default function FoodSection({ country }: { country: Country }) {
  return (
    <CountrySection id="cuisine" index="10">
      <SectionHeader
        index="10"
        title="Taste of Indonesia"
        subtitle="An editorial journey through the kitchen of the archipelago"
        accent
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {country.foods.map((food, i) => (
          <Reveal key={food.name} delay={(i % 3) * 0.08}>
            <FoodCard food={food} index={i} />
          </Reveal>
        ))}
      </div>
    </CountrySection>
  );
}
