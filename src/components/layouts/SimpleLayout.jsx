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
          <div className="flex  gap-10 w-full  h-[40vh] items-center justify-center">
            <Clock />
             <Greeting />
              <Weather />
          </div>

        
        </div>

        {/* Center: Search */}
        <div className="flex-1 flex items-start justify-center px-8">
          <Search />
        </div>



        {/* Settings Button */}
        <SimpleTaskbar onOpenSettings={onOpenSettings} />
      </motion.div>
    </>
  );
};

export default SimpleLayout;
