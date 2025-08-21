/**
 * Left sidebar with brand, navigation, features, history and social sharing
 * Fixed width sidebar with glass morphism styling
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
import { Glass } from "@/components/ui/Glass"
import { Button } from "@/components/ui/button"
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

  const avatars = [
    { id: 1, color: "bg-blue-500" },
    { id: 2, color: "bg-green-500" },
    { id: 3, color: "bg-purple-500" }
  ]

  return (
    <motion.aside 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 top-0 h-screen w-80 bg-sidebar border-r border-sidebar-border p-4 flex flex-col gap-6 overflow-hidden"
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm opacity-90" />
          </div>
          <span className="text-lg font-semibold text-sidebar-foreground">Elevatr</span>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-fast"
          >
            <Search size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-fast"
          >
            <Bell size={16} />
          </motion.button>
        </div>
      </div>

      {/* New Chat Button */}
      <Glass variant="pill" className="p-1">
        <Button className="w-full bg-glass-highlight hover:bg-glass-highlight/80 text-sidebar-foreground border-0 rounded-full font-medium">
          <MessageCircle size={16} className="mr-2" />
          New Chat
        </Button>
      </Glass>

      {/* Features Section */}
      <div className="space-y-3">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Features
        </h3>
        <div className="space-y-1">
          {features.map((feature) => (
            <motion.button
              key={feature.label}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-fast ${
                feature.active 
                  ? "bg-sidebar-accent text-sidebar-primary-foreground shadow-soft" 
                  : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
              }`}
            >
              <feature.icon size={18} />
              <span className="text-sm font-medium">{feature.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* History Section */}
      <div className="space-y-3 flex-1 overflow-hidden">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            History
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="text-xs text-muted-foreground hover:text-sidebar-foreground transition-colors duration-fast flex items-center gap-1"
          >
            See all
            <ChevronRight size={12} />
          </motion.button>
        </div>
        <div className="space-y-2 overflow-y-auto pr-2 scrollbar-hide">
          {history.map((item, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.01, x: 2 }}
              className="w-full text-left p-2 rounded-lg text-sm text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/30 transition-all duration-fast line-clamp-1"
            >
              {item}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Share Card */}
      <Glass variant="card" className="p-4 space-y-3">
        <div className="relative flex items-center justify-center">
          {/* X Logo */}
          <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
            <div className="w-6 h-6 text-white font-bold flex items-center justify-center">
              X
            </div>
          </div>
          
          {/* Orbiting Avatars */}
          {avatars.map((avatar, index) => (
            <motion.div
              key={avatar.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`absolute w-8 h-8 rounded-full ${avatar.color} border-2 border-sidebar-background flex items-center justify-center`}
              style={{
                transform: `rotate(${index * 120}deg) translateX(24px) rotate(-${index * 120}deg)`
              }}
            >
              <User size={14} className="text-white" />
            </motion.div>
          ))}
        </div>

        <Button className="w-full bg-gradient-warning hover:opacity-90 text-black font-medium rounded-xl shadow-glow">
          Share result in X
        </Button>
      </Glass>
    </motion.aside>
  )
}

export { Sidebar }