import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://beccfqypzaxvgkgtqmgc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlY2NmcXlwemF4dmdrZ3RxbWdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyODk0NjksImV4cCI6MjA2Mzg2NTQ2OX0.vWn0aX1RtTNLIwWgxZ3M8YonKMvNwVvg_Y6mn_WYtZE'
);

console.log('🔍 Quick Database Check...');

// Test simple connection
supabase
  .from('products')
  .select('*')
  .limit(1)
  .then(({ data, error }) => {
    if (error) {
      console.log('❌ Products table error:', error.message);
    } else {
      console.log('✅ Products table accessible');
      console.log('   Records:', data?.length || 0);
      if (data && data.length > 0) {
        console.log('   Columns:', Object.keys(data[0]).join(', '));
      }
    }
  })
  .then(() => {
    return supabase
      .from('services')
      .select('*')
      .limit(1);
  })
  .then(({ data, error }) => {
    if (error) {
      console.log('❌ Services table error:', error.message);
    } else {
      console.log('✅ Services table accessible');
      console.log('   Records:', data?.length || 0);
      if (data && data.length > 0) {
        console.log('   Columns:', Object.keys(data[0]).join(', '));
      }
    }
  })
  .catch(err => {
    console.error('❌ Connection failed:', err.message);
  });
