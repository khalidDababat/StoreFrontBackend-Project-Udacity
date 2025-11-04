ALTER TABLE products
ADD COLUMN image TEXT,              -- URL or base64 string
ADD COLUMN features JSONB; 