import React from 'react';
import { motion } from 'framer-motion';
import { Bed, Bath, Users, Star } from 'lucide-react';
import { GuestyProperty } from '../types/guesty';

interface PropertyCardProps {
  property: GuestyProperty;
  onClick: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={property.picture.large}
          alt={property.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 right-4 bg-black/70 px-4 py-2 rounded-full">
          <span className="text-white font-semibold">
            ${property.prices.basePrice}/night
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-serif mb-2">{property.title}</h3>
        <p className="text-gray-600 mb-4">{property.address.city}, {property.address.state}</p>

        <div className="flex items-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <Bed className="w-5 h-5 text-gray-600" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-5 h-5 text-gray-600" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-600" />
            <span>Sleeps {property.accommodates}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="font-semibold">4.9</span>
          </div>
          <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;