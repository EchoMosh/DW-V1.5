/**
 * Central hero section with main heading and app branding
 * Features elegant typography and smooth animations
 */

import { motion } from "framer-motion"

const Hero = ({
  title = "Draper Ai",
  subtitle = "Real-time campaign intelligence at your fingertips.",
  showIcon = true,
  isHidden = false,
}: {
  title?: string
  subtitle?: string
  showIcon?: boolean
  isHidden?: boolean
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: isHidden ? -250 : 0,
        scale: isHidden ? 0.5 : 1,
      }}
      transition={{ 
        duration: 0.6, 
        ease: [0.4, 0.0, 0.2, 1], // Cubic bezier for super smooth animation
        delay: 0
      }}
      className="text-center"
      style={{
        transformOrigin: 'center bottom',
      }}
    >
      {/* Kicker Text */}

      {/* App Icon */}
      {showIcon && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.3 }}
          className="flex justify-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-glow">
            <div className="w-8 h-8 bg-white rounded-lg opacity-90" />
          </div>
        </motion.div>
      )}

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: 1, 
          y: 0 
        }}
        transition={{ 
          delay: isHidden ? 0 : 0.25, 
          duration: 0.3
        }}
        className="text-6xl font-serif font-normal text-white tracking-[-0.02em] leading-tight"
        style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1
          }}
          transition={{ 
            delay: isHidden ? 0 : 0.2,
            duration: 0.3
          }}
          className="text-xs font-medium text-white uppercase tracking-[0.2em]"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}

export { Hero }
