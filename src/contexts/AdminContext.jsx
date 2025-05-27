import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { admin } from '../lib/supabase'

const AdminContext = createContext({
  userRole: 'customer',
  permissions: [],
  hasPermission: () => false,
  dashboardStats: null,
  loading: true,
  refreshStats: async () => {},
  refreshPermissions: async () => {}
})

export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}

export function AdminProvider({ children }) {
  const { user, isAdmin } = useAuth()
  const [userRole, setUserRole] = useState('customer')
  const [permissions, setPermissions] = useState([])
  const [dashboardStats, setDashboardStats] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user has specific permission
  const hasPermission = (permission) => {
    return permissions.includes(permission)
  }

  // Load user permissions
  const loadPermissions = async () => {
    if (!user || !isAdmin) {
      setPermissions([])
      setUserRole('customer')
      return
    }

    try {
      // Get user role
      const { role } = await admin.getUserRole()
      setUserRole(role)

      // Get permissions based on role
      // Since we have role-based permissions in the DB, we'll simulate this for now
      const rolePermissions = {
        super_admin: [
          'view_dashboard',
          'manage_users',
          'manage_products',
          'manage_services',
          'manage_orders',
          'manage_quotes',
          'view_analytics',
          'manage_reviews',
          'manage_content',
          'system_settings'
        ],
        admin: [
          'view_dashboard',
          'manage_users',
          'manage_products',
          'manage_services',
          'manage_orders',
          'manage_quotes',
          'view_analytics',
          'manage_reviews',
          'manage_content'
        ],
        manager: [
          'view_dashboard',
          'manage_products',
          'manage_services',
          'manage_orders',
          'manage_quotes',
          'view_analytics'
        ]
      }

      setPermissions(rolePermissions[role] || [])
    } catch (error) {
      console.error('Error loading permissions:', error)
      setPermissions([])
      setUserRole('customer')
    }
  }

  // Load dashboard stats
  const loadDashboardStats = async () => {
    if (!user || !isAdmin) {
      setDashboardStats(null)
      return
    }

    try {
      const stats = await admin.getDashboardStats()
      setDashboardStats(stats)
    } catch (error) {
      console.error('Error loading dashboard stats:', error)
      setDashboardStats(null)
    }
  }

  // Refresh functions
  const refreshStats = async () => {
    await loadDashboardStats()
  }

  const refreshPermissions = async () => {
    await loadPermissions()
  }

  // Initialize admin data when user changes
  useEffect(() => {
    const initializeAdmin = async () => {
      setLoading(true)
      await Promise.all([
        loadPermissions(),
        loadDashboardStats()
      ])
      setLoading(false)
    }

    initializeAdmin()
  }, [user, isAdmin])

  const value = {
    userRole,
    permissions,
    hasPermission,
    dashboardStats,
    loading,
    refreshStats,
    refreshPermissions
  }

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  )
}
