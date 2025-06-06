/*
  # Remove Mountain View Lodge property

  1. Changes
    - Remove the sample Mountain View Lodge property that was added in the initial migration
    
  2. Notes
    - This ensures only real properties remain in the database
*/

DELETE FROM properties 
WHERE name = 'Mountain View Lodge';