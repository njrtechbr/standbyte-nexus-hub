-- Test database functionality and data integrity

-- Check all tables have been created
SELECT 
    schemaname,
    tablename,
    tableowner
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;

-- Verify data integrity and relationships
-- Count records in main tables
SELECT 
    'products' as table_name, COUNT(*) as record_count FROM products
UNION ALL
SELECT 
    'services' as table_name, COUNT(*) as record_count FROM services
UNION ALL
SELECT 
    'categories' as table_name, COUNT(*) as record_count FROM categories
UNION ALL
SELECT 
    'brands' as table_name, COUNT(*) as record_count FROM brands
UNION ALL
SELECT 
    'product_specifications' as table_name, COUNT(*) as record_count FROM product_specifications
UNION ALL
SELECT 
    'product_features' as table_name, COUNT(*) as record_count FROM product_features
UNION ALL
SELECT 
    'product_gallery' as table_name, COUNT(*) as record_count FROM product_gallery
UNION ALL
SELECT 
    'service_features' as table_name, COUNT(*) as record_count FROM service_features
UNION ALL
SELECT 
    'service_benefits' as table_name, COUNT(*) as record_count FROM service_benefits
UNION ALL
SELECT 
    'service_process' as table_name, COUNT(*) as record_count FROM service_process
UNION ALL
SELECT 
    'service_gallery' as table_name, COUNT(*) as record_count FROM service_gallery
UNION ALL
SELECT 
    'service_projects' as table_name, COUNT(*) as record_count FROM service_projects
UNION ALL
SELECT 
    'site_settings' as table_name, COUNT(*) as record_count FROM site_settings;

-- Test views functionality
-- Product catalog view
SELECT 
    name,
    final_price,
    category_name,
    brand_name,
    in_stock,
    discount_percentage
FROM product_catalog 
LIMIT 5;

-- Service catalog view  
SELECT 
    name,
    base_price,
    price_type,
    category_name,
    complexity_level,
    features_count
FROM service_catalog 
LIMIT 5;

-- Test foreign key relationships
-- Products with categories and brands
SELECT 
    p.name as product_name,
    c.name as category_name,
    b.name as brand_name
FROM products p
JOIN categories c ON p.category_id = c.id
JOIN brands b ON p.brand_id = b.id
LIMIT 5;

-- Services with categories
SELECT 
    s.name as service_name,
    c.name as category_name,
    s.price_type,
    s.base_price
FROM services s
JOIN categories c ON s.category_id = c.id
LIMIT 5;

-- Test indexes (check if they exist)
SELECT 
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes 
WHERE schemaname = 'public' 
AND tablename IN ('products', 'services', 'orders', 'customers')
ORDER BY tablename, indexname;

-- Check RLS policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    cmd,
    qual
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
