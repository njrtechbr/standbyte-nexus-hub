#!/usr/bin/env node

/**
 * Apply seed data to Supabase database
 * This script applies the seed data migration directly to the remote database
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables');
  console.error('Please ensure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env');
  process.exit(1);
}

// Create Supabase client with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function applySeedData() {
  console.log('🌱 Applying seed data to Standbyte Nexus Hub database...');
  
  try {
    // Read the seed data migration file
    const seedDataPath = join(process.cwd(), 'supabase', 'migrations', '20250526202238_insert_seed_data.sql');
    const seedDataSQL = readFileSync(seedDataPath, 'utf8');
    
    console.log('1️⃣ Testing database connection...');
    const { data: connectionTest, error: connectionError } = await supabase
      .from('products')
      .select('count')
      .limit(1);
    
    if (connectionError) {
      throw new Error(`Connection failed: ${connectionError.message}`);
    }
    console.log('✅ Database connection successful');
    
    console.log('2️⃣ Checking current data...');
    const { count: productCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });
    
    const { count: serviceCount } = await supabase
      .from('services')
      .select('*', { count: 'exact', head: true });
      
    const { count: categoryCount } = await supabase
      .from('categories')
      .select('*', { count: 'exact', head: true });
      
    console.log(`   Current data: ${productCount || 0} products, ${serviceCount || 0} services, ${categoryCount || 0} categories`);
    
    if ((productCount > 0) || (serviceCount > 0) || (categoryCount > 0)) {
      console.log('⚠️  Database already contains data. Skipping seed data application.');
      console.log('   If you want to reset and reapply, clear the tables first.');
      return;
    }
    
    console.log('3️⃣ Applying seed data...');
    
    // Split the SQL into individual statements
    const statements = seedDataSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    console.log(`   Executing ${statements.length} SQL statements...`);
    
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim().length === 0) continue;
      
      try {
        const { error } = await supabase.rpc('exec_sql', { sql: statement });
        if (error) {
          console.error(`   ❌ Error in statement ${i + 1}: ${error.message}`);
          errorCount++;
        } else {
          successCount++;
        }
      } catch (err) {
        console.error(`   ❌ Error in statement ${i + 1}: ${err.message}`);
        errorCount++;
      }
      
      // Progress indicator
      if ((i + 1) % 10 === 0) {
        console.log(`   Progress: ${i + 1}/${statements.length} statements processed`);
      }
    }
    
    console.log('4️⃣ Verifying data insertion...');
    const { count: newProductCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });
    
    const { count: newServiceCount } = await supabase
      .from('services')
      .select('*', { count: 'exact', head: true });
      
    const { count: newCategoryCount } = await supabase
      .from('categories')
      .select('*', { count: 'exact', head: true });
    
    console.log(`✅ Seed data application completed!`);
    console.log(`   Successfully executed: ${successCount} statements`);
    console.log(`   Errors: ${errorCount} statements`);
    console.log(`   Final data: ${newProductCount || 0} products, ${newServiceCount || 0} services, ${newCategoryCount || 0} categories`);
    
    if (errorCount > 0) {
      console.log('⚠️  Some statements failed. Check the errors above.');
    }
    
  } catch (error) {
    console.error('❌ Error applying seed data:', error.message);
    process.exit(1);
  }
}

applySeedData();
