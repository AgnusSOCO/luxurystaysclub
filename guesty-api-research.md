# Guesty Booking Engine API Research

## Authentication
- Uses OAuth 2.0 client credentials flow
- Client ID: 0oap1fry71Km9xL8E5d7
- Client Secret: 6C0a5ngpHxJCcPmhg1KGicmneYIWX_2C4ROedlmHY0YiSyVB7W3edc6uHpbji3zu
- Token endpoint: https://booking.guesty.com/oauth2/token
- Access token expires every 24 hours
- Scope: booking_engine:api

## API Base URL
- https://booking.guesty.com/api/v1

## Key Functionalities
1. **Perform Search** - Search for available properties by dates, location, and number of guests
2. **Get Property Info** - Get property details including address, description, amenities, pictures, price, and availability
3. **Get a Price Quote For Reservations** - Get updated price quote for selected property according to dates, number of guests, coupons, and selected rate plan
4. **Create a Reservation** - Create new reservation that will be synced with Guesty

## Booking Flow Phases
1. **Search & Evaluation** - Input stay requirements, compare and evaluate results
2. **Selection** - Choose specific property and dates
3. **Checkout** - Complete booking with guest details and payment

## Current Implementation Issues
- Current implementation uses legacy API endpoints
- Need to migrate to new Booking Engine API
- Authentication flow needs to be updated
- API endpoints need to be changed

## Required Updates
1. Update authentication to use OAuth 2.0 flow
2. Update API endpoints to use new Booking Engine API
3. Update response handling for new API structure
4. Add proper error handling and validation
5. Implement availability checking
6. Update pricing and quote functionality



## API Endpoints

### Authentication
- **POST** `https://booking.guesty.com/oauth2/token`
  - Body: `grant_type=client_credentials&scope=booking_engine:api&client_secret={CLIENT_SECRET}&client_id={CLIENT_ID}`
  - Returns: access_token, expires_in (24 hours)

### Listings
- **GET** `https://booking.guesty.com/api/listings` - Get all listings
- **GET** `https://booking.guesty.com/api/listings/{listingId}` - Get specific listing
- **GET** `https://booking.guesty.com/api/listings/availability` - Get listings by availability (DEPRECATED)
- **GET** `https://booking.guesty.com/api/listings/cities` - Get list of cities
- **GET** `https://booking.guesty.com/api/listings/{listingId}/calendar` - Get listing availability calendar

### Reservation Quotes
- **POST** `https://booking.guesty.com/api/reservations/quotes` - Create reservation quote
- **GET** `https://booking.guesty.com/api/reservations/quotes/{quoteId}` - Retrieve quote
- **POST** `https://booking.guesty.com/api/reservations/quotes/{quoteId}/coupon` - Update coupon in quote

### Reservations
- **POST** `https://booking.guesty.com/api/reservations/quotes/{quoteId}/instant` - Create instant reservation from quote
- **POST** `https://booking.guesty.com/api/reservations/quotes/{quoteId}/inquiry` - Create inquiry from quote
- **GET** `https://booking.guesty.com/api/reservations/{reservationId}` - Get reservation by ID

## Implementation Plan
1. Update authentication to use OAuth 2.0 flow with provided credentials
2. Replace legacy API calls with new Booking Engine API endpoints
3. Implement quote-based booking flow:
   - Create quote for selected dates/guests
   - Display pricing from quote
   - Create reservation from quote
4. Add proper error handling and validation
5. Update UI components to work with new API structure

