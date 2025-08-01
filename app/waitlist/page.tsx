// Simple waitlist page with embedded Tally form
"use client"

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { markWaitlistFormCompleted } from '@/utils/formTracking'

export default function WaitlistPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const router = useRouter()
  const [isFormLoading, setIsFormLoading] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState('Loading waitlist form...')

  useEffect(() => {
    // Update loading messages
    const messageTimer = setTimeout(() => {
      setLoadingMessage('Preparing your access request...')
    }, 1000)

    const hideLoadingTimer = setTimeout(() => {
      setLoadingMessage('Almost ready...')
    }, 2000)

    // Function to load Tally embeds
    const loadTallyEmbeds = () => {
      if (typeof window !== 'undefined') {
        if (typeof (window as any).Tally !== 'undefined') {
          (window as any).Tally.loadEmbeds()
        } else {
          // Manually set src for iframes that don't have it yet
          document.querySelectorAll('iframe[data-tally-src]:not([src])').forEach((iframe) => {
            const element = iframe as HTMLIFrameElement
            const src = element.getAttribute('data-tally-src')
            if (src) {
              element.src = src
            }
          })
        }
        
        // Hide loading after a delay to ensure form is loaded
        setTimeout(() => {
          setIsFormLoading(false)
        }, 2500)
      }
    }

    // Listen for form submission
    const handleFormSubmitted = () => {
      console.log('✅ Waitlist form submitted')
      markWaitlistFormCompleted()
      // Optionally redirect to quiz after form submission
      // setTimeout(() => router.push('/personality-quiz'), 2000)
    }

    // Add event listener for form submission
    window.addEventListener('TallyFormSubmitted', handleFormSubmitted)

    // Check if Tally script is already loaded
    if (typeof (window as any).Tally !== 'undefined') {
      loadTallyEmbeds()
    } else {
      // Check if script is already in DOM
      const existingScript = document.querySelector('script[src="https://tally.so/widgets/embed.js"]')
      
      if (!existingScript) {
        // Create and load the Tally script
        const script = document.createElement('script')
        script.src = 'https://tally.so/widgets/embed.js'
        script.async = true
        script.onload = loadTallyEmbeds
        script.onerror = loadTallyEmbeds
        document.body.appendChild(script)
      } else {
        // Script exists but may not be loaded yet
        setTimeout(loadTallyEmbeds, 500)
      }
    }

    // Cleanup function
    return () => {
      window.removeEventListener('TallyFormSubmitted', handleFormSubmitted)
      clearTimeout(messageTimer)
      clearTimeout(hideLoadingTimer)
    }
  }, [router])

  const handleContinueToQuiz = () => {
    markWaitlistFormCompleted()
    router.push('/personality-quiz')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile-Optimized Header */}
      <div className="text-center py-6 sm:py-8 px-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Join Our Waitlist</h1>
        <p className="text-gray-600 text-sm sm:text-base">Be the first to access our personality quiz</p>
      </div>

      {/* Mobile-Responsive Loading State */}
      {isFormLoading && (
        <div className="max-w-4xl sm:max-w-5xl lg:max-w-6xl mx-auto px-4 mb-6 sm:mb-8">
          <div className="w-full bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center" style={{ minHeight: '400px' }}>
            <div className="text-center px-4">
              {/* Animated loading spinner - Mobile Responsive */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 border-3 sm:border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 border-3 sm:border-4 border-transparent border-t-purple-400 rounded-full animate-ping"></div>
              </div>
              
              {/* Loading message */}
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Join Waitlist
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                {loadingMessage}
              </p>
              
              {/* Animated dots */}
              <div className="flex justify-center mt-3 sm:mt-4 space-x-1">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile-Responsive Tally Form Embed */}
      <div className={`max-w-4xl sm:max-w-5xl lg:max-w-6xl mx-auto px-4 transition-opacity duration-500 ${isFormLoading ? 'opacity-0 absolute' : 'opacity-100'}`}>
        <div className="w-full" style={{ minHeight: '800px' }}>
          <iframe 
            ref={iframeRef}
            data-tally-src="https://tally.so/embed/wz59lM?hideTitle=1&transparentBackground=1&dynamicHeight=1&layout=card&width=100" 
            loading="lazy" 
            width="100%" 
            height="1020" 
            frameBorder="0" 
            marginHeight={0} 
            marginWidth={0} 
            title="Wait-list"
            className="border-0 mx-auto w-full rounded-lg"
            style={{ minWidth: '100%', width: '100%' }}
            onLoad={() => {
              // Hide loading when iframe is loaded
              setTimeout(() => setIsFormLoading(false), 500)
            }}
          />
        </div>
      </div>

      {/* Mobile-Responsive Continue Button */}
      <div className={`text-center py-6 sm:py-8 px-4 transition-opacity duration-500 ${isFormLoading ? 'opacity-50' : 'opacity-100'}`}>
        <Button 
          onClick={handleContinueToQuiz}
          className="bg-brand-primary-fill hover:bg-brand-primary-stroke text-white px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 min-h-[48px] w-full sm:w-auto max-w-sm"
          disabled={isFormLoading}
        >
          Continue to Personality Quiz →
        </Button>
        <p className="text-gray-500 text-xs sm:text-sm mt-2">
          Skip the waitlist and take the quiz now
        </p>
      </div>
    </div>
  )
}