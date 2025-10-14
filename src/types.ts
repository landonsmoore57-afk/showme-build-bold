export interface City {
  name: string;
  state: "MO" | "KS";
  county: string;
  slug: string;
  priority: 1 | 2 | 3 | 4;
  neighborhoods: string[];
  zipCodes?: string[];
  utilityProvider?: string;
  weatherFacts?: string;
  rebates?: string;
  landmarks?: string[];
}

export interface Service {
  slug: string;
  label: string;
  name?: string;
  category?: string;
  description?: string;
}
