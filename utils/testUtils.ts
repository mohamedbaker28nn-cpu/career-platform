// Test utilities for the protection system
import { getCookie, setCookie, deleteCookie } from './formTracking'

// Test functions for development/debugging
export const testUtils = {
  // Check current form completion status
  checkFormStatus: () => {
    const status = getCookie('tally_form_completed')
    console.log('📊 Current form completion status:', status === 'true' ? '✅ Completed' : '❌ Not completed')
    console.log('📊 Raw cookie value:', status)
    return status === 'true'
  },

  // Simulate form completion (for testing)
  simulateFormCompletion: () => {
    console.log('🧪 Simulating form completion...')
    setCookie('tally_form_completed', 'true')
    console.log('✅ Simulated form completion - cookie set')
    
    // Force a page reload to trigger protection re-check
    setTimeout(() => {
      console.log('🔄 Reloading page to test protection...')
      window.location.reload()
    }, 500)
  },

  // Reset form completion status (for testing)
  resetFormCompletion: () => {
    console.log('🧪 Resetting form completion...')
    deleteCookie('tally_form_completed')
    console.log('🔄 Reset form completion - cookie cleared')
    
    // Force a page reload to trigger protection re-check
    setTimeout(() => {
      console.log('🔄 Reloading page to test protection...')
      window.location.reload()
    }, 500)
  },

  // Show all relevant cookies
  showAllCookies: () => {
    if (typeof document === 'undefined') {
      console.log('❌ Cannot access cookies (server-side)')
      return
    }
    console.log('🍪 All cookies:', document.cookie)
    const cookies = document.cookie.split(';').filter(cookie => 
      cookie.includes('tally_form_completed')
    )
    console.log('🍪 Relevant cookies:', cookies)
  },

  // Test direct navigation to protected route
  testDirectAccess: () => {
    console.log('🧪 Testing direct access to protected route...')
    window.location.href = '/introductory-sessions'
  },

  // Test protection bypass attempts
  testProtectionBypass: () => {
    console.log('🧪 Testing protection bypass attempts...')
    
    // Clear cookie and try to access
    deleteCookie('tally_form_completed')
    
    setTimeout(() => {
      console.log('🧪 Attempting to access protected route without cookie...')
      window.location.href = '/introductory-sessions'
    }, 1000)
  },

  // Full protection test sequence
  runFullTest: () => {
    console.log('🧪 Running full protection test sequence...')
    
    console.log('1️⃣ Checking initial status...')
    testUtils.checkFormStatus()
    
    setTimeout(() => {
      console.log('2️⃣ Clearing completion status...')
      testUtils.resetFormCompletion()
    }, 1000)
    
    setTimeout(() => {
      console.log('3️⃣ Testing blocked access...')
      testUtils.testDirectAccess()
    }, 3000)
  }
}

// Make available in browser console for testing
if (typeof window !== 'undefined') {
  (window as any).testUtils = testUtils
  console.log('🧪 Test utilities loaded! Available commands:')
  console.log('  testUtils.checkFormStatus() - Check current completion status')
  console.log('  testUtils.simulateFormCompletion() - Simulate form completion')
  console.log('  testUtils.resetFormCompletion() - Reset completion status')
  console.log('  testUtils.testDirectAccess() - Test direct access to protected route')
  console.log('  testUtils.runFullTest() - Run complete protection test')
}
