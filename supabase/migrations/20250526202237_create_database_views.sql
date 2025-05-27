-- Database views for optimized queries - Standbyte Nexus Hub

-- Product catalog view with category and brand information
CREATE OR REPLACE VIEW public.product_catalog AS
SELECT 
    p.id,
    p.name,
    p.description,
    p.short_description,
    p.price,
    p.sale_price,
    p.sku,
    p.stock_quantity,
    p.status,
    p.featured,
    p.weight,
    p.dimensions,
    p.meta_title,
    p.meta_description,
    p.slug,
    p.created_at,
    p.updated_at,
    c.name as category_name,
    c.slug as category_slug,
    c.icon as category_icon,
    b.name as brand_name,
    b.slug as brand_slug,
    b.logo as brand_logo,
    -- Calculate discount percentage
    CASE 
        WHEN p.sale_price IS NOT NULL AND p.sale_price > 0 
        THEN ROUND(((p.price - p.sale_price) / p.price * 100)::numeric, 2)
        ELSE 0
    END as discount_percentage,
    -- Get the final price (sale price if available, otherwise regular price)
    COALESCE(p.sale_price, p.price) as final_price,
    -- Check if product is in stock
    CASE WHEN p.stock_quantity > 0 THEN true ELSE false END as in_stock
FROM public.products p
LEFT JOIN public.categories c ON p.category_id = c.id
LEFT JOIN public.brands b ON p.brand_id = b.id
WHERE p.status = 'active';

-- Service catalog view with category information
CREATE OR REPLACE VIEW public.service_catalog AS
SELECT 
    s.id,
    s.title as name,
    s.description,
    s.short_description,
    s.price_type,
    s.base_price,
    s.status,
    s.featured,
    s.duration_estimate,
    s.complexity_level,
    s.meta_title,
    s.meta_description,
    s.slug,
    s.created_at,
    s.updated_at,
    c.name as category_name,
    c.slug as category_slug,
    c.icon as category_icon,
    -- Count related features
    (SELECT COUNT(*) FROM public.service_features sf WHERE sf.service_id = s.id) as features_count,
    -- Count related benefits
    (SELECT COUNT(*) FROM public.service_benefits sb WHERE sb.service_id = s.id) as benefits_count,
    -- Count related process steps
    (SELECT COUNT(*) FROM public.service_process sp WHERE sp.service_id = s.id) as process_steps_count,
    -- Count related projects
    (SELECT COUNT(*) FROM public.service_projects sp WHERE sp.service_id = s.id) as projects_count
FROM public.services s
LEFT JOIN public.categories c ON s.category_id = c.id
WHERE s.status = 'active';

-- Product details view with all related information
CREATE OR REPLACE VIEW public.product_details AS
SELECT 
    p.*,
    c.name as category_name,
    c.slug as category_slug,
    b.name as brand_name,
    b.slug as brand_slug,
    -- Get first gallery image as thumbnail
    (SELECT image_url FROM public.product_gallery pg 
     WHERE pg.product_id = p.id 
     ORDER BY pg.sort_order ASC, pg.created_at ASC 
     LIMIT 1) as thumbnail_url,
    -- Calculate average rating
    (SELECT AVG(rating)::numeric(3,2) FROM public.reviews r 
     WHERE r.product_id = p.id AND r.status = 'approved') as average_rating,
    -- Count total reviews
    (SELECT COUNT(*) FROM public.reviews r 
     WHERE r.product_id = p.id AND r.status = 'approved') as reviews_count,
    -- Calculate discount percentage
    CASE 
        WHEN p.sale_price IS NOT NULL AND p.sale_price > 0 
        THEN ROUND(((p.price - p.sale_price) / p.price * 100)::numeric, 2)
        ELSE 0
    END as discount_percentage,
    -- Get the final price
    COALESCE(p.sale_price, p.price) as final_price,
    -- Check if product is in stock
    CASE WHEN p.stock_quantity > 0 THEN true ELSE false END as in_stock
FROM public.products p
LEFT JOIN public.categories c ON p.category_id = c.id
LEFT JOIN public.brands b ON p.brand_id = b.id;

-- Service details view with all related information
CREATE OR REPLACE VIEW public.service_details AS
SELECT 
    s.*,
    c.name as category_name,
    c.slug as category_slug,
    -- Get first gallery image as thumbnail
    (SELECT image_url FROM public.service_gallery sg 
     WHERE sg.service_id = s.id 
     ORDER BY sg.sort_order ASC, sg.created_at ASC 
     LIMIT 1) as thumbnail_url,
    -- Calculate average rating
    (SELECT AVG(rating)::numeric(3,2) FROM public.reviews r 
     WHERE r.service_id = s.id AND r.status = 'approved') as average_rating,
    -- Count total reviews
    (SELECT COUNT(*) FROM public.reviews r 
     WHERE r.service_id = s.id AND r.status = 'approved') as reviews_count,
    -- Count quotes requested
    (SELECT COUNT(*) FROM public.service_quotes sq 
     WHERE sq.service_id = s.id) as quotes_count
FROM public.services s
LEFT JOIN public.categories c ON s.category_id = c.id;

-- Customer order history view
CREATE OR REPLACE VIEW public.customer_order_history AS
SELECT 
    o.id as order_id,
    o.order_number,
    o.status as order_status,
    o.total_amount,
    o.payment_status,
    o.payment_method,
    o.shipping_method,
    o.tracking_number,
    o.notes,
    o.created_at as order_date,
    o.updated_at as last_updated,
    c.id as customer_id,
    c.first_name,
    c.last_name,
    c.email,
    c.phone,
    -- Shipping address
    sa.street_address as shipping_street,
    sa.city as shipping_city,
    sa.state as shipping_state,
    sa.postal_code as shipping_postal_code,
    sa.country as shipping_country,
    -- Billing address
    ba.street_address as billing_street,
    ba.city as billing_city,
    ba.state as billing_state,
    ba.postal_code as billing_postal_code,
    ba.country as billing_country,
    -- Order totals
    (SELECT COUNT(*) FROM public.order_items oi WHERE oi.order_id = o.id) as items_count,
    (SELECT SUM(oi.quantity) FROM public.order_items oi WHERE oi.order_id = o.id) as total_quantity
FROM public.orders o
LEFT JOIN public.customers c ON o.customer_id = c.id
LEFT JOIN public.customer_addresses sa ON o.shipping_address_id = sa.id
LEFT JOIN public.customer_addresses ba ON o.billing_address_id = ba.id;

-- Order items with product details view
CREATE OR REPLACE VIEW public.order_items_details AS
SELECT 
    oi.id,
    oi.order_id,
    oi.product_id,
    oi.service_id,
    oi.quantity,
    oi.unit_price,
    oi.total_price,
    oi.created_at,
    -- Product information (if applicable)
    p.name as product_name,
    p.sku as product_sku,    p.slug as product_slug,
    -- Service information (if applicable)
    s.title as service_name,
    s.slug as service_slug,
    -- Order information
    o.order_number,
    o.status as order_status,
    o.created_at as order_date,
    -- Customer information
    c.first_name,
    c.last_name,
    c.email
FROM public.order_items oi
LEFT JOIN public.products p ON oi.product_id = p.id
LEFT JOIN public.services s ON oi.service_id = s.id
LEFT JOIN public.orders o ON oi.order_id = o.id
LEFT JOIN public.customers c ON o.customer_id = c.id;

-- Reviews with customer and product/service details
CREATE OR REPLACE VIEW public.reviews_details AS
SELECT 
    r.id,
    r.rating,
    r.title,
    r.comment,
    r.status,
    r.created_at,
    r.updated_at,
    -- Customer information
    c.first_name,
    c.last_name,
    c.email,
    -- Product information (if applicable)
    p.name as product_name,
    p.slug as product_slug,    -- Service information (if applicable)
    s.title as service_name,
    s.slug as service_slug,
    -- Determine review type
    CASE 
        WHEN r.product_id IS NOT NULL THEN 'product'
        WHEN r.service_id IS NOT NULL THEN 'service'
        ELSE 'unknown'
    END as review_type
FROM public.reviews r
LEFT JOIN public.customers c ON r.customer_id = c.id
LEFT JOIN public.products p ON r.product_id = p.id
LEFT JOIN public.services s ON r.service_id = s.id;

-- Shopping cart with product details
CREATE OR REPLACE VIEW public.shopping_cart_details AS
SELECT 
    sc.id,
    sc.customer_id,
    sc.product_id,
    sc.service_id,
    sc.quantity,
    sc.created_at,
    sc.updated_at,
    -- Product information (if applicable)
    p.name as product_name,
    p.price as product_price,
    p.sale_price as product_sale_price,
    p.sku as product_sku,
    p.slug as product_slug,
    p.stock_quantity,
    COALESCE(p.sale_price, p.price) as product_final_price,    -- Service information (if applicable)
    s.title as service_name,
    s.base_price as service_price,
    s.slug as service_slug,
    s.price_type as service_price_type,
    -- Calculate line total
    CASE 
        WHEN sc.product_id IS NOT NULL THEN sc.quantity * COALESCE(p.sale_price, p.price)
        WHEN sc.service_id IS NOT NULL THEN sc.quantity * s.base_price
        ELSE 0
    END as line_total,
    -- Customer information
    c.first_name,
    c.last_name,
    c.email
FROM public.shopping_cart sc
LEFT JOIN public.products p ON sc.product_id = p.id
LEFT JOIN public.services s ON sc.service_id = s.id
LEFT JOIN public.customers c ON sc.customer_id = c.id;

-- Wishlist with product/service details
CREATE OR REPLACE VIEW public.wishlist_details AS
SELECT 
    w.id,
    w.customer_id,
    w.product_id,
    w.service_id,
    w.created_at,
    -- Product information (if applicable)
    p.name as product_name,
    p.price as product_price,
    p.sale_price as product_sale_price,
    p.slug as product_slug,
    p.stock_quantity,
    COALESCE(p.sale_price, p.price) as product_final_price,    -- Service information (if applicable)
    s.title as service_name,
    s.base_price as service_price,
    s.slug as service_slug,
    -- Customer information
    c.first_name,
    c.last_name,
    c.email,
    -- Determine item type
    CASE 
        WHEN w.product_id IS NOT NULL THEN 'product'
        WHEN w.service_id IS NOT NULL THEN 'service'
        ELSE 'unknown'
    END as item_type
FROM public.wishlist w
LEFT JOIN public.products p ON w.product_id = p.id
LEFT JOIN public.services s ON w.service_id = s.id
LEFT JOIN public.customers c ON w.customer_id = c.id;

-- Service quotes with details
CREATE OR REPLACE VIEW public.service_quotes_details AS
SELECT 
    sq.id,
    sq.quote_number,
    sq.status,
    sq.total_amount,
    sq.notes,
    sq.valid_until,
    sq.created_at,
    sq.updated_at,
    -- Customer information
    c.id as customer_id,
    c.first_name,
    c.last_name,
    c.email,
    c.phone,    -- Service information
    s.title as service_name,
    s.slug as service_slug,
    s.complexity_level,
    -- Count quote items
    (SELECT COUNT(*) FROM public.quote_items qi WHERE qi.quote_id = sq.id) as items_count
FROM public.service_quotes sq
LEFT JOIN public.customers c ON sq.customer_id = c.id
LEFT JOIN public.services s ON sq.service_id = s.id;

-- Analytics views for dashboard

-- Product sales performance
CREATE OR REPLACE VIEW public.product_sales_analytics AS
SELECT 
    p.id,
    p.name,
    p.sku,
    p.price,
    p.sale_price,
    COALESCE(p.sale_price, p.price) as current_price,
    -- Sales metrics
    COALESCE(SUM(oi.quantity), 0) as total_sold,
    COALESCE(SUM(oi.total_price), 0) as total_revenue,
    COUNT(DISTINCT oi.order_id) as orders_count,
    -- Average metrics
    CASE 
        WHEN COUNT(oi.id) > 0 
        THEN ROUND(AVG(oi.unit_price)::numeric, 2)
        ELSE p.price
    END as average_selling_price,
    -- Review metrics
    (SELECT AVG(rating)::numeric(3,2) FROM public.reviews r 
     WHERE r.product_id = p.id AND r.status = 'approved') as average_rating,
    (SELECT COUNT(*) FROM public.reviews r 
     WHERE r.product_id = p.id AND r.status = 'approved') as reviews_count,
    -- Stock status
    p.stock_quantity,
    CASE WHEN p.stock_quantity > 10 THEN 'in_stock'
         WHEN p.stock_quantity > 0 THEN 'low_stock'
         ELSE 'out_of_stock'
    END as stock_status
FROM public.products p
LEFT JOIN public.order_items oi ON p.id = oi.product_id
LEFT JOIN public.orders o ON oi.order_id = o.id AND o.status IN ('completed', 'shipped', 'delivered')
WHERE p.status = 'active'
GROUP BY p.id, p.name, p.sku, p.price, p.sale_price, p.stock_quantity
ORDER BY total_revenue DESC;

-- Service performance analytics
CREATE OR REPLACE VIEW public.service_analytics AS
SELECT 
    s.id,
    s.title as name,
    s.base_price,
    s.price_type,
    s.complexity_level,
    -- Quote metrics
    COUNT(DISTINCT sq.id) as quotes_count,
    COUNT(DISTINCT CASE WHEN sq.status = 'accepted' THEN sq.id END) as accepted_quotes,
    COALESCE(SUM(CASE WHEN sq.status = 'accepted' THEN sq.total_amount ELSE 0 END), 0) as total_revenue,
    -- Order metrics (services sold through orders)
    COALESCE(SUM(oi.quantity), 0) as total_sold_orders,
    COALESCE(SUM(oi.total_price), 0) as order_revenue,
    -- Review metrics
    (SELECT AVG(rating)::numeric(3,2) FROM public.reviews r 
     WHERE r.service_id = s.id AND r.status = 'approved') as average_rating,
    (SELECT COUNT(*) FROM public.reviews r 
     WHERE r.service_id = s.id AND r.status = 'approved') as reviews_count,
    -- Conversion rate
    CASE 
        WHEN COUNT(sq.id) > 0 
        THEN ROUND((COUNT(CASE WHEN sq.status = 'accepted' THEN 1 END) * 100.0 / COUNT(sq.id))::numeric, 2)
        ELSE 0
    END as quote_conversion_rate
FROM public.services s
LEFT JOIN public.service_quotes sq ON s.id = sq.service_id
LEFT JOIN public.order_items oi ON s.id = oi.service_id
LEFT JOIN public.orders o ON oi.order_id = o.id AND o.status IN ('completed', 'shipped', 'delivered')
WHERE s.status = 'active'
GROUP BY s.id, s.name, s.base_price, s.price_type, s.complexity_level
ORDER BY total_revenue DESC;

-- Customer analytics
CREATE OR REPLACE VIEW public.customer_analytics AS
SELECT 
    c.id,
    c.first_name,
    c.last_name,
    c.email,
    c.created_at as registration_date,
    -- Order metrics
    COUNT(DISTINCT o.id) as total_orders,
    COALESCE(SUM(o.total_amount), 0) as total_spent,
    COALESCE(AVG(o.total_amount), 0) as average_order_value,
    MAX(o.created_at) as last_order_date,
    -- Quote metrics
    COUNT(DISTINCT sq.id) as total_quotes,
    COUNT(DISTINCT CASE WHEN sq.status = 'accepted' THEN sq.id END) as accepted_quotes,
    -- Activity metrics
    (SELECT COUNT(*) FROM public.reviews r WHERE r.customer_id = c.id) as reviews_count,
    (SELECT COUNT(*) FROM public.shopping_cart sc WHERE sc.customer_id = c.id) as cart_items,
    (SELECT COUNT(*) FROM public.wishlist w WHERE w.customer_id = c.id) as wishlist_items,
    -- Customer status
    CASE 
        WHEN COUNT(o.id) = 0 THEN 'new'
        WHEN COUNT(o.id) = 1 THEN 'returning'
        WHEN COUNT(o.id) >= 5 AND SUM(o.total_amount) >= 1000 THEN 'vip'
        WHEN COUNT(o.id) >= 3 THEN 'loyal'
        ELSE 'regular'
    END as customer_status
FROM public.customers c
LEFT JOIN public.orders o ON c.id = o.customer_id AND o.status IN ('completed', 'shipped', 'delivered')
LEFT JOIN public.service_quotes sq ON c.id = sq.customer_id
GROUP BY c.id, c.first_name, c.last_name, c.email, c.created_at
ORDER BY total_spent DESC;
