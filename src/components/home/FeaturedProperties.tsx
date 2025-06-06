import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { usePropertyContext } from '../../context/PropertyContext';
import PropertyCard from '../property/PropertyCard';

const FeaturedProperties: React.FC = () => {
  const { featuredProperties } = usePropertyContext();

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h6 className="text-blue-800 font-medium mb-2">FEATURED PROPERTIES</h6>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Utah's Finest Properties</h2>
          </div>
          <Link to="/properties" className="mt-4 md:mt-0 group flex items-center text-blue-800 font-medium hover:text-blue-600 transition-colors">
            View all properties
            <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {featuredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;