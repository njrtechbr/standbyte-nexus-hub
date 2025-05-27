#!/usr/bin/env node

/**
 * Check actual database schema columns
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  console.log('🔍 Checking actual database schema columns...\n');
  
  const tables = ['categories', 'brands', 'products', 'services'];
  
  for (const table of tables) {
    console.log(`📋 Checking table: ${table}`);
    try {
      // Try to insert an empty record to see what columns are required/available
      const { error } = await supabase
        .from(table)
        .insert({})
        .select();
      
      if (error) {
        console.log(`   Error: ${error.message}`);
        // Extract column information from error message
        if (error.message.includes('null value in column')) {
          const match = error.message.match(/null value in column "([^"]+)"/);
          if (match) {
            console.log(`   ✅ Required column found: ${match[1]}`);
          }
        }
      }
      
      // Try to select from the table to see if it exists
      const { data, error: selectError } = await supabase
        .from(table)
        .select('*')
        .limit(1);
      
      if (!selectError && data !== null) {
        console.log(`   ✅ Table ${table} is accessible`);
      }
      
    } catch (err) {
      console.log(`   ❌ Error checking ${table}: ${err.message}`);
    }
    console.log('');
  }
  
  // Let's try to insert minimal data to see what works
  console.log('🧪 Testing minimal data insertion...\n');
  
  // Test categories with minimal data
  console.log('Testing categories with minimal data...');
  const { data: catData, error: catError } = await supabase
    .from('categories')
    .insert({ name: 'Test Category', slug: 'test-category' })
    .select();
  
  if (catError) {
    console.log(`Categories error: ${catError.message}`);
  } else {
    console.log(`✅ Categories: Successfully inserted ${catData.length} record(s)`);
    // Clean up test data
    await supabase.from('categories').delete().eq('slug', 'test-category');
  }
  
  // Test brands with minimal data
  console.log('Testing brands with minimal data...');
  const { data: brandData, error: brandError } = await supabase
    .from('brands')
    .insert({ name: 'Test Brand', slug: 'test-brand' })
    .select();
  
  if (brandError) {
    console.log(`Brands error: ${brandError.message}`);
  } else {
    console.log(`✅ Brands: Successfully inserted ${brandData.length} record(s)`);
    // Clean up test data
    await supabase.from('brands').delete().eq('slug', 'test-brand');
  }
  
  // Test services with minimal data
  console.log('Testing services with minimal data...');
  const { data: serviceData, error: serviceError } = await supabase
    .from('services')
    .insert({ title: 'Test Service', slug: 'test-service' })
    .select();
  
  if (serviceError) {
    console.log(`Services error: ${serviceError.message}`);
  } else {
    console.log(`✅ Services: Successfully inserted ${serviceData.length} record(s)`);
    // Clean up test data
    await supabase.from('services').delete().eq('slug', 'test-service');
  }
  
  // Test products with minimal data
  console.log('Testing products with minimal data...');
  const { data: productData, error: productError } = await supabase
    .from('products')
    .insert({ name: 'Test Product', slug: 'test-product', price: 99.99 })
    .select();
  
  if (productError) {
    console.log(`Products error: ${productError.message}`);
  } else {
    console.log(`✅ Products: Successfully inserted ${productData.length} record(s)`);
    // Clean up test data
    await supabase.from('products').delete().eq('slug', 'test-product');
  }
}

checkSchema();
