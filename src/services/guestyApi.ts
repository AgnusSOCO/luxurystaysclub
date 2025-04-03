import axios from 'axios';
import { GuestyProperty, BookingDates, GuestyAvailability } from '../types/guesty';

const GUESTY_API_URL = 'https://booking-api.guesty.com/v1';

// Create a secure axios instance
const guestyApi = axios.create({
  baseURL: GUESTY_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add authentication
guestyApi.interceptors.request.use((config) => {
  const credentials = btoa('0oao0nruuepjNHNZL5d7:r3x4sJ7n5MvuYVsdEXissBIqr6nwNRe6gEqWkrO65ZzJjwE5wXNky1M8Yuj5MJ64');
  config.headers.Authorization = `Basic ${credentials}`;
  return config;
});

export const getProperties = async (): Promise<GuestyProperty[]> => {
  try {
    const response = await guestyApi.get('/listings', {
      params: {
        limit: 50,
        offset: 0,
        fields: 'title,picture,address,bedrooms,bathrooms,accommodates,prices,amenities,description'
      }
    });
    
    if (response.data && response.data.results) {
      return response.data.results;
    }
    
    console.error('Invalid API response structure:', response.data);
    return [];
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
};

export const checkAvailability = async (
  propertyId: string,
  dates: BookingDates
): Promise<GuestyAvailability> => {
  const response = await guestyApi.post(`/listings/${propertyId}/availability`, dates);
  return response.data;
};

export const createBooking = async (
  propertyId: string,
  bookingData: any
): Promise<any> => {
  const response = await guestyApi.post(`/listings/${propertyId}/reservations`, bookingData);
  return response.data;
};
