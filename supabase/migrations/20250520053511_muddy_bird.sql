/*
  # Update Properties Table RLS Policies

  1. Changes
    - Drop existing RLS policies
    - Create new, more specific policies for different operations
    - Add proper admin role checks

  2. Security
    - Enable RLS (already enabled)
    - Add separate policies for:
      - Public read access
      - Admin full access
      - Authenticated user read access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated users to manage properties" ON properties;
DROP POLICY IF EXISTS "Allow public read access" ON properties;

-- Create new policies
-- Allow public read access
CREATE POLICY "Allow public read access"
ON properties
FOR SELECT
TO public
USING (true);

-- Allow admins full access
CREATE POLICY "Allow admins full access"
ON properties
FOR ALL
TO authenticated
USING (
  auth.jwt() ->> 'role' = 'admin'
)
WITH CHECK (
  auth.jwt() ->> 'role' = 'admin'
);

-- Allow authenticated users read access
CREATE POLICY "Allow authenticated users read access"
ON properties
FOR SELECT
TO authenticated
USING (true);