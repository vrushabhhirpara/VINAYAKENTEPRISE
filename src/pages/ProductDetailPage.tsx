import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Download, 
  Share2, 
  CheckCircle, 
  AlertTriangle,
  Beaker,
  Package,
  Truck,
  Shield,
  FileText,
  Phone,
  Mail,
  Star,
  Heart,
  Eye,
  Globe,
  Factory,
  Award,
  Zap,
  ArrowRight
} from 'lucide-react';

interface ProductDetail {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  images: string[];
  description: string;
  detailedDescription: string;
  chemicalFormula: string;
  casNumber: string;
  hsCode: string;
  einecs: string;
  molecularWeight: string;
  purity: string;
  grade: string;
  applications: string[];
  specifications: {
    appearance: string;
    solubility: string;
    meltingPoint?: string;
    boilingPoint?: string;
    density?: string;
    ph?: string;
    viscosity?: string;
    flashPoint?: string;
    moisture?: string;
    assay?: string;
  };
  packaging: {
    type: string;
    sizes: string[];
    material: string;
    storage: string;
  };
  safetyInfo: {
    hazardClass: string;
    unNumber?: string;
    precautions: string[];
    firstAid: string[];
    storage: string[];
  };
  certifications: string[];
  industries: string[];
  relatedProducts: number[];
  technicalDataSheet?: string;
  safetyDataSheet?: string;
  price?: {
    currency: string;
    minOrder: string;
    priceRange: string;
  };
  availability: {
    status: 'In Stock' | 'Limited Stock' | 'Out of Stock' | 'Made to Order';
    leadTime: string;
    regions: string[];
  };
  supplier: {
    name: string;
    experience: string;
    certifications: string[];
    contact: {
      phone: string;
      email: string;
    };
  };
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    quantity: '',
    message: ''
  });

  // Comprehensive product database with 20 detailed products
  const productDatabase: ProductDetail[] = [
    {
      id: 1,
      name: "Industrial Solvents",
      category: "Industrial Solvents",
      subcategory: "Surfactants",
      images: [
        "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ],
      description: "High-performance non-ionic surfactant for industrial cleaning and textile processing applications.",
      detailedDescription: "Nonylphenol Ethoxylate is a versatile non-ionic surfactant that provides excellent wetting, emulsifying, and dispersing properties. It is widely used in industrial cleaning formulations, textile processing, paint manufacturing, and agricultural chemicals. Our NPE offers superior performance with consistent quality and purity levels that meet international standards.",
      chemicalFormula: "C15H24O(C2H4O)nH",
      casNumber: "9016-45-9",
      hsCode: "3402.13.00",
      einecs: "500-024-6",
      molecularWeight: "Variable (600-1500 g/mol)",
      purity: "99.0% min",
      grade: "Industrial Grade",
      applications: [
        "Industrial cleaning formulations",
        "Textile wet processing",
        "Paint and coating formulations",
        "Agricultural chemical emulsifiers",
        "Metal working fluids",
        "Leather processing",
        "Paper and pulp industry",
        "Oil field chemicals"
      ],
      specifications: {
        appearance: "Clear to pale yellow liquid",
        solubility: "Soluble in water and organic solvents",
        density: "1.02-1.06 g/cm³ at 20°C",
        ph: "6.0-8.0 (1% aqueous solution)",
        viscosity: "200-400 cP at 25°C",
        moisture: "0.5% max"
      },
      packaging: {
        type: "Liquid",
        sizes: ["200L drums", "1000L IBC containers", "Bulk tankers"],
        material: "HDPE/Steel drums with proper sealing",
        storage: "Store in cool, dry place away from direct sunlight"
      },
      safetyInfo: {
        hazardClass: "Class 9 - Miscellaneous",
        precautions: [
          "Wear protective equipment including gloves and safety glasses",
          "Ensure adequate ventilation in work area",
          "Avoid skin and eye contact",
          "Do not ingest"
        ],
        firstAid: [
          "Eye contact: Flush with water for 15 minutes",
          "Skin contact: Wash with soap and water",
          "Inhalation: Move to fresh air",
          "Ingestion: Do not induce vomiting, seek medical attention"
        ],
        storage: [
          "Store between 5-35°C",
          "Keep containers tightly closed",
          "Protect from freezing",
          "Store away from oxidizing agents"
        ]
      },
      certifications: ["ISO 9001:2015", "REACH Compliant", "RoHS Compliant"],
      industries: ["Textile", "Cleaning", "Paint & Coatings", "Agriculture"],
      relatedProducts: [2, 7, 18],
      technicalDataSheet: "/docs/npe-tds.pdf",
      safetyDataSheet: "/docs/npe-sds.pdf",
      price: {
        currency: "USD",
        minOrder: "1 MT",
        priceRange: "$2,500 - $3,200 per MT"
      },
      availability: {
        status: "In Stock",
        leadTime: "7-14 days",
        regions: ["Asia", "Europe", "North America"]
      },
      supplier: {
        name: "Vinayak Enterprise",
        experience: "14+ years",
        certifications: ["ISO 9001:2015", "ISO 14001:2015"],
        contact: {
          phone: "+91 95106 91989",
          email: "info@vinayak-enterprise.net"
        }
      }
    },
    {
      id: 2,
      name: "Sodium Lauryl Sulfate (SLS)",
      category: "Personal Care",
      subcategory: "Surfactants",
      images: [
        "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
        "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ],
      description: "Premium quality anionic surfactant for personal care and cleaning product formulations.",
      detailedDescription: "Sodium Lauryl Sulfate is a highly effective anionic surfactant that provides excellent foaming, cleansing, and emulsifying properties. It is the preferred choice for shampoos, body washes, toothpaste, and household cleaning products. Our SLS meets pharmaceutical and cosmetic grade standards with consistent quality and performance.",
      chemicalFormula: "C12H25SO4Na",
      casNumber: "151-21-3",
      hsCode: "3402.11.00",
      einecs: "205-788-1",
      molecularWeight: "288.38 g/mol",
      purity: "95.0% min",
      grade: "Cosmetic/Pharmaceutical Grade",
      applications: [
        "Shampoos and hair care products",
        "Body wash and shower gels",
        "Toothpaste and oral care",
        "Household detergents",
        "Industrial cleaners",
        "Emulsion polymerization",
        "Laboratory reagent",
        "Textile processing"
      ],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Easily soluble in water",
        ph: "7.0-9.5 (1% aqueous solution)",
        moisture: "5.0% max",
        assay: "95.0% min"
      },
      packaging: {
        type: "Powder",
        sizes: ["25kg bags", "500kg big bags", "1000kg big bags"],
        material: "Multi-layer paper bags with PE liner",
        storage: "Store in dry, cool place away from moisture"
      },
      safetyInfo: {
        hazardClass: "Non-hazardous",
        precautions: [
          "Avoid inhalation of dust",
          "Use in well-ventilated area",
          "Wear dust mask when handling",
          "Avoid contact with eyes"
        ],
        firstAid: [
          "Eye contact: Rinse with plenty of water",
          "Skin contact: Wash with soap and water",
          "Inhalation: Move to fresh air",
          "Ingestion: Rinse mouth, drink water"
        ],
        storage: [
          "Store in dry conditions",
          "Keep away from heat sources",
          "Protect from moisture",
          "Keep containers sealed"
        ]
      },
      certifications: ["USP Grade", "BP Grade", "Kosher Certified", "Halal Certified"],
      industries: ["Personal Care", "Pharmaceuticals", "Household Care", "Textiles"],
      relatedProducts: [6, 11, 14],
      availability: {
        status: "In Stock",
        leadTime: "5-10 days",
        regions: ["Global"]
      },
      supplier: {
        name: "Vinayak Enterprise",
        experience: "14+ years",
        certifications: ["GMP Certified", "ISO 9001:2015"],
        contact: {
          phone: "+91 95106 91989",
          email: "info@vinayak-enterprise.net"
        }
      }
    },
    {
      id: 3,
      name: "Citric Acid Monohydrate",
      category: "Food & Nutrition",
      subcategory: "Food Additives",
      images: [
        "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ],
      description: "Food-grade citric acid for preservation, flavoring, and pH adjustment in food and beverage applications.",
      detailedDescription: "Citric Acid Monohydrate is a natural preservative and acidulant derived from citrus fruits. It is widely used in the food and beverage industry for preservation, flavor enhancement, and pH control. Our food-grade citric acid meets all international food safety standards and provides consistent quality for your formulations.",
      chemicalFormula: "C6H8O7·H2O",
      casNumber: "5949-29-1",
      hsCode: "2918.14.00",
      einecs: "201-069-1",
      molecularWeight: "210.14 g/mol",
      purity: "99.5% min",
      grade: "Food Grade (FCC/USP/BP)",
      applications: [
        "Food and beverage preservation",
        "Soft drinks and juices",
        "Confectionery products",
        "Pharmaceutical formulations",
        "Cosmetic products",
        "Cleaning agents",
        "Water treatment",
        "Metal cleaning"
      ],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Very soluble in water (59.2g/100ml at 20°C)",
        ph: "1.85 (0.5% aqueous solution)",
        moisture: "7.5-9.0%",
        assay: "99.5-100.5%"
      },
      packaging: {
        type: "Crystalline Powder",
        sizes: ["25kg bags", "500kg big bags", "1000kg big bags"],
        material: "Food-grade multi-layer bags",
        storage: "Store in dry, cool place away from moisture"
      },
      safetyInfo: {
        hazardClass: "Non-hazardous",
        precautions: [
          "Food grade - Generally Recognized as Safe (GRAS)",
          "Avoid inhalation of dust",
          "Use standard food handling practices",
          "Keep containers clean and sealed"
        ],
        firstAid: [
          "Eye contact: Flush with clean water",
          "Skin contact: Wash with water",
          "Inhalation: Move to fresh air",
          "Ingestion: Generally safe, rinse mouth"
        ],
        storage: [
          "Store in dry conditions below 25°C",
          "Protect from moisture and humidity",
          "Keep away from strong bases",
          "Use first-in-first-out rotation"
        ]
      },
      certifications: ["FDA Approved", "FCC Grade", "Kosher Certified", "Halal Certified", "Organic Certified"],
      industries: ["Food & Beverage", "Pharmaceuticals", "Cosmetics", "Cleaning"],
      relatedProducts: [8, 10, 12],
      availability: {
        status: "In Stock",
        leadTime: "3-7 days",
        regions: ["Global"]
      },
      supplier: {
        name: "Vinayak Enterprise",
        experience: "14+ years",
        certifications: ["HACCP", "ISO 22000:2018", "BRC Certified"],
        contact: {
          phone: "+91 95106 91989",
          email: "info@vinayak-enterprise.net"
        }
      }
    },
    {
      id: 4,
      name: "Titanium Dioxide (Rutile Grade)",
      category: "Paint, Ink & Coatings",
      subcategory: "Pigments",
      images: [
        "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
        "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ],
      description: "High-quality rutile grade titanium dioxide pigment for superior opacity and brightness in paints and coatings.",
      detailedDescription: "Titanium Dioxide Rutile Grade is the premium white pigment offering exceptional opacity, brightness, and durability. It provides superior hiding power and weather resistance, making it ideal for high-performance paints, coatings, plastics, and paper applications. Our TiO2 meets international standards for color consistency and performance.",
      chemicalFormula: "TiO2",
      casNumber: "13463-67-7",
      hsCode: "3206.11.00",
      einecs: "236-675-5",
      molecularWeight: "79.87 g/mol",
      purity: "98.0% min",
      grade: "Rutile Grade",
      applications: [
        "Architectural and decorative paints",
        "Industrial coatings",
        "Plastic masterbatches",
        "Paper coating and lamination",
        "Cosmetic formulations",
        "Ceramic glazes",
        "Printing inks",
        "Rubber compounds"
      ],
      specifications: {
        appearance: "White powder",
        solubility: "Insoluble in water",
        density: "4.23 g/cm³",
        ph: "6.5-8.0 (4% aqueous suspension)",
        moisture: "0.5% max",
        assay: "98.0% min TiO2"
      },
      packaging: {
        type: "Fine Powder",
        sizes: ["25kg bags", "500kg big bags", "1000kg big bags"],
        material: "Multi-layer paper bags with PE liner",
        storage: "Store in dry place, protect from moisture"
      },
      safetyInfo: {
        hazardClass: "Non-hazardous",
        precautions: [
          "Avoid inhalation of dust particles",
          "Use respiratory protection in dusty conditions",
          "Ensure adequate ventilation",
          "Use standard industrial hygiene practices"
        ],
        firstAid: [
          "Eye contact: Flush with water for 15 minutes",
          "Skin contact: Wash with soap and water",
          "Inhalation: Move to fresh air",
          "Ingestion: Rinse mouth, seek medical advice"
        ],
        storage: [
          "Store in dry, well-ventilated area",
          "Keep containers tightly closed",
          "Protect from moisture",
          "Avoid contamination"
        ]
      },
      certifications: ["ISO 591-1:2000", "ASTM D476", "FDA Approved for Food Contact"],
      industries: ["Paint & Coatings", "Plastics", "Paper", "Cosmetics"],
      relatedProducts: [9, 21],
      availability: {
        status: "In Stock",
        leadTime: "10-15 days",
        regions: ["Asia", "Europe", "Americas"]
      },
      supplier: {
        name: "Vinayak Enterprise",
        experience: "14+ years",
        certifications: ["ISO 9001:2015", "REACH Registered"],
        contact: {
          phone: "+91 95106 91989",
          email: "info@vinayak-enterprise.net"
        }
      }
    },
    {
      id: 5,
      name: "Calcium Carbonate (Precipitated)",
      category: "Cattle & Poultry Feed",
      subcategory: "Feed Additives",
      images: [
        "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
        "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ],
      description: "High-purity precipitated calcium carbonate for animal feed supplementation and industrial applications.",
      detailedDescription: "Precipitated Calcium Carbonate is a high-purity, fine particle size calcium supplement essential for animal nutrition. It provides bioavailable calcium for bone development, eggshell formation, and overall animal health. Our PCC meets feed grade specifications and provides consistent quality for optimal animal performance.",
      chemicalFormula: "CaCO3",
      casNumber: "471-34-1",
      hsCode: "2836.50.00",
      einecs: "207-439-9",
      molecularWeight: "100.09 g/mol",
      purity: "98.5% min",
      grade: "Feed Grade",
      applications: [
        "Poultry feed supplementation",
        "Cattle and dairy feed",
        "Aquaculture nutrition",
        "Pet food formulations",
        "Pharmaceutical tablets",
        "Food fortification",
        "Plastic filler",
        "Paper coating"
      ],
      specifications: {
        appearance: "White fine powder",
        solubility: "Slightly soluble in water (0.0013g/100ml)",
        density: "2.71 g/cm³",
        ph: "8.0-10.0 (10% aqueous suspension)",
        moisture: "0.5% max",
        assay: "98.5% min CaCO3"
      },
      packaging: {
        type: "Fine Powder",
        sizes: ["25kg bags", "500kg big bags", "1000kg big bags"],
        material: "Food/Feed grade multi-layer bags",
        storage: "Store in dry, cool place away from moisture"
      },
      safetyInfo: {
        hazardClass: "Non-hazardous",
        precautions: [
          "Feed grade quality - safe for animal consumption",
          "Avoid inhalation of dust",
          "Use dust mask in dusty conditions",
          "Follow good manufacturing practices"
        ],
        firstAid: [
          "Eye contact: Flush with clean water",
          "Skin contact: Wash with water",
          "Inhalation: Move to fresh air",
          "Ingestion: Generally safe, provide water"
        ],
        storage: [
          "Store in dry conditions",
          "Protect from moisture and contamination",
          "Keep containers sealed",
          "Maintain proper hygiene"
        ]
      },
      certifications: ["Feed Grade Certified", "GMP Compliant", "ISO 9001:2015"],
      industries: ["Animal Feed", "Food", "Pharmaceuticals", "Plastics"],
      relatedProducts: [17, 25],
      availability: {
        status: "In Stock",
        leadTime: "5-10 days",
        regions: ["Global"]
      },
      supplier: {
        name: "Vinayak Enterprise",
        experience: "14+ years",
        certifications: ["Feed Safety Certified", "ISO 22000:2018"],
        contact: {
          phone: "+91 95106 91989",
          email: "info@vinayak-enterprise.net"
        }
      }
    },
    {
      id: 6,
      name: "Polyethylene Glycol 400 (PEG 400)",
      category: "Personal Care",
      subcategory: "Solvents",
      images: [
        "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372"
      ],
      description: "Pharmaceutical and cosmetic grade PEG 400 for use as solvent, humectant, and carrier in various formulations.",
      detailedDescription: "Polyethylene Glycol 400 is a versatile, water-soluble polymer used as a solvent, humectant, and carrier in pharmaceutical, cosmetic, and industrial applications. It provides excellent solubilizing properties and is compatible with a wide range of active ingredients. Our PEG 400 meets USP/BP standards for pharmaceutical use.",
      chemicalFormula: "H(OCH2CH2)nOH (n≈9)",
      casNumber: "25322-68-3",
      hsCode: "3907.20.00",
      einecs: "500-038-2",
      molecularWeight: "380-420 g/mol",
      purity: "99.0% min",
      grade: "Pharmaceutical/Cosmetic Grade",
      applications: [
        "Pharmaceutical formulations",
        "Cosmetic and personal care products",
        "Topical drug delivery",
        "Suppository base",
        "Industrial solvents",
        "Food additives (limited use)",
        "Textile auxiliaries",
        "Ink formulations"
      ],
      specifications: {
        appearance: "Clear, colorless liquid",
        solubility: "Miscible with water and many organic solvents",
        density: "1.125-1.140 g/cm³ at 20°C",
        viscosity: "105-130 cP at 25°C",
        ph: "4.5-7.5 (5% aqueous solution)",
        moisture: "0.5% max"
      },
      packaging: {
        type: "Liquid",
        sizes: ["200L drums", "1000L IBC containers", "Bulk tankers"],
        material: "Food/Pharma grade containers",
        storage: "Store at room temperature, protect from freezing"
      },
      safetyInfo: {
        hazardClass: "Non-hazardous",
        precautions: [
          "Generally recognized as safe (GRAS)",
          "Avoid prolonged skin contact",
          "Use in well-ventilated areas",
          "Follow pharmaceutical handling practices"
        ],
        firstAid: [
          "Eye contact: Flush with water",
          "Skin contact: Wash with soap and water",
          "Inhalation: Move to fresh air",
          "Ingestion: Generally safe, provide water"
        ],
        storage: [
          "Store at 15-25°C",
          "Protect from freezing",
          "Keep containers tightly closed",
          "Avoid contamination"
        ]
      },
      certifications: ["USP Grade", "BP Grade", "Ph.Eur. Compliant", "FDA Approved"],
      industries: ["Pharmaceuticals", "Cosmetics", "Food", "Industrial"],
      relatedProducts: [2, 11],
      availability: {
        status: "In Stock",
        leadTime: "7-12 days",
        regions: ["Global"]
      },
      supplier: {
        name: "Vinayak Enterprise",
        experience: "14+ years",
        certifications: ["GMP Certified", "ISO 9001:2015"],
        contact: {
          phone: "+91 95106 91989",
          email: "info@vinayak-enterprise.net"
        }
      }
    },
    {
      id: 7,
      name: "Sodium Hydroxide (Caustic Soda)",
      category: "Industrial Solvents",
      subcategory: "Alkalis",
      images: [
        "https://jkmchemtrade.com/upload/categories/4471230925113924.jpg",
        "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ],
      description: "High-purity sodium hydroxide for industrial processes, water treatment, and chemical manufacturing.",
      detailedDescription: "Sodium Hydroxide, commonly known as caustic soda, is a highly versatile strong alkali used in numerous industrial applications. It is essential for soap manufacturing, water treatment, chemical processing, and pH adjustment. Our high-purity NaOH provides consistent performance and meets international quality standards.",
      chemicalFormula: "NaOH",
      casNumber: "1310-73-2",
      hsCode: "2815.11.00",
      einecs: "215-185-5",
      molecularWeight: "40.00 g/mol",
      purity: "99.0% min",
      grade: "Technical Grade",
      applications: [
        "Water treatment and pH adjustment",
        "Soap and detergent manufacturing",
        "Paper and pulp industry",
        "Chemical processing",
        "Textile mercerization",
        "Aluminum processing",
        "Food processing (limited use)",
        "Petroleum refining"
      ],
      specifications: {
        appearance: "White solid pellets/flakes",
        solubility: "Highly soluble in water (109g/100ml at 20°C)",
        density: "2.13 g/cm³",
        ph: "14 (0.1M aqueous solution)",
        moisture: "0.5% max",
        assay: "99.0% min NaOH"
      },
      packaging: {
        type: "Solid",
        sizes: ["25kg bags", "500kg big bags", "1000kg big bags"],
        material: "Moisture-proof multi-layer bags",
        storage: "Store in dry place, protect from moisture and CO2"
      },
      safetyInfo: {
        hazardClass: "Class 8 - Corrosive",
        unNumber: "UN1823",
        precautions: [
          "Highly corrosive - causes severe burns",
          "Wear full protective equipment",
          "Avoid contact with skin, eyes, and clothing",
          "Use in well-ventilated areas only"
        ],
        firstAid: [
          "Eye contact: Flush immediately with water for 15+ minutes",
          "Skin contact: Remove contaminated clothing, flush with water",
          "Inhalation: Move to fresh air immediately",
          "Ingestion: Do NOT induce vomiting, seek immediate medical attention"
        ],
        storage: [
          "Store in dry, well-ventilated area",
          "Keep away from acids and aluminum",
          "Protect from moisture and carbon dioxide",
          "Use corrosion-resistant containers"
        ]
      },
      certifications: ["ISO 9001:2015", "Technical Grade Standard"],
      industries: ["Water Treatment", "Chemical Processing", "Textiles", "Paper & Pulp"],
      relatedProducts: [19, 24],
      availability: {
        status: "In Stock",
        leadTime: "5-10 days",
        regions: ["Asia", "Middle East", "Africa"]
      },
      supplier: {
        name: "Vinayak Enterprise",
        experience: "14+ years",
        certifications: ["ISO 9001:2015", "Safety Certified"],
        contact: {
          phone: "+91 95106 91989",
          email: "info@vinayak-enterprise.net"
        }
      }
    },
    {
      id: 8,
      name: "Acetic Acid (Glacial)",
      category: "Food & Nutrition",
      subcategory: "Preservatives",
      images: [
        "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ],
      description: "Food-grade glacial acetic acid for preservation, flavoring, and industrial chemical synthesis.",
      detailedDescription: "Glacial Acetic Acid is a high-purity, concentrated form of acetic acid used in food preservation, chemical synthesis, and industrial applications. It provides excellent antimicrobial properties and is essential for vinegar production, food preservation, and various chemical processes. Our food-grade quality ensures safety and consistency.",
      chemicalFormula: "CH3COOH",
      casNumber: "64-19-7",
      hsCode: "2915.21.00",
      einecs: "200-580-7",
      molecularWeight: "60.05 g/mol",
      purity: "99.5% min",
      grade: "Food Grade",
      applications: [
        "Food preservation and pickling",
        "Vinegar production",
        "Chemical synthesis",
        "Textile dyeing and printing",
        "Pharmaceutical intermediates",
        "Rubber coagulation",
        "Photographic chemicals",
        "Cleaning formulations"
      ],
      specifications: {
        appearance: "Clear, colorless liquid",
        solubility: "Miscible with water in all proportions",
        density: "1.049 g/cm³ at 20°C",
        boilingPoint: "118°C",
        freezingPoint: "16.6°C",
        ph: "2.4 (1M aqueous solution)"
      },
      packaging: {
        type: "Liquid",
        sizes: ["200L drums", "1000L IBC containers", "Bulk tankers"],
        material: "Corrosion-resistant containers",
        storage: "Store in cool, dry place away from heat sources"
      },
      safetyInfo: {
        hazardClass: "Class 8 - Corrosive",
        unNumber: "UN2789",
        precautions: [
          "Corrosive liquid - causes burns",
          "Use in well-ventilated areas",
          "Wear protective equipment",
          "Avoid inhalation of vapors"
        ],
        firstAid: [
          "Eye contact: Flush with water for 15 minutes",
          "Skin contact: Remove contaminated clothing, wash with water",
          "Inhalation: Move to fresh air",
          "Ingestion: Do not induce vomiting, seek medical attention"
        ],
        storage: [
          "Store at 15-25°C",
          "Keep away from heat and ignition sources",
          "Protect from freezing",
          "Use corrosion-resistant storage"
        ]
      },
      certifications: ["Food Grade", "FCC Compliant", "ISO 9001:2015"],
      industries: ["Food & Beverage", "Chemical", "Textile", "Pharmaceuticals"],
      relatedProducts: [3, 22],
      availability: {
        status: "In Stock",
        leadTime: "7-14 days",
        regions: ["Global"]
      },
      supplier: {
        name: "Vinayak Enterprise",
        experience: "14+ years",
        certifications: ["HACCP", "ISO 22000:2018"],
        contact: {
          phone: "+91 95106 91989",
          email: "info@vinayak-enterprise.net"
        }
      }
    },
    {
      id: 9,
      name: "Iron Oxide Red (Fe2O3)",
      category: "Paint, Ink & Coatings",
      subcategory: "Pigments",
      images: [
        "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
        "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ],
      description: "High-quality synthetic iron oxide red pigment for paints, coatings, and construction applications.",
      detailedDescription: "Iron Oxide Red is a synthetic inorganic pigment offering excellent color strength, weather resistance, and chemical stability. It provides vibrant red coloration for paints, coatings, concrete, plastics, and ceramics. Our iron oxide red meets international standards for color consistency and performance in demanding applications.",
      chemicalFormula: "Fe2O3",
      casNumber: "1309-37-1",
      hsCode: "2821.10.00",
      einecs: "215-168-2",
      molecularWeight: "159.69 g/mol",
      purity: "95.0% min",
      grade: "Pigment Grade",
      applications: [
        "Architectural and industrial paints",
        "Concrete and mortar coloring",
        "Plastic masterbatches",
        "Ceramic glazes and bodies",
        "Rubber compounds",
        "Printing inks",
        "Cosmetic formulations",
        "Artist colors"
      ],
      specifications: {
        appearance: "Red powder",
        solubility: "Insoluble in water",
        density: "5.24 g/cm³",
        ph: "3.5-7.0 (4% aqueous suspension)",
        moisture: "1.0% max",
        assay: "95.0% min Fe2O3"
      },
      packaging: {
        type: "Fine Powder",
        sizes: ["25kg bags", "500kg big bags", "1000kg big bags"],
        material: "Multi-layer paper bags with PE liner",
        storage: "Store in dry place, protect from moisture"
      },
      safetyInfo: {
        hazardClass: "Non-hazardous",
        precautions: [
          "Avoid inhalation of dust particles",
          "Use dust mask in dusty conditions",
          "Ensure adequate ventilation",
          "Follow standard industrial hygiene"
        ],
        firstAid: [
          "Eye contact: Flush with water",
          "Skin contact: Wash with soap and water",
          "Inhalation: Move to fresh air",
          "Ingestion: Rinse mouth, provide water"
        ],
        storage: [
          "Store in dry, well-ventilated area",
          "Keep containers tightly closed",
          "Protect from moisture",
          "Avoid contamination with other pigments"
        ]
      },
      certifications: ["ASTM D769", "ISO 1248", "EN 12878"],
      industries: ["Paint & Coatings", "Construction", "Plastics", "Ceramics"],
      relatedProducts: [4, 21],
      availability: {
        status: "In Stock",
        leadTime: "10-15 days",
        regions: ["Asia", "Europe", "Americas"]
      },
      supplier: {
        name: "Vinayak Enterprise",
        experience: "14+ years",
        certifications: ["ISO 9001:2015", "REACH Registered"],
        contact: {
          phone: "+91 95106 91989",
          email: "info@vinayak-enterprise.net"
        }
      }
    },
    {
      id: 10,
      name: "Potassium Sorbate",
      category: "Food & Nutrition",
      subcategory: "Preservatives",
      images: [
        "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ],
      description: "Food-grade potassium sorbate preservative with excellent antimicrobial properties for food and beverage applications.",
      detailedDescription: "Potassium Sorbate is a highly effective, safe food preservative that inhibits the growth of molds, yeasts, and bacteria. It is widely used in food and beverage industries for extending shelf life while maintaining product quality. Our food-grade potassium sorbate meets all international food safety standards and provides reliable preservation performance.",
      chemicalFormula: "C6H7KO2",
      casNumber: "24634-61-5",
      hsCode: "2916.19.00",
      einecs: "246-376-1",
      molecularWeight: "150.22 g/mol",
      purity: "99.0% min",
      grade: "Food Grade (FCC/USP)",
      applications: [
        "Baked goods preservation",
        "Dairy product preservation",
        "Beverage preservation",
        "Wine and beer stabilization",
        "Cosmetic preservation",
        "Personal care products",
        "Pharmaceutical formulations",
        "Pet food preservation"
      ],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Soluble in water (139g/100ml at 20°C)",
        ph: "7.0-8.5 (1% aqueous solution)",
        moisture: "1.0% max",
        assay: "99.0-101.0%"
      },
      packaging: {
        type: "Crystalline Powder",
        sizes: ["25kg bags", "500kg big bags"],
        material: "Food-grade multi-layer bags",
        storage: "Store in cool, dry place away from light"
      },
      safetyInfo: {
        hazardClass: "Non-hazardous",
        precautions: [
          "Food grade - Generally Recognized as Safe (GRAS)",
          "Avoid inhalation of dust",
          "Use standard food handling practices",
          "Keep containers clean and sealed"
        ],
        firstAid: [
          "Eye contact: Flush with clean water",
          "Skin contact: Wash with water",
          "Inhalation: Move to fresh air",
          "Ingestion: Generally safe, provide water"
        ],
        storage: [
          "Store below 25°C in dry conditions",
          "Protect from light and moisture",
          "Keep away from strong oxidizers",
          "Use first-in-first-out rotation"
        ]
      },
      certifications: ["FDA GRAS", "FCC Grade", "Kosher Certified", "Halal Certified"],
      industries: ["Food & Beverage", "Cosmetics", "Pharmaceuticals", "Pet Food"],
      relatedProducts: [3, 22, 23],
      availability: {
        status: "In Stock",
        leadTime: "5-10 days",
        regions: ["Global"]
      },
      supplier: {
        name: "Vinayak Enterprise",
        experience: "14+ years",
        certifications: ["HACCP", "ISO 22000:2018", "BRC Certified"],
        contact: {
          phone: "+91 95106 91989",
          email: "info@vinayak-enterprise.net"
        }
      }
    },
    {
      id: 11,
      name: "Glycerin (Glycerol USP)",
      category: "Personal Care",
      subcategory: "Humectants",
      images: [
        "https://5.imimg.com/data5/SELLER/Default/2023/10/351523658/UT/NP/JG/143402947/homecare-products.jpg",
        "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372"
      ],
      description: "USP grade glycerin for pharmaceutical, cosmetic, and food applications with excellent humectant properties.",
      detailedDescription: "Glycerin (Glycerol) USP is a versatile, colorless, and odorless liquid with excellent humectant, solvent, and sweetening properties. It is widely used in pharmaceutical, cosmetic, food, and industrial applications. Our USP grade glycerin meets the highest purity standards and provides consistent performance across various formulations.",
      chemicalFormula: "C3H8O3",
      casNumber: "56-81-5",
      hsCode: "2905.45.00",
      einecs: "200-289-5",
      molecularWeight: "92.09 g/mol",
      purity: "99.5% min",
      grade: "USP/BP/Ph.Eur Grade",
      applications: [
        "Pharmaceutical formulations",
        "Cosmetic and personal care products",
        "Food and beverage applications",
        "Toothpaste and oral care",
        "Suppository manufacturing",
        "E-liquid for vaping",
        "Industrial applications",
        "Antifreeze formulations"
      ],
      specifications: {
        appearance: "Clear, colorless, viscous liquid",
        solubility: "Miscible with water and ethanol",
        density: "1.255-1.265 g/cm³ at 20°C",
        viscosity: "1200-1500 cP at 20°C",
        ph: "5.5-8.0",
        moisture: "0.5% max"
      },
      packaging: {
        type: "Viscous Liquid",
        sizes: ["200L drums", "1000L IBC containers", "Bulk tankers"],
        material: "Food/Pharma grade stainless steel or HDPE",
        storage: "Store at room temperature, protect from freezing"
      },
      safetyInfo: {
        hazardClass: "Non-hazardous",
        precautions: [
          "Generally recognized as safe (GRAS)",
          "Non-toxic and non-irritating",
          "Use standard handling practices",
          "Avoid contamination"
        ],
        firstAid: [
          "Eye contact: Flush with water",
          "Skin contact: Wash with water (generally non-irritating)",
          "Inhalation: Move to fresh air",
          "Ingestion: Generally safe, provide water"
        ],
        storage: [
          "Store at 15-25°C",
          "Protect from freezing",
          "Keep containers tightly closed",
          "Maintain product purity"
        ]
      },
      certifications: ["USP Grade", "BP Grade", "Ph.Eur. Compliant", "FDA Approved", "Kosher", "Halal"],
      industries: ["Pharmaceuticals", "Cosmetics", "Food & Beverage", "Industrial"],
      relatedProducts: [2, 6],
      availability: {
        status: "In Stock",
        leadTime: "7-12 days",
        regions: ["Global"]
      },
      supplier: {
        name: "Vinayak Enterprise",
        experience: "14+ years",
        certifications: ["GMP Certified", "ISO 9001:2015", "HACCP"],
        contact: {
          phone: "+91 95106 91989",
          email: "info@vinayak-enterprise.net"
        }
      }
    },
    {
      id: 12,
      name: "Sodium Bicarbonate (Baking Soda)",
      category: "Food & Nutrition",
      subcategory: "Leavening Agents",
      images: [
        "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ],
      description: "Food-grade sodium bicarbonate for baking, food processing, and pharmaceutical applications.",
      detailedDescription: "Sodium Bicarbonate, commonly known as baking soda, is a versatile white crystalline powder used as a leavening agent in baking, pH buffer in food processing, and active ingredient in pharmaceutical formulations. Our food-grade sodium bicarbonate meets all international food safety standards and provides consistent performance.",
      chemicalFormula: "NaHCO3",
      casNumber: "144-55-8",
      hsCode: "2836.30.00",
      einecs: "205-633-8",
      molecularWeight: "84.01 g/mol",
      purity: "99.2% min",
      grade: "Food Grade (FCC/USP)",
      applications: [
        "Baking and leavening applications",
        "Food processing and pH control",
        "Pharmaceutical formulations",
        "Personal care products",
        "Cleaning formulations",
        "Fire extinguisher powder",
        "Feed additives",
        "Industrial pH adjustment"
      ],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Soluble in water (9.6g/100ml at 20°C)",
        density: "2.20 g/cm³",
        ph: "8.3 (1% aqueous solution)",
        moisture: "0.20% max",
        assay: "99.2-100.3%"
      },
      packaging: {
        type: "Crystalline Powder",
        sizes: ["25kg bags", "500kg big bags", "1000kg big bags"],
        material: "Food-grade multi-layer paper bags",
        storage: "Store in dry, cool place away from acids"
      },
      safetyInfo: {
        hazardClass: "Non-hazardous",
        precautions: [
          "Food grade - Generally Recognized as Safe (GRAS)",
          "Avoid inhalation of dust",
          "Use standard food handling practices",
          "Keep away from acids"
        ],
        firstAid: [
          "Eye contact: Flush with clean water",
          "Skin contact: Wash with water",
          "Inhalation: Move to fresh air",
          "Ingestion: Generally safe, provide water"
        ],
        storage: [
          "Store in dry conditions below 25°C",
          "Protect from moisture and humidity",
          "Keep away from acids",
          "Maintain package integrity"
        ]
      },
      certifications: ["FDA GRAS", "FCC Grade", "USP Grade", "Kosher Certified", "Halal Certified"],
      industries: ["Food & Beverage", "Pharmaceuticals", "Personal Care", "Industrial"],
      relatedProducts: [3, 7],
      availability: {
        status: "In Stock",
        leadTime: "3-7 days",
        regions: ["Global"]
      },
      supplier: {
        name: "Vinayak Enterprise",
        experience: "14+ years",
        certifications: ["HACCP", "ISO 22000:2018", "BRC Certified"],
        contact: {
          phone: "+91 95106 91989",
          email: "info@vinayak-enterprise.net"
        }
      }
    },
    {
      id: 13,
      name: "Xanthan Gum",
      category: "Food & Nutrition",
      subcategory: "Thickeners",
      images: [
        "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ],
      description: "High-quality xanthan gum for food thickening, stabilization, and gluten-free applications.",
      detailedDescription: "Xanthan Gum is a natural polysaccharide produced by fermentation, widely used as a thickening, stabilizing, and emulsifying agent in food applications. It provides excellent rheological properties and is particularly valuable in gluten-free formulations. Our xanthan gum meets food grade standards and offers consistent performance.",
      chemicalFormula: "C35H49O29",
      casNumber: "11138-66-2",
      hsCode: "3913.90.00",
      einecs: "234-394-2",
      molecularWeight: "Variable (high molecular weight)",
      purity: "99.0% min",
      grade: "Food Grade (FCC)",
      applications: [
        "Food thickening and stabilization",
        "Gluten-free baking",
        "Sauce and dressing formulations",
        "Dairy product stabilization",
        "Cosmetic formulations",
        "Pharmaceutical suspensions",
        "Oil drilling fluids",
        "Industrial thickening"
      ],
      specifications: {
        appearance: "Cream to white powder",
        solubility: "Soluble in water, forms viscous solutions",
        ph: "6.0-8.0 (1% aqueous solution)",
        moisture: "15.0% max",
        viscosity: "1200-1600 cP (1% solution)",
        assay: "91.0% min (dry basis)"
      },
      packaging: {
        type: "Fine Powder",
        sizes: ["25kg bags", "500kg big bags"],
        material: "Food-grade multi-layer bags with PE liner",
        storage: "Store in dry, cool place away from moisture"
      },
      safetyInfo: {
        hazardClass: "Non-hazardous",
        precautions: [
          "Food grade - Generally Recognized as Safe (GRAS)",
          "Avoid inhalation of dust particles",
          "Use dust mask when handling",
          "Ensure adequate ventilation"
        ],
        firstAid: [
          "Eye contact: Flush with clean water",
          "Skin contact: Wash with water",
          "Inhalation: Move to fresh air",
          "Ingestion: Generally safe, provide water"
        ],
        storage: [
          "Store in dry conditions below 25°C",
          "Protect from moisture and humidity",
          "Keep containers tightly sealed",
          "Avoid contamination"
        ]
      },
      certifications: ["FDA GRAS", "FCC Grade", "Kosher Certified", "Halal Certified", "Non-GMO"],
      industries: ["Food & Beverage", "Cosmetics", "Pharmaceuticals", "Industrial"],
      relatedProducts: [10, 12],
      availability: {
        status: "In Stock",
        leadTime: "10-15 days",
        regions: ["Global"]
      },
      supplier: {
        name: "Vinayak Enterprise",
        experience: "14+ years",
        certifications: ["HACCP", "ISO 22000:2018", "Organic Certified"],
        contact: {
          phone: "+91 95106 91989",
          email: "info@vinayak-enterprise.net"
        }
      }
    },
    {
      id: 14,
      name: "Zinc Oxide (Pharmaceutical Grade)",
      category: "Personal Care",
      subcategory: "UV Filters",
      images: [
        "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
        "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ],
      description: "Pharmaceutical grade zinc oxide for sunscreen, cosmetic, and medicinal applications with excellent UV protection.",
      detailedDescription: "Zinc Oxide Pharmaceutical Grade is a high-purity, fine particle size mineral that provides broad-spectrum UV protection and has antimicrobial properties. It is widely used in sunscreens, cosmetics, pharmaceutical ointments, and personal care products. Our pharmaceutical grade zinc oxide meets USP/BP standards for medicinal use.",
      chemicalFormula: "ZnO",
      casNumber: "1314-13-2",
      hsCode: "2817.00.00",
      einecs: "215-222-5",
      molecularWeight: "81.38 g/mol",
      purity: "99.0% min",
      grade: "Pharmaceutical Grade (USP/BP)",
      applications: [
        "Sunscreen formulations",
        "Cosmetic and personal care products",
        "Pharmaceutical ointments and creams",
        "Diaper rash treatments",
        "Calamine lotions",
        "Antiseptic formulations",
        "Dental care products",
        "Wound care products"
      ],
      specifications: {
        appearance: "White to off-white powder",
        solubility: "Insoluble in water and alcohol",
        density: "5.61 g/cm³",
        ph: "6.0-8.0 (10% aqueous suspension)",
        moisture: "0.5% max",
        assay: "99.0-100.5% (dry basis)"
      },
      packaging: {
        type: "Fine Powder",
        sizes: ["25kg bags", "500kg big bags"],
        material: "Pharmaceutical grade multi-layer bags",
        storage: "Store in dry place, protect from moisture"
      },
      safetyInfo: {
        hazardClass: "Non-hazardous",
        precautions: [
          "Pharmaceutical grade - safe for topical use",
          "Avoid inhalation of dust particles",
          "Use respiratory protection in dusty conditions",
          "Follow pharmaceutical handling practices"
        ],
        firstAid: [
          "Eye contact: Flush with water for 15 minutes",
          "Skin contact: Wash with soap and water",
          "Inhalation: Move to fresh air",
          "Ingestion: Rinse mouth, seek medical advice if needed"
        ],
        storage: [
          "Store in dry, well-ventilated area",
          "Keep containers tightly closed",
          "Protect from moisture and contamination",
          "Maintain pharmaceutical storage conditions"
        ]
      },
      certifications: ["USP Grade", "BP Grade", "Ph.Eur. Compliant", "FDA Approved", "GMP Compliant"],
      industries: ["Pharmaceuticals", "Cosmetics", "Personal Care", "Medical Devices"],
      relatedProducts: [2, 11],
      availability: {
        status: "In Stock",
        leadTime: "10-15 days",
        regions: ["Global"]
      },
      supplier: {
        name: "Vinayak Enterprise",
        experience: "14+ years",
        certifications: ["GMP Certified", "ISO 9001:2015", "Pharmaceutical License"],
        contact: {
          phone: "+91 95106 91989",
          email: "info@vinayak-enterprise.net"
        }
      }
    },
    {
      id: 15,
      name: "Sodium Chloride (Pharmaceutical Grade)",
      category: "Food & Nutrition",
      subcategory: "Salts",
      images: [
        "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ],
      description: "High-purity pharmaceutical grade sodium chloride for medical, food, and industrial applications.",
      detailedDescription: "Sodium Chloride Pharmaceutical Grade is ultra-pure salt that meets the highest standards for pharmaceutical, medical, and food applications. It is essential for saline solutions, pharmaceutical formulations, food processing, and various industrial applications requiring high purity and consistent quality.",
      chemicalFormula: "NaCl",
      casNumber: "7647-14-5",
      hsCode: "2501.00.00",
      einecs: "231-598-3",
      molecularWeight: "58.44 g/mol",
      purity: "99.5% min",
      grade: "Pharmaceutical Grade (USP/BP/Ph.Eur)",
      applications: [
        "Pharmaceutical formulations",
        "Saline solution preparation",
        "Food processing and preservation",
        "Dialysis solutions",
        "IV fluid preparation",
        "Laboratory reagent",
        "Cosmetic formulations",
        "Industrial processes"
      ],
      specifications: {
        appearance: "White crystalline solid",
        solubility: "Highly soluble in water (36g/100ml at 20°C)",
        density: "2.16 g/cm³",
        ph: "5.0-8.0 (5% aqueous solution)",
        moisture: "0.5% max",
        assay: "99.5-100.5% (dry basis)"
      },
      packaging: {
        type: "Crystalline Solid",
        sizes: ["25kg bags", "500kg big bags", "1000kg big bags"],
        material: "Pharmaceutical grade multi-layer bags",
        storage: "Store in dry conditions, protect from moisture"
      },
      safetyInfo: {
        hazardClass: "Non-hazardous",
        precautions: [
          "Pharmaceutical grade - safe for medical use",
          "Use standard pharmaceutical handling practices",
          "Avoid contamination",
          "Maintain sterile conditions when required"
        ],
        firstAid: [
          "Eye contact: Flush with clean water",
          "Skin contact: Wash with water",
          "Inhalation: Move to fresh air",
          "Ingestion: Generally safe, provide water"
        ],
        storage: [
          "Store in dry conditions below 25°C",
          "Protect from moisture and contamination",
          "Keep containers tightly sealed",
          "Maintain pharmaceutical storage standards"
        ]
      },
      certifications: ["USP Grade", "BP Grade", "Ph.Eur. Compliant", "FDA Approved", "GMP Compliant"],
      industries: ["Pharmaceuticals", "Medical", "Food & Beverage", "Laboratory"],
      relatedProducts: [12, 16],
      availability: {
        status: "In Stock",
        leadTime: "5-10 days",
        regions: ["Global"]
      },
      supplier: {
        name: "Vinayak Enterprise",
        experience: "14+ years",
        certifications: ["GMP Certified", "ISO 9001:2015", "Pharmaceutical License"],
        contact: {
          phone: "+91 95106 91989",
          email: "info@vinayak-enterprise.net"
        }
      }
    },
    {
      id: 16,
      name: "Calcium Chloride (Anhydrous)",
      category: "Industrial Solvents",
      subcategory: "Desiccants",
      images: [
        "https://jkmchemtrade.com/upload/categories/4471230925113924.jpg",
        "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ],
      description: "High-purity anhydrous calcium chloride for desiccant, de-icing, and industrial applications.",
      detailedDescription: "Calcium Chloride Anhydrous is a highly hygroscopic salt with excellent moisture absorption properties. It is widely used as a desiccant, de-icing agent, concrete accelerator, and in various industrial processes. Our high-purity calcium chloride provides consistent performance and meets international quality standards.",
      chemicalFormula: "CaCl2",
      casNumber: "10043-52-4",
      hsCode: "2827.20.00",
      einecs: "233-140-8",
      molecularWeight: "110.98 g/mol",
      purity: "94.0% min",
      grade: "Technical Grade",
      applications: [
        "Desiccant and moisture control",
        "De-icing and snow melting",
        "Concrete acceleration",
        "Oil and gas drilling",
        "Food additive (firming agent)",
        "Dust control on roads",
        "Refrigeration brine",
        "Chemical processing"
      ],
      specifications: {
        appearance: "White granules or powder",
        solubility: "Highly soluble in water (74.5g/100ml at 20°C)",
        density: "2.15 g/cm³",
        ph: "7.5-11.0 (1% aqueous solution)",
        moisture: "5.0% max",
        assay: "94.0% min CaCl2"
      },
      packaging: {
        type: "Granules/Powder",
        sizes: ["25kg bags", "500kg big bags", "1000kg big bags"],
        material: "Moisture-proof multi-layer bags",
        storage: "Store in dry place, protect from moisture"
      },
      safetyInfo: {
        hazardClass: "Non-hazardous",
        precautions: [
          "Hygroscopic material - absorbs moisture rapidly",
          "May cause skin and eye irritation",
          "Use protective equipment when handling",
          "Ensure adequate ventilation"
        ],
        firstAid: [
          "Eye contact: Flush with water for 15 minutes",
          "Skin contact: Wash with soap and water",
          "Inhalation: Move to fresh air",
          "Ingestion: Rinse mouth, provide water"
        ],
        storage: [
          "Store in dry, well-ventilated area",
          "Keep containers tightly sealed",
          "Protect from moisture and humidity",
          "Use moisture-proof storage"
        ]
      },
      certifications: ["Technical Grade Standard", "ISO 9001:2015"],
      industries: ["Construction", "Oil & Gas", "Food Processing", "Chemical"],
      relatedProducts: [7, 21],
      availability: {
        status: "In Stock",
        leadTime: "7-14 days",
        regions: ["Asia", "Middle East", "Europe"]
      },
      supplier: {
        name: "Vinayak Enterprise",
        experience: "14+ years",
        certifications: ["ISO 9001:2015", "Technical Certified"],
        contact: {
          phone: "+91 95106 91989",
          email: "info@vinayak-enterprise.net"
        }
      }
    },
    {
      id: 17,
      name: "Magnesium Sulfate Heptahydrate (Epsom Salt)",
      category: "Cattle & Poultry Feed",
      subcategory: "Mineral Supplements",
      images: [
        "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
        "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ],
      description: "High-quality magnesium sulfate heptahydrate for animal nutrition, agriculture, and pharmaceutical applications.",
      detailedDescription: "Magnesium Sulfate Heptahydrate, commonly known as Epsom Salt, is an essential magnesium supplement for animal nutrition and agricultural applications. It provides bioavailable magnesium and sulfur, crucial for animal health, plant growth, and various industrial processes. Our feed-grade quality ensures safety and efficacy.",
      chemicalFormula: "MgSO4·7H2O",
      casNumber: "10034-99-8",
      hsCode: "2833.21.00",
      einecs: "231-298-2",
      molecularWeight: "246.47 g/mol",
      purity: "99.0% min",
      grade: "Feed/Agricultural Grade",
      applications: [
        "Animal feed supplementation",
        "Poultry and livestock nutrition",
        "Agricultural fertilizer",
        "Pharmaceutical formulations",
        "Bath salts and personal care",
        "Industrial processes",
        "Textile dyeing",
        "Paper manufacturing"
      ],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Soluble in water (71g/100ml at 20°C)",
        density: "1.68 g/cm³",
        ph: "5.5-7.0 (5% aqueous solution)",
        moisture: "0.5% max (excluding crystal water)",
        assay: "99.0-102.0%"
      },
      packaging: {
        type: "Crystalline Powder",
        sizes: ["25kg bags", "500kg big bags", "1000kg big bags"],
        material: "Feed-grade multi-layer bags",
        storage: "Store in dry place, protect from moisture"
      },
      safetyInfo: {
        hazardClass: "Non-hazardous",
        precautions: [
          "Feed grade - safe for animal consumption",
          "Avoid inhalation of dust",
          "Use standard feed handling practices",
          "Maintain proper hygiene"
        ],
        firstAid: [
          "Eye contact: Flush with clean water",
          "Skin contact: Wash with water",
          "Inhalation: Move to fresh air",
          "Ingestion: Generally safe, provide water"
        ],
        storage: [
          "Store in dry conditions below 25°C",
          "Protect from moisture and contamination",
          "Keep containers sealed",
          "Follow feed storage guidelines"
        ]
      },
      certifications: ["Feed Grade Certified", "Agricultural Grade", "ISO 9001:2015"],
      industries: ["Animal Feed", "Agriculture", "Pharmaceuticals", "Personal Care"],
      relatedProducts: [5, 25],
      availability: {
        status: "In Stock",
        leadTime: "5-10 days",
        regions: ["Global"]
      },
      supplier: {
        name: "Vinayak Enterprise",
        experience: "14+ years",
        certifications: ["Feed Safety Certified", "ISO 22000:2018"],
        contact: {
          phone: "+91 95106 91989",
          email: "info@vinayak-enterprise.net"
        }
      }
    },
    {
      id: 18,
      name: "Hydrogen Peroxide (35% Solution)",
      category: "Industrial Solvents",
      subcategory: "Oxidizing Agents",
      images: [
        "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://jkmchemtrade.com/upload/categories/4471230925113924.jpg"
      ],
      description: "High-concentration hydrogen peroxide solution for bleaching, disinfection, and chemical processing applications.",
      detailedDescription: "Hydrogen Peroxide 35% Solution is a powerful oxidizing agent used for bleaching, disinfection, water treatment, and chemical synthesis. It provides excellent antimicrobial properties and environmental compatibility as it decomposes to water and oxygen. Our high-grade hydrogen peroxide meets industrial standards for various applications.",
      chemicalFormula: "H2O2",
      casNumber: "7722-84-1",
      hsCode: "2847.00.00",
      einecs: "231-765-0",
      molecularWeight: "34.01 g/mol",
      purity: "35.0% H2O2",
      grade: "Technical Grade",
      applications: [
        "Textile bleaching and processing",
        "Paper and pulp bleaching",
        "Water and wastewater treatment",
        "Chemical synthesis and processing",
        "Electronics cleaning",
        "Food processing (limited use)",
        "Pharmaceutical manufacturing",
        "Environmental remediation"
      ],
      specifications: {
        appearance: "Clear, colorless liquid",
        solubility: "Miscible with water in all proportions",
        density: "1.13 g/cm³ at 20°C",
        ph: "1.5-4.0",
        stability: "Stabilized with phosphoric acid",
        assay: "35.0% ± 0.5% H2O2"
      },
      packaging: {
        type: "Liquid",
        sizes: ["200L drums", "1000L IBC containers"],
        material: "HDPE or aluminum containers",
        storage: "Store in cool place, protect from heat and light"
      },
      safetyInfo: {
        hazardClass: "Class 5.1 - Oxidizing Agent",
        unNumber: "UN2014",
        precautions: [
          "Strong oxidizer - fire and explosion risk",
          "Causes severe burns and eye damage",
          "Wear full protective equipment",
          "Use in well-ventilated areas only"
        ],
        firstAid: [
          "Eye contact: Flush immediately with water for 15+ minutes",
          "Skin contact: Remove contaminated clothing, flush with water",
          "Inhalation: Move to fresh air immediately",
          "Ingestion: Do NOT induce vomiting, seek immediate medical attention"
        ],
        storage: [
          "Store at 5-25°C in original containers",
          "Keep away from heat, sparks, and flames",
          "Protect from light and contamination",
          "Store away from combustible materials"
        ]
      },
      certifications: ["Technical Grade Standard", "ISO 9001:2015"],
      industries: ["Textile", "Paper & Pulp", "Water Treatment", "Chemical Processing"],
      relatedProducts: [1, 7],
      availability: {
        status: "In Stock",
        leadTime: "10-15 days",
        regions: ["Asia", "Europe"]
      },
      supplier: {
        name: "Vinayak Enterprise",
        experience: "14+ years",
        certifications: ["ISO 9001:2015", "Hazardous Material Certified"],
        contact: {
          phone: "+91 95106 91989",
          email: "info@vinayak-enterprise.net"
        }
      }
    },
    {
      id: 19,
      name: "Potassium Hydroxide (Caustic Potash)",
      category: "Industrial Solvents",
      subcategory: "Alkalis",
      images: [
        "https://jkmchemtrade.com/upload/categories/4471230925113924.jpg",
        "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ],
      description: "High-purity potassium hydroxide for soap manufacturing, biodiesel production, and chemical processing.",
      detailedDescription: "Potassium Hydroxide, also known as Caustic Potash, is a strong alkali used in soap manufacturing, biodiesel production, chemical processing, and battery electrolytes. It provides excellent saponification properties and is essential for various industrial processes requiring strong alkaline conditions.",
      chemicalFormula: "KOH",
      casNumber: "1310-58-3",
      hsCode: "2815.20.00",
      einecs: "215-181-3",
      molecularWeight: "56.11 g/mol",
      purity: "90.0% min",
      grade: "Technical Grade",
      applications: [
        "Soap and detergent manufacturing",
        "Biodiesel production",
        "Chemical processing and synthesis",
        "Battery electrolyte",
        "pH adjustment and neutralization",
        "Food processing (limited use)",
        "Pharmaceutical intermediates",
        "Metal processing"
      ],
      specifications: {
        appearance: "White solid flakes",
        solubility: "Highly soluble in water (112g/100ml at 20°C)",
        density: "2.04 g/cm³",
        ph: "14 (0.1M aqueous solution)",
        moisture: "1.0% max",
        assay: "90.0% min KOH"
      },
      packaging: {
        type: "Solid Flakes",
        sizes: ["25kg bags", "500kg big bags"],
        material: "Moisture-proof multi-layer bags",
        storage: "Store in dry place, protect from moisture and CO2"
      },
      safetyInfo: {
        hazardClass: "Class 8 - Corrosive",
        unNumber: "UN1813",
        precautions: [
          "Highly corrosive - causes severe burns",
          "Wear full protective equipment",
          "Avoid contact with skin, eyes, and clothing",
          "Use in well-ventilated areas only"
        ],
        firstAid: [
          "Eye contact: Flush immediately with water for 15+ minutes",
          "Skin contact: Remove contaminated clothing, flush with water",
          "Inhalation: Move to fresh air immediately",
          "Ingestion: Do NOT induce vomiting, seek immediate medical attention"
        ],
        storage: [
          "Store in dry, well-ventilated area",
          "Keep away from acids and aluminum",
          "Protect from moisture and carbon dioxide",
          "Use corrosion-resistant containers"
        ]
      },
      certifications: ["Technical Grade Standard", "ISO 9001:2015"],
      industries: ["Soap Manufacturing", "Biodiesel", "Chemical Processing", "Battery"],
      relatedProducts: [7, 24],
      availability: {
        status: "In Stock",
        leadTime: "7-14 days",
        regions: ["Asia", "Middle East", "Europe"]
      },
      supplier: {
        name: "Vinayak Enterprise",
        experience: "14+ years",
        certifications: ["ISO 9001:2015", "Safety Certified"],
        contact: {
          phone: "+91 95106 91989",
          email: "info@vinayak-enterprise.net"
        }
      }
    },
    {
      id: 20,
      name: "Ascorbic Acid (Vitamin C)",
      category: "Food & Nutrition",
      subcategory: "Vitamins",
      images: [
        "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      ],
      description: "High-purity ascorbic acid (Vitamin C) for food fortification, pharmaceutical, and antioxidant applications.",
      detailedDescription: "Ascorbic Acid, commonly known as Vitamin C, is an essential nutrient and powerful antioxidant used in food fortification, pharmaceutical formulations, and cosmetic applications. Our high-purity ascorbic acid meets pharmaceutical and food grade standards, providing excellent stability and bioavailability.",
      chemicalFormula: "C6H8O6",
      casNumber: "50-81-7",
      hsCode: "2936.27.00",
      einecs: "200-066-2",
      molecularWeight: "176.12 g/mol",
      purity: "99.0% min",
      grade: "Pharmaceutical/Food Grade (USP/BP/FCC)",
      applications: [
        "Food and beverage fortification",
        "Pharmaceutical formulations",
        "Dietary supplements",
        "Cosmetic and personal care products",
        "Antioxidant in food processing",
        "Animal feed supplements",
        "Water treatment",
        "Chemical synthesis"
      ],
      specifications: {
        appearance: "White to slightly yellow crystalline powder",
        solubility: "Soluble in water (33g/100ml at 20°C)",
        ph: "2.1-2.6 (5% aqueous solution)",
        moisture: "0.4% max",
        assay: "99.0-100.5% (dry basis)",
        opticalRotation: "+20.5° to +21.5°"
      },
      packaging: {
        type: "Crystalline Powder",
        sizes: ["25kg bags", "500kg big bags"],
        material: "Food/Pharma grade multi-layer bags",
        storage: "Store in cool, dry place, protect from light"
      },
      safetyInfo: {
        hazardClass: "Non-hazardous",
        precautions: [
          "Food/Pharmaceutical grade - Generally Recognized as Safe (GRAS)",
          "Protect from light and heat",
          "Avoid inhalation of dust",
          "Use standard food/pharma handling practices"
        ],
        firstAid: [
          "Eye contact: Flush with clean water",
          "Skin contact: Wash with water",
          "Inhalation: Move to fresh air",
          "Ingestion: Generally safe, provide water"
        ],
        storage: [
          "Store below 25°C in dry conditions",
          "Protect from light, heat, and moisture",
          "Keep containers tightly sealed",
          "Use nitrogen blanketing for long-term storage"
        ]
      },
      certifications: ["USP Grade", "BP Grade", "FCC Grade", "FDA Approved", "Kosher", "Halal"],
      industries: ["Food & Beverage", "Pharmaceuticals", "Nutraceuticals", "Cosmetics"],
      relatedProducts: [3, 10],
      availability: {
        status: "In Stock",
        leadTime: "10-15 days",
        regions: ["Global"]
      },
      supplier: {
        name: "Vinayak Enterprise",
        experience: "14+ years",
        certifications: ["GMP Certified", "HACCP", "ISO 22000:2018"],
        contact: {
          phone: "+91 95106 91989",
          email: "info@vinayak-enterprise.net"
        }
      }
    }
  ];

  useEffect(() => {
    const productId = parseInt(id || '1');
    const foundProduct = productDatabase.find(p => p.id === productId);
    setProduct(foundProduct || productDatabase[0]);
  }, [id]);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle inquiry form submission
    console.log('Inquiry submitted:', inquiryForm);
    alert('Thank you for your inquiry! We will contact you soon.');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: product?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  if (!product) {
    return (
      <div className="pt-24 pb-20 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  const relatedProducts = productDatabase.filter(p => 
    product.relatedProducts.includes(p.id)
  ).slice(0, 3);

  return (
    <div className="pt-24 pb-20">
      {/* Breadcrumb */}
      <section className="bg-gray-50 py-4">
        <div className="container-custom">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/products" className="text-gray-500 hover:text-primary">Products</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-800">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Header */}
      <section className="py-8">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-6">
            <Link 
              to="/products" 
              className="flex items-center text-primary hover:text-primary-dark transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Products
            </Link>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-2 rounded-full transition-colors ${
                  isWishlisted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-colors"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="mb-4">
                <img 
                  src={product.images[activeImageIndex]} 
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                      activeImageIndex === index ? 'border-primary' : 'border-gray-200'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                <span className="text-sm text-primary font-medium">{product.category}</span>
                <h1 className="text-3xl font-bold text-gray-800 mt-1 mb-2">{product.name}</h1>
                <p className="text-gray-600 mb-4">{product.subcategory}</p>
              </div>

              <div className="mb-6">
                <p className="text-lg text-gray-700 leading-relaxed">{product.detailedDescription}</p>
              </div>

              {/* Key Specifications */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Beaker className="mr-2 text-primary" size={20} />
                  Key Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">Chemical Formula:</span>
                    <span className="ml-2 text-gray-700">{product.chemicalFormula}</span>
                  </div>
                  <div>
                    <span className="font-medium">CAS Number:</span>
                    <span className="ml-2 text-gray-700">{product.casNumber}</span>
                  </div>
                  <div>
                    <span className="font-medium">Purity:</span>
                    <span className="ml-2 text-gray-700">{product.purity}</span>
                  </div>
                  <div>
                    <span className="font-medium">Grade:</span>
                    <span className="ml-2 text-gray-700">{product.grade}</span>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center justify-between mb-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="text-green-600 mr-2" size={20} />
                  <span className="font-medium text-green-800">{product.availability.status}</span>
                </div>
                <span className="text-sm text-green-600">Lead Time: {product.availability.leadTime}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
                <button className="flex-1 btn btn-primary flex items-center justify-center">
                  <Mail className="mr-2" size={18} />
                  Request Quote
                </button>
                <button className="flex-1 btn bg-secondary text-white hover:bg-secondary-dark flex items-center justify-center">
                  <Phone className="mr-2" size={18} />
                  Call Now
                </button>
              </div>

              {/* Downloads */}
              {(product.technicalDataSheet || product.safetyDataSheet) && (
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-3">Downloads</h3>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                    {product.technicalDataSheet && (
                      <a 
                        href={product.technicalDataSheet}
                        className="flex items-center text-primary hover:text-primary-dark"
                      >
                        <Download size={16} className="mr-2" />
                        Technical Data Sheet
                      </a>
                    )}
                    {product.safetyDataSheet && (
                      <a 
                        href={product.safetyDataSheet}
                        className="flex items-center text-primary hover:text-primary-dark"
                      >
                        <Download size={16} className="mr-2" />
                        Safety Data Sheet
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Information Tabs */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'overview', label: 'Overview', icon: <Eye size={18} /> },
                  { id: 'specifications', label: 'Specifications', icon: <FileText size={18} /> },
                  { id: 'applications', label: 'Applications', icon: <Factory size={18} /> },
                  { id: 'packaging', label: 'Packaging & Storage', icon: <Package size={18} /> },
                  { id: 'safety', label: 'Safety Information', icon: <Shield size={18} /> },
                  { id: 'certifications', label: 'Certifications', icon: <Award size={18} /> }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.icon}
                    <span className="ml-2 hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Product Overview</h3>
                    <p className="text-gray-700 leading-relaxed">{product.detailedDescription}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Key Features</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• High purity: {product.purity}</li>
                        <li>• {product.grade} quality</li>
                        <li>• Consistent performance</li>
                        <li>• International standards compliance</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Industries Served</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.industries.map((industry, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                          >
                            {industry}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Chemical Properties</h4>
                      <table className="w-full text-sm">
                        <tbody className="space-y-2">
                          <tr className="border-b">
                            <td className="py-2 font-medium">Chemical Formula</td>
                            <td className="py-2">{product.chemicalFormula}</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 font-medium">CAS Number</td>
                            <td className="py-2">{product.casNumber}</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 font-medium">EINECS Number</td>
                            <td className="py-2">{product.einecs}</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 font-medium">Molecular Weight</td>
                            <td className="py-2">{product.molecularWeight}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Physical Properties</h4>
                      <table className="w-full text-sm">
                        <tbody className="space-y-2">
                          <tr className="border-b">
                            <td className="py-2 font-medium">Appearance</td>
                            <td className="py-2">{product.specifications.appearance}</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 font-medium">Solubility</td>
                            <td className="py-2">{product.specifications.solubility}</td>
                          </tr>
                          {product.specifications.density && (
                            <tr className="border-b">
                              <td className="py-2 font-medium">Density</td>
                              <td className="py-2">{product.specifications.density}</td>
                            </tr>
                          )}
                          {product.specifications.ph && (
                            <tr className="border-b">
                              <td className="py-2 font-medium">pH</td>
                              <td className="py-2">{product.specifications.ph}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'applications' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Applications & Uses</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {product.applications.map((application, index) => (
                      <div 
                        key={index}
                        className="flex items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <Zap className="text-primary mr-3 flex-shrink-0" size={18} />
                        <span className="text-gray-700">{application}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'packaging' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Packaging Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Available Sizes</h4>
                        <ul className="space-y-1">
                          {product.packaging.sizes.map((size, index) => (
                            <li key={index} className="flex items-center">
                              <Package className="text-primary mr-2" size={16} />
                              {size}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Packaging Details</h4>
                        <p className="text-gray-700 mb-2">
                          <strong>Type:</strong> {product.packaging.type}
                        </p>
                        <p className="text-gray-700 mb-2">
                          <strong>Material:</strong> {product.packaging.material}
                        </p>
                        <p className="text-gray-700">
                          <strong>Storage:</strong> {product.packaging.storage}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'safety' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Safety Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <AlertTriangle className="text-yellow-600 mr-2" size={18} />
                          Precautions
                        </h4>
                        <ul className="space-y-1">
                          {product.safetyInfo.precautions.map((precaution, index) => (
                            <li key={index} className="text-gray-700">• {precaution}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Shield className="text-green-600 mr-2" size={18} />
                          First Aid
                        </h4>
                        <ul className="space-y-1">
                          {product.safetyInfo.firstAid.map((aid, index) => (
                            <li key={index} className="text-gray-700">• {aid}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="font-semibold mb-3">Storage Requirements</h4>
                      <ul className="space-y-1">
                        {product.safetyInfo.storage.map((requirement, index) => (
                          <li key={index} className="text-gray-700">• {requirement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'certifications' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Certifications & Compliance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {product.certifications.map((cert, index) => (
                      <div 
                        key={index}
                        className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200"
                      >
                        <Award className="text-green-600 mr-3" size={20} />
                        <span className="font-medium text-green-800">{cert}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="font-semibold mb-3">Supplier Information</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium">{product.supplier.name}</p>
                          <p className="text-gray-600">Experience: {product.supplier.experience}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Contact Information:</p>
                          <p className="text-sm">Phone: {product.supplier.contact.phone}</p>
                          <p className="text-sm">Email: {product.supplier.contact.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Request Product Information</h3>
              
              <form onSubmit={handleInquirySubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({...inquiryForm, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({...inquiryForm, email: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm({...inquiryForm, phone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={inquiryForm.company}
                      onChange={(e) => setInquiryForm({...inquiryForm, company: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Required Quantity
                  </label>
                  <input
                    type="text"
                    value={inquiryForm.quantity}
                    onChange={(e) => setInquiryForm({...inquiryForm, quantity: e.target.value})}
                    placeholder="e.g., 1000 kg, 5 MT"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={inquiryForm.message}
                    onChange={(e) => setInquiryForm({...inquiryForm, message: e.target.value})}
                    placeholder="Please provide details about your requirements..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  ></textarea>
                </div>
                
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary px-8 py-3 rounded-md"
                  >
                    Send Inquiry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <h3 className="text-2xl font-bold text-center mb-8">Related Products</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={relatedProduct.images[0]} 
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-sm text-primary font-medium">{relatedProduct.category}</span>
                    <h4 className="text-lg font-semibold mb-2 mt-1">{relatedProduct.name}</h4>
                    <p className="text-gray-600 mb-4 text-sm">{relatedProduct.description}</p>
                    <Link 
                      to={`/products/${relatedProduct.id}`}
                      className="text-primary font-medium inline-flex items-center hover:underline"
                    >
                      View Details
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;