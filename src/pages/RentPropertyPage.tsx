import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';

const RentPropertyPage: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-blue-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Maximize Your Property's Potential
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Partner with Utah's premier luxury property management company
            </p>
            <Button
              variant="primary"
              size="lg"
              className="bg-gold-400 hover:bg-gold-500 text-blue-900"
              as={Link}
              to="/contact"
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Why Choose Luxury Stays Club?
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We understand that your luxury property is more than just an investment. Our specialized services ensure maximum returns while maintaining the highest standards of care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Luxury Market Expertise</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="text-green-500 mt-1 mr-2" size={20} />
                  <span>Specialized in high-end property management</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mt-1 mr-2" size={20} />
                  <span>Deep understanding of luxury guest expectations</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mt-1 mr-2" size={20} />
                  <span>Strategic positioning in premium markets</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Comprehensive Care</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="text-green-500 mt-1 mr-2" size={20} />
                  <span>Professional cleaning and maintenance</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mt-1 mr-2" size={20} />
                  <span>Regular property inspections</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mt-1 mr-2" size={20} />
                  <span>24/7 guest support and concierge</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Maximum Returns</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="text-green-500 mt-1 mr-2" size={20} />
                  <span>Dynamic pricing optimization</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mt-1 mr-2" size={20} />
                  <span>Strategic marketing campaigns</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mt-1 mr-2" size={20} />
                  <span>Detailed financial reporting</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Getting started with Luxury Stays Club is simple and straightforward
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-900 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-4">Initial Consultation</h3>
                <p className="text-gray-600">
                  We'll discuss your property, goals, and our management approach
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-900 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-4">Property Assessment</h3>
                <p className="text-gray-600">
                  Our team evaluates your property and provides recommendations
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-900 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-4">Launch & Marketing</h3>
                <p className="text-gray-600">
                  We prepare your property and begin attracting quality guests
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Comprehensive property management services tailored to luxury properties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Property Management</h3>
              <ul className="space-y-3">
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

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Guest Services</h3>
              <ul className="space-y-3">
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

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Marketing & Booking</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={20} />
                  <span>Professional photography</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={20} />
                  <span>Dynamic pricing strategy</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={20} />
                  <span>Multi-platform listing optimization</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={20} />
                  <span>Booking management</span>
                </li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Financial Services</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={20} />
                  <span>Monthly financial reports</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={20} />
                  <span>Revenue optimization</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={20} />
                  <span>Expense management</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-2" size={20} />
                  <span>Tax documentation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Contact us today to learn how we can help maximize your property's potential
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              className="bg-gold-400 hover:bg-gold-500 text-blue-900"
              as={Link}
              to="/contact"
            >
              Contact Us
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-white border-white hover:bg-white hover:text-blue-900"
              as={Link}
              to="/properties"
            >
              View Our Properties
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RentPropertyPage;