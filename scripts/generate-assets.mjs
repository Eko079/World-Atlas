import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, "..", "public", "countries", "indonesia");

const RED = "#E63946";
const RED_DEEP = "#A8232F";
const INK = "#07090C";
const PANEL = "#0B0E13";
const PANEL2 = "#10141B";
const PAPER = "#F4F4F2";
const MIST = "#8B929C";
const EMBER = "#FF8A5C";

const defs = (id, body) =>
  `<defs>${body}</defs>`;

const lin = (id, stops) =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${stops
    .map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`)
    .join("")}</linearGradient>`;

const rad = (id, stops) =>
  `<radialGradient id="${id}" cx="0.5" cy="0.5" r="0.5">${stops
    .map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`)
    .join("")}</radialGradient>`;

const grainFilter = `<filter id="grain" x="0" y="0" width="100%" height="100%">
  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${Math.floor(Math.random() * 999)}" result="n"/>
  <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.6 0 0 0 0 0.62 0 0 0 0 0.66 0 0 0 0.05 0"/>
</filter>`;

const bg = (w, h, from, to) =>
  `<rect width="${w}" height="${h}" fill="url(#bg)"/>` +
  `<linearGradient id="bg" x1="0" y1="0" x2="0.7" y2="1">` +
  `<stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient>`;

const grid = (w, h, step) => {
  let out = `<g stroke="#FFFFFF" stroke-opacity="0.04" stroke-width="1">`;
  for (let x = step; x < w; x += step) out += `<line x1="${x}" y1="0" x2="${x}" y2="${h}"/>`;
  for (let y = step; y < h; y += step) out += `<line x1="0" y1="${y}" x2="${w}" y2="${y}"/>`;
  out += `</g>`;
  return out;
};

const glow = (cx, cy, r, color, opacity = 0.5) =>
  `<radialGradient id="gl" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="${color}" stop-opacity="${opacity}"/>
    <stop offset="1" stop-color="${color}" stop-opacity="0"/>
  </radialGradient>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#gl)"/>`;

const ridge = (pts, color, opacity = 1) =>
  `<polygon points="${pts.map((p) => p.join(",")).join(" ")}" fill="${color}" fill-opacity="${opacity}"/>`;

const mountains = (w, baseY, peaks, color, opacity = 1) => {
  const pts = [[0, baseY]];
  peaks.forEach(([px, py]) => pts.push([px, py]));
  pts.push([w, baseY], [w, 2000], [0, 2000]);
  return ridge(pts, color, opacity);
};

const islandScatter = (w, h, count, seed) => {
  let out = "";
  let s = seed;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = 0; i < count; i++) {
    const x = 40 + rnd() * (w - 80);
    const y = h * 0.42 + rnd() * h * 0.4;
    const r = 2 + rnd() * 7;
    const op = 0.25 + rnd() * 0.5;
    out += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="#0B0E13" opacity="${op.toFixed(2)}" stroke="#FFFFFF" stroke-opacity="0.1"/>`;
  }
  return out;
};

const coordinates = (label) =>
  `<g font-family="ui-monospace, monospace" font-size="11" letter-spacing="2">
    <text x="40" y="40" fill="#8B929C">${label}</text>
  </g>`;

const cornerLabel = (label, w, h) =>
  `<text x="${w - 40}" y="${h - 40}" text-anchor="end" font-family="ui-monospace, monospace" font-size="11" letter-spacing="2" fill="#8B929C">${label}</text>`;

const redAccent = (x, y) =>
  `<rect x="${x}" y="${y}" width="28" height="2" fill="${RED}"/>`;

const svg = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${body}</svg>`;

const scene = (w, h, from, to, body) =>
  svg(
    w,
    h,
    bg(w, h, from, to) +
      grainFilter +
      `<rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.6"/>` +
      grid(w, h, w / 6) +
      body
  );

function write(file, content) {
  const p = join(PUBLIC, file);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, content);
  console.log("generated", file);
}

// ---------- HERO ----------
{
  const w = 1920, h = 1080;
  const body =
    glow(w * 0.5, h * 0.62, 700, RED, 0.32) +
    `<circle cx="${w * 0.5}" cy="${h * 0.56}" r="150" fill="${EMBER}" opacity="0.85"/>
     <circle cx="${w * 0.5}" cy="${h * 0.56}" r="150" fill="none" stroke="${RED}" stroke-opacity="0.35" stroke-width="1"/>` +
    mountains(w, h * 0.72, [[w * 0.18, h * 0.5], [w * 0.34, h * 0.62], [w * 0.5, h * 0.42], [w * 0.68, h * 0.6], [w * 0.82, h * 0.5]], "#0B0E13", 0.95) +
    mountains(w, h * 0.78, [[w * 0.1, h * 0.66], [w * 0.42, h * 0.55], [w * 0.66, h * 0.68], [w * 0.92, h * 0.6]], "#10141B", 0.9) +
    islandScatter(w, h, 40, 7) +
    `<rect x="${w * 0.5 - 300}" y="${h * 0.52}" width="600" height="1" fill="#FFFFFF" opacity="0.14"/>` +
    `<text x="${w * 0.5}" y="${h * 0.5 - 20}" text-anchor="middle" font-family="ui-monospace, monospace" font-size="16" letter-spacing="6" fill="${PAPER}" opacity="0.8">06°10′S — 106°49′E</text>`;
  write("hero/indonesia-hero-01.svg", scene(w, h, INK, PANEL2, body));
}

// ---------- FLAG ----------
{
  const w = 720, h = 480;
  const body =
    `<g transform="translate(120,120)">
      <rect width="480" height="120" fill="${RED}"/>
      <rect width="480" height="120" y="120" fill="#F4F4F2"/>
      <path d="M0 30 Q120 20 240 32 T480 28" fill="none" stroke="#FFFFFF" stroke-opacity="0.25"/>
      <path d="M0 150 Q120 142 240 152 T480 148" fill="none" stroke="#8B929C" stroke-opacity="0.35"/>
    </g>` +
    glow(620, 60, 200, RED, 0.3) +
    `<text x="120" y="420" font-family="ui-monospace, monospace" font-size="12" letter-spacing="3" fill="#8B929C">ID / IDN — 360</text>`;
  write("flag/indonesia-flag-01.svg", scene(w, h, INK, PANEL, body));
}

// ---------- LEADER PORTRAITS ----------
function portrait(name, label, title) {
  const w = 800, h = 1000;
  const body =
    glow(w * 0.5, h * 0.42, 480, RED, 0.16) +
    `<ellipse cx="${w * 0.5}" cy="600" rx="230" ry="290" fill="#0B0E13"/>
     <ellipse cx="${w * 0.5}" cy="600" rx="230" ry="290" fill="none" stroke="#FFFFFF" stroke-opacity="0.08"/>
     <circle cx="${w * 0.5}" cy="430" r="120" fill="#10141B"/>
     <path d="M330 760 Q330 560 400 520 Q470 560 470 760 Z" fill="#0B0E13"/>
     <path d="M250 800 Q400 640 550 800 L550 940 L250 940 Z" fill="#0B0E13" stroke="#FFFFFF" stroke-opacity="0.1"/>
     <rect x="340" y="470" width="120" height="3" fill="${RED}"/>` +
    `<text x="60" y="940" font-family="ui-monospace, monospace" font-size="12" letter-spacing="3" fill="#8B929C">${label}</text>` +
    `<text x="60" y="80" font-family="ui-monospace, monospace" font-size="11" letter-spacing="3" fill="#8B929C">${title}</text>`;
  write(name, scene(w, h, INK, PANEL, body));
}
portrait("leaders/indonesia-president-01.svg", "PRESIDENT — IDN", "HEAD OF STATE");
portrait("leaders/indonesia-vice-president-01.svg", "VICE PRESIDENT — IDN", "DEPUTY HEAD OF STATE");

// ---------- JAKARTA ----------
{
  const w = 1600, h = 1000;
  let towers = "";
  const spec = [
    [200, 240], [280, 320], [360, 260], [460, 380], [560, 300], [660, 420],
    [760, 500], [880, 360], [980, 440], [1080, 300], [1180, 380], [1280, 260], [1380, 320]
  ];
  spec.forEach(([x, tw], i) => {
    const th = 300 + tw;
    towers += `<rect x="${x}" y="${900 - th}" width="46" height="${th}" fill="#0B0E13" stroke="#FFFFFF" stroke-opacity="${i % 2 ? 0.12 : 0.05}"/>`;
    towers += `<rect x="${x}" y="${900 - th}" width="46" height="3" fill="${RED}" opacity="${i % 3 === 0 ? 0.5 : 0.18}"/>`;
    towers += `<circle cx="${x + 23}" cy="${900 - th + 8}" r="2.5" fill="${RED}" opacity="${i % 3 === 0 ? 0.8 : 0.3}"/>`;
  });
  const body =
    glow(w * 0.5, 500, 620, RED, 0.28) +
    `<rect x="0" y="700" width="${w}" height="300" fill="#07090C"/>
     <line x1="0" y1="700" x2="${w}" y2="700" stroke="#FFFFFF" stroke-opacity="0.08"/>` +
    towers +
    `<g opacity="0.22" transform="scale(1,-1) translate(0,-1420)">` + towers + `</g>` +
    `<rect x="80" y="80" width="28" height="2" fill="${RED}"/>` +
    `<text x="80" y="120" font-family="ui-monospace, monospace" font-size="13" letter-spacing="4" fill="${PAPER}">JAKARTA — 06°12′S 106°49′E</text>`;
  write("cities/indonesia-jakarta-01.svg", scene(w, h, INK, PANEL2, body));
}

// ---------- LANDMARKS ----------
function landmarkScene(name, title, sub, art) {
  const w = 1200, h = 900;
  const body =
    glow(w * 0.5, h * 0.55, 460, RED, 0.22) +
    art +
    `<rect x="60" y="60" width="28" height="2" fill="${RED}"/>` +
    `<text x="60" y="96" font-family="ui-monospace, monospace" font-size="13" letter-spacing="4" fill="${PAPER}">${title}</text>` +
    `<text x="60" y="118" font-family="ui-monospace, monospace" font-size="11" letter-spacing="3" fill="${MIST}">${sub}</text>`;
  write(name, scene(w, h, INK, PANEL2, body));
}

landmarkScene(
  "landmarks/indonesia-borobudur-01.svg",
  "BOROBUDUR",
  "CENTRAL JAVA — 07°36′S 110°12′E",
  mountains(1200, 700, [[150, 520], [400, 440], [650, 520], [900, 460], [1150, 540]], "#0B0E13") +
    `<g opacity="0.9">
       <polygon points="430,560 770,560 720,500 480,500" fill="#0B0E13"/>
       <polygon points="460,500 740,500 700,440 500,440" fill="#0B0E13"/>
       <polygon points="490,440 710,440 680,380 520,380" fill="#0B0E13"/>
       <circle cx="600" cy="330" r="34" fill="#0B0E13"/>
       <circle cx="600" cy="330" r="34" fill="none" stroke="${RED}" stroke-opacity="0.5"/>
       ${[520, 560, 640, 680].map((x) => `<circle cx="${x}" cy="362" r="9" fill="#10141B" stroke="#FFFFFF" stroke-opacity="0.15"/>`).join("")}
     </g>`
);

landmarkScene(
  "landmarks/indonesia-bali-01.svg",
  "BALI",
  "LESSER SUNDA ISLANDS — 08°30′S 115°00′E",
  `<g>
     ${[620, 660, 700, 740, 780, 820, 860].map((y, i) => `<rect x="200" y="${y}" width="${800 - i * 40}" height="${i % 2 ? 40 : 34}" fill="#0B0E13" opacity="${0.5 + i * 0.07}"/>`).join("")}
     <polygon points="500,560 700,560 740,500 460,500" fill="#10141B"/>
     <polygon points="500,500 700,500 720,450 480,450" fill="#0B0E13"/>
     <rect x="580" y="380" width="40" height="70" fill="#0B0E13"/>
     <polygon points="520,380 680,380 640,320 560,320" fill="#0B0E13" stroke="${RED}" stroke-opacity="0.4"/>
   </g>`
);

landmarkScene(
  "landmarks/indonesia-raja-ampat-01.svg",
  "RAJA AMPAT",
  "WEST PAPUA — 00°30′S 130°30′E",
  `<g>
     <circle cx="360" cy="520" r="150" fill="#0B0E13" opacity="0.9"/>
     <circle cx="360" cy="520" r="150" fill="none" stroke="${RED}" stroke-opacity="0.35"/>
     <circle cx="700" cy="440" r="110" fill="#0B0E13" opacity="0.85"/>
     <circle cx="700" cy="440" r="110" fill="none" stroke="#FFFFFF" stroke-opacity="0.15"/>
     <circle cx="850" cy="620" r="80" fill="#0B0E13" opacity="0.8"/>
     <circle cx="500" cy="650" r="95" fill="#0B0E13" opacity="0.75"/>
     <path d="M240 700 Q600 620 900 700" fill="none" stroke="#FFFFFF" stroke-opacity="0.1"/>
   </g>`
);

landmarkScene(
  "landmarks/indonesia-komodo-01.svg",
  "KOMODO NATIONAL PARK",
  "EAST NUSA TENGGARA — 08°35′S 119°29′E",
  mountains(1200, 760, [[100, 640], [300, 560], [500, 660], [700, 580], [900, 640], [1150, 560]], "#0B0E13") +
    `<g transform="translate(560,560)">
       <path d="M-60 60 Q-10 20 20 30 Q60 8 80 24 Q120 -8 150 16 Q170 -20 150 22 Q160 50 130 58 Q70 40 50 78 Q10 80 -20 120 Q-60 96 -60 60 Z" fill="#10141B" stroke="${RED}" stroke-opacity="0.35"/>
     </g>`
);

landmarkScene(
  "landmarks/indonesia-bromo-01.svg",
  "MOUNT BROMO",
  "EAST JAVA — 07°56′S 112°57′E",
  `<g>
     ${[700, 740, 780, 820, 860].map((y) => `<rect x="200" y="${y}" width="800" height="${(y - 700) / 5 + 30}" fill="#0B0E13" opacity="${0.4 + (y - 700) / 200}"/>`).join("")}
     <polygon points="520,740 680,740 640,560 560,560" fill="#0B0E13"/>
     <polygon points="540,560 660,560 640,470 560,470" fill="#10141B"/>
     <circle cx="600" cy="430" r="40" fill="#0B0E13"/>
     <circle cx="600" cy="430" r="40" fill="none" stroke="${RED}" stroke-opacity="0.6" stroke-width="2"/>
     <path d="M600 300 Q580 380 600 390" fill="none" stroke="${EMBER}" stroke-opacity="0.8" stroke-width="3"/>
   </g>`
);

// ---------- FOODS ----------
function food(name, title, sub, colors, detail) {
  const w = 1000, h = 1000;
  const body =
    `<circle cx="500" cy="500" r="330" fill="#07090C" stroke="#FFFFFF" stroke-opacity="0.12"/>` +
    `<circle cx="500" cy="500" r="268" fill="#10141B" stroke="#FFFFFF" stroke-opacity="0.06"/>` +
    detail +
    glow(500, 500, 420, RED, 0.1) +
    `<text x="500" y="880" text-anchor="middle" font-family="ui-monospace, monospace" font-size="15" letter-spacing="5" fill="${PAPER}">${title}</text>` +
    `<text x="500" y="912" text-anchor="middle" font-family="ui-monospace, monospace" font-size="11" letter-spacing="3" fill="${MIST}">${sub}</text>`;
  write(name, scene(w, h, INK, PANEL, body));
}

food(
  "foods/indonesia-rendang-01.svg",
  "RENDANG",
  "WEST SUMATRA",
  ["#5A1F18", "#3A140F"],
  `<path d="M500 240 Q660 320 640 480 Q620 660 500 680 Q380 660 360 480 Q340 320 500 240 Z" fill="#4A1B14"/>
   <path d="M430 380 Q500 340 560 400 Q520 470 450 470 Z" fill="#2E100B"/>
   <circle cx="560" cy="330" r="6" fill="${EMBER}" opacity="0.7"/>
   <circle cx="470" cy="560" r="5" fill="${EMBER}" opacity="0.6"/>`
);

food(
  "foods/indonesia-nasi-goreng-01.svg",
  "NASI GORENG",
  "NATIONWIDE",
  ["#C8A24B", "#A9812F"],
  `<path d="M500 260 Q640 320 630 460 Q620 620 500 640 Q380 620 370 460 Q360 320 500 260 Z" fill="#C29A3F"/>
   <ellipse cx="500" cy="430" rx="120" ry="46" fill="#8F6E28" opacity="0.5"/>
   <circle cx="500" cy="430" r="34" fill="#F4F4F2"/>
   <circle cx="500" cy="430" r="34" fill="none" stroke="#E63946" stroke-opacity="0.7"/>
   <circle cx="500" cy="430" r="12" fill="#E8B93A"/>`
);

food(
  "foods/indonesia-satay-01.svg",
  "SATAY",
  "JAVA",
  ["#7A4A24", "#4E2C14"],
  `<g stroke="#3A2410" stroke-width="7" stroke-linecap="round">
     <line x1="380" y1="650" x2="560" y2="360"/>
     <line x1="440" y1="660" x2="620" y2="370"/>
     <line x1="500" y1="670" x2="680" y2="380"/>
   </g>
   <g>
     <ellipse cx="452" cy="470" rx="26" ry="16" fill="#5E341A" transform="rotate(63 452 470)"/>
     <ellipse cx="512" cy="490" rx="26" ry="16" fill="#5E341A" transform="rotate(63 512 490)"/>
     <ellipse cx="572" cy="510" rx="26" ry="16" fill="#5E341A" transform="rotate(63 572 510)"/>
     <ellipse cx="410" cy="450" rx="24" ry="15" fill="#6E3C1C" transform="rotate(63 410 450)"/>
   </g>
   <ellipse cx="600" cy="650" rx="150" ry="26" fill="#4A2A12" opacity="0.8"/>
   <ellipse cx="600" cy="648" rx="130" ry="18" fill="#7A4A24" opacity="0.6"/>`
);

food(
  "foods/indonesia-gado-gado-01.svg",
  "GADO-GADO",
  "JAKARTA",
  ["#3E7C4F", "#8A6B3F"],
  `<ellipse cx="500" cy="520" rx="240" ry="150" fill="#2E5C3A"/>
   <ellipse cx="500" cy="520" rx="240" ry="150" fill="none" stroke="${RED}" stroke-opacity="0.35"/>
   <g fill="#5B8C3F">
     <ellipse cx="420" cy="500" rx="40" ry="26" transform="rotate(20 420 500)"/>
     <ellipse cx="560" cy="480" rx="36" ry="24" transform="rotate(-15 560 480)"/>
   </g>
   <g fill="#8A6B3F">
     <ellipse cx="500" cy="560" rx="60" ry="16"/>
     <ellipse cx="460" cy="590" rx="40" ry="12"/>
   </g>
   <g fill="#C8A24B"><circle cx="440" cy="540" r="8"/><circle cx="540" cy="540" r="8"/><circle cx="500" cy="580" r="8"/></g>`
);

food(
  "foods/indonesia-soto-01.svg",
  "SOTO",
  "NATIONWIDE",
  ["#D8A33E", "#A9771F"],
  `<circle cx="500" cy="470" r="190" fill="#0F141C" stroke="#FFFFFF" stroke-opacity="0.12"/>
   <circle cx="500" cy="470" r="130" fill="#C8942F"/>
   <circle cx="500" cy="470" r="130" fill="none" stroke="#E8B93A" stroke-opacity="0.6"/>
   <g fill="#8F6E28">
     <circle cx="470" cy="450" r="14"/><circle cx="530" cy="460" r="12"/><circle cx="500" cy="500" r="15"/>
   </g>
   <g fill="#F4F4F2" opacity="0.8"><circle cx="480" cy="430" r="5"/><circle cx="520" cy="490" r="4"/><circle cx="455" cy="480" r="4"/></g>
   <path d="M400 520 Q500 560 600 520" fill="none" stroke="#8F6E28" stroke-width="8"/>`
);

food(
  "foods/indonesia-pempek-01.svg",
  "PEMPEK",
  "PALEMBANG",
  ["#6E3C1C", "#3F2110"],
  `<g>
     <ellipse cx="430" cy="520" rx="70" ry="90" fill="#5E341A"/>
     <ellipse cx="560" cy="500" rx="60" ry="80" fill="#6E3C1C"/>
     <ellipse cx="500" cy="420" rx="46" ry="60" fill="#4A2A12"/>
   </g>
   <path d="M350 620 Q500 680 650 620 Q640 660 500 700 Q360 660 350 620 Z" fill="#2E100B"/>
   <path d="M380 560 Q500 600 620 560" fill="none" stroke="#3F2110" stroke-width="10"/>
   <circle cx="500" cy="600" r="5" fill="${EMBER}" opacity="0.5"/>`
);

// ---------- CULTURE ----------
function cultureScene(name, title, cat, art) {
  const w = 1200, h = 900;
  const body =
    glow(w * 0.5, h * 0.5, 440, RED, 0.18) +
    art +
    `<rect x="60" y="60" width="28" height="2" fill="${RED}"/>` +
    `<text x="60" y="96" font-family="ui-monospace, monospace" font-size="13" letter-spacing="4" fill="${PAPER}">${title}</text>` +
    `<text x="60" y="118" font-family="ui-monospace, monospace" font-size="11" letter-spacing="3" fill="${MIST}">${cat}</text>`;
  write(name, scene(w, h, INK, PANEL2, body));
}

cultureScene(
  "culture/indonesia-batik-01.svg",
  "BATIK",
  "CRAFT — WAX RESIST TEXTILE",
  `<g>
     ${[0, 1, 2, 3, 4].map((r) => {
       const ry = 320 + r * 110;
       const ro = 0.4 - r * 0.05;
       return `<path d="M150 ${ry} Q400 ${ry - 40} 650 ${ry} Q900 ${ry + 40} 1150 ${ry}" fill="none" stroke="#F4F4F2" stroke-opacity="${ro}" stroke-width="2"/>`;
     }).join("")}
     <g stroke="#F4F4F2" stroke-opacity="0.2" stroke-width="1.5">
       <circle cx="400" cy="420" r="14" fill="none"/><circle cx="400" cy="420" r="6"/>
       <circle cx="600" cy="520" r="14" fill="none"/><circle cx="600" cy="520" r="6"/>
       <circle cx="800" cy="420" r="14" fill="none"/><circle cx="800" cy="420" r="6"/>
     </g>
     <circle cx="200" cy="700" r="10" fill="${RED}" opacity="0.7"/>
     <circle cx="1000" cy="720" r="10" fill="${RED}" opacity="0.5"/>
   </g>`
);

cultureScene(
  "culture/indonesia-wayang-01.svg",
  "WAYANG",
  "THEATER — SHADOW PUPPETRY",
  `<g transform="translate(600,430)">
     <polygon points="0,-240 150,80 0,200 -150,80" fill="#0B0E13"/>
     <circle cx="0" cy="-160" r="46" fill="#0B0E13" stroke="#FFFFFF" stroke-opacity="0.12"/>
     <path d="M0 -114 L-10 -10 L10 -10 Z" fill="#0B0E13"/>
     <path d="M-60 -10 Q-160 40 -180 120 L-110 60 Z" fill="#0B0E13"/>
     <path d="M60 -10 Q160 40 180 120 L110 60 Z" fill="#0B0E13"/>
     <path d="M0 200 L-40 320 L40 320 Z" fill="#0B0E13"/>
     <circle cx="0" cy="-120" r="4" fill="${RED}"/>
     <circle cx="0" cy="-120" r="4" fill="${RED}" fill-opacity="0"/>
   </g>`
);

cultureScene(
  "culture/indonesia-gamelan-01.svg",
  "GAMELAN",
  "MUSIC — BRONZE ENSEMBLE",
  `<g>
     ${[300, 460, 620, 780, 940].map((x, i) => `<circle cx="${x}" cy="430" r="${34 + (i % 2) * 10}" fill="#0B0E13" stroke="#FFFFFF" stroke-opacity="0.2"/>`).join("")}
     ${[300, 460, 620, 780, 940].map((x, i) => `<circle cx="${x}" cy="430" r="${i % 2 ? 22 : 16}" fill="none" stroke="${RED}" stroke-opacity="${0.35 + i * 0.08}"/>`).join("")}
     <rect x="300" y="540" width="640" height="10" fill="#0B0E13" stroke="#FFFFFF" stroke-opacity="0.1"/>
   </g>`
);

cultureScene(
  "culture/indonesia-dance-01.svg",
  "TRADITIONAL DANCE",
  "MOVEMENT — LEGONG & SAMAN",
  `<g transform="translate(600,560)">
     <path d="M0 -240 Q40 -120 20 0 Q60 60 30 140 Q60 200 30 260 L-30 260 Q-60 200 -30 140 Q-60 60 -20 0 Q-40 -120 0 -240 Z" fill="#0B0E13"/>
     <circle cx="0" cy="-270" r="40" fill="#0B0E13" stroke="#FFFFFF" stroke-opacity="0.12"/>
     <path d="M20 0 Q140 40 180 120" fill="none" stroke="#0B0E13" stroke-width="16"/>
     <path d="M-20 0 Q-140 40 -180 120" fill="none" stroke="#0B0E13" stroke-width="16"/>
     <path d="M30 140 Q120 180 170 260" fill="none" stroke="#0B0E13" stroke-width="12"/>
     <path d="M-30 140 Q-120 180 -170 260" fill="none" stroke="#0B0E13" stroke-width="12"/>
     <polygon points="0,-60 40,-20 -40,-20" fill="${RED}" opacity="0.7"/>
   </g>`
);

cultureScene(
  "culture/indonesia-house-01.svg",
  "TRADITIONAL HOUSES",
  "ARCHITECTURE — TONGKONAN",
  `<g>
     <polygon points="300,560 900,560 700,360 500,360" fill="#0B0E13"/>
     <polygon points="500,360 700,360 660,300 540,300" fill="#10141B"/>
     <polygon points="540,300 660,300 630,250 570,250" fill="#0B0E13" stroke="${RED}" stroke-opacity="0.4"/>
     <polygon points="330,540 470,540 460,450 340,450" fill="#10141B"/>
     <polygon points="730,540 870,540 860,450 740,450" fill="#10141B"/>
     <rect x="480" y="560" width="240" height="120" fill="#0B0E13"/>
     <rect x="560" y="600" width="80" height="80" fill="#07090C"/>
     <line x1="480" y1="560" x2="480" y2="700" stroke="#FFFFFF" stroke-opacity="0.08"/>
     <line x1="720" y1="560" x2="720" y2="700" stroke="#FFFFFF" stroke-opacity="0.08"/>
   </g>`
);

cultureScene(
  "culture/indonesia-clothing-01.svg",
  "TRADITIONAL CLOTHING",
  "TEXTILE — SONGKET & ULOS",
  `<g>
     <rect x="300" y="320" width="600" height="360" fill="none" stroke="#FFFFFF" stroke-opacity="0.2"/>
     <g stroke="#F4F4F2" stroke-opacity="0.25" stroke-width="1.5">
       <path d="M330 340 L870 340 M330 380 L870 380 M330 420 L870 420 M330 460 L870 460 M330 500 L870 500 M330 540 L870 540 M330 580 L870 580 M330 620 L870 620"/>
       <path d="M340 330 L340 670 M400 330 L400 670 M460 330 L460 670 M520 330 L520 670 M580 330 L580 670 M640 330 L640 670 M700 330 L700 670 M760 330 L760 670 M820 330 L820 670"/>
     </g>
     <g fill="${RED}"><circle cx="400" cy="380" r="6"/><circle cx="640" cy="500" r="6"/><circle cx="760" cy="580" r="6"/><circle cx="520" cy="620" r="6"/></g>
     <g fill="#C8A24B"><circle cx="460" cy="460" r="5"/><circle cx="700" cy="420" r="5"/><circle cx="580" cy="540" r="5"/></g>
   </g>`
);

// ---------- GALLERY ----------
function gallery(name, title, cat, art) {
  const w = 1200, h = 900;
  const body =
    glow(w * 0.5, h * 0.5, 460, RED, 0.2) +
    art +
    `<rect x="60" y="60" width="28" height="2" fill="${RED}"/>` +
    `<text x="60" y="96" font-family="ui-monospace, monospace" font-size="13" letter-spacing="4" fill="${PAPER}">${title}</text>` +
    `<text x="60" y="118" font-family="ui-monospace, monospace" font-size="11" letter-spacing="3" fill="${MIST}">${cat}</text>`;
  write(name, scene(w, h, INK, PANEL2, body));
}

gallery(
  "gallery/indonesia-gallery-01.svg",
  "DAWN OVER BROMO",
  "NATURE",
  mountains(1200, 640, [[150, 480], [400, 400], [650, 500], [900, 420], [1150, 500]], "#0B0E13") +
    `<circle cx="600" cy="360" r="90" fill="${EMBER}" opacity="0.7"/>
     <circle cx="600" cy="360" r="90" fill="none" stroke="${RED}" stroke-opacity="0.3"/>`
);

gallery(
  "gallery/indonesia-gallery-02.svg",
  "BOROBUDUR IN MIST",
  "ARCHITECTURE",
  mountains(1200, 640, [[100, 500], [300, 430], [500, 520], [700, 440], [900, 500], [1150, 430]], "#0B0E13") +
    `<g opacity="0.85">
       <polygon points="440,500 760,500 720,440 480,440" fill="#0B0E13"/>
       <polygon points="470,440 730,440 700,380 500,380" fill="#0B0E13"/>
       <circle cx="600" cy="330" r="28" fill="#0B0E13"/>
       ${[540, 580, 620, 660].map((x) => `<circle cx="${x}" cy="362" r="8" fill="#10141B"/>`).join("")}
     </g>`
);

gallery(
  "gallery/indonesia-gallery-03.svg",
  "BATIK ARTISAN",
  "CULTURE",
  `<circle cx="600" cy="430" r="150" fill="#0B0E13"/>
   <circle cx="600" cy="430" r="150" fill="none" stroke="${RED}" stroke-opacity="0.4"/>
   <g stroke="#F4F4F2" stroke-opacity="0.3">
     <circle cx="600" cy="430" r="40" fill="none"/>
     <circle cx="600" cy="430" r="70" fill="none"/>
     <circle cx="600" cy="430" r="100" fill="none"/>
     <circle cx="600" cy="430" r="130" fill="none"/>
   </g>
   <circle cx="600" cy="430" r="6" fill="${RED}"/>`
);

gallery(
  "gallery/indonesia-gallery-04.svg",
  "JAKARTA NIGHTS",
  "CITIES",
  `<rect x="0" y="620" width="1200" height="280" fill="#07090C"/>
   <line x1="0" y1="620" x2="1200" y2="620" stroke="#FFFFFF" stroke-opacity="0.1"/>
   ${[140, 220, 300, 400, 500, 620, 740, 860, 980, 1060].map((x, i) => {
     const th = 200 + (i % 3) * 110;
     return `<rect x="${x}" y="${620 - th}" width="40" height="${th}" fill="#0B0E13" stroke="#FFFFFF" stroke-opacity="${i % 2 ? 0.1 : 0.04}"/>
             <circle cx="${x + 20}" cy="${622 - th}" r="2.5" fill="${RED}" opacity="${i % 2 ? 0.8 : 0.3}"/>`;
   }).join("")}`
);

gallery(
  "gallery/indonesia-gallery-05.svg",
  "GAMELAN DETAIL",
  "CULTURE",
  `<circle cx="600" cy="430" r="200" fill="#0B0E13"/>
   <circle cx="600" cy="430" r="200" fill="none" stroke="#FFFFFF" stroke-opacity="0.15"/>
   <circle cx="600" cy="430" r="120" fill="none" stroke="${RED}" stroke-opacity="0.5" stroke-width="3"/>
   <circle cx="600" cy="430" r="60" fill="none" stroke="#FFFFFF" stroke-opacity="0.3"/>`
);

gallery(
  "gallery/indonesia-gallery-06.svg",
  "RAJA AMPAT LAGOON",
  "NATURE",
  `<path d="M0 700 Q300 480 600 620 Q900 760 1200 560 L1200 900 L0 900 Z" fill="#0B0E13"/>
   <path d="M0 780 Q300 620 600 740 Q900 840 1200 680 L1200 900 L0 900 Z" fill="#07090C"/>
   <circle cx="240" cy="480" r="70" fill="#0B0E13"/>
   <circle cx="240" cy="480" r="70" fill="none" stroke="#FFFFFF" stroke-opacity="0.15"/>
   <circle cx="900" cy="430" r="50" fill="#0B0E13"/>
   <circle cx="900" cy="430" r="50" fill="none" stroke="#FFFFFF" stroke-opacity="0.15"/>`
);

console.log("Asset generation complete.");
