# Documento de Design do Banco de Dados - Standbyte Nexus Hub

## Visão Geral

Este documento apresenta o design completo do banco de dados para o projeto **Standbyte Nexus Hub**, uma plataforma de e-commerce e portfólio de serviços especializados em tecnologia da informação. O sistema suporta tanto vendas de produtos quanto prestação de serviços de TI.

## Arquitetura do Banco de Dados

### Plataforma: Supabase (PostgreSQL)
- **Banco:** PostgreSQL (versão 15+)
- **ORM/Client:** Supabase JavaScript Client
- **Autenticação:** Supabase Auth
- **Storage:** Supabase Storage para imagens e arquivos

---

## Estrutura das Tabelas

### 1. Tabela: `products`

Armazena informações completas dos produtos de informática.

```sql
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

-- Índices
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_in_stock ON products(in_stock);
CREATE INDEX idx_products_is_on_sale ON products(is_on_sale);
```

### 2. Tabela: `product_specifications`

Especificações técnicas detalhadas dos produtos.

```sql
CREATE TABLE product_specifications (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    spec_name VARCHAR(100) NOT NULL,
    spec_value TEXT NOT NULL,
    spec_group VARCHAR(50), -- e.g., "Performance", "Conectividade", "Físico"
    display_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_product_specs_product_id ON product_specifications(product_id);
CREATE INDEX idx_product_specs_group ON product_specifications(spec_group);
```

### 3. Tabela: `product_gallery`

Galeria de imagens dos produtos.

```sql
CREATE TABLE product_gallery (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    is_primary BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_product_gallery_product_id ON product_gallery(product_id);
CREATE INDEX idx_product_gallery_primary ON product_gallery(is_primary);
```

### 4. Tabela: `product_features`

Características e funcionalidades dos produtos.

```sql
CREATE TABLE product_features (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    feature_text VARCHAR(255) NOT NULL,
    feature_type VARCHAR(50), -- e.g., "highlight", "technical", "benefit"
    display_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_product_features_product_id ON product_features(product_id);
```

### 5. Tabela: `services`

Catálogo completo de serviços oferecidos pela empresa.

```sql
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

-- Índices
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_services_badge ON services(badge);
```

### 6. Tabela: `service_features`

Recursos e características incluídos em cada serviço.

```sql
CREATE TABLE service_features (
    id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
    feature_text VARCHAR(255) NOT NULL,
    display_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_service_features_service_id ON service_features(service_id);
```

### 7. Tabela: `service_benefits`

Benefícios e vantagens dos serviços.

```sql
CREATE TABLE service_benefits (
    id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
    benefit_text VARCHAR(255) NOT NULL,
    display_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_service_benefits_service_id ON service_benefits(service_id);
```

### 8. Tabela: `service_process`

Etapas do processo de execução dos serviços.

```sql
CREATE TABLE service_process (
    id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
    step_description VARCHAR(255) NOT NULL,
    step_order INTEGER NOT NULL,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_service_process_service_id ON service_process(service_id);
CREATE INDEX idx_service_process_order ON service_process(step_order);
```

### 9. Tabela: `service_gallery`

Galeria de imagens dos serviços.

```sql
CREATE TABLE service_gallery (
    id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    is_primary BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_service_gallery_service_id ON service_gallery(service_id);
```

### 10. Tabela: `service_projects`

Galeria de projetos realizados para cada serviço.

```sql
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

CREATE INDEX idx_service_projects_service_id ON service_projects(service_id);
CREATE INDEX idx_service_projects_completion ON service_projects(completion_date);
```

### 11. Tabela: `categories`

Categorias para produtos e serviços.

```sql
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

CREATE INDEX idx_categories_type ON categories(category_type);
CREATE INDEX idx_categories_active ON categories(is_active);
```

### 12. Tabela: `brands`

Marcas dos produtos.

```sql
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

CREATE INDEX idx_brands_active ON brands(is_active);
```

### 13. Tabela: `customers`

Informações dos clientes.

```sql
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

CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_auth_user ON customers(auth_user_id);
CREATE INDEX idx_customers_type ON customers(customer_type);
```

### 14. Tabela: `customer_addresses`

Endereços dos clientes.

```sql
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

CREATE INDEX idx_customer_addresses_customer_id ON customer_addresses(customer_id);
CREATE INDEX idx_customer_addresses_type ON customer_addresses(address_type);
```

### 15. Tabela: `orders`

Pedidos de produtos.

```sql
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

CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_number ON orders(order_number);
CREATE INDEX idx_orders_created_at ON orders(created_at);
```

### 16. Tabela: `order_items`

Itens dos pedidos.

```sql
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

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
```

### 17. Tabela: `service_quotes`

Orçamentos de serviços.

```sql
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

CREATE INDEX idx_service_quotes_customer_id ON service_quotes(customer_id);
CREATE INDEX idx_service_quotes_service_id ON service_quotes(service_id);
CREATE INDEX idx_service_quotes_status ON service_quotes(status);
CREATE INDEX idx_service_quotes_number ON service_quotes(quote_number);
```

### 18. Tabela: `quote_items`

Itens detalhados dos orçamentos.

```sql
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

CREATE INDEX idx_quote_items_quote_id ON quote_items(quote_id);
```

### 19. Tabela: `reviews`

Avaliações de produtos e serviços.

```sql
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

CREATE INDEX idx_reviews_customer_id ON reviews(customer_id);
CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_reviews_service_id ON reviews(service_id);
CREATE INDEX idx_reviews_approved ON reviews(is_approved);
```

### 20. Tabela: `shopping_cart`

Carrinho de compras dos usuários.

```sql
CREATE TABLE shopping_cart (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(customer_id, product_id)
);

CREATE INDEX idx_shopping_cart_customer_id ON shopping_cart(customer_id);
```

### 21. Tabela: `wishlist`

Lista de desejos dos usuários.

```sql
CREATE TABLE wishlist (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(customer_id, product_id)
);

CREATE INDEX idx_wishlist_customer_id ON wishlist(customer_id);
```

### 22. Tabela: `contact_messages`

Mensagens de contato do site.

```sql
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

CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_type ON contact_messages(message_type);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at);
```

### 23. Tabela: `newsletter_subscriptions`

Assinantes da newsletter.

```sql
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

CREATE INDEX idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX idx_newsletter_status ON newsletter_subscriptions(status);
```

### 24. Tabela: `site_settings`

Configurações do site.

```sql
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

CREATE INDEX idx_site_settings_key ON site_settings(setting_key);
CREATE INDEX idx_site_settings_public ON site_settings(is_public);
```

---

## Views Úteis

### 1. View: `product_details_view`

Visão completa dos produtos com especificações e imagens.

```sql
CREATE VIEW product_details_view AS
SELECT 
    p.*,
    c.name as category_name,
    b.name as brand_name,
    b.logo_url as brand_logo,
    
    -- Aggregate specifications
    (
        SELECT json_agg(
            json_build_object(
                'name', spec_name,
                'value', spec_value,
                'group', spec_group
            ) ORDER BY spec_group, display_order
        )
        FROM product_specifications ps 
        WHERE ps.product_id = p.id
    ) as specifications,
    
    -- Aggregate gallery
    (
        SELECT json_agg(
            json_build_object(
                'url', image_url,
                'alt', alt_text,
                'is_primary', is_primary
            ) ORDER BY display_order
        )
        FROM product_gallery pg 
        WHERE pg.product_id = p.id
    ) as gallery,
    
    -- Aggregate features
    (
        SELECT json_agg(feature_text ORDER BY display_order)
        FROM product_features pf 
        WHERE pf.product_id = p.id
    ) as features

FROM products p
LEFT JOIN categories c ON p.category = c.name AND c.category_type = 'product'
LEFT JOIN brands b ON p.brand = b.name;
```

### 2. View: `service_details_view`

Visão completa dos serviços com todos os detalhes.

```sql
CREATE VIEW service_details_view AS
SELECT 
    s.*,
    c.name as category_name,
    c.icon_name as category_icon,
    
    -- Aggregate features
    (
        SELECT json_agg(feature_text ORDER BY display_order)
        FROM service_features sf 
        WHERE sf.service_id = s.id
    ) as features,
    
    -- Aggregate benefits
    (
        SELECT json_agg(benefit_text ORDER BY display_order)
        FROM service_benefits sb 
        WHERE sb.service_id = s.id
    ) as benefits,
    
    -- Aggregate process steps
    (
        SELECT json_agg(step_description ORDER BY step_order)
        FROM service_process sp 
        WHERE sp.service_id = s.id
    ) as process_steps,
    
    -- Aggregate gallery
    (
        SELECT json_agg(
            json_build_object(
                'url', image_url,
                'alt', alt_text,
                'is_primary', is_primary
            ) ORDER BY display_order
        )
        FROM service_gallery sg 
        WHERE sg.service_id = s.id
    ) as gallery,
    
    -- Aggregate projects
    (
        SELECT json_agg(
            json_build_object(
                'id', id,
                'title', title,
                'location', location,
                'description', description,
                'image_url', image_url,
                'completion_date', completion_date
            ) ORDER BY display_order
        )
        FROM service_projects sp 
        WHERE sp.service_id = s.id
    ) as projects

FROM services s
LEFT JOIN categories c ON s.category = c.name AND c.category_type = 'service';
```

---

## Políticas de Segurança (RLS - Row Level Security)

### Produtos e Serviços (Público)
```sql
-- Produtos são públicos para leitura
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);

-- Serviços são públicos para leitura  
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Services are viewable by everyone" ON services FOR SELECT USING (true);
```

### Dados do Cliente (Privado)
```sql
-- Clientes só podem ver seus próprios dados
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own customer data" ON customers FOR SELECT USING (auth.uid() = auth_user_id);
CREATE POLICY "Users can update own customer data" ON customers FOR UPDATE USING (auth.uid() = auth_user_id);

-- Endereços dos clientes
ALTER TABLE customer_addresses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own addresses" ON customer_addresses FOR ALL USING (
    customer_id IN (SELECT id FROM customers WHERE auth_user_id = auth.uid())
);
```

### Pedidos e Carrinho
```sql
-- Pedidos privados por cliente
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (
    customer_id IN (SELECT id FROM customers WHERE auth_user_id = auth.uid())
);

-- Carrinho privado por cliente
ALTER TABLE shopping_cart ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own cart" ON shopping_cart FOR ALL USING (
    customer_id IN (SELECT id FROM customers WHERE auth_user_id = auth.uid())
);
```

---

## Triggers e Funções

### 1. Atualização automática de timestamps
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar a produtos
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Aplicar a serviços
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Aplicar a clientes
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Aplicar a pedidos
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 2. Geração automática de números de pedido
```sql
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.order_number = 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(nextval('order_number_seq')::text, 4, '0');
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE SEQUENCE order_number_seq START 1;

CREATE TRIGGER set_order_number BEFORE INSERT ON orders
    FOR EACH ROW EXECUTE FUNCTION generate_order_number();
```

### 3. Atualização automática de rating dos produtos
```sql
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE products 
    SET 
        rating = (
            SELECT COALESCE(AVG(rating), 0) 
            FROM reviews 
            WHERE product_id = COALESCE(NEW.product_id, OLD.product_id) 
            AND is_approved = true
        ),
        reviews_count = (
            SELECT COUNT(*) 
            FROM reviews 
            WHERE product_id = COALESCE(NEW.product_id, OLD.product_id) 
            AND is_approved = true
        )
    WHERE id = COALESCE(NEW.product_id, OLD.product_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

CREATE TRIGGER update_product_rating_trigger
    AFTER INSERT OR UPDATE OR DELETE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_product_rating();
```

---

## Configurações Iniciais

### 1. Categorias de Produtos
```sql
INSERT INTO categories (name, slug, category_type, icon_name, display_order) VALUES
('Notebooks', 'notebooks', 'product', 'Laptop', 1),
('PCs Gamers', 'pcs-gamers', 'product', 'Monitor', 2),
('Placas de Vídeo', 'placas-video', 'product', 'Cpu', 3),
('Processadores', 'processadores', 'product', 'Zap', 4),
('Monitores', 'monitores', 'product', 'Monitor', 5),
('Armazenamento', 'armazenamento', 'product', 'HardDrive', 6),
('Periféricos', 'perifericos', 'product', 'Mouse', 7);
```

### 2. Categorias de Serviços
```sql
INSERT INTO categories (name, slug, category_type, icon_name, display_order) VALUES
('Infraestrutura', 'infraestrutura', 'service', 'Network', 1),
('Segurança', 'seguranca', 'service', 'Shield', 2),
('Projetos', 'projetos', 'service', 'FileCheck', 3),
('Energia', 'energia', 'service', 'Zap', 4),
('TI Corporativo', 'ti-corporativo', 'service', 'Server', 5);
```

### 3. Configurações do Site
```sql
INSERT INTO site_settings (setting_key, setting_value, setting_type, description, is_public) VALUES
('site_name', 'Standbyte Nexus Hub', 'text', 'Nome do site', true),
('site_description', 'Tecnologia que conecta o futuro', 'text', 'Descrição do site', true),
('contact_email', 'contato@standbyte.com.br', 'text', 'Email de contato', true),
('contact_phone', '(11) 99999-9999', 'text', 'Telefone de contato', true),
('contact_whatsapp', '5511999999999', 'text', 'WhatsApp para contato', true),
('free_shipping_threshold', '299.00', 'number', 'Valor mínimo para frete grátis', true),
('maintenance_mode', 'false', 'boolean', 'Modo de manutenção', false);
```

---

## Considerações de Performance

### 1. Índices Adicionais para Consultas Frequentes
```sql
-- Busca de produtos
CREATE INDEX idx_products_search ON products USING gin(to_tsvector('portuguese', name || ' ' || description));
CREATE INDEX idx_products_price_range ON products(sale_price);

-- Busca de serviços
CREATE INDEX idx_services_search ON services USING gin(to_tsvector('portuguese', title || ' ' || description));

-- Consultas de pedidos por período
CREATE INDEX idx_orders_date_range ON orders(created_at, status);
```

### 2. Particionamento (Para grandes volumes)
```sql
-- Particionamento de pedidos por mês (quando necessário)
-- CREATE TABLE orders_y2024m01 PARTITION OF orders
-- FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
```

---

## Migração e Deploy

### 1. Scripts de Migração
Os scripts SQL devem ser executados na seguinte ordem:
1. Criação de tabelas principais
2. Criação de tabelas de relacionamento
3. Índices e constraints
4. Views
5. Políticas de segurança (RLS)
6. Triggers e funções
7. Dados iniciais

### 2. Backup e Restore
```sql
-- Backup
pg_dump standbyte_db > backup_$(date +%Y%m%d_%H%M%S).sql

-- Restore
psql standbyte_db < backup_file.sql
```

---

## Monitoramento e Manutenção

### 1. Consultas de Monitoramento
```sql
-- Performance das consultas mais lentas
SELECT query, mean_time, calls 
FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 10;

-- Tamanho das tabelas
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### 2. Limpeza Automática
```sql
-- Limpeza de carrinho abandonado (mais de 30 dias)
DELETE FROM shopping_cart 
WHERE updated_at < NOW() - INTERVAL '30 days';

-- Limpeza de tokens expirados (Supabase gerencia automaticamente)
```

---

Este documento serve como guia completo para implementação e manutenção do banco de dados da plataforma Standbyte Nexus Hub, garantindo escalabilidade, performance e segurança dos dados.
