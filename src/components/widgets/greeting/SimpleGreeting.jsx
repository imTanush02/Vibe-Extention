import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SimpleGreeting = ({ userName, setUserName }) => {
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

  const dayName = time.toLocaleDateString([], { weekday: "short" });
  const monthDay = time.toLocaleDateString([], { month: "short", day: "numeric" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col items-start font-['Inter']"
    >
      {/* Name pill */}
      <div className="bg-neutral-800/80 backdrop-blur-xl rounded-full px-4 py-1.5 mb-1">
        <input
          type="text"
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
          placeholder="Your Name"
          className="bg-transparent text-white/90 text-sm font-medium outline-none w-28 placeholder-white/30"
          spellCheck="false"
        />
      </div>

      {/* Date */}
      <span className="text-white/40 text-xs font-medium tracking-wide ml-2">
        {dayName}, {monthDay}
      </span>
    </motion.div>
  );
};

export default SimpleGreeting;
