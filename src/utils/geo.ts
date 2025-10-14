import { COUNTY_ADJACENCY } from "@/data/seoData";
import type { City } from "@/types";

export function keyCounty(county: string, state: "MO" | "KS") {
  return `${county},${state}`;
}

export function byPriorityCityAlpha(a: City, b: City) {
  if (a.priority !== b.priority) return a.priority - b.priority;
  return a.name.localeCompare(b.name);
}

// Nearby cities = same county (up to 4 by priority), then adjacent counties (up to 2 by priority)
export function getNearbyCities(all: City[], target: City, max = 6): City[] {
  const sameCounty = all
    .filter(c => c.state === target.state && c.county === target.county && c.slug !== target.slug)
    .sort(byPriorityCityAlpha);

  const adjacentCountyKeys = COUNTY_ADJACENCY[keyCounty(target.county, target.state)] || [];
  const adjacent = all
    .filter(c => adjacentCountyKeys.includes(keyCounty(c.county, c.state)))
    .sort(byPriorityCityAlpha);

  const pick: City[] = [];
  for (const c of sameCounty) {
    if (pick.length < Math.min(4, max)) pick.push(c);
  }
  for (const c of adjacent) {
    if (pick.length < max && !pick.find(p => p.slug === c.slug)) pick.push(c);
  }
  return pick.slice(0, max);
}
