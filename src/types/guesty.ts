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
    country: string;
    zipcode: string;
    lat: number;
    lng: number;
    street: string;
    unit: string;
  };
  bedrooms: number;
  bathrooms: number;
  accommodates: number;
  prices: {
    basePrice: number;
    minNights: number;
    maxNights: number;
    weekendPrice: number;
    weeklyPrice: number;
    monthlyPrice: number;
    cleaningFee: number;
  };
  amenities: string[];
  description: string;
  houseRules: string[];
  cancelationPolicy: string;
}

export interface BookingDates {
  checkIn: string;
  checkOut: string;
}

export interface GuestyAvailability {
  available: boolean;
  price: number;
  minimumStay: number;
  maximumStay: number;
  restrictions: {
    noCheckIn: boolean;
    noCheckOut: boolean;
  };
}
