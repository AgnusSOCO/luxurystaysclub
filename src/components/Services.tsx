import React from 'react';
import { Shield, Clock, Home, Star } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Property Protection",
      description: "Comprehensive care and maintenance of your luxury property"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Concierge",
      description: "Round-the-clock support for your guests' every need"
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Interior Design",
      description: "Luxury interior design services to maximize appeal"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Premium Experience",
      description: "Curated amenities and experiences for discerning guests"
    }
  ];

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-serif mb-4">Unparalleled Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive luxury property management services tailored to your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-6 text-gray-900">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;