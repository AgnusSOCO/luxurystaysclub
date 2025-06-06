import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Bed, Bath, Users } from 'lucide-react';
import { Property } from '../../types';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPropertyType = (propertyType: string | undefined) => {
    if (!propertyType) return 'Property';
    return propertyType.charAt(0).toUpperCase() + propertyType.slice(1);
  };

  return (
    <Link 
      to={`/properties/${property.id}`}
      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full h-1/2 opacity-70"></div>
        <div className="absolute top-4 right-4 bg-blue-900 text-white px-3 py-1 rounded-full text-sm font-medium">
          {formatPropertyType(property.propertyType)}
        </div>
        <div className="absolute bottom-4 left-4 flex items-center text-white">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{property.location.city}, {property.location.country}</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center mb-2">
          <div className="flex items-center text-gold-400 mr-2">
            <Star size={16} className="fill-gold-400" />
            <span className="ml-1 text-gray-800">{property.rating}</span>
          </div>
          <span className="text-gray-500">·</span>
          <span className="text-gray-500 text-sm ml-2">Exceptional</span>
        </div>
        
        <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 group-hover:text-blue-800 transition-colors">
          {property.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4">
          {property.shortDescription}
        </p>
        
        <div className="flex items-center justify-between mb-4 text-gray-600 text-sm">
          <div className="flex items-center">
            <Bed size={16} className="mr-1" />
            <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
          </div>
          <div className="flex items-center">
            <Bath size={16} className="mr-1" />
            <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</span>
          </div>
          <div className="flex items-center">
            <Users size={16} className="mr-1" />
            <span>{property.capacity} Guests</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div>
            <span className="text-xl font-bold text-blue-900">
              {formatCurrency(property.price.perNight, property.price.currency)}
            </span>
            <span className="text-gray-600"> / night</span>
          </div>
          <div className="text-blue-800 text-sm font-medium group-hover:text-blue-600 transition-colors">
            View details
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;