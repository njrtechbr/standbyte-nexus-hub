#!/usr/bin/env node

/**
 * Insert basic seed data into Supabase database
 * This script inserts essential categories, brands, and a few sample products/services
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing required environment variables');
  console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function insertSeedData() {
  console.log('🌱 Inserting basic seed data...');
  
  try {
    // Test connection first
    console.log('🔗 Testing database connection...');
    const { data: testData, error: testError } = await supabase
      .from('categories')
      .select('count')
      .limit(1);
    
    if (testError) {
      console.error('❌ Database connection failed:', testError.message);
      throw testError;
    }
    console.log('✅ Database connection successful');
    
    // 1. Insert Categories
    console.log('1️⃣ Inserting categories...');
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .upsert([
        {
          name: 'Gaming Laptops',
          slug: 'gaming-laptops',
          description: 'High-performance laptops for gaming',
          icon: '🎮',
          sort_order: 1,
          status: 'active'
        },
        {
          name: 'Business Laptops',
          slug: 'business-laptops',
          description: 'Professional laptops for business',
          icon: '💼',
          sort_order: 2,
          status: 'active'
        },
        {
          name: 'Workstations',
          slug: 'workstations',
          description: 'High-end workstations for professionals',
          icon: '🖥️',
          sort_order: 3,
          status: 'active'
        },
        {
          name: 'Custom PC Building',
          slug: 'custom-pc-building',
          description: 'Custom PC building services',
          icon: '🔧',
          sort_order: 7,
          status: 'active'
        },
        {
          name: 'Technical Support',
          slug: 'technical-support',
          description: 'Technical support and maintenance',
          icon: '🛠️',
          sort_order: 8,
          status: 'active'
        }
      ], { onConflict: 'slug' })
      .select();

    if (categoriesError) {
      console.error('❌ Error inserting categories:', categoriesError.message);
    } else {
      console.log(`✅ Inserted ${categories.length} categories`);
    }

    // 2. Insert Brands
    console.log('2️⃣ Inserting brands...');
    const { data: brands, error: brandsError } = await supabase
      .from('brands')
      .upsert([
        {
          name: 'Lenovo',
          slug: 'lenovo',
          description: 'Innovative technology solutions',
          logo: '/images/brands/lenovo.png',
          website: 'https://www.lenovo.com',
          status: 'active'
        },
        {
          name: 'ASUS',
          slug: 'asus',
          description: 'Innovation and quality products',
          logo: '/images/brands/asus.png',
          website: 'https://www.asus.com',
          status: 'active'
        },
        {
          name: 'HP',
          slug: 'hp',
          description: 'Technology solutions for everyone',
          logo: '/images/brands/hp.png',
          website: 'https://www.hp.com',
          status: 'active'
        }
      ], { onConflict: 'slug' })
      .select();

    if (brandsError) {
      console.error('❌ Error inserting brands:', brandsError.message);
    } else {
      console.log(`✅ Inserted ${brands.length} brands`);
    }

    // Get category and brand IDs for products/services
    const { data: categoryList } = await supabase.from('categories').select('id, slug');
    const { data: brandList } = await supabase.from('brands').select('id, slug');
    
    const getCategoryId = (slug) => categoryList.find(c => c.slug === slug)?.id;
    const getBrandId = (slug) => brandList.find(b => b.slug === slug)?.id;

    // 3. Insert Sample Products
    console.log('3️⃣ Inserting sample products...');
    const { data: products, error: productsError } = await supabase
      .from('products')
      .upsert([
        {
          name: 'Legion Pro 7i RTX 4080',
          description: 'High-performance gaming laptop with Intel Core i9 processor and RTX 4080 graphics card.',
          short_description: 'Ultimate gaming performance with RTX 4080 and i9 processor',
          price: 2899.99,
          sale_price: 2699.99,
          sku: 'LEGION-PRO-7I-4080',
          stock_quantity: 15,
          category_id: getCategoryId('gaming-laptops'),
          brand_id: getBrandId('lenovo'),
          status: 'active',
          featured: true,
          weight: 2.5,
          dimensions: '35.7 x 26.2 x 2.2 cm',
          meta_title: 'Legion Pro 7i Gaming Laptop RTX 4080 - High Performance Gaming',
          meta_description: 'Discover the Legion Pro 7i with RTX 4080 graphics and Intel i9 processor.',
          slug: 'legion-pro-7i-rtx-4080'
        },
        {
          name: 'ROG Strix G16 RTX 4070',
          description: 'ASUS Republic of Gamers laptop designed for serious gaming.',
          short_description: 'ROG gaming laptop with RTX 4070 and Ryzen 9 power',
          price: 2299.99,
          sku: 'ROG-STRIX-G16-4070',
          stock_quantity: 8,
          category_id: getCategoryId('gaming-laptops'),
          brand_id: getBrandId('asus'),
          status: 'active',
          featured: true,
          weight: 2.3,
          dimensions: '35.4 x 25.2 x 2.34 cm',
          meta_title: 'ASUS ROG Strix G16 Gaming Laptop RTX 4070',
          meta_description: 'Experience gaming excellence with ROG Strix G16 featuring RTX 4070.',
          slug: 'rog-strix-g16-rtx-4070'
        },
        {
          name: 'ThinkPad X1 Carbon Gen 11',
          description: 'Ultra-lightweight business laptop with Intel 13th gen processors.',
          short_description: 'Premium business ultrabook with 13th gen Intel',
          price: 1899.99,
          sale_price: 1799.99,
          sku: 'THINKPAD-X1-CARBON-11',
          stock_quantity: 20,
          category_id: getCategoryId('business-laptops'),
          brand_id: getBrandId('lenovo'),
          status: 'active',
          featured: false,
          weight: 1.12,
          dimensions: '31.5 x 22.1 x 1.55 cm',
          meta_title: 'ThinkPad X1 Carbon Gen 11 Business Laptop',
          meta_description: 'Professional ultrabook with cutting-edge performance.',
          slug: 'thinkpad-x1-carbon-gen-11'
        }
      ], { onConflict: 'slug' })
      .select();

    if (productsError) {
      console.error('❌ Error inserting products:', productsError.message);
    } else {
      console.log(`✅ Inserted ${products.length} products`);
    }

    // 4. Insert Sample Services
    console.log('4️⃣ Inserting sample services...');
    const { data: services, error: servicesError } = await supabase
      .from('services')
      .upsert([
        {
          title: 'Custom PC Building',
          description: 'Professional custom PC building service tailored to your specific needs.',
          short_description: 'Professional custom PC building with expert component selection',
          price_type: 'fixed',
          base_price: 299.99,
          category_id: getCategoryId('custom-pc-building'),
          status: 'active',
          featured: true,
          duration_estimate: '2-3 days',
          complexity_level: 'intermediate',
          meta_title: 'Custom PC Building Service - Professional Assembly',
          meta_description: 'Expert custom PC building service with component selection, assembly, and testing.',
          slug: 'custom-pc-building'
        },
        {
          title: 'Laptop Repair & Diagnostics',
          description: 'Comprehensive laptop repair service including hardware diagnostics and component replacement.',
          short_description: 'Complete laptop repair with diagnostics and warranty',
          price_type: 'hourly',
          base_price: 89.99,
          category_id: getCategoryId('technical-support'),
          status: 'active',
          featured: true,
          duration_estimate: '1-2 days',
          complexity_level: 'intermediate',
          meta_title: 'Laptop Repair Service - Expert Diagnostics & Repair',
          meta_description: 'Professional laptop repair service with comprehensive diagnostics.',
          slug: 'laptop-repair-diagnostics'
        },
        {
          title: 'Gaming PC Optimization',
          description: 'Optimize your gaming PC for maximum performance with our expert tuning service.',
          short_description: 'Professional gaming PC optimization for peak performance',
          price_type: 'fixed',
          base_price: 149.99,
          category_id: getCategoryId('technical-support'),
          status: 'active',
          featured: false,
          duration_estimate: '2-4 hours',
          complexity_level: 'beginner',
          meta_title: 'Gaming PC Optimization Service',
          meta_description: 'Maximize your gaming PC performance with professional optimization.',
          slug: 'gaming-pc-optimization'
        }
      ], { onConflict: 'slug' })
      .select();

    if (servicesError) {
      console.error('❌ Error inserting services:', servicesError.message);
    } else {
      console.log(`✅ Inserted ${services.length} services`);
    }

    // 5. Verify data insertion
    console.log('5️⃣ Verifying data insertion...');
    const { count: productCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });
    
    const { count: serviceCount } = await supabase
      .from('services')
      .select('*', { count: 'exact', head: true });
      
    const { count: categoryCount } = await supabase
      .from('categories')
      .select('*', { count: 'exact', head: true });

    const { count: brandCount } = await supabase
      .from('brands')
      .select('*', { count: 'exact', head: true });

    console.log('\n🎯 Seed data insertion completed!');
    console.log('==========================================');
    console.log(`📦 Categories: ${categoryCount}`);
    console.log(`🏷️  Brands: ${brandCount}`);
    console.log(`💻 Products: ${productCount}`);
    console.log(`🔧 Services: ${serviceCount}`);
    console.log('==========================================');
    
    if (productCount > 0 && serviceCount > 0) {
      console.log('✅ Database is ready for use!');
    } else {
      console.log('⚠️  Some data may not have been inserted correctly.');
    }

  } catch (error) {
    console.error('❌ Error inserting seed data:', error.message);
    process.exit(1);
  }
}

insertSeedData();
