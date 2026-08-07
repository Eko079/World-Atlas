import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountryBySlug, getCountrySources } from "@/lib/countries";
import CountryHero from "@/components/country/CountryHero";
import CountrySectionRail from "@/components/country/CountrySectionRail";
import CountryIntro from "@/components/country/CountryIntro";
import IdentitySection from "@/components/country/IdentitySection";
import LeadershipSection from "@/components/country/LeadershipSection";
import CapitalSection from "@/components/country/CapitalSection";
import GeographySection from "@/components/country/GeographySection";
import PeopleSection from "@/components/country/PeopleSection";
import LanguagesSection from "@/components/country/LanguagesSection";
import EconomySection from "@/components/country/EconomySection";
import LandmarksSection from "@/components/country/LandmarksSection";
import FoodSection from "@/components/country/FoodSection";
import CultureSection from "@/components/country/CultureSection";
import TimelineSection from "@/components/country/TimelineSection";
import GallerySection from "@/components/country/GallerySection";
import SourcesSection from "@/components/country/SourcesSection";

interface CountryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params
}: CountryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const country = getCountryBySlug(slug);

  if (!country) {
    return {
      title: "Nation Not Found"
    };
  }

  const description = `Explore ${country.name} through geography, culture, leadership, landmarks, cuisine and more.`;

  return {
    title: country.name,
    description,
    alternates: {
      canonical: `/country/${country.slug}`
    },
    openGraph: {
      title: `${country.name} — World Atlas`,
      description,
      type: "website",
      siteName: "World Atlas",
      images: [
        {
          url: country.assets.hero,
          width: 1920,
          height: 1080,
          alt: `Cinematic landscape of ${country.name}`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${country.name} — World Atlas`,
      description,
      images: [country.assets.hero]
    }
  };
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);

  if (!country) {
    notFound();
  }

  const sources = getCountrySources(country.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Country",
    name: country.name,
    alternateName: country.identity.officialName,
    sameAs: country.codes.alpha2
      ? `https://www.iso.org/obp/ui/#iso:code:3166:${country.codes.alpha2}`
      : undefined,
    address: {
      "@type": "PostalAddress",
      addressCountry: country.codes.alpha2
    },
    areaSqKm: country.geography.area.value,
    population: country.population.total.value,
    flag: country.assets.flag,
    image: country.assets.hero
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CountryHero country={country} />
      <CountrySectionRail code={country.codes.alpha3} />
      <CountryIntro country={country} />
      <IdentitySection country={country} />
      <LeadershipSection country={country} />
      <CapitalSection country={country} />
      <GeographySection country={country} />
      <PeopleSection country={country} />
      <LanguagesSection country={country} />
      <EconomySection country={country} />
      <LandmarksSection country={country} />
      <FoodSection country={country} />
      <CultureSection country={country} />
      <TimelineSection country={country} />
      <GallerySection country={country} />
      <SourcesSection
        sources={sources}
        reviewedAt={country.meta.lastReviewedAt ?? country.meta.updatedAt}
      />
    </>
  );
}
