// Brand constants - centralized contact info
export const BRAND = {
  name: "Vital Home Pros",
  phone: "(913) 398-2500",
  phoneHref: "tel:+19133982500",
  email: "hello@vitalhomepros.com",
  website: "https://www.vitalhomepros.com",
  baseUrl: "https://www.vitalhomepros.com",
  hours: "Mon–Sat 7am–8pm; Emergency 24/7",
  license: "HVAC-MO-10293",
  tagline: "No-Drama Heating & Cooling",
  yearsInBusiness: "15"
};

// Legacy companyInfo for backward compatibility
export const companyInfo = {
  name: BRAND.name,
  tagline: BRAND.tagline,
  phone: BRAND.phone,
  yearsInBusiness: BRAND.yearsInBusiness,
  licenseNumber: BRAND.license,
  website: BRAND.baseUrl,
  logo: "/src/assets/show-me-logo.png",
  serviceHours: "Mo-Su 00:00-23:59",
  socialMedia: {
    facebook: "https://www.facebook.com/showmeair",
    google: "https://g.page/showmeair"
  },
  rating: {
    value: "4.9",
    count: "284"
  }
};

// Canonical service list (slugs must match routes)
export const SERVICES = [
  { slug: "ac-repair", label: "AC Repair" },
  { slug: "ac-installation", label: "AC Installation" },
  { slug: "furnace-repair", label: "Furnace Repair" },
  { slug: "furnace-installation", label: "Furnace Installation" },
  { slug: "heat-pump", label: "Heat Pump Services" },
  { slug: "hvac-maintenance", label: "HVAC Maintenance" },
  { slug: "indoor-air-quality", label: "Indoor Air Quality" }
];

// County adjacency map for nearby cities logic
export const COUNTY_ADJACENCY: Record<string, string[]> = {
  // Missouri
  "Jackson,MO": ["Clay,MO", "Platte,MO", "Cass,MO", "Johnson,KS", "Wyandotte,KS"],
  "Clay,MO": ["Jackson,MO", "Platte,MO"],
  "Platte,MO": ["Jackson,MO", "Clay,MO", "Leavenworth,KS", "Wyandotte,KS"],
  "Cass,MO": ["Jackson,MO", "Johnson,KS"],
  
  // Kansas
  "Wyandotte,KS": ["Jackson,MO", "Platte,MO", "Johnson,KS"],
  "Johnson,KS": ["Jackson,MO", "Wyandotte,KS", "Miami,KS"],
  "Leavenworth,KS": ["Platte,MO", "Wyandotte,KS", "Johnson,KS"],
  "Miami,KS": ["Johnson,KS", "Cass,MO"]
};

export const services = {
  "ac-repair": {
    name: "AC Repair",
    category: "HVAC",
    description: "Fast, reliable air conditioning repair services",
    commonIssues: [
      "Short cycling and frequent on/off",
      "Low refrigerant levels",
      "Capacitor failures",
      "Frozen evaporator coils",
      "Thermostat malfunctions"
    ]
  },
  "ac-installation": {
    name: "AC Installation",
    category: "HVAC",
    description: "Professional air conditioning installation and replacement",
    commonIssues: [
      "Outdated inefficient systems",
      "Undersized or oversized units",
      "Poor airflow distribution",
      "High energy bills",
      "Frequent breakdowns"
    ]
  },
  "furnace-repair": {
    name: "Furnace Repair",
    category: "HVAC",
    description: "Expert furnace repair and maintenance",
    commonIssues: [
      "No heat or insufficient heating",
      "Strange noises or odors",
      "Ignition problems",
      "Blower motor failures",
      "Cracked heat exchangers"
    ]
  },
  "furnace-installation": {
    name: "Furnace Installation",
    category: "HVAC",
    description: "Complete furnace installation and replacement services",
    commonIssues: [
      "Old inefficient furnaces",
      "Inconsistent heating",
      "Rising utility costs",
      "Safety concerns",
      "End of equipment lifespan"
    ]
  },
  "hvac-maintenance": {
    name: "HVAC Maintenance",
    category: "HVAC",
    description: "Preventive maintenance to keep your system running smoothly",
    commonIssues: [
      "Reduced efficiency",
      "Unexpected breakdowns",
      "Shortened equipment life",
      "Poor air quality",
      "Higher energy costs"
    ]
  },
  "indoor-air-quality": {
    name: "Indoor Air Quality",
    category: "HVAC",
    description: "Solutions for healthier indoor air",
    commonIssues: [
      "Allergens and pollutants",
      "Humidity problems",
      "Odors and stale air",
      "Respiratory irritation",
      "Mold and mildew"
    ]
  }
};

// KC Metro Service Area Data - comprehensive coverage
export interface CityData {
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

export const kcMetroCities: CityData[] = [
  // Missouri - Jackson County
  {"state":"MO","county":"Jackson","city":"Kansas City","slug":"kansas-city","priority":1,"neighborhoods":["Downtown","Crossroads","Westport","Brookside","Waldo","Northland"], "zipCodes": ["64101", "64105", "64108", "64111"], "utilityProvider": "Evergy", "weatherFacts": "Hot, humid summers averaging 89°F. Cold winters with average lows of 22°F.", "rebates": "Up to $500 rebate on qualifying energy-efficient AC units through Evergy", "landmarks": ["Country Club Plaza", "Power & Light District", "Crown Center"]},
  {"state":"MO","county":"Jackson","city":"Independence","slug":"independence","priority":1,"neighborhoods":[]},
  {"state":"MO","county":"Jackson","city":"Lee's Summit","slug":"lees-summit","priority":1,"neighborhoods":[]},
  {"state":"MO","county":"Jackson","city":"Blue Springs","slug":"blue-springs","priority":1,"neighborhoods":[]},
  {"state":"MO","county":"Jackson","city":"Raytown","slug":"raytown","priority":2,"neighborhoods":[]},
  {"state":"MO","county":"Jackson","city":"Grandview","slug":"grandview","priority":2,"neighborhoods":[]},
  {"state":"MO","county":"Jackson","city":"Grain Valley","slug":"grain-valley","priority":2,"neighborhoods":[]},
  {"state":"MO","county":"Jackson","city":"Greenwood","slug":"greenwood","priority":3,"neighborhoods":[]},
  {"state":"MO","county":"Jackson","city":"Sugar Creek","slug":"sugar-creek","priority":3,"neighborhoods":[]},
  {"state":"MO","county":"Jackson","city":"Oak Grove","slug":"oak-grove","priority":3,"neighborhoods":[]},
  {"state":"MO","county":"Jackson","city":"Lake Lotawana","slug":"lake-lotawana","priority":3,"neighborhoods":[]},
  {"state":"MO","county":"Jackson","city":"Lake Tapawingo","slug":"lake-tapawingo","priority":3,"neighborhoods":[]},
  {"state":"MO","county":"Jackson","city":"Buckner","slug":"buckner","priority":3,"neighborhoods":[]},
  {"state":"MO","county":"Jackson","city":"Levasy","slug":"levasy","priority":3,"neighborhoods":[]},
  
  // Missouri - Clay County
  {"state":"MO","county":"Clay","city":"Liberty","slug":"liberty","priority":1,"neighborhoods":[]},
  {"state":"MO","county":"Clay","city":"Gladstone","slug":"gladstone","priority":1,"neighborhoods":[]},
  {"state":"MO","county":"Clay","city":"North Kansas City","slug":"north-kansas-city","priority":1,"neighborhoods":[]},
  {"state":"MO","county":"Clay","city":"Kearney","slug":"kearney","priority":3,"neighborhoods":[]},
  {"state":"MO","county":"Clay","city":"Smithville","slug":"smithville","priority":3,"neighborhoods":[]},
  {"state":"MO","county":"Clay","city":"Excelsior Springs","slug":"excelsior-springs","priority":3,"neighborhoods":[]},
  {"state":"MO","county":"Clay","city":"Pleasant Valley","slug":"pleasant-valley","priority":4,"neighborhoods":[]},
  {"state":"MO","county":"Clay","city":"Claycomo","slug":"claycomo","priority":4,"neighborhoods":[]},
  {"state":"MO","county":"Clay","city":"Oakwood Park","slug":"oakwood-park","priority":4,"neighborhoods":[]},
  {"state":"MO","county":"Clay","city":"Oakwood","slug":"oakwood","priority":4,"neighborhoods":[]},
  {"state":"MO","county":"Clay","city":"Oakview","slug":"oakview","priority":4,"neighborhoods":[]},
  {"state":"MO","county":"Clay","city":"Glenaire","slug":"glenaire","priority":4,"neighborhoods":[]},
  {"state":"MO","county":"Clay","city":"Avondale","slug":"avondale","priority":4,"neighborhoods":[]},
  {"state":"MO","county":"Clay","city":"Birmingham","slug":"birmingham","priority":4,"neighborhoods":[]},
  {"state":"MO","county":"Clay","city":"Mosby","slug":"mosby","priority":4,"neighborhoods":[]},
  {"state":"MO","county":"Clay","city":"Prathersville","slug":"prathersville","priority":4,"neighborhoods":[]},
  {"state":"MO","county":"Clay","city":"Holt","slug":"holt","priority":4,"neighborhoods":[]},
  
  // Missouri - Platte County
  {"state":"MO","county":"Platte","city":"Parkville","slug":"parkville","priority":3,"neighborhoods":[]},
  {"state":"MO","county":"Platte","city":"Riverside","slug":"riverside","priority":3,"neighborhoods":[]},
  {"state":"MO","county":"Platte","city":"Weatherby Lake","slug":"weatherby-lake","priority":3,"neighborhoods":[]},
  {"state":"MO","county":"Platte","city":"Platte Woods","slug":"platte-woods","priority":4,"neighborhoods":[]},
  {"state":"MO","county":"Platte","city":"Platte City","slug":"platte-city","priority":3,"neighborhoods":[]},
  {"state":"MO","county":"Platte","city":"Northmoor","slug":"northmoor","priority":4,"neighborhoods":[]},
  {"state":"MO","county":"Platte","city":"Weston","slug":"weston","priority":4,"neighborhoods":[]},
  {"state":"MO","county":"Platte","city":"Dearborn","slug":"dearborn","priority":4,"neighborhoods":[]},
  {"state":"MO","county":"Platte","city":"Tracy","slug":"tracy","priority":4,"neighborhoods":[]},
  {"state":"MO","county":"Platte","city":"Houston Lake","slug":"houston-lake","priority":4,"neighborhoods":[]},
  {"state":"MO","county":"Platte","city":"Farley","slug":"farley","priority":4,"neighborhoods":[]},
  
  // Missouri - Cass County
  {"state":"MO","county":"Cass","city":"Belton","slug":"belton","priority":2,"neighborhoods":[]},
  {"state":"MO","county":"Cass","city":"Raymore","slug":"raymore","priority":2,"neighborhoods":[]},
  {"state":"MO","county":"Cass","city":"Peculiar","slug":"peculiar","priority":3,"neighborhoods":[]},
  {"state":"MO","county":"Cass","city":"Harrisonville","slug":"harrisonville","priority":3,"neighborhoods":[]},
  {"state":"MO","county":"Cass","city":"Pleasant Hill","slug":"pleasant-hill","priority":3,"neighborhoods":[]},
  {"state":"MO","county":"Cass","city":"Garden City","slug":"garden-city","priority":4,"neighborhoods":[]},
  {"state":"MO","county":"Cass","city":"Lake Winnebago","slug":"lake-winnebago","priority":4,"neighborhoods":[]},
  {"state":"MO","county":"Cass","city":"Creighton","slug":"creighton","priority":4,"neighborhoods":[]},
  {"state":"MO","county":"Cass","city":"Cleveland","slug":"cleveland","priority":4,"neighborhoods":[]},
  {"state":"MO","county":"Cass","city":"Freeman","slug":"freeman","priority":4,"neighborhoods":[]},
  {"state":"MO","county":"Cass","city":"East Lynne","slug":"east-lynne","priority":4,"neighborhoods":[]},
  {"state":"MO","county":"Cass","city":"Strasburg","slug":"strasburg","priority":4,"neighborhoods":[]},
  
  // Kansas - Wyandotte County
  {"state":"KS","county":"Wyandotte","city":"Kansas City","slug":"kansas-city","priority":1,"neighborhoods":["Piper","Turner","Rosedale","Argentine","Armourdale","Strawberry Hill"]},
  {"state":"KS","county":"Wyandotte","city":"Bonner Springs","slug":"bonner-springs","priority":2,"neighborhoods":[]},
  {"state":"KS","county":"Wyandotte","city":"Edwardsville","slug":"edwardsville","priority":2,"neighborhoods":[]},
  {"state":"KS","county":"Wyandotte","city":"Lake Quivira","slug":"lake-quivira","priority":3,"neighborhoods":[]},
  
  // Kansas - Johnson County
  {"state":"KS","county":"Johnson","city":"Overland Park","slug":"overland-park","priority":1,"neighborhoods":[], "zipCodes": ["66204", "66207", "66212", "66221"], "utilityProvider": "Evergy", "weatherFacts": "Summer temperatures reach 90°F with high humidity. Winter lows average 20°F.", "rebates": "Up to $500 rebate on qualifying HVAC systems through Evergy", "landmarks": ["Overland Park Arboretum", "Corporate Woods", "Prairiefire"]},
  {"state":"KS","county":"Johnson","city":"Olathe","slug":"olathe","priority":1,"neighborhoods":[]},
  {"state":"KS","county":"Johnson","city":"Shawnee","slug":"shawnee","priority":1,"neighborhoods":[]},
  {"state":"KS","county":"Johnson","city":"Lenexa","slug":"lenexa","priority":1,"neighborhoods":[]},
  {"state":"KS","county":"Johnson","city":"Leawood","slug":"leawood","priority":1,"neighborhoods":[]},
  {"state":"KS","county":"Johnson","city":"Prairie Village","slug":"prairie-village","priority":2,"neighborhoods":[]},
  {"state":"KS","county":"Johnson","city":"Mission","slug":"mission","priority":2,"neighborhoods":[]},
  {"state":"KS","county":"Johnson","city":"Merriam","slug":"merriam","priority":2,"neighborhoods":[]},
  {"state":"KS","county":"Johnson","city":"De Soto","slug":"de-soto","priority":2,"neighborhoods":[]},
  {"state":"KS","county":"Johnson","city":"Gardner","slug":"gardner","priority":2,"neighborhoods":[]},
  {"state":"KS","county":"Johnson","city":"Edgerton","slug":"edgerton","priority":4,"neighborhoods":[]},
  {"state":"KS","county":"Johnson","city":"Spring Hill","slug":"spring-hill","priority":3,"neighborhoods":[]},
  {"state":"KS","county":"Johnson","city":"Mission Hills","slug":"mission-hills","priority":4,"neighborhoods":[]},
  {"state":"KS","county":"Johnson","city":"Mission Woods","slug":"mission-woods","priority":4,"neighborhoods":[]},
  {"state":"KS","county":"Johnson","city":"Roeland Park","slug":"roeland-park","priority":3,"neighborhoods":[]},
  {"state":"KS","county":"Johnson","city":"Fairway","slug":"fairway","priority":3,"neighborhoods":[]},
  {"state":"KS","county":"Johnson","city":"Westwood","slug":"westwood","priority":4,"neighborhoods":[]},
  {"state":"KS","county":"Johnson","city":"Westwood Hills","slug":"westwood-hills","priority":4,"neighborhoods":[]},
  
  // Kansas - Leavenworth County
  {"state":"KS","county":"Leavenworth","city":"Leavenworth","slug":"leavenworth","priority":3,"neighborhoods":[]},
  {"state":"KS","county":"Leavenworth","city":"Lansing","slug":"lansing","priority":2,"neighborhoods":[]},
  {"state":"KS","county":"Leavenworth","city":"Basehor","slug":"basehor","priority":4,"neighborhoods":[]},
  {"state":"KS","county":"Leavenworth","city":"Tonganoxie","slug":"tonganoxie","priority":4,"neighborhoods":[]},
  
  // Kansas - Miami County
  {"state":"KS","county":"Miami","city":"Paola","slug":"paola","priority":3,"neighborhoods":[]},
  {"state":"KS","county":"Miami","city":"Louisburg","slug":"louisburg","priority":3,"neighborhoods":[]},
  {"state":"KS","county":"Miami","city":"Spring Hill","slug":"spring-hill-miami","priority":3,"neighborhoods":[]},
  {"state":"KS","county":"Miami","city":"Osawatomie","slug":"osawatomie","priority":4,"neighborhoods":[]},
  {"state":"KS","county":"Miami","city":"Fontana","slug":"fontana","priority":4,"neighborhoods":[]}
].map(city => ({
  name: city.city,
  state: city.state as "MO" | "KS",
  county: city.county,
  slug: city.slug,
  priority: city.priority as 1 | 2 | 3 | 4,
  neighborhoods: city.neighborhoods,
  zipCodes: city.zipCodes,
  utilityProvider: city.utilityProvider || "Evergy",
  weatherFacts: city.weatherFacts || "Hot, humid summers and cold winters typical of the KC metro area.",
  rebates: city.rebates || "Ask about available utility rebates and financing options.",
  landmarks: city.landmarks || []
})) as CityData[];

// Legacy cities object for backward compatibility
export const cities = {
  "kansas-city": kcMetroCities.find(c => c.slug === "kansas-city" && c.state === "MO")!,
  "overland-park": kcMetroCities.find(c => c.slug === "overland-park")!,
};

export const proofPoints = [
  "Same-day repairs available",
  "5-star Google rated",
  "Licensed & insured in Missouri",
  "100% satisfaction guarantee",
  "Upfront, transparent pricing",
  "Family-owned and operated"
];

export const faqs = {
  "ac-repair": [
    {
      question: "How quickly can you repair my AC?",
      answer: "We offer same-day service for most AC repairs. Our technicians arrive fully equipped to diagnose and fix common issues on the first visit."
    },
    {
      question: "What causes an AC to stop cooling?",
      answer: "Common causes include low refrigerant, dirty filters, frozen coils, or capacitor failure. Our technicians will diagnose the exact issue and provide upfront pricing before any work begins."
    },
    {
      question: "Do you offer emergency AC repair?",
      answer: "Yes! We provide 24/7 emergency service because we know Missouri summers don't wait. Call us anytime for urgent AC repairs."
    }
  ],
  "ac-installation": [
    {
      question: "How long does AC installation take?",
      answer: "Most installations are completed in one day. Complex installations may take longer, but we'll give you an accurate timeline during the estimate."
    },
    {
      question: "What size AC unit do I need?",
      answer: "Our technicians perform a detailed load calculation based on your home's size, insulation, and layout to ensure you get the perfectly sized system for maximum efficiency."
    },
    {
      question: "Are there rebates available?",
      answer: "Yes! Many utility companies offer rebates on high-efficiency systems. We'll help you identify and apply for all available rebates and financing options."
    }
  ],
  "furnace-repair": [
    {
      question: "Is it normal for my furnace to make noise?",
      answer: "Some sounds are normal, but banging, screeching, or rumbling often indicates a problem. We'll inspect your furnace and identify any issues before they become major repairs."
    },
    {
      question: "How often should I service my furnace?",
      answer: "Annual maintenance before heating season is recommended. Regular tune-ups prevent breakdowns, improve efficiency, and extend your furnace's lifespan."
    },
    {
      question: "Why isn't my furnace producing heat?",
      answer: "Common causes include thermostat issues, ignition problems, or a faulty blower motor. Our technicians will quickly diagnose and repair the problem."
    }
  ],
  "furnace-installation": [
    {
      question: "When should I replace my furnace?",
      answer: "If your furnace is over 15 years old, requires frequent repairs, or your energy bills are rising, replacement is often more cost-effective than continued repairs."
    },
    {
      question: "What type of furnace is best?",
      answer: "We'll recommend the best system based on your home, budget, and efficiency goals. Options include gas, electric, and high-efficiency models with variable-speed technology."
    },
    {
      question: "Do you handle permits and inspections?",
      answer: "Yes! We handle all permits, inspections, and code compliance so you don't have to worry about anything."
    }
  ],
  "hvac-maintenance": [
    {
      question: "How often should I schedule HVAC maintenance?",
      answer: "We recommend twice-yearly service: once before cooling season and once before heating season. This prevents breakdowns and keeps your system running efficiently."
    },
    {
      question: "What's included in a maintenance visit?",
      answer: "Our comprehensive tune-up includes filter replacement, coil cleaning, refrigerant check, electrical connections inspection, and performance testing."
    },
    {
      question: "Will maintenance save me money?",
      answer: "Absolutely! Regular maintenance improves efficiency (lowering energy bills), prevents costly repairs, and extends your equipment's lifespan."
    }
  ],
  "indoor-air-quality": [
    {
      question: "How can I improve my home's air quality?",
      answer: "Solutions include air purifiers, UV lights, humidifiers/dehumidifiers, and regular filter changes. We'll assess your home and recommend the best options."
    },
    {
      question: "What are signs of poor air quality?",
      answer: "Excessive dust, odors, respiratory irritation, humidity problems, and frequent allergy symptoms all indicate poor indoor air quality."
    },
    {
      question: "Do air purifiers really work?",
      answer: "Yes! Modern whole-home air purifiers remove up to 99.97% of airborne particles, including allergens, bacteria, and viruses, significantly improving indoor air quality."
    }
  ]
};
