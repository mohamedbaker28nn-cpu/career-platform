// Cookie utility functions for form completion tracking

export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null
  try {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(';').shift() || null
      console.log(`🍪 getCookie(${name}):`, cookieValue)
      return cookieValue
    }
    console.log(`🍪 getCookie(${name}): not found`)
    return null
  } catch (error) {
    console.error(`❌ Error getting cookie ${name}:`, error)
    return null
  }
}

export const setCookie = (name: string, value: string, days: number = 365) => {
  if (typeof document === 'undefined') return
  try {
    const expires = new Date()
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000))
    const cookieString = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
    document.cookie = cookieString
    console.log(`🍪 setCookie(${name}, ${value}):`, cookieString)
    
    // Verify the cookie was set
    setTimeout(() => {
      const verifyValue = getCookie(name)
      if (verifyValue === value) {
        console.log(`✅ Cookie ${name} successfully set and verified`)
      } else {
        console.error(`❌ Cookie ${name} was not set correctly. Expected: ${value}, Got: ${verifyValue}`)
      }
    }, 100)
  } catch (error) {
    console.error(`❌ Error setting cookie ${name}:`, error)
  }
}

export const deleteCookie = (name: string) => {
  try {
    const expiredCookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`
    document.cookie = expiredCookie
    console.log(`🗑️ deleteCookie(${name}):`, expiredCookie)
    
    // Verify the cookie was deleted
    setTimeout(() => {
      const verifyValue = getCookie(name)
      if (!verifyValue) {
        console.log(`✅ Cookie ${name} successfully deleted`)
      } else {
        console.error(`❌ Cookie ${name} was not deleted. Still has value: ${verifyValue}`)
      }
    }, 100)
  } catch (error) {
    console.error(`❌ Error deleting cookie ${name}:`, error)
  }
}

// Check if user has completed Tally form
export const hasCompletedTallyForm = (): boolean => {
  return getCookie('tally_form_completed') === 'true'
}

// Mark Tally form as completed
export const markTallyFormCompleted = () => {
  setCookie('tally_form_completed', 'true')
}

// Clear Tally form completion status
export const clearTallyFormCompletion = () => {
  deleteCookie('tally_form_completed')
}

// Check if user has seen the waitlist form
export const hasSeenWaitlistForm = (): boolean => {
  return getCookie('waitlist_form_shown') === 'true'
}

// Mark waitlist form as shown
export const markWaitlistFormShown = () => {
  setCookie('waitlist_form_shown', 'true')
}

// Check if user has completed the waitlist form
export const hasCompletedWaitlistForm = (): boolean => {
  return getCookie('waitlist_form_completed') === 'true'
}

// Mark waitlist form as completed
export const markWaitlistFormCompleted = () => {
  setCookie('waitlist_form_completed', 'true')
}

// Clear waitlist form tracking (for testing purposes)
export const clearWaitlistFormTracking = () => {
  deleteCookie('waitlist_form_shown')
  deleteCookie('waitlist_form_completed')
}

// Check if user should see the waitlist form (first time clicking quiz)
export const shouldShowWaitlistForm = (): boolean => {
  return !hasSeenWaitlistForm() && !hasCompletedWaitlistForm()
}

// === SESSIONS FORM TRACKING (separate from waitlist) ===

// Check if user has seen the sessions form
export const hasSeenSessionsForm = (): boolean => {
  return getCookie('sessions_form_shown') === 'true'
}

// Mark sessions form as shown
export const markSessionsFormShown = () => {
  setCookie('sessions_form_shown', 'true')
}

// Check if user has completed the sessions form
export const hasCompletedSessionsForm = (): boolean => {
  return getCookie('sessions_form_completed') === 'true'
}

// Mark sessions form as completed
export const markSessionsFormCompleted = () => {
  setCookie('sessions_form_completed', 'true')
}

// Clear sessions form tracking (for testing purposes)
export const clearSessionsFormTracking = () => {
  deleteCookie('sessions_form_shown')
  deleteCookie('sessions_form_completed')
}

// Check if user should see the sessions form (first time on sessions page)
export const shouldShowSessionsForm = (): boolean => {
  return !hasSeenSessionsForm() && !hasCompletedSessionsForm()
}
