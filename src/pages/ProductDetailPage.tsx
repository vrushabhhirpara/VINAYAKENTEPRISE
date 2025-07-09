import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, Truck, Award, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

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

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // All products with 20 products per category
  const allProducts: Product[] = [
    // Industrial Solvents (20 products)
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
      id: 101,
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
      id: 102,
      name: "Methanol",
      category: "Industrial Solvents",
      subcategory: "Alcohols",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Versatile industrial solvent and chemical intermediate.",
      featured: false,
      chemicalFormula: "CH3OH",
      casNumber: "67-56-1",
      hsCode: "2905.11.00",
      purity: "99.9%",
      applications: ["Solvent", "Fuel additive", "Chemical synthesis", "Antifreeze"],
      specifications: {
        appearance: "Clear colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "64.7°C",
        density: "0.792 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC", "Bulk tankers"],
      safetyInfo: ["Highly flammable", "Toxic if ingested", "Use in ventilated area"]
    },
    {
      id: 103,
      name: "Ethanol",
      category: "Industrial Solvents",
      subcategory: "Alcohols",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "High-purity ethanol for industrial and pharmaceutical applications.",
      featured: false,
      chemicalFormula: "C2H5OH",
      casNumber: "64-17-5",
      hsCode: "2207.10.00",
      purity: "99.5%",
      applications: ["Solvent", "Disinfectant", "Chemical intermediate", "Fuel additive"],
      specifications: {
        appearance: "Clear colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "78.4°C",
        density: "0.789 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC", "Bulk tankers"],
      safetyInfo: ["Flammable", "Keep away from heat", "Use proper ventilation"]
    },
    {
      id: 104,
      name: "Isopropanol",
      category: "Industrial Solvents",
      subcategory: "Alcohols",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Versatile cleaning solvent and disinfectant.",
      featured: false,
      chemicalFormula: "C3H8O",
      casNumber: "67-63-0",
      hsCode: "2905.12.00",
      purity: "99%",
      applications: ["Cleaning agent", "Disinfectant", "Solvent", "Dehydrating agent"],
      specifications: {
        appearance: "Clear colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "82.6°C",
        density: "0.786 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC", "25L cans"],
      safetyInfo: ["Flammable", "Avoid inhalation", "Keep container closed"]
    },
    {
      id: 105,
      name: "Acetone",
      category: "Industrial Solvents",
      subcategory: "Ketones",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Fast-evaporating solvent for industrial applications.",
      featured: false,
      chemicalFormula: "C3H6O",
      casNumber: "67-64-1",
      hsCode: "2914.11.00",
      purity: "99.5%",
      applications: ["Paint thinner", "Cleaning solvent", "Chemical intermediate", "Nail polish remover"],
      specifications: {
        appearance: "Clear colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "56.1°C",
        density: "0.784 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC", "25L cans"],
      safetyInfo: ["Highly flammable", "Use with adequate ventilation", "Keep away from ignition sources"]
    },
    {
      id: 106,
      name: "Toluene",
      category: "Industrial Solvents",
      subcategory: "Aromatics",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Aromatic solvent for paints, coatings, and adhesives.",
      featured: false,
      chemicalFormula: "C7H8",
      casNumber: "108-88-3",
      hsCode: "2902.30.00",
      purity: "99%",
      applications: ["Paint solvent", "Adhesive production", "Chemical synthesis", "Fuel additive"],
      specifications: {
        appearance: "Clear colorless liquid",
        solubility: "Insoluble in water",
        boilingPoint: "110.6°C",
        density: "0.867 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC", "Bulk tankers"],
      safetyInfo: ["Flammable", "Avoid prolonged inhalation", "Use respiratory protection"]
    },
    {
      id: 107,
      name: "Xylene",
      category: "Industrial Solvents",
      subcategory: "Aromatics",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Mixed xylene isomers for industrial solvent applications.",
      featured: false,
      chemicalFormula: "C8H10",
      casNumber: "1330-20-7",
      hsCode: "2902.41.00",
      purity: "98%",
      applications: ["Paint thinner", "Printing inks", "Rubber production", "Leather processing"],
      specifications: {
        appearance: "Clear colorless liquid",
        solubility: "Insoluble in water",
        boilingPoint: "138-144°C",
        density: "0.864 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC", "Bulk tankers"],
      safetyInfo: ["Flammable", "Harmful if inhaled", "Use in well-ventilated area"]
    },
    {
      id: 108,
      name: "Benzene",
      category: "Industrial Solvents",
      subcategory: "Aromatics",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "High-purity benzene for chemical synthesis.",
      featured: false,
      chemicalFormula: "C6H6",
      casNumber: "71-43-2",
      hsCode: "2902.20.00",
      purity: "99.9%",
      applications: ["Chemical intermediate", "Solvent", "Fuel component", "Pharmaceutical synthesis"],
      specifications: {
        appearance: "Clear colorless liquid",
        solubility: "Slightly soluble in water",
        boilingPoint: "80.1°C",
        density: "0.879 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC", "Bulk tankers"],
      safetyInfo: ["Carcinogenic", "Highly regulated", "Requires special handling"]
    },
    {
      id: 109,
      name: "Dichloromethane",
      category: "Industrial Solvents",
      subcategory: "Chlorinated Solvents",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Versatile chlorinated solvent for various applications.",
      featured: false,
      chemicalFormula: "CH2Cl2",
      casNumber: "75-09-2",
      hsCode: "2903.12.00",
      purity: "99.5%",
      applications: ["Paint stripper", "Degreasing agent", "Extraction solvent", "Aerosol propellant"],
      specifications: {
        appearance: "Clear colorless liquid",
        solubility: "Slightly soluble in water",
        boilingPoint: "39.6°C",
        density: "1.33 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC", "25L cans"],
      safetyInfo: ["Suspected carcinogen", "Use with extreme caution", "Adequate ventilation required"]
    },
    {
      id: 110,
      name: "Ethyl Acetate",
      category: "Industrial Solvents",
      subcategory: "Esters",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Fast-drying solvent for coatings and adhesives.",
      featured: false,
      chemicalFormula: "C4H8O2",
      casNumber: "141-78-6",
      hsCode: "2915.31.00",
      purity: "99%",
      applications: ["Paint solvent", "Nail polish", "Glue solvent", "Extraction medium"],
      specifications: {
        appearance: "Clear colorless liquid",
        solubility: "Moderately soluble in water",
        boilingPoint: "77.1°C",
        density: "0.902 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC", "25L cans"],
      safetyInfo: ["Flammable", "May cause drowsiness", "Use adequate ventilation"]
    },
    {
      id: 111,
      name: "Butyl Acetate",
      category: "Industrial Solvents",
      subcategory: "Esters",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Slow-evaporating solvent for high-quality finishes.",
      featured: false,
      chemicalFormula: "C6H12O2",
      casNumber: "123-86-4",
      hsCode: "2915.33.00",
      purity: "99%",
      applications: ["Lacquer solvent", "Paint thinner", "Printing inks", "Adhesives"],
      specifications: {
        appearance: "Clear colorless liquid",
        solubility: "Slightly soluble in water",
        boilingPoint: "126.1°C",
        density: "0.882 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC", "25L cans"],
      safetyInfo: ["Flammable", "Avoid prolonged skin contact", "Use in ventilated area"]
    },
    {
      id: 112,
      name: "Cyclohexane",
      category: "Industrial Solvents",
      subcategory: "Aliphatics",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Cyclic hydrocarbon solvent for various applications.",
      featured: false,
      chemicalFormula: "C6H12",
      casNumber: "110-82-7",
      hsCode: "2902.11.00",
      purity: "99%",
      applications: ["Paint thinner", "Rubber cement", "Extraction solvent", "Chemical intermediate"],
      specifications: {
        appearance: "Clear colorless liquid",
        solubility: "Insoluble in water",
        boilingPoint: "80.7°C",
        density: "0.779 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC", "Bulk tankers"],
      safetyInfo: ["Highly flammable", "Harmful if inhaled", "Keep away from heat sources"]
    },
    {
      id: 113,
      name: "Hexane",
      category: "Industrial Solvents",
      subcategory: "Aliphatics",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Linear hydrocarbon solvent for extraction processes.",
      featured: false,
      chemicalFormula: "C6H14",
      casNumber: "110-54-3",
      hsCode: "2901.10.00",
      purity: "95%",
      applications: ["Oil extraction", "Cleaning agent", "Adhesive production", "Laboratory reagent"],
      specifications: {
        appearance: "Clear colorless liquid",
        solubility: "Insoluble in water",
        boilingPoint: "68.7°C",
        density: "0.659 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC", "25L cans"],
      safetyInfo: ["Extremely flammable", "Neurotoxic", "Use with extreme caution"]
    },
    {
      id: 114,
      name: "Heptane",
      category: "Industrial Solvents",
      subcategory: "Aliphatics",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Straight-chain alkane solvent for specialized applications.",
      featured: false,
      chemicalFormula: "C7H16",
      casNumber: "142-82-5",
      hsCode: "2901.10.00",
      purity: "99%",
      applications: ["Laboratory standard", "Extraction solvent", "Fuel component", "Chemical synthesis"],
      specifications: {
        appearance: "Clear colorless liquid",
        solubility: "Insoluble in water",
        boilingPoint: "98.4°C",
        density: "0.684 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC", "25L cans"],
      safetyInfo: ["Flammable", "Avoid inhalation", "Store in cool place"]
    },
    {
      id: 115,
      name: "White Spirit",
      category: "Industrial Solvents",
      subcategory: "Petroleum Solvents",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Petroleum-derived solvent for paints and coatings.",
      featured: false,
      chemicalFormula: "Mixed hydrocarbons",
      casNumber: "8052-41-3",
      hsCode: "2710.12.00",
      purity: "98%",
      applications: ["Paint thinner", "Degreasing", "Dry cleaning", "Metal cleaning"],
      specifications: {
        appearance: "Clear colorless liquid",
        solubility: "Insoluble in water",
        boilingPoint: "150-200°C",
        density: "0.76-0.78 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC", "20L cans"],
      safetyInfo: ["Flammable", "Avoid prolonged skin contact", "Use adequate ventilation"]
    },
    {
      id: 116,
      name: "Turpentine",
      category: "Industrial Solvents",
      subcategory: "Natural Solvents",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Natural solvent derived from pine resin.",
      featured: false,
      chemicalFormula: "C10H16",
      casNumber: "8006-64-2",
      hsCode: "3805.10.00",
      purity: "95%",
      applications: ["Paint thinner", "Varnish solvent", "Cleaning agent", "Art supplies"],
      specifications: {
        appearance: "Clear to pale yellow liquid",
        solubility: "Insoluble in water",
        boilingPoint: "150-180°C",
        density: "0.86-0.87 g/cm³"
      },
      packaging: ["200L drums", "20L cans", "5L bottles"],
      safetyInfo: ["Flammable", "May cause skin irritation", "Natural but still hazardous"]
    },
    {
      id: 117,
      name: "Diethyl Ether",
      category: "Industrial Solvents",
      subcategory: "Ethers",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Highly volatile ether for extraction and synthesis.",
      featured: false,
      chemicalFormula: "C4H10O",
      casNumber: "60-29-7",
      hsCode: "2909.11.00",
      purity: "99.5%",
      applications: ["Extraction solvent", "Laboratory reagent", "Chemical synthesis", "Anesthetic (historical)"],
      specifications: {
        appearance: "Clear colorless liquid",
        solubility: "Slightly soluble in water",
        boilingPoint: "34.6°C",
        density: "0.713 g/cm³"
      },
      packaging: ["200L drums", "25L cans", "1L bottles"],
      safetyInfo: ["Extremely flammable", "Forms explosive peroxides", "Requires special storage"]
    },
    {
      id: 118,
      name: "Tetrahydrofuran",
      category: "Industrial Solvents",
      subcategory: "Ethers",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Cyclic ether solvent for polymer applications.",
      featured: false,
      chemicalFormula: "C4H8O",
      casNumber: "109-99-9",
      hsCode: "2932.20.00",
      purity: "99%",
      applications: ["Polymer solvent", "Chemical synthesis", "Extraction medium", "Reaction solvent"],
      specifications: {
        appearance: "Clear colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "66°C",
        density: "0.889 g/cm³"
      },
      packaging: ["200L drums", "25L cans", "1L bottles"],
      safetyInfo: ["Highly flammable", "Forms peroxides", "Use stabilized grade"]
    },
    {
      id: 119,
      name: "Dimethylformamide",
      category: "Industrial Solvents",
      subcategory: "Amides",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Polar aprotic solvent for chemical reactions.",
      featured: false,
      chemicalFormula: "C3H7NO",
      casNumber: "68-12-2",
      hsCode: "2924.12.00",
      purity: "99.8%",
      applications: ["Reaction solvent", "Polymer production", "Pharmaceutical synthesis", "Electronics cleaning"],
      specifications: {
        appearance: "Clear colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "153°C",
        density: "0.944 g/cm³"
      },
      packaging: ["200L drums", "25L cans", "1L bottles"],
      safetyInfo: ["Suspected carcinogen", "Readily absorbed through skin", "Use with extreme caution"]
    },
    {
      id: 120,
      name: "Dimethyl Sulfoxide",
      category: "Industrial Solvents",
      subcategory: "Sulfur Compounds",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Highly polar solvent with unique properties.",
      featured: false,
      chemicalFormula: "C2H6OS",
      casNumber: "67-68-5",
      hsCode: "2930.90.00",
      purity: "99.9%",
      applications: ["Reaction solvent", "Cryoprotectant", "Pharmaceutical applications", "Electronics industry"],
      specifications: {
        appearance: "Clear colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "189°C",
        density: "1.092 g/cm³"
      },
      packaging: ["200L drums", "25L cans", "1L bottles"],
      safetyInfo: ["Penetrates skin rapidly", "Generally low toxicity", "Store away from light"]
    },

    // Personal Care (20 products)
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
      id: 201,
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
      id: 202,
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
      id: 203,
      name: "Cetyl Alcohol",
      category: "Personal Care",
      subcategory: "Fatty Alcohols",
      image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
      description: "Fatty alcohol used as emulsifier and thickener in cosmetics.",
      featured: false,
      chemicalFormula: "C16H34O",
      casNumber: "36653-82-4",
      hsCode: "2905.17.00",
      purity: "95%",
      applications: ["Cosmetic emulsifier", "Hair conditioner", "Skin cream", "Lotion thickener"],
      specifications: {
        appearance: "White waxy solid",
        solubility: "Insoluble in water",
        meltingPoint: "49-51°C",
        density: "0.811 g/cm³"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Generally safe for cosmetic use", "Avoid inhalation of dust", "Store in cool place"]
    },
    {
      id: 204,
      name: "Stearyl Alcohol",
      category: "Personal Care",
      subcategory: "Fatty Alcohols",
      image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
      description: "Long-chain fatty alcohol for cosmetic formulations.",
      featured: false,
      chemicalFormula: "C18H38O",
      casNumber: "112-92-5",
      hsCode: "2905.17.00",
      purity: "95%",
      applications: ["Cosmetic thickener", "Emulsion stabilizer", "Hair care products", "Skin moisturizers"],
      specifications: {
        appearance: "White waxy flakes",
        solubility: "Insoluble in water",
        meltingPoint: "58-60°C",
        density: "0.812 g/cm³"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Safe for cosmetic use", "Non-irritating to skin", "Store in dry conditions"]
    },
    {
      id: 205,
      name: "Cocamidopropyl Betaine",
      category: "Personal Care",
      subcategory: "Surfactants",
      image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
      description: "Mild amphoteric surfactant for gentle cleansing products.",
      featured: false,
      chemicalFormula: "C19H38N2O3",
      casNumber: "61789-40-0",
      hsCode: "3402.13.00",
      purity: "30% active",
      applications: ["Baby shampoo", "Facial cleansers", "Body wash", "Mild detergents"],
      specifications: {
        appearance: "Clear to pale yellow liquid",
        solubility: "Soluble in water",
        ph: "4.5-6.5",
        density: "1.04 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC"],
      safetyInfo: ["Very mild surfactant", "Low irritation potential", "Store at room temperature"]
    },
    {
      id: 206,
      name: "Sodium Laureth Sulfate",
      category: "Personal Care",
      subcategory: "Surfactants",
      image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
      description: "Milder alternative to SLS for personal care products.",
      featured: false,
      chemicalFormula: "C12H25(OCH2CH2)nOSO3Na",
      casNumber: "68585-34-2",
      hsCode: "3402.13.00",
      purity: "70% active",
      applications: ["Shampoos", "Body wash", "Facial cleansers", "Bubble bath"],
      specifications: {
        appearance: "Clear to pale yellow liquid",
        solubility: "Soluble in water",
        ph: "6.5-8.5",
        density: "1.03 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC"],
      safetyInfo: ["Milder than SLS", "Low skin irritation", "Biodegradable"]
    },
    {
      id: 207,
      name: "Propylene Glycol",
      category: "Personal Care",
      subcategory: "Solvents",
      image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
      description: "Versatile solvent and humectant for cosmetic applications.",
      featured: false,
      chemicalFormula: "C3H8O2",
      casNumber: "57-55-6",
      hsCode: "2905.32.00",
      purity: "99.5%",
      applications: ["Cosmetic solvent", "Humectant", "Antifreeze", "Food additive"],
      specifications: {
        appearance: "Clear colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "188.2°C",
        density: "1.036 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC"],
      safetyInfo: ["Generally recognized as safe", "Low toxicity", "Food grade available"]
    },
    {
      id: 208,
      name: "Butylene Glycol",
      category: "Personal Care",
      subcategory: "Solvents",
      image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
      description: "Multifunctional ingredient for skincare formulations.",
      featured: false,
      chemicalFormula: "C4H10O2",
      casNumber: "107-88-0",
      hsCode: "2905.39.00",
      purity: "99%",
      applications: ["Skincare products", "Cosmetic solvent", "Humectant", "Preservative booster"],
      specifications: {
        appearance: "Clear colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "230°C",
        density: "1.005 g/cm³"
      },
      packaging: ["200L drums", "25L cans"],
      safetyInfo: ["Safe for cosmetic use", "Non-comedogenic", "Well tolerated by skin"]
    },
    {
      id: 209,
      name: "Hyaluronic Acid",
      category: "Personal Care",
      subcategory: "Active Ingredients",
      image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
      description: "High molecular weight humectant for anti-aging products.",
      featured: false,
      chemicalFormula: "(C14H21NO11)n",
      casNumber: "9067-32-7",
      hsCode: "3913.90.00",
      purity: "95%",
      applications: ["Anti-aging serums", "Moisturizers", "Injectable fillers", "Eye creams"],
      specifications: {
        appearance: "White powder",
        solubility: "Soluble in water",
        ph: "6.0-7.5",
        density: "1.2 g/cm³"
      },
      packaging: ["1kg containers", "5kg containers"],
      safetyInfo: ["Biocompatible", "Non-toxic", "Store in dry conditions"]
    },
    {
      id: 210,
      name: "Niacinamide",
      category: "Personal Care",
      subcategory: "Active Ingredients",
      image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
      description: "Vitamin B3 derivative for skincare applications.",
      featured: false,
      chemicalFormula: "C6H6N2O",
      casNumber: "98-92-0",
      hsCode: "2933.39.00",
      purity: "99%",
      applications: ["Anti-aging products", "Acne treatments", "Brightening serums", "Moisturizers"],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Freely soluble in water",
        meltingPoint: "128-131°C",
        ph: "6.0-7.0"
      },
      packaging: ["25kg drums", "1kg containers"],
      safetyInfo: ["Generally safe", "Well tolerated", "Stable ingredient"]
    },
    {
      id: 211,
      name: "Retinol",
      category: "Personal Care",
      subcategory: "Active Ingredients",
      image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
      description: "Vitamin A for anti-aging and skin renewal products.",
      featured: false,
      chemicalFormula: "C20H30O",
      casNumber: "68-26-8",
      hsCode: "2936.21.00",
      purity: "95%",
      applications: ["Anti-aging creams", "Acne treatments", "Skin renewal products", "Night serums"],
      specifications: {
        appearance: "Yellow crystalline powder",
        solubility: "Insoluble in water",
        meltingPoint: "62-64°C",
        density: "0.947 g/cm³"
      },
      packaging: ["100g containers", "1kg containers"],
      safetyInfo: ["Light sensitive", "Requires stabilization", "Use with caution"]
    },
    {
      id: 212,
      name: "Salicylic Acid",
      category: "Personal Care",
      subcategory: "Active Ingredients",
      image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
      description: "Beta hydroxy acid for exfoliating and acne treatments.",
      featured: false,
      chemicalFormula: "C7H6O3",
      casNumber: "69-72-7",
      hsCode: "2918.21.00",
      purity: "99%",
      applications: ["Acne treatments", "Exfoliating products", "Anti-dandruff shampoos", "Wart removers"],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Slightly soluble in water",
        meltingPoint: "158-160°C",
        ph: "2.4 (saturated solution)"
      },
      packaging: ["25kg drums", "1kg containers"],
      safetyInfo: ["Skin irritant", "Use in low concentrations", "Avoid eye contact"]
    },
    {
      id: 213,
      name: "Lactic Acid",
      category: "Personal Care",
      subcategory: "Active Ingredients",
      image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
      description: "Alpha hydroxy acid for gentle exfoliation.",
      featured: false,
      chemicalFormula: "C3H6O3",
      casNumber: "50-21-5",
      hsCode: "2918.11.00",
      purity: "88%",
      applications: ["Chemical peels", "Exfoliating lotions", "pH adjustment", "Anti-aging products"],
      specifications: {
        appearance: "Clear to pale yellow liquid",
        solubility: "Miscible with water",
        boilingPoint: "122°C",
        density: "1.21 g/cm³"
      },
      packaging: ["200L drums", "25L cans"],
      safetyInfo: ["Corrosive", "Wear protective equipment", "Avoid skin contact"]
    },
    {
      id: 214,
      name: "Tocopherol (Vitamin E)",
      category: "Personal Care",
      subcategory: "Antioxidants",
      image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
      description: "Natural antioxidant for cosmetic preservation.",
      featured: false,
      chemicalFormula: "C29H50O2",
      casNumber: "59-02-9",
      hsCode: "2936.28.00",
      purity: "95%",
      applications: ["Antioxidant", "Skin conditioning", "Product preservation", "Anti-aging formulations"],
      specifications: {
        appearance: "Clear yellow to amber oil",
        solubility: "Insoluble in water",
        boilingPoint: "200°C",
        density: "0.95 g/cm³"
      },
      packaging: ["25kg drums", "5kg containers"],
      safetyInfo: ["Generally safe", "Light sensitive", "Store under nitrogen"]
    },
    {
      id: 215,
      name: "Ascorbic Acid (Vitamin C)",
      category: "Personal Care",
      subcategory: "Antioxidants",
      image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
      description: "Powerful antioxidant for brightening and anti-aging.",
      featured: false,
      chemicalFormula: "C6H8O6",
      casNumber: "50-81-7",
      hsCode: "2936.27.00",
      purity: "99%",
      applications: ["Brightening serums", "Anti-aging products", "Antioxidant formulations", "Collagen boosters"],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Freely soluble in water",
        meltingPoint: "190-192°C",
        ph: "2.1-2.6"
      },
      packaging: ["25kg drums", "1kg containers"],
      safetyInfo: ["Unstable in solution", "Light and air sensitive", "Requires stabilization"]
    },
    {
      id: 216,
      name: "Panthenol (Pro-Vitamin B5)",
      category: "Personal Care",
      subcategory: "Conditioning Agents",
      image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
      description: "Moisturizing and conditioning agent for hair and skin.",
      featured: false,
      chemicalFormula: "C9H19NO4",
      casNumber: "81-13-0",
      hsCode: "2924.19.00",
      purity: "98%",
      applications: ["Hair conditioners", "Skin moisturizers", "Healing ointments", "Baby products"],
      specifications: {
        appearance: "Clear viscous liquid",
        solubility: "Miscible with water",
        boilingPoint: "118-120°C",
        density: "1.2 g/cm³"
      },
      packaging: ["200L drums", "25L cans"],
      safetyInfo: ["Very safe ingredient", "Non-irritating", "Well tolerated"]
    },
    {
      id: 217,
      name: "Allantoin",
      category: "Personal Care",
      subcategory: "Conditioning Agents",
      image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
      description: "Soothing and healing agent for sensitive skin products.",
      featured: false,
      chemicalFormula: "C4H6N4O3",
      casNumber: "97-59-6",
      hsCode: "2933.99.00",
      purity: "98%",
      applications: ["Sensitive skin products", "After-sun lotions", "Healing creams", "Baby care products"],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Slightly soluble in water",
        meltingPoint: "238°C",
        ph: "5.5-6.5"
      },
      packaging: ["25kg drums", "1kg containers"],
      safetyInfo: ["Very safe", "Non-sensitizing", "Suitable for sensitive skin"]
    },
    {
      id: 218,
      name: "Ceramides",
      category: "Personal Care",
      subcategory: "Skin Barrier Agents",
      image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
      description: "Lipid molecules for skin barrier repair and moisturization.",
      featured: false,
      chemicalFormula: "Variable",
      casNumber: "100403-19-8",
      hsCode: "3504.00.00",
      purity: "95%",
      applications: ["Moisturizers", "Barrier repair creams", "Anti-aging products", "Sensitive skin formulations"],
      specifications: {
        appearance: "White to off-white powder",
        solubility: "Insoluble in water",
        meltingPoint: "85-95°C",
        density: "0.9 g/cm³"
      },
      packaging: ["1kg containers", "5kg containers"],
      safetyInfo: ["Biocompatible", "Non-irritating", "Naturally occurring"]
    },
    {
      id: 219,
      name: "Peptides Complex",
      category: "Personal Care",
      subcategory: "Active Ingredients",
      image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
      description: "Bioactive peptides for anti-aging and skin repair.",
      featured: false,
      chemicalFormula: "Variable",
      casNumber: "Various",
      hsCode: "3504.00.00",
      purity: "95%",
      applications: ["Anti-aging serums", "Wrinkle creams", "Firming products", "Eye treatments"],
      specifications: {
        appearance: "White to off-white powder",
        solubility: "Soluble in water",
        ph: "5.0-7.0",
        density: "1.1 g/cm³"
      },
      packaging: ["100g containers", "1kg containers"],
      safetyInfo: ["Generally safe", "Biocompatible", "Store refrigerated"]
    },
    {
      id: 220,
      name: "Zinc Oxide",
      category: "Personal Care",
      subcategory: "UV Filters",
      image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
      description: "Mineral UV filter and skin protectant.",
      featured: false,
      chemicalFormula: "ZnO",
      casNumber: "1314-13-2",
      hsCode: "2817.00.00",
      purity: "99%",
      applications: ["Sunscreens", "Diaper rash creams", "Calamine lotions", "Mineral makeup"],
      specifications: {
        appearance: "White powder",
        solubility: "Insoluble in water",
        meltingPoint: "1975°C",
        density: "5.61 g/cm³"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Generally safe", "Non-comedogenic", "Suitable for sensitive skin"]
    },

    // Food & Nutrition (20 products)
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
      id: 301,
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
      id: 302,
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
      id: 303,
      name: "Sodium Benzoate",
      category: "Food & Nutrition",
      subcategory: "Preservatives",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Widely used food preservative for acidic foods.",
      featured: false,
      chemicalFormula: "C7H5NaO2",
      casNumber: "532-32-1",
      hsCode: "2916.31.00",
      purity: "99%",
      applications: ["Soft drinks", "Fruit juices", "Pickles", "Salad dressings"],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Soluble in water",
        meltingPoint: "410°C",
        ph: "8.0-8.5"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Food grade", "GRAS status", "Store in dry place"]
    },
    {
      id: 304,
      name: "Calcium Propionate",
      category: "Food & Nutrition",
      subcategory: "Preservatives",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Mold inhibitor for baked goods and dairy products.",
      featured: false,
      chemicalFormula: "C6H10CaO4",
      casNumber: "4075-81-4",
      hsCode: "2915.50.00",
      purity: "99%",
      applications: ["Bread preservation", "Cheese preservation", "Animal feed", "Cosmetics"],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Soluble in water",
        meltingPoint: "300°C",
        ph: "8.5-10.5"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Food grade", "Generally safe", "Store in dry conditions"]
    },
    {
      id: 305,
      name: "Ascorbic Acid (Vitamin C)",
      category: "Food & Nutrition",
      subcategory: "Vitamins",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Essential vitamin and antioxidant for food fortification.",
      featured: false,
      chemicalFormula: "C6H8O6",
      casNumber: "50-81-7",
      hsCode: "2936.27.00",
      purity: "99%",
      applications: ["Food fortification", "Antioxidant", "Nutritional supplements", "Beverage additive"],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Freely soluble in water",
        meltingPoint: "190-192°C",
        ph: "2.1-2.6"
      },
      packaging: ["25kg drums", "1kg containers"],
      safetyInfo: ["Food grade", "Light sensitive", "Store in cool, dry place"]
    },
    {
      id: 306,
      name: "Tocopherol (Vitamin E)",
      category: "Food & Nutrition",
      subcategory: "Vitamins",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Natural antioxidant vitamin for food preservation.",
      featured: false,
      chemicalFormula: "C29H50O2",
      casNumber: "59-02-9",
      hsCode: "2936.28.00",
      purity: "95%",
      applications: ["Food antioxidant", "Nutritional supplements", "Oil stabilization", "Animal feed"],
      specifications: {
        appearance: "Clear yellow to amber oil",
        solubility: "Insoluble in water",
        boilingPoint: "200°C",
        density: "0.95 g/cm³"
      },
      packaging: ["25kg drums", "5kg containers"],
      safetyInfo: ["Food grade", "Light sensitive", "Store under nitrogen"]
    },
    {
      id: 307,
      name: "Thiamine Hydrochloride (Vitamin B1)",
      category: "Food & Nutrition",
      subcategory: "Vitamins",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Essential B vitamin for food fortification.",
      featured: false,
      chemicalFormula: "C12H17ClN4OS·HCl",
      casNumber: "67-03-8",
      hsCode: "2936.21.00",
      purity: "98%",
      applications: ["Food fortification", "Nutritional supplements", "Animal feed", "Pharmaceutical"],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Freely soluble in water",
        meltingPoint: "248-250°C",
        ph: "2.7-3.4"
      },
      packaging: ["25kg drums", "1kg containers"],
      safetyInfo: ["Food grade", "Light sensitive", "Store in dry place"]
    },
    {
      id: 308,
      name: "Riboflavin (Vitamin B2)",
      category: "Food & Nutrition",
      subcategory: "Vitamins",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Yellow vitamin for food coloring and fortification.",
      featured: false,
      chemicalFormula: "C17H20N4O6",
      casNumber: "83-88-5",
      hsCode: "2936.24.00",
      purity: "98%",
      applications: ["Food fortification", "Natural coloring", "Nutritional supplements", "Animal feed"],
      specifications: {
        appearance: "Yellow-orange crystalline powder",
        solubility: "Slightly soluble in water",
        meltingPoint: "280°C",
        ph: "5.5-7.0"
      },
      packaging: ["25kg drums", "1kg containers"],
      safetyInfo: ["Food grade", "Light sensitive", "Store protected from light"]
    },
    {
      id: 309,
      name: "Niacin (Vitamin B3)",
      category: "Food & Nutrition",
      subcategory: "Vitamins",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Essential B vitamin for food fortification.",
      featured: false,
      chemicalFormula: "C6H5NO2",
      casNumber: "59-67-6",
      hsCode: "2933.39.00",
      purity: "99%",
      applications: ["Food fortification", "Nutritional supplements", "Animal feed", "Pharmaceutical"],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Freely soluble in water",
        meltingPoint: "236-239°C",
        ph: "2.0-4.0"
      },
      packaging: ["25kg drums", "1kg containers"],
      safetyInfo: ["Food grade", "Stable compound", "Store in dry place"]
    },
    {
      id: 310,
      name: "Folic Acid",
      category: "Food & Nutrition",
      subcategory: "Vitamins",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Essential vitamin for food fortification and supplements.",
      featured: false,
      chemicalFormula: "C19H19N7O6",
      casNumber: "59-30-3",
      hsCode: "2936.29.00",
      purity: "97%",
      applications: ["Food fortification", "Nutritional supplements", "Pharmaceutical", "Animal feed"],
      specifications: {
        appearance: "Yellow-orange crystalline powder",
        solubility: "Slightly soluble in water",
        meltingPoint: "250°C",
        ph: "4.0-4.8"
      },
      packaging: ["25kg drums", "1kg containers"],
      safetyInfo: ["Food grade", "Light sensitive", "Store protected from light"]
    },
    {
      id: 311,
      name: "Xanthan Gum",
      category: "Food & Nutrition",
      subcategory: "Thickeners",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Natural thickening and stabilizing agent.",
      featured: false,
      chemicalFormula: "(C35H49O29)n",
      casNumber: "11138-66-2",
      hsCode: "3913.90.00",
      purity: "99%",
      applications: ["Food thickener", "Gluten-free baking", "Salad dressings", "Sauces"],
      specifications: {
        appearance: "Cream to white powder",
        solubility: "Soluble in water",
        ph: "6.0-8.0",
        density: "1.5 g/cm³"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Food grade", "Natural product", "Store in dry place"]
    },
    {
      id: 312,
      name: "Guar Gum",
      category: "Food & Nutrition",
      subcategory: "Thickeners",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Natural thickening agent from guar beans.",
      featured: false,
      chemicalFormula: "(C6H10O5)n",
      casNumber: "9000-30-0",
      hsCode: "1302.32.00",
      purity: "99%",
      applications: ["Food thickener", "Ice cream stabilizer", "Gluten-free products", "Pet food"],
      specifications: {
        appearance: "White to yellowish powder",
        solubility: "Soluble in water",
        ph: "5.4-7.0",
        density: "1.5 g/cm³"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Food grade", "Natural product", "May cause dust irritation"]
    },
    {
      id: 313,
      name: "Carrageenan",
      category: "Food & Nutrition",
      subcategory: "Thickeners",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Seaweed-derived gelling and thickening agent.",
      featured: false,
      chemicalFormula: "(C12H16O12S2)n",
      casNumber: "9000-07-1",
      hsCode: "1302.31.00",
      purity: "95%",
      applications: ["Dairy products", "Meat products", "Desserts", "Plant-based alternatives"],
      specifications: {
        appearance: "White to tan powder",
        solubility: "Soluble in hot water",
        ph: "8.0-11.0",
        density: "1.3 g/cm³"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Food grade", "Natural seaweed extract", "Store in dry place"]
    },
    {
      id: 314,
      name: "Pectin",
      category: "Food & Nutrition",
      subcategory: "Thickeners",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Natural gelling agent for jams and jellies.",
      featured: false,
      chemicalFormula: "(C6H10O7)n",
      casNumber: "9000-69-5",
      hsCode: "1302.20.00",
      purity: "95%",
      applications: ["Jam making", "Jelly production", "Fruit preparations", "Confectionery"],
      specifications: {
        appearance: "Light tan to white powder",
        solubility: "Soluble in water",
        ph: "2.8-3.2",
        density: "1.5 g/cm³"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Food grade", "Natural fruit extract", "Store in dry conditions"]
    },
    {
      id: 315,
      name: "Lecithin",
      category: "Food & Nutrition",
      subcategory: "Emulsifiers",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Natural emulsifier from soybeans or sunflower.",
      featured: false,
      chemicalFormula: "C42H80NO8P",
      casNumber: "8002-43-5",
      hsCode: "2923.20.00",
      purity: "95%",
      applications: ["Chocolate production", "Baking", "Margarine", "Nutritional supplements"],
      specifications: {
        appearance: "Light brown viscous liquid",
        solubility: "Partially soluble in water",
        density: "1.03 g/cm³",
        ph: "6.0-8.0"
      },
      packaging: ["200L drums", "25L cans"],
      safetyInfo: ["Food grade", "Natural product", "Store at room temperature"]
    },
    {
      id: 316,
      name: "Mono- and Diglycerides",
      category: "Food & Nutrition",
      subcategory: "Emulsifiers",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Versatile emulsifiers for food applications.",
      featured: false,
      chemicalFormula: "C21H42O4",
      casNumber: "123-94-4",
      hsCode: "3823.70.00",
      purity: "90%",
      applications: ["Baking", "Ice cream", "Margarine", "Confectionery"],
      specifications: {
        appearance: "White to cream colored flakes",
        solubility: "Insoluble in water",
        meltingPoint: "58-62°C",
        density: "0.97 g/cm³"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Food grade", "Generally safe", "Store in cool place"]
    },
    {
      id: 317,
      name: "Polysorbate 80",
      category: "Food & Nutrition",
      subcategory: "Emulsifiers",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Synthetic emulsifier for food and cosmetic applications.",
      featured: false,
      chemicalFormula: "C64H124O26",
      casNumber: "9005-65-6",
      hsCode: "3402.13.00",
      purity: "95%",
      applications: ["Ice cream", "Baked goods", "Vitamins", "Pharmaceuticals"],
      specifications: {
        appearance: "Amber colored viscous liquid",
        solubility: "Soluble in water",
        density: "1.08 g/cm³",
        ph: "6.0-8.0"
      },
      packaging: ["200L drums", "25L cans"],
      safetyInfo: ["Food grade", "FDA approved", "Store at room temperature"]
    },
    {
      id: 318,
      name: "Calcium Chloride",
      category: "Food & Nutrition",
      subcategory: "Firming Agents",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Firming agent and nutritional supplement.",
      featured: false,
      chemicalFormula: "CaCl2",
      casNumber: "10043-52-4",
      hsCode: "2827.20.00",
      purity: "99%",
      applications: ["Cheese making", "Canned vegetables", "Sports drinks", "Tofu production"],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Very soluble in water",
        meltingPoint: "772°C",
        density: "2.15 g/cm³"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Food grade", "Hygroscopic", "Store in dry place"]
    },
    {
      id: 319,
      name: "Sodium Alginate",
      category: "Food & Nutrition",
      subcategory: "Thickeners",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Seaweed-derived thickener and gelling agent.",
      featured: false,
      chemicalFormula: "(C6H7NaO6)n",
      casNumber: "9005-38-3",
      hsCode: "3913.90.00",
      purity: "95%",
      applications: ["Molecular gastronomy", "Ice cream", "Salad dressings", "Meat products"],
      specifications: {
        appearance: "White to light tan powder",
        solubility: "Soluble in water",
        ph: "6.0-8.0",
        density: "1.6 g/cm³"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Food grade", "Natural seaweed product", "Store in dry place"]
    },
    {
      id: 320,
      name: "Erythritol",
      category: "Food & Nutrition",
      subcategory: "Sweeteners",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Natural zero-calorie sweetener.",
      featured: false,
      chemicalFormula: "C4H10O4",
      casNumber: "149-32-6",
      hsCode: "2905.49.00",
      purity: "99.5%",
      applications: ["Sugar-free products", "Diabetic foods", "Low-calorie beverages", "Confectionery"],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Soluble in water",
        meltingPoint: "121°C",
        density: "1.45 g/cm³"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Food grade", "Generally safe", "May cause laxative effect"]
    },

    // Paint, Ink & Coatings (20 products)
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
      id: 401,
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
      id: 402,
      name: "Iron Oxide Yellow",
      category: "Paint, Ink & Coatings",
      subcategory: "Pigments",
      image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
      description: "Bright yellow iron oxide pigment for various applications.",
      featured: false,
      chemicalFormula: "FeOOH",
      casNumber: "51274-00-1",
      hsCode: "2821.10.00",
      purity: "95%",
      applications: ["Paint coloring", "Construction materials", "Plastics", "Ceramics"],
      specifications: {
        appearance: "Yellow powder",
        solubility: "Insoluble in water",
        meltingPoint: "350°C (decomposes)",
        density: "4.26 g/cm³"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Non-toxic pigment", "Avoid dust inhalation", "Store in dry place"]
    },
    {
      id: 403,
      name: "Iron Oxide Black",
      category: "Paint, Ink & Coatings",
      subcategory: "Pigments",
      image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
      description: "Deep black iron oxide pigment for coatings and plastics.",
      featured: false,
      chemicalFormula: "Fe3O4",
      casNumber: "1317-61-9",
      hsCode: "2821.10.00",
      purity: "95%",
      applications: ["Black paint", "Automotive coatings", "Plastic coloring", "Magnetic applications"],
      specifications: {
        appearance: "Black powder",
        solubility: "Insoluble in water",
        meltingPoint: "1597°C",
        density: "5.17 g/cm³"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Safe iron oxide", "Avoid dust inhalation", "Magnetic properties"]
    },
    {
      id: 404,
      name: "Chrome Oxide Green",
      category: "Paint, Ink & Coatings",
      subcategory: "Pigments",
      image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
      description: "Durable green pigment with excellent lightfastness.",
      featured: false,
      chemicalFormula: "Cr2O3",
      casNumber: "1308-38-9",
      hsCode: "2819.90.00",
      purity: "98%",
      applications: ["Automotive paints", "Ceramic glazes", "Camouflage coatings", "Artist paints"],
      specifications: {
        appearance: "Green powder",
        solubility: "Insoluble in water",
        meltingPoint: "2435°C",
        density: "5.21 g/cm³"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Contains chromium", "Use respiratory protection", "Handle with care"]
    },
    {
      id: 405,
      name: "Ultramarine Blue",
      category: "Paint, Ink & Coatings",
      subcategory: "Pigments",
      image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
      description: "Brilliant blue pigment for paints and plastics.",
      featured: false,
      chemicalFormula: "Na8Al6Si6O24S2",
      casNumber: "57455-37-5",
      hsCode: "3206.42.00",
      purity: "95%",
      applications: ["Paint coloring", "Plastic masterbatches", "Detergent whitening", "Cosmetics"],
      specifications: {
        appearance: "Blue powder",
        solubility: "Insoluble in water",
        meltingPoint: "1500°C",
        density: "2.4 g/cm³"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Non-toxic pigment", "Avoid dust inhalation", "Stable in alkaline conditions"]
    },
    {
      id: 406,
      name: "Carbon Black",
      category: "Paint, Ink & Coatings",
      subcategory: "Pigments",
      image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
      description: "High-quality carbon black for deep black coloration.",
      featured: false,
      chemicalFormula: "C",
      casNumber: "1333-86-4",
      hsCode: "2803.00.00",
      purity: "99%",
      applications: ["Black paint", "Printing inks", "Rubber reinforcement", "Plastic coloring"],
      specifications: {
        appearance: "Black powder",
        solubility: "Insoluble in water",
        density: "1.8-2.1 g/cm³",
        ph: "7.0-9.0"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Potential carcinogen", "Use respiratory protection", "Avoid dust generation"]
    },
    {
      id: 407,
      name: "Zinc Oxide",
      category: "Paint, Ink & Coatings",
      subcategory: "Pigments",
      image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
      description: "White pigment with UV protection properties.",
      featured: false,
      chemicalFormula: "ZnO",
      casNumber: "1314-13-2",
      hsCode: "2817.00.00",
      purity: "99%",
      applications: ["Anti-corrosive paints", "UV protection", "Rubber vulcanization", "Ceramics"],
      specifications: {
        appearance: "White powder",
        solubility: "Insoluble in water",
        meltingPoint: "1975°C",
        density: "5.61 g/cm³"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Generally safe", "Avoid inhalation", "UV protective properties"]
    },
    {
      id: 408,
      name: "Barium Sulfate",
      category: "Paint, Ink & Coatings",
      subcategory: "Extenders",
      image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
      description: "High-density extender pigment for paints.",
      featured: false,
      chemicalFormula: "BaSO4",
      casNumber: "7727-43-7",
      hsCode: "2833.27.00",
      purity: "98%",
      applications: ["Paint extender", "Powder coatings", "Automotive primers", "X-ray contrast"],
      specifications: {
        appearance: "White powder",
        solubility: "Insoluble in water",
        meltingPoint: "1580°C",
        density: "4.5 g/cm³"
      },
      packaging: ["25kg bags", "500kg big bags", "1000kg big bags"],
      safetyInfo: ["Chemically inert", "Avoid dust inhalation", "High density material"]
    },
    {
      id: 409,
      name: "Calcium Carbonate",
      category: "Paint, Ink & Coatings",
      subcategory: "Extenders",
      image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
      description: "Versatile extender and filler for paint formulations.",
      featured: false,
      chemicalFormula: "CaCO3",
      casNumber: "471-34-1",
      hsCode: "2836.50.00",
      purity: "98%",
      applications: ["Paint filler", "Paper coating", "Plastic filler", "Sealants"],
      specifications: {
        appearance: "White powder",
        solubility: "Slightly soluble in water",
        meltingPoint: "825°C",
        density: "2.71 g/cm³"
      },
      packaging: ["25kg bags", "500kg big bags", "1000kg big bags"],
      safetyInfo: ["Generally safe", "Natural mineral", "Avoid dust inhalation"]
    },
    {
      id: 410,
      name: "Talc",
      category: "Paint, Ink & Coatings",
      subcategory: "Extenders",
      image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
      description: "Soft mineral extender for improved paint properties.",
      featured: false,
      chemicalFormula: "Mg3Si4O10(OH)2",
      casNumber: "14807-96-6",
      hsCode: "2526.20.00",
      purity: "95%",
      applications: ["Paint extender", "Anti-settling agent", "Matting agent", "Plastic filler"],
      specifications: {
        appearance: "White to off-white powder",
        solubility: "Insoluble in water",
        meltingPoint: "1500°C",
        density: "2.7-2.8 g/cm³"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Use asbestos-free grade", "Avoid inhalation", "Natural mineral"]
    },
    {
      id: 411,
      name: "Mica",
      category: "Paint, Ink & Coatings",
      subcategory: "Effect Pigments",
      image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
      description: "Pearlescent effect pigment for decorative coatings.",
      featured: false,
      chemicalFormula: "KAl2(AlSi3O10)(OH)2",
      casNumber: "12001-26-2",
      hsCode: "2525.10.00",
      purity: "95%",
      applications: ["Metallic paints", "Automotive coatings", "Decorative finishes", "Cosmetics"],
      specifications: {
        appearance: "Silvery flakes",
        solubility: "Insoluble in water",
        meltingPoint: "1200°C",
        density: "2.8 g/cm³"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Natural mineral", "Avoid inhalation", "Creates metallic effects"]
    },
    {
      id: 412,
      name: "Aluminum Paste",
      category: "Paint, Ink & Coatings",
      subcategory: "Metallic Pigments",
      image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
      description: "Metallic aluminum pigment for silver finishes.",
      featured: false,
      chemicalFormula: "Al",
      casNumber: "7429-90-5",
      hsCode: "3206.50.00",
      purity: "65% Al",
      applications: ["Metallic paints", "Roof coatings", "Automotive finishes", "Industrial coatings"],
      specifications: {
        appearance: "Silver paste",
        solubility: "Insoluble in water",
        density: "1.5-2.0 g/cm³",
        ph: "7.0-9.0"
      },
      packaging: ["25kg pails", "200kg drums"],
      safetyInfo: ["Flammable when dry", "Keep away from water", "Use in ventilated area"]
    },
    {
      id: 413,
      name: "Bronze Powder",
      category: "Paint, Ink & Coatings",
      subcategory: "Metallic Pigments",
      image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
      description: "Copper-zinc alloy powder for bronze effects.",
      featured: false,
      chemicalFormula: "Cu/Zn alloy",
      casNumber: "7440-50-8",
      hsCode: "3206.50.00",
      purity: "90%",
      applications: ["Bronze paints", "Decorative coatings", "Printing inks", "Art supplies"],
      specifications: {
        appearance: "Bronze powder",
        solubility: "Insoluble in water",
        density: "8.5 g/cm³",
        meltingPoint: "900-1000°C"
      },
      packaging: ["25kg drums", "5kg containers"],
      safetyInfo: ["Avoid inhalation", "Flammable powder", "Store in dry place"]
    },
    {
      id: 414,
      name: "Silica Matting Agent",
      category: "Paint, Ink & Coatings",
      subcategory: "Additives",
      image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
      description: "Synthetic silica for creating matte finishes.",
      featured: false,
      chemicalFormula: "SiO2",
      casNumber: "7631-86-9",
      hsCode: "2811.22.00",
      purity: "99%",
      applications: ["Matte paints", "Varnishes", "Powder coatings", "Printing inks"],
      specifications: {
        appearance: "White powder",
        solubility: "Insoluble in water",
        density: "2.2 g/cm³",
        ph: "6.0-8.0"
      },
      packaging: ["20kg bags", "500kg big bags"],
      safetyInfo: ["Avoid inhalation", "Use respiratory protection", "Synthetic amorphous silica"]
    },
    {
      id: 415,
      name: "Wax Additive",
      category: "Paint, Ink & Coatings",
      subcategory: "Additives",
      image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
      description: "Micronized wax for surface protection and feel.",
      featured: false,
      chemicalFormula: "Polyethylene wax",
      casNumber: "9002-88-4",
      hsCode: "3404.90.00",
      purity: "95%",
      applications: ["Scratch resistance", "Surface feel", "Anti-blocking", "Matting effect"],
      specifications: {
        appearance: "White powder",
        solubility: "Insoluble in water",
        meltingPoint: "105-115°C",
        density: "0.92 g/cm³"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Generally safe", "Avoid dust inhalation", "Thermoplastic material"]
    },
    {
      id: 416,
      name: "Defoamer",
      category: "Paint, Ink & Coatings",
      subcategory: "Additives",
      image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
      description: "Silicone-based defoaming agent for paint formulations.",
      featured: false,
      chemicalFormula: "Silicone polymer",
      casNumber: "63148-62-9",
      hsCode: "3910.00.00",
      purity: "100% active",
      applications: ["Paint defoaming", "Coating production", "Ink manufacturing", "Adhesive production"],
      specifications: {
        appearance: "Clear to milky liquid",
        solubility: "Insoluble in water",
        density: "0.98 g/cm³",
        ph: "6.0-8.0"
      },
      packaging: ["200L drums", "25L cans"],
      safetyInfo: ["Generally safe", "Avoid eye contact", "Use as directed"]
    },
    {
      id: 417,
      name: "Dispersing Agent",
      category: "Paint, Ink & Coatings",
      subcategory: "Additives",
      image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
      description: "Polymeric dispersant for pigment stabilization.",
      featured: false,
      chemicalFormula: "Acrylic copolymer",
      casNumber: "Various",
      hsCode: "3906.90.00",
      purity: "40% active",
      applications: ["Pigment dispersion", "Color stability", "Viscosity control", "Grinding aid"],
      specifications: {
        appearance: "Clear to amber liquid",
        solubility: "Soluble in organic solvents",
        density: "1.05 g/cm³",
        ph: "7.0-9.0"
      },
      packaging: ["200L drums", "25L cans"],
      safetyInfo: ["Avoid skin contact", "Use in ventilated area", "Polymer solution"]
    },
    {
      id: 418,
      name: "UV Absorber",
      category: "Paint, Ink & Coatings",
      subcategory: "Additives",
      image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
      description: "Benzotriazole UV absorber for coating protection.",
      featured: false,
      chemicalFormula: "C20H25N3O",
      casNumber: "3147-75-9",
      hsCode: "2933.99.00",
      purity: "99%",
      applications: ["UV protection", "Color retention", "Polymer stabilization", "Outdoor coatings"],
      specifications: {
        appearance: "Light yellow powder",
        solubility: "Soluble in organic solvents",
        meltingPoint: "81-86°C",
        density: "1.2 g/cm³"
      },
      packaging: ["25kg drums", "5kg containers"],
      safetyInfo: ["Avoid skin contact", "Light sensitive", "Use respiratory protection"]
    },
    {
      id: 419,
      name: "Antioxidant",
      category: "Paint, Ink & Coatings",
      subcategory: "Additives",
      image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
      description: "Hindered phenol antioxidant for coating stability.",
      featured: false,
      chemicalFormula: "C35H62O3",
      casNumber: "6683-19-8",
      hsCode: "2907.29.00",
      purity: "98%",
      applications: ["Oxidation prevention", "Color stability", "Polymer protection", "Shelf life extension"],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Soluble in organic solvents",
        meltingPoint: "110-125°C",
        density: "1.03 g/cm³"
      },
      packaging: ["25kg drums", "5kg containers"],
      safetyInfo: ["Generally safe", "Avoid dust inhalation", "Phenolic antioxidant"]
    },
    {
      id: 420,
      name: "Rheology Modifier",
      category: "Paint, Ink & Coatings",
      subcategory: "Additives",
      image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
      description: "Associative thickener for water-based coatings.",
      featured: false,
      chemicalFormula: "Polyurethane polymer",
      casNumber: "Various",
      hsCode: "3909.50.00",
      purity: "20% active",
      applications: ["Viscosity control", "Sag resistance", "Leveling improvement", "Brush drag reduction"],
      specifications: {
        appearance: "White to off-white liquid",
        solubility: "Dispersible in water",
        density: "1.02 g/cm³",
        ph: "7.0-9.0"
      },
      packaging: ["200L drums", "25L cans"],
      safetyInfo: ["Generally safe", "Avoid eye contact", "Aqueous dispersion"]
    },

    // Cattle & Poultry Feed (20 products)
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
      id: 501,
      name: "Dicalcium Phosphate",
      category: "Cattle & Poultry Feed",
      subcategory: "Mineral Supplements",
      image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
      description: "Essential phosphorus and calcium source for animal nutrition.",
      featured: false,
      chemicalFormula: "CaHPO4",
      casNumber: "7757-93-9",
      hsCode: "2835.25.00",
      purity: "98%",
      applications: ["Poultry feed", "Cattle nutrition", "Swine feed", "Aquaculture"],
      specifications: {
        appearance: "White powder",
        solubility: "Slightly soluble in water",
        density: "2.32 g/cm³",
        ph: "7.0-8.0"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Feed grade", "Store in dry place", "Essential mineral supplement"]
    },
    {
      id: 502,
      name: "Monocalcium Phosphate",
      category: "Cattle & Poultry Feed",
      subcategory: "Mineral Supplements",
      image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
      description: "Highly bioavailable phosphorus source for animal feeds.",
      featured: false,
      chemicalFormula: "Ca(H2PO4)2",
      casNumber: "7758-23-8",
      hsCode: "2835.24.00",
      purity: "98%",
      applications: ["Poultry starter feeds", "Young animal nutrition", "Aquaculture", "Pet food"],
      specifications: {
        appearance: "White granular powder",
        solubility: "Soluble in water",
        density: "2.22 g/cm³",
        ph: "3.5-4.5"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Feed grade", "Acidic nature", "Handle with care"]
    },
    {
      id: 503,
      name: "Salt (Sodium Chloride)",
      category: "Cattle & Poultry Feed",
      subcategory: "Mineral Supplements",
      image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
      description: "Essential electrolyte for animal health and feed palatability.",
      featured: false,
      chemicalFormula: "NaCl",
      casNumber: "7647-14-5",
      hsCode: "2501.00.00",
      purity: "99%",
      applications: ["Feed additive", "Electrolyte balance", "Feed palatability", "Preservation"],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Highly soluble in water",
        density: "2.16 g/cm³",
        ph: "7.0"
      },
      packaging: ["25kg bags", "500kg big bags", "1000kg big bags"],
      safetyInfo: ["Feed grade", "Store in dry place", "Essential mineral"]
    },
    {
      id: 504,
      name: "Magnesium Oxide",
      category: "Cattle & Poultry Feed",
      subcategory: "Mineral Supplements",
      image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
      description: "Magnesium supplement for preventing grass tetany in ruminants.",
      featured: false,
      chemicalFormula: "MgO",
      casNumber: "1309-48-4",
      hsCode: "2519.90.00",
      purity: "95%",
      applications: ["Cattle feed", "Sheep nutrition", "Goat feed", "Ruminant supplements"],
      specifications: {
        appearance: "White powder",
        solubility: "Slightly soluble in water",
        density: "3.58 g/cm³",
        ph: "10.3"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Feed grade", "Alkaline material", "Store in dry place"]
    },
    {
      id: 505,
      name: "Zinc Oxide",
      category: "Cattle & Poultry Feed",
      subcategory: "Trace Minerals",
      image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
      description: "Essential zinc supplement for animal growth and immunity.",
      featured: false,
      chemicalFormula: "ZnO",
      casNumber: "1314-13-2",
      hsCode: "2817.00.00",
      purity: "99%",
      applications: ["Piglet feed", "Poultry nutrition", "Cattle supplements", "Aquaculture"],
      specifications: {
        appearance: "White powder",
        solubility: "Insoluble in water",
        density: "5.61 g/cm³",
        meltingPoint: "1975°C"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Feed grade", "Essential trace mineral", "Avoid overdosing"]
    },
    {
      id: 506,
      name: "Iron Sulfate",
      category: "Cattle & Poultry Feed",
      subcategory: "Trace Minerals",
      image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
      description: "Iron supplement for preventing anemia in animals.",
      featured: false,
      chemicalFormula: "FeSO4·7H2O",
      casNumber: "7782-63-0",
      hsCode: "2833.21.00",
      purity: "98%",
      applications: ["Piglet feed", "Poultry nutrition", "Cattle supplements", "Iron deficiency prevention"],
      specifications: {
        appearance: "Blue-green crystals",
        solubility: "Soluble in water",
        density: "1.9 g/cm³",
        ph: "3.0-4.0"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Feed grade", "Acidic solution", "Store in dry place"]
    },
    {
      id: 507,
      name: "Copper Sulfate",
      category: "Cattle & Poultry Feed",
      subcategory: "Trace Minerals",
      image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
      description: "Copper supplement for animal growth and enzyme function.",
      featured: false,
      chemicalFormula: "CuSO4·5H2O",
      casNumber: "7758-99-8",
      hsCode: "2833.25.00",
      purity: "98%",
      applications: ["Cattle feed", "Sheep nutrition", "Poultry supplements", "Hoof health"],
      specifications: {
        appearance: "Blue crystals",
        solubility: "Soluble in water",
        density: "2.28 g/cm³",
        ph: "3.5-4.5"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Feed grade", "Toxic in excess", "Use precise dosing"]
    },
    {
      id: 508,
      name: "Manganese Oxide",
      category: "Cattle & Poultry Feed",
      subcategory: "Trace Minerals",
      image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
      description: "Manganese supplement for bone development and reproduction.",
      featured: false,
      chemicalFormula: "MnO",
      casNumber: "1344-43-0",
      hsCode: "2820.10.00",
      purity: "95%",
      applications: ["Poultry feed", "Cattle nutrition", "Swine feed", "Bone development"],
      specifications: {
        appearance: "Brown-black powder",
        solubility: "Insoluble in water",
        density: "5.37 g/cm³",
        meltingPoint: "1842°C"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Feed grade", "Essential trace mineral", "Avoid dust inhalation"]
    },
    {
      id: 509,
      name: "Cobalt Carbonate",
      category: "Cattle & Poultry Feed",
      subcategory: "Trace Minerals",
      image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
      description: "Cobalt supplement for vitamin B12 synthesis in ruminants.",
      featured: false,
      chemicalFormula: "CoCO3",
      casNumber: "513-79-1",
      hsCode: "2836.99.00",
      purity: "98%",
      applications: ["Cattle feed", "Sheep nutrition", "Goat supplements", "Vitamin B12 synthesis"],
      specifications: {
        appearance: "Pink powder",
        solubility: "Insoluble in water",
        density: "4.13 g/cm³",
        meltingPoint: "427°C"
      },
      packaging: ["25kg bags", "100kg drums"],
      safetyInfo: ["Feed grade", "Use in small quantities", "Essential for ruminants"]
    },
    {
      id: 510,
      name: "Selenium Yeast",
      category: "Cattle & Poultry Feed",
      subcategory: "Organic Minerals",
      image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
      description: "Organic selenium supplement for antioxidant function.",
      featured: false,
      chemicalFormula: "Organic Se",
      casNumber: "Various",
      hsCode: "2106.90.00",
      purity: "0.2% Se",
      applications: ["Poultry feed", "Cattle nutrition", "Swine feed", "Antioxidant support"],
      specifications: {
        appearance: "Light brown powder",
        solubility: "Partially soluble in water",
        density: "1.4 g/cm³",
        ph: "6.0-7.0"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Feed grade", "Organic form", "Better bioavailability"]
    },
    {
      id: 511,
      name: "Chromium Yeast",
      category: "Cattle & Poultry Feed",
      subcategory: "Organic Minerals",
      image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
      description: "Organic chromium for glucose metabolism in animals.",
      featured: false,
      chemicalFormula: "Organic Cr",
      casNumber: "Various",
      hsCode: "2106.90.00",
      purity: "0.1% Cr",
      applications: ["Dairy cattle", "Beef cattle", "Swine nutrition", "Glucose metabolism"],
      specifications: {
        appearance: "Light brown powder",
        solubility: "Partially soluble in water",
        density: "1.3 g/cm³",
        ph: "6.0-7.0"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Feed grade", "Organic chelated form", "Improved absorption"]
    },
    {
      id: 512,
      name: "Lysine HCl",
      category: "Cattle & Poultry Feed",
      subcategory: "Amino Acids",
      image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
      description: "Essential amino acid for protein synthesis and growth.",
      featured: false,
      chemicalFormula: "C6H14N2O2·HCl",
      casNumber: "657-27-2",
      hsCode: "2922.41.00",
      purity: "98.5%",
      applications: ["Poultry feed", "Swine nutrition", "Aquaculture", "Pet food"],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Freely soluble in water",
        meltingPoint: "263-264°C",
        ph: "5.0-6.0"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Feed grade", "Essential amino acid", "Store in dry place"]
    },
    {
      id: 513,
      name: "Methionine",
      category: "Cattle & Poultry Feed",
      subcategory: "Amino Acids",
      image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
      description: "Sulfur-containing amino acid for feather and wool development.",
      featured: false,
      chemicalFormula: "C5H11NO2S",
      casNumber: "63-68-3",
      hsCode: "2930.40.00",
      purity: "99%",
      applications: ["Poultry feed", "Cattle nutrition", "Sheep feed", "Aquaculture"],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Soluble in water",
        meltingPoint: "281°C",
        ph: "5.6-6.1"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Feed grade", "Essential amino acid", "Sulfur source"]
    },
    {
      id: 514,
      name: "Threonine",
      category: "Cattle & Poultry Feed",
      subcategory: "Amino Acids",
      image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
      description: "Essential amino acid for intestinal health and immunity.",
      featured: false,
      chemicalFormula: "C4H9NO3",
      casNumber: "72-19-5",
      hsCode: "2922.49.00",
      purity: "98.5%",
      applications: ["Poultry feed", "Swine nutrition", "Aquaculture", "Young animal feeds"],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Freely soluble in water",
        meltingPoint: "255-257°C",
        ph: "5.2-6.2"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Feed grade", "Essential amino acid", "Supports gut health"]
    },
    {
      id: 515,
      name: "Tryptophan",
      category: "Cattle & Poultry Feed",
      subcategory: "Amino Acids",
      image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
      description: "Essential amino acid for serotonin synthesis and behavior.",
      featured: false,
      chemicalFormula: "C11H12N2O2",
      casNumber: "73-22-3",
      hsCode: "2933.99.00",
      purity: "98%",
      applications: ["Swine feed", "Poultry nutrition", "Stress reduction", "Behavior modification"],
      specifications: {
        appearance: "White to off-white powder",
        solubility: "Slightly soluble in water",
        meltingPoint: "289°C",
        ph: "5.5-7.0"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Feed grade", "Light sensitive", "Store protected from light"]
    },
    {
      id: 516,
      name: "Choline Chloride",
      category: "Cattle & Poultry Feed",
      subcategory: "Vitamins",
      image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
      description: "Essential nutrient for fat metabolism and liver function.",
      featured: false,
      chemicalFormula: "C5H14ClNO",
      casNumber: "67-48-1",
      hsCode: "2923.10.00",
      purity: "60%",
      applications: ["Poultry feed", "Swine nutrition", "Cattle feed", "Aquaculture"],
      specifications: {
        appearance: "Brown hygroscopic powder",
        solubility: "Freely soluble in water",
        density: "1.2 g/cm³",
        ph: "6.5-8.5"
      },
      packaging: ["25kg bags", "500kg big bags"],
      safetyInfo: ["Feed grade", "Hygroscopic", "Store in dry place"]
    },
    {
      id: 517,
      name: "Biotin",
      category: "Cattle & Poultry Feed",
      subcategory: "Vitamins",
      image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
      description: "Essential B vitamin for hoof health and reproduction.",
      featured: false,
      chemicalFormula: "C10H16N2O3S",
      casNumber: "58-85-5",
      hsCode: "2936.29.00",
      purity: "2%",
      applications: ["Cattle feed", "Swine nutrition", "Hoof health", "Reproduction"],
      specifications: {
        appearance: "White to off-white powder",
        solubility: "Slightly soluble in water",
        meltingPoint: "232-233°C",
        ph: "4.5-6.5"
      },
      packaging: ["25kg bags", "100kg drums"],
      safetyInfo: ["Feed grade", "Essential vitamin", "Use in small quantities"]
    },
    {
      id: 518,
      name: "Vitamin E Acetate",
      category: "Cattle & Poultry Feed",
      subcategory: "Vitamins",
      image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
      description: "Stable form of vitamin E for antioxidant protection.",
      featured: false,
      chemicalFormula: "C31H52O3",
      casNumber: "58-95-7",
      hsCode: "2936.28.00",
      purity: "50%",
      applications: ["Poultry feed", "Cattle nutrition", "Swine feed", "Antioxidant protection"],
      specifications: {
        appearance: "Light yellow oil",
        solubility: "Insoluble in water",
        density: "0.95 g/cm³",
        boilingPoint: "200°C"
      },
      packaging: ["25kg drums", "200kg drums"],
      safetyInfo: ["Feed grade", "Light sensitive", "Store in cool place"]
    },
    {
      id: 519,
      name: "Vitamin A Acetate",
      category: "Cattle & Poultry Feed",
      subcategory: "Vitamins",
      image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
      description: "Essential vitamin for vision and immune function.",
      featured: false,
      chemicalFormula: "C22H32O2",
      casNumber: "127-47-9",
      hsCode: "2936.21.00",
      purity: "1.7 MIU/g",
      applications: ["Poultry feed", "Cattle nutrition", "Swine feed", "Vision support"],
      specifications: {
        appearance: "Light yellow oil",
        solubility: "Insoluble in water",
        density: "0.92 g/cm³",
        boilingPoint: "137-138°C"
      },
      packaging: ["25kg drums", "200kg drums"],
      safetyInfo: ["Feed grade", "Light and air sensitive", "Store under nitrogen"]
    },
    {
      id: 520,
      name: "Vitamin D3",
      category: "Cattle & Poultry Feed",
      subcategory: "Vitamins",
      image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
      description: "Essential vitamin for calcium absorption and bone health.",
      featured: false,
      chemicalFormula: "C27H44O",
      casNumber: "67-97-0",
      hsCode: "2936.29.00",
      purity: "40 MIU/g",
      applications: ["Poultry feed", "Cattle nutrition", "Swine feed", "Bone development"],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Insoluble in water",
        meltingPoint: "84-85°C",
        density: "0.97 g/cm³"
      },
      packaging: ["25kg drums", "100kg drums"],
      safetyInfo: ["Feed grade", "Light sensitive", "Use precise dosing"]
    }
  ];

  useEffect(() => {
    if (id) {
      const foundProduct = allProducts.find(p => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Get related products from the same category (up to 20)
        const related = allProducts
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 19); // 19 + 1 (current product) = 20 total
        
        setRelatedProducts(related);
      }
    }
  }, [id]);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (!product) {
    return (
      <div className="pt-24 pb-20">
        <div className="container-custom">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
            <Link to="/products" className="btn btn-primary">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      {/* Breadcrumb */}
      <section className="bg-gray-50 py-4">
        <div className="container-custom">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-primary">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/products" className="text-gray-600 hover:text-primary">Products</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-800">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Image */}
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
              </motion.div>
            </div>

            {/* Product Info */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm text-primary font-medium">{product.category}</span>
                  {product.featured && (
                    <span className="bg-accent/10 text-accent text-xs px-2 py-1 rounded-full font-medium">
                      Featured
                    </span>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{product.name}</h1>
                <p className="text-lg text-gray-600 mb-6">{product.description}</p>

                {/* Key Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {product.chemicalFormula && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-1">Chemical Formula</h3>
                      <p className="text-gray-600">{product.chemicalFormula}</p>
                    </div>
                  )}
                  {product.casNumber && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-1">CAS Number</h3>
                      <p className="text-gray-600">{product.casNumber}</p>
                    </div>
                  )}
                  {product.purity && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-1">Purity</h3>
                      <p className="text-gray-600">{product.purity}</p>
                    </div>
                  )}
                  {product.hsCode && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-1">HS Code</h3>
                      <p className="text-gray-600">{product.hsCode}</p>
                    </div>
                  )}
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center">
                    <ShieldCheck className="h-5 w-5 text-success mr-2" />
                    <span className="text-sm text-gray-600">Quality Certified</span>
                  </div>
                  <div className="flex items-center">
                    <Truck className="h-5 w-5 text-primary mr-2" />
                    <span className="text-sm text-gray-600">Fast Delivery</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-accent mr-2" />
                    <span className="text-sm text-gray-600">Industry Standard</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Link 
                  to="/contact" 
                  className="btn btn-primary px-8 py-3 rounded-md inline-flex items-center"
                >
                  Request Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Detailed Information Tabs */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {['overview', 'specifications', 'applications', 'packaging', 'safety'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm capitalize transition-colors ${
                      activeTab === tab
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'overview' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Product Overview</h3>
                  <p className="text-gray-600 mb-6">{product.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Category</h4>
                      <p className="text-gray-600">{product.category}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Subcategory</h4>
                      <p className="text-gray-600">{product.subcategory}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      value && (
                        <div key={key}>
                          <h4 className="font-semibold mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h4>
                          <p className="text-gray-600">{value}</p>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'applications' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Applications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.applications.map((application, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        <span className="text-gray-600">{application}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'packaging' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Packaging Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {product.packaging.map((pack, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="text-primary font-semibold">{pack}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'safety' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Safety Information</h3>
                  <div className="space-y-3">
                    {product.safetyInfo.map((info, index) => (
                      <div key={index} className="flex items-start">
                        <ShieldCheck className="h-5 w-5 text-warning mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{info}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">More Products in {product.category}</h2>
            <p className="text-xl text-gray-600">
              Explore our complete range of {product.category.toLowerCase()} products
            </p>
          </div>

          {relatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                      src={relatedProduct.image} 
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{relatedProduct.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{relatedProduct.description}</p>
                    <Link 
                      to={`/products/${relatedProduct.id}`}
                      className="text-primary font-medium inline-flex items-center hover:underline text-sm"
                    >
                      View Details
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No related products found.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/products" className="btn btn-primary px-8 py-3 rounded-md">
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;