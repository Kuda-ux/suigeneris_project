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
  badge?: string;
  condition?: string;
}

// High-quality product images from Unsplash
const laptopImages = {
  hp: [
    "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop&q=80"
  ],
  dell: [
    "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&h=800&fit=crop&q=80"
  ],
  lenovo: [
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop&q=80"
  ],
  toshiba: [
    "https://images.unsplash.com/photo-1602080858428-57174f9431cf?w=800&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=800&fit=crop&q=80"
  ],
  microsoft: [
    "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=800&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=800&fit=crop&q=80"
  ]
};

const smartphoneImages = {
  samsung: [
    "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&h=800&fit=crop&q=80"
  ],
  xiaomi: [
    "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop&q=80"
  ]
};

export const products: Product[] = [
  // ==================== LAPTOPS - BUDGET ($100-$200) ====================
  {
    id: 9,
    name: "Microsoft Surface SE",
    price: 105,
    rating: 4.2,
    reviews: 18,
    image: laptopImages.microsoft[0],
    images: laptopImages.microsoft,
    category: "Laptops",
    brand: "Microsoft",
    inStock: true,
    stockCount: 5,
    description: "Compact and lightweight laptop perfect for students and basic computing. Features Intel Celeron processor with 11.6\" display.",
    features: [
      "Intel Celeron N4020 processor",
      "Compact 11.6\" display",
      "Lightweight design",
      "Perfect for students",
      "Windows 11 ready",
      "Long battery life"
    ],
    specifications: {
      "Processor": "Intel Celeron N4020",
      "RAM": "4GB",
      "Storage": "64GB eMMC",
      "Display": "11.6\"",
      "Graphics": "Intel UHD Graphics",
      "Operating System": "Windows 11"
    },
    warranty: true,
    condition: "Second-hand (Excellent)",
    badge: "Budget Pick"
  },
  {
    id: 10,
    name: "Lenovo x131e / x140e",
    price: 115,
    rating: 4.3,
    reviews: 24,
    image: laptopImages.lenovo[0],
    images: laptopImages.lenovo,
    category: "Laptops",
    brand: "Lenovo",
    inStock: true,
    stockCount: 4,
    description: "Durable ThinkPad-class laptop with upgraded RAM and SSD storage. Ideal for everyday productivity.",
    features: [
      "ThinkPad durability",
      "Upgraded 8GB RAM",
      "Fast 500GB SSD",
      "11.6\" display",
      "Business-grade build",
      "Reliable performance"
    ],
    specifications: {
      "Processor": "Intel Celeron 1007U",
      "RAM": "8GB",
      "Storage": "500GB SSD",
      "Display": "11.6\"",
      "Graphics": "Intel HD Graphics",
      "Operating System": "Windows 10"
    },
    warranty: true,
    condition: "Second-hand (Excellent)"
  },
  {
    id: 11,
    name: "Dell Latitude 3150",
    price: 120,
    rating: 4.4,
    reviews: 31,
    image: laptopImages.dell[0],
    images: laptopImages.dell,
    category: "Laptops",
    brand: "Dell",
    inStock: true,
    stockCount: 3,
    description: "Reliable Dell business laptop with SSD storage for fast boot times and responsive performance.",
    features: [
      "Intel Pentium processor",
      "Fast 128GB SSD",
      "8GB RAM",
      "11.6\" display",
      "Dell reliability",
      "Business-grade"
    ],
    specifications: {
      "Processor": "Intel Pentium N3540",
      "RAM": "8GB",
      "Storage": "128GB SSD",
      "Display": "11.6\"",
      "Graphics": "Intel HD Graphics",
      "Operating System": "Windows 10"
    },
    warranty: true,
    condition: "Second-hand (Excellent)"
  },
  {
    id: 12,
    name: "Lenovo ThinkPad Yoga 11e",
    price: 120,
    rating: 4.5,
    reviews: 42,
    image: laptopImages.lenovo[0],
    images: laptopImages.lenovo,
    category: "Laptops",
    brand: "Lenovo",
    inStock: true,
    stockCount: 4,
    description: "Versatile 2-in-1 ThinkPad with touchscreen. Perfect for flexible work and study environments.",
    features: [
      "2-in-1 convertible design",
      "Touchscreen display",
      "ThinkPad durability",
      "Flexible usage modes",
      "Compact and portable",
      "Student-friendly"
    ],
    specifications: {
      "Processor": "Intel Celeron",
      "RAM": "4GB",
      "Storage": "128GB SSD",
      "Display": "11.6\" Touch",
      "Graphics": "Intel HD Graphics",
      "Operating System": "Windows 10"
    },
    warranty: true,
    condition: "Second-hand (Excellent)"
  },
  {
    id: 13,
    name: "Dell Latitude 3189 / 3190",
    price: 125,
    rating: 4.3,
    reviews: 28,
    image: laptopImages.dell[0],
    images: laptopImages.dell,
    category: "Laptops",
    brand: "Dell",
    inStock: true,
    stockCount: 4,
    description: "Compact Dell laptop with modern Celeron processor. Great for light office work and web browsing.",
    features: [
      "Intel Celeron N4120",
      "Compact design",
      "128GB SSD storage",
      "11.6\" display",
      "Modern processor",
      "Everyday computing"
    ],
    specifications: {
      "Processor": "Intel Celeron N4120",
      "RAM": "4GB",
      "Storage": "128GB SSD",
      "Display": "11.6\"",
      "Graphics": "Intel UHD Graphics",
      "Operating System": "Windows 10"
    },
    warranty: true,
    condition: "Second-hand (Excellent)"
  },
  {
    id: 14,
    name: "Dell Latitude 3340 (i3)",
    price: 140,
    rating: 4.4,
    reviews: 35,
    image: laptopImages.dell[0],
    images: laptopImages.dell,
    category: "Laptops",
    brand: "Dell",
    inStock: true,
    stockCount: 5,
    description: "Business-class Dell with Intel Core i3 processor. Reliable performance for office tasks.",
    features: [
      "Intel Core i3 processor",
      "Business-grade build",
      "13.3\" display",
      "Fast SSD storage",
      "Professional design",
      "Reliable performance"
    ],
    specifications: {
      "Processor": "Intel Core i3 4th Gen",
      "RAM": "8GB",
      "Storage": "128GB SSD",
      "Display": "13.3\"",
      "Graphics": "Intel HD Graphics",
      "Operating System": "Windows 10"
    },
    warranty: true,
    condition: "Second-hand (Excellent)"
  },
  {
    id: 15,
    name: "Dell Latitude 3340 (i5)",
    price: 150,
    rating: 4.5,
    reviews: 41,
    image: laptopImages.dell[0],
    images: laptopImages.dell,
    category: "Laptops",
    brand: "Dell",
    inStock: true,
    stockCount: 4,
    description: "Enhanced Dell Latitude with Intel Core i5. Better performance for demanding tasks.",
    features: [
      "Intel Core i5 processor",
      "Enhanced performance",
      "13.3\" display",
      "Fast SSD storage",
      "Business-grade",
      "Multitasking capable"
    ],
    specifications: {
      "Processor": "Intel Core i5 4th Gen",
      "RAM": "8GB",
      "Storage": "128GB SSD",
      "Display": "13.3\"",
      "Graphics": "Intel HD Graphics",
      "Operating System": "Windows 10"
    },
    warranty: true,
    condition: "Second-hand (Excellent)"
  },
  {
    id: 16,
    name: "Dell Latitude E7250",
    price: 160,
    rating: 4.6,
    reviews: 52,
    image: laptopImages.dell[0],
    images: laptopImages.dell,
    category: "Laptops",
    brand: "Dell",
    inStock: true,
    stockCount: 3,
    description: "Premium ultrabook with 5th Gen Intel Core i5. Lightweight and powerful for professionals.",
    features: [
      "Intel Core i5 5th Gen",
      "Ultrabook design",
      "12.5\" display",
      "Lightweight build",
      "Premium quality",
      "Professional grade"
    ],
    specifications: {
      "Processor": "Intel Core i5 5th Gen",
      "RAM": "8GB",
      "Storage": "256GB SSD",
      "Display": "12.5\"",
      "Graphics": "Intel HD Graphics",
      "Operating System": "Windows 10"
    },
    warranty: true,
    condition: "Second-hand (Excellent)"
  },

  // ==================== LAPTOPS - MID-RANGE ($200-$350) ====================
  {
    id: 17,
    name: "Lenovo ThinkPad X270",
    price: 220,
    rating: 4.7,
    reviews: 68,
    image: laptopImages.lenovo[0],
    images: laptopImages.lenovo,
    category: "Laptops",
    brand: "Lenovo",
    inStock: true,
    stockCount: 5,
    description: "Compact business powerhouse with 7th Gen Intel Core i5. Perfect for mobile professionals.",
    features: [
      "Intel Core i5 7th Gen",
      "Compact 12.5\" display",
      "ThinkPad reliability",
      "Business-grade security",
      "Excellent keyboard",
      "All-day battery"
    ],
    specifications: {
      "Processor": "Intel Core i5 7th Gen",
      "RAM": "8GB",
      "Storage": "256GB SSD",
      "Display": "12.5\"",
      "Graphics": "Intel HD Graphics 620",
      "Operating System": "Windows 10 Pro"
    },
    warranty: true,
    condition: "Second-hand (Excellent)",
    badge: "Popular"
  },
  {
    id: 18,
    name: "Lenovo V15",
    price: 250,
    rating: 4.4,
    reviews: 45,
    image: laptopImages.lenovo[0],
    images: laptopImages.lenovo,
    category: "Laptops",
    brand: "Lenovo",
    inStock: true,
    stockCount: 6,
    description: "Modern 15.6\" laptop with 10th Gen Intel processor. Great for everyday productivity.",
    features: [
      "Intel Core i5 10th Gen",
      "Large 15.6\" display",
      "Modern design",
      "512GB SSD storage",
      "Full-size keyboard",
      "Everyday computing"
    ],
    specifications: {
      "Processor": "Intel Core i5 10th Gen",
      "RAM": "8GB",
      "Storage": "512GB SSD",
      "Display": "15.6\"",
      "Graphics": "Intel UHD Graphics",
      "Operating System": "Windows 11"
    },
    warranty: true,
    condition: "Brand New"
  },
  {
    id: 19,
    name: "Dell Latitude 7200",
    price: 260,
    rating: 4.6,
    reviews: 38,
    image: laptopImages.dell[0],
    images: laptopImages.dell,
    category: "Laptops",
    brand: "Dell",
    inStock: true,
    stockCount: 4,
    description: "Premium 2-in-1 detachable with 8th Gen Intel Core i5. Versatile tablet and laptop in one.",
    features: [
      "2-in-1 detachable design",
      "Intel Core i5 8th Gen",
      "12.3\" touchscreen",
      "Tablet mode",
      "Premium build",
      "Business features"
    ],
    specifications: {
      "Processor": "Intel Core i5 8th Gen",
      "RAM": "8GB",
      "Storage": "256GB SSD",
      "Display": "12.3\" Touch",
      "Graphics": "Intel UHD Graphics 620",
      "Operating System": "Windows 10 Pro"
    },
    warranty: true,
    condition: "Second-hand (Excellent)"
  },
  {
    id: 20,
    name: "Lenovo ThinkPad X280",
    price: 260,
    rating: 4.7,
    reviews: 55,
    image: laptopImages.lenovo[0],
    images: laptopImages.lenovo,
    category: "Laptops",
    brand: "Lenovo",
    inStock: true,
    stockCount: 5,
    description: "Ultra-portable ThinkPad with 8th Gen Intel Core i5. Premium business ultrabook.",
    features: [
      "Intel Core i5 8th Gen",
      "Ultra-portable design",
      "12.5\" display",
      "ThinkPad quality",
      "Fingerprint reader",
      "Business security"
    ],
    specifications: {
      "Processor": "Intel Core i5 8th Gen",
      "RAM": "8GB",
      "Storage": "256GB SSD",
      "Display": "12.5\"",
      "Graphics": "Intel UHD Graphics 620",
      "Operating System": "Windows 10 Pro"
    },
    warranty: true,
    condition: "Second-hand (Excellent)"
  },
  {
    id: 21,
    name: "Dell Latitude 5400",
    price: 265,
    rating: 4.5,
    reviews: 62,
    image: laptopImages.dell[0],
    images: laptopImages.dell,
    category: "Laptops",
    brand: "Dell",
    inStock: true,
    stockCount: 6,
    description: "Mainstream business laptop with 8th Gen Intel Core i5. Reliable performance for professionals.",
    features: [
      "Intel Core i5 8th Gen",
      "14\" display",
      "Business-grade build",
      "Fast SSD storage",
      "Dell reliability",
      "Professional design"
    ],
    specifications: {
      "Processor": "Intel Core i5 8th Gen",
      "RAM": "8GB",
      "Storage": "256GB SSD",
      "Display": "14\"",
      "Graphics": "Intel UHD Graphics 620",
      "Operating System": "Windows 10 Pro"
    },
    warranty: true,
    condition: "Second-hand (Excellent)"
  },
  {
    id: 22,
    name: "Toshiba Dynabook Tecra A50-EC (i5)",
    price: 265,
    rating: 4.4,
    reviews: 29,
    image: laptopImages.toshiba[0],
    images: laptopImages.toshiba,
    category: "Laptops",
    brand: "Toshiba",
    inStock: true,
    stockCount: 4,
    description: "Japanese engineering excellence with 8th Gen Intel Core i5. Premium business laptop.",
    features: [
      "Intel Core i5 8th Gen",
      "Japanese quality",
      "15.6\" display",
      "Business features",
      "Durable build",
      "Professional grade"
    ],
    specifications: {
      "Processor": "Intel Core i5 8th Gen",
      "RAM": "8GB",
      "Storage": "256GB SSD",
      "Display": "15.6\"",
      "Graphics": "Intel UHD Graphics 620",
      "Operating System": "Windows 10 Pro"
    },
    warranty: true,
    condition: "Second-hand (Excellent)"
  },
  {
    id: 23,
    name: "Lenovo IdeaPad 3",
    price: 270,
    rating: 4.5,
    reviews: 78,
    image: laptopImages.lenovo[0],
    images: laptopImages.lenovo,
    category: "Laptops",
    brand: "Lenovo",
    inStock: true,
    stockCount: 8,
    description: "Popular consumer laptop with modern design. Great for home and student use.",
    features: [
      "Intel Core i5 10th Gen",
      "Modern slim design",
      "15.6\" FHD display",
      "512GB SSD",
      "Dolby Audio",
      "Privacy shutter"
    ],
    specifications: {
      "Processor": "Intel Core i5 10th Gen",
      "RAM": "8GB",
      "Storage": "512GB SSD",
      "Display": "15.6\" FHD",
      "Graphics": "Intel UHD Graphics",
      "Operating System": "Windows 11"
    },
    warranty: true,
    condition: "Brand New",
    badge: "Best Seller"
  },
  {
    id: 24,
    name: "Lenovo ThinkPad L490",
    price: 280,
    rating: 4.6,
    reviews: 44,
    image: laptopImages.lenovo[0],
    images: laptopImages.lenovo,
    category: "Laptops",
    brand: "Lenovo",
    inStock: true,
    stockCount: 5,
    description: "Business-class ThinkPad with 8th Gen Intel Core i5. Reliable workhorse for professionals.",
    features: [
      "Intel Core i5 8th Gen",
      "14\" display",
      "ThinkPad reliability",
      "Business security",
      "Spill-resistant keyboard",
      "MIL-SPEC tested"
    ],
    specifications: {
      "Processor": "Intel Core i5 8th Gen",
      "RAM": "8GB",
      "Storage": "256GB SSD",
      "Display": "14\"",
      "Graphics": "Intel UHD Graphics 620",
      "Operating System": "Windows 10 Pro"
    },
    warranty: true,
    condition: "Second-hand (Excellent)"
  },
  {
    id: 25,
    name: "Toshiba Dynabook Tecra A50-EC (i7)",
    price: 290,
    rating: 4.5,
    reviews: 26,
    image: laptopImages.toshiba[0],
    images: laptopImages.toshiba,
    category: "Laptops",
    brand: "Toshiba",
    inStock: true,
    stockCount: 3,
    description: "High-performance Dynabook with Intel Core i7. Premium Japanese engineering.",
    features: [
      "Intel Core i7 8th Gen",
      "High performance",
      "15.6\" display",
      "Japanese quality",
      "Business features",
      "Premium build"
    ],
    specifications: {
      "Processor": "Intel Core i7 8th Gen",
      "RAM": "8GB",
      "Storage": "256GB SSD",
      "Display": "15.6\"",
      "Graphics": "Intel UHD Graphics 620",
      "Operating System": "Windows 10 Pro"
    },
    warranty: true,
    condition: "Second-hand (Excellent)"
  },
  {
    id: 26,
    name: "Lenovo ThinkPad T480",
    price: 300,
    rating: 4.8,
    reviews: 92,
    image: laptopImages.lenovo[0],
    images: laptopImages.lenovo,
    category: "Laptops",
    brand: "Lenovo",
    inStock: true,
    stockCount: 7,
    description: "Legendary ThinkPad T-series with 8th Gen Intel Core i5. The ultimate business laptop.",
    features: [
      "Intel Core i5 8th Gen",
      "Legendary T-series quality",
      "14\" display",
      "Hot-swappable battery",
      "Best-in-class keyboard",
      "Enterprise security"
    ],
    specifications: {
      "Processor": "Intel Core i5 8th Gen",
      "RAM": "8GB",
      "Storage": "256GB SSD",
      "Display": "14\"",
      "Graphics": "Intel UHD Graphics 620",
      "Operating System": "Windows 10 Pro"
    },
    warranty: true,
    condition: "Second-hand (Excellent)",
    badge: "Top Rated"
  },
  {
    id: 27,
    name: "Toshiba Satellite Pro",
    price: 310,
    rating: 4.4,
    reviews: 33,
    image: laptopImages.toshiba[0],
    images: laptopImages.toshiba,
    category: "Laptops",
    brand: "Toshiba",
    inStock: true,
    stockCount: 4,
    description: "Professional-grade Satellite Pro with 8th Gen Intel. Reliable business performance.",
    features: [
      "Intel Core i5 8th Gen",
      "Professional design",
      "15.6\" display",
      "Business features",
      "Reliable performance",
      "Japanese engineering"
    ],
    specifications: {
      "Processor": "Intel Core i5 8th Gen",
      "RAM": "8GB",
      "Storage": "256GB SSD",
      "Display": "15.6\"",
      "Graphics": "Intel UHD Graphics 620",
      "Operating System": "Windows 10 Pro"
    },
    warranty: true,
    condition: "Second-hand (Excellent)"
  },
  {
    id: 28,
    name: "Dell Latitude 5410",
    price: 320,
    rating: 4.6,
    reviews: 58,
    image: laptopImages.dell[0],
    images: laptopImages.dell,
    category: "Laptops",
    brand: "Dell",
    inStock: true,
    stockCount: 5,
    description: "Modern Dell Latitude with 10th Gen Intel Core i5. Latest business features and security.",
    features: [
      "Intel Core i5 10th Gen",
      "14\" display",
      "Modern design",
      "Enhanced security",
      "Dell reliability",
      "Business-grade"
    ],
    specifications: {
      "Processor": "Intel Core i5 10th Gen",
      "RAM": "8GB",
      "Storage": "256GB SSD",
      "Display": "14\"",
      "Graphics": "Intel UHD Graphics",
      "Operating System": "Windows 10 Pro"
    },
    warranty: true,
    condition: "Second-hand (Excellent)"
  },
  {
    id: 29,
    name: "Lenovo ThinkPad T490",
    price: 330,
    rating: 4.8,
    reviews: 76,
    image: laptopImages.lenovo[0],
    images: laptopImages.lenovo,
    category: "Laptops",
    brand: "Lenovo",
    inStock: true,
    stockCount: 6,
    description: "Premium ThinkPad T-series with 8th Gen Intel Core i5. Slim, powerful, and professional.",
    features: [
      "Intel Core i5 8th Gen",
      "Slim T-series design",
      "14\" display",
      "Premium build quality",
      "ThinkPad keyboard",
      "Enterprise features"
    ],
    specifications: {
      "Processor": "Intel Core i5 8th Gen",
      "RAM": "8GB",
      "Storage": "256GB SSD",
      "Display": "14\"",
      "Graphics": "Intel UHD Graphics 620",
      "Operating System": "Windows 10 Pro"
    },
    warranty: true,
    condition: "Second-hand (Excellent)"
  },

  // ==================== LAPTOPS - PREMIUM ($350-$500) ====================
  {
    id: 30,
    name: "HP EliteBook x360 1030 G3",
    price: 360,
    rating: 4.7,
    reviews: 64,
    image: laptopImages.hp[0],
    images: laptopImages.hp,
    category: "Laptops",
    brand: "HP",
    inStock: true,
    stockCount: 5,
    description: "Premium 2-in-1 convertible with 8th Gen Intel Core i5. 360-degree hinge for ultimate flexibility.",
    features: [
      "360-degree convertible",
      "Intel Core i5 8th Gen",
      "13.3\" touchscreen",
      "Premium aluminum build",
      "Pen support",
      "Business security"
    ],
    specifications: {
      "Processor": "Intel Core i5 8th Gen",
      "RAM": "8GB",
      "Storage": "256GB SSD",
      "Display": "13.3\" Touch",
      "Graphics": "Intel UHD Graphics 620",
      "Operating System": "Windows 10 Pro"
    },
    warranty: true,
    condition: "Second-hand (Excellent)"
  },
  {
    id: 31,
    name: "Lenovo ThinkPad E14 Gen 2",
    price: 360,
    rating: 4.6,
    reviews: 52,
    image: laptopImages.lenovo[0],
    images: laptopImages.lenovo,
    category: "Laptops",
    brand: "Lenovo",
    inStock: true,
    stockCount: 6,
    description: "Modern ThinkPad E-series with 11th Gen Intel. Affordable business performance.",
    features: [
      "Intel Core i5 11th Gen",
      "14\" FHD display",
      "ThinkPad quality",
      "Modern design",
      "Fast SSD",
      "Business features"
    ],
    specifications: {
      "Processor": "Intel Core i5 11th Gen",
      "RAM": "8GB",
      "Storage": "256GB SSD",
      "Display": "14\" FHD",
      "Graphics": "Intel Iris Xe",
      "Operating System": "Windows 11"
    },
    warranty: true,
    condition: "Brand New"
  },
  {
    id: 32,
    name: "Dell Latitude 7320",
    price: 370,
    rating: 4.7,
    reviews: 41,
    image: laptopImages.dell[0],
    images: laptopImages.dell,
    category: "Laptops",
    brand: "Dell",
    inStock: true,
    stockCount: 4,
    description: "Premium Dell ultrabook with 11th Gen Intel Core i5. Thin, light, and powerful.",
    features: [
      "Intel Core i5 11th Gen",
      "13.3\" display",
      "Ultra-thin design",
      "Premium build",
      "Thunderbolt 4",
      "All-day battery"
    ],
    specifications: {
      "Processor": "Intel Core i5 11th Gen",
      "RAM": "8GB",
      "Storage": "256GB SSD",
      "Display": "13.3\"",
      "Graphics": "Intel Iris Xe",
      "Operating System": "Windows 11 Pro"
    },
    warranty: true,
    condition: "Second-hand (Excellent)"
  },
  {
    id: 33,
    name: "Lenovo ThinkPad E15 Gen 2",
    price: 370,
    rating: 4.5,
    reviews: 48,
    image: laptopImages.lenovo[0],
    images: laptopImages.lenovo,
    category: "Laptops",
    brand: "Lenovo",
    inStock: true,
    stockCount: 5,
    description: "Large-screen ThinkPad with 11th Gen Intel. Great for productivity with 15.6\" display.",
    features: [
      "Intel Core i5 11th Gen",
      "15.6\" FHD display",
      "Full-size keyboard",
      "ThinkPad quality",
      "Numeric keypad",
      "Business features"
    ],
    specifications: {
      "Processor": "Intel Core i5 11th Gen",
      "RAM": "8GB",
      "Storage": "256GB SSD",
      "Display": "15.6\" FHD",
      "Graphics": "Intel Iris Xe",
      "Operating System": "Windows 11"
    },
    warranty: true,
    condition: "Brand New"
  },
  {
    id: 34,
    name: "Dell Latitude 5420",
    price: 380,
    rating: 4.6,
    reviews: 55,
    image: laptopImages.dell[0],
    images: laptopImages.dell,
    category: "Laptops",
    brand: "Dell",
    inStock: true,
    stockCount: 6,
    description: "Modern business laptop with 11th Gen Intel Core i5. Latest Dell enterprise features.",
    features: [
      "Intel Core i5 11th Gen",
      "14\" display",
      "Modern design",
      "Enterprise security",
      "Dell reliability",
      "Thunderbolt 4"
    ],
    specifications: {
      "Processor": "Intel Core i5 11th Gen",
      "RAM": "8GB",
      "Storage": "256GB SSD",
      "Display": "14\"",
      "Graphics": "Intel Iris Xe",
      "Operating System": "Windows 11 Pro"
    },
    warranty: true,
    condition: "Second-hand (Excellent)"
  },
  {
    id: 35,
    name: "Lenovo IdeaPad 5",
    price: 390,
    rating: 4.6,
    reviews: 67,
    image: laptopImages.lenovo[0],
    images: laptopImages.lenovo,
    category: "Laptops",
    brand: "Lenovo",
    inStock: true,
    stockCount: 7,
    description: "Premium consumer laptop with 11th Gen Intel. Sleek design with great performance.",
    features: [
      "Intel Core i5 11th Gen",
      "14\" FHD display",
      "Slim aluminum design",
      "512GB SSD",
      "Dolby Audio",
      "Rapid Charge"
    ],
    specifications: {
      "Processor": "Intel Core i5 11th Gen",
      "RAM": "8GB",
      "Storage": "512GB SSD",
      "Display": "14\" FHD",
      "Graphics": "Intel Iris Xe",
      "Operating System": "Windows 11"
    },
    warranty: true,
    condition: "Brand New"
  },
  {
    id: 36,
    name: "Toshiba Portege X30",
    price: 400,
    rating: 4.5,
    reviews: 32,
    image: laptopImages.toshiba[0],
    images: laptopImages.toshiba,
    category: "Laptops",
    brand: "Toshiba",
    inStock: true,
    stockCount: 3,
    description: "Ultra-lightweight business laptop. Premium Japanese engineering at just 1kg.",
    features: [
      "Intel Core i5 8th Gen",
      "Ultra-lightweight 1kg",
      "13.3\" display",
      "Premium magnesium",
      "All-day battery",
      "Japanese quality"
    ],
    specifications: {
      "Processor": "Intel Core i5 8th Gen",
      "RAM": "8GB",
      "Storage": "256GB SSD",
      "Display": "13.3\"",
      "Graphics": "Intel UHD Graphics 620",
      "Operating System": "Windows 10 Pro"
    },
    warranty: true,
    condition: "Second-hand (Excellent)"
  },
  {
    id: 37,
    name: "Lenovo IdeaPad Flex 5",
    price: 420,
    rating: 4.6,
    reviews: 58,
    image: laptopImages.lenovo[0],
    images: laptopImages.lenovo,
    category: "Laptops",
    brand: "Lenovo",
    inStock: true,
    stockCount: 5,
    description: "Versatile 2-in-1 with 11th Gen Intel. 360-degree hinge for tablet and tent modes.",
    features: [
      "360-degree convertible",
      "Intel Core i5 11th Gen",
      "14\" FHD touchscreen",
      "Pen support",
      "512GB SSD",
      "Multiple modes"
    ],
    specifications: {
      "Processor": "Intel Core i5 11th Gen",
      "RAM": "8GB",
      "Storage": "512GB SSD",
      "Display": "14\" FHD Touch",
      "Graphics": "Intel Iris Xe",
      "Operating System": "Windows 11"
    },
    warranty: true,
    condition: "Brand New"
  },
  {
    id: 38,
    name: "HP ProBook 430 G8",
    price: 430,
    rating: 4.6,
    reviews: 49,
    image: laptopImages.hp[0],
    images: laptopImages.hp,
    category: "Laptops",
    brand: "HP",
    inStock: true,
    stockCount: 6,
    description: "Compact business laptop with 11th Gen Intel Core i5. Professional features in a portable design.",
    features: [
      "Intel Core i5 11th Gen",
      "13.3\" display",
      "Compact design",
      "Business security",
      "HP reliability",
      "All-day battery"
    ],
    specifications: {
      "Processor": "Intel Core i5 11th Gen",
      "RAM": "8GB",
      "Storage": "256GB SSD",
      "Display": "13.3\"",
      "Graphics": "Intel Iris Xe",
      "Operating System": "Windows 11 Pro"
    },
    warranty: true,
    condition: "Second-hand (Excellent)"
  },
  {
    id: 39,
    name: "HP ProBook 450 G8 (i5)",
    price: 450,
    rating: 4.5,
    reviews: 56,
    image: laptopImages.hp[0],
    images: laptopImages.hp,
    category: "Laptops",
    brand: "HP",
    inStock: true,
    stockCount: 8,
    description: "Full-size business laptop with 11th Gen Intel Core i5. Great for office productivity.",
    features: [
      "Intel Core i5 11th Gen",
      "15.6\" display",
      "Full-size keyboard",
      "Business features",
      "HP reliability",
      "Numeric keypad"
    ],
    specifications: {
      "Processor": "Intel Core i5 11th Gen",
      "RAM": "8GB",
      "Storage": "256GB SSD",
      "Display": "15.6\"",
      "Graphics": "Intel Iris Xe",
      "Operating System": "Windows 11 Pro"
    },
    warranty: true,
    condition: "Second-hand (Excellent)"
  },

  // ==================== LAPTOPS - HIGH-END ($500+) ====================
  {
    id: 40,
    name: "HP 15 (i5)",
    price: 600,
    rating: 4.6,
    reviews: 72,
    image: laptopImages.hp[0],
    images: laptopImages.hp,
    category: "Laptops",
    brand: "HP",
    inStock: true,
    stockCount: 10,
    description: "Latest HP 15 with 13th Gen Intel Core i5. Modern design with powerful performance.",
    features: [
      "Intel Core i5 13th Gen",
      "15.6\" display",
      "Latest generation",
      "512GB SSD",
      "Modern design",
      "Full warranty"
    ],
    specifications: {
      "Processor": "Intel Core i5 13th Gen",
      "RAM": "8GB",
      "Storage": "512GB SSD",
      "Display": "15.6\"",
      "Graphics": "Intel Iris Xe",
      "Operating System": "Windows 11"
    },
    warranty: true,
    condition: "Brand New",
    badge: "Latest Gen"
  },
  {
    id: 41,
    name: "HP 15 (i7)",
    price: 620,
    rating: 4.7,
    reviews: 65,
    image: laptopImages.hp[0],
    images: laptopImages.hp,
    category: "Laptops",
    brand: "HP",
    inStock: true,
    stockCount: 8,
    description: "High-performance HP 15 with 13th Gen Intel Core i7. Maximum power for demanding tasks.",
    features: [
      "Intel Core i7 13th Gen",
      "15.6\" display",
      "High performance",
      "512GB SSD",
      "Latest generation",
      "Full warranty"
    ],
    specifications: {
      "Processor": "Intel Core i7 13th Gen",
      "RAM": "8GB",
      "Storage": "512GB SSD",
      "Display": "15.6\"",
      "Graphics": "Intel Iris Xe",
      "Operating System": "Windows 11"
    },
    warranty: true,
    condition: "Brand New"
  },
  {
    id: 42,
    name: "HP 250 G10 (i5)",
    price: 620,
    rating: 4.6,
    reviews: 58,
    image: laptopImages.hp[0],
    images: laptopImages.hp,
    category: "Laptops",
    brand: "HP",
    inStock: true,
    stockCount: 10,
    description: "Business-class HP 250 G10 with 13th Gen Intel Core i5. Reliable and powerful.",
    features: [
      "Intel Core i5 13th Gen",
      "15.6\" display",
      "Business-grade",
      "512GB SSD",
      "HP reliability",
      "Full warranty"
    ],
    specifications: {
      "Processor": "Intel Core i5 13th Gen",
      "RAM": "8GB",
      "Storage": "512GB SSD",
      "Display": "15.6\"",
      "Graphics": "Intel Iris Xe",
      "Operating System": "Windows 11"
    },
    warranty: true,
    condition: "Brand New"
  },
  {
    id: 43,
    name: "HP ProBook 450 G8 (i7)",
    price: 650,
    rating: 4.7,
    reviews: 44,
    image: laptopImages.hp[0],
    images: laptopImages.hp,
    category: "Laptops",
    brand: "HP",
    inStock: true,
    stockCount: 6,
    description: "Premium ProBook with 11th Gen Intel Core i7. Top-tier business performance.",
    features: [
      "Intel Core i7 11th Gen",
      "15.6\" display",
      "Premium performance",
      "512GB SSD",
      "Business security",
      "Full warranty"
    ],
    specifications: {
      "Processor": "Intel Core i7 11th Gen",
      "RAM": "16GB",
      "Storage": "512GB SSD",
      "Display": "15.6\"",
      "Graphics": "Intel Iris Xe",
      "Operating System": "Windows 11 Pro"
    },
    warranty: true,
    condition: "Second-hand (Excellent)"
  },
  {
    id: 44,
    name: "HP 250 G10 (i7)",
    price: 800,
    rating: 4.8,
    reviews: 38,
    image: laptopImages.hp[0],
    images: laptopImages.hp,
    category: "Laptops",
    brand: "HP",
    inStock: true,
    stockCount: 5,
    description: "Top-of-the-line HP 250 G10 with 13th Gen Intel Core i7. Maximum performance.",
    features: [
      "Intel Core i7 13th Gen",
      "15.6\" display",
      "Top performance",
      "512GB SSD",
      "Latest generation",
      "Full warranty"
    ],
    specifications: {
      "Processor": "Intel Core i7 13th Gen",
      "RAM": "16GB",
      "Storage": "512GB SSD",
      "Display": "15.6\"",
      "Graphics": "Intel Iris Xe",
      "Operating System": "Windows 11"
    },
    warranty: true,
    condition: "Brand New",
    badge: "Premium"
  },
  {
    id: 45,
    name: "Dell Latitude 5430 Rugged",
    price: 1200,
    rating: 4.9,
    reviews: 28,
    image: laptopImages.dell[0],
    images: laptopImages.dell,
    category: "Laptops",
    brand: "Dell",
    inStock: true,
    stockCount: 3,
    description: "Military-grade rugged laptop with 12th Gen Intel Core i5. Built for extreme conditions.",
    features: [
      "Intel Core i5 12th Gen",
      "Military-grade durability",
      "Water & dust resistant",
      "14\" rugged display",
      "Drop tested",
      "Extreme conditions"
    ],
    specifications: {
      "Processor": "Intel Core i5 12th Gen",
      "RAM": "16GB",
      "Storage": "512GB SSD",
      "Display": "14\" Rugged",
      "Graphics": "Intel Iris Xe",
      "Operating System": "Windows 11 Pro"
    },
    warranty: true,
    condition: "Brand New",
    badge: "Rugged"
  },

  // ==================== SMARTPHONES ====================
  {
    id: 46,
    name: "Xiaomi Redmi A3",
    price: 85,
    rating: 4.2,
    reviews: 156,
    image: smartphoneImages.xiaomi[0],
    images: smartphoneImages.xiaomi,
    category: "Smartphones",
    brand: "Xiaomi",
    inStock: true,
    stockCount: 5,
    description: "Budget-friendly smartphone with 8GB RAM. Great value for everyday use.",
    features: [
      "8GB RAM",
      "128GB storage",
      "6.7\" display",
      "MediaTek processor",
      "Long battery life",
      "Dual SIM"
    ],
    specifications: {
      "Processor": "MediaTek Helio",
      "RAM": "8GB",
      "Storage": "128GB",
      "Display": "6.7\"",
      "Camera": "13MP",
      "Battery": "5000mAh"
    },
    warranty: true,
    condition: "Brand New",
    badge: "Budget Pick"
  },
  {
    id: 47,
    name: "Samsung Galaxy A30",
    price: 85,
    rating: 4.3,
    reviews: 189,
    image: smartphoneImages.samsung[0],
    images: smartphoneImages.samsung,
    category: "Smartphones",
    brand: "Samsung",
    inStock: true,
    stockCount: 3,
    description: "Samsung smartphone with AMOLED display. Reliable Samsung quality.",
    features: [
      "Super AMOLED display",
      "4GB RAM",
      "64GB storage",
      "Dual camera",
      "Samsung quality",
      "Fast charging"
    ],
    specifications: {
      "Processor": "Exynos 7904",
      "RAM": "4GB",
      "Storage": "64GB",
      "Display": "6.4\" AMOLED",
      "Camera": "16MP + 5MP",
      "Battery": "4000mAh"
    },
    warranty: true,
    condition: "Second-hand (Excellent)"
  },
  {
    id: 48,
    name: "Xiaomi Redmi 14C",
    price: 95,
    rating: 4.4,
    reviews: 134,
    image: smartphoneImages.xiaomi[0],
    images: smartphoneImages.xiaomi,
    category: "Smartphones",
    brand: "Xiaomi",
    inStock: true,
    stockCount: 4,
    description: "Latest Redmi with massive 16GB RAM. Smooth multitasking performance.",
    features: [
      "16GB RAM",
      "256GB storage",
      "6.88\" display",
      "MediaTek Helio G81",
      "50MP camera",
      "5160mAh battery"
    ],
    specifications: {
      "Processor": "MediaTek Helio G81",
      "RAM": "16GB",
      "Storage": "256GB",
      "Display": "6.88\"",
      "Camera": "50MP",
      "Battery": "5160mAh"
    },
    warranty: true,
    condition: "Brand New"
  },
  {
    id: 49,
    name: "Samsung Galaxy A05",
    price: 100,
    rating: 4.3,
    reviews: 167,
    image: smartphoneImages.samsung[0],
    images: smartphoneImages.samsung,
    category: "Smartphones",
    brand: "Samsung",
    inStock: true,
    stockCount: 5,
    description: "Affordable Samsung with 6GB RAM and 128GB storage. Great starter phone.",
    features: [
      "6GB RAM",
      "128GB storage",
      "6.7\" PLS LCD",
      "MediaTek Helio G85",
      "50MP camera",
      "5000mAh battery"
    ],
    specifications: {
      "Processor": "MediaTek Helio G85",
      "RAM": "6GB",
      "Storage": "128GB",
      "Display": "6.7\" PLS LCD",
      "Camera": "50MP + 2MP",
      "Battery": "5000mAh"
    },
    warranty: true,
    condition: "Brand New"
  },
  {
    id: 50,
    name: "Xiaomi Redmi 13",
    price: 110,
    rating: 4.5,
    reviews: 145,
    image: smartphoneImages.xiaomi[0],
    images: smartphoneImages.xiaomi,
    category: "Smartphones",
    brand: "Xiaomi",
    inStock: true,
    stockCount: 4,
    description: "Feature-packed Redmi 13 with excellent camera and performance.",
    features: [
      "8GB RAM",
      "256GB storage",
      "6.79\" FHD+ display",
      "Snapdragon 4 Gen 2",
      "108MP camera",
      "5030mAh battery"
    ],
    specifications: {
      "Processor": "Snapdragon 4 Gen 2",
      "RAM": "8GB",
      "Storage": "256GB",
      "Display": "6.79\" FHD+",
      "Camera": "108MP",
      "Battery": "5030mAh"
    },
    warranty: true,
    condition: "Brand New",
    badge: "Popular"
  },
  {
    id: 51,
    name: "Samsung Galaxy M14 5G",
    price: 110,
    rating: 4.4,
    reviews: 178,
    image: smartphoneImages.samsung[0],
    images: smartphoneImages.samsung,
    category: "Smartphones",
    brand: "Samsung",
    inStock: true,
    stockCount: 3,
    description: "5G-capable Samsung with long battery life. Future-proof connectivity.",
    features: [
      "5G connectivity",
      "6GB RAM",
      "128GB storage",
      "Exynos 1330",
      "50MP camera",
      "6000mAh battery"
    ],
    specifications: {
      "Processor": "Exynos 1330 5G",
      "RAM": "6GB",
      "Storage": "128GB",
      "Display": "6.6\" PLS LCD",
      "Camera": "50MP + 2MP + 2MP",
      "Battery": "6000mAh"
    },
    warranty: true,
    condition: "Brand New",
    badge: "5G Ready"
  },
  {
    id: 52,
    name: "Samsung Galaxy A06",
    price: 115,
    rating: 4.3,
    reviews: 123,
    image: smartphoneImages.samsung[0],
    images: smartphoneImages.samsung,
    category: "Smartphones",
    brand: "Samsung",
    inStock: true,
    stockCount: 4,
    description: "Latest Samsung A-series with 6GB RAM. Reliable everyday smartphone.",
    features: [
      "6GB RAM",
      "128GB storage",
      "6.7\" PLS LCD",
      "MediaTek Helio G85",
      "50MP camera",
      "5000mAh battery"
    ],
    specifications: {
      "Processor": "MediaTek Helio G85",
      "RAM": "6GB",
      "Storage": "128GB",
      "Display": "6.7\" PLS LCD",
      "Camera": "50MP + 2MP",
      "Battery": "5000mAh"
    },
    warranty: true,
    condition: "Brand New"
  },
  {
    id: 53,
    name: "Samsung Galaxy A05s",
    price: 120,
    rating: 4.4,
    reviews: 156,
    image: smartphoneImages.samsung[0],
    images: smartphoneImages.samsung,
    category: "Smartphones",
    brand: "Samsung",
    inStock: true,
    stockCount: 4,
    description: "Samsung A05s with enhanced features. Great camera and display.",
    features: [
      "6GB RAM",
      "128GB storage",
      "6.7\" FHD+ PLS",
      "Snapdragon 680",
      "50MP camera",
      "5000mAh battery"
    ],
    specifications: {
      "Processor": "Snapdragon 680",
      "RAM": "6GB",
      "Storage": "128GB",
      "Display": "6.7\" FHD+ PLS",
      "Camera": "50MP + 2MP + 2MP",
      "Battery": "5000mAh"
    },
    warranty: true,
    condition: "Brand New"
  },
  {
    id: 54,
    name: "Xiaomi Redmi Note 13",
    price: 145,
    rating: 4.6,
    reviews: 234,
    image: smartphoneImages.xiaomi[0],
    images: smartphoneImages.xiaomi,
    category: "Smartphones",
    brand: "Xiaomi",
    inStock: true,
    stockCount: 5,
    description: "Popular Redmi Note series with 8GB RAM. Excellent value flagship.",
    features: [
      "8GB RAM",
      "256GB storage",
      "6.67\" AMOLED",
      "Snapdragon 685",
      "108MP camera",
      "5000mAh battery"
    ],
    specifications: {
      "Processor": "Snapdragon 685",
      "RAM": "8GB",
      "Storage": "256GB",
      "Display": "6.67\" AMOLED",
      "Camera": "108MP + 8MP + 2MP",
      "Battery": "5000mAh"
    },
    warranty: true,
    condition: "Brand New",
    badge: "Best Seller"
  },
  {
    id: 55,
    name: "Samsung Galaxy A15",
    price: 150,
    rating: 4.5,
    reviews: 198,
    image: smartphoneImages.samsung[0],
    images: smartphoneImages.samsung,
    category: "Smartphones",
    brand: "Samsung",
    inStock: true,
    stockCount: 4,
    description: "Mid-range Samsung with premium features. Super AMOLED display.",
    features: [
      "8GB RAM",
      "256GB storage",
      "6.5\" Super AMOLED",
      "MediaTek Helio G99",
      "50MP camera",
      "5000mAh battery"
    ],
    specifications: {
      "Processor": "MediaTek Helio G99",
      "RAM": "8GB",
      "Storage": "256GB",
      "Display": "6.5\" Super AMOLED",
      "Camera": "50MP + 5MP + 2MP",
      "Battery": "5000mAh"
    },
    warranty: true,
    condition: "Brand New"
  },
  {
    id: 56,
    name: "Samsung Galaxy A25 5G",
    price: 200,
    rating: 4.6,
    reviews: 167,
    image: smartphoneImages.samsung[0],
    images: smartphoneImages.samsung,
    category: "Smartphones",
    brand: "Samsung",
    inStock: true,
    stockCount: 3,
    description: "5G Samsung with 8GB RAM and 256GB storage. Premium mid-range.",
    features: [
      "5G connectivity",
      "8GB RAM",
      "256GB storage",
      "6.5\" Super AMOLED",
      "50MP OIS camera",
      "5000mAh battery"
    ],
    specifications: {
      "Processor": "Exynos 1280 5G",
      "RAM": "8GB",
      "Storage": "256GB",
      "Display": "6.5\" Super AMOLED",
      "Camera": "50MP OIS + 8MP + 2MP",
      "Battery": "5000mAh"
    },
    warranty: true,
    condition: "Brand New",
    badge: "5G Ready"
  },
  {
    id: 57,
    name: "Samsung Galaxy A35 5G",
    price: 280,
    rating: 4.7,
    reviews: 145,
    image: smartphoneImages.samsung[0],
    images: smartphoneImages.samsung,
    category: "Smartphones",
    brand: "Samsung",
    inStock: true,
    stockCount: 3,
    description: "High-end Samsung A-series with flagship features. 8GB RAM, 256GB.",
    features: [
      "5G connectivity",
      "8GB RAM",
      "256GB storage",
      "6.6\" Super AMOLED",
      "50MP OIS camera",
      "5000mAh battery"
    ],
    specifications: {
      "Processor": "Exynos 1380 5G",
      "RAM": "8GB",
      "Storage": "256GB",
      "Display": "6.6\" Super AMOLED",
      "Camera": "50MP OIS + 8MP + 5MP",
      "Battery": "5000mAh"
    },
    warranty: true,
    condition: "Brand New",
    badge: "Premium"
  }
];

// Helper functions
export const getProductById = (id: number): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
};

export const getProductsByBrand = (brand: string): Product[] => {
  return products.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.badge);
};

export const getCategories = (): string[] => {
  return Array.from(new Set(products.map(p => p.category)));
};

export const getBrands = (): string[] => {
  return Array.from(new Set(products.map(p => p.brand)));
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.brand.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery)
  );
};
