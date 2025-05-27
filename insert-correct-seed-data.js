#!/usr/bin/env node

/**
 * Insert seed data matching the actual database schema
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function insertSeedData() {
  console.log('🌱 Inserting seed data with correct schema...');
  
  try {
    console.log('🔗 Testing database connection...');
    const { data: testData, error: testError } = await supabase
      .from('products')
      .select('count')
      .limit(1);
    
    if (testError) {
      console.error('❌ Database connection failed:', testError.message);
      throw testError;
    }
    console.log('✅ Database connection successful');

    // 1. Insert Sample Products (using actual schema)
    console.log('1️⃣ Inserting sample products...');
    const { data: products, error: productsError } = await supabase
      .from('products')
      .upsert([
        {
          name: 'Legion Pro 7i RTX 4080',
          brand: 'Lenovo',
          slug: 'legion-pro-7i-rtx-4080',
          description: 'High-performance gaming laptop with Intel Core i9 processor and RTX 4080 graphics card. Perfect for gaming, content creation, and professional workloads.',
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
          seo_title: 'Legion Pro 7i Gaming Laptop RTX 4080 - High Performance Gaming',
          seo_description: 'Discover the Legion Pro 7i with RTX 4080 graphics and Intel i9 processor. Ultimate gaming laptop for enthusiasts.'
        },
        {
          name: 'ROG Strix G16 RTX 4070',
          brand: 'ASUS',
          slug: 'rog-strix-g16-rtx-4070',
          description: 'ASUS Republic of Gamers laptop designed for serious gaming. Features AMD Ryzen 9 processor and RTX 4070 graphics with advanced cooling system.',
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
          seo_description: 'Experience gaming excellence with ROG Strix G16 featuring RTX 4070 and AMD Ryzen 9 processor.'
        },
        {
          name: 'ThinkPad X1 Carbon Gen 11',
          brand: 'Lenovo',
          slug: 'thinkpad-x1-carbon-gen-11',
          description: 'Ultra-lightweight business laptop with Intel 13th gen processors. Perfect for professionals who need portability without compromising performance.',
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
          seo_description: 'Professional ultrabook with cutting-edge performance and legendary ThinkPad reliability.'
        },
        {
          name: 'EliteBook 850 G10',
          brand: 'HP',
          slug: 'elitebook-850-g10',
          description: 'HP business laptop with enterprise security features and long battery life. Designed for modern business needs with premium build quality.',
          category: 'Business Laptops',
          original_price: 1599.99,
          sale_price: 1599.99,
          discount: 0,
          in_stock: true,
          is_on_sale: false,
          is_free_shipping: false,
          rating: 4.4,
          reviews_count: 28,
          warranty: '1 ano',
          weight: 1.46,
          dimensions: { length: 32.2, width: 21.4, height: 1.79 },
          image_url: '/images/products/elitebook-850.jpg',
          seo_title: 'HP EliteBook 850 G10 Business Laptop',
          seo_description: 'Secure business laptop with enterprise features and long battery life for professionals.'
        },
        {
          name: 'Precision 7000 Workstation',
          brand: 'Dell',
          slug: 'precision-7000-workstation',
          description: 'High-end mobile workstation for CAD, 3D rendering, and professional applications. Features Xeon processors and professional graphics.',
          category: 'Workstations',
          original_price: 3499.99,
          sale_price: 3299.99,
          discount: 6,
          in_stock: true,
          is_on_sale: true,
          is_free_shipping: true,
          rating: 4.7,
          reviews_count: 15,
          warranty: '3 anos',
          weight: 2.8,
          dimensions: { length: 37.4, width: 24.9, height: 2.8 },
          image_url: '/images/products/precision-7000.jpg',
          seo_title: 'Dell Precision 7000 Mobile Workstation',
          seo_description: 'Professional mobile workstation with Xeon processors for demanding applications.'
        }
      ], { onConflict: 'slug' })
      .select();

    if (productsError) {
      console.error('❌ Error inserting products:', productsError.message);
    } else {
      console.log(`✅ Inserted ${products.length} products`);
    }

    // 2. Insert Sample Services (using actual schema)
    console.log('2️⃣ Inserting sample services...');
    const { data: services, error: servicesError } = await supabase
      .from('services')
      .upsert([
        {
          title: 'Custom PC Building',
          slug: 'custom-pc-building',
          description: 'Professional custom PC building service tailored to your specific needs.',
          full_description: 'We select the best components based on your budget and requirements, ensuring optimal performance and compatibility. Includes cable management, stress testing, and warranty coverage on all work performed.',
          category: 'Assembly Services',
          badge: 'Mais Procurado',
          duration: '2-3 dias úteis',
          warranty: '1 ano na montagem',
          image_url: '/images/services/custom-pc-building.jpg',
          seo_title: 'Custom PC Building Service - Professional Assembly',
          seo_description: 'Expert custom PC building service with component selection, assembly, and testing.'
        },
        {
          title: 'Laptop Repair & Diagnostics',
          slug: 'laptop-repair-diagnostics',
          description: 'Comprehensive laptop repair service including hardware diagnostics and component replacement.',
          full_description: 'Our experienced technicians perform thorough diagnostics to identify issues and provide transparent pricing for all repairs. We handle all major brands and provide warranty on repairs.',
          category: 'Repair Services',
          badge: 'Premium',
          duration: '1-2 dias úteis',
          warranty: '90 dias na reparação',
          image_url: '/images/services/laptop-repair.jpg',
          seo_title: 'Laptop Repair Service - Expert Diagnostics & Repair',
          seo_description: 'Professional laptop repair service with comprehensive diagnostics and warranty coverage.'
        },
        {
          title: 'Gaming PC Optimization',
          slug: 'gaming-pc-optimization',
          description: 'Optimize your gaming PC for maximum performance with our expert tuning service.',
          full_description: 'Complete system optimization including driver updates, thermal management, overclocking (when safe), and game-specific settings optimization for the best gaming experience.',
          category: 'Optimization Services',
          badge: 'Especializado',
          duration: '2-4 horas',
          warranty: '30 dias',
          image_url: '/images/services/gaming-optimization.jpg',
          seo_title: 'Gaming PC Optimization Service',
          seo_description: 'Maximize your gaming PC performance with professional optimization and tuning.'
        },
        {
          title: 'Data Recovery Service',
          slug: 'data-recovery-service',
          description: 'Professional data recovery from damaged hard drives, SSDs, and storage devices.',
          full_description: 'State-of-the-art data recovery services for all types of storage media. Our clean room facilities and specialized tools can recover data from physically damaged drives.',
          category: 'Data Services',
          badge: 'Premium',
          duration: '3-5 dias úteis',
          warranty: 'Garantia no processo',
          image_url: '/images/services/data-recovery.jpg',
          seo_title: 'Professional Data Recovery Service',
          seo_description: 'Expert data recovery from damaged drives with high success rates and secure handling.'
        },
        {
          title: 'Network Setup & Configuration',
          slug: 'network-setup-configuration',
          description: 'Complete network setup and configuration for homes and small businesses.',
          full_description: 'Professional network design and implementation including router configuration, WiFi optimization, security setup, and device integration for optimal performance.',
          category: 'Network Services',
          badge: null,
          duration: '1-2 dias',
          warranty: '6 meses',
          image_url: '/images/services/network-setup.jpg',
          seo_title: 'Network Setup and Configuration Service',
          seo_description: 'Professional network setup with security configuration and performance optimization.'
        }
      ], { onConflict: 'slug' })
      .select();

    if (servicesError) {
      console.error('❌ Error inserting services:', servicesError.message);
    } else {
      console.log(`✅ Inserted ${services.length} services`);
    }

    // 3. Verify data insertion
    console.log('3️⃣ Verifying data insertion...');
    const { count: productCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });
    
    const { count: serviceCount } = await supabase
      .from('services')
      .select('*', { count: 'exact', head: true });

    console.log('\n🎯 Seed data insertion completed!');
    console.log('==========================================');
    console.log(`💻 Products: ${productCount}`);
    console.log(`🔧 Services: ${serviceCount}`);
    console.log('==========================================');
    
    if (productCount > 0 && serviceCount > 0) {
      console.log('✅ Database is ready for use!');
      console.log('🔗 You can now test the application with sample data.');
    } else {
      console.log('⚠️  Some data may not have been inserted correctly.');
    }

  } catch (error) {
    console.error('❌ Error inserting seed data:', error.message);
    process.exit(1);
  }
}

insertSeedData();
