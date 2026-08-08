# PLAN-02 — DATABASE & BACKEND FOUNDATION

## Status

```text
PLAN-01
Frontend Foundation
✅ DONE

PLAN-01.1
Data / Structure Hardening
✅ DONE

PLAN-01.2
Frontend Finalization
✅ DONE

PLAN-02
Database & Backend Foundation
← CURRENT
```

---

# 1. Purpose

PLAN-02 memindahkan World Atlas dari frontend berbasis local development data menjadi aplikasi yang mengambil data dari database production-ready.

Current:

```text
Local Data
    ↓
Next.js
    ↓
World Atlas
```

Target:

```text
Supabase PostgreSQL
        ↓
Drizzle ORM
        ↓
Next.js Server
        ↓
World Atlas
```

Frontend yang sudah selesai pada PLAN-01.x harus dipertahankan.

PLAN-02 adalah perubahan infrastructure/data layer.

Bukan redesign.

---

# 2. Primary Goal

Setelah PLAN-02 selesai:

```text
/

/explore

/country/indonesia
```

harus mengambil data Indonesia dari PostgreSQL.

Tidak lagi bergantung pada:

```text
indonesia.json
```

sebagai runtime source.

Secara visual website harus tetap hampir identik dengan hasil PLAN-01.2.

---

# 3. Deployment Target

Target deployment utama:

```text
VERCEL
```

Karena project menggunakan Next.js, backend tidak perlu dibuat sebagai server/repository terpisah.

Gunakan:

```text
Next.js
├── Frontend
├── Server Components
├── Server-side data access
├── Route Handlers jika diperlukan
└── Backend logic
```

Semua tetap dalam satu project.

---

# 4. Database Decision

Gunakan:

```text
Supabase PostgreSQL
```

Do NOT use SQLite sebagai production database.

SQLite boleh tersedia di development environment, tetapi jangan dijadikan database World Atlas.

Alasan utama:

```text
World Atlas
      ↓
Vercel Functions
      ↓
needs persistent external database
```

Production database harus independen dari filesystem Vercel.

---

# 5. ORM Decision

Gunakan:

```text
Drizzle ORM
```

Stack:

```text
PostgreSQL
+
Drizzle ORM
+
postgres.js
+
Drizzle Kit
```

Install package yang diperlukan menggunakan version yang stabil dan kompatibel dengan project saat implementasi.

Conceptually:

```bash
pnpm add drizzle-orm postgres
pnpm add -D drizzle-kit
```

Jangan melakukan major dependency upgrade yang tidak diperlukan.

---

# 6. Do Not Install Local PostgreSQL

Environment development saat ini tidak memiliki PostgreSQL.

Tidak masalah.

Jangan menginstall PostgreSQL daemon hanya untuk PLAN-02.

Development harus menggunakan remote development database di Supabase.

Architecture:

```text
Local / Codespace
        ↓
Supabase PostgreSQL
```

dan:

```text
Vercel
   ↓
Supabase PostgreSQL
```

---

# 7. Supabase Role

Pada PLAN-02, Supabase digunakan terutama sebagai:

```text
MANAGED POSTGRESQL
```

Belum perlu menggunakan:

```text
Supabase Auth
Supabase Storage
Supabase Edge Functions
Supabase Realtime
```

Jangan memperbesar scope.

---

# 8. Do Not Add Supabase Client Without Need

Karena Drizzle akan berbicara langsung ke PostgreSQL:

```text
Next.js
   ↓
Drizzle
   ↓
postgres.js
   ↓
Supabase PostgreSQL
```

Tidak perlu menjadikan:

```text
@supabase/supabase-js
```

sebagai dependency hanya untuk membaca database.

Tambahkan hanya apabila benar-benar diperlukan.

---

# 9. Database Connection

Gunakan environment variable:

```text
DATABASE_URL
```

Runtime Vercel harus menggunakan connection yang sesuai untuk serverless environment.

Supabase transaction pooler direkomendasikan untuk runtime serverless.

Jika menggunakan transaction pooler dengan `postgres.js`, disable prepared statements.

Conceptual example:

```ts
const client = postgres(process.env.DATABASE_URL!, {
  prepare: false,
});
```

Kemudian:

```ts
const db = drizzle(client);
```

---

# 10. Migration Connection

Pisahkan runtime connection dan migration connection jika diperlukan.

Example:

```text
DATABASE_URL
```

untuk runtime.

Dan:

```text
DATABASE_MIGRATION_URL
```

untuk:

```text
Drizzle Kit
migration
schema management
```

Gunakan Supabase direct/session connection yang sesuai untuk migration.

Jangan hardcode connection string.

---

# 11. Environment Security

Tidak boleh ada:

```text
database password
connection string
database credentials
```

di source code.

Gunakan:

```text
.env.local
```

untuk local development.

Gunakan Vercel Environment Variables untuk deployment.

---

# 12. Never Use NEXT_PUBLIC

Database connection MUST NOT menggunakan:

```text
NEXT_PUBLIC_DATABASE_URL
```

atau environment variable public lainnya.

Database credential hanya boleh tersedia server-side.

---

# 13. Environment Example

Create/update:

```text
.env.example
```

Example:

```text
DATABASE_URL=
DATABASE_MIGRATION_URL=
```

Jangan masukkan credential asli.

---

# 14. Proposed Database Directory

Recommended:

```text
src/
├── db/
│   ├── index.ts
│   ├── schema/
│   │   ├── countries.ts
│   │   ├── capitals.ts
│   │   ├── leaders.ts
│   │   ├── statistics.ts
│   │   ├── languages.ts
│   │   ├── landmarks.ts
│   │   ├── foods.ts
│   │   ├── culture.ts
│   │   ├── timeline.ts
│   │   ├── media.ts
│   │   ├── sources.ts
│   │   └── index.ts
│   └── relations.ts
│
├── server/
│   └── repositories/
│       └── countries.ts
│
└── ...
```

Root:

```text
drizzle/
drizzle.config.ts
```

Adapt structure to existing repository if necessary.

Do not reorganize unrelated frontend files.

---

# 15. Database Design Principle

Jangan membuat satu gigantic table:

```text
countries
```

dengan kolom seperti:

```text
food_1
food_2
food_3

landmark_1
landmark_2

leader_1
leader_2
```

Gunakan relational structure.

---

# 16. Core Relationship

Conceptually:

```text
COUNTRY
│
├── Capitals
├── Leaders
├── Statistics
├── Languages
├── Landmarks
├── Foods
├── Culture Items
├── Timeline Events
├── Media
└── Sources
```

Untuk PLAN-02 hanya ada:

```text
INDONESIA
```

---

# 17. Countries Table

Create:

```text
countries
```

Recommended fields:

```text
id
slug

name
official_name
local_name

iso_alpha2
iso_alpha3

continent
region
subregion

calling_code
tld

motto
anthem

summary

schema_version

created_at
updated_at
```

`slug` must be unique.

Example:

```text
indonesia
```

---

# 18. Country IDs

Gunakan stable IDs.

Recommended:

```text
UUID
```

Database relationships menggunakan:

```text
country_id
```

Jangan menggunakan:

```text
country_name
```

sebagai foreign key.

---

# 19. Capitals Table

Create:

```text
capitals
```

Recommended:

```text
id
country_id

name
role
status

latitude
longitude

timezone

description
image_path

display_order

created_at
updated_at
```

Schema harus memungkinkan satu negara memiliki lebih dari satu capital-related record.

Jangan membuat assumption:

```text
1 country = exactly 1 capital forever
```

---

# 20. Leaders Table

Create:

```text
leaders
```

Recommended:

```text
id
country_id

name
position

roles

term_start
term_end

is_current

image_path

display_order

source_id

created_at
updated_at
```

`roles` boleh menggunakan PostgreSQL array atau JSONB jika sesuai.

Example:

```text
President

roles:
- Head of State
- Head of Government
```

Tidak perlu membuat duplicate person.

---

# 21. Statistics Table

Create:

```text
country_statistics
```

Ini akan menyimpan berbagai numeric/statistical facts.

Recommended:

```text
id
country_id

category
key

numeric_value
text_value

unit

reference_year
reference_date

source_id

display_order

created_at
updated_at
```

Example:

```text
country:
Indonesia

category:
demographics

key:
population

numeric_value:
284670000

unit:
people
```

---

# 22. Why Generic Statistics

Jangan membuat kolom baru setiap kali muncul statistic baru.

Avoid:

```text
population
population_density
gdp
gdp_per_capita
islands
land_area
water_area
urban_population
...
```

semuanya sebagai columns di `countries`.

Gunakan:

```text
country_statistics
```

untuk data statistik yang berkembang.

---

# 23. Languages Table

Create:

```text
languages
```

Recommended:

```text
id
country_id

name
type

display_order

created_at
updated_at
```

Example `type`:

```text
official
regional
major
```

---

# 24. Landmarks Table

Create:

```text
landmarks
```

Recommended:

```text
id
country_id

slug
name

location
description

latitude
longitude

image_path

display_order

source_id

created_at
updated_at
```

Country + slug should be unique where appropriate.

---

# 25. Foods Table

Create:

```text
foods
```

Recommended:

```text
id
country_id

slug
name

region
description

image_path

display_order

source_id

created_at
updated_at
```

---

# 26. Culture Items Table

Create:

```text
culture_items
```

Recommended:

```text
id
country_id

slug
title
category

description

image_path

display_order

source_id

created_at
updated_at
```

Examples category:

```text
textile
music
dance
architecture
performance
tradition
```

---

# 27. Timeline Table

Create:

```text
timeline_events
```

Recommended:

```text
id
country_id

year_label
sort_year

title
description

display_order

source_id

created_at
updated_at
```

Gunakan:

```text
year_label
```

untuk presentation.

Dan:

```text
sort_year
```

untuk ordering.

Jangan mengandalkan parsing UI string untuk sorting.

---

# 28. Sources Table

Create:

```text
sources
```

Recommended:

```text
id

organization
publication

url

published_at
accessed_at

created_at
updated_at
```

Satu source dapat direferensikan banyak record.

---

# 29. Media Table

Create:

```text
media_assets
```

Walaupun PLAN-02 belum membuat cloud storage system.

Recommended:

```text
id
country_id

category

path
alt

original_url
source_url

author
license

width
height

display_order

created_at
updated_at
```

Untuk sekarang:

```text
path
```

boleh menunjuk existing local public asset seperti:

```text
/countries/indonesia/...
```

---

# 30. Do Not Migrate Images to Cloud Yet

PLAN-02 tidak perlu memindahkan semua image ke:

```text
Supabase Storage
S3
R2
Vercel Blob
```

Existing static images boleh tetap berada di:

```text
/public
```

PLAN-02 hanya menyiapkan database supaya path/metadata media dapat disimpan.

---

# 31. Optional Editorial Content Table

Jika existing Indonesia data mempunyai banyak section text yang tidak cocok dimasukkan ke `countries`, gunakan:

```text
country_content_blocks
```

Recommended:

```text
id
country_id

section_key

eyebrow
title
body

display_order

created_at
updated_at
```

Example:

```text
section_key:
geography_intro
```

Jangan membuat table ini jika current architecture tidak membutuhkannya.

---

# 32. Foreign Keys

Gunakan foreign keys.

Example:

```text
leaders.country_id
        ↓
countries.id
```

Delete behavior harus intentional.

Country child records boleh menggunakan cascade delete jika aman dan sesuai.

Jangan menggunakan cascade secara sembarangan pada shared records seperti `sources`.

---

# 33. Indexes

Tambahkan indexes yang masuk akal.

Minimum:

```text
countries.slug

leaders.country_id

country_statistics.country_id

landmarks.country_id

foods.country_id

culture_items.country_id

timeline_events.country_id

media_assets.country_id
```

Jangan over-index database yang baru berisi satu negara.

---

# 34. Constraints

Gunakan database constraints untuk menjaga integrity.

Examples:

```text
countries.slug UNIQUE

countries.iso_alpha2 UNIQUE

countries.iso_alpha3 UNIQUE
```

Coordinates harus menggunakan valid numeric types.

Display order harus integer.

---

# 35. Drizzle Schema

Schema database harus ditulis menggunakan:

```text
Drizzle ORM
```

dan menjadi canonical schema definition.

Do not manually create database tables through dashboard and then forget schema files.

---

# 36. Migration System

Gunakan:

```text
Drizzle Kit migrations
```

Migration files harus berada di repository.

Database evolution harus dapat direproduce dari repository.

---

# 37. Package Scripts

Tambahkan scripts yang jelas.

Conceptually:

```json
{
  "scripts": {
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:seed": "...",
    "db:studio": "drizzle-kit studio"
  }
}
```

Adapt command jika current Drizzle version membutuhkan syntax berbeda.

---

# 38. Never Use Push as Production Workflow

Jika menggunakan:

```text
drizzle-kit push
```

untuk prototyping, jangan menjadikannya workflow production utama.

Production schema changes sebaiknya menggunakan committed migrations.

---

# 39. Seed System

Create:

```text
scripts/seed.ts
```

atau lokasi yang sesuai.

Seed harus memasukkan:

```text
INDONESIA
```

beserta current demo content.

---

# 40. Existing Data Is Seed Data

Current Indonesia data dianggap:

```text
DEVELOPMENT / DEMO SEED
```

PLAN-02 tidak perlu melakukan research untuk memperbaiki semua data.

Tujuan seed:

```text
prove database architecture works
```

bukan:

```text
build authoritative national dataset
```

---

# 41. Seed Must Be Repeatable

Running:

```bash
pnpm db:seed
```

dua kali tidak boleh menghasilkan:

```text
Indonesia
Indonesia
Indonesia
```

atau duplicate landmarks/foods/etc.

Seed harus idempotent atau melakukan controlled replacement/upsert.

---

# 42. Seed Transaction

Jika memungkinkan, seed satu negara dalam transaction.

Conceptually:

```text
BEGIN

insert country
insert leaders
insert statistics
insert landmarks
...

COMMIT
```

Jika terjadi error:

```text
ROLLBACK
```

Jangan meninggalkan half-imported country.

---

# 43. Preserve Original Development Data

Existing JSON/data file boleh tetap digunakan untuk:

```text
seed source
fixtures
tests
```

sementara.

Tetapi setelah migration:

```text
PUBLIC WEBSITE
```

tidak boleh mengambil runtime data langsung dari file tersebut.

---

# 44. Database Client

Create centralized database client.

Example location:

```text
src/db/index.ts
```

Database connection tidak boleh dibuat ulang secara acak di setiap component.

---

# 45. Server Only

Database client harus server-only.

Do not import database client from Client Components.

Gunakan protection seperti:

```ts
import "server-only";
```

jika sesuai.

---

# 46. Repository Layer

Create:

```text
src/server/repositories/countries.ts
```

atau equivalent.

Public UI jangan query Drizzle langsung dari setiap section component.

---

# 47. Required Repository Functions

Minimum:

```text
getCountryBySlug(slug)

getAllCountries()

countryExists(slug)
```

Potential supporting function:

```text
getCountrySources(countryId)
```

---

# 48. getCountryBySlug()

Function harus mengambil complete country view.

Conceptually:

```text
Country
├── Core
├── Capitals
├── Leaders
├── Statistics
├── Languages
├── Landmarks
├── Foods
├── Culture
├── Timeline
├── Media
└── Sources
```

Result kemudian dinormalisasi menjadi domain object yang dibutuhkan frontend.

---

# 49. Avoid N+1 Queries

Jangan membuat pattern:

```text
1 query country

+ 1 query setiap landmark

+ 1 query setiap food

+ 1 query setiap image
```

Gunakan relational/batched queries yang reasonable.

Jumlah query harus predictable.

---

# 50. Database Models vs UI Models

Database schema tidak harus identik dengan object yang dikonsumsi UI.

Gunakan mapping:

```text
DATABASE ROWS
      ↓
repository
      ↓
Country domain object
      ↓
UI
```

Ini penting supaya frontend tidak tightly coupled ke database.

---

# 51. Preserve Existing Country Type

Jika existing:

```text
Country
```

TypeScript interface sudah bagus, pertahankan sebisa mungkin.

Repository harus menghasilkan bentuk yang compatible.

Jangan rewrite seluruh frontend hanya karena database schema berbeda.

---

# 52. Homepage Migration

Homepage saat ini menggunakan Indonesia sebagai featured country.

Setelah PLAN-02:

```text
Homepage
   ↓
getCountryBySlug("indonesia")
   ↓
Database
```

Jangan membaca old JSON secara runtime.

---

# 53. Explore Migration

Route:

```text
/explore
```

harus menggunakan:

```text
getAllCountries()
```

Saat ini hasilnya hanya:

```text
Indonesia
```

Future country expansion akan otomatis dapat menggunakan sumber yang sama.

---

# 54. Indonesia Page Migration

Route:

```text
/country/[slug]
```

harus menggunakan slug.

Conceptually:

```ts
const country = await getCountryBySlug(slug);
```

Tidak boleh:

```ts
if (slug === "indonesia") {
  return indonesiaJson;
}
```

---

# 55. Dynamic Country Architecture

Walaupun hanya ada Indonesia:

```text
/country/[slug]
```

harus benar-benar generic.

Tidak boleh ada database layer khusus:

```text
getIndonesia()
```

sebagai main architecture.

---

# 56. Country Not Found

Jika:

```text
/country/testing
```

tidak ada di database:

gunakan existing styled 404:

```text
NATION NOT FOUND
```

Gunakan:

```text
notFound()
```

atau appropriate Next.js behavior.

---

# 57. Backend Architecture

Do NOT create:

```text
Express server
FastAPI server
NestJS server
separate backend repository
Docker backend
```

pada PLAN-02.

Next.js sudah cukup menjadi application backend.

---

# 58. No Internal HTTP Fetch for Server Components

Server Components tidak perlu melakukan:

```text
fetch("/api/countries/indonesia")
```

ke aplikasi sendiri.

Prefer:

```text
Server Component
      ↓
repository function
      ↓
database
```

lebih sederhana dan efisien.

---

# 59. API Routes

Public API tidak wajib dalam PLAN-02.

Buat Route Handler hanya jika benar-benar ada kebutuhan.

Jangan membuat:

```text
/api/countries
/api/leaders
/api/foods
/api/culture
...
```

hanya karena "backend harus punya API".

Admin/API layer akan datang kemudian.

---

# 60. Optional Health Check

Boleh membuat development/internal endpoint sederhana:

```text
/api/health
```

yang memastikan application berjalan.

Database health check hanya jika memang berguna.

Jangan expose credentials atau internal database details.

---

# 61. Error Handling

Database failure harus menghasilkan controlled application behavior.

Tidak boleh menampilkan:

```text
DATABASE_URL
password
SQL query
stack trace
```

kepada visitor.

---

# 62. Development Errors

Di development environment:

error boleh cukup descriptive agar agent dapat debug.

Example:

```text
Database connection failed
```

atau:

```text
Country query failed: indonesia
```

Tetapi secrets tetap tidak boleh dicetak.

---

# 63. Production Error

Public website harus menampilkan existing styled error/fallback apabila data tidak tersedia.

Jangan menghasilkan blank page.

---

# 64. Connection Strategy

Vercel bersifat serverless.

Gunakan database connection strategy yang sesuai.

Runtime:

```text
Supabase Transaction Pooler
```

dan:

```text
postgres.js prepare: false
```

jika menggunakan transaction pooling.

---

# 65. Do Not Open Connections Per Component

Database connection initialization harus centralized.

Do not:

```text
Hero → new postgres connection

Economy → new postgres connection

Foods → new postgres connection
```

Semua server access menggunakan shared database module.

---

# 66. Database Region

Ketika membuat Supabase project:

pilih region yang sesuai dengan expected deployment/audience.

Kemudian usahakan Vercel server execution berada dekat database region.

Jangan memilih region secara random jika dapat dihindari.

---

# 67. No Authentication Yet

PLAN-02 tidak mencakup:

```text
login
admin login
user account
permissions
roles
sessions
```

Database belum membutuhkan admin authentication workflow.

---

# 68. No Write UI Yet

Tidak ada:

```text
Edit Country
Save
Delete
Create Country
```

di frontend.

PLAN-02 hanya mempersiapkan backend/database sehingga write operations dapat ditambahkan nanti.

---

# 69. No CSV Import

Do NOT create:

```text
CSV upload
ZIP upload
import parser
bulk importer
```

pada PLAN-02.

---

# 70. No AI Data Pipeline

Do NOT create:

```text
Google Colab
Python scraper
AI researcher
automatic image downloader
```

pada PLAN-02.

---

# 71. No Additional Countries

Jangan menambahkan:

```text
Japan
USA
Singapore
Malaysia
```

atau negara lain.

Database hanya perlu membuktikan:

```text
Indonesia works end-to-end
```

---

# 72. Existing Images

Keep current:

```text
/public/countries/indonesia/...
```

Jika database menyimpan image path:

```text
/countries/indonesia/hero/...
```

frontend tetap dapat menggunakan existing assets.

---

# 73. Build Safety

Pastikan:

```bash
pnpm build
```

bekerja dengan environment database yang benar.

Jangan membuat build bergantung pada local SQLite file.

---

# 74. Lint

Run:

```bash
pnpm lint
```

Fix relevant errors.

---

# 75. Type Check

Jika project memiliki type-check command, jalankan.

Tidak boleh ada TypeScript database mismatch yang dibiarkan.

---

# 76. Migration Test

Agent harus membuktikan:

```text
empty database
    ↓
run migrations
    ↓
tables created
    ↓
run seed
    ↓
Indonesia inserted
    ↓
website works
```

---

# 77. Seed Verification

Setelah seed:

verify:

```text
countries
= 1

country:
Indonesia
```

Dan child data berhasil masuk.

---

# 78. Runtime Verification

Verify:

```text
/
```

works.

Verify:

```text
/explore
```

works.

Verify:

```text
/country/indonesia
```

works.

Verify:

```text
/country/nonexistent
```

returns styled not-found state.

---

# 79. Prove Website Uses Database

Agent harus membuktikan frontend benar-benar membaca database.

Salah satu cara:

1. Change one harmless demo field in database.
2. Reload relevant page.
3. Verify new value appears.
4. Restore value if necessary.

Atau:

Remove/disable runtime dependency on old JSON and confirm application tetap bekerja.

---

# 80. No Runtime JSON Fallback

Do not silently do:

```ts
try {
  return databaseCountry;
} catch {
  return indonesiaJson;
}
```

Ini akan menyembunyikan database bugs.

Jika database gagal:

fix database.

Do not pretend migration succeeded via hidden fallback.

---

# 81. Visual Regression Rule

PLAN-02 tidak boleh merusak existing visual design.

Compare before/after:

```text
Homepage
Explore
Indonesia
```

Expected:

```text
VISUALLY SAME
```

Minor differences akibat real data formatting boleh terjadi.

---

# 82. Performance

Database migration tidak boleh membuat setiap small component melakukan network/database fetch sendiri.

Prefer one server-side country data load per page architecture.

---

# 83. Cache Strategy

Jangan over-engineer caching pada tahap ini.

Simple database-backed rendering sudah cukup.

Jika existing Next.js caching dapat digunakan dengan aman, gunakan secara minimal.

Do not build complicated cache invalidation system sebelum admin/write system ada.

---

# 84. Timestamps

Database tables yang merupakan content entities sebaiknya mempunyai:

```text
created_at
updated_at
```

Gunakan database timestamp types.

---

# 85. Ordering

Entity yang tampil dalam urutan editorial harus mempunyai:

```text
display_order
```

Example:

```text
Landmarks
Foods
Culture
Timeline
Gallery
```

Jangan bergantung pada accidental database insertion order.

---

# 86. Nullability

Jangan membuat semua database columns:

```text
NOT NULL
```

secara membabi buta.

Field optional seperti:

```text
image
source
coordinates
term_end
subregion
```

boleh nullable jika secara domain memang optional.

---

# 87. Numeric Data

Numeric statistical value harus disimpan sebagai numeric value.

Bad:

```text
"284.7M"
```

Better:

```text
284700000
```

UI formatting tetap dilakukan di frontend/domain layer.

---

# 88. URLs

Source URL disimpan sebagai string URL.

Jangan simpan HTML anchor.

---

# 89. Image Paths

Store:

```text
/countries/indonesia/...
```

bukan:

```text
<img src="...">
```

Presentation tetap milik frontend.

---

# 90. Database Studio

Drizzle Studio boleh digunakan untuk inspect/debug database.

Tetapi jangan menjadikannya admin panel.

Studio hanya development tool.

---

# 91. README Update

Update technical README seperlunya.

Document:

```text
required environment variables

database setup

migration command

seed command

development command

build command
```

Jangan menulis massive documentation yang tidak diperlukan.

---

# 92. Local Development Flow

Expected developer flow:

```text
clone repository

pnpm install

configure .env.local

pnpm db:migrate

pnpm db:seed

pnpm dev
```

Website kemudian bekerja menggunakan Supabase database.

---

# 93. Production Deployment Flow

Expected:

```text
GitHub
   ↓
Vercel
   ↓
Next.js build
   ↓
Vercel Functions
   ↓
Supabase PostgreSQL
```

Environment variables configured in Vercel.

---

# 94. Vercel Environment

Ensure production environment contains required:

```text
DATABASE_URL
```

Migration credential tidak perlu exposed ke runtime production jika tidak digunakan runtime.

---

# 95. Preview Deployments

Jika Vercel Preview memakai database yang sama pada tahap awal, dokumentasikan bahwa itu development behavior.

Jangan membuat complex per-preview database branching pada PLAN-02.

---

# 96. Secret Protection

Search repository before completion.

Ensure tidak ada accidentally committed:

```text
postgres://...
database password
Supabase secret
.env.local
```

`.gitignore` harus benar.

---

# 97. Do Not Change Frontend Design

Agent must NOT use PLAN-02 as excuse to redesign:

```text
hero
navigation
cards
colors
animations
typography
gallery
```

Only modify UI code where needed to consume database data.

---

# 98. Keep Current Components

Existing reusable components should continue receiving data through props.

Example:

```text
Database
   ↓
Country Domain Object
   ↓
CountryHero
LeaderSection
EconomySection
FoodSection
...
```

---

# 99. Database Failure Test

Temporarily test invalid database connection.

Application must fail predictably.

Restore connection afterward.

Do not leave hidden fallback.

---

# 100. Final Architecture

Expected architecture:

```text
┌──────────────────────────────┐
│          SUPABASE            │
│         PostgreSQL           │
└──────────────┬───────────────┘
               │
               │ postgres.js
               │
┌──────────────▼───────────────┐
│        DRIZZLE ORM           │
│ schema + queries + migration │
└──────────────┬───────────────┘
               │
┌──────────────▼───────────────┐
│     SERVER DATA LAYER        │
│                              │
│ getCountryBySlug()           │
│ getAllCountries()            │
│ countryExists()              │
└──────────────┬───────────────┘
               │
┌──────────────▼───────────────┐
│          NEXT.JS             │
│                              │
│ /                            │
│ /explore                     │
│ /country/[slug]              │
└──────────────┬───────────────┘
               │
┌──────────────▼───────────────┐
│           VERCEL             │
└──────────────────────────────┘
```

---

# 101. Out of Scope

Explicitly DO NOT implement during PLAN-02:

```text
Admin Panel

Authentication

Supabase Auth

CSV Upload

ZIP Upload

Dataset Importer

Google Colab Pipeline

AI Data Collector

Automatic Scraper

Automatic Content Generation

Cloud Image Storage Migration

World Map

Search System

Country Comparison

Additional Countries
```

---

# 102. Definition of Done

PLAN-02 is complete when:

- Supabase PostgreSQL database exists
- Drizzle ORM configured
- postgres.js configured
- serverless-compatible database connection works
- database credentials remain server-side
- Drizzle schema exists in repository
- migrations exist
- migrations can create database structure
- Indonesia seed exists
- seed can be run repeatedly without duplication
- Indonesia core data exists in PostgreSQL
- leaders exist in PostgreSQL
- statistics exist in PostgreSQL
- languages exist in PostgreSQL
- capitals exist in PostgreSQL
- landmarks exist in PostgreSQL
- foods exist in PostgreSQL
- culture items exist in PostgreSQL
- timeline events exist in PostgreSQL
- media references exist where needed
- sources structure exists
- homepage reads database
- explore page reads database
- Indonesia page reads database
- country route remains generic
- invalid country returns proper not-found state
- frontend no longer depends on local Indonesia JSON at runtime
- no silent JSON fallback exists
- existing frontend appearance remains intact
- no admin system was added
- no importer was added
- no new country was added
- no database secrets are committed
- production build succeeds
- lint succeeds
- application is structurally ready for Vercel deployment

---

# 103. Agent Execution Order

Follow this order.

### Step 1

Inspect current repository.

Understand:

```text
existing Country type
existing Indonesia data
current loaders
current route architecture
current image structure
```

Do not start coding blindly.

### Step 2

Install database dependencies.

```text
Drizzle ORM
Drizzle Kit
postgres.js
```

### Step 3

Create database connection architecture.

### Step 4

Create Drizzle schema.

### Step 5

Create first migration.

### Step 6

Apply migration to Supabase PostgreSQL.

### Step 7

Create Indonesia seed script using existing demo data.

### Step 8

Seed database.

### Step 9

Create repository/data-access layer.

### Step 10

Make:

```text
getCountryBySlug()
getAllCountries()
countryExists()
```

work against PostgreSQL.

### Step 11

Map database results into existing Country/domain shape.

### Step 12

Migrate:

```text
/
```

to database-backed data.

### Step 13

Migrate:

```text
/explore
```

to database-backed data.

### Step 14

Migrate:

```text
/country/[slug]
```

to database-backed data.

### Step 15

Remove runtime dependency on Indonesia local JSON.

### Step 16

Verify 404 behavior.

### Step 17

Verify visual parity.

### Step 18

Run:

```bash
pnpm lint
```

### Step 19

Run:

```bash
pnpm build
```

### Step 20

Fix all relevant errors.

---

# 104. Important Agent Rules

Do not switch to SQLite simply because SQLite exists locally.

Do not install PostgreSQL daemon unnecessarily.

Do not create a separate backend server.

Do not rebuild the frontend.

Do not research or rewrite the dummy Indonesia dataset.

Do not add admin functionality.

Do not add authentication.

Do not add CSV imports.

Do not add other countries.

Do not expose database credentials.

Do not create silent local-data fallback.

Do not finish PLAN-02 until the website demonstrably reads Indonesia from PostgreSQL.

---

# 105. Final Success Test

The strongest proof that PLAN-02 succeeded:

Before:

```text
indonesia.json
      ↓
World Atlas
```

After:

```text
Supabase PostgreSQL
       ↓
Drizzle
       ↓
Next.js Server
       ↓
World Atlas
```

And visually:

```text
BEFORE ≈ AFTER
```

The infrastructure changes.

The existing World Atlas experience remains intact.

---

# END OF PLAN-02