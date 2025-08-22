/**
 * Main launchpad page with premium dark glassmorphism design
 * Features sidebar navigation, hero section, search bar, and action cards
 */

import { Sidebar } from "@/components/Sidebar"
import { TopNav } from "@/components/TopNav"
import { Hero } from "@/components/Hero"
import { SuggestionBar } from "@/components/SuggestionBar"
import { ActionCards } from "@/components/ActionCards"

const Launchpad = () => {
  return (
    <div className="h-dvh bg-gradient-radial bg-noise relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-noise opacity-50 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      
      {/* Layout */}
      <Sidebar />
      <TopNav />
      
      {/* Main Content */}
      <main className="pl-[300px] pt-16 h-dvh overflow-y-auto">
        <div className="p-8 flex flex-col items-center justify-center min-h-full space-y-12">
          <Hero />
          <SuggestionBar />
          <ActionCards />
        </div>
      </main>
    </div>
  )
}

export default Launchpad