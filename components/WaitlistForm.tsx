// Component for Tally waitlist form popup that appears for first-time users
"use client"

import { useEffect, useRef, useState } from 'react'

interface WaitlistFormProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

export default function WaitlistForm({ isOpen, onClose, onComplete }: WaitlistFormProps) {
  const hasTriggeredRef = useRef(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('Loading form...')

  useEffect(() => {
    if (!isOpen || hasTriggeredRef.current) return

    console.log('🎯 Triggering waitlist form popup')
    
    // Show loading state immediately
    setIsLoading(true)
    setLoadingMessage('Preparing your waitlist form...')

    // Set up Tally configuration for the waitlist form
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

    // Listen for form events
    const handleFormSubmitted = (event: CustomEvent) => {
      console.log('✅ Waitlist form submitted:', event.detail)
      setIsLoading(false)
      onComplete()
    }

    const handleFormClosed = () => {
      console.log('❌ Waitlist form closed')
      setIsLoading(false)
      onClose()
    }

    // Add event listeners
    window.addEventListener('TallyFormSubmitted', handleFormSubmitted as EventListener)
    window.addEventListener('TallyFormClosed', handleFormClosed)

    // Update loading message
    setTimeout(() => {
      setLoadingMessage('Getting you access to our quiz...')
    }, 300)

    // Trigger the popup
    setTimeout(() => {
      if (window.Tally) {
        console.log('🚀 Opening Tally popup')
        setLoadingMessage('Opening waitlist form...')
        
        window.Tally.openPopup('mRyEL4')
        hasTriggeredRef.current = true
        
        // Hide loading when form is ready
        setTimeout(() => {
          setIsLoading(false)
        }, 800)
        
        // Additional centering logic after popup opens
        setTimeout(() => {
          const tallyPopup = document.querySelector('#tally-open-popup') || 
                           document.querySelector('[data-tally-popup]') ||
                           document.querySelector('iframe[src*="tally.so"]')
          
          if (tallyPopup) {
            console.log('🎯 Applying centering styles to Tally popup')
            const popupElement = tallyPopup as HTMLElement
            popupElement.style.position = 'fixed'
            popupElement.style.top = '50%'
            popupElement.style.left = '50%'
            popupElement.style.transform = 'translate(-50%, -50%)'
            popupElement.style.zIndex = '9999'
            popupElement.style.maxHeight = '85vh'
            popupElement.style.maxWidth = '500px'
            popupElement.style.width = '90%'
            popupElement.style.minWidth = '350px'
            
            // Add a class to identify this as waitlist form
            popupElement.classList.add('waitlist-form-popup')
          }
        }, 100)
      } else {
        console.error('❌ Tally is not loaded')
        setIsLoading(false)
        setLoadingMessage('Failed to load form')
      }
    }, 500)

    // Cleanup function
    return () => {
      window.removeEventListener('TallyFormSubmitted', handleFormSubmitted as EventListener)
      window.removeEventListener('TallyFormClosed', handleFormClosed)
      
      // Close popup if it's open
      if (window.Tally) {
        try {
          window.Tally.closePopup('mRyEL4')
        } catch (error) {
          console.log('Popup already closed')
        }
      }
    }
  }, [isOpen, onClose, onComplete])

  // Reset the trigger when form is closed
  useEffect(() => {
    if (!isOpen) {
      hasTriggeredRef.current = false
      setIsLoading(false)
    }
  }, [isOpen])

  // Render loading overlay when form is loading
  if (isLoading && isOpen) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000] flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center shadow-2xl border">
          <div className="relative">
            {/* Animated loading spinner */}
            <div className="w-16 h-16 mx-auto mb-4 relative">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-400 rounded-full animate-ping"></div>
            </div>
            
            {/* Loading message */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Join Waitlist
            </h3>
            <p className="text-gray-600 text-sm">
              {loadingMessage}
            </p>
            
            {/* Animated dots */}
            <div className="flex justify-center mt-4 space-x-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // This component doesn't render anything visible when not loading - the popup is handled by Tally
  return null
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
