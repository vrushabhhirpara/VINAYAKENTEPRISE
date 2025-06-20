import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Share2, 
  Download, 
  Phone, 
  Mail, 
  MapPin,
  CheckCircle,
  AlertTriangle,
  Info,
  Package,
  Truck,
  Shield,
  Clock,
  Star,
  Send
} from 'lucide-react';

interface ProductDetail {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  image: string;
  description: string;
  featured: boolean;
  hsCode?: string;
  casNumber?: string;
  chemicalFormula?: string;
  molecularWeight?: string;
  purity?: string;
  appearance?: string;
  solubility?: string;
  applications: string[];
  specifications: { [key: string]: string };
  safetyInfo: string[];
  packaging: string[];
  storageConditions: string;
  shelfLife: string;
  certifications: string[];
  relatedProducts: number[];
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    quantity: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Comprehensive product catalog with 25 products
  const products: ProductDetail[] = [
    {
      id: 1,
      name: "Industrial Solvents",
      category: "Industrial Products",
      subcategory: "Solvents",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "High-quality industrial solvents designed for cleaning, degreasing, and manufacturing processes across various industries.",
      featured: true,
      hsCode: "2814",
      casNumber: "7664-41-7",
      chemicalFormula: "Various",
      molecularWeight: "Variable",
      purity: "≥99.5%",
      appearance: "Clear liquid",
      solubility: "Miscible with water",
      applications: [
        "Industrial cleaning and degreasing",
        "Paint and coating formulations",
        "Adhesive manufacturing",
        "Pharmaceutical intermediates",
        "Electronic component cleaning"
      ],
      specifications: {
        "Purity": "≥99.5%",
        "Water Content": "≤0.1%",
        "Acidity": "≤0.01%",
        "Color": "Colorless",
        "Density": "0.85-0.95 g/cm³"
      },
      safetyInfo: [
        "Store in cool, dry place away from heat sources",
        "Use appropriate PPE including gloves and eye protection",
        "Ensure adequate ventilation during use",
        "Keep away from incompatible materials"
      ],
      packaging: [
        "25 kg HDPE drums",
        "200 kg steel drums",
        "1000 kg IBC containers",
        "Bulk tanker delivery available"
      ],
      storageConditions: "Store at 15-25°C in original sealed containers",
      shelfLife: "24 months from date of manufacture",
      certifications: ["ISO 9001", "REACH Compliant", "GMP Certified"],
      relatedProducts: [2, 3, 8]
    },
    {
      id: 2,
      name: "Personal Care Ingredients",
      category: "Natural Products",
      subcategory: "Personal Use",
      image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
      description: "Premium natural ingredients for personal care and cosmetic formulations, ensuring safety and efficacy.",
      featured: true,
      hsCode: "3304",
      casNumber: "Various",
      chemicalFormula: "Natural extracts",
      molecularWeight: "Variable",
      purity: "≥98%",
      appearance: "Various forms",
      solubility: "Water/oil soluble variants",
      applications: [
        "Skincare product formulations",
        "Hair care treatments",
        "Cosmetic manufacturing",
        "Natural soap production",
        "Anti-aging formulations"
      ],
      specifications: {
        "Purity": "≥98%",
        "Heavy Metals": "≤10 ppm",
        "Microbiological": "Compliant",
        "pH": "5.5-7.0",
        "Moisture": "≤5%"
      },
      safetyInfo: [
        "Non-toxic and skin-safe formulations",
        "Dermatologically tested ingredients",
        "Hypoallergenic properties",
        "No harmful preservatives"
      ],
      packaging: [
        "1 kg aluminum containers",
        "5 kg plastic drums",
        "25 kg fiber drums",
        "Custom packaging available"
      ],
      storageConditions: "Store in cool, dry place below 25°C",
      shelfLife: "36 months from date of manufacture",
      certifications: ["COSMOS Certified", "Ecocert", "FDA Approved"],
      relatedProducts: [11, 12]
    },
    {
      id: 3,
      name: "Food Grade Additives",
      category: "Food & Beverage",
      subcategory: "Preservatives",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Safe and effective food-grade additives for preservation, flavor enhancement, and nutritional fortification.",
      featured: true,
      hsCode: "2106",
      casNumber: "Various",
      chemicalFormula: "Food grade compounds",
      molecularWeight: "Variable",
      purity: "Food grade",
      appearance: "Powder/liquid",
      solubility: "Water soluble",
      applications: [
        "Food preservation",
        "Flavor enhancement",
        "Nutritional fortification",
        "Texture improvement",
        "Color stabilization"
      ],
      specifications: {
        "Purity": "Food Grade",
        "Heavy Metals": "≤5 ppm",
        "Arsenic": "≤1 ppm",
        "Lead": "≤2 ppm",
        "Microbiological": "Compliant"
      },
      safetyInfo: [
        "GRAS (Generally Recognized as Safe) status",
        "Compliant with food safety regulations",
        "No harmful residues",
        "Suitable for human consumption"
      ],
      packaging: [
        "25 kg paper bags with PE liner",
        "500 kg big bags",
        "Custom food-grade packaging",
        "Sterile packaging options"
      ],
      storageConditions: "Store in dry, cool place away from direct sunlight",
      shelfLife: "24 months in original packaging",
      certifications: ["FDA Approved", "FSSAI Certified", "Halal Certified"],
      relatedProducts: [5, 6]
    },
    {
      id: 4,
      name: "Paint & Coating Chemicals",
      category: "Paint Colour",
      subcategory: "Colour Product",
      image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
      description: "Specialized chemicals for paint manufacturing, ink production, and protective coating applications.",
      featured: true,
      hsCode: "3208",
      casNumber: "Various",
      chemicalFormula: "Mixed compounds",
      molecularWeight: "Variable",
      purity: "≥95%",
      appearance: "Liquid/powder",
      solubility: "Organic solvents",
      applications: [
        "Paint and coating formulations",
        "Ink manufacturing",
        "Protective coatings",
        "Automotive paints",
        "Industrial coatings"
      ],
      specifications: {
        "Purity": "≥95%",
        "Viscosity": "Variable",
        "Color": "As specified",
        "Volatile Content": "≤5%",
        "pH": "6.0-8.0"
      },
      safetyInfo: [
        "Use in well-ventilated areas",
        "Avoid skin and eye contact",
        "Store away from heat and ignition sources",
        "Use appropriate respiratory protection"
      ],
      packaging: [
        "20 kg metal containers",
        "200 kg steel drums",
        "1000 kg IBC tanks",
        "Bulk delivery available"
      ],
      storageConditions: "Store at 10-30°C, protect from freezing",
      shelfLife: "18 months from manufacture date",
      certifications: ["ISO 14001", "OSHA Compliant", "VOC Compliant"],
      relatedProducts: [1, 8, 9]
    },
    {
      id: 5,
      name: "Nutritional Supplements",
      category: "Food Feed",
      subcategory: "Nutrition",
      image: "https://www.emro.who.int/images/stories/nutrition/balanced-diet.jpg",
      description: "High-quality nutritional supplements and fortification ingredients for food and feed applications.",
      featured: false,
      hsCode: "2309",
      casNumber: "Various",
      chemicalFormula: "Nutritional compounds",
      molecularWeight: "Variable",
      purity: "≥99%",
      appearance: "Powder/granules",
      solubility: "Water soluble",
      applications: [
        "Food fortification",
        "Dietary supplements",
        "Animal feed additives",
        "Functional foods",
        "Nutritional beverages"
      ],
      specifications: {
        "Purity": "≥99%",
        "Moisture": "≤5%",
        "Heavy Metals": "≤10 ppm",
        "Microbiological": "Compliant",
        "Particle Size": "80-120 mesh"
      },
      safetyInfo: [
        "Safe for human and animal consumption",
        "Store in dry conditions",
        "Avoid contamination",
        "Follow recommended dosage"
      ],
      packaging: [
        "25 kg fiber drums",
        "500 kg big bags",
        "Custom packaging available",
        "Sterile packaging options"
      ],
      storageConditions: "Store in cool, dry place below 25°C",
      shelfLife: "36 months in original packaging",
      certifications: ["GMP Certified", "HACCP", "Organic Certified"],
      relatedProducts: [3, 6, 10]
    },
    {
      id: 6,
      name: "Agrochemical Intermediates",
      category: "Food Feed",
      subcategory: "Food Grow Supplements",
      image: "https://blog.sathguru.com/wp-content/uploads/2021/01/Opportunity-for-India-becoming-a-global-agro-chemical-manufacturing-hub.jpg",
      description: "Essential intermediates for agrochemical production, supporting crop protection and agricultural enhancement.",
      featured: false,
      hsCode: "3808",
      casNumber: "Various",
      chemicalFormula: "Agricultural compounds",
      molecularWeight: "Variable",
      purity: "≥98%",
      appearance: "Crystalline powder",
      solubility: "Organic solvents",
      applications: [
        "Pesticide manufacturing",
        "Herbicide production",
        "Fungicide formulations",
        "Plant growth regulators",
        "Crop protection products"
      ],
      specifications: {
        "Purity": "≥98%",
        "Water Content": "≤0.5%",
        "Residual Solvents": "≤100 ppm",
        "Heavy Metals": "≤20 ppm",
        "Particle Size": "Fine powder"
      },
      safetyInfo: [
        "Handle with appropriate PPE",
        "Store in secure, ventilated area",
        "Avoid environmental release",
        "Follow regulatory guidelines"
      ],
      packaging: [
        "25 kg fiber drums",
        "200 kg steel drums",
        "500 kg big bags",
        "Specialized containers"
      ],
      storageConditions: "Store at 15-25°C, protect from moisture",
      shelfLife: "24 months from manufacture",
      certifications: ["EPA Registered", "REACH Compliant", "GLP Certified"],
      relatedProducts: [5, 7, 13]
    },
    {
      id: 7,
      name: "Water Treatment Chemicals",
      category: "Water Refinary",
      subcategory: "Base Chemicals",
      image: "https://jkmchemtrade.com/upload/categories/4471230925113924.jpg",
      description: "Specialized chemicals for water treatment, purification, and aquaculture applications.",
      featured: false,
      hsCode: "3824",
      casNumber: "Various",
      chemicalFormula: "Water treatment compounds",
      molecularWeight: "Variable",
      purity: "≥99%",
      appearance: "White powder/liquid",
      solubility: "Water soluble",
      applications: [
        "Water purification",
        "Wastewater treatment",
        "Swimming pool chemicals",
        "Aquaculture applications",
        "Industrial water treatment"
      ],
      specifications: {
        "Purity": "≥99%",
        "pH": "6.0-8.0",
        "Chlorine Content": "≥65%",
        "Moisture": "≤1%",
        "Insoluble Matter": "≤0.1%"
      },
      safetyInfo: [
        "Avoid mixing with acids",
        "Store in dry, cool place",
        "Use proper ventilation",
        "Wear protective equipment"
      ],
      packaging: [
        "25 kg HDPE bags",
        "50 kg plastic drums",
        "500 kg big bags",
        "Bulk delivery available"
      ],
      storageConditions: "Store below 30°C, protect from moisture",
      shelfLife: "12 months from manufacture",
      certifications: ["NSF Certified", "EPA Approved", "WHO Standards"],
      relatedProducts: [1, 4, 14]
    },
    {
      id: 8,
      name: "Industrial Polymers",
      category: "Polymers",
      subcategory: "Industrial Polymers",
      image: "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "High-performance polymers and resins for industrial manufacturing and specialized applications.",
      featured: false,
      hsCode: "3901",
      casNumber: "Various",
      chemicalFormula: "Polymer chains",
      molecularWeight: "High molecular weight",
      purity: "≥99%",
      appearance: "Pellets/powder",
      solubility: "Organic solvents",
      applications: [
        "Plastic manufacturing",
        "Composite materials",
        "Adhesive production",
        "Coating applications",
        "Engineering plastics"
      ],
      specifications: {
        "Purity": "≥99%",
        "Melt Index": "Variable",
        "Density": "0.9-1.4 g/cm³",
        "Tensile Strength": "High",
        "Thermal Stability": "Excellent"
      },
      safetyInfo: [
        "Avoid high temperatures during storage",
        "Use dust masks when handling powder",
        "Store away from oxidizing agents",
        "Ensure proper ventilation"
      ],
      packaging: [
        "25 kg paper bags",
        "500 kg big bags",
        "1000 kg octabins",
        "Bulk delivery available"
      ],
      storageConditions: "Store at room temperature, protect from UV",
      shelfLife: "60 months from manufacture",
      certifications: ["ISO 9001", "REACH Registered", "RoHS Compliant"],
      relatedProducts: [1, 4, 9]
    },
    {
      id: 9,
      name: "Chemical Intermediates",
      category: "Upper Chemicals",
      subcategory: "Various Industries",
      image: "https://www.thoughtco.com/thmb/X4xEq_SMbjth5zJgBkOjGetWw3k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/scientist-pouring-iron-chloride-into-beaker-of-potassium-thiocyanate-702545775-58cc47493df78c3c4fa0bdef.jpg",
      description: "Essential chemical intermediates for pharmaceutical, agrochemical, and specialty chemical manufacturing.",
      featured: false,
      hsCode: "2918",
      casNumber: "Various",
      chemicalFormula: "Organic intermediates",
      molecularWeight: "Variable",
      purity: "≥99%",
      appearance: "Crystalline solid",
      solubility: "Organic solvents",
      applications: [
        "Pharmaceutical synthesis",
        "Agrochemical production",
        "Dye manufacturing",
        "Specialty chemicals",
        "Research applications"
      ],
      specifications: {
        "Purity": "≥99%",
        "Water Content": "≤0.2%",
        "Heavy Metals": "≤10 ppm",
        "Residual Solvents": "≤50 ppm",
        "Melting Point": "As specified"
      },
      safetyInfo: [
        "Handle in fume hood",
        "Use appropriate PPE",
        "Store under inert atmosphere",
        "Avoid contact with skin and eyes"
      ],
      packaging: [
        "1 kg aluminum bottles",
        "25 kg fiber drums",
        "Custom packaging available",
        "Inert atmosphere packaging"
      ],
      storageConditions: "Store at 2-8°C under inert atmosphere",
      shelfLife: "24 months under proper conditions",
      certifications: ["GMP Certified", "ICH Guidelines", "cGMP Compliant"],
      relatedProducts: [4, 6, 11]
    },
    {
      id: 10,
      name: "Animal Feed Additives",
      category: "Animal Feed",
      subcategory: "Animal Supplement",
      image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
      description: "Nutritional additives and supplements for cattle, poultry, and livestock feed formulations.",
      featured: false,
      hsCode: "2309",
      casNumber: "Various",
      chemicalFormula: "Feed additives",
      molecularWeight: "Variable",
      purity: "Feed grade",
      appearance: "Powder/granules",
      solubility: "Water dispersible",
      applications: [
        "Cattle feed supplementation",
        "Poultry nutrition",
        "Swine feed additives",
        "Aquaculture feeds",
        "Pet food ingredients"
      ],
      specifications: {
        "Purity": "Feed Grade",
        "Moisture": "≤10%",
        "Protein Content": "≥40%",
        "Fat Content": "≤5%",
        "Ash Content": "≤8%"
      },
      safetyInfo: [
        "Safe for animal consumption",
        "Store in dry conditions",
        "Prevent rodent contamination",
        "Follow feeding guidelines"
      ],
      packaging: [
        "25 kg paper bags",
        "50 kg woven bags",
        "500 kg big bags",
        "Bulk delivery available"
      ],
      storageConditions: "Store in cool, dry place below 25°C",
      shelfLife: "18 months from manufacture",
      certifications: ["Feed Grade", "HACCP", "ISO 22000"],
      relatedProducts: [5, 6, 15]
    },
    {
      id: 11,
      name: "Cosmetic Active Ingredients",
      category: "Natural Products",
      subcategory: "Active Ingredients",
      image: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Premium active ingredients for cosmetic formulations, including anti-aging and skin care compounds.",
      featured: false,
      hsCode: "3304",
      casNumber: "Various",
      chemicalFormula: "Cosmetic actives",
      molecularWeight: "Variable",
      purity: "≥95%",
      appearance: "White powder",
      solubility: "Water/oil soluble",
      applications: [
        "Anti-aging creams",
        "Skin whitening products",
        "Sunscreen formulations",
        "Hair care products",
        "Makeup formulations"
      ],
      specifications: {
        "Purity": "≥95%",
        "Heavy Metals": "≤5 ppm",
        "Microbiological": "Compliant",
        "pH": "4.0-7.0",
        "Loss on Drying": "≤5%"
      },
      safetyInfo: [
        "Dermatologically tested",
        "Non-comedogenic",
        "Hypoallergenic",
        "Safe for topical use"
      ],
      packaging: [
        "1 kg aluminum containers",
        "5 kg plastic drums",
        "25 kg fiber drums",
        "Custom packaging"
      ],
      storageConditions: "Store below 25°C, protect from light",
      shelfLife: "36 months from manufacture",
      certifications: ["COSMOS", "Ecocert", "INCI Listed"],
      relatedProducts: [2, 12, 16]
    },
    {
      id: 12,
      name: "Fragrance Compounds",
      category: "Flavours & Fragrances",
      subcategory: "Aromatic Compounds",
      image: "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "High-quality fragrance compounds and aromatic chemicals for perfume and cosmetic applications.",
      featured: false,
      hsCode: "3302",
      casNumber: "Various",
      chemicalFormula: "Aromatic compounds",
      molecularWeight: "Variable",
      purity: "≥98%",
      appearance: "Liquid/solid",
      solubility: "Alcohol soluble",
      applications: [
        "Perfume manufacturing",
        "Cosmetic fragrances",
        "Household products",
        "Personal care items",
        "Air fresheners"
      ],
      specifications: {
        "Purity": "≥98%",
        "Specific Gravity": "Variable",
        "Refractive Index": "As specified",
        "Flash Point": ">60°C",
        "Color": "Colorless to pale yellow"
      },
      safetyInfo: [
        "Store away from heat sources",
        "Use in well-ventilated areas",
        "Avoid skin sensitization",
        "Follow IFRA guidelines"
      ],
      packaging: [
        "1 kg glass bottles",
        "25 kg steel drums",
        "200 kg steel drums",
        "Specialized containers"
      ],
      storageConditions: "Store at 15-25°C, protect from light",
      shelfLife: "24 months from manufacture",
      certifications: ["IFRA Compliant", "REACH Registered", "Kosher Certified"],
      relatedProducts: [2, 11, 17]
    },
    {
      id: 13,
      name: "Pharmaceutical Excipients",
      category: "Upper Chemicals",
      subcategory: "Pharmaceutical",
      image: "https://images.pexels.com/photos/3786126/pexels-photo-3786126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "High-quality pharmaceutical excipients and inactive ingredients for drug formulation and manufacturing.",
      featured: false,
      hsCode: "3003",
      casNumber: "Various",
      chemicalFormula: "Pharmaceutical compounds",
      molecularWeight: "Variable",
      purity: "USP/EP grade",
      appearance: "White powder",
      solubility: "Variable",
      applications: [
        "Tablet manufacturing",
        "Capsule formulations",
        "Injectable preparations",
        "Topical formulations",
        "Oral solutions"
      ],
      specifications: {
        "Purity": "USP/EP Grade",
        "Heavy Metals": "≤10 ppm",
        "Loss on Drying": "≤5%",
        "Residue on Ignition": "≤0.1%",
        "Microbiological": "Compliant"
      },
      safetyInfo: [
        "GMP manufacturing conditions",
        "Pharmaceutical grade quality",
        "Suitable for human consumption",
        "Compliant with pharmacopeias"
      ],
      packaging: [
        "25 kg fiber drums",
        "500 kg big bags",
        "Custom pharmaceutical packaging",
        "Sterile packaging available"
      ],
      storageConditions: "Store in controlled environment, 15-25°C",
      shelfLife: "60 months from manufacture",
      certifications: ["GMP Certified", "FDA DMF", "CEP Available"],
      relatedProducts: [9, 14, 18]
    },
    {
      id: 14,
      name: "Textile Chemicals",
      category: "Industrial Products",
      subcategory: "Textile Processing",
      image: "https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Specialized chemicals for textile processing, dyeing, and finishing applications.",
      featured: false,
      hsCode: "3809",
      casNumber: "Various",
      chemicalFormula: "Textile auxiliaries",
      molecularWeight: "Variable",
      purity: "≥95%",
      appearance: "Liquid/powder",
      solubility: "Water soluble",
      applications: [
        "Fabric dyeing",
        "Textile finishing",
        "Fabric softening",
        "Water repellent treatments",
        "Anti-microbial treatments"
      ],
      specifications: {
        "Purity": "≥95%",
        "pH": "6.0-8.0",
        "Ionic Nature": "As specified",
        "Solubility": "Complete",
        "Stability": "Excellent"
      },
      safetyInfo: [
        "Use appropriate ventilation",
        "Avoid skin and eye contact",
        "Store away from incompatibles",
        "Follow textile industry guidelines"
      ],
      packaging: [
        "25 kg plastic drums",
        "200 kg steel drums",
        "1000 kg IBC containers",
        "Bulk delivery available"
      ],
      storageConditions: "Store at 10-40°C, protect from freezing",
      shelfLife: "12 months from manufacture",
      certifications: ["OEKO-TEX", "ZDHC Compliant", "ISO 14001"],
      relatedProducts: [1, 7, 19]
    },
    {
      id: 15,
      name: "Veterinary APIs",
      category: "Animal Feed",
      subcategory: "Veterinary Medicine",
      image: "https://images.pexels.com/photos/6235234/pexels-photo-6235234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Active pharmaceutical ingredients for veterinary medicines and animal health products.",
      featured: false,
      hsCode: "3004",
      casNumber: "Various",
      chemicalFormula: "Veterinary APIs",
      molecularWeight: "Variable",
      purity: "≥99%",
      appearance: "Crystalline powder",
      solubility: "Variable",
      applications: [
        "Veterinary medicines",
        "Animal antibiotics",
        "Growth promoters",
        "Anti-parasitic drugs",
        "Nutritional supplements"
      ],
      specifications: {
        "Purity": "≥99%",
        "Heavy Metals": "≤20 ppm",
        "Residual Solvents": "≤100 ppm",
        "Water Content": "≤0.5%",
        "Related Substances": "≤1%"
      },
      safetyInfo: [
        "Handle with appropriate PPE",
        "Store under controlled conditions",
        "Follow veterinary guidelines",
        "Prevent cross-contamination"
      ],
      packaging: [
        "1 kg aluminum bottles",
        "25 kg fiber drums",
        "Custom pharmaceutical packaging",
        "Controlled atmosphere packaging"
      ],
      storageConditions: "Store at 2-8°C, protect from light",
      shelfLife: "36 months under proper conditions",
      certifications: ["GMP Certified", "Veterinary Grade", "FDA Approved"],
      relatedProducts: [10, 13, 20]
    },
    {
      id: 16,
      name: "Natural Extracts",
      category: "Natural Products",
      subcategory: "Plant Extracts",
      image: "https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Premium natural plant extracts for cosmetic, pharmaceutical, and nutraceutical applications.",
      featured: false,
      hsCode: "1302",
      casNumber: "Various",
      chemicalFormula: "Natural compounds",
      molecularWeight: "Variable",
      purity: "≥95%",
      appearance: "Brown powder",
      solubility: "Water/alcohol soluble",
      applications: [
        "Herbal medicines",
        "Cosmetic formulations",
        "Dietary supplements",
        "Functional foods",
        "Traditional medicines"
      ],
      specifications: {
        "Purity": "≥95%",
        "Active Content": "As specified",
        "Heavy Metals": "≤10 ppm",
        "Pesticide Residues": "≤0.1 ppm",
        "Microbiological": "Compliant"
      },
      safetyInfo: [
        "Natural and safe ingredients",
        "No synthetic additives",
        "Sustainably sourced",
        "Quality tested extracts"
      ],
      packaging: [
        "1 kg aluminum bags",
        "25 kg fiber drums",
        "Custom packaging available",
        "Nitrogen flushed packaging"
      ],
      storageConditions: "Store below 25°C, protect from light and moisture",
      shelfLife: "24 months from manufacture",
      certifications: ["Organic Certified", "Fair Trade", "Kosher Certified"],
      relatedProducts: [2, 11, 21]
    },
    {
      id: 17,
      name: "Essential Oils",
      category: "Flavours & Fragrances",
      subcategory: "Natural Oils",
      image: "https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Pure essential oils extracted from natural sources for aromatherapy, cosmetics, and flavoring applications.",
      featured: false,
      hsCode: "3301",
      casNumber: "Various",
      chemicalFormula: "Natural oil compounds",
      molecularWeight: "Variable",
      purity: "100% pure",
      appearance: "Clear to colored liquid",
      solubility: "Oil soluble",
      applications: [
        "Aromatherapy products",
        "Natural perfumes",
        "Cosmetic formulations",
        "Food flavoring",
        "Therapeutic applications"
      ],
      specifications: {
        "Purity": "100% Pure",
        "Specific Gravity": "As specified",
        "Refractive Index": "As specified",
        "Optical Rotation": "As specified",
        "Flash Point": ">60°C"
      },
      safetyInfo: [
        "Natural and pure oils",
        "Patch test before use",
        "Store away from heat",
        "Use as directed"
      ],
      packaging: [
        "100 ml amber bottles",
        "1 kg aluminum bottles",
        "25 kg steel drums",
        "Custom packaging"
      ],
      storageConditions: "Store at 15-25°C, protect from light",
      shelfLife: "36 months from manufacture",
      certifications: ["Organic Certified", "GC-MS Tested", "Therapeutic Grade"],
      relatedProducts: [12, 16, 22]
    },
    {
      id: 18,
      name: "Laboratory Reagents",
      category: "Upper Chemicals",
      subcategory: "Analytical Grade",
      image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "High-purity laboratory reagents and analytical grade chemicals for research and testing applications.",
      featured: false,
      hsCode: "3822",
      casNumber: "Various",
      chemicalFormula: "Analytical compounds",
      molecularWeight: "Variable",
      purity: "≥99.9%",
      appearance: "Various",
      solubility: "Variable",
      applications: [
        "Analytical testing",
        "Research applications",
        "Quality control",
        "Method development",
        "Educational purposes"
      ],
      specifications: {
        "Purity": "≥99.9%",
        "Water Content": "≤0.01%",
        "Heavy Metals": "≤1 ppm",
        "Chloride": "≤1 ppm",
        "Sulfate": "≤1 ppm"
      },
      safetyInfo: [
        "Handle in laboratory conditions",
        "Use appropriate safety equipment",
        "Store according to chemical compatibility",
        "Follow laboratory protocols"
      ],
      packaging: [
        "100 g glass bottles",
        "1 kg plastic bottles",
        "25 kg containers",
        "Custom laboratory packaging"
      ],
      storageConditions: "Store according to individual requirements",
      shelfLife: "Variable, typically 3-5 years",
      certifications: ["ACS Grade", "ISO 17025", "Analytical Grade"],
      relatedProducts: [9, 13, 23]
    },
    {
      id: 19,
      name: "Cleaning Chemicals",
      category: "Industrial Products",
      subcategory: "Cleaning Agents",
      image: "https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Industrial and commercial cleaning chemicals for various cleaning and sanitization applications.",
      featured: false,
      hsCode: "3402",
      casNumber: "Various",
      chemicalFormula: "Cleaning compounds",
      molecularWeight: "Variable",
      purity: "≥95%",
      appearance: "Liquid/powder",
      solubility: "Water soluble",
      applications: [
        "Industrial cleaning",
        "Commercial sanitization",
        "Equipment cleaning",
        "Surface disinfection",
        "Maintenance cleaning"
      ],
      specifications: {
        "Purity": "≥95%",
        "pH": "Variable",
        "Active Content": "≥10%",
        "Foam Level": "As specified",
        "Stability": "Excellent"
      },
      safetyInfo: [
        "Use appropriate PPE",
        "Ensure adequate ventilation",
        "Avoid mixing with other chemicals",
        "Follow safety data sheets"
      ],
      packaging: [
        "5 kg plastic containers",
        "25 kg plastic drums",
        "200 kg steel drums",
        "Bulk delivery available"
      ],
      storageConditions: "Store at 5-40°C, protect from freezing",
      shelfLife: "24 months from manufacture",
      certifications: ["EPA Registered", "NSF Listed", "Green Certified"],
      relatedProducts: [1, 7, 14]
    },
    {
      id: 20,
      name: "Nutraceutical Ingredients",
      category: "Food Feed",
      subcategory: "Health Supplements",
      image: "https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Premium nutraceutical ingredients for dietary supplements and functional food applications.",
      featured: false,
      hsCode: "2106",
      casNumber: "Various",
      chemicalFormula: "Nutraceutical compounds",
      molecularWeight: "Variable",
      purity: "≥98%",
      appearance: "Powder/granules",
      solubility: "Water soluble",
      applications: [
        "Dietary supplements",
        "Functional foods",
        "Health beverages",
        "Nutritional bars",
        "Wellness products"
      ],
      specifications: {
        "Purity": "≥98%",
        "Heavy Metals": "≤10 ppm",
        "Microbiological": "Compliant",
        "Moisture": "≤5%",
        "Particle Size": "80-120 mesh"
      },
      safetyInfo: [
        "Safe for human consumption",
        "GRAS status ingredients",
        "No harmful additives",
        "Quality assured products"
      ],
      packaging: [
        "1 kg aluminum bags",
        "25 kg fiber drums",
        "Custom packaging available",
        "Tamper-evident packaging"
      ],
      storageConditions: "Store in cool, dry place below 25°C",
      shelfLife: "36 months from manufacture",
      certifications: ["GMP Certified", "Organic Certified", "Non-GMO"],
      relatedProducts: [5, 15, 16]
    },
    {
      id: 21,
      name: "Herbal Powders",
      category: "Natural Products",
      subcategory: "Herbal Medicine",
      image: "https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Traditional herbal powders and medicinal plant preparations for therapeutic and wellness applications.",
      featured: false,
      hsCode: "1211",
      casNumber: "Various",
      chemicalFormula: "Herbal compounds",
      molecularWeight: "Variable",
      purity: "≥95%",
      appearance: "Fine powder",
      solubility: "Water extractable",
      applications: [
        "Traditional medicine",
        "Herbal supplements",
        "Ayurvedic preparations",
        "Tea blends",
        "Wellness products"
      ],
      specifications: {
        "Purity": "≥95%",
        "Moisture": "≤10%",
        "Ash Content": "≤15%",
        "Heavy Metals": "≤20 ppm",
        "Microbiological": "Compliant"
      },
      safetyInfo: [
        "Natural herbal ingredients",
        "Traditionally used herbs",
        "Quality tested materials",
        "Safe for consumption"
      ],
      packaging: [
        "1 kg aluminum bags",
        "25 kg fiber drums",
        "Custom herbal packaging",
        "Moisture-proof packaging"
      ],
      storageConditions: "Store in cool, dry place below 25°C",
      shelfLife: "24 months from manufacture",
      certifications: ["Organic Certified", "Ayush Licensed", "GMP Certified"],
      relatedProducts: [16, 17, 20]
    },
    {
      id: 22,
      name: "Flavor Enhancers",
      category: "Flavours & Fragrances",
      subcategory: "Food Flavoring",
      image: "https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Natural and artificial flavor enhancers for food and beverage applications.",
      featured: false,
      hsCode: "3302",
      casNumber: "Various",
      chemicalFormula: "Flavor compounds",
      molecularWeight: "Variable",
      purity: "Food grade",
      appearance: "Liquid/powder",
      solubility: "Water/oil soluble",
      applications: [
        "Food flavoring",
        "Beverage enhancement",
        "Confectionery products",
        "Bakery applications",
        "Snack foods"
      ],
      specifications: {
        "Purity": "Food Grade",
        "Heavy Metals": "≤5 ppm",
        "Arsenic": "≤1 ppm",
        "Lead": "≤2 ppm",
        "Microbiological": "Compliant"
      },
      safetyInfo: [
        "GRAS status ingredients",
        "Safe for food use",
        "No harmful additives",
        "Compliant with food regulations"
      ],
      packaging: [
        "1 kg plastic bottles",
        "25 kg steel drums",
        "Custom food-grade packaging",
        "Tamper-evident containers"
      ],
      storageConditions: "Store at 15-25°C, protect from light",
      shelfLife: "24 months from manufacture",
      certifications: ["FDA Approved", "FEMA GRAS", "Kosher Certified"],
      relatedProducts: [3, 17, 20]
    },
    {
      id: 23,
      name: "Specialty Catalysts",
      category: "Upper Chemicals",
      subcategory: "Catalysts",
      image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "High-performance catalysts for chemical synthesis and industrial processes.",
      featured: false,
      hsCode: "3815",
      casNumber: "Various",
      chemicalFormula: "Catalyst compounds",
      molecularWeight: "Variable",
      purity: "≥99%",
      appearance: "Powder/pellets",
      solubility: "Variable",
      applications: [
        "Chemical synthesis",
        "Polymerization reactions",
        "Pharmaceutical manufacturing",
        "Petrochemical processes",
        "Fine chemical production"
      ],
      specifications: {
        "Purity": "≥99%",
        "Surface Area": "High",
        "Activity": "Excellent",
        "Selectivity": "High",
        "Stability": "Excellent"
      },
      safetyInfo: [
        "Handle under inert atmosphere",
        "Use appropriate PPE",
        "Store in dry conditions",
        "Avoid contamination"
      ],
      packaging: [
        "1 kg aluminum bottles",
        "25 kg steel drums",
        "Custom catalyst packaging",
        "Inert atmosphere packaging"
      ],
      storageConditions: "Store under inert atmosphere, 15-25°C",
      shelfLife: "36 months under proper conditions",
      certifications: ["ISO 9001", "Technical Grade", "Research Grade"],
      relatedProducts: [9, 18, 24]
    },
    {
      id: 24,
      name: "Electronic Chemicals",
      category: "Industrial Products",
      subcategory: "Electronics",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Ultra-pure chemicals for semiconductor and electronic component manufacturing.",
      featured: false,
      hsCode: "3824",
      casNumber: "Various",
      chemicalFormula: "Electronic grade compounds",
      molecularWeight: "Variable",
      purity: "≥99.99%",
      appearance: "Various",
      solubility: "Variable",
      applications: [
        "Semiconductor manufacturing",
        "PCB production",
        "Electronic cleaning",
        "Etching processes",
        "Component fabrication"
      ],
      specifications: {
        "Purity": "≥99.99%",
        "Metal Impurities": "≤1 ppm",
        "Particle Count": "Ultra-low",
        "Water Content": "≤10 ppm",
        "Conductivity": "Ultra-pure"
      },
      safetyInfo: [
        "Handle in cleanroom environment",
        "Use ultra-pure containers",
        "Prevent contamination",
        "Follow semiconductor protocols"
      ],
      packaging: [
        "1 L ultra-pure bottles",
        "25 L containers",
        "Custom cleanroom packaging",
        "Contamination-free packaging"
      ],
      storageConditions: "Store in cleanroom conditions, 15-25°C",
      shelfLife: "12 months from manufacture",
      certifications: ["Electronic Grade", "SEMI Standards", "ISO 14644"],
      relatedProducts: [1, 18, 23]
    },
    {
      id: 25,
      name: "Ceramic Materials",
      category: "Industrial Products",
      subcategory: "Advanced Materials",
      image: "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Advanced ceramic materials and precursors for high-temperature and specialty applications.",
      featured: false,
      hsCode: "6909",
      casNumber: "Various",
      chemicalFormula: "Ceramic compounds",
      molecularWeight: "Variable",
      purity: "≥99%",
      appearance: "Powder",
      solubility: "Insoluble",
      applications: [
        "Advanced ceramics",
        "Refractory materials",
        "Electronic ceramics",
        "Bioceramics",
        "Structural ceramics"
      ],
      specifications: {
        "Purity": "≥99%",
        "Particle Size": "Submicron",
        "Surface Area": "High",
        "Thermal Stability": "Excellent",
        "Chemical Inertness": "High"
      },
      safetyInfo: [
        "Avoid inhalation of dust",
        "Use dust masks",
        "Store in dry conditions",
        "Handle with care"
      ],
      packaging: [
        "25 kg paper bags",
        "500 kg big bags",
        "Custom ceramic packaging",
        "Moisture-proof packaging"
      ],
      storageConditions: "Store in dry place, protect from moisture",
      shelfLife: "Indefinite under proper storage",
      certifications: ["Technical Grade", "ISO 9001", "Advanced Materials"],
      relatedProducts: [8, 23, 24]
    }
  ];

  const product = products.find(p => p.id === parseInt(id || '0'));

  if (!product) {
    return (
      <div className="pt-24 pb-20">
        <div className="container-custom">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
            <Link to="/products" className="btn btn-primary">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      setInquiryForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        quantity: '',
        message: ''
      });
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInquiryForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Info size={18} /> },
    { id: 'specifications', label: 'Specifications', icon: <CheckCircle size={18} /> },
    { id: 'applications', label: 'Applications', icon: <Package size={18} /> },
    { id: 'safety', label: 'Safety & Storage', icon: <Shield size={18} /> }
  ];

  return (
    <div className="pt-24 pb-20">
      {/* Breadcrumb */}
      <section className="bg-gray-50 py-4">
        <div className="container-custom">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/products" className="text-gray-500 hover:text-primary">Products</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-800">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Header */}
      <section className="py-8 bg-white">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-6">
            <Link 
              to="/products" 
              className="flex items-center text-primary hover:text-primary-dark transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Products
            </Link>
            <div className="flex space-x-2">
              <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                <Share2 size={18} />
              </button>
              <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                <Download size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div>
              <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
              </div>
              {product.featured && (
                <div className="flex items-center text-accent font-medium">
                  <Star size={18} className="mr-1 fill-current" />
                  Featured Product
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                <span className="text-primary font-medium">{product.category}</span>
                {product.hsCode && (
                  <div className="text-sm text-gray-600 mt-1">
                    HS Code: {product.hsCode} | CAS NO.: {product.casNumber}
                  </div>
                )}
              </div>
              
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              {product.chemicalFormula && (
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700">Chemical Formula: </span>
                  <span className="text-sm text-gray-600">{product.chemicalFormula}</span>
                </div>
              )}

              <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <CheckCircle size={16} className="text-success mr-2" />
                    <span className="font-medium">Purity</span>
                  </div>
                  <span className="text-sm text-gray-600">{product.purity}</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Package size={16} className="text-primary mr-2" />
                    <span className="font-medium">Appearance</span>
                  </div>
                  <span className="text-sm text-gray-600">{product.appearance}</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Clock size={16} className="text-accent mr-2" />
                    <span className="font-medium">Shelf Life</span>
                  </div>
                  <span className="text-sm text-gray-600">{product.shelfLife}</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Shield size={16} className="text-secondary mr-2" />
                    <span className="font-medium">Certifications</span>
                  </div>
                  <span className="text-sm text-gray-600">{product.certifications.join(', ')}</span>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Need More Information?</h3>
                <p className="text-sm text-gray-600 mb-3">Contact our product specialists for detailed specifications and pricing.</p>
                <div className="flex space-x-3">
                  <a href="tel:+919510691989" className="flex items-center text-primary hover:text-primary-dark">
                    <Phone size={16} className="mr-1" />
                    <span className="text-sm">Call Now</span>
                  </a>
                  <a href="mailto:vinayakenterprise2011@gmail.com" className="flex items-center text-primary hover:text-primary-dark">
                    <Mail size={16} className="mr-1" />
                    <span className="text-sm">Email Us</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold mb-4">General Description</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Basic Properties</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Chemical Formula:</span>
                          <span className="font-medium">{product.chemicalFormula}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Molecular Weight:</span>
                          <span className="font-medium">{product.molecularWeight}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Solubility:</span>
                          <span className="font-medium">{product.solubility}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Product Information</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">HS Code:</span>
                          <span className="font-medium">{product.hsCode}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">CAS Number:</span>
                          <span className="font-medium">{product.casNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Category:</span>
                          <span className="font-medium">{product.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'specifications' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Parameter</th>
                          <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Specification</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <tr key={key}>
                            <td className="border border-gray-300 px-4 py-2 text-gray-600">{key}</td>
                            <td className="border border-gray-300 px-4 py-2 font-medium">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === 'applications' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold mb-4">Applications & Usage</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Primary Applications</h4>
                      <ul className="space-y-2">
                        {product.applications.map((app, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle size={16} className="text-success mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-gray-600">{app}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Packaging Options</h4>
                      <ul className="space-y-2">
                        {product.packaging.map((pack, index) => (
                          <li key={index} className="flex items-start">
                            <Package size={16} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-gray-600">{pack}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'safety' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold mb-4">Safety & Storage Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <AlertTriangle size={18} className="text-warning mr-2" />
                        Safety Precautions
                      </h4>
                      <ul className="space-y-2">
                        {product.safetyInfo.map((info, index) => (
                          <li key={index} className="flex items-start">
                            <Shield size={16} className="text-warning mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-gray-600">{info}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Storage Conditions</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-600 mb-2">{product.storageConditions}</p>
                        <div className="text-sm text-gray-500">
                          <strong>Shelf Life:</strong> {product.shelfLife}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Request Information</h2>
              <p className="text-gray-600">
                Interested in this product? Fill out the form below and our team will get back to you with detailed information and pricing.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle size={48} className="text-success mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                  <p className="text-gray-600">Your inquiry has been submitted successfully. We'll contact you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleInquirySubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={inquiryForm.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={inquiryForm.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={inquiryForm.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={inquiryForm.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Required Quantity
                    </label>
                    <input
                      type="text"
                      name="quantity"
                      value={inquiryForm.quantity}
                      onChange={handleInputChange}
                      placeholder="e.g., 100 kg, 1 ton"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={inquiryForm.message}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Please provide details about your requirements..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full btn btn-primary flex items-center justify-center space-x-2 py-3"
                  >
                    <Send size={18} />
                    <span>Send Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;