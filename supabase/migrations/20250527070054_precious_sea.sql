/*
  # Add Vissen Way 1028 Property

  1. Changes
    - Add new luxury townhouse property at 1028 West Vissen Way
    - Include all amenities and features
    - Set proper capacity and specifications
    - Add high-quality images
  
  2. Notes
    - Property features 4 bedrooms, 3.5 bathrooms
    - 2,680 sq ft of living space
    - Premium location near Deer Valley
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
  'Vissen Way Mountain Retreat',
  jsonb_build_object(
    'city', 'Heber City',
    'country', 'USA',
    'address', '1028 West Vissen Way',
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
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1025792825817870536/original/f5ebf1e6-8b1e-423f-86e7-80151ef3b7b3.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1025792825817870536/original/bcf4754f-9f97-440c-8f09-c96795f2c0ba.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1025792825817870536/original/c765a694-8f51-4ecd-969b-c206486d0163.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1025792825817870536/original/78195129-fe97-48f5-99d8-3d988d33fc64.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1025792825817870536/original/82d207b9-e426-4672-baa0-d16cb191a1eb.jpeg'
  ],
  true,
  'house'
);