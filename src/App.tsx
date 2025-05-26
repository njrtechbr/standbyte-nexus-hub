// src/App.tsx
import React from "react"; // Import React for useEffect
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { supabase } from "./lib/supabaseClient";
import { useAuthStore } from "./store/authStore";

// Rotas do Site Público
import Index from "./pages/Index";
import Produtos from "./pages/Produtos";
import ProdutoIndividual from "./pages/ProdutoIndividual";
import Servicos from "./pages/Servicos";
import ServicoIndividual from "./pages/ServicoIndividual";
import Sobre from "./pages/Sobre";
import Carrinho from "./pages/Carrinho";
import Contato from "./pages/Contato";
import Orcamento from "./pages/Orcamento";
import Conta from "./pages/Conta";
import NotFound from "./pages/NotFound";

// Componentes Admin
import LoginPage from '@/admin/pages/LoginPage';
import AuthGuard from '@/admin/routes/AuthGuard'; // AuthGuard agora é importado aqui
import AdminPanelRoutes from '@/admin/routes/AdminPanelRoutes';

const queryClient = new QueryClient();

const App = () => {
  React.useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const user = session?.user ?? null;
        useAuthStore.getState().setUser(user);
        // A lógica de isAdmin deve ser mais robusta, baseada em roles do Supabase por exemplo.
        // Por agora, se há um usuário logado, permitimos acesso às rotas guardadas.
        useAuthStore.getState().setIsAdmin(!!user);
      }
    );
    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Rotas do Site Público */}
            <Route path="/" element={<Index />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/produto/:slug" element={<ProdutoIndividual />} />
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/servico/:slug" element={<ServicoIndividual />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/orcamento" element={<Orcamento />} />
            <Route path="/conta" element={<Conta />} />
            
            {/* Rota de Login do Admin */}
            <Route path="/admin/login" element={<LoginPage />} />

            {/* Rotas Protegidas do Painel de Admin */}
            <Route 
              path="/admin/*" 
              element={
                <AuthGuard>
                  <AdminPanelRoutes />
                </AuthGuard>
              } 
            />
            
            {/* Rota Catch-all para o site público */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
