-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
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

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_product_id ON orders(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users
CREATE POLICY "Enable read access for all users" ON orders
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" ON orders
  FOR UPDATE USING (true);
