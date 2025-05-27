import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkCurrentSchema() {
  console.log('🔍 Checking current database schema...\n');

  try {
    // Check services table structure
    console.log('📋 Services table structure:');
    const { data: servicesSchema, error: servicesError } = await supabase
      .rpc('get_table_columns', { table_name: 'services' })
      .select();

    if (servicesError) {
      // Fallback: try to query with different column names
      console.log('   Trying to determine services columns...');
      
      // Test if 'title' exists
      const { data: titleTest, error: titleError } = await supabase
        .from('services')
        .select('title')
        .limit(1);

      // Test if 'name' exists  
      const { data: nameTest, error: nameError } = await supabase
        .from('services')
        .select('name')
        .limit(1);

      console.log(`   - 'title' column: ${titleError ? '❌ Not found' : '✅ Exists'}`);
      console.log(`   - 'name' column: ${nameError ? '❌ Not found' : '✅ Exists'}`);
    }

    // Check products table structure
    console.log('\n📋 Products table structure:');
    
    // Test different price column names
    const { data: priceTest, error: priceError } = await supabase
      .from('products')
      .select('price')
      .limit(1);

    const { data: originalPriceTest, error: originalPriceError } = await supabase
      .from('products')
      .select('original_price')
      .limit(1);

    console.log(`   - 'price' column: ${priceError ? '❌ Not found' : '✅ Exists'}`);
    console.log(`   - 'original_price' column: ${originalPriceError ? '❌ Not found' : '✅ Exists'}`);

    // Test if products have 'name' or 'title'
    const { data: productNameTest, error: productNameError } = await supabase
      .from('products')
      .select('name')
      .limit(1);

    const { data: productTitleTest, error: productTitleError } = await supabase
      .from('products')
      .select('title')
      .limit(1);

    console.log(`   - 'name' column: ${productNameError ? '❌ Not found' : '✅ Exists'}`);
    console.log(`   - 'title' column: ${productTitleError ? '❌ Not found' : '✅ Exists'}`);

    // Check what data exists
    console.log('\n📊 Data counts:');
    const { count: productsCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    const { count: servicesCount } = await supabase
      .from('services')
      .select('*', { count: 'exact', head: true });

    const { count: categoriesCount } = await supabase
      .from('categories')
      .select('*', { count: 'exact', head: true });

    console.log(`   - Products: ${productsCount || 0} records`);
    console.log(`   - Services: ${servicesCount || 0} records`);
    console.log(`   - Categories: ${categoriesCount || 0} records`);

    console.log('\n🎯 Schema Analysis Complete!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkCurrentSchema();
