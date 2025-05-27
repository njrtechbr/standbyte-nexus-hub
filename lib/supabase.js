import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helpers
export const auth = {
  // Sign up new user
  signUp: async (email, password, userData = {}) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      })
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Sign in user
  signIn: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Sign out user
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut()
      return { error }
    } catch (error) {
      return { error }
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      return { user, error }
    } catch (error) {
      return { user: null, error }
    }
  },

  // Get current user session
  getSession: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      return { session, error }
    } catch (error) {
      return { session: null, error }
    }
  },

  // Listen to auth changes
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Database helpers
export const db = {
  // Get current user profile
  getCurrentProfile: async () => {
    try {
      const { data, error } = await supabase.rpc('get_current_user_profile')
      return { data: data?.[0] || null, error }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const { data, error } = await supabase.rpc('update_user_profile', profileData)
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Check if user is admin
  isAdmin: async () => {
    try {
      const { data, error } = await supabase.rpc('is_admin')
      return { isAdmin: data || false, error }
    } catch (error) {
      return { isAdmin: false, error }
    }
  },

  // Cart operations
  getCartCount: async () => {
    try {
      const { data, error } = await supabase.rpc('get_cart_count')
      return { count: data || 0, error }
    } catch (error) {
      return { count: 0, error }
    }
  },

  addToCart: async (productId, quantity = 1) => {
    try {
      const { data, error } = await supabase.rpc('add_to_cart', {
        product_id_param: productId,
        quantity_param: quantity
      })
      return { success: data || false, error }
    } catch (error) {
      return { success: false, error }
    }
  },

  removeFromCart: async (productId) => {
    try {
      const { data, error } = await supabase.rpc('remove_from_cart', {
        product_id_param: productId
      })
      return { success: data || false, error }
    } catch (error) {
      return { success: false, error }
    }
  },

  // Wishlist operations
  getWishlistCount: async () => {
    try {
      const { data, error } = await supabase.rpc('get_wishlist_count')
      return { count: data || 0, error }
    } catch (error) {
      return { count: 0, error }
    }
  },

  toggleWishlist: async (productId) => {
    try {
      const { data, error } = await supabase.rpc('toggle_wishlist', {
        product_id_param: productId
      })
      return { added: data || false, error }
    } catch (error) {
      return { added: false, error }
    }
  },

  // Get cart items
  getCartItems: async () => {
    try {
      const { data, error } = await supabase
        .from('shopping_cart')
        .select(`
          *,
          products (
            id,
            name,
            original_price,
            sale_price,
            image_url,
            slug
          )
        `)
      return { data: data || [], error }
    } catch (error) {
      return { data: [], error }
    }
  },

  // Get wishlist items
  getWishlistItems: async () => {
    try {
      const { data, error } = await supabase
        .from('wishlist')
        .select(`
          *,
          products (
            id,
            name,
            original_price,
            sale_price,
            image_url,
            slug,
            rating
          )
        `)
      return { data: data || [], error }
    } catch (error) {
      return { data: [], error }
    }
  },

  // Get user orders
  getUserOrders: async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (
              name,
              image_url
            )
          )
        `)
        .order('created_at', { ascending: false })
      return { data: data || [], error }
    } catch (error) {
      return { data: [], error }
    }
  }
}

// Products helpers
export const products = {
  // Get all products with pagination
  getAll: async (page = 1, limit = 12, filters = {}) => {
    try {
      let query = supabase
        .from('products')
        .select('*', { count: 'exact' })

      // Apply filters
      if (filters.category) {
        query = query.eq('category', filters.category)
      }
      if (filters.brand) {
        query = query.eq('brand', filters.brand)
      }
      if (filters.minPrice) {
        query = query.gte('sale_price', filters.minPrice)
      }
      if (filters.maxPrice) {
        query = query.lte('sale_price', filters.maxPrice)
      }
      if (filters.search) {
        query = query.ilike('name', `%${filters.search}%`)
      }

      // Pagination
      const from = (page - 1) * limit
      const to = from + limit - 1
      query = query.range(from, to)

      const { data, error, count } = await query
      return { 
        data: data || [], 
        error,
        totalCount: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    } catch (error) {
      return { data: [], error, totalCount: 0, totalPages: 0 }
    }
  },

  // Get single product by slug
  getBySlug: async (slug) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single()
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  }
}

// Services helpers
export const services = {
  // Get all services
  getAll: async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false })
      return { data: data || [], error }
    } catch (error) {
      return { data: [], error }
    }
  },

  // Get single service by slug
  getBySlug: async (slug) => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('slug', slug)
        .single()
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  }
}

export default supabase
