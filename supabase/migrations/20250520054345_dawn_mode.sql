/*
  # Fix RLS Policies for Properties Table

  1. Changes
    - Drop existing policies
    - Create new comprehensive policies for admin access
    - Ensure proper role-based access control
  
  2. Security
    - Admins get full CRUD access
    - Authenticated users get read access
    - Public users get read access
    - All operations are protected by RLS
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable full access for admins" ON properties;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON properties;
DROP POLICY IF EXISTS "Enable read access for public users" ON properties;

-- Create new policies
CREATE POLICY "Enable read access for all"
ON properties
FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable insert for admins"
ON properties
FOR INSERT
TO authenticated
WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Enable update for admins"
ON properties
FOR UPDATE
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin')
WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Enable delete for admins"
ON properties
FOR DELETE
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');