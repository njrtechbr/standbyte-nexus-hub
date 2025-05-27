import { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useAdmin } from '../../contexts/AdminContext'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Badge } from '../ui/badge'
import {
  Menu,
  Home,
  Users,
  Package,
  Wrench,
  ShoppingCart,
  FileText,
  BarChart3,
  MessageSquare,
  FileEdit,
  Settings,
  LogOut,
  User
} from 'lucide-react'

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: Home,
    permission: 'view_dashboard'
  },
  {
    title: 'Usuários',
    href: '/admin/users',
    icon: Users,
    permission: 'manage_users'
  },
  {
    title: 'Produtos',
    href: '/admin/products',
    icon: Package,
    permission: 'manage_products'
  },
  {
    title: 'Serviços',
    href: '/admin/services',
    icon: Wrench,
    permission: 'manage_services'
  },
  {
    title: 'Pedidos',
    href: '/admin/orders',
    icon: ShoppingCart,
    permission: 'manage_orders'
  },
  {
    title: 'Orçamentos',
    href: '/admin/quotes',
    icon: FileText,
    permission: 'manage_quotes'
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    permission: 'view_analytics'
  },
  {
    title: 'Avaliações',
    href: '/admin/reviews',
    icon: MessageSquare,
    permission: 'manage_reviews'
  },
  {
    title: 'Conteúdo',
    href: '/admin/content',
    icon: FileEdit,
    permission: 'manage_content'
  },  {
    title: 'Configurações',
    href: '/admin/settings',
    icon: Settings,
    permission: 'manage_settings'
  }
]

function Sidebar({ className = '' }) {
  const location = useLocation()
  const { hasPermission, userRole } = useAdmin()

  const filteredItems = sidebarItems.filter(item => 
    !item.permission || hasPermission(item.permission)
  )

  return (
    <div className={`pb-12 ${className}`}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center mb-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-xl">Standbyte</span>
            </Link>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="capitalize">
              {userRole.replace('_', ' ')}
            </Badge>
          </div>
          <div className="space-y-1">
            {filteredItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent ${
                    isActive 
                      ? 'bg-accent text-accent-foreground' 
                      : 'text-muted-foreground hover:text-accent-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export function AdminLayout() {
  const { user, profile, signOut } = useAuth()
  const { userRole } = useAdmin()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Desktop Sidebar */}
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <Sidebar />
        </div>
      </div>

      <div className="flex flex-col">
        {/* Header */}
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          {/* Mobile Menu */}
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <Sidebar className="flex-1" />
            </SheetContent>
          </Sheet>

          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold md:text-2xl">
              Painel Administrativo
            </h1>
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback>
                    {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  {profile?.full_name && (
                    <p className="font-medium">{profile.full_name}</p>
                  )}
                  {user?.email && (
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  )}
                  <Badge variant="outline" className="w-fit capitalize text-xs">
                    {userRole.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/conta" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Minha Conta
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/" className="cursor-pointer">
                  <Home className="mr-2 h-4 w-4" />
                  Voltar ao Site
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
