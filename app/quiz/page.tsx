"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
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
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"

// Quiz data structure
const quizQuestions = [
  {
    id: 1,
    trait: "Creativity",
    question: "When faced with a problem, what's your first instinct?",
    options: [
      {
        text: "Think of multiple creative solutions",
        careers: { "UI/UX Designer": 3, "Game Developer": 2, "Digital Marketer": 2 },
      },
      { text: "Break it down logically step by step", careers: { "Software Developer": 3, "Data Scientist": 2 } },
      { text: "Research existing solutions first", careers: { "Technical Writer": 2, "IT Consultant": 2 } },
      { text: "Collaborate with others for ideas", careers: { "IT Project Manager": 2, "DevOps Engineer": 1 } },
    ],
  },
  {
    id: 2,
    trait: "Logical Thinking",
    question: "Which type of puzzle do you enjoy most?",
    options: [
      {
        text: "Mathematical equations and algorithms",
        careers: { "Data Scientist": 3, "AI/Machine Learning Engineer": 3 },
      },
      { text: "Logic puzzles and brain teasers", careers: { "Software Developer": 2, "Cybersecurity Analyst": 2 } },
      { text: "Design challenges and visual problems", careers: { "UI/UX Designer": 3, "Web Developer": 2 } },
      { text: "Strategic planning scenarios", careers: { "IT Project Manager": 3, "IT Consultant": 2 } },
    ],
  },
  {
    id: 3,
    trait: "Problem Solving",
    question: "How do you prefer to solve complex problems?",
    options: [
      { text: "Write code to automate the solution", careers: { "Software Developer": 3, "DevOps Engineer": 2 } },
      { text: "Analyze data to find patterns", careers: { "Data Scientist": 3, "AI/Machine Learning Engineer": 2 } },
      { text: "Design user-friendly interfaces", careers: { "UI/UX Designer": 3, "Web Developer": 2 } },
      { text: "Create comprehensive documentation", careers: { "Technical Writer": 3, "IT Consultant": 2 } },
    ],
  },
  {
    id: 4,
    trait: "Leadership",
    question: "In group projects, you naturally tend to:",
    options: [
      { text: "Take charge and coordinate everyone", careers: { "IT Project Manager": 3, "IT Consultant": 2 } },
      { text: "Lead by example through your work", careers: { "Software Developer": 2, "DevOps Engineer": 2 } },
      { text: "Guide the creative direction", careers: { "UI/UX Designer": 2, "Digital Marketer": 2 } },
      { text: "Mentor and help team members", careers: { "Technical Writer": 2, "IT Consultant": 2 } },
    ],
  },
  {
    id: 5,
    trait: "Empathy",
    question: "What motivates you most in your work?",
    options: [
      { text: "Creating solutions that help people", careers: { "UI/UX Designer": 3, "Technical Writer": 2 } },
      {
        text: "Protecting others from digital threats",
        careers: { "Cybersecurity Analyst": 3, "Network Engineer": 2 },
      },
      { text: "Building engaging experiences", careers: { "Game Developer": 2, "Web Developer": 2 } },
      {
        text: "Solving complex technical challenges",
        careers: { "AI/Machine Learning Engineer": 2, "Robotics Engineer": 2 },
      },
    ],
  },
  {
    id: 6,
    trait: "Teamwork",
    question: "Your ideal work environment involves:",
    options: [
      {
        text: "Collaborating closely with designers and developers",
        careers: { "Web Developer": 2, "DevOps Engineer": 2 },
      },
      { text: "Working with cross-functional teams", careers: { "IT Project Manager": 3, "Digital Marketer": 2 } },
      { text: "Pair programming and code reviews", careers: { "Software Developer": 2, "DevOps Engineer": 2 } },
      { text: "Independent work with occasional check-ins", careers: { "Data Scientist": 2, "Technical Writer": 2 } },
    ],
  },
  {
    id: 7,
    trait: "Independence",
    question: "How do you prefer to manage your workload?",
    options: [
      {
        text: "Set your own schedule and work autonomously",
        careers: { "Software Developer": 2, "Data Scientist": 3 },
      },
      { text: "Follow structured processes and timelines", careers: { "DevOps Engineer": 2, "Network Engineer": 2 } },
      {
        text: "Balance independent work with team collaboration",
        careers: { "UI/UX Designer": 2, "Technical Writer": 2 },
      },
      { text: "Lead projects and coordinate with others", careers: { "IT Project Manager": 3, "IT Consultant": 2 } },
    ],
  },
  {
    id: 8,
    trait: "Communication",
    question: "Which communication style suits you best?",
    options: [
      { text: "Writing detailed documentation and guides", careers: { "Technical Writer": 3, "IT Consultant": 2 } },
      { text: "Presenting ideas to stakeholders", careers: { "IT Project Manager": 2, "Digital Marketer": 3 } },
      { text: "Explaining complex concepts simply", careers: { "UI/UX Designer": 2, "Technical Writer": 2 } },
      {
        text: "Collaborating through code and technical discussions",
        careers: { "Software Developer": 2, "DevOps Engineer": 2 },
      },
    ],
  },
  {
    id: 9,
    trait: "Interest in Tech",
    question: "Which technology trend excites you most?",
    options: [
      {
        text: "Artificial Intelligence and Machine Learning",
        careers: { "AI/Machine Learning Engineer": 3, "Data Scientist": 2 },
      },
      { text: "Cybersecurity and digital privacy", careers: { "Cybersecurity Analyst": 3, "Network Engineer": 2 } },
      { text: "Virtual Reality and Gaming", careers: { "Game Developer": 3, "UI/UX Designer": 2 } },
      { text: "Robotics and IoT devices", careers: { "Robotics Engineer": 3, "Network Engineer": 2 } },
    ],
  },
  {
    id: 10,
    trait: "Risk-taking",
    question: "How comfortable are you with uncertainty?",
    options: [
      {
        text: "Love exploring new technologies and frameworks",
        careers: { "Software Developer": 2, "AI/Machine Learning Engineer": 2 },
      },
      { text: "Prefer proven methods with calculated risks", careers: { "DevOps Engineer": 2, "Network Engineer": 2 } },
      { text: "Enjoy experimenting with creative solutions", careers: { "Game Developer": 2, "UI/UX Designer": 2 } },
      { text: "Take strategic risks for business growth", careers: { "Digital Marketer": 2, "IT Consultant": 2 } },
    ],
  },
  {
    id: 11,
    trait: "Preference for Practical Work",
    question: "What type of work gives you the most satisfaction?",
    options: [
      { text: "Building tangible products people can use", careers: { "Software Developer": 2, "Web Developer": 3 } },
      { text: "Setting up and maintaining systems", careers: { "DevOps Engineer": 3, "Network Engineer": 3 } },
      { text: "Creating physical prototypes and robots", careers: { "Robotics Engineer": 3, "Game Developer": 1 } },
      { text: "Analyzing data to drive decisions", careers: { "Data Scientist": 2, "Digital Marketer": 2 } },
    ],
  },
  {
    id: 12,
    trait: "Curiosity",
    question: "What drives your learning and growth?",
    options: [
      {
        text: "Understanding how complex systems work",
        careers: { "AI/Machine Learning Engineer": 2, "Robotics Engineer": 2 },
      },
      { text: "Discovering new ways to solve problems", careers: { "Software Developer": 2, "Data Scientist": 2 } },
      { text: "Learning about user behavior and psychology", careers: { "UI/UX Designer": 2, "Digital Marketer": 2 } },
      { text: "Exploring emerging technologies and trends", careers: { "IT Consultant": 2, "Technical Writer": 2 } },
    ],
  },
]

const careerMajorMapping = {
  "Software Developer": ["Computer Science", "Software Engineering", "Information Technology"],
  "Data Scientist": ["Data Science", "Computer Science", "Artificial Intelligence"],
  "Cybersecurity Analyst": ["Cybersecurity", "Computer Science", "Information Technology"],
  "UI/UX Designer": ["Human-Computer Interaction", "Product Design", "Digital Media"],
  "IT Project Manager": ["Business Informatics", "Information Systems", "Computer Science"],
  "AI/Machine Learning Engineer": ["Artificial Intelligence", "Computer Science", "Data Science"],
  "Network Engineer": ["Computer Networks", "Information Technology", "Computer Engineering"],
  "Digital Marketer": ["Marketing & Communication", "Digital Media", "Business Informatics"],
  "Game Developer": ["Game Design", "Computer Science", "Digital Media"],
  "Web Developer": ["Computer Science", "Software Engineering", "Information Technology"],
  "Technical Writer": ["Marketing & Communication", "Computational Linguistics", "Information Systems"],
  "DevOps Engineer": ["Computer Science", "Information Technology", "Software Engineering"],
  "Robotics Engineer": ["Robotics", "Mechatronics", "Electrical Engineering"],
  "IT Consultant": ["Business Informatics", "Information Systems", "Computer Science"],
}

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [careerScores, setCareerScores] = useState<Record<string, number>>({})

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = { ...answers, [currentQuestion]: optionIndex }
    setAnswers(newAnswers)

    // Calculate scores
    const option = quizQuestions[currentQuestion].options[optionIndex]
    const newScores = { ...careerScores }

    Object.entries(option.careers).forEach(([career, points]) => {
      newScores[career] = (newScores[career] || 0) + points
    })

    setCareerScores(newScores)

    // Move to next question or show results
    if (currentQuestion < quizQuestions.length - 1) {
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

  const getTopCareers = () => {
    return Object.entries(careerScores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
  }

  const getRecommendedMajors = (topCareer: string) => {
    return careerMajorMapping[topCareer as keyof typeof careerMajorMapping] || []
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  if (showResults) {
    const topCareers = getTopCareers()
    const topCareer = topCareers[0]?.[0] || ""
    const recommendedMajors = getRecommendedMajors(topCareer)

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
              <Button
                onClick={resetQuiz}
                variant="outline"
                size="sm"
                className="flex items-center gap-1 sm:gap-2 border-brand-primary-stroke text-brand-primary-stroke hover:bg-brand-primary-fill hover:text-white bg-transparent transition-all duration-200 px-3 sm:px-4 text-sm"
              >
                <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Retake Quiz</span>
                <span className="xs:hidden">↻</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Mobile-Responsive Results Section */}
        <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Success Animation - Mobile Responsive */}
            <div className="mb-6 sm:mb-8">
              <div className="w-20 h-20 sm:w-22 sm:h-22 lg:w-24 lg:h-24 bg-brand-gradient rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-bounce shadow-2xl">
                <Trophy className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-3 sm:mb-4 leading-tight">
                Your Perfect <span className="bg-brand-gradient bg-clip-text text-transparent block sm:inline">Career Match!</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
                Based on your responses, here are your top career recommendations
              </p>
            </div>

            {/* Top Career Results - Mobile Optimized */}
            <div className="grid gap-4 sm:gap-6 mb-8 sm:mb-12">
              {topCareers.map(([career, score], index) => (
                <Card
                  key={career}
                  className={`p-4 sm:p-6 border-2 ${index === 0 ? "border-brand-primary-fill bg-brand-primary-fill/5" : "border-gray-200"} rounded-2xl sm:rounded-3xl transform hover:scale-[1.02] transition-all duration-300 shadow-lg`}
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-3 sm:gap-4">
                      <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center ${index === 0 ? "bg-brand-gradient" : "bg-gray-200"}`}
                        >
                          <span className={`text-lg sm:text-xl font-bold ${index === 0 ? "text-white" : "text-gray-600"}`}>
                            {index + 1}
                          </span>
                        </div>
                        <div className="text-left flex-1 min-w-0">
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">{career}</h3>
                          <p className="text-sm sm:text-base text-gray-600">Match Score: {score} points</p>
                        </div>
                      </div>
                      {index === 0 && <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-brand-primary-fill shrink-0" />}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                      <div
                        className={`h-2 sm:h-3 rounded-full ${index === 0 ? "bg-brand-gradient" : "bg-gray-400"} transition-all duration-1000 ease-out`}
                        style={{ width: `${(score / Math.max(...Object.values(careerScores))) * 100}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recommended Majors - Mobile Optimized */}
            <Card className="p-4 sm:p-6 lg:p-8 border-2 border-brand-primary-stroke rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white to-gray-50 shadow-xl">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-brand-primary-fill" />
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 text-center sm:text-left">Recommended University Majors</h2>
                </div>
                <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg text-center">
                  Based on your top career match: <span className="font-bold text-brand-primary-fill">{topCareer}</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {recommendedMajors.map((major, index) => (
                    <div
                      key={major}
                      className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-gray-200 hover:border-brand-primary-fill transition-colors cursor-pointer transform hover:scale-[1.02]"
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-brand-gradient rounded-lg flex items-center justify-center shrink-0">
                          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-white" />
                        </div>
                        <span className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg leading-tight">{major}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons - Mobile Optimized */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 sm:mt-12">
              <Button
                onClick={resetQuiz}
                className="bg-brand-primary-fill hover:bg-brand-primary-stroke text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto min-h-[48px]"
              >
                Take Quiz Again
              </Button>
              <Link href="/">
                <Button
                  variant="outline"
                  className="border-2 border-brand-primary-stroke text-brand-primary-stroke px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold hover:bg-brand-primary-fill hover:text-white w-full sm:w-auto bg-transparent transition-all duration-300 min-h-[48px]"
                >
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

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
              <span className="text-xs sm:text-sm text-gray-600 hidden xs:block">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>
              <Button onClick={resetQuiz} variant="ghost" size="sm" className="text-gray-600 hover:text-brand-primary-fill p-2">
                <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile-Optimized Quiz Section */}
      <section className="py-6 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar - Mobile Responsive */}
          <div className="mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-2">
              <h2 className="text-base sm:text-lg font-semibold text-gray-700 truncate">{quizQuestions[currentQuestion].trait}</h2>
              <span className="text-sm text-gray-500 shrink-0">
                {currentQuestion + 1}/{quizQuestions.length}
              </span>
            </div>
            <Progress value={progress} className="h-3 sm:h-4 bg-gray-200">
              <div
                className="h-full bg-brand-gradient rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </Progress>
          </div>

          {/* Question Card - Mobile Optimized */}
          <Card className="p-4 sm:p-6 lg:p-8 border-2 border-gray-100 rounded-2xl sm:rounded-3xl shadow-xl bg-white/95 backdrop-blur-sm mb-6 sm:mb-8">
            <CardContent className="p-0">
              <div className="text-center mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-brand-gradient rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                  <Target className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
                  {quizQuestions[currentQuestion].question}
                </h1>
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg">Choose the option that best describes you</p>
              </div>

              {/* Answer Options - Mobile Optimized */}
              <div className="grid gap-3 sm:gap-4">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    variant="outline"
                    className="p-4 sm:p-5 lg:p-6 h-auto text-left border-2 border-gray-200 hover:border-brand-primary-fill hover:bg-brand-primary-fill/5 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg group min-h-[64px] sm:min-h-[72px]"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 w-full">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-gray-100 group-hover:bg-brand-primary-fill/10 rounded-full flex items-center justify-center font-bold text-gray-600 group-hover:text-brand-primary-fill transition-colors shrink-0 text-sm sm:text-base">
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
              {quizQuestions.map((_, index) => (
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
    </div>
  )
}
