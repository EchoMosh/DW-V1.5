/**
 * Premium glass sidebar with exact depth/glass specifications
 * Outer shell + inset panel with diagonal gradient and beveled effects
 */

import { Rocket, Presentation, BarChart3, Users, ChevronRight, BotIcon, LayoutDashboard, UserSearchIcon, Columns3 } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { NotificationList } from "@/components/animate-ui/ui-elements/notification-list";
import dreamwellFullLogo from "../../dreamwell-fullwidth-logo.png";
const Sidebar = () => {
  const location = useLocation();
  const features = [{
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/launchpad"
  }, {
    icon: BotIcon,
    label: "Draper Ai",
    href: "/draper-ai"
  }, {
    icon: BarChart3,
    label: "Approvals",
    href: "/approvals"
  }, {
    icon: UserSearchIcon,
    label: "Influencer Lookup",
    href: "/influencer-lookup"
  },
  {
    icon: Columns3,
    label: "Pipeline",
    href: "/pipeline"
  }
];
  const history = ["Create a pitch deck for a mental...", "Generate 3 MVP feature sets fo...", "How to make a good invest strat...", "Help me find a startup name an...", "Draft a cold email to potential ba...", "Turn this idea into a problem/sol...", "What KPIs should I track for my..."];
  const FeatureItem = ({
    active,
    icon: Icon,
    label,
    href
  }: {
    active: boolean;
    icon: any;
    label: string;
    href: string;
  }) => <Link to={href} className="block">
    <motion.div whileHover={{
      scale: active ? 1.01 : 1.02
    }} whileTap={{
      scale: 0.98
    }} className={`
          h-12 rounded-2xl px-3 mx-0 flex items-center gap-3 select-none cursor-pointer
          ${active ? "bg-white/8 border border-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,.18)]" : "hover:bg-white/6 border border-transparent"}
        `}>
        <div className={`
          h-7 w-7 rounded-xl border flex items-center justify-center
          ${active ? "bg-white/8 border-white/20 shadow-[0_0_18px_rgba(99,179,237,.25)]" : "bg-white/5 border-white/15"}
        `}>
          <Icon size={14} className={active ? "text-white" : "text-white/85"} />
        </div>
        <span className={`text-[15px] font-medium ${active ? "text-white" : "text-white/85"}`}>{label}</span>
      </motion.div>
    </Link>;
  return <motion.aside initial={{
    opacity: 0,
    x: -20
  }} animate={{
    opacity: 1,
    x: 0
  }} transition={{
    duration: 0.24,
    ease: [0.16, 1, 0.3, 1]
  }} className="w-[300px] h-dvh p-3">
      <div className="
        h-full rounded-2xl
        bg-[rgba(0,0,0,0.16)] backdrop-blur-[5.5px]
        border border-[rgba(0,0,0,0.07)]
        shadow-[0_4px_30px_rgba(0,0,0,0.1)]
        flex flex-col
      ">
          
          {/* Brand Row */}
          <header className="flex items-center justify-center px-2 pt-4 pb-5">
            <img src={dreamwellFullLogo} alt="Dreamwell full logo" className="w-[170px] h-auto" />
          </header>


          {/* Scrollable Middle */}
          <div className="px-4 flex-1 overflow-y-auto scrollbar-none">
            <p className="mt-3 mb-2 text-xs uppercase tracking-[.12em] text-white/60">Features</p>
            
            {/* Features List */}
            <div className="space-y-1">
              {features.map(feature => {
                const isActive = location.pathname === feature.href || (feature.href !== "/" && location.pathname.startsWith(feature.href));
                return <FeatureItem key={feature.label} active={isActive} icon={feature.icon} label={feature.label} href={feature.href} />;
              })}
            </div>

            <p className="mt-5 mb-2 text-xs uppercase tracking-[.12em] text-white/60 flex items-center justify-between">
              <span>History</span>
              <motion.a whileHover={{
            scale: 1.05
          }} className="text-white/60 text-xs inline-flex items-center gap-1 hover:text-white/80 cursor-pointer">
                See all <ChevronRight size={12} />
              </motion.a>
            </p>
            
            {/* History Rows */}
            <ul className="space-y-1.5">
              {history.map((item, index) => <motion.li key={index} whileHover={{
            scale: 1.01,
            x: 2
          }} className="h-9 flex items-center text-[14.5px] leading-6 text-white/70 hover:text-white/90 truncate cursor-pointer hover:bg-white/5 rounded-lg px-2">
                  {item}
                </motion.li>)}
            </ul>
          </div>

          {/* Notifications in Sidebar */}
          <footer className="mt-auto p-4">
            <NotificationList
              className="w-full"
              notifications={[
                { id: 1, title: 'Approve Influencers', subtitle: '1,227 packages added!', time: 'just now', count: 2 },
                { id: 2, title: 'Increase Budget', subtitle: 'Build finished in 12.34s', time: '1m 11s' },
                { id: 3, title: 'Lint Passed', subtitle: 'No problems found', time: '5m' }
              ]}
            />
          </footer>
        </div>
    </motion.aside>;
};
export { Sidebar };
