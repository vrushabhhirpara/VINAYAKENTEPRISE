import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, Truck, Phone, Mail } from 'lucide-react';

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
  detailedProducts?: Array<{
    id: string;
    name: string;
    description: string;
    specifications: string[];
    applications: string[];
    image: string;
  }>;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Enhanced product data with detailed sub-products
  const products: Product[] = [
    {
      id: 1,
      name: "Industrial Solvents",
      category: "Industrial Products",
      subcategory: "Surfactants",
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
          specifications: ["Purity: 99.5%", "Water content: <0.5%", "Boiling point: 56°C"],
          applications: ["Paint thinner", "Nail polish remover", "Cleaning agent"],
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg"
        },
        {
          id: "ethanol",
          name: "Ethanol",
          description: "Industrial grade ethanol for various applications",
          specifications: ["Purity: 95-99%", "Denatured available", "Food grade available"],
          applications: ["Solvent", "Fuel additive", "Disinfectant"],
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg"
        },
        {
          id: "methanol",
          name: "Methanol",
          description: "Technical grade methanol for industrial use",
          specifications: ["Purity: 99.8%", "Water content: <0.15%", "Boiling point: 64.7°C"],
          applications: ["Fuel", "Antifreeze", "Solvent"],
          image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg"
        },
        {
          id: "isopropanol",
          name: "Isopropanol (IPA)",
          description: "High purity isopropyl alcohol",
          specifications: ["Purity: 99.9%", "Water content: <0.1%", "Boiling point: 82.6°C"],
          applications: ["Cleaning agent", "Disinfectant", "Electronics cleaning"],
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg"
        },
        {
          id: "toluene",
          name: "Toluene",
          description: "Industrial grade toluene solvent",
          specifications: ["Purity: 99.5%", "Benzene content: <1ppm", "Boiling point: 110.6°C"],
          applications: ["Paint solvent", "Adhesive", "Chemical intermediate"],
          image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg"
        }
      ]
    },
    {
      id: 2,
      name: "Cosmetic & Personal Care",
      category: "Personal Care",
      subcategory: "Surfactants",
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
          specifications: ["Molecular weight: 1-2 million Da", "Purity: >95%", "Endotoxin: <10 EU/g"],
          applications: ["Anti-aging serums", "Moisturizers", "Injectable fillers"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp"
        },
        {
          id: "vitamin-c",
          name: "Vitamin C (L-Ascorbic Acid)",
          description: "Stable vitamin C for skincare formulations",
          specifications: ["Purity: 99%+", "Stable form", "Water soluble"],
          applications: ["Brightening serums", "Anti-oxidant creams", "Spot treatments"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp"
        },
        {
          id: "retinol",
          name: "Retinol",
          description: "Pure retinol for anti-aging formulations",
          specifications: ["Purity: 95%+", "Stabilized form", "Light sensitive"],
          applications: ["Night creams", "Anti-aging serums", "Acne treatments"],
          image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp"
        }
      ]
    },
    {
      id: 3,
      name: "Food & Nutrition",
      category: "Food & Beverage",
      subcategory: "Food Additives",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Food-grade additives and nutritional ingredients for the food industry.",
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
      detailedProducts: [
        {
          id: "citric-acid",
          name: "Citric Acid",
          description: "Food grade citric acid for preservation and flavoring",
          specifications: ["Purity: 99.5%+", "Mesh size: 8-40", "Heavy metals: <10ppm"],
          applications: ["Preservative", "Acidulant", "Flavor enhancer"],
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg"
        },
        {
          id: "ascorbic-acid",
          name: "Ascorbic Acid (Vitamin C)",
          description: "Food grade vitamin C for fortification",
          specifications: ["Purity: 99%+", "Mesh size: 80-120", "Loss on drying: <0.4%"],
          applications: ["Antioxidant", "Vitamin fortification", "Dough conditioner"],
          image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg"
        }
      ]
    },
    {
      id: 4,
      name: "Paint, Ink & Coatings",
      category: "Paint & Coatings",
      subcategory: "Pigments",
      image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
      description: "High-quality pigments and additives for paint, ink, and coating applications.",
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
      detailedProducts: [
        {
          id: "titanium-dioxide",
          name: "Titanium Dioxide",
          description: "High-grade white pigment for superior opacity",
          specifications: ["TiO2 content: 94%+", "Brightness: 97%+", "Oil absorption: 15-25"],
          applications: ["White paint", "Paper coating", "Plastic whitening"],
          image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp"
        },
        {
          id: "iron-oxide",
          name: "Iron Oxide Pigments",
          description: "Natural and synthetic iron oxide pigments",
          specifications: ["Fe2O3 content: 96%+", "Oil absorption: 15-35", "pH: 3.5-7"],
          applications: ["Colored paints", "Concrete coloring", "Ceramic glazes"],
          image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp"
        }
      ]
    },
    {
      id: 5,
      name: "Cattle & Poultry Feed",
      category: "Animal Feed",
      subcategory: "Feed Additives",
      image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
      description: "Nutritional additives and supplements for animal feed formulations.",
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
      detailedProducts: [
        {
          id: "calcium-carbonate",
          name: "Calcium Carbonate",
          description: "High purity calcium supplement for animal nutrition",
          specifications: ["CaCO3: 98%+", "Mesh size: 200-325", "Heavy metals: <20ppm"],
          applications: ["Calcium supplement", "pH buffer", "Anti-caking agent"],
          image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg"
        },
        {
          id: "lysine",
          name: "L-Lysine HCl",
          description: "Essential amino acid for animal nutrition",
          specifications: ["Lysine content: 78.8%+", "Loss on drying: <1%", "Heavy metals: <20ppm"],
          applications: ["Protein supplement", "Growth promoter", "Feed fortification"],
          image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg"
        }
      ]
    },
    {
      id: 7,
      name: "Water Treatment",
      category: "Water Treatment",
      subcategory: "Chemicals",
      image: "https://jkmchemtrade.com/upload/categories/4471230925113924.jpg",
      description: "Specialized chemicals for water treatment and purification processes.",
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
      detailedProducts: [
        {
          id: "sodium-hypochlorite",
          name: "Sodium Hypochlorite",
          description: "Effective disinfectant for water treatment",
          specifications: ["Available chlorine: 10-15%", "pH: 11-13", "Density: 1.2 g/cm³"],
          applications: ["Water disinfection", "Swimming pool treatment", "Surface sanitization"],
          image: "https://jkmchemtrade.com/upload/categories/4471230925113924.jpg"
        },
        {
          id: "aluminum-sulfate",
          name: "Aluminum Sulfate",
          description: "Coagulant for water treatment applications",
          specifications: ["Al2O3 content: 17%+", "Water insoluble: <0.2%", "pH: 3.0-3.5"],
          applications: ["Coagulation", "Flocculation", "Turbidity removal"],
          image: "https://jkmchemtrade.com/upload/categories/4471230925113924.jpg"
        }
      ]
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
      detailedProducts: [
        {
          id: "reactive-dyes",
          name: "Reactive Dyes",
          description: "High-fastness reactive dyes for cotton and cellulose fibers",
          specifications: ["Fastness grade: 4-5", "Solubility: 100g/L", "Strength: 100%"],
          applications: ["Cotton dyeing", "Linen coloring", "Viscose processing"],
          image: "https://content.jdmagicbox.com/comp/def_content_category/textile-auxiliary-dealers/4bdc0a53ed-textile-auxiliary-dealers-1-m5o87.jpg"
        },
        {
          id: "disperse-dyes",
          name: "Disperse Dyes",
          description: "Synthetic dyes for polyester and synthetic fibers",
          specifications: ["Particle size: <1 micron", "Thermal stability: 200°C", "Fastness: Grade 4"],
          applications: ["Polyester dyeing", "Synthetic fiber coloring", "Heat transfer printing"],
          image: "https://content.jdmagicbox.com/comp/def_content_category/textile-auxiliary-dealers/4bdc0a53ed-textile-auxiliary-dealers-1-m5o87.jpg"
        }
      ]
    },
    {
      id: 9,
      name: "Home Care",
      category: "Home Care",
      subcategory: "Cleaning Agents",
      image: "https://5.imimg.com/data5/SELLER/Default/2023/10/351523658/UT/NP/JG/143402947/homecare-products.jpg",
      description: "Effective cleaning and maintenance products for household applications.",
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
      detailedProducts: [
        {
          id: "dish-soap",
          name: "Concentrated Dish Soap",
          description: "High-performance dishwashing liquid",
          specifications: ["Active matter: 30%+", "pH: 7-8", "Viscosity: 1000-3000 cP"],
          applications: ["Dishwashing", "Grease removal", "General cleaning"],
          image: "https://5.imimg.com/data5/SELLER/Default/2023/10/351523658/UT/NP/JG/143402947/homecare-products.jpg"
        },
        {
          id: "laundry-detergent",
          name: "Laundry Detergent",
          description: "Multi-enzyme laundry cleaning solution",
          specifications: ["Active enzymes: 4 types", "pH: 8-10", "Biodegradable: 90%+"],
          applications: ["Fabric washing", "Stain removal", "Color protection"],
          image: "https://5.imimg.com/data5/SELLER/Default/2023/10/351523658/UT/NP/JG/143402947/homecare-products.jpg"
        }
      ]
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
      detailedProducts: [
        {
          id: "npk-fertilizer",
          name: "NPK Fertilizer (20-20-20)",
          description: "Balanced nutrition for all crop types",
          specifications: ["N: 20%", "P2O5: 20%", "K2O: 20%", "Water soluble: 100%"],
          applications: ["Vegetable crops", "Fruit trees", "Field crops"],
          image: "https://www.pcaplindia.com/images/banner5.jpg"
        },
        {
          id: "urea",
          name: "Urea (46-0-0)",
          description: "High nitrogen fertilizer for rapid growth",
          specifications: ["Nitrogen: 46%", "Biuret: <1%", "Moisture: <0.5%"],
          applications: ["Nitrogen supplementation", "Foliar feeding", "Soil application"],
          image: "https://www.pcaplindia.com/images/banner5.jpg"
        }
      ]
    }
  ];

  const product = products.find(p => p.id === parseInt(id || '0'));

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
            <h2 className="text-3xl font-bold text-center mb-12">Available Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {product.detailedProducts.map((detailProduct) => (
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
                    <p className="text-gray-600 mb-4">{detailProduct.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Specifications:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {detailProduct.specifications.map((spec, index) => (
                          <li key={index}>• {spec}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {detailProduct.applications.map((app, index) => (
                          <li key={index}>• {app}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <Link to="/contact" className="btn btn-primary w-full text-center">
                      Get Quote
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
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