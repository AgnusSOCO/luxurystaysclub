import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Instagram, Facebook, Twitter, Mail, Send } from 'lucide-react';
import Button from '../ui/Button';
import { usePropertyContext } from '../../context/PropertyContext';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { properties } = usePropertyContext();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      // Here you would typically handle the subscription
    }
  };

  // Get count of properties in Heber City
  const heberCityProperties = properties.filter(p => p.location.city === 'Heber City');
  const heberCityCount = heberCityProperties.length;

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-blue-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-blue-800">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-serif font-bold mb-4">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-300 mb-6">
              Stay updated with our latest luxury properties and exclusive offers
            </p>
            {subscribed ? (
              <div className="bg-blue-800/50 p-4 rounded-lg inline-block">
                <p className="text-gold-400">Thank you for subscribing!</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-4 py-2 rounded-lg bg-blue-800/50 border border-blue-700 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
                <Button
                  type="submit"
                  variant="primary"
                  className="bg-gold-400 hover:bg-gold-500 text-blue-900"
                  icon={<Send size={16} />}
                >
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" onClick={handleLinkClick} className="flex items-center mb-4">
              <Home className="mr-2 text-gold-400" size={24} />
              <span className="font-serif text-xl font-bold text-white">
                Luxury Stays Club
              </span>
            </Link>
            <p className="text-gray-300 mb-6">
              Exceptional properties for the discerning traveler. Experience luxury like never before.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gold-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-gold-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-gold-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-gold-400 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" onClick={handleLinkClick} className="text-gray-300 hover:text-gold-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" onClick={handleLinkClick} className="text-gray-300 hover:text-gold-400 transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={handleLinkClick} className="text-gray-300 hover:text-gold-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={handleLinkClick} className="text-gray-300 hover:text-gold-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/admin" onClick={handleLinkClick} className="text-gray-300 hover:text-gold-400 transition-colors">
                  Manage Properties
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Popular Destinations</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties?location=Heber City" onClick={handleLinkClick} className="text-gray-300 hover:text-gold-400 transition-colors">
                  Heber City, Utah ({heberCityCount} Properties)
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-gray-300">
              <p className="mb-2">1012 W Vissen Way</p>
              <p className="mb-2">Heber City, UT 84032</p>
              <p className="mb-4">United States</p>
              <p>
                <a href="mailto:booking@luxurystaysclub.com" className="hover:text-gold-400 transition-colors">
                  booking@luxurystaysclub.com
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-12 pt-8 text-center md:text-left md:flex md:justify-between">
          <p className="text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Luxury Stays Club. All rights reserved.
          </p>
          <div className="space-x-6">
            <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;