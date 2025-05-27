import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Load environment variables
config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDatabaseCorrect() {
  console.log('🚀 Testing Standbyte Nexus Hub Database (Correct Schema)...\n');

  try {
    // Test 1: Basic connection
    console.log('1️⃣ Testing database connection...');
    
    // First check what tables exist
    const { data: tablesTest, error: tablesError } = await supabase
      .rpc('get_tables_list')
      .select();

    // If RPC doesn't work, try a simple query on a known table
    if (tablesError) {
      const { data: simpleTest, error: simpleError } = await supabase
        .from('products')
        .select('*')
        .limit(1);
      
      if (simpleError) {
        throw new Error(`Connection failed: ${simpleError.message}`);
      }
    }
    console.log('✅ Database connection successful\n');

    // Test 2: Check actual products structure
    console.log('2️⃣ Checking products table...');
    const { data: productsTest, error: productsError } = await supabase
      .from('products')
      .select('*')
      .limit(1);

    if (productsError) {
      console.log('❌ Products table error:', productsError.message);
    } else {
      console.log('✅ Products table accessible');
      if (productsTest && productsTest.length > 0) {
        console.log('   Available columns:', Object.keys(productsTest[0]).join(', '));
      } else {
        console.log('   Table is empty - will need to populate with data');
      }
    }

    // Test 3: Check services structure (using correct schema)
    console.log('\n3️⃣ Checking services table...');
    const { data: servicesTest, error: servicesError } = await supabase
      .from('services')
      .select('*')
      .limit(1);

    if (servicesError) {
      console.log('❌ Services table error:', servicesError.message);
    } else {
      console.log('✅ Services table accessible');
      if (servicesTest && servicesTest.length > 0) {
        console.log('   Available columns:', Object.keys(servicesTest[0]).join(', '));
      } else {
        console.log('   Table is empty - will need to populate with data');
      }
    }

    // Test 4: Count records in main tables
    console.log('\n4️⃣ Counting records...');
    
    const { count: productsCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    const { count: servicesCount } = await supabase
      .from('services')
      .select('*', { count: 'exact', head: true });

    const { count: categoriesCount } = await supabase
      .from('categories')
      .select('*', { count: 'exact', head: true });

    console.log(`   Products: ${productsCount || 0} records`);
    console.log(`   Services: ${servicesCount || 0} records`);
    console.log(`   Categories: ${categoriesCount || 0} records`);

    // Test 5: Check if we need to apply the correct schema
    console.log('\n5️⃣ Schema status analysis...');
    
    // Check if services uses 'title' (original) or 'name' (new schema)
    const { data: servicesTitleTest, error: titleError } = await supabase
      .from('services')
      .select('title')
      .limit(1);

    const { data: servicesNameTest, error: nameError } = await supabase
      .from('services')
      .select('name')
      .limit(1);

    if (!titleError) {
      console.log('   🟡 Using ORIGINAL schema (services.title exists)');
      console.log('   📝 Need to either:');
      console.log('      a) Migrate to new schema (services.name), or');
      console.log('      b) Update app to use original schema (services.title)');
    } else if (!nameError) {
      console.log('   🟢 Using NEW schema (services.name exists)');
      console.log('   ✅ Schema is updated correctly');
    } else {
      console.log('   🔴 Schema unclear - both title and name failed');
    }

    // Test 6: Check if any sample data exists
    console.log('\n6️⃣ Checking for sample data...');
    
    if (productsCount > 0) {
      const { data: sampleProduct } = await supabase
        .from('products')
        .select('*')
        .limit(1)
        .single();
      
      console.log('   📦 Sample product found:');
      console.log(`      ID: ${sampleProduct.id}`);
      console.log(`      Title/Name: ${sampleProduct.title || sampleProduct.name || 'N/A'}`);
      console.log(`      Price: ${sampleProduct.original_price || sampleProduct.price || sampleProduct.base_price || 'N/A'}`);
    }

    if (servicesCount > 0) {
      const { data: sampleService } = await supabase
        .from('services')
        .select('*')
        .limit(1)
        .single();
      
      console.log('   🔧 Sample service found:');
      console.log(`      ID: ${sampleService.id}`);
      console.log(`      Title/Name: ${sampleService.title || sampleService.name || 'N/A'}`);
      console.log(`      Category: ${sampleService.category || 'N/A'}`);
    }

    // Summary
    console.log('\n🎯 Current Status:');
    console.log('==================');
    console.log('✅ Database connection: Working');
    console.log(`📊 Data status: ${(productsCount + servicesCount + categoriesCount) > 0 ? 'Has data' : 'Empty - needs population'}`);
    console.log(`🔧 Schema status: ${!titleError ? 'Original schema' : !nameError ? 'New schema' : 'Unknown'}`);
    
    if ((productsCount + servicesCount + categoriesCount) === 0) {
      console.log('\n📋 Next steps:');
      console.log('1. Determine which schema to use (original vs new)');
      console.log('2. Apply the correct schema migrations');
      console.log('3. Populate with initial data');
      console.log('4. Test all functionality');
    }

  } catch (error) {
    console.error('❌ Database test failed:', error.message);
    process.exit(1);
  }
}

// Run the tests
testDatabaseCorrect();
