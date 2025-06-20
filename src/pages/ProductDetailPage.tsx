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

  // Enhanced product data with detailed information
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