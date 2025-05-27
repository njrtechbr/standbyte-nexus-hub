const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🌱 Inserting seed data with correct schema...');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function insertData() {
  try {
    console.log('🔗 Testing connection...');
    const { error: testError } = await supabase.from('products').select('count').limit(1);
    if (testError) throw testError;
    console.log('✅ Connection successful');

    // 1. Insert categories
    console.log('1️⃣ Inserting categories...');
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .upsert([
        {
          name: 'Gaming Laptops',
          slug: 'gaming-laptops',
          description: 'High-performance laptops for gaming',
          category_type: 'product',
          icon_name: 'gamepad-2',
          is_active: true,
          display_order: 1
        },
        {
          name: 'Business Laptops', 
          slug: 'business-laptops',
          description: 'Professional laptops for business',
          category_type: 'product',
          icon_name: 'briefcase',
          is_active: true,
          display_order: 2
        },
        {
          name: 'Custom PC Building',
          slug: 'custom-pc-building',
          description: 'Custom PC building services',
          category_type: 'service',
          icon_name: 'cpu',
          is_active: true,
          display_order: 3
        },
        {
          name: 'Technical Support',
          slug: 'technical-support', 
          description: 'Technical support and repair services',
          category_type: 'service',
          icon_name: 'wrench',
          is_active: true,
          display_order: 4
        }
      ], { onConflict: 'slug' })
      .select();

    if (catError) {
      console.error('❌ Categories error:', catError.message);
    } else {
      console.log(`✅ Inserted ${categories.length} categories`);
    }

    // 2. Insert brands
    console.log('2️⃣ Inserting brands...');
    const { data: brands, error: brandError } = await supabase
      .from('brands')
      .upsert([
        {
          name: 'Lenovo',
          slug: 'lenovo',
          description: 'Innovative technology for everyone',
          logo_url: '/images/brands/lenovo.png',
          website_url: 'https://www.lenovo.com',
          is_active: true
        },
        {
          name: 'ASUS',
          slug: 'asus',
          description: 'In Search of Incredible',
          logo_url: '/images/brands/asus.png',
          website_url: 'https://www.asus.com',
          is_active: true
        },
        {
          name: 'HP',
          slug: 'hp',
          description: 'Keep Reinventing',
          logo_url: '/images/brands/hp.png',
          website_url: 'https://www.hp.com',
          is_active: true
        }
      ], { onConflict: 'slug' })
      .select();

    if (brandError) {
      console.error('❌ Brands error:', brandError.message);
    } else {
      console.log(`✅ Inserted ${brands.length} brands`);
    }

    // 3. Insert sample products
    console.log('3️⃣ Inserting sample products...');
    const { data: products, error: prodError } = await supabase
      .from('products')
      .upsert([
        {
          name: 'Legion Pro 7i RTX 4080',
          brand: 'Lenovo',
          slug: 'legion-pro-7i-rtx-4080',
          description: 'High-performance gaming laptop with Intel Core i9 and RTX 4080.',
          category: 'Gaming Laptops',
          original_price: 2899.99,
          sale_price: 2699.99,
          discount: 7,
          in_stock: true,
          is_on_sale: true,
          is_free_shipping: true,
          rating: 4.8,
          reviews_count: 45,
          warranty: '2 anos',
          weight: 2.5,
          dimensions: { length: 35.7, width: 26.2, height: 2.2 },
          image_url: '/images/products/legion-pro-7i.jpg',
          seo_title: 'Legion Pro 7i Gaming Laptop RTX 4080',
          seo_description: 'Ultimate gaming laptop with RTX 4080 and Intel i9.'
        },
        {
          name: 'ThinkPad X1 Carbon Gen 11',
          brand: 'Lenovo',
          slug: 'thinkpad-x1-carbon-gen-11',
          description: 'Ultra-lightweight business laptop with 13th gen Intel.',
          category: 'Business Laptops',
          original_price: 1899.99,
          sale_price: 1799.99,
          discount: 5,
          in_stock: true,
          is_on_sale: true,
          is_free_shipping: false,
          rating: 4.9,
          reviews_count: 68,
          warranty: '3 anos',
          weight: 1.12,
          dimensions: { length: 31.5, width: 22.1, height: 1.55 },
          image_url: '/images/products/thinkpad-x1-carbon.jpg',
          seo_title: 'ThinkPad X1 Carbon Gen 11 Business Laptop',
          seo_description: 'Professional ultrabook with legendary ThinkPad reliability.'
        },
        {
          name: 'ROG Strix G16 RTX 4070',
          brand: 'ASUS',
          slug: 'rog-strix-g16-rtx-4070',
          description: 'Republic of Gamers laptop with AMD Ryzen 9 and RTX 4070.',
          category: 'Gaming Laptops',
          original_price: 2299.99,
          sale_price: 2299.99,
          discount: 0,
          in_stock: true,
          is_on_sale: false,
          is_free_shipping: true,
          rating: 4.6,
          reviews_count: 32,
          warranty: '2 anos',
          weight: 2.3,
          dimensions: { length: 35.4, width: 25.2, height: 2.34 },
          image_url: '/images/products/rog-strix-g16.jpg',
          seo_title: 'ASUS ROG Strix G16 Gaming Laptop RTX 4070',
          seo_description: 'Gaming excellence with RTX 4070 and AMD Ryzen 9.'
        }
      ], { onConflict: 'slug' })
      .select();

    if (prodError) {
      console.error('❌ Products error:', prodError.message);
    } else {
      console.log(`✅ Inserted ${products.length} products`);
    }

    // 4. Insert sample services
    console.log('4️⃣ Inserting sample services...');
    const { data: services, error: servError } = await supabase
      .from('services')
      .upsert([
        {
          title: 'Custom PC Building',
          slug: 'custom-pc-building',
          description: 'Professional custom PC building service tailored to your needs.',
          full_description: 'Complete PC assembly with component selection, testing, and warranty.',
          category: 'Custom PC Building',
          badge: 'Mais Procurado',
          duration: '2-3 dias úteis',
          warranty: '1 ano na montagem',
          image_url: '/images/services/custom-pc-building.jpg',
          seo_title: 'Custom PC Building Service',
          seo_description: 'Professional PC building with expert component selection.'
        },
        {
          title: 'Laptop Repair & Diagnostics',
          slug: 'laptop-repair-diagnostics',
          description: 'Comprehensive laptop repair with hardware diagnostics.',
          full_description: 'Expert laptop repair service with transparent pricing and warranty.',
          category: 'Technical Support',
          badge: 'Premium',
          duration: '1-2 dias úteis',
          warranty: '90 dias na reparação',
          image_url: '/images/services/laptop-repair.jpg',
          seo_title: 'Laptop Repair Service',
          seo_description: 'Professional laptop repair with comprehensive diagnostics.'
        },
        {
          title: 'Gaming PC Optimization',
          slug: 'gaming-pc-optimization',
          description: 'Optimize your gaming PC for maximum performance.',
          full_description: 'Complete system optimization including drivers and game settings.',
          category: 'Technical Support',
          badge: 'Especializado',
          duration: '2-4 horas',
          warranty: '30 dias',
          image_url: '/images/services/gaming-optimization.jpg',
          seo_title: 'Gaming PC Optimization',
          seo_description: 'Maximize gaming performance with professional optimization.'
        }
      ], { onConflict: 'slug' })
      .select();

    if (servError) {
      console.error('❌ Services error:', servError.message);
    } else {
      console.log(`✅ Inserted ${services.length} services`);
    }

    // 5. Verify final counts
    console.log('5️⃣ Verifying data...');
    const { count: catCount } = await supabase.from('categories').select('*', { count: 'exact', head: true });
    const { count: brandCount } = await supabase.from('brands').select('*', { count: 'exact', head: true });
    const { count: prodCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
    const { count: servCount } = await supabase.from('services').select('*', { count: 'exact', head: true });

    console.log('\n🎯 Seed data completed!');
    console.log('===============================');
    console.log(`📂 Categories: ${catCount}`);
    console.log(`🏷️  Brands: ${brandCount}`);
    console.log(`💻 Products: ${prodCount}`);
    console.log(`🔧 Services: ${servCount}`);
    console.log('===============================');
    
    if (prodCount > 0 && servCount > 0) {
      console.log('✅ Database ready for testing!');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

insertData();
