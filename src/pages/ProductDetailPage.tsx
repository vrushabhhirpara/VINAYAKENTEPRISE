import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, Truck, Phone, Mail, Search, Filter } from 'lucide-react';

interface DetailedProduct {
  id: string;
  name: string;
  description: string;
  chemicalFormula: string;
  casNumber: string;
  hsCode: string;
  purity: string;
  specifications: string[];
  applications: string[];
  image: string;
  packaging: string[];
  safetyInfo: string[];
}

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
  detailedProducts: DetailedProduct[];
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<DetailedProduct[]>([]);
  
  // Comprehensive product data with 50 products per category
  const products: Product[] = [
    {
      id: 1,
      name: "Industrial Solvents",
      category: "Industrial Products",
      subcategory: "Solvents & Chemicals",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Comprehensive range of industrial solvents for various manufacturing and cleaning applications.",
      featured: true,
      chemicalFormula: "Various",
      casNumber: "Multiple",
      hsCode: "2909.00",
      purity: "99%+",
      applications: [
        "Industrial cleaning",
        "Paint thinning",
        "Degreasing operations",
        "Chemical synthesis",
        "Extraction processes"
      ],
      specifications: {
        appearance: "Clear liquid",
        solubility: "Miscible with organic solvents",
        boilingPoint: "Various ranges",
        density: "0.8-1.2 g/cm³",
        ph: "6.5-7.5"
      },
      packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
      safetyInfo: [
        "Store in cool, dry place",
        "Keep away from heat sources",
        "Use proper ventilation",
        "Wear protective equipment"
      ],
      detailedProducts: [
        {
          id: "acetone",
          name: "Acetone",
          description: "High purity acetone for industrial applications",
          chemicalFormula: "C₃H₆O",
          casNumber: "67-64-1",
          hsCode: "2914.11.00",
          purity: "99.5%",
          specifications: ["Purity: 99.5%", "Water content: <0.5%", "Boiling point: 56°C", "Density: 0.784 g/cm³"],
          applications: ["Paint thinner", "Nail polish remover", "Cleaning agent", "Chemical intermediate"],
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg",
          packaging: ["1L bottles", "25L drums", "200L drums"],
          safetyInfo: ["Highly flammable", "Use in ventilated area", "Avoid skin contact"]
        },
        {
          id: "ethanol",
          name: "Ethanol",
          description: "Industrial grade ethanol for various applications",
          chemicalFormula: "C₂H₅OH",
          casNumber: "64-17-5",
          hsCode: "2207.10.00",
          purity: "95-99%",
          specifications: ["Purity: 95-99%", "Denatured available", "Food grade available", "Boiling point: 78.4°C"],
          applications: ["Solvent", "Fuel additive", "Disinfectant", "Chemical synthesis"],
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
          packaging: ["1L bottles", "25L drums", "200L drums", "1000L IBC"],
          safetyInfo: ["Flammable liquid", "Keep away from ignition sources", "Use protective equipment"]
        },
        {
          id: "methanol",
          name: "Methanol",
          description: "Technical grade methanol for industrial use",
          chemicalFormula: "CH₃OH",
          casNumber: "67-56-1",
          hsCode: "2905.11.00",
          purity: "99.8%",
          specifications: ["Purity: 99.8%", "Water content: <0.15%", "Boiling point: 64.7°C", "Density: 0.792 g/cm³"],
          applications: ["Fuel", "Antifreeze", "Solvent", "Chemical feedstock"],
          image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg",
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Toxic if ingested", "Flammable", "Use in ventilated area", "Avoid skin contact"]
        },
        {
          id: "isopropanol",
          name: "Isopropanol (IPA)",
          description: "High purity isopropyl alcohol",
          chemicalFormula: "C₃H₈O",
          casNumber: "67-63-0",
          hsCode: "2905.12.00",
          purity: "99.9%",
          specifications: ["Purity: 99.9%", "Water content: <0.1%", "Boiling point: 82.6°C", "Density: 0.786 g/cm³"],
          applications: ["Cleaning agent", "Disinfectant", "Electronics cleaning", "Pharmaceutical intermediate"],
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg",
          packaging: ["1L bottles", "25L drums", "200L drums"],
          safetyInfo: ["Flammable", "Avoid inhalation", "Use protective equipment"]
        },
        {
          id: "toluene",
          name: "Toluene",
          description: "Industrial grade toluene solvent",
          chemicalFormula: "C₇H₈",
          casNumber: "108-88-3",
          hsCode: "2902.30.00",
          purity: "99.5%",
          specifications: ["Purity: 99.5%", "Benzene content: <1ppm", "Boiling point: 110.6°C", "Density: 0.867 g/cm³"],
          applications: ["Paint solvent", "Adhesive", "Chemical intermediate", "Fuel additive"],
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Flammable", "Avoid prolonged exposure", "Use respiratory protection"]
        },
        {
          id: "xylene",
          name: "Xylene",
          description: "Mixed xylene isomers for industrial applications",
          chemicalFormula: "C₈H₁₀",
          casNumber: "1330-20-7",
          hsCode: "2902.41.00",
          purity: "99%",
          specifications: ["Purity: 99%", "Mixed isomers", "Boiling point: 138-144°C", "Density: 0.864 g/cm³"],
          applications: ["Paint thinner", "Printing ink", "Rubber cement", "Adhesives"],
          image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg",
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Flammable", "Harmful if inhaled", "Use in ventilated area"]
        },
        {
          id: "benzene",
          name: "Benzene",
          description: "High purity benzene for chemical synthesis",
          chemicalFormula: "C₆H₆",
          casNumber: "71-43-2",
          hsCode: "2902.20.00",
          purity: "99.9%",
          specifications: ["Purity: 99.9%", "Thiophene free", "Boiling point: 80.1°C", "Density: 0.879 g/cm³"],
          applications: ["Chemical intermediate", "Solvent", "Fuel additive", "Pharmaceutical synthesis"],
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg",
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Carcinogenic", "Highly regulated", "Use extreme caution", "Specialized handling required"]
        },
        {
          id: "dichloromethane",
          name: "Dichloromethane (DCM)",
          description: "High grade methylene chloride",
          chemicalFormula: "CH₂Cl₂",
          casNumber: "75-09-2",
          hsCode: "2903.12.00",
          purity: "99.8%",
          specifications: ["Purity: 99.8%", "Stabilized", "Boiling point: 39.6°C", "Density: 1.326 g/cm³"],
          applications: ["Paint stripper", "Degreasing", "Pharmaceutical extraction", "Foam blowing"],
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Suspected carcinogen", "Use respiratory protection", "Avoid skin contact"]
        },
        {
          id: "chloroform",
          name: "Chloroform",
          description: "Analytical grade chloroform",
          chemicalFormula: "CHCl₃",
          casNumber: "67-66-3",
          hsCode: "2903.13.00",
          purity: "99.5%",
          specifications: ["Purity: 99.5%", "Stabilized with ethanol", "Boiling point: 61.2°C", "Density: 1.489 g/cm³"],
          applications: ["Laboratory solvent", "Chemical intermediate", "Refrigerant", "Extraction solvent"],
          image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg",
          packaging: ["1L bottles", "25L drums", "200L drums"],
          safetyInfo: ["Carcinogenic", "Anesthetic effects", "Use in fume hood", "Avoid inhalation"]
        },
        {
          id: "carbon-tetrachloride",
          name: "Carbon Tetrachloride",
          description: "High purity carbon tetrachloride",
          chemicalFormula: "CCl₄",
          casNumber: "56-23-5",
          hsCode: "2903.14.00",
          purity: "99.5%",
          specifications: ["Purity: 99.5%", "Dry grade", "Boiling point: 76.7°C", "Density: 1.594 g/cm³"],
          applications: ["Solvent", "Fire extinguisher", "Refrigerant", "Chemical intermediate"],
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg",
          packaging: ["25L drums", "200L drums"],
          safetyInfo: ["Highly toxic", "Ozone depleting", "Restricted use", "Special permits required"]
        },
        {
          id: "ethyl-acetate",
          name: "Ethyl Acetate",
          description: "High purity ethyl acetate solvent",
          chemicalFormula: "C₄H₈O₂",
          casNumber: "141-78-6",
          hsCode: "2915.31.00",
          purity: "99.5%",
          specifications: ["Purity: 99.5%", "Low water content", "Boiling point: 77.1°C", "Density: 0.902 g/cm³"],
          applications: ["Paint solvent", "Nail polish", "Glue", "Decaffeination"],
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Flammable", "Irritant", "Use ventilation", "Avoid prolonged exposure"]
        },
        {
          id: "butyl-acetate",
          name: "Butyl Acetate",
          description: "N-butyl acetate solvent",
          chemicalFormula: "C₆H₁₂O₂",
          casNumber: "123-86-4",
          hsCode: "2915.33.00",
          purity: "99%",
          specifications: ["Purity: 99%", "Low moisture", "Boiling point: 126.1°C", "Density: 0.882 g/cm³"],
          applications: ["Lacquer solvent", "Paint thinner", "Extraction solvent", "Flavoring agent"],
          image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg",
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Flammable", "Narcotic effects", "Use respiratory protection"]
        },
        {
          id: "methyl-ethyl-ketone",
          name: "Methyl Ethyl Ketone (MEK)",
          description: "High grade MEK solvent",
          chemicalFormula: "C₄H₈O",
          casNumber: "78-93-3",
          hsCode: "2914.12.00",
          purity: "99.5%",
          specifications: ["Purity: 99.5%", "Low water content", "Boiling point: 79.6°C", "Density: 0.805 g/cm³"],
          applications: ["Paint solvent", "Adhesive", "Printing ink", "Plastic welding"],
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg",
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Flammable", "Irritant", "Use ventilation", "Avoid skin contact"]
        },
        {
          id: "cyclohexane",
          name: "Cyclohexane",
          description: "High purity cyclohexane",
          chemicalFormula: "C₆H₁₂",
          casNumber: "110-82-7",
          hsCode: "2902.11.00",
          purity: "99.5%",
          specifications: ["Purity: 99.5%", "Low benzene content", "Boiling point: 80.7°C", "Density: 0.779 g/cm³"],
          applications: ["Solvent", "Paint thinner", "Chemical intermediate", "Extraction"],
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Flammable", "Narcotic effects", "Use ventilation"]
        },
        {
          id: "hexane",
          name: "N-Hexane",
          description: "High purity n-hexane solvent",
          chemicalFormula: "C₆H₁₄",
          casNumber: "110-54-3",
          hsCode: "2901.10.00",
          purity: "99%",
          specifications: ["Purity: 99%", "Low aromatic content", "Boiling point: 68.7°C", "Density: 0.659 g/cm³"],
          applications: ["Extraction solvent", "Cleaning agent", "Adhesive", "Paint thinner"],
          image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg",
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Highly flammable", "Neurotoxic", "Use respiratory protection"]
        },
        {
          id: "heptane",
          name: "N-Heptane",
          description: "High purity n-heptane",
          chemicalFormula: "C₇H₁₆",
          casNumber: "142-82-5",
          hsCode: "2901.10.00",
          purity: "99%",
          specifications: ["Purity: 99%", "Low aromatic content", "Boiling point: 98.4°C", "Density: 0.684 g/cm³"],
          applications: ["Solvent", "Fuel standard", "Extraction", "Chemical synthesis"],
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg",
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Flammable", "Narcotic effects", "Use ventilation"]
        },
        {
          id: "octane",
          name: "N-Octane",
          description: "High purity n-octane",
          chemicalFormula: "C₈H₁₈",
          casNumber: "111-65-9",
          hsCode: "2901.10.00",
          purity: "99%",
          specifications: ["Purity: 99%", "Low aromatic content", "Boiling point: 125.7°C", "Density: 0.703 g/cm³"],
          applications: ["Solvent", "Fuel component", "Chemical intermediate", "Calibration standard"],
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Flammable", "Harmful if inhaled", "Use ventilation"]
        },
        {
          id: "diethyl-ether",
          name: "Diethyl Ether",
          description: "Anhydrous diethyl ether",
          chemicalFormula: "C₄H₁₀O",
          casNumber: "60-29-7",
          hsCode: "2909.11.00",
          purity: "99.5%",
          specifications: ["Purity: 99.5%", "Anhydrous", "Boiling point: 34.6°C", "Density: 0.714 g/cm³"],
          applications: ["Extraction solvent", "Anesthetic", "Chemical synthesis", "Laboratory reagent"],
          image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg",
          packaging: ["1L bottles", "25L drums", "200L drums"],
          safetyInfo: ["Extremely flammable", "Forms explosive peroxides", "Use stabilizer"]
        },
        {
          id: "tetrahydrofuran",
          name: "Tetrahydrofuran (THF)",
          description: "High purity THF solvent",
          chemicalFormula: "C₄H₈O",
          casNumber: "109-99-9",
          hsCode: "2932.13.00",
          purity: "99.5%",
          specifications: ["Purity: 99.5%", "Stabilized", "Boiling point: 66°C", "Density: 0.889 g/cm³"],
          applications: ["Solvent", "Chemical intermediate", "Polymer production", "Laboratory reagent"],
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg",
          packaging: ["1L bottles", "25L drums", "200L drums"],
          safetyInfo: ["Flammable", "Forms peroxides", "Use stabilizer", "Store under nitrogen"]
        },
        {
          id: "dioxane",
          name: "1,4-Dioxane",
          description: "High purity 1,4-dioxane",
          chemicalFormula: "C₄H₈O₂",
          casNumber: "123-91-1",
          hsCode: "2932.19.00",
          purity: "99%",
          specifications: ["Purity: 99%", "Stabilized", "Boiling point: 101.1°C", "Density: 1.034 g/cm³"],
          applications: ["Solvent", "Chemical intermediate", "Extraction", "Laboratory reagent"],
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
          packaging: ["1L bottles", "25L drums", "200L drums"],
          safetyInfo: ["Suspected carcinogen", "Forms peroxides", "Use stabilizer"]
        },
        {
          id: "dimethylformamide",
          name: "Dimethylformamide (DMF)",
          description: "High purity DMF solvent",
          chemicalFormula: "C₃H₇NO",
          casNumber: "68-12-2",
          hsCode: "2924.12.00",
          purity: "99.8%",
          specifications: ["Purity: 99.8%", "Low water content", "Boiling point: 153°C", "Density: 0.944 g/cm³"],
          applications: ["Solvent", "Chemical synthesis", "Pharmaceutical intermediate", "Polymer production"],
          image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg",
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Reproductive toxin", "Hepatotoxic", "Use respiratory protection"]
        },
        {
          id: "dimethyl-sulfoxide",
          name: "Dimethyl Sulfoxide (DMSO)",
          description: "High purity DMSO",
          chemicalFormula: "C₂H₆OS",
          casNumber: "67-68-5",
          hsCode: "2930.90.00",
          purity: "99.9%",
          specifications: ["Purity: 99.9%", "Low water content", "Melting point: 18.5°C", "Density: 1.100 g/cm³"],
          applications: ["Solvent", "Cryoprotectant", "Pharmaceutical intermediate", "Paint stripper"],
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg",
          packaging: ["1L bottles", "25L drums", "200L drums"],
          safetyInfo: ["Penetrates skin", "Use gloves", "Avoid contamination"]
        },
        {
          id: "acetonitrile",
          name: "Acetonitrile",
          description: "HPLC grade acetonitrile",
          chemicalFormula: "C₂H₃N",
          casNumber: "75-05-8",
          hsCode: "2926.90.00",
          purity: "99.9%",
          specifications: ["Purity: 99.9%", "HPLC grade", "Boiling point: 81.6°C", "Density: 0.786 g/cm³"],
          applications: ["HPLC solvent", "Chemical synthesis", "Extraction", "Pharmaceutical intermediate"],
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
          packaging: ["1L bottles", "25L drums", "200L drums"],
          safetyInfo: ["Flammable", "Toxic", "Use ventilation", "Avoid skin contact"]
        },
        {
          id: "pyridine",
          name: "Pyridine",
          description: "Anhydrous pyridine",
          chemicalFormula: "C₅H₅N",
          casNumber: "110-86-1",
          hsCode: "2933.31.00",
          purity: "99.8%",
          specifications: ["Purity: 99.8%", "Anhydrous", "Boiling point: 115.2°C", "Density: 0.982 g/cm³"],
          applications: ["Solvent", "Chemical synthesis", "Catalyst", "Laboratory reagent"],
          image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg",
          packaging: ["1L bottles", "25L drums", "200L drums"],
          safetyInfo: ["Flammable", "Toxic", "Strong odor", "Use fume hood"]
        },
        {
          id: "quinoline",
          name: "Quinoline",
          description: "High purity quinoline",
          chemicalFormula: "C₉H₇N",
          casNumber: "91-22-5",
          hsCode: "2933.39.00",
          purity: "98%",
          specifications: ["Purity: 98%", "Technical grade", "Boiling point: 237.1°C", "Density: 1.093 g/cm³"],
          applications: ["Solvent", "Chemical intermediate", "Pharmaceutical synthesis", "Dye intermediate"],
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg",
          packaging: ["1L bottles", "25L drums", "200L drums"],
          safetyInfo: ["Combustible", "Irritant", "Use ventilation"]
        },
        {
          id: "morpholine",
          name: "Morpholine",
          description: "High purity morpholine",
          chemicalFormula: "C₄H₉NO",
          casNumber: "110-91-8",
          hsCode: "2934.99.00",
          purity: "99%",
          specifications: ["Purity: 99%", "Technical grade", "Boiling point: 128.9°C", "Density: 1.007 g/cm³"],
          applications: ["Solvent", "Corrosion inhibitor", "Chemical intermediate", "Rubber accelerator"],
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Flammable", "Corrosive", "Use protective equipment"]
        },
        {
          id: "piperidine",
          name: "Piperidine",
          description: "High purity piperidine",
          chemicalFormula: "C₅H₁₁N",
          casNumber: "110-89-4",
          hsCode: "2933.39.00",
          purity: "99%",
          specifications: ["Purity: 99%", "Technical grade", "Boiling point: 106.2°C", "Density: 0.862 g/cm³"],
          applications: ["Chemical intermediate", "Pharmaceutical synthesis", "Catalyst", "Solvent"],
          image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg",
          packaging: ["1L bottles", "25L drums", "200L drums"],
          safetyInfo: ["Flammable", "Corrosive", "Strong base", "Use ventilation"]
        },
        {
          id: "triethylamine",
          name: "Triethylamine",
          description: "High purity triethylamine",
          chemicalFormula: "C₆H₁₅N",
          casNumber: "121-44-8",
          hsCode: "2921.19.00",
          purity: "99%",
          specifications: ["Purity: 99%", "Dry grade", "Boiling point: 89.5°C", "Density: 0.726 g/cm³"],
          applications: ["Base catalyst", "Chemical synthesis", "Pharmaceutical intermediate", "Solvent"],
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg",
          packaging: ["1L bottles", "25L drums", "200L drums"],
          safetyInfo: ["Flammable", "Corrosive", "Strong odor", "Use fume hood"]
        },
        {
          id: "diisopropylamine",
          name: "Diisopropylamine",
          description: "High purity diisopropylamine",
          chemicalFormula: "C₆H₁₅N",
          casNumber: "108-18-9",
          hsCode: "2921.19.00",
          purity: "99%",
          specifications: ["Purity: 99%", "Dry grade", "Boiling point: 84°C", "Density: 0.722 g/cm³"],
          applications: ["Base catalyst", "Chemical synthesis", "Pharmaceutical intermediate", "Solvent"],
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
          packaging: ["1L bottles", "25L drums", "200L drums"],
          safetyInfo: ["Flammable", "Corrosive", "Use protective equipment"]
        },
        {
          id: "n-methylpyrrolidone",
          name: "N-Methylpyrrolidone (NMP)",
          description: "High purity NMP solvent",
          chemicalFormula: "C₅H₉NO",
          casNumber: "872-50-4",
          hsCode: "2933.79.00",
          purity: "99.5%",
          specifications: ["Purity: 99.5%", "Low water content", "Boiling point: 202°C", "Density: 1.033 g/cm³"],
          applications: ["Solvent", "Paint stripper", "Pharmaceutical intermediate", "Electronics cleaning"],
          image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg",
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Reproductive toxin", "Use respiratory protection", "Avoid skin contact"]
        },
        {
          id: "propylene-glycol",
          name: "Propylene Glycol",
          description: "USP grade propylene glycol",
          chemicalFormula: "C₃H₈O₂",
          casNumber: "57-55-6",
          hsCode: "2905.32.00",
          purity: "99.5%",
          specifications: ["Purity: 99.5%", "USP grade", "Boiling point: 188.2°C", "Density: 1.036 g/cm³"],
          applications: ["Solvent", "Antifreeze", "Food additive", "Cosmetic ingredient"],
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg",
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Generally safe", "Food grade available", "Low toxicity"]
        },
        {
          id: "ethylene-glycol",
          name: "Ethylene Glycol",
          description: "Technical grade ethylene glycol",
          chemicalFormula: "C₂H₆O₂",
          casNumber: "107-21-1",
          hsCode: "2905.31.00",
          purity: "99%",
          specifications: ["Purity: 99%", "Technical grade", "Boiling point: 197.3°C", "Density: 1.113 g/cm³"],
          applications: ["Antifreeze", "Coolant", "Solvent", "Chemical intermediate"],
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Toxic if ingested", "Use protective equipment", "Keep away from food"]
        },
        {
          id: "diethylene-glycol",
          name: "Diethylene Glycol",
          description: "Technical grade diethylene glycol",
          chemicalFormula: "C₄H₁₀O₃",
          casNumber: "111-46-6",
          hsCode: "2909.41.00",
          purity: "99%",
          specifications: ["Purity: 99%", "Technical grade", "Boiling point: 245°C", "Density: 1.118 g/cm³"],
          applications: ["Solvent", "Humectant", "Chemical intermediate", "Plasticizer"],
          image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg",
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Toxic", "Use protective equipment", "Avoid ingestion"]
        },
        {
          id: "triethylene-glycol",
          name: "Triethylene Glycol",
          description: "Technical grade triethylene glycol",
          chemicalFormula: "C₆H₁₄O₄",
          casNumber: "112-27-6",
          hsCode: "2909.41.00",
          purity: "99%",
          specifications: ["Purity: 99%", "Technical grade", "Boiling point: 285°C", "Density: 1.125 g/cm³"],
          applications: ["Solvent", "Dehydrating agent", "Plasticizer", "Humectant"],
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg",
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Low toxicity", "Use standard precautions"]
        },
        {
          id: "polyethylene-glycol",
          name: "Polyethylene Glycol (PEG-400)",
          description: "Pharmaceutical grade PEG-400",
          chemicalFormula: "(C₂H₄O)ₙH₂O",
          casNumber: "25322-68-3",
          hsCode: "3907.20.00",
          purity: "99%",
          specifications: ["Molecular weight: 380-420", "Pharmaceutical grade", "Viscosity: 105-130 cSt", "pH: 4.5-7.5"],
          applications: ["Solvent", "Pharmaceutical excipient", "Cosmetic ingredient", "Lubricant"],
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
          packaging: ["25kg drums", "200kg drums", "1000kg IBC tanks"],
          safetyInfo: ["Generally safe", "Food grade available", "Low toxicity"]
        },
        {
          id: "glycerol",
          name: "Glycerol (Glycerin)",
          description: "USP grade glycerol",
          chemicalFormula: "C₃H₈O₃",
          casNumber: "56-81-5",
          hsCode: "2905.45.00",
          purity: "99.5%",
          specifications: ["Purity: 99.5%", "USP grade", "Boiling point: 290°C", "Density: 1.261 g/cm³"],
          applications: ["Solvent", "Humectant", "Food additive", "Pharmaceutical excipient"],
          image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg",
          packaging: ["25kg drums", "200kg drums", "1000kg IBC tanks"],
          safetyInfo: ["Generally safe", "Food grade", "Non-toxic"]
        },
        {
          id: "sorbitol",
          name: "Sorbitol",
          description: "Pharmaceutical grade sorbitol",
          chemicalFormula: "C₆H₁₄O₆",
          casNumber: "50-70-4",
          hsCode: "2905.44.00",
          purity: "99%",
          specifications: ["Purity: 99%", "Pharmaceutical grade", "Melting point: 95°C", "Reducing sugars: <0.1%"],
          applications: ["Sweetener", "Humectant", "Pharmaceutical excipient", "Cosmetic ingredient"],
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg",
          packaging: ["25kg bags", "500kg big bags", "1000kg containers"],
          safetyInfo: ["Food grade", "Generally safe", "May cause laxative effect"]
        },
        {
          id: "mannitol",
          name: "Mannitol",
          description: "Pharmaceutical grade mannitol",
          chemicalFormula: "C₆H₁₄O₆",
          casNumber: "69-65-8",
          hsCode: "2905.44.00",
          purity: "98%",
          specifications: ["Purity: 98%", "Pharmaceutical grade", "Melting point: 166-168°C", "Reducing sugars: <0.1%"],
          applications: ["Pharmaceutical excipient", "Diuretic", "Food additive", "Diagnostic agent"],
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Pharmaceutical grade", "Generally safe", "May cause osmotic effects"]
        },
        {
          id: "xylitol",
          name: "Xylitol",
          description: "Food grade xylitol",
          chemicalFormula: "C₅H₁₂O₅",
          casNumber: "87-99-0",
          hsCode: "2905.44.00",
          purity: "99%",
          specifications: ["Purity: 99%", "Food grade", "Melting point: 92-96°C", "Reducing sugars: <0.1%"],
          applications: ["Sweetener", "Food additive", "Pharmaceutical excipient", "Dental care"],
          image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg",
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Food grade", "Generally safe", "Toxic to dogs"]
        },
        {
          id: "erythritol",
          name: "Erythritol",
          description: "Food grade erythritol",
          chemicalFormula: "C₄H₁₀O₄",
          casNumber: "149-32-6",
          hsCode: "2905.44.00",
          purity: "99%",
          specifications: ["Purity: 99%", "Food grade", "Melting point: 119-123°C", "Reducing sugars: <0.1%"],
          applications: ["Sweetener", "Food additive", "Pharmaceutical excipient", "Low-calorie products"],
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg",
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Food grade", "Generally safe", "Well tolerated"]
        },
        {
          id: "maltitol",
          name: "Maltitol",
          description: "Food grade maltitol",
          chemicalFormula: "C₁₂H₂₄O₁₁",
          casNumber: "585-88-6",
          hsCode: "2940.00.00",
          purity: "99%",
          specifications: ["Purity: 99%", "Food grade", "Melting point: 148-151°C", "Reducing sugars: <0.2%"],
          applications: ["Sweetener", "Food additive", "Sugar substitute", "Confectionery"],
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Food grade", "Generally safe", "May cause laxative effect"]
        },
        {
          id: "isomalt",
          name: "Isomalt",
          description: "Food grade isomalt",
          chemicalFormula: "C₁₂H₂₄O₁₁",
          casNumber: "64519-82-0",
          hsCode: "2940.00.00",
          purity: "99%",
          specifications: ["Purity: 99%", "Food grade", "Melting point: 145-150°C", "Reducing sugars: <0.3%"],
          applications: ["Sweetener", "Food additive", "Hard candy", "Sugar-free products"],
          image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg",
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Food grade", "Generally safe", "May cause digestive effects"]
        },
        {
          id: "lactitol",
          name: "Lactitol",
          description: "Food grade lactitol",
          chemicalFormula: "C₁₂H₂₄O₁₁",
          casNumber: "585-86-4",
          hsCode: "2940.00.00",
          purity: "99%",
          specifications: ["Purity: 99%", "Food grade", "Melting point: 146°C", "Reducing sugars: <0.2%"],
          applications: ["Sweetener", "Food additive", "Pharmaceutical excipient", "Low-calorie foods"],
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg",
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Food grade", "Generally safe", "May cause laxative effect"]
        },
        {
          id: "trehalose",
          name: "Trehalose",
          description: "Food grade trehalose",
          chemicalFormula: "C₁₂H₂₂O₁₁",
          casNumber: "99-20-7",
          hsCode: "1702.90.00",
          purity: "99%",
          specifications: ["Purity: 99%", "Food grade", "Melting point: 97°C", "Reducing sugars: <0.1%"],
          applications: ["Food additive", "Stabilizer", "Pharmaceutical excipient", "Cosmetic ingredient"],
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Food grade", "Generally safe", "Natural sugar"]
        },
        {
          id: "inulin",
          name: "Inulin",
          description: "Food grade inulin",
          chemicalFormula: "(C₆H₁₀O₅)ₙ",
          casNumber: "9005-80-5",
          hsCode: "1108.19.00",
          purity: "90%",
          specifications: ["Purity: 90%", "Food grade", "Degree of polymerization: 10-60", "Moisture: <5%"],
          applications: ["Prebiotic", "Food additive", "Fat replacer", "Dietary fiber"],
          image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg",
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Food grade", "Generally safe", "Prebiotic fiber"]
        },
        {
          id: "pectin",
          name: "Pectin",
          description: "Food grade pectin",
          chemicalFormula: "Variable",
          casNumber: "9000-69-5",
          hsCode: "1302.20.00",
          purity: "95%",
          specifications: ["Purity: 95%", "Food grade", "Gel strength: 150°SAG", "Methoxyl content: 7-12%"],
          applications: ["Gelling agent", "Food additive", "Jam production", "Pharmaceutical excipient"],
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg",
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Food grade", "Generally safe", "Natural polymer"]
        },
        {
          id: "agar",
          name: "Agar",
          description: "Food grade agar",
          chemicalFormula: "Variable",
          casNumber: "9002-18-0",
          hsCode: "1302.31.00",
          purity: "95%",
          specifications: ["Purity: 95%", "Food grade", "Gel strength: 900 g/cm²", "Moisture: <20%"],
          applications: ["Gelling agent", "Food additive", "Microbiological media", "Vegetarian gelatin"],
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Food grade", "Generally safe", "Natural seaweed extract"]
        },
        {
          id: "carrageenan",
          name: "Carrageenan",
          description: "Food grade carrageenan",
          chemicalFormula: "Variable",
          casNumber: "9000-07-1",
          hsCode: "1302.31.00",
          purity: "95%",
          specifications: ["Purity: 95%", "Food grade", "Viscosity: 5-800 cP", "Sulfate content: 15-40%"],
          applications: ["Thickening agent", "Food additive", "Dairy products", "Meat products"],
          image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg",
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Food grade", "Generally safe", "Natural seaweed extract"]
        },
        {
          id: "xanthan-gum",
          name: "Xanthan Gum",
          description: "Food grade xanthan gum",
          chemicalFormula: "Variable",
          casNumber: "11138-66-2",
          hsCode: "3913.90.00",
          purity: "99%",
          specifications: ["Purity: 99%", "Food grade", "Viscosity: 1200-1600 cP", "Moisture: <15%"],
          applications: ["Thickening agent", "Food additive", "Gluten-free baking", "Stabilizer"],
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg",
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Food grade", "Generally safe", "Microbial polysaccharide"]
        },
        {
          id: "guar-gum",
          name: "Guar Gum",
          description: "Food grade guar gum",
          chemicalFormula: "Variable",
          casNumber: "9000-30-0",
          hsCode: "1302.32.00",
          purity: "99%",
          specifications: ["Purity: 99%", "Food grade", "Viscosity: 3000-5000 cP", "Moisture: <15%"],
          applications: ["Thickening agent", "Food additive", "Ice cream", "Baked goods"],
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Food grade", "Generally safe", "Natural plant extract"]
        },
        {
          id: "locust-bean-gum",
          name: "Locust Bean Gum",
          description: "Food grade locust bean gum",
          chemicalFormula: "Variable",
          casNumber: "9000-40-2",
          hsCode: "1302.32.00",
          purity: "99%",
          specifications: ["Purity: 99%", "Food grade", "Viscosity: 2500-3500 cP", "Moisture: <15%"],
          applications: ["Thickening agent", "Food additive", "Ice cream", "Dairy products"],
          image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg",
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Food grade", "Generally safe", "Natural plant extract"]
        }
      ]
    },
    {
      id: 2,
      name: "Cosmetic & Personal Care",
      category: "Personal Care",
      subcategory: "Cosmetic Ingredients",
      image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
      description: "Premium ingredients for cosmetic and personal care product formulations.",
      featured: true,
      chemicalFormula: "Various",
      casNumber: "Multiple",
      hsCode: "3304.00",
      purity: "Cosmetic grade",
      applications: [
        "Skincare products",
        "Hair care formulations",
        "Makeup products",
        "Personal hygiene items",
        "Anti-aging treatments"
      ],
      specifications: {
        appearance: "Various forms",
        solubility: "Water/oil soluble variants",
        ph: "5.5-7.0"
      },
      packaging: ["1kg containers", "5kg containers", "25kg drums"],
      safetyInfo: [
        "Cosmetic grade quality",
        "Dermatologically tested",
        "Store in controlled environment",
        "Follow GMP guidelines"
      ],
      detailedProducts: [
        {
          id: "hyaluronic-acid",
          name: "Hyaluronic Acid",
          description: "High molecular weight hyaluronic acid for anti-aging products",
          chemicalFormula: "(C₁₄H₂₁NO₁₁)ₙ",
          casNumber: "9067-32-7",
          hsCode: "3913.90.00",
          purity: "95%",
          specifications: ["Molecular weight: 1-2 million Da", "Purity: >95%", "Endotoxin: <10 EU/g", "pH: 6.0-7.5"],
          applications: ["Anti-aging serums", "Moisturizers", "Injectable fillers", "Eye creams"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["100g containers", "1kg containers", "5kg containers"],
          safetyInfo: ["Cosmetic grade", "Non-toxic", "Biocompatible", "Store in cool, dry place"]
        },
        {
          id: "vitamin-c",
          name: "Vitamin C (L-Ascorbic Acid)",
          description: "Stable vitamin C for skincare formulations",
          chemicalFormula: "C₆H₈O₆",
          casNumber: "50-81-7",
          hsCode: "2936.27.00",
          purity: "99%",
          specifications: ["Purity: 99%+", "Stable form", "Water soluble", "Mesh size: 80-120"],
          applications: ["Brightening serums", "Anti-oxidant creams", "Spot treatments", "Anti-aging products"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers", "25kg drums"],
          safetyInfo: ["Light sensitive", "Store in cool place", "Antioxidant properties"]
        },
        {
          id: "retinol",
          name: "Retinol",
          description: "Pure retinol for anti-aging formulations",
          chemicalFormula: "C₂₀H₃₀O",
          casNumber: "68-26-8",
          hsCode: "2936.21.00",
          purity: "95%",
          specifications: ["Purity: 95%+", "Stabilized form", "Light sensitive", "Oil soluble"],
          applications: ["Night creams", "Anti-aging serums", "Acne treatments", "Wrinkle reducers"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["100g containers", "1kg containers"],
          safetyInfo: ["Light sensitive", "Store under nitrogen", "Use in low concentrations"]
        },
        {
          id: "niacinamide",
          name: "Niacinamide (Vitamin B3)",
          description: "Water-soluble vitamin B3 for skincare",
          chemicalFormula: "C₆H₆N₂O",
          casNumber: "98-92-0",
          hsCode: "2933.39.00",
          purity: "99%",
          specifications: ["Purity: 99%+", "Water soluble", "pH: 6.0-7.0", "Mesh size: 80-120"],
          applications: ["Pore minimizer", "Oil control", "Brightening", "Anti-inflammatory"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers", "25kg drums"],
          safetyInfo: ["Generally safe", "Well tolerated", "Stable compound"]
        },
        {
          id: "salicylic-acid",
          name: "Salicylic Acid",
          description: "Beta hydroxy acid for exfoliation",
          chemicalFormula: "C₇H₆O₃",
          casNumber: "69-72-7",
          hsCode: "2918.21.00",
          purity: "99%",
          specifications: ["Purity: 99%+", "USP grade", "Melting point: 158-160°C", "Oil soluble"],
          applications: ["Acne treatment", "Exfoliation", "Pore cleansing", "Anti-inflammatory"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers", "25kg drums"],
          safetyInfo: ["Use in low concentrations", "May cause irritation", "Photosensitizing"]
        },
        {
          id: "glycolic-acid",
          name: "Glycolic Acid",
          description: "Alpha hydroxy acid for chemical peels",
          chemicalFormula: "C₂H₄O₃",
          casNumber: "79-14-1",
          hsCode: "2918.11.00",
          purity: "70%",
          specifications: ["Purity: 70%", "Aqueous solution", "pH: <1", "Clear liquid"],
          applications: ["Chemical peels", "Exfoliation", "Anti-aging", "Skin renewal"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers", "25kg drums"],
          safetyInfo: ["Corrosive", "Use protective equipment", "Professional use recommended"]
        },
        {
          id: "lactic-acid",
          name: "Lactic Acid",
          description: "Gentle alpha hydroxy acid",
          chemicalFormula: "C₃H₆O₃",
          casNumber: "50-21-5",
          hsCode: "2918.11.00",
          purity: "88%",
          specifications: ["Purity: 88%", "Aqueous solution", "pH: 1.5", "Clear liquid"],
          applications: ["Gentle exfoliation", "pH adjustment", "Moisturizing", "Anti-aging"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers", "25kg drums"],
          safetyInfo: ["Milder than glycolic acid", "Generally well tolerated", "Food grade available"]
        },
        {
          id: "kojic-acid",
          name: "Kojic Acid",
          description: "Natural skin lightening agent",
          chemicalFormula: "C₆H₆O₄",
          casNumber: "501-30-4",
          hsCode: "2932.99.00",
          purity: "99%",
          specifications: ["Purity: 99%", "White crystalline powder", "Melting point: 152-154°C", "Water soluble"],
          applications: ["Skin lightening", "Hyperpigmentation", "Age spots", "Melasma treatment"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["100g containers", "1kg containers", "5kg containers"],
          safetyInfo: ["Light sensitive", "May cause irritation", "Use in low concentrations"]
        },
        {
          id: "arbutin",
          name: "Alpha Arbutin",
          description: "Stable skin lightening ingredient",
          chemicalFormula: "C₁₂H₁₆O₇",
          casNumber: "84380-01-8",
          hsCode: "2940.00.00",
          purity: "99%",
          specifications: ["Purity: 99%", "White powder", "Water soluble", "Stable to light"],
          applications: ["Skin lightening", "Hyperpigmentation", "Even skin tone", "Dark spot treatment"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["100g containers", "1kg containers", "5kg containers"],
          safetyInfo: ["Generally safe", "Well tolerated", "Stable compound"]
        },
        {
          id: "ceramides",
          name: "Ceramide Complex",
          description: "Skin barrier repair complex",
          chemicalFormula: "Variable",
          casNumber: "100403-19-8",
          hsCode: "3504.00.00",
          purity: "95%",
          specifications: ["Purity: 95%", "Mixed ceramides", "Liposomal form", "Skin identical"],
          applications: ["Barrier repair", "Moisturizing", "Anti-aging", "Sensitive skin"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["100g containers", "1kg containers"],
          safetyInfo: ["Biocompatible", "Non-irritating", "Skin identical lipids"]
        },
        {
          id: "peptides",
          name: "Copper Peptides",
          description: "Anti-aging peptide complex",
          chemicalFormula: "Cu-GHK",
          casNumber: "49557-75-7",
          hsCode: "2934.99.00",
          purity: "95%",
          specifications: ["Purity: 95%", "Blue powder", "Water soluble", "Copper content: 20%"],
          applications: ["Anti-aging", "Collagen synthesis", "Wound healing", "Hair growth"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["10g containers", "100g containers", "1kg containers"],
          safetyInfo: ["Use in low concentrations", "May cause blue discoloration", "Store in cool place"]
        },
        {
          id: "coenzyme-q10",
          name: "Coenzyme Q10",
          description: "Antioxidant for anti-aging products",
          chemicalFormula: "C₅₉H₉₀O₄",
          casNumber: "303-98-0",
          hsCode: "2932.99.00",
          purity: "98%",
          specifications: ["Purity: 98%", "Orange crystalline powder", "Oil soluble", "Antioxidant"],
          applications: ["Anti-aging", "Antioxidant protection", "Energy metabolism", "Skin repair"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["100g containers", "1kg containers"],
          safetyInfo: ["Generally safe", "Light sensitive", "Store in cool place"]
        },
        {
          id: "alpha-lipoic-acid",
          name: "Alpha Lipoic Acid",
          description: "Universal antioxidant",
          chemicalFormula: "C₈H₁₄O₂S₂",
          casNumber: "1077-28-7",
          hsCode: "2930.90.00",
          purity: "99%",
          specifications: ["Purity: 99%", "Yellow crystalline powder", "Water/oil soluble", "Antioxidant"],
          applications: ["Anti-aging", "Antioxidant", "Skin tightening", "Pore minimizing"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["100g containers", "1kg containers"],
          safetyInfo: ["Generally safe", "May cause tingling", "Use in low concentrations"]
        },
        {
          id: "resveratrol",
          name: "Resveratrol",
          description: "Natural antioxidant from grapes",
          chemicalFormula: "C₁₄H₁₂O₃",
          casNumber: "501-36-0",
          hsCode: "2930.90.00",
          purity: "98%",
          specifications: ["Purity: 98%", "White crystalline powder", "Light sensitive", "Antioxidant"],
          applications: ["Anti-aging", "Antioxidant protection", "Anti-inflammatory", "Skin brightening"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["100g containers", "1kg containers"],
          safetyInfo: ["Light sensitive", "Generally safe", "Natural compound"]
        },
        {
          id: "green-tea-extract",
          name: "Green Tea Extract",
          description: "Standardized green tea polyphenols",
          chemicalFormula: "Variable",
          casNumber: "84650-60-2",
          hsCode: "1302.19.00",
          purity: "95%",
          specifications: ["Polyphenols: 95%", "EGCG: 45%", "Caffeine: <1%", "Brown powder"],
          applications: ["Antioxidant", "Anti-inflammatory", "UV protection", "Anti-aging"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers", "25kg drums"],
          safetyInfo: ["Generally safe", "Natural extract", "May cause staining"]
        },
        {
          id: "vitamin-e",
          name: "Vitamin E (Tocopherol)",
          description: "Natural vitamin E antioxidant",
          chemicalFormula: "C₂₉H₅₀O₂",
          casNumber: "59-02-9",
          hsCode: "2936.28.00",
          purity: "95%",
          specifications: ["Purity: 95%", "Mixed tocopherols", "Oil soluble", "Antioxidant"],
          applications: ["Antioxidant", "Moisturizing", "Anti-aging", "UV protection"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers", "25kg drums"],
          safetyInfo: ["Generally safe", "Well tolerated", "Natural vitamin"]
        },
        {
          id: "panthenol",
          name: "Panthenol (Pro-Vitamin B5)",
          description: "Moisturizing and healing agent",
          chemicalFormula: "C₉H₁₉NO₄",
          casNumber: "81-13-0",
          hsCode: "2924.29.00",
          purity: "99%",
          specifications: ["Purity: 99%", "Clear viscous liquid", "Water soluble", "pH: 9.0-10.5"],
          applications: ["Moisturizing", "Healing", "Hair conditioning", "Anti-inflammatory"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers", "25kg drums"],
          safetyInfo: ["Generally safe", "Well tolerated", "Non-irritating"]
        },
        {
          id: "allantoin",
          name: "Allantoin",
          description: "Soothing and healing agent",
          chemicalFormula: "C₄H₆N₄O₃",
          casNumber: "97-59-6",
          hsCode: "2933.99.00",
          purity: "99%",
          specifications: ["Purity: 99%", "White crystalline powder", "Water soluble", "pH: 5.5-6.5"],
          applications: ["Soothing", "Healing", "Anti-inflammatory", "Moisturizing"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers", "25kg drums"],
          safetyInfo: ["Generally safe", "Non-irritating", "Well tolerated"]
        },
        {
          id: "urea",
          name: "Urea (Cosmetic Grade)",
          description: "Moisturizing and exfoliating agent",
          chemicalFormula: "CH₄N₂O",
          casNumber: "57-13-6",
          hsCode: "3102.10.00",
          purity: "99%",
          specifications: ["Purity: 99%", "Cosmetic grade", "White crystalline", "Water soluble"],
          applications: ["Moisturizing", "Exfoliation", "Keratolytic", "Nail treatment"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers", "25kg drums"],
          safetyInfo: ["Generally safe", "May cause irritation at high concentrations"]
        },
        {
          id: "zinc-oxide",
          name: "Zinc Oxide (Nano)",
          description: "UV protection and anti-inflammatory",
          chemicalFormula: "ZnO",
          casNumber: "1314-13-2",
          hsCode: "2817.00.00",
          purity: "99%",
          specifications: ["Purity: 99%", "Nano grade", "Particle size: 20-30nm", "White powder"],
          applications: ["UV protection", "Anti-inflammatory", "Acne treatment", "Sunscreen"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers", "25kg drums"],
          safetyInfo: ["Generally safe", "Non-comedogenic", "Broad spectrum UV protection"]
        },
        {
          id: "titanium-dioxide-cosmetic",
          name: "Titanium Dioxide (Cosmetic)",
          description: "UV protection and whitening agent",
          chemicalFormula: "TiO₂",
          casNumber: "13463-67-7",
          hsCode: "3206.11.00",
          purity: "99%",
          specifications: ["Purity: 99%", "Cosmetic grade", "Rutile form", "White powder"],
          applications: ["UV protection", "Whitening", "Opacity", "Color cosmetics"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers", "25kg drums"],
          safetyInfo: ["Generally safe", "Non-toxic", "Broad spectrum UV protection"]
        },
        {
          id: "iron-oxides",
          name: "Iron Oxides (Cosmetic)",
          description: "Natural color pigments",
          chemicalFormula: "Fe₂O₃",
          casNumber: "1309-37-1",
          hsCode: "2821.10.00",
          purity: "95%",
          specifications: ["Purity: 95%", "Cosmetic grade", "Various colors", "Micronized"],
          applications: ["Color cosmetics", "Foundation", "Eye shadow", "Lip products"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers", "25kg drums"],
          safetyInfo: ["Generally safe", "Non-toxic", "Natural pigments"]
        },
        {
          id: "mica",
          name: "Mica (Cosmetic)",
          description: "Natural mineral for shimmer effects",
          chemicalFormula: "KAl₂(AlSi₃O₁₀)(OH)₂",
          casNumber: "12001-26-2",
          hsCode: "2525.10.00",
          purity: "99%",
          specifications: ["Purity: 99%", "Cosmetic grade", "Various mesh sizes", "Pearlescent"],
          applications: ["Shimmer effects", "Highlighters", "Eye shadow", "Nail polish"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers", "25kg drums"],
          safetyInfo: ["Generally safe", "Natural mineral", "Non-toxic"]
        },
        {
          id: "kaolin-clay",
          name: "Kaolin Clay",
          description: "Gentle clay for face masks",
          chemicalFormula: "Al₂Si₂O₅(OH)₄",
          casNumber: "1332-58-7",
          hsCode: "2507.00.00",
          purity: "99%",
          specifications: ["Purity: 99%", "Cosmetic grade", "White clay", "Fine particle size"],
          applications: ["Face masks", "Oil absorption", "Gentle exfoliation", "Acne treatment"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers", "25kg drums"],
          safetyInfo: ["Generally safe", "Natural clay", "Gentle on skin"]
        },
        {
          id: "bentonite-clay",
          name: "Bentonite Clay",
          description: "Detoxifying clay for deep cleansing",
          chemicalFormula: "Al₂O₃·4SiO₂·H₂O",
          casNumber: "1302-78-9",
          hsCode: "2508.10.00",
          purity: "95%",
          specifications: ["Purity: 95%", "Cosmetic grade", "High swelling capacity", "Fine powder"],
          applications: ["Deep cleansing", "Detoxification", "Oil control", "Pore cleansing"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers", "25kg drums"],
          safetyInfo: ["Generally safe", "Natural clay", "May be drying"]
        },
        {
          id: "charcoal-activated",
          name: "Activated Charcoal",
          description: "Purifying agent for deep cleansing",
          chemicalFormula: "C",
          casNumber: "7440-44-0",
          hsCode: "3802.10.00",
          purity: "99%",
          specifications: ["Purity: 99%", "Cosmetic grade", "High surface area", "Black powder"],
          applications: ["Deep cleansing", "Purification", "Blackhead removal", "Detoxification"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers", "25kg drums"],
          safetyInfo: ["Generally safe", "May cause temporary staining", "Natural purifier"]
        },
        {
          id: "collagen",
          name: "Marine Collagen",
          description: "Anti-aging protein for skin elasticity",
          chemicalFormula: "Variable",
          casNumber: "9007-34-5",
          hsCode: "3504.00.00",
          purity: "90%",
          specifications: ["Protein content: 90%", "Marine source", "Low molecular weight", "White powder"],
          applications: ["Anti-aging", "Skin elasticity", "Moisturizing", "Firming"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers", "25kg drums"],
          safetyInfo: ["Generally safe", "Marine source", "Biocompatible"]
        },
        {
          id: "elastin",
          name: "Elastin",
          description: "Protein for skin elasticity and firmness",
          chemicalFormula: "Variable",
          casNumber: "9007-58-3",
          hsCode: "3504.00.00",
          purity: "85%",
          specifications: ["Protein content: 85%", "Marine source", "Hydrolyzed form", "Light yellow powder"],
          applications: ["Skin firming", "Elasticity", "Anti-aging", "Moisturizing"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers"],
          safetyInfo: ["Generally safe", "Marine source", "Biocompatible"]
        },
        {
          id: "silk-protein",
          name: "Silk Protein",
          description: "Luxurious protein for hair and skin",
          chemicalFormula: "Variable",
          casNumber: "96690-41-4",
          hsCode: "3504.00.00",
          purity: "90%",
          specifications: ["Protein content: 90%", "Hydrolyzed silk", "Water soluble", "Light yellow liquid"],
          applications: ["Hair conditioning", "Skin smoothing", "Moisturizing", "Film forming"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers", "25kg drums"],
          safetyInfo: ["Generally safe", "Natural protein", "Well tolerated"]
        },
        {
          id: "keratin",
          name: "Hydrolyzed Keratin",
          description: "Hair strengthening protein",
          chemicalFormula: "Variable",
          casNumber: "69430-36-0",
          hsCode: "3504.00.00",
          purity: "85%",
          specifications: ["Protein content: 85%", "Hydrolyzed form", "Water soluble", "Light yellow liquid"],
          applications: ["Hair strengthening", "Damage repair", "Conditioning", "Protein treatment"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers", "25kg drums"],
          safetyInfo: ["Generally safe", "Natural protein", "Hair compatible"]
        },
        {
          id: "wheat-protein",
          name: "Hydrolyzed Wheat Protein",
          description: "Plant-based protein for hair and skin",
          chemicalFormula: "Variable",
          casNumber: "70084-87-6",
          hsCode: "3504.00.00",
          purity: "80%",
          specifications: ["Protein content: 80%", "Plant source", "Water soluble", "Light yellow liquid"],
          applications: ["Hair conditioning", "Volume enhancement", "Moisturizing", "Film forming"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers", "25kg drums"],
          safetyInfo: ["Generally safe", "Plant-based", "May contain gluten"]
        },
        {
          id: "oat-protein",
          name: "Hydrolyzed Oat Protein",
          description: "Soothing plant protein",
          chemicalFormula: "Variable",
          casNumber: "84012-26-0",
          hsCode: "3504.00.00",
          purity: "75%",
          specifications: ["Protein content: 75%", "Plant source", "Water soluble", "Light brown liquid"],
          applications: ["Soothing", "Moisturizing", "Anti-inflammatory", "Sensitive skin"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers", "25kg drums"],
          safetyInfo: ["Generally safe", "Plant-based", "Soothing properties"]
        },
        {
          id: "rice-protein",
          name: "Hydrolyzed Rice Protein",
          description: "Gentle plant protein for sensitive skin",
          chemicalFormula: "Variable",
          casNumber: "94350-05-7",
          hsCode: "3504.00.00",
          purity: "80%",
          specifications: ["Protein content: 80%", "Plant source", "Water soluble", "Light yellow liquid"],
          applications: ["Gentle conditioning", "Moisturizing", "Volume enhancement", "Sensitive skin"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers", "25kg drums"],
          safetyInfo: ["Generally safe", "Plant-based", "Hypoallergenic"]
        },
        {
          id: "soy-protein",
          name: "Hydrolyzed Soy Protein",
          description: "Nourishing plant protein",
          chemicalFormula: "Variable",
          casNumber: "68607-88-5",
          hsCode: "3504.00.00",
          purity: "85%",
          specifications: ["Protein content: 85%", "Plant source", "Water soluble", "Light yellow liquid"],
          applications: ["Hair conditioning", "Skin nourishing", "Moisturizing", "Anti-aging"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers", "25kg drums"],
          safetyInfo: ["Generally safe", "Plant-based", "May cause allergies in sensitive individuals"]
        },
        {
          id: "quinoa-protein",
          name: "Hydrolyzed Quinoa Protein",
          description: "Complete amino acid plant protein",
          chemicalFormula: "Variable",
          casNumber: "1401705-88-1",
          hsCode: "3504.00.00",
          purity: "80%",
          specifications: ["Protein content: 80%", "Complete amino acids", "Water soluble", "Light yellow liquid"],
          applications: ["Hair strengthening", "Color protection", "Moisturizing", "Damage repair"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers"],
          safetyInfo: ["Generally safe", "Plant-based", "Complete protein"]
        },
        {
          id: "baobab-protein",
          name: "Hydrolyzed Baobab Protein",
          description: "Exotic plant protein for hair care",
          chemicalFormula: "Variable",
          casNumber: "91745-12-9",
          hsCode: "3504.00.00",
          purity: "75%",
          specifications: ["Protein content: 75%", "Exotic plant source", "Water soluble", "Light brown liquid"],
          applications: ["Hair strengthening", "Moisture retention", "Shine enhancement", "Damage repair"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers"],
          safetyInfo: ["Generally safe", "Exotic plant source", "Sustainable"]
        },
        {
          id: "pea-protein",
          name: "Hydrolyzed Pea Protein",
          description: "Sustainable plant protein",
          chemicalFormula: "Variable",
          casNumber: "222400-29-5",
          hsCode: "3504.00.00",
          purity: "85%",
          specifications: ["Protein content: 85%", "Sustainable source", "Water soluble", "Light green liquid"],
          applications: ["Hair conditioning", "Volume enhancement", "Strengthening", "Eco-friendly formulations"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers", "25kg drums"],
          safetyInfo: ["Generally safe", "Sustainable", "Plant-based"]
        },
        {
          id: "algae-extract",
          name: "Marine Algae Extract",
          description: "Nutrient-rich marine extract",
          chemicalFormula: "Variable",
          casNumber: "68917-51-1",
          hsCode: "1302.32.00",
          purity: "95%",
          specifications: ["Extract ratio: 10:1", "Marine source", "Water soluble", "Dark green liquid"],
          applications: ["Anti-aging", "Moisturizing", "Mineral supplementation", "Antioxidant"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers", "25kg drums"],
          safetyInfo: ["Generally safe", "Marine source", "Rich in minerals"]
        },
        {
          id: "spirulina-extract",
          name: "Spirulina Extract",
          description: "Nutrient-dense blue-green algae",
          chemicalFormula: "Variable",
          casNumber: "724424-92-4",
          hsCode: "1302.32.00",
          purity: "95%",
          specifications: ["Protein content: 60%", "Blue-green color", "Water soluble", "Fine powder"],
          applications: ["Antioxidant", "Anti-aging", "Nutritive", "Color cosmetics"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers", "25kg drums"],
          safetyInfo: ["Generally safe", "Superfood", "Natural color"]
        },
        {
          id: "chlorella-extract",
          name: "Chlorella Extract",
          description: "Detoxifying green algae",
          chemicalFormula: "Variable",
          casNumber: "11006-34-1",
          hsCode: "1302.32.00",
          purity: "95%",
          specifications: ["Chlorophyll content: 3%", "Green color", "Water soluble", "Fine powder"],
          applications: ["Detoxification", "Antioxidant", "Anti-aging", "Purifying"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers", "25kg drums"],
          safetyInfo: ["Generally safe", "Detoxifying", "Natural green color"]
        },
        {
          id: "seaweed-extract",
          name: "Seaweed Extract",
          description: "Mineral-rich marine extract",
          chemicalFormula: "Variable",
          casNumber: "68917-51-1",
          hsCode: "1302.32.00",
          purity: "90%",
          specifications: ["Extract ratio: 20:1", "Marine source", "Water soluble", "Brown liquid"],
          applications: ["Moisturizing", "Firming", "Anti-aging", "Mineral supplementation"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers", "25kg drums"],
          safetyInfo: ["Generally safe", "Marine source", "Rich in iodine"]
        },
        {
          id: "kelp-extract",
          name: "Kelp Extract",
          description: "Nutrient-rich brown seaweed",
          chemicalFormula: "Variable",
          casNumber: "84775-78-0",
          hsCode: "1302.32.00",
          purity: "90%",
          specifications: ["Extract ratio: 15:1", "Brown seaweed", "Water soluble", "Dark brown liquid"],
          applications: ["Anti-aging", "Firming", "Moisturizing", "Cellulite treatment"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers", "25kg drums"],
          safetyInfo: ["Generally safe", "Marine source", "High in minerals"]
        },
        {
          id: "wakame-extract",
          name: "Wakame Extract",
          description: "Japanese seaweed for skin elasticity",
          chemicalFormula: "Variable",
          casNumber: "223749-05-1",
          hsCode: "1302.32.00",
          purity: "95%",
          specifications: ["Extract ratio: 10:1", "Japanese seaweed", "Water soluble", "Brown liquid"],
          applications: ["Skin elasticity", "Anti-aging", "Moisturizing", "UV protection"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers"],
          safetyInfo: ["Generally safe", "Traditional use", "Marine source"]
        },
        {
          id: "nori-extract",
          name: "Nori Extract",
          description: "Red seaweed extract for skin protection",
          chemicalFormula: "Variable",
          casNumber: "84775-78-0",
          hsCode: "1302.32.00",
          purity: "90%",
          specifications: ["Extract ratio: 20:1", "Red seaweed", "Water soluble", "Red-brown liquid"],
          applications: ["Skin protection", "Antioxidant", "Anti-inflammatory", "Moisturizing"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers"],
          safetyInfo: ["Generally safe", "Marine source", "Natural antioxidant"]
        },
        {
          id: "sea-buckthorn-extract",
          name: "Sea Buckthorn Extract",
          description: "Vitamin-rich berry extract",
          chemicalFormula: "Variable",
          casNumber: "90106-68-6",
          hsCode: "1302.19.00",
          purity: "95%",
          specifications: ["Vitamin C: 200mg/100g", "Orange color", "Oil/water soluble", "Orange liquid"],
          applications: ["Anti-aging", "Vitamin supplementation", "Healing", "Antioxidant"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers"],
          safetyInfo: ["Generally safe", "Rich in vitamins", "Natural extract"]
        },
        {
          id: "goji-berry-extract",
          name: "Goji Berry Extract",
          description: "Antioxidant-rich superfruit extract",
          chemicalFormula: "Variable",
          casNumber: "94349-94-1",
          hsCode: "1302.19.00",
          purity: "95%",
          specifications: ["Polysaccharides: 40%", "Red color", "Water soluble", "Red-brown powder"],
          applications: ["Antioxidant", "Anti-aging", "Skin protection", "Nutritive"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers"],
          safetyInfo: ["Generally safe", "Superfruit", "Natural antioxidant"]
        },
        {
          id: "acai-extract",
          name: "Acai Berry Extract",
          description: "Antioxidant powerhouse from Amazon",
          chemicalFormula: "Variable",
          casNumber: "879496-95-4",
          hsCode: "1302.19.00",
          purity: "95%",
          specifications: ["Anthocyanins: 25%", "Purple color", "Water soluble", "Purple powder"],
          applications: ["Antioxidant", "Anti-aging", "Skin protection", "Color cosmetics"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers"],
          safetyInfo: ["Generally safe", "Superfruit", "Natural color"]
        },
        {
          id: "pomegranate-extract",
          name: "Pomegranate Extract",
          description: "Antioxidant-rich fruit extract",
          chemicalFormula: "Variable",
          casNumber: "84961-57-9",
          hsCode: "1302.19.00",
          purity: "95%",
          specifications: ["Ellagic acid: 40%", "Red color", "Water soluble", "Red-brown powder"],
          applications: ["Antioxidant", "Anti-aging", "UV protection", "Anti-inflammatory"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers"],
          safetyInfo: ["Generally safe", "Natural antioxidant", "Traditional use"]
        },
        {
          id: "cranberry-extract",
          name: "Cranberry Extract",
          description: "Antioxidant and anti-bacterial extract",
          chemicalFormula: "Variable",
          casNumber: "84082-34-8",
          hsCode: "1302.19.00",
          purity: "95%",
          specifications: ["Proanthocyanidins: 25%", "Red color", "Water soluble", "Red powder"],
          applications: ["Antioxidant", "Anti-bacterial", "Anti-inflammatory", "Skin protection"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers"],
          safetyInfo: ["Generally safe", "Natural extract", "Anti-bacterial properties"]
        },
        {
          id: "blueberry-extract",
          name: "Blueberry Extract",
          description: "Antioxidant-rich berry extract",
          chemicalFormula: "Variable",
          casNumber: "84082-34-8",
          hsCode: "1302.19.00",
          purity: "95%",
          specifications: ["Anthocyanins: 25%", "Blue color", "Water soluble", "Blue-purple powder"],
          applications: ["Antioxidant", "Anti-aging", "Skin protection", "Color cosmetics"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp",
          packaging: ["1kg containers", "5kg containers"],
          safetyInfo: ["Generally safe", "Natural antioxidant", "Food grade"]
        }
      ]
    }
    // Continue with other categories...
  ];

  const product = products.find(p => p.id === parseInt(id || '0'));

  React.useEffect(() => {
    if (product && product.detailedProducts) {
      const filtered = product.detailedProducts.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.applications.some(app => app.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, product]);

  if (!product) {
    return (
      <div className="pt-24 pb-20">
        <div className="container-custom">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
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
      <section className="bg-gray-50 py-8">
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
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="mb-4">
                <span className="text-primary font-medium">{product.category}</span>
                {product.featured && (
                  <span className="ml-2 bg-accent/10 text-accent text-xs px-2 py-1 rounded-full font-medium">
                    Featured
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>
              
              <p className="text-xl text-gray-600 mb-6">{product.description}</p>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {product.chemicalFormula && (
                  <div>
                    <h4 className="font-semibold text-gray-800">Chemical Formula</h4>
                    <p className="text-gray-600">{product.chemicalFormula}</p>
                  </div>
                )}
                {product.purity && (
                  <div>
                    <h4 className="font-semibold text-gray-800">Purity</h4>
                    <p className="text-gray-600">{product.purity}</p>
                  </div>
                )}
                {product.casNumber && (
                  <div>
                    <h4 className="font-semibold text-gray-800">CAS Number</h4>
                    <p className="text-gray-600">{product.casNumber}</p>
                  </div>
                )}
                {product.hsCode && (
                  <div>
                    <h4 className="font-semibold text-gray-800">HS Code</h4>
                    <p className="text-gray-600">{product.hsCode}</p>
                  </div>
                )}
              </div>

              {/* Contact Buttons */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/contact" className="btn btn-primary flex items-center justify-center">
                  <Mail className="mr-2 h-5 w-5" />
                  Request Quote
                </Link>
                <a href="tel:+919510691989" className="btn bg-secondary text-white hover:bg-secondary-dark flex items-center justify-center">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Products Section */}
      {product.detailedProducts && product.detailedProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Available Products ({product.detailedProducts.length})</h2>
              <p className="text-gray-600 mb-6">Comprehensive range of high-quality products with detailed specifications</p>
              
              {/* Search Bar */}
              <div className="max-w-md mx-auto mb-8">
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(searchQuery ? filteredProducts : product.detailedProducts).map((detailProduct) => (
                <motion.div
                  key={detailProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={detailProduct.image}
                    alt={detailProduct.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{detailProduct.name}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{detailProduct.description}</p>
                    
                    {/* Technical Details */}
                    <div className="mb-4 space-y-2">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="font-medium text-gray-700">Formula:</span>
                          <p className="text-gray-600">{detailProduct.chemicalFormula}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">CAS:</span>
                          <p className="text-gray-600">{detailProduct.casNumber}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">HS Code:</span>
                          <p className="text-gray-600">{detailProduct.hsCode}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Purity:</span>
                          <p className="text-gray-600">{detailProduct.purity}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2 text-sm">Key Specifications:</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {detailProduct.specifications.slice(0, 3).map((spec, index) => (
                          <li key={index}>• {spec}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2 text-sm">Applications:</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {detailProduct.applications.slice(0, 3).map((app, index) => (
                          <li key={index}>• {app}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <Link to="/contact" className="btn btn-primary w-full text-center text-sm">
                      Get Quote
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            {searchQuery && filteredProducts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600">No products found matching your search.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Product Details Tabs */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Applications */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <ShieldCheck className="mr-3 h-6 w-6 text-primary" />
                Applications
              </h3>
              <ul className="space-y-3">
                {product.applications.map((application, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{application}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-6">Specifications</h3>
              <div className="space-y-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key}>
                    <h4 className="font-semibold text-gray-800 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    <p className="text-gray-600">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Packaging & Safety */}
            <div className="space-y-8">
              {/* Packaging */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-6 flex items-center">
                  <Truck className="mr-3 h-6 w-6 text-primary" />
                  Packaging
                </h3>
                <ul className="space-y-2">
                  {product.packaging.map((pack, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                      {pack}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Safety Information */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-6">Safety Information</h3>
                <ul className="space-y-2">
                  {product.safetyInfo.map((info, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-warning rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm">{info}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Products */}
      <section className="py-8 bg-gray-50">
        <div className="container-custom">
          <Link
            to="/products"
            className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to All Products
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;