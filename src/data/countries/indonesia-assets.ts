import type { MediaAsset } from "@/types/country";

const ORIGIN: Pick<MediaAsset, "source" | "license"> = {
  source: "Procedurally generated for World Atlas",
  license: "Original work"
};

export const indonesiaAssetManifest: MediaAsset[] = [
  {
    path: "/countries/indonesia/hero/indonesia-hero-01.svg",
    alt: "Abstract archipelago panorama of Indonesia at dusk",
    width: 1920,
    height: 1080,
    ...ORIGIN
  },
  {
    path: "/countries/indonesia/flag/indonesia-flag-01.svg",
    alt: "Flag of Indonesia: red above white",
    width: 720,
    height: 480,
    ...ORIGIN
  },
  {
    path: "/countries/indonesia/cities/indonesia-jakarta-01.svg",
    alt: "Jakarta skyline along the bay",
    width: 1600,
    height: 1000,
    ...ORIGIN
  },
  {
    path: "/countries/indonesia/leaders/indonesia-president-01.svg",
    alt: "Portrait placeholder of the President of Indonesia",
    width: 800,
    height: 1000,
    ...ORIGIN
  },
  {
    path: "/countries/indonesia/leaders/indonesia-vice-president-01.svg",
    alt: "Portrait placeholder of the Vice President of Indonesia",
    width: 800,
    height: 1000,
    ...ORIGIN
  },
  {
    path: "/countries/indonesia/landmarks/indonesia-borobudur-01.svg",
    alt: "Borobudur temple silhouette on the Kedu Plain",
    width: 1200,
    height: 900,
    ...ORIGIN
  },
  {
    path: "/countries/indonesia/landmarks/indonesia-bali-01.svg",
    alt: "Terraced rice fields of Bali",
    width: 1200,
    height: 900,
    ...ORIGIN
  },
  {
    path: "/countries/indonesia/landmarks/indonesia-raja-ampat-01.svg",
    alt: "Raja Ampat lagoon from above",
    width: 1200,
    height: 900,
    ...ORIGIN
  },
  {
    path: "/countries/indonesia/landmarks/indonesia-komodo-01.svg",
    alt: "Komodo dragon on a pale volcanic island",
    width: 1200,
    height: 900,
    ...ORIGIN
  },
  {
    path: "/countries/indonesia/landmarks/indonesia-bromo-01.svg",
    alt: "Mount Bromo inside the Sea of Sand caldera",
    width: 1200,
    height: 900,
    ...ORIGIN
  },
  {
    path: "/countries/indonesia/foods/indonesia-rendang-01.svg",
    alt: "Rendang served on a dark plate",
    width: 1000,
    height: 1000,
    ...ORIGIN
  },
  {
    path: "/countries/indonesia/foods/indonesia-nasi-goreng-01.svg",
    alt: "Nasi goreng crowned with a fried egg",
    width: 1000,
    height: 1000,
    ...ORIGIN
  },
  {
    path: "/countries/indonesia/foods/indonesia-satay-01.svg",
    alt: "Satay skewers over charcoal",
    width: 1000,
    height: 1000,
    ...ORIGIN
  },
  {
    path: "/countries/indonesia/foods/indonesia-gado-gado-01.svg",
    alt: "Gado-gado platter with peanut sauce",
    width: 1000,
    height: 1000,
    ...ORIGIN
  },
  {
    path: "/countries/indonesia/foods/indonesia-soto-01.svg",
    alt: "Bowl of golden soto broth",
    width: 1000,
    height: 1000,
    ...ORIGIN
  },
  {
    path: "/countries/indonesia/foods/indonesia-pempek-01.svg",
    alt: "Pempek fish cakes with sweet-and-sour sauce",
    width: 1000,
    height: 1000,
    ...ORIGIN
  },
  {
    path: "/countries/indonesia/culture/indonesia-batik-01.svg",
    alt: "Batik cloth with intricate patterns",
    width: 1200,
    height: 900,
    ...ORIGIN
  },
  {
    path: "/countries/indonesia/culture/indonesia-wayang-01.svg",
    alt: "Wayang shadow puppet behind a screen",
    width: 1200,
    height: 900,
    ...ORIGIN
  },
  {
    path: "/countries/indonesia/culture/indonesia-gamelan-01.svg",
    alt: "Gamelan bronze instruments",
    width: 1200,
    height: 900,
    ...ORIGIN
  },
  {
    path: "/countries/indonesia/culture/indonesia-dance-01.svg",
    alt: "Traditional Indonesian dancer in motion",
    width: 1200,
    height: 900,
    ...ORIGIN
  },
  {
    path: "/countries/indonesia/culture/indonesia-house-01.svg",
    alt: "Traditional Indonesian house with saddle roof",
    width: 1200,
    height: 900,
    ...ORIGIN
  },
  {
    path: "/countries/indonesia/culture/indonesia-clothing-01.svg",
    alt: "Traditional woven clothing detail",
    width: 1200,
    height: 900,
    ...ORIGIN
  },
  {
    path: "/countries/indonesia/gallery/indonesia-gallery-01.svg",
    alt: "Volcanic ridge of Mount Bromo at dawn",
    width: 1200,
    height: 900,
    ...ORIGIN
  },
  {
    path: "/countries/indonesia/gallery/indonesia-gallery-02.svg",
    alt: "Borobudur stupas emerging from morning mist",
    width: 1200,
    height: 900,
    ...ORIGIN
  },
  {
    path: "/countries/indonesia/gallery/indonesia-gallery-03.svg",
    alt: "Batik artisan working with canting",
    width: 1200,
    height: 900,
    ...ORIGIN
  },
  {
    path: "/countries/indonesia/gallery/indonesia-gallery-04.svg",
    alt: "Pusaran skyline of Jakarta at night",
    width: 1200,
    height: 900,
    ...ORIGIN
  },
  {
    path: "/countries/indonesia/gallery/indonesia-gallery-05.svg",
    alt: "Gamelan bronze instruments in close detail",
    width: 1200,
    height: 900,
    ...ORIGIN
  },
  {
    path: "/countries/indonesia/gallery/indonesia-gallery-06.svg",
    alt: "Raja Ampat lagoon from above",
    width: 1200,
    height: 900,
    ...ORIGIN
  }
];

const manifestByPath = new Map(
  indonesiaAssetManifest.map((asset) => [asset.path, asset])
);

export function getAsset(path: string | undefined): MediaAsset | undefined {
  if (!path) return undefined;
  return manifestByPath.get(path);
}

export function assetDimensions(
  path: string | undefined
): { width: number; height: number } | undefined {
  const asset = getAsset(path);
  if (!asset?.width || !asset.height) return undefined;
  return { width: asset.width, height: asset.height };
}
