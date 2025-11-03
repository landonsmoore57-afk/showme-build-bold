import { SITE_CONFIG } from "@/data/site";
import { SERVICES, CityData } from "@/data/seoData";

/**
 * Normalize and sanitize slug data to prevent duplicates
 */
export function generateSlugData(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/**
 * Generate unique page title based on route type
 */
interface TitleParams {
  city?: string;
  state?: string;
  service?: string;
  brand?: string;
  pageType?: "home" | "service" | "city" | "city-service" | "service-directory" | "state-hub" | "service-area-hub";
}

export function generateTitle(params: TitleParams): string {
  const { city, state, service, brand = SITE_CONFIG.brand, pageType = "home" } = params;

  switch (pageType) {
    case "home":
      return `Kansas City HVAC Experts | ${brand}`;
    
    case "service":
      return `${service} Services | ${brand} Kansas City`;
    
    case "city":
      return `${city}, ${state} HVAC Services | ${brand}`;
    
    case "city-service":
      return `${service} in ${city}, ${state} | ${brand}`;
    
    case "service-directory":
      return `HVAC Services Directory | ${brand}`;
    
    case "state-hub":
      return `${state === "MO" ? "Missouri" : "Kansas"} HVAC Services | ${brand}`;
    
    case "service-area-hub":
      return `Service Area & Coverage | ${brand}`;
    
    default:
      return `${brand} | Kansas City HVAC Services`;
  }
}

/**
 * Generate unique meta description (150-160 chars)
 */
interface DescriptionParams {
  city?: string;
  state?: string;
  service?: string;
  phone?: string;
  pageType?: TitleParams["pageType"];
}

export function generateDescription(params: DescriptionParams): string {
  const { city, state, service, phone = SITE_CONFIG.phone, pageType = "home" } = params;

  switch (pageType) {
    case "home":
      return `Trusted HVAC service in Kansas City metro. Fast AC & furnace repair, installations, 24/7 emergency service. Licensed pros — ${phone}.`;
    
    case "service":
      return `Expert ${service?.toLowerCase()} across Kansas City. Same-day service, upfront pricing, 100% satisfaction guaranteed. Call ${phone} today.`;
    
    case "city":
      return `Fast HVAC service in ${city}, ${state}. AC & furnace repair, maintenance, emergency service. Licensed techs — ${phone}.`;
    
    case "city-service":
      return `Professional ${service?.toLowerCase()} in ${city}, ${state}. Same-day appointments, honest pricing, satisfaction guaranteed. Call ${phone}.`;
    
    case "service-directory":
      return `Complete HVAC services directory: AC repair, furnace service, heat pumps, maintenance & more. Licensed Kansas City pros — ${phone}.`;
    
    case "state-hub":
      const stateName = state === "MO" ? "Missouri" : "Kansas";
      return `${stateName} HVAC services across KC metro. Fast, licensed AC & furnace repair. Emergency service available — ${phone}.`;
    
    case "service-area-hub":
      return `Serving 80+ cities across Kansas City metro. Fast HVAC repair, installation & maintenance. Same-day service — ${phone}.`;
    
    default:
      return `Professional HVAC services in Kansas City. Licensed, insured, and highly rated. Call ${phone} for fast service.`;
  }
}

/**
 * Generate unique H1 for page
 */
interface H1Params {
  city?: string;
  state?: string;
  service?: string;
  pageType?: TitleParams["pageType"];
}

export function generateH1(params: H1Params): string {
  const { city, state, service, pageType = "home" } = params;

  switch (pageType) {
    case "home":
      return "Kansas City's Trusted HVAC Experts";
    
    case "service":
      return `Professional ${service} Services`;
    
    case "city":
      return `HVAC Services in ${city}`;
    
    case "city-service":
      return `${service} in ${city}, ${state}`;
    
    case "service-directory":
      return "Complete HVAC Services Directory";
    
    case "state-hub":
      return `${state === "MO" ? "Missouri" : "Kansas"} HVAC Services`;
    
    case "service-area-hub":
      return "Our Service Area Coverage";
    
    default:
      return "Professional HVAC Services";
  }
}

/**
 * Generate canonical URL
 */
export function generateCanonical(pathname: string): string {
  // Ensure trailing slash
  const normalizedPath = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return `${SITE_CONFIG.baseUrl}${normalizedPath}`;
}

/**
 * Main function to get all SEO data for a route
 */
interface SEOData {
  title: string;
  description: string;
  h1: string;
  canonical: string;
  ogImage: string;
}

export function getSEOForRoute(pathname: string, params?: {
  city?: CityData;
  service?: { slug: string; label: string };
  state?: string;
}): SEOData {
  // Detect route type from pathname
  let pageType: TitleParams["pageType"] = "home";
  
  if (pathname === "/" || pathname === "") {
    pageType = "home";
  } else if (pathname.includes("/services/") && params?.service) {
    pageType = "service";
  } else if (pathname === "/services") {
    pageType = "service-directory";
  } else if (pathname === "/service-area") {
    pageType = "service-area-hub";
  } else if (pathname.match(/\/service-area\/[a-z]{2}$/i)) {
    pageType = "state-hub";
  } else if (pathname.match(/\/service-area\/[a-z]{2}\/[a-z-]+\/[a-z-]+$/i)) {
    pageType = "city-service";
  } else if (pathname.match(/\/service-area\/[a-z]{2}\/[a-z-]+$/i)) {
    pageType = "city";
  }

  const titleParams: TitleParams = {
    city: params?.city?.name,
    state: params?.city?.state || params?.state,
    service: params?.service?.label,
    pageType,
  };

  const descParams: DescriptionParams = {
    city: params?.city?.name,
    state: params?.city?.state || params?.state,
    service: params?.service?.label,
    pageType,
  };

  const h1Params: H1Params = {
    city: params?.city?.name,
    state: params?.city?.state || params?.state,
    service: params?.service?.label,
    pageType,
  };

  return {
    title: generateTitle(titleParams),
    description: generateDescription(descParams),
    h1: generateH1(h1Params),
    canonical: generateCanonical(pathname),
    ogImage: SITE_CONFIG.defaultOgImage,
  };
}
