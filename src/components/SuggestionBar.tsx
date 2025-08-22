/**
 * Search/ask input bar with status indicators and voice input
 * Features glass morphism styling and interactive animations
 */

import { Send } from "lucide-react"
import { motion } from "framer-motion"

const SuggestionBar = ({ placeholder = "Ask Anything..." }: { placeholder?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div
        className="
          p-2 flex items-center gap-3
          rounded-2xl
          bg-[rgba(0,0,0,0.19)]
          border border-[rgba(0,0,0,0.08)]
          shadow-[0_4px_30px_rgba(0,0,0,0.1)]
          backdrop-blur-[5.5px]
        "
      >
        {/* Input Area */}
        <div className="flex-1 relative px-3">
          <input
            type="text"
            placeholder={placeholder}
            className="w-full bg-transparent text-white/90 placeholder:text-white/70 text-sm focus:outline-none py-2"
          />
        </div>

        {/* Send Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full bg-white/15 hover:bg-white/25 text-white/80 hover:text-white transition-all duration-150"
        >
          <Send size={16} />
        </motion.button>
      </div>
    </motion.div>
  )
}

export { SuggestionBar }
