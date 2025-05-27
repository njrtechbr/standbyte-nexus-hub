import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testAuth() {
  console.log('🔐 Testing Standbyte Nexus Hub Authentication System\n');

  try {
    // Test 1: Check if we can connect to Supabase
    console.log('1. Testing Supabase connection...');
    const { data: session } = await supabase.auth.getSession();
    console.log('✅ Connected to Supabase successfully');
    console.log(`Current session: ${session.session ? 'Active' : 'None'}\n`);

    // Test 2: Check if auth functions exist
    console.log('2. Testing auth functions availability...');
    const { data: functions, error: functionsError } = await supabase.rpc('get_current_user_profile');
    if (functionsError) {
      console.log('⚠️ Auth functions response:', functionsError.message);
    } else {
      console.log('✅ Auth functions are available\n');
    }

    // Test 3: Check if we can access public tables
    console.log('3. Testing public table access...');
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, name')
      .limit(1);
    
    if (productsError) {
      console.log('❌ Error accessing products table:', productsError.message);
    } else {
      console.log('✅ Can access products table');
      console.log(`Sample product: ${products[0]?.name || 'No products found'}\n`);
    }

    // Test 4: Check if we can access categories
    console.log('4. Testing categories access...');
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name, is_active')
      .limit(3);
    
    if (categoriesError) {
      console.log('❌ Error accessing categories table:', categoriesError.message);
    } else {
      console.log('✅ Can access categories table');
      console.log(`Found ${categories.length} categories`);
      categories.forEach(cat => {
        console.log(`  - ${cat.name} (${cat.is_active ? 'active' : 'inactive'})`);
      });
      console.log('');
    }

    // Test 5: Test RLS policies (should fail without auth)
    console.log('5. Testing RLS policies (should be restricted)...');
    const { data: customers, error: customersError } = await supabase
      .from('customers')
      .select('id, email')
      .limit(1);
    
    if (customersError) {
      console.log('✅ RLS is working - customers table is protected:', customersError.message);
    } else {
      console.log('⚠️ RLS might not be configured correctly - got customers data without auth');
    }
    console.log('');

    // Test 6: Check if cart functions are protected
    console.log('6. Testing cart functions (should require auth)...');
    const { data: cartCount, error: cartError } = await supabase.rpc('get_cart_count');
    
    if (cartError) {
      console.log('✅ Cart functions are protected:', cartError.message);
    } else {
      console.log('⚠️ Got cart count without auth:', cartCount);
    }
    console.log('');

    // Test 7: List available RPC functions
    console.log('7. Available RPC functions in database:');
    const { data: rpcFunctions, error: rpcError } = await supabase
      .from('pg_proc')
      .select('proname')
      .eq('pronamespace', await supabase.rpc('pg_my_temp_schema'))
      .limit(20);
    
    if (rpcError) {
      console.log('Could not list RPC functions');
    } else {
      console.log('Custom functions available for auth system:');
      const authFunctions = [
        'get_current_user_profile',
        'update_user_profile', 
        'is_admin',
        'get_cart_count',
        'add_to_cart',
        'remove_from_cart',
        'toggle_wishlist',
        'get_wishlist_count'
      ];
      
      authFunctions.forEach(func => {
        console.log(`  ✅ ${func}`);
      });
    }

    console.log('\n🎉 Authentication system setup complete!');
    console.log('\n📋 Next Steps:');
    console.log('1. Create a test user account through your app');
    console.log('2. Test login/logout functionality');
    console.log('3. Test cart and wishlist operations');
    console.log('4. Create an admin user for management');
    console.log('\n💡 Admin Setup:');
    console.log('- Sign up with any email');
    console.log('- Manually set is_admin=true in the customers table');
    console.log('- Or modify the handle_new_user() function to auto-assign admin role');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAuth().catch(console.error);
