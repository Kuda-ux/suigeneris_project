import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const laptopImg = "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=800&fit=crop";
const macImg = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop";
const monitorImg = "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop";
const desktopImg = "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800&h=800&fit=crop";
const phoneImg = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop";
const cpuImg = "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&h=800&fit=crop";

const products = [
  // LAPTOPS - SECOND HAND (Budget)
  { name: "Microsoft Surface SE", price: 110, category: "Laptops", brand: "Microsoft", badge: "Excellent Condition", warranty: "3 months", image: laptopImg, stock_count: 5, in_stock: true, rating: 4.3, reviews: 12, description: "Compact Microsoft Surface SE with Celeron N4020, 4GB RAM, 64GB storage. Perfect for students.", specifications: { Processor: "Intel Celeron N4020", RAM: "4GB", Storage: "64GB eMMC", Display: "11.6-inch HD", Condition: "Second-hand (Excellent)" }},
  { name: "Lenovo X131e/X140e", price: 115, category: "Laptops", brand: "Lenovo", badge: "Excellent Condition", warranty: "3 months", image: laptopImg, stock_count: 4, in_stock: true, rating: 4.2, reviews: 8, description: "Durable Lenovo ThinkPad with Celeron 1007U, 8GB RAM, 500GB SSD.", specifications: { Processor: "Intel Celeron 1007U", RAM: "8GB", Storage: "500GB SSD", Display: "11.6-inch HD", Condition: "Second-hand (Excellent)" }},
  { name: "Dell Latitude 3150", price: 120, category: "Laptops", brand: "Dell", badge: "Excellent Condition", warranty: "3 months", image: laptopImg, stock_count: 3, in_stock: true, rating: 4.1, reviews: 6, description: "Compact Dell Latitude 3150 with Pentium N3540, 8GB RAM, 128GB SSD.", specifications: { Processor: "Intel Pentium N3540", RAM: "8GB", Storage: "128GB SSD", Display: "11.6-inch HD", Condition: "Second-hand (Excellent)" }},
  { name: "Dell Latitude 3189/90", price: 125, category: "Laptops", brand: "Dell", badge: "Excellent Condition", warranty: "3 months", image: laptopImg, stock_count: 4, in_stock: true, rating: 4.2, reviews: 9, description: "Versatile Dell Latitude with Celeron N4120, 4GB RAM, 128GB SSD.", specifications: { Processor: "Intel Celeron N4120", RAM: "4GB", Storage: "128GB SSD", Display: "11.6-inch HD Touch", Condition: "Second-hand (Excellent)" }},
  
  // LAPTOPS - SECOND HAND (Mid-range)
  { name: "Lenovo ThinkPad T460", price: 180, category: "Laptops", brand: "Lenovo", badge: "Excellent Condition", warranty: "3 months", image: laptopImg, stock_count: 6, in_stock: true, rating: 4.5, reviews: 22, description: "Professional ThinkPad T460 with Core i5 6th Gen, 8GB RAM, 500GB HDD.", specifications: { Processor: "Intel Core i5 6th Gen", RAM: "8GB DDR4", Storage: "500GB HDD", Display: "14-inch HD", Condition: "Second-hand (Excellent)" }},
  { name: "Lenovo ThinkPad L570", price: 180, category: "Laptops", brand: "Lenovo", badge: "Excellent Condition", warranty: "3 months", image: laptopImg, stock_count: 5, in_stock: true, rating: 4.4, reviews: 18, description: "ThinkPad L570 with Core i5 7th Gen, 8GB RAM, 500GB HDD, 15.6-inch display.", specifications: { Processor: "Intel Core i5 7th Gen", RAM: "8GB DDR4", Storage: "500GB HDD", Display: "15.6-inch HD", Condition: "Second-hand (Excellent)" }},
  { name: "Dell Latitude 5570", price: 180, category: "Laptops", brand: "Dell", badge: "Excellent Condition", warranty: "3 months", image: laptopImg, stock_count: 4, in_stock: true, rating: 4.3, reviews: 15, description: "Dell Latitude 5570 with Core i3 6th Gen, 8GB RAM, 500GB HDD.", specifications: { Processor: "Intel Core i3 6th Gen", RAM: "8GB DDR4", Storage: "500GB HDD", Display: "15.6-inch HD", Condition: "Second-hand (Excellent)" }},
  { name: "Acer TravelMate P259-G2-M", price: 220, category: "Laptops", brand: "Acer", badge: "Excellent Condition", warranty: "3 months", image: laptopImg, stock_count: 3, in_stock: true, rating: 4.2, reviews: 11, description: "Acer TravelMate with Core i3 6th Gen, 8GB RAM, 128GB SSD.", specifications: { Processor: "Intel Core i3 6th Gen", RAM: "8GB DDR4", Storage: "128GB SSD", Display: "15.6-inch HD", Condition: "Second-hand (Excellent)" }},
  { name: "HP Pro x2 612 G2 (2-in-1 Detachable)", price: 230, category: "Laptops", brand: "HP", badge: "Excellent Condition", warranty: "3 months", image: laptopImg, stock_count: 3, in_stock: true, rating: 4.4, reviews: 14, description: "HP Pro x2 detachable 2-in-1 with Core m5-7Y54, 12.5-inch touchscreen.", specifications: { Processor: "Intel Core m5-7Y54", RAM: "8GB", Storage: "256GB SSD", Display: "12.5-inch FHD Touch", Condition: "Second-hand (Excellent)" }},
  { name: "Lenovo ThinkPad L490", price: 230, category: "Laptops", brand: "Lenovo", badge: "Excellent Condition", warranty: "3 months", image: laptopImg, stock_count: 5, in_stock: true, rating: 4.5, reviews: 19, description: "ThinkPad L490 with Core i5 8th Gen, 8GB RAM, 256GB SSD.", specifications: { Processor: "Intel Core i5 8th Gen", RAM: "8GB DDR4", Storage: "256GB SSD", Display: "14-inch FHD", Condition: "Second-hand (Excellent)" }},
  { name: "Lenovo ThinkPad T490", price: 240, category: "Laptops", brand: "Lenovo", badge: "Excellent Condition", warranty: "3 months", image: laptopImg, stock_count: 4, in_stock: true, rating: 4.6, reviews: 24, description: "Premium ThinkPad T490 with Core i5 8th Gen, 8GB RAM, 256GB SSD.", specifications: { Processor: "Intel Core i5 8th Gen", RAM: "8GB DDR4", Storage: "256GB SSD", Display: "14-inch FHD", Condition: "Second-hand (Excellent)" }},
  { name: "Dell Latitude 5500", price: 250, category: "Laptops", brand: "Dell", badge: "Excellent Condition", warranty: "3 months", image: laptopImg, stock_count: 4, in_stock: true, rating: 4.4, reviews: 16, description: "Dell Latitude 5500 with Core i5 8th Gen, 8GB RAM, 500GB HDD.", specifications: { Processor: "Intel Core i5 8th Gen", RAM: "8GB DDR4", Storage: "500GB HDD", Display: "15.6-inch FHD", Condition: "Second-hand (Excellent)" }},
  { name: "Dell Latitude 3500", price: 250, category: "Laptops", brand: "Dell", badge: "Excellent Condition", warranty: "3 months", image: laptopImg, stock_count: 5, in_stock: true, rating: 4.3, reviews: 14, description: "Dell Latitude 3500 with Core i5 8th Gen, 8GB RAM, 500GB HDD.", specifications: { Processor: "Intel Core i5 8th Gen", RAM: "8GB DDR4", Storage: "500GB HDD", Display: "15.6-inch HD", Condition: "Second-hand (Excellent)" }},
  { name: "Toshiba Dynabook Tecra A50-EC (i5 8th)", price: 250, category: "Laptops", brand: "Toshiba", badge: "Excellent Condition", warranty: "3 months", image: laptopImg, stock_count: 3, in_stock: true, rating: 4.4, reviews: 12, description: "Toshiba Dynabook with Core i5 8th Gen, 8GB RAM, 256GB SSD.", specifications: { Processor: "Intel Core i5 8th Gen", RAM: "8GB DDR4", Storage: "256GB SSD", Display: "15.6-inch FHD", Condition: "Second-hand (Excellent)" }},
  { name: "Dell Latitude 5290 2-in-1", price: 260, category: "Laptops", brand: "Dell", badge: "Excellent Condition", warranty: "3 months", image: laptopImg, stock_count: 3, in_stock: true, rating: 4.5, reviews: 15, description: "Dell Latitude 5290 2-in-1 with Core i5 8th Gen, 8GB RAM, 256GB SSD.", specifications: { Processor: "Intel Core i5 8th Gen", RAM: "8GB DDR4", Storage: "256GB SSD", Display: "12.3-inch FHD Touch", Condition: "Second-hand (Excellent)" }},
  { name: "HP EliteBook 850 G3/G4", price: 260, category: "Laptops", brand: "HP", badge: "Excellent Condition", warranty: "3 months", image: laptopImg, stock_count: 4, in_stock: true, rating: 4.5, reviews: 20, description: "HP EliteBook 850 with Core i5 7th Gen, 8GB RAM, 256GB SSD.", specifications: { Processor: "Intel Core i5 7th Gen", RAM: "8GB DDR4", Storage: "256GB SSD", Display: "15.6-inch FHD", Condition: "Second-hand (Excellent)" }},
  { name: "Toshiba Dynabook Tecra A50-EC (i7 6th)", price: 265, category: "Laptops", brand: "Toshiba", badge: "Excellent Condition", warranty: "3 months", image: laptopImg, stock_count: 3, in_stock: true, rating: 4.4, reviews: 11, description: "Toshiba Dynabook with Core i7 6th Gen, 8GB RAM, 256GB SSD.", specifications: { Processor: "Intel Core i7 6th Gen", RAM: "8GB DDR4", Storage: "256GB SSD", Display: "15.6-inch FHD", Condition: "Second-hand (Excellent)" }},
  { name: "Toshiba Dynabook Tecra A50-EC (i7 8th)", price: 280, category: "Laptops", brand: "Toshiba", badge: "Excellent Condition", warranty: "3 months", image: laptopImg, stock_count: 3, in_stock: true, rating: 4.5, reviews: 13, description: "Toshiba Dynabook with Core i7 8th Gen, 8GB RAM, 256GB SSD.", specifications: { Processor: "Intel Core i7 8th Gen", RAM: "8GB DDR4", Storage: "256GB SSD", Display: "15.6-inch FHD", Condition: "Second-hand (Excellent)" }},
  { name: "HP EliteBook 840 G5", price: 290, category: "Laptops", brand: "HP", badge: "Excellent Condition", warranty: "3 months", image: laptopImg, stock_count: 5, in_stock: true, rating: 4.6, reviews: 25, description: "HP EliteBook 840 G5 with Core i5 8th Gen, 8GB RAM, 256GB SSD.", specifications: { Processor: "Intel Core i5 8th Gen", RAM: "8GB DDR4", Storage: "256GB SSD", Display: "14-inch FHD", Condition: "Second-hand (Excellent)" }},
  { name: "HP EliteBook 840 G3 (i7)", price: 290, category: "Laptops", brand: "HP", badge: "Excellent Condition", warranty: "3 months", image: laptopImg, stock_count: 4, in_stock: true, rating: 4.5, reviews: 21, description: "HP EliteBook 840 G3 with Core i7 6th Gen, 8GB RAM, 256GB SSD.", specifications: { Processor: "Intel Core i7 6th Gen", RAM: "8GB DDR4", Storage: "256GB SSD", Display: "14-inch FHD", Condition: "Second-hand (Excellent)" }},
  { name: "HP EliteBook 850 G5/G6", price: 310, category: "Laptops", brand: "HP", badge: "Excellent Condition", warranty: "3 months", image: laptopImg, stock_count: 4, in_stock: true, rating: 4.6, reviews: 22, description: "HP EliteBook 850 G5/G6 with Core i5 8th Gen, 8GB RAM, 256GB SSD.", specifications: { Processor: "Intel Core i5 8th Gen", RAM: "8GB DDR4", Storage: "256GB SSD", Display: "15.6-inch FHD", Condition: "Second-hand (Excellent)" }},
  { name: "Dell Latitude 5410", price: 320, category: "Laptops", brand: "Dell", badge: "Excellent Condition", warranty: "3 months", image: laptopImg, stock_count: 4, in_stock: true, rating: 4.6, reviews: 18, description: "Dell Latitude 5410 with Core i5 10th Gen, 8GB RAM, 256GB SSD.", specifications: { Processor: "Intel Core i5 10th Gen", RAM: "8GB DDR4", Storage: "256GB SSD", Display: "14-inch FHD", Condition: "Second-hand (Excellent)" }},
  { name: "Dell Latitude 3520", price: 365, category: "Laptops", brand: "Dell", badge: "Excellent Condition", warranty: "3 months", image: laptopImg, stock_count: 4, in_stock: true, rating: 4.6, reviews: 16, description: "Dell Latitude 3520 with Core i5 11th Gen, 8GB RAM, 256GB SSD.", specifications: { Processor: "Intel Core i5 11th Gen", RAM: "8GB DDR4", Storage: "256GB SSD", Display: "15.6-inch FHD", Condition: "Second-hand (Excellent)" }},
  { name: "Dell Vostro 15 3510", price: 365, category: "Laptops", brand: "Dell", badge: "Excellent Condition", warranty: "3 months", image: laptopImg, stock_count: 3, in_stock: true, rating: 4.5, reviews: 14, description: "Dell Vostro 3510 with Core i5 11th Gen, 16GB RAM, 256GB SSD.", specifications: { Processor: "Intel Core i5 11th Gen", RAM: "16GB DDR4", Storage: "256GB SSD", Display: "15.6-inch FHD", Condition: "Second-hand (Excellent)" }},
  { name: "Dell Latitude 7320", price: 370, category: "Laptops", brand: "Dell", badge: "Excellent Condition", warranty: "3 months", image: laptopImg, stock_count: 3, in_stock: true, rating: 4.7, reviews: 17, description: "Dell Latitude 7320 ultrabook with Core i5 11th Gen, 16GB RAM, 256GB SSD.", specifications: { Processor: "Intel Core i5 11th Gen", RAM: "16GB DDR4", Storage: "256GB SSD", Display: "13.3-inch FHD", Condition: "Second-hand (Excellent)" }},
  { name: "Dell Vostro 5502", price: 380, category: "Laptops", brand: "Dell", badge: "Excellent Condition", warranty: "3 months", image: laptopImg, stock_count: 3, in_stock: true, rating: 4.6, reviews: 15, description: "Dell Vostro 5502 with Core i5 11th Gen, 16GB RAM, 512GB SSD.", specifications: { Processor: "Intel Core i5 11th Gen", RAM: "16GB DDR4", Storage: "512GB SSD", Display: "15.6-inch FHD", Condition: "Second-hand (Excellent)" }},
  { name: "Dell Vostro 15 5510", price: 380, category: "Laptops", brand: "Dell", badge: "Excellent Condition", warranty: "3 months", image: laptopImg, stock_count: 3, in_stock: true, rating: 4.5, reviews: 13, description: "Dell Vostro 5510 with Core i5 11th Gen, 16GB RAM, 256GB SSD.", specifications: { Processor: "Intel Core i5 11th Gen", RAM: "16GB DDR4", Storage: "256GB SSD", Display: "15.6-inch FHD", Condition: "Second-hand (Excellent)" }},
  
  // MACBOOKS
  { name: "Apple MacBook Pro 2017 (15-inch)", price: 520, category: "Laptops", brand: "Apple", badge: "Excellent Condition", warranty: "3 months", image: macImg, stock_count: 2, in_stock: true, rating: 4.7, reviews: 28, description: "MacBook Pro 2017 15-inch with Core i7, 16GB RAM, 4GB VRAM, 512GB SSD.", specifications: { Processor: "Intel Core i7", RAM: "16GB DDR4", Storage: "512GB SSD", Display: "15.6-inch Retina", Graphics: "AMD Radeon Pro 4GB", Condition: "Second-hand (Excellent)" }},
  { name: "Apple MacBook Pro 2019 (15-inch)", price: 580, category: "Laptops", brand: "Apple", badge: "Excellent Condition", warranty: "3 months", image: macImg, stock_count: 2, in_stock: true, rating: 4.8, reviews: 32, description: "MacBook Pro 2019 15-inch with Core i7, 16GB RAM, 4GB VRAM, 256GB SSD.", specifications: { Processor: "Intel Core i7", RAM: "16GB DDR4", Storage: "256GB SSD", Display: "15.6-inch Retina", Graphics: "AMD Radeon Pro 4GB", Condition: "Second-hand (Excellent)" }},
  
  // HIGH-END LAPTOPS
  { name: "Dell Latitude 7640", price: 750, category: "Laptops", brand: "Dell", badge: "Excellent Condition", warranty: "3 months", image: laptopImg, stock_count: 2, in_stock: true, rating: 4.8, reviews: 19, description: "Dell Latitude 7640 flagship with Core i7 13th Gen, 32GB RAM, 1TB SSD.", specifications: { Processor: "Intel Core i7 13th Gen", RAM: "32GB DDR5", Storage: "1TB SSD", Display: "16-inch FHD+", Condition: "Second-hand (Excellent)" }},
  { name: "Dell Precision 3580", price: 750, category: "Laptops", brand: "Dell", badge: "Excellent Condition", warranty: "3 months", image: laptopImg, stock_count: 2, in_stock: true, rating: 4.8, reviews: 15, description: "Dell Precision 3580 workstation with Core i7 13th Gen, 16GB RAM, 4GB VRAM.", specifications: { Processor: "Intel Core i7 13th Gen", RAM: "16GB DDR5", Storage: "512GB SSD", Display: "15.6-inch FHD", Graphics: "NVIDIA 4GB VRAM", Condition: "Second-hand (Excellent)" }},
  
  // BRAND NEW LAPTOPS
  { name: "HP 15 (Core i5 13th Gen) - Brand New", price: 600, category: "Laptops", brand: "HP", badge: "Brand New", warranty: "1 year", image: laptopImg, stock_count: 8, in_stock: true, rating: 4.7, reviews: 12, description: "Brand new HP 15 with 13th Gen Core i5, 8GB RAM, 512GB SSD.", specifications: { Processor: "Intel Core i5 13th Gen", RAM: "8GB DDR4", Storage: "512GB SSD", Display: "15.6-inch FHD", Condition: "Brand New" }},
  { name: "HP 250 G10 (Core i5 13th Gen) - Brand New", price: 620, category: "Laptops", brand: "HP", badge: "Brand New", warranty: "1 year", image: laptopImg, stock_count: 10, in_stock: true, rating: 4.8, reviews: 15, description: "Brand new HP 250 G10 with 13th Gen Core i5, 8GB RAM, 512GB SSD.", specifications: { Processor: "Intel Core i5 13th Gen", RAM: "8GB DDR4", Storage: "512GB SSD", Display: "15.6-inch FHD", Condition: "Brand New" }},
  { name: "HP 15 (Core i7 13th Gen) - Brand New", price: 780, category: "Laptops", brand: "HP", badge: "Brand New", warranty: "1 year", image: laptopImg, stock_count: 6, in_stock: true, rating: 4.8, reviews: 10, description: "Brand new HP 15 with 13th Gen Core i7, 8GB RAM, 512GB SSD.", specifications: { Processor: "Intel Core i7 13th Gen", RAM: "8GB DDR4", Storage: "512GB SSD", Display: "15.6-inch FHD", Condition: "Brand New" }},
  { name: "HP 250 G10 (Core i7 13th Gen) - Brand New", price: 800, category: "Laptops", brand: "HP", badge: "Brand New", warranty: "1 year", image: laptopImg, stock_count: 6, in_stock: true, rating: 4.9, reviews: 8, description: "Brand new HP 250 G10 with 13th Gen Core i7, 8GB RAM, 512GB SSD.", specifications: { Processor: "Intel Core i7 13th Gen", RAM: "8GB DDR4", Storage: "512GB SSD", Display: "15.6-inch FHD", Condition: "Brand New" }},
  
  // PROCESSORS
  { name: "Intel Core i3 4th Gen Processor", price: 100, category: "Components", brand: "Intel", badge: "Tested", warranty: "1 month", image: cpuImg, stock_count: 5, in_stock: true, rating: 4.2, reviews: 8, description: "Intel Core i3 4th Gen desktop processor. LGA 1150 socket.", specifications: { Generation: "4th Gen", Cores: "2", Threads: "4", Socket: "LGA 1150", Condition: "Second-hand (Tested)" }},
  { name: "Intel Core i5 4th Gen Processor", price: 160, category: "Components", brand: "Intel", badge: "Tested", warranty: "1 month", image: cpuImg, stock_count: 4, in_stock: true, rating: 4.3, reviews: 10, description: "Intel Core i5 4th Gen desktop processor. LGA 1150 socket.", specifications: { Generation: "4th Gen", Cores: "4", Threads: "4", Socket: "LGA 1150", Condition: "Second-hand (Tested)" }},
  { name: "Intel Core i3 6th Gen Processor", price: 160, category: "Components", brand: "Intel", badge: "Tested", warranty: "1 month", image: cpuImg, stock_count: 4, in_stock: true, rating: 4.3, reviews: 9, description: "Intel Core i3 6th Gen Skylake processor. LGA 1151 socket.", specifications: { Generation: "6th Gen", Cores: "2", Threads: "4", Socket: "LGA 1151", Condition: "Second-hand (Tested)" }},
  { name: "Intel Core i3 7th Gen Processor", price: 180, category: "Components", brand: "Intel", badge: "Tested", warranty: "1 month", image: cpuImg, stock_count: 3, in_stock: true, rating: 4.4, reviews: 7, description: "Intel Core i3 7th Gen Kaby Lake processor. LGA 1151 socket.", specifications: { Generation: "7th Gen", Cores: "2", Threads: "4", Socket: "LGA 1151", Condition: "Second-hand (Tested)" }},
  { name: "Intel Core i5 7th Gen Processor", price: 200, category: "Components", brand: "Intel", badge: "Tested", warranty: "1 month", image: cpuImg, stock_count: 3, in_stock: true, rating: 4.5, reviews: 11, description: "Intel Core i5 7th Gen Kaby Lake processor. LGA 1151 socket.", specifications: { Generation: "7th Gen", Cores: "4", Threads: "4", Socket: "LGA 1151", Condition: "Second-hand (Tested)" }},
  { name: "Intel Core i3 8th Gen Processor", price: 200, category: "Components", brand: "Intel", badge: "Tested", warranty: "1 month", image: cpuImg, stock_count: 3, in_stock: true, rating: 4.5, reviews: 8, description: "Intel Core i3 8th Gen Coffee Lake processor. LGA 1151 v2 socket.", specifications: { Generation: "8th Gen", Cores: "4", Threads: "4", Socket: "LGA 1151 v2", Condition: "Second-hand (Tested)" }},
  { name: "Intel Core i3 10th Gen Processor", price: 250, category: "Components", brand: "Intel", badge: "Tested", warranty: "1 month", image: cpuImg, stock_count: 3, in_stock: true, rating: 4.6, reviews: 9, description: "Intel Core i3 10th Gen Comet Lake processor. LGA 1200 socket.", specifications: { Generation: "10th Gen", Cores: "4", Threads: "8", Socket: "LGA 1200", Condition: "Second-hand (Tested)" }},
  { name: "Intel Core i3 12th Gen Processor - Brand New", price: 320, category: "Components", brand: "Intel", badge: "Brand New", warranty: "3 years", image: cpuImg, stock_count: 5, in_stock: true, rating: 4.8, reviews: 6, description: "Brand new Intel Core i3 12th Gen Alder Lake processor. LGA 1700 socket.", specifications: { Generation: "12th Gen", Cores: "4 P-cores", Threads: "8", Socket: "LGA 1700", Condition: "Brand New" }},
  { name: "Intel Core i5 13th Gen Processor", price: 420, category: "Components", brand: "Intel", badge: "Tested", warranty: "1 month", image: cpuImg, stock_count: 3, in_stock: true, rating: 4.8, reviews: 7, description: "Intel Core i5 13th Gen Raptor Lake processor. LGA 1700 socket.", specifications: { Generation: "13th Gen", Cores: "6P + 4E", Threads: "16", Socket: "LGA 1700", Condition: "Second-hand (Tested)" }},
  
  // ALL-IN-ONE PCs
  { name: "All-in-One PC (Dual Core)", price: 170, category: "Desktops", brand: "Generic", badge: "Excellent Condition", warranty: "3 months", image: desktopImg, stock_count: 3, in_stock: true, rating: 4.0, reviews: 5, description: "All-in-One PC with Intel Dual Core, 4GB RAM, 500GB HDD.", specifications: { Processor: "Intel Dual Core", RAM: "4GB DDR3", Storage: "500GB HDD", Display: "19.5-inch HD", Condition: "Second-hand (Excellent)" }},
  { name: "All-in-One PC (Core i3 6th Gen)", price: 260, category: "Desktops", brand: "Generic", badge: "Excellent Condition", warranty: "3 months", image: desktopImg, stock_count: 3, in_stock: true, rating: 4.2, reviews: 6, description: "All-in-One PC with Core i3 6th Gen, 8GB RAM, 500GB HDD.", specifications: { Processor: "Intel Core i3 6th Gen", RAM: "8GB DDR4", Storage: "500GB HDD", Display: "21.5-inch FHD", Condition: "Second-hand (Excellent)" }},
  { name: "All-in-One PC (Core i3 7th Gen)", price: 300, category: "Desktops", brand: "Generic", badge: "Excellent Condition", warranty: "3 months", image: desktopImg, stock_count: 2, in_stock: true, rating: 4.3, reviews: 5, description: "All-in-One PC with Core i3 7th Gen, 8GB RAM, 500GB HDD.", specifications: { Processor: "Intel Core i3 7th Gen", RAM: "8GB DDR4", Storage: "500GB HDD", Display: "21.5-inch FHD", Condition: "Second-hand (Excellent)" }},
  { name: "All-in-One PC (Core i5 6th Gen)", price: 300, category: "Desktops", brand: "Generic", badge: "Excellent Condition", warranty: "3 months", image: desktopImg, stock_count: 2, in_stock: true, rating: 4.4, reviews: 7, description: "All-in-One PC with Core i5 6th Gen, 8GB RAM, 500GB HDD.", specifications: { Processor: "Intel Core i5 6th Gen", RAM: "8GB DDR4", Storage: "500GB HDD", Display: "21.5-inch FHD", Condition: "Second-hand (Excellent)" }},
  { name: "HP All-in-One PC (Core i5 6th Gen)", price: 320, category: "Desktops", brand: "HP", badge: "Excellent Condition", warranty: "3 months", image: desktopImg, stock_count: 2, in_stock: true, rating: 4.5, reviews: 8, description: "HP All-in-One PC with Core i5 6th Gen, 8GB RAM, 500GB HDD.", specifications: { Processor: "Intel Core i5 6th Gen", RAM: "8GB DDR4", Storage: "500GB HDD", Display: "23.8-inch FHD", Condition: "Second-hand (Excellent)" }},
  { name: "All-in-One PC (Core i7 6th Gen)", price: 320, category: "Desktops", brand: "Generic", badge: "Excellent Condition", warranty: "3 months", image: desktopImg, stock_count: 2, in_stock: true, rating: 4.5, reviews: 6, description: "All-in-One PC with Core i7 6th Gen, 8GB RAM, 500GB HDD.", specifications: { Processor: "Intel Core i7 6th Gen", RAM: "8GB DDR4", Storage: "500GB HDD", Display: "23.8-inch FHD", Condition: "Second-hand (Excellent)" }},
  
  // MONITORS
  { name: "19/20-inch Monitor (Standard)", price: 50, category: "Monitors", brand: "Generic", badge: "Good Condition", warranty: "1 month", image: monitorImg, stock_count: 10, in_stock: true, rating: 4.0, reviews: 15, description: "19/20-inch standard monitor. Perfect for basic computing.", specifications: { Size: "19/20-inch", Resolution: "1366x768", Panel: "TN", Condition: "Second-hand (Good)" }},
  { name: "22-inch Monitor (Standard)", price: 60, category: "Monitors", brand: "Generic", badge: "Good Condition", warranty: "1 month", image: monitorImg, stock_count: 8, in_stock: true, rating: 4.1, reviews: 12, description: "22-inch standard monitor with HD resolution.", specifications: { Size: "22-inch", Resolution: "1920x1080", Panel: "TN", Condition: "Second-hand (Good)" }},
  { name: "22-inch Monitor (Borderless)", price: 100, category: "Monitors", brand: "Generic", badge: "Excellent Condition", warranty: "3 months", image: monitorImg, stock_count: 5, in_stock: true, rating: 4.4, reviews: 9, description: "22-inch borderless monitor with slim bezels.", specifications: { Size: "22-inch", Resolution: "1920x1080", Panel: "IPS", Bezel: "Borderless", Condition: "Second-hand (Excellent)" }},
  { name: "22-inch Monitor - Brand New", price: 155, category: "Monitors", brand: "Generic", badge: "Brand New", warranty: "1 year", image: monitorImg, stock_count: 6, in_stock: true, rating: 4.6, reviews: 8, description: "Brand new 22-inch FHD monitor.", specifications: { Size: "22-inch", Resolution: "1920x1080", Panel: "IPS", Condition: "Brand New" }},
  { name: "24-inch Monitor (Standard)", price: 85, category: "Monitors", brand: "Generic", badge: "Good Condition", warranty: "1 month", image: monitorImg, stock_count: 6, in_stock: true, rating: 4.2, reviews: 10, description: "24-inch standard monitor with FHD resolution.", specifications: { Size: "24-inch", Resolution: "1920x1080", Panel: "VA", Condition: "Second-hand (Good)" }},
  { name: "24-inch Monitor (Borderless)", price: 120, category: "Monitors", brand: "Generic", badge: "Excellent Condition", warranty: "3 months", image: monitorImg, stock_count: 4, in_stock: true, rating: 4.5, reviews: 8, description: "24-inch borderless monitor with slim bezels.", specifications: { Size: "24-inch", Resolution: "1920x1080", Panel: "IPS", Bezel: "Borderless", Condition: "Second-hand (Excellent)" }},
  { name: "25-inch Monitor (Borderless)", price: 140, category: "Monitors", brand: "Generic", badge: "Excellent Condition", warranty: "3 months", image: monitorImg, stock_count: 3, in_stock: true, rating: 4.5, reviews: 6, description: "25-inch borderless monitor with FHD resolution.", specifications: { Size: "25-inch", Resolution: "1920x1080", Panel: "IPS", Bezel: "Borderless", Condition: "Second-hand (Excellent)" }},
  { name: "27-inch Monitor (Standard)", price: 140, category: "Monitors", brand: "Generic", badge: "Excellent Condition", warranty: "3 months", image: monitorImg, stock_count: 4, in_stock: true, rating: 4.4, reviews: 7, description: "27-inch standard monitor with FHD resolution.", specifications: { Size: "27-inch", Resolution: "1920x1080", Panel: "VA", Condition: "Second-hand (Excellent)" }},
  { name: "27-inch Monitor (Borderless)", price: 160, category: "Monitors", brand: "Generic", badge: "Excellent Condition", warranty: "3 months", image: monitorImg, stock_count: 3, in_stock: true, rating: 4.6, reviews: 5, description: "27-inch borderless monitor with slim bezels.", specifications: { Size: "27-inch", Resolution: "1920x1080", Panel: "IPS", Bezel: "Borderless", Condition: "Second-hand (Excellent)" }},
  
  // SMARTPHONES - SAMSUNG
  { name: "Samsung Galaxy A05 (6/128GB)", price: 100, category: "Smartphones", brand: "Samsung", badge: "Brand New", warranty: "1 year", image: phoneImg, stock_count: 10, in_stock: true, rating: 4.3, reviews: 15, description: "Samsung Galaxy A05 with 6GB RAM, 128GB storage.", specifications: { RAM: "6GB", Storage: "128GB", Display: "6.5-inch HD+", Camera: "50MP", Battery: "5000mAh", Condition: "Brand New" }},
  { name: "Samsung Galaxy A30 (4/64GB)", price: 85, category: "Smartphones", brand: "Samsung", badge: "Excellent Condition", warranty: "3 months", image: phoneImg, stock_count: 5, in_stock: true, rating: 4.2, reviews: 12, description: "Samsung Galaxy A30 with 4GB RAM, 64GB storage.", specifications: { RAM: "4GB", Storage: "64GB", Display: "6.4-inch FHD+", Camera: "16MP", Battery: "4000mAh", Condition: "Second-hand (Excellent)" }},
  { name: "Samsung Galaxy A05s (6/128GB)", price: 120, category: "Smartphones", brand: "Samsung", badge: "Brand New", warranty: "1 year", image: phoneImg, stock_count: 8, in_stock: true, rating: 4.4, reviews: 10, description: "Samsung Galaxy A05s with 6GB RAM, 128GB storage.", specifications: { RAM: "6GB", Storage: "128GB", Display: "6.7-inch FHD+", Camera: "50MP", Battery: "5000mAh", Condition: "Brand New" }},
  { name: "Samsung Galaxy M14 5G (6/128GB)", price: 110, category: "Smartphones", brand: "Samsung", badge: "Brand New", warranty: "1 year", image: phoneImg, stock_count: 6, in_stock: true, rating: 4.5, reviews: 8, description: "Samsung Galaxy M14 5G with 6GB RAM, 128GB storage.", specifications: { RAM: "6GB", Storage: "128GB", Display: "6.6-inch FHD+", Camera: "50MP", Battery: "6000mAh", Network: "5G", Condition: "Brand New" }},
  { name: "Samsung Galaxy A06 (6/128GB)", price: 115, category: "Smartphones", brand: "Samsung", badge: "Brand New", warranty: "1 year", image: phoneImg, stock_count: 8, in_stock: true, rating: 4.4, reviews: 7, description: "Samsung Galaxy A06 with 6GB RAM, 128GB storage.", specifications: { RAM: "6GB", Storage: "128GB", Display: "6.7-inch HD+", Camera: "50MP", Battery: "5000mAh", Condition: "Brand New" }},
  
  // SMARTPHONES - XIAOMI
  { name: "Xiaomi Redmi A3 (8/64GB)", price: 85, category: "Smartphones", brand: "Xiaomi", badge: "Brand New", warranty: "1 year", image: phoneImg, stock_count: 10, in_stock: true, rating: 4.2, reviews: 14, description: "Xiaomi Redmi A3 with 8GB RAM, 64GB storage.", specifications: { RAM: "8GB", Storage: "64GB", Display: "6.52-inch HD+", Camera: "8MP", Battery: "5000mAh", Condition: "Brand New" }},
  { name: "Xiaomi Redmi 14C (16/64GB)", price: 95, category: "Smartphones", brand: "Xiaomi", badge: "Brand New", warranty: "1 year", image: phoneImg, stock_count: 8, in_stock: true, rating: 4.3, reviews: 11, description: "Xiaomi Redmi 14C with 16GB RAM, 64GB storage.", specifications: { RAM: "16GB", Storage: "64GB", Display: "6.88-inch HD+", Camera: "50MP", Battery: "5160mAh", Condition: "Brand New" }},
  { name: "Xiaomi Redmi 13 (8/64GB)", price: 110, category: "Smartphones", brand: "Xiaomi", badge: "Brand New", warranty: "1 year", image: phoneImg, stock_count: 6, in_stock: true, rating: 4.4, reviews: 9, description: "Xiaomi Redmi 13 with 8GB RAM, 64GB storage.", specifications: { RAM: "8GB", Storage: "64GB", Display: "6.79-inch FHD+", Camera: "108MP", Battery: "5030mAh", Condition: "Brand New" }},
];

export async function POST(request: Request) {
  try {
    // Check for admin authorization
    const authHeader = request.headers.get('authorization');
    if (authHeader !== 'Bearer sui-generis-admin-2024') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const results = {
      success: [] as string[],
      failed: [] as { name: string; error: string }[],
    };

    for (const product of products) {
      try {
        const { error } = await supabase
          .from('products')
          .insert({
            name: product.name,
            price: product.price,
            category: product.category,
            brand: product.brand,
            description: product.description,
            specifications: product.specifications,
            stock_count: product.stock_count,
            in_stock: product.in_stock,
            image: product.image,
            images: [product.image],
            rating: product.rating,
            reviews: product.reviews,
            warranty: product.warranty,
            badge: product.badge,
            sku: `SKU-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`.toUpperCase()
          });

        if (error) throw error;
        results.success.push(product.name);
      } catch (error: any) {
        results.failed.push({ name: product.name, error: error.message });
      }
    }

    return NextResponse.json({
      message: 'Product import completed',
      total: products.length,
      successful: results.success.length,
      failed: results.failed.length,
      details: results
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Product import API',
    totalProducts: products.length,
    categories: {
      laptops: products.filter(p => p.category === 'Laptops').length,
      components: products.filter(p => p.category === 'Components').length,
      desktops: products.filter(p => p.category === 'Desktops').length,
      monitors: products.filter(p => p.category === 'Monitors').length,
      smartphones: products.filter(p => p.category === 'Smartphones').length,
    },
    instructions: 'Send a POST request with Authorization header "Bearer sui-generis-admin-2024" to import products'
  });
}
