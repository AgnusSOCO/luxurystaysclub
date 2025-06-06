/*
  # Clean up duplicate properties and ensure correct data

  1. Changes
    - Remove duplicate Vissen Way Townhouse property
    - Keep only the latest version with the updated description and amenities
  
  2. Notes
    - This ensures we have only one instance of each property
    - Maintains data integrity
*/

-- Remove the duplicate Vissen Way Townhouse (keeping only the latest version)
DELETE FROM properties 
WHERE name = 'Vissen Way Townhouse' 
AND description NOT LIKE 'Be among the first to ski East Deer Valley%';