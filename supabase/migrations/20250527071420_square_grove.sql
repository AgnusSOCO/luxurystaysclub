/*
  # Add Luxury Apartment Property

  1. Changes
    - Add new luxury apartment property at Helling Circle
    - Include comprehensive amenities list
    - Add high-quality images
  
  2. Notes
    - 3 bedrooms, 2 bathrooms
    - $750 per night
    - Single level apartment with elevator access
*/

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
  'Luxury Stays Club Apartment B6 304',
  jsonb_build_object(
    'city', 'Heber City',
    'country', 'USA',
    'address', '1134 West Helling Circle B6 304',
    'coordinates', jsonb_build_object(
      'lat', 40.5070,
      'lng', -111.4133
    )
  ),
  jsonb_build_object(
    'perNight', 750,
    'currency', 'USD'
  ),
  4.8,
  3,
  2,
  6,
  jsonb_build_object(
    'value', 1500,
    'unit', 'sq ft'
  ),
  'Be among the first to ski East Deer Valley''s pristine slopes. Located just a minute away, we offer unparalleled access, with a 500-space complimentary parking lot across the street and a quick shuttle to brand-new, state-of-the-art lifts. Just 10 min away Park City Magic & Exquisite Dining. 30 minutes from SLC Airport. Our convenient location with underground garage & elevator access, making every visit seamless from arrival to departure. Properties for those who appreciate luxury & detail.',
  'Luxury 3-bedroom apartment with easy ski access and mountain views',
  ARRAY[
    'Air conditioning',
    'Baking sheet',
    'Barbecue utensils',
    'Bathtub',
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
    'Free parking on premises',
    'Freezer',
    'Hair dryer',
    'Hangers',
    'Heating',
    'Hot water',
    'Iron',
    'Lake access',
    'Long term stays allowed',
    'Microwave',
    'Mosquito net',
    'Outdoor furniture',
    'Oven',
    'Patio or balcony',
    'Refrigerator',
    'Room-darkening shades',
    'Shampoo',
    'Single level home',
    'Smoke alarm',
    'Sound system',
    'Stove',
    'Toaster',
    'TV',
    'Wifi',
    'Wine glasses'
  ],
  ARRAY[
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1045781598506156078/original/f24974c6-bb1b-4ea1-871c-cc2a447097bb.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1045781598506156078/original/5b51fbd4-50fc-4c9c-930e-614e05bfe2f6.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1045781598506156078/original/1c9f4837-938b-4f48-a929-7d1cc488a8d0.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1045781598506156078/original/befbc278-3fed-4b3f-8f98-e5b6aa2f3120.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1045781598506156078/original/3f6ec66a-8910-4959-88e2-c85d958c48e6.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1045781598506156078/original/9ff14826-1842-4941-8656-41bf75589c1c.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1045781598506156078/original/9d256848-8407-4b7e-bff0-242e74315024.jpeg'
  ],
  true,
  'apartment'
);