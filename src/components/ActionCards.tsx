/**
 * 2x2 grid of action cards with 3D icons and hover animations
 * Each card represents a different business tool/feature
 */

import { ChevronRight, Calendar, Box, Trophy, BarChart, UserCheck } from "lucide-react"
import { Glass } from "@/components/ui/Glass"
import { motion } from "framer-motion"

const ActionCards = () => {
  const cards = [
    {
      date: "01/12",
      icon: Box,
      title: "Design and launch your MVP in minutes",
      description: "Build your minimum viable product",
    },
    {
      date: "02/12", 
      icon: Trophy,
      title: "Craft a winning pitch that attracts investors",
      description: "Create compelling presentations",
    },
    {
      date: "03/12",
      icon: BarChart,
      title: "Analyze your startup with a smart SWOT breakdown",
      description: "Strategic analysis and insights",
    },
    {
      date: "04/12",
      icon: UserCheck,
      title: "Define your target users with AI-generated personas",
      description: "Understand your audience better",
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      className="w-full max-w-4xl mx-auto space-y-6"
    >
      {/* Cards Grid */}
      <div className="grid grid-cols-2 gap-4">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, delay: 0.5 + index * 0.05 }}
            whileHover={{ 
              y: -8, 
              transition: { duration: 0.15 } 
            }}
          >
            <Glass variant="card" className="p-6 h-full flex flex-col justify-between group cursor-pointer">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground px-2 py-1 rounded-full bg-muted/30">
                    {card.date}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-glass-highlight hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-fast"
                  >
                    <ChevronRight size={16} />
                  </motion.button>
                </div>

                {/* 3D Icon */}
                <div className="flex justify-center">
                  <motion.div
                    whileHover={{ 
                      rotateY: 15,
                      rotateX: 15,
                      transition: { duration: 0.2 }
                    }}
                    className="w-16 h-16 rounded-2xl bg-gradient-electric flex items-center justify-center shadow-glow transform-gpu"
                    style={{
                      perspective: '1000px'
                    }}
                  >
                    <card.icon size={24} className="text-white" />
                  </motion.div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-fast">
                  {card.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {card.description}
                </p>
              </div>
            </Glass>
          </motion.div>
        ))}
      </div>

      {/* Pagination Dots */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex justify-center gap-2"
      >
        {[0, 1, 2].map((dot, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.2 }}
            className={`w-2 h-2 rounded-full transition-all duration-fast cursor-pointer ${
              index === 0 
                ? "bg-primary shadow-glow" 
                : "bg-muted hover:bg-muted-foreground"
            }`}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

export { ActionCards }