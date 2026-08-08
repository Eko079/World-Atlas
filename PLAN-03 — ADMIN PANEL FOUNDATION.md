# PLAN-03 — ADMIN PANEL FOUNDATION

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
✅ DONE

PLAN-03
Admin Panel Foundation
← CURRENT
```

---

# 1. Purpose

PLAN-03 menambahkan internal Admin Panel untuk mengelola data World Atlas yang sekarang sudah berada di Supabase PostgreSQL.

Current architecture:

```text
Supabase PostgreSQL
        ↓
Drizzle ORM
        ↓
Next.js Server
        ↓
Public Website
```

Target PLAN-03:

```text
                    ┌── Public Website
                    │
Supabase PostgreSQL ┤
                    │
                    └── Admin Panel
                          ↓
                       EDIT DATA
                          ↓
                       SAVE
                          ↓
                    PostgreSQL
                          ↓
                  Public Website Updated
```

Admin Panel harus menggunakan backend/data layer yang sama.

---

# 2. Primary Goal

Setelah PLAN-03 selesai, admin harus dapat:

```text
LOGIN
  ↓
OPEN ADMIN DASHBOARD
  ↓
OPEN INDONESIA
  ↓
EDIT CONTENT
  ↓
SAVE
  ↓
DATABASE UPDATED
  ↓
PUBLIC PAGE UPDATED
```

Success test utama:

```text
/admin
   ↓
Indonesia
   ↓
ubah satu description
   ↓
SAVE
   ↓
/country/indonesia
   ↓
perubahan terlihat
```

---

# 3. Deployment Target

Admin harus berjalan dalam deployment Vercel yang sama.

Architecture:

```text
VERCEL
└── Next.js
    ├── Public Website
    │
    ├── Admin Panel
    │
    ├── Server Actions
    │
    ├── Auth
    │
    └── Drizzle ORM
              ↓
        Supabase PostgreSQL
```

Do NOT create a separate admin server.

Do NOT create a separate backend repository.

---

# 4. Authentication Decision

Gunakan:

```text
Supabase Auth
```

khusus untuk authentication admin.

Database access tetap:

```text
Drizzle ORM
    ↓
PostgreSQL
```

Jangan mengubah public data layer menjadi Supabase REST API.

---

# 5. Authentication Architecture

Use:

```text
Admin Browser
     ↓
Supabase Auth
     ↓
Secure Session Cookie
     ↓
Next.js Server
     ↓
requireAdmin()
     ↓
Admin Page / Server Action
```

Authentication dan database merupakan dua concern berbeda.

---

# 6. Supabase Auth Packages

Tambahkan package Supabase hanya untuk authentication.

Recommended:

```text
@supabase/supabase-js
@supabase/ssr
```

Gunakan current stable compatible versions.

Do not replace Drizzle.

---

# 7. Required Environment Variables

Add:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=

ADMIN_EMAILS=
```

Existing:

```env
DATABASE_URL=
DATABASE_MIGRATION_URL=
```

tetap dipertahankan.

---

# 8. Publishable Key

Supabase publishable key boleh digunakan pada client untuk authentication.

Never expose:

```text
database password

DATABASE_URL

DATABASE_MIGRATION_URL

service_role key
```

kepada browser.

PLAN-03 tidak membutuhkan Supabase `service_role` key.

---

# 9. Admin Allowlist

Karena saat ini admin masih sederhana, gunakan explicit allowlist.

Example:

```env
ADMIN_EMAILS="admin@example.com"
```

Jika lebih dari satu:

```env
ADMIN_EMAILS="admin1@example.com,admin2@example.com"
```

Admin dianggap valid hanya jika:

```text
Supabase Auth session valid

AND

user email exists in ADMIN_EMAILS
```

---

# 10. No Public Registration

Do NOT create:

```text
SIGN UP
REGISTER
CREATE ACCOUNT
```

untuk visitor.

Admin account dibuat secara manual melalui Supabase Auth Dashboard.

Public signup harus disabled jika memungkinkan.

---

# 11. Admin Account Setup

Initial administrator:

```text
Supabase Dashboard
        ↓
Authentication
        ↓
Users
        ↓
Create Admin User
```

Gunakan:

```text
Email
Password
```

Kemudian masukkan email tersebut ke:

```text
ADMIN_EMAILS
```

di local environment dan Vercel.

---

# 12. Login Route

Create:

```text
/admin/login
```

Login UI:

```text
WORLD ATLAS

ADMIN CONTROL

Email
[________________]

Password
[________________]

[ SIGN IN ]
```

Tidak perlu cinematic design.

Admin UI harus functional, clean, dan cepat.

---

# 13. Login Behavior

Successful login:

```text
/admin/login
      ↓
authentication success
      ↓
validate ADMIN_EMAILS
      ↓
/admin
```

Invalid credentials:

```text
Invalid email or password
```

Authenticated tetapi bukan allowlisted admin:

```text
ACCESS DENIED
```

Jangan expose detail keamanan berlebihan.

---

# 14. Logout

Admin navigation harus memiliki:

```text
SIGN OUT
```

Logout:

```text
clear Supabase session
        ↓
redirect /admin/login
```

---

# 15. Session Strategy

Gunakan Supabase SSR authentication pattern.

Session harus bekerja dengan:

```text
Server Components
Server Actions
Route navigation
Vercel deployment
```

Jangan hanya menyimpan authentication state di React state/localStorage.

---

# 16. Supabase Server Client

Create server-side Supabase auth helper.

Recommended conceptual structure:

```text
src/
└── lib/
    └── supabase/
        ├── client.ts
        ├── server.ts
        └── auth.ts
```

Adapt according to current repository.

---

# 17. Admin Authorization Helper

Create:

```text
requireAdmin()
```

Conceptually:

```ts
const user = await getAuthenticatedUser();

if (!user) redirect("/admin/login");

if (!isAllowedAdmin(user.email)) {
  throw new Error("Unauthorized");
}

return user;
```

---

# 18. Security Critical Rule

Protecting `/admin` layout is NOT sufficient.

Every mutation must independently call:

```text
requireAdmin()
```

before modifying database.

Example:

```text
updateCountry()
createLandmark()
deleteFood()
updateLeader()
```

must verify authorization server-side.

---

# 19. Never Trust Client Authorization

Do NOT use:

```ts
if (isAdmin) {
  // client-side only
}
```

as security.

Client UI may hide buttons.

Server must enforce permissions.

---

# 20. Admin Route Structure

Recommended:

```text
/admin
/admin/login

/admin/countries

/admin/countries/[slug]

/admin/countries/[slug]/identity
/admin/countries/[slug]/capital
/admin/countries/[slug]/leadership
/admin/countries/[slug]/statistics
/admin/countries/[slug]/languages
/admin/countries/[slug]/landmarks
/admin/countries/[slug]/foods
/admin/countries/[slug]/culture
/admin/countries/[slug]/timeline
/admin/countries/[slug]/sources
/admin/countries/[slug]/media
```

Adapt if existing Next.js route structure suggests a cleaner implementation.

---

# 21. Admin Layout

Admin should have its own layout.

Example:

```text
┌─────────────────────────────────────────────┐
│ WORLD ATLAS ADMIN                    USER   │
├──────────────┬──────────────────────────────┤
│              │                              │
│ Dashboard    │                              │
│ Countries    │         CONTENT              │
│              │                              │
│              │                              │
│              │                              │
│ Sign Out     │                              │
└──────────────┴──────────────────────────────┘
```

---

# 22. Admin Design Direction

Admin UI should NOT copy the cinematic public website.

Use:

```text
clean
dense enough
fast
high readability
clear forms
clear states
predictable navigation
```

Public website:

```text
EXPERIENCE
```

Admin:

```text
UTILITY
```

---

# 23. Admin Visual Style

It may remain dark to match the product.

Recommended:

```text
Dark neutral background
Clear surfaces
Thin borders
Readable typography
Small restrained accent
```

Avoid:

```text
parallax
cinematic loaders
massive typography
GSAP
horizontal storytelling
```

inside Admin.

---

# 24. Admin Navigation

Sidebar:

```text
WORLD ATLAS

Dashboard

Content
└── Countries

SYSTEM
└── View Website

ACCOUNT
└── Sign Out
```

Keep it simple.

Do not add non-existent modules.

---

# 25. Dashboard

Route:

```text
/admin
```

Dashboard should display basic useful information.

Example:

```text
ADMIN CONTROL

Countries
1

Leaders
2

Landmarks
5

Foods
6

Culture Items
6

Timeline Events
4
```

Also:

```text
RECENT COUNTRY

Indonesia
Last Updated: ...
[ MANAGE ]
```

No chart library required.

---

# 26. Dashboard Query

Dashboard numbers should come from PostgreSQL.

Do not hardcode:

```text
1 Country
6 Foods
```

---

# 27. Countries Page

Route:

```text
/admin/countries
```

Current result:

```text
COUNTRIES

Indonesia
IDN
Southeast Asia
Updated ...
[ MANAGE ]
```

Only Indonesia exists.

---

# 28. Do Not Add Country Creation Yet

PLAN-03 does NOT need:

```text
CREATE COUNTRY
DELETE COUNTRY
```

Country creation will become more important when import workflow exists.

For now:

```text
MANAGE EXISTING COUNTRY
```

only.

---

# 29. Country Admin Overview

Route:

```text
/admin/countries/indonesia
```

Display:

```text
INDONESIA

IDN
Republic of Indonesia

[ VIEW PUBLIC PAGE ]

CONTENT

Identity
Capital
Leadership
Statistics
Languages
Landmarks
Foods
Culture
Timeline
Sources
Media
```

Each module should show a basic record count/status.

---

# 30. Public Preview Link

Country admin page should have:

```text
VIEW PUBLIC PAGE ↗
```

pointing to:

```text
/country/indonesia
```

Open in new tab if appropriate.

---

# 31. Identity Editor

Route:

```text
/admin/countries/[slug]/identity
```

Allow editing applicable `countries` fields.

Examples:

```text
Name

Official Name

Local Name

ISO Alpha-2

ISO Alpha-3

Continent

Region

Subregion

Calling Code

TLD

Motto

Anthem

Summary
```

---

# 32. Identity Safety

Fields seperti:

```text
slug
ISO
```

harus memiliki validation kuat.

Do not silently allow duplicate:

```text
slug
iso_alpha2
iso_alpha3
```

---

# 33. Slug Editing

For PLAN-03:

Prefer making:

```text
slug
```

read-only.

Reason:

Changing slug affects:

```text
public URL
cache
media paths
future references
```

Slug management can become explicit later.

---

# 34. Capital Management

Route:

```text
/admin/countries/[slug]/capital
```

Because database supports multiple capital records:

Display list:

```text
CAPITAL RECORDS

Jakarta
Role: ...
Status: ...

[ EDIT ]
```

Allow:

```text
CREATE
EDIT
DELETE
```

capital-related child records.

---

# 35. Capital Form

Fields may include:

```text
Name

Role

Status

Latitude

Longitude

Timezone

Description

Image Path

Display Order
```

Validate coordinates.

---

# 36. Leadership Management

Route:

```text
/admin/countries/[slug]/leadership
```

Display:

```text
NATIONAL LEADERSHIP

Prabowo Subianto
President
Current

Gibran Rakabuming Raka
Vice President
Current
```

Allow:

```text
CREATE
EDIT
DELETE
```

leader records.

---

# 37. Leader Form

Fields:

```text
Name

Position

Roles

Term Start

Term End

Current

Image Path

Source

Display Order
```

Roles should support multiple values.

Example:

```text
Head of State
Head of Government
```

---

# 38. Current Leader Logic

If:

```text
term_end
```

is empty and:

```text
is_current = true
```

display as current.

Do not derive everything from strings.

---

# 39. Statistics Management

Route:

```text
/admin/countries/[slug]/statistics
```

This is an important admin module.

Display table:

```text
KEY             VALUE       UNIT      YEAR

population      284700000   people    2025

islands         17380       islands   2025

gdp             ...         IDR       2025
```

---

# 40. Statistics CRUD

Allow:

```text
CREATE STATISTIC
EDIT STATISTIC
DELETE STATISTIC
```

---

# 41. Statistic Form

Fields:

```text
Category

Key

Numeric Value

Text Value

Unit

Reference Year

Reference Date

Source

Display Order
```

Validation:

At least one should exist:

```text
numeric_value
OR
text_value
```

---

# 42. Statistic Keys

Do not restrict statistics to only current Indonesia fields.

But avoid accidental duplicates.

Recommended uniqueness concept:

```text
country_id + key + reference_year
```

where appropriate.

Do not implement overly restrictive constraint if existing dataset requires multiple records.

---

# 43. Languages

Route:

```text
/admin/countries/[slug]/languages
```

List:

```text
Bahasa Indonesia
Official

Javanese
Regional

Sundanese
Regional
```

Allow:

```text
CREATE
EDIT
DELETE
REORDER
```

---

# 44. Language Form

Fields:

```text
Name

Type

Display Order
```

---

# 45. Landmarks

Route:

```text
/admin/countries/[slug]/landmarks
```

Display cards/table:

```text
Borobudur
Central Java
[ EDIT ]

Raja Ampat
Southwest Papua
[ EDIT ]
```

---

# 46. Landmark CRUD

Allow:

```text
CREATE
EDIT
DELETE
```

Fields:

```text
Name

Slug

Location

Description

Latitude

Longitude

Image Path

Source

Display Order
```

---

# 47. Landmark Slug

Landmark slug should be auto-generated from name on creation if convenient.

Admin may override it.

Validate uniqueness within the country.

---

# 48. Foods

Route:

```text
/admin/countries/[slug]/foods
```

Allow:

```text
CREATE
EDIT
DELETE
```

Fields:

```text
Name

Slug

Region

Description

Image Path

Source

Display Order
```

---

# 49. Culture

Route:

```text
/admin/countries/[slug]/culture
```

Allow:

```text
CREATE
EDIT
DELETE
```

Fields:

```text
Title

Slug

Category

Description

Image Path

Source

Display Order
```

---

# 50. Timeline

Route:

```text
/admin/countries/[slug]/timeline
```

Display ordered events.

Example:

```text
1945
Independence

1998
Reform Era
```

Allow:

```text
CREATE
EDIT
DELETE
```

---

# 51. Timeline Form

Fields:

```text
Year Label

Sort Year

Title

Description

Source

Display Order
```

`sort_year` must remain numeric where appropriate.

`year_label` remains presentation value.

---

# 52. Sources

Route:

```text
/admin/countries/[slug]/sources
```

Display source records relevant to country content.

Fields:

```text
Organization

Publication

URL

Published At

Accessed At
```

Allow:

```text
CREATE
EDIT
DELETE
```

with safe delete rules.

---

# 53. Source Delete Safety

Before deleting a source:

Check whether it is referenced by:

```text
leader
statistic
landmark
food
culture
timeline
```

If referenced:

Do not silently delete it.

Show:

```text
SOURCE IN USE
```

and require references to be changed first.

---

# 54. Source Selector

Forms that contain:

```text
source_id
```

should use a searchable/selectable source field.

Do not ask admin to manually type database UUIDs.

---

# 55. Media Section

Route:

```text
/admin/countries/[slug]/media
```

PLAN-03 does NOT implement binary image uploads.

For now allow viewing/editing:

```text
Path

Alt text

Category

Original URL

Source URL

Author

License

Width

Height

Display Order
```

---

# 56. Existing Local Assets

Current image files remain:

```text
/public/countries/indonesia/...
```

Admin may edit:

```text
image_path
```

or media metadata.

Do NOT add Supabase Storage yet.

---

# 57. Image Preview

If a valid image path exists:

Admin editor should show a small preview.

Example:

```text
Image Path
/countries/indonesia/foods/rendang.webp

[ IMAGE PREVIEW ]
```

Broken path should show:

```text
IMAGE NOT FOUND
```

rather than broken `<img>` icon.

---

# 58. Gallery Management

Existing `gallery_images` table should be manageable.

It may live under:

```text
Media
```

or a separate subsection if cleaner.

Allow:

```text
EDIT
DELETE
REORDER
```

and create records referencing existing image paths.

---

# 59. Form Architecture

Use reusable Admin form components.

Examples:

```text
AdminInput

AdminTextarea

AdminSelect

AdminCheckbox

AdminNumberInput

AdminDateInput

AdminFormActions

AdminFieldError
```

Do not recreate field markup everywhere.

---

# 60. Validation

Use:

```text
Zod
```

or existing validation system.

Validation must occur server-side.

Client validation may additionally improve UX.

---

# 61. Server Validation

Every mutation:

```text
Form Data
   ↓
Zod
   ↓
Authorization
   ↓
Database
```

Never trust raw FormData.

---

# 62. Validation Errors

Display errors next to relevant fields.

Example:

```text
Latitude
[ 250 ]

Latitude must be between -90 and 90.
```

Do not only throw generic 500 errors.

---

# 63. Server Actions

Prefer:

```text
Next.js Server Actions
```

for admin mutations.

Example conceptual actions:

```text
updateCountryIdentity()

createLeader()
updateLeader()
deleteLeader()

createStatistic()
updateStatistic()
deleteStatistic()

createLandmark()
updateLandmark()
deleteLandmark()
```

---

# 64. No Internal HTTP Requirement

Do not make Admin components call:

```text
fetch("/api/admin/...")
```

if a Server Action/data function is more appropriate.

Use Route Handlers only when actually required.

---

# 65. Admin Write Layer

Do not scatter Drizzle mutation code across pages.

Recommended structure:

```text
src/
└── server/
    ├── repositories/
    │   ├── countries.ts
    │   └── admin/
    │       ├── leaders.ts
    │       ├── statistics.ts
    │       ├── landmarks.ts
    │       └── ...
    │
    └── actions/
        └── admin/
```

Adapt if cleaner architecture already exists.

---

# 66. Authorization Inside Actions

Every action must begin conceptually with:

```ts
await requireAdmin();
```

before executing database writes.

---

# 67. Save Feedback

After successful save:

Show clear feedback.

Example:

```text
Changes saved.
```

Use:

```text
toast
inline success message
```

or equivalent.

Do not leave user unsure whether save worked.

---

# 68. Error Feedback

Database failure:

```text
Unable to save changes.
```

Log useful development information server-side.

Do not expose SQL or credentials.

---

# 69. Unsaved Changes

If straightforward, warn when leaving a form containing unsaved edits.

Do not build an overly complex draft system.

---

# 70. Delete Confirmation

Delete operations must require explicit confirmation.

Example:

```text
Delete "Rendang"?

This action cannot be undone.

[CANCEL] [DELETE]
```

Do not delete immediately from one accidental click.

---

# 71. Country Delete Disabled

Do not implement country deletion in PLAN-03.

The admin may modify Indonesia.

It should not be able to accidentally destroy the entire country record.

---

# 72. Transactions

Use database transactions where a mutation modifies multiple related records.

Example:

```text
UPDATE COUNTRY
+
UPDATE RELATED DATA
```

Simple single-row edits do not need artificial transactions.

---

# 73. Revalidation

After a successful mutation, public pages must reflect changes.

Use appropriate Next.js revalidation.

Conceptually:

```text
revalidatePath("/")
revalidatePath("/explore")
revalidatePath(`/country/${slug}`)
```

Only revalidate paths affected by the change.

---

# 74. Central Revalidation Helper

Prefer helper:

```text
revalidateCountryPages(slug)
```

rather than repeating path logic in every action.

---

# 75. Public Site Must Stay Read-Only

Visitors must not gain any write functionality.

Public routes:

```text
/
 /explore
 /country/[slug]
```

remain read-only.

---

# 76. No Database Credentials in Client Bundle

Audit generated client bundles/config.

Never import:

```text
src/db
postgres.js database client
DATABASE_URL
```

into Client Components.

---

# 77. Admin Audit Log

Add a lightweight audit table:

```text
admin_audit_logs
```

via Drizzle migration.

Recommended:

```text
id

actor_email

action

entity_type

entity_id

country_id

metadata

created_at
```

---

# 78. Audit Actions

Record important mutations:

```text
CREATE

UPDATE

DELETE
```

Examples:

```text
UPDATE COUNTRY identity

CREATE LANDMARK borobudur

DELETE FOOD pempek
```

---

# 79. Audit Metadata

Do NOT store:

```text
password
auth token
database credential
```

in audit logs.

Metadata may include:

```text
changed_fields
entity_name
slug
```

Keep it lightweight.

---

# 80. No Revision System Yet

Audit logging is NOT full revision history.

Do NOT implement:

```text
rollback
version restore
diff viewer
content versioning
```

during PLAN-03.

---

# 81. Admin Dashboard Recent Activity

If easy, dashboard may show latest audit actions:

```text
RECENT ACTIVITY

Updated Indonesia identity
2 minutes ago

Edited Rendang
10 minutes ago
```

Optional if it does not complicate implementation.

---

# 82. Responsive Admin

Admin should work on:

```text
desktop
tablet
mobile
```

But admin's primary experience may prioritize desktop/tablet.

---

# 83. Mobile Sidebar

On small screens:

sidebar should become:

```text
drawer
menu
```

Do not leave admin navigation permanently occupying half the viewport.

---

# 84. Table Responsiveness

Large tables should:

```text
scroll horizontally
```

or collapse gracefully.

Do not cause page-level overflow.

---

# 85. Accessibility

Admin must support:

```text
labels
focus states
keyboard navigation
semantic buttons
form errors
dialog focus management
```

---

# 86. Loading States

When admin pages load:

use simple functional states.

Example:

```text
Loading country...
```

Do not use the public cinematic loading experience.

---

# 87. Submit State

When saving:

```text
SAVE
```

becomes:

```text
SAVING...
```

and should prevent accidental duplicate submissions.

---

# 88. Empty States

Examples:

```text
No landmarks found.

[ ADD LANDMARK ]
```

or:

```text
No sources available.
```

Do not display empty blank tables.

---

# 89. Search / Filtering

PLAN-03 only has one country.

No global search system is necessary.

For long child lists, simple local filtering may be added only if useful.

Do not build advanced search infrastructure.

---

# 90. Ordering

Entities with:

```text
display_order
```

must allow editing order.

A simple numeric field is enough.

Do NOT build drag-and-drop unless implementation is trivial and stable.

---

# 91. Created / Updated Metadata

Admin may display:

```text
Created
Updated
```

timestamps.

Do not require admin to manually edit them.

---

# 92. Database Changes

PLAN-03 may add:

```text
admin_audit_logs
```

and any minimal constraints/indexes required for admin operations.

Do not redesign all PLAN-02 tables unnecessarily.

---

# 93. Migration

All schema changes must be committed using Drizzle migration.

Expected:

```text
drizzle/
└── new PLAN-03 migration
```

Do not manually change production database and leave repository schema outdated.

---

# 94. Database Migration Safety

Before applying migration:

inspect generated SQL.

Ensure it does not accidentally:

```text
DROP countries
DROP child tables
DELETE Indonesia data
```

---

# 95. Existing Data Preservation

Current Indonesia database must survive PLAN-03 migration.

After migration:

```text
countries = 1
```

and existing records should remain present.

---

# 96. Authentication Does Not Replace Database Security

Remember:

```text
Supabase Auth
= who user is

requireAdmin()
= whether user can use Admin

Drizzle / PostgreSQL
= application data access
```

Keep these concerns separated.

---

# 97. Middleware / Proxy

Use current recommended Next.js + Supabase SSR mechanism for maintaining authentication sessions.

However:

Do NOT query PostgreSQL using Drizzle from middleware/proxy.

Authorization must still be verified server-side in protected pages/actions.

---

# 98. Admin Layout Protection

Protected admin layout should call:

```text
requireAdmin()
```

before rendering.

Unauthenticated:

```text
→ /admin/login
```

---

# 99. Login Page Protection

If an already-authorized admin opens:

```text
/admin/login
```

redirect to:

```text
/admin
```

---

# 100. Unauthorized User

Authenticated but not allowlisted:

Do not render dashboard.

Return controlled:

```text
ACCESS DENIED
```

and provide:

```text
SIGN OUT
```

---

# 101. Admin API Security

If any Route Handler is created under:

```text
/api/admin/*
```

it MUST call:

```text
requireAdmin()
```

No anonymous mutation endpoints.

---

# 102. Public API

Do not create or expand public mutation APIs.

PLAN-03 is internal administration only.

---

# 103. Vercel Environment Variables

Production Vercel needs:

```text
DATABASE_URL

NEXT_PUBLIC_SUPABASE_URL

NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

ADMIN_EMAILS
```

`DATABASE_MIGRATION_URL` remains needed only wherever migrations are executed.

---

# 104. Preview Environment

If using Vercel Preview deployment, ensure Auth redirect configuration includes the required preview/dev URLs only if necessary.

Do not broadly allow unsafe redirect URLs.

---

# 105. Supabase Auth Redirect Configuration

Configure:

```text
localhost development URL
production Vercel URL
```

as appropriate.

Login should work both locally and production.

---

# 106. No Separate Admin Domain Yet

Use:

```text
example.vercel.app/admin
```

not:

```text
admin.example.com
```

for now.

Separate domain is unnecessary at this stage.

---

# 107. Security Headers / Noindex

Admin routes should not be indexed by search engines.

Set Admin metadata:

```text
robots:
noindex
nofollow
```

Login page also:

```text
noindex
```

---

# 108. Admin Metadata

Do not expose admin content through Open Graph previews.

Simple:

```text
World Atlas Admin
```

is enough.

---

# 109. No Cinematic Public Components

Do not import unnecessary:

```text
GSAP-heavy components

Country Hero animations

Gallery animations
```

inside Admin bundle.

Keep admin lightweight.

---

# 110. Admin Component Structure

Recommended:

```text
src/components/admin/
├── AdminSidebar
├── AdminHeader
├── AdminPageHeader
├── AdminCard
├── AdminTable
├── AdminInput
├── AdminTextarea
├── AdminSelect
├── AdminButton
├── DeleteDialog
├── SaveButton
├── EmptyState
└── StatusBadge
```

Do not over-componentize.

---

# 111. Form Layout

Desktop:

```text
Label
Input

Label
Textarea

Label
Select
```

with readable max width.

Do not stretch short fields across the entire screen unnecessarily.

---

# 112. Destructive Styling

Delete buttons must visually differ from:

```text
SAVE
EDIT
```

Use intentional destructive treatment.

---

# 113. Admin Status Language

Use clear terms:

```text
Saved

Draft changes

Current

Inactive

Source in use

Validation error

Delete
```

Avoid vague labels.

---

# 114. No Content Accuracy Work

Current database values remain development/demo content.

PLAN-03 is not responsible for researching:

```text
population
GDP
leaders
geography
etc.
```

Only manage whatever data exists.

---

# 115. No Data Import Yet

Explicitly do NOT implement:

```text
CSV upload

ZIP upload

bulk import

import preview

dataset parser

Google Colab integration
```

during PLAN-03.

---

# 116. No AI Features

Do NOT implement:

```text
Generate with AI

Rewrite with AI

AI research

automatic fact checking
```

yet.

---

# 117. No Additional Countries

Do not seed:

```text
Japan
Malaysia
USA
etc.
```

Indonesia remains the only current country.

---

# 118. No Media Upload

Do not build binary upload to:

```text
Supabase Storage
S3
R2
```

during PLAN-03.

Media management currently deals with existing paths/metadata.

---

# 119. No Role Management UI

Do not create:

```text
Super Admin
Editor
Moderator
Writer
```

yet.

All approved emails are simply:

```text
ADMIN
```

---

# 120. No User Management

Admin Panel does not need:

```text
Create Admin
Delete Admin
Reset Password
Manage Users
```

Supabase Dashboard handles admin account creation for now.

---

# 121. No Complex CMS

Do not turn PLAN-03 into a generic CMS builder.

Admin fields should map directly to existing World Atlas domain entities.

---

# 122. Test Authentication

Test:

### Case A

Not logged in:

```text
/admin
→ /admin/login
```

### Case B

Correct admin:

```text
/admin/login
→ /admin
```

### Case C

Authenticated non-admin:

```text
/admin
→ ACCESS DENIED
```

### Case D

Logout:

```text
/admin
→ Sign Out
→ /admin/login
```

---

# 123. Test Authorization

Attempt mutation without valid admin session.

Expected:

```text
REJECTED
```

Database must remain unchanged.

---

# 124. Test Identity Update

Edit:

```text
Indonesia summary
```

Save.

Verify database.

Verify:

```text
/country/indonesia
```

shows new value.

Restore if necessary.

---

# 125. Test Child CRUD

Test at least one:

```text
Landmark
```

Example:

```text
CREATE temporary test landmark
EDIT it
DELETE it
```

Verify all operations.

Do not leave test record afterward.

---

# 126. Test Statistics

Edit one harmless statistic.

Verify:

```text
database
↓
public page
```

updates.

---

# 127. Test Source Reference

Create or select source.

Attach it to an entity.

Verify relationship persists.

---

# 128. Test Source Delete Protection

Attempt deleting source that is in use.

Expected:

```text
BLOCK DELETE
```

---

# 129. Test Validation

Examples:

```text
empty required name

invalid latitude

invalid URL

non-numeric display_order
```

Expected:

controlled form errors.

---

# 130. Test Duplicate Submit

Double-click Save.

Should not generate accidental duplicates.

---

# 131. Test 404 Admin Country

Open:

```text
/admin/countries/not-real
```

Return proper admin not-found state.

Do not crash.

---

# 132. Test Public Regression

After PLAN-03:

verify:

```text
/
 /explore
 /country/indonesia
```

still work normally.

Admin implementation must not break public site.

---

# 133. Build Verification

Run:

```bash
pnpm lint
```

Then:

```bash
pnpm build
```

Then:

```bash
pnpm tsc --noEmit
```

or existing type-check command.

All must pass.

---

# 134. Console Verification

Check Admin and public pages.

No recurring:

```text
hydration errors

React warnings

auth errors

failed database calls

missing keys

client/server boundary errors
```

---

# 135. Vercel Verification

After local/dev success:

deploy through existing repository workflow.

Verify production:

```text
/admin/login
/admin
/admin/countries
/admin/countries/indonesia
```

---

# 136. Production Authentication Test

On Vercel:

```text
login
refresh page
navigate
logout
```

Session must persist correctly.

---

# 137. Production Edit Test

Make one harmless content edit in production Admin.

Verify public page updates.

Then restore if it was only a test.

---

# 138. Audit Verification

After production edit:

verify corresponding record exists in:

```text
admin_audit_logs
```

---

# 139. README

Add concise documentation:

```text
Admin environment variables

How to create first admin account

How to access /admin

How authentication works

How to run database migration
```

Do not write excessive documentation.

---

# 140. `.env.example`

Ensure it contains:

```env
DATABASE_URL=
DATABASE_MIGRATION_URL=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=

ADMIN_EMAILS=
```

No real credentials.

---

# 141. Git Security Check

Before commit:

verify no:

```text
.env.local

database password

Supabase password

auth tokens
```

are tracked.

---

# 142. Definition of Done

PLAN-03 is complete when:

- Supabase Auth is configured
- admin login works
- admin logout works
- public signup is not exposed
- admin allowlist works
- `/admin` is protected
- admin authorization is checked server-side
- every mutation rechecks admin authorization
- admin session works on Vercel
- admin dashboard works
- countries list works
- Indonesia management overview works
- identity editor works
- capital CRUD works
- leadership CRUD works
- statistics CRUD works
- languages CRUD works
- landmarks CRUD works
- foods CRUD works
- culture CRUD works
- timeline CRUD works
- source management works
- source delete protection works
- media metadata management works
- gallery management works
- image preview works for existing assets
- forms have server-side validation
- delete operations require confirmation
- country deletion is unavailable
- save feedback works
- revalidation updates public content
- public site stays read-only
- admin audit logging works
- database secrets remain server-only
- admin pages use `noindex`
- Admin is responsive enough for desktop/tablet/mobile
- no CSV/ZIP importer exists
- no AI data collector exists
- no new countries were added
- no media storage migration was added
- public frontend remains visually intact
- lint passes
- typecheck passes
- production build passes
- production Vercel login works
- production database edit successfully changes the public country page

---

# 143. Agent Execution Order

Follow this order.

## Step 1

Inspect current PLAN-02 repository and database architecture.

Do not rewrite it.

## Step 2

Install Supabase Auth dependencies.

## Step 3

Configure:

```text
Supabase browser client
Supabase server client
session handling
```

## Step 4

Create:

```text
requireAdmin()
```

and allowlist handling.

## Step 5

Create `/admin/login`.

## Step 6

Protect `/admin`.

## Step 7

Create Admin layout/navigation.

## Step 8

Create dashboard.

## Step 9

Create countries list.

## Step 10

Create Indonesia admin overview.

## Step 11

Create reusable Admin form components.

## Step 12

Implement Identity editing.

## Step 13

Implement Capital CRUD.

## Step 14

Implement Leadership CRUD.

## Step 15

Implement Statistics CRUD.

## Step 16

Implement Languages CRUD.

## Step 17

Implement Landmarks CRUD.

## Step 18

Implement Foods CRUD.

## Step 19

Implement Culture CRUD.

## Step 20

Implement Timeline CRUD.

## Step 21

Implement Sources management.

## Step 22

Implement Media/Gallery metadata management.

## Step 23

Create `admin_audit_logs` migration.

## Step 24

Add audit logging to mutations.

## Step 25

Add public page revalidation after writes.

## Step 26

Test authorization and CRUD.

## Step 27

Test public-site regression.

## Step 28

Run lint.

## Step 29

Run typecheck.

## Step 30

Run production build.

## Step 31

Fix all relevant errors.

---

# 144. Important Agent Rules

DO NOT:

```text
rebuild public frontend

replace Drizzle

replace PostgreSQL

move database to SQLite

create separate backend

create CSV importer

create ZIP importer

create Google Colab scripts

create AI features

add new countries

create public signup

create user management

create role management

add cloud image storage
```

PLAN-03 has one job:

```text
BUILD A SECURE ADMIN INTERFACE
FOR THE DATABASE THAT ALREADY EXISTS
```

---

# 145. Final Success Test

The final test should be:

```text
ADMIN LOGIN
     ↓
/admin/countries/indonesia
     ↓
Edit Indonesia content
     ↓
SAVE
     ↓
Supabase PostgreSQL
     ↓
/country/indonesia
     ↓
UPDATED
```

While:

```text
anonymous visitor
     ↓
/admin
     ↓
BLOCKED
```

And:

```text
public website
     ↓
continues working normally
```

---

# END OF PLAN-03