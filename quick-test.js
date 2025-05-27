const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Starting database test...');
console.log('URL exists:', !!supabaseUrl);
console.log('Key exists:', !!supabaseKey);

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function quickTest() {
  try {
    console.log('Testing connection...');
    
    const { data, error } = await supabase
      .from('products')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Connection error:', error.message);
      return;
    }
    
    console.log('Connection successful');
    
    // Try a simple insert
    console.log('Testing insert...');
    const { data: insertData, error: insertError } = await supabase
      .from('products')
      .insert({
        name: 'Quick Test Product',
        brand: 'Test',
        slug: 'quick-test-' + Date.now(),
        description: 'Test description',
        category: 'Test',
        original_price: 100,
        sale_price: 90
      })
      .select();
    
    if (insertError) {
      console.error('Insert error:', insertError.message);
      console.error('Insert error details:', insertError);
    } else {
      console.log('Insert successful:', insertData);
    }
    
  } catch (err) {
    console.error('Script error:', err.message);
  }
}

quickTest();
