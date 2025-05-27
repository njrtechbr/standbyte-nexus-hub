-- Enable Row Level Security (RLS) policies for Standbyte Nexus Hub

-- Enable RLS on all tables that need access control
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shopping_cart ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_items ENABLE ROW LEVEL SECURITY;

-- Customer policies - customers can only access their own data
CREATE POLICY "Customers can view own profile" ON public.customers
    FOR SELECT USING (auth.uid() = auth_user_id);

CREATE POLICY "Customers can update own profile" ON public.customers
    FOR UPDATE USING (auth.uid() = auth_user_id);

CREATE POLICY "Anyone can insert customer" ON public.customers
    FOR INSERT WITH CHECK (auth.uid() = auth_user_id);

-- Customer addresses policies
CREATE POLICY "Customers can view own addresses" ON public.customer_addresses
    FOR SELECT USING (
        customer_id IN (
            SELECT id FROM public.customers WHERE auth_user_id = auth.uid()
        )
    );

CREATE POLICY "Customers can insert own addresses" ON public.customer_addresses
    FOR INSERT WITH CHECK (
        customer_id IN (
            SELECT id FROM public.customers WHERE auth_user_id = auth.uid()
        )
    );

CREATE POLICY "Customers can update own addresses" ON public.customer_addresses
    FOR UPDATE USING (
        customer_id IN (
            SELECT id FROM public.customers WHERE auth_user_id = auth.uid()
        )
    );

CREATE POLICY "Customers can delete own addresses" ON public.customer_addresses
    FOR DELETE USING (
        customer_id IN (
            SELECT id FROM public.customers WHERE auth_user_id = auth.uid()
        )
    );

-- Shopping cart policies
CREATE POLICY "Customers can view own cart" ON public.shopping_cart
    FOR SELECT USING (
        customer_id IN (
            SELECT id FROM public.customers WHERE auth_user_id = auth.uid()
        )
    );

CREATE POLICY "Customers can insert into own cart" ON public.shopping_cart
    FOR INSERT WITH CHECK (
        customer_id IN (
            SELECT id FROM public.customers WHERE auth_user_id = auth.uid()
        )
    );

CREATE POLICY "Customers can update own cart" ON public.shopping_cart
    FOR UPDATE USING (
        customer_id IN (
            SELECT id FROM public.customers WHERE auth_user_id = auth.uid()
        )
    );

CREATE POLICY "Customers can delete from own cart" ON public.shopping_cart
    FOR DELETE USING (
        customer_id IN (
            SELECT id FROM public.customers WHERE auth_user_id = auth.uid()
        )
    );

-- Wishlist policies
CREATE POLICY "Customers can view own wishlist" ON public.wishlist
    FOR SELECT USING (
        customer_id IN (
            SELECT id FROM public.customers WHERE auth_user_id = auth.uid()
        )
    );

CREATE POLICY "Customers can insert into own wishlist" ON public.wishlist
    FOR INSERT WITH CHECK (
        customer_id IN (
            SELECT id FROM public.customers WHERE auth_user_id = auth.uid()
        )
    );

CREATE POLICY "Customers can delete from own wishlist" ON public.wishlist
    FOR DELETE USING (
        customer_id IN (
            SELECT id FROM public.customers WHERE auth_user_id = auth.uid()
        )
    );

-- Orders policies
CREATE POLICY "Customers can view own orders" ON public.orders
    FOR SELECT USING (
        customer_id IN (
            SELECT id FROM public.customers WHERE auth_user_id = auth.uid()
        )
    );

CREATE POLICY "Customers can insert own orders" ON public.orders
    FOR INSERT WITH CHECK (
        customer_id IN (
            SELECT id FROM public.customers WHERE auth_user_id = auth.uid()
        )
    );

-- Order items policies
CREATE POLICY "Customers can view own order items" ON public.order_items
    FOR SELECT USING (
        order_id IN (
            SELECT id FROM public.orders 
            WHERE customer_id IN (
                SELECT id FROM public.customers WHERE auth_user_id = auth.uid()
            )
        )
    );

CREATE POLICY "Customers can insert own order items" ON public.order_items
    FOR INSERT WITH CHECK (
        order_id IN (
            SELECT id FROM public.orders 
            WHERE customer_id IN (
                SELECT id FROM public.customers WHERE auth_user_id = auth.uid()
            )
        )
    );

-- Reviews policies
CREATE POLICY "Anyone can view approved reviews" ON public.reviews
    FOR SELECT USING (status = 'approved');

CREATE POLICY "Customers can insert own reviews" ON public.reviews
    FOR INSERT WITH CHECK (
        customer_id IN (
            SELECT id FROM public.customers WHERE auth_user_id = auth.uid()
        )
    );

CREATE POLICY "Customers can view own reviews" ON public.reviews
    FOR SELECT USING (
        customer_id IN (
            SELECT id FROM public.customers WHERE auth_user_id = auth.uid()
        )
    );

CREATE POLICY "Customers can update own reviews" ON public.reviews
    FOR UPDATE USING (
        customer_id IN (
            SELECT id FROM public.customers WHERE auth_user_id = auth.uid()
        )
    );

-- Service quotes policies
CREATE POLICY "Customers can view own quotes" ON public.service_quotes
    FOR SELECT USING (
        customer_id IN (
            SELECT id FROM public.customers WHERE auth_user_id = auth.uid()
        )
    );

CREATE POLICY "Customers can insert own quotes" ON public.service_quotes
    FOR INSERT WITH CHECK (
        customer_id IN (
            SELECT id FROM public.customers WHERE auth_user_id = auth.uid()
        )
    );

CREATE POLICY "Customers can update own quotes" ON public.service_quotes
    FOR UPDATE USING (
        customer_id IN (
            SELECT id FROM public.customers WHERE auth_user_id = auth.uid()
        )
    );

-- Quote items policies
CREATE POLICY "Customers can view own quote items" ON public.quote_items
    FOR SELECT USING (
        quote_id IN (
            SELECT id FROM public.service_quotes 
            WHERE customer_id IN (
                SELECT id FROM public.customers WHERE auth_user_id = auth.uid()
            )
        )
    );

CREATE POLICY "Customers can insert own quote items" ON public.quote_items
    FOR INSERT WITH CHECK (
        quote_id IN (
            SELECT id FROM public.service_quotes 
            WHERE customer_id IN (
                SELECT id FROM public.customers WHERE auth_user_id = auth.uid()
            )
        )
    );

-- Public read access for catalog data (products, services, categories, brands)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_process ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to catalog data
CREATE POLICY "Anyone can view active products" ON public.products
    FOR SELECT USING (status = 'active');

CREATE POLICY "Anyone can view active services" ON public.services
    FOR SELECT USING (status = 'active');

CREATE POLICY "Anyone can view active categories" ON public.categories
    FOR SELECT USING (status = 'active');

CREATE POLICY "Anyone can view active brands" ON public.brands
    FOR SELECT USING (status = 'active');

CREATE POLICY "Anyone can view product specifications" ON public.product_specifications
    FOR SELECT USING (
        product_id IN (SELECT id FROM public.products WHERE status = 'active')
    );

CREATE POLICY "Anyone can view product gallery" ON public.product_gallery
    FOR SELECT USING (
        product_id IN (SELECT id FROM public.products WHERE status = 'active')
    );

CREATE POLICY "Anyone can view product features" ON public.product_features
    FOR SELECT USING (
        product_id IN (SELECT id FROM public.products WHERE status = 'active')
    );

CREATE POLICY "Anyone can view service features" ON public.service_features
    FOR SELECT USING (
        service_id IN (SELECT id FROM public.services WHERE status = 'active')
    );

CREATE POLICY "Anyone can view service benefits" ON public.service_benefits
    FOR SELECT USING (
        service_id IN (SELECT id FROM public.services WHERE status = 'active')
    );

CREATE POLICY "Anyone can view service process" ON public.service_process
    FOR SELECT USING (
        service_id IN (SELECT id FROM public.services WHERE status = 'active')
    );

CREATE POLICY "Anyone can view service gallery" ON public.service_gallery
    FOR SELECT USING (
        service_id IN (SELECT id FROM public.services WHERE status = 'active')
    );

CREATE POLICY "Anyone can view service projects" ON public.service_projects
    FOR SELECT USING (
        service_id IN (SELECT id FROM public.services WHERE status = 'active')
    );

CREATE POLICY "Anyone can view site settings" ON public.site_settings
    FOR SELECT USING (true);

-- Contact and newsletter policies
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert contact messages" ON public.contact_messages
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can insert newsletter subscriptions" ON public.newsletter_subscriptions
    FOR INSERT WITH CHECK (true);

-- Allow customers to view their own contact messages
CREATE POLICY "Customers can view own contact messages" ON public.contact_messages
    FOR SELECT USING (
        email IN (
            SELECT email FROM public.customers WHERE auth_user_id = auth.uid()
        )
    );

-- Allow customers to view their own newsletter subscriptions
CREATE POLICY "Customers can view own newsletter subscriptions" ON public.newsletter_subscriptions
    FOR SELECT USING (
        email IN (
            SELECT email FROM public.customers WHERE auth_user_id = auth.uid()
        )
    );

CREATE POLICY "Customers can update own newsletter subscriptions" ON public.newsletter_subscriptions
    FOR UPDATE USING (
        email IN (
            SELECT email FROM public.customers WHERE auth_user_id = auth.uid()
        )
    );
