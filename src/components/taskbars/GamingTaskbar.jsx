import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ShortcutItem from "../widgets/Shortcuts";
import { Settings, Hexagon, ChevronLeft, ChevronRight } from "lucide-react";

const GamingTaskbar = ({ links, onOpenSettings, accentColor }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotationState, setRotationState] = useState(0);

  const radius = 100;
  const totalItems = links.length;

  const rotateLeft = (e) => {
    e.stopPropagation();
    setRotationState((prev) => prev + 45);
  };

  const rotateRight = (e) => {
    e.stopPropagation();
    setRotationState((prev) => prev - 45);
  };

  // Helper function to convert hex to rgb (Moved locally)
  function hexToRgb(hex) {
    if (!hex) return "0, 255, 255";
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  }

  // Dynamic color style object
  const accentStyle = {
    "--gaming-accent": accentColor,
    "--gaming-accent-rgb": hexToRgb(accentColor),
  };

  return (
    <div
      className="fixed bottom-5 left-1/2  -translate-x-1/2 z-50 flex items-center justify-center font-['Orbitron']"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={accentStyle}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute flex items-center bg-[${accentColor}] backdrop-blur-xl justify-center rounded-full"
            style={{ width: radius * 3, height: radius * 3 }}
            initial={{ scale: 0, opacity: 0, rotate: -90 }}
            animate={{ scale: 1, opacity: 1, rotate: rotationState }}
            exit={{ scale: 0, opacity: 0, rotate: 90 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Background Rings - Dynamic Color */}
            <div
              className="absolute inset-0 rounded-full border border-dashed "
              style={{ borderColor: `${accentColor}30` }}
            />
            <div
              className="absolute inset-0 rounded-full border-2"
              style={{ borderColor: `${accentColor}1A` }}
            />
            <div
              className="absolute inset-[-20px] rounded-full bg-gradient-to-r from-transparent via-transparent to-transparent "
              style={{
                background: `radial-gradient(circle at center, ${accentColor}10 0%, transparent 70%)`,
              }}
            />

            {/* Items */}
            {links.map((link, index) => {
              const angle = (360 / totalItems) * index - 90;
              const angleRad = (angle * Math.PI) / 180;
              const x = radius * Math.cos(angleRad);
              const y = radius * Math.sin(angleRad);

              return (
                <motion.div
                  key={link.id}
                  className="absolute"
                  style={{ x, y }}
                  animate={{ rotate: -rotationState }}
                  transition={{ type: "spring", stiffness: 120 }}
                >
                  {/* WRAPPER BUBBLE - Dynamic Color */}
                  <div
                    className="bg-black rounded-full border-2   cursor-pointer flex items-center justify-center backdrop-blur-xl"
                    style={{
                      borderColor: accentColor,
                      boxShadow: `0 0 20px ${accentColor}80`,
                      ":hover": {
                        boxShadow: `0 0 30px ${accentColor}CC`,
                      },
                    }}
                  >
                    <ShortcutItem link={link} index={index} />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTROLS CLUSTER - Dynamic Color */}
      <div className="relative z-50 flex items-center gap-3">
        <AnimatePresence>
          {isHovered && (
            <motion.button
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 5 }}
              onClick={rotateRight}
              className="p-1 rounded-full bg-black backdrop-blur-xl border-2 hover:bg-opacity-100  "
              style={{
                borderColor: accentColor,
                color: accentColor,
                boxShadow: `0 0 15px ${accentColor}40`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = accentColor;
                e.currentTarget.style.color = "black";
                e.currentTarget.style.boxShadow = `0 0 20px ${accentColor}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "";
                e.currentTarget.style.color = accentColor;
                e.currentTarget.style.boxShadow = `0 0 15px ${accentColor}40`;
              }}
            >
              <ChevronLeft size={20} />
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          onClick={onOpenSettings}
          className="p-2 rounded-full bg-black border-2 backdrop-blur-xl group relative overflow-hidden"
          style={{
            borderColor: accentColor,
            boxShadow: `0 0 30px ${accentColor}40`,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div
            className="absolute inset-0 rounded-full "
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${accentColor}33 50%, transparent 100%)`,
            }}
          />
          <div className="relative z-10 group-hover:rotate-180 transition-transform ease-out">
            <Hexagon
              size={32}
              className="fill-current/20"
              strokeWidth={1}
              style={{ color: accentColor }}
            />
            <Settings
              size={16}
              className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
            />
          </div>
        </motion.button>

        <AnimatePresence>
          {isHovered && (
            <motion.button
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -5 }}
              onClick={rotateLeft}
              className="p-1 rounded-full bg-black border-2  "
              style={{
                borderColor: accentColor,
                color: accentColor,
                boxShadow: `0 0 15px ${accentColor}30`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = accentColor;
                e.currentTarget.style.color = "black";
                e.currentTarget.style.boxShadow = `0 0 20px ${accentColor}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "";
                e.currentTarget.style.color = accentColor;
                e.currentTarget.style.boxShadow = `0 0 15px ${accentColor}40`;
              }}
            >
              <ChevronRight size={20} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GamingTaskbar;
