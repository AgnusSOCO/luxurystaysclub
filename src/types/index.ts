export interface Property {
  id: string;
  name: string;
  location: {
    city: string;
    country: string;
    address?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  price: {
    perNight: number;
    currency: string;
  };
  rating: number;
  bedrooms: number;
  bathrooms: number;
  capacity: number;
  size: {
    value: number;
    unit: string;
  };
  description: string;
  shortDescription: string;
  amenities: string[];
  images: string[];
  featured?: boolean;
  availability?: {
    start: string;
    end: string;
  }[];
  propertyType: 'apartment' | 'house' | 'villa' | 'penthouse' | 'cottage';
  guestyListingId?: string;
  guestyCalendarId?: string;
  guestyIntegrationStatus?: 'pending' | 'active' | 'error';
  guestyPricing?: {
    baseAmount: number;
    cleaningFee: number;
    serviceFee: number;
    taxes: number;
    total: number;
    currency: string;
  };
}

export interface FilterOptions {
  location?: string;
  priceMin?: number;
  priceMax?: number;
  bedrooms?: number;
  propertyType?: Property['propertyType'];
}