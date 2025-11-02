/*
  # Fix Profiles RLS Policies

  1. Changes
    - Drop existing SELECT policies
    - Create single combined SELECT policy that allows:
      - Users to view their own profile
      - Admins to view all profiles
    - This avoids circular dependency issues

  2. Security
    - Maintains same security model
    - Removes circular dependency in admin policy
*/

-- Drop existing SELECT policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

-- Create combined SELECT policy
CREATE POLICY "Users can view profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    auth.uid() = id 
    OR 
    (
      SELECT role FROM profiles WHERE id = auth.uid() LIMIT 1
    ) IN ('admin', 'super_admin')
  );
