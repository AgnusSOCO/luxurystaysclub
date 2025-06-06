import React, { useEffect, useState } from 'react';
import { guestyService } from '../../services/guestyService';
import { format } from 'date-fns';

interface GuestyBookingProps {
  propertyId?: string;
  className?: string;
}

const GuestyBooking: React.FC<GuestyBookingProps> = ({ propertyId, className = 'w-full' }) => {
  const [guestyListingId, setGuestyListingId] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuestyListing = async () => {
      if (propertyId) {
        setIsLoading(true);
        setError(null);
        try {
          // Try to get listings and find the one matching our property ID
          const listings = await guestyService.getListings();
          
          // For now, we'll use the first listing as a fallback
          // In a real implementation, you'd have a mapping between your property IDs and Guesty listing IDs
          if (listings.results.length > 0) {
            setGuestyListingId(listings.results[0]._id);
          } else {
            setError('No listings found in Guesty');
          }
        } catch (error) {
          console.error('Error fetching Guesty listing:', error);
          setError('Failed to load booking widget');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchGuestyListing();
  }, [propertyId]);

  if (isLoading) {
    return (
      <div className={`${className} flex items-center justify-center p-8`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading booking widget...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className} p-6 bg-red-50 border border-red-200 rounded-lg`}>
        <div className="text-center text-red-600">
          <p className="font-medium">Booking Widget Error</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (!guestyListingId) {
    return (
      <div className={`${className} p-6 bg-gray-50 border border-gray-200 rounded-lg`}>
        <div className="text-center text-gray-600">
          <p>Booking widget not available for this property.</p>
          <p className="text-sm mt-1">Please contact us for reservations.</p>
        </div>
      </div>
    );
  }

  // For now, we'll show a simple message indicating the widget is ready
  // In a full implementation, you might embed the actual Guesty widget here
  return (
    <div className={`${className} p-6 bg-blue-50 border border-blue-200 rounded-lg`}>
      <div className="text-center">
        <p className="text-blue-800 font-medium">Guesty Booking Widget</p>
        <p className="text-blue-600 text-sm mt-1">
          Listing ID: {guestyListingId}
        </p>
        <p className="text-blue-600 text-sm">
          Widget integration ready for property {propertyId}
        </p>
      </div>
    </div>
  );
};

export default GuestyBooking;

