import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";

config({ path: ".env.local" });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set.");
}

const client = postgres(connectionString, { prepare: false });
const db = drizzle(client, { schema });

async function seed() {
  console.log("Starting seed...");

  // Upsert country
  const [country] = await db
    .insert(schema.countries)
    .values({
      slug: "indonesia",
      name: "Indonesia",
      officialName: "Republic of Indonesia",
      localName: "Republik Indonesia",
      motto: "Bhinneka Tunggal Ika",
      anthem: "Indonesia Raya",
      independence: "17 August 1945",
      demonym: "Indonesian",
      isoAlpha2: "ID",
      isoAlpha3: "IDN",
      isoNumeric: "360",
      callingCode: "+62",
      internetTld: ".id",
      continent: "Asia",
      region: "Southeast Asia",
      subregion: "Maritime Southeast Asia",
      displayOrder: 1,
      schemaVersion: "1.1"
    })
    .onConflictDoUpdate({
      target: schema.countries.slug,
      set: { updatedAt: new Date() }
    })
    .returning({ id: schema.countries.id });

  const countryId = country.id;
  console.log(`  Country: Indonesia (id: ${countryId})`);

  // Upsert sources
  const sourceRows = [
    { org: "Badan Pusat Statistik (BPS)", pub: "Proyeksi Penduduk Indonesia 2020–2050", url: "https://www.bps.go.id", accessed: "2026-08-07" },
    { org: "Geospatial Information Agency (BIG)", pub: "Survei Penataan Nama Rupabumi", url: "https://www.big.go.id", accessed: "2026-08-07" },
    { org: "International Monetary Fund", pub: "World Economic Outlook, April 2025", url: "https://www.imf.org" },
    { org: "World Bank", pub: "World Development Indicators", url: "https://data.worldbank.org", accessed: "2026-08-07" },
    { org: "General Elections Commission (KPU)", pub: "Pemilihan Umum 2024", url: "https://www.kpu.go.id", accessed: "2026-08-07" },
    { org: "Undang-Undang Ibu Kota Negara", pub: "Law 3/2022" },
    { org: "Ethnologue (SIL International)", pub: "Languages of Indonesia", url: "https://www.ethnologue.com", accessed: "2026-08-07" }
  ];
  const sourceIdMap = new Map<string, string>();
  for (const src of sourceRows) {
    const [s] = await db
      .insert(schema.sources)
      .values({
        organization: src.org,
        publication: src.pub,
        url: src.url ?? null,
        accessedAt: src.accessed ? new Date(src.accessed) : null
      })
      .onConflictDoNothing()
      .returning({ id: schema.sources.id });
    if (s) sourceIdMap.set(src.org, s.id);
  }
  console.log(`  Sources: ${sourceIdMap.size} inserted`);

  // Capital — no unique constraint on country_id, use upsert via update
  const existingCap = await db.select().from(schema.capitals).where(eq(schema.capitals.countryId, countryId)).limit(1);
  if (existingCap.length > 0) {
    await db.update(schema.capitals)
      .set({
        primaryDisplay: "Jakarta",
        status: "Legal capital, with the administrative seat transitioning to Nusantara",
        currentAdministrativeCenter: "Jakarta (special capital region)",
        designatedCapital: "Nusantara",
        futureCapital: "Nusantara (IKN), East Kalimantan",
        transitionStatus: "In progress — staged relocation of government functions",
        transitionTargetYear: 2045,
        notes: "Under Law 3/2022 on the State Capital (UU IKN), Nusantara is designated to replace Jakarta. Jakarta remains the de jure capital until a Presidential Decree formalizes the transfer.",
        latitude: -6.2088,
        longitude: 106.8456,
        population: 10680000,
        province: "Special Capital Region of Jakarta (DKI Jakarta)",
        timezone: "WIB (UTC+7)",
        description: "A dense metropolis on the northwest coast of Java, Jakarta is Indonesia's political and economic heart.",
        imagePath: "/countries/indonesia/cities/indonesia-jakarta-01.svg",
        updatedAt: new Date()
      })
      .where(eq(schema.capitals.countryId, countryId));
  } else {
    await db.insert(schema.capitals).values({
      countryId,
      primaryDisplay: "Jakarta",
      status: "Legal capital, with the administrative seat transitioning to Nusantara",
      currentAdministrativeCenter: "Jakarta (special capital region)",
      designatedCapital: "Nusantara",
      futureCapital: "Nusantara (IKN), East Kalimantan",
      transitionStatus: "In progress — staged relocation of government functions",
      transitionTargetYear: 2045,
      notes: "Under Law 3/2022 on the State Capital (UU IKN), Nusantara is designated to replace Jakarta. Jakarta remains the de jure capital until a Presidential Decree formalizes the transfer.",
      latitude: -6.2088,
      longitude: 106.8456,
      population: 10680000,
      province: "Special Capital Region of Jakarta (DKI Jakarta)",
      timezone: "WIB (UTC+7)",
      description: "A dense metropolis on the northwest coast of Java, Jakarta is Indonesia's political and economic heart.",
      imagePath: "/countries/indonesia/cities/indonesia-jakarta-01.svg",
      displayOrder: 0
    });
  }
  console.log("  Capital: inserted/updated");

  // Leaders — unique on slug
  const leadersData = [
    { slug: "prabowo-subianto", name: "Prabowo Subianto", position: "President", roles: ["Head of State", "Head of Government", "Commander-in-Chief"], termStart: "2024-10-20", termEnd: null, image: "/countries/indonesia/leaders/indonesia-president-01.svg" },
    { slug: "gibran-rakabuming-raka", name: "Gibran Rakabuming Raka", position: "Vice President", roles: ["Deputy Head of State"], termStart: "2024-10-20", termEnd: null, image: "/countries/indonesia/leaders/indonesia-vice-president-01.svg" }
  ];
  for (const leader of leadersData) {
    await db
      .insert(schema.leaders)
      .values({
        countryId,
        slug: leader.slug,
        name: leader.name,
        position: leader.position,
        roles: leader.roles,
        termStart: new Date(leader.termStart),
        termEnd: leader.termEnd ? new Date(leader.termEnd) : null,
        isCurrent: !leader.termEnd,
        imagePath: leader.image,
        displayOrder: 0
      })
      .onConflictDoUpdate({
        target: schema.leaders.slug,
        set: { name: leader.name, position: leader.position, updatedAt: new Date() }
      });
  }
  console.log(`  Leaders: ${leadersData.length} inserted`);

  // Statistics — unique on (country_id, key)
  const statsData = [
    { category: "demographics", key: "population", value: 284670000, unit: "people", year: 2025 },
    { category: "demographics", key: "density", value: 149, unit: "people/km²", year: 2025 },
    { category: "demographics", key: "urban_percentage", value: 57, unit: "%", year: 2023 },
    { category: "geography", key: "area", value: 1904569, unit: "km²", year: 2025 },
    { category: "geography", key: "water_area", value: 93000, unit: "km²", year: 2025 },
    { category: "geography", key: "island_count", value: 17380, unit: "islands", year: 2024 },
    { category: "geography", key: "provinces", value: 38, unit: "provinces", year: 2022 },
    { category: "languages", key: "living_count", value: 718, unit: "languages", year: 2024 },
    { category: "economy", key: "gdp", value: 23821, unit: "trillion", year: 2025 },
    { category: "economy", key: "gdp_per_capita", value: 83.7, unit: "million", year: 2025 },
    { category: "economy", key: "gdp_per_capita_usd", value: 4674, unit: "USD", year: 2025 }
  ];
  for (const stat of statsData) {
    await db
      .insert(schema.countryStatistics)
      .values({
        countryId,
        category: stat.category,
        key: stat.key,
        numericValue: stat.value,
        unit: stat.unit,
        referenceYear: stat.year
      })
      .onConflictDoUpdate({
        target: [schema.countryStatistics.countryId, schema.countryStatistics.key],
        set: { numericValue: stat.value, updatedAt: new Date() }
      });
  }
  console.log(`  Statistics: ${statsData.length} inserted`);

  // Languages
  const officialLangs = ["Bahasa Indonesia"];
  const regionalLangs = ["Javanese", "Sundanese", "Madurese", "Balinese", "Buginese", "Minangkabau", "Batak", "Acehnese", "Papuan Languages"];
  for (const [i, lang] of [...officialLangs, ...regionalLangs].entries()) {
    const type = i < officialLangs.length ? "official" : "regional";
    await db.insert(schema.languages).values({ countryId, name: lang, type, displayOrder: i }).onConflictDoNothing();
  }
  console.log(`  Languages: ${officialLangs.length} official + ${regionalLangs.length} regional`);

  // Landmarks — unique on slug
  const landmarksData = [
    { slug: "borobudur", name: "Borobudur", location: "Central Java", coords: "07°36′S 110°12′E", desc: "The world's largest Buddhist temple, a ninth-century stone mandala of over two million blocks rising from the Kedu Plain.", img: "/countries/indonesia/landmarks/indonesia-borobudur-01.svg" },
    { slug: "bali", name: "Bali", location: "Lesser Sunda Islands", coords: "08°30′S 115°00′E", desc: "Terraced rice fields, temple coastlines and volcanic ridges — the island of a thousand temples.", img: "/countries/indonesia/landmarks/indonesia-bali-01.svg" },
    { slug: "raja-ampat", name: "Raja Ampat", location: "West Papua", coords: "00°30′S 130°30′E", desc: "Four great islands adrift in a sea of coral — the most biodiverse marine habitat on Earth.", img: "/countries/indonesia/landmarks/indonesia-raja-ampat-01.svg" },
    { slug: "komodo", name: "Komodo National Park", location: "East Nusa Tenggara", coords: "08°35′S 119°29′E", desc: "Pale volcanic islands ruled by the Komodo dragon, the largest living lizard on the planet.", img: "/countries/indonesia/landmarks/indonesia-komodo-01.svg" },
    { slug: "bromo", name: "Mount Bromo", location: "East Java", coords: "07°56′S 112°57′E", desc: "An active volcano standing inside a vast caldera of sand, crowned by the Sea of Sand.", img: "/countries/indonesia/landmarks/indonesia-bromo-01.svg" }
  ];
  for (const [i, lm] of landmarksData.entries()) {
    await db.insert(schema.landmarks).values({ countryId, slug: lm.slug, name: lm.name, location: lm.location, coordinates: lm.coords, description: lm.desc, imagePath: lm.img, displayOrder: i }).onConflictDoUpdate({ target: schema.landmarks.slug, set: { updatedAt: new Date() } });
  }
  console.log(`  Landmarks: ${landmarksData.length} inserted`);

  // Foods — unique on slug
  const foodsData = [
    { slug: "rendang", name: "Rendang", region: "West Sumatra", desc: "Beef slow-cooked for hours in coconut milk and a complex paste of chilies, lemongrass and spices until deeply caramelized.", img: "/countries/indonesia/foods/indonesia-rendang-01.svg" },
    { slug: "nasi-goreng", name: "Nasi Goreng", region: "Nationwide", desc: "Indonesia's fragrant wok-fried rice, seasoned with sweet soy, shallots and chili, crowned with a fried egg.", img: "/countries/indonesia/foods/indonesia-nasi-goreng-01.svg" },
    { slug: "satay", name: "Satay", region: "Java", desc: "Skewers of marinated meat grilled over charcoal, glazed with sweet soy and served with peanut sauce.", img: "/countries/indonesia/foods/indonesia-satay-01.svg" },
    { slug: "gado-gado", name: "Gado-Gado", region: "Jakarta", desc: "A vibrant platter of blanched vegetables, tofu and lontong bound together by a rich peanut sauce.", img: "/countries/indonesia/foods/indonesia-gado-gado-01.svg" },
    { slug: "soto", name: "Soto", region: "Nationwide", desc: "A golden spiced broth with chicken, rice noodles and herbs — each region keeps its own beloved version.", img: "/countries/indonesia/foods/indonesia-soto-01.svg" },
    { slug: "pempek", name: "Pempek", region: "Palembang", desc: "Savory fish cakes from Sumatra, served with a dark sweet-and-sour sauce of palm sugar and vinegar.", img: "/countries/indonesia/foods/indonesia-pempek-01.svg" }
  ];
  for (const [i, food] of foodsData.entries()) {
    await db.insert(schema.foods).values({ countryId, slug: food.slug, name: food.name, region: food.region, description: food.desc, imagePath: food.img, displayOrder: i }).onConflictDoUpdate({ target: schema.foods.slug, set: { updatedAt: new Date() } });
  }
  console.log(`  Foods: ${foodsData.length} inserted`);

  // Culture — unique on slug
  const cultureData = [
    { slug: "batik", title: "Batik", category: "Craft", desc: "Wax-resist cloth dyed in intricate patterns, each motif carrying regional and symbolic meaning.", img: "/countries/indonesia/culture/indonesia-batik-01.svg" },
    { slug: "wayang", title: "Wayang", category: "Theater", desc: "Shadow puppetry of leather and light, where dalang storytellers animate epics through a screen.", img: "/countries/indonesia/culture/indonesia-wayang-01.svg" },
    { slug: "gamelan", title: "Gamelan", category: "Music", desc: "Ensembles of bronze gongs, metallophones and drums producing shimmering, interlocking textures.", img: "/countries/indonesia/culture/indonesia-gamelan-01.svg" },
    { slug: "dance", title: "Traditional Dance", category: "Movement", desc: "From the regal Legong of Bali to the war-like Tari Saman, dance carries the archipelago's stories.", img: "/countries/indonesia/culture/indonesia-dance-01.svg" },
    { slug: "houses", title: "Traditional Houses", category: "Architecture", desc: "Saddle-roofed tongkonan and floating rumah panggung — dwellings shaped by climate and kinship.", img: "/countries/indonesia/culture/indonesia-house-01.svg" },
    { slug: "clothing", title: "Traditional Clothing", category: "Textile", desc: "Songket, ulos and tenun ikat — woven identities passed down through generations.", img: "/countries/indonesia/culture/indonesia-clothing-01.svg" }
  ];
  for (const [i, item] of cultureData.entries()) {
    await db.insert(schema.cultureItems).values({ countryId, slug: item.slug, title: item.title, category: item.category, description: item.desc, imagePath: item.img, displayOrder: i }).onConflictDoUpdate({ target: schema.cultureItems.slug, set: { updatedAt: new Date() } });
  }
  console.log(`  Culture: ${cultureData.length} inserted`);

  // Timeline — unique on year_label
  const timelineData = [
    { year: "8th Century", sortYear: 800, title: "Ancient Kingdoms", desc: "Maritime empires such as Srivijaya and Majapahit dominate the straits, while Borobudur rises from the Kedu Plain." },
    { year: "1602", sortYear: 1602, title: "Colonial Era", desc: "The Dutch East India Company and later the colonial state reshape the archipelago's trade and boundaries." },
    { year: "1945", sortYear: 1945, title: "Independence", desc: "On 17 August 1945, Sukarno and Hatta proclaim Indonesian independence, igniting a revolution." },
    { year: "1998 — Present", sortYear: 1998, title: "Modern Republic", desc: "Reformasi opens a new democratic era; a vast archipelago of seventeen thousand islands finds one voice." }
  ];
  for (const [i, event] of timelineData.entries()) {
    await db.insert(schema.timelineEvents).values({ countryId, yearLabel: event.year, sortYear: event.sortYear, title: event.title, description: event.desc, displayOrder: i }).onConflictDoUpdate({ target: schema.timelineEvents.yearLabel, set: { updatedAt: new Date() } });
  }
  console.log(`  Timeline: ${timelineData.length} inserted`);

  // Media assets — unique on (country_id, category)
  const mediaData = [
    { category: "flag", path: "/countries/indonesia/flag/indonesia-flag-01.svg", alt: "Flag of Indonesia" },
    { category: "hero", path: "/countries/indonesia/hero/indonesia-hero-01.svg", alt: "Cinematic landscape of Indonesia" }
  ];
  for (const m of mediaData) {
    await db.insert(schema.mediaAssets).values({ countryId, category: m.category, path: m.path, alt: m.alt, displayOrder: 0 }).onConflictDoUpdate({ target: [schema.mediaAssets.countryId, schema.mediaAssets.category], set: { updatedAt: new Date() } });
  }
  console.log("  Media assets: 2 inserted");

  // Gallery — unique on path
  const galleryData = [
    { path: "/countries/indonesia/gallery/indonesia-gallery-01.svg", src: "/countries/indonesia/gallery/indonesia-gallery-01.svg", alt: "Volcanic ridge of Mount Bromo at dawn", cat: "Nature", span: "wide" },
    { path: "/countries/indonesia/gallery/indonesia-gallery-02.svg", src: "/countries/indonesia/gallery/indonesia-gallery-02.svg", alt: "Borobudur stupas emerging from morning mist", cat: "Architecture", span: null },
    { path: "/countries/indonesia/gallery/indonesia-gallery-03.svg", src: "/countries/indonesia/gallery/indonesia-gallery-03.svg", alt: "Batik artisan working with canting", cat: "Culture", span: null },
    { path: "/countries/indonesia/gallery/indonesia-gallery-04.svg", src: "/countries/indonesia/gallery/indonesia-gallery-04.svg", alt: "Pusaran skyline of Jakarta at night", cat: "Cities", span: "wide" },
    { path: "/countries/indonesia/gallery/indonesia-gallery-05.svg", src: "/countries/indonesia/gallery/indonesia-gallery-05.svg", alt: "Gamelan bronze instruments in close detail", cat: "Culture", span: null },
    { path: "/countries/indonesia/gallery/indonesia-gallery-06.svg", src: "/countries/indonesia/gallery/indonesia-gallery-06.svg", alt: "Raja Ampat lagoon from above", cat: "Nature", span: null }
  ];
  for (const [i, img] of galleryData.entries()) {
    await db.insert(schema.galleryImages).values({ countryId, path: img.path, src: img.src, alt: img.alt, category: img.cat, span: img.span, displayOrder: i }).onConflictDoUpdate({ target: schema.galleryImages.path, set: { updatedAt: new Date() } });
  }
  console.log(`  Gallery: ${galleryData.length} inserted`);

  await client.end();
  console.log("Seed complete!");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
