// src/admin/routes/AdminPanelRoutes.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '@/admin/components/layout/AdminLayout';
import DashboardPage from '@/admin/pages/DashboardPage';
// Importe outras páginas do admin aqui quando forem criadas

export default function AdminPanelRoutes() {
  return (
    <AdminLayout> {/* O Layout agora envolve todas as rotas aqui */}
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        {/* Adicionar outras rotas protegidas aqui */}
        {/* Ex: <Route path="products" element={<ProductsListPage />} /> */}
        {/* Ex: <Route path="*" element={<AdminNotFoundPage />} /> */}
      </Routes>
    </AdminLayout>
  );
}
