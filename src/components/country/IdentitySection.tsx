import CountrySection from "@/components/country/CountrySection";
import Reveal from "@/components/shared/Reveal";
import MonoLabel from "@/components/ui/MonoLabel";
import CountryFlag from "@/components/shared/CountryFlag";
import type { Country } from "@/types/country";

interface FactRowProps {
  label: string;
  value: string;
}

function FactRow({ label, value }: FactRowProps) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-white/10 py-4">
      <MonoLabel>{label}</MonoLabel>
      <span className="text-right font-mono text-sm uppercase tracking-wide text-paper">
        {value}
      </span>
    </div>
  );
}

export default function IdentitySection({ country }: { country: Country }) {
  return (
    <CountrySection id="identity" index="02">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <Reveal>
          <h2 className="font-display text-4xl font-semibold uppercase leading-none tracking-tight text-paper sm:text-6xl">
            National
            <br />
            Identity
          </h2>
          <p className="mt-8 max-w-md text-[15px] leading-relaxed text-mist">
            The symbols that bind seventeen thousand islands into one nation —
            a flag carried through revolution, and a motto written in a
            language older than the republic itself.
          </p>
          <div className="mt-10 flex items-end gap-8">
            <CountryFlag
              src={country.assets.flag}
              alt={`Flag of ${country.name}`}
              className="w-40 sm:w-52"
            />
            <div className="pb-2">
              <MonoLabel tone="accent">Sang Saka Merah Putih</MonoLabel>
              <p className="mt-2 max-w-[200px] font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-mist">
                The red-and-white banner of the Republic
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="grid sm:grid-cols-2 sm:gap-x-10">
            <FactRow label="Official Name" value={country.identity.officialName} />
            <FactRow label="Local Name" value={country.identity.localName} />
            <FactRow label="ISO Alpha-2" value={country.codes.alpha2} />
            <FactRow label="ISO Alpha-3" value={country.codes.alpha3} />
            <FactRow label="Calling Code" value={country.identity.callingCode} />
            <FactRow label="Internet TLD" value={country.identity.internetTld} />
            <FactRow label="Motto" value={country.identity.motto} />
            <FactRow label="Anthem" value={country.identity.anthem} />
            <div className="py-4">
              <MonoLabel>Independence</MonoLabel>
              <p className="mt-2 font-display text-2xl font-semibold uppercase tracking-tight text-paper">
                {country.identity.independence}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </CountrySection>
  );
}
