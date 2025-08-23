/**
 * Top navigation bar with links and user profile
 * Shows launchpad, venture desk, help links and user avatar with PRO badge
 */

import { Settings, User, LogOut } from "lucide-react"
import { Glass } from "@/components/ui/Glass"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/AuthContext"
import { motion } from "framer-motion"

const TopNav = () => {
  const { user, signOut } = useAuth()
  
  const navItems = [
    { label: "Launchpad", href: "#", active: true },
    { label: "VentureDesk", href: "#" },
    { label: "Help & Support", href: "#" }
  ]

  const handleSignOut = async () => {
    await signOut()
  }

  // Get user initials for avatar fallback
  const getUserInitials = (email: string) => {
    return email.split('@')[0].slice(0, 2).toUpperCase()
  }

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 right-0 left-[300px] z-50 h-16 flex items-center justify-end px-6 gap-6 border-b border-glass-border bg-background/80 backdrop-blur-glass"
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

      {/* User Avatar with Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative cursor-pointer"
          >
            <Glass variant="pill" className="p-1 pr-3 flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.email}`} />
                <AvatarFallback className="bg-gradient-electric text-white text-xs">
                  {user?.email ? getUserInitials(user.email) : 'U'}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-gradient-warning text-black">
                PRO
              </span>
            </Glass>
          </motion.div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">My Account</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.header>
  )
}

export { TopNav }
