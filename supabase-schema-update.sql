-- Update products table to match app requirements
-- Run this in Supabase SQL Editor

-- Add missing columns
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS rating DECIMAL(2,1) DEFAULT 4.5,
ADD COLUMN IF NOT EXISTS reviews INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS image TEXT,
ADD COLUMN IF NOT EXISTS features TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS original_price NUMERIC,
ADD COLUMN IF NOT EXISTS badge VARCHAR(50),
ADD COLUMN IF NOT EXISTS sku VARCHAR(100);

-- Change warranty from varchar to boolean (if needed)
-- First, check if warranty is varchar
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'products' 
    AND column_name = 'warranty' 
    AND data_type = 'character varying'
  ) THEN
    -- Drop the old column and recreate as boolean
    ALTER TABLE products DROP COLUMN warranty;
    ALTER TABLE products ADD COLUMN warranty BOOLEAN DEFAULT false;
  END IF;
END $$;

-- Set default image from images array if image is null
UPDATE products 
SET image = images[1] 
WHERE image IS NULL AND images IS NOT NULL AND array_length(images, 1) > 0;

-- Add some default ratings if null
UPDATE products 
SET rating = 4.5 
WHERE rating IS NULL;

-- Add default reviews count
UPDATE products 
SET reviews = 0 
WHERE reviews IS NULL;

-- Verify the structure
SELECT 
  column_name, 
  data_type, 
  is_nullable 
FROM information_schema.columns 
WHERE table_name = 'products' 
ORDER BY ordinal_position;
