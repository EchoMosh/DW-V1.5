/**
 * Search/ask input bar with status indicators and voice input
 * Features glass morphism styling and interactive animations
 */

import { Send } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { User } from "@supabase/supabase-js"

interface SuggestionBarProps {
  placeholder?: string
  user?: User | null
  onSearch?: (query: string, user: User | null) => void
  onSearchStateChange?: (isActive: boolean) => void
  isCompact?: boolean
}

const SuggestionBar = ({ 
  placeholder = "Ask Anything...", 
  user, 
  onSearch, 
  onSearchStateChange,
  isCompact = false
}: SuggestionBarProps) => {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim() || isLoading) return

    setIsLoading(true)
    try {
      if (onSearch) {
        await onSearch(query.trim(), user)
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsLoading(false)
      setQuery("") // Clear the input after submission
      // Keep search state active after submission - don't reset to false
      // onSearchStateChange?.(false) - REMOVED
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    const isActive = isFocused || value.length > 0
    onSearchStateChange?.(isActive)
  }

  const handleFocus = () => {
    setIsFocused(true)
    onSearchStateChange?.(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
    const isActive = query.length > 0
    onSearchStateChange?.(isActive)
  }

  const handleButtonClick = () => {
    if (query.trim() && !isLoading) {
      handleSubmit({ preventDefault: () => {} } as React.FormEvent)
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: isCompact ? 350 : 0,
        scale: isCompact ? 1.15 : 1,
      }}
      transition={{ 
        duration: 0.6, 
        ease: [0.4, 0.0, 0.2, 1], // Material Design standard easing for super smooth animation
        delay: 0
      }}
      className="w-full max-w-2xl mx-auto"
      style={{
        willChange: 'transform, opacity',
      }}
    >
      <form onSubmit={handleSubmit}>
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
              value={query}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={isLoading}
              className="w-full bg-transparent text-white/90 placeholder:text-white/70 text-sm focus:outline-none py-2 disabled:opacity-50 transition-all duration-300"
            />
          </div>

          {/* Send Button */}
          <motion.button
            type="button"
            onClick={handleButtonClick}
            whileHover={{ scale: isLoading ? 1 : 1.1 }}
            whileTap={{ scale: isLoading ? 1 : 0.9 }}
            disabled={isLoading || !query.trim()}
            className="p-2 rounded-full bg-white/15 hover:bg-white/25 text-white/80 hover:text-white transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} className={isLoading ? "animate-pulse" : ""} />
          </motion.button>
        </div>
      </form>
    </motion.div>
  )
}

export { SuggestionBar }
