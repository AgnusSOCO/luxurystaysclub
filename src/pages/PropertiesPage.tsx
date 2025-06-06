import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, Filter } from 'lucide-react';
import { usePropertyContext } from '../context/PropertyContext';
import { Property, FilterOptions } from '../types';
import PropertyCard from '../components/property/PropertyCard';
import Button from '../components/ui/Button';

const PropertiesPage: React.FC = () => {
  const { properties } = usePropertyContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({});
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Get initial search param if present
    const initialQuery = searchParams.get('search') || '';
    const initialLocation = searchParams.get('location') || '';
    
    if (initialQuery) {
      setSearchQuery(initialQuery);
    } else if (initialLocation) {
      setSearchQuery(initialLocation);
      setFilters({...filters, location: initialLocation});
    }
    
    // Apply initial filtering
    filterProperties();
  }, [properties, searchParams]);

  const filterProperties = () => {
    let filtered = [...properties];
    
    // Filter by search query (location or property name)
    if (searchQuery) {
      filtered = filtered.filter(property => 
        property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by location if specific location filter is set
    if (filters.location) {
      filtered = filtered.filter(property => 
        property.location.city.toLowerCase().includes(filters.location!.toLowerCase()) ||
        property.location.country.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
    
    // Filter by price
    if (filters.priceMin !== undefined) {
      filtered = filtered.filter(property => property.price.perNight >= filters.priceMin!);
    }
    
    if (filters.priceMax !== undefined) {
      filtered = filtered.filter(property => property.price.perNight <= filters.priceMax!);
    }
    
    // Filter by bedrooms
    if (filters.bedrooms !== undefined) {
      filtered = filtered.filter(property => property.bedrooms >= filters.bedrooms!);
    }
    
    // Filter by property type
    if (filters.propertyType) {
      filtered = filtered.filter(property => property.propertyType === filters.propertyType);
    }
    
    setFilteredProperties(filtered);
  };

  useEffect(() => {
    filterProperties();
  }, [searchQuery, filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterProperties();
    setSearchParams({ search: searchQuery });
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery('');
    setSearchParams({});
  };

  const getPropertyTypeName = (type: Property['propertyType']) => {
    const types = {
      apartment: 'Apartment',
      house: 'House',
      villa: 'Villa',
      penthouse: 'Penthouse',
      cottage: 'Cottage'
    };
    return types[type];
  };

  const propertyTypes = ['apartment', 'house', 'villa', 'penthouse', 'cottage'] as const;

  return (
    <div className="pt-20 mb-20">
      <div className="bg-blue-900 py-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            Luxury Properties
          </h1>
          <p className="text-blue-100 max-w-2xl mb-8">
            Discover our handpicked collection of luxury properties in the world's most desirable destinations
          </p>
          
          <form 
            onSubmit={handleSearch}
            className="bg-white p-4 rounded-lg shadow-lg max-w-3xl flex flex-col md:flex-row items-center"
          >
            <div className="flex items-center flex-grow mb-4 md:mb-0 w-full md:w-auto">
              <Search className="text-gray-400 w-5 h-5 mr-2" />
              <input
                type="text"
                placeholder="Search by location or property name..."
                className="w-full border-none focus:ring-0 text-gray-800 placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex w-full md:w-auto space-x-2">
              <Button 
                type="button" 
                variant="secondary"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center"
                icon={<Filter size={16} />}
              >
                Filters
              </Button>
              <Button type="submit" variant="primary">
                Search
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Filters</h3>
              <button
                onClick={clearFilters}
                className="text-blue-800 hover:text-blue-600 flex items-center"
              >
                <X size={16} className="mr-1" />
                Clear All
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price Range */}
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Price Range (per night)</h4>
                <div className="flex items-center space-x-4">
                  <div className="w-1/2">
                    <label htmlFor="priceMin" className="text-sm text-gray-600 block mb-1">Min</label>
                    <input
                      id="priceMin"
                      type="number"
                      min="0"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      value={filters.priceMin || ''}
                      onChange={(e) => setFilters({...filters, priceMin: e.target.value ? parseInt(e.target.value) : undefined})}
                    />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="priceMax" className="text-sm text-gray-600 block mb-1">Max</label>
                    <input
                      id="priceMax"
                      type="number"
                      min="0"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      value={filters.priceMax || ''}
                      onChange={(e) => setFilters({...filters, priceMax: e.target.value ? parseInt(e.target.value) : undefined})}
                    />
                  </div>
                </div>
              </div>
              
              {/* Bedrooms */}
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Minimum Bedrooms</h4>
                <select
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={filters.bedrooms || ''}
                  onChange={(e) => setFilters({...filters, bedrooms: e.target.value ? parseInt(e.target.value) : undefined})}
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>
              
              {/* Property Type */}
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Property Type</h4>
                <select
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={filters.propertyType || ''}
                  onChange={(e) => setFilters({...filters, propertyType: e.target.value as Property['propertyType'] || undefined})}
                >
                  <option value="">All Types</option>
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>{getPropertyTypeName(type)}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            {filteredProperties.length} Properties {searchQuery ? `matching "${searchQuery}"` : ''}
          </h2>
          <div className="flex items-center space-x-2">
            <label htmlFor="sort" className="text-gray-600">Sort by:</label>
            <select
              id="sort"
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
        
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-800 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
            <Button variant="primary" onClick={clearFilters}>Clear all filters</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;