import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Tag, CheckCircle, Package, Truck, ShieldCheck } from 'lucide-react';
import { getProductById } from '../data/products';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(Number(id));

  if (!product) {
    return (
      <div className="pt-24 pb-20">
        <div className="container-custom">
          <div className="text-center py-16">
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
      <section className="bg-gray-50 py-8">
        <div className="container-custom">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/products" className="text-gray-500 hover:text-primary">Products</Link>
            <span className="text-gray-400">/</span>
            <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="text-gray-500 hover:text-primary">
              {product.category}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-800">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="aspect-square rounded-lg overflow-hidden shadow-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Product Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                  {product.featured && (
                    <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                      Featured Product
                    </span>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  {product.name}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* HSN Code */}
              {product.hsnCode && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Tag className="text-primary" size={20} />
                    <span className="font-semibold text-gray-800">HSN Code:</span>
                    <span className="text-gray-600 font-mono">{product.hsnCode}</span>
                  </div>
                </div>
              )}

              {/* Specifications */}
              {product.specifications && product.specifications.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Specifications</h3>
                  <ul className="space-y-2">
                    {product.specifications.map((spec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="text-success mt-0.5 flex-shrink-0" size={16} />
                        <span className="text-gray-600">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Applications */}
              {product.applications && product.applications.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Applications</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.applications.map((application, index) => (
                      <span
                        key={index}
                        className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm"
                      >
                        {application}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
                <Link
                  to="/contact"
                  className="btn btn-primary px-8 py-3 rounded-md text-center"
                >
                  Request Quote
                </Link>
                <Link
                  to="/contact"
                  className="btn bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-md hover:bg-gray-50 text-center"
                >
                  Technical Support
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p className="text-gray-600">
                All products meet international quality standards and certifications.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Reliable logistics network ensuring timely delivery worldwide.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Packaging</h3>
              <p className="text-gray-600">
                Flexible packaging options to meet your specific requirements.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Back to Products */}
      <section className="py-8">
        <div className="container-custom">
          <Link
            to="/products"
            className="inline-flex items-center text-primary hover:underline"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to All Products
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;