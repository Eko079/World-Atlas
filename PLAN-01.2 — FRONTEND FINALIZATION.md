# PLAN-01.2 — FRONTEND FINALIZATION

## Purpose

PLAN-01.2 adalah tahap terakhir untuk menyelesaikan frontend World Atlas sebelum project masuk ke tahap berikutnya.

Fokus utama:

```text
FINALIZE FRONTEND
POLISH UI
FIX UX
FIX RESPONSIVE
FIX ANIMATION
CLEAN STRUCTURE
REMOVE FRONTEND ISSUES
```

Data yang digunakan saat ini masih dianggap:

```text
DUMMY / DEVELOPMENT DATA
```

Jangan menghabiskan waktu untuk memastikan semua statistik Indonesia 100% akurat.

Akurasi dan sistem data akan ditangani pada fase selanjutnya.

---

# 1. Main Goal

Setelah PLAN-01.2 selesai, frontend harus terasa seperti produk yang sudah matang.

Halaman utama:

```text
/
```

Halaman explore:

```text
/explore
```

Halaman Indonesia:

```text
/country/indonesia
```

harus:

- visually polished
- responsive
- smooth
- consistent
- tidak memiliki broken layout
- tidak memiliki loading bug
- tidak memiliki obvious placeholder UI
- tidak memiliki console error penting

---

# 2. Do Not Add New Major Features

PLAN-01.2 bukan fase ekspansi.

Jangan membuat:

```text
Admin Panel
Database
Backend API
Authentication
CSV Import
ZIP Import
Google Colab Pipeline
AI Data Collector
World Map
Country Comparison
Additional Countries
```

Jangan memperbesar scope.

Selesaikan frontend yang sudah ada.

---

# 3. Data Policy

Semua data Indonesia saat ini dianggap development/demo data.

Jika ditemukan data seperti:

```text
population
GDP
leader
number of islands
coordinates
economic statistics
```

yang tidak sepenuhnya akurat:

```text
DO NOT prioritize fixing it.
```

Perbaiki hanya jika kesalahan tersebut menyebabkan:

```text
broken UI
bad formatting
overflow
incorrect rendering
duplicate layout
visual confusion
```

PLAN-01.2 fokus pada frontend experience.

---

# 4. Homepage Finalization

Route:

```text
/
```

Audit keseluruhan homepage.

Pastikan homepage memiliki hierarchy yang jelas:

```text
WORLD ATLAS

FEATURED COUNTRY

INDONESIA

PRIMARY CTA
```

Hero harus menjadi bagian paling kuat secara visual.

---

# 5. Homepage Hero

Periksa:

- background image quality
- overlay
- contrast
- typography
- positioning
- spacing
- country metadata
- CTA
- responsive scaling

`INDONESIA` harus menjadi focal point utama.

Jangan biarkan metadata kecil bersaing dengan headline.

---

# 6. Hero Typography

Pastikan typography:

```text
INDONESIA
```

tidak:

- terpotong
- overflow
- terlalu kecil di desktop
- terlalu besar di mobile
- bertabrakan dengan navigation
- bertabrakan dengan metadata

Gunakan responsive typography seperti:

```text
clamp()
```

jika sesuai.

---

# 7. Homepage Loader

Loader boleh tetap digunakan.

Namun loader harus:

```text
SHORT
SMOOTH
NON-BLOCKING
```

Contoh:

```text
WORLD ATLAS

LOADING NATION

IDN
```

Jangan membuat user menunggu secara artificial.

---

# 8. Loader Safety

Pastikan jika JavaScript animation gagal:

```text
CONTENT STILL APPEARS
```

Jangan bergantung pada animation completion untuk menampilkan homepage.

Tidak boleh ada kondisi main content permanen:

```css
opacity: 0;
```

---

# 9. Homepage Scroll Experience

Audit seluruh homepage ketika user scroll.

Pastikan transition antar section terasa natural.

Hindari:

```text
terlalu banyak fade
terlalu banyak parallax
section terlalu kosong
section terlalu rapat
scroll animation terlalu agresif
```

Gunakan motion untuk membantu storytelling.

---

# 10. Homepage Featured Country

Featured Indonesia section harus memiliki:

```text
country name
country code
region
image
key statistics
CTA
```

Tetapi jangan memenuhi card dengan terlalu banyak data.

Prioritas:

```text
IMAGE
NAME
REGION
CTA
```

Statistics menjadi secondary content.

---

# 11. Explore Page

Route:

```text
/explore
```

Karena baru ada Indonesia:

```text
001 AVAILABLE
```

tetap boleh digunakan.

Pastikan layout tidak terasa kosong atau unfinished.

---

# 12. Explore Page Structure

Recommended hierarchy:

```text
EXPLORE NATIONS

001 AVAILABLE

ASIA

INDONESIA
```

Region lain:

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

Pastikan `COMING SOON` terlihat intentional.

Jangan terlihat seperti disabled broken component.

---

# 13. Explore Country Card

Indonesia card harus:

- clickable
- responsive
- memiliki hover state
- memiliki clear CTA
- memiliki proper focus state

Desktop hover dapat menggunakan:

```text
image scale
arrow movement
border emphasis
metadata reveal
```

secara subtle.

---

# 14. Country Page Finalization

Route:

```text
/country/indonesia
```

Ini adalah halaman utama project saat ini.

Audit page secara menyeluruh dari atas sampai bawah.

---

# 15. Country Hero

Country hero harus mempunyai hierarchy:

```text
IDN

INDONESIA

REPUBLIC OF INDONESIA

SOUTHEAST ASIA
```

Pastikan visual tidak terlalu penuh.

Gunakan whitespace secara intentional.

---

# 16. Hero Metadata

Metadata seperti:

```text
region
coordinates
capital
country code
```

harus memiliki styling konsisten.

Gunakan:

```text
small uppercase labels
secondary text
thin separators
```

Jangan biarkan setiap metadata menggunakan gaya berbeda.

---

# 17. Section Rhythm

Audit jarak antar section.

Hindari:

```text
section terlalu dekat
section terlalu jauh
random padding
random margin
```

Buat consistent spacing system.

Contoh conceptual rhythm:

```text
Section Top Padding
Large

Section Content Gap
Medium

Card Gap
Small / Medium
```

---

# 18. Section Headers

Gunakan satu reusable component untuk section header.

Contoh:

```text
03 / GEOGRAPHY

THE ARCHIPELAGO
```

atau:

```text
GEOGRAPHY

THE ARCHIPELAGO
```

Section header harus terasa berasal dari design system yang sama.

---

# 19. Avoid Repetitive Sections

Jangan membuat semua section berupa:

```text
TITLE

3 CARDS

TITLE

3 CARDS

TITLE

3 CARDS
```

Variasikan composition.

---

# 20. Recommended Section Character

Gunakan visual treatment berbeda untuk setiap section.

### Identity

```text
Flag-focused layout
```

### Leadership

```text
Portrait editorial
```

### Capital

```text
Large cinematic image
```

### Geography

```text
Large statistics + spatial composition
```

### Population

```text
Typography-driven
```

### Languages

```text
Editorial list
```

### Economy

```text
Large numbers
```

### Landmarks

```text
Image-first cards
```

### Cuisine

```text
Magazine-style grid
```

### Culture

```text
Visual storytelling
```

### Timeline

```text
Chronological composition
```

### Gallery

```text
Immersive image ending
```

---

# 21. Leadership UI

Ensure leader cards do not look duplicated.

Use stronger visual hierarchy for primary leader.

Example:

```text
PRESIDENT

[ LARGE PHOTO ]

NAME

ROLE
```

Secondary leader can use smaller treatment.

Again:

Content accuracy is not the priority in PLAN-01.2.

Visual structure is.

---

# 22. Capital Section

Capital section harus terlihat seperti major section.

Use:

```text
large image
large city title
coordinates
short description
secondary metadata
```

Jika terdapat Jakarta/Nusantara transition UI saat ini:

polish layout-nya.

Jangan menambah complexity baru.

---

# 23. Geography

Geography section harus mudah discan.

Highlight:

```text
AREA

ISLANDS

TIME ZONES

REGION
```

Gunakan oversized numbers.

Pastikan semua angka align secara visual.

---

# 24. Statistics Formatting

Format statistics konsisten.

Contoh:

```text
284.7M

1.9M km²

17,380

3
```

Gunakan formatter helper jika perlu.

Jangan melakukan formatting berbeda di setiap component.

---

# 25. Population Section

Pastikan population section tidak terlihat seperti generic dashboard.

Gunakan:

```text
large typography
short labels
supporting text
```

Hindari terlalu banyak chart untuk sekarang.

---

# 26. Language Section

Languages section harus tetap sederhana.

Highlight:

```text
BAHASA INDONESIA
```

sebagai bahasa utama.

Regional languages menjadi supporting visual list.

Jangan membuat 700+ items.

---

# 27. Economy Section

Economy section harus kuat secara typography.

Contoh:

```text
GDP

23,821T
IDR
```

dan:

```text
GDP PER CAPITA

83.7M
IDR
```

Data boleh dummy/development.

Fokus visualnya:

```text
alignment
spacing
number hierarchy
unit hierarchy
```

---

# 28. Landmark Section

Audit semua landmark cards.

Pastikan:

- image ratio konsisten
- image quality cukup
- heading tidak overflow
- location label konsisten
- hover animation smooth
- mobile layout bagus

---

# 29. Horizontal Scroll

Jika landmark menggunakan horizontal scrolling:

pastikan:

```text
mouse wheel tidak rusak

touch scrolling works

scrollbar tidak mengganggu

mobile usable

keyboard masih bisa digunakan
```

Jangan hijack scroll secara agresif.

---

# 30. Cuisine Section

Food imagery harus menjadi fokus.

Pastikan:

```text
image
food name
origin/region
short description
```

memiliki hierarchy jelas.

Jangan terlalu banyak text.

---

# 31. Culture Section

Culture section harus terasa berbeda dari food/landmark cards.

Gunakan layout editorial seperti:

```text
large image + text

alternating composition

featured culture item
```

jika sudah sesuai dengan existing implementation.

---

# 32. Timeline

Timeline harus:

```text
easy to scan
```

Pastikan year memiliki visual emphasis.

Contoh:

```text
1945

INDONESIAN INDEPENDENCE

Description...
```

Jangan terlalu banyak event di prototype.

---

# 33. Gallery

Gallery adalah visual ending dari Indonesia page.

Audit:

```text
image quality
image ratio
spacing
lazy loading
hover
mobile stacking
```

Gallery harus terasa intentional.

Bukan sekadar kumpulan `<img>`.

---

# 34. Footer

Footer harus minimal dan polished.

Example concept:

```text
WORLD ATLAS

INDONESIA

EXPLORE THE WORLD
```

Jika next country belum ada:

```text
NEXT NATION
COMING SOON
```

boleh digunakan.

---

# 35. Global Navigation

Navigation harus konsisten pada:

```text
homepage
explore
country page
```

Pastikan:

- active states
- hover
- mobile menu
- close animation
- focus state
- body scroll lock

berfungsi.

---

# 36. Mobile Navigation

Mobile menu jangan hanya versi kecil desktop navigation.

Gunakan:

```text
full-screen menu
large clickable items
simple animation
clear close button
```

jika sesuai dengan visual system saat ini.

---

# 37. Responsive Audit

Test minimal:

```text
320px
375px
390px
430px
768px
1024px
1280px
1440px
1920px
```

---

# 38. Check Common Mobile Problems

Cari:

```text
horizontal overflow

cut-off typography

cards too wide

buttons too small

images too tall

sticky elements breaking

navigation overlap

horizontal scroll sections unusable
```

Fix semuanya.

---

# 39. Tablet Layout

Jangan hanya test desktop dan mobile.

Tablet:

```text
768–1024px
```

sering menjadi breakpoint paling bermasalah.

Audit khusus:

```text
hero
navigation
2-column layouts
gallery
leadership
capital section
```

---

# 40. Large Screen Layout

Pada:

```text
1440px+
```

jangan biarkan content stretched terlalu jauh.

Gunakan reasonable max-width.

Tetapi hero/full-bleed visual boleh tetap menggunakan seluruh viewport.

---

# 41. Animation Audit

Review semua animation.

Keep animation jika membantu:

```text
hierarchy
transition
storytelling
interaction feedback
```

Remove animation jika hanya decorative dan mengganggu.

---

# 42. Animation Consistency

Gunakan consistent:

```text
duration
easing
delay
distance
```

Jangan setiap component menggunakan angka random.

Buat reusable motion constants bila perlu.

---

# 43. Framer Motion vs GSAP

Gunakan Framer Motion untuk:

```text
component reveal
hover
navigation
simple transition
```

GSAP hanya untuk:

```text
complex scroll sequence
timeline animation
advanced parallax
```

Jangan menggunakan GSAP untuk button hover sederhana.

---

# 44. Reduced Motion

Support:

```css
prefers-reduced-motion
```

Jika enabled:

```text
disable parallax
disable long transitions
skip loader animation
reduce movement
```

Content harus langsung tersedia.

---

# 45. Hover State Audit

Desktop:

Semua clickable element harus memiliki feedback.

Examples:

```text
nav link
button
country card
landmark
food card
gallery
source link
```

Jangan membuat hover terlalu flashy.

---

# 46. Button Consistency

Audit button styles.

Recommended variants:

```text
Primary

Secondary

Text / Arrow
```

Jangan membuat 10 style button berbeda.

---

# 47. Cursor Behavior

Pastikan clickable UI menggunakan expected interaction behavior.

Jangan membuat non-clickable decorative card terlihat clickable.

---

# 48. Image Optimization

Audit image files.

Prefer:

```text
WebP
AVIF
SVG
```

Avoid giant:

```text
PNG
JPG 10MB+
```

---

# 49. Next.js Image

Gunakan Next.js Image jika sesuai.

Hero:

```text
priority
```

Below fold:

```text
lazy
```

---

# 50. Image Layout Stability

Set dimensions/aspect ratio agar tidak terjadi:

```text
layout shift
```

ketika image selesai loading.

---

# 51. Broken Image Handling

Tidak boleh ada broken image icon.

Jika asset optional gagal:

gunakan fallback atau hide component gracefully.

---

# 52. Font Audit

Pastikan font loading tidak menyebabkan:

```text
major layout shift
flash of invisible text
```

Gunakan Next.js font handling jika sudah sesuai.

---

# 53. Typography System

Finalisasi reusable typography hierarchy.

Contoh:

```text
Display XL
Display LG

Section Heading

Card Heading

Body

Caption

Metadata
```

Jangan menggunakan random font-size di semua component.

---

# 54. Color Consistency

Audit penggunaan:

```text
background
text
secondary text
red accent
border
overlay
```

Gunakan design tokens / CSS variables jika belum.

Example:

```css
--background
--surface
--foreground
--muted
--accent
--border
```

---

# 55. Indonesia Accent

Gunakan red accent secara restrained.

Red boleh dipakai untuk:

```text
active indicator
label
line
highlight
small number
interaction
```

Jangan membuat semua UI merah.

---

# 56. Border Consistency

Thin border system:

```text
rgba(255,255,255,0.08)
```

atau existing equivalent.

Jangan menggunakan border dengan opacity random di setiap section.

---

# 57. Spacing System

Standardize spacing.

Avoid:

```text
margin-top: 73px
padding-bottom: 117px
```

tanpa alasan.

Gunakan Tailwind spacing scale atau shared layout tokens.

---

# 58. Component Cleanup

Review component architecture.

Avoid giant component seperti:

```text
CountryPage.tsx
3000 lines
```

Split berdasarkan logical sections.

---

# 59. Avoid Excessive Fragmentation

Tetapi jangan juga membuat component untuk setiap:

```text
<div>
<span>
```

Gunakan component hanya ketika:

```text
reusable
complex
logical section
has own interaction
```

---

# 60. Remove Duplicate Code

Cari duplicate patterns seperti:

```text
section title markup

metadata label

button

card wrapper

image overlay
```

Extract jika memang digunakan berulang.

---

# 61. Country Data Separation

Pastikan UI tidak dipenuhi hardcoded:

```tsx
"Indonesia"
"Jakarta"
"IDN"
```

di reusable components.

Tetap consume data object.

Walaupun data masih dummy.

---

# 62. Data Accuracy Is NOT Required

Untuk memperjelas:

PLAN-01.2 tidak meminta agent melakukan research web untuk memperbarui seluruh dataset.

Do not waste development time verifying:

```text
GDP
population
political figures
island counts
etc.
```

unless required to fix rendering.

Data akan ditangani pada later data/backend stages.

---

# 63. 404 Country Page

Route invalid seperti:

```text
/country/testing
```

harus menghasilkan styled 404.

Example:

```text
404

NATION NOT FOUND

RETURN TO WORLD ATLAS
```

---

# 64. Loading State

Pastikan route navigation tidak menghasilkan ugly flash.

Gunakan lightweight loading state jika diperlukan.

Jangan membuat artificial 3-second loader.

---

# 65. Error State

Jika country data gagal dimuat:

jangan crash seluruh app.

Show controlled fallback.

---

# 66. SEO Basic Finalization

Walaupun advanced data belum penting, basic metadata harus ada.

Homepage:

```text
World Atlas
```

Indonesia:

```text
Indonesia — World Atlas
```

Explore:

```text
Explore Nations — World Atlas
```

---

# 67. Page Titles

Pastikan browser title berubah sesuai page.

Jangan semua route memakai:

```text
Create Next App
```

atau title generic.

---

# 68. Favicon

Pastikan project memiliki favicon/icon yang sesuai.

Jangan meninggalkan default Next.js/Vercel favicon.

---

# 69. Open Graph Basic

Jika mudah, siapkan basic Open Graph metadata.

Tidak perlu membangun dynamic OG generator sekarang.

---

# 70. Accessibility

Audit:

```text
heading order
button labels
link labels
image alt
focus ring
keyboard navigation
contrast
```

---

# 71. Keyboard Test

Gunakan keyboard untuk navigate:

```text
Tab
Shift + Tab
Enter
Escape
```

Navigation/menu harus dapat digunakan.

---

# 72. Semantic HTML

Gunakan:

```html
header
nav
main
section
article
footer
```

secara masuk akal.

Hindari seluruh website hanya berupa nested `<div>`.

---

# 73. Console Audit

Buka browser console.

Tidak boleh ada recurring:

```text
hydration warning
missing key warning
failed network request
React warning
GSAP target not found
image error
```

---

# 74. Network Audit

Pastikan tidak ada asset penting menghasilkan:

```text
404
500
```

---

# 75. Build Audit

Run:

```bash
pnpm lint
```

dan:

```bash
pnpm build
```

Fix relevant errors.

---

# 76. Performance

Jangan mengejar Lighthouse 100 secara obsesif.

Tetapi hindari obvious performance problems seperti:

```text
massive JS
huge images
everything client-side
all images preloaded
expensive infinite animation
```

---

# 77. Client Component Audit

Review:

```tsx
"use client";
```

Jangan taruh di root country page jika tidak diperlukan.

Only interactive sections should be client components.

---

# 78. Remove Development Leftovers

Search and remove:

```text
console.log
TODO yang sudah tidak relevan
temporary text
debug border
test buttons
unused images
unused imports
unused components
```

---

# 79. Remove Default Boilerplate

Pastikan tidak ada leftover:

```text
Next.js
Vercel starter
create-next-app
```

yang terlihat oleh user.

---

# 80. Visual QA

Lakukan manual scroll seluruh website.

Periksa setiap transition dari:

```text
homepage top
↓
homepage bottom

explore top
↓
explore bottom

Indonesia top
↓
Indonesia bottom
```

Cari bagian yang terasa:

```text
awkward
empty
too dense
misaligned
unfinished
```

Polish jika perlu.

---

# 81. Desktop QA

Desktop target utama:

```text
1440 × 900
```

atau viewport sejenis.

Website harus terasa premium di ukuran desktop standard.

---

# 82. Mobile QA

Mobile target utama:

```text
390 × 844
```

atau viewport modern phone sejenis.

Website harus tetap terasa intentional.

Bukan sekadar desktop yang diperkecil.

---

# 83. Navigation QA

Test flow:

```text
HOME
↓
EXPLORE
↓
INDONESIA
↓
HOME
```

Semua route harus mudah dinavigasi.

User tidak boleh terjebak.

---

# 84. CTA QA

Semua CTA harus melakukan sesuatu.

Jangan ada:

```text
button with no action
href="#"
dead link
```

kecuali jelas berstatus `COMING SOON`.

---

# 85. Coming Soon Behavior

Jika fitur belum ada:

prefer:

```text
COMING SOON
```

daripada membuat button yang terlihat aktif tetapi tidak bekerja.

---

# 86. Design Consistency Audit

Pastikan seluruh site terasa seperti satu product.

Homepage jangan terasa seperti site A.

Explore jangan terasa seperti site B.

Indonesia jangan terasa seperti site C.

Semua harus berbagi:

```text
typography
color
spacing
motion
navigation
button language
metadata styling
```

---

# 87. Preserve Existing Good Work

Do not rebuild the entire frontend.

PLAN-01.2 adalah:

```text
REFINE
NOT RECREATE
```

Inspect existing implementation terlebih dahulu.

Pertahankan component/layout yang sudah bekerja baik.

---

# 88. No Premature Architecture Changes

Jangan membuat database layer.

Jangan membuat admin abstractions.

Jangan membuat complicated repositories untuk backend yang belum ada.

Keep frontend clean.

Future backend migration akan dilakukan pada fase berikutnya.

---

# 89. Final Routes

PLAN-01.2 hanya perlu memastikan route berikut polished:

```text
/

/explore

/country/indonesia

404
```

---

# 90. Definition of Done

PLAN-01.2 dianggap selesai jika:

- homepage polished
- homepage loader aman
- homepage responsive
- explore page polished
- Indonesia page polished
- mobile navigation works
- desktop navigation works
- hero typography responsive
- section spacing consistent
- animation consistent
- no obvious broken animation
- reduced motion supported
- no horizontal overflow
- tablet layout works
- images optimized
- images do not cause major layout shift
- no broken images
- gallery polished
- landmarks polished
- cuisine polished
- culture polished
- timeline polished
- footer polished
- buttons consistent
- hover interactions consistent
- keyboard navigation usable
- basic SEO metadata exists
- favicon is custom
- 404 page works
- no dead CTA
- no major console errors
- no major hydration errors
- no relevant TypeScript errors
- no obvious development leftovers
- lint passes
- production build passes

---

# 91. Final Agent Instructions

Before modifying:

1. Inspect the existing project.
2. Open all existing routes.
3. Review desktop layout.
4. Review mobile layout.
5. Identify actual UI problems.
6. Preserve existing good implementation.
7. Fix visual hierarchy.
8. Fix responsiveness.
9. Fix animation issues.
10. Fix loading issues.
11. Optimize assets where needed.
12. Clean duplicated frontend code.
13. Test navigation.
14. Test accessibility.
15. Check console.
16. Run lint.
17. Run production build.
18. Fix remaining relevant issues.

Do not introduce major new product features.

Do not research or rewrite the entire Indonesia dataset.

Do not start backend/database/admin work.

---

# 92. Final Principle

PLAN-01 established the product.

PLAN-01.1 strengthened its structure.

PLAN-01.2 finishes the frontend.

At the end of this plan:

```text
WORLD ATLAS FRONTEND
=
READY
```

The public-facing experience should be stable enough that future work can focus on data infrastructure rather than repeatedly returning to basic frontend issues.

---

# END OF PLAN-01.2