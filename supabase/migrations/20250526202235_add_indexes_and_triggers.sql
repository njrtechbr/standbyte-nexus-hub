-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_brand_id ON products(brand_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);

CREATE INDEX IF NOT EXISTS idx_services_category_id ON services(category_id);
CREATE INDEX IF NOT EXISTS idx_services_status ON services(status);
CREATE INDEX IF NOT EXISTS idx_services_featured ON services(featured);
CREATE INDEX IF NOT EXISTS idx_services_created_at ON services(created_at);

CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_created_at ON customers(created_at);

CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

CREATE INDEX IF NOT EXISTS idx_service_quotes_customer_id ON service_quotes(customer_id);
CREATE INDEX IF NOT EXISTS idx_service_quotes_service_id ON service_quotes(service_id);
CREATE INDEX IF NOT EXISTS idx_service_quotes_status ON service_quotes(status);
CREATE INDEX IF NOT EXISTS idx_service_quotes_created_at ON service_quotes(created_at);

CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_service_id ON reviews(service_id);
CREATE INDEX IF NOT EXISTS idx_reviews_customer_id ON reviews(customer_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at);

CREATE INDEX IF NOT EXISTS idx_shopping_cart_customer_id ON shopping_cart(customer_id);
CREATE INDEX IF NOT EXISTS idx_shopping_cart_product_id ON shopping_cart(product_id);

CREATE INDEX IF NOT EXISTS idx_wishlist_customer_id ON wishlist(customer_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_product_id ON wishlist(product_id);

-- Add triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updated_at column
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON brands
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_quotes_updated_at BEFORE UPDATE ON service_quotes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add function to automatically calculate order totals
CREATE OR REPLACE FUNCTION calculate_order_total()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE orders 
    SET total_amount = (
        SELECT COALESCE(SUM(quantity * unit_price), 0)
        FROM order_items 
        WHERE order_id = COALESCE(NEW.order_id, OLD.order_id)
    )
    WHERE id = COALESCE(NEW.order_id, OLD.order_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

-- Apply trigger to order_items table
CREATE TRIGGER update_order_total_on_items_change
    AFTER INSERT OR UPDATE OR DELETE ON order_items
    FOR EACH ROW EXECUTE FUNCTION calculate_order_total();

-- Add function to update product average rating
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
    -- Update product rating when review is added/updated/deleted
    IF TG_OP = 'DELETE' THEN
        UPDATE products 
        SET average_rating = (
            SELECT COALESCE(AVG(rating::numeric), 0)
            FROM reviews 
            WHERE product_id = OLD.product_id AND status = 'approved'
        )
        WHERE id = OLD.product_id;
        RETURN OLD;
    ELSE
        UPDATE products 
        SET average_rating = (
            SELECT COALESCE(AVG(rating::numeric), 0)
            FROM reviews 
            WHERE product_id = NEW.product_id AND status = 'approved'
        )
        WHERE id = NEW.product_id;
        RETURN NEW;
    END IF;
END;
$$ language 'plpgsql';

-- Apply trigger to reviews table for products
CREATE TRIGGER update_product_rating_on_review_change
    AFTER INSERT OR UPDATE OR DELETE ON reviews
    FOR EACH ROW 
    WHEN (OLD.product_id IS NOT NULL OR NEW.product_id IS NOT NULL)
    EXECUTE FUNCTION update_product_rating();

-- Add function to update service average rating
CREATE OR REPLACE FUNCTION update_service_rating()
RETURNS TRIGGER AS $$
BEGIN
    -- Update service rating when review is added/updated/deleted
    IF TG_OP = 'DELETE' THEN
        UPDATE services 
        SET average_rating = (
            SELECT COALESCE(AVG(rating::numeric), 0)
            FROM reviews 
            WHERE service_id = OLD.service_id AND status = 'approved'
        )
        WHERE id = OLD.service_id;
        RETURN OLD;
    ELSE
        UPDATE services 
        SET average_rating = (
            SELECT COALESCE(AVG(rating::numeric), 0)
            FROM reviews 
            WHERE service_id = NEW.service_id AND status = 'approved'
        )
        WHERE id = NEW.service_id;
        RETURN NEW;
    END IF;
END;
$$ language 'plpgsql';

-- Apply trigger to reviews table for services
CREATE TRIGGER update_service_rating_on_review_change
    AFTER INSERT OR UPDATE OR DELETE ON reviews
    FOR EACH ROW 
    WHEN (OLD.service_id IS NOT NULL OR NEW.service_id IS NOT NULL)
    EXECUTE FUNCTION update_service_rating();
