/*
  # Add Luxury Penthouse Property

  1. Changes
    - Add new luxury penthouse property in Heber City
    - Include comprehensive amenities list
    - Add high-quality images
    - Set as featured property
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
  'Skyline Vista Penthouse',
  jsonb_build_object(
    'city', 'Heber City',
    'country', 'USA',
    'address', '1134 West Helling Circle',
    'coordinates', jsonb_build_object(
      'lat', 40.5070,
      'lng', -111.4133
    )
  ),
  jsonb_build_object(
    'perNight', 850,
    'currency', 'USD'
  ),
  4.9,
  3,
  2,
  8,
  jsonb_build_object(
    'value', 1830,
    'unit', 'sq ft'
  ),
  'Welcome to Skyline Vista Penthouse, a stunning single-level retreat offering breathtaking mountain views and modern luxury living. This meticulously designed 3-bedroom haven features an open-concept living space with floor-to-ceiling windows, flooding the interior with natural light. The gourmet kitchen boasts high-end appliances and a Keurig coffee station, perfect for morning refreshments on your private balcony. Enjoy the cozy indoor fireplace, or gather around the outdoor fire pit for evening entertainment. With fiber internet and a dedicated workspace, this penthouse seamlessly blends luxury with functionality, making it ideal for both vacation stays and remote work retreats.',
  'Luxurious 3-bedroom penthouse with panoramic views and modern amenities',
  ARRAY[
    'Air Conditioning',
    'Gourmet Kitchen',
    'Professional Appliances',
    'Keurig Coffee Machine',
    'Private Balcony',
    'Mountain Views',
    'Indoor Fireplace',
    'Outdoor Fire Pit',
    'Dedicated Workspace',
    'High-Speed Fiber Internet',
    'Smart TV',
    'Sonos Sound System',
    'Elevator Access',
    'Heated Floors',
    'Wine Storage',
    'Private Parking Garage',
    'Lake Access',
    'Outdoor Dining Area',
    'Designer Furnishings',
    'Luxury Linens',
    'Premium Bath Products',
    'Full-Size Washer & Dryer',
    'Room-Darkening Shades',
    'Climate Control',
    'Security System',
    'BBQ Grill with Utensils',
    'Fully Equipped Kitchen',
    'High-End Cookware',
    'Wine Glasses',
    'Coffee Making Station',
    'Dining Table for 8',
    'Smart Home Features',
    'Cleaning Service Available',
    'Long-Term Stay Ready'
  ],
  ARRAY[
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1011540358427023876/original/ec147423-b3a4-4970-a51c-a4b288ebe4ac.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1011540358427023876/original/a7d47888-308e-45b1-a8ae-f4ed5bf45d3a.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1011540358427023876/original/b32211e6-9361-42e0-9841-d74ed16ff19f.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1011540358427023876/original/9f8d2f8b-16cd-4dc5-94c2-1aa465e36fe2.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1011540358427023876/original/02180ff6-1d39-4a3a-8375-54d653aea201.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1011540358427023876/original/50e79920-f06d-4677-9ba3-2070652ca57d.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1011540358427023876/original/c0882ff0-a529-4053-a800-9b663d4c8cef.jpeg'
  ],
  true,
  'penthouse'
);