import { Metadata } from "next";
import LoadingExperience from "@/components/shared/LoadingExperience";
import HomeHero from "@/components/home/HomeHero";
import FeaturedNation from "@/components/home/FeaturedNation";
import { getCountryBySlug } from "@/lib/countries";

export const metadata: Metadata = {
  title: "World Atlas — Explore Nations",
  description:
    "A cinematic interactive atlas. Explore countries through geography, culture, leadership, landmarks, cuisine and more.",
  openGraph: {
    title: "World Atlas",
    description: "A cinematic interactive atlas of the world's nations.",
    type: "website"
  }
};

export default function HomePage() {
  const indonesia = getCountryBySlug("indonesia")!;

  return (
    <>
      <LoadingExperience />
      <HomeHero country={indonesia} />
      <FeaturedNation country={indonesia} />
    </>
  );
}
