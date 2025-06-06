/*
  # Add Vissen Way Luxury Townhouse

  1. Changes
    - Remove any existing properties at 1012 West Vissen Way
    - Add new luxury townhouse property with:
      - 4 bedrooms, 3.5 bathrooms
      - $1,250 per night
      - 2,680 sq ft
      - Full amenities list
      - Complete image gallery
  
  2. Security
    - No security changes needed
    - Uses existing RLS policies
*/

-- First remove any existing properties at this address
DELETE FROM properties 
WHERE location->>'address' = '1012 West Vissen Way';

-- Add the new townhouse property
INSERT INTO properties (
  name,
  location,
  price,
  rating,
  bedrooms,
  bathrooms,
  capacity,
  size,
  description,
  short_description,
  amenities,
  images,
  featured,
  "propertyType"
) VALUES (
  'Vissen Way Luxury Townhouse',
  jsonb_build_object(
    'city', 'Heber City',
    'country', 'USA',
    'address', '1012 West Vissen Way',
    'coordinates', jsonb_build_object(
      'lat', 40.5070,
      'lng', -111.4133
    )
  ),
  jsonb_build_object(
    'perNight', 1250,
    'currency', 'USD'
  ),
  4.9,
  4,
  3.5,
  6,
  jsonb_build_object(
    'value', 2680,
    'unit', 'sq ft'
  ),
  'Be among the first to ski East Deer Valley''s pristine slopes. Located just a minute away, we offer unparalleled access, with a 500-space complimentary parking lot across the street and a quick shuttle to brand-new, state-of-the-art lifts. Just 10 min away Park City Magic & Exquisite Dining. 30 minutes from SLC Airport making every visit seamless from arrival to departure. Pristine 2 Level Town house, with 2 garages. Properties for those who appreciate luxury & detail. Discover modern luxury at these exquisite Town House, unforgettable moments, Deer Valley 2 min, Free Parking & overnight Lockers, so you don''t have to carry your equipment, lift tickets. Park City 12 min. Ski Rentals & delivery 2 min. Enjoy this superb town house, crafted by professionals, 2680 sqft. Private BBQ, HotTube & Fire Pit. Located in Mayflower-Deer Valley-Jordanelle Area. LUXURY STAY CLUB Approved. World-renowned winter activities at Deer Valley & Park City, known for its vibrant art scene, dining & shopping.',
  'Luxury townhouse with pristine mountain views and premium amenities',
  ARRAY[
    'Air conditioning',
    'Backyard',
    'Barbecue utensils',
    'Bathtub',
    'BBQ grill',
    'Bed linens',
    'Blender',
    'Body soap',
    'Carbon monoxide alarm',
    'Ceiling fan',
    'Cleaning available during stay',
    'Cleaning products',
    'Clothing storage',
    'Coffee',
    'Coffee maker',
    'Conditioner',
    'Cooking basics',
    'Crib',
    'Dedicated workspace',
    'Dining table',
    'Dishes and silverware',
    'Dishwasher',
    'Dryer',
    'Elevator',
    'Essentials',
    'Fire extinguisher',
    'Fire pit',
    'First aid kit',
    'Free parking on premises',
    'Freezer',
    'Hair dryer',
    'Hangers',
    'Heating',
    'Hot tub',
    'Hot water',
    'Indoor fireplace',
    'Iron',
    'Kitchen',
    'Lake access',
    'Long term stays allowed',
    'Microwave',
    'Outdoor dining area',
    'Outdoor furniture',
    'Oven',
    'Patio or balcony',
    'Private entrance',
    'Private living room',
    'Refrigerator',
    'Room-darkening shades',
    'Shampoo',
    'Shower gel',
    'Smoke alarm',
    'Sound system',
    'Stove',
    'Toaster',
    'TV',
    'Washer',
    'Waterfront',
    'Wifi',
    'Wine glasses'
  ],
  ARRAY[
    'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTAxODc4MzA0NjA2MDA3NTg4NQ%3D%3D/original/6a66b7d7-2096-4152-88d9-e21ef692f1d2.jpeg',
    'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTAxODc4MzA0NjA2MDA3NTg4NQ%3D%3D/original/90fbb80f-1554-4a88-8e5b-c77c7ef8098a.jpeg',
    'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTAxODc4MzA0NjA2MDA3NTg4NQ%3D%3D/original/e0551d97-ca50-497f-81ab-42714a1c111f.jpeg',
    'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTAxODc4MzA0NjA2MDA3NTg4NQ%3D%3D/original/293b669d-1788-4586-b142-b0d8261bc574.jpeg',
    'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTAxODc4MzA0NjA2MDA3NTg4NQ%3D%3D/original/5e4be431-311f-4008-b65f-a139649d8d7b.jpeg',
    'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTAxODc4MzA0NjA2MDA3NTg4NQ%3D%3D/original/95e6d748-5f25-42da-a53c-660ff6545759.jpeg',
    'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTAxODc4MzA0NjA2MDA3NTg4NQ%3D%3D/original/09d7eb60-45b7-4c53-acd1-07b73437c55a.jpeg',
    'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTAxODc4MzA0NjA2MDA3NTg4NQ%3D%3D/original/dbd6cf0e-8946-4700-afa3-49c51bae71f5.jpeg',
    'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTAxODc4MzA0NjA2MDA3NTg4NQ%3D%3D/original/f96c9251-e777-4d86-b8bd-112770165764.jpeg',
    'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTAxODc4MzA0NjA2MDA3NTg4NQ%3D%3D/original/c9408cc4-3e8e-451a-bfe8-7f2c53f56ac1.jpeg',
    'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTAxODc4MzA0NjA2MDA3NTg4NQ%3D%3D/original/9834b227-d876-4eef-be33-da803e4eebca.jpeg',
    'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTAxODc4MzA0NjA2MDA3NTg4NQ%3D%3D/original/f7feab20-c6db-4a99-8eb3-adf367fd0bf3.jpeg',
    'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTAxODc4MzA0NjA2MDA3NTg4NQ%3D%3D/original/4952a38f-d0be-4079-a6c9-83d925ffb9ea.jpeg'
  ],
  true,
  'house'
);