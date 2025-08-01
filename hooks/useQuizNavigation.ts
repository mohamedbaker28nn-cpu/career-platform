// Custom hook for handling quiz button clicks and expert sessions with waitlist logic
"use client"

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { 
  shouldShowWaitlistForm, 
  markWaitlistFormShown
} from '@/utils/formTracking'

export function useQuizNavigation() {
  const router = useRouter()

  // Handler for quiz buttons - goes to waitlist page or directly to quiz
  const handleQuizButtonClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    
    console.log('🎯 Quiz button clicked')
    
    // Check if user should see waitlist form
    if (shouldShowWaitlistForm()) {
      console.log('👋 First-time user - redirecting to waitlist page')
      markWaitlistFormShown()
      router.push('/waitlist')
    } else {
      console.log('🔄 Returning user - going directly to quiz')
      router.push('/personality-quiz')
    }
  }, [router])

  // Handler for expert sessions button - always redirect to sessions page
  // The popup logic is now handled on the sessions page itself
  const handleExpertSessionsClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    
    console.log('🎯 Expert Sessions button clicked - redirecting to sessions page')
    router.push('/introductory-sessions')
  }, [router])

  return {
    handleQuizButtonClick,
    handleExpertSessionsClick
  }
}