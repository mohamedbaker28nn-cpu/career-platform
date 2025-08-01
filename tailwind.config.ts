import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Enhanced breakpoints for better mobile responsiveness
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        // Touch-friendly breakpoints
        'touch': { 'raw': '(hover: none) and (pointer: coarse)' },
        'no-touch': { 'raw': '(hover: hover) and (pointer: fine)' },
        // Height-based breakpoints for better mobile UX
        'short': { 'raw': '(max-height: 700px)' },
        'tall': { 'raw': '(min-height: 800px)' },
      },
      
      // Improved font families with better fallbacks
      fontFamily: {
        modern: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        display: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },

      // Enhanced color system
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Enhanced brand colors
        brand: {
          primary: {
            fill: "#A063D4",
            stroke: "#732AC1",
            light: "#B584E0",
            dark: "#5A249A",
          },
          gradient: {
            start: "#A063D4",
            end: "#E76A3B",
          },
          gray: {
            50: "#f9fafb",
            100: "#f3f4f6",
            200: "#e5e7eb",
            300: "#d1d5db",
            400: "#9ca3af",
            500: "#6b7280",
            600: "#4b5563",
            700: "#374151",
            800: "#1f2937",
            900: "#111827",
            950: "#030712",
          },
        },
        neutral: {
          white: "#FFFFFF",
          black: "#000000",
        },
      },

      // Enhanced spacing scale for mobile
      spacing: {
        '0.5': '0.125rem',
        '1.5': '0.375rem',
        '2.5': '0.625rem',
        '3.5': '0.875rem',
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '6.5': '1.625rem',
        '7.5': '1.875rem',
        '8.5': '2.125rem',
        '9.5': '2.375rem',
        '11': '2.75rem',
        '13': '3.25rem',
        '15': '3.75rem',
        '17': '4.25rem',
        '18': '4.5rem',
        '19': '4.75rem',
        '21': '5.25rem',
        '22': '5.5rem',
        '23': '5.75rem',
        '25': '6.25rem',
        '26': '6.5rem',
        '27': '6.75rem',
        '28': '7rem',
        '29': '7.25rem',
        '30': '7.5rem',
        '31': '7.75rem',
        '33': '8.25rem',
        '35': '8.75rem',
        '37': '9.25rem',
        '39': '9.75rem',
        '41': '10.25rem',
        '43': '10.75rem',
        '45': '11.25rem',
        '47': '11.75rem',
        '49': '12.25rem',
        '51': '12.75rem',
        '53': '13.25rem',
        '55': '13.75rem',
        '57': '14.25rem',
        '59': '14.75rem',
        '61': '15.25rem',
        '63': '15.75rem',
        '65': '16.25rem',
        '67': '16.75rem',
        '69': '17.25rem',
        '71': '17.75rem',
        '73': '18.25rem',
        '75': '18.75rem',
        '77': '19.25rem',
        '79': '19.75rem',
        '81': '20.25rem',
        '83': '20.75rem',
        '85': '21.25rem',
        '87': '21.75rem',
        '89': '22.25rem',
        '91': '22.75rem',
        '93': '23.25rem',
        '95': '23.75rem',
        '97': '24.25rem',
        '99': '24.75rem',
        '101': '25.25rem',
        '103': '25.75rem',
        '105': '26.25rem',
      },

      // Enhanced border radius system
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        '2xs': "calc(var(--radius) - 8px)",
      },

      // Enhanced border width system
      borderWidth: {
        '3': '3px',
        '5': '5px',
        '6': '6px',
      },

      // Enhanced keyframe animations
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // Mobile-optimized animations
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-left": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-right": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "scale-out": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.9)", opacity: "0" },
        },
        // Existing enhanced animations
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(180deg)" },
        },
        "float-delayed": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-30px) rotate(-180deg)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "parallax-float": {
          "0%, 100%": {
            transform: "translateY(0px) translateX(0px) rotate(0deg) scale(1)",
            opacity: "0.1",
          },
          "25%": {
            transform: "translateY(-15px) translateX(8px) rotate(3deg) scale(1.05)",
            opacity: "0.15",
          },
          "50%": {
            transform: "translateY(-25px) translateX(-5px) rotate(-2deg) scale(0.95)",
            opacity: "0.12",
          },
          "75%": {
            transform: "translateY(-10px) translateX(12px) rotate(5deg) scale(1.02)",
            opacity: "0.13",
          },
        },
        "parallax-drift": {
          "0%, 100%": {
            transform: "translateY(0px) translateX(0px) rotate(0deg)",
            opacity: "0.12",
          },
          "33%": {
            transform: "translateY(-20px) translateX(15px) rotate(8deg)",
            opacity: "0.15",
          },
          "66%": {
            transform: "translateY(-35px) translateX(-10px) rotate(-5deg)",
            opacity: "0.10",
          },
        },
        // Pulse animation
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(160, 99, 212, 0.4)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(160, 99, 212, 0.6), 0 0 60px rgba(160, 99, 212, 0.2)",
          },
        },
      },

      // Enhanced animation utilities
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // Mobile-friendly animations with reduced motion support
        "slide-up": "slide-up 0.3s ease-out",
        "slide-down": "slide-down 0.3s ease-out",
        "slide-left": "slide-left 0.3s ease-out",
        "slide-right": "slide-right 0.3s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "fade-out": "fade-out 0.2s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "scale-out": "scale-out 0.2s ease-out",
        // Existing animations
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float-delayed 8s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "parallax-float": "parallax-float 12s ease-in-out infinite",
        "parallax-drift": "parallax-drift 15s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },

      // Enhanced background gradients
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #A063D4 0%, #E76A3B 100%)",
        "brand-gradient-soft": "linear-gradient(135deg, #A063D4 0%, #B584E0 100%)",
        "hero-gradient": "linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%)",
        "dark-gradient": "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
        "glass-gradient": "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
      },

      // Enhanced box shadows
      boxShadow: {
        "3xl": "0 35px 60px -12px rgba(0, 0, 0, 0.25)",
        "4xl": "0 45px 80px -20px rgba(0, 0, 0, 0.3)",
        "brand": "0 10px 40px -10px rgba(160, 99, 212, 0.3)",
        "brand-lg": "0 20px 60px -15px rgba(160, 99, 212, 0.4)",
        "inner-brand": "inset 0 2px 8px rgba(160, 99, 212, 0.1)",
        "glow": "0 0 20px rgba(160, 99, 212, 0.3)",
        "glow-lg": "0 0 40px rgba(160, 99, 212, 0.4)",
      },

      // Enhanced typography
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },

      // Container max widths
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        '10xl': '104rem',
      },

      // Z-index scale
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },

      // Transition timing functions
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
