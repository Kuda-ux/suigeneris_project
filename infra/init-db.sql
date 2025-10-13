-- Initialize database for Sui Generis Store
-- This script creates the initial database structure

-- Create database if it doesn't exist
SELECT 'CREATE DATABASE suigeneris_store'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'suigeneris_store')\gexec

-- Connect to the database
\c suigeneris_store;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create enum types
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('CUSTOMER', 'ADMIN', 'MANAGER');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE order_status AS ENUM ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE fulfillment_status AS ENUM ('PENDING', 'FULFILLED', 'PARTIALLY_FULFILLED', 'CANCELLED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE media_type AS ENUM ('IMAGE', 'VIDEO');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE stock_movement_type AS ENUM ('ADJUSTMENT', 'SALE', 'PURCHASE', 'TRANSFER', 'RETURN', 'DAMAGE', 'RESERVATION', 'UNRESERVATION');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Grant permissions to the application user
GRANT ALL PRIVILEGES ON DATABASE suigeneris_store TO suigeneris;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO suigeneris;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO suigeneris;

-- Set default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO suigeneris;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO suigeneris;
