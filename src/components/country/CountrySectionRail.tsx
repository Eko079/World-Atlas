const SECTIONS = [
  { id: "identity", label: "Identity" },
  { id: "leadership", label: "Leadership" },
  { id: "capital", label: "Capital" },
  { id: "geography", label: "Geography" },
  { id: "people", label: "People" },
  { id: "languages", label: "Languages" },
  { id: "economy", label: "Economy" },
  { id: "landmarks", label: "Landmarks" },
  { id: "cuisine", label: "Cuisine" },
  { id: "culture", label: "Culture" },
  { id: "timeline", label: "Timeline" },
  { id: "gallery", label: "Gallery" }
];

export default function CountrySectionRail({ code }: { code: string }) {
  return (
    <aside className="pointer-events-none fixed right-8 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-6 xl:flex">
      <span className="font-mono text-[9px] tracking-[0.4em] text-mist/50 [writing-mode:vertical-rl]">
        {code} — {SECTIONS.length} SECTIONS
      </span>
      <nav
        aria-label="Country sections"
        className="pointer-events-auto flex flex-col items-center gap-2.5"
      >
        {SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="group flex items-center gap-2"
            aria-label={section.label}
          >
            <span className="h-1 w-1 rounded-full bg-white/25 transition-all duration-300 group-hover:w-4 group-hover:rounded-none group-hover:bg-accent" />
          </a>
        ))}
      </nav>
      <span className="font-mono text-[9px] tracking-[0.4em] text-mist/50 [writing-mode:vertical-rl]">
        ARCHIVE
      </span>
    </aside>
  );
}
