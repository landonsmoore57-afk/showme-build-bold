export const companyInfo = {
  name: "Show-Me Air",
  tagline: "Don't Sweat It — We'll Keep You Cool.",
  phone: "(573) 555-HVAC",
  yearsInBusiness: "15",
  licenseNumber: "HVAC-MO-10293",
  website: "https://showmeair.com",
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

export const cities = {
  "columbia": {
    name: "Columbia",
    state: "MO",
    zipCodes: ["65201", "65202", "65203"],
    utilityProvider: "Columbia Water & Light",
    weatherFacts: "Average summer highs reach 89°F with 70% humidity. Winters average 38°F.",
    rebates: "Up to $300 rebate on high-efficiency HVAC systems through Columbia Water & Light",
    landmarks: ["University of Missouri", "Downtown Columbia", "The District"],
    neighborhoods: ["East Campus", "Old Southwest", "Parkade", "Benton-Stephens"]
  },
  "kansas-city": {
    name: "Kansas City",
    state: "MO",
    zipCodes: ["64101", "64105", "64108", "64111"],
    utilityProvider: "Evergy",
    weatherFacts: "Hot, humid summers averaging 89°F. Cold winters with average lows of 22°F.",
    rebates: "Up to $500 rebate on qualifying energy-efficient AC units through Evergy",
    landmarks: ["Country Club Plaza", "Power & Light District", "Crown Center"],
    neighborhoods: ["Brookside", "Waldo", "Westport", "River Market"]
  },
  "springfield": {
    name: "Springfield",
    state: "MO",
    zipCodes: ["65802", "65804", "65806", "65807"],
    utilityProvider: "City Utilities of Springfield",
    weatherFacts: "Summer highs around 90°F with moderate humidity. Winter lows average 24°F.",
    rebates: "Rebates available on ENERGY STAR certified systems through City Utilities",
    landmarks: ["Fantastic Caverns", "Jordan Valley Park", "Historic Commercial Street"],
    neighborhoods: ["Phelps Grove", "Rountree", "Cherry Street", "Brentwood"]
  },
  "st-louis": {
    name: "St. Louis",
    state: "MO",
    zipCodes: ["63101", "63103", "63108", "63110"],
    utilityProvider: "Ameren Missouri",
    weatherFacts: "Hot, humid summers with highs near 90°F. Cold winters averaging 30°F.",
    rebates: "Up to $450 rebate on high-efficiency cooling systems through Ameren Missouri",
    landmarks: ["Gateway Arch", "Forest Park", "The Hill", "Delmar Loop"],
    neighborhoods: ["Central West End", "Soulard", "Tower Grove", "Lafayette Square"]
  },
  "overland-park": {
    name: "Overland Park",
    state: "KS",
    zipCodes: ["66204", "66207", "66212", "66221"],
    utilityProvider: "Evergy",
    weatherFacts: "Summer temperatures reach 90°F with high humidity. Winter lows average 20°F.",
    rebates: "Up to $500 rebate on qualifying HVAC systems through Evergy",
    landmarks: ["Overland Park Arboretum", "Corporate Woods", "Prairiefire"],
    neighborhoods: ["Blue Valley", "South Overland Park", "Downtown OP", "Leawood border"]
  }
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
