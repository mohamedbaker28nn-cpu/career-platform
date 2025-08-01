import * as React from "react"

// Breakpoint constants
const BREAKPOINTS = {
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

type Breakpoint = keyof typeof BREAKPOINTS

interface UseBreakpointReturn {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isXs: boolean
  isSm: boolean
  isMd: boolean
  isLg: boolean
  isXl: boolean
  is2xl: boolean
  breakpoint: Breakpoint
  width: number
}

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINTS.md - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.md)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < BREAKPOINTS.md)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

export function useBreakpoint(): UseBreakpointReturn {
  const [breakpointData, setBreakpointData] = React.useState<UseBreakpointReturn>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isXs: false,
    isSm: false,
    isMd: false,
    isLg: false,
    isXl: false,
    is2xl: false,
    breakpoint: 'lg',
    width: 1024,
  })

  React.useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth
      
      // Determine current breakpoint
      let currentBreakpoint: Breakpoint = 'xs'
      if (width >= BREAKPOINTS['2xl']) currentBreakpoint = '2xl'
      else if (width >= BREAKPOINTS.xl) currentBreakpoint = 'xl'
      else if (width >= BREAKPOINTS.lg) currentBreakpoint = 'lg'
      else if (width >= BREAKPOINTS.md) currentBreakpoint = 'md'
      else if (width >= BREAKPOINTS.sm) currentBreakpoint = 'sm'
      else currentBreakpoint = 'xs'

      setBreakpointData({
        isMobile: width < BREAKPOINTS.md, // < 768px
        isTablet: width >= BREAKPOINTS.md && width < BREAKPOINTS.lg, // 768px - 1023px
        isDesktop: width >= BREAKPOINTS.lg, // >= 1024px
        isXs: width < BREAKPOINTS.sm, // < 640px
        isSm: width >= BREAKPOINTS.sm && width < BREAKPOINTS.md, // 640px - 767px
        isMd: width >= BREAKPOINTS.md && width < BREAKPOINTS.lg, // 768px - 1023px
        isLg: width >= BREAKPOINTS.lg && width < BREAKPOINTS.xl, // 1024px - 1279px
        isXl: width >= BREAKPOINTS.xl && width < BREAKPOINTS['2xl'], // 1280px - 1535px
        is2xl: width >= BREAKPOINTS['2xl'], // >= 1536px
        breakpoint: currentBreakpoint,
        width,
      })
    }

    // Initial check
    updateBreakpoint()

    // Listen for resize events
    const handleResize = () => updateBreakpoint()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return breakpointData
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState<boolean>(false)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => setMatches(event.matches)
    mediaQuery.addEventListener('change', handler)

    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}

// Utility hooks for specific queries
export function useIsTouchDevice(): boolean {
  return useMediaQuery('(hover: none) and (pointer: coarse)')
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

export function useIsLandscape(): boolean {
  return useMediaQuery('(orientation: landscape)')
}

export function useIsPortrait(): boolean {
  return useMediaQuery('(orientation: portrait)')
}

export function useIsDarkMode(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)')
}

export function useIsHighContrast(): boolean {
  return useMediaQuery('(prefers-contrast: high)')
}
