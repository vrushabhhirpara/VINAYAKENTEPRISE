import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Download, Share2, Star, ChevronDown, ChevronUp, AlertTriangle, Truck, Shield, Award } from 'lucide-react';

interface DetailedProduct {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  image: string;
  description: string;
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
  price?: string;
  availability: string;
  rating: number;
  reviews: number;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Comprehensive product database
  const allProducts: DetailedProduct[] = [
    // Agriculture Products
    {
      id: 101,
      name: "NPK Fertilizer Complex",
      category: "Agriculture",
      subcategory: "Fertilizers",
      image: "https://images.pexels.com/photos/4022092/pexels-photo-4022092.jpeg",
      description: "High-quality NPK fertilizer complex for enhanced crop yield and soil nutrition.",
      chemicalFormula: "N-P₂O₅-K₂O",
      casNumber: "Various",
      hsCode: "3105.20",
      purity: "99.5%",
      applications: ["Crop fertilization", "Soil enhancement", "Plant nutrition", "Agricultural production"],
      specifications: {
        appearance: "Granular, multi-colored",
        solubility: "Water soluble",
        ph: "6.0-7.0"
      },
      packaging: ["25kg bags", "50kg bags", "1000kg bulk bags"],
      safetyInfo: ["Store in dry place", "Avoid contact with skin", "Use protective equipment"],
      price: "$45/50kg",
      availability: "In Stock",
      rating: 4.8,
      reviews: 156
    },
    {
      id: 102,
      name: "Urea Fertilizer",
      category: "Agriculture",
      subcategory: "Nitrogen Fertilizers",
      image: "https://images.pexels.com/photos/4022092/pexels-photo-4022092.jpeg",
      description: "Pure urea fertilizer providing essential nitrogen for plant growth.",
      chemicalFormula: "CO(NH₂)₂",
      casNumber: "57-13-6",
      hsCode: "3102.10",
      purity: "99.8%",
      applications: ["Nitrogen source", "Crop fertilization", "Soil conditioning"],
      specifications: {
        appearance: "White crystalline granules",
        solubility: "Highly water soluble",
        meltingPoint: "132-135°C"
      },
      packaging: ["25kg bags", "50kg bags"],
      safetyInfo: ["Store in cool, dry place", "Avoid moisture"],
      price: "$35/50kg",
      availability: "In Stock",
      rating: 4.7,
      reviews: 203
    },
    {
      id: 103,
      name: "Potassium Sulfate",
      category: "Agriculture",
      subcategory: "Potassium Fertilizers",
      image: "https://images.pexels.com/photos/4022092/pexels-photo-4022092.jpeg",
      description: "Premium potassium sulfate for chloride-sensitive crops.",
      chemicalFormula: "K₂SO₄",
      casNumber: "7778-80-5",
      hsCode: "3104.20",
      purity: "99.0%",
      applications: ["Fruit crops", "Vegetables", "Tobacco", "Potatoes"],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Water soluble",
        ph: "5.5-8.5"
      },
      packaging: ["25kg bags", "50kg bags", "1000kg bulk bags"],
      safetyInfo: ["Non-toxic", "Store in dry conditions"],
      price: "$55/50kg",
      availability: "In Stock",
      rating: 4.9,
      reviews: 89
    },
    {
      id: 104,
      name: "Calcium Nitrate",
      category: "Agriculture",
      subcategory: "Calcium Fertilizers",
      image: "https://images.pexels.com/photos/4022092/pexels-photo-4022092.jpeg",
      description: "Water-soluble calcium nitrate for greenhouse and field applications.",
      chemicalFormula: "Ca(NO₃)₂·4H₂O",
      casNumber: "13477-34-4",
      hsCode: "3102.60",
      purity: "99.0%",
      applications: ["Greenhouse crops", "Hydroponics", "Fertigation", "Foliar feeding"],
      specifications: {
        appearance: "White granules",
        solubility: "Highly water soluble",
        ph: "6.0-8.0"
      },
      packaging: ["25kg bags", "1000kg bulk bags"],
      safetyInfo: ["Oxidizing agent", "Keep away from combustibles"],
      price: "$48/25kg",
      availability: "In Stock",
      rating: 4.6,
      reviews: 134
    },
    {
      id: 105,
      name: "Magnesium Sulfate (Epsom Salt)",
      category: "Agriculture",
      subcategory: "Micronutrients",
      image: "https://images.pexels.com/photos/4022092/pexels-photo-4022092.jpeg",
      description: "Agricultural grade magnesium sulfate for magnesium deficiency correction.",
      chemicalFormula: "MgSO₄·7H₂O",
      casNumber: "10034-99-8",
      hsCode: "2833.21",
      purity: "99.5%",
      applications: ["Magnesium deficiency", "Soil amendment", "Foliar spray", "Hydroponics"],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Highly water soluble",
        ph: "5.5-6.5"
      },
      packaging: ["25kg bags", "50kg bags"],
      safetyInfo: ["Generally safe", "Avoid inhalation of dust"],
      price: "$25/25kg",
      availability: "In Stock",
      rating: 4.8,
      reviews: 167
    },

    // Home Care Products
    {
      id: 201,
      name: "Sodium Lauryl Sulfate (SLS)",
      category: "Home Care",
      subcategory: "Surfactants",
      image: "https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg",
      description: "Premium grade SLS for detergent and cleaning product formulations.",
      chemicalFormula: "C₁₂H₂₅SO₄Na",
      casNumber: "151-21-3",
      hsCode: "3402.11",
      purity: "95%",
      applications: ["Laundry detergents", "Dishwashing liquids", "Shampoos", "Cleaning products"],
      specifications: {
        appearance: "White to pale yellow powder",
        solubility: "Water soluble",
        ph: "7.0-9.5"
      },
      packaging: ["25kg bags", "50kg drums"],
      safetyInfo: ["Avoid contact with eyes", "Use in ventilated area"],
      price: "$85/25kg",
      availability: "In Stock",
      rating: 4.7,
      reviews: 245
    },
    {
      id: 202,
      name: "Linear Alkylbenzene Sulfonic Acid (LABSA)",
      category: "Home Care",
      subcategory: "Surfactants",
      image: "https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg",
      description: "High-quality LABSA for heavy-duty detergent manufacturing.",
      chemicalFormula: "C₁₈H₃₀O₃S",
      casNumber: "27176-87-0",
      hsCode: "3402.11",
      purity: "96%",
      applications: ["Heavy-duty detergents", "Industrial cleaners", "Household cleaners"],
      specifications: {
        appearance: "Brown viscous liquid",
        solubility: "Water soluble",
        ph: "1.0-2.0"
      },
      packaging: ["200kg drums", "1000kg IBC"],
      safetyInfo: ["Corrosive", "Handle with protective equipment"],
      price: "$95/200kg",
      availability: "In Stock",
      rating: 4.6,
      reviews: 189
    },
    {
      id: 203,
      name: "Sodium Tripolyphosphate (STPP)",
      category: "Home Care",
      subcategory: "Builders",
      image: "https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg",
      description: "Technical grade STPP for detergent formulations and water softening.",
      chemicalFormula: "Na₅P₃O₁₀",
      casNumber: "7758-29-4",
      hsCode: "2835.31",
      purity: "94%",
      applications: ["Detergent builder", "Water softening", "Metal cleaning", "Ceramic production"],
      specifications: {
        appearance: "White granular powder",
        solubility: "Water soluble",
        ph: "9.2-10.0"
      },
      packaging: ["25kg bags", "50kg bags", "1000kg bulk bags"],
      safetyInfo: ["Avoid inhalation", "Store in dry place"],
      price: "$75/25kg",
      availability: "In Stock",
      rating: 4.8,
      reviews: 156
    },
    {
      id: 204,
      name: "Sodium Carbonate (Soda Ash)",
      category: "Home Care",
      subcategory: "Alkalis",
      image: "https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg",
      description: "Dense grade sodium carbonate for detergent and cleaning applications.",
      chemicalFormula: "Na₂CO₃",
      casNumber: "497-19-8",
      hsCode: "2836.20",
      purity: "99.2%",
      applications: ["Detergent manufacturing", "pH adjustment", "Water treatment", "Glass production"],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Water soluble",
        ph: "11.0-12.0"
      },
      packaging: ["25kg bags", "50kg bags", "1000kg bulk bags"],
      safetyInfo: ["Caustic", "Avoid contact with skin and eyes"],
      price: "$35/25kg",
      availability: "In Stock",
      rating: 4.7,
      reviews: 298
    },
    {
      id: 205,
      name: "Citric Acid Monohydrate",
      category: "Home Care",
      subcategory: "Acids",
      image: "https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg",
      description: "Food grade citric acid for natural cleaning and descaling products.",
      chemicalFormula: "C₆H₈O₇·H₂O",
      casNumber: "5949-29-1",
      hsCode: "2918.14",
      purity: "99.5%",
      applications: ["Natural cleaners", "Descaling agents", "pH adjustment", "Fabric softeners"],
      specifications: {
        appearance: "White crystalline powder",
        solubility: "Highly water soluble",
        ph: "1.8-2.1"
      },
      packaging: ["25kg bags", "50kg bags"],
      safetyInfo: ["Food grade safe", "Avoid eye contact"],
      price: "$65/25kg",
      availability: "In Stock",
      rating: 4.9,
      reviews: 234
    },

    // Textile Dyes Products
    {
      id: 301,
      name: "Reactive Red 195",
      category: "Textile Dyes",
      subcategory: "Reactive Dyes",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg",
      description: "High-quality reactive red dye for cotton and cellulosic fibers.",
      chemicalFormula: "C₂₆H₂₀ClN₉O₁₀S₃Na₃",
      casNumber: "93050-80-7",
      hsCode: "3204.12",
      purity: "95%",
      applications: ["Cotton dyeing", "Cellulosic fibers", "Textile printing", "Garment dyeing"],
      specifications: {
        appearance: "Red powder",
        solubility: "Water soluble",
        ph: "7.0-9.0"
      },
      packaging: ["25kg drums", "50kg drums"],
      safetyInfo: ["Avoid inhalation", "Use protective equipment"],
      price: "$125/25kg",
      availability: "In Stock",
      rating: 4.8,
      reviews: 87
    },
    {
      id: 302,
      name: "Direct Blue 86",
      category: "Textile Dyes",
      subcategory: "Direct Dyes",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg",
      description: "Direct blue dye for cotton and viscose fiber dyeing.",
      chemicalFormula: "C₃₂H₂₂N₆O₆S₂Na₂",
      casNumber: "1330-38-7",
      hsCode: "3204.12",
      purity: "98%",
      applications: ["Cotton dyeing", "Viscose dyeing", "Paper dyeing", "Leather dyeing"],
      specifications: {
        appearance: "Blue powder",
        solubility: "Water soluble",
        ph: "6.0-8.0"
      },
      packaging: ["25kg drums", "50kg drums"],
      safetyInfo: ["Handle with care", "Avoid skin contact"],
      price: "$115/25kg",
      availability: "In Stock",
      rating: 4.7,
      reviews: 92
    },
    {
      id: 303,
      name: "Acid Yellow 23",
      category: "Textile Dyes",
      subcategory: "Acid Dyes",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg",
      description: "Acid yellow dye for wool, silk, and nylon dyeing.",
      chemicalFormula: "C₁₆H₁₀N₄O₉S₂Na₂",
      casNumber: "1934-21-0",
      hsCode: "3204.13",
      purity: "96%",
      applications: ["Wool dyeing", "Silk dyeing", "Nylon dyeing", "Leather dyeing"],
      specifications: {
        appearance: "Yellow powder",
        solubility: "Water soluble",
        ph: "4.0-6.0"
      },
      packaging: ["25kg drums"],
      safetyInfo: ["Avoid inhalation", "Store in cool place"],
      price: "$135/25kg",
      availability: "In Stock",
      rating: 4.6,
      reviews: 76
    },
    {
      id: 304,
      name: "Disperse Red 60",
      category: "Textile Dyes",
      subcategory: "Disperse Dyes",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg",
      description: "Disperse red dye for polyester and synthetic fiber dyeing.",
      chemicalFormula: "C₂₀H₁₃N₃O₄",
      casNumber: "17418-58-5",
      hsCode: "3204.14",
      purity: "97%",
      applications: ["Polyester dyeing", "Synthetic fiber dyeing", "Sublimation printing"],
      specifications: {
        appearance: "Red powder",
        solubility: "Dispersible in water",
        ph: "5.0-7.0"
      },
      packaging: ["25kg drums"],
      safetyInfo: ["Avoid dust formation", "Use ventilation"],
      price: "$145/25kg",
      availability: "In Stock",
      rating: 4.8,
      reviews: 64
    },
    {
      id: 305,
      name: "Vat Blue 1",
      category: "Textile Dyes",
      subcategory: "Vat Dyes",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg",
      description: "Indigo vat dye for denim and cotton dyeing.",
      chemicalFormula: "C₁₆H₁₀N₂O₂",
      casNumber: "482-89-3",
      hsCode: "3204.15",
      purity: "95%",
      applications: ["Denim dyeing", "Cotton dyeing", "Traditional textiles"],
      specifications: {
        appearance: "Dark blue powder",
        solubility: "Insoluble in water",
        ph: "11.0-13.0"
      },
      packaging: ["25kg drums"],
      safetyInfo: ["Handle with protective equipment", "Avoid skin contact"],
      price: "$165/25kg",
      availability: "In Stock",
      rating: 4.9,
      reviews: 58
    },

    // Water Treatment Products
    {
      id: 401,
      name: "Polyaluminium Chloride (PAC)",
      category: "Water Treatment",
      subcategory: "Coagulants",
      image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg",
      description: "High-efficiency coagulant for water and wastewater treatment.",
      chemicalFormula: "[Al₂(OH)ₙCl₆₋ₙ]ₘ",
      casNumber: "1327-41-9",
      hsCode: "3824.90",
      purity: "30% Al₂O₃",
      applications: ["Drinking water treatment", "Wastewater treatment", "Industrial water treatment"],
      specifications: {
        appearance: "Light yellow liquid",
        solubility: "Water soluble",
        ph: "3.5-5.0"
      },
      packaging: ["200kg drums", "1000kg IBC"],
      safetyInfo: ["Corrosive", "Handle with protective equipment"],
      price: "$85/200kg",
      availability: "In Stock",
      rating: 4.8,
      reviews: 156
    },
    {
      id: 402,
      name: "Ferric Chloride",
      category: "Water Treatment",
      subcategory: "Coagulants",
      image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg",
      description: "Anhydrous ferric chloride for water treatment and etching applications.",
      chemicalFormula: "FeCl₃",
      casNumber: "7705-08-0",
      hsCode: "2827.32",
      purity: "98%",
      applications: ["Water treatment", "Wastewater treatment", "PCB etching", "Sewage treatment"],
      specifications: {
        appearance: "Dark brown/black crystals",
        solubility: "Highly water soluble",
        ph: "1.0-2.0"
      },
      packaging: ["25kg bags", "50kg drums"],
      safetyInfo: ["Highly corrosive", "Avoid contact with skin"],
      price: "$45/25kg",
      availability: "In Stock",
      rating: 4.7,
      reviews: 134
    },
    {
      id: 403,
      name: "Activated Carbon",
      category: "Water Treatment",
      subcategory: "Adsorbents",
      image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg",
      description: "High-quality activated carbon for water purification and air treatment.",
      chemicalFormula: "C",
      casNumber: "7440-44-0",
      hsCode: "3802.10",
      purity: "85% Carbon",
      applications: ["Water purification", "Air treatment", "Decolorization", "Odor removal"],
      specifications: {
        appearance: "Black granules/powder",
        solubility: "Insoluble in water",
        ph: "6.0-8.0"
      },
      packaging: ["25kg bags", "500kg bulk bags"],
      safetyInfo: ["Avoid inhalation of dust", "Store in dry place"],
      price: "$125/25kg",
      availability: "In Stock",
      rating: 4.9,
      reviews: 198
    },
    {
      id: 404,
      name: "Sodium Hypochlorite",
      category: "Water Treatment",
      subcategory: "Disinfectants",
      image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg",
      description: "Liquid sodium hypochlorite for water disinfection and bleaching.",
      chemicalFormula: "NaClO",
      casNumber: "7681-52-9",
      hsCode: "2828.90",
      purity: "12-15% Available Chlorine",
      applications: ["Water disinfection", "Swimming pool treatment", "Bleaching", "Sanitization"],
      specifications: {
        appearance: "Pale yellow liquid",
        solubility: "Water soluble",
        ph: "11.0-13.0"
      },
      packaging: ["25kg cans", "200kg drums"],
      safetyInfo: ["Oxidizing agent", "Keep away from acids"],
      price: "$35/25kg",
      availability: "In Stock",
      rating: 4.6,
      reviews: 267
    },
    {
      id: 405,
      name: "Calcium Hypochlorite",
      category: "Water Treatment",
      subcategory: "Disinfectants",
      image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg",
      description: "High-test hypochlorite for water treatment and disinfection.",
      chemicalFormula: "Ca(ClO)₂",
      casNumber: "7778-54-3",
      hsCode: "2828.10",
      purity: "65-70% Available Chlorine",
      applications: ["Swimming pool disinfection", "Water treatment", "Bleaching powder"],
      specifications: {
        appearance: "White granular powder",
        solubility: "Partially water soluble",
        ph: "10.4-11.8"
      },
      packaging: ["25kg drums", "50kg drums"],
      safetyInfo: ["Strong oxidizer", "Keep away from organic materials"],
      price: "$55/25kg",
      availability: "In Stock",
      rating: 4.7,
      reviews: 145
    },

    // Industrial Solvents (60 products)
    {
      id: 501,
      name: "Acetone",
      category: "Industrial Solvents",
      subcategory: "Ketones",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "High-purity acetone for industrial cleaning and solvent applications.",
      chemicalFormula: "C₃H₆O",
      casNumber: "67-64-1",
      hsCode: "2914.11",
      purity: "99.5%",
      applications: ["Paint thinner", "Nail polish remover", "Cleaning solvent", "Chemical intermediate"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "56.05°C",
        density: "0.784 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC"],
      safetyInfo: ["Highly flammable", "Use in ventilated area", "Keep away from ignition sources"],
      price: "$125/200L",
      availability: "In Stock",
      rating: 4.8,
      reviews: 234
    },
    {
      id: 502,
      name: "Methanol",
      category: "Industrial Solvents",
      subcategory: "Alcohols",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "Technical grade methanol for industrial applications and fuel blending.",
      chemicalFormula: "CH₃OH",
      casNumber: "67-56-1",
      hsCode: "2905.11",
      purity: "99.8%",
      applications: ["Fuel additive", "Solvent", "Antifreeze", "Chemical feedstock"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "64.7°C",
        density: "0.792 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC"],
      safetyInfo: ["Toxic", "Flammable", "Avoid inhalation and skin contact"],
      price: "$95/200L",
      availability: "In Stock",
      rating: 4.7,
      reviews: 189
    },
    {
      id: 503,
      name: "Ethanol (Denatured)",
      category: "Industrial Solvents",
      subcategory: "Alcohols",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "Denatured ethanol for industrial cleaning and solvent applications.",
      chemicalFormula: "C₂H₅OH",
      casNumber: "64-17-5",
      hsCode: "2207.20",
      purity: "95%",
      applications: ["Cleaning solvent", "Disinfectant", "Paint thinner", "Extraction solvent"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "78.37°C",
        density: "0.789 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC"],
      safetyInfo: ["Flammable", "Denatured - not for consumption"],
      price: "$115/200L",
      availability: "In Stock",
      rating: 4.6,
      reviews: 156
    },
    {
      id: 504,
      name: "Isopropyl Alcohol (IPA)",
      category: "Industrial Solvents",
      subcategory: "Alcohols",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "High-purity isopropyl alcohol for cleaning and disinfection.",
      chemicalFormula: "C₃H₈O",
      casNumber: "67-63-0",
      hsCode: "2905.12",
      purity: "99.9%",
      applications: ["Electronics cleaning", "Disinfectant", "Solvent", "Dehydrating agent"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "82.6°C",
        density: "0.786 g/cm³"
      },
      packaging: ["25L cans", "200L drums"],
      safetyInfo: ["Flammable", "Use in ventilated area"],
      price: "$145/200L",
      availability: "In Stock",
      rating: 4.9,
      reviews: 298
    },
    {
      id: 505,
      name: "Toluene",
      category: "Industrial Solvents",
      subcategory: "Aromatics",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "Industrial grade toluene for paint, adhesive, and rubber applications.",
      chemicalFormula: "C₇H₈",
      casNumber: "108-88-3",
      hsCode: "2902.30",
      purity: "99.5%",
      applications: ["Paint solvent", "Adhesive production", "Rubber processing", "Chemical intermediate"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Insoluble in water",
        boilingPoint: "110.6°C",
        density: "0.867 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC"],
      safetyInfo: ["Flammable", "Toxic vapors", "Use respiratory protection"],
      price: "$135/200L",
      availability: "In Stock",
      rating: 4.7,
      reviews: 167
    },
    {
      id: 506,
      name: "Xylene (Mixed Isomers)",
      category: "Industrial Solvents",
      subcategory: "Aromatics",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "Mixed xylene isomers for paint, printing ink, and rubber applications.",
      chemicalFormula: "C₈H₁₀",
      casNumber: "1330-20-7",
      hsCode: "2902.41",
      purity: "99%",
      applications: ["Paint thinner", "Printing inks", "Rubber processing", "Adhesives"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Insoluble in water",
        boilingPoint: "137-144°C",
        density: "0.864 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC"],
      safetyInfo: ["Flammable", "Harmful vapors", "Avoid prolonged exposure"],
      price: "$140/200L",
      availability: "In Stock",
      rating: 4.6,
      reviews: 134
    },
    {
      id: 507,
      name: "Benzene",
      category: "Industrial Solvents",
      subcategory: "Aromatics",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "High-purity benzene for chemical synthesis and industrial applications.",
      chemicalFormula: "C₆H₆",
      casNumber: "71-43-2",
      hsCode: "2902.20",
      purity: "99.9%",
      applications: ["Chemical synthesis", "Solvent", "Fuel additive", "Pharmaceutical intermediate"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Slightly soluble in water",
        boilingPoint: "80.1°C",
        density: "0.879 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Carcinogenic", "Highly regulated", "Special handling required"],
      price: "$185/200L",
      availability: "Special Order",
      rating: 4.5,
      reviews: 89
    },
    {
      id: 508,
      name: "Ethyl Acetate",
      category: "Industrial Solvents",
      subcategory: "Esters",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "High-quality ethyl acetate for coatings, adhesives, and extraction.",
      chemicalFormula: "C₄H₈O₂",
      casNumber: "141-78-6",
      hsCode: "2915.31",
      purity: "99.5%",
      applications: ["Paint solvent", "Nail polish", "Adhesives", "Extraction solvent"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Slightly soluble in water",
        boilingPoint: "77.1°C",
        density: "0.902 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC"],
      safetyInfo: ["Flammable", "Irritant", "Use adequate ventilation"],
      price: "$155/200L",
      availability: "In Stock",
      rating: 4.8,
      reviews: 178
    },
    {
      id: 509,
      name: "Butyl Acetate",
      category: "Industrial Solvents",
      subcategory: "Esters",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "N-butyl acetate for lacquers, paints, and coating applications.",
      chemicalFormula: "C₆H₁₂O₂",
      casNumber: "123-86-4",
      hsCode: "2915.33",
      purity: "99%",
      applications: ["Lacquer solvent", "Paint thinner", "Coatings", "Printing inks"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Slightly soluble in water",
        boilingPoint: "126.1°C",
        density: "0.882 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC"],
      safetyInfo: ["Flammable", "Narcotic effects", "Avoid inhalation"],
      price: "$165/200L",
      availability: "In Stock",
      rating: 4.7,
      reviews: 145
    },
    {
      id: 510,
      name: "Methyl Ethyl Ketone (MEK)",
      category: "Industrial Solvents",
      subcategory: "Ketones",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "High-purity MEK for adhesives, coatings, and cleaning applications.",
      chemicalFormula: "C₄H₈O",
      casNumber: "78-93-3",
      hsCode: "2914.12",
      purity: "99.5%",
      applications: ["Adhesive solvent", "Paint remover", "Cleaning agent", "Dewaxing"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "79.64°C",
        density: "0.805 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC"],
      safetyInfo: ["Highly flammable", "Irritant", "Use respiratory protection"],
      price: "$175/200L",
      availability: "In Stock",
      rating: 4.6,
      reviews: 167
    },
    {
      id: 511,
      name: "Cyclohexanone",
      category: "Industrial Solvents",
      subcategory: "Ketones",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "Industrial grade cyclohexanone for nylon production and solvent applications.",
      chemicalFormula: "C₆H₁₀O",
      casNumber: "108-94-1",
      hsCode: "2914.22",
      purity: "99%",
      applications: ["Nylon production", "Paint solvent", "Adhesives", "Spot remover"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Slightly soluble in water",
        boilingPoint: "155.7°C",
        density: "0.947 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Flammable", "Harmful vapors", "Avoid skin contact"],
      price: "$195/200L",
      availability: "In Stock",
      rating: 4.5,
      reviews: 98
    },
    {
      id: 512,
      name: "Dichloromethane (DCM)",
      category: "Industrial Solvents",
      subcategory: "Chlorinated Solvents",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "High-purity dichloromethane for extraction and degreasing applications.",
      chemicalFormula: "CH₂Cl₂",
      casNumber: "75-09-2",
      hsCode: "2903.12",
      purity: "99.9%",
      applications: ["Paint stripping", "Degreasing", "Extraction solvent", "Aerosol propellant"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Slightly soluble in water",
        boilingPoint: "39.6°C",
        density: "1.326 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Suspected carcinogen", "Use in ventilated area", "Avoid inhalation"],
      price: "$225/200L",
      availability: "In Stock",
      rating: 4.4,
      reviews: 123
    },
    {
      id: 513,
      name: "Trichloroethylene",
      category: "Industrial Solvents",
      subcategory: "Chlorinated Solvents",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "Industrial grade trichloroethylene for metal degreasing and cleaning.",
      chemicalFormula: "C₂HCl₃",
      casNumber: "79-01-6",
      hsCode: "2903.23",
      purity: "99%",
      applications: ["Metal degreasing", "Dry cleaning", "Extraction solvent", "Chemical intermediate"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Slightly soluble in water",
        boilingPoint: "87.21°C",
        density: "1.464 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Carcinogenic", "Highly regulated", "Special handling required"],
      price: "$245/200L",
      availability: "Special Order",
      rating: 4.3,
      reviews: 87
    },
    {
      id: 514,
      name: "Perchloroethylene (PCE)",
      category: "Industrial Solvents",
      subcategory: "Chlorinated Solvents",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "High-purity perchloroethylene for dry cleaning and degreasing.",
      chemicalFormula: "C₂Cl₄",
      casNumber: "127-18-4",
      hsCode: "2903.23",
      purity: "99.9%",
      applications: ["Dry cleaning", "Metal degreasing", "Chemical intermediate", "Textile processing"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Insoluble in water",
        boilingPoint: "121.3°C",
        density: "1.623 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Probable carcinogen", "Environmental hazard", "Restricted use"],
      price: "$265/200L",
      availability: "Special Order",
      rating: 4.2,
      reviews: 76
    },
    {
      id: 515,
      name: "Hexane",
      category: "Industrial Solvents",
      subcategory: "Aliphatic Hydrocarbons",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "Technical grade n-hexane for extraction and cleaning applications.",
      chemicalFormula: "C₆H₁₄",
      casNumber: "110-54-3",
      hsCode: "2901.10",
      purity: "95%",
      applications: ["Oil extraction", "Cleaning solvent", "Adhesive production", "Laboratory use"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Insoluble in water",
        boilingPoint: "68.7°C",
        density: "0.659 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC"],
      safetyInfo: ["Highly flammable", "Neurotoxic", "Use adequate ventilation"],
      price: "$125/200L",
      availability: "In Stock",
      rating: 4.6,
      reviews: 145
    },
    {
      id: 516,
      name: "Heptane",
      category: "Industrial Solvents",
      subcategory: "Aliphatic Hydrocarbons",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "High-purity n-heptane for laboratory and industrial applications.",
      chemicalFormula: "C₇H₁₆",
      casNumber: "142-82-5",
      hsCode: "2901.10",
      purity: "99%",
      applications: ["Solvent", "Fuel additive", "Laboratory standard", "Extraction"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Insoluble in water",
        boilingPoint: "98.4°C",
        density: "0.684 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Flammable", "Narcotic effects", "Avoid inhalation"],
      price: "$135/200L",
      availability: "In Stock",
      rating: 4.5,
      reviews: 98
    },
    {
      id: 517,
      name: "Octane",
      category: "Industrial Solvents",
      subcategory: "Aliphatic Hydrocarbons",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "Technical grade n-octane for fuel and solvent applications.",
      chemicalFormula: "C₈H₁₈",
      casNumber: "111-65-9",
      hsCode: "2901.10",
      purity: "98%",
      applications: ["Fuel component", "Solvent", "Calibration standard", "Chemical synthesis"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Insoluble in water",
        boilingPoint: "125.7°C",
        density: "0.703 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Flammable", "Aspiration hazard", "Keep away from heat"],
      price: "$145/200L",
      availability: "In Stock",
      rating: 4.4,
      reviews: 87
    },
    {
      id: 518,
      name: "Cyclohexane",
      category: "Industrial Solvents",
      subcategory: "Cyclic Hydrocarbons",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "High-purity cyclohexane for nylon production and solvent applications.",
      chemicalFormula: "C₆H₁₂",
      casNumber: "110-82-7",
      hsCode: "2902.11",
      purity: "99.5%",
      applications: ["Nylon production", "Paint thinner", "Adhesive solvent", "Extraction"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Insoluble in water",
        boilingPoint: "80.7°C",
        density: "0.779 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC"],
      safetyInfo: ["Highly flammable", "Narcotic effects", "Use ventilation"],
      price: "$155/200L",
      availability: "In Stock",
      rating: 4.7,
      reviews: 134
    },
    {
      id: 519,
      name: "Methylcyclohexane",
      category: "Industrial Solvents",
      subcategory: "Cyclic Hydrocarbons",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "Industrial grade methylcyclohexane for solvent and extraction applications.",
      chemicalFormula: "C₇H₁₄",
      casNumber: "108-87-2",
      hsCode: "2902.19",
      purity: "98%",
      applications: ["Solvent", "Extraction", "Paint thinner", "Rubber processing"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Insoluble in water",
        boilingPoint: "100.9°C",
        density: "0.769 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Flammable", "Harmful vapors", "Avoid prolonged exposure"],
      price: "$165/200L",
      availability: "In Stock",
      rating: 4.5,
      reviews: 76
    },
    {
      id: 520,
      name: "Diethyl Ether",
      category: "Industrial Solvents",
      subcategory: "Ethers",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "High-purity diethyl ether for extraction and laboratory applications.",
      chemicalFormula: "C₄H₁₀O",
      casNumber: "60-29-7",
      hsCode: "2909.11",
      purity: "99.5%",
      applications: ["Extraction solvent", "Laboratory reagent", "Anesthetic", "Starting fluid"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Slightly soluble in water",
        boilingPoint: "34.6°C",
        density: "0.713 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Extremely flammable", "Forms peroxides", "Special storage required"],
      price: "$285/200L",
      availability: "Special Order",
      rating: 4.6,
      reviews: 98
    },
    {
      id: 521,
      name: "Tetrahydrofuran (THF)",
      category: "Industrial Solvents",
      subcategory: "Ethers",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "High-quality THF for polymer production and laboratory applications.",
      chemicalFormula: "C₄H₈O",
      casNumber: "109-99-9",
      hsCode: "2932.20",
      purity: "99.9%",
      applications: ["Polymer solvent", "Chemical synthesis", "Laboratory reagent", "Adhesives"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "66°C",
        density: "0.889 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Highly flammable", "Forms peroxides", "Carcinogenic"],
      price: "$325/200L",
      availability: "Special Order",
      rating: 4.5,
      reviews: 87
    },
    {
      id: 522,
      name: "Dioxane",
      category: "Industrial Solvents",
      subcategory: "Ethers",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "Technical grade 1,4-dioxane for industrial and laboratory use.",
      chemicalFormula: "C₄H₈O₂",
      casNumber: "123-91-1",
      hsCode: "2932.20",
      purity: "99%",
      applications: ["Solvent", "Chemical intermediate", "Laboratory reagent", "Paint stripper"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "101.1°C",
        density: "1.034 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Probable carcinogen", "Flammable", "Forms peroxides"],
      price: "$295/200L",
      availability: "Special Order",
      rating: 4.3,
      reviews: 65
    },
    {
      id: 523,
      name: "Dimethylformamide (DMF)",
      category: "Industrial Solvents",
      subcategory: "Amides",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "High-purity DMF for polymer production and chemical synthesis.",
      chemicalFormula: "C₃H₇NO",
      casNumber: "68-12-2",
      hsCode: "2924.12",
      purity: "99.8%",
      applications: ["Polymer solvent", "Chemical synthesis", "Pharmaceutical production", "Electronics"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "153°C",
        density: "0.944 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Reproductive toxin", "Hepatotoxic", "Use protective equipment"],
      price: "$275/200L",
      availability: "In Stock",
      rating: 4.4,
      reviews: 112
    },
    {
      id: 524,
      name: "Dimethyl Sulfoxide (DMSO)",
      category: "Industrial Solvents",
      subcategory: "Sulfur Compounds",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "High-purity DMSO for pharmaceutical and industrial applications.",
      chemicalFormula: "C₂H₆OS",
      casNumber: "67-68-5",
      hsCode: "2930.90",
      purity: "99.9%",
      applications: ["Pharmaceutical solvent", "Cryoprotectant", "Paint stripper", "Chemical reaction medium"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "189°C",
        density: "1.092 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Penetrates skin", "Use gloves", "Avoid contamination"],
      price: "$385/200L",
      availability: "In Stock",
      rating: 4.7,
      reviews: 145
    },
    {
      id: 525,
      name: "N-Methyl-2-pyrrolidone (NMP)",
      category: "Industrial Solvents",
      subcategory: "Lactams",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "High-quality NMP for electronics and polymer applications.",
      chemicalFormula: "C₅H₉NO",
      casNumber: "872-50-4",
      hsCode: "2933.79",
      purity: "99.5%",
      applications: ["Electronics cleaning", "Polymer processing", "Paint stripper", "Pharmaceutical solvent"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "202°C",
        density: "1.028 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Reproductive toxin", "Restricted use", "Special handling required"],
      price: "$425/200L",
      availability: "Special Order",
      rating: 4.5,
      reviews: 89
    },
    {
      id: 526,
      name: "Propylene Glycol",
      category: "Industrial Solvents",
      subcategory: "Glycols",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "USP grade propylene glycol for food, pharmaceutical, and industrial use.",
      chemicalFormula: "C₃H₈O₂",
      casNumber: "57-55-6",
      hsCode: "2905.32",
      purity: "99.5%",
      applications: ["Food additive", "Pharmaceutical excipient", "Antifreeze", "Cosmetic ingredient"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "188.2°C",
        density: "1.036 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC"],
      safetyInfo: ["Generally safe", "Food grade available"],
      price: "$185/200L",
      availability: "In Stock",
      rating: 4.8,
      reviews: 234
    },
    {
      id: 527,
      name: "Ethylene Glycol",
      category: "Industrial Solvents",
      subcategory: "Glycols",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "Technical grade ethylene glycol for antifreeze and industrial applications.",
      chemicalFormula: "C₂H₆O₂",
      casNumber: "107-21-1",
      hsCode: "2905.31",
      purity: "99%",
      applications: ["Antifreeze", "Coolant", "Polyester production", "Deicing fluid"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "197.3°C",
        density: "1.113 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC"],
      safetyInfo: ["Toxic if ingested", "Avoid skin contact"],
      price: "$165/200L",
      availability: "In Stock",
      rating: 4.6,
      reviews: 189
    },
    {
      id: 528,
      name: "Diethylene Glycol",
      category: "Industrial Solvents",
      subcategory: "Glycols",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "Industrial grade diethylene glycol for solvent and chemical applications.",
      chemicalFormula: "C₄H₁₀O₃",
      casNumber: "111-46-6",
      hsCode: "2905.39",
      purity: "99%",
      applications: ["Solvent", "Humectant", "Chemical intermediate", "Brake fluid"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "245°C",
        density: "1.118 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Toxic", "Avoid ingestion", "Use protective equipment"],
      price: "$175/200L",
      availability: "In Stock",
      rating: 4.5,
      reviews: 123
    },
    {
      id: 529,
      name: "Triethylene Glycol",
      category: "Industrial Solvents",
      subcategory: "Glycols",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "High-purity triethylene glycol for gas dehydration and solvent use.",
      chemicalFormula: "C₆H₁₄O₄",
      casNumber: "112-27-6",
      hsCode: "2905.39",
      purity: "99%",
      applications: ["Gas dehydration", "Solvent", "Plasticizer", "Humectant"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "285°C",
        density: "1.125 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Low toxicity", "Avoid prolonged skin contact"],
      price: "$195/200L",
      availability: "In Stock",
      rating: 4.4,
      reviews: 98
    },
    {
      id: 530,
      name: "Glycerol (Glycerin)",
      category: "Industrial Solvents",
      subcategory: "Polyols",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "USP grade glycerol for pharmaceutical, food, and industrial applications.",
      chemicalFormula: "C₃H₈O₃",
      casNumber: "56-81-5",
      hsCode: "2905.45",
      purity: "99.5%",
      applications: ["Pharmaceutical excipient", "Food additive", "Cosmetics", "Antifreeze"],
      specifications: {
        appearance: "Colorless viscous liquid",
        solubility: "Miscible with water",
        boilingPoint: "290°C",
        density: "1.261 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC"],
      safetyInfo: ["Generally safe", "Food grade"],
      price: "$225/200L",
      availability: "In Stock",
      rating: 4.9,
      reviews: 267
    },
    {
      id: 531,
      name: "Phenol",
      category: "Industrial Solvents",
      subcategory: "Phenols",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "Technical grade phenol for resin production and chemical synthesis.",
      chemicalFormula: "C₆H₅OH",
      casNumber: "108-95-2",
      hsCode: "2907.11",
      purity: "99%",
      applications: ["Phenolic resins", "Nylon production", "Pharmaceuticals", "Disinfectants"],
      specifications: {
        appearance: "White crystalline solid",
        solubility: "Slightly soluble in water",
        meltingPoint: "40.5°C",
        density: "1.071 g/cm³"
      },
      packaging: ["200kg drums"],
      safetyInfo: ["Highly toxic", "Corrosive", "Special handling required"],
      price: "$285/200kg",
      availability: "Special Order",
      rating: 4.3,
      reviews: 76
    },
    {
      id: 532,
      name: "Cresol (Mixed Isomers)",
      category: "Industrial Solvents",
      subcategory: "Phenols",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "Technical grade mixed cresols for resin and disinfectant production.",
      chemicalFormula: "C₇H₈O",
      casNumber: "1319-77-3",
      hsCode: "2907.12",
      purity: "98%",
      applications: ["Disinfectants", "Resins", "Antioxidants", "Preservatives"],
      specifications: {
        appearance: "Colorless to yellow liquid",
        solubility: "Slightly soluble in water",
        boilingPoint: "191-203°C",
        density: "1.03 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Toxic", "Corrosive", "Avoid skin contact"],
      price: "$265/200L",
      availability: "In Stock",
      rating: 4.4,
      reviews: 89
    },
    {
      id: 533,
      name: "Aniline",
      category: "Industrial Solvents",
      subcategory: "Amines",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "High-purity aniline for dye and pharmaceutical production.",
      chemicalFormula: "C₆H₅NH₂",
      casNumber: "62-53-3",
      hsCode: "2921.41",
      purity: "99.5%",
      applications: ["Dye production", "Pharmaceuticals", "Rubber chemicals", "Polyurethane"],
      specifications: {
        appearance: "Colorless to pale yellow liquid",
        solubility: "Slightly soluble in water",
        boilingPoint: "184.1°C",
        density: "1.022 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Carcinogenic", "Toxic", "Special handling required"],
      price: "$325/200L",
      availability: "Special Order",
      rating: 4.2,
      reviews: 67
    },
    {
      id: 534,
      name: "Pyridine",
      category: "Industrial Solvents",
      subcategory: "Heterocycles",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "High-purity pyridine for pharmaceutical and chemical synthesis.",
      chemicalFormula: "C₅H₅N",
      casNumber: "110-86-1",
      hsCode: "2933.31",
      purity: "99%",
      applications: ["Pharmaceutical synthesis", "Solvent", "Chemical intermediate", "Denaturant"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "115.2°C",
        density: "0.982 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Flammable", "Toxic", "Strong odor"],
      price: "$385/200L",
      availability: "Special Order",
      rating: 4.5,
      reviews: 78
    },
    {
      id: 535,
      name: "Quinoline",
      category: "Industrial Solvents",
      subcategory: "Heterocycles",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "Technical grade quinoline for pharmaceutical and dye applications.",
      chemicalFormula: "C₉H₇N",
      casNumber: "91-22-5",
      hsCode: "2933.39",
      purity: "97%",
      applications: ["Pharmaceutical intermediate", "Dye production", "Solvent", "Preservative"],
      specifications: {
        appearance: "Colorless to pale yellow liquid",
        solubility: "Slightly soluble in water",
        boilingPoint: "237.1°C",
        density: "1.093 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Toxic", "Suspected carcinogen", "Avoid inhalation"],
      price: "$425/200L",
      availability: "Special Order",
      rating: 4.3,
      reviews: 56
    },
    {
      id: 536,
      name: "Morpholine",
      category: "Industrial Solvents",
      subcategory: "Heterocycles",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "High-purity morpholine for rubber and pharmaceutical applications.",
      chemicalFormula: "C₄H₉NO",
      casNumber: "110-91-8",
      hsCode: "2934.99",
      purity: "99%",
      applications: ["Rubber accelerator", "Corrosion inhibitor", "Pharmaceutical intermediate", "Solvent"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "128.9°C",
        density: "1.007 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Flammable", "Corrosive", "Avoid skin contact"],
      price: "$365/200L",
      availability: "In Stock",
      rating: 4.6,
      reviews: 94
    },
    {
      id: 537,
      name: "Furfural",
      category: "Industrial Solvents",
      subcategory: "Furans",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "Bio-based furfural for solvent and chemical intermediate applications.",
      chemicalFormula: "C₅H₄O₂",
      casNumber: "98-01-1",
      hsCode: "2932.21",
      purity: "98%",
      applications: ["Solvent refining", "Resin production", "Chemical intermediate", "Foundry sand binder"],
      specifications: {
        appearance: "Colorless to pale yellow liquid",
        solubility: "Slightly soluble in water",
        boilingPoint: "161.7°C",
        density: "1.160 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Irritant", "Suspected carcinogen", "Avoid prolonged exposure"],
      price: "$285/200L",
      availability: "In Stock",
      rating: 4.5,
      reviews: 87
    },
    {
      id: 538,
      name: "Tetrahydrofurfuryl Alcohol",
      category: "Industrial Solvents",
      subcategory: "Furans",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "High-quality THFA for solvent and chemical intermediate use.",
      chemicalFormula: "C₅H₁₀O₂",
      casNumber: "97-99-4",
      hsCode: "2932.29",
      purity: "99%",
      applications: ["Solvent", "Chemical intermediate", "Resin modifier", "Coating additive"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "178°C",
        density: "1.054 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Combustible", "Mild irritant", "Use ventilation"],
      price: "$325/200L",
      availability: "In Stock",
      rating: 4.4,
      reviews: 76
    },
    {
      id: 539,
      name: "Ethyl Lactate",
      category: "Industrial Solvents",
      subcategory: "Green Solvents",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "Bio-based ethyl lactate for environmentally friendly applications.",
      chemicalFormula: "C₅H₁₀O₃",
      casNumber: "97-64-3",
      hsCode: "2918.19",
      purity: "98%",
      applications: ["Green solvent", "Coatings", "Electronics cleaning", "Pharmaceutical intermediate"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "154°C",
        density: "1.030 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Biodegradable", "Low toxicity", "Environmentally friendly"],
      price: "$385/200L",
      availability: "In Stock",
      rating: 4.8,
      reviews: 145
    },
    {
      id: 540,
      name: "Methyl Lactate",
      category: "Industrial Solvents",
      subcategory: "Green Solvents",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "Sustainable methyl lactate for eco-friendly solvent applications.",
      chemicalFormula: "C₄H₈O₃",
      casNumber: "547-64-8",
      hsCode: "2918.19",
      purity: "98%",
      applications: ["Green solvent", "Paint stripper", "Electronics cleaning", "Biodegradable cleaner"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "144.8°C",
        density: "1.092 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Biodegradable", "Low toxicity", "REACH compliant"],
      price: "$365/200L",
      availability: "In Stock",
      rating: 4.7,
      reviews: 123
    },
    {
      id: 541,
      name: "D-Limonene",
      category: "Industrial Solvents",
      subcategory: "Natural Solvents",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "Natural citrus-derived d-limonene for cleaning and degreasing.",
      chemicalFormula: "C₁₀H₁₆",
      casNumber: "5989-27-5",
      hsCode: "2902.90",
      purity: "95%",
      applications: ["Natural cleaner", "Degreaser", "Paint thinner", "Adhesive remover"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Insoluble in water",
        boilingPoint: "176°C",
        density: "0.841 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Natural product", "Skin sensitizer", "Flammable"],
      price: "$285/200L",
      availability: "In Stock",
      rating: 4.9,
      reviews: 189
    },
    {
      id: 542,
      name: "Pine Oil",
      category: "Industrial Solvents",
      subcategory: "Natural Solvents",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "Natural pine oil for cleaning and disinfectant applications.",
      chemicalFormula: "Mixed Terpenes",
      casNumber: "8002-09-3",
      hsCode: "3301.90",
      purity: "85% Terpenes",
      applications: ["Disinfectant", "Cleaner", "Deodorizer", "Flotation agent"],
      specifications: {
        appearance: "Pale yellow liquid",
        solubility: "Insoluble in water",
        boilingPoint: "150-180°C",
        density: "0.92 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Natural product", "Mild irritant", "Pleasant odor"],
      price: "$225/200L",
      availability: "In Stock",
      rating: 4.6,
      reviews: 134
    },
    {
      id: 543,
      name: "Turpentine",
      category: "Industrial Solvents",
      subcategory: "Natural Solvents",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "Gum turpentine for paint thinning and natural solvent applications.",
      chemicalFormula: "C₁₀H₁₆",
      casNumber: "8006-64-2",
      hsCode: "3805.10",
      purity: "90% Terpenes",
      applications: ["Paint thinner", "Varnish solvent", "Cleaning agent", "Art supplies"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Insoluble in water",
        boilingPoint: "150-180°C",
        density: "0.86 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Flammable", "Skin irritant", "Use ventilation"],
      price: "$195/200L",
      availability: "In Stock",
      rating: 4.5,
      reviews: 98
    },
    {
      id: 544,
      name: "White Spirit",
      category: "Industrial Solvents",
      subcategory: "Petroleum Solvents",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "Low aromatic white spirit for paint and coating applications.",
      chemicalFormula: "C₇-C₁₂ Hydrocarbons",
      casNumber: "64742-88-7",
      hsCode: "2710.12",
      purity: "99%",
      applications: ["Paint thinner", "Degreaser", "Dry cleaning", "Extraction solvent"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Insoluble in water",
        boilingPoint: "140-200°C",
        density: "0.78 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC"],
      safetyInfo: ["Flammable", "Narcotic effects", "Avoid inhalation"],
      price: "$115/200L",
      availability: "In Stock",
      rating: 4.7,
      reviews: 167
    },
    {
      id: 545,
      name: "Mineral Spirits",
      category: "Industrial Solvents",
      subcategory: "Petroleum Solvents",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "Odorless mineral spirits for paint and cleaning applications.",
      chemicalFormula: "C₇-C₁₂ Hydrocarbons",
      casNumber: "64742-88-7",
      hsCode: "2710.12",
      purity: "99%",
      applications: ["Paint thinner", "Parts cleaner", "Degreaser", "Brush cleaner"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Insoluble in water",
        boilingPoint: "150-200°C",
        density: "0.79 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC"],
      safetyInfo: ["Flammable", "Aspiration hazard", "Use ventilation"],
      price: "$125/200L",
      availability: "In Stock",
      rating: 4.6,
      reviews: 145
    },
    {
      id: 546,
      name: "Naphtha (VM&P)",
      category: "Industrial Solvents",
      subcategory: "Petroleum Solvents",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "Varnish makers' and painters' naphtha for coating applications.",
      chemicalFormula: "C₅-C₉ Hydrocarbons",
      casNumber: "64742-89-8",
      hsCode: "2710.12",
      purity: "98%",
      applications: ["Paint thinner", "Varnish solvent", "Rubber solvent", "Dry cleaning"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Insoluble in water",
        boilingPoint: "100-160°C",
        density: "0.75 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Highly flammable", "Narcotic effects", "Avoid prolonged exposure"],
      price: "$135/200L",
      availability: "In Stock",
      rating: 4.5,
      reviews: 123
    },
    {
      id: 547,
      name: "Kerosene",
      category: "Industrial Solvents",
      subcategory: "Petroleum Solvents",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "Technical grade kerosene for solvent and fuel applications.",
      chemicalFormula: "C₉-C₁₆ Hydrocarbons",
      casNumber: "8008-20-6",
      hsCode: "2710.19",
      purity: "95%",
      applications: ["Solvent", "Fuel", "Cleaning agent", "Pesticide carrier"],
      specifications: {
        appearance: "Colorless to pale yellow liquid",
        solubility: "Insoluble in water",
        boilingPoint: "150-300°C",
        density: "0.81 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC"],
      safetyInfo: ["Flammable", "Aspiration hazard", "Avoid skin contact"],
      price: "$105/200L",
      availability: "In Stock",
      rating: 4.4,
      reviews: 156
    },
    {
      id: 548,
      name: "Petroleum Ether",
      category: "Industrial Solvents",
      subcategory: "Petroleum Solvents",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "Light petroleum ether for extraction and laboratory applications.",
      chemicalFormula: "C₅-C₇ Hydrocarbons",
      casNumber: "8032-32-4",
      hsCode: "2710.12",
      purity: "95%",
      applications: ["Extraction solvent", "Laboratory reagent", "Degreaser", "Dry cleaning"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Insoluble in water",
        boilingPoint: "30-60°C",
        density: "0.64 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Extremely flammable", "Narcotic effects", "Use explosion-proof equipment"],
      price: "$145/200L",
      availability: "In Stock",
      rating: 4.6,
      reviews: 98
    },
    {
      id: 549,
      name: "Isooctane",
      category: "Industrial Solvents",
      subcategory: "Specialty Solvents",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "High-purity isooctane for fuel and calibration applications.",
      chemicalFormula: "C₈H₁₈",
      casNumber: "540-84-1",
      hsCode: "2901.10",
      purity: "99.5%",
      applications: ["Fuel additive", "Calibration standard", "Solvent", "Chemical intermediate"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Insoluble in water",
        boilingPoint: "99.2°C",
        density: "0.692 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Highly flammable", "Aspiration hazard", "Use ventilation"],
      price: "$185/200L",
      availability: "Special Order",
      rating: 4.7,
      reviews: 87
    },
    {
      id: 550,
      name: "Carbon Tetrachloride",
      category: "Industrial Solvents",
      subcategory: "Specialty Solvents",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "Technical grade carbon tetrachloride for specialized applications.",
      chemicalFormula: "CCl₄",
      casNumber: "56-23-5",
      hsCode: "2903.14",
      purity: "99%",
      applications: ["Chemical intermediate", "Fire extinguisher", "Refrigerant", "Solvent"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Insoluble in water",
        boilingPoint: "76.7°C",
        density: "1.594 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Ozone depleting", "Carcinogenic", "Highly regulated"],
      price: "$385/200L",
      availability: "Restricted",
      rating: 4.0,
      reviews: 45
    },
    {
      id: 551,
      name: "Chloroform",
      category: "Industrial Solvents",
      subcategory: "Specialty Solvents",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "High-purity chloroform for laboratory and industrial use.",
      chemicalFormula: "CHCl₃",
      casNumber: "67-66-3",
      hsCode: "2903.13",
      purity: "99.8%",
      applications: ["Laboratory solvent", "Chemical intermediate", "Extraction", "Refrigerant"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Slightly soluble in water",
        boilingPoint: "61.2°C",
        density: "1.489 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Carcinogenic", "Anesthetic", "Special handling required"],
      price: "$325/200L",
      availability: "Special Order",
      rating: 4.2,
      reviews: 67
    },
    {
      id: 552,
      name: "1,1,1-Trichloroethane",
      category: "Industrial Solvents",
      subcategory: "Specialty Solvents",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "Technical grade 1,1,1-trichloroethane for specialized cleaning.",
      chemicalFormula: "C₂H₃Cl₃",
      casNumber: "71-55-6",
      hsCode: "2903.19",
      purity: "99%",
      applications: ["Metal degreasing", "Electronics cleaning", "Aerosol propellant", "Solvent"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Slightly soluble in water",
        boilingPoint: "74.1°C",
        density: "1.339 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Ozone depleting", "Restricted use", "Phase-out chemical"],
      price: "$295/200L",
      availability: "Restricted",
      rating: 4.1,
      reviews: 54
    },
    {
      id: 553,
      name: "Ethyl Ether",
      category: "Industrial Solvents",
      subcategory: "Specialty Solvents",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "Anhydrous ethyl ether for laboratory and extraction use.",
      chemicalFormula: "C₄H₁₀O",
      casNumber: "60-29-7",
      hsCode: "2909.11",
      purity: "99.7%",
      applications: ["Extraction solvent", "Laboratory reagent", "Anesthetic", "Starting fluid"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Slightly soluble in water",
        boilingPoint: "34.6°C",
        density: "0.713 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Extremely flammable", "Forms peroxides", "Anesthetic effects"],
      price: "$385/200L",
      availability: "Special Order",
      rating: 4.5,
      reviews: 89
    },
    {
      id: 554,
      name: "Diisopropyl Ether",
      category: "Industrial Solvents",
      subcategory: "Specialty Solvents",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "High-purity diisopropyl ether for extraction and laboratory use.",
      chemicalFormula: "C₆H₁₄O",
      casNumber: "108-20-3",
      hsCode: "2909.19",
      purity: "99%",
      applications: ["Extraction solvent", "Laboratory reagent", "Chemical intermediate", "Fuel additive"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Slightly soluble in water",
        boilingPoint: "68.5°C",
        density: "0.725 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Highly flammable", "Forms peroxides", "Use stabilizer"],
      price: "$285/200L",
      availability: "In Stock",
      rating: 4.4,
      reviews: 76
    },
    {
      id: 555,
      name: "Methyl tert-Butyl Ether (MTBE)",
      category: "Industrial Solvents",
      subcategory: "Specialty Solvents",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "High-octane MTBE for fuel blending and solvent applications.",
      chemicalFormula: "C₅H₁₂O",
      casNumber: "1634-04-4",
      hsCode: "2909.19",
      purity: "99%",
      applications: ["Fuel additive", "Octane booster", "Solvent", "Chemical intermediate"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Slightly soluble in water",
        boilingPoint: "55.2°C",
        density: "0.741 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC"],
      safetyInfo: ["Flammable", "Potential carcinogen", "Environmental concern"],
      price: "$165/200L",
      availability: "In Stock",
      rating: 4.3,
      reviews: 134
    },
    {
      id: 556,
      name: "Ethyl tert-Butyl Ether (ETBE)",
      category: "Industrial Solvents",
      subcategory: "Specialty Solvents",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "Bio-based ETBE for fuel blending and oxygenate applications.",
      chemicalFormula: "C₆H₁₄O",
      casNumber: "637-92-3",
      hsCode: "2909.19",
      purity: "99%",
      applications: ["Fuel oxygenate", "Octane booster", "Gasoline additive", "Solvent"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Slightly soluble in water",
        boilingPoint: "72.8°C",
        density: "0.750 g/cm³"
      },
      packaging: ["200L drums", "1000L IBC"],
      safetyInfo: ["Flammable", "Renewable source", "Environmentally preferred"],
      price: "$185/200L",
      availability: "In Stock",
      rating: 4.6,
      reviews: 98
    },
    {
      id: 557,
      name: "Diglyme",
      category: "Industrial Solvents",
      subcategory: "Specialty Solvents",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "High-purity diglyme for battery electrolyte and solvent applications.",
      chemicalFormula: "C₆H₁₄O₃",
      casNumber: "111-96-6",
      hsCode: "2909.49",
      purity: "99.5%",
      applications: ["Battery electrolyte", "Solvent", "Chemical synthesis", "Gas absorption"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "162°C",
        density: "0.943 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Reproductive toxin", "Flammable", "Use protective equipment"],
      price: "$425/200L",
      availability: "Special Order",
      rating: 4.5,
      reviews: 67
    },
    {
      id: 558,
      name: "Triglyme",
      category: "Industrial Solvents",
      subcategory: "Specialty Solvents",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "High-purity triglyme for specialized solvent and electrolyte use.",
      chemicalFormula: "C₈H₁₈O₄",
      casNumber: "112-49-2",
      hsCode: "2909.49",
      purity: "99%",
      applications: ["Electrolyte solvent", "Chemical synthesis", "Gas absorption", "High-temperature solvent"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "216°C",
        density: "0.986 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Reproductive toxin", "High boiling point", "Special handling"],
      price: "$485/200L",
      availability: "Special Order",
      rating: 4.4,
      reviews: 54
    },
    {
      id: 559,
      name: "Sulfolane",
      category: "Industrial Solvents",
      subcategory: "Specialty Solvents",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "High-purity sulfolane for gas processing and extraction applications.",
      chemicalFormula: "C₄H₈O₂S",
      casNumber: "126-33-0",
      hsCode: "2930.90",
      purity: "99%",
      applications: ["Gas sweetening", "Aromatic extraction", "Solvent", "Chemical intermediate"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "287.3°C",
        density: "1.261 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["High boiling point", "Thermal stability", "Low toxicity"],
      price: "$525/200L",
      availability: "Special Order",
      rating: 4.6,
      reviews: 43
    },
    {
      id: 560,
      name: "Propylene Carbonate",
      category: "Industrial Solvents",
      subcategory: "Specialty Solvents",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
      description: "High-purity propylene carbonate for battery and solvent applications.",
      chemicalFormula: "C₄H₆O₃",
      casNumber: "108-32-7",
      hsCode: "2920.90",
      purity: "99.5%",
      applications: ["Battery electrolyte", "Solvent", "Paint stripper", "Gas absorption"],
      specifications: {
        appearance: "Colorless liquid",
        solubility: "Miscible with water",
        boilingPoint: "242°C",
        density: "1.205 g/cm³"
      },
      packaging: ["200L drums"],
      safetyInfo: ["Low toxicity", "Biodegradable", "High flash point"],
      price: "$385/200L",
      availability: "In Stock",
      rating: 4.8,
      reviews: 89
    }
  ];

  // Find the product based on the category or specific product ID
  let currentProduct: DetailedProduct | undefined;
  
  if (id) {
    // First try to find by exact ID
    currentProduct = allProducts.find(p => p.id === parseInt(id));
    
    // If not found by ID, try to find by category name
    if (!currentProduct) {
      const categoryProducts = allProducts.filter(p => 
        p.category.toLowerCase().replace(/\s+/g, '-') === id.toLowerCase() ||
        p.category.toLowerCase() === id.toLowerCase().replace(/-/g, ' ')
      );
      
      if (categoryProducts.length > 0) {
        // Return a category view with all products in that category
        return <CategoryProductsView category={id} products={categoryProducts} />;
      }
    }
  }

  if (!currentProduct) {
    return (
      <div className="pt-24 pb-20">
        <div className="container-custom">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
            <Link to="/products" className="btn btn-primary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="pt-24 pb-20">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary">Products</Link>
            <span>/</span>
            <span className="text-gray-800">{currentProduct.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Image */}
          <div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={currentProduct.image} 
                alt={currentProduct.name}
                className="w-full h-96 object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <span className="text-sm text-primary font-medium">{currentProduct.category}</span>
              {currentProduct.subcategory && (
                <>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-sm text-gray-600">{currentProduct.subcategory}</span>
                </>
              )}
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{currentProduct.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${
                      i < Math.floor(currentProduct.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {currentProduct.rating} ({currentProduct.reviews} reviews)
                </span>
              </div>
            </div>

            <p className="text-gray-700 mb-6">{currentProduct.description}</p>

            {/* Key Specifications */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold mb-4">Key Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentProduct.chemicalFormula && (
                  <div>
                    <span className="text-sm text-gray-600">Chemical Formula:</span>
                    <p className="font-medium">{currentProduct.chemicalFormula}</p>
                  </div>
                )}
                {currentProduct.casNumber && (
                  <div>
                    <span className="text-sm text-gray-600">CAS Number:</span>
                    <p className="font-medium">{currentProduct.casNumber}</p>
                  </div>
                )}
                {currentProduct.purity && (
                  <div>
                    <span className="text-sm text-gray-600">Purity:</span>
                    <p className="font-medium">{currentProduct.purity}</p>
                  </div>
                )}
                <div>
                  <span className="text-sm text-gray-600">Availability:</span>
                  <p className={`font-medium ${
                    currentProduct.availability === 'In Stock' ? 'text-success' : 
                    currentProduct.availability === 'Special Order' ? 'text-warning' : 'text-error'
                  }`}>
                    {currentProduct.availability}
                  </p>
                </div>
              </div>
            </div>

            {/* Price and Actions */}
            <div className="flex items-center justify-between mb-6">
              {currentProduct.price && (
                <div>
                  <span className="text-2xl font-bold text-primary">{currentProduct.price}</span>
                </div>
              )}
              <div className="flex space-x-3">
                <button className="btn btn-primary px-6 py-2">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Request Quote
                </button>
                <button className="btn bg-gray-100 text-gray-700 px-4 py-2">
                  <Download className="h-4 w-4" />
                </button>
                <button className="btn bg-gray-100 text-gray-700 px-4 py-2">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-1 text-primary" />
                Quality Assured
              </div>
              <div className="flex items-center">
                <Truck className="h-4 w-4 mr-1 text-primary" />
                Fast Delivery
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-1 text-primary" />
                ISO Certified
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="bg-white rounded-lg shadow-lg">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['overview', 'specifications', 'applications', 'safety', 'packaging'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Product Overview</h3>
                <p className="text-gray-700 mb-6">{currentProduct.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        High purity and consistent quality
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Complies with international standards
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Reliable supply chain
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Technical support available
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Quality Assurance</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        ISO 9001:2015 certified
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Batch testing and certification
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Traceability documentation
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Regular quality audits
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <span className="font-medium text-gray-700">Appearance:</span>
                      <p className="text-gray-600">{currentProduct.specifications.appearance}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Solubility:</span>
                      <p className="text-gray-600">{currentProduct.specifications.solubility}</p>
                    </div>
                    {currentProduct.specifications.meltingPoint && (
                      <div>
                        <span className="font-medium text-gray-700">Melting Point:</span>
                        <p className="text-gray-600">{currentProduct.specifications.meltingPoint}</p>
                      </div>
                    )}
                    {currentProduct.specifications.boilingPoint && (
                      <div>
                        <span className="font-medium text-gray-700">Boiling Point:</span>
                        <p className="text-gray-600">{currentProduct.specifications.boilingPoint}</p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    {currentProduct.specifications.density && (
                      <div>
                        <span className="font-medium text-gray-700">Density:</span>
                        <p className="text-gray-600">{currentProduct.specifications.density}</p>
                      </div>
                    )}
                    {currentProduct.specifications.ph && (
                      <div>
                        <span className="font-medium text-gray-700">pH:</span>
                        <p className="text-gray-600">{currentProduct.specifications.ph}</p>
                      </div>
                    )}
                    {currentProduct.hsCode && (
                      <div>
                        <span className="font-medium text-gray-700">HS Code:</span>
                        <p className="text-gray-600">{currentProduct.hsCode}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'applications' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Applications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentProduct.applications.map((application, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      <span>{application}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'safety' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Safety Information</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-yellow-800 mb-2">Important Safety Guidelines</h4>
                      <p className="text-yellow-700 text-sm">
                        Always read and follow the Safety Data Sheet (SDS) before handling this product.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {currentProduct.safetyInfo.map((info, index) => (
                    <div key={index} className="flex items-start p-3 border border-gray-200 rounded-lg">
                      <span className="w-2 h-2 bg-error rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>{info}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'packaging' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Packaging Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentProduct.packaging.map((pack, index) => (
                    <div key={index} className="text-center p-6 border border-gray-200 rounded-lg">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-primary font-semibold">{pack.split(' ')[0]}</span>
                      </div>
                      <p className="font-medium">{pack}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allProducts
              .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
              .slice(0, 3)
              .map((product) => (
                <Link 
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{product.description.substring(0, 100)}...</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-medium">View Details</span>
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Category Products View Component
const CategoryProductsView: React.FC<{
  category: string;
  products: DetailedProduct[];
}> = ({ category, products }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<DetailedProduct[]>(products);

  React.useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.subcategory.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  const categoryName = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

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
              {categoryName} Products
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl opacity-90 mb-8"
            >
              Explore our comprehensive range of {categoryName.toLowerCase()} products designed for various applications.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <Link to="/products" className="hover:text-primary">Products</Link>
              <span>/</span>
              <span className="text-gray-800">{categoryName}</span>
            </div>
          </nav>

          {/* Search */}
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

          {/* Products Grid */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{categoryName} Products</h2>
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
                  <motion.div 
                    key={product.id}
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
                        <span className="text-sm text-primary font-medium">{product.subcategory}</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-4">{product.description.substring(0, 120)}...</p>
                      
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
                        {product.price && (
                          <p className="text-sm font-medium text-primary">
                            {product.price}
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
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;