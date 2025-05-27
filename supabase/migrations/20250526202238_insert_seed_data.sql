-- Seed data for Standbyte Nexus Hub
-- Products and Services sample data

-- Insert sample products
INSERT INTO public.products (
    name, description, short_description, price, sale_price, sku, 
    stock_quantity, category_id, brand_id, status, featured, weight, 
    dimensions, meta_title, meta_description, slug
) VALUES 
-- Gaming Laptops
(
    'Legion Pro 7i RTX 4080', 
    'High-performance gaming laptop with Intel Core i9 processor and RTX 4080 graphics card. Perfect for gaming, content creation, and professional workloads. Features a 16-inch display with 165Hz refresh rate.',
    'Ultimate gaming performance with RTX 4080 and i9 processor',
    2899.99, 2699.99, 'LEGION-PRO-7I-4080',
    15, 1, 1, 'active', true, 2.5,
    '35.7 x 26.2 x 2.2 cm',
    'Legion Pro 7i Gaming Laptop RTX 4080 - High Performance Gaming',
    'Discover the Legion Pro 7i with RTX 4080 graphics and Intel i9 processor. Ultimate gaming laptop for enthusiasts.',
    'legion-pro-7i-rtx-4080'
),
(
    'ROG Strix G16 RTX 4070', 
    'ASUS Republic of Gamers laptop designed for serious gaming. Features AMD Ryzen 9 processor and RTX 4070 graphics with advanced cooling system.',
    'ROG gaming laptop with RTX 4070 and Ryzen 9 power',
    2299.99, NULL, 'ROG-STRIX-G16-4070',
    8, 1, 2, 'active', true, 2.3,
    '35.4 x 25.2 x 2.34 cm',
    'ASUS ROG Strix G16 Gaming Laptop RTX 4070',
    'Experience gaming excellence with ROG Strix G16 featuring RTX 4070 and AMD Ryzen 9 processor.',
    'rog-strix-g16-rtx-4070'
),
-- Business Laptops
(
    'ThinkPad X1 Carbon Gen 11', 
    'Ultra-lightweight business laptop with Intel 13th gen processors. Perfect for professionals who need portability without compromising performance.',
    'Premium business ultrabook with 13th gen Intel',
    1899.99, 1799.99, 'THINKPAD-X1-CARBON-11',
    20, 2, 1, 'active', false, 1.12,
    '31.5 x 22.1 x 1.55 cm',
    'ThinkPad X1 Carbon Gen 11 Business Laptop',
    'Professional ultrabook with cutting-edge performance and legendary ThinkPad reliability.',
    'thinkpad-x1-carbon-gen-11'
),
(
    'EliteBook 850 G10', 
    'HP business laptop with enterprise security features and long battery life. Designed for modern business needs.',
    'Secure business laptop with enterprise features',
    1599.99, NULL, 'ELITEBOOK-850-G10',
    12, 2, 3, 'active', false, 1.46,
    '32.2 x 21.4 x 1.79 cm',
    'HP EliteBook 850 G10 Business Laptop',
    'Enterprise-grade laptop with advanced security and performance for business professionals.',
    'elitebook-850-g10'
),
-- Gaming Desktops
(
    'Predator Orion 7000', 
    'High-end gaming desktop with latest Intel processors and RTX 40 series graphics. Features advanced liquid cooling and RGB lighting.',
    'Ultimate gaming desktop with liquid cooling',
    3499.99, 3299.99, 'PREDATOR-ORION-7000',
    5, 3, 2, 'active', true, 15.2,
    '20.5 x 46 x 48 cm',
    'Acer Predator Orion 7000 Gaming Desktop',
    'Ultimate gaming performance with RTX graphics and advanced cooling in the Predator Orion 7000.',
    'predator-orion-7000'
),
-- Business Workstations
(
    'ThinkStation P360 Ultra', 
    'Compact workstation for professional content creation and CAD work. Features professional graphics and ISV certifications.',
    'Professional workstation in ultra-compact form',
    2199.99, NULL, 'THINKSTATION-P360-ULTRA',
    7, 4, 1, 'active', false, 3.9,
    '21.5 x 9.5 x 17.9 cm',
    'Lenovo ThinkStation P360 Ultra Workstation',
    'Professional compact workstation for content creation and CAD applications.',
    'thinkstation-p360-ultra'
),
-- Monitors
(
    'ROG Swift PG32UQX', 
    '32-inch 4K HDR gaming monitor with Mini LED technology and 144Hz refresh rate. Perfect for gaming and content creation.',
    '32" 4K HDR gaming monitor with Mini LED',
    2999.99, 2799.99, 'ROG-SWIFT-PG32UQX',
    10, 5, 2, 'active', true, 9.8,
    '72.8 x 51.2 x 28.5 cm',
    'ASUS ROG Swift PG32UQX 32" 4K Gaming Monitor',
    'Premium 4K HDR gaming monitor with Mini LED technology and 144Hz for ultimate visual experience.',
    'rog-swift-pg32uqx'
),
(
    'ThinkVision P27h-30', 
    '27-inch business monitor with USB-C connectivity and ergonomic design. Perfect for professional work environments.',
    '27" business monitor with USB-C hub',
    449.99, 399.99, 'THINKVISION-P27H-30',
    25, 5, 1, 'active', false, 6.2,
    '61.1 x 54.4 x 22.5 cm',
    'Lenovo ThinkVision P27h-30 Business Monitor',
    'Professional 27-inch monitor with USB-C connectivity for modern office environments.',
    'thinkvision-p27h-30'
),
-- Peripherals
(
    'MX Master 3S Wireless Mouse', 
    'Advanced wireless mouse for productivity with precision tracking and customizable buttons. Perfect for professionals.',
    'Premium wireless mouse for productivity',
    99.99, 89.99, 'MX-MASTER-3S',
    50, 6, 4, 'active', false, 0.141,
    '12.4 x 8.4 x 5.1 cm',
    'Logitech MX Master 3S Wireless Mouse',
    'Advanced wireless mouse with precision tracking and productivity features.',
    'mx-master-3s-wireless-mouse'
),
(
    'MX Keys S Wireless Keyboard', 
    'Premium wireless keyboard with smart illumination and comfortable typing experience. Designed for productivity.',
    'Premium wireless keyboard with smart backlighting',
    119.99, NULL, 'MX-KEYS-S',
    35, 6, 4, 'active', false, 0.81,
    '43 x 13.2 x 2.08 cm',
    'Logitech MX Keys S Wireless Keyboard',
    'Premium wireless keyboard with smart illumination for enhanced productivity.',
    'mx-keys-s-wireless-keyboard'
);

-- Insert sample product specifications
INSERT INTO public.product_specifications (product_id, spec_name, spec_value, spec_group, sort_order) VALUES
-- Legion Pro 7i specifications
(1, 'Processor', 'Intel Core i9-13900HX', 'Performance', 1),
(1, 'Graphics', 'NVIDIA RTX 4080 16GB', 'Performance', 2),
(1, 'Memory', '32GB DDR5-5600', 'Performance', 3),
(1, 'Storage', '1TB SSD PCIe 4.0', 'Storage', 1),
(1, 'Display', '16" WQXGA IPS 165Hz', 'Display', 1),
(1, 'Resolution', '2560 x 1600', 'Display', 2),
(1, 'Battery', '99.99Wh', 'Power', 1),
(1, 'OS', 'Windows 11 Home', 'Software', 1),

-- ROG Strix G16 specifications
(2, 'Processor', 'AMD Ryzen 9 7940HS', 'Performance', 1),
(2, 'Graphics', 'NVIDIA RTX 4070 8GB', 'Performance', 2),
(2, 'Memory', '16GB DDR5-4800', 'Performance', 3),
(2, 'Storage', '512GB SSD PCIe 4.0', 'Storage', 1),
(2, 'Display', '16" FHD IPS 165Hz', 'Display', 1),
(2, 'Resolution', '1920 x 1080', 'Display', 2),
(2, 'Battery', '90Wh', 'Power', 1),
(2, 'OS', 'Windows 11 Home', 'Software', 1),

-- ThinkPad X1 Carbon specifications
(3, 'Processor', 'Intel Core i7-1365U', 'Performance', 1),
(3, 'Graphics', 'Intel Iris Xe', 'Performance', 2),
(3, 'Memory', '16GB LPDDR5', 'Performance', 3),
(3, 'Storage', '512GB SSD PCIe 4.0', 'Storage', 1),
(3, 'Display', '14" WUXGA IPS', 'Display', 1),
(3, 'Resolution', '1920 x 1200', 'Display', 2),
(3, 'Battery', '57Wh', 'Power', 1),
(3, 'OS', 'Windows 11 Pro', 'Software', 1);

-- Insert sample product features
INSERT INTO public.product_features (product_id, feature_name, feature_description, sort_order) VALUES
-- Legion Pro 7i features
(1, 'Legion Coldfront 5.0', 'Advanced cooling system with quad-channel airflow', 1),
(1, 'RGB Lighting', 'Customizable RGB keyboard and chassis lighting', 2),
(1, 'Dolby Atmos', 'Immersive 3D audio experience', 3),
(1, 'Rapid Charge Pro', 'Fast charging technology for extended gaming', 4),

-- ROG Strix G16 features
(2, 'Intelligent Cooling', 'ROG Intelligent Cooling with liquid metal', 1),
(2, 'Aura Sync RGB', 'Synchronized RGB lighting effects', 2),
(2, 'MUX Switch', 'Hardware switch for optimized gaming performance', 3),
(2, 'WiFi 6E', 'Latest wireless connectivity standard', 4),

-- ThinkPad X1 Carbon features
(3, 'Carbon Fiber Body', 'Lightweight and durable carbon fiber construction', 1),
(3, 'ThinkShield Security', 'Enterprise-grade security features', 2),
(3, 'Rapid Charge', 'Fast charging for all-day productivity', 3),
(3, 'Dolby Voice', 'Enhanced audio for video conferencing', 4);

-- Insert sample product gallery images
INSERT INTO public.product_gallery (product_id, image_url, alt_text, sort_order) VALUES
-- Legion Pro 7i gallery
(1, 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800', 'Legion Pro 7i Front View', 1),
(1, 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800', 'Legion Pro 7i Keyboard Detail', 2),
(1, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800', 'Legion Pro 7i Side Profile', 3),

-- ROG Strix G16 gallery
(2, 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800', 'ROG Strix G16 Main View', 1),
(2, 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800', 'ROG Strix G16 RGB Lighting', 2),

-- ThinkPad X1 Carbon gallery
(3, 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800', 'ThinkPad X1 Carbon Professional', 1),
(3, 'https://images.unsplash.com/photo-1524673450103-ad5cff90f40c?w=800', 'ThinkPad X1 Carbon Ultrabook', 2);

-- Insert sample services
INSERT INTO public.services (
    title, description, short_description, price_type, base_price, 
    category_id, status, featured, duration_estimate, complexity_level,
    meta_title, meta_description, slug
) VALUES 
(
    'Custom PC Building',
    'Professional custom PC building service tailored to your specific needs. We select the best components based on your budget and requirements, ensuring optimal performance and compatibility. Includes cable management, stress testing, and warranty coverage.',
    'Professional custom PC building with expert component selection',
    'fixed', 299.99, 7, 'active', true, '2-3 days', 'intermediate',
    'Custom PC Building Service - Professional Assembly',
    'Expert custom PC building service with component selection, assembly, and testing.',
    'custom-pc-building'
),
(
    'Laptop Repair & Diagnostics',
    'Comprehensive laptop repair service including hardware diagnostics, component replacement, and software troubleshooting. We handle all major brands and provide warranty on repairs.',
    'Complete laptop repair service with diagnostics and warranty',
    'hourly', 89.99, 8, 'active', true, '1-5 days', 'intermediate',
    'Laptop Repair Service - Expert Diagnostics & Repair',
    'Professional laptop repair service with comprehensive diagnostics and warranty coverage.',
    'laptop-repair-diagnostics'
),
(
    'Network Setup & Configuration',
    'Professional network setup for homes and small businesses. Includes router configuration, WiFi optimization, security setup, and device connectivity.',
    'Professional network setup with security and optimization',
    'fixed', 199.99, 9, 'active', true, '1 day', 'beginner',
    'Network Setup Service - Home & Business Networking',
    'Professional network setup and configuration for optimal connectivity and security.',
    'network-setup-configuration'
),
(
    'Data Recovery Service',
    'Advanced data recovery from damaged or corrupted storage devices. We handle hard drives, SSDs, USB drives, and memory cards with high success rates.',
    'Professional data recovery from all storage devices',
    'quote', 149.99, 8, 'active', false, '3-7 days', 'advanced',
    'Data Recovery Service - Professional File Recovery',
    'Expert data recovery service for damaged storage devices with high success rates.',
    'data-recovery-service'
),
(
    'System Optimization & Cleanup',
    'Comprehensive system optimization service to improve performance, remove malware, and optimize startup processes. Includes software updates and maintenance tips.',
    'Complete system optimization and performance tuning',
    'fixed', 79.99, 8, 'active', false, '2-4 hours', 'beginner',
    'System Optimization Service - PC Performance Tuning',
    'Professional system optimization to improve performance and remove unwanted software.',
    'system-optimization-cleanup'
),
(
    'Gaming PC Consultation',
    'Expert consultation for gaming PC builds and upgrades. We analyze your gaming needs, budget, and preferences to recommend the perfect setup.',
    'Expert gaming PC consultation and recommendations',
    'hourly', 59.99, 10, 'active', true, '1-2 hours', 'beginner',
    'Gaming PC Consultation - Expert Build Recommendations',
    'Professional gaming PC consultation with personalized build recommendations.',
    'gaming-pc-consultation'
);

-- Insert sample service features
INSERT INTO public.service_features (service_id, feature_name, feature_description, sort_order) VALUES
-- Custom PC Building features
(1, 'Component Selection', 'Expert selection of compatible, high-performance components', 1),
(1, 'Professional Assembly', 'Clean cable management and optimal airflow design', 2),
(1, 'Stress Testing', 'Comprehensive testing to ensure stability and performance', 3),
(1, '1-Year Warranty', 'Full warranty coverage on assembly and labor', 4),

-- Laptop Repair features
(2, 'Free Diagnostics', 'Comprehensive hardware and software diagnostics', 1),
(2, 'Genuine Parts', 'Use of original manufacturer parts when available', 2),
(2, 'Data Preservation', 'Safe repair process that protects your important data', 3),
(2, '90-Day Warranty', 'Warranty coverage on all repair work', 4),

-- Network Setup features
(3, 'Security Configuration', 'WPA3 encryption and firewall setup', 1),
(3, 'WiFi Optimization', 'Channel optimization for best performance', 2),
(3, 'Device Setup', 'Configuration of all your connected devices', 3),
(3, 'Documentation', 'Complete network documentation and passwords', 4);

-- Insert sample service benefits
INSERT INTO public.service_benefits (service_id, benefit_title, benefit_description, sort_order) VALUES
-- Custom PC Building benefits
(1, 'Optimized Performance', 'Get the best performance for your specific use case and budget', 1),
(1, 'Quality Assurance', 'Professional assembly ensures reliability and longevity', 2),
(1, 'Cost Savings', 'Avoid compatibility issues and get better value than pre-built systems', 3),
(1, 'Expert Support', 'Ongoing technical support and upgrade recommendations', 4),

-- Laptop Repair benefits
(2, 'Cost Effective', 'Much cheaper than buying a new laptop', 1),
(2, 'Data Safety', 'Keep all your important files and settings', 2),
(2, 'Extended Lifespan', 'Professional repairs can extend your laptop life for years', 3),
(2, 'Environmental Impact', 'Reduce electronic waste by repairing instead of replacing', 4),

-- Network Setup benefits
(3, 'Improved Speed', 'Optimized network configuration for maximum speed', 1),
(3, 'Enhanced Security', 'Professional security setup protects against threats', 2),
(3, 'Seamless Connectivity', 'All devices work perfectly together', 3),
(3, 'Future Ready', 'Setup designed to accommodate future device additions', 4);

-- Insert sample service process steps
INSERT INTO public.service_process (service_id, step_number, step_title, step_description, estimated_duration) VALUES
-- Custom PC Building process
(1, 1, 'Consultation', 'Discuss your needs, budget, and performance requirements', '30 minutes'),
(1, 2, 'Component Selection', 'Research and select the best components for your build', '2-4 hours'),
(1, 3, 'Ordering & Delivery', 'Order components and coordinate delivery', '1-2 days'),
(1, 4, 'Assembly', 'Professional assembly with cable management', '4-6 hours'),
(1, 5, 'Testing & Setup', 'Stress testing, OS installation, and final configuration', '2-4 hours'),
(1, 6, 'Delivery & Training', 'System delivery and basic usage training', '1 hour'),

-- Laptop Repair process
(2, 1, 'Initial Assessment', 'Evaluate the laptop and identify issues', '30 minutes'),
(2, 2, 'Detailed Diagnostics', 'Comprehensive hardware and software testing', '1-2 hours'),
(2, 3, 'Repair Quote', 'Provide detailed quote with repair options', '30 minutes'),
(2, 4, 'Parts Ordering', 'Order necessary replacement parts', '1-3 days'),
(2, 5, 'Repair Work', 'Perform the actual repair and testing', '2-4 hours'),
(2, 6, 'Quality Check', 'Final testing and quality assurance', '1 hour'),

-- Network Setup process
(3, 1, 'Site Survey', 'Assess your space and connectivity needs', '30 minutes'),
(3, 2, 'Equipment Setup', 'Install and configure router and access points', '1-2 hours'),
(3, 3, 'Security Configuration', 'Set up encryption, passwords, and firewall', '30 minutes'),
(3, 4, 'Device Connection', 'Connect and configure all your devices', '1-2 hours'),
(3, 5, 'Testing & Optimization', 'Test coverage and optimize performance', '30 minutes'),
(3, 6, 'Documentation', 'Provide network details and user training', '30 minutes');

-- Insert sample service gallery
INSERT INTO public.service_gallery (service_id, image_url, alt_text, sort_order) VALUES
-- Custom PC Building gallery
(1, 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800', 'Custom PC Build in Progress', 1),
(1, 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800', 'High-End Gaming PC Build', 2),
(1, 'https://images.unsplash.com/photo-1616442535392-4c6b36b04b16?w=800', 'Professional Cable Management', 3),

-- Laptop Repair gallery
(2, 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800', 'Laptop Repair Workstation', 1),
(2, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800', 'Diagnostic Equipment', 2),

-- Network Setup gallery
(3, 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800', 'Network Equipment Setup', 1),
(3, 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800', 'WiFi Router Configuration', 2);

-- Insert sample service projects
INSERT INTO public.service_projects (service_id, project_title, project_description, project_image, completion_date) VALUES
-- Custom PC Building projects
(1, 'High-End Gaming Rig Build', 'Built a top-tier gaming PC with RTX 4090 and i9-13900K for competitive gaming and streaming.', 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400', '2024-01-15'),
(1, 'Content Creator Workstation', 'Assembled a powerful workstation for video editing with 64GB RAM and dual RTX 4080 setup.', 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400', '2024-02-20'),
(1, 'Budget Gaming Build', 'Created an affordable gaming PC that delivers 1080p gaming performance under $1000.', 'https://images.unsplash.com/photo-1616442535392-4c6b36b04b16?w=400', '2024-03-10'),

-- Laptop Repair projects
(2, 'MacBook Pro Logic Board Repair', 'Successfully repaired water-damaged MacBook Pro logic board, saving customer $1200.', 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400', '2024-01-22'),
(2, 'Gaming Laptop GPU Replacement', 'Replaced failed GPU in high-end gaming laptop, restoring full performance.', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400', '2024-02-14'),

-- Network Setup projects
(3, 'Small Office Network', 'Set up complete network infrastructure for 20-person office with WiFi 6 and security.', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400', '2024-01-30'),
(3, 'Smart Home Network', 'Configured mesh network for smart home with 50+ IoT devices and parental controls.', 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400', '2024-03-05');

-- Update site settings with more comprehensive information
UPDATE public.site_settings SET 
    setting_value = 'Welcome to Standbyte Nexus Hub - Your premier destination for high-performance computing solutions. We offer cutting-edge laptops, desktops, gaming systems, and professional services to meet all your technology needs.'
WHERE setting_key = 'site_description';

UPDATE public.site_settings SET 
    setting_value = 'At Standbyte Nexus Hub, we are passionate about technology and committed to providing our customers with the best computing solutions. Whether you need a powerful gaming rig, a reliable business laptop, or expert technical services, we have the expertise and products to exceed your expectations.'
WHERE setting_key = 'about_us';

INSERT INTO public.site_settings (setting_key, setting_value, setting_type) VALUES
('contact_phone', '+55 11 99999-8888', 'text'),
('contact_email', 'contato@standbytenexus.com.br', 'text'),
('contact_address', 'Rua da Tecnologia, 123 - São Paulo, SP - CEP 01234-567', 'text'),
('business_hours', 'Segunda à Sexta: 9h às 18h | Sábado: 9h às 14h', 'text'),
('social_facebook', 'https://facebook.com/standbytenexus', 'text'),
('social_instagram', 'https://instagram.com/standbytenexus', 'text'),
('social_youtube', 'https://youtube.com/standbytenexus', 'text'),
('shipping_info', 'Entrega grátis para São Paulo e região metropolitana. Consulte frete para outras localidades.', 'text'),
('return_policy', 'Política de troca e devolução de 30 dias. Produtos devem estar em perfeitas condições.', 'text'),
('warranty_info', 'Todos os produtos possuem garantia do fabricante. Serviços incluem garantia de 90 dias.', 'text')
ON CONFLICT (setting_key) DO UPDATE SET 
    setting_value = EXCLUDED.setting_value,
    updated_at = CURRENT_TIMESTAMP;
