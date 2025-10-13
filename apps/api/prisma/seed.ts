import { PrismaClient, Role, StockMoveType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin users
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@suigeneris.store' },
    update: {},
    create: {
      email: 'admin@suigeneris.store',
      name: 'System Administrator',
      role: Role.ADMIN,
      password: '$2a$10$YourHashedPasswordHere', // bcrypt hash of 'admin123'
      emailVerified: new Date(),
    },
  });

  const inventoryManager = await prisma.user.upsert({
    where: { email: 'inventory@suigeneris.store' },
    update: {},
    create: {
      email: 'inventory@suigeneris.store',
      name: 'Inventory Manager',
      role: Role.INVENTORY_MANAGER,
      password: '$2a$10$YourHashedPasswordHere',
      emailVerified: new Date(),
    },
  });

  const salesUser = await prisma.user.upsert({
    where: { email: 'sales@suigeneris.store' },
    update: {},
    create: {
      email: 'sales@suigeneris.store',
      name: 'Sales Representative',
      role: Role.SALES,
      password: '$2a$10$YourHashedPasswordHere',
      emailVerified: new Date(),
    },
  });

  console.log('✅ Created admin users');

  // Create warehouse
  const warehouse = await prisma.warehouse.upsert({
    where: { code: 'WH-HARARE' },
    update: {},
    create: {
      code: 'WH-HARARE',
      name: 'Harare Main Warehouse',
      address: '123 Industrial Road, Harare, Zimbabwe',
      city: 'Harare',
      country: 'Zimbabwe',
      phone: '+263-4-123-4567',
      email: 'warehouse@suigeneris.store',
    },
  });

  console.log('✅ Created warehouse');

  // Create brands
  const brands = await Promise.all([
    prisma.brand.upsert({
      where: { name: 'Apple' },
      update: {},
      create: { name: 'Apple', slug: 'apple' },
    }),
    prisma.brand.upsert({
      where: { name: 'Dell' },
      update: {},
      create: { name: 'Dell', slug: 'dell' },
    }),
    prisma.brand.upsert({
      where: { name: 'HP' },
      update: {},
      create: { name: 'HP', slug: 'hp' },
    }),
    prisma.brand.upsert({
      where: { name: 'Samsung' },
      update: {},
      create: { name: 'Samsung', slug: 'samsung' },
    }),
    prisma.brand.upsert({
      where: { name: 'Canon' },
      update: {},
      create: { name: 'Canon', slug: 'canon' },
    }),
  ]);

  console.log('✅ Created brands');

  // Create categories
  const laptopsCategory = await prisma.category.upsert({
    where: { slug: 'laptops' },
    update: {},
    create: {
      name: 'Laptops',
      slug: 'laptops',
      description: 'Portable computers for work and entertainment',
    },
  });

  const phonesCategory = await prisma.category.upsert({
    where: { slug: 'phones' },
    update: {},
    create: {
      name: 'Phones',
      slug: 'phones',
      description: 'Smartphones and mobile devices',
    },
  });

  const printersCategory = await prisma.category.upsert({
    where: { slug: 'printers' },
    update: {},
    create: {
      name: 'Printers',
      slug: 'printers',
      description: 'Printing solutions for home and office',
    },
  });

  const accessoriesCategory = await prisma.category.upsert({
    where: { slug: 'accessories' },
    update: {},
    create: {
      name: 'Accessories',
      slug: 'accessories',
      description: 'Computer and mobile accessories',
    },
  });

  console.log('✅ Created categories');

  // Create sample products with variants
  const macbookPro = await prisma.product.create({
    data: {
      sku: 'MBP-M3-2024',
      name: 'MacBook Pro 14" M3',
      slug: 'macbook-pro-14-m3',
      description: 'The most advanced MacBook Pro ever, featuring the M3 chip for incredible performance.',
      shortDesc: 'Professional laptop with M3 chip',
      brandId: brands[0].id, // Apple
      categoryId: laptopsCategory.id,
      warrantyMonths: 12,
      serialized: true,
      featured: true,
      published: true,
      variants: {
        create: [
          {
            name: '8GB RAM, 512GB SSD, Space Gray',
            variantSku: 'MBP-M3-8-512-SG',
            attributes: {
              ram: '8GB',
              storage: '512GB',
              color: 'Space Gray',
              processor: 'M3',
            },
            cost: 1800.00,
            price: 2199.00,
            compareAtPrice: 2399.00,
            weightGrams: 1600,
            published: true,
          },
          {
            name: '16GB RAM, 1TB SSD, Space Gray',
            variantSku: 'MBP-M3-16-1TB-SG',
            attributes: {
              ram: '16GB',
              storage: '1TB',
              color: 'Space Gray',
              processor: 'M3',
            },
            cost: 2200.00,
            price: 2699.00,
            weightGrams: 1600,
            published: true,
          },
        ],
      },
      media: {
        create: [
          {
            url: '/images/macbook-pro-14-m3-1.jpg',
            alt: 'MacBook Pro 14" M3 - Front view',
            type: 'image',
            position: 0,
          },
          {
            url: '/images/macbook-pro-14-m3-2.jpg',
            alt: 'MacBook Pro 14" M3 - Side view',
            type: 'image',
            position: 1,
          },
        ],
      },
    },
    include: {
      variants: true,
    },
  });

  const dellXPS = await prisma.product.create({
    data: {
      sku: 'DELL-XPS-13',
      name: 'Dell XPS 13',
      slug: 'dell-xps-13',
      description: 'Ultra-portable laptop with stunning InfinityEdge display and premium build quality.',
      shortDesc: 'Premium ultrabook with InfinityEdge display',
      brandId: brands[1].id, // Dell
      categoryId: laptopsCategory.id,
      warrantyMonths: 24,
      serialized: true,
      featured: true,
      published: true,
      variants: {
        create: [
          {
            name: '16GB RAM, 512GB SSD, Platinum Silver',
            variantSku: 'DELL-XPS-13-16-512-PS',
            attributes: {
              ram: '16GB',
              storage: '512GB',
              color: 'Platinum Silver',
              processor: 'Intel i7',
            },
            cost: 1200.00,
            price: 1499.00,
            weightGrams: 1200,
            published: true,
          },
        ],
      },
      media: {
        create: [
          {
            url: '/images/dell-xps-13-1.jpg',
            alt: 'Dell XPS 13 - Front view',
            type: 'image',
            position: 0,
          },
        ],
      },
    },
    include: {
      variants: true,
    },
  });

  const iphone15 = await prisma.product.create({
    data: {
      sku: 'IPHONE-15',
      name: 'iPhone 15',
      slug: 'iphone-15',
      description: 'The latest iPhone with USB-C, improved cameras, and the A16 Bionic chip.',
      shortDesc: 'Latest iPhone with USB-C',
      brandId: brands[0].id, // Apple
      categoryId: phonesCategory.id,
      warrantyMonths: 12,
      serialized: true,
      featured: true,
      published: true,
      variants: {
        create: [
          {
            name: '128GB, Blue',
            variantSku: 'IPHONE-15-128-BLUE',
            attributes: {
              storage: '128GB',
              color: 'Blue',
            },
            cost: 650.00,
            price: 799.00,
            weightGrams: 171,
            published: true,
          },
          {
            name: '256GB, Blue',
            variantSku: 'IPHONE-15-256-BLUE',
            attributes: {
              storage: '256GB',
              color: 'Blue',
            },
            cost: 750.00,
            price: 899.00,
            weightGrams: 171,
            published: true,
          },
        ],
      },
    },
    include: {
      variants: true,
    },
  });

  const hpPrinter = await prisma.product.create({
    data: {
      sku: 'HP-LJ-P1102',
      name: 'HP LaserJet Pro P1102',
      slug: 'hp-laserjet-pro-p1102',
      description: 'Compact monochrome laser printer perfect for home and small office use.',
      shortDesc: 'Compact laser printer',
      brandId: brands[2].id, // HP
      categoryId: printersCategory.id,
      warrantyMonths: 12,
      serialized: true,
      published: true,
      variants: {
        create: [
          {
            name: 'Standard Model',
            variantSku: 'HP-LJ-P1102-STD',
            attributes: {
              type: 'Laser',
              color: 'Monochrome',
            },
            cost: 120.00,
            price: 179.00,
            weightGrams: 5900,
            published: true,
          },
        ],
      },
    },
    include: {
      variants: true,
    },
  });

  console.log('✅ Created sample products');

  // Create inventory levels and initial stock
  const allVariants = [
    ...macbookPro.variants,
    ...dellXPS.variants,
    ...iphone15.variants,
    ...hpPrinter.variants,
  ];

  for (const variant of allVariants) {
    // Create inventory level
    await prisma.inventoryLevel.create({
      data: {
        variantId: variant.id,
        warehouseId: warehouse.id,
        onHand: Math.floor(Math.random() * 50) + 10, // Random stock between 10-60
        reserved: 0,
        lowStock: 5,
      },
    });

    // Create opening stock movement
    const openingQty = Math.floor(Math.random() * 50) + 10;
    await prisma.stockMovement.create({
      data: {
        variantId: variant.id,
        warehouseId: warehouse.id,
        type: StockMoveType.OPENING,
        quantity: openingQty,
        unitCost: variant.cost,
        referenceType: 'OPENING',
        reasonCode: 'INITIAL_STOCK',
        notes: 'Initial stock for new product',
        userId: adminUser.id,
      },
    });
  }

  console.log('✅ Created inventory levels and stock movements');

  // Create a sample supplier
  const supplier = await prisma.supplier.create({
    data: {
      name: 'Tech Distributors Ltd',
      code: 'TDL-001',
      contactName: 'John Smith',
      email: 'orders@techdistributors.com',
      phone: '+263-4-987-6543',
      address: '456 Commerce Street, Harare, Zimbabwe',
      paymentTerms: 'Net 30',
    },
  });

  console.log('✅ Created sample supplier');

  // Create sample customers
  const customer1 = await prisma.customer.create({
    data: {
      email: 'customer1@example.com',
      name: 'Alice Johnson',
      phone: '+263-77-123-4567',
    },
  });

  const customer2 = await prisma.customer.create({
    data: {
      email: 'customer2@example.com',
      name: 'Bob Wilson',
      phone: '+263-77-987-6543',
    },
  });

  console.log('✅ Created sample customers');

  // Create sample reviews
  await prisma.review.createMany({
    data: [
      {
        productId: macbookPro.id,
        rating: 5,
        title: 'Excellent performance!',
        body: 'The M3 chip is incredibly fast. Perfect for my development work.',
        status: 'PUBLISHED',
        verified: true,
      },
      {
        productId: macbookPro.id,
        rating: 4,
        title: 'Great laptop, pricey though',
        body: 'Amazing build quality and performance, but quite expensive.',
        status: 'PUBLISHED',
        verified: true,
      },
      {
        productId: dellXPS.id,
        rating: 4,
        title: 'Solid ultrabook',
        body: 'Great display and build quality. Battery life could be better.',
        status: 'PUBLISHED',
        verified: true,
      },
    ],
  });

  console.log('✅ Created sample reviews');

  // Create compatibility relationships
  await prisma.productCompatibility.create({
    data: {
      productId: macbookPro.id,
      compatibleProductId: hpPrinter.id,
      note: 'Compatible via USB or wireless connection',
    },
  });

  console.log('✅ Created product compatibility relationships');

  // Create system settings
  await prisma.setting.createMany({
    data: [
      {
        key: 'store_name',
        value: JSON.stringify('Sui Generis Store'),
      },
      {
        key: 'store_email',
        value: JSON.stringify('info@suigeneris.store'),
      },
      {
        key: 'store_phone',
        value: JSON.stringify('+263-4-123-4567'),
      },
      {
        key: 'store_address',
        value: JSON.stringify('123 Main Street, Harare, Zimbabwe'),
      },
      {
        key: 'default_currency',
        value: JSON.stringify('USD'),
      },
      {
        key: 'tax_rate',
        value: JSON.stringify(0.15), // 15% VAT
      },
      {
        key: 'low_stock_threshold',
        value: JSON.stringify(5),
      },
    ],
  });

  console.log('✅ Created system settings');

  console.log('🎉 Database seeded successfully!');
  console.log('\n📋 Summary:');
  console.log('- 3 admin users created');
  console.log('- 1 warehouse created');
  console.log('- 5 brands created');
  console.log('- 4 categories created');
  console.log('- 4 products with variants created');
  console.log('- Inventory levels and stock movements created');
  console.log('- 1 supplier created');
  console.log('- 2 sample customers created');
  console.log('- Sample reviews and compatibility data created');
  console.log('- System settings configured');
  console.log('\n🔐 Admin Login:');
  console.log('Email: admin@suigeneris.store');
  console.log('Password: admin123 (change in production!)');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
