# PLAN-01 — FOUNDATION
## Indonesia Country Experience — Initial Prototype

> Build the first complete country experience using **Indonesia** as the reference implementation.
>
> This phase is not about supporting every country. The objective is to establish a strong technical, visual, and data foundation that can later scale to the entire world without requiring major architectural changes.

---

# 1. Project Vision

Create a highly visual, interactive, cinematic web experience for exploring countries around the world.

The website should not feel like:

- Wikipedia
- a school encyclopedia
- a generic tourism website
- a standard dashboard
- a basic country-information website

Instead, it should feel like a combination of:

- Global Intelligence Portal
- Interactive World Atlas
- Digital Museum
- Futuristic Command Center
- Editorial / cinematic experience

The first country implemented will be:

# INDONESIA

Indonesia will act as the **reference country** for the entire future architecture.

Everything built for Indonesia should be reusable for future countries.

---

# 2. Phase 01 Objective

Build a production-quality prototype containing:

1. Main landing page
2. Global navigation concept
3. Indonesia country page
4. Initial structured country database
5. Asset management system
6. Reusable country components
7. Responsive layout
8. Core animations and transitions
9. Architecture ready for future countries

Only Indonesia needs to be fully implemented in this phase.

Do NOT implement every country.

---

# 3. Technology Stack

Use:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP only where more advanced timeline/scroll animation is required
- Lucide Icons
- Local JSON data for initial country database

Package manager:

```bash
pnpm
```

Use the latest stable compatible versions.

---

# 4. General Architecture

Recommended structure:

```text
src/
├── app/
│   ├── page.tsx
│   ├── explore/
│   │   └── page.tsx
│   └── country/
│       └── [slug]/
│           └── page.tsx
│
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── home/
│   ├── country/
│   ├── shared/
│   └── ui/
│
├── data/
│   └── countries/
│       └── indonesia.json
│
├── lib/
│   ├── countries.ts
│   ├── assets.ts
│   └── utils.ts
│
├── types/
│   └── country.ts
│
└── styles/
```

Assets:

```text
public/
└── countries/
    └── indonesia/
        ├── hero/
        ├── flag/
        ├── leaders/
        ├── cities/
        ├── landmarks/
        ├── foods/
        ├── culture/
        └── gallery/
```

Keep the architecture modular.

Do not put the entire application inside one component.

---

# 5. Design Direction

## Core Style

The website should have a:

**Dark cinematic global intelligence aesthetic**

Characteristics:

- dark interface
- large typography
- strong hierarchy
- dramatic imagery
- oversized country codes
- subtle grid systems
- geographic coordinates
- information labels
- thin borders
- translucent panels
- glass effects used sparingly
- layered depth
- smooth motion
- editorial spacing

Avoid excessive generic glassmorphism.

Avoid making everything rounded.

Avoid excessive gradients.

Avoid looking like a crypto dashboard.

Avoid looking like a SaaS landing page.

---

# 6. Visual Identity

Suggested base palette:

```text
Background:
#07090C
#0B0E13
#10141B

Primary text:
#F4F4F2

Secondary text:
#8B929C

Borders:
rgba(255,255,255,0.10)
```

Country-specific accent colors should come from the country's identity.

For Indonesia:

```text
Primary Accent:
Red

Secondary:
White
```

Do not flood the whole UI with red.

Use red strategically for:

- active states
- labels
- indicators
- highlights
- map points
- section markers
- numbers
- interaction feedback

---

# 7. Typography

Typography is one of the most important parts of the experience.

Use a combination of:

### Display font

Used for:

- INDONESIA
- section titles
- huge numbers
- country codes

Style:

- bold
- condensed if possible
- modern editorial

### UI / Body font

Used for:

- descriptions
- statistics
- labels
- navigation
- cards

Typography should create strong contrast between:

```text
INDONESIA
Republic of Indonesia

IDN
360

17,000+
ISLANDS
```

Large typography should be treated as visual composition, not merely text.

---

# 8. Home Page

Route:

```text
/
```

The homepage should immediately establish the concept.

---

## 8.1 Navigation

Top navigation:

```text
LOGO / WORLD ATLAS

EXPLORE
NATIONS
CULTURE
ABOUT

SEARCH
MENU
```

Keep navigation minimal.

Sticky navigation is allowed.

On scroll it may become slightly more compact.

---

# 9. Homepage Hero

Hero should occupy approximately:

```text
90–100vh
```

Main visual:

A cinematic Indonesian landscape/city/archipelago image.

Example content hierarchy:

```text
WORLD ATLAS

001 / 195

EXPLORE

INDONESIA

REPUBLIC OF INDONESIA
SOUTHEAST ASIA

06° S
107° E
```

Additional information:

```text
CAPITAL
Jakarta

REGION
Southeast Asia

ISO
ID / IDN
```

Primary CTA:

```text
EXPLORE COUNTRY →
```

Secondary:

```text
DISCOVER WORLD
```

---

# 10. Hero Motion

Use restrained cinematic animation.

On initial load:

1. background image slowly scales
2. country label appears
3. giant INDONESIA typography reveals
4. metadata fades upward
5. navigation appears
6. subtle ambient movement continues

Do not create excessive entrance animation.

Animation should feel premium rather than flashy.

---

# 11. Homepage Country Preview

Below hero:

```text
FEATURED NATION
```

Indonesia card.

Possible structure:

```text
001

INDONESIA

IDN

SOUTHEAST ASIA

285M+
POPULATION

1.9M km²
LAND AREA

17K+
ISLANDS
```

Include:

- flag
- hero image
- country code
- continent
- capital
- population
- short description

CTA:

```text
ENTER INDONESIA →
```

---

# 12. Country Page

Route:

```text
/country/indonesia
```

This is the most important page in PLAN-01.

Country page should feel like entering a digital exhibition dedicated to Indonesia.

---

# 13. Country Hero

Full-screen country introduction.

Elements:

```text
IDN

INDONESIA

REPUBLIC OF INDONESIA

SOUTHEAST ASIA
```

Show:

- large cinematic image
- Indonesian flag
- coordinates
- country code
- continent
- capital
- local name

Possible layout:

```text
001 / NATION

INDONESIA

Republic of Indonesia

06°10′S
106°49′E

SOUTHEAST ASIA
```

---

# 14. Country Introduction

Section:

```text
THE ARCHIPELAGO
```

Include short editorial description explaining Indonesia.

Keep paragraphs relatively short.

Mix content with large statistics.

Example visual structure:

```text
17,000+
ISLANDS

38
PROVINCES

3
TIME ZONES

1.9M km²
LAND AREA
```

Use statistics as visual elements.

---

# 15. National Identity Section

Section ID:

```text
identity
```

Title:

```text
NATIONAL IDENTITY
```

Show:

- flag
- official name
- local name
- ISO Alpha-2
- ISO Alpha-3
- calling code
- internet TLD
- national motto
- national anthem
- independence date

Flag should have its own prominent visual treatment.

---

# 16. Leadership Section

Section:

```text
LEADERSHIP
```

Display current national leadership.

Structure should support multiple roles.

Example:

```text
HEAD OF STATE

[PHOTO]

NAME
President

TERM
YYYY — PRESENT
```

The data must NOT be hardcoded into the component.

Leadership information must come from the country data file.

This allows it to be updated independently later.

---

# 17. Capital City Section

Section:

```text
CAPITAL
```

Use cinematic photograph of Jakarta.

Display:

```text
JAKARTA

06°12′S
106°49′E
```

Information:

- city name
- population
- province/region
- coordinates
- timezone
- short description

Architecture must allow future changes to capital information without restructuring the page.

---

# 18. Geography Section

Section:

```text
GEOGRAPHY
```

Display:

- continent
- region
- land area
- water area
- number of islands
- highest point
- longest river
- neighboring countries
- surrounding seas/oceans

Future-ready component for map visualization.

For Phase 01, a stylized static geographic visualization is enough.

Interactive map can come later.

---

# 19. Population Section

Section:

```text
PEOPLE
```

Show:

- total population
- density
- urban population
- major ethnic groups
- major languages

Visualization should use typography and simple charts.

Do not add heavy chart libraries unless necessary.

---

# 20. Languages

Section:

```text
LANGUAGES
```

Primary:

```text
Bahasa Indonesia
```

Also provide support for regional languages.

Possible presentation:

```text
700+
LIVING LANGUAGES

Bahasa Indonesia
Javanese
Sundanese
Madurese
Balinese
...
```

Only show a representative selection initially.

---

# 21. Currency & Economy

Section:

```text
ECONOMY
```

Basic information:

- currency
- currency code
- currency symbol
- GDP
- GDP per capita
- major industries
- major exports

Avoid turning Phase 01 into a financial dashboard.

Keep it editorial and visual.

---

# 22. Famous Places

Section:

```text
LANDMARKS
```

Initial places:

- Borobudur
- Bali
- Raja Ampat
- Komodo National Park
- Mount Bromo

Each landmark card:

```text
IMAGE

LOCATION

NAME

SHORT DESCRIPTION

COORDINATES
```

Cards should be reusable for other countries.

Desktop may use horizontal scrolling.

Mobile should use vertical cards.

---

# 23. Food Section

Section:

```text
TASTE OF INDONESIA
```

Initial foods:

- Rendang
- Nasi Goreng
- Satay
- Gado-Gado
- Soto
- Pempek

Card:

```text
IMAGE

FOOD NAME

REGION

SHORT DESCRIPTION
```

Use large food photography.

This section should feel like an editorial food magazine rather than a database table.

---

# 24. Culture Section

Section:

```text
CULTURE
```

Initial topics:

- Batik
- Wayang
- Gamelan
- traditional dance
- traditional houses
- traditional clothing

Use image-first storytelling.

---

# 25. Timeline

Section:

```text
TIMELINE
```

Create a concise historical timeline.

Architecture:

```text
YEAR
TITLE
DESCRIPTION
```

Example conceptual events:

```text
Ancient Kingdoms

Colonial Era

Independence

Modern Republic
```

Do not overload the first version with hundreds of historical events.

---

# 26. Country Gallery

Section:

```text
INDONESIA IN FRAME
```

Masonry or editorial gallery containing:

- landscape
- cities
- culture
- food
- people
- architecture
- nature

Gallery should create a strong visual ending before footer.

---

# 27. Footer

Minimal footer.

Example:

```text
WORLD ATLAS

001 / INDONESIA

EXPLORE THE WORLD
```

Include:

```text
NEXT NATION
COMING SOON
```

Do not create links to unfinished country pages yet.

---

# 28. Country Data Model

Create:

```text
src/types/country.ts
```

Example architecture:

```ts
export interface Country {
  slug: string;
  name: string;
  officialName: string;
  localName: string;

  codes: {
    alpha2: string;
    alpha3: string;
    numeric?: string;
  };

  geography: {
    continent: string;
    region: string;
    subregion?: string;
    areaKm2: number;
    coordinates?: string;
    islands?: number;
  };

  capital: {
    name: string;
    coordinates?: string;
    population?: number;
    timezone?: string;
    description?: string;
    image?: string;
  };

  population: {
    total: number;
    density?: number;
    urbanPercentage?: number;
  };

  languages: {
    official: string[];
    regional?: string[];
  };

  currency: {
    name: string;
    code: string;
    symbol: string;
  };

  leadership: Leader[];

  landmarks: Landmark[];

  foods: Food[];

  culture: CultureItem[];

  timeline: TimelineEvent[];

  gallery: GalleryImage[];

  assets: {
    flag: string;
    hero: string;
  };
}
```

Create appropriate sub-types.

Avoid `any`.

---

# 29. Indonesia Data File

Create:

```text
src/data/countries/indonesia.json
```

All country-specific content should primarily live here.

Do not write components like:

```tsx
<h1>Indonesia</h1>
```

Prefer:

```tsx
<h1>{country.name}</h1>
```

This is critical.

Indonesia must function as data consumed by a generic country template.

---

# 30. Country Loader

Create:

```text
src/lib/countries.ts
```

Responsibilities:

```ts
getCountryBySlug(slug)
getAllCountries()
countryExists(slug)
```

For Phase 01:

```text
getAllCountries()
```

will only return Indonesia.

Later, more JSON files can be added without changing the page architecture.

---

# 31. Asset Strategy

Do not use random remote image URLs directly throughout components.

Use local project assets.

Example:

```text
/countries/indonesia/hero/jakarta.webp
```

Benefits:

- performance
- reliability
- reproducibility
- offline development
- easier future asset pipeline
- no broken third-party links

---

# 32. Asset Naming Convention

Use predictable file names.

Example:

```text
indonesia-hero-01.webp

indonesia-jakarta-01.webp

indonesia-borobudur-01.webp

indonesia-rendang-01.webp

indonesia-president-01.webp
```

Avoid names like:

```text
IMG_192829.jpg
download-final2.png
image123.webp
```

---

# 33. Image Optimization

Images should preferably use:

```text
.webp
```

or:

```text
.avif
```

Keep original high-quality assets outside production if necessary.

Recommended categories:

```text
hero:
1920–2560px

content:
1200–1600px

cards:
800–1200px

thumbnails:
400–800px
```

Use Next.js Image where appropriate.

---

# 34. Future Google Colab Asset Pipeline

Do NOT build the complete automation pipeline during this phase unless necessary.

However, structure assets so a future Python/Google Colab pipeline can automatically generate:

```text
public/countries/{slug}/...
```

Future pipeline should eventually:

1. receive country metadata
2. search/download assets
3. convert images to WebP
4. resize images
5. optimize images
6. normalize filenames
7. create folders
8. produce manifest JSON
9. update country data

PLAN-01 only needs to prepare for this.

---

# 35. Reusable Components

Create reusable components such as:

```text
CountryHero

CountrySection

StatBlock

CountryFlag

LeaderCard

CapitalFeature

LandmarkCard

FoodCard

CultureCard

Timeline

Gallery

SectionHeader

CountryMetadata
```

All country-specific components must accept data through props.

---

# 36. Animation System

Animations should follow consistent rules.

Suggested durations:

```text
micro interaction:
150–300ms

component reveal:
400–700ms

large cinematic transition:
700–1200ms
```

Use easing consistently.

Avoid animation for everything.

---

# 37. Scroll Experience

Recommended:

- smooth section reveals
- subtle parallax
- sticky text blocks
- horizontal landmark section
- large typography transitions
- image mask reveals

Do not implement scroll hijacking.

Native scrolling should continue to work normally.

---

# 38. Hover Interactions

Desktop interactions:

Cards:

```text
image slightly scales
metadata shifts
border becomes stronger
arrow moves
```

Navigation:

```text
underline / indicator
```

Buttons:

```text
subtle translation
```

Keep hover effects subtle.

---

# 39. Loading Experience

Create a short initial loading sequence.

Example:

```text
WORLD ATLAS

LOADING NATION

IDN
```

Then transition into Indonesia hero.

Do not create a long artificial loader.

If content is already loaded quickly, transition immediately.

---

# 40. Mobile Experience

Mobile must be treated as a first-class layout.

Do not simply shrink desktop.

Changes:

Desktop:

```text
large grids
horizontal storytelling
oversized typography
```

Mobile:

```text
vertical narrative
touch-friendly
smaller headings
simplified animation
```

Disable expensive motion on low-power/mobile environments where reasonable.

---

# 41. Accessibility

Implement:

- semantic HTML
- alt text
- keyboard navigation
- focus states
- sufficient contrast
- reduced motion support

Respect:

```css
prefers-reduced-motion
```

---

# 42. Performance Requirements

Target good Lighthouse performance.

Avoid:

- loading all gallery images immediately
- massive JavaScript animation bundles
- giant unoptimized PNG files
- unnecessary dependencies
- client components everywhere

Prefer server components where practical.

Client components only for interactivity.

---

# 43. Error Handling

If invalid country slug:

```text
/country/unknown
```

show custom:

```text
404

NATION NOT FOUND

RETURN TO WORLD ATLAS
```

Keep visual style consistent.

---

# 44. SEO

Each country page should generate metadata.

For Indonesia:

```text
title:
Indonesia — World Atlas

description:
Explore Indonesia through geography, culture, leadership, landmarks, cuisine and more.
```

Architecture should later support dynamic metadata for every country.

---

# 45. Current Phase Dataset Policy

For PLAN-01:

Only add:

```text
Indonesia
```

Do not populate all 195 countries with incomplete information.

Quality over quantity.

The architecture should prove that adding another country later is straightforward.

---

# 46. Example Future Expansion

After PLAN-01, adding Japan should ideally require:

```text
japan.json
```

plus:

```text
public/countries/japan/
```

and almost no major application changes.

If a new country requires duplicating an entire page component, the architecture is wrong.

---

# 47. Development Principles

Follow these rules:

### Rule 1

Do not hardcode Indonesia-specific values into reusable UI components.

### Rule 2

Separate:

```text
DATA
UI
LOGIC
ASSETS
```

### Rule 3

Avoid giant files.

### Rule 4

Use TypeScript strictly.

### Rule 5

Keep components composable.

### Rule 6

Prioritize visual quality.

### Rule 7

Do not prematurely build features meant for Phase 5+.

---

# 48. Do Not Build Yet

Do NOT build these in PLAN-01:

- user accounts
- authentication
- comments
- favorites
- social features
- AI chatbot
- admin dashboard
- all countries
- real-time news
- quizzes
- games
- full interactive globe
- advanced country comparison
- multilingual system
- CMS
- mobile application
- complicated backend
- paid API integrations

Those belong to future plans.

---

# 49. Quality Bar

The prototype should already feel like a real product.

Do not leave the UI looking like a wireframe.

Do not use obviously temporary cards.

Do not build a generic developer-dashboard UI.

The design should have:

- composition
- rhythm
- visual hierarchy
- intentional spacing
- strong typography
- polished transitions

---

# 50. Reference Philosophy

The visual experience may take inspiration from premium interactive websites and editorial experiences.

However:

DO NOT directly clone another website.

Extract principles such as:

- oversized typography
- editorial layouts
- cinematic hero
- strong imagery
- information density
- section transitions
- asymmetric compositions

Then create a unique visual identity for World Atlas.

---

# 51. Initial Pages

PLAN-01 should result in these routes:

```text
/

/explore

/country/indonesia

/404
```

No additional routes are required unless technically necessary.

---

# 52. Explore Page

Route:

```text
/explore
```

Since only Indonesia exists:

Display:

```text
EXPLORE NATIONS

001 AVAILABLE
```

Then:

```text
ASIA

INDONESIA
IDN
```

Other regions may appear as disabled/coming soon.

Example:

```text
EUROPE
COMING SOON

AFRICA
COMING SOON

AMERICAS
COMING SOON

OCEANIA
COMING SOON
```

Avoid creating fake country entries.

---

# 53. Global Command Center Concept

The navigation/menu may use the idea of a:

```text
GLOBAL COMMAND CENTER
```

Possible modules:

```text
01
EXPLORE NATIONS

02
WORLD MAP
COMING SOON

03
GLOBAL LEADERS
COMING SOON

04
WORLD CUISINE
COMING SOON

05
CAPITAL CITIES
COMING SOON

06
COMPARE NATIONS
COMING SOON
```

Only `EXPLORE NATIONS` must work in PLAN-01.

---

# 54. Desired Emotional Experience

When someone enters the Indonesia page, the intended reaction should be:

> "This feels like exploring a country through an interactive digital exhibition."

Not:

> "This is a webpage containing facts about Indonesia."

This distinction should influence every design decision.

---

# 55. Definition of Done

PLAN-01 is complete when:

- homepage is polished
- Indonesia country page is complete
- explore page works
- responsive mobile layout works
- animations are polished
- structured country type exists
- Indonesia data is separated from UI
- all Indonesia assets follow organized folder structure
- reusable country components exist
- no major Indonesia-specific component architecture exists
- another country could later be added using the same system
- no obvious placeholder UI remains
- no broken links
- no console errors
- production build passes

Run:

```bash
pnpm build
```

The project must build successfully.

---

# 56. Final Deliverable

At the end of PLAN-01 the repository should represent:

```text
WORLD ATLAS
└── Indonesia
    ├── Identity
    ├── Leadership
    ├── Capital
    ├── Geography
    ├── Population
    ├── Languages
    ├── Economy
    ├── Landmarks
    ├── Cuisine
    ├── Culture
    ├── Timeline
    └── Gallery
```

Indonesia becomes the blueprint for every future country.

---

# 57. Future Plan Roadmap

Do not implement these yet.

Suggested future plans:

```text
PLAN-01
FOUNDATION + INDONESIA

PLAN-02
ASSET & DATA COLLECTION PIPELINE

PLAN-03
ASIA EXPANSION

PLAN-04
INTERACTIVE WORLD MAP

PLAN-05
COUNTRY SEARCH & DISCOVERY

PLAN-06
WORLD LEADERS

PLAN-07
WORLD CUISINE

PLAN-08
COUNTRY COMPARISON

PLAN-09
HISTORY & TIMELINE SYSTEM

PLAN-10
GLOBAL DATA UPDATE SYSTEM
```

Each future phase should build on the architecture established in PLAN-01.

---

# 58. Agent Instruction

Before writing code:

1. inspect the entire repository
2. understand existing files
3. create an implementation strategy
4. identify reusable components
5. identify dependencies
6. then begin implementation

Do not blindly generate the entire project in one massive file.

Work systematically.

After every major implementation step:

```bash
pnpm build
```

or at minimum:

```bash
pnpm lint
```

Fix errors before moving forward.

Never leave knowingly broken code for later.

---

# END OF PLAN-01

**Primary Goal:**

Build one exceptional country experience first.

Indonesia is not merely the first page.

Indonesia is the architectural blueprint for the entire World Atlas.