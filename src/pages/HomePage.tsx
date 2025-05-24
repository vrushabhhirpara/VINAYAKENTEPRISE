import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ArrowRight, ShieldCheck, Truck, FlaskRound as Flask, Beaker, Award } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Services Overview */}
      <ServiceSection />
      
      {/* Featured Products */}
      <FeaturedProducts />
      
      {/* Industries Served */}
      <IndustriesSection />
      
      {/* Testimonials */}
      <TestimonialsSection />
      
      {/* Call to Action */}
      <CTASection />
    </div>
  );
};

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen bg-texture flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mb-8 md:mb-0 md:pr-8"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
              Industry-Leading <span className="text-primary">Vinayak</span> Enterprise
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Providing high-quality chemicals and innovative solutions for industries worldwide since 2011.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/products" className="btn btn-primary px-8 py-3 rounded-md">
                Explore Products
              </Link>
              <Link to="/contact" className="btn bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-md hover:bg-gray-100">
                Contact Us
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2"
          >
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Laboratory chemicals" 
                className="rounded-lg shadow-xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 hidden md:block">
                <div className="flex items-center">
                  <div className="bg-success/20 p-3 rounded-full mr-4">
                    <ShieldCheck className="text-success h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">ISO Certified</h3>
                    <p className="text-gray-600 text-sm">Highest quality standards</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <FeatureCard 
            icon={<ShieldCheck className="h-10 w-10 text-primary" />}
            title="Certified Quality"
            description="All our products meet the highest industry standards and certifications."
          />
          <FeatureCard 
            icon={<Truck className="h-10 w-10 text-primary" />}
            title="Fast Delivery"
            description="Global logistics network ensuring timely delivery to any location."
          />
          <FeatureCard 
            icon={<Flask className="h-10 w-10 text-primary" />}
            title="Technical Support"
            description="Expert advice and assistance for all chemical solutions."
          />
        </motion.div>
      </div>
    </section>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-2">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const ServiceSection: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Comprehensive Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From custom formulations to quality testing, we provide end-to-end Vinayak Enterprise for your industry needs.
          </p>
        </div>
        
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <ServiceCard 
            icon={<Beaker className="h-12 w-12 text-primary" />}
            title="Custom Formulations"
            description="Tailored Vinayak Enterprise designed specifically for your unique requirements and applications."
            variants={itemVariants}
          />
          <ServiceCard 
            icon={<Flask className="h-12 w-12 text-primary" />}
            title="Quality Testing"
            description="Comprehensive testing services ensuring compliance with industry standards and regulations."
            variants={itemVariants}
          />
          <ServiceCard 
            icon={<Award className="h-12 w-12 text-primary" />}
            title="Certification Support"
            description="Assistance with regulatory compliance and certification processes for your products."
            variants={itemVariants}
          />
        </motion.div>
        
        <div className="text-center mt-12">
          <Link to="/services" className="inline-flex items-center text-primary font-medium hover:underline">
            View All Services
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const ServiceCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  variants: any;
}> = ({ icon, title, description, variants }) => {
  return (
    <motion.div 
      variants={variants}
      className="bg-white p-8 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="inline-block p-3 bg-primary/10 rounded-lg mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link to="/services" className="text-primary font-medium inline-flex items-center hover:underline">
        Learn More
        <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </motion.div>
  );
};

const FeaturedProducts: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const products = [
    {
      id: 1,
      name: "Industrial Solvents",
      category: "Industrial Products",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "High-quality solvents for industrial cleaning and manufacturing processes."
    },
    {
      id: 2,
      name: "Pharmaceutical Compounds",
      category: "Pharmaceuticals",
      image: "https://www.shutterstock.com/image-photo/multiple-pills-spilling-out-orange-600nw-2553468549.jpg",
      description: "Pure compounds for pharmaceutical research and manufacturing."
    },
    {
      id: 3,
      name: "Food Grade Additives",
      category: "Food & Beverage",
      image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Safe additives and ingredients for food and beverage production."
    },
    {
      id: 4,
      name: "Water Treatment Solutions",
      category: "Water Treatment",
      image: "https://images.pexels.com/photos/2253429/pexels-photo-2253429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Effective chemicals for water purification and treatment systems."
    }
  ];
  
  return (
    <section className="py-20 bg-chemical-pattern">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Products</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our high-quality chemical products designed to meet your specific industry needs.
          </p>
        </div>
        
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} variants={itemVariants} />
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <Link to="/products" className="btn btn-primary px-8 py-3 rounded-md">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

const ProductCard: React.FC<{
  product: {
    id: number;
    name: string;
    category: string;
    image: string;
    description: string;
  };
  variants: any;
}> = ({ product, variants }) => {
  return (
    <motion.div 
      variants={variants}
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
        <span className="text-sm text-primary font-medium">{product.category}</span>
        <h3 className="text-xl font-semibold mb-2 mt-1">{product.name}</h3>
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

const IndustriesSection: React.FC = () => {
  const industries = [
    {
      id: 1,
      name: "Pharmaceuticals",
      icon: <Flask className="h-8 w-8" />,
      color: "bg-blue-50 text-blue-600"
    },
    {
      id: 2,
      name: "Food & Beverage",
      icon: <Beaker className="h-8 w-8" />,
      color: "bg-green-50 text-green-600"
    },
    {
      id: 3,
      name: "Animal Feed",
      icon: <Beaker className="h-8 w-8" />,
      color: "bg-yellow-50 text-yellow-600"
    },
    {
      id: 4,
      name: "Textiles",
      icon: <Beaker className="h-8 w-8" />,
      color: "bg-purple-50 text-purple-600"
    },
    {
      id: 5,
      name: "Industrial Products",
      icon: <Flask className="h-8 w-8" />,
      color: "bg-gray-50 text-gray-600"
    },
    {
      id: 6,
      name: "Water Treatment",
      icon: <Beaker className="h-8 w-8" />,
      color: "bg-cyan-50 text-cyan-600"
    },
    {
      id: 7,
      name: "Ceramics",
      icon: <Flask className="h-8 w-8" />,
      color: "bg-orange-50 text-orange-600"
    },
    {
      id: 8,
      name: "Cosmetics",
      icon: <Beaker className="h-8 w-8" />,
      color: "bg-pink-50 text-pink-600"
    }
  ];
  
  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Industries We Serve</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Providing specialized Vinayak Enterprise across various industries worldwide.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {industries.map((industry) => (
            <Link 
              key={industry.id}
              to={`/products#${industry.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="group"
            >
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 
                            hover:shadow-md transition-all duration-300 text-center h-full
                            flex flex-col items-center justify-center">
                <div className={`${industry.color} p-4 rounded-full mb-4 
                                group-hover:scale-110 transition-transform duration-300`}>
                  {industry.icon}
                </div>
                <h3 className="font-medium group-hover:text-primary transition-colors duration-300">
                  {industry.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "Dharmendra Hirpara",
      company: "Vinayak Enterprise",
      quote: "Vinayak Enterprise has been our trusted partner for pharmaceutical ingredients for over 14 years. Their consistent quality and reliable service have been instrumental to our success.",
    avatar: "https://ibb.co/9mB9PzJM"
    },
  ];
  
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it—hear from the companies who rely on our Vinayak Enterprise
          </p>
        </div>
        
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div 
              key={testimonial.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6 }
                }
              }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-14 h-14 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                  <p className="text-gray-600">{testimonial.company}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Vinayak Enterprise?</h2>
          <p className="text-xl opacity-90 mb-8">
            Contact our team of experts today to discuss your specific requirements and discover how Vinayak Enterprise can help your business succeed.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/contact" className="btn bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-md">
              Contact Us
            </Link>
            <Link to="/products" className="btn bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3 rounded-md">
              Explore Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;