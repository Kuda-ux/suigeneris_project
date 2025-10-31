-- ============================================
-- CHECK PRODUCTS TABLE STRUCTURE
-- ============================================

-- Check what columns exist in products table
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'products'
ORDER BY ordinal_position;

-- Check existing products
SELECT * FROM products LIMIT 5;
