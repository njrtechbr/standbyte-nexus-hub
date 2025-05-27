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

async function testDatabase() {
  console.log('🚀 Starting Standbyte Nexus Hub Database Tests...\n');

  try {
    // Test 1: Basic connection
    console.log('1️⃣ Testing database connection...');
    const { data: connectionTest, error: connectionError } = await supabase
      .from('site_settings')
      .select('setting_key, setting_value')
      .limit(1);

    if (connectionError) {
      throw new Error(`Connection failed: ${connectionError.message}`);
    }
    console.log('✅ Database connection successful\n');    // Test 2: Check products table structure
    console.log('2️⃣ Checking products table structure...');
    
    // Try to get one product with all columns
    const productResult = await supabase
      .from('products')
      .select('*')
      .limit(1);

    if (productResult.error) {
      console.log('⚠️ Error getting sample product:', productResult.error.message);
    } else if (productResult.data && productResult.data.length > 0) {
      console.log('✅ Products table accessible');
      console.log('Sample product columns:', Object.keys(productResult.data[0]).join(', '));
        // Now test with actual columns that exist
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('id, name, original_price, sale_price, in_stock')
        .eq('in_stock', true);

      if (productsError) {
        throw new Error(`Products query failed: ${productsError.message}`);
      }
      console.log(`✅ Found ${products?.length || 0} active products`);      if (products && products.length > 0) {
        console.log(`   Sample: ${products[0].name} - $${products[0].original_price || 'N/A'}`);
      }
    } else {
      console.log('⚠️ No products found in table');
    }
    console.log('');    // Test 3: Count services
    console.log('3️⃣ Testing services table...');
    const { data: services, error: servicesError } = await supabase
      .from('services')
      .select('id, title, description, category', { count: 'exact' })
      .limit(10);

    if (servicesError) {
      throw new Error(`Services query failed: ${servicesError.message}`);
    }
    console.log(`✅ Found ${services?.length || 0} services`);
    if (services && services.length > 0) {
      console.log(`   Sample: ${services[0].title} - ${services[0].category}`);
    }
    console.log('');    // Test 4: Test categories and brands
    console.log('4️⃣ Testing categories and brands...');
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name, category_type', { count: 'exact' })
      .eq('is_active', true);

    const { data: brands, error: brandsError } = await supabase
      .from('brands')
      .select('id, name', { count: 'exact' })
      .eq('is_active', true);

    if (categoriesError || brandsError) {
      throw new Error(`Categories/Brands query failed: ${categoriesError?.message || brandsError?.message}`);
    }
    console.log(`✅ Found ${categories?.length || 0} active categories`);
    console.log(`✅ Found ${brands?.length || 0} active brands`);
    console.log('');

    // Test 5: Test views
    console.log('5️⃣ Testing database views...');
    const { data: productCatalog, error: viewError } = await supabase
      .from('product_catalog')
      .select('name, final_price, category_name, brand_name, in_stock')
      .limit(3);

    if (viewError) {
      throw new Error(`Product catalog view failed: ${viewError.message}`);
    }
    console.log(`✅ Product catalog view working - ${productCatalog?.length || 0} products loaded`);
    if (productCatalog && productCatalog.length > 0) {
      productCatalog.forEach(product => {
        console.log(`   ${product.name} (${product.category_name}) - $${product.final_price} - ${product.in_stock ? 'In Stock' : 'Out of Stock'}`);
      });
    }
    console.log('');

    // Test 6: Test service catalog view
    console.log('6️⃣ Testing service views...');
    const { data: serviceCatalog, error: serviceViewError } = await supabase
      .from('service_catalog')
      .select('name, base_price, category_name, complexity_level, features_count')
      .limit(3);

    if (serviceViewError) {
      throw new Error(`Service catalog view failed: ${serviceViewError.message}`);
    }
    console.log(`✅ Service catalog view working - ${serviceCatalog?.length || 0} services loaded`);
    if (serviceCatalog && serviceCatalog.length > 0) {
      serviceCatalog.forEach(service => {
        console.log(`   ${service.name} (${service.category_name}) - $${service.base_price} - ${service.complexity_level} complexity`);
      });
    }
    console.log('');

    // Test 7: Test relationship queries
    console.log('7️⃣ Testing relationships...');
    const { data: productWithSpecs, error: relationError } = await supabase
      .from('products')
      .select(`
        name,
        price,
        categories(name),
        brands(name),
        product_specifications(spec_name, spec_value),
        product_features(feature_name)
      `)
      .eq('status', 'active')
      .limit(1)
      .single();

    if (relationError) {
      throw new Error(`Relationship query failed: ${relationError.message}`);
    }
    console.log(`✅ Relationships working for product: ${productWithSpecs?.name}`);
    console.log(`   Category: ${productWithSpecs?.categories?.name || 'N/A'}`);
    console.log(`   Brand: ${productWithSpecs?.brands?.name || 'N/A'}`);
    console.log(`   Specifications: ${productWithSpecs?.product_specifications?.length || 0}`);
    console.log(`   Features: ${productWithSpecs?.product_features?.length || 0}`);
    console.log('');

    // Test 8: Test site settings
    console.log('8️⃣ Testing site configuration...');
    const { data: siteSettings, error: settingsError } = await supabase
      .from('site_settings')
      .select('setting_key, setting_value')
      .in('setting_key', ['site_name', 'site_description', 'contact_email']);

    if (settingsError) {
      throw new Error(`Site settings query failed: ${settingsError.message}`);
    }
    console.log(`✅ Site settings loaded - ${siteSettings?.length || 0} settings`);
    if (siteSettings && siteSettings.length > 0) {
      siteSettings.forEach(setting => {
        console.log(`   ${setting.setting_key}: ${setting.setting_value.substring(0, 50)}${setting.setting_value.length > 50 ? '...' : ''}`);
      });
    }
    console.log('');

    // Summary
    console.log('🎉 Database Test Summary:');
    console.log('========================');
    console.log('✅ Connection: Success');
    console.log(`✅ Products: ${products?.length || 0} active`);
    console.log(`✅ Services: ${services?.length || 0} active`);
    console.log(`✅ Categories: ${categories?.length || 0} active`);
    console.log(`✅ Brands: ${brands?.length || 0} active`);
    console.log('✅ Views: Working correctly');
    console.log('✅ Relationships: Properly configured');
    console.log('✅ Site Settings: Loaded successfully');
    console.log('\n🚀 Standbyte Nexus Hub database is ready for production!');

  } catch (error) {
    console.error('❌ Database test failed:', error.message);
    process.exit(1);
  }
}

// Run the tests
testDatabase();
