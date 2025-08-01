"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Logo } from "@/components/ui/logo"
import {
  GraduationCap,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Trophy,
  Target,
  BookOpen,
  Sparkles,
  CheckCircle,
  Brain,
  Lightbulb,
  Users,
  Code,
  Shield,
  Database,
  Palette,
  Cpu,
  Gamepad2Icon as GameController2,
  TrendingUp,
  Cloud,
  Play,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { getCookie, setCookie, hasCompletedTallyForm, markTallyFormCompleted, clearTallyFormCompletion, shouldShowSessionsForm, markSessionsFormShown, markSessionsFormCompleted, clearSessionsFormTracking } from "@/utils/formTracking"
import { testUtils } from "@/utils/testUtils"

// Enhanced quiz data with 12 questions
const personalityQuiz = [
  {
    id: 1,
    trait: "Problem Solving Approach",
    question: "When you encounter a technical problem, what's your first instinct?",
    options: [
      {
        text: "Break it down into smaller, logical steps",
        careers: { "Software Engineer": 3, "Data Scientist": 2, "DevOps Engineer": 2 },
      },
      {
        text: "Research similar problems and solutions online",
        careers: { "Cybersecurity Specialist": 2, "IT Support": 3, "Cloud Engineer": 2 },
      },
      {
        text: "Think about how users would be affected",
        careers: { "UX/UI Designer": 3, "Product Manager": 2, "Digital Marketer": 2 },
      },
      {
        text: "Experiment with different approaches",
        careers: { "Game Developer": 2, "AI Researcher": 3, "Mobile Developer": 2 },
      },
    ],
  },
  {
    id: 2,
    trait: "Creative Expression",
    question: "How do you prefer to express your creativity?",
    options: [
      {
        text: "Designing beautiful and functional interfaces",
        careers: { "UX/UI Designer": 3, "Web Developer": 2, "Mobile Developer": 2 },
      },
      {
        text: "Building interactive games and experiences",
        careers: { "Game Developer": 3, "Web Developer": 2, "Mobile Developer": 1 },
      },
      {
        text: "Writing elegant and efficient code",
        careers: { "Software Engineer": 3, "AI Researcher": 2, "DevOps Engineer": 1 },
      },
      {
        text: "Creating compelling digital campaigns",
        careers: { "Digital Marketer": 3, "UX/UI Designer": 1, "Product Manager": 2 },
      },
    ],
  },
  {
    id: 3,
    trait: "Leadership Style",
    question: "In team projects, you naturally tend to:",
    options: [
      {
        text: "Coordinate everyone and manage timelines",
        careers: { "Product Manager": 3, "DevOps Engineer": 2, "IT Support": 1 },
      },
      {
        text: "Focus on technical excellence and mentor others",
        careers: { "Software Engineer": 2, "AI Researcher": 2, "Cloud Engineer": 2 },
      },
      {
        text: "Ensure user needs are met and advocate for them",
        careers: { "UX/UI Designer": 3, "Product Manager": 2, "Digital Marketer": 1 },
      },
      {
        text: "Work independently and deliver quality results",
        careers: { "Data Scientist": 3, "Cybersecurity Specialist": 2, "Game Developer": 2 },
      },
    ],
  },
  {
    id: 4,
    trait: "Technology Interest",
    question: "Which emerging technology excites you most?",
    options: [
      {
        text: "Artificial Intelligence and Machine Learning",
        careers: { "AI Researcher": 3, "Data Scientist": 3, "Software Engineer": 1 },
      },
      {
        text: "Cloud computing and scalable systems",
        careers: { "Cloud Engineer": 3, "DevOps Engineer": 2, "Software Engineer": 1 },
      },
      {
        text: "Cybersecurity and digital privacy",
        careers: { "Cybersecurity Specialist": 3, "IT Support": 1, "Cloud Engineer": 1 },
      },
      {
        text: "Virtual/Augmented Reality and immersive experiences",
        careers: { "Game Developer": 3, "UX/UI Designer": 2, "Mobile Developer": 2 },
      },
    ],
  },
  {
    id: 5,
    trait: "Work Environment Preference",
    question: "What type of work environment energizes you?",
    options: [
      {
        text: "Collaborative spaces with lots of team interaction",
        careers: { "Product Manager": 3, "UX/UI Designer": 2, "Digital Marketer": 2 },
      },
      {
        text: "Quiet, focused environments for deep work",
        careers: { "Data Scientist": 3, "AI Researcher": 3, "Software Engineer": 2 },
      },
      {
        text: "Dynamic environments with varied daily challenges",
        careers: { "IT Support": 3, "DevOps Engineer": 2, "Cybersecurity Specialist": 2 },
      },
      {
        text: "Creative studios with flexible schedules",
        careers: { "Game Developer": 2, "UX/UI Designer": 2, "Web Developer": 2 },
      },
    ],
  },
  {
    id: 6,
    trait: "Communication Style",
    question: "How do you prefer to communicate complex ideas?",
    options: [
      {
        text: "Through visual designs and prototypes",
        careers: { "UX/UI Designer": 3, "Game Developer": 2, "Web Developer": 1 },
      },
      {
        text: "Using data, charts, and analytical insights",
        careers: { "Data Scientist": 3, "AI Researcher": 2, "Digital Marketer": 2 },
      },
      {
        text: "Writing clear documentation and code comments",
        careers: { "Software Engineer": 2, "DevOps Engineer": 2, "IT Support": 2 },
      },
      {
        text: "Leading presentations and strategic discussions",
        careers: { "Product Manager": 3, "Digital Marketer": 2, "Cybersecurity Specialist": 1 },
      },
    ],
  },
  {
    id: 7,
    trait: "Learning Preference",
    question: "What's your preferred way to learn new technologies?",
    options: [
      {
        text: "Hands-on coding and building projects",
        careers: { "Software Engineer": 3, "Web Developer": 3, "Mobile Developer": 3 },
      },
      {
        text: "Reading research papers and technical documentation",
        careers: { "AI Researcher": 3, "Data Scientist": 2, "Cybersecurity Specialist": 2 },
      },
      {
        text: "Taking structured courses and certifications",
        careers: { "Cloud Engineer": 2, "IT Support": 2, "DevOps Engineer": 2 },
      },
      {
        text: "Experimenting with user feedback and iteration",
        careers: { "UX/UI Designer": 3, "Product Manager": 2, "Game Developer": 2 },
      },
    ],
  },
  {
    id: 8,
    trait: "Detail Orientation",
    question: "What level of detail matters most to you in your work?",
    options: [
      {
        text: "Pixel-perfect designs and seamless user experiences",
        careers: { "UX/UI Designer": 3, "Web Developer": 2, "Mobile Developer": 2 },
      },
      {
        text: "Bug-free, optimized, and maintainable code",
        careers: { "Software Engineer": 3, "DevOps Engineer": 2, "Cloud Engineer": 2 },
      },
      {
        text: "Accurate data analysis and statistical significance",
        careers: { "Data Scientist": 3, "AI Researcher": 2, "Digital Marketer": 1 },
      },
      {
        text: "Comprehensive security measures and risk assessment",
        careers: { "Cybersecurity Specialist": 3, "IT Support": 2, "Cloud Engineer": 1 },
      },
    ],
  },
  {
    id: 9,
    trait: "Innovation Approach",
    question: "How do you like to drive innovation?",
    options: [
      {
        text: "Developing cutting-edge AI algorithms and models",
        careers: { "AI Researcher": 3, "Data Scientist": 2, "Software Engineer": 1 },
      },
      {
        text: "Creating intuitive and delightful user experiences",
        careers: { "UX/UI Designer": 3, "Product Manager": 2, "Game Developer": 2 },
      },
      {
        text: "Building scalable systems that handle millions of users",
        careers: { "Cloud Engineer": 3, "DevOps Engineer": 2, "Software Engineer": 2 },
      },
      {
        text: "Discovering new ways to protect against cyber threats",
        careers: { "Cybersecurity Specialist": 3, "IT Support": 1, "DevOps Engineer": 1 },
      },
    ],
  },
  {
    id: 10,
    trait: "Data Relationship",
    question: "What's your relationship with data and analytics?",
    options: [
      {
        text: "I love finding patterns and insights in complex datasets",
        careers: { "Data Scientist": 3, "AI Researcher": 2, "Digital Marketer": 2 },
      },
      {
        text: "I use data to make informed product decisions",
        careers: { "Product Manager": 3, "UX/UI Designer": 2, "Digital Marketer": 2 },
      },
      {
        text: "I prefer working with code and systems over analyzing data",
        careers: { "Software Engineer": 2, "DevOps Engineer": 2, "Game Developer": 2 },
      },
      {
        text: "I use data to monitor security and system performance",
        careers: { "Cybersecurity Specialist": 2, "IT Support": 2, "Cloud Engineer": 2 },
      },
    ],
  },
  {
    id: 11,
    trait: "Project Type Preference",
    question: "What type of projects give you the most satisfaction?",
    options: [
      {
        text: "Long-term research that could change entire industries",
        careers: { "AI Researcher": 3, "Data Scientist": 2, "Cybersecurity Specialist": 1 },
      },
      {
        text: "Consumer-facing apps that millions of people use daily",
        careers: { "Mobile Developer": 3, "UX/UI Designer": 2, "Web Developer": 2 },
      },
      {
        text: "Behind-the-scenes infrastructure that powers everything",
        careers: { "DevOps Engineer": 3, "Cloud Engineer": 3, "IT Support": 2 },
      },
      {
        text: "Cross-functional initiatives that drive business growth",
        careers: { "Product Manager": 3, "Digital Marketer": 2, "UX/UI Designer": 1 },
      },
    ],
  },
  {
    id: 12,
    trait: "Future Impact Vision",
    question: "How do you want to make an impact in the tech world?",
    options: [
      {
        text: "Advance AI to solve humanity's biggest challenges",
        careers: { "AI Researcher": 3, "Data Scientist": 2, "Software Engineer": 1 },
      },
      {
        text: "Make technology accessible and enjoyable for everyone",
        careers: { "UX/UI Designer": 2, "Game Developer": 3, "Mobile Developer": 2 },
      },
      {
        text: "Build the reliable infrastructure that connects the world",
        careers: { "Cloud Engineer": 3, "DevOps Engineer": 2, "IT Support": 2 },
      },
      {
        text: "Lead teams that create products changing entire markets",
        careers: { "Product Manager": 3, "Digital Marketer": 2, "Cybersecurity Specialist": 1 },
      },
    ],
  },
]

// Career to major mapping
const careerMajorMapping = {
  "Software Engineer": ["Computer Science", "Software Engineering", "Information Technology"],
  "Data Scientist": ["Data Science", "Statistics", "Computer Science", "Mathematics"],
  "UX/UI Designer": ["Human-Computer Interaction", "Graphic Design", "Digital Media", "Psychology"],
  "Cybersecurity Specialist": ["Cybersecurity", "Information Security", "Computer Science", "Information Technology"],
  "AI Researcher": ["Artificial Intelligence", "Computer Science", "Machine Learning", "Cognitive Science"],
  "Cloud Engineer": ["Cloud Computing", "Computer Science", "Information Technology", "Systems Engineering"],
  "Game Developer": ["Game Development", "Computer Science", "Digital Media", "Interactive Media"],
  "Product Manager": ["Business Administration", "Computer Science", "Industrial Engineering", "Marketing"],
  "DevOps Engineer": ["Computer Science", "Information Technology", "Systems Engineering", "Software Engineering"],
  "Web Developer": ["Web Development", "Computer Science", "Information Technology", "Digital Media"],
  "Mobile Developer": ["Mobile Development", "Computer Science", "Software Engineering", "Information Technology"],
  "IT Support": ["Information Technology", "Computer Science", "Network Administration", "Technical Support"],
  "Digital Marketer": ["Digital Marketing", "Marketing", "Business Administration", "Communications"],
  "Network Engineer": ["Network Engineering", "Computer Science", "Information Technology", "Telecommunications"],
}

export default function PersonalityQuizPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [careerScores, setCareerScores] = useState<Record<string, number>>({})
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false)

  // Store the career for redirect after form submission
  const pendingCareer = useRef<string>('')

  // Initial setup: configure Tally and check completion flag
  useEffect(() => {
    // Check if user already completed sessions form
    const hasCompletedSessions = !shouldShowSessionsForm()
    console.log('Initial sessions form completion check:', hasCompletedSessions)
    setIsFirstTimeUser(!hasCompletedSessions)

    // Note: No global TallyConfig setup here - we'll configure each popup individually
    
    // Cleanup function to remove any global Tally state when leaving this page
    return () => {
      if (typeof window !== 'undefined') {
        // Clear any global TallyConfig when leaving personality quiz page
        if ((window as any).TallyConfig) {
          (window as any).TallyConfig = undefined
        }
        
        // Close any open popups
        if ((window as any).Tally && (window as any).Tally.closePopup) {
          (window as any).Tally.closePopup()
        }
        
        console.log('🧹 Cleaned up Tally global state on page exit')
      }
    }
  }, [])

  // Open Tally popup for first-time users
  const openTallyPopup = (career: string) => {
    console.log('Opening Tally popup for career:', career)
    pendingCareer.current = career
    
    if (typeof window !== 'undefined' && (window as any).Tally) {
      // Clear any global configuration first to avoid conflicts
      if ((window as any).TallyConfig) {
        (window as any).TallyConfig = undefined
      }
      
      // Open popup with specific configuration (not global)
      (window as any).Tally.openPopup('mRyEL4', {
        layout: 'modal',
        width: 600,
        height: 600,
        overlay: true,
        autoClose: false,
        emoji: { text: '👋', animation: 'wave' },
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        hideTitle: false,
        onSubmit: (submissionData: any) => {
          console.log('✅ Form submitted successfully!', submissionData)
          
          // Mark sessions form as shown and completed using new tracking system
          markSessionsFormShown()
          markSessionsFormCompleted()
          console.log('✅ Sessions form marked as shown and completed')
          
          // Update state
          setIsFirstTimeUser(false)
          console.log('✅ State updated: isFirstTimeUser = false')
          
          // Navigate to sessions
          console.log('✅ Redirecting to sessions for career:', career)
          router.push(`/introductory-sessions?career=${encodeURIComponent(career)}`)
        }
      })
    } else {
      console.error('❌ Tally not loaded or available')
    }
  }

  // Function to clear completion status (for testing)
  const clearCompletionStatus = () => {
    clearSessionsFormTracking()
    setIsFirstTimeUser(true)
    console.log('🧹 Sessions form completion status cleared')
  }

  // Handle click on Watch Session / Watch Career Session
  const handleWatchSessionClick = (e: React.MouseEvent, career: string) => {
    e.preventDefault()
    
    // Check if user should see the sessions form using new tracking system
    const shouldShowForm = shouldShowSessionsForm()
    
    console.log('🔍 Watch session clicked for career:', career)
    console.log('🔍 Should show sessions form:', shouldShowForm)
    
    if (!shouldShowForm) {
      console.log('✅ User has completed sessions form, going directly to sessions')
      router.push(`/introductory-sessions?career=${encodeURIComponent(career)}`)
    } else {
      console.log('❌ User has NOT completed sessions form, showing Tally popup')
      openTallyPopup(career)
    }
  }

  const getTopCareers = () => {
    return Object.entries(careerScores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
  }

  const getRecommendedMajors = () => {
    const topCareers = getTopCareers().slice(0, 2)
    const majorSet = new Set<string>()

    topCareers.forEach(([career]) => {
      const majors = careerMajorMapping[career as keyof typeof careerMajorMapping]
      if (majors) {
        majors.forEach((major) => majorSet.add(major))
      }
    })

    return Array.from(majorSet).slice(0, 3)
  }

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = { ...answers, [currentQuestion]: optionIndex }
    setAnswers(newAnswers)

    // Calculate scores
    const option = personalityQuiz[currentQuestion].options[optionIndex]
    const newScores = { ...careerScores }

    Object.entries(option.careers).forEach(([career, points]) => {
      newScores[career] = (newScores[career] || 0) + points
    })

    setCareerScores(newScores)

    // Move to next question or show results
    if (currentQuestion < personalityQuiz.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 500)
    } else {
      setTimeout(() => setShowResults(true), 500)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setCareerScores({})
  }

  const getCareerIcon = (career: string) => {
      if (career.includes("Software") || career.includes("Web") || career.includes("Mobile")) return Code
  if (career.includes("Data") || career.includes("AI")) return Database
  if (career.includes("UX") || career.includes("UI")) return Palette
  if (career.includes("Cybersecurity")) return Shield
  if (career.includes("Cloud") || career.includes("DevOps")) return Cloud
  if (career.includes("Game")) return GameController2
  if (career.includes("Product") || career.includes("Digital")) return TrendingUp
  return Cpu
}

const progress = ((currentQuestion + 1) / personalityQuiz.length) * 100

  if (showResults) {
    const topCareers = getTopCareers()
    const topCareer = topCareers[0]?.[0] || ""
    const recommendedMajors = getRecommendedMajors()

    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/30 to-white font-modern">
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
                <Button
                  onClick={clearCompletionStatus}
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex text-xs border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-200"
                >
                  Reset Form Status
                </Button>
            <Button
              onClick={resetQuiz}
              variant="outline"
              size="sm"
              className="flex items-center gap-1 sm:gap-2 border-brand-primary-stroke text-brand-primary-stroke hover:bg-brand-primary-fill hover:text-white bg-transparent transition-all duration-200 px-3 sm:px-4"
            >
              <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Retake</span>
              <span className="xs:hidden">↻</span>
            </Button>
          </div>
        </div>
      </div>
        </header>

        {/* Mobile-Optimized Results Section */}
        <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Success Animation - Mobile Responsive */}
            <div className="text-center mb-8 sm:mb-12">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-brand-gradient rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-bounce shadow-2xl">
                <Trophy className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-3 sm:mb-4 leading-tight">
                Perfect Match <span className="bg-brand-gradient bg-clip-text text-transparent block sm:inline">Found!</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2">
                Based on your personality assessment, here are your personalized career recommendations
              </p>
            </div>

            {/* Top Career Results - Mobile Optimized */}
            <div className="mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-900">Your Top Career Matches</h2>
              <div className="grid gap-4 sm:gap-6">
                {topCareers.map(([career, score], index) => {
                  const IconComponent = getCareerIcon(career)

                  return (
                    <Card
                      key={career}
                      className={`p-4 sm:p-6 border-2 ${
                        index === 0
                          ? "border-brand-primary-fill bg-gradient-to-r from-brand-primary-fill/10 to-brand-gradient-end/5"
                          : "border-gray-200 hover:border-brand-primary-fill/50"
                      } rounded-2xl sm:rounded-3xl transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl`}
                    >
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                            <div
                              className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 ${
                                index === 0 ? "bg-brand-gradient shadow-lg" : "bg-gray-200"
                              }`}
                            >
                              <IconComponent className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 ${index === 0 ? "text-white" : "text-gray-600"}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">{career}</h3>
                                {index === 0 && <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-brand-primary-fill shrink-0" />}
                              </div>
                              <p className="text-sm sm:text-base text-gray-600">Match Score: {score} points</p>
                            </div>
                          </div>
                          {index === 0 && (
                            <Button 
                              onClick={(e) => handleWatchSessionClick(e, career)}
                              className="bg-brand-primary-fill hover:bg-brand-primary-stroke text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto text-sm sm:text-base"
                            >
                              <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                              Watch Session
                            </Button>
                          )}
                        </div>
                        <div className="mt-3 sm:mt-4 w-full bg-gray-200 rounded-full h-2 sm:h-3">
                          <div
                            className={`h-2 sm:h-3 rounded-full ${
                              index === 0 ? "bg-brand-gradient" : "bg-gray-400"
                            } transition-all duration-1000 ease-out`}
                            style={{
                              width: `${(score / Math.max(...Object.values(careerScores))) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Recommended Majors - Mobile Optimized */}
            <Card className="p-4 sm:p-6 lg:p-8 border-2 border-brand-primary-stroke rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white to-gray-50 shadow-xl">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                  <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-brand-primary-fill" />
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 text-center sm:text-left">Recommended University Majors</h2>
                </div>
                <p className="text-gray-600 mb-6 sm:mb-8 text-center text-sm sm:text-base lg:text-lg leading-relaxed">
                  Based on your top career matches, these majors will best prepare you for success
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {recommendedMajors.map((major, index) => (
                    <div
                      key={major}
                      className="bg-white p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border border-gray-200 hover:border-brand-primary-fill transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-brand-gradient rounded-lg flex items-center justify-center shrink-0">
                          <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-white" />
                        </div>
                        <span className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg leading-tight">{major}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons - Mobile Optimized */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-12">
              <Button 
                onClick={(e) => handleWatchSessionClick(e, topCareer)}
                className="bg-brand-primary-fill hover:bg-brand-primary-stroke text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto min-h-[48px]"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Watch Career Session
              </Button>
              <Button
                onClick={resetQuiz}
                variant="outline"
                className="border-2 border-brand-primary-stroke text-brand-primary-stroke px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold hover:bg-brand-primary-fill hover:text-white w-full sm:w-auto bg-transparent transition-all duration-300 min-h-[48px]"
              >
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Retake Quiz
              </Button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/30 to-white font-modern">
      {/* Background Shapes - Responsive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 sm:top-32 left-[5%] sm:left-[10%] animate-float z-0">
          <Brain className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-gray-800" style={{ opacity: 0.03 }} />
        </div>
        <div className="absolute top-32 sm:top-48 right-[8%] sm:right-[15%] animate-float-delayed z-0">
          <Lightbulb className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-gray-700" style={{ opacity: 0.03 }} />
        </div>
        <div className="absolute bottom-32 sm:bottom-40 left-[15%] sm:left-[20%] animate-float z-0">
          <Target className="w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-gray-800" style={{ opacity: 0.03 }} />
        </div>
        <div className="absolute bottom-20 sm:bottom-32 right-[20%] sm:right-[25%] animate-float-delayed z-0">
          <Users className="w-10 h-10 sm:w-14 sm:h-14 lg:w-18 lg:h-18 text-gray-700" style={{ opacity: 0.03 }} />
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
              <span className="text-xs sm:text-sm text-gray-600 hidden xs:block">
                {currentQuestion + 1} of {personalityQuiz.length}
              </span>
              <Button onClick={resetQuiz} variant="ghost" size="sm" className="text-gray-600 hover:text-brand-primary-fill p-2">
                <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile-Optimized Quiz Section */}
      <section className="py-6 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar - Mobile Responsive */}
          <div className="mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-2">
              <h2 className="text-base sm:text-lg font-semibold text-gray-700 truncate">{personalityQuiz[currentQuestion].trait}</h2>
              <span className="text-sm text-gray-500 shrink-0">
                {currentQuestion + 1}/{personalityQuiz.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 overflow-hidden shadow-inner">
              <div
                className="h-full bg-brand-gradient rounded-full transition-all duration-500 ease-out shadow-sm"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card - Mobile Optimized */}
          <Card className="p-4 sm:p-6 lg:p-8 border-2 border-gray-100 rounded-2xl sm:rounded-3xl shadow-xl bg-white/95 backdrop-blur-sm mb-6 sm:mb-8">
            <CardContent className="p-0">
              <div className="text-center mb-6 sm:mb-8">
                <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-brand-gradient rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                  <Target className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-white" />
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
                  {personalityQuiz[currentQuestion].question}
                </h1>
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg">Choose the option that best describes you</p>
              </div>

              {/* Answer Options - Mobile Optimized */}
              <div className="grid gap-3 sm:gap-4">
                {personalityQuiz[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    variant="outline"
                    className="p-4 sm:p-5 lg:p-6 h-auto text-left border-2 border-gray-200 hover:border-brand-primary-fill hover:bg-brand-primary-fill/5 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg group min-h-[64px] sm:min-h-[72px]"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 w-full">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gray-100 group-hover:bg-brand-primary-fill/10 rounded-full flex items-center justify-center font-bold text-gray-600 group-hover:text-brand-primary-fill transition-colors shrink-0">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-sm sm:text-base lg:text-lg font-medium text-gray-900 flex-1 leading-relaxed text-left">{option.text}</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-brand-primary-fill transition-colors shrink-0" />
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation - Mobile Optimized */}
          <div className="flex items-center justify-between">
            <Button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              variant="outline"
              className="flex items-center gap-1 sm:gap-2 border-gray-300 text-gray-600 disabled:opacity-50 hover:border-brand-primary-fill hover:text-brand-primary-fill px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base min-h-[44px]"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Previous</span>
            </Button>
            <div className="flex gap-1 sm:gap-2">
              {personalityQuiz.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
                    index <= currentQuestion ? "bg-brand-primary-fill scale-110" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <div className="w-16 sm:w-20 lg:w-24" /> {/* Spacer for alignment */}
          </div>
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
    </div>
  )
}
