"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Logo } from "@/components/ui/logo"
import {
  GraduationCap,
  Route,
  ArrowLeft,
  BookOpen,
  Target,
  Users,
  Trophy,
  Lightbulb,
  Map,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function LearningRoadmapPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isFormLoading, setIsFormLoading] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState('Loading waitlist form...')
  const [iframeHeight, setIframeHeight] = useState('900px')

  useEffect(() => {
    // Update loading messages
    const messageTimer = setTimeout(() => {
      setLoadingMessage('Preparing your roadmap access...')
    }, 1000)

    const hideLoadingTimer = setTimeout(() => {
      setLoadingMessage('Almost ready...')
    }, 2000)

    // Function to resize iframe based on content
    const handleIframeResize = () => {
      if (iframeRef.current) {
        try {
          const iframe = iframeRef.current
          const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document
          if (iframeDocument) {
            const height = Math.max(
              iframeDocument.body.scrollHeight,
              iframeDocument.documentElement.scrollHeight,
              900 // minimum height
            )
            const newHeight = `${height + 50}px` // Add some padding
            setIframeHeight(newHeight)
            iframe.style.height = newHeight
          }
        } catch (error) {
          // Cross-origin restrictions - use default height
          setIframeHeight('900px')
        }
      }
    }

    // Function to load Tally embeds
    const loadTallyEmbeds = () => {
      if (typeof window !== 'undefined') {
        if (typeof (window as any).Tally !== 'undefined') {
          (window as any).Tally.loadEmbeds()
          // Try to resize after loading
          setTimeout(handleIframeResize, 1000)
        } else {
          // Manually set src for iframes that don't have it yet
          document.querySelectorAll('iframe[data-tally-src]:not([src])').forEach((iframe) => {
            const element = iframe as HTMLIFrameElement
            const src = element.getAttribute('data-tally-src')
            if (src) {
              element.src = src
              // Ensure the iframe takes full width and dynamic height
              element.style.width = '100%'
              element.style.minHeight = '900px'
              element.style.border = 'none'
              element.style.display = 'block'
              element.style.overflow = 'auto'
              
              // Try to resize when loaded
              element.onload = () => {
                setTimeout(handleIframeResize, 500)
              }
            }
          })
        }
        
        // Hide loading after a delay to ensure form is loaded
        setTimeout(() => {
          setIsFormLoading(false)
          handleIframeResize()
        }, 3000)
      }
    }

    // Listen for form submission
    const handleFormSubmitted = () => {
      console.log('✅ Learning roadmap waitlist form submitted')
    }

    // Listen for iframe height changes from Tally
    const handleMessage = (event: MessageEvent) => {
      if (event.origin === 'https://tally.so') {
        if (event.data && typeof event.data === 'object') {
          if (event.data.type === 'tally-height-changed' && event.data.height) {
            const newHeight = `${event.data.height + 50}px`
            setIframeHeight(newHeight)
            if (iframeRef.current) {
              iframeRef.current.style.height = newHeight
            }
          }
        }
      }
    }

    // Add event listeners
    window.addEventListener('TallyFormSubmitted', handleFormSubmitted)
    window.addEventListener('message', handleMessage)

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
      window.removeEventListener('message', handleMessage)
      clearTimeout(messageTimer)
      clearTimeout(hideLoadingTimer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/30 to-white">
      {/* Header - Mobile Responsive */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full hover:bg-gray-100"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <Logo 
                size="lg" 
                variant="link" 
                priority={true}
                className="transition-transform duration-200 hover:scale-105"
              />
            </div>
            <Link href="/">
              <Button variant="outline" className="hidden sm:flex">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Mobile Optimized */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-24 lg:pb-28">
            {/* Background Icons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 sm:opacity-60">
              <div className="absolute top-8 left-[5%] sm:top-16 sm:left-[10%] animate-parallax-float">
                <BookOpen className="w-6 h-6 sm:w-10 sm:h-10 text-gray-800" style={{ opacity: 0.1 }} />
              </div>
              <div className="absolute top-16 right-[5%] sm:top-24 sm:right-[15%] animate-parallax-drift">
                <Route className="w-8 h-8 sm:w-12 sm:h-12 text-gray-700" style={{ opacity: 0.1 }} />
              </div>
              <div className="hidden sm:block absolute top-[40%] left-[20%] animate-parallax-float">
                <Target className="w-8 h-8 text-gray-600" style={{ opacity: 0.1 }} />
              </div>
              <div className="hidden sm:block absolute bottom-20 right-[20%] animate-parallax-drift">
                <Trophy className="w-10 h-10 text-gray-700" style={{ opacity: 0.1 }} />
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-4xl mx-auto">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-4 sm:mb-6 leading-tight tracking-tight">
                Your Learning{" "}
                <span className="bg-brand-gradient bg-clip-text text-transparent block sm:inline mt-2 sm:mt-0">
                  Roadmap
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
                Structured pathways to master new skills, guided by experts and powered by AI-driven insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Mobile Enhanced */}
      <section className="relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            
            {/* Structured Learning */}
            <Card className="group relative bg-white border-2 border-gray-100 hover:border-brand-primary-fill/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl rounded-2xl">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-brand-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Map className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">
                  Structured Paths
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Follow carefully designed learning paths that take you from beginner to expert systematically.
                </p>
              </CardContent>
            </Card>

            {/* Expert Guidance */}
            <Card className="group relative bg-white border-2 border-gray-100 hover:border-brand-primary-fill/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl rounded-2xl">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-brand-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">
                  Expert Mentors
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Get guidance from industry professionals who have walked the path before you.
                </p>
              </CardContent>
            </Card>

            {/* AI-Powered Insights */}
            <Card className="group relative bg-white border-2 border-gray-100 hover:border-brand-primary-fill/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl rounded-2xl md:col-span-2 lg:col-span-1">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-brand-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Lightbulb className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">
                  AI Coaching
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Personalized recommendations and progress tracking powered by advanced AI.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Waitlist Form - Mobile Responsive */}
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-brand-primary-fill/20 bg-gradient-to-br from-white to-gray-50/50 rounded-2xl sm:rounded-3xl overflow-hidden">
              <CardContent className="p-6 sm:p-8 lg:p-12">
                <div className="text-center mb-6 sm:mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brand-gradient rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                    Join the Waitlist
                  </h2>
                  <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Be among the first to access our comprehensive learning roadmaps when they launch.
                  </p>
                </div>

                {/* Loading State */}
                {isFormLoading && (
                  <div className="w-full mb-6 sm:mb-8">
                    <div className="w-full bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-200 flex items-center justify-center" style={{ minHeight: '1200px' }}>
                      <div className="text-center px-4">
                        {/* Animated loading spinner - Mobile Responsive */}
                        <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 relative">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                          <div className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 border-4 border-transparent border-t-purple-400 rounded-full animate-ping"></div>
                        </div>
                        
                        {/* Loading message */}
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                          Loading Form
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

                {/* Tally Form Embed - Mobile Optimized with Full Scrolling */}
                <div className={`w-full transition-opacity duration-500 ${isFormLoading ? 'opacity-0 absolute' : 'opacity-100'}`}>
                  {/* Full Height Container for Form */}
                  <div 
                    className="bg-white rounded-xl sm:rounded-2xl shadow-lg flex flex-col justify-start items-center"
                    style={{ minHeight: '1200px', width: '100%', overflow: 'visible' }}
                  >
                    {/* Iframe with proper scrolling */}
                    <div className="w-full h-full flex justify-center" style={{ minHeight: '1200px' }}>
                      <iframe
                        ref={iframeRef}
                        data-tally-src="https://tally.so/embed/wz59lM?hideTitle=1&transparentBackground=0&dynamicHeight=0&autoResize=0"
                        src="https://tally.so/embed/wz59lM?hideTitle=1&transparentBackground=0&dynamicHeight=0&autoResize=0"
                        loading="lazy"
                        width="100%"
                        height="1200"
                        frameBorder="0"
                        marginHeight={0}
                        marginWidth={0}
                        title="Learning Roadmap Waitlist Form"
                        className="w-full border-0"
                        scrolling="auto"
                        allowFullScreen
                        allow="clipboard-write"
                        style={{ 
                          minHeight: '1200px', 
                          height: '1200px',
                          width: '100%',
                          border: 'none',
                          background: 'white',
                          display: 'block',
                          overflow: 'visible'
                        }}
                        onLoad={() => {
                          // Hide loading when iframe is loaded
                          setTimeout(() => {
                            setIsFormLoading(false)
                            // Ensure iframe is properly sized
                            if (iframeRef.current) {
                              const iframe = iframeRef.current
                              iframe.style.height = '1200px'
                              iframe.style.minHeight = '1200px'
                              iframe.setAttribute('scrolling', 'auto')
                              console.log('✅ Tally form loaded with 1200px height')
                            }
                          }, 1500)
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Fallback link if form doesn't display properly */}
                  <div className="text-center mt-6">
                    <p className="text-sm text-gray-500 mb-3">
                      Can't see the submit button or having trouble with the form? 
                    </p>
                    <a 
                      href="https://tally.so/r/wz59lM" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-brand-gradient text-white rounded-xl hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <span className="mr-2">📝</span>
                      Open Full Form in New Tab
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
      `}</style>

      <style jsx global>{`
        /* Tally form specific styling for learning roadmap - Enhanced for FULL visibility */
        iframe[src*="tally.so/embed/wz59lM"] {
          width: 100% !important;
          height: 1200px !important;
          min-height: 1200px !important;
          max-height: none !important;
          border: none !important;
          display: block !important;
          margin: 0 auto !important;
          overflow: auto !important;
          scrolling: yes !important;
        }
        
        iframe[data-tally-src*="wz59lM"] {
          width: 100% !important;
          height: 1200px !important;
          min-height: 1200px !important;
          max-height: none !important;
          border: none !important;
          display: block !important;
          margin: 0 auto !important;
          overflow: auto !important;
          scrolling: yes !important;
        }
        
        /* Ensure Tally form content is properly sized and scrollable */
        body iframe[data-tally-src*="wz59lM"] {
          width: 100% !important;
          max-width: 100% !important;
          height: 1200px !important;
          min-height: 1200px !important;
          overflow: auto !important;
          scrolling: yes !important;
        }
        
        /* Override any Tally default styling that might cut off content */
        .tally-embed-wrapper {
          width: 100% !important;
          display: flex !important;
          justify-content: center !important;
          height: 1200px !important;
          min-height: 1200px !important;
          overflow: auto !important;
        }
        
        /* Target Tally form body content for proper sizing */
        [data-tally-embed] {
          width: 100% !important;
          max-width: none !important;
          height: 1200px !important;
          min-height: 1200px !important;
          overflow: auto !important;
        }
        
        /* Force Tally iframe content to be scrollable and fully visible */
        iframe[src*="wz59lM"] {
          height: 1200px !important;
          min-height: 1200px !important;
          max-height: none !important;
          overflow-y: auto !important;
          scrolling: yes !important;
        }
        
        /* Make sure the iframe content is scrollable if needed */
        iframe[data-tally-src*="wz59lM"]:not([src]) {
          overflow-y: auto !important;
          scrolling: yes !important;
          height: 1200px !important;
          min-height: 1200px !important;
        }
        
        /* Target the specific Tally form to ensure it shows submit button */
        iframe[src*="tally.so/embed/wz59lM"] body {
          height: auto !important;
          min-height: 1200px !important;
          overflow: visible !important;
        }
        
        /* Additional fallback for Tally form content */
        .tally-embed iframe {
          height: 1200px !important;
          min-height: 1200px !important;
          overflow: auto !important;
        }
      `}</style>
    </div>
  )
}
