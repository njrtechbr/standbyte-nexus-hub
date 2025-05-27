import { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../lib/supabase'

const AuthContext = createContext({
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  updateProfile: async () => {},
  refreshProfile: async () => {}
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  // Load user profile
  const loadProfile = async (authUser) => {
    if (!authUser) {
      setProfile(null)
      setIsAdmin(false)
      return
    }

    try {
      const { data: profileData } = await db.getCurrentProfile()
      setProfile(profileData)

      const { isAdmin: adminStatus } = await db.isAdmin()
      setIsAdmin(adminStatus)
    } catch (error) {
      console.error('Error loading profile:', error)
      setProfile(null)
      setIsAdmin(false)
    }
  }

  // Sign up function
  const signUp = async (email, password, userData = {}) => {
    try {
      const { data, error } = await auth.signUp(email, password, userData)
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Sign up error:', error)
      return { success: false, error: error.message }
    }
  }

  // Sign in function
  const signIn = async (email, password) => {
    try {
      const { data, error } = await auth.signIn(email, password)
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Sign in error:', error)
      return { success: false, error: error.message }
    }
  }

  // Sign out function
  const signOut = async () => {
    try {
      const { error } = await auth.signOut()
      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error('Sign out error:', error)
      return { success: false, error: error.message }
    }
  }

  // Update profile function
  const updateProfile = async (profileData) => {
    try {
      const { data, error } = await db.updateProfile(profileData)
      if (error) throw error
      
      // Refresh profile after update
      await refreshProfile()
      return { success: true, data }
    } catch (error) {
      console.error('Update profile error:', error)
      return { success: false, error: error.message }
    }
  }

  // Refresh profile function
  const refreshProfile = async () => {
    if (user) {
      await loadProfile(user)
    }
  }

  // Initialize auth state
  useEffect(() => {
    let mounted = true

    const initializeAuth = async () => {
      try {
        const { session } = await auth.getSession()
        if (mounted) {
          setUser(session?.user || null)
          if (session?.user) {
            await loadProfile(session.user)
          }
          setLoading(false)
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        if (mounted) {
          setLoading(false)
        }
      }
    }

    initializeAuth()

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange(async (event, session) => {
      if (mounted) {
        setUser(session?.user || null)
        
        if (session?.user) {
          await loadProfile(session.user)
        } else {
          setProfile(null)
          setIsAdmin(false)
        }
        
        setLoading(false)
      }
    })

    return () => {
      mounted = false
      subscription?.unsubscribe()
    }
  }, [])

  const value = {
    user,
    profile,
    loading,
    isAdmin,
    signUp,
    signIn,
    signOut,
    updateProfile,
    refreshProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
