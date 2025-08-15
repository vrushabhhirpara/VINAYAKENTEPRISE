import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, ShoppingCart, Download, Share2, Heart, ChevronDown, ChevronUp } from 'lucide-react';

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
  price?: string;
  rating?: number;
  reviews?: number;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<string>('specifications');
  const [expandedSafety, setExpandedSafety] = useState<boolean>(false);

  // Main products that appear on the products page
  const mainProducts: Product[] = [
    {
      id: 1,
      name: "Industrial Solvents",
      category: "Industrial Products",
      subcategory: "Surfactants",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "High-quality industrial solvents for various manufacturing and processing applications.",
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
      price: "₹150-500/L",
      rating: 4.5,
      reviews: 128
    },
    {
      id: 2,
      name: "Cosmetic & Personal Care",
      category: "Personal Care",
      subcategory: "Surfactants",
      image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
      description: "Premium cosmetic and personal care ingredients for beauty and hygiene products.",
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
      price: "₹200-800/kg",
      rating: 4.7,
      reviews: 95
    },
    {
      id: 3,
      name: "Food & Nutrition",
      category: "Food & Beverage",
      subcategory: "Food Additives",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Food-grade additives and nutritional ingredients for food and beverage industry.",
      featured: true,
      chemicalFormula: "Various",
      casNumber: "Multiple",
      hsCode: "2106.00",
      purity: "Food grade",
      applications: [
        "Food preservation",
        "Flavor enhancement",
        "Nutritional fortification",
        "Texture improvement",
        "Color enhancement"
      ],
      specifications: {
        appearance: "Various forms",
        solubility: "Water soluble",
        ph: "6.0-8.0"
      },
      packaging: ["1kg bags", "25kg bags", "500kg big bags"],
      safetyInfo: [
        "Food grade certified",
        "HACCP compliant",
        "Store in dry conditions",
        "Follow food safety protocols"
      ],
      price: "₹100-600/kg",
      rating: 4.6,
      reviews: 87
    },
    {
      id: 4,
      name: "Paint, Ink & Coatings",
      category: "Paint & Coatings",
      subcategory: "Pigments",
      image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
      description: "High-performance pigments and additives for paint, ink, and coating applications.",
      featured: true,
      chemicalFormula: "Various",
      casNumber: "Multiple",
      hsCode: "3206.00",
      purity: "Industrial grade",
      applications: [
        "Architectural paints",
        "Industrial coatings",
        "Printing inks",
        "Automotive paints",
        "Marine coatings"
      ],
      specifications: {
        appearance: "Powder/liquid",
        solubility: "Various",
        ph: "7.0-9.0"
      },
      packaging: ["25kg bags", "500kg big bags", "1000kg containers"],
      safetyInfo: [
        "Avoid dust inhalation",
        "Use protective equipment",
        "Store in dry place",
        "Follow MSDS guidelines"
      ],
      price: "₹80-400/kg",
      rating: 4.4,
      reviews: 112
    },
    {
      id: 5,
      name: "Cattle & Poultry Feed",
      category: "Animal Feed",
      subcategory: "Feed Additives",
      image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
      description: "Essential feed additives and nutritional supplements for animal health and growth.",
      featured: false,
      chemicalFormula: "Various",
      casNumber: "Multiple",
      hsCode: "2309.00",
      purity: "Feed grade",
      applications: [
        "Cattle nutrition",
        "Poultry feed",
        "Swine nutrition",
        "Aquaculture feed",
        "Pet food"
      ],
      specifications: {
        appearance: "Powder/granules",
        solubility: "Water dispersible",
        ph: "6.0-8.0"
      },
      packaging: ["25kg bags", "500kg big bags", "1000kg containers"],
      safetyInfo: [
        "Feed grade certified",
        "Store in dry conditions",
        "Prevent contamination",
        "Follow feeding guidelines"
      ],
      price: "₹60-300/kg",
      rating: 4.3,
      reviews: 76
    },
    {
      id: 7,
      name: "Water Treatment",
      category: "Water Treatment",
      subcategory: "Chemicals",
      image: "https://jkmchemtrade.com/upload/categories/4471230925113924.jpg",
      description: "Specialized chemicals for water purification and treatment applications.",
      featured: false,
      chemicalFormula: "Various",
      casNumber: "Multiple",
      hsCode: "3824.00",
      purity: "Technical grade",
      applications: [
        "Water purification",
        "Wastewater treatment",
        "Swimming pool treatment",
        "Industrial water treatment",
        "Drinking water treatment"
      ],
      specifications: {
        appearance: "Powder/liquid",
        solubility: "Water soluble",
        ph: "Various"
      },
      packaging: ["25kg bags", "50kg drums", "1000kg IBC tanks"],
      safetyInfo: [
        "Handle with care",
        "Use protective equipment",
        "Store in cool, dry place",
        "Follow safety protocols"
      ],
      price: "₹40-250/kg",
      rating: 4.2,
      reviews: 64
    },
    {
      id: 8,
      name: "Textile Dyes",
      category: "Textile",
      subcategory: "Dyes & Chemicals",
      image: "https://content.jdmagicbox.com/comp/def_content_category/textile-auxiliary-dealers/4bdc0a53ed-textile-auxiliary-dealers-1-m5o87.jpg",
      description: "High-quality dyes and chemicals for textile processing and coloration.",
      featured: false,
      chemicalFormula: "Various",
      casNumber: "Multiple",
      hsCode: "3204.00",
      purity: "Textile grade",
      applications: [
        "Fabric dyeing",
        "Textile printing",
        "Color fastness",
        "Fabric finishing",
        "Garment processing"
      ],
      specifications: {
        appearance: "Powder/liquid",
        solubility: "Water soluble",
        ph: "6.0-8.0"
      },
      packaging: ["25kg drums", "200kg drums", "1000kg containers"],
      safetyInfo: [
        "Avoid skin contact",
        "Use in well-ventilated area",
        "Store away from light",
        "Follow textile safety standards"
      ],
      price: "₹120-600/kg",
      rating: 4.1,
      reviews: 53
    },
    {
      id: 9,
      name: "Home Care",
      category: "Home Care",
      subcategory: "Cleaning Agents",
      image: "https://5.imimg.com/data5/SELLER/Default/2023/10/351523658/UT/NP/JG/143402947/homecare-products.jpg",
      description: "Professional-grade cleaning agents and home care product ingredients.",
      featured: false,
      chemicalFormula: "Various",
      casNumber: "Multiple",
      hsCode: "3402.00",
      purity: "Consumer grade",
      applications: [
        "Surface cleaning",
        "Laundry care",
        "Dishwashing",
        "Floor cleaning",
        "Bathroom cleaning"
      ],
      specifications: {
        appearance: "Liquid/powder",
        solubility: "Water soluble",
        ph: "7.0-10.0"
      },
      packaging: ["500ml bottles", "1L bottles", "5L containers"],
      safetyInfo: [
        "Keep away from children",
        "Use as directed",
        "Store in cool place",
        "Avoid mixing with other chemicals"
      ],
      price: "₹50-200/L",
      rating: 4.0,
      reviews: 89
    },
    {
      id: 10,
      name: "Agriculture",
      category: "Agriculture",
      subcategory: "Fertilizers & Pesticides",
      image: "https://www.pcaplindia.com/images/banner5.jpg",
      description: "Agricultural chemicals and fertilizers for crop protection and nutrition.",
      featured: false,
      chemicalFormula: "Various",
      casNumber: "Multiple",
      hsCode: "3105.00",
      purity: "Agricultural grade",
      applications: [
        "Crop nutrition",
        "Pest control",
        "Soil conditioning",
        "Plant growth regulation",
        "Harvest preservation"
      ],
      specifications: {
        appearance: "Granules/powder",
        solubility: "Water soluble",
        ph: "6.0-8.0"
      },
      packaging: ["1kg bags", "25kg bags", "500kg big bags"],
      safetyInfo: [
        "Follow application guidelines",
        "Use protective equipment",
        "Store away from food",
        "Observe pre-harvest intervals"
      ],
      price: "₹30-180/kg",
      rating: 4.2,
      reviews: 71
    }
  ];

  // Generate detailed products for each category
  const generateCategoryProducts = (category: string): Product[] => {
    const baseId = parseInt(id || '1') * 1000;
    
    if (category === "Industrial Products") {
      // 50 Industrial Solvents
      return [
        {
          id: baseId + 1,
          name: "Methanol (Methyl Alcohol)",
          category: "Industrial Products",
          subcategory: "Alcohols",
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "High purity methanol for industrial applications and chemical synthesis.",
          featured: false,
          chemicalFormula: "CH₃OH",
          casNumber: "67-56-1",
          hsCode: "2905.11",
          purity: "99.9%",
          applications: ["Solvent", "Fuel additive", "Chemical synthesis", "Antifreeze"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Miscible with water",
            boilingPoint: "64.7°C",
            density: "0.792 g/cm³",
            ph: "7.0"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Highly flammable", "Toxic if ingested", "Use in ventilated area"],
          price: "₹45/L",
          rating: 4.5,
          reviews: 89
        },
        {
          id: baseId + 2,
          name: "Ethanol (Ethyl Alcohol)",
          category: "Industrial Products",
          subcategory: "Alcohols",
          image: "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Industrial grade ethanol for various manufacturing processes.",
          featured: false,
          chemicalFormula: "C₂H₅OH",
          casNumber: "64-17-5",
          hsCode: "2207.10",
          purity: "99.5%",
          applications: ["Solvent", "Disinfectant", "Fuel", "Extraction"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Miscible with water",
            boilingPoint: "78.4°C",
            density: "0.789 g/cm³",
            ph: "7.0"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Flammable", "Avoid ignition sources", "Store in cool place"],
          price: "₹55/L",
          rating: 4.6,
          reviews: 76
        },
        {
          id: baseId + 3,
          name: "Isopropyl Alcohol (IPA)",
          category: "Industrial Products",
          subcategory: "Alcohols",
          image: "https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "High purity isopropyl alcohol for cleaning and disinfection.",
          featured: false,
          chemicalFormula: "C₃H₈O",
          casNumber: "67-63-0",
          hsCode: "2905.12",
          purity: "99.9%",
          applications: ["Cleaning agent", "Disinfectant", "Solvent", "Electronics cleaning"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Miscible with water",
            boilingPoint: "82.6°C",
            density: "0.786 g/cm³",
            ph: "7.0"
          },
          packaging: ["1L bottles", "25L drums", "200L drums"],
          safetyInfo: ["Flammable", "Avoid contact with eyes", "Use with ventilation"],
          price: "₹65/L",
          rating: 4.7,
          reviews: 134
        },
        {
          id: baseId + 4,
          name: "Acetone",
          category: "Industrial Products",
          subcategory: "Ketones",
          image: "https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Pure acetone for industrial cleaning and paint thinning applications.",
          featured: false,
          chemicalFormula: "C₃H₆O",
          casNumber: "67-64-1",
          hsCode: "2914.11",
          purity: "99.5%",
          applications: ["Paint thinner", "Cleaning solvent", "Nail polish remover", "Degreasing"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Miscible with water",
            boilingPoint: "56.1°C",
            density: "0.784 g/cm³",
            ph: "7.0"
          },
          packaging: ["1L bottles", "25L drums", "200L drums"],
          safetyInfo: ["Highly flammable", "Vapors may cause drowsiness", "Keep away from heat"],
          price: "₹70/L",
          rating: 4.4,
          reviews: 98
        },
        {
          id: baseId + 5,
          name: "Toluene",
          category: "Industrial Products",
          subcategory: "Aromatics",
          image: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "High grade toluene for paint, adhesive, and rubber industries.",
          featured: false,
          chemicalFormula: "C₇H₈",
          casNumber: "108-88-3",
          hsCode: "2902.30",
          purity: "99.8%",
          applications: ["Paint solvent", "Adhesive production", "Rubber processing", "Chemical synthesis"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Insoluble in water",
            boilingPoint: "110.6°C",
            density: "0.867 g/cm³",
            ph: "N/A"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Flammable", "Avoid inhalation", "Use respiratory protection"],
          price: "₹85/L",
          rating: 4.3,
          reviews: 67
        },
        {
          id: baseId + 6,
          name: "Xylene (Mixed Isomers)",
          category: "Industrial Products",
          subcategory: "Aromatics",
          image: "https://images.pexels.com/photos/3735760/pexels-photo-3735760.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Technical grade xylene for paint and coating applications.",
          featured: false,
          chemicalFormula: "C₈H₁₀",
          casNumber: "1330-20-7",
          hsCode: "2902.41",
          purity: "99.0%",
          applications: ["Paint thinner", "Printing ink", "Rubber cement", "Leather processing"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Insoluble in water",
            boilingPoint: "138-144°C",
            density: "0.864 g/cm³",
            ph: "N/A"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Flammable", "Harmful if inhaled", "Avoid skin contact"],
          price: "₹90/L",
          rating: 4.2,
          reviews: 54
        },
        {
          id: baseId + 7,
          name: "Ethyl Acetate",
          category: "Industrial Products",
          subcategory: "Esters",
          image: "https://images.pexels.com/photos/4033325/pexels-photo-4033325.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "High purity ethyl acetate for coatings and pharmaceutical applications.",
          featured: false,
          chemicalFormula: "C₄H₈O₂",
          casNumber: "141-78-6",
          hsCode: "2915.31",
          purity: "99.5%",
          applications: ["Solvent for coatings", "Pharmaceutical extraction", "Nail polish", "Adhesives"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Slightly soluble in water",
            boilingPoint: "77.1°C",
            density: "0.902 g/cm³",
            ph: "7.0"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Flammable", "May cause drowsiness", "Use adequate ventilation"],
          price: "₹95/L",
          rating: 4.5,
          reviews: 82
        },
        {
          id: baseId + 8,
          name: "Butyl Acetate",
          category: "Industrial Products",
          subcategory: "Esters",
          image: "https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Industrial grade butyl acetate for lacquer and coating formulations.",
          featured: false,
          chemicalFormula: "C₆H₁₂O₂",
          casNumber: "123-86-4",
          hsCode: "2915.33",
          purity: "99.0%",
          applications: ["Lacquer solvent", "Paint thinner", "Leather finishing", "Perfume extraction"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Slightly soluble in water",
            boilingPoint: "126.1°C",
            density: "0.882 g/cm³",
            ph: "7.0"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Flammable", "Irritant to eyes and skin", "Avoid prolonged exposure"],
          price: "₹105/L",
          rating: 4.3,
          reviews: 71
        },
        {
          id: baseId + 9,
          name: "Methyl Ethyl Ketone (MEK)",
          category: "Industrial Products",
          subcategory: "Ketones",
          image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "High quality MEK for adhesive and coating applications.",
          featured: false,
          chemicalFormula: "C₄H₈O",
          casNumber: "78-93-3",
          hsCode: "2914.12",
          purity: "99.5%",
          applications: ["Adhesive solvent", "Paint remover", "Cleaning agent", "Resin production"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Miscible with water",
            boilingPoint: "79.6°C",
            density: "0.805 g/cm³",
            ph: "7.0"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Flammable", "Harmful if inhaled", "Use with proper ventilation"],
          price: "₹110/L",
          rating: 4.4,
          reviews: 63
        },
        {
          id: baseId + 10,
          name: "Cyclohexanone",
          category: "Industrial Products",
          subcategory: "Ketones",
          image: "https://images.pexels.com/photos/3735748/pexels-photo-3735748.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Pure cyclohexanone for nylon production and paint formulations.",
          featured: false,
          chemicalFormula: "C₆H₁₀O",
          casNumber: "108-94-1",
          hsCode: "2914.22",
          purity: "99.8%",
          applications: ["Nylon production", "Paint solvent", "Adhesive manufacturing", "Metal degreasing"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Slightly soluble in water",
            boilingPoint: "155.7°C",
            density: "0.947 g/cm³",
            ph: "7.0"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Flammable", "May cause skin irritation", "Avoid eye contact"],
          price: "₹125/L",
          rating: 4.2,
          reviews: 45
        },
        {
          id: baseId + 11,
          name: "Dichloromethane (DCM)",
          category: "Industrial Products",
          subcategory: "Chlorinated Solvents",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "High purity dichloromethane for pharmaceutical and industrial use.",
          featured: false,
          chemicalFormula: "CH₂Cl₂",
          casNumber: "75-09-2",
          hsCode: "2903.12",
          purity: "99.9%",
          applications: ["Paint stripper", "Pharmaceutical extraction", "Metal cleaning", "Foam blowing"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Slightly soluble in water",
            boilingPoint: "39.6°C",
            density: "1.326 g/cm³",
            ph: "7.0"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Suspected carcinogen", "Use with extreme caution", "Adequate ventilation required"],
          price: "₹140/L",
          rating: 4.1,
          reviews: 38
        },
        {
          id: baseId + 12,
          name: "Trichloroethylene (TCE)",
          category: "Industrial Products",
          subcategory: "Chlorinated Solvents",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Industrial grade trichloroethylene for metal degreasing applications.",
          featured: false,
          chemicalFormula: "C₂HCl₃",
          casNumber: "79-01-6",
          hsCode: "2903.23",
          purity: "99.5%",
          applications: ["Metal degreasing", "Dry cleaning", "Chemical intermediate", "Extraction solvent"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Slightly soluble in water",
            boilingPoint: "87.2°C",
            density: "1.464 g/cm³",
            ph: "7.0"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Carcinogenic", "Restricted use", "Professional handling only"],
          price: "₹160/L",
          rating: 3.9,
          reviews: 29
        },
        {
          id: baseId + 13,
          name: "Perchloroethylene (PCE)",
          category: "Industrial Products",
          subcategory: "Chlorinated Solvents",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "High purity perchloroethylene for dry cleaning and degreasing.",
          featured: false,
          chemicalFormula: "C₂Cl₄",
          casNumber: "127-18-4",
          hsCode: "2903.24",
          purity: "99.9%",
          applications: ["Dry cleaning", "Metal degreasing", "Chemical intermediate", "Textile processing"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Insoluble in water",
            boilingPoint: "121.1°C",
            density: "1.623 g/cm³",
            ph: "N/A"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Probable carcinogen", "Restricted use", "Environmental hazard"],
          price: "₹180/L",
          rating: 3.8,
          reviews: 22
        },
        {
          id: baseId + 14,
          name: "n-Hexane",
          category: "Industrial Products",
          subcategory: "Hydrocarbons",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Pure n-hexane for extraction and laboratory applications.",
          featured: false,
          chemicalFormula: "C₆H₁₄",
          casNumber: "110-54-3",
          hsCode: "2901.10",
          purity: "99.0%",
          applications: ["Oil extraction", "Laboratory solvent", "Adhesive production", "Cleaning agent"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Insoluble in water",
            boilingPoint: "68.7°C",
            density: "0.659 g/cm³",
            ph: "N/A"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Highly flammable", "Neurotoxic", "Use with extreme caution"],
          price: "₹75/L",
          rating: 4.0,
          reviews: 56
        },
        {
          id: baseId + 15,
          name: "n-Heptane",
          category: "Industrial Products",
          subcategory: "Hydrocarbons",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "High purity n-heptane for research and industrial applications.",
          featured: false,
          chemicalFormula: "C₇H₁₆",
          casNumber: "142-82-5",
          hsCode: "2901.10",
          purity: "99.0%",
          applications: ["Laboratory standard", "Extraction solvent", "Rubber cement", "Fuel additive"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Insoluble in water",
            boilingPoint: "98.4°C",
            density: "0.684 g/cm³",
            ph: "N/A"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Flammable", "May cause drowsiness", "Avoid prolonged inhalation"],
          price: "₹80/L",
          rating: 4.1,
          reviews: 41
        },
        {
          id: baseId + 16,
          name: "Cyclohexane",
          category: "Industrial Products",
          subcategory: "Hydrocarbons",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Pure cyclohexane for nylon production and chemical synthesis.",
          featured: false,
          chemicalFormula: "C₆H₁₂",
          casNumber: "110-82-7",
          hsCode: "2902.11",
          purity: "99.5%",
          applications: ["Nylon production", "Paint thinner", "Analytical chemistry", "Recrystallization"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Insoluble in water",
            boilingPoint: "80.7°C",
            density: "0.779 g/cm³",
            ph: "N/A"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Flammable", "Harmful if inhaled", "Keep away from ignition sources"],
          price: "₹85/L",
          rating: 4.2,
          reviews: 48
        },
        {
          id: baseId + 17,
          name: "Diethyl Ether",
          category: "Industrial Products",
          subcategory: "Ethers",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Anhydrous diethyl ether for laboratory and pharmaceutical use.",
          featured: false,
          chemicalFormula: "C₄H₁₀O",
          casNumber: "60-29-7",
          hsCode: "2909.11",
          purity: "99.8%",
          applications: ["Laboratory solvent", "Extraction", "Anesthetic", "Chemical synthesis"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Slightly soluble in water",
            boilingPoint: "34.6°C",
            density: "0.713 g/cm³",
            ph: "7.0"
          },
          packaging: ["1L bottles", "25L drums", "200L drums"],
          safetyInfo: ["Extremely flammable", "Forms explosive peroxides", "Store in cool place"],
          price: "₹200/L",
          rating: 4.6,
          reviews: 73
        },
        {
          id: baseId + 18,
          name: "Tetrahydrofuran (THF)",
          category: "Industrial Products",
          subcategory: "Ethers",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "High purity THF for polymer production and laboratory use.",
          featured: false,
          chemicalFormula: "C₄H₈O",
          casNumber: "109-99-9",
          hsCode: "2932.20",
          purity: "99.9%",
          applications: ["Polymer solvent", "Chemical synthesis", "Laboratory reagent", "PVC production"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Miscible with water",
            boilingPoint: "66.0°C",
            density: "0.889 g/cm³",
            ph: "7.0"
          },
          packaging: ["1L bottles", "25L drums", "200L drums"],
          safetyInfo: ["Flammable", "Forms peroxides", "Use stabilized grade"],
          price: "₹250/L",
          rating: 4.5,
          reviews: 62
        },
        {
          id: baseId + 19,
          name: "1,4-Dioxane",
          category: "Industrial Products",
          subcategory: "Ethers",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Pure 1,4-dioxane for chemical synthesis and extraction.",
          featured: false,
          chemicalFormula: "C₄H₈O₂",
          casNumber: "123-91-1",
          hsCode: "2932.20",
          purity: "99.5%",
          applications: ["Chemical synthesis", "Extraction solvent", "Laboratory reagent", "Paint stripper"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Miscible with water",
            boilingPoint: "101.1°C",
            density: "1.034 g/cm³",
            ph: "7.0"
          },
          packaging: ["1L bottles", "25L drums", "200L drums"],
          safetyInfo: ["Probable carcinogen", "Flammable", "Restricted use"],
          price: "₹300/L",
          rating: 3.9,
          reviews: 34
        },
        {
          id: baseId + 20,
          name: "Propylene Glycol",
          category: "Industrial Products",
          subcategory: "Glycols",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "USP grade propylene glycol for pharmaceutical and food applications.",
          featured: false,
          chemicalFormula: "C₃H₈O₂",
          casNumber: "57-55-6",
          hsCode: "2905.32",
          purity: "99.8%",
          applications: ["Pharmaceutical excipient", "Food additive", "Cosmetic ingredient", "Antifreeze"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Miscible with water",
            boilingPoint: "188.2°C",
            density: "1.036 g/cm³",
            ph: "7.0"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Generally recognized as safe", "Low toxicity", "Food grade available"],
          price: "₹120/L",
          rating: 4.7,
          reviews: 156
        },
        {
          id: baseId + 21,
          name: "Ethylene Glycol",
          category: "Industrial Products",
          subcategory: "Glycols",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Industrial grade ethylene glycol for antifreeze and polyester production.",
          featured: false,
          chemicalFormula: "C₂H₆O₂",
          casNumber: "107-21-1",
          hsCode: "2905.31",
          purity: "99.5%",
          applications: ["Antifreeze", "Polyester production", "Heat transfer fluid", "Hydraulic fluid"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Miscible with water",
            boilingPoint: "197.3°C",
            density: "1.113 g/cm³",
            ph: "7.0"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Toxic if ingested", "Harmful to animals", "Store securely"],
          price: "₹90/L",
          rating: 4.3,
          reviews: 98
        },
        {
          id: baseId + 22,
          name: "Diethylene Glycol",
          category: "Industrial Products",
          subcategory: "Glycols",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "High purity diethylene glycol for industrial applications.",
          featured: false,
          chemicalFormula: "C₄H₁₀O₃",
          casNumber: "111-46-6",
          hsCode: "2909.41",
          purity: "99.0%",
          applications: ["Solvent", "Humectant", "Plasticizer", "Chemical intermediate"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Miscible with water",
            boilingPoint: "245.8°C",
            density: "1.118 g/cm³",
            ph: "7.0"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Harmful if ingested", "May cause kidney damage", "Handle with care"],
          price: "₹110/L",
          rating: 4.1,
          reviews: 67
        },
        {
          id: baseId + 23,
          name: "Dimethyl Sulfoxide (DMSO)",
          category: "Industrial Products",
          subcategory: "Specialty Solvents",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Pharmaceutical grade DMSO for research and industrial use.",
          featured: false,
          chemicalFormula: "C₂H₆OS",
          casNumber: "67-68-5",
          hsCode: "2930.90",
          purity: "99.9%",
          applications: ["Pharmaceutical solvent", "Cryoprotectant", "Paint stripper", "Chemical reaction medium"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Miscible with water",
            boilingPoint: "189°C",
            density: "1.100 g/cm³",
            ph: "7.0"
          },
          packaging: ["1L bottles", "25L drums", "200L drums"],
          safetyInfo: ["Penetrates skin rapidly", "May cause garlic-like odor", "Use with caution"],
          price: "₹350/L",
          rating: 4.4,
          reviews: 89
        },
        {
          id: baseId + 24,
          name: "N-Methyl-2-Pyrrolidone (NMP)",
          category: "Industrial Products",
          subcategory: "Specialty Solvents",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "High purity NMP for electronics and pharmaceutical applications.",
          featured: false,
          chemicalFormula: "C₅H₉NO",
          casNumber: "872-50-4",
          hsCode: "2933.79",
          purity: "99.5%",
          applications: ["Electronics cleaning", "Paint stripper", "Pharmaceutical solvent", "Polymer processing"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Miscible with water",
            boilingPoint: "202°C",
            density: "1.028 g/cm³",
            ph: "8.5"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Reproductive toxin", "Restricted use in EU", "Professional handling required"],
          price: "₹400/L",
          rating: 4.2,
          reviews: 45
        },
        {
          id: baseId + 25,
          name: "Sulfolane",
          category: "Industrial Products",
          subcategory: "Specialty Solvents",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Pure sulfolane for gas processing and chemical extraction.",
          featured: false,
          chemicalFormula: "C₄H₈O₂S",
          casNumber: "126-33-0",
          hsCode: "2930.90",
          purity: "99.0%",
          applications: ["Gas processing", "Aromatic extraction", "Chemical synthesis", "Electrolyte solvent"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Miscible with water",
            boilingPoint: "287.3°C",
            density: "1.261 g/cm³",
            ph: "7.0"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Low toxicity", "Stable compound", "Handle as industrial chemical"],
          price: "₹450/L",
          rating: 4.0,
          reviews: 32
        },
        {
          id: baseId + 26,
          name: "Ethyl Lactate",
          category: "Industrial Products",
          subcategory: "Green Solvents",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Biodegradable ethyl lactate for eco-friendly applications.",
          featured: false,
          chemicalFormula: "C₅H₁₀O₃",
          casNumber: "97-64-3",
          hsCode: "2918.19",
          purity: "98.0%",
          applications: ["Green solvent", "Paint stripper", "Electronics cleaning", "Pharmaceutical intermediate"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Miscible with water",
            boilingPoint: "154.5°C",
            density: "1.030 g/cm³",
            ph: "3.0"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Biodegradable", "Low toxicity", "Environmentally friendly"],
          price: "₹280/L",
          rating: 4.6,
          reviews: 78
        },
        {
          id: baseId + 27,
          name: "D-Limonene",
          category: "Industrial Products",
          subcategory: "Green Solvents",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Natural D-limonene extracted from citrus peels for cleaning applications.",
          featured: false,
          chemicalFormula: "C₁₀H₁₆",
          casNumber: "5989-27-5",
          hsCode: "3301.19",
          purity: "95.0%",
          applications: ["Natural cleaner", "Degreaser", "Paint thinner", "Adhesive remover"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Insoluble in water",
            boilingPoint: "176°C",
            density: "0.841 g/cm³",
            ph: "N/A"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Natural product", "May cause skin sensitization", "Pleasant citrus odor"],
          price: "₹320/L",
          rating: 4.5,
          reviews: 92
        },
        {
          id: baseId + 28,
          name: "Pine Oil",
          category: "Industrial Products",
          subcategory: "Natural Solvents",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Natural pine oil for cleaning and disinfection applications.",
          featured: false,
          chemicalFormula: "Mixed terpenes",
          casNumber: "8002-09-3",
          hsCode: "3805.10",
          purity: "85.0%",
          applications: ["Disinfectant", "Deodorizer", "Cleaning agent", "Flotation agent"],
          specifications: {
            appearance: "Clear to pale yellow liquid",
            solubility: "Insoluble in water",
            boilingPoint: "150-180°C",
            density: "0.92-0.94 g/cm³",
            ph: "N/A"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Natural product", "May cause skin irritation", "Pleasant pine odor"],
          price: "₹180/L",
          rating: 4.3,
          reviews: 67
        },
        {
          id: baseId + 29,
          name: "Turpentine Oil",
          category: "Industrial Products",
          subcategory: "Natural Solvents",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Distilled turpentine oil for paint and varnish applications.",
          featured: false,
          chemicalFormula: "Mixed terpenes",
          casNumber: "8006-64-2",
          hsCode: "3805.10",
          purity: "90.0%",
          applications: ["Paint thinner", "Varnish solvent", "Cleaning agent", "Art supplies"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Insoluble in water",
            boilingPoint: "150-180°C",
            density: "0.86-0.87 g/cm³",
            ph: "N/A"
          },
          packaging: ["1L bottles", "25L drums", "200L drums"],
          safetyInfo: ["Flammable", "May cause skin sensitization", "Use with ventilation"],
          price: "₹150/L",
          rating: 4.2,
          reviews: 54
        },
        {
          id: baseId + 30,
          name: "White Spirit (Mineral Turpentine)",
          category: "Industrial Products",
          subcategory: "Petroleum Solvents",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "High quality white spirit for paint and coating applications.",
          featured: false,
          chemicalFormula: "Mixed hydrocarbons",
          casNumber: "64742-88-7",
          hsCode: "2710.12",
          purity: "98.0%",
          applications: ["Paint thinner", "Cleaning solvent", "Degreaser", "Extraction medium"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Insoluble in water",
            boilingPoint: "150-200°C",
            density: "0.78-0.82 g/cm³",
            ph: "N/A"
          },
          packaging: ["1L bottles", "25L drums", "200L drums"],
          safetyInfo: ["Flammable", "Harmful if inhaled", "Avoid prolonged skin contact"],
          price: "₹65/L",
          rating: 4.4,
          reviews: 123
        },
        {
          id: baseId + 31,
          name: "Mineral Spirits",
          category: "Industrial Products",
          subcategory: "Petroleum Solvents",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Low odor mineral spirits for professional painting applications.",
          featured: false,
          chemicalFormula: "Mixed aliphatic hydrocarbons",
          casNumber: "64742-88-7",
          hsCode: "2710.12",
          purity: "99.0%",
          applications: ["Paint thinner", "Brush cleaner", "Parts washing", "Oil-based stain"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Insoluble in water",
            boilingPoint: "145-200°C",
            density: "0.76-0.78 g/cm³",
            ph: "N/A"
          },
          packaging: ["1L bottles", "25L drums", "200L drums"],
          safetyInfo: ["Flammable", "Low odor grade available", "Use with adequate ventilation"],
          price: "₹70/L",
          rating: 4.5,
          reviews: 98
        },
        {
          id: baseId + 32,
          name: "Benzyl Alcohol",
          category: "Industrial Products",
          subcategory: "Aromatic Alcohols",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Pharmaceutical grade benzyl alcohol for cosmetic and pharmaceutical use.",
          featured: false,
          chemicalFormula: "C₇H₈O",
          casNumber: "100-51-6",
          hsCode: "2906.21",
          purity: "99.0%",
          applications: ["Cosmetic preservative", "Pharmaceutical solvent", "Paint solvent", "Flavor ingredient"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Slightly soluble in water",
            boilingPoint: "205.3°C",
            density: "1.045 g/cm³",
            ph: "7.0"
          },
          packaging: ["1L bottles", "25L drums", "200L drums"],
          safetyInfo: ["May cause skin irritation", "Avoid eye contact", "Pleasant floral odor"],
          price: "₹220/L",
          rating: 4.3,
          reviews: 76
        },
        {
          id: baseId + 33,
          name: "Phenylethyl Alcohol",
          category: "Industrial Products",
          subcategory: "Aromatic Alcohols",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Natural phenylethyl alcohol for fragrance and flavor applications.",
          featured: false,
          chemicalFormula: "C₈H₁₀O",
          casNumber: "60-12-8",
          hsCode: "2906.29",
          purity: "98.0%",
          applications: ["Fragrance ingredient", "Flavor compound", "Antimicrobial agent", "Solvent"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Slightly soluble in water",
            boilingPoint: "219.2°C",
            density: "1.020 g/cm³",
            ph: "7.0"
          },
          packaging: ["1L bottles", "25L drums", "200L drums"],
          safetyInfo: ["Generally recognized as safe", "Rose-like odor", "Food grade available"],
          price: "₹380/L",
          rating: 4.4,
          reviews: 52
        },
        {
          id: baseId + 34,
          name: "Propylene Carbonate",
          category: "Industrial Products",
          subcategory: "Carbonates",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "High purity propylene carbonate for battery and electronic applications.",
          featured: false,
          chemicalFormula: "C₄H₆O₃",
          casNumber: "108-32-7",
          hsCode: "2920.90",
          purity: "99.5%",
          applications: ["Battery electrolyte", "Paint stripper", "Plasticizer", "Gas absorption"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Miscible with water",
            boilingPoint: "242°C",
            density: "1.205 g/cm³",
            ph: "7.0"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Low toxicity", "Biodegradable", "Non-flammable"],
          price: "₹320/L",
          rating: 4.2,
          reviews: 43
        },
        {
          id: baseId + 35,
          name: "Ethylene Carbonate",
          category: "Industrial Products",
          subcategory: "Carbonates",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Battery grade ethylene carbonate for lithium-ion battery applications.",
          featured: false,
          chemicalFormula: "C₃H₄O₃",
          casNumber: "96-49-1",
          hsCode: "2920.90",
          purity: "99.9%",
          applications: ["Battery electrolyte", "Chemical intermediate", "Plasticizer", "Solvent"],
          specifications: {
            appearance: "White crystalline solid",
            solubility: "Soluble in water",
            meltingPoint: "36.4°C",
            density: "1.321 g/cm³",
            ph: "7.0"
          },
          packaging: ["25kg bags", "200kg drums", "500kg containers"],
          safetyInfo: ["Low toxicity", "Handle as solid at room temperature", "Melts at body temperature"],
          price: "₹420/kg",
          rating: 4.1,
          reviews: 38
        },
        {
          id: baseId + 36,
          name: "Gamma-Butyrolactone (GBL)",
          category: "Industrial Products",
          subcategory: "Lactones",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "High purity GBL for industrial cleaning and chemical synthesis.",
          featured: false,
          chemicalFormula: "C₄H₆O₂",
          casNumber: "96-48-0",
          hsCode: "2932.21",
          purity: "99.0%",
          applications: ["Industrial cleaner", "Paint stripper", "Chemical intermediate", "Polymer production"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Miscible with water",
            boilingPoint: "204°C",
            density: "1.124 g/cm³",
            ph: "7.0"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Controlled substance", "Professional use only", "Restricted availability"],
          price: "₹500/L",
          rating: 3.8,
          reviews: 25
        },
        {
          id: baseId + 37,
          name: "Dimethylformamide (DMF)",
          category: "Industrial Products",
          subcategory: "Amides",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "High purity DMF for pharmaceutical and chemical synthesis.",
          featured: false,
          chemicalFormula: "C₃H₇NO",
          casNumber: "68-12-2",
          hsCode: "2924.12",
          purity: "99.8%",
          applications: ["Chemical synthesis", "Pharmaceutical solvent", "Fiber production", "Paint stripper"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Miscible with water",
            boilingPoint: "153°C",
            density: "0.944 g/cm³",
            ph: "7.0"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Reproductive toxin", "Hepatotoxic", "Restricted use"],
          price: "₹280/L",
          rating: 4.0,
          reviews: 56
        },
        {
          id: baseId + 38,
          name: "Dimethylacetamide (DMAc)",
          category: "Industrial Products",
          subcategory: "Amides",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Pure DMAc for fiber spinning and pharmaceutical applications.",
          featured: false,
          chemicalFormula: "C₄H₉NO",
          casNumber: "127-19-5",
          hsCode: "2924.19",
          purity: "99.5%",
          applications: ["Fiber spinning", "Pharmaceutical solvent", "Paint stripper", "Chemical synthesis"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Miscible with water",
            boilingPoint: "165.5°C",
            density: "0.937 g/cm³",
            ph: "8.0"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Reproductive toxin", "Teratogenic", "Professional handling required"],
          price: "₹320/L",
          rating: 3.9,
          reviews: 41
        },
        {
          id: baseId + 39,
          name: "Triethylamine",
          category: "Industrial Products",
          subcategory: "Amines",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "High purity triethylamine for chemical synthesis and catalysis.",
          featured: false,
          chemicalFormula: "C₆H₁₅N",
          casNumber: "121-44-8",
          hsCode: "2921.19",
          purity: "99.0%",
          applications: ["Chemical synthesis", "Catalyst", "pH adjustment", "Pharmaceutical intermediate"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Soluble in water",
            boilingPoint: "89.5°C",
            density: "0.726 g/cm³",
            ph: "11.5"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Corrosive", "Strong fishy odor", "Causes severe burns"],
          price: "₹180/L",
          rating: 4.1,
          reviews: 67
        },
        {
          id: baseId + 40,
          name: "Diisopropylamine",
          category: "Industrial Products",
          subcategory: "Amines",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Pure diisopropylamine for pharmaceutical and chemical synthesis.",
          featured: false,
          chemicalFormula: "C₆H₁₅N",
          casNumber: "108-18-9",
          hsCode: "2921.19",
          purity: "99.5%",
          applications: ["Pharmaceutical synthesis", "Chemical intermediate", "Catalyst", "Base reagent"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Slightly soluble in water",
            boilingPoint: "84°C",
            density: "0.722 g/cm³",
            ph: "11.0"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Flammable", "Corrosive", "Strong ammonia-like odor"],
          price: "₹220/L",
          rating: 4.0,
          reviews: 48
        },
        {
          id: baseId + 41,
          name: "Pyridine",
          category: "Industrial Products",
          subcategory: "Heterocycles",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Anhydrous pyridine for pharmaceutical and chemical synthesis.",
          featured: false,
          chemicalFormula: "C₅H₅N",
          casNumber: "110-86-1",
          hsCode: "2933.31",
          purity: "99.8%",
          applications: ["Chemical synthesis", "Pharmaceutical intermediate", "Solvent", "Catalyst"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Miscible with water",
            boilingPoint: "115.2°C",
            density: "0.982 g/cm³",
            ph: "9.0"
          },
          packaging: ["1L bottles", "25L drums", "200L drums"],
          safetyInfo: ["Flammable", "Disagreeable odor", "Suspected carcinogen"],
          price: "₹380/L",
          rating: 4.2,
          reviews: 59
        },
        {
          id: baseId + 42,
          name: "Morpholine",
          category: "Industrial Products",
          subcategory: "Heterocycles",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "High purity morpholine for rubber and pharmaceutical applications.",
          featured: false,
          chemicalFormula: "C₄H₉NO",
          casNumber: "110-91-8",
          hsCode: "2934.99",
          purity: "99.0%",
          applications: ["Rubber accelerator", "Corrosion inhibitor", "Pharmaceutical intermediate", "Solvent"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Miscible with water",
            boilingPoint: "128.9°C",
            density: "1.007 g/cm³",
            ph: "11.5"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Corrosive", "Flammable", "Causes severe burns"],
          price: "₹280/L",
          rating: 4.1,
          reviews: 44
        },
        {
          id: baseId + 43,
          name: "Quinoline",
          category: "Industrial Products",
          subcategory: "Heterocycles",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Pure quinoline for pharmaceutical and dye intermediate applications.",
          featured: false,
          chemicalFormula: "C₉H₇N",
          casNumber: "91-22-5",
          hsCode: "2933.39",
          purity: "98.0%",
          applications: ["Pharmaceutical intermediate", "Dye intermediate", "Solvent", "Preservative"],
          specifications: {
            appearance: "Colorless to pale yellow liquid",
            solubility: "Slightly soluble in water",
            boilingPoint: "237.1°C",
            density: "1.093 g/cm³",
            ph: "9.5"
          },
          packaging: ["1L bottles", "25L drums", "200L drums"],
          safetyInfo: ["Harmful if inhaled", "May cause cancer", "Strong odor"],
          price: "₹450/L",
          rating: 3.9,
          reviews: 32
        },
        {
          id: baseId + 44,
          name: "Aniline",
          category: "Industrial Products",
          subcategory: "Aromatic Amines",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Technical grade aniline for dye and pharmaceutical production.",
          featured: false,
          chemicalFormula: "C₆H₇N",
          casNumber: "62-53-3",
          hsCode: "2921.41",
          purity: "99.5%",
          applications: ["Dye intermediate", "Pharmaceutical synthesis", "Rubber chemicals", "Polyurethane"],
          specifications: {
            appearance: "Colorless to pale yellow liquid",
            solubility: "Slightly soluble in water",
            boilingPoint: "184.1°C",
            density: "1.022 g/cm³",
            ph: "8.8"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Carcinogenic", "Toxic if absorbed through skin", "Restricted use"],
          price: "₹320/L",
          rating: 3.7,
          reviews: 28
        },
        {
          id: baseId + 45,
          name: "Nitrobenzene",
          category: "Industrial Products",
          subcategory: "Nitro Compounds",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Pure nitrobenzene for aniline production and chemical synthesis.",
          featured: false,
          chemicalFormula: "C₆H₅NO₂",
          casNumber: "98-95-3",
          hsCode: "2904.20",
          purity: "99.0%",
          applications: ["Aniline production", "Solvent", "Chemical intermediate", "Shoe polish"],
          specifications: {
            appearance: "Pale yellow liquid",
            solubility: "Slightly soluble in water",
            boilingPoint: "210.9°C",
            density: "1.204 g/cm³",
            ph: "N/A"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Toxic", "Suspected carcinogen", "Professional use only"],
          price: "₹280/L",
          rating: 3.6,
          reviews: 24
        },
        {
          id: baseId + 46,
          name: "Phenol",
          category: "Industrial Products",
          subcategory: "Phenols",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Technical grade phenol for resin and pharmaceutical production.",
          featured: false,
          chemicalFormula: "C₆H₆O",
          casNumber: "108-95-2",
          hsCode: "2907.11",
          purity: "99.0%",
          applications: ["Phenolic resins", "Pharmaceutical intermediate", "Disinfectant", "Chemical synthesis"],
          specifications: {
            appearance: "White crystalline solid",
            solubility: "Soluble in water",
            meltingPoint: "40.5°C",
            density: "1.071 g/cm³",
            ph: "5.5"
          },
          packaging: ["25kg bags", "200kg drums", "500kg containers"],
          safetyInfo: ["Corrosive", "Toxic", "Causes severe burns"],
          price: "₹150/kg",
          rating: 4.0,
          reviews: 65
        },
        {
          id: baseId + 47,
          name: "Cresol (Mixed Isomers)",
          category: "Industrial Products",
          subcategory: "Phenols",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Technical grade cresol for disinfectant and resin applications.",
          featured: false,
          chemicalFormula: "C₇H₈O",
          casNumber: "1319-77-3",
          hsCode: "2907.12",
          purity: "98.0%",
          applications: ["Disinfectant", "Phenolic resins", "Antioxidant", "Solvent"],
          specifications: {
            appearance: "Colorless to yellow liquid",
            solubility: "Slightly soluble in water",
            boilingPoint: "191-203°C",
            density: "1.03-1.05 g/cm³",
            ph: "5.0"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Corrosive", "Toxic", "Strong phenolic odor"],
          price: "₹180/L",
          rating: 3.9,
          reviews: 47
        },
        {
          id: baseId + 48,
          name: "Resorcinol",
          category: "Industrial Products",
          subcategory: "Phenols",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "High purity resorcinol for rubber and pharmaceutical applications.",
          featured: false,
          chemicalFormula: "C₆H₆O₂",
          casNumber: "108-46-3",
          hsCode: "2907.21",
          purity: "99.0%",
          applications: ["Rubber adhesion promoter", "Pharmaceutical intermediate", "Hair dye", "Wood adhesives"],
          specifications: {
            appearance: "White crystalline solid",
            solubility: "Very soluble in water",
            meltingPoint: "110°C",
            density: "1.272 g/cm³",
            ph: "5.5"
          },
          packaging: ["25kg bags", "200kg drums", "500kg containers"],
          safetyInfo: ["Harmful if swallowed", "May cause skin sensitization", "Avoid dust formation"],
          price: "₹380/kg",
          rating: 4.1,
          reviews: 53
        },
        {
          id: baseId + 49,
          name: "Hydroquinone",
          category: "Industrial Products",
          subcategory: "Phenols",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Photographic grade hydroquinone for developer and antioxidant use.",
          featured: false,
          chemicalFormula: "C₆H₆O₂",
          casNumber: "123-31-9",
          hsCode: "2907.22",
          purity: "99.5%",
          applications: ["Photographic developer", "Antioxidant", "Polymerization inhibitor", "Cosmetic ingredient"],
          specifications: {
            appearance: "White crystalline solid",
            solubility: "Soluble in water",
            meltingPoint: "173-174°C",
            density: "1.332 g/cm³",
            ph: "5.0"
          },
          packaging: ["25kg bags", "200kg drums", "500kg containers"],
          safetyInfo: ["Harmful if swallowed", "May cause genetic defects", "Avoid skin contact"],
          price: "₹420/kg",
          rating: 4.0,
          reviews: 39
        },
        {
          id: baseId + 50,
          name: "Catechol",
          category: "Industrial Products",
          subcategory: "Phenols",
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "High purity catechol for pharmaceutical and chemical synthesis.",
          featured: false,
          chemicalFormula: "C₆H₆O₂",
          casNumber: "120-80-9",
          hsCode: "2907.23",
          purity: "99.0%",
          applications: ["Pharmaceutical intermediate", "Antioxidant", "Polymerization inhibitor", "Photographic developer"],
          specifications: {
            appearance: "White crystalline solid",
            solubility: "Very soluble in water",
            meltingPoint: "105°C",
            density: "1.344 g/cm³",
            ph: "5.5"
          },
          packaging: ["25kg bags", "200kg drums", "500kg containers"],
          safetyInfo: ["Harmful if swallowed", "Causes skin irritation", "Store in dark place"],
          price: "₹480/kg",
          rating: 4.2,
          reviews: 31
        }
      ];
    } else if (category === "Personal Care") {
      // 20 Personal Care Products
      return [
        {
          id: baseId + 1,
          name: "Sodium Lauryl Sulfate (SLS)",
          category: "Personal Care",
          subcategory: "Surfactants",
          image: "https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "High foaming anionic surfactant for shampoos and cleansers.",
          featured: false,
          chemicalFormula: "C₁₂H₂₅SO₄Na",
          casNumber: "151-21-3",
          hsCode: "3402.11",
          purity: "95.0%",
          applications: ["Shampoo", "Body wash", "Toothpaste", "Facial cleanser"],
          specifications: {
            appearance: "White powder",
            solubility: "Soluble in water",
            ph: "9.5-10.5"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["May cause skin irritation", "Avoid eye contact", "Use in formulations only"],
          price: "₹120/kg",
          rating: 4.3,
          reviews: 89
        },
        {
          id: baseId + 2,
          name: "Glycerin (Glycerol)",
          category: "Personal Care",
          subcategory: "Humectants",
          image: "https://images.pexels.com/photos/4465421/pexels-photo-4465421.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "USP grade glycerin for moisturizing and humectant properties.",
          featured: false,
          chemicalFormula: "C₃H₈O₃",
          casNumber: "56-81-5",
          hsCode: "2905.45",
          purity: "99.5%",
          applications: ["Moisturizer", "Soap making", "Lotion", "Hair care"],
          specifications: {
            appearance: "Clear viscous liquid",
            solubility: "Miscible with water",
            ph: "5.5-7.5"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Generally recognized as safe", "Non-toxic", "Food grade available"],
          price: "₹85/L",
          rating: 4.7,
          reviews: 156
        },
        {
          id: baseId + 3,
          name: "Cetyl Alcohol",
          category: "Personal Care",
          subcategory: "Fatty Alcohols",
          image: "https://images.pexels.com/photos/4465832/pexels-photo-4465832.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Cosmetic grade cetyl alcohol for emulsification and conditioning.",
          featured: false,
          chemicalFormula: "C₁₆H₃₄O",
          casNumber: "36653-82-4",
          hsCode: "2905.17",
          purity: "95.0%",
          applications: ["Hair conditioner", "Cream emulsifier", "Lotion thickener", "Lip balm"],
          specifications: {
            appearance: "White waxy solid",
            solubility: "Insoluble in water",
            meltingPoint: "49-51°C"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Non-irritating", "Hypoallergenic", "Suitable for sensitive skin"],
          price: "₹180/kg",
          rating: 4.5,
          reviews: 78
        },
        {
          id: baseId + 4,
          name: "Stearyl Alcohol",
          category: "Personal Care",
          subcategory: "Fatty Alcohols",
          image: "https://images.pexels.com/photos/4465833/pexels-photo-4465833.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "High purity stearyl alcohol for cosmetic emulsification.",
          featured: false,
          chemicalFormula: "C₁₈H₃₈O",
          casNumber: "112-92-5",
          hsCode: "2905.17",
          purity: "95.0%",
          applications: ["Cream base", "Lotion emulsifier", "Hair conditioner", "Makeup products"],
          specifications: {
            appearance: "White waxy solid",
            solubility: "Insoluble in water",
            meltingPoint: "58-60°C"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Non-comedogenic", "Dermatologically tested", "Safe for all skin types"],
          price: "₹190/kg",
          rating: 4.4,
          reviews: 65
        },
        {
          id: baseId + 5,
          name: "Hyaluronic Acid",
          category: "Personal Care",
          subcategory: "Active Ingredients",
          image: "https://images.pexels.com/photos/4465834/pexels-photo-4465834.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "High molecular weight hyaluronic acid for anti-aging formulations.",
          featured: false,
          chemicalFormula: "(C₁₄H₂₁NO₁₁)ₙ",
          casNumber: "9067-32-7",
          hsCode: "3913.90",
          purity: "95.0%",
          applications: ["Anti-aging serum", "Moisturizer", "Eye cream", "Face mask"],
          specifications: {
            appearance: "White powder",
            solubility: "Soluble in water",
            ph: "6.0-7.5"
          },
          packaging: ["1kg containers", "5kg containers"],
          safetyInfo: ["Biocompatible", "Non-toxic", "Suitable for sensitive skin"],
          price: "₹2800/kg",
          rating: 4.8,
          reviews: 124
        },
        {
          id: baseId + 6,
          name: "Niacinamide (Vitamin B3)",
          category: "Personal Care",
          subcategory: "Active Ingredients",
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
          description: "Cosmetic grade niacinamide for skin brightening and pore reduction.",
          featured: false,
          chemicalFormula: "C₆H₆N₂O",
          casNumber: "98-92-0",
          hsCode: "2933.39",
          purity: "99.0%",
          applications: ["Brightening serum", "Pore minimizer", "Anti-acne treatment", "Anti-aging cream"],
          specifications: {
            appearance: "White crystalline powder",
            solubility: "Freely soluble in water",
            ph: "6.0-7.0"
          },
          packaging: ["1kg containers", "25kg drums"],
          safetyInfo: ["Well tolerated", "Suitable for all skin types", "Non-irritating"],
          price: "₹450/kg",
          rating: 4.6,
          reviews: 98
        },
        {
          id: baseId + 7,
          name: "Salicylic Acid",
          category: "Personal Care",
          subcategory: "Active Ingredients",
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
          description: "USP grade salicylic acid for acne treatment and exfoliation.",
          featured: false,
          chemicalFormula: "C₇H₆O₃",
          casNumber: "69-72-7",
          hsCode: "2918.21",
          purity: "99.5%",
          applications: ["Acne treatment", "Exfoliating toner", "Anti-dandruff shampoo", "Wart remover"],
          specifications: {
            appearance: "White crystalline powder",
            solubility: "Slightly soluble in water",
            meltingPoint: "158-160°C"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["May cause skin irritation", "Patch test recommended", "Avoid eye area"],
          price: "₹320/kg",
          rating: 4.4,
          reviews: 87
        },
        {
          id: baseId + 8,
          name: "Retinyl Palmitate (Vitamin A)",
          category: "Personal Care",
          subcategory: "Active Ingredients",
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
          description: "Stable vitamin A derivative for anti-aging formulations.",
          featured: false,
          chemicalFormula: "C₃₆H₆₀O₂",
          casNumber: "79-81-2",
          hsCode: "2936.21",
          purity: "95.0%",
          applications: ["Anti-aging cream", "Night serum", "Eye cream", "Skin repair treatment"],
          specifications: {
            appearance: "Yellow to orange powder",
            solubility: "Oil soluble",
            ph: "N/A"
          },
          packaging: ["1kg containers", "5kg containers"],
          safetyInfo: ["Light sensitive", "Store in cool place", "Use in night products"],
          price: "₹1200/kg",
          rating: 4.3,
          reviews: 76
        },
        {
          id: baseId + 9,
          name: "Kojic Acid",
          category: "Personal Care",
          subcategory: "Active Ingredients",
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
          description: "Natural kojic acid for skin lightening and brightening applications.",
          featured: false,
          chemicalFormula: "C₆H₆O₄",
          casNumber: "501-30-4",
          hsCode: "2932.99",
          purity: "99.0%",
          applications: ["Skin lightening cream", "Dark spot corrector", "Brightening serum", "Melasma treatment"],
          specifications: {
            appearance: "White to light yellow powder",
            solubility: "Soluble in water",
            ph: "3.5-4.5"
          },
          packaging: ["1kg containers", "25kg drums"],
          safetyInfo: ["May cause skin sensitization", "Patch test required", "Avoid sun exposure"],
          price: "₹850/kg",
          rating: 4.2,
          reviews: 64
        },
        {
          id: baseId + 10,
          name: "Arbutin",
          category: "Personal Care",
          subcategory: "Active Ingredients",
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
          description: "Natural arbutin for gentle skin brightening and pigmentation control.",
          featured: false,
          chemicalFormula: "C₁₂H₁₆O₇",
          casNumber: "497-76-7",
          hsCode: "2938.90",
          purity: "98.0%",
          applications: ["Brightening cream", "Pigmentation treatment", "Even skin tone", "Dark spot reducer"],
          specifications: {
            appearance: "White crystalline powder",
            solubility: "Soluble in water",
            ph: "5.0-7.0"
          },
          packaging: ["1kg containers", "25kg drums"],
          safetyInfo: ["Gentle on skin", "Suitable for sensitive skin", "Natural origin"],
          price: "₹1500/kg",
          rating: 4.5,
          reviews: 92
        },
        {
          id: baseId + 11,
          name: "Ceramide NP",
          category: "Personal Care",
          subcategory: "Active Ingredients",
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
          description: "Synthetic ceramide for skin barrier repair and moisturization.",
          featured: false,
          chemicalFormula: "C₄₂H₈₃NO₄",
          casNumber: "100403-19-8",
          hsCode: "3824.99",
          purity: "95.0%",
          applications: ["Barrier repair cream", "Moisturizer", "Anti-aging serum", "Sensitive skin care"],
          specifications: {
            appearance: "White to off-white powder",
            solubility: "Oil soluble",
            ph: "N/A"
          },
          packaging: ["100g containers", "1kg containers"],
          safetyInfo: ["Biocompatible", "Non-irritating", "Suitable for all skin types"],
          price: "₹3200/kg",
          rating: 4.7,
          reviews: 58
        },
        {
          id: baseId + 12,
          name: "Peptide Complex",
          category: "Personal Care",
          subcategory: "Active Ingredients",
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
          description: "Anti-aging peptide complex for wrinkle reduction and skin firming.",
          featured: false,
          chemicalFormula: "Various peptides",
          casNumber: "Multiple",
          hsCode: "3504.00",
          purity: "95.0%",
          applications: ["Anti-wrinkle cream", "Firming serum", "Eye cream", "Neck treatment"],
          specifications: {
            appearance: "White to light yellow powder",
            solubility: "Water soluble",
            ph: "5.0-7.0"
          },
          packaging: ["100g containers", "1kg containers"],
          safetyInfo: ["Clinically tested", "Hypoallergenic", "Dermatologist approved"],
          price: "₹4500/kg",
          rating: 4.6,
          reviews: 73
        },
        {
          id: baseId + 13,
          name: "Zinc Oxide (Nano)",
          category: "Personal Care",
          subcategory: "UV Filters",
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
          description: "Nano zinc oxide for broad-spectrum UV protection in sunscreens.",
          featured: false,
          chemicalFormula: "ZnO",
          casNumber: "1314-13-2",
          hsCode: "2817.00",
          purity: "99.0%",
          applications: ["Sunscreen", "BB cream", "Foundation", "Diaper rash cream"],
          specifications: {
            appearance: "White fine powder",
            solubility: "Insoluble in water",
            ph: "6.5-7.5"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Broad spectrum protection", "Non-comedogenic", "Suitable for sensitive skin"],
          price: "₹280/kg",
          rating: 4.4,
          reviews: 89
        },
        {
          id: baseId + 14,
          name: "Titanium Dioxide (Cosmetic Grade)",
          category: "Personal Care",
          subcategory: "UV Filters",
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
          description: "Cosmetic grade titanium dioxide for UV protection and opacity.",
          featured: false,
          chemicalFormula: "TiO₂",
          casNumber: "13463-67-7",
          hsCode: "3206.11",
          purity: "98.0%",
          applications: ["Sunscreen", "Foundation", "Powder makeup", "Toothpaste"],
          specifications: {
            appearance: "White fine powder",
            solubility: "Insoluble in water",
            ph: "6.5-8.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["FDA approved", "Non-toxic", "Photostable"],
          price: "₹180/kg",
          rating: 4.5,
          reviews: 112
        },
        {
          id: baseId + 15,
          name: "Panthenol (Pro-Vitamin B5)",
          category: "Personal Care",
          subcategory: "Conditioning Agents",
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
          description: "D-Panthenol for hair conditioning and skin moisturizing.",
          featured: false,
          chemicalFormula: "C₉H₁₉NO₄",
          casNumber: "81-13-0",
          hsCode: "2936.90",
          purity: "98.0%",
          applications: ["Hair conditioner", "Moisturizer", "Wound healing cream", "Baby care products"],
          specifications: {
            appearance: "Clear viscous liquid",
            solubility: "Miscible with water",
            ph: "9.0-10.5"
          },
          packaging: ["25L drums", "200L drums"],
          safetyInfo: ["Non-irritating", "Suitable for baby products", "Healing properties"],
          price: "₹650/L",
          rating: 4.6,
          reviews: 95
        },
        {
          id: baseId + 16,
          name: "Allantoin",
          category: "Personal Care",
          subcategory: "Conditioning Agents",
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
          description: "Natural allantoin for skin soothing and healing applications.",
          featured: false,
          chemicalFormula: "C₄H₆N₄O₃",
          casNumber: "97-59-6",
          hsCode: "2933.99",
          purity: "98.0%",
          applications: ["Soothing cream", "After-sun lotion", "Diaper rash cream", "Anti-irritant products"],
          specifications: {
            appearance: "White crystalline powder",
            solubility: "Slightly soluble in water",
            ph: "5.0-6.5"
          },
          packaging: ["1kg containers", "25kg drums"],
          safetyInfo: ["Non-toxic", "Anti-inflammatory", "Promotes healing"],
          price: "₹420/kg",
          rating: 4.4,
          reviews: 67
        },
        {
          id: baseId + 17,
          name: "Urea (Cosmetic Grade)",
          category: "Personal Care",
          subcategory: "Conditioning Agents",
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
          description: "Cosmetic grade urea for moisturizing and exfoliating properties.",
          featured: false,
          chemicalFormula: "CH₄N₂O",
          casNumber: "57-13-6",
          hsCode: "3102.10",
          purity: "99.0%",
          applications: ["Foot cream", "Hand cream", "Exfoliating lotion", "Dry skin treatment"],
          specifications: {
            appearance: "White crystalline powder",
            solubility: "Freely soluble in water",
            ph: "7.0-9.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Natural moisturizer", "Keratolytic properties", "Safe for topical use"],
          price: "₹85/kg",
          rating: 4.3,
          reviews: 78
        },
        {
          id: baseId + 18,
          name: "Sodium Cocoyl Isethionate",
          category: "Personal Care",
          subcategory: "Mild Surfactants",
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
          description: "Mild anionic surfactant derived from coconut oil for gentle cleansing.",
          featured: false,
          chemicalFormula: "C₁₄H₂₇NO₄S·Na",
          casNumber: "61789-32-0",
          hsCode: "3402.13",
          purity: "84.0%",
          applications: ["Baby shampoo", "Facial cleanser", "Sensitive skin wash", "Syndet bars"],
          specifications: {
            appearance: "White powder",
            solubility: "Soluble in water",
            ph: "4.5-6.5"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Very mild", "Non-irritating", "Suitable for sensitive skin"],
          price: "₹280/kg",
          rating: 4.7,
          reviews: 103
        },
        {
          id: baseId + 19,
          name: "Cocamidopropyl Betaine",
          category: "Personal Care",
          subcategory: "Mild Surfactants",
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
          description: "Amphoteric surfactant for foam boosting and conditioning.",
          featured: false,
          chemicalFormula: "C₁₉H₃₈N₂O₃",
          casNumber: "61789-40-0",
          hsCode: "3402.13",
          purity: "30.0%",
          applications: ["Shampoo", "Body wash", "Facial cleanser", "Baby products"],
          specifications: {
            appearance: "Clear to pale yellow liquid",
            solubility: "Soluble in water",
            ph: "4.0-6.0"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Mild to skin", "Good conditioning properties", "Compatible with other surfactants"],
          price: "₹160/L",
          rating: 4.5,
          reviews: 89
        },
        {
          id: baseId + 20,
          name: "Polyethylene Glycol 400 (PEG-400)",
          category: "Personal Care",
          subcategory: "Solvents",
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
          description: "Low molecular weight PEG for solubilizing and humectant properties.",
          featured: false,
          chemicalFormula: "(C₂H₄O)ₙH₂O",
          casNumber: "25322-68-3",
          hsCode: "3907.20",
          purity: "99.0%",
          applications: ["Solubilizer", "Humectant", "Plasticizer", "Carrier solvent"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Miscible with water",
            ph: "4.5-7.5"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Non-toxic", "Non-irritating", "FDA approved"],
          price: "₹120/L",
          rating: 4.4,
          reviews: 76
        }
      ];
    } else if (category === "Food & Beverage") {
      // 20 Food & Beverage Products
      return [
        {
          id: baseId + 1,
          name: "Citric Acid Monohydrate",
          category: "Food & Beverage",
          subcategory: "Acidulants",
          image: "https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Food grade citric acid for preservation and flavor enhancement.",
          featured: false,
          chemicalFormula: "C₆H₈O₇·H₂O",
          casNumber: "5949-29-1",
          hsCode: "2918.14",
          purity: "99.5%",
          applications: ["Food preservative", "Flavor enhancer", "pH adjuster", "Antioxidant"],
          specifications: {
            appearance: "White crystalline powder",
            solubility: "Freely soluble in water",
            ph: "1.8-2.1"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Food grade certified", "GRAS status", "Natural preservative"],
          price: "₹65/kg",
          rating: 4.6,
          reviews: 134
        },
        {
          id: baseId + 2,
          name: "Acetic Acid (Food Grade)",
          category: "Food & Beverage",
          subcategory: "Acidulants",
          image: "https://images.pexels.com/photos/4110252/pexels-photo-4110252.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Food grade acetic acid for vinegar production and preservation.",
          featured: false,
          chemicalFormula: "C₂H₄O₂",
          casNumber: "64-19-7",
          hsCode: "2915.21",
          purity: "99.8%",
          applications: ["Vinegar production", "Food preservation", "Pickling", "pH control"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Miscible with water",
            ph: "2.4"
          },
          packaging: ["25L drums", "200L drums", "IBC tanks"],
          safetyInfo: ["Food grade quality", "Handle with care", "Corrosive in concentrated form"],
          price: "₹45/L",
          rating: 4.4,
          reviews: 98
        },
        {
          id: baseId + 3,
          name: "Potassium Sorbate",
          category: "Food & Beverage",
          subcategory: "Preservatives",
          image: "https://images.pexels.com/photos/4110253/pexels-photo-4110253.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Natural preservative for extending shelf life of food products.",
          featured: false,
          chemicalFormula: "C₆H₇KO₂",
          casNumber: "24634-61-5",
          hsCode: "2916.19",
          purity: "99.0%",
          applications: ["Food preservative", "Wine preservation", "Bakery products", "Dairy products"],
          specifications: {
            appearance: "White crystalline powder",
            solubility: "Soluble in water",
            ph: "7.0-8.5"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Natural preservative", "GRAS status", "Safe for consumption"],
          price: "₹180/kg",
          rating: 4.5,
          reviews: 87
        },
        {
          id: baseId + 4,
          name: "Sodium Benzoate",
          category: "Food & Beverage",
          subcategory: "Preservatives",
          image: "https://images.pexels.com/photos/4110254/pexels-photo-4110254.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Effective antimicrobial preservative for beverages and foods.",
          featured: false,
          chemicalFormula: "C₇H₅NaO₂",
          casNumber: "532-32-1",
          hsCode: "2916.31",
          purity: "99.0%",
          applications: ["Beverage preservation", "Sauce preservation", "Jam and jelly", "Salad dressing"],
          specifications: {
            appearance: "White crystalline powder",
            solubility: "Soluble in water",
            ph: "8.0-8.5"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["FDA approved", "Effective against yeast and bacteria", "Low toxicity"],
          price: "₹120/kg",
          rating: 4.3,
          reviews: 76
        },
        {
          id: baseId + 5,
          name: "Xanthan Gum",
          category: "Food & Beverage",
          subcategory: "Thickeners",
          image: "https://images.pexels.com/photos/4110255/pexels-photo-4110255.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Natural thickening and stabilizing agent for food applications.",
          featured: false,
          chemicalFormula: "C₃₅H₄₉O₂₉",
          casNumber: "11138-66-2",
          hsCode: "3913.90",
          purity: "99.0%",
          applications: ["Sauce thickener", "Gluten-free baking", "Salad dressing", "Ice cream stabilizer"],
          specifications: {
            appearance: "Cream to white powder",
            solubility: "Dispersible in water",
            ph: "6.0-8.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Natural origin", "Gluten-free", "Suitable for vegans"],
          price: "₹450/kg",
          rating: 4.7,
          reviews: 112
        },
        {
          id: baseId + 6,
          name: "Carrageenan",
          category: "Food & Beverage",
          subcategory: "Thickeners",
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Seaweed-derived gelling and thickening agent for dairy products.",
          featured: false,
          chemicalFormula: "Variable",
          casNumber: "9000-07-1",
          hsCode: "1302.31",
          purity: "95.0%",
          applications: ["Dairy products", "Meat products", "Dessert gels", "Plant-based milk"],
          specifications: {
            appearance: "Light tan powder",
            solubility: "Soluble in hot water",
            ph: "8.0-11.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Natural seaweed extract", "Vegetarian", "No allergens"],
          price: "₹380/kg",
          rating: 4.4,
          reviews: 89
        },
        {
          id: baseId + 7,
          name: "Stevia Extract",
          category: "Food & Beverage",
          subcategory: "Sweeteners",
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Natural zero-calorie sweetener extracted from stevia leaves.",
          featured: false,
          chemicalFormula: "C₃₈H₆₀O₁₈",
          casNumber: "57817-89-7",
          hsCode: "2938.90",
          purity: "95.0%",
          applications: ["Sugar substitute", "Diet beverages", "Low-calorie foods", "Diabetic products"],
          specifications: {
            appearance: "White to off-white powder",
            solubility: "Soluble in water",
            ph: "4.5-7.0"
          },
          packaging: ["1kg containers", "25kg drums"],
          safetyInfo: ["Natural sweetener", "Zero calories", "Diabetic friendly"],
          price: "₹1200/kg",
          rating: 4.6,
          reviews: 156
        },
        {
          id: baseId + 8,
          name: "Pectin",
          category: "Food & Beverage",
          subcategory: "Gelling Agents",
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Natural gelling agent for jams, jellies, and confectionery.",
          featured: false,
          chemicalFormula: "Variable",
          casNumber: "9000-69-5",
          hsCode: "1302.20",
          purity: "95.0%",
          applications: ["Jam and jelly", "Fruit gummies", "Yogurt", "Bakery fillings"],
          specifications: {
            appearance: "Light cream powder",
            solubility: "Soluble in hot water",
            ph: "2.8-3.2"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Natural fruit extract", "High fiber content", "Cholesterol lowering"],
          price: "₹320/kg",
          rating: 4.5,
          reviews: 94
        },
        {
          id: baseId + 9,
          name: "Erythritol",
          category: "Food & Beverage",
          subcategory: "Sweeteners",
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Natural sugar alcohol with zero calories and tooth-friendly properties.",
          featured: false,
          chemicalFormula: "C₄H₁₀O₄",
          casNumber: "149-32-6",
          hsCode: "2905.49",
          purity: "99.5%",
          applications: ["Sugar substitute", "Diabetic foods", "Sugar-free gum", "Low-calorie desserts"],
          specifications: {
            appearance: "White crystalline powder",
            solubility: "Soluble in water",
            ph: "5.0-7.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Zero calories", "Tooth friendly", "Digestive tolerance"],
          price: "₹280/kg",
          rating: 4.4,
          reviews: 78
        },
        {
          id: baseId + 10,
          name: "Monk Fruit Extract",
          category: "Food & Beverage",
          subcategory: "Sweeteners",
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Ultra-sweet natural extract from monk fruit with zero calories.",
          featured: false,
          chemicalFormula: "C₆₀H₁₀₂O₂₉",
          casNumber: "88901-36-4",
          hsCode: "1302.19",
          purity: "50.0%",
          applications: ["Natural sweetener", "Beverage sweetening", "Baking substitute", "Health foods"],
          specifications: {
            appearance: "Light brown powder",
            solubility: "Soluble in water",
            ph: "5.0-7.0"
          },
          packaging: ["1kg containers", "25kg drums"],
          safetyInfo: ["Natural fruit extract", "Zero calories", "Antioxidant properties"],
          price: "₹2800/kg",
          rating: 4.7,
          reviews: 67
        },
        {
          id: baseId + 11,
          name: "Inulin",
          category: "Food & Beverage",
          subcategory: "Fiber",
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Prebiotic fiber for functional food and dietary supplement applications.",
          featured: false,
          chemicalFormula: "(C₆H₁₀O₅)ₙ",
          casNumber: "9005-80-5",
          hsCode: "1108.19",
          purity: "90.0%",
          applications: ["Functional foods", "Dietary supplements", "Fat replacer", "Prebiotic products"],
          specifications: {
            appearance: "White to cream powder",
            solubility: "Soluble in hot water",
            ph: "5.0-7.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Prebiotic fiber", "Digestive health", "Low glycemic index"],
          price: "₹220/kg",
          rating: 4.5,
          reviews: 89
        },
        {
          id: baseId + 12,
          name: "Spirulina Powder",
          category: "Food & Beverage",
          subcategory: "Nutritional",
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Nutrient-rich blue-green algae powder for health foods and supplements.",
          featured: false,
          chemicalFormula: "Variable",
          casNumber: "724424-92-4",
          hsCode: "2102.10",
          purity: "95.0%",
          applications: ["Health supplements", "Protein powder", "Smoothie mix", "Natural coloring"],
          specifications: {
            appearance: "Dark green powder",
            solubility: "Dispersible in water",
            ph: "9.0-11.0"
          },
          packaging: ["1kg containers", "25kg drums"],
          safetyInfo: ["High protein content", "Rich in vitamins", "Natural superfood"],
          price: "₹850/kg",
          rating: 4.6,
          reviews: 123
        },
        {
          id: baseId + 13,
          name: "Vitamin C (Ascorbic Acid)",
          category: "Food & Beverage",
          subcategory: "Vitamins",
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Essential vitamin C for food fortification and antioxidant properties.",
          featured: false,
          chemicalFormula: "C₆H₈O₆",
          casNumber: "50-81-7",
          hsCode: "2936.27",
          purity: "99.0%",
          applications: ["Food fortification", "Antioxidant", "Beverage additive", "Nutritional supplements"],
          specifications: {
            appearance: "White crystalline powder",
            solubility: "Freely soluble in water",
            ph: "2.1-2.6"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Essential nutrient", "Antioxidant properties", "Immune support"],
          price: "₹180/kg",
          rating: 4.7,
          reviews: 145
        },
        {
          id: baseId + 14,
          name: "Vitamin E (Tocopherol)",
          category: "Food & Beverage",
          subcategory: "Vitamins",
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Natural vitamin E for antioxidant protection in food products.",
          featured: false,
          chemicalFormula: "C₂₉H₅₀O₂",
          casNumber: "59-02-9",
          hsCode: "2936.28",
          purity: "95.0%",
          applications: ["Antioxidant", "Food fortification", "Oil stabilizer", "Nutritional supplements"],
          specifications: {
            appearance: "Viscous oil",
            solubility: "Oil soluble",
            ph: "N/A"
          },
          packaging: ["1L bottles", "25L drums"],
          safetyInfo: ["Natural antioxidant", "Fat-soluble vitamin", "Protects against rancidity"],
          price: "₹1200/L",
          rating: 4.5,
          reviews: 87
        },
        {
          id: baseId + 15,
          name: "Beta-Carotene",
          category: "Food & Beverage",
          subcategory: "Colorants",
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Natural orange colorant and vitamin A precursor for food coloring.",
          featured: false,
          chemicalFormula: "C₄₀H₅₆",
          casNumber: "7235-40-7",
          hsCode: "3204.17",
          purity: "96.0%",
          applications: ["Food coloring", "Nutritional fortification", "Beverage coloring", "Margarine coloring"],
          specifications: {
            appearance: "Dark red crystalline powder",
            solubility: "Oil soluble",
            ph: "N/A"
          },
          packaging: ["1kg containers", "25kg drums"],
          safetyInfo: ["Natural colorant", "Vitamin A precursor", "Antioxidant properties"],
          price: "₹2200/kg",
          rating: 4.4,
          reviews: 76
        },
        {
          id: baseId + 16,
          name: "Annatto Extract",
          category: "Food & Beverage",
          subcategory: "Colorants",
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Natural yellow-orange colorant extracted from annatto seeds.",
          featured: false,
          chemicalFormula: "C₂₅H₃₀O₄",
          casNumber: "1393-63-1",
          hsCode: "3203.00",
          purity: "95.0%",
          applications: ["Cheese coloring", "Butter coloring", "Margarine", "Snack food coloring"],
          specifications: {
            appearance: "Dark red liquid/powder",
            solubility: "Oil/water soluble variants",
            ph: "5.0-7.0"
          },
          packaging: ["1kg containers", "25kg drums"],
          safetyInfo: ["Natural plant extract", "No synthetic additives", "Traditional colorant"],
          price: "₹380/kg",
          rating: 4.3,
          reviews: 65
        },
        {
          id: baseId + 17,
          name: "Calcium Propionate",
          category: "Food & Beverage",
          subcategory: "Preservatives",
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Mold inhibitor for bakery products and processed foods.",
          featured: false,
          chemicalFormula: "C₆H₁₀CaO₄",
          casNumber: "4075-81-4",
          hsCode: "2915.50",
          purity: "99.0%",
          applications: ["Bread preservative", "Bakery products", "Processed cheese", "Animal feed"],
          specifications: {
            appearance: "White crystalline powder",
            solubility: "Soluble in water",
            ph: "8.0-10.5"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["GRAS status", "Effective against mold", "Safe for consumption"],
          price: "₹95/kg",
          rating: 4.2,
          reviews: 58
        },
        {
          id: baseId + 18,
          name: "Sodium Alginate",
          category: "Food & Beverage",
          subcategory: "Thickeners",
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Seaweed-derived thickener for molecular gastronomy and food texturing.",
          featured: false,
          chemicalFormula: "(C₆H₇NaO₆)ₙ",
          casNumber: "9005-38-3",
          hsCode: "3913.10",
          purity: "95.0%",
          applications: ["Molecular gastronomy", "Ice cream stabilizer", "Sauce thickener", "Edible films"],
          specifications: {
            appearance: "Light tan powder",
            solubility: "Soluble in water",
            ph: "6.0-8.0"
          },
          packaging: ["1kg containers", "25kg bags"],
          safetyInfo: ["Natural seaweed extract", "Dietary fiber", "Vegetarian"],
          price: "₹420/kg",
          rating: 4.5,
          reviews: 72
        },
        {
          id: baseId + 19,
          name: "Lecithin (Soy)",
          category: "Food & Beverage",
          subcategory: "Emulsifiers",
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Natural emulsifier from soybeans for chocolate and baked goods.",
          featured: false,
          chemicalFormula: "Variable",
          casNumber: "8002-43-5",
          hsCode: "2923.20",
          purity: "95.0%",
          applications: ["Chocolate production", "Baking emulsifier", "Margarine", "Instant products"],
          specifications: {
            appearance: "Light brown viscous liquid",
            solubility: "Oil soluble",
            ph: "N/A"
          },
          packaging: ["25L drums", "200L drums"],
          safetyInfo: ["Natural emulsifier", "Non-GMO available", "Nutritional benefits"],
          price: "₹180/L",
          rating: 4.4,
          reviews: 89
        },
        {
          id: baseId + 20,
          name: "Mono- and Diglycerides",
          category: "Food & Beverage",
          subcategory: "Emulsifiers",
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Versatile emulsifier for bakery, dairy, and confectionery applications.",
          featured: false,
          chemicalFormula: "Variable",
          casNumber: "123-94-4",
          hsCode: "3823.70",
          purity: "90.0%",
          applications: ["Bakery emulsifier", "Ice cream", "Margarine", "Whipped toppings"],
          specifications: {
            appearance: "Cream to white flakes",
            solubility: "Oil dispersible",
            ph: "N/A"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["GRAS status", "Widely used emulsifier", "Improves texture"],
          price: "₹150/kg",
          rating: 4.3,
          reviews: 67
        }
      ];
    } else if (category === "Paint & Coatings") {
      // 20 Paint & Coatings Products
      return [
        {
          id: baseId + 1,
          name: "Titanium Dioxide (Rutile)",
          category: "Paint & Coatings",
          subcategory: "White Pigments",
          image: "https://images.pexels.com/photos/1153895/pexels-photo-1153895.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "High-grade rutile titanium dioxide for superior opacity and brightness.",
          featured: false,
          chemicalFormula: "TiO₂",
          casNumber: "13463-67-7",
          hsCode: "3206.11",
          purity: "94.0%",
          applications: ["Architectural paints", "Industrial coatings", "Automotive paints", "Powder coatings"],
          specifications: {
            appearance: "White fine powder",
            solubility: "Insoluble in water",
            ph: "6.5-8.0"
          },
          packaging: ["25kg bags", "500kg big bags", "1000kg containers"],
          safetyInfo: ["Non-toxic", "Photostable", "Excellent hiding power"],
          price: "₹180/kg",
          rating: 4.6,
          reviews: 145
        },
        {
          id: baseId + 2,
          name: "Iron Oxide Red",
          category: "Paint & Coatings",
          subcategory: "Inorganic Pigments",
          image: "https://images.pexels.com/photos/1153896/pexels-photo-1153896.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Natural iron oxide red pigment for durable color in coatings.",
          featured: false,
          chemicalFormula: "Fe₂O₃",
          casNumber: "1309-37-1",
          hsCode: "2821.10",
          purity: "95.0%",
          applications: ["Primer coatings", "Rust-preventive paints", "Concrete coloring", "Ceramic glazes"],
          specifications: {
            appearance: "Red powder",
            solubility: "Insoluble in water",
            ph: "6.0-8.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Non-toxic", "UV stable", "Chemical resistant"],
          price: "₹85/kg",
          rating: 4.4,
          reviews: 98
        },
        {
          id: baseId + 3,
          name: "Carbon Black",
          category: "Paint & Coatings",
          subcategory: "Black Pigments",
          image: "https://images.pexels.com/photos/1153897/pexels-photo-1153897.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "High-quality carbon black for deep black color and UV protection.",
          featured: false,
          chemicalFormula: "C",
          casNumber: "1333-86-4",
          hsCode: "2803.00",
          purity: "99.0%",
          applications: ["Black paints", "Automotive coatings", "Printing inks", "Plastic coloring"],
          specifications: {
            appearance: "Fine black powder",
            solubility: "Insoluble in water",
            ph: "7.0-9.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Avoid dust inhalation", "Use protective equipment", "Good dispersion required"],
          price: "₹120/kg",
          rating: 4.3,
          reviews: 87
        },
        {
          id: baseId + 4,
          name: "Ultramarine Blue",
          category: "Paint & Coatings",
          subcategory: "Inorganic Pigments",
          image: "https://images.pexels.com/photos/1153898/pexels-photo-1153898.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Brilliant blue pigment with excellent lightfastness and chemical resistance.",
          featured: false,
          chemicalFormula: "Na₆Al₆Si₆O₂₄S₂",
          casNumber: "57455-37-5",
          hsCode: "3206.42",
          purity: "98.0%",
          applications: ["Decorative paints", "Plastic coloring", "Cosmetic applications", "Detergent bluing"],
          specifications: {
            appearance: "Blue powder",
            solubility: "Insoluble in water",
            ph: "8.0-10.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Non-toxic", "Heat stable", "Acid sensitive"],
          price: "₹150/kg",
          rating: 4.5,
          reviews: 76
        },
        {
          id: baseId + 5,
          name: "Chromium Oxide Green",
          category: "Paint & Coatings",
          subcategory: "Inorganic Pigments",
          image: "https://images.pexels.com/photos/1153899/pexels-photo-1153899.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Durable green pigment with excellent weather and chemical resistance.",
          featured: false,
          chemicalFormula: "Cr₂O₃",
          casNumber: "1308-38-9",
          hsCode: "2819.90",
          purity: "97.0%",
          applications: ["Exterior paints", "Camouflage coatings", "Ceramic glazes", "Refractory applications"],
          specifications: {
            appearance: "Green powder",
            solubility: "Insoluble in water",
            ph: "7.0-9.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Non-toxic", "Extremely stable", "High temperature resistant"],
          price: "₹280/kg",
          rating: 4.4,
          reviews: 65
        },
        {
          id: baseId + 6,
          name: "Zinc Phosphate",
          category: "Paint & Coatings",
          subcategory: "Anti-corrosive Pigments",
          image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
          description: "Eco-friendly anti-corrosive pigment for primer formulations.",
          featured: false,
          chemicalFormula: "Zn₃(PO₄)₂",
          casNumber: "7779-90-0",
          hsCode: "2835.26",
          purity: "98.0%",
          applications: ["Anti-corrosive primers", "Metal protection", "Marine coatings", "Industrial primers"],
          specifications: {
            appearance: "White powder",
            solubility: "Insoluble in water",
            ph: "6.0-8.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Environmentally friendly", "Non-toxic", "Excellent corrosion protection"],
          price: "₹220/kg",
          rating: 4.6,
          reviews: 89
        },
        {
          id: baseId + 7,
          name: "Mica Powder",
          category: "Paint & Coatings",
          subcategory: "Effect Pigments",
          image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
          description: "Natural mica for metallic and pearlescent effects in coatings.",
          featured: false,
          chemicalFormula: "KAl₂(AlSi₃O₁₀)(OH)₂",
          casNumber: "12001-26-2",
          hsCode: "2525.10",
          purity: "95.0%",
          applications: ["Metallic paints", "Automotive coatings", "Decorative finishes", "Powder coatings"],
          specifications: {
            appearance: "Silvery flakes",
            solubility: "Insoluble in water",
            ph: "7.0-9.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Natural mineral", "Non-toxic", "Good electrical insulation"],
          price: "₹95/kg",
          rating: 4.3,
          reviews: 72
        },
        {
          id: baseId + 8,
          name: "Aluminum Paste",
          category: "Paint & Coatings",
          subcategory: "Metallic Pigments",
          image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
          description: "Leafing aluminum paste for high-gloss metallic finishes.",
          featured: false,
          chemicalFormula: "Al",
          casNumber: "7429-90-5",
          hsCode: "3206.50",
          purity: "65.0%",
          applications: ["Metallic paints", "Roof coatings", "Automotive finishes", "Industrial coatings"],
          specifications: {
            appearance: "Silver paste",
            solubility: "Insoluble in water",
            ph: "N/A"
          },
          packaging: ["25kg drums", "200kg drums"],
          safetyInfo: ["Flammable when dry", "Keep away from water", "Use in ventilated area"],
          price: "₹320/kg",
          rating: 4.2,
          reviews: 58
        },
        {
          id: baseId + 9,
          name: "Zinc Dust",
          category: "Paint & Coatings",
          subcategory: "Metallic Pigments",
          image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
          description: "High-purity zinc dust for galvanizing and anti-corrosive coatings.",
          featured: false,
          chemicalFormula: "Zn",
          casNumber: "7440-66-6",
          hsCode: "7903.10",
          purity: "99.0%",
          applications: ["Zinc-rich primers", "Galvanizing compounds", "Anti-corrosive coatings", "Cathodic protection"],
          specifications: {
            appearance: "Gray metallic powder",
            solubility: "Insoluble in water",
            ph: "N/A"
          },
          packaging: ["25kg drums", "200kg drums"],
          safetyInfo: ["Flammable", "Avoid moisture", "Use protective equipment"],
          price: "₹180/kg",
          rating: 4.4,
          reviews: 67
        },
        {
          id: baseId + 10,
          name: "Barium Sulfate (Precipitated)",
          category: "Paint & Coatings",
          subcategory: "Extenders",
          image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
          description: "High-grade precipitated barium sulfate for improved paint properties.",
          featured: false,
          chemicalFormula: "BaSO₄",
          casNumber: "7727-43-7",
          hsCode: "2833.27",
          purity: "98.0%",
          applications: ["High-gloss paints", "Automotive coatings", "Powder coatings", "X-ray contrast paints"],
          specifications: {
            appearance: "White fine powder",
            solubility: "Insoluble in water",
            ph: "6.5-8.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Non-toxic", "Chemically inert", "High specific gravity"],
          price: "₹65/kg",
          rating: 4.3,
          reviews: 84
        },
        {
          id: baseId + 11,
          name: "Calcium Carbonate (Coated)",
          category: "Paint & Coatings",
          subcategory: "Extenders",
          image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
          description: "Surface-treated calcium carbonate for improved paint performance.",
          featured: false,
          chemicalFormula: "CaCO₃",
          casNumber: "471-34-1",
          hsCode: "2836.50",
          purity: "98.5%",
          applications: ["Interior paints", "Exterior coatings", "Primer formulations", "Texture paints"],
          specifications: {
            appearance: "White powder",
            solubility: "Insoluble in water",
            ph: "8.5-9.5"
          },
          packaging: ["25kg bags", "500kg big bags", "1000kg big bags"],
          safetyInfo: ["Non-toxic", "Food grade available", "Environmentally safe"],
          price: "₹25/kg",
          rating: 4.5,
          reviews: 156
        },
        {
          id: baseId + 12,
          name: "Talc (Micronized)",
          category: "Paint & Coatings",
          subcategory: "Extenders",
          image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
          description: "Ultra-fine talc for improved paint flow and anti-settling properties.",
          featured: false,
          chemicalFormula: "Mg₃Si₄O₁₀(OH)₂",
          casNumber: "14807-96-6",
          hsCode: "2526.20",
          purity: "95.0%",
          applications: ["Flat paints", "Primer coatings", "Texture paints", "Anti-settling agent"],
          specifications: {
            appearance: "White to off-white powder",
            solubility: "Insoluble in water",
            ph: "8.0-10.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Asbestos-free", "Non-toxic", "Good slip properties"],
          price: "₹45/kg",
          rating: 4.2,
          reviews: 73
        },
        {
          id: baseId + 13,
          name: "Silica (Fumed)",
          category: "Paint & Coatings",
          subcategory: "Rheology Modifiers",
          image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
          description: "Fumed silica for thixotropic properties and anti-sagging effects.",
          featured: false,
          chemicalFormula: "SiO₂",
          casNumber: "112945-52-5",
          hsCode: "2811.22",
          purity: "99.8%",
          applications: ["Thixotropic agent", "Anti-sagging additive", "Matting agent", "Reinforcing filler"],
          specifications: {
            appearance: "White fluffy powder",
            solubility: "Insoluble in water",
            ph: "3.6-4.3"
          },
          packaging: ["10kg bags", "200kg drums"],
          safetyInfo: ["Avoid dust inhalation", "Use respiratory protection", "Very fine particles"],
          price: "₹380/kg",
          rating: 4.4,
          reviews: 62
        },
        {
          id: baseId + 14,
          name: "Bentonite Clay",
          category: "Paint & Coatings",
          subcategory: "Rheology Modifiers",
          image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
          description: "Organically modified bentonite for paint thickening and suspension.",
          featured: false,
          chemicalFormula: "Al₂H₂Na₂O₁₃Si₄",
          casNumber: "1302-78-9",
          hsCode: "3824.90",
          purity: "95.0%",
          applications: ["Paint thickener", "Anti-settling agent", "Suspension aid", "Rheology modifier"],
          specifications: {
            appearance: "Light tan powder",
            solubility: "Swells in water",
            ph: "8.0-10.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Natural clay", "Non-toxic", "Environmentally friendly"],
          price: "₹85/kg",
          rating: 4.1,
          reviews: 54
        },
        {
          id: baseId + 15,
          name: "Wax Emulsion",
          category: "Paint & Coatings",
          subcategory: "Additives",
          image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
          description: "Polyethylene wax emulsion for improved surface properties.",
          featured: false,
          chemicalFormula: "(C₂H₄)ₙ",
          casNumber: "9002-88-4",
          hsCode: "3404.90",
          purity: "40.0%",
          applications: ["Matting agent", "Slip additive", "Scratch resistance", "Surface modifier"],
          specifications: {
            appearance: "White emulsion",
            solubility: "Dispersible in water",
            ph: "8.0-9.5"
          },
          packaging: ["25L drums", "200L drums"],
          safetyInfo: ["Non-toxic", "Stable emulsion", "Improves durability"],
          price: "₹120/L",
          rating: 4.3,
          reviews: 68
        },
        {
          id: baseId + 16,
          name: "Defoamer",
          category: "Paint & Coatings",
          subcategory: "Additives",
          image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
          description: "Silicone-based defoamer for foam control in paint formulations.",
          featured: false,
          chemicalFormula: "Silicone polymer",
          casNumber: "Various",
          hsCode: "3824.90",
          purity: "100.0%",
          applications: ["Foam control", "Air release", "Surface defect prevention", "Application aid"],
          specifications: {
            appearance: "Clear to hazy liquid",
            solubility: "Insoluble in water",
            ph: "N/A"
          },
          packaging: ["1L bottles", "25L drums", "200L drums"],
          safetyInfo: ["Low toxicity", "Effective at low concentrations", "Compatible with most systems"],
          price: "₹450/L",
          rating: 4.5,
          reviews: 89
        },
        {
          id: baseId + 17,
          name: "Dispersing Agent",
          category: "Paint & Coatings",
          subcategory: "Additives",
          image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
          description: "Polymeric dispersant for improved pigment dispersion and stability.",
          featured: false,
          chemicalFormula: "Polymeric",
          casNumber: "Various",
          hsCode: "3824.90",
          purity: "40.0%",
          applications: ["Pigment dispersion", "Color development", "Viscosity reduction", "Stability improvement"],
          specifications: {
            appearance: "Amber liquid",
            solubility: "Miscible with water",
            ph: "7.0-9.0"
          },
          packaging: ["25L drums", "200L drums"],
          safetyInfo: ["Low toxicity", "Improves color strength", "Reduces grinding time"],
          price: "₹280/L",
          rating: 4.4,
          reviews: 76
        },
        {
          id: baseId + 18,
          name: "UV Absorber",
          category: "Paint & Coatings",
          subcategory: "Additives",
          image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
          description: "Benzotriazole UV absorber for exterior coating protection.",
          featured: false,
          chemicalFormula: "C₂₀H₂₅N₃O₂",
          casNumber: "3147-75-9",
          hsCode: "2933.99",
          purity: "99.0%",
          applications: ["UV protection", "Color retention", "Gloss retention", "Weathering resistance"],
          specifications: {
            appearance: "Light yellow powder",
            solubility: "Soluble in organic solvents",
            ph: "N/A"
          },
          packaging: ["25kg bags", "500kg drums"],
          safetyInfo: ["Effective UV protection", "Thermal stability", "Low volatility"],
          price: "₹850/kg",
          rating: 4.6,
          reviews: 54
        },
        {
          id: baseId + 19,
          name: "Hindered Amine Light Stabilizer (HALS)",
          category: "Paint & Coatings",
          subcategory: "Additives",
          image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
          description: "Advanced light stabilizer for long-term coating durability.",
          featured: false,
          chemicalFormula: "C₂₂H₄₄N₂O₄",
          casNumber: "65447-77-0",
          hsCode: "2933.99",
          purity: "95.0%",
          applications: ["Light stabilization", "Polymer protection", "Color retention", "Durability enhancement"],
          specifications: {
            appearance: "White to light yellow powder",
            solubility: "Soluble in organic solvents",
            ph: "N/A"
          },
          packaging: ["25kg bags", "200kg drums"],
          safetyInfo: ["Highly effective", "Low migration", "Excellent compatibility"],
          price: "₹1200/kg",
          rating: 4.7,
          reviews: 43
        },
        {
          id: baseId + 20,
          name: "Biocide",
          category: "Paint & Coatings",
          subcategory: "Additives",
          image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
          description: "Broad-spectrum biocide for in-can and dry film protection.",
          featured: false,
          chemicalFormula: "Various",
          casNumber: "Multiple",
          hsCode: "3808.94",
          purity: "95.0%",
          applications: ["In-can preservation", "Dry film protection", "Mold prevention", "Bacteria control"],
          specifications: {
            appearance: "Clear to pale yellow liquid",
            solubility: "Miscible with water",
            ph: "6.0-8.0"
          },
          packaging: ["1L bottles", "25L drums", "200L drums"],
          safetyInfo: ["Handle with care", "Use recommended dosage", "Effective preservation"],
          price: "₹680/L",
          rating: 4.3,
          reviews: 67
        }
      ];
    } else if (category === "Animal Feed") {
      // 20 Animal Feed Products
      return [
        {
          id: baseId + 1,
          name: "Calcium Carbonate (Feed Grade)",
          category: "Animal Feed",
          subcategory: "Minerals",
          image: "https://images.pexels.com/photos/4110301/pexels-photo-4110301.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "High-purity calcium carbonate for animal nutrition and bone development.",
          featured: false,
          chemicalFormula: "CaCO₃",
          casNumber: "471-34-1",
          hsCode: "2836.50",
          purity: "98.5%",
          applications: ["Poultry feed", "Cattle nutrition", "Swine feed", "Aquaculture"],
          specifications: {
            appearance: "White powder",
            solubility: "Insoluble in water",
            ph: "8.5-9.5"
          },
          packaging: ["25kg bags", "500kg big bags", "1000kg big bags"],
          safetyInfo: ["Feed grade certified", "Essential for bone health", "Safe for all animals"],
          price: "₹18/kg",
          rating: 4.5,
          reviews: 123
        },
        {
          id: baseId + 2,
          name: "Dicalcium Phosphate",
          category: "Animal Feed",
          subcategory: "Minerals",
          image: "https://images.pexels.com/photos/4110302/pexels-photo-4110302.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Essential phosphorus and calcium supplement for animal growth.",
          featured: false,
          chemicalFormula: "CaHPO₄",
          casNumber: "7757-93-9",
          hsCode: "2835.25",
          purity: "98.0%",
          applications: ["Poultry nutrition", "Livestock feed", "Pet food", "Aquaculture feed"],
          specifications: {
            appearance: "White to gray powder",
            solubility: "Slightly soluble in water",
            ph: "7.0-8.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Feed grade quality", "Balanced Ca:P ratio", "Promotes bone development"],
          price: "₹45/kg",
          rating: 4.6,
          reviews: 98
        },
        {
          id: baseId + 3,
          name: "Lysine HCl",
          category: "Animal Feed",
          subcategory: "Amino Acids",
          image: "https://images.pexels.com/photos/4110303/pexels-photo-4110303.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Essential amino acid for protein synthesis and growth promotion.",
          featured: false,
          chemicalFormula: "C₆H₁₄N₂O₂·HCl",
          casNumber: "657-27-2",
          hsCode: "2922.41",
          purity: "98.5%",
          applications: ["Swine nutrition", "Poultry feed", "Aquaculture", "Pet food"],
          specifications: {
            appearance: "White to off-white powder",
            solubility: "Freely soluble in water",
            ph: "5.0-6.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Essential amino acid", "Improves feed efficiency", "Safe for all animals"],
          price: "₹85/kg",
          rating: 4.7,
          reviews: 87
        },
        {
          id: baseId + 4,
          name: "Methionine",
          category: "Animal Feed",
          subcategory: "Amino Acids",
          image: "https://images.pexels.com/photos/4110304/pexels-photo-4110304.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Sulfur-containing amino acid essential for protein synthesis.",
          featured: false,
          chemicalFormula: "C₅H₁₁NO₂S",
          casNumber: "63-68-3",
          hsCode: "2930.40",
          purity: "99.0%",
          applications: ["Poultry nutrition", "Swine feed", "Ruminant nutrition", "Aquaculture"],
          specifications: {
            appearance: "White crystalline powder",
            solubility: "Soluble in water",
            ph: "5.6-6.1"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Essential amino acid", "Improves feather development", "Enhances immune function"],
          price: "₹180/kg",
          rating: 4.5,
          reviews: 76
        },
        {
          id: baseId + 5,
          name: "Threonine",
          category: "Animal Feed",
          subcategory: "Amino Acids",
          image: "https://images.pexels.com/photos/4110305/pexels-photo-4110305.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Essential amino acid for intestinal health and protein synthesis.",
          featured: false,
          chemicalFormula: "C₄H₉NO₃",
          casNumber: "72-19-5",
          hsCode: "2922.49",
          purity: "98.5%",
          applications: ["Swine nutrition", "Poultry feed", "Aquaculture", "Young animal nutrition"],
          specifications: {
            appearance: "White crystalline powder",
            solubility: "Freely soluble in water",
            ph: "5.0-6.5"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Essential amino acid", "Supports intestinal health", "Improves feed conversion"],
          price: "₹220/kg",
          rating: 4.4,
          reviews: 65
        },
        {
          id: baseId + 6,
          name: "Vitamin A Acetate",
          category: "Animal Feed",
          subcategory: "Vitamins",
          image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
          description: "Stable vitamin A supplement for vision and immune function.",
          featured: false,
          chemicalFormula: "C₂₂H₃₂O₂",
          casNumber: "127-47-9",
          hsCode: "2936.21",
          purity: "95.0%",
          applications: ["Poultry nutrition", "Swine feed", "Cattle nutrition", "Pet food"],
          specifications: {
            appearance: "Light yellow powder",
            solubility: "Oil soluble",
            ph: "N/A"
          },
          packaging: ["1kg containers", "25kg drums"],
          safetyInfo: ["Essential vitamin", "Light sensitive", "Supports vision and immunity"],
          price: "₹850/kg",
          rating: 4.6,
          reviews: 89
        },
        {
          id: baseId + 7,
          name: "Vitamin D3",
          category: "Animal Feed",
          subcategory: "Vitamins",
          image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
          description: "Essential vitamin for calcium absorption and bone development.",
          featured: false,
          chemicalFormula: "C₂₇H₄₄O",
          casNumber: "67-97-0",
          hsCode: "2936.29",
          purity: "95.0%",
          applications: ["Poultry feed", "Swine nutrition", "Cattle feed", "Aquaculture"],
          specifications: {
            appearance: "White to off-white powder",
            solubility: "Oil soluble",
            ph: "N/A"
          },
          packaging: ["1kg containers", "25kg drums"],
          safetyInfo: ["Essential vitamin", "Promotes calcium absorption", "Prevents rickets"],
          price: "₹1200/kg",
          rating: 4.7,
          reviews: 94
        },
        {
          id: baseId + 8,
          name: "Vitamin E",
          category: "Animal Feed",
          subcategory: "Vitamins",
          image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
          description: "Antioxidant vitamin for reproductive health and immune function.",
          featured: false,
          chemicalFormula: "C₂₉H₅₀O₂",
          casNumber: "59-02-9",
          hsCode: "2936.28",
          purity: "50.0%",
          applications: ["Breeding animals", "Poultry nutrition", "Swine feed", "Cattle nutrition"],
          specifications: {
            appearance: "Light brown powder",
            solubility: "Oil soluble",
            ph: "N/A"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Antioxidant properties", "Supports reproduction", "Enhances immune system"],
          price: "₹320/kg",
          rating: 4.5,
          reviews: 78
        },
        {
          id: baseId + 9,
          name: "Biotin",
          category: "Animal Feed",
          subcategory: "Vitamins",
          image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
          description: "Essential B-vitamin for hoof health and metabolic functions.",
          featured: false,
          chemicalFormula: "C₁₀H₁₆N₂O₃S",
          casNumber: "58-85-5",
          hsCode: "2936.26",
          purity: "2.0%",
          applications: ["Swine nutrition", "Poultry feed", "Cattle nutrition", "Hoof health"],
          specifications: {
            appearance: "Light gray powder",
            solubility: "Slightly soluble in water",
            ph: "6.0-7.5"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Essential B-vitamin", "Improves hoof quality", "Supports metabolism"],
          price: "₹450/kg",
          rating: 4.4,
          reviews: 67
        },
        {
          id: baseId + 10,
          name: "Choline Chloride",
          category: "Animal Feed",
          subcategory: "Vitamins",
          image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
          description: "Essential nutrient for fat metabolism and liver function.",
          featured: false,
          chemicalFormula: "C₅H₁₄ClNO",
          casNumber: "67-48-1",
          hsCode: "2923.10",
          purity: "60.0%",
          applications: ["Poultry nutrition", "Swine feed", "Aquaculture", "Ruminant nutrition"],
          specifications: {
            appearance: "Brown hygroscopic powder",
            solubility: "Freely soluble in water",
            ph: "6.5-8.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Essential nutrient", "Prevents fatty liver", "Improves growth rate"],
          price: "₹65/kg",
          rating: 4.6,
          reviews: 112
        },
        {
          id: baseId + 11,
          name: "Zinc Sulfate",
          category: "Animal Feed",
          subcategory: "Trace Minerals",
          image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
          description: "Essential trace mineral for enzyme function and immune health.",
          featured: false,
          chemicalFormula: "ZnSO₄·7H₂O",
          casNumber: "7446-20-0",
          hsCode: "2833.29",
          purity: "98.0%",
          applications: ["All animal species", "Immune support", "Skin health", "Reproduction"],
          specifications: {
            appearance: "White crystalline powder",
            solubility: "Soluble in water",
            ph: "4.0-6.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Essential trace mineral", "Supports immune function", "Improves skin condition"],
          price: "₹85/kg",
          rating: 4.5,
          reviews: 89
        },
        {
          id: baseId + 12,
          name: "Copper Sulfate",
          category: "Animal Feed",
          subcategory: "Trace Minerals",
          image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
          description: "Essential copper supplement for blood formation and enzyme activity.",
          featured: false,
          chemicalFormula: "CuSO₄·5H₂O",
          casNumber: "7758-99-8",
          hsCode: "2833.25",
          purity: "98.0%",
          applications: ["Ruminant nutrition", "Swine feed", "Poultry nutrition", "Blood formation"],
          specifications: {
            appearance: "Blue crystalline powder",
            solubility: "Soluble in water",
            ph: "3.5-4.5"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Essential trace mineral", "Use recommended dosage", "Supports blood formation"],
          price: "₹120/kg",
          rating: 4.3,
          reviews: 76
        },
        {
          id: baseId + 13,
          name: "Iron Sulfate",
          category: "Animal Feed",
          subcategory: "Trace Minerals",
          image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
          description: "Iron supplement for preventing anemia and supporting oxygen transport.",
          featured: false,
          chemicalFormula: "FeSO₄·7H₂O",
          casNumber: "7782-63-0",
          hsCode: "2833.21",
          purity: "98.0%",
          applications: ["Young animals", "Breeding sows", "Poultry", "Anemia prevention"],
          specifications: {
            appearance: "Light green crystalline powder",
            solubility: "Soluble in water",
            ph: "3.0-4.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Essential for blood formation", "Prevents anemia", "Store in dry place"],
          price: "₹45/kg",
          rating: 4.4,
          reviews: 68
        },
        {
          id: baseId + 14,
          name: "Manganese Sulfate",
          category: "Animal Feed",
          subcategory: "Trace Minerals",
          image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
          description: "Essential manganese for bone development and reproductive health.",
          featured: false,
          chemicalFormula: "MnSO₄·H₂O",
          casNumber: "10034-96-5",
          hsCode: "2833.30",
          purity: "98.0%",
          applications: ["Poultry nutrition", "Swine feed", "Cattle nutrition", "Bone development"],
          specifications: {
            appearance: "Light pink powder",
            solubility: "Soluble in water",
            ph: "4.0-6.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Essential trace mineral", "Supports bone health", "Important for reproduction"],
          price: "₹95/kg",
          rating: 4.2,
          reviews: 54
        },
        {
          id: baseId + 15,
          name: "Betaine Hydrochloride",
          category: "Animal Feed",
          subcategory: "Feed Additives",
          image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
          description: "Osmolyte and methyl donor for improved performance under stress.",
          featured: false,
          chemicalFormula: "C₅H₁₁NO₂·HCl",
          casNumber: "590-46-5",
          hsCode: "2923.90",
          purity: "98.0%",
          applications: ["Heat stress management", "Aquaculture", "Poultry nutrition", "Swine feed"],
          specifications: {
            appearance: "White crystalline powder",
            solubility: "Freely soluble in water",
            ph: "0.8-1.2"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Natural osmolyte", "Improves stress tolerance", "Enhances performance"],
          price: "₹180/kg",
          rating: 4.5,
          reviews: 73
        },
        {
          id: baseId + 16,
          name: "Sodium Butyrate",
          category: "Animal Feed",
          subcategory: "Feed Additives",
          image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
          description: "Short-chain fatty acid for gut health and intestinal development.",
          featured: false,
          chemicalFormula: "C₄H₇NaO₂",
          casNumber: "156-54-7",
          hsCode: "2915.50",
          purity: "98.0%",
          applications: ["Gut health", "Young animal nutrition", "Poultry feed", "Swine nutrition"],
          specifications: {
            appearance: "White powder",
            solubility: "Soluble in water",
            ph: "8.0-10.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Supports gut health", "Improves intestinal development", "Natural feed additive"],
          price: "₹320/kg",
          rating: 4.6,
          reviews: 87
        },
        {
          id: baseId + 17,
          name: "Organic Selenium",
          category: "Animal Feed",
          subcategory: "Trace Minerals",
          image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
          description: "Highly bioavailable organic selenium for antioxidant protection.",
          featured: false,
          chemicalFormula: "Se-Yeast",
          casNumber: "Various",
          hsCode: "2106.90",
          purity: "0.2%",
          applications: ["Antioxidant protection", "Immune support", "Reproduction", "Meat quality"],
          specifications: {
            appearance: "Light brown powder",
            solubility: "Partially soluble in water",
            ph: "6.0-7.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Organic form", "Better bioavailability", "Antioxidant properties"],
          price: "₹450/kg",
          rating: 4.7,
          reviews: 65
        },
        {
          id: baseId + 18,
          name: "Probiotics Blend",
          category: "Animal Feed",
          subcategory: "Feed Additives",
          image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
          description: "Multi-strain probiotic blend for gut health and performance.",
          featured: false,
          chemicalFormula: "Mixed microorganisms",
          casNumber: "Various",
          hsCode: "2106.90",
          purity: "10⁹ CFU/g",
          applications: ["Gut health", "Immune support", "Performance enhancement", "Disease prevention"],
          specifications: {
            appearance: "Light brown powder",
            solubility: "Dispersible in water",
            ph: "6.0-7.5"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Beneficial bacteria", "Improves gut health", "Natural alternative to antibiotics"],
          price: "₹280/kg",
          rating: 4.5,
          reviews: 92
        },
        {
          id: baseId + 19,
          name: "Phytase Enzyme",
          category: "Animal Feed",
          subcategory: "Enzymes",
          image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
          description: "Phosphorus-releasing enzyme for improved mineral utilization.",
          featured: false,
          chemicalFormula: "Enzyme protein",
          casNumber: "9001-89-2",
          hsCode: "3507.90",
          purity: "5000 FTU/g",
          applications: ["Phosphorus release", "Environmental benefits", "Cost reduction", "Bone health"],
          specifications: {
            appearance: "Light brown powder",
            solubility: "Dispersible in water",
            ph: "4.0-6.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Improves phosphorus utilization", "Reduces environmental impact", "Cost effective"],
          price: "₹380/kg",
          rating: 4.6,
          reviews: 78
        },
        {
          id: baseId + 20,
          name: "Xylanase Enzyme",
          category: "Animal Feed",
          subcategory: "Enzymes",
          image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
          description: "Fiber-degrading enzyme for improved nutrient digestibility.",
          featured: false,
          chemicalFormula: "Enzyme protein",
          casNumber: "9025-57-4",
          hsCode: "3507.90",
          purity: "4000 BXU/g",
          applications: ["Fiber digestion", "Energy release", "Feed efficiency", "Gut health"],
          specifications: {
            appearance: "Light brown powder",
            solubility: "Dispersible in water",
            ph: "4.5-6.5"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Improves digestibility", "Increases energy availability", "Reduces feed costs"],
          price: "₹420/kg",
          rating: 4.4,
          reviews: 69
        }
      ];
    } else if (category === "Water Treatment") {
      // 20 Water Treatment Products
      return [
        {
          id: baseId + 1,
          name: "Polyaluminium Chloride (PAC)",
          category: "Water Treatment",
          subcategory: "Coagulants",
          image: "https://images.pexels.com/photos/4110401/pexels-photo-4110401.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "High-efficiency coagulant for water and wastewater treatment.",
          featured: false,
          chemicalFormula: "Al₂(OH)ₙCl₆₋ₙ",
          casNumber: "1327-41-9",
          hsCode: "2827.32",
          purity: "30.0%",
          applications: ["Drinking water treatment", "Wastewater treatment", "Industrial water", "Swimming pools"],
          specifications: {
            appearance: "Light yellow liquid",
            solubility: "Soluble in water",
            ph: "3.5-5.0"
          },
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Handle with care", "Corrosive", "Use protective equipment"],
          price: "₹45/L",
          rating: 4.5,
          reviews: 134
        },
        {
          id: baseId + 2,
          name: "Ferric Chloride",
          category: "Water Treatment",
          subcategory: "Coagulants",
          image: "https://images.pexels.com/photos/4110402/pexels-photo-4110402.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Effective coagulant for phosphorus removal and water clarification.",
          featured: false,
          chemicalFormula: "FeCl₃",
          casNumber: "7705-08-0",
          hsCode: "2827.39",
          purity: "40.0%",
          applications: ["Phosphorus removal", "Wastewater treatment", "Sludge conditioning", "Industrial water"],
          specifications: {
            appearance: "Dark brown liquid",
            solubility: "Soluble in water",
            ph: "1.0-2.0"
          },
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Highly corrosive", "Causes severe burns", "Use full protection"],
          price: "₹38/L",
          rating: 4.4,
          reviews: 98
        },
        {
          id: baseId + 3,
          name: "Activated Carbon",
          category: "Water Treatment",
          subcategory: "Adsorbents",
          image: "https://images.pexels.com/photos/4110403/pexels-photo-4110403.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "High-quality activated carbon for organic contaminant removal.",
          featured: false,
          chemicalFormula: "C",
          casNumber: "7440-44-0",
          hsCode: "3802.10",
          purity: "85.0%",
          applications: ["Drinking water treatment", "Air purification", "Wastewater treatment", "Decolorization"],
          specifications: {
            appearance: "Black granules/powder",
            solubility: "Insoluble in water",
            ph: "6.0-8.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Avoid dust inhalation", "Store in dry place", "Non-toxic"],
          price: "₹85/kg",
          rating: 4.6,
          reviews: 156
        },
        {
          id: baseId + 4,
          name: "Sodium Hypochlorite",
          category: "Water Treatment",
          subcategory: "Disinfectants",
          image: "https://images.pexels.com/photos/4110404/pexels-photo-4110404.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Liquid chlorine disinfectant for water treatment and sanitization.",
          featured: false,
          chemicalFormula: "NaClO",
          casNumber: "7681-52-9",
          hsCode: "2828.90",
          purity: "12.0%",
          applications: ["Water disinfection", "Swimming pool treatment", "Wastewater disinfection", "Surface sanitization"],
          specifications: {
            appearance: "Pale yellow liquid",
            solubility: "Soluble in water",
            ph: "11.0-13.0"
          },
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Oxidizing agent", "Corrosive", "Keep away from acids"],
          price: "₹25/L",
          rating: 4.3,
          reviews: 123
        },
        {
          id: baseId + 5,
          name: "Calcium Hypochlorite",
          category: "Water Treatment",
          subcategory: "Disinfectants",
          image: "https://images.pexels.com/photos/4110405/pexels-photo-4110405.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Stable chlorine compound for water disinfection and bleaching.",
          featured: false,
          chemicalFormula: "Ca(ClO)₂",
          casNumber: "7778-54-3",
          hsCode: "2828.10",
          purity: "70.0%",
          applications: ["Swimming pool treatment", "Water disinfection", "Bleaching", "Emergency water treatment"],
          specifications: {
            appearance: "White granules",
            solubility: "Soluble in water",
            ph: "10.5-11.5"
          },
          packaging: ["25kg drums", "50kg drums"],
          safetyInfo: ["Strong oxidizer", "Fire hazard", "Store in cool, dry place"],
          price: "₹65/kg",
          rating: 4.4,
          reviews: 89
        },
        {
          id: baseId + 6,
          name: "Chlorine Dioxide",
          category: "Water Treatment",
          subcategory: "Disinfectants",
          image: "https://jkmchemtrade.com/upload/categories/4471230925113924.jpg",
          description: "Advanced disinfectant for drinking water and industrial applications.",
          featured: false,
          chemicalFormula: "ClO₂",
          casNumber: "10049-04-4",
          hsCode: "2811.19",
          purity: "0.3%",
          applications: ["Drinking water disinfection", "Legionella control", "Biofilm removal", "Taste and odor control"],
          specifications: {
            appearance: "Yellow-green solution",
            solubility: "Soluble in water",
            ph: "6.0-8.0"
          },
          packaging: ["25L drums", "200L drums"],
          safetyInfo: ["Explosive gas", "Use specialized equipment", "Professional handling only"],
          price: "₹180/L",
          rating: 4.7,
          reviews: 67
        },
        {
          id: baseId + 7,
          name: "Aluminum Sulfate (Alum)",
          category: "Water Treatment",
          subcategory: "Coagulants",
          image: "https://jkmchemtrade.com/upload/categories/4471230925113924.jpg",
          description: "Traditional coagulant for water clarification and turbidity removal.",
          featured: false,
          chemicalFormula: "Al₂(SO₄)₃·18H₂O",
          casNumber: "7784-31-8",
          hsCode: "2833.22",
          purity: "17.0%",
          applications: ["Water clarification", "Turbidity removal", "Paper industry", "Wastewater treatment"],
          specifications: {
            appearance: "White crystalline solid",
            solubility: "Soluble in water",
            ph: "3.0-4.0"
          },
          packaging: ["25kg bags", "500kg big bags", "1000kg big bags"],
          safetyInfo: ["Mildly corrosive", "Handle with care", "Store in dry place"],
          price: "₹18/kg",
          rating: 4.2,
          reviews: 145
        },
        {
          id: baseId + 8,
          name: "Polyacrylamide (PAM)",
          category: "Water Treatment",
          subcategory: "Flocculants",
          image: "https://jkmchemtrade.com/upload/categories/4471230925113924.jpg",
          description: "High molecular weight polymer for flocculation and sludge dewatering.",
          featured: false,
          chemicalFormula: "(C₃H₅NO)ₙ",
          casNumber: "9003-05-8",
          hsCode: "3906.90",
          purity: "90.0%",
          applications: ["Sludge dewatering", "Water clarification", "Mining applications", "Paper industry"],
          specifications: {
            appearance: "White powder/granules",
            solubility: "Soluble in water",
            ph: "6.0-8.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Avoid dust inhalation", "Slippery when wet", "Use proper handling"],
          price: "₹280/kg",
          rating: 4.5,
          reviews: 78
        },
        {
          id: baseId + 9,
          name: "Sodium Hydroxide (Caustic Soda)",
          category: "Water Treatment",
          subcategory: "pH Adjusters",
          image: "https://jkmchemtrade.com/upload/categories/4471230925113924.jpg",
          description: "Strong alkali for pH adjustment and neutralization.",
          featured: false,
          chemicalFormula: "NaOH",
          casNumber: "1310-73-2",
          hsCode: "2815.11",
          purity: "50.0%",
          applications: ["pH adjustment", "Neutralization", "Water softening", "Chemical precipitation"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Miscible with water",
            ph: "14.0"
          },
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Highly corrosive", "Causes severe burns", "Use full protection"],
          price: "₹35/L",
          rating: 4.3,
          reviews: 167
        },
        {
          id: baseId + 10,
          name: "Sulfuric Acid",
          category: "Water Treatment",
          subcategory: "pH Adjusters",
          image: "https://jkmchemtrade.com/upload/categories/4471230925113924.jpg",
          description: "Strong acid for pH reduction and chemical precipitation.",
          featured: false,
          chemicalFormula: "H₂SO₄",
          casNumber: "7664-93-9",
          hsCode: "2807.00",
          purity: "98.0%",
          applications: ["pH adjustment", "Metal precipitation", "Regeneration", "Neutralization"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Miscible with water",
            ph: "0.5"
          },
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Extremely corrosive", "Generates heat with water", "Professional handling only"],
          price: "₹28/L",
          rating: 4.1,
          reviews: 134
        },
        {
          id: baseId + 11,
          name: "Hydrogen Peroxide",
          category: "Water Treatment",
          subcategory: "Oxidants",
          image: "https://jkmchemtrade.com/upload/categories/4471230925113924.jpg",
          description: "Environmentally friendly oxidant for advanced water treatment.",
          featured: false,
          chemicalFormula: "H₂O₂",
          casNumber: "7722-84-1",
          hsCode: "2847.00",
          purity: "35.0%",
          applications: ["Advanced oxidation", "Disinfection", "Odor control", "Iron and manganese removal"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Miscible with water",
            ph: "3.0-4.0"
          },
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Strong oxidizer", "Decomposes to water and oxygen", "Store in cool place"],
          price: "₹85/L",
          rating: 4.6,
          reviews: 92
        },
        {
          id: baseId + 12,
          name: "Potassium Permanganate",
          category: "Water Treatment",
          subcategory: "Oxidants",
          image: "https://jkmchemtrade.com/upload/categories/4471230925113924.jpg",
          description: "Strong oxidizing agent for iron, manganese, and organic removal.",
          featured: false,
          chemicalFormula: "KMnO₄",
          casNumber: "7722-64-7",
          hsCode: "2841.61",
          purity: "99.0%",
          applications: ["Iron and manganese removal", "Taste and odor control", "Disinfection", "Organic oxidation"],
          specifications: {
            appearance: "Dark purple crystals",
            solubility: "Soluble in water",
            ph: "N/A"
          },
          packaging: ["25kg bags", "50kg drums"],
          safetyInfo: ["Strong oxidizer", "Fire hazard", "Keep away from organics"],
          price: "₹180/kg",
          rating: 4.4,
          reviews: 76
        },
        {
          id: baseId + 13,
          name: "Sodium Carbonate (Soda Ash)",
          category: "Water Treatment",
          subcategory: "Water Softening",
          image: "https://jkmchemtrade.com/upload/categories/4471230925113924.jpg",
          description: "Alkaline chemical for water softening and pH adjustment.",
          featured: false,
          chemicalFormula: "Na₂CO₃",
          casNumber: "497-19-8",
          hsCode: "2836.20",
          purity: "99.2%",
          applications: ["Water softening", "pH adjustment", "Alkalinity increase", "Boiler water treatment"],
          specifications: {
            appearance: "White crystalline powder",
            solubility: "Soluble in water",
            ph: "11.0-12.0"
          },
          packaging: ["25kg bags", "500kg big bags", "1000kg big bags"],
          safetyInfo: ["Mildly corrosive", "Avoid eye contact", "Store in dry place"],
          price: "₹22/kg",
          rating: 4.3,
          reviews: 123
        },
        {
          id: baseId + 14,
          name: "Sodium Chloride (Salt)",
          category: "Water Treatment",
          subcategory: "Water Softening",
          image: "https://jkmchemtrade.com/upload/categories/4471230925113924.jpg",
          description: "High-purity salt for water softener regeneration.",
          featured: false,
          chemicalFormula: "NaCl",
          casNumber: "7647-14-5",
          hsCode: "2501.00",
          purity: "99.5%",
          applications: ["Water softener regeneration", "Brine production", "Ion exchange", "Reverse osmosis"],
          specifications: {
            appearance: "White crystals",
            solubility: "Soluble in water",
            ph: "7.0"
          },
          packaging: ["25kg bags", "500kg big bags", "1000kg big bags"],
          safetyInfo: ["Food grade available", "Non-toxic", "Store in dry place"],
          price: "₹8/kg",
          rating: 4.5,
          reviews: 189
        },
        {
          id: baseId + 15,
          name: "Antiscalant",
          category: "Water Treatment",
          subcategory: "Scale Inhibitors",
          image: "https://jkmchemtrade.com/upload/categories/4471230925113924.jpg",
          description: "Specialized chemical for preventing scale formation in RO systems.",
          featured: false,
          chemicalFormula: "Proprietary blend",
          casNumber: "Various",
          hsCode: "3824.90",
          purity: "100.0%",
          applications: ["Reverse osmosis", "Boiler treatment", "Cooling towers", "Membrane protection"],
          specifications: {
            appearance: "Clear to amber liquid",
            solubility: "Miscible with water",
            ph: "2.0-3.0"
          },
          packaging: ["25L drums", "200L drums"],
          safetyInfo: ["Low toxicity", "Effective at low dosage", "Compatible with membranes"],
          price: "₹320/L",
          rating: 4.6,
          reviews: 87
        },
        {
          id: baseId + 16,
          name: "Biocide",
          category: "Water Treatment",
          subcategory: "Microbiological Control",
          image: "https://jkmchemtrade.com/upload/categories/4471230925113924.jpg",
          description: "Broad-spectrum biocide for microbiological control in water systems.",
          featured: false,
          chemicalFormula: "Various",
          casNumber: "Multiple",
          hsCode: "3808.94",
          purity: "95.0%",
          applications: ["Cooling towers", "Industrial water", "Membrane systems", "Storage tanks"],
          specifications: {
            appearance: "Clear to pale yellow liquid",
            solubility: "Miscible with water",
            ph: "6.0-8.0"
          },
          packaging: ["25L drums", "200L drums"],
          safetyInfo: ["Handle with care", "Use recommended dosage", "Effective preservation"],
          price: "₹450/L",
          rating: 4.4,
          reviews: 65
        },
        {
          id: baseId + 17,
          name: "Corrosion Inhibitor",
          category: "Water Treatment",
          subcategory: "Metal Protection",
          image: "https://jkmchemtrade.com/upload/categories/4471230925113924.jpg",
          description: "Specialized inhibitor for protecting metal surfaces from corrosion.",
          featured: false,
          chemicalFormula: "Proprietary blend",
          casNumber: "Various",
          hsCode: "3824.90",
          purity: "100.0%",
          applications: ["Boiler treatment", "Cooling systems", "Closed loops", "Pipeline protection"],
          specifications: {
            appearance: "Clear to amber liquid",
            solubility: "Miscible with water",
            ph: "8.0-10.0"
          },
          packaging: ["25L drums", "200L drums"],
          safetyInfo: ["Protects metal surfaces", "Environmentally acceptable", "Cost effective"],
          price: "₹280/L",
          rating: 4.5,
          reviews: 78
        },
        {
          id: baseId + 18,
          name: "Oxygen Scavenger",
          category: "Water Treatment",
          subcategory: "Boiler Chemicals",
          image: "https://jkmchemtrade.com/upload/categories/4471230925113924.jpg",
          description: "Chemical for removing dissolved oxygen from boiler feedwater.",
          featured: false,
          chemicalFormula: "Na₂SO₃",
          casNumber: "7757-83-7",
          hsCode: "2832.10",
          purity: "97.0%",
          applications: ["Boiler water treatment", "Oxygen removal", "Corrosion prevention", "Steam systems"],
          specifications: {
            appearance: "White crystalline powder",
            solubility: "Soluble in water",
            ph: "9.0-10.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Reduces oxygen corrosion", "Handle in ventilated area", "Store in dry place"],
          price: "₹45/kg",
          rating: 4.3,
          reviews: 89
        },
        {
          id: baseId + 19,
          name: "Phosphonate",
          category: "Water Treatment",
          subcategory: "Scale Inhibitors",
          image: "https://jkmchemtrade.com/upload/categories/4471230925113924.jpg",
          description: "Organic phosphonate for scale and corrosion inhibition.",
          featured: false,
          chemicalFormula: "C₂H₈NO₇P₃",
          casNumber: "6419-19-8",
          hsCode: "2931.00",
          purity: "50.0%",
          applications: ["Cooling towers", "Boiler treatment", "RO systems", "Industrial water"],
          specifications: {
            appearance: "Clear to amber liquid",
            solubility: "Miscible with water",
            ph: "1.5-2.5"
          },
          packaging: ["25L drums", "200L drums"],
          safetyInfo: ["Effective scale inhibitor", "Low environmental impact", "Stable in water"],
          price: "₹380/L",
          rating: 4.4,
          reviews: 67
        },
        {
          id: baseId + 20,
          name: "Membrane Cleaner",
          category: "Water Treatment",
          subcategory: "Membrane Chemicals",
          image: "https://jkmchemtrade.com/upload/categories/4471230925113924.jpg",
          description: "Specialized cleaner for RO and UF membrane maintenance.",
          featured: false,
          chemicalFormula: "Proprietary blend",
          casNumber: "Various",
          hsCode: "3824.90",
          purity: "100.0%",
          applications: ["RO membrane cleaning", "UF membrane cleaning", "Fouling removal", "Performance restoration"],
          specifications: {
            appearance: "Clear to light colored liquid",
            solubility: "Miscible with water",
            ph: "1.0-2.0"
          },
          packaging: ["25L drums", "200L drums"],
          safetyInfo: ["Restores membrane performance", "Follow cleaning procedures", "Compatible with membranes"],
          price: "₹520/L",
          rating: 4.6,
          reviews: 54
        }
      ];
    } else if (category === "Textile") {
      // 20 Textile Products
      return [
        {
          id: baseId + 1,
          name: "Reactive Red 195",
          category: "Textile",
          subcategory: "Reactive Dyes",
          image: "https://images.pexels.com/photos/4110501/pexels-photo-4110501.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "High-quality reactive dye for cotton and cellulosic fiber dyeing.",
          featured: false,
          chemicalFormula: "C₃₁H₁₉ClN₇Na₄O₁₉S₆",
          casNumber: "93050-80-7",
          hsCode: "3204.12",
          purity: "60.0%",
          applications: ["Cotton dyeing", "Viscose dyeing", "Linen dyeing", "Bamboo fiber dyeing"],
          specifications: {
            appearance: "Red powder",
            solubility: "Soluble in water",
            ph: "7.0-9.0"
          },
          packaging: ["25kg drums", "200kg drums"],
          safetyInfo: ["Avoid skin contact", "Use protective equipment", "Store in cool, dry place"],
          price: "₹450/kg",
          rating: 4.5,
          reviews: 89
        },
        {
          id: baseId + 2,
          name: "Direct Blue 86",
          category: "Textile",
          subcategory: "Direct Dyes",
          image: "https://images.pexels.com/photos/4110502/pexels-photo-4110502.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Direct dye for cellulosic fibers with excellent color fastness.",
          featured: false,
          chemicalFormula: "C₃₂H₂₂N₆Na₂O₆S₂",
          casNumber: "1330-38-7",
          hsCode: "3204.13",
          purity: "55.0%",
          applications: ["Cotton dyeing", "Paper dyeing", "Leather dyeing", "Viscose dyeing"],
          specifications: {
            appearance: "Blue powder",
            solubility: "Soluble in water",
            ph: "6.0-8.0"
          },
          packaging: ["25kg drums", "200kg drums"],
          safetyInfo: ["Good light fastness", "Avoid dust inhalation", "Use in ventilated area"],
          price: "₹380/kg",
          rating: 4.3,
          reviews: 76
        },
        {
          id: baseId + 3,
          name: "Acid Yellow 23",
          category: "Textile",
          subcategory: "Acid Dyes",
          image: "https://images.pexels.com/photos/4110503/pexels-photo-4110503.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Bright acid dye for wool, silk, and nylon dyeing applications.",
          featured: false,
          chemicalFormula: "C₁₆H₁₀N₄Na₂O₇S₂",
          casNumber: "1934-21-0",
          hsCode: "3204.15",
          purity: "85.0%",
          applications: ["Wool dyeing", "Silk dyeing", "Nylon dyeing", "Leather dyeing"],
          specifications: {
            appearance: "Yellow powder",
            solubility: "Soluble in water",
            ph: "4.0-6.0"
          },
          packaging: ["25kg drums", "200kg drums"],
          safetyInfo: ["Excellent brightness", "Good wash fastness", "Handle with care"],
          price: "₹520/kg",
          rating: 4.6,
          reviews: 67
        },
        {
          id: baseId + 4,
          name: "Disperse Red 60",
          category: "Textile",
          subcategory: "Disperse Dyes",
          image: "https://images.pexels.com/photos/4110504/pexels-photo-4110504.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "High-temperature disperse dye for polyester and synthetic fibers.",
          featured: false,
          chemicalFormula: "C₂₀H₁₃N₃O₄",
          casNumber: "17418-58-5",
          hsCode: "3204.14",
          purity: "95.0%",
          applications: ["Polyester dyeing", "Nylon dyeing", "Acetate dyeing", "Synthetic fiber dyeing"],
          specifications: {
            appearance: "Red powder",
            solubility: "Dispersible in water",
            ph: "5.0-7.0"
          },
          packaging: ["25kg drums", "200kg drums"],
          safetyInfo: ["High temperature stable", "Good sublimation fastness", "Avoid overheating"],
          price: "₹680/kg",
          rating: 4.4,
          reviews: 54
        },
        {
          id: baseId + 5,
          name: "Vat Blue 1 (Indigo)",
          category: "Textile",
          subcategory: "Vat Dyes",
          image: "https://images.pexels.com/photos/4110505/pexels-photo-4110505.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Classic indigo dye for denim and traditional textile applications.",
          featured: false,
          chemicalFormula: "C₁₆H₁₀N₂O₂",
          casNumber: "482-89-3",
          hsCode: "3204.16",
          purity: "95.0%",
          applications: ["Denim dyeing", "Traditional textiles", "Cotton dyeing", "Rope dyeing"],
          specifications: {
            appearance: "Dark blue powder",
            solubility: "Insoluble in water",
            ph: "11.0-13.0"
          },
          packaging: ["25kg drums", "200kg drums"],
          safetyInfo: ["Requires reduction", "Excellent fastness", "Traditional dye"],
          price: "₹850/kg",
          rating: 4.7,
          reviews: 123
        },
        {
          id: baseId + 6,
          name: "Sodium Hydrosulfite",
          category: "Textile",
          subcategory: "Reducing Agents",
          image: "https://content.jdmagicbox.com/comp/def_content_category/textile-auxiliary-dealers/4bdc0a53ed-textile-auxiliary-dealers-1-m5o87.jpg",
          description: "Powerful reducing agent for vat dyeing and textile bleaching.",
          featured: false,
          chemicalFormula: "Na₂S₂O₄",
          casNumber: "7775-14-6",
          hsCode: "2831.10",
          purity: "88.0%",
          applications: ["Vat dyeing", "Textile bleaching", "Color stripping", "Indigo reduction"],
          specifications: {
            appearance: "White crystalline powder",
            solubility: "Soluble in water",
            ph: "4.0-6.0"
          },
          packaging: ["25kg bags", "50kg drums"],
          safetyInfo: ["Strong reducing agent", "Decomposes in air", "Store in sealed containers"],
          price: "₹85/kg",
          rating: 4.3,
          reviews: 98
        },
        {
          id: baseId + 7,
          name: "Hydrogen Peroxide (Textile Grade)",
          category: "Textile",
          subcategory: "Bleaching Agents",
          image: "https://content.jdmagicbox.com/comp/def_content_category/textile-auxiliary-dealers/4bdc0a53ed-textile-auxiliary-dealers-1-m5o87.jpg",
          description: "Eco-friendly bleaching agent for textile processing.",
          featured: false,
          chemicalFormula: "H₂O₂",
          casNumber: "7722-84-1",
          hsCode: "2847.00",
          purity: "50.0%",
          applications: ["Cotton bleaching", "Wool bleaching", "Silk degumming", "Color removal"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Miscible with water",
            ph: "3.0-4.0"
          },
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Environmentally friendly", "Decomposes to water and oxygen", "Store in cool place"],
          price: "₹65/L",
          rating: 4.5,
          reviews: 134
        },
        {
          id: baseId + 8,
          name: "Sodium Hypochlorite (Textile Grade)",
          category: "Textile",
          subcategory: "Bleaching Agents",
          image: "https://content.jdmagicbox.com/comp/def_content_category/textile-auxiliary-dealers/4bdc0a53ed-textile-auxiliary-dealers-1-m5o87.jpg",
          description: "Chlorine bleach for cotton and cellulosic fiber processing.",
          featured: false,
          chemicalFormula: "NaClO",
          casNumber: "7681-52-9",
          hsCode: "2828.90",
          purity: "12.0%",
          applications: ["Cotton bleaching", "Cellulose bleaching", "Stain removal", "Desizing"],
          specifications: {
            appearance: "Pale yellow liquid",
            solubility: "Soluble in water",
            ph: "11.0-13.0"
          },
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Effective bleaching", "Corrosive", "Keep away from acids"],
          price: "₹22/L",
          rating: 4.2,
          reviews: 87
        },
        {
          id: baseId + 9,
          name: "Acetic Acid (Textile Grade)",
          category: "Textile",
          subcategory: "pH Adjusters",
          image: "https://content.jdmagicbox.com/comp/def_content_category/textile-auxiliary-dealers/4bdc0a53ed-textile-auxiliary-dealers-1-m5o87.jpg",
          description: "Textile grade acetic acid for pH control and dyeing processes.",
          featured: false,
          chemicalFormula: "C₂H₄O₂",
          casNumber: "64-19-7",
          hsCode: "2915.21",
          purity: "80.0%",
          applications: ["pH adjustment", "Acid dyeing", "Neutralization", "Finishing processes"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Miscible with water",
            ph: "2.4"
          },
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Corrosive", "Handle with care", "Use ventilation"],
          price: "₹38/L",
          rating: 4.4,
          reviews: 76
        },
        {
          id: baseId + 10,
          name: "Sodium Carbonate (Textile Grade)",
          category: "Textile",
          subcategory: "Alkalis",
          image: "https://content.jdmagicbox.com/comp/def_content_category/textile-auxiliary-dealers/4bdc0a53ed-textile-auxiliary-dealers-1-m5o87.jpg",
          description: "Soda ash for alkaline processes and reactive dyeing.",
          featured: false,
          chemicalFormula: "Na₂CO₃",
          casNumber: "497-19-8",
          hsCode: "2836.20",
          purity: "99.2%",
          applications: ["Reactive dyeing", "Scouring", "Mercerizing", "pH adjustment"],
          specifications: {
            appearance: "White crystalline powder",
            solubility: "Soluble in water",
            ph: "11.0-12.0"
          },
          packaging: ["25kg bags", "500kg big bags", "1000kg big bags"],
          safetyInfo: ["Alkaline", "Avoid eye contact", "Store in dry place"],
          price: "₹18/kg",
          rating: 4.3,
          reviews: 145
        },
        {
          id: baseId + 11,
          name: "Caustic Soda (Textile Grade)",
          category: "Textile",
          subcategory: "Alkalis",
          image: "https://content.jdmagicbox.com/comp/def_content_category/textile-auxiliary-dealers/4bdc0a53ed-textile-auxiliary-dealers-1-m5o87.jpg",
          description: "Sodium hydroxide for mercerizing and alkaline processing.",
          featured: false,
          chemicalFormula: "NaOH",
          casNumber: "1310-73-2",
          hsCode: "2815.11",
          purity: "50.0%",
          applications: ["Mercerizing", "Scouring", "Degumming", "Alkaline processing"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Miscible with water",
            ph: "14.0"
          },
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Highly corrosive", "Causes severe burns", "Use full protection"],
          price: "₹32/L",
          rating: 4.1,
          reviews: 123
        },
        {
          id: baseId + 12,
          name: "Wetting Agent",
          category: "Textile",
          subcategory: "Auxiliaries",
          image: "https://content.jdmagicbox.com/comp/def_content_category/textile-auxiliary-dealers/4bdc0a53ed-textile-auxiliary-dealers-1-m5o87.jpg",
          description: "Surfactant for improving wetting and penetration in textile processing.",
          featured: false,
          chemicalFormula: "Proprietary blend",
          casNumber: "Various",
          hsCode: "3402.90",
          purity: "100.0%",
          applications: ["Wetting improvement", "Penetration aid", "Scouring", "Dyeing auxiliary"],
          specifications: {
            appearance: "Clear to amber liquid",
            solubility: "Miscible with water",
            ph: "6.0-8.0"
          },
          packaging: ["25L drums", "200L drums"],
          safetyInfo: ["Improves processing", "Biodegradable", "Low toxicity"],
          price: "₹120/L",
          rating: 4.4,
          reviews: 89
        },
        {
          id: baseId + 13,
          name: "Sequestering Agent",
          category: "Textile",
          subcategory: "Auxiliaries",
          image: "https://content.jdmagicbox.com/comp/def_content_category/textile-auxiliary-dealers/4bdc0a53ed-textile-auxiliary-dealers-1-m5o87.jpg",
          description: "Chelating agent for removing metal ions in textile processing.",
          featured: false,
          chemicalFormula: "C₁₀H₁₆N₂O₈",
          casNumber: "60-00-4",
          hsCode: "2922.49",
          purity: "40.0%",
          applications: ["Metal ion removal", "Water conditioning", "Bleaching aid", "Dyeing improvement"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Miscible with water",
            ph: "4.0-6.0"
          },
          packaging: ["25L drums", "200L drums"],
          safetyInfo: ["Prevents metal interference", "Improves color quality", "Stable in alkaline conditions"],
          price: "₹180/L",
          rating: 4.5,
          reviews: 67
        },
        {
          id: baseId + 14,
          name: "Leveling Agent",
          category: "Textile",
          subcategory: "Auxiliaries",
          image: "https://content.jdmagicbox.com/comp/def_content_category/textile-auxiliary-dealers/4bdc0a53ed-textile-auxiliary-dealers-1-m5o87.jpg",
          description: "Dyeing auxiliary for uniform color distribution and leveling.",
          featured: false,
          chemicalFormula: "Proprietary blend",
          casNumber: "Various",
          hsCode: "3824.90",
          purity: "100.0%",
          applications: ["Uniform dyeing", "Color leveling", "Migration control", "Shade consistency"],
          specifications: {
            appearance: "Clear to pale yellow liquid",
            solubility: "Miscible with water",
            ph: "6.0-8.0"
          },
          packaging: ["25L drums", "200L drums"],
          safetyInfo: ["Improves dye uniformity", "Reduces shade variation", "Compatible with most dyes"],
          price: "₹220/L",
          rating: 4.6,
          reviews: 78
        },
        {
          id: baseId + 15,
          name: "Fixing Agent",
          category: "Textile",
          subcategory: "Auxiliaries",
          image: "https://content.jdmagicbox.com/comp/def_content_category/textile-auxiliary-dealers/4bdc0a53ed-textile-auxiliary-dealers-1-m5o87.jpg",
          description: "Chemical for improving color fastness and dye fixation.",
          featured: false,
          chemicalFormula: "Cationic polymer",
          casNumber: "Various",
          hsCode: "3824.90",
          purity: "20.0%",
          applications: ["Color fastness improvement", "Dye fixation", "Wash fastness", "Crocking resistance"],
          specifications: {
            appearance: "Clear to pale yellow liquid",
            solubility: "Miscible with water",
            ph: "3.0-5.0"
          },
          packaging: ["25L drums", "200L drums"],
          safetyInfo: ["Improves fastness properties", "Cationic nature", "Handle with care"],
          price: "₹280/L",
          rating: 4.4,
          reviews: 65
        },
        {
          id: baseId + 16,
          name: "Softening Agent",
          category: "Textile",
          subcategory: "Finishing Chemicals",
          image: "https://content.jdmagicbox.com/comp/def_content_category/textile-auxiliary-dealers/4bdc0a53ed-textile-auxiliary-dealers-1-m5o87.jpg",
          description: "Silicone-based softener for improved fabric hand and feel.",
          featured: false,
          chemicalFormula: "Silicone emulsion",
          casNumber: "Various",
          hsCode: "3824.90",
          purity: "30.0%",
          applications: ["Fabric softening", "Hand improvement", "Drape enhancement", "Comfort finishing"],
          specifications: {
            appearance: "White emulsion",
            solubility: "Dispersible in water",
            ph: "6.0-8.0"
          },
          packaging: ["25L drums", "200L drums"],
          safetyInfo: ["Improves fabric feel", "Durable softness", "Compatible with other finishes"],
          price: "₹150/L",
          rating: 4.5,
          reviews: 92
        },
        {
          id: baseId + 17,
          name: "Anti-wrinkle Agent",
          category: "Textile",
          subcategory: "Finishing Chemicals",
          image: "https://content.jdmagicbox.com/comp/def_content_category/textile-auxiliary-dealers/4bdc0a53ed-textile-auxiliary-dealers-1-m5o87.jpg",
          description: "Resin-based finish for wrinkle resistance and easy care properties.",
          featured: false,
          chemicalFormula: "Formaldehyde-free resin",
          casNumber: "Various",
          hsCode: "3824.90",
          purity: "40.0%",
          applications: ["Wrinkle resistance", "Easy care finishing", "Dimensional stability", "Crease recovery"],
          specifications: {
            appearance: "Clear to pale yellow liquid",
            solubility: "Miscible with water",
            ph: "4.0-6.0"
          },
          packaging: ["25L drums", "200L drums"],
          safetyInfo: ["Formaldehyde-free", "Durable finish", "Improves care properties"],
          price: "₹320/L",
          rating: 4.3,
          reviews: 76
        },
        {
          id: baseId + 18,
          name: "Water Repellent",
          category: "Textile",
          subcategory: "Finishing Chemicals",
          image: "https://content.jdmagicbox.com/comp/def_content_category/textile-auxiliary-dealers/4bdc0a53ed-textile-auxiliary-dealers-1-m5o87.jpg",
          description: "Fluorine-free water repellent finish for outdoor textiles.",
          featured: false,
          chemicalFormula: "Silicone-based",
          casNumber: "Various",
          hsCode: "3824.90",
          purity: "25.0%",
          applications: ["Water repellency", "Outdoor textiles", "Protective clothing", "Technical textiles"],
          specifications: {
            appearance: "Milky white emulsion",
            solubility: "Dispersible in water",
            ph: "6.0-8.0"
          },
          packaging: ["25L drums", "200L drums"],
          safetyInfo: ["Fluorine-free", "Environmentally acceptable", "Durable water repellency"],
          price: "₹450/L",
          rating: 4.6,
          reviews: 54
        },
        {
          id: baseId + 19,
          name: "Flame Retardant",
          category: "Textile",
          subcategory: "Finishing Chemicals",
          image: "https://content.jdmagicbox.com/comp/def_content_category/textile-auxiliary-dealers/4bdc0a53ed-textile-auxiliary-dealers-1-m5o87.jpg",
          description: "Halogen-free flame retardant for protective textile applications.",
          featured: false,
          chemicalFormula: "Phosphorus-based",
          casNumber: "Various",
          hsCode: "3824.90",
          purity: "50.0%",
          applications: ["Flame retardancy", "Protective clothing", "Home textiles", "Technical textiles"],
          specifications: {
            appearance: "Clear to pale yellow liquid",
            solubility: "Miscible with water",
            ph: "5.0-7.0"
          },
          packaging: ["25L drums", "200L drums"],
          safetyInfo: ["Halogen-free", "Meets safety standards", "Durable finish"],
          price: "₹680/L",
          rating: 4.4,
          reviews: 43
        },
        {
          id: baseId + 20,
          name: "Antimicrobial Agent",
          category: "Textile",
          subcategory: "Finishing Chemicals",
          image: "https://content.jdmagicbox.com/comp/def_content_category/textile-auxiliary-dealers/4bdc0a53ed-textile-auxiliary-dealers-1-m5o87.jpg",
          description: "Silver-based antimicrobial finish for hygiene textiles.",
          featured: false,
          chemicalFormula: "Silver ion complex",
          casNumber: "Various",
          hsCode: "3824.90",
          purity: "10.0%",
          applications: ["Antimicrobial protection", "Medical textiles", "Sportswear", "Hygiene products"],
          specifications: {
            appearance: "Clear to light blue liquid",
            solubility: "Miscible with water",
            ph: "6.0-8.0"
          },
          packaging: ["25L drums", "200L drums"],
          safetyInfo: ["Broad spectrum activity", "Long-lasting protection", "Safe for skin contact"],
          price: "₹850/L",
          rating: 4.7,
          reviews: 67
        }
      ];
    } else if (category === "Home Care") {
      // 20 Home Care Products
      return [
        {
          id: baseId + 1,
          name: "Sodium Lauryl Sulfate (SLS)",
          category: "Home Care",
          subcategory: "Surfactants",
          image: "https://images.pexels.com/photos/4110601/pexels-photo-4110601.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Primary surfactant for high-foaming cleaning products.",
          featured: false,
          chemicalFormula: "C₁₂H₂₅SO₄Na",
          casNumber: "151-21-3",
          hsCode: "3402.11",
          purity: "95.0%",
          applications: ["Dishwashing liquid", "Laundry detergent", "All-purpose cleaners", "Car wash"],
          specifications: {
            appearance: "White powder",
            solubility: "Soluble in water",
            ph: "9.5-10.5"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["High foaming", "Effective degreasing", "Biodegradable"],
          price: "₹95/kg",
          rating: 4.4,
          reviews: 123
        },
        {
          id: baseId + 2,
          name: "Linear Alkylbenzene Sulfonic Acid (LABSA)",
          category: "Home Care",
          subcategory: "Surfactants",
          image: "https://images.pexels.com/photos/4110602/pexels-photo-4110602.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Anionic surfactant for heavy-duty cleaning applications.",
          featured: false,
          chemicalFormula: "C₁₈H₂₉SO₃H",
          casNumber: "27176-87-0",
          hsCode: "3402.11",
          purity: "96.0%",
          applications: ["Laundry powder", "Liquid detergent", "Industrial cleaners", "Toilet cleaners"],
          specifications: {
            appearance: "Brown viscous liquid",
            solubility: "Soluble in water",
            ph: "1.0-2.0"
          },
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Corrosive", "Excellent cleaning power", "Handle with care"],
          price: "₹65/L",
          rating: 4.5,
          reviews: 156
        },
        {
          id: baseId + 3,
          name: "Sodium Tripolyphosphate (STPP)",
          category: "Home Care",
          subcategory: "Builders",
          image: "https://images.pexels.com/photos/4110603/pexels-photo-4110603.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Water softener and detergent builder for enhanced cleaning.",
          featured: false,
          chemicalFormula: "Na₅P₃O₁₀",
          casNumber: "7758-29-4",
          hsCode: "2835.31",
          purity: "94.0%",
          applications: ["Laundry detergent", "Dishwashing powder", "Industrial cleaners", "Water treatment"],
          specifications: {
            appearance: "White granular powder",
            solubility: "Soluble in water",
            ph: "9.5-10.0"
          },
          packaging: ["25kg bags", "500kg big bags", "1000kg big bags"],
          safetyInfo: ["Water softening properties", "Enhances cleaning", "Phosphate-based"],
          price: "₹45/kg",
          rating: 4.3,
          reviews: 98
        },
        {
          id: baseId + 4,
          name: "Sodium Carbonate (Soda Ash)",
          category: "Home Care",
          subcategory: "Builders",
          image: "https://images.pexels.com/photos/4110604/pexels-photo-4110604.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Alkaline builder for grease removal and water softening.",
          featured: false,
          chemicalFormula: "Na₂CO₃",
          casNumber: "497-19-8",
          hsCode: "2836.20",
          purity: "99.2%",
          applications: ["Laundry detergent", "All-purpose cleaners", "Oven cleaners", "Degreasing"],
          specifications: {
            appearance: "White crystalline powder",
            solubility: "Soluble in water",
            ph: "11.0-12.0"
          },
          packaging: ["25kg bags", "500kg big bags", "1000kg big bags"],
          safetyInfo: ["Alkaline", "Effective degreaser", "Store in dry place"],
          price: "₹18/kg",
          rating: 4.4,
          reviews: 167
        },
        {
          id: baseId + 5,
          name: "Citric Acid Monohydrate",
          category: "Home Care",
          subcategory: "Acidulants",
          image: "https://images.pexels.com/photos/4110605/pexels-photo-4110605.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Natural acid for descaling and limescale removal.",
          featured: false,
          chemicalFormula: "C₆H₈O₇·H₂O",
          casNumber: "5949-29-1",
          hsCode: "2918.14",
          purity: "99.5%",
          applications: ["Descaling agents", "Toilet bowl cleaners", "Dishwasher rinse aid", "Limescale removers"],
          specifications: {
            appearance: "White crystalline powder",
            solubility: "Freely soluble in water",
            ph: "1.8-2.1"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Natural acid", "Biodegradable", "Food grade available"],
          price: "₹55/kg",
          rating: 4.6,
          reviews: 134
        },
        {
          id: baseId + 6,
          name: "Sodium Hypochlorite",
          category: "Home Care",
          subcategory: "Bleaches",
          image: "https://5.imimg.com/data5/SELLER/Default/2023/10/351523658/UT/NP/JG/143402947/homecare-products.jpg",
          description: "Liquid bleach for disinfection and stain removal.",
          featured: false,
          chemicalFormula: "NaClO",
          casNumber: "7681-52-9",
          hsCode: "2828.90",
          purity: "5.0%",
          applications: ["Household bleach", "Toilet cleaners", "Mold removers", "Disinfectants"],
          specifications: {
            appearance: "Pale yellow liquid",
            solubility: "Soluble in water",
            ph: "11.0-13.0"
          },
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Oxidizing agent", "Effective disinfectant", "Keep away from acids"],
          price: "₹18/L",
          rating: 4.2,
          reviews: 189
        },
        {
          id: baseId + 7,
          name: "Hydrogen Peroxide",
          category: "Home Care",
          subcategory: "Bleaches",
          image: "https://5.imimg.com/data5/SELLER/Default/2023/10/351523658/UT/NP/JG/143402947/homecare-products.jpg",
          description: "Oxygen bleach for color-safe cleaning and disinfection.",
          featured: false,
          chemicalFormula: "H₂O₂",
          casNumber: "7722-84-1",
          hsCode: "2847.00",
          purity: "35.0%",
          applications: ["Oxygen bleach", "Stain removers", "Disinfectants", "Carpet cleaners"],
          specifications: {
            appearance: "Clear colorless liquid",
            solubility: "Miscible with water",
            ph: "3.0-4.0"
          },
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Environmentally friendly", "Color-safe bleaching", "Store in cool place"],
          price: "₹45/L",
          rating: 4.5,
          reviews: 112
        },
        {
          id: baseId + 8,
          name: "Sodium Percarbonate",
          category: "Home Care",
          subcategory: "Bleaches",
          image: "https://5.imimg.com/data5/SELLER/Default/2023/10/351523658/UT/NP/JG/143402947/homecare-products.jpg",
          description: "Solid oxygen bleach for laundry and cleaning applications.",
          featured: false,
          chemicalFormula: "2Na₂CO₃·3H₂O₂",
          casNumber: "15630-89-4",
          hsCode: "2847.00",
          purity: "13.0%",
          applications: ["Laundry bleach", "Stain removers", "Denture cleaners", "Carpet cleaners"],
          specifications: {
            appearance: "White granular powder",
            solubility: "Soluble in water",
            ph: "10.0-11.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Oxygen-based", "Color-safe", "Environmentally friendly"],
          price: "₹85/kg",
          rating: 4.4,
          reviews: 87
        },
        {
          id: baseId + 9,
          name: "Cocamidopropyl Betaine",
          category: "Home Care",
          subcategory: "Mild Surfactants",
          image: "https://5.imimg.com/data5/SELLER/Default/2023/10/351523658/UT/NP/JG/143402947/homecare-products.jpg",
          description: "Mild amphoteric surfactant for gentle cleaning products.",
          featured: false,
          chemicalFormula: "C₁₉H₃₈N₂O₃",
          casNumber: "61789-40-0",
          hsCode: "3402.13",
          purity: "30.0%",
          applications: ["Baby shampoo", "Gentle cleaners", "Hand soap", "Sensitive skin products"],
          specifications: {
            appearance: "Clear to pale yellow liquid",
            solubility: "Soluble in water",
            ph: "4.0-6.0"
          },
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Very mild", "Suitable for sensitive skin", "Good foam stability"],
          price: "₹120/L",
          rating: 4.6,
          reviews: 76
        },
        {
          id: baseId + 10,
          name: "Alcohol Ethoxylate",
          category: "Home Care",
          subcategory: "Non-ionic Surfactants",
          image: "https://5.imimg.com/data5/SELLER/Default/2023/10/351523658/UT/NP/JG/143402947/homecare-products.jpg",
          description: "Non-ionic surfactant for low-foaming cleaning applications.",
          featured: false,
          chemicalFormula: "C₁₂H₂₅(OCH₂CH₂)ₙOH",
          casNumber: "68131-39-5",
          hsCode: "3402.13",
          purity: "100.0%",
          applications: ["Automatic dishwashing", "Machine wash detergent", "Hard surface cleaners", "Degreasers"],
          specifications: {
            appearance: "Clear to hazy liquid",
            solubility: "Soluble in water",
            ph: "6.0-8.0"
          },
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Low foaming", "Excellent wetting", "Biodegradable"],
          price: "₹95/L",
          rating: 4.3,
          reviews: 89
        },
        {
          id: baseId + 11,
          name: "Sodium Silicate",
          category: "Home Care",
          subcategory: "Builders",
          image: "https://5.imimg.com/data5/SELLER/Default/2023/10/351523658/UT/NP/JG/143402947/homecare-products.jpg",
          description: "Alkaline builder and corrosion inhibitor for detergents.",
          featured: false,
          chemicalFormula: "Na₂SiO₃",
          casNumber: "1344-09-8",
          hsCode: "2839.19",
          purity: "37.0%",
          applications: ["Laundry detergent", "Dishwashing powder", "Metal cleaners", "Corrosion inhibition"],
          specifications: {
            appearance: "Clear viscous liquid",
            solubility: "Soluble in water",
            ph: "11.0-13.0"
          },
          packaging: ["25L drums", "200L drums", "1000L IBC tanks"],
          safetyInfo: ["Alkaline", "Corrosion inhibitor", "Handle with care"],
          price: "₹28/L",
          rating: 4.2,
          reviews: 67
        },
        {
          id: baseId + 12,
          name: "Zeolite A",
          category: "Home Care",
          subcategory: "Builders",
          image: "https://5.imimg.com/data5/SELLER/Default/2023/10/351523658/UT/NP/JG/143402947/homecare-products.jpg",
          description: "Phosphate-free builder for environmentally friendly detergents.",
          featured: false,
          chemicalFormula: "Na₁₂Al₁₂Si₁₂O₄₈·27H₂O",
          casNumber: "1318-02-1",
          hsCode: "2842.10",
          purity: "85.0%",
          applications: ["Phosphate-free detergent", "Water softening", "Ion exchange", "Eco-friendly cleaners"],
          specifications: {
            appearance: "White powder",
            solubility: "Insoluble in water",
            ph: "10.0-11.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Phosphate-free", "Environmentally friendly", "Effective water softener"],
          price: "₹35/kg",
          rating: 4.5,
          reviews: 94
        },
        {
          id: baseId + 13,
          name: "Optical Brightening Agent",
          category: "Home Care",
          subcategory: "Additives",
          image: "https://5.imimg.com/data5/SELLER/Default/2023/10/351523658/UT/NP/JG/143402947/homecare-products.jpg",
          description: "Fluorescent whitening agent for fabric brightness enhancement.",
          featured: false,
          chemicalFormula: "C₂₈H₂₀N₂O₆S₂Na₂",
          casNumber: "16470-24-9",
          hsCode: "3204.20",
          purity: "85.0%",
          applications: ["Laundry detergent", "Fabric softener", "Whitening products", "Textile care"],
          specifications: {
            appearance: "Yellowish powder",
            solubility: "Soluble in water",
            ph: "7.0-9.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Enhances whiteness", "UV-activated", "Effective at low concentrations"],
          price: "₹450/kg",
          rating: 4.4,
          reviews: 78
        },
        {
          id: baseId + 14,
          name: "Enzymes (Protease)",
          category: "Home Care",
          subcategory: "Enzymes",
          image: "https://5.imimg.com/data5/SELLER/Default/2023/10/351523658/UT/NP/JG/143402947/homecare-products.jpg",
          description: "Protein-degrading enzyme for stain removal and cleaning.",
          featured: false,
          chemicalFormula: "Enzyme protein",
          casNumber: "9014-01-1",
          hsCode: "3507.90",
          purity: "4.0%",
          applications: ["Laundry detergent", "Stain removers", "Pre-wash treatments", "Protein stain removal"],
          specifications: {
            appearance: "Light brown granules",
            solubility: "Dispersible in water",
            ph: "6.0-9.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Biodegradable", "Effective on protein stains", "Temperature sensitive"],
          price: "₹280/kg",
          rating: 4.6,
          reviews: 89
        },
        {
          id: baseId + 15,
          name: "Enzymes (Lipase)",
          category: "Home Care",
          subcategory: "Enzymes",
          image: "https://5.imimg.com/data5/SELLER/Default/2023/10/351523658/UT/NP/JG/143402947/homecare-products.jpg",
          description: "Fat-degrading enzyme for grease and oil stain removal.",
          featured: false,
          chemicalFormula: "Enzyme protein",
          casNumber: "9001-62-1",
          hsCode: "3507.90",
          purity: "20.0%",
          applications: ["Laundry detergent", "Grease removers", "Kitchen cleaners", "Oil stain treatment"],
          specifications: {
            appearance: "Light brown liquid",
            solubility: "Miscible with water",
            ph: "6.0-8.0"
          },
          packaging: ["25L drums", "200L drums"],
          safetyInfo: ["Biodegradable", "Effective on grease stains", "Environmentally friendly"],
          price: "₹320/L",
          rating: 4.5,
          reviews: 67
        },
        {
          id: baseId + 16,
          name: "Fragrance",
          category: "Home Care",
          subcategory: "Additives",
          image: "https://5.imimg.com/data5/SELLER/Default/2023/10/351523658/UT/NP/JG/143402947/homecare-products.jpg",
          description: "Pleasant fragrance blend for home care products.",
          featured: false,
          chemicalFormula: "Proprietary blend",
          casNumber: "Various",
          hsCode: "3302.90",
          purity: "100.0%",
          applications: ["Laundry detergent", "Fabric softener", "All-purpose cleaners", "Air fresheners"],
          specifications: {
            appearance: "Clear to pale yellow liquid",
            solubility: "Oil soluble",
            ph: "N/A"
          },
          packaging: ["1L bottles", "25L drums"],
          safetyInfo: ["Pleasant scent", "Long-lasting fragrance", "Allergen-free options available"],
          price: "₹850/L",
          rating: 4.3,
          reviews: 156
        },
        {
          id: baseId + 17,
          name: "Colorant (Blue)",
          category: "Home Care",
          subcategory: "Additives",
          image: "https://5.imimg.com/data5/SELLER/Default/2023/10/351523658/UT/NP/JG/143402947/homecare-products.jpg",
          description: "Blue colorant for product identification and aesthetics.",
          featured: false,
          chemicalFormula: "C₃₇H₃₄N₂Na₂O₉S₃",
          casNumber: "3844-45-9",
          hsCode: "3204.17",
          purity: "85.0%",
          applications: ["Liquid detergent", "Toilet bowl cleaners", "Glass cleaners", "Product coloring"],
          specifications: {
            appearance: "Blue powder",
            solubility: "Soluble in water",
            ph: "6.0-8.0"
          },
          packaging: ["1kg containers", "25kg drums"],
          safetyInfo: ["Food grade available", "Stable color", "Light-fast"],
          price: "₹380/kg",
          rating: 4.2,
          reviews: 54
        },
        {
          id: baseId + 18,
          name: "Preservative",
          category: "Home Care",
          subcategory: "Additives",
          image: "https://5.imimg.com/data5/SELLER/Default/2023/10/351523658/UT/NP/JG/143402947/homecare-products.jpg",
          description: "Broad-spectrum preservative for product stability.",
          featured: false,
          chemicalFormula: "C₁₁H₁₅NO₂",
          casNumber: "55406-53-6",
          hsCode: "2933.99",
          purity: "98.0%",
          applications: ["Liquid detergent", "Fabric softener", "Shampoo", "Cleaning products"],
          specifications: {
            appearance: "White crystalline powder",
            solubility: "Slightly soluble in water",
            ph: "6.0-8.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Effective preservation", "Broad spectrum", "Low usage level"],
          price: "₹450/kg",
          rating: 4.4,
          reviews: 73
        },
        {
          id: baseId + 19,
          name: "Thickener (Salt)",
          category: "Home Care",
          subcategory: "Rheology Modifiers",
          image: "https://5.imimg.com/data5/SELLER/Default/2023/10/351523658/UT/NP/JG/143402947/homecare-products.jpg",
          description: "Sodium chloride for thickening liquid cleaning products.",
          featured: false,
          chemicalFormula: "NaCl",
          casNumber: "7647-14-5",
          hsCode: "2501.00",
          purity: "99.5%",
          applications: ["Liquid detergent thickening", "Shampoo viscosity", "Han soap thickening", "Gel formation"],
          specifications: {
            appearance: "White crystals",
            solubility: "Soluble in water",
            ph: "7.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Safe thickener", "Cost-effective", "Easy to use"],
          price: "₹12/kg",
          rating: 4.3,
          reviews: 167
        },
        {
          id: baseId + 20,
          name: "Anti-redeposition Agent",
          category: "Home Care",
          subcategory: "Additives",
          image: "https://5.imimg.com/data5/SELLER/Default/2023/10/351523658/UT/NP/JG/143402947/homecare-products.jpg",
          description: "Polymer for preventing soil redeposition during washing.",
          featured: false,
          chemicalFormula: "Carboxymethyl cellulose",
          casNumber: "9000-11-7",
          hsCode: "3912.31",
          purity: "95.0%",
          applications: ["Laundry detergent", "Fabric care", "Soil suspension", "Whiteness maintenance"],
          specifications: {
            appearance: "White to cream powder",
            solubility: "Soluble in water",
            ph: "6.5-8.5"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Prevents graying", "Maintains whiteness", "Biodegradable"],
          price: "₹180/kg",
          rating: 4.5,
          reviews: 89
        }
      ];
    } else if (category === "Agriculture") {
      // 20 Agriculture Products
      return [
        {
          id: baseId + 1,
          name: "NPK Fertilizer Complex",
          category: "Agriculture",
          subcategory: "Fertilizers",
          image: "https://images.pexels.com/photos/4110701/pexels-photo-4110701.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Balanced NPK fertilizer for comprehensive plant nutrition.",
          featured: false,
          chemicalFormula: "N-P₂O₅-K₂O",
          casNumber: "Various",
          hsCode: "3105.20",
          purity: "NPK 19:19:19",
          applications: ["Field crops", "Vegetables", "Fruits", "Ornamental plants"],
          specifications: {
            appearance: "Granular",
            solubility: "Soluble in water",
            ph: "6.0-7.0"
          },
          packaging: ["50kg bags", "1000kg big bags"],
          safetyInfo: ["Balanced nutrition", "Slow release available", "Suitable for all crops"],
          price: "₹28/kg",
          rating: 4.5,
          reviews: 234
        },
        {
          id: baseId + 2,
          name: "Urea Fertilizer",
          category: "Agriculture",
          subcategory: "Nitrogen Fertilizers",
          image: "https://images.pexels.com/photos/4110702/pexels-photo-4110702.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "High-nitrogen fertilizer for rapid plant growth and green foliage.",
          featured: false,
          chemicalFormula: "CH₄N₂O",
          casNumber: "57-13-6",
          hsCode: "3102.10",
          purity: "46.0%",
          applications: ["Cereals", "Sugarcane", "Cotton", "Vegetables"],
          specifications: {
            appearance: "White granules",
            solubility: "Freely soluble in water",
            ph: "7.0-9.0"
          },
          packaging: ["50kg bags", "1000kg big bags"],
          safetyInfo: ["High nitrogen content", "Quick acting", "Store in dry place"],
          price: "₹18/kg",
          rating: 4.6,
          reviews: 345
        },
        {
          id: baseId + 3,
          name: "Potassium Sulfate",
          category: "Agriculture",
          subcategory: "Potassium Fertilizers",
          image: "https://images.pexels.com/photos/4110703/pexels-photo-4110703.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Premium potassium fertilizer for fruit quality and disease resistance.",
          featured: false,
          chemicalFormula: "K₂SO₄",
          casNumber: "7778-80-5",
          hsCode: "3104.20",
          purity: "50.0%",
          applications: ["Fruits", "Vegetables", "Tobacco", "Potatoes"],
          specifications: {
            appearance: "White crystalline granules",
            solubility: "Soluble in water",
            ph: "5.5-7.0"
          },
          packaging: ["50kg bags", "1000kg big bags"],
          safetyInfo: ["Chloride-free", "Improves fruit quality", "Enhances disease resistance"],
          price: "₹45/kg",
          rating: 4.4,
          reviews: 167
        },
        {
          id: baseId + 4,
          name: "Calcium Nitrate",
          category: "Agriculture",
          subcategory: "Calcium Fertilizers",
          image: "https://images.pexels.com/photos/4110704/pexels-photo-4110704.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Water-soluble calcium and nitrogen fertilizer for greenhouse crops.",
          featured: false,
          chemicalFormula: "Ca(NO₃)₂·4H₂O",
          casNumber: "13477-34-4",
          hsCode: "3102.60",
          purity: "15.5%",
          applications: ["Greenhouse crops", "Hydroponics", "Tomatoes", "Peppers"],
          specifications: {
            appearance: "White granules",
            solubility: "Freely soluble in water",
            ph: "6.0-7.0"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Prevents blossom end rot", "Improves cell wall strength", "Fully water soluble"],
          price: "₹35/kg",
          rating: 4.7,
          reviews: 123
        },
        {
          id: baseId + 5,
          name: "Magnesium Sulfate (Epsom Salt)",
          category: "Agriculture",
          subcategory: "Secondary Nutrients",
          image: "https://images.pexels.com/photos/4110705/pexels-photo-4110705.jpeg?auto=compress&cs=tinysrgb&w=800",
          description: "Essential magnesium and sulfur supplement for chlorophyll production.",
          featured: false,
          chemicalFormula: "MgSO₄·7H₂O",
          casNumber: "10034-99-8",
          hsCode: "2833.21",
          purity: "99.0%",
          applications: ["Citrus", "Tomatoes", "Peppers", "Roses"],
          specifications: {
            appearance: "White crystalline powder",
            solubility: "Freely soluble in water",
            ph: "5.5-6.5"
          },
          packaging: ["25kg bags", "500kg big bags"],
          safetyInfo: ["Prevents magnesium deficiency", "Improves chlorophyll", "Safe for organic farming"],
          price: "₹22/kg",
          rating: 4.5,
          reviews: 189
        },
        {
          id: baseId + 6,
          name: "Glyphosate",
          category: "Agriculture",
          subcategory: "Herbicides",
          image: "https://www.pcaplindia.com/images/banner5.jpg",
          description: "Broad-spectrum systemic herbicide for weed control.",
          featured: false,
          chemicalFormula: "C₃H₈NO₅P",
          casNumber: "1071-83-6",
          hsCode: "3808.93",
          purity: "41.0%",
          applications: ["Pre-planting", "Post-harvest", "Non-crop areas", "Aquatic weeds"],
          specifications: {
            appearance: "Clear amber liquid",
            solubility: "Miscible with water",
            ph: "4.5-5.5"
          },
          packaging: ["1L bottles", "20L drums", "200L drums"],
          safetyInfo: ["Systemic action", "Use protective equipment", "Follow label instructions"],
          price: "₹180/L",
          rating: 4.2,
          reviews: 298
        },
        {
          id: baseId + 7,
          name: "2,4-D Amine",
          category: "Agriculture",
          subcategory: "Herbicides",
          image: "https://www.pcaplindia.com/images/banner5.jpg",
          description: "Selective herbicide for broadleaf weed control in cereals.",
          featured: false,
          chemicalFormula: "C₈H₆Cl₂O₃",
          casNumber: "94-75-7",
          hsCode: "3808.93",
          purity: "58.0%",
          applications: ["Wheat", "Rice", "Maize", "Sugarcane"],
          specifications: {
            appearance: "Clear liquid",
            solubility: "Miscible with water",
            ph: "7.0-9.0"
          },
          packaging: ["1L bottles", "20L drums"],
          safetyInfo: ["Selective action", "Hormone-type herbicide", "Use recommended dosage"],
          price: "₹120/L",
          rating: 4.3,
          reviews: 156
        },
        {
          id: baseId + 8,
          name: "Atrazine",
          category: "Agriculture",
          subcategory: "Herbicides",
          image: "https://www.pcaplindia.com/images/banner5.jpg",
          description: "Pre and post-emergence herbicide for maize and sugarcane.",
          featured: false,
          chemicalFormula: "C₈H₁₄ClN₅",
          casNumber: "1912-24-9",
          hsCode: "3808.93",
          purity: "50.0%",
          applications: ["Maize", "Sugarcane", "Sorghum", "Non-crop areas"],
          specifications: {
            appearance: "White suspension",
            solubility: "Dispersible in water",
            ph: "6.0-8.0"
          },
          packaging: ["1L bottles", "20L drums"],
          safetyInfo: ["Residual activity", "Soil applied", "Follow resistance management"],
          price: "₹95/L",
          rating: 4.1,
          reviews: 134
        },
        {
          id: baseId + 9,
          name: "Chlorpyrifos",
          category: "Agriculture",
          subcategory: "Insecticides",
          image: "https://www.pcaplindia.com/images/banner5.jpg",
          description: "Broad-spectrum organophosphate insecticide for soil and foliar pests.",
          featured: false,
          chemicalFormula: "C₉H₁₁Cl₃NO₃PS",
          casNumber: "2921-88-2",
          hsCode: "3808.91",
          purity: "20.0%",
          applications: ["Soil insects", "Termites", "Aphids", "Caterpillars"],
          specifications: {
            appearance: "Yellow liquid",
            solubility: "Emulsifiable in water",
            ph: "6.0-8.0"
          },
          packaging: ["1L bottles", "5L containers", "20L drums"],
          safetyInfo: ["Broad spectrum", "Systemic action", "Use protective equipment"],
          price: "₹280/L",
          rating: 4.4,
          reviews: 187
        },
        {
          id: baseId + 10,
          name: "Imidacloprid",
          category: "Agriculture",
          subcategory: "Insecticides",
          image: "https://www.pcaplindia.com/images/banner5.jpg",
          description: "Systemic neonicotinoid insecticide for sucking pests.",
          featured: false,
          chemicalFormula: "C₉H₁₀ClN₅O₂",
          casNumber: "138261-41-3",
          hsCode: "3808.91",
          purity: "17.8%",
          applications: ["Aphids", "Whiteflies", "Thrips", "Seed treatment"],
          specifications: {
            appearance: "Brown liquid",
            solubility: "Miscible with water",
            ph: "6.0-8.0"
          },
          packaging: ["100ml bottles", "1L bottles", "5L containers"],
          safetyInfo: ["Systemic action", "Long residual", "Bee safety precautions"],
          price: "₹450/L",
          rating: 4.6,
          reviews: 234
        },
        {
          id: baseId + 11,
          name: "Mancozeb",
          category: "Agriculture",
          subcategory: "Fungicides",
          image: "https://www.pcaplindia.com/images/banner5.jpg",
          description: "Protective fungicide for disease prevention in crops.",
          featured: false,
          chemicalFormula: "C₈H₁₂MnN₄S₈Zn",
          casNumber: "8018-01-7",
          hsCode: "3808.92",
          purity: "75.0%",
          applications: ["Late blight", "Downy mildew", "Anthracnose", "Leaf spots"],
          specifications: {
            appearance: "Gray powder",
            solubility: "Dispersible in water",
            ph: "6.0-8.0"
          },
          packaging: ["1kg bags", "25kg bags"],
          safetyInfo: ["Protective action", "Multi-site activity", "Resistance management"],
          price: "₹320/kg",
          rating: 4.3,
          reviews: 167
        },
        {
          id: baseId + 12,
          name: "Copper Oxychloride",
          category: "Agriculture",
          subcategory: "Fungicides",
          image: "https://www.pcaplindia.com/images/banner5.jpg",
          description: "Copper-based fungicide for bacterial and fungal diseases.",
          featured: false,
          chemicalFormula: "Cu₂Cl(OH)₃",
          casNumber: "1332-40-7",
          hsCode: "3808.92",
          purity: "50.0%",
          applications: ["Bacterial blight", "Citrus canker", "Coffee rust", "Potato blight"],
          specifications: {
            appearance: "Blue-green powder",
            solubility: "Dispersible in water",
            ph: "7.0-9.0"
          },
          packaging: ["1kg bags", "25kg bags"],
          safetyInfo: ["Broad spectrum", "Organic approved", "Phytotoxicity risk"],
          price: "₹180/kg",
          rating: 4.2,
          reviews: 145
        },
        {
          id: baseId + 13,
          name: "Humic Acid",
          category: "Agriculture",
          subcategory: "Soil Conditioners",
          image: "https://www.pcaplindia.com/images/banner5.jpg",
          description: "Organic soil conditioner for improved nutrient uptake.",
          featured: false,
          chemicalFormula: "Complex organic",
          casNumber: "1415-93-6",
          hsCode: "3824.99",
          purity: "85.0%",
          applications: ["Soil conditioning", "Nutrient chelation", "Root development", "Stress tolerance"],
          specifications: {
            appearance: "Dark brown powder",
            solubility: "Soluble in alkaline water",
            ph: "4.0-6.0"
          },
          packaging: ["1kg bags", "25kg bags"],
          safetyInfo: ["Organic origin", "Improves soil structure", "Enhances nutrient availability"],
          price: "₹85/kg",
          rating: 4.5,
          reviews: 198
        },
        {
          id: baseId + 14,
          name: "Seaweed Extract",
          category: "Agriculture",
          subcategory: "Biostimulants",
          image: "https://www.pcaplindia.com/images/banner5.jpg",
          description: "Natural plant growth stimulant from marine algae.",
          featured: false,
          chemicalFormula: "Natural extract",
          casNumber: "Various",
          hsCode: "2106.90",
          purity: "100.0%",
          applications: ["Growth promotion", "Stress tolerance", "Fruit setting", "Root development"],
          specifications: {
            appearance: "Dark brown liquid",
            solubility: "Miscible with water",
            ph: "8.0-10.0"
          },
          packaging: ["1L bottles", "5L containers", "20L drums"],
          safetyInfo: ["Natural origin", "Rich in growth hormones", "Environmentally safe"],
          price: "₹220/L",
          rating: 4.6,
          reviews: 156
        },
        {
          id: baseId + 15,
          name: "Amino Acid Complex",
          category: "Agriculture",
          subcategory: "Biostimulants",
          image: "https://www.pcaplindia.com/images/banner5.jpg",
          description: "Plant-derived amino acids for stress recovery and growth.",
          featured: false,
          chemicalFormula: "Mixed amino acids",
          casNumber: "Various",
          hsCode: "2106.90",
          purity: "40.0%",
          applications: ["Stress recovery", "Protein synthesis", "Enzyme activation", "Nutrient transport"],
          specifications: {
            appearance: "Brown liquid",
            solubility: "Miscible with water",
            ph: "5.0-7.0"
          },
          packaging: ["1L bottles", "5L containers"],
          safetyInfo: ["Natural amino acids", "Rapid absorption", "Compatible with fertilizers"],
          price: "₹180/L",
          rating: 4.4,
          reviews: 123
        },
        {
          id: baseId + 16,
          name: "Trichoderma Viride",
          category: "Agriculture",
          subcategory: "Biological Control",
          image: "https://www.pcaplindia.com/images/banner5.jpg",
          description: "Beneficial fungus for biological disease control.",
          featured: false,
          chemicalFormula: "Living organism",
          casNumber: "N/A",
          hsCode: "3002.90",
          purity: "10⁸ CFU/g",
          applications: ["Root rot control", "Soil health", "Seed treatment", "Organic farming"],
          specifications: {
            appearance: "Brown powder",
            solubility: "Dispersible in water",
            ph: "6.0-8.0"
          },
          packaging: ["1kg bags", "25kg bags"],
          safetyInfo: ["Beneficial microorganism", "Organic approved", "Environmentally safe"],
          price: "₹120/kg",
          rating: 4.7,
          reviews: 189
        },
        {
          id: baseId + 17,
          name: "Pseudomonas Fluorescens",
          category: "Agriculture",
          subcategory: "Biological Control",
          image: "https://www.pcaplindia.com/images/banner5.jpg",
          description: "Plant growth promoting rhizobacteria for disease suppression.",
          featured: false,
          chemicalFormula: "Living organism",
          casNumber: "N/A",
          hsCode: "3002.90",
          purity: "10⁸ CFU/g",
          applications: ["Disease suppression", "Growth promotion", "Root colonization", "Induced resistance"],
          specifications: {
            appearance: "Light brown powder",
            solubility: "Dispersible in water",
            ph: "6.5-7.5"
          },
          packaging: ["1kg bags", "25kg bags"],
          safetyInfo: ["Beneficial bacteria", "PGPR activity", "Safe for environment"],
          price: "₹95/kg",
          rating: 4.5,
          reviews: 134
        },
        {
          id: baseId + 18,
          name: "Neem Oil",
          category: "Agriculture",
          subcategory: "Botanical Pesticides",
          image: "https://www.pcaplindia.com/images/banner5.jpg",
          description: "Natural insecticide and fungicide from neem tree.",
          featured: false,
          chemicalFormula: "Natural oil",
          casNumber: "8002-65-1",
          hsCode: "1515.90",
          purity: "1500 ppm",
          applications: ["Aphids", "Whiteflies", "Powdery mildew", "Organic farming"],
          specifications: {
            appearance: "Yellow to brown oil",
            solubility: "Emulsifiable in water",
            ph: "N/A"
          },
          packaging: ["1L bottles", "5L containers", "20L drums"],
          safetyInfo: ["Natural origin", "Organic approved", "Safe for beneficial insects"],
          price: "₹85/L",
          rating: 4.3,
          reviews: 267
        },
        {
          id: baseId + 19,
          name: "Pheromone Traps",
          category: "Agriculture",
          subcategory: "IPM Tools",
          image: "https://www.pcaplindia.com/images/banner5.jpg",
          description: "Species-specific pheromone lures for pest monitoring.",
          featured: false,
          chemicalFormula: "Species-specific",
          casNumber: "Various",
          hsCode: "3808.99",
          purity: "Pure pheromone",
          applications: ["Pest monitoring", "Mass trapping", "Mating disruption", "IPM programs"],
          specifications: {
            appearance: "Rubber septa/lures",
            solubility: "N/A",
            ph: "N/A"
          },
          packaging: ["Individual lures", "Trap kits"],
          safetyInfo: ["Species-specific", "Environmentally safe", "No resistance development"],
          price: "₹25/lure",
          rating: 4.6,
          reviews: 98
        },
        {
          id: baseId + 20,
          name: "Sticky Traps",
          category: "Agriculture",
          subcategory: "IPM Tools",
          image: "https://www.pcaplindia.com/images/banner5.jpg",
          description: "Colored sticky traps for flying pest monitoring and control.",
          featured: false,
          chemicalFormula: "Adhesive polymer",
          casNumber: "Various",
          hsCode: "3919.90",
          purity: "N/A",
          applications: ["Whitefly monitoring", "Aphid detection", "Thrips control", "Greenhouse IPM"],
          specifications: {
            appearance: "Yellow/blue sticky cards",
            solubility: "N/A",
            ph: "N/A"
          },
          packaging: ["Packs of 10", "Packs of 100"],
          safetyInfo: ["Non-toxic", "Pesticide-free", "Easy to use"],
          price: "₹8/trap",
          rating: 4.4,
          reviews: 156
        }
      ];
    }
    
    return [];
  };

  useEffect(() => {
    const productId = parseInt(id || '1');
    const foundProduct = mainProducts.find(p => p.id === productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
      const categoryProducts = generateCategoryProducts(foundProduct.category);
      setRelatedProducts(categoryProducts);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="pt-24 pb-20">
        <div className="container-custom">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
            <Link to="/products" className="btn btn-primary px-8 py-3 rounded-md">
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
      <div className="bg-gray-50 py-4">
        <div className="container-custom">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/products" className="text-gray-500 hover:text-primary">Products</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-800">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div>
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Product Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
                {product.featured && (
                  <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-6">
                {product.rating && (
                  <div className="flex items-center">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={20} 
                          className={i < Math.floor(product.rating!) ? "text-yellow-400 fill-current" : "text-gray-300"} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">({product.reviews} reviews)</span>
                  </div>
                )}
                {product.price && (
                  <span className="text-2xl font-bold text-primary">{product.price}</span>
                )}
              </div>

              <p className="text-gray-600 text-lg mb-8">{product.description}</p>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {product.chemicalFormula && (
                  <div>
                    <span className="font-semibold text-gray-700">Formula:</span>
                    <p className="text-gray-600">{product.chemicalFormula}</p>
                  </div>
                )}
                {product.casNumber && (
                  <div>
                    <span className="font-semibold text-gray-700">CAS Number:</span>
                    <p className="text-gray-600">{product.casNumber}</p>
                  </div>
                )}
                {product.purity && (
                  <div>
                    <span className="font-semibold text-gray-700">Purity:</span>
                    <p className="text-gray-600">{product.purity}</p>
                  </div>
                )}
                {product.hsCode && (
                  <div>
                    <span className="font-semibold text-gray-700">HS Code:</span>
                    <p className="text-gray-600">{product.hsCode}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                <Link to="/contact" className="btn btn-primary px-8 py-3 rounded-md flex items-center justify-center">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Request Quote
                </Link>
                <button className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 px-8 py-3 rounded-md flex items-center justify-center">
                  <Download className="mr-2 h-5 w-5" />
                  Download Datasheet
                </button>
                <button className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 px-8 py-3 rounded-md flex items-center justify-center">
                  <Heart className="mr-2 h-5 w-5" />
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {['specifications', 'applications', 'packaging', 'safety'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            <div className="mt-8">
              {activeTab === 'specifications' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Physical Properties</h3>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="font-medium">Appearance:</dt>
                        <dd className="text-gray-600">{product.specifications.appearance}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium">Solubility:</dt>
                        <dd className="text-gray-600">{product.specifications.solubility}</dd>
                      </div>
                      {product.specifications.meltingPoint && (
                        <div className="flex justify-between">
                          <dt className="font-medium">Melting Point:</dt>
                          <dd className="text-gray-600">{product.specifications.meltingPoint}</dd>
                        </div>
                      )}
                      {product.specifications.boilingPoint && (
                        <div className="flex justify-between">
                          <dt className="font-medium">Boiling Point:</dt>
                          <dd className="text-gray-600">{product.specifications.boilingPoint}</dd>
                        </div>
                      )}
                      {product.specifications.density && (
                        <div className="flex justify-between">
                          <dt className="font-medium">Density:</dt>
                          <dd className="text-gray-600">{product.specifications.density}</dd>
                        </div>
                      )}
                      {product.specifications.ph && (
                        <div className="flex justify-between">
                          <dt className="font-medium">pH:</dt>
                          <dd className="text-gray-600">{product.specifications.ph}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Chemical Properties</h3>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="font-medium">Chemical Formula:</dt>
                        <dd className="text-gray-600">{product.chemicalFormula}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium">CAS Number:</dt>
                        <dd className="text-gray-600">{product.casNumber}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium">Purity:</dt>
                        <dd className="text-gray-600">{product.purity}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium">HS Code:</dt>
                        <dd className="text-gray-600">{product.hsCode}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              )}

              {activeTab === 'applications' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Applications & Uses</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.applications.map((application, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>{application}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'packaging' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Available Packaging</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {product.packaging.map((pack, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="text-2xl mb-2">📦</div>
                        <span className="font-medium">{pack}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'safety' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Safety Information</h3>
                  <div className="space-y-3">
                    {product.safetyInfo.map((info, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                        <div className="text-yellow-600 mt-1">⚠️</div>
                        <span>{info}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> Always refer to the Material Safety Data Sheet (MSDS) for complete safety information and handling procedures.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                More {product.category} Products
              </h2>
              <p className="text-xl text-gray-600">
                Explore our complete range of {product.category.toLowerCase()} solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <RelatedProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">
                Showing all {relatedProducts.length} products in {product.category}
              </p>
              <Link 
                to="/products" 
                className="btn btn-secondary px-8 py-3 rounded-md"
              >
                Browse Other Categories
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Back to Products */}
      <div className="py-8 bg-white">
        <div className="container-custom">
          <Link 
            to="/products" 
            className="inline-flex items-center text-primary hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

const RelatedProductCard: React.FC<{
  product: Product;
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
      <div className="p-4">
        <span className="text-xs text-primary font-medium">{product.subcategory}</span>
        <h3 className="text-lg font-semibold mb-2 mt-1 line-clamp-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center">
          {product.price && (
            <span className="text-primary font-semibold">{product.price}</span>
          )}
          <Link 
            to={`/products/${product.id}`} 
            className="text-primary text-sm font-medium hover:underline"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetailPage;