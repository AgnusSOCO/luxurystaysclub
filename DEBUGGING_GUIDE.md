# Guesty Integration Debugging & Fix Summary

## 🔧 Issues Fixed

### 1. **Incorrect Availability Endpoint**
**Problem:** Using deprecated `/api/v2/listings/{id}/availability` endpoint
**Fix:** Updated to correct `/api/listings/{id}/calendar` endpoint

### 2. **Availability Data Parsing**
**Problem:** Rigid parsing of availability response format
**Fix:** Flexible parsing that handles different response structures

### 3. **Missing Listing Access Testing**
**Problem:** No way to test if Guesty listing IDs are valid
**Fix:** Added `/test-listing/{id}` endpoint for debugging

### 4. **All 6 Properties Implementation**
**Problem:** Only 4 properties had Guesty integration
**Fix:** Properly handle all 6 properties with appropriate fallbacks

## 📊 Your Properties Status

Based on your database:

### ✅ **Active Guesty Integration (4 properties):**
1. **Vissen Way Mountain Retreat** - `67e2f92fce83eb004c8be73f`
2. **Skyline Vista Penthouse** - `67e2f9296cb6ba00107d89f3`  
3. **Vissen Way Luxury Townhouse** - `67e2f936c507ab001215283e`

### ⏳ **Pending Guesty Integration (1 property):**
4. **Mountain Haven Estate** - `67e2f936c507ab001215283e` (status: pending)

### 📝 **Database Only (2 properties):**
5. **Luxury Stays Club Apartment B6 304** - No Guesty ID
6. **Luxury Stays Club Apartment B6 302** - No Guesty ID

## 🚨 Potential Issues Found

### **Duplicate Guesty Listing ID**
- Mountain Haven Estate and Vissen Way Luxury Townhouse both use: `67e2f936c507ab001215283e`
- This may cause conflicts - each property should have a unique Guesty listing ID

## 🔍 Debugging Steps

### 1. **Test Supabase Function**
After deploying, test these endpoints:

```bash
# Health check
curl https://your-project.supabase.co/functions/v1/guesty/health

# Test specific listing access
curl https://your-project.supabase.co/functions/v1/guesty/test-listing/67e2f92fce83eb004c8be73f
```

### 2. **Check Browser Console**
When testing the website:
1. Open browser console (F12)
2. Look for these log messages:
   - `✅ Updated property [name] with real-time Guesty data`
   - `⚠️ Failed to fetch Guesty data for property [name]`
   - `📝 Property [name] uses database data only`

### 3. **Test Booking Flow**
1. Visit a property with active Guesty integration
2. Select dates
3. Check console for:
   - Calendar data structure logs
   - Quote creation logs
   - Any error messages

## 🛠️ Enhanced Features Added

### **Better Error Handling**
- Graceful fallbacks when Guesty API is unavailable
- Detailed logging for debugging
- User-friendly error messages

### **Flexible Availability Parsing**
- Handles different calendar response formats
- Assumes available when data is unclear (allows quote creation for definitive answer)
- Better date range validation

### **Comprehensive Property Support**
- All 6 properties properly handled
- Clear status indicators for each property type
- Appropriate booking widgets for each scenario

### **Enhanced Debugging**
- Test endpoints for individual listings
- Detailed console logging
- Health check endpoint with token status

## 🎯 Expected Behavior After Fix

### **For Active Guesty Properties:**
- Should show booking widget (not "booking unavailable")
- Real-time pricing updates when dates selected
- Calendar shows actual availability
- Complete booking flow works

### **For Pending Guesty Properties:**
- Shows booking widget but may have limited functionality
- Uses database pricing until Guesty status is active

### **For Database-Only Properties:**
- Shows "Online booking not available" message
- Displays contact information
- Uses database pricing and information

## 🚀 Deployment Checklist

1. ✅ Deploy updated Supabase function
2. ✅ Deploy updated frontend code
3. ✅ Test health endpoint
4. ✅ Test individual listing access
5. ✅ Test booking flow on active properties
6. ✅ Verify all 6 properties display correctly

## 🔧 If Still Not Working

### **Check These Common Issues:**

1. **Supabase Function Not Deployed**
   - Verify function appears in Supabase dashboard
   - Check function logs for errors

2. **Environment Variables Missing**
   - Ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set in Vercel
   - Redeploy after setting variables

3. **Guesty Account Issues**
   - Verify your Guesty credentials are correct
   - Check if Guesty account has booking engine activated

4. **Listing ID Issues**
   - Test individual listing IDs using the test endpoint
   - Verify listing IDs exist in your Guesty account

The integration now has comprehensive debugging tools and should provide clear error messages to help identify any remaining issues.

