/*
  # Update Properties Table RLS Policies

  1. Changes
    - Drop existing policies
    - Create new policies with proper INSERT permissions for admin users
  
  2. Security
    - Enable RLS on properties table (already enabled)
    - Add policies for:
      - Admin users: Full access (SELECT, INSERT, UPDATE, DELETE)
      - Authenticated users: Read-only access
      - Public users: Read-only access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow admins full access" ON properties;
DROP POLICY IF EXISTS "Allow authenticated users read access" ON properties;
DROP POLICY IF EXISTS "Allow public read access" ON properties;

-- Create new policies
CREATE POLICY "Allow admins full access" 
ON properties
FOR ALL 
TO authenticated
USING (
  (auth.jwt() ->> 'role'::text) = 'admin'::text
)
WITH CHECK (
  (auth.jwt() ->> 'role'::text) = 'admin'::text
);

CREATE POLICY "Allow authenticated users read access" 
ON properties
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Allow public read access" 
ON properties
FOR SELECT 
TO public
USING (true);