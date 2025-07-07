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
}

const ProductsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  
  // Comprehensive product catalog with 30+ products organized by categories
  const products: Product[] = [
    // Animal Feed Category (6 products)
    {
      id: 1,
      name: "Cattle Feed Supplements",
      category: "Animal Feed",
      subcategory: "Cattle Nutrition",
      image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
      description: "Premium nutritional supplements for cattle growth and milk production enhancement.",
      featured: true
    },
    {
      id: 2,
      name: "Poultry Feed Additives",
      category: "Animal Feed",
      subcategory: "Poultry Nutrition",
      image: "https://5.imimg.com/data5/SELLER/Default/2021/8/YF/YF/YF/6499570/poultry-feed-additives-500x500.jpg",
      description: "Essential vitamins and minerals for healthy poultry development and egg production.",
      featured: true
    },
    {
      id: 3,
      name: "Fish Feed Pellets",
      category: "Animal Feed",
      subcategory: "Aquaculture",
      image: "https://5.imimg.com/data5/SELLER/Default/2022/11/YH/YH/YH/162162162/fish-feed-pellets.jpg",
      description: "High-protein fish feed pellets for optimal aquaculture growth and health.",
      featured: false
    },
    {
      id: 4,
      name: "Livestock Mineral Mix",
      category: "Animal Feed",
      subcategory: "Mineral Supplements",
      image: "https://5.imimg.com/data5/SELLER/Default/2023/3/295295295/YH/YH/YH/livestock-mineral-mix.jpg",
      description: "Complete mineral supplement for all types of livestock and farm animals.",
      featured: false
    },
    {
      id: 5,
      name: "Dairy Cow Feed",
      category: "Animal Feed",
      subcategory: "Dairy Nutrition",
      image: "https://5.imimg.com/data5/SELLER/Default/2022/8/YH/YH/YH/dairy-cow-feed.jpg",
      description: "Specialized feed formulation for dairy cows to maximize milk yield and quality.",
      featured: false
    },
    {
      id: 6,
      name: "Sheep & Goat Feed",
      category: "Animal Feed",
      subcategory: "Small Ruminants",
      image: "https://5.imimg.com/data5/SELLER/Default/2023/1/YH/YH/YH/sheep-goat-feed.jpg",
      description: "Balanced nutrition feed for sheep and goats for optimal growth and reproduction.",
      featured: false
    },

    // Personal Care Category (6 products)
    {
      id: 7,
      name: "Natural Skincare Ingredients",
      category: "Personal Care",
      subcategory: "Skincare",
      image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
      description: "Premium natural ingredients for skincare formulations and cosmetic products.",
      featured: true
    },
    {
      id: 8,
      name: "Hair Care Chemicals",
      category: "Personal Care",
      subcategory: "Hair Care",
      image: "https://5.imimg.com/data5/SELLER/Default/2023/4/YH/YH/YH/hair-care-chemicals.jpg",
      description: "Professional-grade chemicals for shampoo, conditioner, and hair treatment products.",
      featured: true
    },
    {
      id: 9,
      name: "Cosmetic Preservatives",
      category: "Personal Care",
      subcategory: "Preservatives",
      image: "https://5.imimg.com/data5/SELLER/Default/2022/12/YH/YH/YH/cosmetic-preservatives.jpg",
      description: "Safe and effective preservatives for extending cosmetic product shelf life.",
      featured: false
    },
    {
      id: 10,
      name: "Essential Oils",
      category: "Personal Care",
      subcategory: "Aromatherapy",
      image: "https://5.imimg.com/data5/SELLER/Default/2023/2/YH/YH/YH/essential-oils.jpg",
      description: "Pure essential oils for aromatherapy, perfumes, and natural cosmetic formulations.",
      featured: false
    },
    {
      id: 11,
      name: "Sunscreen Chemicals",
      category: "Personal Care",
      subcategory: "UV Protection",
      image: "https://5.imimg.com/data5/SELLER/Default/2023/5/YH/YH/YH/sunscreen-chemicals.jpg",
      description: "UV-blocking chemicals for sunscreen and sun protection product manufacturing.",
      featured: false
    },
    {
      id: 12,
      name: "Anti-Aging Compounds",
      category: "Personal Care",
      subcategory: "Anti-Aging",
      image: "https://5.imimg.com/data5/SELLER/Default/2023/6/YH/YH/YH/anti-aging-compounds.jpg",
      description: "Advanced compounds for anti-aging creams and rejuvenating skincare products.",
      featured: false
    },

    // Food & Nutrition Category (6 products)
    {
      id: 13,
      name: "Food Grade Additives",
      category: "Food & Nutrition",
      subcategory: "Food Additives",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Safe and approved food additives for flavor enhancement and preservation.",
      featured: true
    },
    {
      id: 14,
      name: "Nutritional Supplements",
      category: "Food & Nutrition",
      subcategory: "Supplements",
      image: "https://www.emro.who.int/images/stories/nutrition/balanced-diet.jpg",
      description: "High-quality vitamins, minerals, and nutritional supplements for health products.",
      featured: true
    },
    {
      id: 15,
      name: "Food Preservatives",
      category: "Food & Nutrition",
      subcategory: "Preservatives",
      image: "https://5.imimg.com/data5/SELLER/Default/2023/7/YH/YH/YH/food-preservatives.jpg",
      description: "Natural and synthetic preservatives for extending food product shelf life.",
      featured: false
    },
    {
      id: 16,
      name: "Flavor Enhancers",
      category: "Food & Nutrition",
      subcategory: "Flavoring",
      image: "https://5.imimg.com/data5/SELLER/Default/2023/8/YH/YH/YH/flavor-enhancers.jpg",
      description: "Natural and artificial flavor enhancers for food and beverage manufacturing.",
      featured: false
    },
    {
      id: 17,
      name: "Food Coloring Agents",
      category: "Food & Nutrition",
      subcategory: "Coloring",
      image: "https://5.imimg.com/data5/SELLER/Default/2023/9/YH/YH/YH/food-coloring.jpg",
      description: "Safe food coloring agents for vibrant and appealing food presentations.",
      featured: false
    },
    {
      id: 18,
      name: "Protein Powders",
      category: "Food & Nutrition",
      subcategory: "Protein",
      image: "https://5.imimg.com/data5/SELLER/Default/2023/10/YH/YH/YH/protein-powders.jpg",
      description: "High-quality protein powders for sports nutrition and dietary supplements.",
      featured: false
    },

    // Industrial Solvents Category (6 products)
    {
      id: 19,
      name: "Industrial Cleaning Solvents",
      category: "Industrial Solvents",
      subcategory: "Cleaning",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "High-performance solvents for industrial cleaning and degreasing applications.",
      featured: true
    },
    {
      id: 20,
      name: "Paint Thinners",
      category: "Industrial Solvents",
      subcategory: "Paint Industry",
      image: "https://5.imimg.com/data5/SELLER/Default/2023/11/YH/YH/YH/paint-thinners.jpg",
      description: "Premium paint thinners and solvents for paint and coating applications.",
      featured: true
    },
    {
      id: 21,
      name: "Extraction Solvents",
      category: "Industrial Solvents",
      subcategory: "Extraction",
      image: "https://5.imimg.com/data5/SELLER/Default/2023/12/YH/YH/YH/extraction-solvents.jpg",
      description: "Specialized solvents for chemical extraction and purification processes.",
      featured: false
    },
    {
      id: 22,
      name: "Pharmaceutical Solvents",
      category: "Industrial Solvents",
      subcategory: "Pharmaceutical",
      image: "https://5.imimg.com/data5/SELLER/Default/2024/1/YH/YH/YH/pharma-solvents.jpg",
      description: "High-purity solvents for pharmaceutical manufacturing and research.",
      featured: false
    },
    {
      id: 23,
      name: "Electronic Grade Solvents",
      category: "Industrial Solvents",
      subcategory: "Electronics",
      image: "https://5.imimg.com/data5/SELLER/Default/2024/2/YH/YH/YH/electronic-solvents.jpg",
      description: "Ultra-pure solvents for electronics manufacturing and semiconductor industry.",
      featured: false
    },
    {
      id: 24,
      name: "Textile Processing Solvents",
      category: "Industrial Solvents",
      subcategory: "Textile",
      image: "https://5.imimg.com/data5/SELLER/Default/2024/3/YH/YH/YH/textile-solvents.jpg",
      description: "Specialized solvents for textile dyeing, printing, and finishing processes.",
      featured: false
    },

    // Home Care Category (6 products)
    {
      id: 25,
      name: "Detergent Chemicals",
      category: "Home Care",
      subcategory: "Cleaning",
      image: "https://5.imimg.com/data5/SELLER/Default/2023/10/351523658/UT/NP/JG/143402947/homecare-products.jpg",
      description: "Active ingredients for laundry detergents and household cleaning products.",
      featured: true
    },
    {
      id: 26,
      name: "Disinfectant Compounds",
      category: "Home Care",
      subcategory: "Disinfection",
      image: "https://5.imimg.com/data5/SELLER/Default/2024/4/YH/YH/YH/disinfectants.jpg",
      description: "Powerful disinfectant compounds for sanitizing and antimicrobial products.",
      featured: false
    },
    {
      id: 27,
      name: "Fabric Softener Ingredients",
      category: "Home Care",
      subcategory: "Fabric Care",
      image: "https://5.imimg.com/data5/SELLER/Default/2024/5/YH/YH/YH/fabric-softener.jpg",
      description: "Conditioning agents for fabric softeners and laundry care products.",
      featured: false
    },
    {
      id: 28,
      name: "Air Freshener Chemicals",
      category: "Home Care",
      subcategory: "Air Care",
      image: "https://5.imimg.com/data5/SELLER/Default/2024/6/YH/YH/YH/air-freshener.jpg",
      description: "Fragrance compounds and odor-eliminating chemicals for air care products.",
      featured: false
    },
    {
      id: 29,
      name: "Floor Cleaner Formulations",
      category: "Home Care",
      subcategory: "Floor Care",
      image: "https://5.imimg.com/data5/SELLER/Default/2024/7/YH/YH/YH/floor-cleaner.jpg",
      description: "Specialized formulations for effective floor cleaning and maintenance products.",
      featured: false
    },
    {
      id: 30,
      name: "Bathroom Cleaner Chemicals",
      category: "Home Care",
      subcategory: "Bathroom Care",
      image: "https://5.imimg.com/data5/SELLER/Default/2024/8/YH/YH/YH/bathroom-cleaner.jpg",
      description: "Powerful cleaning agents for bathroom and sanitary product formulations.",
      featured: false
    },

    // Paint, Ink & Coatings Category (6 products)
    {
      id: 31,
      name: "Paint Pigments",
      category: "Paint, Ink & Coatings",
      subcategory: "Pigments",
      image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
      description: "High-quality pigments for paint, coating, and ink manufacturing applications.",
      featured: true
    },
    {
      id: 32,
      name: "Coating Resins",
      category: "Paint, Ink & Coatings",
      subcategory: "Resins",
      image: "https://5.imimg.com/data5/SELLER/Default/2024/9/YH/YH/YH/coating-resins.jpg",
      description: "Advanced resin systems for protective and decorative coating applications.",
      featured: false
    },
    {
      id: 33,
      name: "Printing Ink Chemicals",
      category: "Paint, Ink & Coatings",
      subcategory: "Printing Inks",
      image: "https://5.imimg.com/data5/SELLER/Default/2024/10/YH/YH/YH/printing-inks.jpg",
      description: "Specialized chemicals for offset, digital, and screen printing ink formulations.",
      featured: false
    },
    {
      id: 34,
      name: "Anti-Corrosion Coatings",
      category: "Paint, Ink & Coatings",
      subcategory: "Protective Coatings",
      image: "https://5.imimg.com/data5/SELLER/Default/2024/11/YH/YH/YH/anti-corrosion.jpg",
      description: "Advanced anti-corrosion chemicals for metal protection and marine coatings.",
      featured: false
    },
    {
      id: 35,
      name: "UV-Curable Coatings",
      category: "Paint, Ink & Coatings",
      subcategory: "UV Coatings",
      image: "https://5.imimg.com/data5/SELLER/Default/2024/12/YH/YH/YH/uv-coatings.jpg",
      description: "UV-curable coating systems for fast-curing and environmentally friendly applications.",
      featured: false
    },
    {
      id: 36,
      name: "Powder Coating Chemicals",
      category: "Paint, Ink & Coatings",
      subcategory: "Powder Coatings",
      image: "https://5.imimg.com/data5/SELLER/Default/2025/1/YH/YH/YH/powder-coatings.jpg",
      description: "Electrostatic powder coating chemicals for durable and eco-friendly finishes.",
      featured: false
    }
  ];
  
  const categories = [
    "All",
    "Animal Feed",
    "Personal Care",
    "Food & Nutrition",
    "Industrial Solvents",
    "Home Care",
    "Paint, Ink & Coatings"
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
          product.subcategory.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
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
              Browse our extensive range of 36+ high-quality chemical products across 6 major categories designed for various industrial applications.
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
                      {category !== "All" && (
                        <span className="text-xs text-gray-500 ml-2">
                          ({products.filter(p => p.category === category).length})
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                
                {/* Category Stats */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Stats</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>Total Products: {products.length}</div>
                    <div>Featured: {products.filter(p => p.featured).length}</div>
                    <div>Categories: {categories.length - 1}</div>
                  </div>
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
                    placeholder="Search products by name, category, or description..."
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
                    <p className="text-sm text-gray-500 mt-2">Try adjusting your search terms or selecting a different category.</p>
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
              Our team of experts can develop tailored formulations to meet your specific requirements across all product categories.
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
          <div>
            <span className="text-sm text-primary font-medium">{product.category}</span>
            <div className="text-xs text-gray-500">{product.subcategory}</div>
          </div>
          {product.featured && (
            <span className="bg-accent/10 text-accent text-xs px-2 py-1 rounded-full font-medium">
              Featured
            </span>
          )}
        </div>
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{product.description}</p>
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