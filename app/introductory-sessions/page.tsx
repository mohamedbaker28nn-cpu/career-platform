"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/ui/logo"
import SessionsForm from "@/components/SessionsForm"
import {
  GraduationCap,
  Code,
  Shield,
  Database,
  Brain,
  Globe,
  Gamepad2,
  Smartphone,
  Cloud,
  TrendingUp,
  Settings,
  Palette,
  Bot,
  Headphones,
  Megaphone,
  Search,
  Play,
  ArrowLeft,
} from "lucide-react"
import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { 
  shouldShowSessionsForm, 
  markSessionsFormShown, 
  markSessionsFormCompleted 
} from '@/utils/formTracking'

// Career fields data with YouTube video IDs
const careerFields = [
  {
    id: "software-engineer",
    name: "Software Engineer",
    icon: Code,
    description: "Learn to build applications, websites, and software systems that power our digital world.",
    videoId: "zOjov-2OZ0E",
  },
  {
    id: "data-scientist",
    name: "Data Scientist",
    icon: Database,
    description: "Discover how to extract insights from data to help businesses make informed decisions.",
    videoId: "yZvFH7B6gKI",
  },
  {
    id: "cybersecurity-specialist",
    name: "Cybersecurity Specialist",
    icon: Shield,
    description: "Protect digital systems and data from cyber threats and security breaches.",
    videoId: "inWWhr5tnEA",
  },
  {
    id: "ai-researcher",
    name: "AI Researcher",
    icon: Brain,
    description: "Create intelligent systems that can learn, adapt, and make decisions like humans.",
    videoId: "ukzFI9rgwfU",
  },
  {
    id: "web-developer",
    name: "Web Developer",
    icon: Globe,
    description: "Build interactive websites and web applications using modern technologies.",
    videoId: "9YffrCViTVk",
  },
  {
    id: "game-developer",
    name: "Game Developer",
    icon: Gamepad2,
    description: "Create engaging video games and interactive entertainment experiences.",
    videoId: "S0oxKtBmuFk",
  },
  {
    id: "mobile-developer",
    name: "Mobile Developer",
    icon: Smartphone,
    description: "Design and develop applications for smartphones and tablets.",
    videoId: "9PAlIZ0nHGo",
  },
  {
    id: "cloud-engineer",
    name: "Cloud Engineer",
    icon: Cloud,
    description: "Manage and deploy applications using cloud infrastructure and services.",
    videoId: "M988_fsOSWo",
  },
  {
    id: "product-manager",
    name: "Product Manager",
    icon: TrendingUp,
    description: "Lead product development from idea to launch, coordinating teams and strategy.",
    videoId: "yUOC-Y0f5ZQ",
  },
  {
    id: "devops-engineer",
    name: "DevOps Engineer",
    icon: Settings,
    description: "Bridge development and operations to streamline software deployment.",
    videoId: "_I94-tJlovg",
  },
  {
    id: "ux-ui-designer",
    name: "UX/UI Designer",
    icon: Palette,
    description: "Create beautiful and user-friendly interfaces for digital products.",
    videoId: "9BdtGjoIN4E",
  },
  {
    id: "network-engineer",
    name: "Network Engineer",
    icon: Bot,
    description: "Design and maintain computer networks and communication systems.",
    videoId: "M2Dktd8Ypy8",
  },
  {
    id: "it-support",
    name: "IT Support",
    icon: Headphones,
    description: "Help people and organizations solve technical problems and maintain systems.",
    videoId: "Ej_02ICOIgs",
  },
  {
    id: "digital-marketer",
    name: "Digital Marketer",
    icon: Megaphone,
    description: "Promote products and services using digital channels and online strategies.",
    videoId: "bixR-KIJKYM",
  },
]

// Separate component to handle search params with Suspense
function SessionsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedField, setSelectedField] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showSessionsForm, setShowSessionsForm] = useState(false)

  // Check if first-time user and show popup
  useEffect(() => {
    if (shouldShowSessionsForm()) {
      console.log('👋 First-time user on sessions page - showing sessions form')
      markSessionsFormShown()
      setShowSessionsForm(true)
    }
  }, [])

  const handleSessionsFormClose = () => {
    console.log('❌ Sessions form closed')
    setShowSessionsForm(false)
  }

  const handleSessionsFormComplete = () => {
    console.log('✅ Sessions form completed')
    markSessionsFormCompleted()
    setShowSessionsForm(false)
  }

  useEffect(() => {
    try {
      // Check if there's a career parameter from quiz results
      const careerParam = searchParams?.get("career")
      if (careerParam) {
        const matchingField = careerFields.find(
          (field) =>
            field.name.toLowerCase().includes(careerParam.toLowerCase()) ||
            careerParam.toLowerCase().includes(field.name.toLowerCase()),
        )
        if (matchingField) {
          setSelectedField(matchingField.id)
          // Scroll to video section after a short delay
          setTimeout(() => {
            const videoSection = document.getElementById("video-section")
            if (videoSection) {
              videoSection.scrollIntoView({ behavior: "smooth" })
            }
          }, 500)
        }
      }
    } catch (error) {
      console.error('Error handling search params:', error)
    }
  }, [searchParams])

  const filteredFields = careerFields.filter((field) => field.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const selectedFieldData = careerFields.find((field) => field.id === selectedField)

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/30 to-white font-modern">
      {/* Background Shapes - Mobile Responsive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 sm:top-20 left-[5%] sm:left-[10%] animate-float z-0">
          <Play className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-gray-800" style={{ opacity: 0.03 }} />
        </div>
        <div className="absolute top-32 sm:top-40 right-[8%] sm:right-[15%] animate-float-delayed z-0">
          <Code className="w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-gray-700" style={{ opacity: 0.03 }} />
        </div>
        <div className="absolute bottom-24 sm:bottom-32 left-[15%] sm:left-[20%] animate-float z-0">
          <Brain className="w-12 h-12 sm:w-16 sm:h-16 lg:w-18 lg:h-18 text-gray-800" style={{ opacity: 0.03 }} />
        </div>
        <div className="absolute bottom-16 sm:bottom-20 right-[20%] sm:right-[25%] animate-float-delayed z-0">
          <Shield className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-700" style={{ opacity: 0.03 }} />
        </div>
      </div>

      {/* Header - Mobile Responsive */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Logo 
              size="lg" 
              variant="link" 
              priority={true}
              className="transition-transform duration-200 hover:scale-105"
            />
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/personality-quiz">
                <Button
                  variant="outline"
                  size="sm"
              className="flex items-center gap-1 sm:gap-2 border-brand-primary-stroke text-brand-primary-stroke hover:bg-brand-primary-fill hover:text-white bg-transparent transition-all duration-200 px-3 sm:px-4 text-sm"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Back to Quiz</span>
              <span className="xs:hidden">Back</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
      </header>

      {/* Mobile-Optimized Main Content */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Page Title - Mobile Responsive */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-3 sm:mb-4 leading-tight">
              Introductory <span className="bg-brand-gradient bg-clip-text text-transparent block sm:inline">Sessions</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2">
              Explore different career fields through expert-led introductory sessions. Click on any field to watch and
              learn!
            </p>
            <div className="w-16 sm:w-20 lg:w-24 h-1.5 sm:h-2 bg-brand-gradient mx-auto rounded-full"></div>
          </div>

          {/* Search Bar - Mobile Optimized */}
          <div className="max-w-sm sm:max-w-md mx-auto mb-8 sm:mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <Input
                type="text"
                placeholder="Search career fields..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 w-full rounded-full border-2 border-gray-200 focus:border-brand-primary-fill focus:ring-0 text-sm sm:text-base lg:text-lg transition-all duration-200"
              />
            </div>
          </div>

          {/* Career Fields Grid - Mobile Responsive */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 mb-8 sm:mb-12">
            {filteredFields.map((field, index) => {
              const IconComponent = field.icon
              const isSelected = selectedField === field.id

              return (
                <Button
                  key={field.id}
                  onClick={() => setSelectedField(field.id)}
                  variant="outline"
                  className={`p-3 sm:p-4 lg:p-6 h-auto flex flex-col items-center gap-2 sm:gap-3 border-2 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-[1.02] sm:hover:scale-105 hover:shadow-lg min-h-[80px] sm:min-h-[100px] lg:min-h-[120px] ${
                    isSelected
                      ? "border-brand-primary-fill bg-brand-primary-fill/10 text-brand-primary-fill"
                      : "border-gray-200 hover:border-brand-primary-fill hover:bg-brand-primary-fill/5"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-colors ${
                      isSelected ? "bg-brand-gradient" : "bg-gray-100 group-hover:bg-brand-primary-fill/10"
                    }`}
                  >
                    <IconComponent
                      className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 transition-colors ${
                        isSelected ? "text-white" : "text-gray-600 group-hover:text-brand-primary-fill"
                      }`}
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-center leading-tight px-1">{field.name}</span>
                </Button>
              )
            })}
          </div>

          {/* Video Section - Mobile Optimized */}
          {selectedFieldData && (
            <div id="video-section">
              <Card className="border-2 border-brand-primary-fill/20 rounded-2xl sm:rounded-3xl shadow-xl bg-white/95 backdrop-blur-sm animate-in slide-in-from-bottom-4 duration-500">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-brand-gradient rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0">
                      <selectedFieldData.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">{selectedFieldData.name}</h2>
                      <p className="text-gray-600 text-sm sm:text-base lg:text-lg mt-1">{selectedFieldData.description}</p>
                    </div>
                  </div>

                  {/* YouTube Video Embed - Mobile Responsive */}
                  <div className="relative w-full mb-4 sm:mb-6" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-xl sm:rounded-2xl shadow-lg"
                      src={`https://www.youtube.com/embed/${selectedFieldData.videoId}?rel=0&modestbranding=1`}
                      title={`${selectedFieldData.name} Introduction`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>

                  {/* Additional Info - Mobile Responsive */}
                  <div className="p-4 sm:p-5 lg:p-6 bg-gradient-to-r from-brand-primary-fill/5 to-brand-gradient-end/5 rounded-xl sm:rounded-2xl">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">What You'll Learn:</h3>
                    <ul className="text-gray-700 space-y-1.5 sm:space-y-2 text-sm sm:text-base">
                      <li>• Overview of the {selectedFieldData.name.toLowerCase()} field</li>
                      <li>• Key skills and technologies used</li>
                      <li>• Career opportunities and growth paths</li>
                      <li>• Day-in-the-life of professionals in this field</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Call to Action - Mobile Optimized */}
          {!selectedField && (
            <div className="text-center mt-8 sm:mt-12">
              <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-brand-gradient rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Play className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Ready to Explore?</h3>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-xl lg:max-w-2xl mx-auto leading-relaxed px-4">
                Click on any career field above to watch an introductory session and discover what that field is all
                about!
              </p>
              <Link href="/personality-quiz">
                <Button className="bg-brand-primary-fill hover:bg-brand-primary-stroke text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 min-h-[48px]">
                  Take Personality Quiz →
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-15px) rotate(180deg); 
          }
        }
        
        @keyframes float-delayed {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-20px) rotate(-180deg); 
          }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        
        @keyframes slide-in-from-bottom-4 {
          from {
            transform: translateY(1rem);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-in {
          animation-fill-mode: both;
        }
        
        .slide-in-from-bottom-4 {
          animation-name: slide-in-from-bottom-4;
        }
        
        .duration-500 {
          animation-duration: 500ms;
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          @keyframes float {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
            }
            50% { 
              transform: translateY(-10px) rotate(90deg); 
            }
          }
          
          @keyframes float-delayed {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
            }
            50% { 
              transform: translateY(-12px) rotate(-90deg); 
            }
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .animate-float,
          .animate-float-delayed {
            animation: none;
          }
        }
      `}</style>

      {/* Sessions Form Component */}
      <SessionsForm
        isOpen={showSessionsForm}
        onClose={handleSessionsFormClose}
        onComplete={handleSessionsFormComplete}
      />
    </div>
  )
}

// Main component with Suspense wrapper
export default function IntroductorySessionsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/30 to-white font-modern flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-brand-gradient rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600 text-lg">Loading sessions...</p>
        </div>
      </div>
    }>
      <SessionsContent />
    </Suspense>
  )
}
