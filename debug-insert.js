const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🧪 Simple test insert...');

const supabase = createClient(supabaseUrl, supabaseKey);

async function simpleInsert() {
  try {
    console.log('Testing simple category insert...');
    
    const { data, error } = await supabase
      .from('categories')
      .insert({
        name: 'Test Category',
        slug: 'test-category-' + Date.now(),
        category_type: 'product',
        is_active: true
      })
      .select();
    
    if (error) {
      console.error('Error:', error.message);
      console.error('Details:', error);
    } else {
      console.log('Success:', data);
      
      // Clean up
      if (data && data.length > 0) {
        await supabase.from('categories').delete().eq('id', data[0].id);
        console.log('Cleaned up test data');
      }
    }
    
  } catch (err) {
    console.error('Catch error:', err.message);
  }
}

simpleInsert().then(() => {
  console.log('Test completed');
}).catch(err => {
  console.error('Promise error:', err);
});
