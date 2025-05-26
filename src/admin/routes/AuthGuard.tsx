// src/admin/routes/AuthGuard.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore'; // Ajuste o caminho

interface AuthGuardProps {
  // Se você quiser passar roles específicas no futuro
  // allowedRoles?: string[];
}

export default function AuthGuard({}: AuthGuardProps) {
  const user = useAuthStore((state) => state.user);
  const isAdmin = useAuthStore((state) => state.isAdmin); // Usaremos isso
  const location = useLocation();

  // Lógica de verificação:
  // 1. Precisa ter um usuário logado.
  // 2. O usuário precisa ser um admin (a lógica de isAdmin no store pode ser melhorada no futuro).
  const isAuthenticatedAndAdmin = user && isAdmin;

  if (!isAuthenticatedAndAdmin) {
    // Redireciona para a página de login, guardando a rota original para possível redirecionamento após login
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />; // Renderiza o conteúdo protegido (rotas aninhadas)
}
