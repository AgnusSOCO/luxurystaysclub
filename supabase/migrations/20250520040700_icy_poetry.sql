/*
  # Create properties table

  1. New Tables
    - `properties`
      - `id` (uuid, primary key)
      - `name` (text)
      - `location` (jsonb)
      - `price` (jsonb)
      - `rating` (numeric)
      - `bedrooms` (integer)
      - `bathrooms` (numeric)
      - `capacity` (integer)
      - `size` (jsonb)
      - `description` (text)
      - `short_description` (text)
      - `amenities` (text[])
      - `images` (text[])
      - `featured` (boolean)
      - `property_type` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `properties` table
    - Add policies for public read access
    - Add policies for authenticated users to manage properties
*/

CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location jsonb NOT NULL,
  price jsonb NOT NULL,
  rating numeric NOT NULL DEFAULT 0,
  bedrooms integer NOT NULL DEFAULT 1,
  bathrooms numeric NOT NULL DEFAULT 1,
  capacity integer NOT NULL DEFAULT 2,
  size jsonb NOT NULL,
  description text NOT NULL,
  short_description text NOT NULL,
  amenities text[] NOT NULL DEFAULT '{}',
  images text[] NOT NULL DEFAULT '{}',
  featured boolean NOT NULL DEFAULT false,
  property_type text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access"
  ON properties
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage properties"
  ON properties
  USING (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data if table is empty
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM properties LIMIT 1) THEN
    INSERT INTO properties (
      name, location, price, rating, bedrooms, bathrooms, capacity, size,
      description, short_description, amenities, images, featured, property_type
    )
    VALUES
      -- Add your sample properties here
      (
        'Mountain View Lodge',
        '{"city": "Park City", "country": "USA", "address": "123 Mountain Road", "coordinates": {"lat": 40.6461, "lng": -111.4980}}',
        '{"perNight": 1200, "currency": "USD"}',
        4.9,
        5,
        4.5,
        10,
        '{"value": 3500, "unit": "sq ft"}',
        'Luxurious mountain lodge with breathtaking views of Park City. Perfect for family gatherings or group retreats.',
        'Stunning mountain lodge with panoramic views',
        ARRAY['Ski-in/Ski-out', 'Hot Tub', 'Home Theater', 'Gourmet Kitchen', 'Mountain View'],
        ARRAY['https://images.pexels.com/photos/754268/pexels-photo-754268.jpeg'],
        true,
        'house'
      );
  END IF;
END $$;