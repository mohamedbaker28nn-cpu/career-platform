import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  variant?: 'default' | 'link'
  className?: string
  priority?: boolean
}

const sizeClasses = {
  xs: 'w-6 h-6 sm:w-8 sm:h-8',
  sm: 'w-8 h-8 sm:w-10 sm:h-10',
  md: 'w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16',
  lg: 'w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24',
  xl: 'w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32',
  '2xl': 'w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36'
}

export function Logo({ 
  size = 'md', 
  variant = 'default', 
  className, 
  priority = false 
}: LogoProps) {
  const logoImage = (
    <div className={cn(
      "relative flex-shrink-0 rounded-lg overflow-hidden",
      "transition-all duration-200 ease-in-out",
      "hover:scale-105 active:scale-95",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-fill focus-visible:ring-offset-2",
      sizeClasses[size],
      className
    )}>
      <Image 
        src="/logo/logo_png.png" 
        alt="SkillMap Logo" 
        width={144}
        height={144}
        className="w-full h-full object-contain transition-opacity duration-200"
        priority={priority}
        quality={95}
        sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, 144px"
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0IiBoZWlnaHQ9IjE0NCIgdmlld0JveD0iMCAwIDE0NCAxNDQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNDQiIGhlaWdodD0iMTQ0IiBmaWxsPSIjZjNmNGY2Ii8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOWNhM2FmIiBmb250LXNpemU9IjE4Ij5Mb2dvPC90ZXh0Pgo8L3N2Zz4="
        onError={(e) => {
          // Fallback to SVG if PNG fails
          const img = e.target as HTMLImageElement;
          img.src = '/logo/logo.svg';
        }}
        onLoad={(e) => {
          // Fade in after loading
          const img = e.target as HTMLImageElement;
          img.style.opacity = '1';
        }}
      />
    </div>
  )

  if (variant === 'link') {
    return (
      <Link 
        href="/" 
        className="focus:outline-none focus:ring-2 focus:ring-brand-primary-fill focus:ring-offset-2 rounded-lg"
        aria-label="Go to homepage"
      >
        {logoImage}
      </Link>
    )
  }

  return logoImage
}
