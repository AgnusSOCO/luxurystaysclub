import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Search, Calendar, MapPin } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { getProperties } from '../services/guestyApi';
import PropertyCard from './PropertyCard';
import { GuestyProperty } from '../types/guesty';

const PropertyList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  const { data: properties, isLoading, error } = useQuery({
    queryKey: ['properties'],
    queryFn: getProperties
  });

  const filteredProperties = properties?.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.address.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif mb-4">Discover Our Properties</h2>
          <p className="text-xl text-gray-600">
            Find your perfect luxury stay in our curated collection
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search locations..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <DatePicker
                selected={checkIn}
                onChange={(date) => setCheckIn(date)}
                placeholderText="Check-in date"
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <DatePicker
                selected={checkOut}
                onChange={(date) => setCheckOut(date)}
                placeholderText="Check-out date"
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">
            Error loading properties. Please try again later.
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProperties?.map((property: GuestyProperty) => (
              <PropertyCard
                key={property._id}
                property={property}
                onClick={() => console.log('Property clicked:', property._id)}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PropertyList;