import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountryBySlug } from "@/lib/countries";
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

  return {
    title: country.name,
    description: `Explore ${country.name} through geography, culture, leadership, landmarks, cuisine and more.`,
    openGraph: {
      title: `${country.name} — World Atlas`,
      description: `Explore ${country.name} through geography, culture, leadership, landmarks, cuisine and more.`,
      type: "website"
    }
  };
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);

  if (!country) {
    notFound();
  }

  return (
    <>
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
    </>
  );
}
