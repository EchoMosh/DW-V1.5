'use client';

import * as React from 'react';
import { RotateCcw, ArrowUpRight } from 'lucide-react';
import { motion, type Transition } from 'motion/react';
import { cn } from "@/lib/utils";


const transition: Transition = {
  duration: 0.05,
  ease: [0, 0, 1, 1],
};

const getCardVariants = (i: number) => ({
  collapsed: {
    marginTop: i === 0 ? 0 : -44,
    scaleX: 1 - i * 0.05,
    backgroundColor: i === 0 ? 'rgba(40, 44, 52, 0.95)' : 'rgba(255, 255, 255, 0.055)',
  },
  expanded: {
    marginTop: i === 0 ? 0 : 4,
    scaleX: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.055)',
  },
});

const textSwitchTransition: Transition = {
  duration: 0.03,
  ease: [0, 0, 1, 1],
};

const notificationTextVariants = {
  collapsed: { opacity: 1, y: 0, pointerEvents: 'auto' },
  expanded: { opacity: 0, y: -16, pointerEvents: 'none' },
};

const viewAllTextVariants = {
  collapsed: { opacity: 0, y: 16, pointerEvents: 'none' },
  expanded: { opacity: 1, y: 0, pointerEvents: 'auto' },
};

type Notification = {
  id: number;
  title: string;
  subtitle: string;
  time: string;
  count?: number;
};

interface NotificationListProps {
  notifications: Notification[];
  className?: string;
}

function NotificationList({ notifications = [], className }: NotificationListProps) {
  return (
    <motion.div
      className={cn("relative w-full isolation-auto rounded-3xl", className)}
      initial="collapsed"
      whileHover="expanded"
    >
      {/* Single backdrop blur container */}
      <div className="absolute inset-0 -z-10 rounded-3xl bg-white/8 ring-1 ring-white/15 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,.18),0_8px_24px_rgba(0,0,0,.35)]" />
      
      <div className="relative p-3 space-y-3">
        <div>
          {notifications.map((notification, i) => (
            <motion.div
              key={notification.id}
              className="relative overflow-hidden rounded-xl ring-1 ring-white/20 [transform:translateZ(0)] transition-all duration-200"
              variants={getCardVariants(i)}
              transition={transition}
              style={{
                zIndex: notifications.length - i,
              }}
            >
              <div className="px-4 py-2">
                <div className="flex justify-between items-center">
                  <h1 className="text-sm font-medium text-white drop-shadow-sm">{notification.title}</h1>
                  {notification.count && (
                    <div className="flex items-center text-xs gap-0.5 font-medium text-white/80 drop-shadow-sm">
                      <RotateCcw className="size-3" />
                      <span>{notification.count}</span>
                    </div>
                  )}
                </div>
                <div className="text-xs text-white/75 font-medium drop-shadow-sm">
                  <span>{notification.time}</span>
                  &nbsp;•&nbsp;
                  <span>{notification.subtitle}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="size-5 rounded-full bg-white/15 ring-1 ring-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,.18)] text-white text-xs flex items-center justify-center font-medium drop-shadow-sm">
            {notifications.length}
          </div>
        <span className="grid">
          <motion.span
            className="text-sm font-medium text-white/90 drop-shadow-sm row-start-1 col-start-1"
            variants={notificationTextVariants}
            transition={textSwitchTransition}
          >
            Action Hierarchy 
          </motion.span>
          <motion.span
            className="text-sm font-medium text-white/90 drop-shadow-sm flex items-center gap-1 cursor-pointer select-none row-start-1 col-start-1 hover:text-white transition-colors"
            variants={viewAllTextVariants}
            transition={textSwitchTransition}
          >
            View all <ArrowUpRight className="size-4" />
          </motion.span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export { NotificationList };
