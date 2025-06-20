import React from 'react';
import { Link } from 'react-router-dom';
import { FlaskRound as Flask, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Flask size={24} className="text-primary-light" />
              <span className="text-xl font-bold">Vinayak Enterprise</span>
            </Link>
            <p className="text-gray-300 mb-4">
              Leading supplier of high-quality Vinayak Enterprise for various industries since 2011.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/vinayaksurat?mibextid=2JQ9oc" className="text-gray-300 hover:text-primary-light transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-light transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-light transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://www.instagram.com/vinayakent2011?igsh=MzJyZzVpeGl2dW90" className="text-gray-300 hover:text-primary-light transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary-light transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-primary-light transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-primary-light transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary-light transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-primary-light transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-primary-light transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Product Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products/Cattle & Poultry Feed" className="text-gray-300 hover:text-primary-light transition-colors">
                  Animal Feed
                </Link>
              </li>
              <li>
                <Link to="/products/Food & Nutrition" className="text-gray-300 hover:text-primary-light transition-colors">
                  Food
                </Link>
              </li>
              <li>
                <Link to="/products/Industrial Solvents" className="text-gray-300 hover:text-primary-light transition-colors">
                  Industrial Products
                </Link>
              </li>
              <li>
                <Link to="/products/Personal Care" className="text-gray-300 hover:text-primary-light transition-colors">
                  Natural Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-primary-light mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  369, Time Trade Center Opp, Polaris Mall, BRTS Canal Road, Puna Patiya, Surat-395010, Gujarat, India
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-primary-light flex-shrink-0" />
                <span className="text-gray-300">+91 95106 91989</span>
              </li>
                <li className="flex items-center space-x-3">
                <Phone size={20} className="text-primary-light flex-shrink-0" />
                <span className="text-gray-300">+91 74050 39257 </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-primary-light flex-shrink-0" />
                <span className="text-gray-300">info@vinayak-enterprise.net</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>© {new Date().getFullYear()} VinayakEnterprise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;