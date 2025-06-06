/*
  # Rename property_type column to match frontend code

  1. Changes
    - Rename 'property_type' column to 'propertyType' in properties table
    to match the camelCase naming used in the frontend code

  2. Security
    - No security changes needed as this is just a column rename
*/

DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'properties' 
    AND column_name = 'property_type'
  ) THEN
    ALTER TABLE properties RENAME COLUMN property_type TO "propertyType";
  END IF;
END $$;