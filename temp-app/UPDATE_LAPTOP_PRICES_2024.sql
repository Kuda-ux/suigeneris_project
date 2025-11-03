-- ============================================
-- UPDATE LAPTOP INVENTORY - November 2024
-- This script adds new laptops and updates prices
-- ============================================

-- ============================================
-- STEP 1: Update existing laptops with new prices
-- ============================================

-- HP EliteBook x360 1030 G3 - $360
UPDATE products
SET 
  price = 360,
  description = 'Professional 2-in-1 laptop with 360-degree hinge. Core i5 8th Gen, 13.3" touchscreen, 8GB RAM, 256GB SSD. Second-hand (Excellent condition).',
  stock_count = 5,
  updated_at = NOW()
WHERE name ILIKE '%EliteBook x360 1030 G3%';

-- HP EliteBook 840 G5 - $290
UPDATE products
SET 
  price = 290,
  description = 'Business-class laptop with premium build. Core i5 8th Gen, 14" display, 8GB RAM, 256GB SSD. Second-hand (Excellent condition).',
  stock_count = 5,
  updated_at = NOW()
WHERE name ILIKE '%EliteBook 840 G5%';

-- HP EliteBook 850 G5/G6 - $310
UPDATE products
SET 
  price = 310,
  description = 'Premium business laptop with large display. Core i5 8th Gen, 15.6" screen, 8GB RAM, 256GB SSD. Second-hand (Excellent condition).',
  stock_count = 5,
  updated_at = NOW()
WHERE name ILIKE '%EliteBook 850 G5%' OR name ILIKE '%EliteBook 850 G6%';

-- HP EliteBook 850 G3/G4 - $250 (Core i5 6th Gen)
UPDATE products
SET 
  price = 250,
  description = 'Reliable business laptop. Core i5 6th Gen, 15.6" display, 8GB RAM, 256GB SSD. Second-hand (Excellent condition).',
  stock_count = 5,
  updated_at = NOW()
WHERE (name ILIKE '%EliteBook 850 G3%' OR name ILIKE '%EliteBook 850 G4%')
  AND description ILIKE '%i5 6th%';

-- HP EliteBook 850 G3/G4 - $260 (Core i5 7th Gen)
UPDATE products
SET 
  price = 260,
  description = 'Reliable business laptop. Core i5 7th Gen, 15.6" display, 8GB RAM, 256GB SSD. Second-hand (Excellent condition).',
  stock_count = 5,
  updated_at = NOW()
WHERE (name ILIKE '%EliteBook 850 G3%' OR name ILIKE '%EliteBook 850 G4%')
  AND description ILIKE '%i5 7th%';

-- HP EliteBook 840 G3 - $290
UPDATE products
SET 
  price = 290,
  description = 'Compact business laptop. Core i7 6th Gen, 14" display, 8GB RAM, 256GB SSD. Second-hand (Excellent condition).',
  stock_count = 5,
  updated_at = NOW()
WHERE name ILIKE '%EliteBook 840 G3%';

-- Dell Latitude 5410 - $320
UPDATE products
SET 
  price = 320,
  description = 'Modern business laptop. Core i5 10th Gen, 14" display, 8GB RAM, 256GB SSD. Second-hand (Excellent condition).',
  stock_count = 5,
  updated_at = NOW()
WHERE name ILIKE '%Latitude 5410%';

-- Dell Latitude 7320 - $370
UPDATE products
SET 
  price = 370,
  description = 'Premium ultrabook. Core i5 11th Gen, 13.3" display, 16GB RAM, 256GB SSD. Second-hand (Excellent condition).',
  stock_count = 5,
  updated_at = NOW()
WHERE name ILIKE '%Latitude 7320%';

-- ============================================
-- STEP 2: Insert new laptops
-- ============================================

-- Dell Latitude E6420 - $100
INSERT INTO products (name, price, category, brand, description, stock_count, in_stock, warranty, created_at, updated_at)
VALUES (
  'Dell Latitude E6420',
  100,
  'Laptops',
  'Dell',
  'Budget-friendly business laptop. Core i3/i5 2nd Gen, 14" display, 8GB RAM, 500GB HDD. Second-hand (Excellent condition).',
  10,
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  price = 100,
  stock_count = 10,
  updated_at = NOW();

-- Microsoft Surface SE - $110
INSERT INTO products (name, price, category, brand, description, stock_count, in_stock, warranty, created_at, updated_at)
VALUES (
  'Microsoft Surface SE',
  110,
  'Laptops',
  'Microsoft',
  'Compact education laptop. Celeron N4020, 11.6" display, 4GB RAM, 64GB Storage. Second-hand (Excellent condition).',
  8,
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  price = 110,
  stock_count = 8,
  updated_at = NOW();

-- Lenovo X131e/X140e - $115
INSERT INTO products (name, price, category, brand, description, stock_count, in_stock, warranty, created_at, updated_at)
VALUES (
  'Lenovo ThinkPad X131e/X140e',
  115,
  'Laptops',
  'Lenovo',
  'Durable education laptop. Celeron 1007U, 11.6" display, 8GB RAM, 500GB SSD. Second-hand (Excellent condition).',
  8,
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  price = 115,
  stock_count = 8,
  updated_at = NOW();

-- Dell Latitude 3150 - $120
INSERT INTO products (name, price, category, brand, description, stock_count, in_stock, warranty, created_at, updated_at)
VALUES (
  'Dell Latitude 3150',
  120,
  'Laptops',
  'Dell',
  'Compact education laptop. Pentium N3540, 11.6" display, 8GB RAM, 128GB SSD. Second-hand (Excellent condition).',
  8,
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  price = 120,
  stock_count = 8,
  updated_at = NOW();

-- Dell Latitude 3189/3190 - $125
INSERT INTO products (name, price, category, brand, description, stock_count, in_stock, warranty, created_at, updated_at)
VALUES (
  'Dell Latitude 3189/3190',
  125,
  'Laptops',
  'Dell',
  'Versatile 2-in-1 laptop. Celeron N4120, 11.6" touchscreen, 4GB RAM, 128GB SSD. Second-hand (Excellent condition).',
  8,
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  price = 125,
  stock_count = 8,
  updated_at = NOW();

-- Dell Latitude E6440 - $160
INSERT INTO products (name, price, category, brand, description, stock_count, in_stock, warranty, created_at, updated_at)
VALUES (
  'Dell Latitude E6440',
  160,
  'Laptops',
  'Dell',
  'Powerful business laptop. Core i7 4th Gen, 14" display, 8GB RAM, 500GB HDD. Second-hand (Excellent condition).',
  8,
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  price = 160,
  stock_count = 8,
  updated_at = NOW();

-- Lenovo ThinkPad T460 - $180
INSERT INTO products (name, price, category, brand, description, stock_count, in_stock, warranty, created_at, updated_at)
VALUES (
  'Lenovo ThinkPad T460',
  180,
  'Laptops',
  'Lenovo',
  'Reliable ThinkPad series. Core i5 6th Gen, 14" display, 8GB RAM, 500GB HDD. Second-hand (Excellent condition).',
  8,
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  price = 180,
  stock_count = 8,
  updated_at = NOW();

-- Acer TravelMate P259-G2-M - $220
INSERT INTO products (name, price, category, brand, description, stock_count, in_stock, warranty, created_at, updated_at)
VALUES (
  'Acer TravelMate P259-G2-M',
  220,
  'Laptops',
  'Acer',
  'Business travel laptop. Core i7 6th Gen, 15.6" display, 8GB RAM, 128GB SSD. Second-hand (Excellent condition).',
  6,
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  price = 220,
  stock_count = 6,
  updated_at = NOW();

-- HP Pro x2 612 G2 - $230
INSERT INTO products (name, price, category, brand, description, stock_count, in_stock, warranty, created_at, updated_at)
VALUES (
  'HP Pro x2 612 G2 (Detachable 2-in-1)',
  230,
  'Laptops',
  'HP',
  'Versatile detachable 2-in-1. Core m5-7Y54, 12.5" touchscreen, 8GB RAM, 256GB SSD. Second-hand (Excellent condition).',
  5,
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  price = 230,
  stock_count = 5,
  updated_at = NOW();

-- Toshiba Dynabook Tecra A50-EC (i5 8th Gen) - $250
INSERT INTO products (name, price, category, brand, description, stock_count, in_stock, warranty, created_at, updated_at)
VALUES (
  'Toshiba Dynabook Tecra A50-EC (i5 8th Gen)',
  250,
  'Laptops',
  'Toshiba',
  'Professional business laptop. Core i5 8th Gen, 15.6" display, 8GB RAM, 256GB SSD. Second-hand (Excellent condition).',
  6,
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  price = 250,
  stock_count = 6,
  updated_at = NOW();

-- Dell Latitude 5290 2-in-1 - $260
INSERT INTO products (name, price, category, brand, description, stock_count, in_stock, warranty, created_at, updated_at)
VALUES (
  'Dell Latitude 5290 2-in-1',
  260,
  'Laptops',
  'Dell',
  'Convertible business laptop. Core i5 8th Gen, 12.3" touchscreen, 8GB RAM, 256GB SSD. Second-hand (Excellent condition).',
  5,
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  price = 260,
  stock_count = 5,
  updated_at = NOW();

-- Toshiba Dynabook Tecra A50-EC (i7 6th Gen) - $265
INSERT INTO products (name, price, category, brand, description, stock_count, in_stock, warranty, created_at, updated_at)
VALUES (
  'Toshiba Dynabook Tecra A50-EC (i7 6th Gen)',
  265,
  'Laptops',
  'Toshiba',
  'Professional business laptop. Core i7 6th Gen, 15.6" display, 8GB RAM, 256GB SSD. Second-hand (Excellent condition).',
  6,
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  price = 265,
  stock_count = 6,
  updated_at = NOW();

-- Toshiba Dynabook Tecra A50-EC (i7 8th Gen) - $280
INSERT INTO products (name, price, category, brand, description, stock_count, in_stock, warranty, created_at, updated_at)
VALUES (
  'Toshiba Dynabook Tecra A50-EC (i7 8th Gen)',
  280,
  'Laptops',
  'Toshiba',
  'High-performance business laptop. Core i7 8th Gen, 15.6" display, 8GB RAM, 256GB SSD. Second-hand (Excellent condition).',
  6,
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  price = 280,
  stock_count = 6,
  updated_at = NOW();

-- HP EliteBook 850 G7 - $450
INSERT INTO products (name, price, category, brand, description, stock_count, in_stock, warranty, created_at, updated_at)
VALUES (
  'HP EliteBook 850 G7',
  450,
  'Laptops',
  'HP',
  'Premium business laptop. Core i7 10th Gen, 15.6" display, 16GB RAM, 512GB SSD. Second-hand (Excellent condition).',
  5,
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  price = 450,
  stock_count = 5,
  updated_at = NOW();

-- Apple MacBook Pro 2017 - $520
INSERT INTO products (name, price, category, brand, description, stock_count, in_stock, warranty, created_at, updated_at)
VALUES (
  'Apple MacBook Pro 2017 15"',
  520,
  'Laptops',
  'Apple',
  'Professional creative workstation. Core i7, 15.6" Retina display, 16GB RAM, 4GB VRAM, 500GB SSD. Second-hand (Excellent condition).',
  3,
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  price = 520,
  stock_count = 3,
  updated_at = NOW();

-- Apple MacBook Pro 2019 - $580
INSERT INTO products (name, price, category, brand, description, stock_count, in_stock, warranty, created_at, updated_at)
VALUES (
  'Apple MacBook Pro 2019 15"',
  580,
  'Laptops',
  'Apple',
  'Latest generation MacBook Pro. Core i7, 15.6" Retina display, 16GB RAM, 4GB VRAM, 256GB SSD. Second-hand (Excellent condition).',
  3,
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  price = 580,
  stock_count = 3,
  updated_at = NOW();

-- HP 15 (i5 13th Gen) - $600 - BRAND NEW
INSERT INTO products (name, price, category, brand, description, stock_count, in_stock, warranty, created_at, updated_at)
VALUES (
  'HP 15 (Core i5 13th Gen)',
  600,
  'Laptops',
  'HP',
  'Latest generation laptop. Core i5 13th Gen, 15.6" display, 8GB RAM, 512GB SSD. BRAND NEW with full warranty.',
  8,
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  price = 600,
  stock_count = 8,
  updated_at = NOW();

-- HP 250 G10 (i5 13th Gen) - $620 - BRAND NEW
INSERT INTO products (name, price, category, brand, description, stock_count, in_stock, warranty, created_at, updated_at)
VALUES (
  'HP 250 G10 (Core i5 13th Gen)',
  620,
  'Laptops',
  'HP',
  'Business laptop with latest processor. Core i5 13th Gen, 15.6" display, 8GB RAM, 512GB SSD. BRAND NEW with full warranty.',
  8,
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  price = 620,
  stock_count = 8,
  updated_at = NOW();

-- Dell Latitude 7640 - $750
INSERT INTO products (name, price, category, brand, description, stock_count, in_stock, warranty, created_at, updated_at)
VALUES (
  'Dell Latitude 7640',
  750,
  'Laptops',
  'Dell',
  'High-end business ultrabook. Core i7 13th Gen, 16" display, 32GB RAM, 1TB SSD. Second-hand (Excellent condition).',
  3,
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  price = 750,
  stock_count = 3,
  updated_at = NOW();

-- Dell Precision 3580 - $750
INSERT INTO products (name, price, category, brand, description, stock_count, in_stock, warranty, created_at, updated_at)
VALUES (
  'Dell Precision 3580',
  750,
  'Laptops',
  'Dell',
  'Professional workstation laptop. Core i7 6th Gen, 15.6" display, 16GB RAM, 4GB VRAM, 512GB SSD. Second-hand (Excellent condition).',
  3,
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  price = 750,
  stock_count = 3,
  updated_at = NOW();

-- HP 15 (i7 13th Gen) - $780 - BRAND NEW
INSERT INTO products (name, price, category, brand, description, stock_count, in_stock, warranty, created_at, updated_at)
VALUES (
  'HP 15 (Core i7 13th Gen)',
  780,
  'Laptops',
  'HP',
  'High-performance laptop. Core i7 13th Gen, 15.6" display, 8GB RAM, 512GB SSD. BRAND NEW with full warranty.',
  6,
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  price = 780,
  stock_count = 6,
  updated_at = NOW();

-- HP 250 G10 (i7 13th Gen) - $800 - BRAND NEW
INSERT INTO products (name, price, category, brand, description, stock_count, in_stock, warranty, created_at, updated_at)
VALUES (
  'HP 250 G10 (Core i7 13th Gen)',
  800,
  'Laptops',
  'HP',
  'Premium business laptop. Core i7 13th Gen, 15.6" display, 8GB RAM, 512GB SSD. BRAND NEW with full warranty.',
  6,
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (name) DO UPDATE SET
  price = 800,
  stock_count = 6,
  updated_at = NOW();

-- ============================================
-- STEP 3: Verify all laptops and prices
-- ============================================
SELECT 
  name,
  price,
  brand,
  category,
  stock_count,
  in_stock,
  CASE 
    WHEN description ILIKE '%brand new%' THEN 'BRAND NEW'
    ELSE 'Second-hand (Excellent)'
  END as condition
FROM products
WHERE category = 'Laptops'
ORDER BY price ASC;

-- ============================================
-- STEP 4: Count total laptops
-- ============================================
SELECT 
  COUNT(*) as total_laptops,
  SUM(CASE WHEN description ILIKE '%brand new%' THEN 1 ELSE 0 END) as brand_new,
  SUM(CASE WHEN description ILIKE '%second-hand%' THEN 1 ELSE 0 END) as refurbished,
  SUM(stock_count) as total_stock
FROM products
WHERE category = 'Laptops';
