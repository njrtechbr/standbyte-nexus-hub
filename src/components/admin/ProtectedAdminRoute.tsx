import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useAdmin } from '../../contexts/AdminContext'
import { Loader2 } from 'lucide-react'

export function ProtectedAdminRoute({ children, requiredPermission = null }) {
  const { user, isAdmin, loading: authLoading } = useAuth()
  const { hasPermission, loading: adminLoading } = useAdmin()
  const location = useLocation()

  // Show loading while checking authentication
  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/conta" state={{ from: location }} replace />
  }

  // Redirect to home if not admin
  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  // Check specific permission if required
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/admin" replace />
  }

  return children
}

export function AdminRouteWrapper({ children }) {
  return (
    <ProtectedAdminRoute>
      {children}
    </ProtectedAdminRoute>
  )
}
