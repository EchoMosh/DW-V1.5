/**
 * Premium glass sidebar with outer shell, inset panel, and glass morphism styling
 * Fixed width w-[300px] with scrollable middle section and pinned bottom card
 */

import { 
  Search, 
  Bell, 
  MessageCircle, 
  Rocket, 
  Presentation, 
  BarChart3, 
  Users,
  ChevronRight,
  User
} from "lucide-react"
import { motion } from "framer-motion"

const Sidebar = () => {
  const features = [
    { icon: Rocket, label: "MVP Builder", active: false },
    { icon: Presentation, label: "Pitch Creation", active: true },
    { icon: BarChart3, label: "SWOT Insights", active: false },
    { icon: Users, label: "User Personas", active: false }
  ]

  const history = [
    "Create a pitch deck for a mental...",
    "Generate 3 MVP feature sets fo...",
    "How to make a good invest strat...",
    "Help me find a startup name an...",
    "Draft a cold email to potential ba...",
    "Turn this idea into a problem/sol...",
    "What KPIs should I track for my..."
  ]

  return (
    <motion.aside 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 top-0 h-dvh w-[300px] p-2"
    >
      {/* Outer Shell */}
      <div className="h-full rounded-[28px] bg-[#0b1220] bg-gradient-to-b from-white/2 to-black/10 p-2">
        {/* Inset Glass Panel */}
        <div className="h-full rounded-[22px] bg-white/5 backdrop-blur-[12px] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] p-4 flex flex-col">
          
          {/* Brand Row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* App Tile */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-[8px] border border-white/15 shadow-[0_8px_24px_rgba(0,0,0,0.35),inset_0_0_30px_rgba(255,255,255,0.08)] flex items-center justify-center"
              >
                <div className="w-6 h-6 bg-white rounded-lg opacity-90" />
              </motion.div>
              
              {/* Wordmark */}
              <span className="font-serif text-lg text-white">Elevatr</span>
            </div>
            
            {/* Icon Buttons */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-9 w-9 rounded-full bg-white/5 border border-white/10 hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-white/20 flex items-center justify-center text-white/70 hover:text-white"
                aria-label="Search"
              >
                <Search size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-9 w-9 rounded-full bg-white/5 border border-white/10 hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-white/20 flex items-center justify-center text-white/70 hover:text-white"
                aria-label="Notifications"
              >
                <Bell size={16} />
              </motion.button>
            </div>
          </div>

          {/* New Chat CTA */}
          <motion.button
            whileHover={{ 
              scale: 1.02, 
              y: -1,
              boxShadow: "0 0 24px rgba(99,179,237,0.35)" 
            }}
            whileTap={{ scale: 0.98 }}
            className="h-11 rounded-full bg-white/10 backdrop-blur-[8px] border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_4px_16px_rgba(0,0,0,0.35)] flex items-center gap-3 px-4 mb-6 focus:outline-none focus:ring-2 focus:ring-white/25"
          >
            <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
              <MessageCircle size={12} className="text-white/90" />
            </div>
            <span className="text-white/90 font-medium">New Chat</span>
          </motion.button>

          {/* Scrollable Middle Section */}
          <div className="flex-1 overflow-y-auto scrollbar-none space-y-4">
            {/* Features Section */}
            <div>
              <h3 className="text-xs text-white/60 uppercase tracking-[0.12em] mb-2 mt-4">
                FEATURES
              </h3>
              <div className="space-y-1">
                {features.map((feature) => (
                  <motion.button
                    key={feature.label}
                    whileHover={{ 
                      scale: feature.active ? 1.01 : 1.02,
                      boxShadow: feature.active ? undefined : "0 0 12px rgba(255,255,255,0.1)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full h-12 rounded-2xl px-3 flex items-center gap-3 text-left transition-all duration-200 ${
                      feature.active 
                        ? "bg-white/8 border border-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]" 
                        : "hover:bg-white/6 hover:border hover:border-white/10"
                    }`}
                  >
                    {/* Icon Chip */}
                    <motion.div 
                      whileHover={{ scale: 1.03, opacity: 1 }}
                      className={`w-7 h-7 rounded-xl bg-white/8 border border-white/15 flex items-center justify-center ${
                        feature.active ? "shadow-[0_0_8px_rgba(255,255,255,0.15)]" : ""
                      }`}
                    >
                      <feature.icon size={14} className={feature.active ? "text-white" : "text-white/80"} />
                    </motion.div>
                    <span className={`text-[15px] leading-6 font-medium ${
                      feature.active ? "text-white" : "text-white/80"
                    }`}>
                      {feature.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* History Section */}
            <div>
              <div className="flex items-center justify-between mb-2 mt-4">
                <h3 className="text-xs text-white/60 uppercase tracking-[0.12em]">
                  HISTORY
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="text-xs text-white/60 hover:text-white/90 transition-colors flex items-center gap-1"
                >
                  See all
                  <ChevronRight size={12} />
                </motion.button>
              </div>
              <div className="space-y-2">
                {history.map((item, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.01, x: 2 }}
                    className="w-full text-left h-9 px-2 rounded-lg text-[14px] text-white/70 hover:text-white/90 hover:bg-white/5 transition-all duration-200 truncate"
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Share Card (Pinned) */}
          <div className="mt-auto pt-4">
            <div className="rounded-2xl bg-white/6 backdrop-blur-[10px] border border-white/12 shadow-[inset_0_-40px_60px_rgba(255,255,255,0.05)] p-4 space-y-4">
              {/* Avatar Cluster */}
              <div className="relative flex items-center justify-center h-16">
                {/* Central X Logo */}
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center relative z-10">
                  <div className="w-6 h-6 text-white font-bold flex items-center justify-center">
                    X
                  </div>
                </div>
                
                {/* Orbiting Avatars */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="absolute w-6 h-6 rounded-full bg-blue-500 border-2 border-white/20 flex items-center justify-center"
                  style={{ transform: 'rotate(0deg) translateX(20px) rotate(0deg)' }}
                >
                  <User size={10} className="text-white" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute w-6 h-6 rounded-full bg-green-500 border-2 border-white/20 flex items-center justify-center"
                  style={{ transform: 'rotate(120deg) translateX(20px) rotate(-120deg)' }}
                >
                  <User size={10} className="text-white" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute w-6 h-6 rounded-full bg-purple-500 border-2 border-white/20 flex items-center justify-center"
                  style={{ transform: 'rotate(240deg) translateX(20px) rotate(-240deg)' }}
                >
                  <User size={10} className="text-white" />
                </motion.div>
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ 
                  y: -1,
                  boxShadow: "0 8px 32px rgba(255,213,74,0.4)" 
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-12 rounded-full bg-gradient-to-r from-[#FFD54A] to-[#FFB300] text-[#1A1200] font-medium shadow-[0_4px_16px_rgba(255,179,0,0.25)] focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
              >
                Share result in X
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  )
}

export { Sidebar }