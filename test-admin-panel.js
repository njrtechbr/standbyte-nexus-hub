// Test script for admin panel functionality
// Run this after applying the database migration

import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase credentials
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testAdminPanel() {
  console.log('🧪 Testing Admin Panel Setup...\n');

  try {
    // Test 1: Check if admin tables exist
    console.log('1. Checking admin tables...');
    const { data: roles, error: rolesError } = await supabase
      .from('admin_roles')
      .select('*')
      .limit(1);
    
    if (rolesError) {
      console.log('❌ Admin roles table missing or inaccessible');
      console.log('   Error:', rolesError.message);
    } else {
      console.log('✅ Admin roles table exists');
    }

    // Test 2: Check services table
    console.log('\n2. Checking services table...');
    const { data: services, error: servicesError } = await supabase
      .from('services')
      .select('*')
      .limit(1);
    
    if (servicesError) {
      console.log('❌ Services table missing or inaccessible');
      console.log('   Error:', servicesError.message);
      console.log('   Please apply the migration in Supabase SQL Editor');
    } else {
      console.log('✅ Services table exists');
      console.log(`   Found ${services?.length || 0} sample services`);
    }

    // Test 3: Check quote_requests table
    console.log('\n3. Checking quote_requests table...');
    const { data: quotes, error: quotesError } = await supabase
      .from('quote_requests')
      .select('*')
      .limit(1);
    
    if (quotesError) {
      console.log('❌ Quote requests table missing or inaccessible');
      console.log('   Error:', quotesError.message);
    } else {
      console.log('✅ Quote requests table exists');
    }

    // Test 4: Check permissions
    console.log('\n4. Checking admin permissions...');
    const { data: permissions, error: permError } = await supabase
      .from('admin_permissions')
      .select('permission_name')
      .in('permission_name', ['manage_services', 'manage_quotes', 'view_analytics', 'manage_settings']);
    
    if (permError) {
      console.log('❌ Admin permissions check failed');
      console.log('   Error:', permError.message);
    } else {
      console.log('✅ Admin permissions configured');
      console.log('   Available permissions:', permissions?.map(p => p.permission_name).join(', '));
    }

    console.log('\n🎉 Admin Panel Test Complete!');
    console.log('\nNext steps:');
    console.log('1. Apply the migration SQL in Supabase Dashboard');
    console.log('2. Create a user account and assign admin role');
    console.log('3. Start the development server: npm run dev');
    console.log('4. Navigate to /admin to access the panel');

  } catch (error) {
    console.log('❌ Test failed with error:', error.message);
  }
}

// Run the test
testAdminPanel();
