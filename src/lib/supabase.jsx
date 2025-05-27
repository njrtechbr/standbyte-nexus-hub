import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

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

  // Get user role
  getUserRole: async () => {
    try {
      const { data, error } = await supabase.rpc('get_user_role')
      return { role: data || 'customer', error }
    } catch (error) {
      return { role: 'customer', error }
    }
  },

  // Check user permission
  hasPermission: async (permission) => {
    try {
      const { data, error } = await supabase.rpc('user_has_permission', {
        permission_name: permission
      })
      return { hasPermission: data || false, error }
    } catch (error) {
      return { hasPermission: false, error }
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

// Admin helpers
export const admin = {
  // Dashboard stats
  getDashboardStats: async () => {
    try {
      const [
        { data: totalUsers },
        { data: totalOrders },
        { data: totalProducts },
        { data: totalRevenue }
      ] = await Promise.all([
        supabase.rpc('get_total_users'),
        supabase.rpc('get_total_orders'),
        supabase.rpc('get_total_products'),
        supabase.rpc('get_total_revenue')
      ])
      
      return {
        totalUsers: totalUsers || 0,
        totalOrders: totalOrders || 0,
        totalProducts: totalProducts || 0,
        totalRevenue: totalRevenue || 0
      }
    } catch (error) {
      return {
        totalUsers: 0,
        totalOrders: 0,
        totalProducts: 0,
        totalRevenue: 0,
        error
      }
    }
  },

  // User management
  users: {
    getAll: async (page = 1, limit = 20) => {
      try {
        const from = (page - 1) * limit
        const to = from + limit - 1
        
        const { data, error, count } = await supabase
          .from('customers')
          .select(`
            *,
            user_roles (
              role,
              granted_at
            )
          `, { count: 'exact' })
          .range(from, to)
          .order('created_at', { ascending: false })
        
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

    updateRole: async (userId, role) => {
      try {
        const { data, error } = await supabase.rpc('update_user_role', {
          target_user_id: userId,
          new_role: role
        })
        return { success: data || false, error }
      } catch (error) {
        return { success: false, error }
      }
    },

    delete: async (userId) => {
      try {
        const { data, error } = await supabase.rpc('delete_user', {
          target_user_id: userId
        })
        return { success: data || false, error }
      } catch (error) {
        return { success: false, error }
      }
    }
  },

  // Product management
  products: {
    create: async (productData) => {
      try {
        const { data, error } = await supabase
          .from('products')
          .insert([productData])
          .select()
          .single()
        return { data, error }
      } catch (error) {
        return { data: null, error }
      }
    },

    update: async (id, productData) => {
      try {
        const { data, error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', id)
          .select()
          .single()
        return { data, error }
      } catch (error) {
        return { data: null, error }
      }
    },

    delete: async (id) => {
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id)
        return { success: !error, error }
      } catch (error) {
        return { success: false, error }
      }
    }
  },

  // Service management
  services: {
    create: async (serviceData) => {
      try {
        const { data, error } = await supabase
          .from('services')
          .insert([serviceData])
          .select()
          .single()
        return { data, error }
      } catch (error) {
        return { data: null, error }
      }
    },

    update: async (id, serviceData) => {
      try {
        const { data, error } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', id)
          .select()
          .single()
        return { data, error }
      } catch (error) {
        return { data: null, error }
      }
    },

    delete: async (id) => {
      try {
        const { error } = await supabase
          .from('services')
          .delete()
          .eq('id', id)
        return { success: !error, error }
      } catch (error) {
        return { success: false, error }
      }
    }
  },

  // Order management
  orders: {
    getAll: async (page = 1, limit = 20, status = null) => {
      try {
        const from = (page - 1) * limit
        const to = from + limit - 1
        
        let query = supabase
          .from('orders')
          .select(`
            *,
            customers (
              full_name,
              email
            ),
            order_items (
              *,
              products (
                name,
                image_url
              )
            )
          `, { count: 'exact' })
          .range(from, to)
          .order('created_at', { ascending: false })
        
        if (status) {
          query = query.eq('status', status)
        }
        
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

    updateStatus: async (orderId, status) => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .update({ status })
          .eq('id', orderId)
          .select()
          .single()
        return { data, error }
      } catch (error) {
        return { data: null, error }
      }
    }
  },

  // Quote management
  quotes: {
    getAll: async (page = 1, limit = 20, status = null) => {
      try {
        const from = (page - 1) * limit
        const to = from + limit - 1
        
        let query = supabase
          .from('service_quotes')
          .select(`
            *,
            customers (
              full_name,
              email
            ),
            services (
              name
            )
          `, { count: 'exact' })
          .range(from, to)
          .order('created_at', { ascending: false })
        
        if (status) {
          query = query.eq('status', status)
        }
        
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

    updateStatus: async (quoteId, status, price = null) => {
      try {
        const updateData = { status }
        if (price !== null) {
          updateData.quoted_price = price
        }
        
        const { data, error } = await supabase
          .from('service_quotes')
          .update(updateData)
          .eq('id', quoteId)
          .select()
          .single()
        return { data, error }
      } catch (error) {
        return { data: null, error }
      }
    }
  },

  // Services Management
  getServices: async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data || [];
    } catch (error) {
      throw error;
    }
  },

  createService: async (serviceData) => {
    try {
      const { data, error } = await supabase
        .from('services')
        .insert([serviceData])
        .select()
        .single();
        
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },

  updateService: async (serviceId, serviceData) => {
    try {
      const { data, error } = await supabase
        .from('services')
        .update(serviceData)
        .eq('id', serviceId)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },

  deleteService: async (serviceId) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceId);
        
      if (error) throw error;
      return true;
    } catch (error) {
      throw error;
    }
  },

  // Quotes Management
  getQuotes: async () => {
    try {
      const { data, error } = await supabase
        .from('quote_requests')
        .select(`
          *,
          service:services(name, category),
          user:users(email, full_name)
        `)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data || [];
    } catch (error) {
      throw error;
    }
  },

  updateQuote: async (quoteId, quoteData) => {
    try {
      const updateData = {
        ...quoteData,
        updated_at: new Date().toISOString()
      };

      if (quoteData.status === 'quoted' && !quoteData.quoted_at) {
        updateData.quoted_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('quote_requests')
        .update(updateData)
        .eq('id', quoteId)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },

  updateQuoteStatus: async (quoteId, status) => {
    try {
      const updateData = {
        status,
        updated_at: new Date().toISOString()
      };

      if (status === 'quoted') {
        updateData.quoted_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('quote_requests')
        .update(updateData)
        .eq('id', quoteId)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },

  deleteQuote: async (quoteId) => {
    try {
      const { error } = await supabase
        .from('quote_requests')
        .delete()
        .eq('id', quoteId);
        
      if (error) throw error;
      return true;
    } catch (error) {
      throw error;
    }
  },

  // Enhanced Dashboard Stats
  getDashboardStats: async () => {
    try {
      // Get all stats in parallel
      const [
        usersResult,
        productsResult,
        ordersResult,
        quotesResult,
        recentOrdersResult,
        recentQuotesResult
      ] = await Promise.all([
        supabase.from('users').select('id, created_at', { count: 'exact' }),
        supabase.from('products').select('id, is_active', { count: 'exact' }),
        supabase.from('orders').select('id, status, total_amount, created_at', { count: 'exact' }),
        supabase.from('quote_requests').select('id, status, created_at', { count: 'exact' }),
        supabase.from('orders')
          .select(`
            id, 
            total_amount, 
            status, 
            created_at,
            user:users(full_name, email)
          `)
          .order('created_at', { ascending: false })
          .limit(5),
        supabase.from('quote_requests')
          .select(`
            id,
            project_title,
            status,
            name,
            email,
            created_at
          `)
          .order('created_at', { ascending: false })
          .limit(5)
      ]);

      // Calculate totals and active counts
      const totalUsers = usersResult.count || 0;
      const totalProducts = productsResult.count || 0;
      const activeProducts = productsResult.data?.filter(p => p.is_active).length || 0;
      const totalOrders = ordersResult.count || 0;
      const totalQuotes = quotesResult.count || 0;

      // Calculate order statistics
      const orders = ordersResult.data || [];
      const completedOrders = orders.filter(o => o.status === 'completed').length;
      const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'processing').length;
      const totalRevenue = orders
        .filter(o => o.status === 'completed')
        .reduce((sum, o) => sum + (o.total_amount || 0), 0);

      // Calculate quote statistics
      const quotes = quotesResult.data || [];
      const pendingQuotes = quotes.filter(q => q.status === 'pending').length;
      const quotedQuotes = quotes.filter(q => q.status === 'quoted').length;
      const acceptedQuotes = quotes.filter(q => q.status === 'accepted').length;

      return {
        users: {
          total: totalUsers,
          newThisMonth: usersResult.data?.filter(u => 
            new Date(u.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          ).length || 0
        },
        products: {
          total: totalProducts,
          active: activeProducts,
          inactive: totalProducts - activeProducts
        },
        orders: {
          total: totalOrders,
          completed: completedOrders,
          pending: pendingOrders,
          revenue: totalRevenue
        },
        quotes: {
          total: totalQuotes,
          pending: pendingQuotes,
          quoted: quotedQuotes,
          accepted: acceptedQuotes
        },
        recent: {
          orders: recentOrdersResult.data || [],
          quotes: recentQuotesResult.data || []
        }
      };
    } catch (error) {
      throw error;
    }
  }
}

export default supabase
