import CountrySection from "@/components/country/CountrySection";
import SectionHeader from "@/components/shared/SectionHeader";
import Reveal from "@/components/shared/Reveal";
import MonoLabel from "@/components/ui/MonoLabel";
import type { Country, GalleryImage } from "@/types/country";

function GalleryItem({ image, wide }: { image: GalleryImage; wide?: boolean }) {
  return (
    <figure
      className={`group relative overflow-hidden border border-white/10 ${
        wide ? "sm:col-span-2" : ""
      }`}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <MonoLabel>{image.alt}</MonoLabel>
        <MonoLabel tone="accent">{image.category}</MonoLabel>
      </figcaption>
    </figure>
  );
}

export default function GallerySection({ country }: { country: Country }) {
  return (
    <CountrySection id="gallery" index="13" size="full">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <SectionHeader
          index="13"
          title={`${country.name} in Frame`}
          subtitle="The islands as seen through the lens"
          accent
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {country.gallery.map((image, i) => (
            <Reveal key={image.path} delay={(i % 3) * 0.08}>
              <GalleryItem image={image} wide={image.span === "wide"} />
            </Reveal>
          ))}
        </div>
      </div>
    </CountrySection>
  );
}
