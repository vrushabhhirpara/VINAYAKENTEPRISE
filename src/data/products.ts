export interface Product {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  image: string;
  description: string;
  featured: boolean;
  hsnCode?: string;
  specifications?: string[];
  applications?: string[];
}

export const productCategories = [
  "All",
  "Cattle & Poultry Feed",
  "Food & Nutrition", 
  "Industrial Solvents",
  "Personal Care",
  "Paint & Coatings",
  "Water Treatment",
  "Ceramics",
  "Home Care"
];

export const products: Product[] = [
  // Cattle & Poultry Feed
  {
    id: 1,
    name: "Dicalcium Phosphate",
    category: "Cattle & Poultry Feed",
    subcategory: "Feed Supplements",
    image: "https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "High-quality dicalcium phosphate for animal feed supplementation, providing essential calcium and phosphorus.",
    featured: true,
    hsnCode: "2835100000",
    specifications: ["Purity: 98% min", "Calcium: 23% min", "Phosphorus: 18% min"],
    applications: ["Poultry feed", "Cattle feed", "Aquaculture"]
  },
  {
    id: 2,
    name: "Monocalcium Phosphate",
    category: "Cattle & Poultry Feed", 
    subcategory: "Feed Supplements",
    image: "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Premium monocalcium phosphate for enhanced animal nutrition and bone development.",
    featured: false,
    hsnCode: "2835100000",
    specifications: ["Purity: 98% min", "Calcium: 16-18%", "Phosphorus: 22-24%"],
    applications: ["Animal feed additive", "Nutritional supplement"]
  },
  {
    id: 3,
    name: "Zinc Sulphate",
    category: "Cattle & Poultry Feed",
    subcategory: "Mineral Supplements", 
    image: "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Essential zinc supplement for animal health and growth promotion.",
    featured: false,
    hsnCode: "2833291000",
    specifications: ["Zinc content: 35% min", "Water soluble", "Feed grade"],
    applications: ["Poultry nutrition", "Livestock supplements"]
  },

  // Food & Nutrition
  {
    id: 4,
    name: "Citric Acid Monohydrate",
    category: "Food & Nutrition",
    subcategory: "Food Additives",
    image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Food grade citric acid for preservation, flavoring and pH adjustment in food products.",
    featured: true,
    hsnCode: "2918140000",
    specifications: ["Purity: 99.5% min", "Food grade", "Monohydrate form"],
    applications: ["Food preservation", "Beverage industry", "Confectionery"]
  },
  {
    id: 5,
    name: "Sodium Benzoate",
    category: "Food & Nutrition",
    subcategory: "Preservatives",
    image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Effective food preservative for extending shelf life of food and beverage products.",
    featured: false,
    hsnCode: "2918190000",
    specifications: ["Purity: 99% min", "Food grade", "White crystalline powder"],
    applications: ["Food preservation", "Soft drinks", "Pickles and sauces"]
  },
  {
    id: 6,
    name: "Potassium Sorbate",
    category: "Food & Nutrition",
    subcategory: "Preservatives",
    image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Natural preservative for food products, effective against mold and yeast.",
    featured: false,
    hsnCode: "2918190000",
    specifications: ["Purity: 98% min", "Food grade", "Natural preservative"],
    applications: ["Bakery products", "Dairy products", "Wine preservation"]
  },

  // Industrial Solvents
  {
    id: 7,
    name: "Isopropyl Alcohol",
    category: "Industrial Solvents",
    subcategory: "Cleaning Solvents",
    image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "High-purity isopropyl alcohol for industrial cleaning and pharmaceutical applications.",
    featured: true,
    hsnCode: "2905120000",
    specifications: ["Purity: 99.5% min", "Low water content", "Technical grade"],
    applications: ["Industrial cleaning", "Electronics", "Pharmaceuticals"]
  },
  {
    id: 8,
    name: "Ethyl Acetate",
    category: "Industrial Solvents",
    subcategory: "Organic Solvents",
    image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Versatile organic solvent for paints, coatings, and adhesive applications.",
    featured: false,
    hsnCode: "2915310000",
    specifications: ["Purity: 99% min", "Low acidity", "Industrial grade"],
    applications: ["Paint industry", "Adhesives", "Printing inks"]
  },

  // Personal Care
  {
    id: 9,
    name: "Glycerin",
    category: "Personal Care",
    subcategory: "Moisturizers",
    image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
    description: "Pure glycerin for cosmetic and personal care product formulations.",
    featured: true,
    hsnCode: "2905450000",
    specifications: ["Purity: 99.5% min", "USP grade", "Colorless liquid"],
    applications: ["Skincare products", "Hair care", "Soap manufacturing"]
  },
  {
    id: 10,
    name: "Propylene Glycol",
    category: "Personal Care",
    subcategory: "Solvents",
    image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
    description: "Cosmetic grade propylene glycol for personal care formulations.",
    featured: false,
    hsnCode: "2905320000",
    specifications: ["Purity: 99.5% min", "Cosmetic grade", "Low toxicity"],
    applications: ["Cosmetics", "Deodorants", "Hair products"]
  },

  // Paint & Coatings
  {
    id: 11,
    name: "Titanium Dioxide",
    category: "Paint & Coatings",
    subcategory: "Pigments",
    image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
    description: "High-quality titanium dioxide pigment for superior opacity and brightness in paints.",
    featured: true,
    hsnCode: "3206111000",
    specifications: ["Rutile grade", "High opacity", "Weather resistant"],
    applications: ["Architectural paints", "Industrial coatings", "Plastics"]
  },
  {
    id: 12,
    name: "Iron Oxide Red",
    category: "Paint & Coatings",
    subcategory: "Pigments",
    image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
    description: "Synthetic iron oxide red pigment for coloring paints and coatings.",
    featured: false,
    hsnCode: "2821100000",
    specifications: ["High tinting strength", "Weather resistant", "Non-toxic"],
    applications: ["Decorative paints", "Primer coatings", "Concrete coloring"]
  },

  // Water Treatment
  {
    id: 13,
    name: "Poly Aluminium Chloride",
    category: "Water Treatment",
    subcategory: "Coagulants",
    image: "https://jkmchemtrade.com/upload/categories/4471230925113924.jpg",
    description: "Effective coagulant for water and wastewater treatment applications.",
    featured: false,
    hsnCode: "2827320000",
    specifications: ["Al2O3 content: 30% min", "High efficiency", "Low dosage required"],
    applications: ["Municipal water treatment", "Industrial wastewater", "Swimming pools"]
  },
  {
    id: 14,
    name: "Sodium Hypochlorite",
    category: "Water Treatment",
    subcategory: "Disinfectants",
    image: "https://jkmchemtrade.com/upload/categories/4471230925113924.jpg",
    description: "Powerful disinfectant for water treatment and sanitization.",
    featured: false,
    hsnCode: "2828900000",
    specifications: ["Available chlorine: 12-15%", "Liquid form", "Stable formulation"],
    applications: ["Water disinfection", "Swimming pool treatment", "Industrial sanitization"]
  },

  // Ceramics
  {
    id: 15,
    name: "Kaolin Clay",
    category: "Ceramics",
    subcategory: "Raw Materials",
    image: "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "High-grade kaolin clay for ceramic and porcelain manufacturing.",
    featured: false,
    hsnCode: "2507000000",
    specifications: ["High whiteness", "Low iron content", "Fine particle size"],
    applications: ["Ceramic tiles", "Porcelain", "Paper coating"]
  },
  {
    id: 16,
    name: "Feldspar",
    category: "Ceramics",
    subcategory: "Flux Materials",
    image: "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Premium feldspar for ceramic and glass manufacturing applications.",
    featured: false,
    hsnCode: "2529100000",
    specifications: ["High alkali content", "Low iron", "Consistent quality"],
    applications: ["Ceramic glazes", "Glass manufacturing", "Enamel production"]
  },

  // Home Care
  {
    id: 17,
    name: "Sodium Lauryl Sulphate",
    category: "Home Care",
    subcategory: "Surfactants",
    image: "https://5.imimg.com/data5/SELLER/Default/2023/10/351523658/UT/NP/JG/143402947/homecare-products.jpg",
    description: "Effective surfactant for detergent and cleaning product formulations.",
    featured: false,
    hsnCode: "3402110000",
    specifications: ["Active matter: 28-30%", "Low salt content", "High foaming"],
    applications: ["Laundry detergents", "Dishwashing liquids", "Personal care"]
  },
  {
    id: 18,
    name: "Linear Alkyl Benzene Sulphonic Acid",
    category: "Home Care",
    subcategory: "Surfactants",
    image: "https://5.imimg.com/data5/SELLER/Default/2023/10/351523658/UT/NP/JG/143402947/homecare-products.jpg",
    description: "High-performance surfactant for heavy-duty detergent applications.",
    featured: false,
    hsnCode: "3402110000",
    specifications: ["Active matter: 96% min", "Low color", "High biodegradability"],
    applications: ["Powder detergents", "Liquid detergents", "Industrial cleaners"]
  },

  // Additional Industrial Products
  {
    id: 19,
    name: "Hydrogen Peroxide",
    category: "Industrial Solvents",
    subcategory: "Oxidizing Agents",
    image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Industrial grade hydrogen peroxide for bleaching and oxidation processes.",
    featured: false,
    hsnCode: "2847000000",
    specifications: ["Concentration: 35%", "Stabilized", "Industrial grade"],
    applications: ["Textile bleaching", "Paper industry", "Water treatment"]
  },
  {
    id: 20,
    name: "Acetic Acid",
    category: "Industrial Solvents",
    subcategory: "Organic Acids",
    image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "High-purity acetic acid for industrial and food applications.",
    featured: false,
    hsnCode: "2915210000",
    specifications: ["Purity: 99.5% min", "Low formic acid", "Technical grade"],
    applications: ["Chemical synthesis", "Food industry", "Textile processing"]
  },

  // Additional Food Products
  {
    id: 21,
    name: "Ascorbic Acid (Vitamin C)",
    category: "Food & Nutrition",
    subcategory: "Vitamins",
    image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Food grade ascorbic acid for nutritional fortification and antioxidant properties.",
    featured: false,
    hsnCode: "2936270000",
    specifications: ["Purity: 99% min", "Food grade", "USP standard"],
    applications: ["Food fortification", "Beverages", "Nutritional supplements"]
  },
  {
    id: 22,
    name: "Calcium Carbonate",
    category: "Food & Nutrition",
    subcategory: "Minerals",
    image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Precipitated calcium carbonate for food and pharmaceutical applications.",
    featured: false,
    hsnCode: "2836500000",
    specifications: ["Purity: 98% min", "Food grade", "Fine particle size"],
    applications: ["Food supplements", "Pharmaceuticals", "Toothpaste"]
  },

  // Additional Personal Care Products
  {
    id: 23,
    name: "Cetyl Alcohol",
    category: "Personal Care",
    subcategory: "Emulsifiers",
    image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
    description: "Cosmetic grade cetyl alcohol for emulsification and conditioning.",
    featured: false,
    hsnCode: "2905170000",
    specifications: ["Purity: 95% min", "Cosmetic grade", "White flakes"],
    applications: ["Hair conditioners", "Skin creams", "Lotions"]
  },
  {
    id: 24,
    name: "Stearic Acid",
    category: "Personal Care",
    subcategory: "Fatty Acids",
    image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
    description: "High-quality stearic acid for cosmetic and soap manufacturing.",
    featured: false,
    hsnCode: "2915700000",
    specifications: ["Purity: 95% min", "Cosmetic grade", "Low iodine value"],
    applications: ["Soap manufacturing", "Cosmetics", "Candle making"]
  },

  // Additional Paint & Coating Products
  {
    id: 25,
    name: "Zinc Oxide",
    category: "Paint & Coatings",
    subcategory: "Pigments",
    image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
    description: "High-grade zinc oxide for paint, rubber, and ceramic applications.",
    featured: false,
    hsnCode: "2817001000",
    specifications: ["Purity: 99% min", "Fine particle size", "High surface area"],
    applications: ["Paint pigment", "Rubber industry", "Ceramics"]
  }
];

export const getProductsByCategory = (category: string): Product[] => {
  if (category === "All") return products;
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};