// src/admin/components/layout/AdminLayout.tsx
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore'; // Ajuste o caminho
import { Button } from '@/components/ui/button'; // Ajuste o caminho
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'; // Ajuste
import { LayoutDashboard, ShoppingBag, Wrench, FileText, MessageSquare, Settings, LogOut, ChevronDown, Menu as MenuIcon, Users, FileSliders, Palette } from 'lucide-react'; // Adicionei mais ícones

// Placeholder para o nome do usuário, idealmente viria do store/user object
const AdminHeader: React.FC = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-neutralWhite border-b border-neutralLight flex items-center justify-between px-6 z-50">
      <div>
        {/* Pode ser usado para breadcrumbs ou título da página atual */}
        <h1 className="text-xl font-semibold text-primaryBlue">Admin StandByte</h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-neutralDark">Olá, {user?.email || 'Admin'}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 text-neutralDark">
              Menu <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem>Perfil</DropdownMenuItem> */}
            {/* <DropdownMenuItem>Configurações</DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive hover:!text-destructive-foreground hover:!bg-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Produtos', href: '/admin/products', icon: ShoppingBag },
  { label: 'Serviços', href: '/admin/services', icon: Wrench },
  { label: 'Orçamentos', href: '/admin/quotes', icon: FileText },
  { label: 'Mensagens', href: '/admin/contact-messages', icon: MessageSquare },
  { label: 'Conteúdo Páginas', href: '/admin/pages-content', icon: FileSliders },
  // Adicionar mais itens conforme necessário
  // { label: 'Configurações de SEO', href: '/admin/seo', icon: Settings },
  // { label: 'Usuários Admin', href: '/admin/users', icon: Users },
  // { label: 'Aparência (Tema)', href: '/admin/theme', icon: Palette },
];

const AdminSidebar: React.FC = () => {
  // Lógica para sidebar responsivo/colapsável pode ser adicionada aqui no futuro
  return (
    <aside className="fixed top-16 left-0 bottom-0 w-64 bg-neutralLight border-r border-neutralLight p-4 z-40 flex flex-col">
      <nav className="flex-grow">
        <ul>
          {navItems.map((item) => (
            <li key={item.label} className="mb-2">
              <Link
                to={item.href}
                className="flex items-center p-2 text-neutralDark hover:bg-primaryBlue hover:text-neutralWhite rounded-md transition-colors"
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-2 text-center text-sm text-neutralMid">
        © {new Date().getFullYear()} StandByte
      </div>
    </aside>
  );
};

export default function AdminLayout() {
  const user = useAuthStore((state) => state.user); // Para verificar se deve renderizar o layout
  const navigate = useNavigate();

  // Se não houver usuário, não renderizar o layout (AuthGuard já deve ter redirecionado, mas é uma segurança extra)
  // React.useEffect(() => {
  //   if (!user) {
  //     navigate('/admin/login');
  //   }
  // }, [user, navigate]);

  // if (!user) {
  //   return null; // Ou um loader, enquanto o AuthGuard faz o trabalho dele
  // }

  return (
    <div className="min-h-screen bg-neutralWhite">
      <AdminHeader />
      <div className="flex pt-16">
        <AdminSidebar />
        <main className="flex-grow p-6 ml-64 bg-neutralLight/30"> {/* Ajuste o bg aqui se necessário */}
          <Outlet /> {/* Conteúdo da página específica do admin será renderizado aqui */}
        </main>
      </div>
    </div>
  );
}
