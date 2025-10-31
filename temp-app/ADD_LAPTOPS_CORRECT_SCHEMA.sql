-- ============================================
-- ADD ALL 38 LAPTOPS - CORRECT SCHEMA
-- Using actual column names from products table
-- ============================================

-- STEP 1: Add missing columns for laptop specs
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS processor TEXT,
ADD COLUMN IF NOT EXISTS ram TEXT,
ADD COLUMN IF NOT EXISTS storage TEXT,
ADD COLUMN IF NOT EXISTS display TEXT,
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- STEP 2: Clear existing laptops (optional - comment out if you want to keep old ones)
-- DELETE FROM products WHERE category = 'laptops';

-- STEP 3: Insert all 38 laptops with correct column names
-- Using: name, description, price, category, brand, image, processor, ram, storage, display, warranty, is_featured, stock_count, in_stock
INSERT INTO products (name, description, price, category, brand, image, processor, ram, storage, display, warranty, is_featured, stock_count, in_stock, created_at) VALUES

-- Budget Range ($105 - $160)
('Microsoft Surface SE', 'Celeron N4020 @1.10 GHz | 4 GB RAM | 64 GB SD | 11.6" Display | Warranty Included', 105.00, 'laptops', 'Microsoft', '/laptops/microsoft-surface-se.jpg', 'Celeron N4020 @1.10 GHz', '4 GB', '64 GB SD', '11.6"', true, false, 10, true, NOW()),

('Lenovo x131e / x140e', 'Celeron 1007U @1.50 GHz | 8 GB RAM | 500 GB SSD | 11.6" Display | Warranty Included', 115.00, 'laptops', 'Lenovo', '/laptops/lenovo-x131e.jpg', 'Celeron 1007U @1.50 GHz', '8 GB', '500 GB SSD', '11.6"', true, false, 10, true, NOW()),

('Dell Latitude 3150', 'Pentium N3540 @2.16 GHz | 8 GB RAM | 128 GB SSD | 11.6" Display | Warranty Included', 120.00, 'laptops', 'Dell', '/laptops/dell-latitude-3150.jpg', 'Pentium N3540 @2.16 GHz', '8 GB', '128 GB SSD', '11.6"', true, false, 10, true, NOW()),

('Lenovo ThinkPad Yoga 11e', 'Celeron N2930 @1.83 GHz | 8 GB RAM | 500 GB HDD | 11.6" Display | Warranty Included', 120.00, 'laptops', 'Lenovo', '/laptops/lenovo-yoga-11e.jpg', 'Celeron N2930 @1.83 GHz', '8 GB', '500 GB HDD', '11.6"', true, false, 10, true, NOW()),

('Dell Latitude 3189 / 3190', 'Celeron N4120 @1.10 GHz | 4 GB RAM | 128 GB SSD | 11.6" Display | Warranty Included', 125.00, 'laptops', 'Dell', '/laptops/dell-latitude-3189.jpg', 'Celeron N4120 @1.10 GHz', '4 GB', '128 GB SSD', '11.6"', true, false, 10, true, NOW()),

('Dell Latitude 3340 (i3)', 'Intel Core i3 4th Gen @1.70 GHz | 8 GB RAM | 500 GB HDD | 13.3" Display | Warranty Included', 140.00, 'laptops', 'Dell', '/laptops/dell-latitude-3340-i3.jpg', 'i3 4th @1.70 GHz', '8 GB', '500 GB HDD', '13.3"', true, false, 10, true, NOW()),

('Dell Latitude 3340 (i5)', 'Intel Core i5 4th Gen @1.70 GHz | 8 GB RAM | 500 GB HDD | 13.3" Display | Warranty Included', 150.00, 'laptops', 'Dell', '/laptops/dell-latitude-3340-i5.jpg', 'i5 4th @1.70 GHz', '8 GB', '500 GB HDD', '13.3"', true, false, 10, true, NOW()),

('Dell Latitude E7250', 'Intel Core i5 5th Gen @2.30 GHz | 8 GB RAM | 256 GB SSD | 12.5" Display | Warranty Included', 160.00, 'laptops', 'Dell', '/laptops/dell-latitude-e7250.jpg', 'i5 5th @2.30 GHz', '8 GB', '256 GB SSD', '12.5"', true, true, 10, true, NOW()),

-- Mid-Budget Range ($220 - $290)
('Lenovo ThinkPad X270', 'Intel Core i5 6th Gen | 8 GB RAM | 256 GB SSD | 12.5" Display | Warranty Included', 220.00, 'laptops', 'Lenovo', '/laptops/lenovo-x270.jpg', 'i5 6th Gen', '8 GB', '256 GB SSD', '12.5"', true, false, 10, true, NOW()),

('Lenovo V15', 'Intel Core i3 10th Gen | 4 GB RAM | 256 GB SSD | 15.6" Display | Warranty Included', 250.00, 'laptops', 'Lenovo', '/laptops/lenovo-v15.jpg', 'i3 10th Gen', '4 GB', '256 GB SSD', '15.6"', true, false, 10, true, NOW()),

('Dell Latitude 7200', 'Intel Core i5 8th Gen | 8 GB RAM | 256 GB SSD | 12.3" Display | Warranty Included', 260.00, 'laptops', 'Dell', '/laptops/dell-latitude-7200.jpg', 'i5 8th Gen', '8 GB', '256 GB SSD', '12.3"', true, false, 10, true, NOW()),

('Lenovo ThinkPad X280', 'Intel Core i5 8th Gen | 8 GB RAM | 256 GB SSD | 12.5" Display | Warranty Included', 260.00, 'laptops', 'Lenovo', '/laptops/lenovo-x280.jpg', 'i5 8th Gen', '8 GB', '256 GB SSD', '12.5"', true, false, 10, true, NOW()),

('Dell Latitude 5400', 'Intel Core i5 8th Gen @1.60 GHz | 8 GB RAM | 256 GB SSD | 14" Display | Warranty Included', 265.00, 'laptops', 'Dell', '/laptops/dell-latitude-5400.jpg', 'i5 8th @1.60 GHz', '8 GB', '256 GB SSD', '14"', true, true, 10, true, NOW()),

('Toshiba Dynabook Tecra A50-EC (i5)', 'Intel Core i5 8th Gen @1.70 GHz | 8 GB RAM | 256 GB SSD | 15.6" Display | Warranty Included', 265.00, 'laptops', 'Toshiba', '/laptops/toshiba-tecra-a50-i5.jpg', 'i5 8th @1.70 GHz', '8 GB', '256 GB SSD', '15.6"', true, false, 10, true, NOW()),

('Lenovo IdeaPad 3', 'Intel Core i3 11th Gen | 8 GB RAM | 256 GB SSD | 15.6" Display | Warranty Included', 270.00, 'laptops', 'Lenovo', '/laptops/lenovo-ideapad-3.jpg', 'i3 11th Gen', '8 GB', '256 GB SSD', '15.6"', true, false, 10, true, NOW()),

('Lenovo ThinkPad L490', 'Intel Core i5 8th Gen | 8 GB RAM | 256 GB SSD | 14" Display | Warranty Included', 280.00, 'laptops', 'Lenovo', '/laptops/lenovo-l490.jpg', 'i5 8th Gen', '8 GB', '256 GB SSD', '14"', true, false, 10, true, NOW()),

('Toshiba Dynabook Tecra A50-EC (i7)', 'Intel Core i7 8th/6th Gen @1.90 GHz | 8 GB RAM | 256 GB SSD | 15.6" Display | Warranty Included', 290.00, 'laptops', 'Toshiba', '/laptops/toshiba-tecra-a50-i7.jpg', 'i7 8/6th @1.90 GHz', '8 GB', '256 GB SSD', '15.6"', true, false, 10, true, NOW()),

-- Professional Range ($300 - $390)
('Lenovo ThinkPad T480', 'Intel Core i5 8th Gen | 8 GB RAM | 256 GB SSD | 14" Display | Warranty Included | Business Class', 300.00, 'laptops', 'Lenovo', '/laptops/lenovo-t480.jpg', 'i5 8th Gen', '8 GB', '256 GB SSD', '14"', true, true, 10, true, NOW()),

('Toshiba Satellite Pro', 'Intel Core i5 8th Gen | 8 GB RAM | 256 GB SSD | 15.6" Display | Warranty Included', 310.00, 'laptops', 'Toshiba', '/laptops/toshiba-satellite-pro.jpg', 'i5 8th Gen', '8 GB', '256 GB SSD', '15.6"', true, false, 10, true, NOW()),

('Dell Latitude 5410', 'Intel Core i5 10th Gen | 8 GB RAM | 256 GB SSD | 14" Display | Warranty Included', 320.00, 'laptops', 'Dell', '/laptops/dell-latitude-5410.jpg', 'i5 10th Gen', '8 GB', '256 GB SSD', '14"', true, false, 10, true, NOW()),

('Lenovo ThinkPad T490', 'Intel Core i5 8th Gen | 8 GB RAM | 256 GB SSD | 14" Display | Warranty Included | Business Class', 330.00, 'laptops', 'Lenovo', '/laptops/lenovo-t490.jpg', 'i5 8th Gen', '8 GB', '256 GB SSD', '14"', true, true, 10, true, NOW()),

('HP EliteBook x360 1030 G3', 'Intel Core i5 8th Gen @1.70 GHz | 8 GB RAM | 256 GB SSD | 13.3" Touchscreen | 2-in-1 Convertible | Warranty Included', 360.00, 'laptops', 'HP', '/laptops/hp-elitebook-x360.jpg', 'i5 8th @1.70 GHz', '8 GB', '256 GB SSD', '13.3" Touch', true, true, 10, true, NOW()),

('Lenovo ThinkPad E14 Gen 2', 'Intel Core i5 10th Gen | 8 GB RAM | 256 GB SSD | 14" Display | Warranty Included', 360.00, 'laptops', 'Lenovo', '/laptops/lenovo-e14-gen2.jpg', 'i5 10th Gen', '8 GB', '256 GB SSD', '14"', true, false, 10, true, NOW()),

('Dell Latitude 7320', 'Intel Core i5 11th Gen @2.60 GHz | 16 GB RAM | 256 GB SSD | 13.3" Display | Warranty Included | Premium Build', 370.00, 'laptops', 'Dell', '/laptops/dell-latitude-7320.jpg', 'i5 11th @2.60 GHz', '16 GB', '256 GB SSD', '13.3"', true, true, 10, true, NOW()),

('Lenovo ThinkPad E15 Gen 2', 'Intel Core i5 10th Gen | 8 GB RAM | 256 GB SSD | 15.6" Display | Warranty Included', 370.00, 'laptops', 'Lenovo', '/laptops/lenovo-e15-gen2.jpg', 'i5 10th Gen', '8 GB', '256 GB SSD', '15.6"', true, false, 10, true, NOW()),

('Dell Latitude 5420', 'Intel Core i5 11th Gen | 8 GB RAM | 256 GB SSD | 14" Display | Warranty Included', 380.00, 'laptops', 'Dell', '/laptops/dell-latitude-5420.jpg', 'i5 11th Gen', '8 GB', '256 GB SSD', '14"', true, false, 10, true, NOW()),

('Lenovo IdeaPad 5', 'Intel Core i5 11th Gen | 8 GB RAM | 512 GB SSD | 15.6" Display | Warranty Included', 390.00, 'laptops', 'Lenovo', '/laptops/lenovo-ideapad-5.jpg', 'i5 11th Gen', '8 GB', '512 GB SSD', '15.6"', true, false, 10, true, NOW()),

-- Premium Range ($400 - $650)
('Toshiba Portege X30', 'Intel Core i7 8th Gen | 8 GB RAM | 256 GB SSD | 13.3" Display | Warranty Included | Ultra-Portable', 400.00, 'laptops', 'Toshiba', '/laptops/toshiba-portege-x30.jpg', 'i7 8th Gen', '8 GB', '256 GB SSD', '13.3"', true, false, 10, true, NOW()),

('Lenovo IdeaPad Flex 5', 'Intel Core i5 11th Gen | 8 GB RAM | 256 GB SSD | 14" Touchscreen | 2-in-1 Convertible | Warranty Included', 420.00, 'laptops', 'Lenovo', '/laptops/lenovo-flex-5.jpg', 'i5 11th Gen', '8 GB', '256 GB SSD', '14" Touch', true, true, 10, true, NOW()),

('HP ProBook 430 G8', 'Intel Core i5 11th Gen | 8 GB RAM | 256 GB SSD | 13.3" Display | Warranty Included | Business Class', 430.00, 'laptops', 'HP', '/laptops/hp-probook-430-g8.jpg', 'i5 11th Gen', '8 GB', '256 GB SSD', '13.3"', true, false, 10, true, NOW()),

('HP ProBook 450 G8 (i5)', 'Intel Core i5 11th Gen | 8 GB RAM | 256 GB SSD | 15.6" Display | Warranty Included | Business Class', 450.00, 'laptops', 'HP', '/laptops/hp-probook-450-g8-i5.jpg', 'i5 11th Gen', '8 GB', '256 GB SSD', '15.6"', true, true, 10, true, NOW()),

('HP 15 (i5)', 'Intel Core i5 13th Gen | 8 GB RAM | 512 GB SSD | 15.6" Display | Warranty Included | Latest Generation', 600.00, 'laptops', 'HP', '/laptops/hp-15-i5.jpg', 'i5 13th Gen', '8 GB', '512 GB SSD', '15.6"', true, true, 10, true, NOW()),

('HP 15 (i7)', 'Intel Core i7 13th Gen | 8 GB RAM | 512 GB SSD | 15.6" Display | Warranty Included | Latest Generation', 620.00, 'laptops', 'HP', '/laptops/hp-15-i7.jpg', 'i7 13th Gen', '8 GB', '512 GB SSD', '15.6"', true, true, 10, true, NOW()),

('HP 250 G10 (i5)', 'Intel Core i5 13th Gen | 8 GB RAM | 512 GB SSD | 15.6" Display | Warranty Included | Latest Generation', 620.00, 'laptops', 'HP', '/laptops/hp-250-g10-i5.jpg', 'i5 13th Gen', '8 GB', '512 GB SSD', '15.6"', true, true, 10, true, NOW()),

('HP ProBook 450 G8 (i7)', 'Intel Core i7 11th Gen | 16 GB RAM | 512 GB SSD | 15.6" Display | Warranty Included | Business Class | High Performance', 650.00, 'laptops', 'HP', '/laptops/hp-probook-450-g8-i7.jpg', 'i7 11th Gen', '16 GB', '512 GB SSD', '15.6"', true, true, 10, true, NOW()),

-- High-End Range ($800 - $1,200)
('HP 250 G10 (i7)', 'Intel Core i7 13th Gen | 8 GB RAM | 512 GB SSD | 15.6" Display | Warranty Included | Latest Generation | High Performance', 800.00, 'laptops', 'HP', '/laptops/hp-250-g10-i7.jpg', 'i7 13th Gen', '8 GB', '512 GB SSD', '15.6"', true, true, 10, true, NOW()),

('Dell Latitude 5430 Rugged', 'Intel Core i5 12th Gen | 16 GB RAM | 512 GB SSD | 14" Display | Warranty Included | Military-Grade Durability | Water & Dust Resistant', 1200.00, 'laptops', 'Dell', '/laptops/dell-latitude-5430-rugged.jpg', 'i5 12th Gen', '16 GB', '512 GB SSD', '14" Rugged', true, true, 5, true, NOW());

-- STEP 4: Verify all laptops were inserted
SELECT 
    COUNT(*) as total_laptops,
    MIN(price) as lowest_price,
    MAX(price) as highest_price,
    ROUND(AVG(price), 2) as average_price
FROM products 
WHERE category = 'laptops';

-- STEP 5: Show all laptops sorted by price
SELECT 
    id,
    name,
    brand,
    processor,
    ram,
    storage,
    display,
    price,
    warranty,
    is_featured,
    stock_count
FROM products 
WHERE category = 'laptops'
ORDER BY price ASC;

-- ============================================
-- DONE! 38 Laptops Added Successfully
-- ============================================
