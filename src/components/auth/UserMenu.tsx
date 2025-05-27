import React, { useState } from 'react'
import { LogOut, User, Settings, ShoppingCart, Heart, Package, Crown } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { useAuth } from '../../contexts/AuthContext'
import { useCart } from '../../contexts/CartContext'

interface UserMenuProps {
  onAuthClick?: () => void
  onProfileClick?: () => void
  onCartClick?: () => void
  onWishlistClick?: () => void
  onOrdersClick?: () => void
  onAdminClick?: () => void
}

export function UserMenu({ 
  onAuthClick, 
  onProfileClick, 
  onCartClick, 
  onWishlistClick, 
  onOrdersClick,
  onAdminClick 
}: UserMenuProps) {
  const { user, profile, isAdmin, signOut, loading } = useAuth()
  const { cartCount, wishlistCount } = useCart()
  const [logoutLoading, setLogoutLoading] = useState(false)

  const handleSignOut = async () => {
    setLogoutLoading(true)
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setLogoutLoading(false)
    }
  }

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return 'U'
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase()
  }

  const getDisplayName = (firstName?: string, lastName?: string, email?: string) => {
    if (firstName || lastName) {
      return `${firstName || ''} ${lastName || ''}`.trim()
    }
    return email?.split('@')[0] || 'Usuário'
  }

  if (loading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="animate-pulse bg-gray-200 rounded-full h-8 w-8"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <Button onClick={onAuthClick} variant="outline" size="sm">
        <User className="w-4 h-4 mr-2" />
        Entrar
      </Button>
    )
  }

  return (
    <div className="flex items-center space-x-4">
      {/* Cart Icon with Count */}
      <Button 
        variant="ghost" 
        size="sm" 
        className="relative"
        onClick={onCartClick}
      >
        <ShoppingCart className="w-4 h-4" />
        {cartCount > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full text-xs p-0 flex items-center justify-center">
            {cartCount > 99 ? '99+' : cartCount}
          </Badge>
        )}
      </Button>

      {/* Wishlist Icon with Count */}
      <Button 
        variant="ghost" 
        size="sm" 
        className="relative"
        onClick={onWishlistClick}
      >
        <Heart className="w-4 h-4" />
        {wishlistCount > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full text-xs p-0 flex items-center justify-center">
            {wishlistCount > 99 ? '99+' : wishlistCount}
          </Badge>
        )}
      </Button>

      {/* User Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-blue-500 text-white text-xs">
                {getInitials(profile?.first_name, profile?.last_name)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {getDisplayName(profile?.first_name, profile?.last_name, user.email)}
                {isAdmin && (
                  <Crown className="inline ml-2 h-3 w-3 text-yellow-500" />
                )}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
              {isAdmin && (
                <Badge variant="secondary" className="text-xs w-fit">
                  Administrador
                </Badge>
              )}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={onProfileClick}>
            <User className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={onOrdersClick}>
            <Package className="mr-2 h-4 w-4" />
            <span>Meus Pedidos</span>
          </DropdownMenuItem>
          
          {isAdmin && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onAdminClick}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Painel Admin</span>
              </DropdownMenuItem>
            </>
          )}
          
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} disabled={logoutLoading}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>{logoutLoading ? 'Saindo...' : 'Sair'}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
