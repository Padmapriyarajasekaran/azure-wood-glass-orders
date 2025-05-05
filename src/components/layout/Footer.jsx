
import { Link } from "react-router-dom";
import { Package } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-lg font-bold text-gray-900">Plyfind</span>
            </Link>
            <p className="mt-2 text-sm text-gray-600">
              Premium wood and glass products for all your construction needs.
            </p>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Products</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/products?category=plywood" className="text-sm text-gray-600 hover:text-blue-600">
                  Plywoods & Boards
                </Link>
              </li>
              <li>
                <Link to="/products?category=glass" className="text-sm text-gray-600 hover:text-blue-600">
                  Glass Types
                </Link>
              </li>
              <li>
                <Link to="/products?category=other" className="text-sm text-gray-600 hover:text-blue-600">
                  Other Products
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-blue-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-600 hover:text-blue-600">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-gray-600 hover:text-blue-600">
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-blue-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-blue-600">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-600 text-center">
            &copy; {new Date().getFullYear()} Plyfind. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
