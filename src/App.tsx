
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { AdminProvider } from "./contexts/AdminContext";
import { CartProvider } from "./contexts/CartContext";
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
import { AdminLayout } from "./components/admin/AdminLayout";
import { ProtectedAdminRoute } from "./components/admin/ProtectedAdminRoute";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { UserManagement } from "./pages/admin/UserManagement";
import { ProductManagement } from "./pages/admin/ProductManagement";
import { OrderManagement } from "./pages/admin/OrderManagement";
import ServiceManagement from "./pages/admin/ServiceManagement";
import QuoteManagement from "./pages/admin/QuoteManagement";
import Analytics from "./pages/admin/Analytics";
import SystemSettings from "./pages/admin/SystemSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <AdminProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
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
                  {/* Admin Routes */}
                <Route path="/admin" element={
                  <ProtectedAdminRoute requiredPermission="view_dashboard">
                    <AdminLayout />
                  </ProtectedAdminRoute>
                }>
                  <Route index element={<AdminDashboard />} />
                  <Route path="users" element={
                    <ProtectedAdminRoute requiredPermission="manage_users">
                      <UserManagement />
                    </ProtectedAdminRoute>
                  } />
                  <Route path="products" element={
                    <ProtectedAdminRoute requiredPermission="manage_products">
                      <ProductManagement />
                    </ProtectedAdminRoute>
                  } />                  <Route path="orders" element={
                    <ProtectedAdminRoute requiredPermission="manage_orders">
                      <OrderManagement />
                    </ProtectedAdminRoute>
                  } />
                  <Route path="services" element={
                    <ProtectedAdminRoute requiredPermission="manage_services">
                      <ServiceManagement />
                    </ProtectedAdminRoute>
                  } />                  <Route path="quotes" element={
                    <ProtectedAdminRoute requiredPermission="manage_quotes">
                      <QuoteManagement />
                    </ProtectedAdminRoute>
                  } />
                  <Route path="analytics" element={
                    <ProtectedAdminRoute requiredPermission="view_analytics">
                      <Analytics />
                    </ProtectedAdminRoute>
                  } />
                  <Route path="settings" element={
                    <ProtectedAdminRoute requiredPermission="manage_settings">
                      <SystemSettings />
                    </ProtectedAdminRoute>
                  } />
                  {/* TODO: Add more admin routes */}
                </Route>
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </AdminProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
