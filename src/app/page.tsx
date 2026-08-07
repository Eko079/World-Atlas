import LoadingExperience from "@/components/shared/LoadingExperience";
import HomeHero from "@/components/home/HomeHero";
import FeaturedNation from "@/components/home/FeaturedNation";
import { getCountryBySlug } from "@/lib/countries";

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
