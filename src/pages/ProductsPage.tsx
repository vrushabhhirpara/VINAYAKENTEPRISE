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
  
  // Original 11 products
  const products: Product[] = [
    {
      id: 1,
      name: "Industrial Solvents",
      category: "Industrial Products",
      subcategory: "Surfactants",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Non-ionic surfactant used in industrial cleaning and textile processing.",
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
      ]
    },
    {
      id: 2,
      name: "Cosmetic & Personal Care",
      category: "Personal Care",
      subcategory: "Surfactants",
      image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
      description: "Anionic surfactant widely used in personal care and cleaning products.",
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
      ]
    },
    {
      id: 3,
      name: "Food & Nutrition",
      category: "Food & Beverage",
      subcategory: "Food Additives",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Natural preservative and flavoring agent for food and beverage industry.",
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
      ]
    },
    {
      id: 4,
      name: "Paint, Ink & Coatings",
      category: "Paint & Coatings",
      subcategory: "Pigments",
      image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
      description: "High-quality white pigment for paints, coatings, and plastic applications.",
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
      ]
    },
    {
      id: 5,
      name: "Cattle & Poultry Feed",
      category: "Animal Feed",
      subcategory: "Feed Additives",
      image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
      description: "Essential calcium supplement for animal nutrition and feed formulations.",
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
      ]
    },
    {
      id: 7,
      name: "Water Treatment",
      category: "Water Treatment",
      subcategory: "Chemicals",
      image: "https://jkmchemtrade.com/upload/categories/4471230925113924.jpg",
      description: "Water treatment is a process that improves water quality by removing contaminants and undesirable components.",
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
      ]
    },
    {
      id: 8,
      name: "Textile Dyes",
      category: "Textile",
      subcategory: "Dyes & Chemicals",
      image: "https://content.jdmagicbox.com/comp/def_content_category/textile-auxiliary-dealers/4bdc0a53ed-textile-auxiliary-dealers-1-m5o87.jpg",
      description: "Food-grade acetic acid for preservation and flavoring applications.",
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
      ]
    },
    {
      id: 9,
      name: "Home Care",
      category: "Home Care",
      subcategory: "Cleaning Agents",
      image: "https://5.imimg.com/data5/SELLER/Default/2023/10/351523658/UT/NP/JG/143402947/homecare-products.jpg",
      description: "We provide compassionate and professional home care services to help you or your loved ones maintain independence and quality of life in the comfort of your own home.",
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
      ]
    },
    {
      id: 10,
      name: "Agriculture",
      category: "Agriculture",
      subcategory: "Fertilizers & Pesticides",
      image: "https://www.pcaplindia.com/images/banner5.jpg",
      description: "A website focused on agriculture can be used to showcase farm products, share farming techniques, or provide information about sustainable agriculture practices.",
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
      ]
    }
  ];
  
  const categories = [
    "All",
    "Animal Feed",
    "Personal Care",
    "Food & Nutrition",
    "Paint & Coatings",
    "Industrial Products",
    "Water Treatment",
    "Textile",
    "Home Care",
    "Agriculture"
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
              Browse our extensive range of 11 high-quality chemical products designed for various industrial applications.
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