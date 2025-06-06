import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { usePropertyContext } from '../../context/PropertyContext';

const LocationsSection: React.FC = () => {
  const { properties } = usePropertyContext();
  
  // Get Heber City properties
  const heberCityProperties = properties.filter(p => p.location.city === 'Heber City');
  const heberCityImage = heberCityProperties[0]?.images[0] || 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg';

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h6 className="text-blue-800 font-medium mb-2">OUR LOCATIONS</h6>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Popular Destinations</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Discover our collection of luxury properties in Utah's most sought-after locations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link 
            to="/properties?location=Heber City"
            className="group relative rounded-lg overflow-hidden h-80 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${heberCityImage})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-semibold mb-2">Heber City</h3>
              <div className="flex items-center">
                <MapPin size={16} className="mr-1" />
                <span>{heberCityProperties.length} Properties</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;