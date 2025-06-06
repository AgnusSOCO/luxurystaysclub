import React from 'react';
import { Check } from 'lucide-react';

const ServicesSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h6 className="text-blue-800 font-medium mb-2">OUR SERVICES</h6>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Comprehensive Property Management
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We handle every aspect of your property management needs with meticulous attention to detail
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-4">Property Care</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <Check className="text-green-500 mr-2" size={20} />
                <span>Professional cleaning services</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-2" size={20} />
                <span>Regular maintenance and inspections</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-2" size={20} />
                <span>Hot tub and pool maintenance</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-2" size={20} />
                <span>Landscaping and snow removal</span>
              </li>
            </ul>
          </div>

          <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-4">Guest Services</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <Check className="text-green-500 mr-2" size={20} />
                <span>24/7 concierge support</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-2" size={20} />
                <span>Luxury amenities and welcome packages</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-2" size={20} />
                <span>Local activity recommendations</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-2" size={20} />
                <span>Transportation arrangements</span>
              </li>
            </ul>
          </div>

          <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-4">Owner Benefits</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <Check className="text-green-500 mr-2" size={20} />
                <span>Dynamic pricing strategy</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-2" size={20} />
                <span>Monthly financial reports</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-2" size={20} />
                <span>Marketing and photography</span>
              </li>
              <li className="flex items-center">
                <Check className="text-green-500 mr-2" size={20} />
                <span>Revenue optimization</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;