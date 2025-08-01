// Test page for sessions form functionality
"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  hasSeenWaitlistForm, 
  hasCompletedWaitlistForm, 
  clearWaitlistFormTracking,
  shouldShowWaitlistForm,
  markWaitlistFormShown,
  markWaitlistFormCompleted,
  hasSeenSessionsForm,
  hasCompletedSessionsForm,
  clearSessionsFormTracking,
  shouldShowSessionsForm,
  markSessionsFormShown,
  markSessionsFormCompleted
} from '@/utils/formTracking'

export default function TestSessionsPage() {
  const [status, setStatus] = useState('')

  const checkStatus = () => {
    const seenWaitlist = hasSeenWaitlistForm()
    const completedWaitlist = hasCompletedWaitlistForm()
    const shouldShowWaitlist = shouldShowWaitlistForm()
    
    const seenSessions = hasSeenSessionsForm()
    const completedSessions = hasCompletedSessionsForm()
    const shouldShowSessions = shouldShowSessionsForm()
    
    setStatus(`
      === QUIZ WAITLIST FORM ===
      Has seen waitlist form: ${seenWaitlist}
      Has completed waitlist form: ${completedWaitlist}
      Should show waitlist form: ${shouldShowWaitlist}
      
      === SESSIONS FORM ===
      Has seen sessions form: ${seenSessions}
      Has completed sessions form: ${completedSessions}
      Should show sessions form: ${shouldShowSessions}
    `)
  }

  const clearWaitlistTracking = () => {
    clearWaitlistFormTracking()
    setStatus('✅ Cleared quiz waitlist form tracking cookies')
  }

  const clearSessionsTracking = () => {
    clearSessionsFormTracking()
    setStatus('✅ Cleared sessions form tracking cookies')
  }

  const clearAllTracking = () => {
    clearWaitlistFormTracking()
    clearSessionsFormTracking()
    setStatus('✅ Cleared ALL form tracking cookies')
  }

  const markWaitlistAsSeen = () => {
    markWaitlistFormShown()
    setStatus('✅ Marked waitlist form as seen')
  }

  const markWaitlistAsCompleted = () => {
    markWaitlistFormCompleted()
    setStatus('✅ Marked waitlist form as completed')
  }

  const markSessionsAsSeen = () => {
    markSessionsFormShown()
    setStatus('✅ Marked sessions form as seen')
  }

  const markSessionsAsCompleted = () => {
    markSessionsFormCompleted()
    setStatus('✅ Marked sessions form as completed')
  }

  const testTallyPopup = () => {
    // Set up Tally configuration
    window.TallyConfig = {
      formId: "mRyEL4",
      popup: {
        emoji: {
          text: "👋",
          animation: "wave"
        },
        layout: "modal"
      }
    }

    // Open the popup
    setTimeout(() => {
      if (window.Tally) {
        console.log('🚀 Opening test sessions popup')
        window.Tally.openPopup('mRyEL4')
        setStatus('🚀 Sessions popup triggered')
        
        // Additional centering logic after popup opens
        setTimeout(() => {
          const tallyPopup = document.querySelector('#tally-open-popup') || 
                           document.querySelector('[data-tally-popup]') ||
                           document.querySelector('iframe[src*="tally.so"]')
          
          if (tallyPopup) {
            console.log('🎯 Applying centering and sizing styles to test popup')
            const popupElement = tallyPopup as HTMLElement
            popupElement.style.position = 'fixed'
            popupElement.style.top = '50%'
            popupElement.style.left = '50%'
            popupElement.style.transform = 'translate(-50%, -50%)'
            popupElement.style.zIndex = '9999'
            popupElement.style.maxHeight = '85vh'
            popupElement.style.maxWidth = '400px'  // Further reduced width
            popupElement.style.width = '85%'      // Reduced responsive width
            popupElement.style.minWidth = '320px' // Add minimum width
          }
        }, 100)
      } else {
        setStatus('❌ Tally is not loaded')
      }
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-sm sm:max-w-md lg:max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg sm:text-xl lg:text-2xl">Sessions Form Test Page</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <Button onClick={checkStatus} className="col-span-1 sm:col-span-2 min-h-[44px]">Check All Status</Button>
              
              {/* Waitlist Form Controls */}
              <div className="col-span-1 sm:col-span-2 border-t pt-3 sm:pt-4">
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Quiz Waitlist Form Controls</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Button onClick={markWaitlistAsSeen} variant="outline" size="sm" className="min-h-[40px] text-xs sm:text-sm">Mark Waitlist as Seen</Button>
                  <Button onClick={markWaitlistAsCompleted} variant="outline" size="sm" className="min-h-[40px] text-xs sm:text-sm">Mark Waitlist as Completed</Button>
                  <Button onClick={clearWaitlistTracking} variant="destructive" size="sm" className="min-h-[40px] text-xs sm:text-sm col-span-1 sm:col-span-2">Clear Waitlist Tracking</Button>
                </div>
              </div>
              
              {/* Sessions Form Controls */}
              <div className="col-span-1 sm:col-span-2 border-t pt-3 sm:pt-4">
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Sessions Form Controls</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Button onClick={markSessionsAsSeen} variant="outline" size="sm" className="min-h-[40px] text-xs sm:text-sm">Mark Sessions as Seen</Button>
                  <Button onClick={markSessionsAsCompleted} variant="outline" size="sm" className="min-h-[40px] text-xs sm:text-sm">Mark Sessions as Completed</Button>
                  <Button onClick={clearSessionsTracking} variant="destructive" size="sm" className="min-h-[40px] text-xs sm:text-sm col-span-1 sm:col-span-2">Clear Sessions Tracking</Button>
                </div>
              </div>
              
              {/* General Controls */}
              <div className="col-span-1 sm:col-span-2 border-t pt-3 sm:pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Button onClick={clearAllTracking} variant="destructive" className="min-h-[44px] text-sm">Clear ALL Tracking</Button>
                  <Button onClick={testTallyPopup} className="bg-blue-600 hover:bg-blue-700 min-h-[44px] text-sm">
                    Test Sessions Popup
                  </Button>
                </div>
              </div>
            </div>
            
            {status && (
              <div className="mt-4 p-3 sm:p-4 bg-gray-100 rounded-lg overflow-x-auto">
                <pre className="text-xs sm:text-sm whitespace-pre-wrap break-words">{status}</pre>
              </div>
            )}
            
            <div className="mt-4 sm:mt-6">
              <a href="/" className="text-blue-600 hover:underline text-sm sm:text-base">
                ← Back to Home Page (to test Expert Sessions buttons)
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Extend window interface for TypeScript
declare global {
  interface Window {
    TallyConfig?: {
      formId: string
      popup: {
        emoji: {
          text: string
          animation: string
        }
        layout: string
      }
    }
    Tally?: {
      openPopup: (formId: string) => void
      closePopup: (formId: string) => void
    }
  }
}
