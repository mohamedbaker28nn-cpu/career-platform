export interface User {
  fullName: string
  age: string
  phone: string
  email: string
  password: string
  governorate: string
  educationLevel: string
  schoolUniversity: string
  registeredAt: string
  isAuthenticated: boolean
}

// For backwards compatibility, but no longer used
export const checkAuth = (): User | null => {
  return null
}

// For backwards compatibility, but no longer used
export const logout = (): void => {
  // No-op
}

// No longer requires authentication - returns a default user or null
export const requireAuth = (): User | null => {
  return null
}
