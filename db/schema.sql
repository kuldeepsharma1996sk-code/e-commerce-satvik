-- ==========================================================
-- Amala "Sattvic Commerce" Database Schema
-- PostgreSQL / Supabase Ready
-- ==========================================================

-- Extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Core User & Authentication
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    phone_number TEXT UNIQUE,
    rashi VARCHAR(20),
    is_verified BOOLEAN DEFAULT FALSE,
    otp_code VARCHAR(6),
    otp_expiry TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Product Catalog
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    price_paise BIGINT NOT NULL,
    category VARCHAR(50),
    model_glb_url TEXT,
    model_usdz_url TEXT,
    vastu_direction VARCHAR(50),
    material_care TEXT,
    is_subscription_eligible BOOLEAN DEFAULT FALSE,
    stock_quantity INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Orders & Payments
CREATE TYPE order_status AS ENUM ('pending', 'paid', 'shipped', 'delivered', 'cancelled');

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    total_amount_paise BIGINT NOT NULL,
    status order_status DEFAULT 'pending',
    razorpay_order_id TEXT UNIQUE,
    razorpay_payment_id TEXT,
    shipping_address JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Subscriptions (Eternal Fragrance Circle)
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    product_id UUID REFERENCES products(id),
    status TEXT DEFAULT 'active',
    razorpay_subscription_id TEXT UNIQUE,
    next_billing_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Remedy Engine
CREATE TABLE remedies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    duration_days INT DEFAULT 21,
    video_url TEXT,
    mantra_subtitles JSONB,
    associated_product_id UUID REFERENCES products(id)
);

CREATE TABLE user_rituals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    remedy_id UUID REFERENCES remedies(id),
    start_date DATE DEFAULT CURRENT_DATE,
    is_completed BOOLEAN DEFAULT FALSE,
    current_day INT DEFAULT 0
);

CREATE TABLE attendance_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_ritual_id UUID REFERENCES user_rituals(id),
    day_number INT NOT NULL,
    check_in_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_feedback TEXT,
    UNIQUE(user_ritual_id, day_number)
);

-- 6. Quiz & Diagnostic
CREATE TABLE quiz_questions (
    id SERIAL PRIMARY KEY,
    question_text TEXT NOT NULL,
    options JSONB,
    category TEXT
);

-- 7. Daily Panchang / Astrology
CREATE TABLE daily_panchang (
    date DATE PRIMARY KEY,
    tithi TEXT,
    nakshatra TEXT,
    shubh_muhurat_start TIME,
    shubh_muhurat_end TIME,
    remedy_of_the_day TEXT
);

CREATE TABLE daily_astrology (
    id SERIAL PRIMARY KEY,
    rashi_name VARCHAR(20) NOT NULL,
    prediction_text TEXT NOT NULL,
    lucky_number INT,
    lucky_color VARCHAR(20),
    prediction_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Coupons
CREATE TABLE coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    discount_percent INT NOT NULL,
    max_uses INT DEFAULT 100,
    current_uses INT DEFAULT 0,
    min_cart_paise BIGINT DEFAULT 0,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_user_rituals_user ON user_rituals(user_id);
CREATE INDEX idx_attendance_ritual ON attendance_logs(user_ritual_id);
CREATE INDEX idx_daily_astrology_date ON daily_astrology(prediction_date);
CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
