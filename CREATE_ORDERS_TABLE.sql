    -- Run this SQL in your Supabase SQL Editor to create the orders table

    -- Drop table if exists (to start fresh)
    DROP TABLE IF EXISTS orders CASCADE;

    -- Create orders table
    CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    product_name TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    payment_method TEXT,
    shipping_address TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Create indexes for faster queries
    CREATE INDEX idx_orders_status ON orders(status);
    CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
    CREATE INDEX idx_orders_product_id ON orders(product_id);
    CREATE INDEX idx_orders_customer_email ON orders(customer_email);

    -- Enable RLS (Row Level Security)
    ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

    -- Create policies for access control
    CREATE POLICY "Enable read access for all users" ON orders
    FOR SELECT USING (true);

    CREATE POLICY "Enable insert for authenticated users" ON orders
    FOR INSERT WITH CHECK (true);

    CREATE POLICY "Enable update for authenticated users" ON orders
    FOR UPDATE USING (true);

    CREATE POLICY "Enable delete for authenticated users" ON orders
    FOR DELETE USING (true);
