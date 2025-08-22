/**
 * Main launchpad page with premium dark glassmorphism design
 * Features sidebar navigation, hero section, search bar, and action cards
 */

import { Sidebar } from "@/components/Sidebar"
import { Hero } from "@/components/Hero"
import { SuggestionBar } from "@/components/SuggestionBar"
import { ActionCards } from "@/components/ActionCards"
import { Spotlight } from "@/components/ui/spotlight-new"

const Launchpad = () => {
  return (
    <div className="h-dvh bg-gradient-radial bg-noise relative overflow-hidden">
      {/* Intense Spotlight Effects */}
      <Spotlight 
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(217, 91%, 85%, .12) 0, hsla(217, 91%, 59%, .04) 50%, hsla(217, 91%, 45%, .01) 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(217, 91%, 85%, .08) 0, hsla(217, 91%, 55%, .03) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(217, 91%, 85%, .06) 0, hsla(217, 91%, 45%, .02) 80%, transparent 100%)"
        translateY={-200}
        width={1200}
        height={2000}
        smallWidth={600}
        duration={6}
        xOffset={150}
      />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-noise opacity-50 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/8 rounded-full blur-3xl" />
      
      {/* Layout */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="pl-[300px] h-dvh overflow-y-auto relative z-10 flex">
        <div className="p-8 flex flex-col items-center justify-center min-h-full space-y-12 w-full">
          <Hero />
          <SuggestionBar />
          <ActionCards />
        </div>
      </main>
    </div>
  )
}

export default Launchpad