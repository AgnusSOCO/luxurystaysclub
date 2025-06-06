/*
  # Add Luxury Property on Vissen Way

  1. Changes
    - Add new luxury townhouse property in Heber City
    - Include comprehensive amenities list
    - Add high-quality images
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
  'Vissen Way Townhouse',
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
    'value', 2000,
    'unit', 'sq ft'
  ),
  'Impressive luxury & Comfort, at these exquisite Town House, unforgettable moments. Deer Valley 2 min, Free Parking & overnight Lockers, so you don''t have to carry your equipment, lift tickets. Park City 15 min. Ski Rentals & delivery 2 min. Enjoy this superb town house, crafted by professionals, 2680 sqft. Private BBQ, HotTube & Fire Pit. Located in Mayflower-Deer Valley-Jordanelle Area. LUXURY STAY CLUB Approved. World-renowned winter activities at Deer Valley & Park City, known for its vibrant art scene, dining & shopping.',
  'Luxurious 4-bedroom townhouse minutes from Deer Valley with private hot tub',
  ARRAY[
    'Air conditioning',
    'Backyard',
    'Barbecue utensils',
    'Bathtub',
    'Bed linens',
    'Blender',
    'Body soap',
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
    'Dishes and silverware',
    'Dishwasher',
    'Dryer',
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
    'Outdoor furniture',
    'Oven',
    'Patio or balcony',
    'Private entrance',
    'Refrigerator',
    'Room-darkening shades',
    'Shampoo',
    'Shower gel',
    'Sound system',
    'Stove',
    'Toaster',
    'TV',
    'Waterfront',
    'Wifi',
    'Wine glasses'
  ],
  ARRAY[
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1025792825817870536/original/6b277472-7d5f-4eab-b016-b102bf10a4bc.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1025792825817870536/original/8cfb471c-16a2-4b67-8a7a-cd34d913d3c2.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1025792825817870536/original/a83ae6ce-f348-460a-aa8b-575958cd8c34.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1025792825817870536/original/4950bf18-04c5-44f5-b134-52f088c52480.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1025792825817870536/original/2a870b85-04ca-4d30-be3b-bb6928cbd158.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1025792825817870536/original/59883671-a4af-4dfd-aadd-e76e5b81bb43.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1025792825817870536/original/d259dd22-9072-46c6-a898-5cdfbf79e54f.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1025792825817870536/original/b5eaa8e2-b4ca-42c4-997b-5c85b4e93e1d.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1025792825817870536/original/74050fed-dc2e-47c6-9d2f-ab6a032566a1.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1025792825817870536/original/c21eefa6-ce22-4f16-9887-7267daa0ca51.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1025792825817870536/original/82d207b9-e426-4672-baa0-d16cb191a1eb.jpeg'
  ],
  true,
  'house'
);