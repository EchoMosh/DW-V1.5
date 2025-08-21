/**
 * Top navigation bar with links and user profile
 * Shows launchpad, venture desk, help links and user avatar with PRO badge
 */

import { Settings, User } from "lucide-react"
import { Glass } from "@/components/ui/Glass"
import { motion } from "framer-motion"

const TopNav = () => {
  const navItems = [
    { label: "Launchpad", href: "#", active: true },
    { label: "VentureDesk", href: "#" },
    { label: "Help & Support", href: "#" }
  ]

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 right-0 left-80 z-50 h-16 flex items-center justify-end px-6 gap-6 border-b border-glass-border bg-background/80 backdrop-blur-glass"
    >
      {/* Navigation Links */}
      <nav className="flex items-center gap-1">
        {navItems.map((item) => (
          <motion.a
            key={item.label}
            href={item.href}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-fast ${
              item.active 
                ? "text-foreground bg-glass-highlight" 
                : "text-muted-foreground hover:text-foreground hover:bg-glass-highlight/50"
            }`}
          >
            {item.label}
          </motion.a>
        ))}
      </nav>

      {/* Settings Icon */}
      <motion.button
        whileHover={{ scale: 1.05, rotate: 90 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-glass-highlight/50 transition-all duration-fast"
      >
        <Settings size={18} />
      </motion.button>

      {/* User Avatar with PRO Badge */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="relative"
      >
        <Glass variant="pill" className="p-1 pr-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-electric flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-gradient-warning text-black">
            PRO
          </span>
        </Glass>
      </motion.div>
    </motion.header>
  )
}

export { TopNav }