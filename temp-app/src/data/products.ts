export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  category: string;
  brand: string;
  inStock: boolean;
  stockCount: number;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  warranty: boolean;
}

export const products: Product[] = [
  // LAPTOPS
  {
    id: 1,
    name: "HP EliteBook x360 1030 G3",
    price: 360,
    rating: 4.7,
    reviews: 45,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&h=600&fit=crop&crop=center"
    ],
    category: "Laptops",
    brand: "HP",
    inStock: true,
    stockCount: 8,
    description: "Professional 2-in-1 laptop with 360-degree hinge design. Perfect for business professionals who need versatility and performance.",
    features: [
      "360-degree convertible design",
      "8th Gen Intel Core i5 processor",
      "Fast SSD storage",
      "13.3-inch touchscreen display",
      "Business-grade security features",
      "Long battery life"
    ],
    specifications: {
      "Processor": "Intel Core i5 8th Gen @1.70GHz",
      "RAM": "8GB",
      "Storage": "256GB SSD",
      "Display": "13.3-inch",
      "Graphics": "Intel UHD Graphics",
      "Operating System": "Windows 11 Pro",
      "Weight": "1.35kg"
    },
    warranty: true
  },
  {
    id: 2,
    name: "HP 250 G10 (i5)",
    price: 620,
    rating: 4.5,
    reviews: 32,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop&crop=center"
    ],
    category: "Laptops",
    brand: "HP",
    inStock: true,
    stockCount: 12,
    description: "Latest HP 250 G10 with 13th Gen Intel processor. Ideal for productivity and everyday computing tasks.",
    features: [
      "13th Gen Intel Core i5",
      "Fast 512GB SSD storage",
      "15.6-inch display",
      "Modern design",
      "Enhanced performance",
      "Full warranty coverage"
    ],
    specifications: {
      "Processor": "Intel Core i5 13th Gen",
      "RAM": "8GB DDR4",
      "Storage": "512GB SSD",
      "Display": "15.6-inch HD",
      "Graphics": "Intel Iris Xe",
      "Operating System": "Windows 11",
      "Weight": "1.74kg"
    },
    warranty: true
  },
  {
    id: 3,
    name: "HP 250 G10 (i7)",
    price: 800,
    rating: 4.8,
    reviews: 28,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=600&fit=crop&crop=center"
    ],
    category: "Laptops",
    brand: "HP",
    inStock: true,
    stockCount: 6,
    description: "High-performance HP 250 G10 with 13th Gen Intel i7 processor. Perfect for demanding applications and multitasking.",
    features: [
      "13th Gen Intel Core i7",
      "High-speed 512GB SSD",
      "15.6-inch display",
      "Superior performance",
      "Enhanced graphics",
      "Professional grade"
    ],
    specifications: {
      "Processor": "Intel Core i7 13th Gen",
      "RAM": "8GB DDR4",
      "Storage": "512GB SSD",
      "Display": "15.6-inch HD",
      "Graphics": "Intel Iris Xe",
      "Operating System": "Windows 11 Pro",
      "Weight": "1.74kg"
    },
    warranty: true
  },
  {
    id: 4,
    name: "Dell Latitude 5410",
    price: 320,
    rating: 4.6,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&h=600&fit=crop&crop=center"
    ],
    category: "Laptops",
    brand: "Dell",
    inStock: true,
    stockCount: 15,
    description: "Reliable Dell Latitude business laptop with 10th Gen Intel processor. Built for productivity and durability.",
    features: [
      "10th Gen Intel Core i5",
      "Business-grade build quality",
      "14-inch professional display",
      "Fast SSD storage",
      "Enhanced security features",
      "Durable design"
    ],
    specifications: {
      "Processor": "Intel Core i5 10th Gen",
      "RAM": "8GB DDR4",
      "Storage": "256GB SSD",
      "Display": "14-inch HD",
      "Graphics": "Intel UHD Graphics",
      "Operating System": "Windows 11 Pro",
      "Weight": "1.6kg"
    },
    warranty: true
  },
  {
    id: 5,
    name: "Lenovo ThinkPad T480",
    price: 300,
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=600&fit=crop&crop=center"
    ],
    category: "Laptops",
    brand: "Lenovo",
    inStock: true,
    stockCount: 10,
    description: "Classic ThinkPad reliability with modern performance. Perfect for business users who demand quality and durability.",
    features: [
      "8th Gen Intel Core i5",
      "Legendary ThinkPad keyboard",
      "14-inch display",
      "Military-grade durability",
      "TrackPoint navigation",
      "Enterprise security"
    ],
    specifications: {
      "Processor": "Intel Core i5 8th Gen",
      "RAM": "8GB DDR4",
      "Storage": "256GB SSD",
      "Display": "14-inch FHD",
      "Graphics": "Intel UHD Graphics",
      "Operating System": "Windows 11 Pro",
      "Weight": "1.58kg"
    },
    warranty: true
  },
  {
    id: 6,
    name: "Apple MacBook Pro 2017",
    price: 520,
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=600&fit=crop&crop=center"
    ],
    category: "Laptops",
    brand: "Apple",
    inStock: true,
    stockCount: 4,
    description: "Premium MacBook Pro with Retina display and Touch Bar. Perfect for creative professionals and power users.",
    features: [
      "Intel Core i7 @2.9GHz",
      "15-inch Retina display",
      "Touch Bar and Touch ID",
      "Premium aluminum build",
      "macOS optimized",
      "Professional grade performance"
    ],
    specifications: {
      "Processor": "Intel Core i7 @2.9GHz",
      "RAM": "16GB",
      "Storage": "500GB SSD",
      "Display": "15-inch Retina",
      "Graphics": "Radeon Pro 555",
      "Operating System": "macOS",
      "Weight": "1.83kg"
    },
    warranty: true
  },
  {
    id: 7,
    name: "MSI GF63 Thin 11SC Gaming",
    price: 750,
    rating: 4.8,
    reviews: 94,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=600&fit=crop&crop=center"
    ],
    category: "Laptops",
    brand: "MSI",
    inStock: true,
    stockCount: 7,
    description: "High-performance gaming laptop with dedicated graphics. Perfect for gaming, content creation, and demanding applications.",
    features: [
      "11th Gen Intel Core i7",
      "Dedicated 8GB GPU",
      "15-inch gaming display",
      "1TB SSD storage",
      "Gaming-optimized cooling",
      "RGB keyboard backlight"
    ],
    specifications: {
      "Processor": "Intel Core i7 11th Gen",
      "RAM": "16GB DDR4",
      "Storage": "1TB SSD",
      "Display": "15.6-inch FHD 144Hz",
      "Graphics": "NVIDIA GTX 1650 8GB",
      "Operating System": "Windows 11",
      "Weight": "2.1kg"
    },
    warranty: true
  },
  {
    id: 8,
    name: "Asus ZenBook 14",
    price: 550,
    rating: 4.6,
    reviews: 73,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&h=600&fit=crop&crop=center"
    ],
    category: "Laptops",
    brand: "Asus",
    inStock: true,
    stockCount: 9,
    description: "Ultra-portable ZenBook with premium design and powerful performance. Ideal for professionals on the go.",
    features: [
      "11th Gen Intel Core i7",
      "Ultra-portable design",
      "14-inch NanoEdge display",
      "Fast 512GB SSD",
      "All-day battery life",
      "Premium build quality"
    ],
    specifications: {
      "Processor": "Intel Core i7 11th Gen",
      "RAM": "16GB",
      "Storage": "512GB SSD",
      "Display": "14-inch FHD",
      "Graphics": "Intel Iris Xe",
      "Operating System": "Windows 11",
      "Weight": "1.39kg"
    },
    warranty: true
  },
  {
    id: 9,
    name: "HP 15 (i5)",
    price: 600,
    rating: 4.5,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=600&fit=crop&crop=center"
    ],
    category: "Laptops",
    brand: "HP",
    inStock: true,
    stockCount: 10,
    description: "HP 15 laptop with 13th Gen Intel i5 processor. Great for productivity and everyday computing.",
    features: [
      "13th Gen Intel Core i5",
      "8GB RAM",
      "512GB SSD storage",
      "15.6-inch display",
      "Full warranty coverage",
      "Modern design"
    ],
    specifications: {
      "Processor": "Intel Core i5 13th Gen",
      "RAM": "8GB",
      "Storage": "512GB SSD",
      "Display": "15.6-inch",
      "Graphics": "Intel Iris Xe",
      "Operating System": "Windows 11",
      "Weight": "1.75kg"
    },
    warranty: true
  },
  {
    id: 10,
    name: "HP 15 (i7)",
    price: 620,
    rating: 4.6,
    reviews: 38,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=600&fit=crop&crop=center"
    ],
    category: "Laptops",
    brand: "HP",
    inStock: true,
    stockCount: 8,
    description: "HP 15 laptop with 13th Gen Intel i7 processor. Enhanced performance for demanding tasks.",
    features: [
      "13th Gen Intel Core i7",
      "8GB RAM",
      "512GB SSD storage",
      "15.6-inch display",
      "Full warranty coverage",
      "Superior performance"
    ],
    specifications: {
      "Processor": "Intel Core i7 13th Gen",
      "RAM": "8GB",
      "Storage": "512GB SSD",
      "Display": "15.6-inch",
      "Graphics": "Intel Iris Xe",
      "Operating System": "Windows 11",
      "Weight": "1.75kg"
    },
    warranty: true
  },
  {
    id: 11,
    name: "Dell Latitude 7200",
    price: 260,
    rating: 4.4,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&h=600&fit=crop&crop=center"
    ],
    category: "Laptops",
    brand: "Dell",
    inStock: true,
    stockCount: 12,
    description: "Compact Dell Latitude 2-in-1 tablet laptop. Perfect for mobile professionals.",
    features: [
      "8th Gen Intel Core i5",
      "2-in-1 convertible design",
      "12.3-inch touchscreen",
      "256GB SSD storage",
      "Business-grade security",
      "Lightweight design"
    ],
    specifications: {
      "Processor": "Intel Core i5 8th Gen",
      "RAM": "8GB",
      "Storage": "256GB SSD",
      "Display": "12.3-inch",
      "Graphics": "Intel UHD Graphics",
      "Operating System": "Windows 11 Pro",
      "Weight": "1.2kg"
    },
    warranty: true
  },
  {
    id: 12,
    name: "Dell Latitude E7250",
    price: 160,
    rating: 4.2,
    reviews: 78,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&h=600&fit=crop&crop=center"
    ],
    category: "Laptops",
    brand: "Dell",
    inStock: true,
    stockCount: 15,
    description: "Reliable Dell Latitude ultrabook with 5th Gen Intel processor. Great value for business use.",
    features: [
      "5th Gen Intel Core i5",
      "Ultrabook design",
      "12.5-inch display",
      "256GB SSD storage",
      "Business durability",
      "Long battery life"
    ],
    specifications: {
      "Processor": "Intel Core i5 5th @2.30GHz",
      "RAM": "8GB",
      "Storage": "256GB SSD",
      "Display": "12.5-inch",
      "Graphics": "Intel HD Graphics",
      "Operating System": "Windows 11",
      "Weight": "1.25kg"
    },
    warranty: true
  },
  {
    id: 13,
    name: "Dell Latitude 5400",
    price: 265,
    rating: 4.5,
    reviews: 64,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&h=600&fit=crop&crop=center"
    ],
    category: "Laptops",
    brand: "Dell",
    inStock: true,
    stockCount: 11,
    description: "Dell Latitude 5400 business laptop with 8th Gen Intel processor. Professional grade performance.",
    features: [
      "8th Gen Intel Core i5",
      "Business laptop design",
      "14-inch display",
      "256GB SSD storage",
      "Enhanced security",
      "Durable construction"
    ],
    specifications: {
      "Processor": "Intel Core i5 8th @1.60GHz",
      "RAM": "8GB",
      "Storage": "256GB SSD",
      "Display": "14-inch",
      "Graphics": "Intel UHD Graphics",
      "Operating System": "Windows 11 Pro",
      "Weight": "1.6kg"
    },
    warranty: true
  },
  {
    id: 14,
    name: "Dell Latitude 5430 Rugged",
    price: 1200,
    rating: 4.9,
    reviews: 23,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&h=600&fit=crop&crop=center"
    ],
    category: "Laptops",
    brand: "Dell",
    inStock: true,
    stockCount: 3,
    description: "Rugged Dell Latitude 5430 built for extreme conditions. Military-grade durability and performance.",
    features: [
      "12th Gen Intel Core i5",
      "Rugged military-grade design",
      "14-inch display",
      "512GB SSD storage",
      "16GB RAM",
      "Extreme durability"
    ],
    specifications: {
      "Processor": "Intel Core i5 12th Gen",
      "RAM": "16GB",
      "Storage": "512GB SSD",
      "Display": "14-inch",
      "Graphics": "Intel Iris Xe",
      "Operating System": "Windows 11 Pro",
      "Weight": "1.8kg"
    },
    warranty: true
  },
  {
    id: 15,
    name: "Lenovo ThinkPad T490",
    price: 330,
    rating: 4.7,
    reviews: 71,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=600&fit=crop&crop=center"
    ],
    category: "Laptops",
    brand: "Lenovo",
    inStock: true,
    stockCount: 9,
    description: "Lenovo ThinkPad T490 with modern design and reliable performance. Perfect for business professionals.",
    features: [
      "8th Gen Intel Core i5",
      "ThinkPad reliability",
      "14-inch display",
      "256GB SSD storage",
      "Enhanced keyboard",
      "Business features"
    ],
    specifications: {
      "Processor": "Intel Core i5 8th Gen",
      "RAM": "8GB",
      "Storage": "256GB SSD",
      "Display": "14-inch FHD",
      "Graphics": "Intel UHD Graphics",
      "Operating System": "Windows 11 Pro",
      "Weight": "1.55kg"
    },
    warranty: true
  },

  // DESKTOPS
  {
    id: 101,
    name: "Dell Inspiron 3668 Desktop",
    price: 180,
    rating: 4.3,
    reviews: 34,
    image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&h=600&fit=crop&crop=center"
    ],
    category: "Desktops",
    brand: "Dell",
    inStock: true,
    stockCount: 12,
    description: "Compact desktop computer perfect for home or office use. Reliable performance for everyday computing tasks.",
    features: [
      "7th Gen Intel Core i3",
      "Compact tower design",
      "Fast SSD storage",
      "Multiple connectivity ports",
      "Energy efficient",
      "Quiet operation"
    ],
    specifications: {
      "Processor": "Intel Core i3 7th Gen",
      "RAM": "8GB DDR4",
      "Storage": "256GB SSD",
      "Graphics": "Intel HD Graphics",
      "Ports": "USB 3.0, HDMI, VGA",
      "Operating System": "Windows 11",
      "Form Factor": "Mini Tower"
    },
    warranty: true
  },
  {
    id: 102,
    name: "Dell Vostro 3888 Desktop",
    price: 250,
    rating: 4.5,
    reviews: 28,
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=600&h=600&fit=crop&crop=center"
    ],
    category: "Desktops",
    brand: "Dell",
    inStock: true,
    stockCount: 8,
    description: "Business desktop with modern 10th Gen processor. Designed for productivity and reliability in office environments.",
    features: [
      "10th Gen Intel Core i3",
      "Business-grade reliability",
      "Fast SSD storage",
      "Expandable design",
      "Professional support",
      "Energy Star certified"
    ],
    specifications: {
      "Processor": "Intel Core i3 10th Gen",
      "RAM": "8GB DDR4",
      "Storage": "256GB SSD",
      "Graphics": "Intel UHD Graphics",
      "Ports": "USB 3.1, HDMI, DisplayPort",
      "Operating System": "Windows 11 Pro",
      "Form Factor": "Mini Tower"
    },
    warranty: true
  },
  {
    id: 103,
    name: "CPU MSI-MS-7846",
    price: 160,
    rating: 4.2,
    reviews: 18,
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=600&h=600&fit=crop&crop=center"
    ],
    category: "Desktops",
    brand: "MSI",
    inStock: true,
    stockCount: 6,
    description: "MSI desktop CPU unit with 4th Gen Intel processor. Reliable performance for basic computing needs.",
    features: [
      "4th Gen Intel Core i3",
      "Compact design",
      "1TB HDD storage",
      "Integrated graphics",
      "Multiple ports",
      "Energy efficient"
    ],
    specifications: {
      "Processor": "Intel Core i3 4th Gen",
      "RAM": "4GB",
      "Storage": "1TB HDD",
      "Graphics": "1GB VRAM",
      "Ports": "USB, HDMI, VGA",
      "Operating System": "Windows 11",
      "Form Factor": "Desktop CPU"
    },
    warranty: true
  },
  {
    id: 104,
    name: "CPU Microsoft i3 7th Gen",
    price: 180,
    rating: 4.4,
    reviews: 25,
    image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&h=600&fit=crop&crop=center"
    ],
    category: "Desktops",
    brand: "Microsoft",
    inStock: true,
    stockCount: 8,
    description: "Microsoft desktop CPU with 7th Gen Intel processor. Enhanced performance with larger storage capacity.",
    features: [
      "7th Gen Intel Core i3 @3.90GHz",
      "12GB RAM",
      "2TB HDD storage",
      "Integrated graphics",
      "High-speed processor",
      "Expandable storage"
    ],
    specifications: {
      "Processor": "Intel Core i3 7th Gen @3.90GHz",
      "RAM": "12GB",
      "Storage": "2TB HDD",
      "Graphics": "1GB VRAM",
      "Ports": "USB 3.0, HDMI, VGA",
      "Operating System": "Windows 11",
      "Form Factor": "Desktop CPU"
    },
    warranty: true
  },

  // MONITORS & AIOS
  {
    id: 151,
    name: "Apple MacBook Pro 2017 (AIO)",
    price: 520,
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop&crop=center"
    ],
    category: "Monitors",
    brand: "Apple",
    inStock: true,
    stockCount: 4,
    description: "Premium MacBook Pro that can function as an all-in-one workstation. Perfect for creative professionals.",
    features: [
      "Intel Core i7 processor",
      "15-inch Retina display",
      "16GB RAM",
      "500GB SSD storage",
      "Premium aluminum build",
      "All-in-one functionality"
    ],
    specifications: {
      "Processor": "Intel Core i7",
      "RAM": "16GB",
      "Storage": "500GB SSD",
      "Display": "15-inch Retina",
      "Graphics": "Radeon Pro 555",
      "Operating System": "macOS",
      "Weight": "1.83kg"
    },
    warranty: true
  },
  {
    id: 152,
    name: "MSI GF63 Gaming AIO",
    price: 750,
    rating: 4.8,
    reviews: 94,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&h=600&fit=crop&crop=center"
    ],
    category: "Monitors",
    brand: "MSI",
    inStock: true,
    stockCount: 7,
    description: "High-performance MSI gaming system that doubles as an all-in-one solution. Perfect for gaming and productivity.",
    features: [
      "11th Gen Intel Core i7",
      "Dedicated 8GB GPU",
      "16GB RAM",
      "1TB SSD storage",
      "Gaming-optimized display",
      "All-in-one design"
    ],
    specifications: {
      "Processor": "Intel Core i7 11th Gen",
      "RAM": "16GB DDR4",
      "Storage": "1TB SSD",
      "Display": "15.6-inch FHD 144Hz",
      "Graphics": "NVIDIA GTX 1650 8GB",
      "Operating System": "Windows 11",
      "Weight": "2.1kg"
    },
    warranty: true
  },

  // SMARTPHONES
  {
    id: 201,
    name: "Samsung Galaxy A05",
    price: 100,
    rating: 4.2,
    reviews: 187,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&crop=center"
    ],
    category: "Smartphones",
    brand: "Samsung",
    inStock: true,
    stockCount: 25,
    description: "Affordable Samsung smartphone with reliable performance. Perfect for everyday communication and basic smartphone needs.",
    features: [
      "6GB RAM for smooth performance",
      "128GB internal storage",
      "Large display",
      "Dual camera system",
      "Long-lasting battery",
      "Samsung One UI"
    ],
    specifications: {
      "RAM": "6GB",
      "Storage": "128GB",
      "Display": "6.7-inch HD+",
      "Camera": "50MP + 2MP",
      "Battery": "5000mAh",
      "OS": "Android 13",
      "Network": "4G LTE"
    },
    warranty: true
  },
  {
    id: 202,
    name: "Samsung Galaxy A14",
    price: 100,
    rating: 4.3,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop&crop=center"
    ],
    category: "Smartphones",
    brand: "Samsung",
    inStock: true,
    stockCount: 18,
    description: "Feature-rich Samsung Galaxy A14 with enhanced camera and performance. Great value for money smartphone.",
    features: [
      "6GB RAM",
      "128GB storage",
      "Triple camera system",
      "Full HD+ display",
      "Fast charging",
      "Samsung Knox security"
    ],
    specifications: {
      "RAM": "6GB",
      "Storage": "128GB",
      "Display": "6.6-inch FHD+",
      "Camera": "50MP + 5MP + 2MP",
      "Battery": "5000mAh",
      "OS": "Android 13",
      "Network": "4G LTE"
    },
    warranty: true
  },
  {
    id: 203,
    name: "Samsung Galaxy A51",
    price: 120,
    rating: 4.5,
    reviews: 298,
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&crop=center"
    ],
    category: "Smartphones",
    brand: "Samsung",
    inStock: true,
    stockCount: 14,
    description: "Premium Samsung Galaxy A51 with quad camera system and Super AMOLED display. Excellent photography and display quality.",
    features: [
      "8GB RAM",
      "128GB storage",
      "Quad camera system",
      "Super AMOLED display",
      "In-display fingerprint",
      "Premium design"
    ],
    specifications: {
      "RAM": "8GB",
      "Storage": "128GB",
      "Display": "6.5-inch Super AMOLED",
      "Camera": "48MP + 12MP + 5MP + 5MP",
      "Battery": "4000mAh",
      "OS": "Android 11",
      "Network": "4G LTE"
    },
    warranty: true
  },
  {
    id: 204,
    name: "Xiaomi Redmi A3",
    price: 85,
    rating: 4.1,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&crop=center"
    ],
    category: "Smartphones",
    brand: "Xiaomi",
    inStock: true,
    stockCount: 22,
    description: "Budget-friendly Xiaomi Redmi with great value proposition. Reliable performance for everyday smartphone usage.",
    features: [
      "8GB RAM",
      "64GB storage",
      "Large display",
      "Dual camera",
      "MIUI interface",
      "Long battery life"
    ],
    specifications: {
      "RAM": "8GB",
      "Storage": "64GB",
      "Display": "6.71-inch HD+",
      "Camera": "8MP + 0.08MP",
      "Battery": "5000mAh",
      "OS": "Android 12 (MIUI)",
      "Network": "4G LTE"
    },
    warranty: true
  },
  {
    id: 206,
    name: "Samsung Galaxy A30",
    price: 85,
    rating: 4.1,
    reviews: 134,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop&crop=center"
    ],
    category: "Smartphones",
    brand: "Samsung",
    inStock: true,
    stockCount: 20,
    description: "Samsung Galaxy A30 with reliable performance and good battery life. Perfect for everyday smartphone needs.",
    features: [
      "4GB RAM",
      "64GB storage",
      "Dual camera system",
      "Large display",
      "Long battery life",
      "Samsung One UI"
    ],
    specifications: {
      "RAM": "4GB",
      "Storage": "64GB",
      "Display": "6.4-inch Super AMOLED",
      "Camera": "16MP + 5MP",
      "Battery": "4000mAh",
      "OS": "Android 11",
      "Network": "4G LTE"
    },
    warranty: true
  },
  {
    id: 207,
    name: "Samsung Galaxy A05s",
    price: 120,
    rating: 4.3,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&crop=center"
    ],
    category: "Smartphones",
    brand: "Samsung",
    inStock: true,
    stockCount: 15,
    description: "Samsung Galaxy A05s with enhanced features and performance. Great value smartphone with modern design.",
    features: [
      "6GB RAM",
      "128GB storage",
      "Triple camera system",
      "Large display",
      "Fast charging",
      "Enhanced performance"
    ],
    specifications: {
      "RAM": "6GB",
      "Storage": "128GB",
      "Display": "6.7-inch HD+",
      "Camera": "50MP + 2MP + 2MP",
      "Battery": "5000mAh",
      "OS": "Android 13",
      "Network": "4G LTE"
    },
    warranty: true
  },
  {
    id: 208,
    name: "Samsung Galaxy M14 5G",
    price: 110,
    rating: 4.4,
    reviews: 76,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop&crop=center"
    ],
    category: "Smartphones",
    brand: "Samsung",
    inStock: true,
    stockCount: 18,
    description: "Samsung Galaxy M14 5G with next-generation connectivity. Perfect for users who want 5G capability at an affordable price.",
    features: [
      "6GB RAM",
      "128GB storage",
      "5G connectivity",
      "Triple camera system",
      "Large battery",
      "Modern design"
    ],
    specifications: {
      "RAM": "6GB",
      "Storage": "128GB",
      "Display": "6.6-inch FHD+",
      "Camera": "50MP + 2MP + 2MP",
      "Battery": "6000mAh",
      "OS": "Android 13",
      "Network": "5G"
    },
    warranty: true
  },
  {
    id: 209,
    name: "Samsung Galaxy A31",
    price: 90,
    rating: 4.2,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&crop=center"
    ],
    category: "Smartphones",
    brand: "Samsung",
    inStock: true,
    stockCount: 16,
    description: "Samsung Galaxy A31 with quad camera system and Super AMOLED display. Great photography capabilities.",
    features: [
      "4GB RAM",
      "128GB storage",
      "Quad camera system",
      "Super AMOLED display",
      "In-display fingerprint",
      "Premium design"
    ],
    specifications: {
      "RAM": "4GB",
      "Storage": "128GB",
      "Display": "6.4-inch Super AMOLED",
      "Camera": "48MP + 8MP + 5MP + 5MP",
      "Battery": "5000mAh",
      "OS": "Android 11",
      "Network": "4G LTE"
    },
    warranty: true
  },
  {
    id: 210,
    name: "Samsung Galaxy A06",
    price: 115,
    rating: 4.1,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&crop=center"
    ],
    category: "Smartphones",
    brand: "Samsung",
    inStock: true,
    stockCount: 14,
    description: "Samsung Galaxy A06 with reliable performance and modern features. Perfect balance of price and functionality.",
    features: [
      "6GB RAM",
      "128GB storage",
      "Dual camera system",
      "Large display",
      "Long battery life",
      "Samsung One UI"
    ],
    specifications: {
      "RAM": "6GB",
      "Storage": "128GB",
      "Display": "6.7-inch HD+",
      "Camera": "50MP + 2MP",
      "Battery": "5000mAh",
      "OS": "Android 13",
      "Network": "4G LTE"
    },
    warranty: true
  },
  {
    id: 211,
    name: "Xiaomi Redmi 14C",
    price: 95,
    rating: 4.2,
    reviews: 64,
    image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=600&fit=crop&crop=center"
    ],
    category: "Smartphones",
    brand: "Xiaomi",
    inStock: true,
    stockCount: 19,
    description: "Xiaomi Redmi 14C with enhanced RAM and modern features. Great performance for the price point.",
    features: [
      "16GB RAM",
      "64GB storage",
      "Enhanced performance",
      "Dual camera system",
      "MIUI interface",
      "Long battery life"
    ],
    specifications: {
      "RAM": "16GB",
      "Storage": "64GB",
      "Display": "6.74-inch HD+",
      "Camera": "50MP + 0.08MP",
      "Battery": "5000mAh",
      "OS": "Android 14 (MIUI)",
      "Network": "4G LTE"
    },
    warranty: true
  },
  {
    id: 205,
    name: "Xiaomi Redmi 13",
    price: 110,
    rating: 4.4,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&h=600&fit=crop&crop=center"
    ],
    category: "Smartphones",
    brand: "Xiaomi",
    inStock: true,
    stockCount: 16,
    description: "Latest Xiaomi Redmi 13 with improved performance and camera capabilities. Great balance of features and affordability.",
    features: [
      "8GB RAM",
      "64GB storage",
      "Enhanced camera system",
      "Fast charging",
      "Modern design",
      "MIUI 14"
    ],
    specifications: {
      "RAM": "8GB",
      "Storage": "64GB",
      "Display": "6.79-inch FHD+",
      "Camera": "108MP + 2MP",
      "Battery": "5030mAh",
      "OS": "Android 13 (MIUI 14)",
      "Network": "4G LTE"
    },
    warranty: true
  },

  // PRINTERS
  {
    id: 301,
    name: "HP DeskJet 2320 All-in-One",
    price: 50,
    rating: 4.0,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=600&fit=crop&crop=center"
    ],
    category: "Printers",
    brand: "HP",
    inStock: true,
    stockCount: 20,
    description: "Compact all-in-one printer perfect for home and small office use. Print, scan, and copy with ease.",
    features: [
      "All-in-one functionality",
      "Compact design",
      "Easy setup",
      "Affordable printing",
      "USB connectivity",
      "Energy efficient"
    ],
    specifications: {
      "Print Speed": "7.5 ppm (black), 5.5 ppm (color)",
      "Print Resolution": "Up to 4800 x 1200 dpi",
      "Scan Resolution": "Up to 1200 x 1200 dpi",
      "Paper Size": "A4, Letter, Legal",
      "Connectivity": "USB 2.0",
      "Dimensions": "425 x 304 x 155 mm",
      "Weight": "3.42 kg"
    },
    warranty: true
  }
];

export const categories = [
  {
    id: "laptops",
    name: "💻 Laptops",
    description: "Professional laptops with warranty - HP, Dell, Lenovo, Toshiba & more",
    count: products.filter(p => p.category === "Laptops").length
  },
  {
    id: "desktops",
    name: "🖥️ Desktops / CPUs",
    description: "Desktop computers and CPU units with reliable performance",
    count: products.filter(p => p.category === "Desktops").length
  },
  {
    id: "monitors",
    name: "🖥️ Monitors & AIOs",
    description: "All-in-One computers and professional monitors",
    count: products.filter(p => p.category === "Monitors").length
  },
  {
    id: "printers",
    name: "🖨️ Printers",
    description: "All-in-One printers for home and office use",
    count: products.filter(p => p.category === "Printers").length
  },
  {
    id: "smartphones",
    name: "📱 Smartphones",
    description: "Samsung and Xiaomi smartphones with great specs",
    count: products.filter(p => p.category === "Smartphones").length
  }
];

export const getProductById = (id: string | number): Product | undefined => {
  return products.find(product => product.id === Number(id));
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === "all" || !category) return products;
  return products.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
};

export const searchProducts = (query: string): Product[] => {
  if (!query) return products;
  const searchTerm = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.brand.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm)
  );
};
