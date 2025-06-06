ALTER TABLE properties
ADD COLUMN IF NOT EXISTS "guestyListingId" text,
ADD COLUMN IF NOT EXISTS "guestyCalendarId" text,
ADD COLUMN IF NOT EXISTS "guestyIntegrationStatus" text DEFAULT 'pending';

-- Update existing properties with Guesty IDs
UPDATE properties 
SET 
  "guestyListingId" = CASE 
    WHEN name = 'Skyline Vista Penthouse' THEN '65123abc'
    WHEN name = 'Deer Valley Vista Penthouse' THEN '65124def'
    WHEN name = 'Vissen Way Luxury Townhouse' THEN '65125ghi'
    WHEN name = 'Luxury Stays Club Apartment B6 304' THEN '65126jkl'
    ELSE NULL
  END,
  "guestyIntegrationStatus" = 'active'
WHERE name IN (
  'Skyline Vista Penthouse',
  'Deer Valley Vista Penthouse',
  'Vissen Way Luxury Townhouse',
  'Luxury Stays Club Apartment B6 304'
);