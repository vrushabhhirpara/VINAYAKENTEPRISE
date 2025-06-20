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
  
  // Comprehensive product catalog with 25 products
  const products: Product[] = [
    {
      id: 1,
      name: "Industrial Solvents",
      category: "Industrial Products",
      subcategory: "Solvents",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "High-quality solvents for industrial cleaning and manufacturing processes.",
      featured: true
    },
    {
      id: 2,
      name: "Personal Care Ingredients",
      category: "Natural Products",
      subcategory: "Personal Use",
      image: "https://cdn.shopify.com/s/files/1/0646/1551/4330/files/Importance_of_Personal_Care_Products_480x480.webp?v=1673811372",
      description: "Premium natural ingredients for personal care and cosmetic formulations.",
      featured: true
    },
    {
      id: 3,
      name: "Food Grade Additives",
      category: "Food & Beverage",
      subcategory: "Preservatives",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Safe additives and ingredients for food and beverage production.",
      featured: true
    },
    {
      id: 4,
      name: "Paint & Coating Chemicals",
      category: "Paint Colour",
      subcategory: "Colour Product",
      image: "https://www.pciplindia.com/webfiles/Industry/Medium/30342020033427Paint_text.webp",
      description: "Specialized chemicals for paint manufacturing and ink production.",
      featured: true
    },
    {
      id: 5,
      name: "Nutritional Supplements",
      category: "Food Feed",
      subcategory: "Nutrition",
      image: "https://www.emro.who.int/images/stories/nutrition/balanced-diet.jpg",
      description: "High-quality nutritional supplements and fortification ingredients.",
      featured: false
    },
    {
      id: 6,
      name: "Agrochemical Intermediates",
      category: "Food Feed",
      subcategory: "Food Grow Supplements",
      image: "https://blog.sathguru.com/wp-content/uploads/2021/01/Opportunity-for-India-becoming-a-global-agro-chemical-manufacturing-hub.jpg",
      description: "Essential intermediates for agrochemical production and crop protection.",
      featured: false
    },
    {
      id: 7,
      name: "Water Treatment Chemicals",
      category: "Water Refinary",
      subcategory: "Base Chemicals",
      image: "https://jkmchemtrade.com/upload/categories/4471230925113924.jpg",
      description: "Specialized chemicals for water treatment and purification applications.",
      featured: false
    },
    {
      id: 8,
      name: "Industrial Polymers",
      category: "Polymers",
      subcategory: "Industrial Polymers",
      image: "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "High-performance polymers for manufacturing and industrial use.",
      featured: false
    },
    {
      id: 9,
      name: "Chemical Intermediates",
      category: "Upper Chemicals",
      subcategory: "Various Industries",
      image: "https://www.thoughtco.com/thmb/X4xEq_SMbjth5zJgBkOjGetWw3k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/scientist-pouring-iron-chloride-into-beaker-of-potassium-thiocyanate-702545775-58cc47493df78c3c4fa0bdef.jpg",
      description: "Essential chemical intermediates for pharmaceutical and specialty manufacturing.",
      featured: false
    },
    {
      id: 10,
      name: "Animal Feed Additives",
      category: "Animal Feed",
      subcategory: "Animal Supplement",
      image: "https://www.unirayvet.com/public/Products/1Lagl7vwvL7aYAJwntvw3ZxI1T2kzv2iICc6enBQ.jpg",
      description: "Nutritional additives and supplements for cattle, poultry, and livestock.",
      featured: false
    },
    {
      id: 11,
      name: "Cosmetic Active Ingredients",
      category: "Natural Products",
      subcategory: "Active Ingredients",
      image: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Premium active ingredients for cosmetic and anti-aging formulations.",
      featured: false
    },
    {
      id: 12,
      name: "Fragrance Compounds",
      category: "Flavours & Fragrances",
      subcategory: "Aromatic Compounds",
      image: "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "High-quality fragrance compounds for perfume and cosmetic applications.",
      featured: false
    },
    {
      id: 13,
      name: "Pharmaceutical Excipients",
      category: "Upper Chemicals",
      subcategory: "Pharmaceutical",
      image: "https://images.pexels.com/photos/3786126/pexels-photo-3786126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "High-quality pharmaceutical excipients for drug formulation.",
      featured: false
    },
    {
      id: 14,
      name: "Textile Chemicals",
      category: "Industrial Products",
      subcategory: "Textile Processing",
      image: "https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Specialized chemicals for textile processing and finishing.",
      featured: false
    },
    {
      id: 15,
      name: "Veterinary APIs",
      category: "Animal Feed",
      subcategory: "Veterinary Medicine",
      image: "https://images.pexels.com/photos/6235234/pexels-photo-6235234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Active pharmaceutical ingredients for veterinary medicines.",
      featured: false
    },
    {
      id: 16,
      name: "Natural Extracts",
      category: "Natural Products",
      subcategory: "Plant Extracts",
      image: "https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Premium natural plant extracts for various applications.",
      featured: false
    },
    {
      id: 17,
      name: "Essential Oils",
      category: "Flavours & Fragrances",
      subcategory: "Natural Oils",
      image: "https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Pure essential oils for aromatherapy and cosmetic applications.",
      featured: false
    },
    {
      id: 18,
      name: "Laboratory Reagents",
      category: "Upper Chemicals",
      subcategory: "Analytical Grade",
      image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "High-purity laboratory reagents for research and testing.",
      featured: false
    },
    {
      id: 19,
      name: "Cleaning Chemicals",
      category: "Industrial Products",
      subcategory: "Cleaning Agents",
      image: "https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Industrial and commercial cleaning chemicals for various applications.",
      featured: false
    },
    {
      id: 20,
      name: "Nutraceutical Ingredients",
      category: "Food Feed",
      subcategory: "Health Supplements",
      image: "https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Premium nutraceutical ingredients for dietary supplements.",
      featured: false
    },
    {
      id: 21,
      name: "Herbal Powders",
      category: "Natural Products",
      subcategory: "Herbal Medicine",
      image: "https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Traditional herbal powders for therapeutic applications.",
      featured: false
    },
    {
      id: 22,
      name: "Flavor Enhancers",
      category: "Flavours & Fragrances",
      subcategory: "Food Flavoring",
      image: "https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Natural and artificial flavor enhancers for food applications.",
      featured: false
    },
    {
      id: 23,
      name: "Specialty Catalysts",
      category: "Upper Chemicals",
      subcategory: "Catalysts",
      image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "High-performance catalysts for chemical synthesis.",
      featured: false
    },
    {
      id: 24,
      name: "Electronic Chemicals",
      category: "Industrial Products",
      subcategory: "Electronics",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Ultra-pure chemicals for semiconductor manufacturing.",
      featured: false
    },
    {
      id: 25,
      name: "Ceramic Materials",
      category: "Industrial Products",
      subcategory: "Advanced Materials",
      image: "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Advanced ceramic materials for high-temperature applications.",
      featured: false
    }
  ];
  
  const categories = [
    "All",
    "Animal Feed",
    "Food & Beverage",
    "Natural Products",
    "Polymers",
    "Paint Colour",
    "Food Feed",
    "Industrial Products",
    "Upper Chemicals",
    "Flavours & Fragrances",
    "Water Refinary"
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
        <p className="text-gray-600 mb-4">{product.description}</p>
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