/*
  # Update Properties Table RLS Policies

  1. Changes
    - Drop existing policies
    - Create new comprehensive policies for admin access
    - Add separate policies for public and authenticated read access
  
  2. Security
    - Admins get full CRUD access
    - Authenticated users get read access
    - Public users get read access
    - All operations are protected by RLS
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow admins full access" ON properties;
DROP POLICY IF EXISTS "Allow authenticated users read access" ON properties;
DROP POLICY IF EXISTS "Allow public read access" ON properties;

-- Create new policies
CREATE POLICY "Enable full access for admins"
ON properties
FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin')
WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Enable read access for authenticated users"
ON properties
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable read access for public users"
ON properties
FOR SELECT
TO public
USING (true);