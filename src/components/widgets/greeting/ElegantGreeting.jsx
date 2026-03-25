import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ElegantGreeting = ({ userName, setUserName, accentColor }) => {
  const [localName, setLocalName] = useState(userName || "");
  const [time, setTime] = useState(new Date());

  useEffect(() => setLocalName(userName || ""), [userName]);
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const handleSave = () => {
    const trimmed = localName.trim();
    if (trimmed) setUserName(trimmed);
  };

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = time.toLocaleDateString(undefined, dateOptions);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 1 }}
      className="flex flex-col items-center font-[serif]"
    >
      <div className="text-white/50 text-sm tracking-[0.2em] uppercase mb-4 font-light">
        {formattedDate}
      </div>
      
      <div className="flex items-center justify-center gap-3 text-2xl tracking-[0.1em] font-light text-white/80">
        <span>{getGreeting()},</span>
        <input
          type="text"
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
          placeholder="Sir"
          className="bg-transparent text-white/90 outline-none w-32 placeholder-white/20 italic text-center transition-colors"
          style={{ caretColor: accentColor }}
          spellCheck="false"
        />
      </div>
    </motion.div>
  );
};

export default ElegantGreeting;
