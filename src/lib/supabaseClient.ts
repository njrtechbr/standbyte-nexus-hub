
import { createClient } from '@supabase/supabase-js';

// Obtenha a URL do Supabase e a chave anônima das variáveis de ambiente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verificar se as variáveis de ambiente estão configuradas corretamente
const isSupabaseConfigured = supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== "https://your-project.supabase.co" && 
  supabaseAnonKey !== "your-anon-key-here";

if (!isSupabaseConfigured) {
  console.warn("Supabase não está configurado. Configure as variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no arquivo .env");
}

// Crie o cliente Supabase apenas se estiver configurado, caso contrário use valores dummy
export const supabase = createClient(
  supabaseUrl || "https://dummy.supabase.co", 
  supabaseAnonKey || "dummy-key"
);

// Função helper para verificar se o Supabase está configurado
export const isSupabaseReady = () => isSupabaseConfigured;

// Opcional: Defina tipos para o seu banco de dados Supabase (se você tiver um gerador de tipos)
// export interface Database {
//   public: {
//     Tables: {
//       // Defina suas tabelas aqui
//       // exemplo:
//       // products: {
//       //   Row: {}; // Interface da linha da tabela
//       //   Insert: {}; // Interface para inserção
//       //   Update: {}; // Interface para atualização
//       // };
//     };
//     Views: {
//       // Defina suas views aqui
//     };
//     Functions: {
//       // Defina suas funções aqui
//     };
//   };
// }

// Se você estiver usando tipos gerados (ex: com `npx supabase gen types typescript --project-id <your-project-id> > src/types/supabase.ts`)
// você pode importar esses tipos e usá-los com o cliente:
// import { Database } from '@/types/supabase';
// export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
