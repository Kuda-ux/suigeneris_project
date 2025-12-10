import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Product condition types
type Condition = 'Brand New' | 'Second-hand (Excellent)' | 'Refurbished';

interface ProductData {
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  condition: Condition;
  stock_count: number;
  specifications?: Record<string, string>;
}

// All current products from the shop
const allProducts: ProductData[] = [
  // ==================== LAPTOPS ====================
  // Budget Laptops ($100-$200)
  {
    name: 'Microsoft Surface SE',
    description: 'Compact and lightweight laptop perfect for students and basic computing. Features Intel Celeron processor with 11.6" display.',
    price: 110,
    category: 'Laptops',
    brand: 'Microsoft',
    condition: 'Second-hand (Excellent)',
    stock_count: 5,
    specifications: { processor: 'Celeron N4020', display: '11.6"', ram: '4GB', storage: '64GB' }
  },
  {
    name: 'Lenovo X131e/X140e',
    description: 'Durable ThinkPad-class laptop with upgraded RAM and SSD storage. Ideal for everyday productivity.',
    price: 115,
    category: 'Laptops',
    brand: 'Lenovo',
    condition: 'Second-hand (Excellent)',
    stock_count: 4,
    specifications: { processor: 'Celeron 1007U', display: '11.6"', ram: '8GB', storage: '500GB SSD' }
  },
  {
    name: 'Dell Latitude 3150',
    description: 'Reliable Dell business laptop with SSD storage for fast boot times and responsive performance.',
    price: 120,
    category: 'Laptops',
    brand: 'Dell',
    condition: 'Second-hand (Excellent)',
    stock_count: 3,
    specifications: { processor: 'Pentium N3540', display: '11.6"', ram: '8GB', storage: '128GB SSD' }
  },
  {
    name: 'Dell Latitude 3189/90',
    description: 'Compact Dell laptop with modern Celeron processor. Great for light office work and web browsing.',
    price: 125,
    category: 'Laptops',
    brand: 'Dell',
    condition: 'Second-hand (Excellent)',
    stock_count: 4,
    specifications: { processor: 'Celeron N4120', display: '11.6"', ram: '4GB', storage: '128GB SSD' }
  },
  {
    name: 'Lenovo ThinkPad T460',
    description: 'Professional-grade ThinkPad with 6th Gen Intel Core i5. Known for reliability and excellent keyboard.',
    price: 180,
    category: 'Laptops',
    brand: 'Lenovo',
    condition: 'Second-hand (Excellent)',
    stock_count: 5,
    specifications: { processor: 'Core i5 6th Gen', display: '14"', ram: '8GB', storage: '500GB HDD' }
  },
  {
    name: 'Lenovo ThinkPad L570',
    description: 'Large-screen ThinkPad with 7th Gen Intel Core i5. Perfect for office work with spacious 15.6" display.',
    price: 180,
    category: 'Laptops',
    brand: 'Lenovo',
    condition: 'Second-hand (Excellent)',
    stock_count: 4,
    specifications: { processor: 'Core i5 7th Gen', display: '15.6"', ram: '8GB', storage: '500GB HDD' }
  },
  {
    name: 'Dell Latitude 5570',
    description: 'Business-class Dell laptop with large display. Reliable performance for everyday tasks.',
    price: 180,
    category: 'Laptops',
    brand: 'Dell',
    condition: 'Second-hand (Excellent)',
    stock_count: 3,
    specifications: { processor: 'Core i3 6th Gen', display: '15.6"', ram: '8GB', storage: '500GB HDD' }
  },

  // Mid-Range Laptops ($200-$300)
  {
    name: 'Acer TravelMate P259-G2-M',
    description: 'Professional Acer laptop with SSD storage. Designed for business users who need reliability.',
    price: 220,
    category: 'Laptops',
    brand: 'Acer',
    condition: 'Second-hand (Excellent)',
    stock_count: 3,
    specifications: { processor: 'Core i3 6th Gen', display: '15.6"', ram: '8GB', storage: '128GB SSD' }
  },
  {
    name: 'HP Pro x2 Detachable 2-in-1',
    description: 'Versatile 2-in-1 detachable laptop with touchscreen. Use as laptop or tablet.',
    price: 230,
    category: 'Laptops',
    brand: 'HP',
    condition: 'Second-hand (Excellent)',
    stock_count: 2,
    specifications: { processor: 'Core m5-7Y54', display: '12.5" Touch', ram: '8GB', storage: '256GB SSD' }
  },
  {
    name: 'Lenovo ThinkPad L490',
    description: 'Modern ThinkPad with 8th Gen Intel processor. Fast SSD and reliable build quality.',
    price: 230,
    category: 'Laptops',
    brand: 'Lenovo',
    condition: 'Second-hand (Excellent)',
    stock_count: 4,
    specifications: { processor: 'Core i5 8th Gen', display: '14"', ram: '8GB', storage: '256GB SSD' }
  },
  {
    name: 'Lenovo ThinkPad T490',
    description: 'Premium ThinkPad with 8th Gen Intel Core i5. Slim design with excellent performance.',
    price: 240,
    category: 'Laptops',
    brand: 'Lenovo',
    condition: 'Second-hand (Excellent)',
    stock_count: 3,
    specifications: { processor: 'Core i5 8th Gen', display: '14"', ram: '8GB', storage: '256GB SSD' }
  },
  {
    name: 'Dell Latitude 5500',
    description: 'Business laptop with 8th Gen Intel Core i5. Large 15.6" display for productivity.',
    price: 250,
    category: 'Laptops',
    brand: 'Dell',
    condition: 'Second-hand (Excellent)',
    stock_count: 4,
    specifications: { processor: 'Core i5 8th Gen', display: '15.6"', ram: '8GB', storage: '500GB HDD' }
  },
  {
    name: 'Dell Latitude 3500',
    description: 'Affordable Dell business laptop with modern 8th Gen processor. Great value for money.',
    price: 250,
    category: 'Laptops',
    brand: 'Dell',
    condition: 'Second-hand (Excellent)',
    stock_count: 3,
    specifications: { processor: 'Core i5 8th Gen', display: '15.6"', ram: '8GB', storage: '500GB HDD' }
  },
  {
    name: 'Toshiba Dynabook Tecra A50-EC (i5)',
    description: 'Japanese-quality business laptop with SSD storage. Reliable and well-built.',
    price: 250,
    category: 'Laptops',
    brand: 'Toshiba',
    condition: 'Second-hand (Excellent)',
    stock_count: 3,
    specifications: { processor: 'Core i5 8th Gen', display: '15.6"', ram: '8GB', storage: '256GB SSD' }
  },
  {
    name: 'Dell Latitude 5290 2-in-1',
    description: 'Convertible 2-in-1 laptop with touchscreen. Flexible design for work and presentations.',
    price: 260,
    category: 'Laptops',
    brand: 'Dell',
    condition: 'Second-hand (Excellent)',
    stock_count: 2,
    specifications: { processor: 'Core i5 8th Gen', display: '12.3" Touch', ram: '8GB', storage: '256GB SSD' }
  },
  {
    name: 'HP EliteBook 850 G3/G4',
    description: 'Premium HP business laptop with large display. Built for professionals.',
    price: 260,
    category: 'Laptops',
    brand: 'HP',
    condition: 'Second-hand (Excellent)',
    stock_count: 4,
    specifications: { processor: 'Core i5 7th Gen', display: '15.6"', ram: '8GB', storage: '256GB SSD' }
  },
  {
    name: 'Toshiba Dynabook Tecra A50-EC (i7 6th)',
    description: 'Powerful Dynabook with Intel Core i7 processor. Excellent for demanding tasks.',
    price: 265,
    category: 'Laptops',
    brand: 'Toshiba',
    condition: 'Second-hand (Excellent)',
    stock_count: 2,
    specifications: { processor: 'Core i7 6th Gen', display: '15.6"', ram: '8GB', storage: '256GB SSD' }
  },
  {
    name: 'Toshiba Dynabook Tecra A50-EC (i7 8th)',
    description: 'High-performance Dynabook with 8th Gen Core i7. Fast and reliable for professionals.',
    price: 280,
    category: 'Laptops',
    brand: 'Toshiba',
    condition: 'Second-hand (Excellent)',
    stock_count: 2,
    specifications: { processor: 'Core i7 8th Gen', display: '15.6"', ram: '8GB', storage: '256GB SSD' }
  },
  {
    name: 'HP EliteBook 840 G5',
    description: 'Slim and powerful HP EliteBook with 8th Gen processor. Premium business laptop.',
    price: 290,
    category: 'Laptops',
    brand: 'HP',
    condition: 'Second-hand (Excellent)',
    stock_count: 3,
    specifications: { processor: 'Core i5 8th Gen', display: '14"', ram: '8GB', storage: '256GB SSD' }
  },
  {
    name: 'HP EliteBook 840 G3',
    description: 'Powerful EliteBook with Intel Core i7. Excellent for multitasking and professional work.',
    price: 290,
    category: 'Laptops',
    brand: 'HP',
    condition: 'Second-hand (Excellent)',
    stock_count: 3,
    specifications: { processor: 'Core i7 6th Gen', display: '14"', ram: '8GB', storage: '256GB SSD' }
  },

  // Premium Laptops ($300-$500)
  {
    name: 'HP EliteBook 850 G5/G6',
    description: 'Latest generation EliteBook with 8th Gen processor. Large display for productivity.',
    price: 310,
    category: 'Laptops',
    brand: 'HP',
    condition: 'Second-hand (Excellent)',
    stock_count: 3,
    specifications: { processor: 'Core i5 8th Gen', display: '15.6"', ram: '8GB', storage: '256GB SSD' }
  },
  {
    name: 'Dell Latitude 5410',
    description: 'Modern Dell business laptop with 10th Gen Intel processor. Fast and efficient.',
    price: 320,
    category: 'Laptops',
    brand: 'Dell',
    condition: 'Second-hand (Excellent)',
    stock_count: 4,
    specifications: { processor: 'Core i5 10th Gen', display: '14"', ram: '8GB', storage: '256GB SSD' }
  },
  {
    name: 'Dell Latitude 3520',
    description: 'Latest generation Dell laptop with 11th Gen Intel. Modern performance and features.',
    price: 365,
    category: 'Laptops',
    brand: 'Dell',
    condition: 'Second-hand (Excellent)',
    stock_count: 3,
    specifications: { processor: 'Core i5 11th Gen', display: '15.6"', ram: '8GB', storage: '256GB SSD' }
  },
  {
    name: 'Dell Vostro 15 3510',
    description: 'Dell Vostro with 16GB RAM for multitasking. Great for business and productivity.',
    price: 365,
    category: 'Laptops',
    brand: 'Dell',
    condition: 'Second-hand (Excellent)',
    stock_count: 2,
    specifications: { processor: 'Core i5 11th Gen', display: '15.6"', ram: '16GB', storage: '256GB SSD' }
  },
  {
    name: 'Dell Latitude 7320',
    description: 'Compact premium Dell with 16GB RAM. Ultraportable design with powerful specs.',
    price: 370,
    category: 'Laptops',
    brand: 'Dell',
    condition: 'Second-hand (Excellent)',
    stock_count: 2,
    specifications: { processor: 'Core i5 11th Gen', display: '13.3"', ram: '16GB', storage: '256GB SSD' }
  },
  {
    name: 'Dell Vostro 5502',
    description: 'Premium Dell Vostro with 16GB RAM and 512GB SSD. Excellent all-round performance.',
    price: 380,
    category: 'Laptops',
    brand: 'Dell',
    condition: 'Second-hand (Excellent)',
    stock_count: 2,
    specifications: { processor: 'Core i5 11th Gen', display: '15.6"', ram: '16GB', storage: '512GB SSD' }
  },
  {
    name: 'Dell Vostro 15 5510',
    description: 'Slim Dell Vostro with 16GB RAM. Modern design with powerful 11th Gen processor.',
    price: 380,
    category: 'Laptops',
    brand: 'Dell',
    condition: 'Second-hand (Excellent)',
    stock_count: 2,
    specifications: { processor: 'Core i5 11th Gen', display: '15.6"', ram: '16GB', storage: '256GB SSD' }
  },

  // MacBooks
  {
    name: 'Apple MacBook Pro 2017 (15")',
    description: 'Powerful MacBook Pro with Intel Core i7, dedicated graphics, and 512GB SSD. Perfect for creative professionals.',
    price: 520,
    category: 'Laptops',
    brand: 'Apple',
    condition: 'Second-hand (Excellent)',
    stock_count: 1,
    specifications: { processor: 'Core i7', display: '15.6" Retina', ram: '16GB', storage: '512GB SSD', vram: '4GB' }
  },
  {
    name: 'Apple MacBook Pro 2019 (15")',
    description: 'Latest Intel MacBook Pro with powerful specs. Ideal for video editing and development.',
    price: 580,
    category: 'Laptops',
    brand: 'Apple',
    condition: 'Second-hand (Excellent)',
    stock_count: 1,
    specifications: { processor: 'Core i7', display: '15.6" Retina', ram: '16GB', storage: '256GB SSD', vram: '4GB' }
  },

  // Brand New Laptops
  {
    name: 'HP 15 (i5 13th Gen)',
    description: 'Brand new HP laptop with latest 13th Gen Intel Core i5. Modern design with fast SSD storage.',
    price: 600,
    category: 'Laptops',
    brand: 'HP',
    condition: 'Brand New',
    stock_count: 5,
    specifications: { processor: 'Core i5 13th Gen', display: '15.6"', ram: '8GB', storage: '512GB SSD' }
  },
  {
    name: 'HP 250 G10 (i5)',
    description: 'Brand new HP business laptop with 13th Gen processor. Reliable and affordable.',
    price: 620,
    category: 'Laptops',
    brand: 'HP',
    condition: 'Brand New',
    stock_count: 4,
    specifications: { processor: 'Core i5 13th Gen', display: '15.6"', ram: '8GB', storage: '512GB SSD' }
  },
  {
    name: 'Dell Latitude 7640',
    description: 'Premium Dell with 13th Gen i7, 32GB RAM and 1TB SSD. Top-tier business laptop.',
    price: 750,
    category: 'Laptops',
    brand: 'Dell',
    condition: 'Second-hand (Excellent)',
    stock_count: 1,
    specifications: { processor: 'Core i7 13th Gen', display: '16"', ram: '32GB', storage: '1TB SSD' }
  },
  {
    name: 'Dell Precision 3580',
    description: 'Mobile workstation with dedicated graphics. Perfect for CAD, 3D modeling, and video editing.',
    price: 750,
    category: 'Laptops',
    brand: 'Dell',
    condition: 'Second-hand (Excellent)',
    stock_count: 1,
    specifications: { processor: 'Core i7 13th Gen', display: '15.6"', ram: '16GB', storage: '512GB SSD', vram: '4GB' }
  },
  {
    name: 'HP 15 (i7 13th Gen)',
    description: 'Brand new HP laptop with powerful 13th Gen Intel Core i7. Excellent for demanding tasks.',
    price: 780,
    category: 'Laptops',
    brand: 'HP',
    condition: 'Brand New',
    stock_count: 3,
    specifications: { processor: 'Core i7 13th Gen', display: '15.6"', ram: '8GB', storage: '512GB SSD' }
  },
  {
    name: 'HP 250 G10 (i7)',
    description: 'Brand new HP business laptop with Core i7. Maximum performance for professionals.',
    price: 800,
    category: 'Laptops',
    brand: 'HP',
    condition: 'Brand New',
    stock_count: 3,
    specifications: { processor: 'Core i7 13th Gen', display: '15.6"', ram: '8GB', storage: '512GB SSD' }
  },

  // ==================== PROCESSORS ====================
  {
    name: 'Intel Core i3 4th Gen Processor',
    description: 'Desktop processor for basic computing needs. Compatible with LGA 1150 motherboards.',
    price: 100,
    category: 'Processors',
    brand: 'Intel',
    condition: 'Second-hand (Excellent)',
    stock_count: 5,
    specifications: { generation: '4th Gen', socket: 'LGA 1150' }
  },
  {
    name: 'Intel Core i5 4th Gen Processor',
    description: 'Mid-range desktop processor. Great for office work and light gaming.',
    price: 160,
    category: 'Processors',
    brand: 'Intel',
    condition: 'Second-hand (Excellent)',
    stock_count: 4,
    specifications: { generation: '4th Gen', socket: 'LGA 1150' }
  },
  {
    name: 'Intel Core i3 6th Gen Processor',
    description: 'Skylake architecture processor with improved efficiency.',
    price: 170,
    category: 'Processors',
    brand: 'Intel',
    condition: 'Second-hand (Excellent)',
    stock_count: 4,
    specifications: { generation: '6th Gen', socket: 'LGA 1151' }
  },
  {
    name: 'Intel Core i3 7th Gen Processor',
    description: 'Kaby Lake processor with better performance per watt.',
    price: 180,
    category: 'Processors',
    brand: 'Intel',
    condition: 'Second-hand (Excellent)',
    stock_count: 3,
    specifications: { generation: '7th Gen', socket: 'LGA 1151' }
  },
  {
    name: 'Intel Core i5 7th Gen Processor',
    description: 'Powerful Kaby Lake processor for demanding applications.',
    price: 200,
    category: 'Processors',
    brand: 'Intel',
    condition: 'Second-hand (Excellent)',
    stock_count: 3,
    specifications: { generation: '7th Gen', socket: 'LGA 1151' }
  },
  {
    name: 'Intel Core i3 8th Gen Processor',
    description: 'Coffee Lake processor with 4 cores. Significant performance improvement.',
    price: 200,
    category: 'Processors',
    brand: 'Intel',
    condition: 'Second-hand (Excellent)',
    stock_count: 3,
    specifications: { generation: '8th Gen', socket: 'LGA 1151 v2' }
  },
  {
    name: 'Intel Core i3 10th Gen Processor',
    description: 'Comet Lake processor with modern features and improved performance.',
    price: 250,
    category: 'Processors',
    brand: 'Intel',
    condition: 'Second-hand (Excellent)',
    stock_count: 2,
    specifications: { generation: '10th Gen', socket: 'LGA 1200' }
  },
  {
    name: 'Intel Core i3 12th Gen Processor',
    description: 'Brand new Alder Lake processor with hybrid architecture. Latest technology.',
    price: 320,
    category: 'Processors',
    brand: 'Intel',
    condition: 'Brand New',
    stock_count: 3,
    specifications: { generation: '12th Gen', socket: 'LGA 1700' }
  },
  {
    name: 'Intel Core i5 13th Gen Processor',
    description: 'Latest Raptor Lake processor. Excellent for gaming and productivity.',
    price: 420,
    category: 'Processors',
    brand: 'Intel',
    condition: 'Second-hand (Excellent)',
    stock_count: 2,
    specifications: { generation: '13th Gen', socket: 'LGA 1700' }
  },

  // ==================== ALL-IN-ONE PCs ====================
  {
    name: 'All-in-One PC (Dual Core)',
    description: 'Compact all-in-one desktop computer. Space-saving design for home and office.',
    price: 170,
    category: 'Desktops',
    brand: 'Generic',
    condition: 'Second-hand (Excellent)',
    stock_count: 3,
    specifications: { processor: 'Intel Dual Core', type: 'All-in-One' }
  },
  {
    name: 'All-in-One PC (i3 6th Gen)',
    description: 'All-in-one desktop with Intel Core i3. Perfect for office productivity.',
    price: 260,
    category: 'Desktops',
    brand: 'Generic',
    condition: 'Second-hand (Excellent)',
    stock_count: 2,
    specifications: { processor: 'Core i3 6th Gen', type: 'All-in-One' }
  },
  {
    name: 'All-in-One PC (i3 7th Gen)',
    description: 'Modern all-in-one with 7th Gen processor. Sleek design with good performance.',
    price: 300,
    category: 'Desktops',
    brand: 'Generic',
    condition: 'Second-hand (Excellent)',
    stock_count: 2,
    specifications: { processor: 'Core i3 7th Gen', type: 'All-in-One' }
  },
  {
    name: 'All-in-One PC (i5 6th Gen)',
    description: 'Powerful all-in-one with Core i5. Great for multitasking and business use.',
    price: 300,
    category: 'Desktops',
    brand: 'Generic',
    condition: 'Second-hand (Excellent)',
    stock_count: 2,
    specifications: { processor: 'Core i5 6th Gen', type: 'All-in-One' }
  },
  {
    name: 'HP All-in-One PC (i5 6th Gen)',
    description: 'HP branded all-in-one with Core i5. Quality build with reliable performance.',
    price: 320,
    category: 'Desktops',
    brand: 'HP',
    condition: 'Second-hand (Excellent)',
    stock_count: 2,
    specifications: { processor: 'Core i5 6th Gen', type: 'All-in-One' }
  },
  {
    name: 'All-in-One PC (i7 6th Gen)',
    description: 'High-performance all-in-one with Core i7. Excellent for demanding applications.',
    price: 320,
    category: 'Desktops',
    brand: 'Generic',
    condition: 'Second-hand (Excellent)',
    stock_count: 1,
    specifications: { processor: 'Core i7 6th Gen', type: 'All-in-One' }
  },

  // ==================== MONITORS ====================
  {
    name: '19"/20" Standard Monitor',
    description: 'Compact monitor for basic computing. Great as secondary display.',
    price: 50,
    category: 'Monitors',
    brand: 'Generic',
    condition: 'Second-hand (Excellent)',
    stock_count: 10,
    specifications: { size: '19-20"', type: 'Standard' }
  },
  {
    name: '22" Standard Monitor',
    description: 'Popular size monitor for everyday use. Good balance of size and desk space.',
    price: 60,
    category: 'Monitors',
    brand: 'Generic',
    condition: 'Second-hand (Excellent)',
    stock_count: 8,
    specifications: { size: '22"', type: 'Standard' }
  },
  {
    name: '22" Borderless Monitor',
    description: 'Modern borderless design monitor. Sleek look for modern setups.',
    price: 100,
    category: 'Monitors',
    brand: 'Generic',
    condition: 'Second-hand (Excellent)',
    stock_count: 5,
    specifications: { size: '22"', type: 'Borderless' }
  },
  {
    name: '22" Monitor (Brand New)',
    description: 'Brand new 22" monitor with warranty. Perfect for new setups.',
    price: 155,
    category: 'Monitors',
    brand: 'Generic',
    condition: 'Brand New',
    stock_count: 4,
    specifications: { size: '22"', type: 'Standard' }
  },
  {
    name: '24" Standard Monitor',
    description: 'Large 24" monitor for comfortable viewing. Ideal for productivity.',
    price: 90,
    category: 'Monitors',
    brand: 'Generic',
    condition: 'Second-hand (Excellent)',
    stock_count: 6,
    specifications: { size: '24"', type: 'Standard' }
  },
  {
    name: '24" Borderless Monitor',
    description: 'Sleek 24" borderless monitor. Modern design for multi-monitor setups.',
    price: 120,
    category: 'Monitors',
    brand: 'Generic',
    condition: 'Second-hand (Excellent)',
    stock_count: 4,
    specifications: { size: '24"', type: 'Borderless' }
  },
  {
    name: '25" Borderless Monitor',
    description: 'Large 25" borderless display. Extra screen real estate for productivity.',
    price: 140,
    category: 'Monitors',
    brand: 'Generic',
    condition: 'Second-hand (Excellent)',
    stock_count: 3,
    specifications: { size: '25"', type: 'Borderless' }
  },
  {
    name: '27" Standard Monitor',
    description: 'Large 27" monitor for immersive viewing. Great for work and entertainment.',
    price: 140,
    category: 'Monitors',
    brand: 'Generic',
    condition: 'Second-hand (Excellent)',
    stock_count: 4,
    specifications: { size: '27"', type: 'Standard' }
  },
  {
    name: '27" Borderless Monitor',
    description: 'Premium 27" borderless monitor. Maximum immersion with minimal bezels.',
    price: 160,
    category: 'Monitors',
    brand: 'Generic',
    condition: 'Second-hand (Excellent)',
    stock_count: 3,
    specifications: { size: '27"', type: 'Borderless' }
  },

  // ==================== SMARTPHONES ====================
  {
    name: 'Xiaomi Redmi A3',
    description: 'Budget-friendly smartphone with 8GB RAM. Great value for everyday use.',
    price: 85,
    category: 'Smartphones',
    brand: 'Xiaomi',
    condition: 'Brand New',
    stock_count: 5,
    specifications: { ram: '8GB', storage: '64GB' }
  },
  {
    name: 'Samsung Galaxy A30',
    description: 'Samsung smartphone with AMOLED display. Reliable Samsung quality.',
    price: 85,
    category: 'Smartphones',
    brand: 'Samsung',
    condition: 'Second-hand (Excellent)',
    stock_count: 3,
    specifications: { ram: '4GB', storage: '64GB' }
  },
  {
    name: 'Xiaomi Redmi 14C',
    description: 'Latest Redmi with massive 16GB RAM. Smooth multitasking performance.',
    price: 95,
    category: 'Smartphones',
    brand: 'Xiaomi',
    condition: 'Brand New',
    stock_count: 4,
    specifications: { ram: '16GB', storage: '64GB' }
  },
  {
    name: 'Samsung Galaxy A05',
    description: 'Affordable Samsung with 6GB RAM and 128GB storage. Great starter phone.',
    price: 100,
    category: 'Smartphones',
    brand: 'Samsung',
    condition: 'Brand New',
    stock_count: 5,
    specifications: { ram: '6GB', storage: '128GB' }
  },
  {
    name: 'Xiaomi Redmi 13',
    description: 'Feature-packed Redmi 13 with excellent camera and performance.',
    price: 110,
    category: 'Smartphones',
    brand: 'Xiaomi',
    condition: 'Brand New',
    stock_count: 4,
    specifications: { ram: '8GB', storage: '64GB' }
  },
  {
    name: 'Samsung Galaxy M14 5G',
    description: '5G-capable Samsung with long battery life. Future-proof connectivity.',
    price: 110,
    category: 'Smartphones',
    brand: 'Samsung',
    condition: 'Brand New',
    stock_count: 3,
    specifications: { ram: '6GB', storage: '128GB', network: '5G' }
  },
  {
    name: 'Samsung Galaxy A06',
    description: 'Latest Samsung A-series with 6GB RAM. Reliable everyday smartphone.',
    price: 115,
    category: 'Smartphones',
    brand: 'Samsung',
    condition: 'Brand New',
    stock_count: 4,
    specifications: { ram: '6GB', storage: '128GB' }
  },
  {
    name: 'Samsung Galaxy A05s',
    description: 'Samsung A05s with enhanced features. Great camera and display.',
    price: 120,
    category: 'Smartphones',
    brand: 'Samsung',
    condition: 'Brand New',
    stock_count: 4,
    specifications: { ram: '6GB', storage: '128GB' }
  },

  // ==================== ACCESSORIES ====================
  // Headphones
  {
    name: 'V65 Gaming Headphone',
    description: 'Budget gaming headphone with good sound quality. Perfect for casual gaming.',
    price: 12,
    category: 'Accessories',
    brand: 'Generic',
    condition: 'Brand New',
    stock_count: 10,
    specifications: { type: 'Gaming Headphone' }
  },
  {
    name: 'PHOINIKAS Q3 Gaming Headphone',
    description: 'Premium gaming headset with surround sound. RGB lighting and comfortable design.',
    price: 45,
    category: 'Accessories',
    brand: 'PHOINIKAS',
    condition: 'Brand New',
    stock_count: 5,
    specifications: { type: 'Gaming Headphone', features: 'RGB, Surround Sound' }
  },

  // Cables & Adapters
  {
    name: 'HDMI Cable 1.5m',
    description: 'High-quality HDMI cable for monitors and TVs. 1.5 meter length.',
    price: 3,
    category: 'Accessories',
    brand: 'Generic',
    condition: 'Brand New',
    stock_count: 20,
    specifications: { length: '1.5m', type: 'HDMI' }
  },
  {
    name: 'HDMI Cable 3m',
    description: 'HDMI cable for longer distance connections. 3 meter length.',
    price: 5,
    category: 'Accessories',
    brand: 'Generic',
    condition: 'Brand New',
    stock_count: 15,
    specifications: { length: '3m', type: 'HDMI' }
  },
  {
    name: 'HDMI Cable 5m',
    description: 'Extended HDMI cable for conference rooms. 5 meter length.',
    price: 10,
    category: 'Accessories',
    brand: 'Generic',
    condition: 'Brand New',
    stock_count: 10,
    specifications: { length: '5m', type: 'HDMI' }
  },
  {
    name: 'HDMI Cable 10m',
    description: 'Long HDMI cable for projectors and distant displays. 10 meter length.',
    price: 12,
    category: 'Accessories',
    brand: 'Generic',
    condition: 'Brand New',
    stock_count: 8,
    specifications: { length: '10m', type: 'HDMI' }
  },
  {
    name: 'HDMI Splitter',
    description: 'Split one HDMI source to multiple displays. Great for presentations.',
    price: 12,
    category: 'Accessories',
    brand: 'Generic',
    condition: 'Brand New',
    stock_count: 8,
    specifications: { type: 'HDMI Splitter' }
  },
  {
    name: 'USB-C to LAN Adapter',
    description: 'Connect ethernet to USB-C devices. Gigabit speed support.',
    price: 5,
    category: 'Accessories',
    brand: 'Generic',
    condition: 'Brand New',
    stock_count: 10,
    specifications: { type: 'USB-C to Ethernet' }
  },
  {
    name: 'USB to LAN Adapter',
    description: 'Add ethernet port to any USB device. Reliable wired connection.',
    price: 5,
    category: 'Accessories',
    brand: 'Generic',
    condition: 'Brand New',
    stock_count: 10,
    specifications: { type: 'USB to Ethernet' }
  },
  {
    name: '8-in-1 USB-C Hub',
    description: 'Multi-port USB-C hub with HDMI output. Expand your laptop connectivity.',
    price: 10,
    category: 'Accessories',
    brand: 'Generic',
    condition: 'Brand New',
    stock_count: 8,
    specifications: { ports: '8-in-1', type: 'USB-C Hub' }
  },
  {
    name: '11-in-1 USB-C Hub',
    description: 'Premium USB-C docking solution. All ports you need in one hub.',
    price: 40,
    category: 'Accessories',
    brand: 'Generic',
    condition: 'Brand New',
    stock_count: 5,
    specifications: { ports: '11-in-1', type: 'USB-C Hub' }
  },

  // Input Devices
  {
    name: 'Wired Mouse',
    description: 'Reliable wired USB mouse. Plug and play, no batteries needed.',
    price: 5,
    category: 'Accessories',
    brand: 'Generic',
    condition: 'Brand New',
    stock_count: 20,
    specifications: { type: 'Wired Mouse' }
  },
  {
    name: 'Wireless Mouse',
    description: 'Convenient wireless mouse with USB receiver. Freedom of movement.',
    price: 7,
    category: 'Accessories',
    brand: 'Generic',
    condition: 'Brand New',
    stock_count: 15,
    specifications: { type: 'Wireless Mouse' }
  },

  // Other Accessories
  {
    name: 'Laptop Cooling Pad',
    description: 'Keep your laptop cool during intensive tasks. USB powered fans.',
    price: 12,
    category: 'Accessories',
    brand: 'Generic',
    condition: 'Brand New',
    stock_count: 10,
    specifications: { type: 'Cooling Pad' }
  },
  {
    name: 'Car MP3 Player L5',
    description: 'Bluetooth FM transmitter for car. Play music from your phone.',
    price: 15,
    category: 'Accessories',
    brand: 'Generic',
    condition: 'Brand New',
    stock_count: 8,
    specifications: { type: 'Car MP3 Player' }
  },
  {
    name: 'Smart WiFi Camera',
    description: 'Home security camera with WiFi connectivity. Monitor from your phone.',
    price: 30,
    category: 'Accessories',
    brand: 'Generic',
    condition: 'Brand New',
    stock_count: 5,
    specifications: { type: 'Security Camera', connectivity: 'WiFi' }
  },
  {
    name: 'GS5 Mini 3D Gaming Stick',
    description: 'Portable gaming console with built-in games. Retro gaming on the go.',
    price: 55,
    category: 'Accessories',
    brand: 'Generic',
    condition: 'Brand New',
    stock_count: 4,
    specifications: { type: 'Gaming Console' }
  },
  {
    name: 'Satellite LP19 Speaker',
    description: 'High-quality portable speaker with powerful bass. Bluetooth connectivity.',
    price: 120,
    category: 'Accessories',
    brand: 'Satellite',
    condition: 'Brand New',
    stock_count: 3,
    specifications: { type: 'Bluetooth Speaker' }
  },

  // Networking
  {
    name: 'ZTE MF286C Indoor Router',
    description: '4G LTE indoor router with WiFi. Fast internet for home and office.',
    price: 65,
    category: 'Networking',
    brand: 'ZTE',
    condition: 'Second-hand (Excellent)',
    stock_count: 3,
    specifications: { type: '4G LTE Router', connectivity: 'WiFi' }
  },
];

export async function POST(request: Request) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Check for authorization (optional - you can add a secret key check)
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'add';

    if (action === 'clear') {
      // Clear existing products first
      const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .neq('id', 0); // Delete all

      if (deleteError) {
        console.error('Error clearing products:', deleteError);
        return NextResponse.json({ error: 'Failed to clear products', details: deleteError }, { status: 500 });
      }
    }

    // Insert all products
    const productsToInsert = allProducts.map((product, index) => ({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      brand: product.brand,
      sku: `SG-${product.category.substring(0, 3).toUpperCase()}-${String(index + 1).padStart(4, '0')}`,
      stock_count: product.stock_count,
      in_stock: product.stock_count > 0,
      image: `/products/${product.category.toLowerCase().replace(/\s+/g, '-')}/${product.brand.toLowerCase()}-placeholder.jpg`,
      images: [],
      specifications: {
        ...product.specifications,
        condition: product.condition
      },
      warranty: product.condition === 'Brand New' ? '12 months' : '3 months',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));

    const { data, error } = await supabase
      .from('products')
      .insert(productsToInsert)
      .select();

    if (error) {
      console.error('Error inserting products:', error);
      return NextResponse.json({ error: 'Failed to insert products', details: error }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Successfully added ${data.length} products`,
      count: data.length,
      categories: {
        laptops: allProducts.filter(p => p.category === 'Laptops').length,
        processors: allProducts.filter(p => p.category === 'Processors').length,
        desktops: allProducts.filter(p => p.category === 'Desktops').length,
        monitors: allProducts.filter(p => p.category === 'Monitors').length,
        smartphones: allProducts.filter(p => p.category === 'Smartphones').length,
        accessories: allProducts.filter(p => p.category === 'Accessories').length,
        networking: allProducts.filter(p => p.category === 'Networking').length,
      }
    });

  } catch (error: any) {
    console.error('Seed products error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Product seeding endpoint',
    usage: 'POST to this endpoint to seed products',
    actions: {
      'POST ?action=add': 'Add products (keeps existing)',
      'POST ?action=clear': 'Clear all products first, then add new ones'
    },
    productCount: allProducts.length,
    categories: {
      laptops: allProducts.filter(p => p.category === 'Laptops').length,
      processors: allProducts.filter(p => p.category === 'Processors').length,
      desktops: allProducts.filter(p => p.category === 'Desktops').length,
      monitors: allProducts.filter(p => p.category === 'Monitors').length,
      smartphones: allProducts.filter(p => p.category === 'Smartphones').length,
      accessories: allProducts.filter(p => p.category === 'Accessories').length,
      networking: allProducts.filter(p => p.category === 'Networking').length,
    }
  });
}
