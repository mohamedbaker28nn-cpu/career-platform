"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Logo } from "@/components/ui/logo"
import {
  BookOpen,
  Target,
  Map,
  GraduationCap,
  Brain,
  Award,
  Compass,
  Route,
  RotateCcw,
  Medal,
  Bookmark,
  Lightbulb,
  TrendingUp,
  Users,
  Star,
  Play,
  UserCheck,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useQuizNavigation } from "@/hooks/useQuizNavigation"

export default function HomePage() {
  const { 
    handleQuizButtonClick, 
    handleExpertSessionsClick
  } = useQuizNavigation()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-neutral-white font-modern">
      {/* Header - Mobile Responsive */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Logo 
              size="lg" 
              variant="link" 
              priority={true}
              className="transition-transform duration-200 hover:scale-105"
            />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              <Link href="/learning-roadmap">
                <Button
                  variant="ghost"
                  className="text-gray-700 font-medium hover:text-brand-primary-fill hover:bg-brand-primary-fill/10 transition-all duration-200 rounded-full px-6 py-2"
                >
                  Learning Roadmap
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="text-gray-700 font-medium hover:text-brand-primary-fill hover:bg-brand-primary-fill/10 transition-all duration-200 rounded-full px-6 py-2"
                onClick={handleQuizButtonClick}
              >
                Personality Quiz
              </Button>
              <Button
                variant="ghost"
                className="text-gray-700 font-medium hover:text-brand-primary-fill hover:bg-brand-primary-fill/10 transition-all duration-200 rounded-full px-6 py-2"
                onClick={handleExpertSessionsClick}
              >
                Expert Sessions
              </Button>
              <Button
                variant="ghost"
                className="text-gray-700 font-medium hover:text-brand-primary-fill hover:bg-brand-primary-fill/10 transition-all duration-200 rounded-full px-6 py-2"
                onClick={() => scrollToSection("choose-adventure")}
              >
                About
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full hover:bg-gray-100"
                onClick={() => {
                  const mobileMenu = document.getElementById('mobile-menu');
                  if (mobileMenu) {
                    mobileMenu.classList.toggle('hidden');
                  }
                }}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div id="mobile-menu" className="hidden lg:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link href="/learning-roadmap">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 font-medium hover:text-brand-primary-fill hover:bg-brand-primary-fill/10 transition-all duration-200 rounded-lg py-3"
                >
                  Learning Roadmap
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700 font-medium hover:text-brand-primary-fill hover:bg-brand-primary-fill/10 transition-all duration-200 rounded-lg py-3"
                onClick={handleQuizButtonClick}
              >
                Personality Quiz
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700 font-medium hover:text-brand-primary-fill hover:bg-brand-primary-fill/10 transition-all duration-200 rounded-lg py-3"
                onClick={handleExpertSessionsClick}
              >
                Expert Sessions
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700 font-medium hover:text-brand-primary-fill hover:bg-brand-primary-fill/10 transition-all duration-200 rounded-lg py-3"
                onClick={() => scrollToSection("choose-adventure")}
              >
                About
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Enhanced Mobile Design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-36">
            {/* Background Icons with improved mobile spacing */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60 sm:opacity-100">
              {/* Responsive grid-based distribution */}
              <div className="absolute top-8 left-[5%] sm:top-16 sm:left-[10%] animate-parallax-float" style={{ animationDelay: "0s" }}>
                <Brain className="w-8 h-8 sm:w-12 sm:h-12 text-gray-800" style={{ opacity: 0.08 }} />
              </div>
              <div className="absolute top-12 left-[20%] sm:top-20 sm:left-[25%] animate-parallax-drift" style={{ animationDelay: "2s" }}>
                <Lightbulb className="w-6 h-6 sm:w-10 sm:h-10 text-gray-700" style={{ opacity: 0.08 }} />
              </div>
              <div className="absolute top-6 left-[35%] sm:top-12 sm:left-[40%] animate-parallax-float" style={{ animationDelay: "4s" }}>
                <Target className="w-7 h-7 sm:w-11 sm:h-11 text-gray-800" style={{ opacity: 0.08 }} />
              </div>
              <div className="absolute top-16 right-[20%] sm:top-24 sm:right-[25%] animate-parallax-drift" style={{ animationDelay: "1s" }}>
                <Award className="w-6 h-6 sm:w-9 sm:h-9 text-gray-700" style={{ opacity: 0.08 }} />
              </div>
              <div className="absolute top-10 right-[5%] sm:top-18 sm:right-[15%] animate-parallax-float" style={{ animationDelay: "3s" }}>
                <Star className="w-7 h-7 sm:w-10 sm:h-10 text-gray-800" style={{ opacity: 0.08 }} />
              </div>
              
              {/* Additional background elements for larger screens */}
              <div className="hidden sm:block absolute top-[35%] left-[8%] animate-parallax-drift" style={{ animationDelay: "1.5s" }}>
                <Map className="w-10 h-10 text-gray-800" style={{ opacity: 0.1 }} />
              </div>
              <div className="hidden sm:block absolute top-[30%] right-[8%] animate-parallax-float" style={{ animationDelay: "3.5s" }}>
                <Compass className="w-12 h-12 text-gray-700" style={{ opacity: 0.1 }} />
              </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center max-w-6xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 mb-6 sm:mb-8 leading-tight tracking-tight">
                Find your ideal{" "}
                <span className="bg-brand-gradient bg-clip-text text-transparent block sm:inline mt-2 sm:mt-0">
                  career path
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-4xl mx-auto font-medium leading-relaxed px-4 sm:px-0">
                Not sure where to start? Our AI-powered quiz will tell you the best major and career for you!
              </p>
              
              {/* CTA Buttons - Improved mobile layout */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4 sm:px-0">
                <Button 
                  className="w-full sm:w-auto bg-brand-primary-fill hover:bg-brand-primary-stroke text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 min-w-[280px] sm:min-w-0"
                  onClick={handleQuizButtonClick}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Take Personality Quiz
                </Button>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-brand-primary-stroke text-brand-primary-stroke px-8 sm:px-12 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-bold bg-transparent hover:bg-brand-primary-fill hover:text-white hover:border-brand-primary-fill transform hover:scale-105 transition-all duration-300 min-w-[280px] sm:min-w-0"
                  onClick={() => scrollToSection("what-we-deliver")}
                >
                  Explore Features
                </Button>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your Adventure Section - Enhanced Mobile Design */}
      <section id="choose-adventure" className="relative overflow-hidden bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          {/* Background decorative elements - subtle and mobile optimized */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 sm:opacity-60">
            <div className="absolute top-16 left-[5%] sm:left-1/6 animate-float-wide">
              <Brain className="w-6 h-6 sm:w-10 sm:h-10 text-gray-800" style={{ opacity: 0.1 }} />
            </div>
            <div className="absolute bottom-16 right-[5%] sm:right-1/6 animate-float-wide-delayed">
              <Route className="w-8 h-8 sm:w-12 sm:h-12 text-gray-700" style={{ opacity: 0.1 }} />
            </div>
            <div className="hidden sm:block absolute top-1/2 left-1/4 animate-pulse-wide">
              <GraduationCap className="w-9 h-9 text-gray-800" style={{ opacity: 0.1 }} />
            </div>
            <div className="hidden sm:block absolute top-24 right-1/4 animate-spin-wide">
              <Compass className="w-10 h-10 text-gray-700" style={{ opacity: 0.1 }} />
            </div>
          </div>

          <div className="relative z-10">
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 sm:mb-6">
                Start Your{" "}
                <span className="bg-brand-gradient bg-clip-text text-transparent">Journey</span>
              </h2>
              <div className="w-16 sm:w-24 h-1 sm:h-2 bg-brand-gradient mx-auto rounded-full"></div>
            </div>

            {/* Cards Grid - Improved mobile layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              
              {/* Personality Quiz Card */}
              <Card className="group relative bg-white border-2 border-gray-100 hover:border-brand-primary-fill/50 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden">
                <CardContent className="p-6 sm:p-8 lg:p-10 text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brand-gradient rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">
                    Personality Quiz
                  </h3>
                  <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                    Discover your unique strengths and find the perfect career path that aligns with your personality.
                  </p>
                  <Button 
                    className="w-full bg-brand-primary-fill hover:bg-brand-primary-stroke text-white rounded-full py-3 sm:py-4 text-base sm:text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    onClick={handleQuizButtonClick}
                  >
                    Take Quiz →
                  </Button>
                </CardContent>
              </Card>

              {/* Learning Roadmap Card */}
              <Card className="group relative bg-white border-2 border-gray-100 hover:border-brand-primary-fill/50 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden">
                <CardContent className="p-6 sm:p-8 lg:p-10 text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brand-gradient rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Route className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">
                    Start Your Roadmap
                  </h3>
                  <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                    Get access to structured roadmaps across multiple fields, with continuous support from expert mentors, AI-guided coaching, soft skills integration, and active learning communities.
                  </p>
                  <Link href="/learning-roadmap">
                    <Button className="w-full bg-brand-primary-fill hover:bg-brand-primary-stroke text-white rounded-full py-3 sm:py-4 text-base sm:text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                      Start Learning →
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Expert Sessions Card */}
              <Card className="group relative bg-white border-2 border-gray-100 hover:border-brand-primary-fill/50 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden lg:col-span-1">
                <CardContent className="p-6 sm:p-8 lg:p-10 text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brand-gradient rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">
                    Expert Sessions
                  </h3>
                  <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                    Watch introductory sessions covering 14+ diverse fields, delivered by experienced professionals to help you make informed career decisions.
                  </p>
                  <Button 
                    className="w-full bg-brand-primary-fill hover:bg-brand-primary-stroke text-white rounded-full py-3 sm:py-4 text-base sm:text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    onClick={handleExpertSessionsClick}
                  >
                    Watch Sessions →
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What We Deliver Section - Mobile Optimized */}
      <section
        id="what-we-deliver"
        className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 sm:mb-6">
              What We{" "}
              <span className="bg-brand-gradient bg-clip-text text-transparent">Deliver</span>
            </h2>
            <div className="w-16 sm:w-24 h-1 sm:h-2 bg-brand-gradient mx-auto rounded-full"></div>
          </div>

          {/* Features Grid - Responsive layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            
            {/* Personality Quiz Feature */}
            <div className="group text-center transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:shadow-xl transition-all duration-300">
                <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-brand-primary-fill group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">
                Personality Quiz
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Discover your ideal major and career path through a professional, expert-designed personality test tailored to your strengths and interests.
              </p>
            </div>

            {/* Learning Roadmap Feature */}
            <div className="group text-center transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:shadow-xl transition-all duration-300">
                <Route className="w-8 h-8 sm:w-10 sm:h-10 text-brand-primary-fill group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">
                Learning Roadmap
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Get access to structured roadmaps across multiple fields, with continuous support from expert mentors, AI-guided coaching, soft skills integration, and active learning communities.
              </p>
            </div>

            {/* Expert Sessions Feature */}
            <div className="group text-center transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:shadow-xl transition-all duration-300">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 text-brand-primary-fill group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">
                Expert Sessions
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Watch introductory sessions covering 14+ diverse fields, delivered by experienced professionals to help you make informed career decisions.
              </p>
            </div>

            {/* Career Coaching Feature */}
            <div className="group text-center transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:shadow-xl transition-all duration-300">
                <UserCheck className="w-8 h-8 sm:w-10 sm:h-10 text-brand-primary-fill group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">
                Career Coaching
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Receive personalized coaching from human and AI career experts to confidently choose your future major or career path.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced Mobile Design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <div className="absolute top-20 left-[10%] sm:left-1/4 animate-pulse-wide blur-sm">
              <Medal className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
            </div>
            <div className="absolute bottom-20 right-[10%] sm:right-1/4 animate-float-wide blur-sm">
              <Bookmark className="w-10 h-10 sm:w-14 sm:h-14 text-gray-300" />
            </div>
          </div>

          <div className="relative z-10 text-center max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 sm:mb-6">
              Ready to{" "}
              <span className="bg-brand-gradient bg-clip-text text-transparent block sm:inline mt-2 sm:mt-0">
                Transform Your Future?
              </span>
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto">
              Start your journey toward the right career with SkillMap today.
            </p>
            <div className="flex justify-center">
              <Button 
                className="w-full sm:w-auto bg-brand-primary-fill hover:bg-brand-primary-stroke text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 max-w-sm sm:max-w-none"
                onClick={handleQuizButtonClick}
              >
                Take Your Quiz Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Mobile Optimized */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Company Section */}
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-lg mb-4 sm:mb-6">Company</h3>
              <ul className="space-y-2 sm:space-y-3 text-gray-400">
                <li
                  className="hover:text-white transition-colors cursor-pointer text-sm sm:text-base"
                  onClick={() => scrollToSection("what-we-deliver")}
                >
                  About Us
                </li>
              </ul>
            </div>

            {/* Quick Links Section */}
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-lg mb-4 sm:mb-6">Quick Links</h3>
              <ul className="space-y-2 sm:space-y-3 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">
                  <Link href="/personality-quiz" className="text-sm sm:text-base">
                    Personality Quiz
                  </Link>
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  <Link href="/learning-roadmap" className="text-sm sm:text-base">
                    Learning Roadmap
                  </Link>
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  <Link href="/introductory-sessions" className="text-sm sm:text-base">
                    Expert Sessions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services Section */}
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-lg mb-4 sm:mb-6">Services</h3>
              <ul className="space-y-2 sm:space-y-3 text-gray-400">
                <li
                  className="hover:text-white transition-colors cursor-pointer text-sm sm:text-base"
                  onClick={() => scrollToSection("what-we-deliver")}
                >
                  Personality Quiz
                </li>
                <li
                  className="hover:text-white transition-colors cursor-pointer text-sm sm:text-base"
                  onClick={() => scrollToSection("what-we-deliver")}
                >
                  Learning Roadmap
                </li>
                <li
                  className="hover:text-white transition-colors cursor-pointer text-sm sm:text-base"
                  onClick={() => scrollToSection("what-we-deliver")}
                >
                  Expert Sessions
                </li>
                <li
                  className="hover:text-white transition-colors cursor-pointer text-sm sm:text-base"
                  onClick={() => scrollToSection("what-we-deliver")}
                >
                  Career Coaching
                </li>
              </ul>
            </div>

            {/* Social Media Section */}
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-lg mb-4 sm:mb-6">Follow Us</h3>
              <div className="space-y-3 sm:space-y-4">
                <a 
                  href="https://www.linkedin.com/company/skillmapedue/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center sm:justify-start gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer text-sm sm:text-base"
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>LinkedIn</span>
                </a>
                <a 
                  href="https://www.youtube.com/@skillmapedu" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center sm:justify-start gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer text-sm sm:text-base"
                >
                  <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>YouTube</span>
                </a>
                <a 
                  href="https://www.instagram.com/skillmapedu/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center sm:justify-start gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer text-sm sm:text-base"
                >
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Instagram</span>
                </a>
                <a 
                  href="https://www.tiktok.com/@skillmapedu?lang=en" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center sm:justify-start gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer text-sm sm:text-base"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                  <span>TikTok</span>
                </a>
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 SkillMap. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float-wide {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-30px) translateX(15px) rotate(5deg); }
          50% { transform: translateY(-20px) translateX(-10px) rotate(-3deg); }
          75% { transform: translateY(-35px) translateX(20px) rotate(8deg); }
        }
        
        @keyframes float-wide-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-40px) translateX(-20px) rotate(-8deg); }
          50% { transform: translateY(-25px) translateX(15px) rotate(5deg); }
          75% { transform: translateY(-45px) translateX(-15px) rotate(-10deg); }
        }
        
        @keyframes bounce-wide {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          25% { transform: translateY(-25px) translateX(10px) scale(1.05); }
          50% { transform: translateY(-15px) translateX(-8px) scale(0.95); }
          75% { transform: translateY(-30px) translateX(12px) scale(1.02); }
        }
        
        @keyframes pulse-wide {
          0%, 100% { transform: scale(1) translateX(0px); opacity: 0.1; }
          25% { transform: scale(1.1) translateX(8px); opacity: 0.15; }
          50% { transform: scale(0.9) translateX(-5px); opacity: 0.08; }
          75% { transform: scale(1.05) translateX(10px); opacity: 0.12; }
        }
        
        @keyframes spin-wide {
          0% { transform: rotate(0deg) translateX(0px); }
          25% { transform: rotate(90deg) translateX(10px); }
          50% { transform: rotate(180deg) translateX(-8px); }
          75% { transform: rotate(270deg) translateX(12px); }
          100% { transform: rotate(360deg) translateX(0px); }
        }
        
        .animate-float-wide {
          animation: float-wide 8s ease-in-out infinite;
        }
        
        .animate-float-wide-delayed {
          animation: float-wide-delayed 10s ease-in-out infinite;
        }
        
        .animate-bounce-wide {
          animation: bounce-wide 6s ease-in-out infinite;
        }
        
        .animate-pulse-wide {
          animation: pulse-wide 7s ease-in-out infinite;
        }
        
        .animate-spin-wide {
          animation: spin-wide 15s linear infinite;
        }
      `}</style>
    </div>
  )
}
