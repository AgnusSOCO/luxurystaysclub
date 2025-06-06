/*
  # Add Luxury Penthouse in Deer Valley

  1. Changes
    - Add new luxury penthouse property near Deer Valley
    - Include comprehensive amenities list
    - Add high-quality images
    - Set competitive pricing for the area
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
  'Deer Valley Vista Penthouse',
  jsonb_build_object(
    'city', 'Heber City',
    'country', 'USA',
    'address', '1134 West Helling Circle PH B6 301',
    'coordinates', jsonb_build_object(
      'lat', 40.5070,
      'lng', -111.4133
    )
  ),
  jsonb_build_object(
    'perNight', 650,
    'currency', 'USD'
  ),
  4.8,
  3,
  4,
  8,
  jsonb_build_object(
    'value', 1800,
    'unit', 'sq ft'
  ),
  'New gorgeous 3 bedroom condo, fully equipped, Be among the first to ski East Deer Valley''s pristine slopes. Located just a minute away, we offer unparalleled access, with a 500-space complimentary parking lot across the street and a quick shuttle to brand-new, state-of-the-art lifts. Just 10 minutes from Park City''s magic & exquisite dining, and 30 minutes from SLC Airport. Our convenient location features underground garage & elevator access. Perfect for those who appreciate luxury & detail. Discover modern luxury at these exquisite apartments for unforgettable moments. Enjoy complimentary parking & overnight lockers, so you don''t have to carry your equipment. Located in the Mayflower-Deer Valley-Jordanelle Area, this superb Penthouse is crafted by professionals, featuring underground parking, no stairs, Private BBQ & Fire Pit. LUXURY STAY CLUB Approved. Experience world-renowned winter activities at Deer Valley & Park City, known for its vibrant art scene, dining & shopping.',
  'New luxury 3-bedroom penthouse minutes from Deer Valley with stunning mountain views',
  ARRAY[
    'Air Conditioning',
    'Baking Sheet',
    'BBQ Grill with Utensils',
    'Bathtub',
    'Bed Linens',
    'Blender',
    'Body Soap',
    'Carbon Monoxide Alarm',
    'Ceiling Fan',
    'Cleaning Service Available',
    'Cleaning Products',
    'Clothing Storage',
    'Coffee Making Station',
    'Keurig Coffee Machine',
    'Conditioner',
    'Fully Equipped Kitchen',
    'Cooking Basics',
    'Crib Available',
    'Dedicated Workspace',
    'Dining Table for 8',
    'Dishes and Silverware',
    'Dishwasher',
    'Dryer',
    'Elevator Access',
    'Essential Amenities',
    'Fire Extinguisher',
    'Private Fire Pit',
    'First Aid Kit',
    'Free Underground Parking',
    'Freezer',
    'Hair Dryer',
    'Hangers',
    'Heating',
    'Hot Water',
    'Indoor Fireplace',
    'Iron',
    'Gourmet Kitchen',
    'Lake Access',
    'Long-Term Stays Welcome',
    'Microwave',
    'Mosquito Net',
    'Outdoor Dining Area',
    'Outdoor Furniture',
    'Oven',
    'Private Balcony',
    'Private Living Room',
    'Refrigerator',
    'Room-Darkening Shades',
    'Shampoo',
    'Single Level Home',
    'Smoke Alarm',
    'Sound System',
    'Stove',
    'Toaster',
    'Smart TV',
    'Washer',
    'High-Speed WiFi',
    'Wine Glasses'
  ],
  ARRAY[
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1013637229951743635/original/d6ea452b-a4d8-4ad2-a2be-1812f9bc1eff.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1013637229951743635/original/40fba8a9-5d02-4f3a-b0b1-d736b54768cf.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1013637229951743635/original/3b6e486b-20c6-436a-b3df-7d624a832be6.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1013637229951743635/original/8a7a34bd-6c7e-4f5c-8715-661ac7c7f4b7.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1013637229951743635/original/c2782a14-4552-44e5-a2a1-1ae224aa21cb.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1013637229951743635/original/391afa6c-3c1b-4865-b076-56417aef5620.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1013637229951743635/original/17b23344-6dfe-42e8-bb2c-81028d754281.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1013637229951743635/original/4d43b26e-15f6-45da-96e4-404d1b7fa6ca.jpeg',
    'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1013637229951743635/original/d0bd4b41-a914-426e-a138-5a0db52be6b2.jpeg'
  ],
  true,
  'penthouse'
);