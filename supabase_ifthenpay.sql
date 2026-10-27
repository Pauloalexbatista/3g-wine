-- IFTHENPAY Payment Integration Migration for 3GWINE
-- Run this migration in Supabase SQL Editor if using Supabase directly

ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'pendente';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_entity text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_reference text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_request_id text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_details jsonb;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS paid_at timestamp with time zone;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_nif text;

-- Create index for quick order lookup by reference / payment_id
CREATE INDEX IF NOT EXISTS idx_orders_payment_reference ON orders(payment_reference);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
