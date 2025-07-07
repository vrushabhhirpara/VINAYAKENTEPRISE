import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  image: string;
  description: string;
  featured: boolean;
  chemicalFormula?: string;
  casNumber?: string;
  hsCode?: string;
  purity?: string;
  applications: string[];
  specifications: {
    appearance: string;
    solubility: string;
    meltingPoint?: string;
    boilingPoint?: string;
    density?: string;
    ph?: string;
  };
  packaging: string[];
  safetyInfo: string[];
}

const ProductsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  
  // Comprehensive product catalog with 25 products
  const products: Product[] = [
    {
      id: 1,
      name: "Nonylphenol Ethoxylate",
      category: "Industrial Solvents",
      subcategory: "Surfactants",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Non-ionic surfactant used in industrial cleaning and textile processing.",
      featured: true,
      chemicalFormula: "C15H24O(C2H4O)nH",
      casNumber: "9016-45-9",
      hsCode: "3402.13.00",
      purity: "99%",
      applications: ["Industrial cleaning", "Textile processing", "Paint formulations", "Agricultural chemicals"],
      specifications: {
        appearance: "Clear to pale yellow liquid",
        solubility: "Soluble in water and organic solvents",
        density: "1.02-1.06 g/cm³",
        ph: "6.0-8.0"
      },
      packaging: ["200L drums", "1000L IBC", "Bulk tankers"],
      safetyInfo: ["Wear protective equipment", "Avoid skin contact", "Store in cool, dry place"]
    },
    {
      id: 2,
      name: "Sodium Lauryl Sulfate",
      category: "Personal Care",
      subcategory: "Surfactants",
      image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
      description: "Anionic surfactant widely used in personal care and cleaning products.",
      featured: true,
      chemicalFormula: "C12H25SO4Na",
      casNumber: "151-21-3",
      hsCode: "3402.11.00",
      purity: "95%",
      applications: ["Shampoos", "Toothpaste", "Detergents", "Industrial cleaners"],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Easily soluble in water",
        meltingPoint: "204-207°C",
        ph: "7.0-9.5"
      },
      packaging: ["25kg bags", "500kg big bags", "1000kg big bags"],
      safetyInfo: ["Avoid inhalation", "Use in well-ventilated area", "Keep away from heat"]
    },
    {
      id: 3,
      name: "Citric Acid Monohydrate",
      category: "Food & Nutrition",
      subcategory: "Food Additives",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Natural preservative and flavoring agent for food and beverage industry.",
      featured: true,
      chemicalFormula: "C6H8O7·H2O",
      casNumber: "5949-29-1",
      hsCode: "2918.14.00",
      purity: "99.5%",
      applications: ["Food preservation", "Beverage acidulant", "Pharmaceutical excipient", "Cosmetic formulations"],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Very soluble in water",
        meltingPoint: "153°C",
        ph: "1.85 (0.5% solution)"
      },
      packaging: ["25kg bags", "500kg big bags", "1000kg big bags"],
      safetyInfo: ["Food grade quality", "Store in dry conditions", "Avoid moisture"]
    },
    {
      id: 4,
      name: "Titanium Dioxide",
      category: "Paint, Ink & Coatings",
      subcategory: "Pigments",
      image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
      description: "High-quality white pigment for paints, coatings, and plastic applications.",
      featured: true,
      chemicalFormula: "TiO2",
      casNumber: "13463-67-7",
      hsCode: "3206.11.00",
      purity: "98%",
      applications: ["Paint manufacturing", "Plastic coloring", "Paper coating", "Cosmetic formulations"],
      specifications: {
        appearance: "White powder",
        solubility: "Insoluble in water",
        meltingPoint: "1843°C",
        density: "4.23 g/cm³"
      },
      packaging: ["25kg bags", "500kg big bags", "1000kg big bags"],
      safetyInfo: ["Avoid inhalation of dust", "Use respiratory protection", "Store in dry place"]
    },
    {
      id: 5,
      name: "Calcium Carbonate",
      category: "Cattle & Poultry Feed",
      subcategory: "Feed Additives",
      image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
      description: "Essential calcium supplement for animal nutrition and feed formulations.",
      featured: false,
      chemicalFormula: "CaCO3",
      casNumber: "471-34-1",
      hsCode: "2836.50.00",
      purity: "98.5%",
      applications: ["Animal feed supplement", "Poultry nutrition", "Cattle feed", "Aquaculture"],
      specifications: {
        appearance: "White powder",
        solubility: "Slightly soluble in water",
        density: "2.71 g/cm³",
        ph: "8.0-10.0"
      },
      packaging: ["25kg bags", "500kg big bags", "1000kg big bags"],
      safetyInfo: ["Feed grade quality", "Store in dry conditions", "Avoid contamination"]
    },
    {
      id: 6,
      name: "Polyethylene Glycol 400",
      category: "Personal Care",
      subcategory: "Solvents",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Versatile solvent and humectant for pharmaceutical and cosmetic applications.",
      featured: false,
      chemicalFormula: "H(OCH2CH2)nOH",
      casNumber: "25322-68-3",
      hsCode: "3907.20.00",
      purity: "99%",
      applications: ["Pharmaceutical formulations", "Cosmetic products", "Industrial solvents", "Food additives"],
      specifications: {
        appearance: "Clear, colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "250°C",
        density: "1.13 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC", "Bulk tankers"],
      safetyInfo: ["Generally recognized as safe", "Avoid prolonged skin contact", "Store at room temperature"]
    },
    {
      id: 7,
      name: "Sodium Hydroxide",
      category: "Industrial Solvents",
      subcategory: "Alkalis",
      image: "https://jkmchemtrade.com/upload/categories/4471230925113924.jpg",
      description: "Strong alkali used in various industrial processes and water treatment.",
      featured: false,
      chemicalFormula: "NaOH",
      casNumber: "1310-73-2",
      hsCode: "2815.11.00",
      purity: "99%",
      applications: ["Water treatment", "Soap manufacturing", "Paper production", "Chemical processing"],
      specifications: {
        appearance: "White solid pellets",
        solubility: "Highly soluble in water",
        meltingPoint: "318°C",
        density: "2.13 g/cm³"
      },
      packaging: ["25kg bags", "500kg big bags", "1000kg big bags"],
      safetyInfo: ["Highly corrosive", "Wear protective equipment", "Avoid contact with skin and eyes"]
    },
    {
      id: 8,
      name: "Acetic Acid",
      category: "Food & Nutrition",
      subcategory: "Preservatives",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Food-grade acetic acid for preservation and flavoring applications.",
      featured: false,
      chemicalFormula: "CH3COOH",
      casNumber: "64-19-7",
      hsCode: "2915.21.00",
      purity: "99.5%",
      applications: ["Food preservation", "Vinegar production", "Chemical synthesis", "Textile processing"],
      specifications: {
        appearance: "Clear, colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "118°C",
        density: "1.05 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC", "Bulk tankers"],
      safetyInfo: ["Corrosive liquid", "Use in ventilated area", "Avoid inhalation of vapors"]
    },
    {
      id: 9,
      name: "Iron Oxide Red",
      category: "Paint, Ink & Coatings",
      subcategory: "Pigments",
      image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
      description: "High-quality red iron oxide pigment for paints and coatings.",
      featured: false,
      chemicalFormula: "Fe2O3",
      casNumber: "1309-37-1",
      hsCode: "2821.10.00",
      purity: "95%",
      applications: ["Paint coloring", "Concrete coloring", "Plastic pigmentation", "Ceramic glazes"],
      specifications: {
        appearance: "Red powder",
        solubility: "Insoluble in water",
        meltingPoint: "1565°C",
        density: "5.24 g/cm³"
      },
      packaging: ["25kg bags", "500kg big bags", "1000kg big bags"],
      safetyInfo: ["Avoid inhalation of dust", "Use dust mask", "Store in dry place"]
    },
    {
      id: 10,
      name: "Potassium Sorbate",
      category: "Food & Nutrition",
      subcategory: "Preservatives",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Effective food preservative with antimicrobial properties.",
      featured: false,
      chemicalFormula: "C6H7KO2",
      casNumber: "24634-61-5",
      hsCode: "2916.19.00",
      purity: "99%",
      applications: ["Food preservation", "Beverage preservation", "Cosmetic preservation", "Wine making"],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Soluble in water",
        meltingPoint: "270°C",
        ph: "7.0-8.5"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Food grade quality", "Store in cool, dry place", "Avoid moisture"]
    },
    {
      id: 11,
      name: "Glycerin",
      category: "Personal Care",
      subcategory: "Humectants",
      image: "https://5.imimg.com/data5/SELLER/Default/2023/10/351523658/UT/NP/JG/143402947/homecare-products.jpg",
      description: "Pure glycerin for cosmetic, pharmaceutical, and food applications.",
      featured: false,
      chemicalFormula: "C3H8O3",
      casNumber: "56-81-5",
      hsCode: "2905.45.00",
      purity: "99.5%",
      applications: ["Cosmetic formulations", "Pharmaceutical products", "Food additive", "Industrial applications"],
      specifications: {
        appearance: "Clear, colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "290°C",
        density: "1.26 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC", "Bulk tankers"],
      safetyInfo: ["Generally recognized as safe", "Store at room temperature", "Avoid contamination"]
    },
    {
      id: 12,
      name: "Sodium Bicarbonate",
      category: "Food & Nutrition",
      subcategory: "Leavening Agents",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Food-grade sodium bicarbonate for baking and food processing.",
      featured: false,
      chemicalFormula: "NaHCO3",
      casNumber: "144-55-8",
      hsCode: "2836.30.00",
      purity: "99.2%",
      applications: ["Baking powder", "Food processing", "Pharmaceutical formulations", "Industrial cleaning"],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Soluble in water",
        density: "2.20 g/cm³",
        ph: "8.3 (1% solution)"
      },
      packaging: ["25kg bags", "500kg big bags", "1000kg big bags"],
      safetyInfo: ["Food grade quality", "Store in dry conditions", "Avoid moisture"]
    },
    {
      id: 13,
      name: "Xanthan Gum",
      category: "Food & Nutrition",
      subcategory: "Thickeners",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Natural thickening and stabilizing agent for food applications.",
      featured: false,
      chemicalFormula: "C35H49O29",
      casNumber: "11138-66-2",
      hsCode: "3913.90.00",
      purity: "99%",
      applications: ["Food thickening", "Sauce stabilization", "Gluten-free baking", "Cosmetic formulations"],
      specifications: {
        appearance: "Cream to white powder",
        solubility: "Soluble in water",
        ph: "6.0-8.0",
        density: "1.5 g/cm³"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Food grade quality", "Avoid inhalation of dust", "Store in dry place"]
    },
    {
      id: 14,
      name: "Zinc Oxide",
      category: "Personal Care",
      subcategory: "UV Filters",
      image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
      description: "High-quality zinc oxide for sunscreen and cosmetic applications.",
      featured: false,
      chemicalFormula: "ZnO",
      casNumber: "1314-13-2",
      hsCode: "2817.00.00",
      purity: "99%",
      applications: ["Sunscreen formulations", "Cosmetic products", "Pharmaceutical ointments", "Paint additives"],
      specifications: {
        appearance: "White powder",
        solubility: "Insoluble in water",
        meltingPoint: "1975°C",
        density: "5.61 g/cm³"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Avoid inhalation of dust", "Use respiratory protection", "Store in dry place"]
    },
    {
      id: 15,
      name: "Sodium Chloride",
      category: "Food & Nutrition",
      subcategory: "Salts",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "High-purity sodium chloride for food and industrial applications.",
      featured: false,
      chemicalFormula: "NaCl",
      casNumber: "7647-14-5",
      hsCode: "2501.00.00",
      purity: "99.5%",
      applications: ["Food seasoning", "Food preservation", "Chemical processing", "Water treatment"],
      specifications: {
        appearance: "White crystalline solid",
        solubility: "Highly soluble in water",
        meltingPoint: "801°C",
        density: "2.16 g/cm³"
      },
      packaging: ["25kg bags", "500kg big bags", "1000kg big bags"],
      safetyInfo: ["Food grade quality", "Store in dry conditions", "Avoid contamination"]
    },
    {
      id: 16,
      name: "Calcium Chloride",
      category: "Industrial Solvents",
      subcategory: "Desiccants",
      image: "https://jkmchemtrade.com/upload/categories/4471230925113924.jpg",
      description: "Hygroscopic salt used for drying and de-icing applications.",
      featured: false,
      chemicalFormula: "CaCl2",
      casNumber: "10043-52-4",
      hsCode: "2827.20.00",
      purity: "94%",
      applications: ["Desiccant", "De-icing agent", "Concrete accelerator", "Food additive"],
      specifications: {
        appearance: "White granules",
        solubility: "Highly soluble in water",
        meltingPoint: "772°C",
        density: "2.15 g/cm³"
      },
      packaging: ["25kg bags", "500kg big bags", "1000kg big bags"],
      safetyInfo: ["Hygroscopic material", "Store in dry place", "Avoid skin contact"]
    },
    {
      id: 17,
      name: "Magnesium Sulfate",
      category: "Cattle & Poultry Feed",
      subcategory: "Mineral Supplements",
      image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
      description: "Essential magnesium supplement for animal nutrition and agriculture.",
      featured: false,
      chemicalFormula: "MgSO4·7H2O",
      casNumber: "10034-99-8",
      hsCode: "2833.21.00",
      purity: "99%",
      applications: ["Animal feed supplement", "Fertilizer", "Pharmaceutical applications", "Industrial processes"],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Soluble in water",
        density: "1.68 g/cm³",
        ph: "5.5-7.0"
      },
      packaging: ["25kg bags", "500kg big bags", "1000kg big bags"],
      safetyInfo: ["Feed grade quality", "Store in dry conditions", "Avoid moisture"]
    },
    {
      id: 18,
      name: "Hydrogen Peroxide",
      category: "Industrial Solvents",
      subcategory: "Oxidizing Agents",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Versatile oxidizing agent for bleaching and disinfection applications.",
      featured: false,
      chemicalFormula: "H2O2",
      casNumber: "7722-84-1",
      hsCode: "2847.00.00",
      purity: "35%",
      applications: ["Bleaching agent", "Disinfectant", "Water treatment", "Chemical synthesis"],
      specifications: {
        appearance: "Clear, colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "150°C",
        density: "1.13 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC"],
      safetyInfo: ["Strong oxidizer", "Wear protective equipment", "Store in cool place"]
    },
    {
      id: 19,
      name: "Potassium Hydroxide",
      category: "Industrial Solvents",
      subcategory: "Alkalis",
      image: "https://jkmchemtrade.com/upload/categories/4471230925113924.jpg",
      description: "Strong alkali for soap manufacturing and chemical processing.",
      featured: false,
      chemicalFormula: "KOH",
      casNumber: "1310-58-3",
      hsCode: "2815.20.00",
      purity: "90%",
      applications: ["Soap manufacturing", "Biodiesel production", "Chemical processing", "Battery electrolyte"],
      specifications: {
        appearance: "White solid flakes",
        solubility: "Highly soluble in water",
        meltingPoint: "406°C",
        density: "2.04 g/cm³"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Highly corrosive", "Wear protective equipment", "Avoid contact with skin"]
    },
    {
      id: 20,
      name: "Ascorbic Acid",
      category: "Food & Nutrition",
      subcategory: "Vitamins",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Vitamin C for food fortification and antioxidant applications.",
      featured: false,
      chemicalFormula: "C6H8O6",
      casNumber: "50-81-7",
      hsCode: "2936.27.00",
      purity: "99%",
      applications: ["Food fortification", "Antioxidant", "Pharmaceutical formulations", "Cosmetic products"],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Soluble in water",
        meltingPoint: "190°C",
        ph: "2.1-2.6"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Food grade quality", "Store in cool, dry place", "Protect from light"]
    },
    {
      id: 21,
      name: "Silica Gel",
      category: "Industrial Solvents",
      subcategory: "Desiccants",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "High-capacity desiccant for moisture control applications.",
      featured: false,
      chemicalFormula: "SiO2",
      casNumber: "112926-00-8",
      hsCode: "3824.99.00",
      purity: "99%",
      applications: ["Moisture control", "Chromatography", "Catalyst support", "Packaging protection"],
      specifications: {
        appearance: "White granules",
        solubility: "Insoluble in water",
        density: "0.7-0.8 g/cm³",
        ph: "6.0-7.0"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Avoid inhalation of dust", "Use dust mask", "Store in dry place"]
    },
    {
      id: 22,
      name: "Sodium Benzoate",
      category: "Food & Nutrition",
      subcategory: "Preservatives",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Effective antimicrobial preservative for food and beverages.",
      featured: false,
      chemicalFormula: "C7H5NaO2",
      casNumber: "532-32-1",
      hsCode: "2916.31.00",
      purity: "99%",
      applications: ["Food preservation", "Beverage preservation", "Cosmetic preservation", "Pharmaceutical formulations"],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Soluble in water",
        meltingPoint: "410°C",
        ph: "7.0-8.5"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Food grade quality", "Store in dry conditions", "Avoid moisture"]
    },
    {
      id: 23,
      name: "Calcium Propionate",
      category: "Food & Nutrition",
      subcategory: "Preservatives",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Mold inhibitor for baked goods and food preservation.",
      featured: false,
      chemicalFormula: "Ca(C2H5COO)2",
      casNumber: "4075-81-4",
      hsCode: "2915.50.00",
      purity: "99%",
      applications: ["Bread preservation", "Baked goods", "Animal feed", "Pharmaceutical applications"],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Soluble in water",
        ph: "7.5-10.5",
        density: "1.5 g/cm³"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Food grade quality", "Store in dry place", "Avoid contamination"]
    },
    {
      id: 24,
      name: "Phosphoric Acid",
      category: "Industrial Solvents",
      subcategory: "Acids",
      image: "https://jkmchemtrade.com/upload/categories/4471230925113924.jpg",
      description: "Multi-purpose acid for food, pharmaceutical, and industrial applications.",
      featured: false,
      chemicalFormula: "H3PO4",
      casNumber: "7664-38-2",
      hsCode: "2809.20.00",
      purity: "85%",
      applications: ["Food acidulant", "Metal treatment", "Fertilizer production", "Water treatment"],
      specifications: {
        appearance: "Clear, colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "158°C",
        density: "1.69 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC", "Bulk tankers"],
      safetyInfo: ["Corrosive acid", "Wear protective equipment", "Use in ventilated area"]
    },
    {
      id: 25,
      name: "Dicalcium Phosphate",
      category: "Cattle & Poultry Feed",
      subcategory: "Mineral Supplements",
      image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
      description: "Essential calcium and phosphorus supplement for animal nutrition.",
      featured: false,
      chemicalFormula: "CaHPO4",
      casNumber: "7757-93-9",
      hsCode: "2835.25.00",
      purity: "98%",
      applications: ["Animal feed supplement", "Poultry nutrition", "Cattle feed", "Pharmaceutical tablets"],
      specifications: {
        appearance: "White powder",
        solubility: "Slightly soluble in water",
        density: "2.92 g/cm³",
        ph: "7.0-9.0"
      },
      packaging: ["25kg bags", "500kg big bags", "1000kg big bags"],
      safetyInfo: ["Feed grade quality", "Store in dry conditions", "Avoid contamination"]
    }
  ];
  
  const categories = [
    "All",
    "Cattle & Poultry Feed",
    "Personal Care",
    "Food & Nutrition",
    "Paint, Ink & Coatings",
    "Industrial Solvents"
  ];
  
  // Filter products based on selected category and search query
  useEffect(() => {
    let filtered = products;
    
    if (activeCategory !== "All") {
      filtered = filtered.filter((product) => product.category === activeCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.subcategory.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(filtered);
  }, [activeCategory, searchQuery]);
  
  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Chemical Products
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl opacity-90 mb-8"
            >
              Browse our extensive range of 25+ high-quality chemical products designed for various industrial applications.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile filter toggle */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
              >
                <span className="flex items-center">
                  <Filter size={18} className="mr-2" />
                  Filter Products
                </span>
                {isFilterOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
            </div>
            
            {/* Sidebar with categories */}
            <div className={`lg:w-1/4 ${isFilterOpen ? 'block' : 'hidden'} lg:block`}>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-lg font-semibold mb-4 border-b pb-2">Product Categories</h3>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        activeCategory === category
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Main content */}
            <div className="lg:w-3/4">
              {/* Search and filters */}
              <div className="bg-white rounded-lg shadow-md p-4 mb-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
              
              {/* Products grid */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">
                    {activeCategory === "All" ? "All Products" : activeCategory}
                  </h2>
                  <span className="text-gray-600">
                    {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                  </span>
                </div>
                
                {filteredProducts.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <p className="text-lg text-gray-600">No products found matching your criteria.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary/90 to-secondary/90 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Need a Custom Chemical Solution?</h2>
            <p className="text-xl opacity-90 mb-8">
              Our team of experts can develop tailored formulations to meet your specific requirements.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/contact" className="btn bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-md">
                Contact Our Team
              </Link>
              <Link to="/services" className="btn bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3 rounded-md">
                Learn About Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ProductCard: React.FC<{
  product: {
    id: number;
    name: string;
    category: string;
    subcategory: string;
    image: string;
    description: string;
    featured: boolean;
    chemicalFormula?: string;
    casNumber?: string;
    hsCode?: string;
    purity?: string;
    applications: string[];
    specifications: {
      appearance: string;
      solubility: string;
      meltingPoint?: string;
      boilingPoint?: string;
      density?: string;
      ph?: string;
    };
    packaging: string[];
    safetyInfo: string[];
  };
}> = ({ product }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm text-primary font-medium">{product.category}</span>
          {product.featured && (
            <span className="bg-accent/10 text-accent text-xs px-2 py-1 rounded-full font-medium">
              Featured
            </span>
          )}
        </div>
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2 text-sm">{product.subcategory}</p>
        <p className="text-gray-600 mb-4">{product.description}</p>
        
        {/* Quick specs */}
        <div className="mb-4 space-y-1">
          {product.chemicalFormula && (
            <p className="text-sm text-gray-500">
              <span className="font-medium">Formula:</span> {product.chemicalFormula}
            </p>
          )}
          {product.purity && (
            <p className="text-sm text-gray-500">
              <span className="font-medium">Purity:</span> {product.purity}
            </p>
          )}
        </div>
        
        <Link 
          to={`/products/${product.id}`} 
          className="text-primary font-medium inline-flex items-center hover:underline"
        >
          View Details
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductsPage;