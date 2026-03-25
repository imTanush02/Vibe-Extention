import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ElegantClock = ({ accentColor }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return { hours, minutes, ampm };
  };

  const { hours, minutes, ampm } = formatTime(time);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="flex flex-col items-center justify-center font-[serif]"
    >
      <div className="flex items-baseline gap-2">
        <span className="text-[7rem] leading-none tracking-tight font-light text-white/90" style={{ textShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
          {hours}:{minutes}
        </span>
        <span className="text-2xl font-normal tracking-widest text-white/60 mb-6">
          {ampm}
        </span>
      </div>
      <div 
        className="h-px w-24 mt-4 opacity-50"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor || '#ffffff'}, transparent)` }}
      />
    </motion.div>
  );
};

export default ElegantClock;
