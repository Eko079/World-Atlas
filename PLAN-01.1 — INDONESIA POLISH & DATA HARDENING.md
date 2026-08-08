# PLAN-01.1 — INDONESIA POLISH & DATA HARDENING

## Purpose

PLAN-01 successfully established the first working country experience using Indonesia.

PLAN-01.1 is a refinement and hardening phase.

The purpose of this phase is NOT to add more countries.

The purpose is to make Indonesia reliable enough to become the permanent blueprint for every future country.

This phase must fix:

- stale factual data
- weak source tracking
- ambiguous data structures
- country/capital coordinate confusion
- leadership duplication
- capital transition handling
- homepage loading/SEO problems
- data validation
- visual inconsistencies
- responsive behavior
- accessibility
- animation quality
- future admin/database/import readiness

After PLAN-01.1, Indonesia should be considered the **reference implementation** of the World Atlas country schema.

---

# 1. Primary Objective

Transform the existing Indonesia implementation from:

> A polished prototype containing country facts

into:

> A reliable, source-aware, scalable country template ready for automated ingestion and database-backed content management.

The page must remain visually cinematic.

Do NOT turn it into an administrative dashboard or Wikipedia clone.

---

# 2. Scope

PLAN-01.1 should primarily modify and improve:

```text
/

/explore

/country/indonesia
```

And the supporting:

```text
country types
country data
data loaders
asset metadata
validation system
SEO metadata
loading system
responsive behavior
```

Only Indonesia remains fully available.

Do NOT add additional countries during this phase.

---

# 3. Critical Rule

Do not solve bad data by hardcoding corrected values directly into React components.

All corrections must happen through:

```text
DATA MODEL
        ↓
COUNTRY DATA
        ↓
VALIDATION
        ↓
REUSABLE UI
```

The UI should only consume normalized data.

---

# 4. Current Problems That MUST Be Fixed

The following issues were identified in the existing implementation and are mandatory work items.

---

# 4.1 Population Data Is Stale

The current site displays approximately:

```text
277.9M+
```

This should be reviewed and updated.

The current authoritative reference should primarily use Indonesian official statistical sources.

For the current Indonesia dataset, use the latest appropriate population figure from:

```text
Badan Pusat Statistik — BPS
```

SUPAS 2025 reports Indonesia's mid-2025 population at approximately:

```text
284.67 million
```

Do NOT store population as only:

```json
{
  "population": 284670000
}
```

Instead, population statistics must retain context.

Example:

```json
{
  "population": {
    "value": 284670000,
    "unit": "people",
    "referenceYear": 2025,
    "display": "284.67M",
    "source": {
      "name": "Badan Pusat Statistik",
      "publication": "SUPAS 2025",
      "url": "...",
      "accessedAt": "YYYY-MM-DD"
    }
  }
}
```

The website does not necessarily need to visually expose every metadata field.

However, the data layer MUST preserve them.

---

# 4.2 Number of Islands Must Be Corrected

The current implementation displays:

```text
17,508 islands
```

This is outdated.

BIG's official island information currently reports:

```text
17,380 islands
```

and the 2025 NKRI map release also references 17,380 islands.

Use:

```text
17,380
```

until a newer authoritative figure supersedes it.

The data must also retain its reference date/source.

Example:

```json
{
  "islandCount": {
    "value": 17380,
    "referenceYear": 2025,
    "source": {
      "name": "Badan Informasi Geospasial",
      "publication": "Peta NKRI / SIPULAU",
      "url": "...",
      "accessedAt": "YYYY-MM-DD"
    }
  }
}
```

Important:

Island counts can legitimately change due to verification and geographic review.

Therefore it MUST NOT be modeled as timeless immutable information.

---

# 4.3 GDP Data Must Be Updated

The current site shows approximately:

```text
GDP
$1.3T

GDP PER CAPITA
$4,788
```

This needs updating and better modeling.

BPS reported for calendar year 2025:

```text
GDP at current prices:
IDR 23,821.1 trillion

GDP per capita:
IDR 83.7 million

GDP per capita:
approximately USD 5,083.4
```

Do not model economics as:

```json
{
  "gdp": "$1.3T"
}
```

Instead:

```json
{
  "economy": {
    "gdp": {
      "value": 23821.1,
      "currency": "IDR",
      "unit": "trillion",
      "referenceYear": 2025,
      "priceBasis": "current",
      "source": {}
    },

    "gdpPerCapita": {
      "value": 83.7,
      "currency": "IDR",
      "unit": "million",
      "referenceYear": 2025,
      "source": {}
    },

    "gdpPerCapitaUsd": {
      "value": 5083.4,
      "currency": "USD",
      "referenceYear": 2025,
      "source": {}
    }
  }
}
```

The presentation layer may format this beautifully.

The raw data layer must remain semantically precise.

---

# 5. Introduce Data Provenance

This is one of the most important changes in PLAN-01.1.

Every fact that can change over time should be capable of answering:

```text
WHAT is the value?

WHEN was the value applicable?

WHERE did the value come from?

WHEN was it last checked?
```

Introduce a reusable source type.

Example:

```ts
export interface DataSource {
  name: string;
  publication?: string;
  url?: string;
  publishedAt?: string;
  accessedAt?: string;
}
```

---

# 6. Introduce Generic Sourced Values

Create a reusable generic structure.

Example:

```ts
export interface SourcedValue<T> {
  value: T;
  referenceYear?: number;
  referenceDate?: string;
  source?: DataSource;
  lastVerifiedAt?: string;
}
```

For example:

```ts
population: SourcedValue<number>;
```

or:

```ts
islandCount: SourcedValue<number>;
```

This will be extremely important when automated ingestion is built later.

---

# 7. Do Not Over-Engineer Static Facts

Not everything needs complex source metadata.

Example:

```text
ISO code
country slug
continent
currency symbol
```

can remain relatively simple.

Use detailed provenance primarily for:

- population
- economic statistics
- leaders
- capital status
- island count
- demographic statistics
- political information
- changing administrative information
- statistics with specific measurement dates

---

# 8. Separate Country Coordinates From Capital Coordinates

The current implementation appears to use approximately:

```text
06°12'S
106°49'E
```

for Indonesia.

Those coordinates correspond to Jakarta rather than a meaningful national geographic center.

This must be fixed at the schema level.

Never use:

```ts
coordinates
```

without defining what the coordinates represent.

Replace ambiguous models with explicit structures.

Example:

```ts
geography: {
  representativeCoordinates?: {
    latitude: number;
    longitude: number;
    label?: string;
    methodology?: string;
  };
}
```

And separately:

```ts
capital: {
  coordinates: {
    latitude: number;
    longitude: number;
  };
}
```

---

# 9. Coordinate Display Rules

Country coordinates and city coordinates must never be silently interchangeable.

The UI should use appropriate labels.

For example:

```text
INDONESIA

GEOGRAPHIC REFERENCE
02° S
118° E
```

versus:

```text
JAKARTA

06°12′S
106°49′E
```

Do not imply false geographic precision.

If the chosen country coordinate is a representative centroid rather than a legally defined national coordinate, treat it accordingly.

---

# 10. Leadership Data Redesign

Current page structure separately presents:

```text
HEAD OF STATE

HEAD OF GOVERNMENT
```

with the same person.

For Indonesia's presidential system, this results in visually duplicated content.

Current leadership remains:

```text
President
Prabowo Subianto

Vice President
Gibran Rakabuming Raka
```

The data model should support multiple constitutional roles without rendering duplicate person cards.

---

# 11. Leadership Schema

Prefer person-centric data.

Example:

```ts
export interface Leader {
  id: string;
  name: string;

  position: string;

  constitutionalRoles?: string[];

  term: {
    start: string;
    end?: string;
  };

  image?: string;

  source?: DataSource;

  lastVerifiedAt?: string;
}
```

Example conceptual data:

```json
{
  "name": "Prabowo Subianto",
  "position": "President",
  "constitutionalRoles": [
    "Head of State",
    "Head of Government"
  ]
}
```

Do not create two copies of the same leader merely because one person fulfills two roles.

---

# 12. Leadership UI Redesign

Instead of:

```text
[PRABOWO]

HEAD OF STATE

[PRABOWO]

HEAD OF GOVERNMENT
```

Prefer:

```text
NATIONAL LEADERSHIP


PRESIDENT

[ LARGE PORTRAIT ]

PRABOWO SUBIANTO

HEAD OF STATE
HEAD OF GOVERNMENT

2024 — PRESENT
```

Then:

```text
VICE PRESIDENT

[ PORTRAIT ]

GIBRAN RAKABUMING RAKA

2024 — PRESENT
```

The President should receive the strongest visual hierarchy.

---

# 13. Leadership Must Be Time-Aware

Leadership data is inherently temporary.

Never model:

```json
{
  "president": "Prabowo Subianto"
}
```

as if it were permanent country identity.

Leadership must contain:

```text
term start
term end
current status
last verification
source
```

This becomes critical when the automated update system is built.

---

# 14. Capital Data Must Support Transition States

Do NOT design the country schema assuming that:

```text
one country = one simple immutable capital string
```

Indonesia demonstrates why this is dangerous.

Nusantara development and government relocation remain ongoing, while official IKN materials in 2026 describe continued ASN relocation preparations and a target for Nusantara to function as the political capital by 2028.

Therefore, do NOT simplify the database to:

```json
{
  "capital": "Jakarta"
}
```

or blindly change everything to:

```json
{
  "capital": "Nusantara"
}
```

The current legal/administrative status should always be verified against authoritative primary sources before publication.

---

# 15. Capital Schema

Create a flexible structure.

Example:

```ts
export interface CapitalInfo {
  primaryDisplay: string;

  status: string;

  currentAdministrativeCenter?: string;

  designatedCapital?: string;

  futureCapital?: string;

  transitionStatus?: string;

  transitionTargetYear?: number;

  notes?: string;

  coordinates?: {
    latitude: number;
    longitude: number;
  };

  source?: DataSource;

  lastVerifiedAt?: string;
}
```

This model is intentionally flexible.

Future countries may have:

- constitutional capital
- administrative capital
- legislative capital
- judicial capital
- official capital
- de facto capital
- multiple capitals
- capital transition

The system should support those cases.

---

# 16. Indonesia Capital UI

The page should visually communicate the situation clearly without overwhelming visitors.

Possible structure:

```text
CAPITAL & GOVERNMENT CENTER

JAKARTA

Current major government and metropolitan center
```

Then an editorial transition block:

```text
THE NEXT CAPITAL

NUSANTARA

Indonesia is developing Nusantara as its new national governmental center.

TRANSITION IN PROGRESS
```

Important:

The final wording must be based on verified legal/current sources.

Do not generate definitive legal statements from assumptions.

---

# 17. Avoid Political Staleness

Political content should have a visible or hidden verification timestamp.

Example:

```json
{
  "lastVerifiedAt": "2026-08-07"
}
```

Potential future admin UI:

```text
Leadership
Last verified: 7 Aug 2026
```

The public site does not have to display this prominently yet.

---

# 18. Homepage Loading Problem

The current homepage exposes a loading state similar to:

```text
Loading Nation

IDN

World Atlas

001 / Indonesia
```

to non-interactive clients/crawlers.

This must be investigated.

Possible causes:

- loader blocks initial HTML
- excessive client-side rendering
- hydration dependency
- animation state hides primary content
- initial opacity remains zero
- loading state is used as actual application content
- hero is not server rendered

---

# 19. Homepage Must Work Without Animation

Critical rule:

The website's actual content must NOT depend on JavaScript animation completing.

If animations fail, users should still see:

```text
WORLD ATLAS

INDONESIA

Republic of Indonesia

Southeast Asia

Explore Country
```

Animations enhance content.

Animations must never be responsible for making the content exist.

---

# 20. Server-Rendered Homepage Content

Where practical, keep primary content server-rendered.

Initial HTML should contain meaningful content including:

```text
site title

featured country

country name

country description

navigation

primary CTA
```

The cinematic loading layer can remain client-side.

---

# 21. Loader Architecture

Treat loader as an overlay.

Conceptually:

```text
SERVER CONTENT
      ↓
PAGE EXISTS
      ↓
OPTIONAL LOADING OVERLAY
      ↓
ANIMATED REVEAL
```

Not:

```text
LOADER
      ↓
WAIT FOR CLIENT
      ↓
CREATE ACTUAL PAGE
```

---

# 22. Loader Failure Safety

Loader should include a maximum state guarantee.

If animation initialization fails:

```text
page must still become visible
```

Never create a situation where:

```css
opacity: 0
```

remains permanently attached to the main page.

---

# 23. Respect Reduced Motion

If:

```css
prefers-reduced-motion: reduce
```

is enabled:

- skip cinematic intro
- reduce parallax
- reduce scale transitions
- immediately expose content

---

# 24. SEO Hardening

Homepage should have meaningful metadata.

Example:

```text
World Atlas — Explore Nations Through Data and Storytelling
```

Description:

```text
Explore countries through geography, people, culture, leadership, cuisine and visual storytelling.
```

Indonesia page:

```text
Indonesia — World Atlas
```

Description:

```text
Explore Indonesia through geography, population, leadership, culture, landmarks, cuisine and history.
```

---

# 25. Structured Metadata

Prepare metadata generation from country data.

Do not manually duplicate:

```text
Indonesia
Indonesia
Indonesia
```

across:

```text
page heading
metadata
Open Graph
JSON-LD
breadcrumbs
```

Use the country object as the canonical source.

---

# 26. Social Preview

Ensure the Indonesia page has proper:

```text
Open Graph title

Open Graph description

Open Graph image

Twitter/X card metadata
```

Use a strong Indonesia hero image or dedicated social preview asset.

---

# 27. Data Accuracy Audit

Audit EVERY existing Indonesia fact.

Do not assume existing values are correct.

Audit at least:

```text
official country name
local name
ISO codes
calling code
TLD

population
population year
population density

land area
water area

island count

provinces

time zones

languages

currency

leadership

capital status

GDP
GDP per capita

highest point

major river information

neighboring countries

independence date

national motto

national anthem
```

---

# 28. Authority Hierarchy

When multiple sources disagree, use this preference order where applicable:

```text
1. Official Indonesian government/statistical authority

2. International intergovernmental organization

3. Reputable academic/institutional source

4. High-quality secondary sources
```

Examples of preferred authorities:

```text
BPS
BIG
Bank Indonesia
Sekretariat Negara
Presiden RI
Wakil Presiden RI
Otorita IKN
relevant ministries

World Bank
United Nations
UNESCO
IMF
```

Do not use random blogs as canonical statistical sources.

---

# 29. Source URLs Must Be Stored

For sourced fields, store source URLs internally.

This will later allow:

```text
admin verification

automated refresh

source auditing

broken-source detection

citation pages
```

Public UI does not need to show raw URLs everywhere.

---

# 30. Last Updated Metadata

Country-level data should include:

```ts
meta: {
  schemaVersion: string;
  createdAt?: string;
  updatedAt: string;
  lastReviewedAt?: string;
}
```

Example:

```json
{
  "meta": {
    "schemaVersion": "1.1",
    "updatedAt": "2026-08-07",
    "lastReviewedAt": "2026-08-07"
  }
}
```

---

# 31. Add Schema Versioning

Introduce:

```text
schemaVersion
```

now.

Example:

```json
{
  "schemaVersion": "1.1"
}
```

Future automated importers must know what schema they are importing.

This prevents future CSV/JSON imports from silently corrupting incompatible data.

---

# 32. Prepare For Validation

Add runtime validation for country data.

Recommended:

```text
Zod
```

or an equivalent lightweight schema validation library.

The objective:

```text
country.json
      ↓
validation
      ↓
valid Country object
      ↓
render page
```

---

# 33. Validation Must Catch

Examples:

```text
missing country name

invalid slug

missing ISO code

invalid numeric fields

missing leader name

bad date strings

invalid latitude

invalid longitude

missing required asset

invalid source structure

wrong schema version
```

Do not silently render malformed data.

---

# 34. Development Validation

In development:

Invalid critical data should produce a clear error.

Example:

```text
Invalid country data:
population.value must be a positive number
```

Do not hide data problems behind fallback strings.

---

# 35. Production Fallback

Production should fail gracefully.

If non-critical information is unavailable:

```text
Data unavailable
```

or omit the optional field.

Never print:

```text
undefined

NaN

null
```

to visitors.

---

# 36. Country Data Architecture

Recommended organization:

```text
src/
├── data/
│   └── countries/
│       └── indonesia/
│           ├── index.ts
│           ├── core.json
│           ├── culture.json
│           ├── places.json
│           └── sources.json
```

OR keep one JSON file if the dataset is still manageable.

Do not split simply for the sake of splitting.

The important rule is:

```text
data remains independent from UI
```

---

# 37. Future Database Compatibility

Even though PLAN-01.1 still uses local data, design objects as if they may later come from:

```text
PostgreSQL
Supabase
API
CMS
Admin Panel
CSV Import
```

Avoid filesystem-specific assumptions inside UI components.

For example, avoid:

```tsx
import indonesia from "@/data/indonesia.json";
```

deep inside individual sections.

Use a data access layer.

---

# 38. Country Repository Layer

Create or improve:

```text
src/lib/countries/
```

Possible functions:

```ts
getCountryBySlug(slug)

getAllCountries()

validateCountry(data)

formatCountryStat(data)

getCountrySources(slug)
```

UI pages should rely on this layer.

---

# 39. Data Presentation Formatting

Do not store UI strings when the value should be computable.

Bad:

```json
{
  "population": "284.67M+"
}
```

Better:

```json
{
  "population": {
    "value": 284670000
  }
}
```

Formatter:

```ts
formatPopulation(284670000)
```

returns:

```text
284.67M
```

This lets the UI change without rewriting the database.

---

# 40. Preserve Precision

Do not aggressively round stored source data.

Store:

```text
284670000
```

Render:

```text
284.67M
```

Raw value and display value are separate concepts.

---

# 41. Units Must Be Explicit

Avoid ambiguous data like:

```json
{
  "area": 1904569
}
```

Prefer:

```json
{
  "area": {
    "value": 1904569,
    "unit": "km2"
  }
}
```

This is essential for future internationalization and conversion.

---

# 42. Asset Audit

Audit all current Indonesia images.

Check:

```text
resolution
aspect ratio
compression
subject relevance
broken images
duplicate images
visual consistency
copyright/source notes where available
```

Hero imagery must be high quality.

Leader portraits should have sufficient resolution.

Food cards should not use low-resolution thumbnails.

---

# 43. Asset Metadata

Prepare asset metadata.

Example:

```ts
export interface MediaAsset {
  path: string;

  alt: string;

  width?: number;

  height?: number;

  source?: string;

  sourceUrl?: string;

  author?: string;

  license?: string;

  downloadedAt?: string;
}
```

This will become extremely useful when Google Colab later downloads assets automatically.

---

# 44. Never Lose Image Provenance

When an automated script downloads an image later, the system should retain:

```text
where it came from
who created it
license if known
original URL
download date
local filename
```

Do not create thousands of anonymous image files.

---

# 45. Hero Polish

Review the Indonesia hero.

The hero should prioritize:

```text
INDONESIA
```

as the dominant element.

Secondary information:

```text
IDN

REPUBLIC OF INDONESIA

SOUTHEAST ASIA
```

Then tertiary geographic metadata.

Avoid overcrowding the hero with statistics.

---

# 46. Section Hierarchy Audit

Every section should clearly have:

```text
eyebrow / category

title

primary visual

primary fact/story

secondary metadata
```

Avoid sections that feel like unrelated cards stacked vertically.

---

# 47. Avoid Repetitive Card Design

Do not make:

```text
Leadership
Capital
Food
Landmarks
Languages
Economy
```

all use the exact same card template.

The page should have editorial rhythm.

Examples:

```text
Leadership → portrait editorial

Capital → cinematic full-width

Geography → information composition

Population → typography/statistics

Landmarks → horizontal imagery

Cuisine → magazine grid

Timeline → chronological composition

Gallery → immersive visual ending
```

---

# 48. Improve Data/Story Balance

The site should not become a spreadsheet with photographs.

Each major section should balance:

```text
DATA
+
STORY
+
IMAGE
```

Example:

```text
17,380
ISLANDS

One of the world's largest archipelagic nations.
```

---

# 49. Leadership Visual Hierarchy

President:

```text
large portrait
primary card
strong typography
```

Vice President:

```text
secondary visual treatment
```

Do not duplicate the President to represent constitutional roles.

---

# 50. Capital Transition Storytelling

Indonesia's capital transition is visually interesting.

Treat it as an editorial feature rather than a data problem.

Potential composition:

```text
JAKARTA
       ↓
THE TRANSITION
       ↓
NUSANTARA
```

Use restrained motion.

Do not turn this into a politically opinionated section.

Present verified factual status only.

---

# 51. Geography Improvement

Geography section should clearly distinguish:

```text
national geographic data

capital location

land area

sea context

island count

neighboring countries

major geographic features
```

Do not display city coordinates as national coordinates.

---

# 52. Data Source UX

PLAN-01.1 does NOT need a giant citation system.

However, begin supporting subtle source exposure.

Possible UI:

```text
Source: BPS · 2025
```

or:

```text
DATA SOURCE
BPS / SUPAS 2025
```

This can appear in detailed/statistical sections.

---

# 53. Optional Source Drawer

If straightforward, create a reusable:

```text
DataSourceBadge
```

or:

```text
SourcePopover
```

Example:

```text
Population
284.67M

BPS · 2025
```

Clicking source metadata can eventually show:

```text
Publication
Reference year
Last verified
External source
```

Do not overbuild it yet.

---

# 54. Responsive Audit

Test:

```text
320px

375px

430px

768px

1024px

1440px

1920px
```

Pay special attention to:

```text
INDONESIA hero typography

leadership portraits

horizontal landmark scrolling

economy numbers

timeline

gallery

navigation
```

---

# 55. Mobile Rules

Mobile should not simply compress desktop.

For mobile:

```text
reduce extreme typography

remove unnecessary parallax

avoid horizontal overflow

increase touch targets

simplify sticky effects

stack information intentionally
```

---

# 56. Animation Audit

Review every animation.

Remove animations that:

```text
delay content
cause layout shifts
feel repetitive
harm mobile performance
hide important content
```

Keep:

```text
hero reveal
image mask reveals
subtle parallax
section transitions
card hover motion
navigation transitions
```

when they materially improve the experience.

---

# 57. Animation Architecture

Prefer:

```text
Framer Motion
```

for:

```text
component transitions
hover states
simple reveals
presence animations
```

Use:

```text
GSAP
```

only when needed for:

```text
complex scroll timelines
advanced coordinated motion
```

Do not use both libraries for the same simple effect.

---

# 58. Accessibility Audit

Ensure:

```text
semantic headings

logical heading order

alt text

keyboard navigation

focus visibility

button labels

screen-reader compatible navigation

sufficient contrast

reduced motion
```

Decorative images should not have noisy alt descriptions.

---

# 59. Performance Audit

Check:

```text
Largest Contentful Paint

Cumulative Layout Shift

JavaScript bundle size

image sizes

client component count

animation overhead
```

Avoid making the entire country page:

```tsx
"use client";
```

Only interactive components should require client rendering.

---

# 60. Image Loading Strategy

Hero:

```text
priority loading
```

Below-fold content:

```text
lazy loading
```

Gallery images should not all preload.

Ensure known dimensions to reduce layout shift.

---

# 61. Homepage Crawler Test

Verify homepage with:

```text
JavaScript enabled

JavaScript disabled

server-rendered HTML inspection
```

Meaningful homepage content must exist even without animation execution.

---

# 62. Error Monitoring During Development

Run browser console checks.

There must be no recurring:

```text
hydration errors

React key warnings

failed image requests

undefined values

animation initialization errors
```

---

# 63. Explore Page Polish

Since Indonesia remains the only active country:

```text
001 AVAILABLE
```

is acceptable.

Other regions should remain:

```text
COMING SOON
```

Do not add fake country entries merely to make the page look populated.

---

# 64. Prepare CSV Compatibility Without Implementing Import

PLAN-01.1 should NOT build the admin panel.

However, ensure the country schema can eventually map cleanly to CSV/import records.

Think about how fields could later be represented as:

```text
country
category
field
value
unit
reference_year
source_name
source_url
last_verified
```

Example conceptual row:

```text
indonesia
demographics
population
284670000
people
2025
BPS
...
2026-08-07
```

This is planning only.

Do NOT build the complete CSV ingestion pipeline yet.

---

# 65. Separate Structured Data From Editorial Content

Future admin/database design will likely contain two broad content types.

## Structured facts

Examples:

```text
population
GDP
area
currency
ISO
coordinates
leaders
```

## Editorial content

Examples:

```text
country introduction
culture description
landmark descriptions
historical narratives
food descriptions
```

Do not force both into the same primitive key/value structure.

---

# 66. Stable IDs

Start giving repeatable content entities IDs.

Example:

```text
leader_prabowo_subianto

landmark_borobudur

food_rendang

culture_batik

timeline_independence_1945
```

These IDs will later make database migration and CSV imports much safer.

---

# 67. Slug Rules

Use predictable slugs.

Example:

```text
indonesia

borobudur

raja-ampat

nasi-goreng
```

Avoid identifiers based on array indexes.

---

# 68. Do Not Build Admin Yet

PLAN-01.1 explicitly does NOT include:

```text
admin login

admin dashboard

database write UI

CSV uploader

CMS

role permissions

content approval

bulk imports

AI generation interface
```

The goal is merely to ensure those systems can be added without rewriting the public frontend.

---

# 69. Do Not Build Automated Colab Pipeline Yet

Do NOT implement:

```text
Google Colab scraper

automatic Google image downloader

AI content generator

automatic CSV generation

automatic image ingestion
```

Those belong in later phases.

---

# 70. Security Preparation

No secrets should ever be stored inside:

```text
country JSON

frontend environment variables exposed to browser

source metadata

public asset folders
```

Future API keys belong server-side.

---

# 71. Proposed Country Schema Direction

The final schema should roughly support:

```ts
interface Country {
  schemaVersion: string;

  id: string;

  slug: string;

  identity: CountryIdentity;

  geography: CountryGeography;

  population: CountryPopulation;

  government: CountryGovernment;

  capital: CapitalInfo;

  economy: CountryEconomy;

  languages: CountryLanguages;

  landmarks: Landmark[];

  foods: Food[];

  culture: CultureItem[];

  timeline: TimelineEvent[];

  gallery: MediaAsset[];

  sources?: DataSource[];

  meta: {
    createdAt?: string;
    updatedAt: string;
    lastReviewedAt?: string;
  };
}
```

Do not treat this sample as mandatory line-for-line code.

Adapt it to the existing repository architecture where appropriate.

---

# 72. Backward Compatibility

If the current PLAN-01 schema already works:

Do not rewrite everything unnecessarily.

Migrate deliberately.

Create mappings where necessary.

Avoid massive architecture churn merely to achieve prettier type definitions.

---

# 73. Migration Strategy

Recommended order:

```text
1. inspect existing Indonesia data

2. design schema v1.1

3. add validation

4. migrate existing Indonesia data

5. update loaders

6. update components

7. correct facts

8. redesign affected sections

9. fix homepage rendering

10. perform polish/testing
```

Do not simultaneously rewrite schema and visual sections without checkpoints.

---

# 74. Mandatory Current Data Corrections

At minimum correct/review:

```text
Population:
Use current authoritative BPS reference.

Island count:
17,380 based on current BIG official references.

GDP:
Use latest suitable annual BPS data.

GDP per capita:
Use latest suitable annual BPS data.

Leadership:
Prabowo Subianto — President
Gibran Rakabuming Raka — Vice President

Coordinates:
Separate Indonesia geographic reference from Jakarta coordinates.

Capital:
Represent transition/status explicitly and verify current legal/administrative wording using primary official sources.
```

---

# 75. Do Not Guess Missing Data

If authoritative verification cannot be found:

Use:

```text
null
```

or:

```text
unverified
```

internally.

Do not invent precise values.

It is better to omit a statistic than confidently display incorrect data.

---

# 76. Data Freshness Categories

Optionally classify fields.

Example:

```text
STATIC

SLOW_CHANGING

ANNUAL

FREQUENT

POLITICAL
```

Examples:

```text
ISO code → STATIC

island count → SLOW_CHANGING

population → ANNUAL

GDP → ANNUAL

president → POLITICAL
```

This will later help automated update schedules.

---

# 77. Freshness Metadata

Possible:

```ts
type FreshnessClass =
  | "static"
  | "slow"
  | "annual"
  | "frequent"
  | "political";
```

Then:

```json
{
  "freshness": "annual",
  "lastVerifiedAt": "2026-08-07"
}
```

This is optional but recommended.

---

# 78. Quality Gate

Before marking PLAN-01.1 complete:

Every visible statistic must have been consciously reviewed.

Do not assume untouched PLAN-01 data is correct.

---

# 79. Testing Requirements

Run:

```bash
pnpm lint
```

and:

```bash
pnpm build
```

Both must pass.

Also manually test:

```text
/

/explore

/country/indonesia

invalid country slug
```

---

# 80. Browser Testing

At minimum:

```text
Chromium desktop

mobile viewport
```

Check:

```text
initial loading
navigation
scroll
horizontal sections
leader cards
image loading
footer
back navigation
```

---

# 81. Content Failure Tests

Temporarily test scenarios such as:

```text
leader image missing

landmark image missing

optional description missing

source missing

GDP missing

empty regional languages array
```

Page should remain usable.

---

# 82. Definition of Done

PLAN-01.1 is complete when:

- Indonesia population has been updated from an authoritative current source
- island count has been corrected
- GDP/GDP per capita have appropriate reference dates and sources
- statistics preserve provenance
- data has source metadata where appropriate
- last verification dates are supported
- schema versioning exists
- runtime validation exists
- country and capital coordinates are separate
- leadership duplication is removed
- leadership data is time-aware
- capital model supports transitions and multiple statuses
- Indonesia's capital wording has been verified against primary sources
- homepage meaningful content is server accessible
- loader cannot permanently hide content
- SEO metadata works
- social preview metadata works
- source-aware components exist where useful
- mobile layout is polished
- reduced motion works
- animation remains cinematic but non-blocking
- image loading is optimized
- assets retain meaningful metadata where possible
- public UI remains visually polished
- schema is ready for future database migration
- schema is ready for future bulk import
- no admin panel has been prematurely built
- no additional countries were added
- `pnpm lint` passes
- `pnpm build` passes
- no significant console errors remain

---

# 83. Expected Result

At the end of PLAN-01.1:

```text
WORLD ATLAS
│
├── Reliable public frontend
│
├── Indonesia
│   ├── verified structured information
│   ├── source-aware statistics
│   ├── correct leadership model
│   ├── capital transition support
│   ├── separate geographic coordinates
│   ├── optimized assets
│   └── polished visual storytelling
│
├── Country Schema v1.1
│
├── Data validation
│
├── Data source metadata
│
└── Future-ready data access layer
```

---

# 84. Future Architecture Target

PLAN-01.1 should make this future architecture possible:

```text
DATA COLLECTION
Google Colab / Python / AI
        ↓
Normalized Dataset
CSV / JSON / Assets
        ↓
Import Validation
        ↓
Admin Panel
        ↓
Database
        ↓
Public API / Data Layer
        ↓
WORLD ATLAS FRONTEND
```

Do NOT implement the pipeline yet.

Simply ensure today's frontend will fit into that architecture later.

---

# 85. Suggested Roadmap After PLAN-01.1

```text
PLAN-01
FOUNDATION + INDONESIA
✅

PLAN-01.1
INDONESIA POLISH & DATA HARDENING
← CURRENT

PLAN-02
DATA & ASSET PIPELINE

PLAN-03
DATABASE FOUNDATION

PLAN-04
ADMIN CONTENT SYSTEM

PLAN-05
BULK CSV IMPORT & VALIDATION

PLAN-06
ASIA EXPANSION

PLAN-07
INTERACTIVE WORLD MAP

PLAN-08
GLOBAL SEARCH & DISCOVERY

PLAN-09
WORLD LEADERS

PLAN-10
COUNTRY COMPARISON
```

The exact numbering can change later.

---

# 86. Agent Execution Instruction

Before implementing:

1. Inspect the current repository.
2. Do not recreate working functionality unnecessarily.
3. Audit the current Indonesia schema.
4. Identify every hardcoded country-specific field.
5. Identify homepage loading architecture.
6. Create a schema migration plan.
7. Implement schema v1.1.
8. Add validation.
9. Migrate Indonesia data.
10. Correct inaccurate/outdated facts using authoritative sources.
11. Update affected components.
12. Fix homepage rendering/loading.
13. Perform visual polish.
14. Test mobile.
15. Test reduced motion.
16. Run lint/build.
17. Fix all relevant errors before completion.

Do not blindly replace the entire project.

Preserve good work from PLAN-01.

---

# 87. Final Principle

PLAN-01 created Indonesia.

PLAN-01.1 must make Indonesia trustworthy.

The system should no longer treat country information as anonymous strings.

Every changing statistic should conceptually know:

```text
VALUE
DATE
SOURCE
VERIFICATION
```

Every country-specific visual should consume reusable structured data.

Every animation should enhance content rather than control whether content exists.

Every architecture decision should anticipate:

```text
195 countries
automated collection
CSV import
database storage
admin management
future updates
```

without prematurely building those systems.

Indonesia remains the only fully implemented country until this foundation is stable.

---

# END OF PLAN-01.1