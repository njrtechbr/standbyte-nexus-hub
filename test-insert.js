#!/usr/bin/env node

/**
 * Test database insertion with detailed logging
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Environment check:');
console.log('SUPABASE_URL:', supabaseUrl ? 'Set' : 'Not set');
console.log('SUPABASE_KEY:', supabaseKey ? 'Set' : 'Not set');

const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
  console.log('🧪 Testing database insertion with detailed logging...');
  
  try {
    // Test simple insert
    console.log('1️⃣ Testing simple product insert...');
    
    const productData = {
      name: 'Test Laptop',
      brand: 'Test Brand',
      slug: 'test-laptop-' + Date.now(),
      description: 'A test laptop for debugging',
      category: 'Test Category',
      original_price: 999.99,
      sale_price: 899.99
    };
    
    console.log('Inserting product data:', JSON.stringify(productData, null, 2));
    
    const { data: product, error: productError } = await supabase
      .from('products')
      .insert(productData)
      .select();
    
    if (productError) {
      console.error('❌ Product insert error:', productError);
    } else {
      console.log('✅ Product inserted successfully:', product);
      
      // Clean up test data
      await supabase
        .from('products')
        .delete()
        .eq('slug', productData.slug);
      console.log('🧹 Cleaned up test product');
    }
    
    // Test simple service insert
    console.log('2️⃣ Testing simple service insert...');
    
    const serviceData = {
      title: 'Test Service',
      slug: 'test-service-' + Date.now(),
      description: 'A test service for debugging',
      category: 'Test Category'
    };
    
    console.log('Inserting service data:', JSON.stringify(serviceData, null, 2));
    
    const { data: service, error: serviceError } = await supabase
      .from('services')
      .insert(serviceData)
      .select();
    
    if (serviceError) {
      console.error('❌ Service insert error:', serviceError);
    } else {
      console.log('✅ Service inserted successfully:', service);
      
      // Clean up test data
      await supabase
        .from('services')
        .delete()
        .eq('slug', serviceData.slug);
      console.log('🧹 Cleaned up test service');
    }
    
    // Final check
    console.log('3️⃣ Final database check...');
    const { count: productCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });
    
    const { count: serviceCount } = await supabase
      .from('services')
      .select('*', { count: 'exact', head: true });
    
    console.log(`Products in database: ${productCount}`);
    console.log(`Services in database: ${serviceCount}`);
    
    console.log('✅ Test completed successfully!');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

testInsert();
