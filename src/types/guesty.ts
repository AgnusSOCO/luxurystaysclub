export interface GuestyProperty {
  _id: string;
  title: string;
  picture: {
    thumbnail: string;
    regular: string;
    large: string;
  };
  address: {
    full: string;
    city: string;
    state: string;
  };
  bedrooms: number;
  bathrooms: number;
  accommodates: number;
  prices: {
    basePrice: number;
    minNights: number;
  };
  amenities: string[];
  description: string;
}

export interface BookingDates {
  checkIn: string;
  checkOut: string;
}

export interface GuestyAvailability {
  available: boolean;
  price: number;
}