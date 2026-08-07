import CountrySection from "@/components/country/CountrySection";
import SectionHeader from "@/components/shared/SectionHeader";
import Reveal from "@/components/shared/Reveal";
import MonoLabel from "@/components/ui/MonoLabel";
import { formatDate } from "@/lib/countries/format";
import type { DataSource } from "@/types/country";

export default function SourcesSection({
  sources,
  reviewedAt
}: {
  sources: DataSource[];
  reviewedAt?: string;
}) {
  return (
    <CountrySection id="sources" index="14">
      <SectionHeader
        index="14"
        title="Sources"
        subtitle="Where the data comes from"
        accent
      />
      <Reveal delay={0.1} className="mt-12">
        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {sources.map((source) => (
            <div key={`${source.name}-${source.publication ?? ""}`} className="bg-ink p-6">
              <MonoLabel className="text-accent">
                {source.name}
              </MonoLabel>
              {source.publication && (
                <p className="mt-3 font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-mist">
                  {source.publication}
                </p>
              )}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                {source.url ? (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] tracking-[0.15em] text-paper underline decoration-white/20 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                  >
                    {source.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </a>
                ) : (
                  <span className="font-mono text-[10px] tracking-[0.15em] text-mist/50">
                    Institutional record
                  </span>
                )}
                {source.accessedAt && (
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-mist/40">
                    accessed {formatDate(source.accessedAt)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-2xl font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-mist/50">
          {reviewedAt
            ? `Facts reviewed ${formatDate(reviewedAt)} against the publications above. Figures are estimates published by the cited institutions and may be revised.`
            : "Figures are estimates published by the cited institutions and may be revised."}
        </p>
      </Reveal>
    </CountrySection>
  );
}
