import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'SkillMap - Find Your Ideal Career Path',
  description: 'Discover your perfect career path with AI-powered personality assessment and expert guidance. Take our 3-minute quiz to unlock your potential.',
  generator: 'Next.js',
  keywords: 'career assessment, personality quiz, career guidance, skill development, AI career coaching',
  authors: [{ name: 'SkillMap Team' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes',
  themeColor: '#A063D4',
  robots: 'index, follow',
  openGraph: {
    title: 'SkillMap - Find Your Ideal Career Path',
    description: 'Discover your perfect career path with AI-powered personality assessment and expert guidance.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkillMap - Find Your Ideal Career Path',
    description: 'Discover your perfect career path with AI-powered personality assessment and expert guidance.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SkillMap" />
        
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}

/* Enhanced mobile responsiveness */
* {
  box-sizing: border-box;
}

/* Improved touch targets for mobile */
@media (max-width: 768px) {
  button, 
  a, 
  [role="button"], 
  input[type="button"], 
  input[type="submit"] {
    min-height: 44px;
    min-width: 44px;
  }
}

/* Better mobile text sizing */
@media (max-width: 640px) {
  html {
    font-size: 14px;
  }
}

/* Prevent horizontal scroll on mobile */
body {
  overflow-x: hidden;
}

/* Enhanced focus states for accessibility */
*:focus-visible {
  outline: 2px solid #A063D4;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Improved scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f8fafc;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #A063D4 0%, #732AC1 100%);
  border-radius: 3px;
  transition: background 0.2s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #732AC1 0%, #5a1fa5 100%);
}

/* Firefox scrollbar */
html {
  scrollbar-width: thin;
  scrollbar-color: #A063D4 #f8fafc;
}

/* Tally form modal centering styles - Enhanced for mobile */
.tally-modal-overlay {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 9999 !important;
  padding: 16px !important;
}

.tally-modal {
  position: relative !important;
  top: auto !important;
  left: auto !important;
  transform: none !important;
  max-height: 90vh !important;
  max-width: 90vw !important;
  width: 100% !important;
  margin: auto !important;
  z-index: 10000 !important;
  border-radius: 12px !important;
  overflow: hidden !important;
}

/* Mobile-optimized Tally form styling */
iframe[src*="tally.so"] {
  border-radius: 12px !important;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
  max-width: 350px !important;
  width: 100% !important;
}

/* Responsive Tally form widths */
@media (max-width: 480px) {
  iframe[src*="tally.so"] {
    max-width: 320px !important;
  }
  
  .tally-modal-overlay {
    padding: 8px !important;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  iframe[src*="tally.so"] {
    max-width: 400px !important;
  }
}

/* Waitlist form specific styling - larger width for desktop */
.waitlist-form-popup iframe[src*="tally.so"] {
  max-width: 500px !important;
  width: 100% !important;
}

.waitlist-form-popup {
  max-width: 500px !important;
  width: 90% !important;
  min-width: 320px !important;
}

/* More specific Tally targeting */
div[data-tally-widget-container] {
  max-width: 350px !important;
  width: 80% !important;
  min-width: 300px !important;
}

/* Waitlist form container override */
.waitlist-form-popup div[data-tally-widget-container] {
  max-width: 500px !important;
  width: 90% !important;
  min-width: 320px !important;
}

/* Target Tally popup wrapper */
[class*="tally"] iframe {
  max-width: 350px !important;
  width: 100% !important;
}

/* Tally popup container - Enhanced mobile support */
#tally-open-popup {
  position: fixed !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  z-index: 9999 !important;
  max-height: 85vh !important;
  max-width: 350px !important;
  width: 80% !important;
  min-width: 300px !important;
  height: auto !important;
}

/* Mobile-specific adjustments */
@media (max-width: 480px) {
  #tally-open-popup {
    max-width: 320px !important;
    width: 90% !important;
    min-width: 280px !important;
  }
}

/* Waitlist form popup override */
#tally-open-popup.waitlist-form-popup {
  max-width: 500px !important;
  width: 90% !important;
  min-width: 320px !important;
}

/* Sessions form popup override - keep small */
#tally-open-popup.sessions-form-popup {
  max-width: 350px !important;
  width: 80% !important;
  min-width: 300px !important;
}

/* Tally backdrop - Enhanced mobile support */
.tally-backdrop, [class*="tally-backdrop"] {
  background-color: rgba(0, 0, 0, 0.6) !important;
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  z-index: 9998 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 16px !important;
}

/* Additional Tally centering overrides */
[data-tally-popup] {
  position: fixed !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  z-index: 9999 !important;
  max-width: 90vw !important;
  max-height: 90vh !important;
}

[data-tally-overlay] {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  background-color: rgba(0, 0, 0, 0.6) !important;
  z-index: 9998 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 16px !important;
}

/* Performance optimizations */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  * {
    border-color: currentColor !important;
  }
}
        `}</style>
        <script async src="https://tally.so/widgets/embed.js"></script>
      </head>
      <body className="font-modern antialiased">{children}</body>
    </html>
  )
}
