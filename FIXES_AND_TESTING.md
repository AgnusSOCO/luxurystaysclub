# Fixed Issues and Testing Guide

## Issues Found and Fixed:

### 1. ✅ Database Column Mapping
- **Issue**: PropertyContext wasn't properly mapping all database fields
- **Fix**: Updated PropertyContext to ensure Guesty fields are properly mapped
- **Files Updated**: `src/context/PropertyContext.tsx`

### 2. ⚠️ Potential Issues Still to Check:

#### A. Supabase Function Deployment
The Guesty integration requires the Supabase function to be deployed. Check:

1. **Verify Function is Deployed:**
   - Go to Supabase Dashboard > Edge Functions
   - Confirm `guesty` function exists and is deployed
   - Check function logs for errors

2. **Test Function Manually:**
   ```bash
   # Replace YOUR_PROJECT_ID and YOUR_ANON_KEY with actual values
   curl -X GET "https://YOUR_PROJECT_ID.supabase.co/functions/v1/guesty/listings" \
     -H "Authorization: Bearer YOUR_ANON_KEY" \
     -H "Content-Type: application/json"
   ```

#### B. Environment Variables
Verify these are set correctly in Vercel:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

#### C. CORS Issues
The Supabase function includes CORS headers, but verify no browser CORS errors.

## Testing Steps After Fix:

### 1. Deploy Updated Code
1. Update your codebase with the fixed PropertyContext
2. Deploy to Vercel
3. Clear browser cache

### 2. Test Property Pages
1. Visit any property page (e.g., Vissen Way Mountain Retreat)
2. Check if booking widget appears
3. Look for "Online booking not available" vs actual booking widget

### 3. Check Browser Console
1. Open Developer Tools (F12)
2. Look for:
   - Network errors (red requests)
   - JavaScript errors
   - CORS errors
   - Failed API calls

### 4. Test Booking Flow
1. Select dates in calendar
2. Check if pricing loads
3. Try changing guest count
4. Attempt to proceed with booking

## Expected Behavior After Fix:

✅ **Properties with Guesty IDs should show:**
- Date picker calendar
- "Getting prices..." when selecting dates
- Pricing breakdown when dates selected
- Guest details form when clicking "Book Now"

❌ **Properties without Guesty IDs should show:**
- "Online booking is not available for this property"

## Debug Information:

From your CSV, these properties have Guesty listing IDs:
- Vissen Way Mountain Retreat: `67e2f92fce83eb004c8be73f`
- Skyline Vista Penthouse: `67e2f9296cb6ba00107d89f3`
- Mountain Haven Estate: `67e2f936c507ab001215283e`
- Vissen Way Luxury Townhouse: `67e2f936c507ab001215283e`

## Next Steps:

1. **Deploy the updated PropertyContext code**
2. **Test a property page** (try Vissen Way Mountain Retreat first)
3. **Check browser console** for any errors
4. **Verify Supabase function** is deployed and working
5. **Report back** what you see in the booking widget

If you still see "Online booking not available" after deploying the fix, the issue is likely with the Supabase function deployment or environment variables.

