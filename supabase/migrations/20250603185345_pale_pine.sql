/*
  # Update Guesty Integration IDs
  
  1. Changes
    - Update properties with correct Guesty listing IDs
    - Set integration status to active
    
  2. Notes
    - Maps each property to its corresponding Guesty ID
    - Enables proper integration with Guesty booking system
*/

-- Update properties with correct Guesty IDs
UPDATE properties 
SET 
  "guestyListingId" = CASE 
    WHEN location->>'address' = '1012 West Vissen Way' THEN '67e2f936c507ab001215283e'
    WHEN location->>'address' = '1028 West Vissen Way' THEN '67e2f92fce83eb004c8be73f'
    WHEN location->>'address' = '1134 West Helling Circle PH B6 301' THEN '67e2f92aebc0000013814504'
    WHEN location->>'address' = '1134 West Helling Circle PH B6 302' THEN '67e2f9296cb6ba00107d89f3'
    WHEN location->>'address' = '1134 West Helling Circle B6 304' THEN '67e2f93439a23f0042ac9d4b'
    ELSE "guestyListingId"
  END,
  "guestyIntegrationStatus" = 'active'
WHERE location->>'address' IN (
  '1012 West Vissen Way',
  '1028 West Vissen Way',
  '1134 West Helling Circle PH B6 301',
  '1134 West Helling Circle PH B6 302',
  '1134 West Helling Circle B6 304'
);