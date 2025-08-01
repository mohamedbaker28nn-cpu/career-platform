"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// Cookie utility function
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
  requiredCookie?: string
  loadingComponent?: React.ReactNode
}

export default function ProtectedRoute({ 
  children, 
  redirectTo = '/personality-quiz',
  requiredCookie = 'tally_form_completed',
  loadingComponent
}: ProtectedRouteProps) {
  const router = useRouter()
  const [authState, setAuthState] = useState<'checking' | 'authorized' | 'unauthorized'>('checking')

  useEffect(() => {
    const checkAuth = () => {
      // Check if user has completed the required form
      const hasCompletedForm = getCookie(requiredCookie)
      
      console.log('🔒 Protected Route Auth Check:', {
        requiredCookie,
        cookieValue: hasCompletedForm,
        isAuthorized: hasCompletedForm === 'true'
      })

      if (hasCompletedForm === 'true') {
        console.log('✅ Access granted - user has completed form')
        setAuthState('authorized')
      } else {
        console.log('❌ Access denied - redirecting to:', redirectTo)
        setAuthState('unauthorized')
        // Use replace to prevent user from going back to protected route
        router.replace(redirectTo)
      }
    }

    // Initial check
    checkAuth()

    // Set up an interval to periodically check cookies (in case they change)
    const interval = setInterval(checkAuth, 1000)
    
    return () => clearInterval(interval)
  }, [router, redirectTo, requiredCookie])

  // NEVER render protected content if not authorized
  if (authState === 'unauthorized') {
    return loadingComponent || (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50/30 to-white">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-white rounded-full"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600">
            Redirecting to complete required form...
          </p>
        </div>
      </div>
    )
  }

  // Show loading while checking
  if (authState === 'checking') {
    return loadingComponent || (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50/30 to-white">
        <div className="text-center">
          <div className="w-16 h-16 bg-brand-gradient rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <div className="w-8 h-8 bg-white rounded-full"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Checking Access...
          </h2>
          <p className="text-gray-600">
            Please wait while we verify your completion status.
          </p>
        </div>
      </div>
    )
  }

  // Only render protected content if explicitly authorized
  return authState === 'authorized' ? <>{children}</> : null
}
