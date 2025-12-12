import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Create Supabase client with service role for admin operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Products to add for missing categories
const missingProducts = [
  // ==================== PROCESSORS ====================
  { id: 200, name: "Intel Core i3 4th Gen", price: 100, category: "Processors", brand: "Intel", description: "Intel Core i3 4th Generation processor.", features: ["4th Generation", "Desktop CPU", "LGA 1150"], specifications: { "Generation": "4th", "Type": "Desktop CPU" }, stock_count: 5, in_stock: true, warranty: true, condition: "Second-hand (Excellent)", image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800&h=800&fit=crop&q=80" },
  { id: 201, name: "Intel Core i5 4th Gen", price: 160, category: "Processors", brand: "Intel", description: "Intel Core i5 4th Generation processor.", features: ["4th Generation", "Desktop CPU", "LGA 1150"], specifications: { "Generation": "4th", "Type": "Desktop CPU" }, stock_count: 4, in_stock: true, warranty: true, condition: "Second-hand (Excellent)", image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800&h=800&fit=crop&q=80" },
  { id: 202, name: "Intel Core i3 6th Gen", price: 160, category: "Processors", brand: "Intel", description: "Intel Core i3 6th Generation processor.", features: ["6th Generation", "Desktop CPU", "LGA 1151"], specifications: { "Generation": "6th", "Type": "Desktop CPU" }, stock_count: 4, in_stock: true, warranty: true, condition: "Second-hand (Excellent)", image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800&h=800&fit=crop&q=80" },
  { id: 203, name: "Intel Core i3 7th Gen", price: 180, category: "Processors", brand: "Intel", description: "Intel Core i3 7th Generation processor.", features: ["7th Generation", "Desktop CPU", "LGA 1151"], specifications: { "Generation": "7th", "Type": "Desktop CPU" }, stock_count: 3, in_stock: true, warranty: true, condition: "Second-hand (Excellent)", image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800&h=800&fit=crop&q=80" },
  { id: 204, name: "Intel Core i5 7th Gen", price: 200, category: "Processors", brand: "Intel", description: "Intel Core i5 7th Generation processor.", features: ["7th Generation", "Desktop CPU", "LGA 1151"], specifications: { "Generation": "7th", "Type": "Desktop CPU" }, stock_count: 4, in_stock: true, warranty: true, condition: "Second-hand (Excellent)", image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800&h=800&fit=crop&q=80" },
  { id: 205, name: "Intel Core i3 8th Gen", price: 200, category: "Processors", brand: "Intel", description: "Intel Core i3 8th Generation processor.", features: ["8th Generation", "Desktop CPU", "LGA 1151"], specifications: { "Generation": "8th", "Type": "Desktop CPU" }, stock_count: 3, in_stock: true, warranty: true, condition: "Second-hand (Excellent)", image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800&h=800&fit=crop&q=80" },
  { id: 206, name: "Intel Core i3 10th Gen", price: 250, category: "Processors", brand: "Intel", description: "Intel Core i3 10th Generation processor.", features: ["10th Generation", "Desktop CPU", "LGA 1200"], specifications: { "Generation": "10th", "Type": "Desktop CPU" }, stock_count: 3, in_stock: true, warranty: true, condition: "Second-hand (Excellent)", image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800&h=800&fit=crop&q=80" },
  { id: 207, name: "Intel Core i3 12th Gen", price: 320, category: "Processors", brand: "Intel", description: "Brand new Intel Core i3 12th Generation.", features: ["12th Generation", "Desktop CPU", "LGA 1700"], specifications: { "Generation": "12th", "Type": "Desktop CPU" }, stock_count: 5, in_stock: true, warranty: true, condition: "Brand New", badge: "New", image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800&h=800&fit=crop&q=80" },
  { id: 208, name: "Intel Core i5 13th Gen", price: 420, category: "Processors", brand: "Intel", description: "Latest Intel Core i5 13th Generation.", features: ["13th Generation", "Desktop CPU", "LGA 1700"], specifications: { "Generation": "13th", "Type": "Desktop CPU" }, stock_count: 4, in_stock: true, warranty: true, condition: "Brand New", badge: "Latest", image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800&h=800&fit=crop&q=80" },

  // ==================== DESKTOPS (All-in-One PCs) ====================
  { id: 210, name: "All-in-One PC (Dual Core)", price: 170, category: "Desktops", brand: "Generic", description: "Budget All-in-One PC with dual core processor.", features: ["Dual Core", "All-in-One design", "Built-in display"], specifications: { "Processor": "Dual Core", "Type": "All-in-One" }, stock_count: 3, in_stock: true, warranty: true, condition: "Second-hand (Excellent)", image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&h=800&fit=crop&q=80" },
  { id: 211, name: "All-in-One PC (i3 6th Gen)", price: 260, category: "Desktops", brand: "Generic", description: "All-in-One PC with Intel Core i3 6th Gen.", features: ["Core i3 6th Gen", "All-in-One design"], specifications: { "Processor": "Core i3 6th Gen", "Type": "All-in-One" }, stock_count: 3, in_stock: true, warranty: true, condition: "Second-hand (Excellent)", image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&h=800&fit=crop&q=80" },
  { id: 212, name: "All-in-One PC (i3 7th Gen)", price: 300, category: "Desktops", brand: "Generic", description: "All-in-One PC with Intel Core i3 7th Gen.", features: ["Core i3 7th Gen", "All-in-One design"], specifications: { "Processor": "Core i3 7th Gen", "Type": "All-in-One" }, stock_count: 2, in_stock: true, warranty: true, condition: "Second-hand (Excellent)", image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&h=800&fit=crop&q=80" },
  { id: 213, name: "All-in-One PC (i5 6th Gen)", price: 300, category: "Desktops", brand: "Generic", description: "All-in-One PC with Intel Core i5 6th Gen.", features: ["Core i5 6th Gen", "All-in-One design"], specifications: { "Processor": "Core i5 6th Gen", "Type": "All-in-One" }, stock_count: 3, in_stock: true, warranty: true, condition: "Second-hand (Excellent)", image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&h=800&fit=crop&q=80" },
  { id: 214, name: "HP All-in-One PC (i5 6th Gen)", price: 320, category: "Desktops", brand: "HP", description: "HP branded All-in-One PC.", features: ["Core i5 6th Gen", "HP quality", "All-in-One design"], specifications: { "Processor": "Core i5 6th Gen", "Type": "All-in-One" }, stock_count: 2, in_stock: true, warranty: true, condition: "Second-hand (Excellent)", badge: "HP", image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&h=800&fit=crop&q=80" },
  { id: 215, name: "All-in-One PC (i7 6th Gen)", price: 320, category: "Desktops", brand: "Generic", description: "High-performance All-in-One PC.", features: ["Core i7 6th Gen", "All-in-One design"], specifications: { "Processor": "Core i7 6th Gen", "Type": "All-in-One" }, stock_count: 2, in_stock: true, warranty: true, condition: "Second-hand (Excellent)", image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&h=800&fit=crop&q=80" },

  // ==================== MONITORS ====================
  { id: 220, name: "19\"/20\" Standard Monitor", price: 50, category: "Monitors", brand: "Generic", description: "Standard 19-20 inch monitor.", features: ["19-20\" display", "Standard bezels", "VGA/HDMI"], specifications: { "Size": "19-20\"", "Type": "Standard" }, stock_count: 10, in_stock: true, warranty: true, condition: "Second-hand (Excellent)", badge: "Budget", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop&q=80" },
  { id: 221, name: "22\" Standard Monitor", price: 60, category: "Monitors", brand: "Generic", description: "22 inch standard monitor.", features: ["22\" display", "Standard bezels", "VGA/HDMI"], specifications: { "Size": "22\"", "Type": "Standard" }, stock_count: 8, in_stock: true, warranty: true, condition: "Second-hand (Excellent)", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop&q=80" },
  { id: 222, name: "22\" Borderless Monitor", price: 100, category: "Monitors", brand: "Generic", description: "22 inch borderless monitor.", features: ["22\" display", "Borderless design", "HDMI"], specifications: { "Size": "22\"", "Type": "Borderless" }, stock_count: 6, in_stock: true, warranty: true, condition: "Second-hand (Excellent)", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop&q=80" },
  { id: 223, name: "22\" Monitor (Brand New)", price: 155, category: "Monitors", brand: "Generic", description: "Brand new 22 inch monitor.", features: ["22\" display", "Brand new", "Full HD"], specifications: { "Size": "22\"", "Type": "Standard" }, stock_count: 5, in_stock: true, warranty: true, condition: "Brand New", badge: "New", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop&q=80" },
  { id: 224, name: "24\" Standard Monitor", price: 85, category: "Monitors", brand: "Generic", description: "24 inch standard monitor.", features: ["24\" display", "Standard bezels", "HDMI"], specifications: { "Size": "24\"", "Type": "Standard" }, stock_count: 8, in_stock: true, warranty: true, condition: "Second-hand (Excellent)", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop&q=80" },
  { id: 225, name: "24\" Borderless Monitor", price: 120, category: "Monitors", brand: "Generic", description: "24 inch borderless monitor.", features: ["24\" display", "Borderless design", "HDMI"], specifications: { "Size": "24\"", "Type": "Borderless" }, stock_count: 5, in_stock: true, warranty: true, condition: "Second-hand (Excellent)", badge: "Popular", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop&q=80" },
  { id: 226, name: "25\" Borderless Monitor", price: 140, category: "Monitors", brand: "Generic", description: "25 inch borderless monitor.", features: ["25\" display", "Borderless design", "HDMI"], specifications: { "Size": "25\"", "Type": "Borderless" }, stock_count: 4, in_stock: true, warranty: true, condition: "Second-hand (Excellent)", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop&q=80" },
  { id: 227, name: "27\" Standard Monitor", price: 140, category: "Monitors", brand: "Generic", description: "27 inch standard monitor.", features: ["27\" display", "Standard bezels", "HDMI"], specifications: { "Size": "27\"", "Type": "Standard" }, stock_count: 4, in_stock: true, warranty: true, condition: "Second-hand (Excellent)", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop&q=80" },
  { id: 228, name: "27\" Borderless Monitor", price: 160, category: "Monitors", brand: "Generic", description: "27 inch borderless monitor.", features: ["27\" display", "Borderless design", "HDMI"], specifications: { "Size": "27\"", "Type": "Borderless" }, stock_count: 3, in_stock: true, warranty: true, condition: "Second-hand (Excellent)", badge: "Premium", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop&q=80" },

  // ==================== MORE ACCESSORIES ====================
  { id: 230, name: "V65 Gaming Headphone", price: 12, category: "Accessories", brand: "Generic", description: "Budget gaming headphone.", features: ["Gaming audio", "Microphone", "Comfortable"], specifications: { "Type": "Gaming Headphone" }, stock_count: 15, in_stock: true, warranty: false, condition: "Brand New", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop&q=80" },
  { id: 231, name: "PHOINIKAS Q3 Gaming Headphone", price: 45, category: "Accessories", brand: "PHOINIKAS", description: "Premium gaming headphone.", features: ["7.1 Surround", "RGB lighting", "Noise cancelling"], specifications: { "Type": "Gaming Headphone" }, stock_count: 8, in_stock: true, warranty: true, condition: "Brand New", badge: "Premium", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop&q=80" },
  { id: 232, name: "HDMI Splitter", price: 12, category: "Accessories", brand: "Generic", description: "HDMI splitter for multiple displays.", features: ["1 to 2 split", "4K support"], specifications: { "Type": "HDMI Splitter" }, stock_count: 20, in_stock: true, warranty: false, condition: "Brand New", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&q=80" },
  { id: 233, name: "8-in-1 USB-C to HDTV Hub", price: 10, category: "Accessories", brand: "Generic", description: "Multi-port USB-C hub.", features: ["8 ports", "USB-C", "HDMI output"], specifications: { "Type": "USB Hub" }, stock_count: 15, in_stock: true, warranty: false, condition: "Brand New", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&q=80" },
  { id: 234, name: "Smart WiFi Camera", price: 30, category: "Accessories", brand: "Generic", description: "Smart security camera.", features: ["WiFi", "Night vision", "Motion detection"], specifications: { "Type": "Security Camera" }, stock_count: 10, in_stock: true, warranty: true, condition: "Brand New", image: "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=800&h=800&fit=crop&q=80" },
  { id: 235, name: "11-in-1 USB-C to HDTV Hub", price: 40, category: "Accessories", brand: "Generic", description: "Premium multi-port USB-C hub.", features: ["11 ports", "USB-C", "HDMI", "SD card"], specifications: { "Type": "USB Hub" }, stock_count: 8, in_stock: true, warranty: true, condition: "Brand New", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&q=80" },
  { id: 236, name: "Laptop Cooling Pad", price: 12, category: "Accessories", brand: "Generic", description: "Laptop cooling pad with fans.", features: ["Dual fans", "USB powered", "Adjustable"], specifications: { "Type": "Cooling Pad" }, stock_count: 15, in_stock: true, warranty: false, condition: "Brand New", image: "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=800&h=800&fit=crop&q=80" },
  { id: 237, name: "HDMI Cable 1.5m", price: 3, category: "Accessories", brand: "Generic", description: "1.5 meter HDMI cable.", features: ["1.5m length", "4K support"], specifications: { "Length": "1.5m" }, stock_count: 30, in_stock: true, warranty: false, condition: "Brand New", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&q=80" },
  { id: 238, name: "HDMI Cable 3m", price: 5, category: "Accessories", brand: "Generic", description: "3 meter HDMI cable.", features: ["3m length", "4K support"], specifications: { "Length": "3m" }, stock_count: 25, in_stock: true, warranty: false, condition: "Brand New", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&q=80" },
  { id: 239, name: "HDMI Cable 5m", price: 10, category: "Accessories", brand: "Generic", description: "5 meter HDMI cable.", features: ["5m length", "4K support"], specifications: { "Length": "5m" }, stock_count: 20, in_stock: true, warranty: false, condition: "Brand New", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&q=80" },
  { id: 240, name: "Wired Mouse", price: 5, category: "Accessories", brand: "Generic", description: "Basic wired mouse.", features: ["USB", "Optical", "1000 DPI"], specifications: { "Type": "Wired Mouse" }, stock_count: 30, in_stock: true, warranty: false, condition: "Brand New", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop&q=80" },
  { id: 241, name: "Wireless Mouse", price: 7, category: "Accessories", brand: "Generic", description: "Wireless mouse with USB receiver.", features: ["Wireless", "USB receiver", "1200 DPI"], specifications: { "Type": "Wireless Mouse" }, stock_count: 25, in_stock: true, warranty: false, condition: "Brand New", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop&q=80" },
  { id: 242, name: "USB-C to LAN Adapter", price: 5, category: "Accessories", brand: "Generic", description: "USB-C to Ethernet adapter.", features: ["USB-C", "Gigabit Ethernet"], specifications: { "Type": "Network Adapter" }, stock_count: 20, in_stock: true, warranty: false, condition: "Brand New", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&q=80" },
  { id: 243, name: "ZTE MF286C Indoor Router", price: 65, category: "Accessories", brand: "ZTE", description: "4G LTE indoor router.", features: ["4G LTE", "WiFi", "Multiple devices"], specifications: { "Type": "4G Router" }, stock_count: 5, in_stock: true, warranty: true, condition: "Second-hand (Excellent)", image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=800&h=800&fit=crop&q=80" },
];

export async function POST() {
  try {
    const results = {
      categoryFixed: 0,
      productsAdded: 0,
      errors: [] as string[],
    };

    // Step 1: Fix category case - change "laptops" to "Laptops"
    console.log('🔧 Fixing category case...');
    const { data: updateData, error: updateError } = await supabase
      .from('products')
      .update({ category: 'Laptops' })
      .eq('category', 'laptops');

    if (updateError) {
      results.errors.push(`Category fix error: ${updateError.message}`);
    } else {
      // Count how many were updated
      const { count } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('category', 'Laptops');
      results.categoryFixed = count || 0;
      console.log(`✅ Fixed ${results.categoryFixed} laptop categories`);
    }

    // Step 2: Add missing products (Processors, Desktops, Monitors, more Accessories)
    console.log('📦 Adding missing products...');
    for (const product of missingProducts) {
      const dbProduct = {
        ...product,
        sku: `SKU-${product.id.toString().padStart(5, '0')}`,
        images: [product.image],
        rating: 4.5,
        reviews: Math.floor(Math.random() * 50) + 10,
      };

      const { error } = await supabase
        .from('products')
        .upsert(dbProduct, { onConflict: 'id' });

      if (error) {
        results.errors.push(`Failed to add ${product.name}: ${error.message}`);
      } else {
        results.productsAdded++;
        console.log(`✅ Added: ${product.name}`);
      }
    }

    // Get final counts
    const { data: finalProducts } = await supabase
      .from('products')
      .select('category');

    const categoryCounts: Record<string, number> = {};
    finalProducts?.forEach((p: any) => {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });

    return NextResponse.json({
      success: true,
      message: 'Categories fixed and missing products added!',
      results: {
        ...results,
        totalProducts: finalProducts?.length || 0,
        categories: categoryCounts,
      }
    });
  } catch (error: any) {
    console.error('💥 Fix failed:', error);
    return NextResponse.json({
      success: false,
      error: error?.message || 'Fix failed'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'POST to this endpoint to fix categories and add missing products',
    actions: [
      'Fix "laptops" -> "Laptops" category case',
      'Add 9 Processors',
      'Add 6 Desktops (All-in-One PCs)',
      'Add 9 Monitors',
      'Add 14 more Accessories',
    ]
  });
}
