import React from 'react';
import { Star, MapPin, Search } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h6 className="text-blue-800 font-medium mb-2">WELCOME TO LUXURY STAYS CLUB</h6>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
            Family-Owned Luxury Property Management
          </h2>
          <p className="text-gray-600 mb-12 leading-relaxed">
            At Luxury Stays Club, we're more than just property managers – we're your dedicated partners in maximizing your investment while ensuring exceptional experiences for your guests. Our comprehensive management services cover everything from consumable replenishment to hot tub maintenance, delivering hotel-like service with a personal touch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <div className="bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="text-gold-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-4">Luxury Experience</h3>
            <p className="text-gray-600">
              We partner exclusively with high-end properties to ensure outstanding experiences for every guest.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <div className="bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="text-gold-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-4">Local Expertise</h3>
            <p className="text-gray-600">
              Deep knowledge of Utah's luxury market, from Park City to Deer Valley and beyond.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <div className="bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="text-gold-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-4">24/7 Concierge</h3>
            <p className="text-gray-600">
              Round-the-clock support and concierge services for both owners and guests.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;