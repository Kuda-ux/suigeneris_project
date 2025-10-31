-- ============================================
-- SHOW COMPLETE DATABASE STRUCTURE
-- This will show me EXACTLY what columns exist
-- ============================================

-- STEP 1: Show ALL columns in products table
SELECT 
    column_name,
    data_type,
    character_maximum_length,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'products'
ORDER BY ordinal_position;

-- STEP 2: Show sample data from products table
SELECT * FROM products LIMIT 3;

-- STEP 3: Show ALL tables in your database
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- STEP 4: Show loan_applications table structure
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'loan_applications'
ORDER BY ordinal_position;

-- STEP 5: Show users table structure
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'users'
ORDER BY ordinal_position;

-- ============================================
-- PLEASE RUN THIS AND SEND ME THE RESULTS
-- I need to see the exact column names!
-- ============================================
