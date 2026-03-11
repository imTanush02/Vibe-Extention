import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const GamingClock = ({ accentColor }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (date) => {
    return date
      .toLocaleDateString([], {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
      .toUpperCase();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center relative"
      style={{ "--accent": accentColor }}
    >
      {/* Time Display */}
      <motion.h1
        className="font-['Orbitron'] font-bold tracking-widest select-none leading-none mb-2"
        style={{
          color: "#ffffff",
          textShadow: `0 0 20px ${accentColor}80`,
          fontSize: "6rem",
        }}
      >
        {formatTime(time)}
      </motion.h1>

      <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-50 mb-4" />

      {/* Date Display */}
      <motion.p
        className="font-['Orbitron'] tracking-[0.2em] uppercase text-sm md:text-base font-bold"
        style={{
          color: accentColor,
          textShadow: `0 0 10px ${accentColor}`,
        }}
      >
        {formatDate(time)}
      </motion.p>
    </motion.div>
  );
};

export default GamingClock;
