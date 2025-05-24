import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FlaskRound as Flask, ChevronDown } from 'lucide-react';
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