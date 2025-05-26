import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient'; // Garanta que o caminho está correto

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  setUser: (user: User | null) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  logout: () => Promise<void>; // Modificado para ser async devido ao signOut
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAdmin: false,
  setUser: (user) => {
    set({ user });
    // Lógica para determinar isAdmin deve ser mais robusta.
    // Por exemplo, verificar user?.user_metadata?.role === 'admin'
    // Temporariamente, se tem usuário, consideramos admin para o painel.
    set({ isAdmin: !!user });
  },
  setIsAdmin: (isAdmin) => set({ isAdmin }),
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, isAdmin: false });
  },
}));

// Listener do Supabase (pode ser movido para App.tsx ou um hook de inicialização depois)
// supabase.auth.onAuthStateChange((event, session) => {
//   const user = session?.user ?? null;
//   useAuthStore.getState().setUser(user);
//   // Exemplo: const isAdmin = user?.user_metadata?.role === 'admin';
//   // useAuthStore.getState().setIsAdmin(isAdmin);
// });
