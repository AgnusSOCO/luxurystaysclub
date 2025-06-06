import React, { useState, useEffect } from 'react';
import { Calendar, Users, DollarSign, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Property } from '../../types';
import { guestyService, GuestyQuote } from '../../services/guestyService';
import { usePropertyContext } from '../../context/PropertyContext';
import DatePicker from './DatePicker';

interface PropertyBookingWidgetProps {
  property: Property;
}

interface BookingState {
  step: 'dates' | 'details' | 'payment' | 'confirmation';
  checkIn: string;
  checkOut: string;
  guests: number;
  quote: GuestyQuote | null;
  isLoadingQuote: boolean;
  quoteError: string | null;
}

interface GuestDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface FormErrors {
  [key: string]: string;
}

const PropertyBookingWidget: React.FC<PropertyBookingWidgetProps> = ({ property }) => {
  const { refreshPropertyPricing } = usePropertyContext();
  
  const [bookingState, setBookingState] = useState<BookingState>({
    step: 'dates',
    checkIn: '',
    checkOut: '',
    guests: 1,
    quote: null,
    isLoadingQuote: false,
    quoteError: null
  });

  const [guestDetails, setGuestDetails] = useState<GuestDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [availabilityData, setAvailabilityData] = useState<any[]>([]);
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);

  // Check if property has Guesty integration
  if (!property.guestyListingId || property.guestyIntegrationStatus !== 'active') {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center text-gray-600">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg font-medium mb-2">Online booking not available</p>
          <p className="text-sm">Please contact us directly to make a reservation for this property.</p>
          <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Contact Us
          </button>
        </div>
      </div>
    );
  }

  // Load availability data when component mounts
  useEffect(() => {
    if (property.guestyListingId) {
      loadAvailabilityData();
    }
  }, [property.guestyListingId]);

  // Create quote when dates and guests are selected
  useEffect(() => {
    if (bookingState.checkIn && bookingState.checkOut && bookingState.guests > 0) {
      createQuote();
    }
  }, [bookingState.checkIn, bookingState.checkOut, bookingState.guests]);

  const loadAvailabilityData = async () => {
    if (!property.guestyListingId) return;

    setIsLoadingAvailability(true);
    try {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 6); // Load 6 months of availability

      const availability = await guestyService.getListingAvailability(
        property.guestyListingId,
        guestyService.formatDate(startDate),
        guestyService.formatDate(endDate)
      );

      setAvailabilityData(availability);
    } catch (error) {
      console.error('Error loading availability:', error);
    } finally {
      setIsLoadingAvailability(false);
    }
  };

  const createQuote = async () => {
    if (!property.guestyListingId || !bookingState.checkIn || !bookingState.checkOut) return;

    setBookingState(prev => ({ ...prev, isLoadingQuote: true, quoteError: null }));

    try {
      // Validate date range
      const validation = guestyService.validateDateRange(bookingState.checkIn, bookingState.checkOut);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      // Check availability
      const isAvailable = await guestyService.checkAvailability(
        property.guestyListingId,
        bookingState.checkIn,
        bookingState.checkOut
      );

      if (!isAvailable) {
        throw new Error('Selected dates are not available');
      }

      // Create quote
      const quote = await guestyService.createQuote({
        listingId: property.guestyListingId,
        checkIn: bookingState.checkIn,
        checkOut: bookingState.checkOut,
        guests: bookingState.guests
      });

      setBookingState(prev => ({ 
        ...prev, 
        quote, 
        isLoadingQuote: false,
        quoteError: null 
      }));

      // Update property pricing in context
      await refreshPropertyPricing(
        property.id,
        bookingState.checkIn,
        bookingState.checkOut,
        bookingState.guests
      );

    } catch (error) {
      console.error('Error creating quote:', error);
      setBookingState(prev => ({ 
        ...prev, 
        quote: null,
        isLoadingQuote: false,
        quoteError: error instanceof Error ? error.message : 'Failed to get pricing'
      }));
    }
  };

  const handleDateSelection = (checkIn: string, checkOut: string) => {
    setBookingState(prev => ({
      ...prev,
      checkIn,
      checkOut,
      quote: null,
      quoteError: null
    }));
    setShowDatePicker(false);
  };

  const handleGuestChange = (guests: number) => {
    setBookingState(prev => ({
      ...prev,
      guests,
      quote: null,
      quoteError: null
    }));
  };

  const validateGuestDetails = (): boolean => {
    const errors: FormErrors = {};

    if (!guestDetails.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!guestDetails.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!guestDetails.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(guestDetails.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!guestDetails.phone.trim()) {
      errors.phone = 'Phone number is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleBookNow = async () => {
    if (!bookingState.quote) return;

    if (!validateGuestDetails()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const reservation = await guestyService.createReservation({
        quoteId: bookingState.quote._id,
        guest: {
          firstName: guestDetails.firstName,
          lastName: guestDetails.lastName,
          email: guestDetails.email,
          phone: guestDetails.phone
        }
      });

      // Move to confirmation step
      setBookingState(prev => ({ ...prev, step: 'confirmation' }));
      
      console.log('Reservation created:', reservation);
    } catch (error) {
      console.error('Error creating reservation:', error);
      alert('Failed to create reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateNights = () => {
    if (!bookingState.checkIn || !bookingState.checkOut) return 0;
    return guestyService.calculateNights(bookingState.checkIn, bookingState.checkOut);
  };

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Render confirmation step
  if (bookingState.step === 'confirmation') {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
          <p className="text-gray-600 mb-6">
            Your reservation has been successfully created. You will receive a confirmation email shortly.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Check-in:</span>
                <p>{formatDate(bookingState.checkIn)}</p>
              </div>
              <div>
                <span className="font-medium">Check-out:</span>
                <p>{formatDate(bookingState.checkOut)}</p>
              </div>
              <div>
                <span className="font-medium">Guests:</span>
                <p>{bookingState.guests}</p>
              </div>
              <div>
                <span className="font-medium">Total:</span>
                <p className="font-bold">
                  {bookingState.quote && formatCurrency(bookingState.quote.pricing.total, bookingState.quote.pricing.currency)}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Book Another Stay
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-6">Book Your Stay</h3>

      {/* Step 1: Date and Guest Selection */}
      <div className="space-y-4">
        {/* Date Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Dates
          </label>
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-md hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-gray-700">
                {bookingState.checkIn && bookingState.checkOut
                  ? `${formatDate(bookingState.checkIn)} - ${formatDate(bookingState.checkOut)}`
                  : 'Select check-in and check-out dates'
                }
              </span>
            </div>
          </button>

          {showDatePicker && (
            <div className="mt-2">
              <DatePicker
                listingId={property.guestyListingId}
                onDateSelect={handleDateSelection}
                availabilityData={availabilityData}
                isLoading={isLoadingAvailability}
              />
            </div>
          )}
        </div>

        {/* Guest Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Guests
          </label>
          <div className="flex items-center space-x-3">
            <Users className="h-5 w-5 text-gray-400" />
            <select
              value={bookingState.guests}
              onChange={(e) => handleGuestChange(parseInt(e.target.value))}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Array.from({ length: property.capacity }, (_, i) => i + 1).map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pricing Display */}
        {bookingState.isLoadingQuote && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-400 mr-2 animate-spin" />
              <span className="text-gray-600">Getting prices...</span>
            </div>
          </div>
        )}

        {bookingState.quoteError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-red-700">{bookingState.quoteError}</span>
            </div>
          </div>
        )}

        {bookingState.quote && !bookingState.isLoadingQuote && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-gray-900">Pricing Breakdown</span>
              <span className="text-sm text-gray-500">
                {calculateNights()} {calculateNights() === 1 ? 'night' : 'nights'}
              </span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Base rate ({calculateNights()} nights)</span>
                <span>{formatCurrency(bookingState.quote.pricing.baseAmount, bookingState.quote.pricing.currency)}</span>
              </div>
              
              {bookingState.quote.pricing.cleaningFee > 0 && (
                <div className="flex justify-between">
                  <span>Cleaning fee</span>
                  <span>{formatCurrency(bookingState.quote.pricing.cleaningFee, bookingState.quote.pricing.currency)}</span>
                </div>
              )}
              
              {bookingState.quote.pricing.serviceFee > 0 && (
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>{formatCurrency(bookingState.quote.pricing.serviceFee, bookingState.quote.pricing.currency)}</span>
                </div>
              )}
              
              {bookingState.quote.pricing.taxes > 0 && (
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>{formatCurrency(bookingState.quote.pricing.taxes, bookingState.quote.pricing.currency)}</span>
                </div>
              )}
              
              <hr className="my-2" />
              
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatCurrency(bookingState.quote.pricing.total, bookingState.quote.pricing.currency)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Guest Details Form */}
        {bookingState.quote && bookingState.step === 'dates' && (
          <div className="border-t pt-6">
            <h4 className="text-lg font-medium mb-4">Guest Details</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  value={guestDetails.firstName}
                  onChange={(e) => setGuestDetails(prev => ({ ...prev, firstName: e.target.value }))}
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formErrors.firstName ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your first name"
                />
                {formErrors.firstName && (
                  <p className="text-red-600 text-sm mt-1">{formErrors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={guestDetails.lastName}
                  onChange={(e) => setGuestDetails(prev => ({ ...prev, lastName: e.target.value }))}
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formErrors.lastName ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your last name"
                />
                {formErrors.lastName && (
                  <p className="text-red-600 text-sm mt-1">{formErrors.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={guestDetails.email}
                  onChange={(e) => setGuestDetails(prev => ({ ...prev, email: e.target.value }))}
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formErrors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
                {formErrors.email && (
                  <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  value={guestDetails.phone}
                  onChange={(e) => setGuestDetails(prev => ({ ...prev, phone: e.target.value }))}
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formErrors.phone ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your phone number"
                />
                {formErrors.phone && (
                  <p className="text-red-600 text-sm mt-1">{formErrors.phone}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Book Now Button */}
        {bookingState.quote && (
          <button
            onClick={handleBookNow}
            disabled={isSubmitting || !bookingState.quote}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isSubmitting ? 'Creating Reservation...' : 'Book Now'}
          </button>
        )}
      </div>
    </div>
  );
};

export default PropertyBookingWidget;

