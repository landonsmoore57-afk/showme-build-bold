// src/content/generators.ts
import type { City } from "../types";

/** ---------- Seeded PRNG (stable per city/service) ---------- */
function hashStr(str: string) {
  // Simple xorshift-based hash (fast & deterministic)
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function makeRng(seed: string) {
  let x = hashStr(seed) || 123456789;
  return () => {
    // xorshift32
    x ^= x << 13; x ^= x >>> 17; x ^= x << 5;
    return ((x >>> 0) / 4294967296);
  };
}

function pick<T>(rng: () => number, arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

function pickN<T>(rng: () => number, arr: T[], n: number): T[] {
  const a = [...arr];
  const out: T[] = [];
  while (a.length && out.length < n) {
    out.push(a.splice(Math.floor(rng() * a.length), 1)[0]);
  }
  return out;
}

/** ---------- Local Context Banks ---------- */
const climateBase = [
  "hot, humid summers",
  "freeze–thaw winters",
  "spring thunderstorms",
  "big temperature swings",
  "shoulder-season humidity"
];

const housingByCounty: Record<string, string[]> = {
  "Jackson,MO": [
    "100-year-old bungalows and foursquares",
    "postwar ranch homes",
    "mixed-use infill near Downtown and Midtown"
  ],
  "Clay,MO": [
    "Northland split-levels and ranches",
    "newer subdivisions with tighter envelopes",
    "homes with finished basements"
  ],
  "Platte,MO": [
    "cul-de-sac subdivisions",
    "modern builds near Parkville and Riverside",
    "homes with larger supply returns"
  ],
  "Cass,MO": [
    "rural properties and edge-of-metro builds",
    "newer tract homes in Belton/Raymore",
    "homes with attic access challenges"
  ],
  "Wyandotte,KS": [
    "older housing stock with mixed ductwork",
    "brick homes and smaller lots",
    "up-and-coming infill near KCK"
  ],
  "Johnson,KS": [
    "1980s–2000s tract homes",
    "new construction with higher SEER standards",
    "two-story layouts common in OP/Lenexa/Shawnee"
  ],
  "Leavenworth,KS": [
    "historic homes and military-adjacent housing",
    "ranches and split-levels",
    "tight crawlspaces in older builds"
  ],
  "Miami,KS": [
    "rural homes and outbuildings",
    "farmhouse renovations",
    "longer runs to conditioned spaces"
  ]
};

const serviceBenefits: Record<string, string[]> = {
  "ac-repair": [
    "fast diagnostics",
    "stocked trucks for common parts",
    "no-surprise pricing",
    "brand-agnostic service"
  ],
  "ac-installation": [
    "right-sized equipment",
    "high-efficiency options",
    "clean, professional installation",
    "warranty registration included"
  ],
  "furnace-repair": [
    "safe heat exchanger checks",
    "ignition and sensor expertise",
    "after-hours availability",
    "clear repair-or-replace guidance"
  ],
  "furnace-installation": [
    "high-efficiency furnace options",
    "proper venting and safety",
    "rebate-qualified equipment",
    "complete permit handling"
  ],
  "heat-pump": [
    "cold-climate heat pump options",
    "proper sizing and balance",
    "rebate-ready installs",
    "quiet, efficient operation"
  ],
  "hvac-maintenance": [
    "longer equipment life",
    "fewer emergency calls",
    "lower utility bills",
    "priority scheduling"
  ],
  "indoor-air-quality": [
    "better filtration strategies",
    "UV and air purification options",
    "humidity control",
    "allergy- and asthma-friendly upgrades"
  ]
};

const synonyms = {
  homes: ["homes", "households", "residences"],
  pros: ["technicians", "pros", "specialists"],
  book: ["Book now", "Schedule today", "Get on the calendar", "Grab a same-day slot"],
  pricing: ["upfront pricing", "no-surprise quotes", "transparent pricing"],
  tuneup: ["tune-up", "seasonal check", "maintenance visit"]
};

/** ---------- Helper text builders ---------- */
function titleCaseState(st: string) {
  return st.toUpperCase();
}

function joinList(list: string[]) {
  if (!list.length) return "";
  if (list.length === 1) return list[0];
  return list.slice(0, -1).join(", ") + " and " + list[list.length - 1];
}

/** ---------- Public API ---------- */
export function buildIntro(city: City, serviceSlug: string) {
  const rng = makeRng(`${city.slug}:${serviceSlug}:intro`);
  const climate = pickN(rng, climateBase, 2);
  const countyKey = `${city.county},${city.state}`;
  const housing = pickN(rng, housingByCounty[countyKey] ?? ["mixed housing stock"], 1);
  const benefits = pickN(rng, serviceBenefits[serviceSlug] ?? ["reliable service"], 2);
  const h = pick(rng, synonyms.homes);
  const p = pick(rng, synonyms.pros);
  const call = pick(rng, synonyms.book);

  // 120–180 words target
  const serviceName = serviceSlug.replace(/-/g, " ");
  const lines = [
    `Need ${serviceName} in ${city.name}, ${titleCaseState(city.state)}? We've got you. Kansas City weather brings ${joinList(climate)}, and that puts real stress on HVAC systems across ${city.name} ${h}.`,
    `Our local ${p} know the area—think ${housing[0]}—and we tailor diagnostics and recommendations to your home and budget.`,
    `Expect ${joinList(benefits)} from a team that treats you like a neighbor. We'll troubleshoot quickly, explain options in plain English, and only proceed when you're comfortable.`,
    `${call} and we'll get you taken care of in ${city.name}.`
  ];

  // Light shuffle of sentence order to reduce duplication across services
  const order = [0, 1, 2, 3];
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order.map(i => lines[i]).join(" ");
}

export function buildEmergency(city: City) {
  const rng = makeRng(`${city.slug}:emergency`);
  const call = pick(rng, synonyms.book);
  const coverage = pick(rng, ["live dispatch", "priority routing", "after-hours coverage"]);
  return `No cool or no heat in ${city.name}? We offer 24/7 emergency response with ${coverage}. We'll stabilize the issue, quote repairs up front, and get you comfortable again. ${call} for the next available window.`;
}

export function buildInstall(city: City, serviceSlug: string) {
  const rng = makeRng(`${city.slug}:${serviceSlug}:install`);
  const pitch = pick(rng, [
    "right-sized equipment matched to your home",
    "high-efficiency options that cut utility bills",
    "quiet comfort with smart controls"
  ]);
  return `When repair isn't the smart move, we'll spec ${pitch}. You'll get a clear apples-to-apples quote, financing options, and a tidy install from licensed pros. We pull permits, register warranties, and walk you through operation before we leave.`;
}

export function buildMaintenance(city: City) {
  const rng = makeRng(`${city.slug}:maintenance`);
  const t = pick(rng, synonyms.tuneup);
  const perk = pick(rng, ["priority scheduling", "member discounts", "filter reminders"]);
  return `Stay ahead with a seasonal ${t}. Our checklist catches small issues early, improves efficiency, and extends system life. Ask about maintenance memberships with ${perk}.`;
}

export function buildIAQ(city: City) {
  const rng = makeRng(`${city.slug}:iaq`);
  const angle = pick(rng, ["dust and pollen", "humidity swings", "pet dander", "stale indoor air"]);
  return `Fighting ${angle}? We'll evaluate filtration, purification, and humidity control to improve comfort and air quality room-to-room. Options range from better filters to whole-home solutions.`;
}

export type QA = { q: string; a: string };

export function buildFaqs(city: City, serviceSlug: string): QA[] {
  const rng = makeRng(`${city.slug}:${serviceSlug}:faq`);
  const base: Record<string, QA[]> = {
    "ac-repair": [
      { q: "Do you offer same-day AC repair?", a: "Often yes—call early and we'll do our best to fit you in." },
      { q: "Do you service all brands?", a: "We repair most major brands and carry common parts on our trucks." },
      { q: "How do you price repairs?", a: "Upfront, flat-rate quotes after diagnosis—no surprises." }
    ],
    "ac-installation": [
      { q: "How long does installation take?", a: "Most installations complete in one day. We'll give you an accurate timeline during the estimate." },
      { q: "What size AC unit do I need?", a: "Our technicians perform a detailed load calculation to ensure the perfect size for maximum efficiency." },
      { q: "Are there rebates available?", a: "Yes! We'll help document qualifying installs and efficiency ratings." }
    ],
    "furnace-repair": [
      { q: "Emergency furnace repair available?", a: "Yes, including nights and weekends during heating season." },
      { q: "Will you check for CO risks?", a: "We inspect the heat exchanger and safety controls on every call." },
      { q: "Repair or replace guidance?", a: "We'll show costs side-by-side and let you choose." }
    ],
    "furnace-installation": [
      { q: "When should I replace my furnace?", a: "If your furnace is over 15 years old, requires frequent repairs, or your energy bills are rising, replacement is often more cost-effective." },
      { q: "Do you handle permits?", a: "Yes! We handle all permits, inspections, and code compliance." },
      { q: "What type of furnace is best?", a: "We'll recommend the best system based on your home, budget, and efficiency goals." }
    ],
    "heat-pump": [
      { q: "Cold-climate heat pumps—do they work here?", a: "Yes—properly sized systems perform well in KC winters." },
      { q: "Do you handle rebates?", a: "We'll help document qualifying installs and efficiency ratings." },
      { q: "Brands you install?", a: "Multiple top brands—matched to your home and budget." }
    ],
    "hvac-maintenance": [
      { q: "How often should I schedule?", a: "Typically spring for cooling and fall for heating." },
      { q: "Membership perks?", a: "Priority visits, discounts, and gentle reminders." },
      { q: "Does maintenance prevent breakdowns?", a: "It reduces surprise failures and keeps efficiency up." }
    ],
    "indoor-air-quality": [
      { q: "Do you test IAQ?", a: "We assess common issues and recommend practical upgrades." },
      { q: "Will filters fix everything?", a: "Filtration helps, but humidity and purification matter too." },
      { q: "Maintenance needed?", a: "We'll show you simple upkeep and set reminders if you'd like." }
    ]
  };
  
  const pool = base[serviceSlug] ?? [
    { q: "What areas do you cover?", a: `All across ${city.name} and nearby.` },
    { q: "How fast can you arrive?", a: "Same-day in many cases; call for today's openings." },
    { q: "What forms of payment?", a: "Card, check, and financing on qualified installs." }
  ];
  
  // 3–5 FAQs randomly selected (stable)
  const count = 3 + Math.floor(rng() * 3);
  return pickN(rng, pool, count);
}

/** Non-service city page intro (generic HVAC) */
export function buildCityIntro(city: City) {
  const rng = makeRng(`${city.slug}:city:intro`);
  const climate = pickN(rng, climateBase, 2);
  const h = pick(rng, synonyms.homes);
  return `${city.name}, ${city.state} sees ${joinList(climate)}—and your HVAC works hardest when weather swings. We're local pros who keep ${h} comfortable with fast repairs, smart replacements, and honest maintenance.`;
}
