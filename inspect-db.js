import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Load environment variables
config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectDatabase() {
  console.log('🔍 Inspecting Standbyte Nexus Hub Database Schema...\n');

  try {
    // Get all tables in public schema
    const { data: tables, error: tablesError } = await supabase
      .rpc('sql', {
        query: `
          SELECT table_name 
          FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_type = 'BASE TABLE'
          ORDER BY table_name;
        `
      });

    if (tablesError) {
      console.log('❌ Error getting tables, trying alternative method...');
      
      // Try direct table access
      console.log('Testing direct table access...');
      
      const testTables = ['products', 'services', 'categories', 'brands', 'customers'];
      
      for (const tableName of testTables) {
        try {
          const result = await supabase.from(tableName).select('*').limit(1);
          if (result.error) {
            console.log(`❌ ${tableName}: ${result.error.message}`);
          } else {
            console.log(`✅ ${tableName}: Accessible (${result.data?.length || 0} rows sampled)`);
            if (result.data && result.data.length > 0) {
              console.log(`   Columns: ${Object.keys(result.data[0]).join(', ')}`);
            }
          }
        } catch (err) {
          console.log(`❌ ${tableName}: ${err.message}`);
        }
      }
    } else {
      console.log('✅ Found tables:', tables?.map(t => t.table_name).join(', '));
      
      // Test each table
      for (const table of tables || []) {
        try {
          const result = await supabase.from(table.table_name).select('*').limit(1);
          if (result.error) {
            console.log(`❌ ${table.table_name}: ${result.error.message}`);
          } else {
            console.log(`✅ ${table.table_name}: ${result.data?.length || 0} rows`);
            if (result.data && result.data.length > 0) {
              console.log(`   Columns: ${Object.keys(result.data[0]).join(', ')}`);
            }
          }
        } catch (err) {
          console.log(`❌ ${table.table_name}: ${err.message}`);
        }
      }
    }

  } catch (error) {
    console.error('❌ Database inspection failed:', error.message);
  }
}

inspectDatabase();
