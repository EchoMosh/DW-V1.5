/**
 * Search/ask input bar with status indicators and voice input
 * Features glass morphism styling and interactive animations
 */

import { Lock, Mic, Zap } from "lucide-react"
import { Glass } from "@/components/ui/Glass"
import { motion } from "framer-motion"

const SuggestionBar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Glass variant="pill" className="p-2 flex items-center gap-3 bg-white/20">
        {/* Status Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20">
          <Lock size={12} className="text-white/80" />
          <span className="text-xs font-medium text-white/80">
            Full potential unlocked
          </span>
        </div>

        {/* Input Area */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Ask Anything..."
            className="w-full bg-transparent text-white placeholder:text-white/60 text-sm focus:outline-none py-2"
          />
        </div>

        {/* Subscription Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-medium text-green-400">
            Subscription Active
          </span>
          <div className="w-16 h-1.5 rounded-full bg-green-500/30 overflow-hidden">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "85%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-green-400 rounded-full"
            />
          </div>
        </div>

        {/* Voice Input */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-fast"
        >
          <Mic size={16} />
        </motion.button>
      </Glass>
    </motion.div>
  )
}

export { SuggestionBar }