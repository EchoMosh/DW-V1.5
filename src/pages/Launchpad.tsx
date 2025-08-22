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
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(217, 91%, 85%, .35) 0, hsla(217, 91%, 59%, .15) 50%, hsla(217, 91%, 45%, .05) 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(217, 91%, 85%, .30) 0, hsla(217, 91%, 55%, .12) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(217, 91%, 85%, .25) 0, hsla(217, 91%, 45%, .08) 80%, transparent 100%)"
        translateY={-250}
        width={1000}
        height={1800}
        smallWidth={500}
        duration={4}
        xOffset={200}
      />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-noise opacity-50 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/8 rounded-full blur-3xl" />
      
      {/* Layout */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="pl-[300px] h-dvh overflow-y-auto relative z-10">
        <div className="p-8 flex flex-col items-center justify-center min-h-full space-y-12 bg-red-500/10 border-4 border-red-500">
          <div className="text-white text-2xl">DEBUG: Main Content Container</div>
          <Hero />
          <SuggestionBar />
          <ActionCards />
        </div>
      </main>
    </div>
  )
}

export default Launchpad