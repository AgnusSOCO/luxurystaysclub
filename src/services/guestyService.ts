import axios from 'axios';

// Get Supabase URL from environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('Missing Supabase environment variables for Guesty integration');
}

// Base URL for Guesty API calls through Supabase function
const GUESTY_API_BASE = `${SUPABASE_URL}/functions/v1/guesty`;

// Create axios instance with default headers
const guestyApi = axios.create({
  baseURL: GUESTY_API_BASE,
  headers: {
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
  },
});

// Types for Guesty API responses
export interface GuestyListing {
  _id: string;
  title: string;
  address: {
    full: string;
    city: string;
    state: string;
    country: string;
  };
  accommodates: number;
  bedrooms: number;
  bathrooms: number;
  pictures: Array<{
    original: string;
    thumbnail: string;
  }>;
  amenities: string[];
  prices: {
    basePrice: number;
    currency: string;
  };
  availability: {
    minNights: number;
    maxNights: number;
  };
}

export interface GuestyAvailability {
  date: string;
  status: 'available' | 'unavailable' | 'blocked';
  price?: number;
  minNights?: number;
}

export interface GuestyQuote {
  _id: string;
  listingId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  pricing: {
    baseAmount: number;
    cleaningFee: number;
    serviceFee: number;
    taxes: number;
    total: number;
    currency: string;
  };
  expiresAt: string;
}

export interface GuestyReservation {
  _id: string;
  confirmationCode: string;
  status: string;
  guest: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  listing: {
    _id: string;
    title: string;
  };
  checkIn: string;
  checkOut: string;
  guests: number;
  pricing: {
    total: number;
    currency: string;
  };
}

export interface QuoteRequest {
  listingId: string;
  checkIn: string; // YYYY-MM-DD format
  checkOut: string; // YYYY-MM-DD format
  guests: number;
}

export interface ReservationRequest {
  quoteId: string;
  guest: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  paymentMethod?: {
    token: string;
    type: string;
  };
}

class GuestyService {
  /**
   * Test API connection
   */
  async testConnection(): Promise<{ status: string; timestamp: string }> {
    try {
      const response = await guestyApi.get('/health');
      return response.data;
    } catch (error) {
      console.error('Guesty API connection test failed:', error);
      throw new Error('Failed to connect to Guesty API');
    }
  }

  /**
   * Get all listings with optional search parameters
   */
  async getListings(params?: {
    limit?: number;
    skip?: number;
    city?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
  }): Promise<GuestyListing[]> {
    try {
      const response = await guestyApi.get('/listings', { params });
      return response.data.results || response.data;
    } catch (error) {
      console.error('Error fetching Guesty listings:', error);
      throw new Error('Failed to fetch listings from Guesty');
    }
  }

  /**
   * Get specific listing by ID
   */
  async getListingById(listingId: string): Promise<GuestyListing> {
    try {
      const response = await guestyApi.get(`/listings/${listingId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Guesty listing:', error);
      throw new Error('Failed to fetch listing details from Guesty');
    }
  }

  /**
   * Get availability for a listing using the correct calendar endpoint
   */
  async getListingAvailability(
    listingId: string,
    startDate: string,
    endDate: string
  ): Promise<any> {
    try {
      const response = await guestyApi.get(`/listings/${listingId}/calendar`, {
        params: { 
          startDate: startDate,
          endDate: endDate
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching availability:', error);
      throw new Error('Failed to fetch availability from Guesty');
    }
  }

  /**
   * Create a reservation quote
   */
  async createQuote(quoteRequest: QuoteRequest): Promise<GuestyQuote> {
    try {
      const response = await guestyApi.post('/reservation-quotes', quoteRequest);
      return response.data;
    } catch (error) {
      console.error('Error creating quote:', error);
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data?.message || error.response.data?.error || 'Failed to create quote';
        throw new Error(errorMessage);
      }
      throw new Error('Failed to create reservation quote');
    }
  }

  /**
   * Create instant reservation from quote
   */
  async createReservation(reservationRequest: ReservationRequest): Promise<GuestyReservation> {
    try {
      const response = await guestyApi.post('/reservations/instant', reservationRequest);
      return response.data;
    } catch (error) {
      console.error('Error creating reservation:', error);
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data?.message || error.response.data?.error || 'Failed to create reservation';
        throw new Error(errorMessage);
      }
      throw new Error('Failed to create reservation');
    }
  }

  /**
   * Get pricing for specific dates (creates a temporary quote)
   */
  async getPricing(listingId: string, checkIn: string, checkOut: string, guests: number = 1) {
    try {
      const quote = await this.createQuote({
        listingId,
        checkIn,
        checkOut,
        guests
      });
      return quote.pricing;
    } catch (error) {
      console.error('Error getting pricing:', error);
      throw error;
    }
  }

  /**
   * Test access to a specific listing
   */
  async testListingAccess(listingId: string): Promise<{ success: boolean; listing?: any; error?: string }> {
    try {
      const response = await guestyApi.get(`/test-listing/${listingId}`);
      return response.data;
    } catch (error) {
      console.error('Error testing listing access:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to test listing access' 
      };
    }
  }

  /**
   * Check if dates are available for booking
   * Updated to work with calendar response format
   */
  async checkAvailability(listingId: string, checkIn: string, checkOut: string): Promise<boolean> {
    try {
      // First test if we can access the listing
      const listingTest = await this.testListingAccess(listingId);
      if (!listingTest.success) {
        console.error('Cannot access listing:', listingTest.error);
        return false;
      }

      // Get calendar data
      const calendar = await this.getListingAvailability(listingId, checkIn, checkOut);
      
      // The calendar response format may vary, let's be flexible
      let availabilityData = calendar;
      if (calendar.calendar) {
        availabilityData = calendar.calendar;
      } else if (calendar.data) {
        availabilityData = calendar.data;
      } else if (Array.isArray(calendar)) {
        availabilityData = calendar;
      }

      console.log('Calendar data structure:', {
        keys: Object.keys(calendar),
        isArray: Array.isArray(availabilityData),
        length: Array.isArray(availabilityData) ? availabilityData.length : 'not array'
      });

      // If we don't have proper calendar data, assume available (fallback)
      if (!availabilityData || (!Array.isArray(availabilityData) && typeof availabilityData !== 'object')) {
        console.warn('No calendar data found, assuming available');
        return true;
      }

      // If it's an object with date keys, convert to array
      if (!Array.isArray(availabilityData) && typeof availabilityData === 'object') {
        availabilityData = Object.entries(availabilityData).map(([date, data]) => ({
          date,
          ...data
        }));
      }

      // Check each date in the range
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      
      for (let date = new Date(checkInDate); date < checkOutDate; date.setDate(date.getDate() + 1)) {
        const dateStr = date.toISOString().split('T')[0];
        
        // Look for this date in the availability data
        const dayData = availabilityData.find((item: any) => {
          // Handle different possible date formats
          return item.date === dateStr || 
                 item.day === dateStr || 
                 item._id === dateStr ||
                 (item.date && item.date.startsWith(dateStr));
        });
        
        if (dayData) {
          // Check various possible status fields
          const status = dayData.status || dayData.availability || dayData.blocked;
          
          // If explicitly blocked or unavailable, return false
          if (status === 'blocked' || status === 'unavailable' || status === false || dayData.blocked === true) {
            console.log(`Date ${dateStr} is not available:`, dayData);
            return false;
          }
        }
        // If no data found for a date, assume it's available
      }
      
      return true;
    } catch (error) {
      console.error('Error checking availability:', error);
      // On error, assume available to allow quote creation (which will give definitive answer)
      return true;
    }
  }

  /**
   * Get minimum nights requirement for a listing
   */
  async getMinimumNights(listingId: string, checkIn: string): Promise<number> {
    try {
      const endDate = new Date(checkIn);
      endDate.setDate(endDate.getDate() + 30); // Check 30 days ahead
      
      const availability = await this.getListingAvailability(
        listingId, 
        checkIn, 
        endDate.toISOString().split('T')[0]
      );
      
      const checkInAvailability = availability.find(a => a.date === checkIn);
      return checkInAvailability?.minNights || 1;
    } catch (error) {
      console.error('Error getting minimum nights:', error);
      return 1; // Default to 1 night
    }
  }

  /**
   * Validate date range for booking
   */
  validateDateRange(checkIn: string, checkOut: string): { valid: boolean; error?: string } {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      return { valid: false, error: 'Check-in date cannot be in the past' };
    }

    if (checkOutDate <= checkInDate) {
      return { valid: false, error: 'Check-out date must be after check-in date' };
    }

    const daysDifference = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDifference > 365) {
      return { valid: false, error: 'Stay cannot exceed 365 days' };
    }

    return { valid: true };
  }

  /**
   * Format date for Guesty API (YYYY-MM-DD)
   */
  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  /**
   * Calculate number of nights between dates
   */
  calculateNights(checkIn: string, checkOut: string): number {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    return Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
  }
}

// Export singleton instance
export const guestyService = new GuestyService();
export default guestyService;

