import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Beaker, FlaskRound as Flask, TrendingUp, ClipboardCheck, Truck, ShieldCheck, LifeBuoy, CheckCircle } from 'lucide-react';

const ServicesPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="bg-secondary text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Our Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl opacity-90 mb-8"
            >
              Comprehensive chemical solutions tailored to your industry's unique requirements.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <ServicesList />

      {/* Process */}
      <OurProcess />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl opacity-90 mb-8">
              Contact our team to discuss your chemical needs and discover how we can help your business thrive.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/contact" className="btn bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-md">
                Contact Us
              </Link>
              <Link to="/products" className="btn bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3 rounded-md">
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ServicesList: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const services = [
    {
      id: 1,
      icon: <Beaker className="h-12 w-12 text-primary" />,
      title: "Custom Formulation",
      description:
        "Our expert chemists can develop tailored chemical formulations to meet your unique requirements and specifications.",
      features: [
        "Needs assessment and analysis",
        "Custom product development",
        "Formulation optimization",
        "Scale-up support"
      ]
    },
    {
      id: 2,
      icon: <ClipboardCheck className="h-12 w-12 text-primary" />,
      title: "Quality Testing & Analysis",
      description:
        "Comprehensive testing services to ensure your chemical products meet industry standards and regulatory requirements.",
      features: [
        "Chemical composition analysis",
        "Purity testing",
        "Performance evaluation",
        "Regulatory compliance testing"
      ]
    },
    {
      id: 3,
      icon: <TrendingUp className="h-12 w-12 text-primary" />,
      title: "Process Optimization",
      description:
        "Improve your manufacturing processes for greater efficiency, yield, and product quality.",
      features: [
        "Process evaluation",
        "Efficiency enhancement",
        "Cost reduction strategies",
        "Sustainable process development"
      ]
    },
    {
      id: 4,
      icon: <ShieldCheck className="h-12 w-12 text-primary" />,
      title: "Regulatory Compliance",
      description:
        "Navigate complex regulatory requirements with our expert guidance and support.",
      features: [
        "Compliance assessment",
        "Documentation preparation",
        "Regulatory submission support",
        "Ongoing compliance monitoring"
      ]
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From custom formulations to regulatory compliance, we offer comprehensive services to meet all your chemical needs.
          </p>
        </div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ServiceCard: React.FC<{
  service: {
    id: number;
    icon: React.ReactNode;
    title: string;
    description: string;
    features: string[];
  };
}> = ({ service }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6 }
        }
      }}
      className="bg-white p-8 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="mb-6">{service.icon}</div>
      <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
      <p className="text-gray-600 mb-6">{service.description}</p>
      <ul className="space-y-2">
        {service.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const OurProcess: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const steps = [
    {
      id: 1,
      title: "Initial Consultation",
      description:
        "We start by understanding your needs, challenges, and objectives through a detailed consultation.",
      icon: <LifeBuoy className="h-10 w-10" />
    },
    {
      id: 2,
      title: "Solution Development",
      description:
        "Our experts develop a tailored solution based on your specific requirements and industry standards.",
      icon: <Beaker className="h-10 w-10" />
    },
    {
      id: 3,
      title: "Testing & Refinement",
      description:
        "We rigorously test the solution and refine it until it meets all performance and quality criteria.",
      icon: <Flask className="h-10 w-10" />
    },
    {
      id: 4,
      title: "Implementation & Support",
      description:
        "We help implement the solution in your operations and provide ongoing support to ensure success.",
      icon: <Truck className="h-10 w-10" />
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Process</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We follow a systematic approach to ensure we deliver solutions that perfectly match your needs.
          </p>
        </div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className="relative"
        >
          {/* Desktop Process Line */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-0.5 bg-primary/30 -translate-x-1/2 z-0"></div>

          {/* Process Steps */}
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <ProcessStep
                key={step.id}
                step={step}
                index={index}
                isEven={index % 2 === 0}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ProcessStep: React.FC<{
  step: {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
  };
  index: number;
  isEven: boolean;
}> = ({ step, index, isEven }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: isEven ? -50 : 50 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.6 }
        }
      }}
      className="relative md:flex items-center"
    >
      {/* Process Number Circle - Mobile */}
      <div className="flex md:hidden mb-4">
        <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
          {index + 1}
        </div>
      </div>

      {/* Content Layout */}
      <div
        className={`md:w-5/12 ${
          isEven ? "md:text-right md:pr-12" : "md:ml-auto md:pl-12"
        }`}
      >
        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
        <p className="text-gray-600">{step.description}</p>
      </div>

      {/* Center Circle - Desktop */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-primary text-white w-16 h-16 rounded-full items-center justify-center z-10">
        {step.icon}
      </div>

      {/* Empty Div for Layout Balance */}
      <div className="md:w-5/12"></div>
    </motion.div>
  );
};

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      quote:
        "Vinayak Enterprise transformed our manufacturing process with their custom formulations. Their expertise helped us improve product quality while reducing costs.",
      name: "	Dharmendra Hirpara",
      position: "Company CEO",
      company: "Vinayak Enterprise"
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Client Success Stories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how our services have helped companies across various industries achieve their goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 p-8 rounded-lg border border-gray-100"
            >
              <div className="mb-4 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="opacity-20"
                >
                  <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144C8.97 4.222 8.737 4.278 8.472 4.345c-.271.05-.56.187-.882.312C7.272 4.799 6.904 4.895 6.562 5.123c-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.945-.33.358-.656.734-.909 1.162C3.249 8.34 3.01 8.802 2.8 9.262c-.229.438-.438.894-.6 1.372-.16.479-.233.961-.3 1.423-.077.476-.097.949-.095 1.395.004.397.039.788.186 1.12.144.338.413.638.288.938-.083.212.597.752.918.864.32.114.75.172 1.04.172h3.5c.202 0 .4-.03.581-.096.18-.077.34-.185.48-.324.275-.28.434-.655.434-1.033V11.93c0-1.066-.865-1.93-1.934-1.93H6.5zm11 0c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L20.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.945-.33.358-.656.734-.909 1.162-.264.404-.502.866-.712 1.326-.229.438-.438.894-.6 1.372-.16.479-.233.961-.3 1.423-.077.476-.097.949-.095 1.395.004.397.039.788.186 1.12.144.338.413.638.288.938-.083.212.597.752.918.864.32.114.75.172 1.04.172h3.5c.202 0 .4-.03.581-.096.18-.077.34-.185.48-.324.275-.28.434-.655.434-1.033V11.93c0-1.066-.865-1.93-1.934-1.93H17.5z"></path>
                </svg>
              </div>
              <p className="text-gray-700 italic mb-6">{testimonial.quote}</p>
              <div>
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-gray-600 text-sm">
                  {testimonial.position}, {testimonial.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;