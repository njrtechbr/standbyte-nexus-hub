import { createContext, useContext, useEffect, useState } from 'react'
import { db } from '../lib/supabase'
import { useAuth } from './AuthContext'

const CartContext = createContext({
  cartItems: [],
  cartCount: 0,
  wishlistItems: [],
  wishlistCount: 0,
  loading: false,
  addToCart: async () => {},
  removeFromCart: async () => {},
  clearCart: async () => {},
  updateCartItemQuantity: async () => {},
  toggleWishlist: async () => {},
  isInWishlist: () => false,
  refreshCart: async () => {},
  refreshWishlist: async () => {}
})

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export function CartProvider({ children }) {
  const { user } = useAuth()
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [wishlistItems, setWishlistItems] = useState([])
  const [wishlistCount, setWishlistCount] = useState(0)
  const [loading, setLoading] = useState(false)

  // Load cart data
  const loadCartData = async () => {
    if (!user) {
      setCartItems([])
      setCartCount(0)
      return
    }

    try {
      const [cartResult, countResult] = await Promise.all([
        db.getCartItems(),
        db.getCartCount()
      ])

      setCartItems(cartResult.data || [])
      setCartCount(countResult.count || 0)
    } catch (error) {
      console.error('Error loading cart:', error)
    }
  }

  // Load wishlist data
  const loadWishlistData = async () => {
    if (!user) {
      setWishlistItems([])
      setWishlistCount(0)
      return
    }

    try {
      const [wishlistResult, countResult] = await Promise.all([
        db.getWishlistItems(),
        db.getWishlistCount()
      ])

      setWishlistItems(wishlistResult.data || [])
      setWishlistCount(countResult.count || 0)
    } catch (error) {
      console.error('Error loading wishlist:', error)
    }
  }

  // Add item to cart
  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      // For guest users, you might want to store in localStorage
      alert('Por favor, faça login para adicionar itens ao carrinho.')
      return { success: false, error: 'User not logged in' }
    }

    setLoading(true)
    try {
      const result = await db.addToCart(productId, quantity)
      if (result.success) {
        await refreshCart()
      }
      return result
    } catch (error) {
      console.error('Error adding to cart:', error)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  // Remove item from cart
  const removeFromCart = async (productId) => {
    if (!user) return { success: false, error: 'User not logged in' }

    setLoading(true)
    try {
      const result = await db.removeFromCart(productId)
      if (result.success) {
        await refreshCart()
      }
      return result
    } catch (error) {
      console.error('Error removing from cart:', error)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  // Update cart item quantity
  const updateCartItemQuantity = async (productId, newQuantity) => {
    if (!user) return { success: false, error: 'User not logged in' }

    if (newQuantity <= 0) {
      return await removeFromCart(productId)
    }

    setLoading(true)
    try {
      // First remove the item, then add with new quantity
      await db.removeFromCart(productId)
      const result = await db.addToCart(productId, newQuantity)
      
      if (result.success) {
        await refreshCart()
      }
      return result
    } catch (error) {
      console.error('Error updating cart quantity:', error)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  // Clear entire cart
  const clearCart = async () => {
    if (!user) return { success: false, error: 'User not logged in' }

    setLoading(true)
    try {
      // Remove all items one by one
      const removePromises = cartItems.map(item => 
        db.removeFromCart(item.product_id)
      )
      
      await Promise.all(removePromises)
      await refreshCart()
      return { success: true }
    } catch (error) {
      console.error('Error clearing cart:', error)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  // Toggle wishlist item
  const toggleWishlist = async (productId) => {
    if (!user) {
      alert('Por favor, faça login para adicionar itens à lista de desejos.')
      return { success: false, error: 'User not logged in' }
    }

    setLoading(true)
    try {
      const result = await db.toggleWishlist(productId)
      if (result.added !== undefined) {
        await refreshWishlist()
      }
      return result
    } catch (error) {
      console.error('Error toggling wishlist:', error)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  // Check if item is in wishlist
  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.product_id === productId)
  }

  // Refresh cart data
  const refreshCart = async () => {
    await loadCartData()
  }

  // Refresh wishlist data
  const refreshWishlist = async () => {
    await loadWishlistData()
  }

  // Load data when user changes
  useEffect(() => {
    if (user) {
      loadCartData()
      loadWishlistData()
    } else {
      setCartItems([])
      setCartCount(0)
      setWishlistItems([])
      setWishlistCount(0)
    }
  }, [user])

  const value = {
    cartItems,
    cartCount,
    wishlistItems,
    wishlistCount,
    loading,
    addToCart,
    removeFromCart,
    clearCart,
    updateCartItemQuantity,
    toggleWishlist,
    isInWishlist,
    refreshCart,
    refreshWishlist
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
