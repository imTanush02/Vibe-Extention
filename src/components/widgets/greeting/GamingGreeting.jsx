import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const GamingGreeting = ({ userName, setUserName, accentColor }) => {
  const [localName, setLocalName] = useState(userName || "");

  useEffect(() => {
    setLocalName(userName || "");
  }, [userName]);

  const handleSave = () => {
    const trimmedName = localName.trim();
    if (trimmedName) setUserName(trimmedName);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") e.target.blur();
  };

  return (
    <>
      <motion.span
        className="text-4xl md:text-6xl mb-4 font-['Orbitron'] font-bold tracking-[0.2em] uppercase"
        style={{
          color: "#ffffff",
          textShadow: `0 0 20px ${accentColor}, 0 0 10px white`,
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        WELCOME
      </motion.span>

      <motion.div
        className="relative w-full flex justify-center"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <input
          type="text"
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          placeholder="AGENT"
          className="bg-transparent text-center outline-none w-full cursor-text placeholder-opacity-50 transition-all duration-300 font-['Orbitron'] font-medium uppercase text-2xl md:text-3xl tracking-[0.3em]"
          style={{
            color: accentColor,
            textShadow: `0 0 10px ${accentColor}`,
          }}
          spellCheck="false"
          autoComplete="off"
          outline="none"
        />
      </motion.div>

      <motion.div
        className="flex items-center gap-4 mt-8 w-full justify-center opacity-70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 0.5 }}
      >
        <div
          className="h-px w-24 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
          style={{ "--accent": accentColor }}
        />
      </motion.div>
    </>
  );
};

export default GamingGreeting;
