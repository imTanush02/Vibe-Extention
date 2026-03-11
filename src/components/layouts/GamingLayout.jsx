import React from "react";
import { motion } from "framer-motion";
import Greeting from "../widgets/Greeting";
import Clock from "../widgets/Clock";
import Search from "../widgets/Search";
import Weather from "../widgets/Weather";
import GamingTaskbar from "../taskbars/GamingTaskbar";
import { useVibe } from "../../engine/vibeEngine";

const GamingLayout = ({ onOpenSettings }) => {
  const { taskbar, theme } = useVibe();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col h-full items-center justify-center relative z-10"
      >
        {/* Top Right Weather */}
        <div className="absolute top-8 right-8">
          <Weather />
        </div>

        {/* Gaming Layout: Centered Stack -> Welcome (Greeting) -> Clock -> Search */}

        {/* Top: Welcome Message */}
        <div className="w-full flex justify-center">
          <Greeting />
        </div>

        {/* Middle: Clock */}
        <div className="w-full flex justify-center py-4">
          <Clock />
        </div>

        {/* Bottom: Search Bar */}
        <div className="w-full max-w-2xl px-8 mt-8">
          <Search />
        </div>

        {/* Taskbar */}
        {taskbar.visible && (
          <GamingTaskbar
            links={taskbar.links}
            onOpenSettings={onOpenSettings}
            accentColor={theme?.accent || "#00ffff"}
          />
        )}
      </motion.div>

      {/* Gaming UI Accents */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Top Left Corner */}
        <div
          className="absolute top-8 left-8 w-64 h-64 border-t-2 border-l-2 opacity-80"
          style={{ borderColor: "var(--vibe-accent)" }}
        >
          <div className="absolute top-0 right-0 w-32 h-1 bg-[var(--vibe-accent)]" />
          <div className="absolute bottom-0 left-0 w-1 h-32 bg-[var(--vibe-accent)]" />
          <p className="absolute top-4 left-4 font-['Orbitron'] text-[var(--vibe-accent)] text-sm tracking-widest opacity-80">
            INITIALIZED
          </p>
        </div>

        {/* Bottom Right Corner */}
        <div
          className="absolute bottom-8 right-8 w-64 h-64 border-b-2 border-r-2 opacity-80"
          style={{ borderColor: "var(--vibe-accent)" }}
        >
          <div className="absolute bottom-0 left-0 w-32 h-1 bg-[var(--vibe-accent)]" />
          <div className="absolute top-0 right-0 w-1 h-32 bg-[var(--vibe-accent)]" />
        </div>

        {/* Middle Side Accents */}
        <div className="absolute top-1/2 left-0 w-2 h-24 bg-[var(--vibe-accent)] transform -translate-y-1/2 opacity-50" />
        <div className="absolute top-1/2 right-0 w-2 h-24 bg-[var(--vibe-accent)] transform -translate-y-1/2 opacity-50" />
      </div>
    </>
  );
};

export default GamingLayout;
