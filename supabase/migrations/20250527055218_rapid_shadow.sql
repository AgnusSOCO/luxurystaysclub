/*
  # Remove duplicate Skyline Vista Penthouse

  1. Changes
    - Delete the duplicate Skyline Vista Penthouse property
    - Keep the Deer Valley Vista Penthouse
  
  2. Notes
    - This ensures we don't have duplicate properties at the same address
*/

DELETE FROM properties 
WHERE name = 'Skyline Vista Penthouse' 
AND location->>'address' = '1134 West Helling Circle';