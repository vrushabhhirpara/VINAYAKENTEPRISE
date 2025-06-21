import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FlaskRound as Flask, ChevronDown, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Initialize Google Translate
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (!document.getElementById('google-translate-script')) {
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.type = 'text/javascript';
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.body.appendChild(script);
      }
    };

    const initializeGoogleTranslate = () => {
      if (typeof (window as any).google !== 'undefined' && (window as any).google.translate) {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,hi,gu,mr,ta,te,kn,ml,bn,pa,ur,fr,es,de,it,pt,ru,ja,ko,zh,ar',
            layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
            multilanguagePage: true
          },
          'google_translate_element'
        );
        
        // Initialize mobile version
        setTimeout(() => {
          if (document.getElementById('google_translate_element_mobile')) {
            new (window as any).google.translate.TranslateElement(
              {
                pageLanguage: 'en',
                includedLanguages: 'en,hi,gu,mr,ta,te,kn,ml,bn,pa,ur,fr,es,de,it,pt,ru,ja,ko,zh,ar',
                layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false,
                multilanguagePage: true
              },
              'google_translate_element_mobile'
            );
          }
        }, 1000);
      }
    };

    (window as any).googleTranslateElementInit = initializeGoogleTranslate;
    addGoogleTranslateScript();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navbarClass = `fixed w-full z-50 transition-all duration-300 ${
    scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
  }`;

  return (
    <header className={navbarClass}>
      <div className="container-custom mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Flask size={32} className="text-primary" />
            </motion.div>
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl md:text-2xl font-bold"
            >
              Vinayak Enterprise
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink to="/" label="Home" active={location.pathname === '/'} />
            <NavLink
              to="/products"
              label="Products"
              active={location.pathname === '/products'}
              dropdown={true}
            />
            <NavLink
              to="/services"
              label="Services"
              active={location.pathname === '/services'}
            />
            <NavLink
              to="/contact"
              label="Contact Us"
              active={location.pathname === '/contact'}
            />
          </nav>

          {/* Google Translate and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Google Translate Widget - Enhanced Large Rectangle */}
            <div className="google-translate-wrapper">
              <div className="google-translate-label">
                <Globe size={12} className="inline mr-1" />
                Language
              </div>
              <div id="google_translate_element" className="google-translate-container"></div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={24} className="text-gray-800" />
              ) : (
                <Menu size={24} className="text-gray-800" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="flex flex-col py-4">
              <MobileNavLink to="/" label="Home" />
              <MobileNavLink to="/products" label="Products" />
              <MobileNavLink to="/services" label="Services" />
              <MobileNavLink to="/contact" label="Contact Us" />
              
              {/* Mobile Google Translate - Enhanced */}
              <div className="px-4 py-4 border-t border-gray-200 mt-2">
                <div className="google-translate-wrapper">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 flex items-center">
                      <Globe size={16} className="mr-2" />
                      Select Language
                    </span>
                    <span className="text-xs text-gray-500">Google Translate</span>
                  </div>
                  <div id="google_translate_element_mobile" className="google-translate-container"></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  active: boolean;
  dropdown?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, active, dropdown }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => dropdown && setIsDropdownOpen(true)}
      onMouseLeave={() => dropdown && setIsDropdownOpen(false)}
    >
      <Link
        to={to}
        className={`flex items-center py-2 text-sm font-medium transition-colors duration-200 ${
          active
            ? 'text-primary border-b-2 border-primary'
            : 'text-gray-700 hover:text-primary border-b-2 border-transparent hover:border-primary'
        }`}
      >
        {label}
        {dropdown && <ChevronDown size={16} className="ml-1" />}
      </Link>

      {dropdown && isDropdownOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
        >
          <div className="py-1">
            <Link
              to="/products/animal-feed"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Animal Feed
            </Link>
            <Link
              to="/products/pharmaceuticals"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Pharmaceuticals
            </Link>
            <Link
              to="/products/industrial"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Industrial Products
            </Link>
            <Link
              to="/products/all"
              className="block px-4 py-2 text-sm font-medium text-primary hover:bg-gray-100"
            >
              View All Categories
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

interface MobileNavLinkProps {
  to: string;
  label: string;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, label }) => {
  return (
    <Link
      to={to}
      className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary"
    >
      {label}
    </Link>
  );
};

export default Header;