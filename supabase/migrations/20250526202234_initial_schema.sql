-- ======================================
-- STANDBYTE NEXUS HUB - SUPABASE MIGRATION
-- Complete database schema for the platform
-- ======================================

-- 1. MAIN TABLES
-- ======================================

-- Products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    
    -- Pricing
    original_price DECIMAL(10,2) NOT NULL,
    sale_price DECIMAL(10,2) NOT NULL,
    discount INTEGER DEFAULT 0,
    
    -- Product Status
    in_stock BOOLEAN DEFAULT true,
    is_on_sale BOOLEAN DEFAULT false,
    is_free_shipping BOOLEAN DEFAULT false,
    
    -- Reviews and Rating
    rating DECIMAL(3,2) DEFAULT 0.00,
    reviews_count INTEGER DEFAULT 0,
    
    -- Product Details
    warranty VARCHAR(50),
    weight DECIMAL(8,3),
    dimensions JSON, -- {length, width, height}
    
    -- SEO and Media
    image_url TEXT,
    seo_title VARCHAR(255),
    seo_description TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product specifications
CREATE TABLE product_specifications (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    spec_name VARCHAR(100) NOT NULL,
    spec_value TEXT NOT NULL,
    spec_group VARCHAR(50), -- e.g., "Performance", "Conectividade", "Físico"
    display_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product gallery
CREATE TABLE product_gallery (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    is_primary BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product features
CREATE TABLE product_features (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    feature_text VARCHAR(255) NOT NULL,
    feature_type VARCHAR(50), -- e.g., "highlight", "technical", "benefit"
    display_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services table
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    full_description TEXT,
    category VARCHAR(100) NOT NULL,
    badge VARCHAR(50), -- e.g., "Mais Procurado", "Premium", "Especializado"
    
    -- Service Details
    duration VARCHAR(100), -- e.g., "3-7 dias úteis"
    warranty VARCHAR(100), -- e.g., "15 anos"
    
    -- Media
    image_url TEXT,
    
    -- SEO
    seo_title VARCHAR(255),
    seo_description TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service features
CREATE TABLE service_features (
    id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
    feature_text VARCHAR(255) NOT NULL,
    display_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service benefits
CREATE TABLE service_benefits (
    id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
    benefit_text VARCHAR(255) NOT NULL,
    display_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service process
CREATE TABLE service_process (
    id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
    step_description VARCHAR(255) NOT NULL,
    step_order INTEGER NOT NULL,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service gallery
CREATE TABLE service_gallery (
    id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    is_primary BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service projects
CREATE TABLE service_projects (
    id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    description TEXT,
    image_url TEXT NOT NULL,
    completion_date DATE,
    display_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    category_type VARCHAR(20) NOT NULL CHECK (category_type IN ('product', 'service')),
    icon_name VARCHAR(50), -- Nome do ícone Lucide React
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Brands
CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    logo_url TEXT,
    website_url TEXT,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customers
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    cpf_cnpj VARCHAR(18),
    customer_type VARCHAR(10) CHECK (customer_type IN ('person', 'company')),
    
    -- Company specific fields
    company_name VARCHAR(255),
    company_registration VARCHAR(20), -- CNPJ
    state_registration VARCHAR(20),
    
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customer addresses
CREATE TABLE customer_addresses (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
    address_type VARCHAR(20) DEFAULT 'shipping', -- shipping, billing, both
    
    -- Address fields
    street VARCHAR(255) NOT NULL,
    number VARCHAR(20) NOT NULL,
    complement VARCHAR(100),
    neighborhood VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(2) NOT NULL,
    postal_code VARCHAR(9) NOT NULL,
    country VARCHAR(50) DEFAULT 'Brasil',
    
    is_primary BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    
    -- Order Status
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN (
        'pending', 'confirmed', 'processing', 'shipped', 'delivered', 
        'cancelled', 'refunded'
    )),
    
    -- Pricing
    subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
    shipping_cost DECIMAL(10,2) NOT NULL DEFAULT 0,
    tax_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    discount_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    
    -- Shipping Information
    shipping_method VARCHAR(100),
    tracking_code VARCHAR(100),
    
    -- Address (snapshot at order time)
    shipping_address JSON NOT NULL,
    billing_address JSON,
    
    -- Payment
    payment_method VARCHAR(50),
    payment_status VARCHAR(20) DEFAULT 'pending',
    payment_reference VARCHAR(100),
    
    -- Notes
    customer_notes TEXT,
    admin_notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    shipped_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE
);

-- Order items
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id),
    
    -- Product snapshot at order time
    product_name VARCHAR(255) NOT NULL,
    product_sku VARCHAR(100),
    
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service quotes
CREATE TABLE service_quotes (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    service_id INTEGER REFERENCES services(id),
    
    -- Quote Details
    quote_number VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN (
        'pending', 'sent', 'approved', 'rejected', 'expired'
    )),
    
    -- Project Information
    project_title VARCHAR(255) NOT NULL,
    project_description TEXT,
    project_location VARCHAR(255),
    
    -- Pricing
    estimated_cost DECIMAL(10,2),
    final_cost DECIMAL(10,2),
    
    -- Timeline
    estimated_duration VARCHAR(100),
    start_date DATE,
    end_date DATE,
    
    -- Contact Information
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20),
    customer_company VARCHAR(255),
    
    -- Additional Information
    special_requirements TEXT,
    admin_notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    approved_at TIMESTAMP WITH TIME ZONE
);

-- Quote items
CREATE TABLE quote_items (
    id SERIAL PRIMARY KEY,
    quote_id INTEGER REFERENCES service_quotes(id) ON DELETE CASCADE,
    
    item_description VARCHAR(255) NOT NULL,
    item_type VARCHAR(50), -- material, labor, equipment, etc.
    quantity DECIMAL(10,3) NOT NULL DEFAULT 1,
    unit VARCHAR(20) DEFAULT 'un', -- un, m, m², h, etc.
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    
    notes TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    product_id INTEGER REFERENCES products(id),
    service_id INTEGER REFERENCES services(id),
    order_id INTEGER REFERENCES orders(id),
    
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    
    -- Review Status
    is_verified BOOLEAN DEFAULT false,
    is_approved BOOLEAN DEFAULT false,
    
    -- Helpful votes
    helpful_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure review is for either product OR service, not both
    CONSTRAINT check_review_target CHECK (
        (product_id IS NOT NULL AND service_id IS NULL) OR
        (product_id IS NULL AND service_id IS NOT NULL)
    )
);

-- Shopping cart
CREATE TABLE shopping_cart (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(customer_id, product_id)
);

-- Wishlist
CREATE TABLE wishlist (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(customer_id, product_id)
);

-- Contact messages
CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY,
    
    -- Contact Information
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    company VARCHAR(255),
    
    -- Message Details
    subject VARCHAR(255),
    message TEXT NOT NULL,
    message_type VARCHAR(50) DEFAULT 'general', -- general, support, quote, complaint
    
    -- Status
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN (
        'new', 'in_progress', 'resolved', 'closed'
    )),
    
    -- Admin fields
    assigned_to VARCHAR(255),
    admin_notes TEXT,
    
    -- Source
    source_page VARCHAR(255), -- URL da página de origem
    user_agent TEXT,
    ip_address INET,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- Newsletter subscriptions
CREATE TABLE newsletter_subscriptions (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN (
        'active', 'unsubscribed', 'bounced'
    )),
    
    subscription_source VARCHAR(100), -- website, checkout, manual
    tags TEXT[], -- Array de tags para segmentação
    
    -- Timestamps
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    unsubscribed_at TIMESTAMP WITH TIME ZONE,
    last_email_sent_at TIMESTAMP WITH TIME ZONE
);

-- Site settings
CREATE TABLE site_settings (
    id SERIAL PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type VARCHAR(20) DEFAULT 'text', -- text, number, boolean, json
    description TEXT,
    is_public BOOLEAN DEFAULT false, -- Se a configuração pode ser acessada publicamente
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Basic indexes for performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_site_settings_key ON site_settings(setting_key);

-- Initial data
INSERT INTO categories (name, slug, category_type, icon_name, display_order) VALUES
('Notebooks', 'notebooks', 'product', 'Laptop', 1),
('PCs Gamers', 'pcs-gamers', 'product', 'Monitor', 2),
('Placas de Vídeo', 'placas-video', 'product', 'Cpu', 3),
('Processadores', 'processadores', 'product', 'Zap', 4),
('Monitores', 'monitores', 'product', 'Monitor', 5),
('Armazenamento', 'armazenamento', 'product', 'HardDrive', 6),
('Periféricos', 'perifericos', 'product', 'Mouse', 7),
('Infraestrutura', 'infraestrutura', 'service', 'Network', 1),
('Segurança', 'seguranca', 'service', 'Shield', 2),
('Projetos', 'projetos', 'service', 'FileCheck', 3),
('Energia', 'energia', 'service', 'Zap', 4),
('TI Corporativo', 'ti-corporativo', 'service', 'Server', 5);

INSERT INTO brands (name, slug, description, is_active) VALUES
('Intel', 'intel', 'Processadores e tecnologias avançadas', true),
('AMD', 'amd', 'Processadores e placas gráficas de alta performance', true),
('NVIDIA', 'nvidia', 'Placas gráficas e tecnologias de IA', true),
('ASUS', 'asus', 'Motherboards, notebooks e periféricos', true),
('MSI', 'msi', 'Componentes gaming e workstation', true),
('Corsair', 'corsair', 'Memórias, fontes e periféricos gaming', true),
('Kingston', 'kingston', 'Memórias e armazenamento', true),
('Samsung', 'samsung', 'SSDs, monitores e componentes', true),
('LG', 'lg', 'Monitores e displays profissionais', true),
('Dell', 'dell', 'Notebooks, desktops e servidores', true);

INSERT INTO site_settings (setting_key, setting_value, setting_type, description, is_public) VALUES
('site_name', 'Standbyte Nexus Hub', 'text', 'Nome do site', true),
('site_description', 'Tecnologia que conecta o futuro', 'text', 'Descrição do site', true),
('contact_email', 'contato@standbyte.com.br', 'text', 'Email de contato', true),
('contact_phone', '(11) 99999-9999', 'text', 'Telefone de contato', true),
('contact_whatsapp', '5511999999999', 'text', 'WhatsApp para contato', true),
('free_shipping_threshold', '299.00', 'number', 'Valor mínimo para frete grátis', true),
('maintenance_mode', 'false', 'boolean', 'Modo de manutenção', false);