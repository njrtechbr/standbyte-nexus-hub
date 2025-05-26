import { createClient } from '@supabase/supabase-js';

// Obtenha a URL do Supabase e a chave anônima das variáveis de ambiente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Valide se as variáveis de ambiente estão definidas
if (!supabaseUrl) {
  throw new Error("VITE_SUPABASE_URL is not defined in your .env file");
}

if (!supabaseAnonKey) {
  throw new Error("VITE_SUPABASE_ANON_KEY is not defined in your .env file");
}

// Crie e exporte o cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
