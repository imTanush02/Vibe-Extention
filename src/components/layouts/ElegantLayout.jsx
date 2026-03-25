import React from "react";
import { motion } from "framer-motion";
import Greeting from "../widgets/Greeting";
import Clock from "../widgets/Clock";
import Search from "../widgets/Search";
import Weather from "../widgets/Weather";
import ElegantTaskbar from "../taskbars/ElegantTaskbar";
import { useVibe } from "../../engine/vibeEngine";

const ElegantLayout = ({ onOpenSettings }) => {
  const { taskbar, theme } = useVibe();
  const accentColor = theme?.accent || "#ffffff";

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col h-full items-center justify-between relative z-10 font-[serif] tracking-wide"
      >
        {/* Top: Weather */}
        <div className="w-full flex justify-between items-start px-12 pt-10">
          <div className="opacity-0">Spacer</div>
          <Weather />
        </div>

        {/* Center content */}
        <div className="flex-1 flex flex-col items-center justify-center w-full mt-[-10vh]">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="mb-6 font-light"
          >
            <Clock />
          </motion.div>
          
          <div className="mb-10 opacity-90 text-lg uppercase tracking-[0.3em]" style={{ color: accentColor }}>
            <Greeting />
          </div>

          <div className="w-full max-w-xl px-4">
            <Search />
          </div>
        </div>

        {/* Taskbar */}
        {taskbar.visible && (
          <ElegantTaskbar
            links={taskbar.links}
            onOpenSettings={onOpenSettings}
            accentColor={accentColor}
          />
        )}
      </motion.div>

      {/* Elegant minimalist accents */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
        
        {/* Elegant border framing */}
        <div className="absolute inset-4 border border-white/5 rounded-3xl" />
        <div className="absolute inset-8 border border-white/2 rounded-2xl" />
      </div>
    </>
  );
};

export default ElegantLayout;
