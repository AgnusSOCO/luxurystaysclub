/*
  # Add short description alias

  1. Changes
    - Add `shortDescription` column as an alias for `short_description`
    - This maintains backward compatibility while fixing the casing mismatch

  2. Notes
    - Uses a computed column to create an alias without data duplication
    - Ensures existing data remains intact
*/

ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS "shortDescription" text 
GENERATED ALWAYS AS (short_description) STORED;