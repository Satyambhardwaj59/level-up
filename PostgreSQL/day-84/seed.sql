
-- USERS


INSERT INTO users (name, email)
SELECT
    'User ' || gs,
    'user' || gs || '@example.com'
FROM generate_series(1, 1000) gs;



-- CATEGORIES


INSERT INTO categories (name)
VALUES
    ('Laptops'),
    ('Smartphones'),
    ('Monitors'),
    ('Accessories'),
    ('Tablets'),
    ('Gaming');



-- PRODUCTS


INSERT INTO products (
    name,
    price,
    tags,
    regions,
    metadata
)
VALUES

(
    'Lenovo ThinkPad X1',
    120000,
    ARRAY['laptop', 'business', 'premium'],
    ARRAY['IN', 'US', 'EU'],

    '{
        "brand": "Lenovo",
        "ram": 16,
        "storage": "1TB",
        "screen": {
            "size": 15.6,
            "resolution": "2560x1440"
        },
        "features": {
            "wifi": true,
            "bluetooth": true
        }
    }'::jsonb
),

(
    'MacBook Pro 16',
    220000,
    ARRAY['laptop', 'apple', 'professional'],
    ARRAY['IN', 'US', 'UK'],

    '{
        "brand": "Apple",
        "ram": 32,
        "storage": "1TB",
        "screen": {
            "size": 16,
            "resolution": "3456x2234"
        },
        "features": {
            "wifi": true,
            "bluetooth": true
        }
    }'::jsonb
),

(
    'Dell XPS 15',
    150000,
    ARRAY['laptop', 'business', 'premium'],
    ARRAY['IN', 'EU'],

    '{
        "brand": "Dell",
        "ram": 16,
        "storage": "512GB",
        "screen": {
            "size": 15.6,
            "resolution": "1920x1200"
        },
        "features": {
            "wifi": true,
            "bluetooth": true
        }
    }'::jsonb
),

(
    'Samsung Galaxy S25',
    90000,
    ARRAY['smartphone', 'android', '5g'],
    ARRAY['IN', 'US', 'EU'],

    '{
        "brand": "Samsung",
        "ram": 12,
        "storage": "256GB",
        "screen": {
            "size": 6.2,
            "resolution": "2340x1080"
        },
        "features": {
            "wifi": true,
            "bluetooth": true,
            "nfc": true
        }
    }'::jsonb
),

(
    'iPhone 17 Pro',
    140000,
    ARRAY['smartphone', 'apple', 'premium'],
    ARRAY['IN', 'US', 'UK', 'EU'],

    '{
        "brand": "Apple",
        "ram": 12,
        "storage": "512GB",
        "screen": {
            "size": 6.3,
            "resolution": "2622x1206"
        },
        "features": {
            "wifi": true,
            "bluetooth": true,
            "nfc": true
        }
    }'::jsonb
);