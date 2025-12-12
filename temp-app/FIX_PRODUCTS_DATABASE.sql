-- =====================================================
-- FIX PRODUCTS DATABASE - Run in Supabase SQL Editor
-- =====================================================
-- Go to: Supabase Dashboard → SQL Editor → New Query
-- Paste this entire script and click "Run"
-- =====================================================

-- STEP 1: Fix category case - change "laptops" to "Laptops"
UPDATE products 
SET category = 'Laptops' 
WHERE category = 'laptops';

-- Verify the fix
SELECT category, COUNT(*) as count 
FROM products 
GROUP BY category 
ORDER BY category;

-- =====================================================
-- STEP 2: Add Processors
-- =====================================================
INSERT INTO products (id, name, sku, category, price, description, brand, stock_count, in_stock, images, image, rating, reviews, features, specifications, warranty)
VALUES
(200, 'Intel Core i3 4th Gen', 'SKU-00200', 'Processors', 100, 'Intel Core i3 4th Generation processor.', 'Intel', 5, true, ARRAY['https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800&h=800&fit=crop&q=80', 4.0, 22, ARRAY['4th Generation', 'Desktop CPU', 'LGA 1150'], '{"Generation": "4th", "Type": "Desktop CPU"}', true),
(201, 'Intel Core i5 4th Gen', 'SKU-00201', 'Processors', 160, 'Intel Core i5 4th Generation processor.', 'Intel', 4, true, ARRAY['https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800&h=800&fit=crop&q=80', 4.2, 28, ARRAY['4th Generation', 'Desktop CPU', 'LGA 1150'], '{"Generation": "4th", "Type": "Desktop CPU"}', true),
(202, 'Intel Core i3 6th Gen', 'SKU-00202', 'Processors', 160, 'Intel Core i3 6th Generation processor.', 'Intel', 4, true, ARRAY['https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800&h=800&fit=crop&q=80', 4.3, 25, ARRAY['6th Generation', 'Desktop CPU', 'LGA 1151'], '{"Generation": "6th", "Type": "Desktop CPU"}', true),
(203, 'Intel Core i3 7th Gen', 'SKU-00203', 'Processors', 180, 'Intel Core i3 7th Generation processor.', 'Intel', 3, true, ARRAY['https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800&h=800&fit=crop&q=80', 4.3, 22, ARRAY['7th Generation', 'Desktop CPU', 'LGA 1151'], '{"Generation": "7th", "Type": "Desktop CPU"}', true),
(204, 'Intel Core i5 7th Gen', 'SKU-00204', 'Processors', 200, 'Intel Core i5 7th Generation processor.', 'Intel', 4, true, ARRAY['https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800&h=800&fit=crop&q=80', 4.4, 30, ARRAY['7th Generation', 'Desktop CPU', 'LGA 1151'], '{"Generation": "7th", "Type": "Desktop CPU"}', true),
(205, 'Intel Core i3 8th Gen', 'SKU-00205', 'Processors', 200, 'Intel Core i3 8th Generation processor.', 'Intel', 3, true, ARRAY['https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800&h=800&fit=crop&q=80', 4.4, 26, ARRAY['8th Generation', 'Desktop CPU', 'LGA 1151'], '{"Generation": "8th", "Type": "Desktop CPU"}', true),
(206, 'Intel Core i3 10th Gen', 'SKU-00206', 'Processors', 250, 'Intel Core i3 10th Generation processor.', 'Intel', 3, true, ARRAY['https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800&h=800&fit=crop&q=80', 4.5, 28, ARRAY['10th Generation', 'Desktop CPU', 'LGA 1200'], '{"Generation": "10th", "Type": "Desktop CPU"}', true),
(207, 'Intel Core i3 12th Gen', 'SKU-00207', 'Processors', 320, 'Brand new Intel Core i3 12th Generation.', 'Intel', 5, true, ARRAY['https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800&h=800&fit=crop&q=80', 4.7, 35, ARRAY['12th Generation', 'Desktop CPU', 'LGA 1700'], '{"Generation": "12th", "Type": "Desktop CPU"}', true),
(208, 'Intel Core i5 13th Gen', 'SKU-00208', 'Processors', 420, 'Latest Intel Core i5 13th Generation.', 'Intel', 4, true, ARRAY['https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800&h=800&fit=crop&q=80', 4.8, 42, ARRAY['13th Generation', 'Desktop CPU', 'LGA 1700'], '{"Generation": "13th", "Type": "Desktop CPU"}', true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  category = EXCLUDED.category;

-- =====================================================
-- STEP 3: Add Desktops (All-in-One PCs)
-- =====================================================
INSERT INTO products (id, name, sku, category, price, description, brand, stock_count, in_stock, images, image, rating, reviews, features, specifications, warranty)
VALUES
(210, 'All-in-One PC (Dual Core)', 'SKU-00210', 'Desktops', 170, 'Budget All-in-One PC with dual core processor.', 'Generic', 3, true, ARRAY['https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&h=800&fit=crop&q=80', 4.0, 18, ARRAY['Dual Core', 'All-in-One design', 'Built-in display'], '{"Processor": "Dual Core", "Type": "All-in-One"}', true),
(211, 'All-in-One PC (i3 6th Gen)', 'SKU-00211', 'Desktops', 260, 'All-in-One PC with Intel Core i3 6th Gen.', 'Generic', 3, true, ARRAY['https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&h=800&fit=crop&q=80', 4.3, 22, ARRAY['Core i3 6th Gen', 'All-in-One design'], '{"Processor": "Core i3 6th Gen", "Type": "All-in-One"}', true),
(212, 'All-in-One PC (i3 7th Gen)', 'SKU-00212', 'Desktops', 300, 'All-in-One PC with Intel Core i3 7th Gen.', 'Generic', 2, true, ARRAY['https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&h=800&fit=crop&q=80', 4.4, 25, ARRAY['Core i3 7th Gen', 'All-in-One design'], '{"Processor": "Core i3 7th Gen", "Type": "All-in-One"}', true),
(213, 'All-in-One PC (i5 6th Gen)', 'SKU-00213', 'Desktops', 300, 'All-in-One PC with Intel Core i5 6th Gen.', 'Generic', 3, true, ARRAY['https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&h=800&fit=crop&q=80', 4.5, 28, ARRAY['Core i5 6th Gen', 'All-in-One design'], '{"Processor": "Core i5 6th Gen", "Type": "All-in-One"}', true),
(214, 'HP All-in-One PC (i5 6th Gen)', 'SKU-00214', 'Desktops', 320, 'HP branded All-in-One PC.', 'HP', 2, true, ARRAY['https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&h=800&fit=crop&q=80', 4.6, 32, ARRAY['Core i5 6th Gen', 'HP quality', 'All-in-One design'], '{"Processor": "Core i5 6th Gen", "Type": "All-in-One"}', true),
(215, 'All-in-One PC (i7 6th Gen)', 'SKU-00215', 'Desktops', 350, 'High-performance All-in-One PC.', 'Generic', 2, true, ARRAY['https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&h=800&fit=crop&q=80', 4.6, 26, ARRAY['Core i7 6th Gen', 'All-in-One design'], '{"Processor": "Core i7 6th Gen", "Type": "All-in-One"}', true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  category = EXCLUDED.category;

-- =====================================================
-- STEP 4: Add Monitors
-- =====================================================
INSERT INTO products (id, name, sku, category, price, description, brand, stock_count, in_stock, images, image, rating, reviews, features, specifications, warranty)
VALUES
(220, '19 inch Standard Monitor', 'SKU-00220', 'Monitors', 50, 'Standard 19-20 inch monitor.', 'Generic', 10, true, ARRAY['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop&q=80', 4.0, 45, ARRAY['19-20 inch display', 'Standard bezels', 'VGA/HDMI'], '{"Size": "19-20 inch", "Type": "Standard"}', true),
(221, '22 inch Standard Monitor', 'SKU-00221', 'Monitors', 60, '22 inch standard monitor.', 'Generic', 8, true, ARRAY['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop&q=80', 4.1, 38, ARRAY['22 inch display', 'Standard bezels', 'VGA/HDMI'], '{"Size": "22 inch", "Type": "Standard"}', true),
(222, '22 inch Borderless Monitor', 'SKU-00222', 'Monitors', 100, '22 inch borderless monitor.', 'Generic', 6, true, ARRAY['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop&q=80', 4.4, 42, ARRAY['22 inch display', 'Borderless design', 'HDMI'], '{"Size": "22 inch", "Type": "Borderless"}', true),
(223, '22 inch Monitor (Brand New)', 'SKU-00223', 'Monitors', 155, 'Brand new 22 inch monitor.', 'Generic', 5, true, ARRAY['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop&q=80', 4.6, 35, ARRAY['22 inch display', 'Brand new', 'Full HD'], '{"Size": "22 inch", "Type": "Standard"}', true),
(224, '24 inch Standard Monitor', 'SKU-00224', 'Monitors', 85, '24 inch standard monitor.', 'Generic', 8, true, ARRAY['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop&q=80', 4.2, 48, ARRAY['24 inch display', 'Standard bezels', 'HDMI'], '{"Size": "24 inch", "Type": "Standard"}', true),
(225, '24 inch Borderless Monitor', 'SKU-00225', 'Monitors', 120, '24 inch borderless monitor.', 'Generic', 5, true, ARRAY['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop&q=80', 4.5, 52, ARRAY['24 inch display', 'Borderless design', 'HDMI'], '{"Size": "24 inch", "Type": "Borderless"}', true),
(226, '27 inch Standard Monitor', 'SKU-00226', 'Monitors', 140, '27 inch standard monitor.', 'Generic', 4, true, ARRAY['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop&q=80', 4.4, 42, ARRAY['27 inch display', 'Standard bezels', 'HDMI'], '{"Size": "27 inch", "Type": "Standard"}', true),
(227, '27 inch Borderless Monitor', 'SKU-00227', 'Monitors', 160, '27 inch borderless monitor.', 'Generic', 3, true, ARRAY['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop&q=80', 4.6, 45, ARRAY['27 inch display', 'Borderless design', 'HDMI'], '{"Size": "27 inch", "Type": "Borderless"}', true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  category = EXCLUDED.category;

-- =====================================================
-- STEP 5: Add more Accessories
-- =====================================================
INSERT INTO products (id, name, sku, category, price, description, brand, stock_count, in_stock, images, image, rating, reviews, features, specifications, warranty)
VALUES
(230, 'V65 Gaming Headphone', 'SKU-00230', 'Accessories', 12, 'Budget gaming headphone.', 'Generic', 15, true, ARRAY['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop&q=80', 4.1, 85, ARRAY['Gaming audio', 'Microphone', 'Comfortable'], '{"Type": "Gaming Headphone"}', false),
(231, 'PHOINIKAS Q3 Gaming Headphone', 'SKU-00231', 'Accessories', 45, 'Premium gaming headphone.', 'PHOINIKAS', 8, true, ARRAY['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop&q=80', 4.5, 62, ARRAY['7.1 Surround', 'RGB lighting', 'Noise cancelling'], '{"Type": "Gaming Headphone"}', true),
(232, 'HDMI Splitter', 'SKU-00232', 'Accessories', 12, 'HDMI splitter for multiple displays.', 'Generic', 20, true, ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&q=80', 4.0, 45, ARRAY['1 to 2 split', '4K support'], '{"Type": "HDMI Splitter"}', false),
(233, '8-in-1 USB-C Hub', 'SKU-00233', 'Accessories', 10, 'Multi-port USB-C hub.', 'Generic', 15, true, ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&q=80', 4.2, 52, ARRAY['8 ports', 'USB-C', 'HDMI output'], '{"Type": "USB Hub"}', false),
(234, 'Smart WiFi Camera', 'SKU-00234', 'Accessories', 30, 'Smart security camera.', 'Generic', 10, true, ARRAY['https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=800&h=800&fit=crop&q=80', 4.4, 78, ARRAY['WiFi', 'Night vision', 'Motion detection'], '{"Type": "Security Camera"}', true),
(235, '11-in-1 USB-C Hub', 'SKU-00235', 'Accessories', 40, 'Premium multi-port USB-C hub.', 'Generic', 8, true, ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&q=80', 4.5, 45, ARRAY['11 ports', 'USB-C', 'HDMI', 'SD card'], '{"Type": "USB Hub"}', true),
(236, 'Laptop Cooling Pad', 'SKU-00236', 'Accessories', 12, 'Laptop cooling pad with fans.', 'Generic', 15, true, ARRAY['https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=800&h=800&fit=crop&q=80', 4.2, 68, ARRAY['Dual fans', 'USB powered', 'Adjustable'], '{"Type": "Cooling Pad"}', false),
(237, 'HDMI Cable 1.5m', 'SKU-00237', 'Accessories', 3, '1.5 meter HDMI cable.', 'Generic', 30, true, ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&q=80', 4.0, 120, ARRAY['1.5m length', '4K support'], '{"Length": "1.5m"}', false),
(238, 'HDMI Cable 3m', 'SKU-00238', 'Accessories', 5, '3 meter HDMI cable.', 'Generic', 25, true, ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&q=80', 4.1, 95, ARRAY['3m length', '4K support'], '{"Length": "3m"}', false),
(239, 'HDMI Cable 5m', 'SKU-00239', 'Accessories', 10, '5 meter HDMI cable.', 'Generic', 20, true, ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&q=80', 4.0, 75, ARRAY['5m length', '4K support'], '{"Length": "5m"}', false),
(240, 'Wired Mouse', 'SKU-00240', 'Accessories', 5, 'Basic wired mouse.', 'Generic', 30, true, ARRAY['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop&q=80', 4.0, 110, ARRAY['USB', 'Optical', '1000 DPI'], '{"Type": "Wired Mouse"}', false),
(241, 'Wireless Mouse', 'SKU-00241', 'Accessories', 7, 'Wireless mouse with USB receiver.', 'Generic', 25, true, ARRAY['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop&q=80', 4.2, 98, ARRAY['Wireless', 'USB receiver', '1200 DPI'], '{"Type": "Wireless Mouse"}', false),
(242, 'USB-C to LAN Adapter', 'SKU-00242', 'Accessories', 5, 'USB-C to Ethernet adapter.', 'Generic', 20, true, ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&q=80', 4.3, 55, ARRAY['USB-C', 'Gigabit Ethernet'], '{"Type": "Network Adapter"}', false),
(243, 'ZTE MF286C Indoor Router', 'SKU-00243', 'Accessories', 65, '4G LTE indoor router.', 'ZTE', 5, true, ARRAY['https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=800&h=800&fit=crop&q=80'], 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=800&h=800&fit=crop&q=80', 4.5, 42, ARRAY['4G LTE', 'WiFi', 'Multiple devices'], '{"Type": "4G Router"}', true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  category = EXCLUDED.category;

-- =====================================================
-- FINAL: Verify all categories
-- =====================================================
SELECT category, COUNT(*) as product_count 
FROM products 
GROUP BY category 
ORDER BY category;

-- Show total products
SELECT COUNT(*) as total_products FROM products;
