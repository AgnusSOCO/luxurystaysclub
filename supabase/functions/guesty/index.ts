import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

// Guesty Booking Engine API Configuration
const GUESTY_BASE_URL = 'https://booking.guesty.com'
const GUESTY_CLIENT_ID = '0oap1fry71Km9xL8E5d7'
const GUESTY_CLIENT_SECRET = '6C0a5ngpHxJCcPmhg1KGicmneYIWX_2C4ROedlmHY0YiSyVB7W3edc6uHpbji3zu'

// Token cache (in production, use Redis or database)
let tokenCache = {
  token: null,
  expiresAt: null
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
}

/**
 * Get or refresh Guesty access token
 */
async function getGuestyToken() {
  // Check if we have a valid cached token
  if (tokenCache.token && tokenCache.expiresAt && Date.now() < tokenCache.expiresAt) {
    return tokenCache.token
  }

  console.log('Fetching new Guesty token...')
  
  try {
    const response = await fetch(`${GUESTY_BASE_URL}/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: GUESTY_CLIENT_ID,
        client_secret: GUESTY_CLIENT_SECRET,
        scope: 'read write'
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Token request failed:', response.status, errorText)
      throw new Error(`Token request failed: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    
    // Cache the token (expires in 24 hours, cache for 23 hours to be safe)
    tokenCache.token = data.access_token
    tokenCache.expiresAt = Date.now() + (23 * 60 * 60 * 1000) // 23 hours
    
    console.log('Successfully obtained Guesty token')
    return data.access_token
  } catch (error) {
    console.error('Error getting Guesty token:', error)
    throw error
  }
}

/**
 * Make authenticated request to Guesty API
 */
async function makeGuestyRequest(endpoint, options = {}) {
  const token = await getGuestyToken()
  
  const url = `${GUESTY_BASE_URL}${endpoint}`
  console.log('Making request to:', url)
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers
    }
  })

  console.log('Response status:', response.status)
  
  if (!response.ok) {
    const errorText = await response.text()
    console.error('Guesty API request failed:', response.status, errorText)
    throw new Error(`Guesty API request failed: ${response.status} - ${errorText}`)
  }

  const responseData = await response.json()
  console.log('Response data keys:', Object.keys(responseData))
  return responseData
}

/**
 * Get listings from Guesty
 */
async function getListings(searchParams = {}) {
  try {
    const queryParams = new URLSearchParams()
    
    // Add search parameters
    if (searchParams.limit) queryParams.append('limit', searchParams.limit)
    if (searchParams.skip) queryParams.append('skip', searchParams.skip)
    if (searchParams.city) queryParams.append('city', searchParams.city)
    if (searchParams.checkIn) queryParams.append('checkIn', searchParams.checkIn)
    if (searchParams.checkOut) queryParams.append('checkOut', searchParams.checkOut)
    if (searchParams.guests) queryParams.append('guests', searchParams.guests)

    const endpoint = `/api/listings${queryParams.toString() ? '?' + queryParams.toString() : ''}`
    return await makeGuestyRequest(endpoint)
  } catch (error) {
    console.error('Error fetching listings:', error)
    throw error
  }
}

/**
 * Get availability calendar for a specific listing
 * Using the correct endpoint: /api/listings/{listingId}/calendar
 */
async function getListingAvailability(listingId, startDate, endDate) {
  try {
    const queryParams = new URLSearchParams({
      from: startDate,
      to: endDate
    })
    
    const endpoint = `/api/listings/${listingId}/calendar?${queryParams.toString()}`
    const response = await makeGuestyRequest(endpoint)
    
    // The response should contain calendar data
    return response
  } catch (error) {
    console.error('Error fetching availability:', error)
    throw error
  }
}

/**
 * Create a reservation quote
 */
async function createReservationQuote(quoteData) {
  try {
    console.log('Creating quote with data:', JSON.stringify(quoteData, null, 2))
    
    const response = await makeGuestyRequest('/api/reservation-quotes', {
      method: 'POST',
      body: JSON.stringify(quoteData)
    })
    
    console.log('Quote created successfully:', response)
    return response
  } catch (error) {
    console.error('Error creating reservation quote:', error)
    throw error
  }
}

/**
 * Create instant reservation from quote
 */
async function createInstantReservation(reservationData) {
  try {
    console.log('Creating reservation with data:', JSON.stringify(reservationData, null, 2))
    
    const response = await makeGuestyRequest('/api/reservations/instant', {
      method: 'POST',
      body: JSON.stringify(reservationData)
    })
    
    console.log('Reservation created successfully:', response)
    return response
  } catch (error) {
    console.error('Error creating instant reservation:', error)
    throw error
  }
}

/**
 * Get listing details by ID
 */
async function getListingById(listingId) {
  try {
    const endpoint = `/api/listings/${listingId}`
    return await makeGuestyRequest(endpoint)
  } catch (error) {
    console.error('Error fetching listing details:', error)
    throw error
  }
}

/**
 * Test if a listing exists and is accessible
 */
async function testListingAccess(listingId) {
  try {
    const listing = await getListingById(listingId)
    console.log(`Listing ${listingId} found:`, listing.title || 'No title')
    return { success: true, listing }
  } catch (error) {
    console.error(`Listing ${listingId} not accessible:`, error.message)
    return { success: false, error: error.message }
  }
}

/**
 * Main handler function
 */
Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const path = url.pathname
    const method = req.method

    console.log(`${method} ${path}`)

    // Route: GET /health (for testing)
    if (path === '/health' && method === 'GET') {
      return new Response(JSON.stringify({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        tokenCached: !!tokenCache.token,
        tokenExpiresAt: tokenCache.expiresAt ? new Date(tokenCache.expiresAt).toISOString() : null,
        guestyBaseUrl: GUESTY_BASE_URL
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Route: GET /test-listing/:id (for testing specific listings)
    if (path.startsWith('/test-listing/') && method === 'GET') {
      const listingId = path.split('/')[2]
      const result = await testListingAccess(listingId)
      
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Route: GET /listings
    if (path === '/listings' && method === 'GET') {
      const searchParams = Object.fromEntries(url.searchParams)
      const listings = await getListings(searchParams)
      
      return new Response(JSON.stringify(listings), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Route: GET /listings/:id
    if (path.startsWith('/listings/') && method === 'GET' && !path.includes('/calendar')) {
      const listingId = path.split('/')[2]
      const listing = await getListingById(listingId)
      
      return new Response(JSON.stringify(listing), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Route: GET /listings/:id/calendar
    if (path.includes('/calendar') && method === 'GET') {
      const listingId = path.split('/')[2]
      const startDate = url.searchParams.get('startDate') || url.searchParams.get('from')
      const endDate = url.searchParams.get('endDate') || url.searchParams.get('to')
      
      if (!startDate || !endDate) {
        return new Response(JSON.stringify({ 
          error: 'startDate/from and endDate/to parameters are required' 
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }
      
      const calendar = await getListingAvailability(listingId, startDate, endDate)
      
      return new Response(JSON.stringify(calendar), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Route: POST /reservation-quotes
    if (path === '/reservation-quotes' && method === 'POST') {
      const quoteData = await req.json()
      
      // Validate required fields
      if (!quoteData.listingId || !quoteData.checkIn || !quoteData.checkOut) {
        return new Response(JSON.stringify({ 
          error: 'listingId, checkIn, and checkOut are required' 
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }
      
      const quote = await createReservationQuote(quoteData)
      
      return new Response(JSON.stringify(quote), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Route: POST /reservations/instant
    if (path === '/reservations/instant' && method === 'POST') {
      const reservationData = await req.json()
      
      // Validate required fields
      if (!reservationData.quoteId) {
        return new Response(JSON.stringify({ 
          error: 'quoteId is required' 
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }
      
      const reservation = await createInstantReservation(reservationData)
      
      return new Response(JSON.stringify(reservation), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // 404 for unknown routes
    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Function error:', error)
    
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      message: error.message,
      stack: error.stack
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})

