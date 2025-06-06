/*
  # Add Luxury Property in Park City

  1. Changes
    - Insert new luxury property with high-end amenities
    - Include professional photos and detailed amenities list
    - Set premium pricing and features
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
  'Mountain Haven Estate',
  jsonb_build_object(
    'city', 'Park City',
    'country', 'USA',
    'address', '994 West Eland Circle',
    'coordinates', jsonb_build_object(
      'lat', 40.6461,
      'lng', -111.4980
    )
  ),
  jsonb_build_object(
    'perNight', 1500,
    'currency', 'USD'
  ),
  5.0,
  5,
  4.5,
  12,
  jsonb_build_object(
    'value', 4050,
    'unit', 'sq ft'
  ),
  'Experience luxury living at its finest in this stunning 5-bedroom mountain estate. Nestled in the heart of Park City, this sophisticated retreat offers panoramic mountain views and world-class amenities. The gourmet kitchen features professional-grade appliances, perfect for entertaining, while the spacious great room showcases vaulted ceilings and a floor-to-ceiling stone fireplace. Each bedroom suite provides a private sanctuary, and the master retreat includes a spa-like bathroom and private balcony. The outdoor living space features a hot tub, fire pit, and covered dining area for year-round enjoyment.',
  'Luxurious 5-bedroom mountain estate with panoramic views and premium amenities',
  ARRAY[
    'Gourmet Kitchen with Professional Appliances',
    'Floor-to-Ceiling Stone Fireplace',
    'Private Hot Tub',
    'Outdoor Fire Pit',
    'Heated Floors',
    'Smart Home Technology',
    'Wine Cellar',
    'Home Theater Room',
    'Game Room',
    'Ski Storage Room',
    'Boot Warmers',
    'Heated Driveway',
    'Multiple Balconies',
    'Professional Interior Design',
    'High-End Furnishings',
    'Sonos Sound System',
    'High-Speed WiFi',
    'Designer Linens',
    'Luxury Bath Products',
    'Concierge Service',
    'Daily Housekeeping Available',
    'Private Chef Available',
    'Mountain Views',
    'Covered Parking'
  ],
  ARRAY[
    'https://a0.muscache.com/im/pictures/miso/Hosting-1277621150970363788/original/3b297fc6-f290-40c2-a194-017f1d091491.jpeg',
    'https://a0.muscache.com/im/pictures/miso/Hosting-1277621150970363788/original/cae23753-6bb4-4dce-84eb-dea063a438e4.jpeg',
    'https://a0.muscache.com/im/pictures/miso/Hosting-1277621150970363788/original/569c2941-963d-4930-b85c-44ba7e6fd3bf.jpeg',
    'https://a0.muscache.com/im/pictures/miso/Hosting-1277621150970363788/original/a596817b-39ed-441e-a53e-861d80c95d28.jpeg',
    'https://a0.muscache.com/im/pictures/miso/Hosting-1277621150970363788/original/fafaefaf-3a15-4453-a5a6-b47930528ea1.jpeg',
    'https://a0.muscache.com/im/pictures/miso/Hosting-1277621150970363788/original/918b55ff-36b5-4284-b486-4cf83b9037f1.jpeg',
    'https://a0.muscache.com/im/pictures/miso/Hosting-1277621150970363788/original/4acef481-b711-4e4e-9c83-83e5ba665cec.jpeg'
  ],
  true,
  'house'
);