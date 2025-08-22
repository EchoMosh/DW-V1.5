/**
 * Premium glass sidebar with exact depth/glass specifications
 * Outer shell + inset panel with diagonal gradient and beveled effects
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

  const FeatureItem = ({ active, icon: Icon, label }: { active: boolean, icon: any, label: string }) => (
    <motion.div
      whileHover={{ scale: active ? 1.01 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        h-12 rounded-2xl px-3 mx-0 flex items-center gap-3 select-none cursor-pointer
        ${active
          ? "bg-white/8 border border-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,.18)]"
          : "hover:bg-white/6 border border-transparent"}
      `}
    >
      <div className={`
        h-7 w-7 rounded-xl border flex items-center justify-center
        ${active ? "bg-white/8 border-white/20 shadow-[0_0_18px_rgba(99,179,237,.25)]" : "bg-white/5 border-white/15"}
      `}>
        <Icon size={14} className={active ? "text-white" : "text-white/85"} />
      </div>
      <span className={`text-[15px] font-medium ${active ? "text-white" : "text-white/85"}`}>{label}</span>
    </motion.div>
  )

  return (
    <motion.aside 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      className="w-[300px] h-dvh p-3"
    >
      <div className="
        relative h-full rounded-[28px] 
        bg-[linear-gradient(160deg,#0b1220_0%,#0a0f1a_60%,#070c14_100%)]
        shadow-[0_30px_60px_-20px_rgba(0,0,0,.6)]
        before:absolute before:inset-0 before:rounded-[28px]
        before:pointer-events-none
        before:shadow-[inset_0_0_0_1px_rgba(255,255,255,.06),inset_0_60px_120px_-60px_rgba(99,179,237,.12)]
      ">
        <div className="
          m-2 h-[calc(100%-16px)] rounded-[22px]
          bg-white/5 backdrop-blur-[12px]
          border border-white/10
          shadow-[inset_0_1px_0_rgba(255,255,255,.18)]
          flex flex-col
        ">
          
          {/* Brand Row */}
          <header className="flex items-center justify-between px-4 pt-4 pb-3">
            <div className="flex items-center gap-3">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="
                  h-12 w-12 rounded-2xl 
                  bg-white/10 backdrop-blur-[8px] border border-white/15 
                  shadow-[0_12px_30px_rgba(0,0,0,.35),inset_0_0_24px_rgba(255,255,255,.08)]
                  flex items-center justify-center
                "
              >
                <div className="w-6 h-6 bg-white rounded-lg opacity-90" />
              </motion.div>
              <div className="font-serif text-lg text-white">Elevatr</div>
            </div>
            <div className="flex items-center gap-2">
              {['search', 'bell'].map((k) => (
                <motion.button 
                  key={k}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    h-9 w-9 rounded-full 
                    bg-white/5 border border-white/10 
                    hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-white/20
                    flex items-center justify-center text-white/70 hover:text-white
                  "
                  aria-label={k}
                >
                  {k === 'search' ? <Search size={16} /> : <Bell size={16} />}
                </motion.button>
              ))}
            </div>
          </header>

          {/* New Chat CTA */}
          <motion.button 
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 0 28px rgba(99,179,237,.35)"
            }}
            whileTap={{ scale: 0.98 }}
            className="
              mx-4 mb-2 h-11 w-auto rounded-full 
              bg-white/12 backdrop-blur-[8px]
              border border-white/15
              shadow-[inset_0_1px_0_rgba(255,255,255,.28),0_8px_24px_rgba(0,0,0,.35)]
              text-[15px] font-medium text-white/90
              flex items-center gap-3 pl-4 pr-5
              focus:outline-none focus:ring-2 focus:ring-white/25
            "
          >
            <span className="h-7 w-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <MessageCircle size={12} />
            </span>
            New Chat
          </motion.button>

          {/* Scrollable Middle */}
          <div className="px-4 flex-1 overflow-y-auto scrollbar-none">
            <p className="mt-3 mb-2 text-xs uppercase tracking-[.12em] text-white/60">Features</p>
            
            {/* Features List */}
            <div className="space-y-1">
              {features.map((feature) => (
                <FeatureItem 
                  key={feature.label}
                  active={feature.active}
                  icon={feature.icon}
                  label={feature.label}
                />
              ))}
            </div>

            <p className="mt-5 mb-2 text-xs uppercase tracking-[.12em] text-white/60 flex items-center justify-between">
              <span>History</span>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                className="text-white/60 text-xs inline-flex items-center gap-1 hover:text-white/80 cursor-pointer"
              >
                See all <ChevronRight size={12} />
              </motion.a>
            </p>
            
            {/* History Rows */}
            <ul className="space-y-1.5">
              {history.map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ scale: 1.01, x: 2 }}
                  className="h-9 flex items-center text-[14.5px] leading-6 text-white/70 hover:text-white/90 truncate cursor-pointer hover:bg-white/5 rounded-lg px-2"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Pinned Bottom X Card */}
          <footer className="mt-auto p-4">
            <div className="
              rounded-2xl p-4
              bg-white/6 backdrop-blur-[10px] border border-white/12
              shadow-[inset_0_-50px_80px_rgba(255,255,255,.06)]
            ">
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
                  boxShadow: "0 14px 32px rgba(255,179,0,.35)" 
                }}
                whileTap={{ scale: 0.98 }}
                className="
                  mt-3 h-12 w-full rounded-full 
                  bg-gradient-to-br from-[#FFD54A] to-[#FFB300]
                  text-[#1A1200] font-medium
                  shadow-[0_10px_25px_rgba(255,179,0,.25)]
                  focus:outline-none focus:ring-2 focus:ring-yellow-400/50
                "
              >
                Share result in X
              </motion.button>
            </div>
          </footer>
        </div>
      </div>
    </motion.aside>
  )
}

export { Sidebar }