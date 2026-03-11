import React from "react";
import { motion } from "framer-motion";
import Clock from "../widgets/Clock";
import Weather from "../widgets/Weather";
import Search from "../widgets/Search";
import Greeting from "../widgets/Greeting";
import SimpleTaskbar from "../taskbars/SimpleTaskbar";

const SimpleLayout = ({ onOpenSettings }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col h-full relative z-10 font-['Inter']"
      >
        {/* Top Row: Clock (left) + Weather (center-right) */}
        <div className="flex items-start justify-between px-8 pt-6">
          {/* Analog Clock */}
          <div className="flex items-center justify-center">
            <Clock />
          </div>

          {/* Weather */}
          <div className="flex items-start pt-2">
            <Weather />
          </div>
        </div>

        {/* Center: Search */}
        <div className="flex-1 flex items-center justify-center px-8">
          <Search />
        </div>

        {/* Bottom Left: Greeting */}
        <div className="absolute bottom-8 left-8">
          <Greeting />
        </div>

        {/* Settings Button */}
        <SimpleTaskbar onOpenSettings={onOpenSettings} />
      </motion.div>
    </>
  );
};

export default SimpleLayout;
