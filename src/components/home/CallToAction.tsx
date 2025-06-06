import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const CallToAction: React.FC = () => {
  return (
    <section 
      className="relative py-24 bg-cover bg-center"
      style={{ 
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg)'
      }}
    >
      <div className="container mx-auto px-4 text-center text-white z-10 relative">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
          Ready to Maximize Your Property's Potential?
        </h2>
        <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
          Join Utah's premier luxury property management company
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            variant="primary"
            size="lg"
            as={Link}
            to="/rent-property"
            className="bg-gold-400 hover:bg-gold-500 text-blue-900"
          >
            List Your Property
          </Button>
          <Button
            variant="outline"
            size="lg"
            as={Link}
            to="/contact"
            className="text-white border-white hover:bg-white hover:text-blue-900"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;