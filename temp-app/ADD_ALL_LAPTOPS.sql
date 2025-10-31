-- ============================================
-- ADD ALL LAPTOPS WITH FULL SPECS
-- 38 Laptops sorted by price (lowest to highest)
-- ============================================

-- STEP 1: Clear existing laptops (optional - remove if you want to keep old ones)
-- DELETE FROM products WHERE category = 'laptops';

-- STEP 2: Insert all laptops with full specifications
INSERT INTO products (name, description, price, category, stock, image_url, brand, processor, ram, storage, display, warranty, is_featured, created_at) VALUES

-- Budget Range ($105 - $160)
('Microsoft Surface SE', 'Celeron N4020 @1.10 GHz | 4 GB RAM | 64 GB SD | 11.6" Display | Warranty Included', 105.00, 'laptops', 10, '/laptops/microsoft-surface-se.jpg', 'Microsoft', 'Celeron N4020 @1.10 GHz', '4 GB', '64 GB SD', '11.6"', true, false, NOW()),

('Lenovo x131e / x140e', 'Celeron 1007U @1.50 GHz | 8 GB RAM | 500 GB SSD | 11.6" Display | Warranty Included', 115.00, 'laptops', 10, '/laptops/lenovo-x131e.jpg', 'Lenovo', 'Celeron 1007U @1.50 GHz', '8 GB', '500 GB SSD', '11.6"', true, false, NOW()),

('Dell Latitude 3150', 'Pentium N3540 @2.16 GHz | 8 GB RAM | 128 GB SSD | 11.6" Display | Warranty Included', 120.00, 'laptops', 10, '/laptops/dell-latitude-3150.jpg', 'Dell', 'Pentium N3540 @2.16 GHz', '8 GB', '128 GB SSD', '11.6"', true, false, NOW()),

('Lenovo ThinkPad Yoga 11e', 'Celeron N2930 @1.83 GHz | 8 GB RAM | 500 GB HDD | 11.6" Display | Warranty Included', 120.00, 'laptops', 10, '/laptops/lenovo-yoga-11e.jpg', 'Lenovo', 'Celeron N2930 @1.83 GHz', '8 GB', '500 GB HDD', '11.6"', true, false, NOW()),

('Dell Latitude 3189 / 3190', 'Celeron N4120 @1.10 GHz | 4 GB RAM | 128 GB SSD | 11.6" Display | Warranty Included', 125.00, 'laptops', 10, '/laptops/dell-latitude-3189.jpg', 'Dell', 'Celeron N4120 @1.10 GHz', '4 GB', '128 GB SSD', '11.6"', true, false, NOW()),

('Dell Latitude 3340 (i3)', 'Intel Core i3 4th Gen @1.70 GHz | 8 GB RAM | 500 GB HDD | 13.3" Display | Warranty Included', 140.00, 'laptops', 10, '/laptops/dell-latitude-3340-i3.jpg', 'Dell', 'i3 4th @1.70 GHz', '8 GB', '500 GB HDD', '13.3"', true, false, NOW()),

('Dell Latitude 3340 (i5)', 'Intel Core i5 4th Gen @1.70 GHz | 8 GB RAM | 500 GB HDD | 13.3" Display | Warranty Included', 150.00, 'laptops', 10, '/laptops/dell-latitude-3340-i5.jpg', 'Dell', 'i5 4th @1.70 GHz', '8 GB', '500 GB HDD', '13.3"', true, false, NOW()),

('Dell Latitude E7250', 'Intel Core i5 5th Gen @2.30 GHz | 8 GB RAM | 256 GB SSD | 12.5" Display | Warranty Included', 160.00, 'laptops', 10, '/laptops/dell-latitude-e7250.jpg', 'Dell', 'i5 5th @2.30 GHz', '8 GB', '256 GB SSD', '12.5"', true, true, NOW()),

-- Mid-Budget Range ($220 - $290)
('Lenovo ThinkPad X270', 'Intel Core i5 6th Gen | 8 GB RAM | 256 GB SSD | 12.5" Display | Warranty Included', 220.00, 'laptops', 10, '/laptops/lenovo-x270.jpg', 'Lenovo', 'i5 6th Gen', '8 GB', '256 GB SSD', '12.5"', true, false, NOW()),

('Lenovo V15', 'Intel Core i3 10th Gen | 4 GB RAM | 256 GB SSD | 15.6" Display | Warranty Included', 250.00, 'laptops', 10, '/laptops/lenovo-v15.jpg', 'Lenovo', 'i3 10th Gen', '4 GB', '256 GB SSD', '15.6"', true, false, NOW()),

('Dell Latitude 7200', 'Intel Core i5 8th Gen | 8 GB RAM | 256 GB SSD | 12.3" Display | Warranty Included', 260.00, 'laptops', 10, '/laptops/dell-latitude-7200.jpg', 'Dell', 'i5 8th Gen', '8 GB', '256 GB SSD', '12.3"', true, false, NOW()),

('Lenovo ThinkPad X280', 'Intel Core i5 8th Gen | 8 GB RAM | 256 GB SSD | 12.5" Display | Warranty Included', 260.00, 'laptops', 10, '/laptops/lenovo-x280.jpg', 'Lenovo', 'i5 8th Gen', '8 GB', '256 GB SSD', '12.5"', true, false, NOW()),

('Dell Latitude 5400', 'Intel Core i5 8th Gen @1.60 GHz | 8 GB RAM | 256 GB SSD | 14" Display | Warranty Included', 265.00, 'laptops', 10, '/laptops/dell-latitude-5400.jpg', 'Dell', 'i5 8th @1.60 GHz', '8 GB', '256 GB SSD', '14"', true, true, NOW()),

('Toshiba Dynabook Tecra A50-EC (i5)', 'Intel Core i5 8th Gen @1.70 GHz | 8 GB RAM | 256 GB SSD | 15.6" Display | Warranty Included', 265.00, 'laptops', 10, '/laptops/toshiba-tecra-a50-i5.jpg', 'Toshiba', 'i5 8th @1.70 GHz', '8 GB', '256 GB SSD', '15.6"', true, false, NOW()),

('Lenovo IdeaPad 3', 'Intel Core i3 11th Gen | 8 GB RAM | 256 GB SSD | 15.6" Display | Warranty Included', 270.00, 'laptops', 10, '/laptops/lenovo-ideapad-3.jpg', 'Lenovo', 'i3 11th Gen', '8 GB', '256 GB SSD', '15.6"', true, false, NOW()),

('Lenovo ThinkPad L490', 'Intel Core i5 8th Gen | 8 GB RAM | 256 GB SSD | 14" Display | Warranty Included', 280.00, 'laptops', 10, '/laptops/lenovo-l490.jpg', 'Lenovo', 'i5 8th Gen', '8 GB', '256 GB SSD', '14"', true, false, NOW()),

('Toshiba Dynabook Tecra A50-EC (i7)', 'Intel Core i7 8th/6th Gen @1.90 GHz | 8 GB RAM | 256 GB SSD | 15.6" Display | Warranty Included', 290.00, 'laptops', 10, '/laptops/toshiba-tecra-a50-i7.jpg', 'Toshiba', 'i7 8/6th @1.90 GHz', '8 GB', '256 GB SSD', '15.6"', true, false, NOW()),

-- Professional Range ($300 - $390)
('Lenovo ThinkPad T480', 'Intel Core i5 8th Gen | 8 GB RAM | 256 GB SSD | 14" Display | Warranty Included | Business Class', 300.00, 'laptops', 10, '/laptops/lenovo-t480.jpg', 'Lenovo', 'i5 8th Gen', '8 GB', '256 GB SSD', '14"', true, true, NOW()),

('Toshiba Satellite Pro', 'Intel Core i5 8th Gen | 8 GB RAM | 256 GB SSD | 15.6" Display | Warranty Included', 310.00, 'laptops', 10, '/laptops/toshiba-satellite-pro.jpg', 'Toshiba', 'i5 8th Gen', '8 GB', '256 GB SSD', '15.6"', true, false, NOW()),

('Dell Latitude 5410', 'Intel Core i5 10th Gen | 8 GB RAM | 256 GB SSD | 14" Display | Warranty Included', 320.00, 'laptops', 10, '/laptops/dell-latitude-5410.jpg', 'Dell', 'i5 10th Gen', '8 GB', '256 GB SSD', '14"', true, false, NOW()),

('Lenovo ThinkPad T490', 'Intel Core i5 8th Gen | 8 GB RAM | 256 GB SSD | 14" Display | Warranty Included | Business Class', 330.00, 'laptops', 10, '/laptops/lenovo-t490.jpg', 'Lenovo', 'i5 8th Gen', '8 GB', '256 GB SSD', '14"', true, true, NOW()),

('HP EliteBook x360 1030 G3', 'Intel Core i5 8th Gen @1.70 GHz | 8 GB RAM | 256 GB SSD | 13.3" Touchscreen | 2-in-1 Convertible | Warranty Included', 360.00, 'laptops', 10, '/laptops/hp-elitebook-x360.jpg', 'HP', 'i5 8th @1.70 GHz', '8 GB', '256 GB SSD', '13.3" Touch', true, true, NOW()),

('Lenovo ThinkPad E14 Gen 2', 'Intel Core i5 10th Gen | 8 GB RAM | 256 GB SSD | 14" Display | Warranty Included', 360.00, 'laptops', 10, '/laptops/lenovo-e14-gen2.jpg', 'Lenovo', 'i5 10th Gen', '8 GB', '256 GB SSD', '14"', true, false, NOW()),

('Dell Latitude 7320', 'Intel Core i5 11th Gen @2.60 GHz | 16 GB RAM | 256 GB SSD | 13.3" Display | Warranty Included | Premium Build', 370.00, 'laptops', 10, '/laptops/dell-latitude-7320.jpg', 'Dell', 'i5 11th @2.60 GHz', '16 GB', '256 GB SSD', '13.3"', true, true, NOW()),

('Lenovo ThinkPad E15 Gen 2', 'Intel Core i5 10th Gen | 8 GB RAM | 256 GB SSD | 15.6" Display | Warranty Included', 370.00, 'laptops', 10, '/laptops/lenovo-e15-gen2.jpg', 'Lenovo', 'i5 10th Gen', '8 GB', '256 GB SSD', '15.6"', true, false, NOW()),

('Dell Latitude 5420', 'Intel Core i5 11th Gen | 8 GB RAM | 256 GB SSD | 14" Display | Warranty Included', 380.00, 'laptops', 10, '/laptops/dell-latitude-5420.jpg', 'Dell', 'i5 11th Gen', '8 GB', '256 GB SSD', '14"', true, false, NOW()),

('Lenovo IdeaPad 5', 'Intel Core i5 11th Gen | 8 GB RAM | 512 GB SSD | 15.6" Display | Warranty Included', 390.00, 'laptops', 10, '/laptops/lenovo-ideapad-5.jpg', 'Lenovo', 'i5 11th Gen', '8 GB', '512 GB SSD', '15.6"', true, false, NOW()),

-- Premium Range ($400 - $650)
('Toshiba Portege X30', 'Intel Core i7 8th Gen | 8 GB RAM | 256 GB SSD | 13.3" Display | Warranty Included | Ultra-Portable', 400.00, 'laptops', 10, '/laptops/toshiba-portege-x30.jpg', 'Toshiba', 'i7 8th Gen', '8 GB', '256 GB SSD', '13.3"', true, false, NOW()),

('Lenovo IdeaPad Flex 5', 'Intel Core i5 11th Gen | 8 GB RAM | 256 GB SSD | 14" Touchscreen | 2-in-1 Convertible | Warranty Included', 420.00, 'laptops', 10, '/laptops/lenovo-flex-5.jpg', 'Lenovo', 'i5 11th Gen', '8 GB', '256 GB SSD', '14" Touch', true, true, NOW()),

('HP ProBook 430 G8', 'Intel Core i5 11th Gen | 8 GB RAM | 256 GB SSD | 13.3" Display | Warranty Included | Business Class', 430.00, 'laptops', 10, '/laptops/hp-probook-430-g8.jpg', 'HP', 'i5 11th Gen', '8 GB', '256 GB SSD', '13.3"', true, false, NOW()),

('HP ProBook 450 G8 (i5)', 'Intel Core i5 11th Gen | 8 GB RAM | 256 GB SSD | 15.6" Display | Warranty Included | Business Class', 450.00, 'laptops', 10, '/laptops/hp-probook-450-g8-i5.jpg', 'HP', 'i5 11th Gen', '8 GB', '256 GB SSD', '15.6"', true, true, NOW()),

('HP 15 (i5)', 'Intel Core i5 13th Gen | 8 GB RAM | 512 GB SSD | 15.6" Display | Warranty Included | Latest Generation', 600.00, 'laptops', 10, '/laptops/hp-15-i5.jpg', 'HP', 'i5 13th Gen', '8 GB', '512 GB SSD', '15.6"', true, true, NOW()),

('HP 15 (i7)', 'Intel Core i7 13th Gen | 8 GB RAM | 512 GB SSD | 15.6" Display | Warranty Included | Latest Generation', 620.00, 'laptops', 10, '/laptops/hp-15-i7.jpg', 'HP', 'i7 13th Gen', '8 GB', '512 GB SSD', '15.6"', true, true, NOW()),

('HP 250 G10 (i5)', 'Intel Core i5 13th Gen | 8 GB RAM | 512 GB SSD | 15.6" Display | Warranty Included | Latest Generation', 620.00, 'laptops', 10, '/laptops/hp-250-g10-i5.jpg', 'HP', 'i5 13th Gen', '8 GB', '512 GB SSD', '15.6"', true, true, NOW()),

('HP ProBook 450 G8 (i7)', 'Intel Core i7 11th Gen | 16 GB RAM | 512 GB SSD | 15.6" Display | Warranty Included | Business Class | High Performance', 650.00, 'laptops', 10, '/laptops/hp-probook-450-g8-i7.jpg', 'HP', 'i7 11th Gen', '16 GB', '512 GB SSD', '15.6"', true, true, NOW()),

-- High-End Range ($800 - $1,200)
('HP 250 G10 (i7)', 'Intel Core i7 13th Gen | 8 GB RAM | 512 GB SSD | 15.6" Display | Warranty Included | Latest Generation | High Performance', 800.00, 'laptops', 10, '/laptops/hp-250-g10-i7.jpg', 'HP', 'i7 13th Gen', '8 GB', '512 GB SSD', '15.6"', true, true, NOW()),

('Dell Latitude 5430 Rugged', 'Intel Core i5 12th Gen | 16 GB RAM | 512 GB SSD | 14" Display | Warranty Included | Military-Grade Durability | Water & Dust Resistant', 1200.00, 'laptops', 5, '/laptops/dell-latitude-5430-rugged.jpg', 'Dell', 'i5 12th Gen', '16 GB', '512 GB SSD', '14" Rugged', true, true, NOW());

-- STEP 3: Verify all laptops were inserted
SELECT 
    COUNT(*) as total_laptops,
    MIN(price) as lowest_price,
    MAX(price) as highest_price,
    ROUND(AVG(price), 2) as average_price
FROM products 
WHERE category = 'laptops';

-- STEP 4: Show all laptops sorted by price
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
    is_featured
FROM products 
WHERE category = 'laptops'
ORDER BY price ASC;

-- ============================================
-- DONE! 38 Laptops Added
-- ============================================
