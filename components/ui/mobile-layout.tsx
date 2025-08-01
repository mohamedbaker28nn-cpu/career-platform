"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useIsMobile, useBreakpoint } from "@/hooks/use-mobile"

interface MobileLayoutProps {
  children: React.ReactNode
  className?: string
}

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full'
}

interface ResponsiveGridProps {
  children: React.ReactNode
  className?: string
  cols?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    '2xl'?: number
  }
  gap?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    '2xl'?: number
  }
}

interface ResponsiveTextProps {
  children: React.ReactNode
  className?: string
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  size?: {
    xs?: string
    sm?: string
    md?: string
    lg?: string
    xl?: string
    '2xl'?: string
  }
}

interface ResponsiveSpacingProps {
  children: React.ReactNode
  className?: string
  padding?: {
    xs?: string
    sm?: string
    md?: string
    lg?: string
    xl?: string
    '2xl'?: string
  }
  margin?: {
    xs?: string
    sm?: string
    md?: string
    lg?: string
    xl?: string
    '2xl'?: string
  }
}

// Main mobile layout wrapper
export function MobileLayout({ children, className }: MobileLayoutProps) {
  const isMobile = useIsMobile()
  
  return (
    <div className={cn(
      "min-h-screen w-full",
      "transition-all duration-300",
      isMobile ? "overflow-x-hidden" : "",
      className
    )}>
      {children}
    </div>
  )
}

// Responsive container component
export function ResponsiveContainer({ 
  children, 
  className,
  maxWidth = 'xl'
}: ResponsiveContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full'
  }

  return (
    <div className={cn(
      "mx-auto px-4 sm:px-6 lg:px-8",
      maxWidthClasses[maxWidth],
      className
    )}>
      {children}
    </div>
  )
}

// Responsive grid component
export function ResponsiveGrid({ 
  children, 
  className,
  cols = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = { xs: 4, sm: 6, md: 8 }
}: ResponsiveGridProps) {
  const gridColsClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    12: 'grid-cols-12'
  }

  const gapClasses = {
    0: 'gap-0',
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    5: 'gap-5',
    6: 'gap-6',
    7: 'gap-7',
    8: 'gap-8',
    9: 'gap-9',
    10: 'gap-10',
    12: 'gap-12',
    16: 'gap-16'
  }

  const buildGridClasses = () => {
    const classes = ['grid']
    
    if (cols.xs) classes.push(gridColsClasses[cols.xs])
    if (cols.sm) classes.push(`sm:${gridColsClasses[cols.sm]}`)
    if (cols.md) classes.push(`md:${gridColsClasses[cols.md]}`)
    if (cols.lg) classes.push(`lg:${gridColsClasses[cols.lg]}`)
    if (cols.xl) classes.push(`xl:${gridColsClasses[cols.xl]}`)
    if (cols['2xl']) classes.push(`2xl:${gridColsClasses[cols['2xl']]}`)

    if (gap.xs) classes.push(gapClasses[gap.xs])
    if (gap.sm) classes.push(`sm:${gapClasses[gap.sm]}`)
    if (gap.md) classes.push(`md:${gapClasses[gap.md]}`)
    if (gap.lg) classes.push(`lg:${gapClasses[gap.lg]}`)
    if (gap.xl) classes.push(`xl:${gapClasses[gap.xl]}`)
    if (gap['2xl']) classes.push(`2xl:${gapClasses[gap['2xl']]}`)

    return classes.join(' ')
  }

  return (
    <div className={cn(buildGridClasses(), className)}>
      {children}
    </div>
  )
}

// Responsive text component
export function ResponsiveText({ 
  children, 
  className,
  variant = 'p',
  size
}: ResponsiveTextProps) {
  const Component = variant as keyof JSX.IntrinsicElements

  const buildTextClasses = () => {
    const classes = []
    
    if (size?.xs) classes.push(size.xs)
    if (size?.sm) classes.push(`sm:${size.sm}`)
    if (size?.md) classes.push(`md:${size.md}`)
    if (size?.lg) classes.push(`lg:${size.lg}`)
    if (size?.xl) classes.push(`xl:${size.xl}`)
    if (size?.['2xl']) classes.push(`2xl:${size['2xl']}`)

    return classes.join(' ')
  }

  return (
    <Component className={cn(buildTextClasses(), className)}>
      {children}
    </Component>
  )
}

// Responsive spacing component
export function ResponsiveSpacing({ 
  children, 
  className,
  padding,
  margin
}: ResponsiveSpacingProps) {
  const buildSpacingClasses = () => {
    const classes = []
    
    // Padding classes
    if (padding?.xs) classes.push(`p-${padding.xs}`)
    if (padding?.sm) classes.push(`sm:p-${padding.sm}`)
    if (padding?.md) classes.push(`md:p-${padding.md}`)
    if (padding?.lg) classes.push(`lg:p-${padding.lg}`)
    if (padding?.xl) classes.push(`xl:p-${padding.xl}`)
    if (padding?.['2xl']) classes.push(`2xl:p-${padding['2xl']}`)

    // Margin classes
    if (margin?.xs) classes.push(`m-${margin.xs}`)
    if (margin?.sm) classes.push(`sm:m-${margin.sm}`)
    if (margin?.md) classes.push(`md:m-${margin.md}`)
    if (margin?.lg) classes.push(`lg:m-${margin.lg}`)
    if (margin?.xl) classes.push(`xl:m-${margin.xl}`)
    if (margin?.['2xl']) classes.push(`2xl:m-${margin['2xl']}`)

    return classes.join(' ')
  }

  return (
    <div className={cn(buildSpacingClasses(), className)}>
      {children}
    </div>
  )
}

// Mobile-specific header component
interface MobileHeaderProps {
  children: React.ReactNode
  className?: string
  sticky?: boolean
  blur?: boolean
}

export function MobileHeader({ 
  children, 
  className,
  sticky = true,
  blur = true
}: MobileHeaderProps) {
  return (
    <header className={cn(
      "z-50 border-b border-gray-100 shadow-sm",
      sticky ? "sticky top-0" : "",
      blur ? "bg-white/95 backdrop-blur-lg" : "bg-white",
      className
    )}>
      <ResponsiveContainer>
        <div className="flex items-center justify-between h-16 sm:h-20">
          {children}
        </div>
      </ResponsiveContainer>
    </header>
  )
}

// Mobile-optimized section component
interface MobileSectionProps {
  children: React.ReactNode
  className?: string
  background?: 'white' | 'gray' | 'gradient' | 'dark'
  padding?: {
    xs?: string
    sm?: string
    md?: string
    lg?: string
  }
}

export function MobileSection({ 
  children, 
  className,
  background = 'white',
  padding = { xs: '16', sm: '20', lg: '24' }
}: MobileSectionProps) {
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gradient-to-br from-gray-50 to-white',
    gradient: 'bg-gradient-to-br from-white via-gray-50/30 to-white',
    dark: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'
  }

  const buildPaddingClasses = () => {
    const classes = []
    if (padding.xs) classes.push(`py-${padding.xs}`)
    if (padding.sm) classes.push(`sm:py-${padding.sm}`)
    if (padding.md) classes.push(`md:py-${padding.md}`)
    if (padding.lg) classes.push(`lg:py-${padding.lg}`)
    return classes.join(' ')
  }

  return (
    <section className={cn(
      "relative overflow-hidden",
      backgroundClasses[background],
      buildPaddingClasses(),
      className
    )}>
      <ResponsiveContainer>
        {children}
      </ResponsiveContainer>
    </section>
  )
}

// Mobile-optimized card component
interface MobileCardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'bordered' | 'glass'
  hover?: boolean
  padding?: string
}

export function MobileCard({ 
  children, 
  className,
  variant = 'default',
  hover = true,
  padding = 'p-6 sm:p-8'
}: MobileCardProps) {
  const variantClasses = {
    default: 'bg-white border border-gray-200 shadow-sm',
    elevated: 'bg-white shadow-lg hover:shadow-xl',
    bordered: 'bg-white border-2 border-gray-100 hover:border-brand-primary-fill/50',
    glass: 'bg-white/80 backdrop-blur-sm border border-gray-200/50'
  }

  return (
    <div className={cn(
      "rounded-2xl transition-all duration-300",
      variantClasses[variant],
      hover ? "transform hover:scale-[1.02]" : "",
      padding,
      className
    )}>
      {children}
    </div>
  )
}

// Touch-friendly button wrapper
interface TouchButtonProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function TouchButton({ children, className, size = 'md' }: TouchButtonProps) {
  const { isMobile } = useBreakpoint()
  
  const sizeClasses = {
    sm: isMobile ? 'min-h-[44px] min-w-[44px] px-4' : 'h-9 px-3',
    md: isMobile ? 'min-h-[48px] min-w-[48px] px-6' : 'h-10 px-4',
    lg: isMobile ? 'min-h-[52px] min-w-[52px] px-8' : 'h-11 px-8'
  }

  return (
    <div className={cn(sizeClasses[size], className)}>
      {children}
    </div>
  )
}

// Responsive image component
interface ResponsiveImageProps {
  src: string
  alt: string
  className?: string
  sizes?: {
    mobile?: { width: number; height: number }
    tablet?: { width: number; height: number }
    desktop?: { width: number; height: number }
  }
  priority?: boolean
}

export function ResponsiveImage({ 
  src, 
  alt, 
  className,
  sizes = {
    mobile: { width: 300, height: 200 },
    tablet: { width: 400, height: 300 },
    desktop: { width: 600, height: 400 }
  },
  priority = false
}: ResponsiveImageProps) {
  const { isMobile, isTablet } = useBreakpoint()
  
  const currentSize = isMobile 
    ? sizes.mobile 
    : isTablet 
    ? sizes.tablet 
    : sizes.desktop

  return (
    <img
      src={src}
      alt={alt}
      width={currentSize.width}
      height={currentSize.height}
      className={cn(
        "w-full h-auto object-cover rounded-lg",
        className
      )}
      loading={priority ? "eager" : "lazy"}
    />
  )
}
