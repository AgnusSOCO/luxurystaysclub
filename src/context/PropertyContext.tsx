import React, { createContext, useState, useContext, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Property } from '../types';
import { sampleProperties } from '../data/sampleProperties';
import { useAdmin } from './AdminContext';
import { guestyService } from '../services/guestyService';

// Fallback to empty string if env vars are not available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Initialize Supabase client with error handling
const initSupabase = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Missing Supabase environment variables, falling back to sample data');
    return null;
  }
  
  return createClient(supabaseUrl, supabaseAnonKey);
};

const supabase = initSupabase();

interface PropertyContextType {
  properties: Property[];
  featuredProperties: Property[];
  addProperty: (property: Property) => Promise<void>;
  updateProperty: (id: string, updatedProperty: Partial<Property>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  getPropertyById: (id: string) => Property | undefined;
  refreshPropertyPricing: (propertyId: string, checkIn?: string, checkOut?: string, guests?: number) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAdmin } = useAdmin();

  // Initial load of properties
  useEffect(() => {
    loadProperties();
    
    // Only set up real-time subscription if Supabase is initialized
    if (supabase) {
      const subscription = supabase
        .channel('properties_channel')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'properties' }, payload => {
          loadProperties(); // Reload properties when changes occur
        })
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  // Update featured properties whenever properties change
  useEffect(() => {
    const featured = [...properties]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
    setFeaturedProperties(featured);
  }, [properties]);

  const loadProperties = async () => {
    try {
      if (!supabase) {
        // If Supabase is not initialized, use sample data
        setProperties(sampleProperties);
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Map the data to ensure proper property names and enhance with Guesty data
      const mappedData = await Promise.all((data || []).map(async (property) => {
        const mappedProperty: Property = {
          ...property,
          shortDescription: property.short_description || property.shortDescription,
          // Ensure Guesty fields are properly mapped
          guestyListingId: property.guestyListingId,
          guestyCalendarId: property.guestyCalendarId,
          guestyIntegrationStatus: property.guestyIntegrationStatus
        };

        // If property has Guesty integration, try to fetch real-time data
        if (mappedProperty.guestyListingId && mappedProperty.guestyIntegrationStatus === 'active') {
          try {
            // Test connection and listing access first
            await guestyService.testConnection();
            const listingTest = await guestyService.testListingAccess(mappedProperty.guestyListingId);
            
            if (!listingTest.success) {
              console.warn(`Guesty listing ${mappedProperty.guestyListingId} not accessible:`, listingTest.error);
              // Continue with database data
              return mappedProperty;
            }
            
            // Fetch real-time listing data from Guesty
            const guestyListing = await guestyService.getListingById(mappedProperty.guestyListingId);
            
            // Update property with real-time data from Guesty
            if (guestyListing.prices?.basePrice) {
              mappedProperty.price = {
                perNight: guestyListing.prices.basePrice,
                currency: guestyListing.prices.currency || mappedProperty.price.currency
              };
            }
            
            // Update capacity if available
            if (guestyListing.accommodates) {
              mappedProperty.capacity = guestyListing.accommodates;
            }
            
            // Update bedrooms/bathrooms if available
            if (guestyListing.bedrooms) {
              mappedProperty.bedrooms = guestyListing.bedrooms;
            }
            if (guestyListing.bathrooms) {
              mappedProperty.bathrooms = guestyListing.bathrooms;
            }
            
            // Update images if available
            if (guestyListing.pictures && guestyListing.pictures.length > 0) {
              mappedProperty.images = guestyListing.pictures.map(pic => pic.original || pic.thumbnail || pic);
            }
            
            // Update amenities if available
            if (guestyListing.amenities && guestyListing.amenities.length > 0) {
              mappedProperty.amenities = guestyListing.amenities;
            }
            
            console.log(`✅ Updated property ${mappedProperty.name} with real-time Guesty data`);
          } catch (guestyError) {
            console.warn(`⚠️ Failed to fetch Guesty data for property ${mappedProperty.name}:`, guestyError);
            // Continue with database data if Guesty fetch fails
          }
        } else if (mappedProperty.guestyListingId && mappedProperty.guestyIntegrationStatus === 'pending') {
          console.log(`⏳ Property ${mappedProperty.name} has Guesty integration pending`);
        } else {
          console.log(`📝 Property ${mappedProperty.name} uses database data only`);
        }

        return mappedProperty;
      }));

      setProperties(mappedData);
      setError(null);
    } catch (err) {
      console.error('Error loading properties:', err);
      setError('Failed to load properties');
      
      // Fallback to sample properties if there's an error
      if (properties.length === 0) {
        setProperties(sampleProperties);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const refreshPropertyPricing = async (
    propertyId: string, 
    checkIn?: string, 
    checkOut?: string, 
    guests: number = 1
  ) => {
    try {
      const property = properties.find(p => p.id === propertyId);
      if (!property || !property.guestyListingId || property.guestyIntegrationStatus !== 'active') {
        return;
      }

      // If dates are provided, get real-time pricing
      if (checkIn && checkOut) {
        const pricing = await guestyService.getPricing(
          property.guestyListingId,
          checkIn,
          checkOut,
          guests
        );

        // Update the property with real-time pricing
        setProperties(prevProperties => 
          prevProperties.map(p => 
            p.id === propertyId 
              ? {
                  ...p,
                  price: {
                    perNight: pricing.baseAmount,
                    currency: pricing.currency
                  },
                  // Store additional pricing info for booking widget
                  guestyPricing: pricing
                }
              : p
          )
        );
      } else {
        // Just refresh base pricing from Guesty listing
        const guestyListing = await guestyService.getListingById(property.guestyListingId);
        
        setProperties(prevProperties => 
          prevProperties.map(p => 
            p.id === propertyId 
              ? {
                  ...p,
                  price: {
                    perNight: guestyListing.prices?.basePrice || p.price.perNight,
                    currency: guestyListing.prices?.currency || p.price.currency
                  }
                }
              : p
          )
        );
      }
    } catch (error) {
      console.error('Error refreshing property pricing:', error);
    }
  };

  const addProperty = async (property: Property) => {
    try {
      if (!supabase) {
        throw new Error('Database connection not available');
      }

      if (!isAdmin) {
        throw new Error('Unauthorized: Admin access required');
      }

      // Map shortDescription to short_description for database compatibility
      const dbProperty = {
        ...property,
        short_description: property.shortDescription
      };
      delete (dbProperty as any).shortDescription;

      const { error } = await supabase
        .from('properties')
        .insert([dbProperty]);

      if (error) throw error;
    } catch (err) {
      console.error('Error adding property:', err);
      setError('Failed to add property');
      throw err;
    }
  };

  const updateProperty = async (id: string, updatedProperty: Partial<Property>) => {
    try {
      if (!supabase) {
        throw new Error('Database connection not available');
      }

      if (!isAdmin) {
        throw new Error('Unauthorized: Admin access required');
      }

      // Map shortDescription to short_description for database compatibility
      const dbProperty = { ...updatedProperty };
      if ('shortDescription' in dbProperty) {
        (dbProperty as any).short_description = dbProperty.shortDescription;
        delete (dbProperty as any).shortDescription;
      }

      const { error } = await supabase
        .from('properties')
        .update(dbProperty)
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      console.error('Error updating property:', err);
      setError('Failed to update property');
      throw err;
    }
  };

  const deleteProperty = async (id: string) => {
    try {
      if (!supabase) {
        throw new Error('Database connection not available');
      }

      if (!isAdmin) {
        throw new Error('Unauthorized: Admin access required');
      }

      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      console.error('Error deleting property:', err);
      setError('Failed to delete property');
      throw err;
    }
  };

  const getPropertyById = (id: string) => {
    return properties.find(property => property.id === id);
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        featuredProperties,
        addProperty,
        updateProperty,
        deleteProperty,
        getPropertyById,
        refreshPropertyPricing,
        isLoading,
        error
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const usePropertyContext = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('usePropertyContext must be used within a PropertyProvider');
  }
  return context;
};

