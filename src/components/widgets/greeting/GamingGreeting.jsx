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
      

      <div
        className="relative w-full flex flex-col items-center -top-10 "
      >
        <h1
        className="text-4xl md:text-5xl text-center font-['Orbitron'] font-bold tracking-[0.2em] uppercase"
        style={{
          color: "#f7f5f5ff",
          textShadow: `0 0 50px ${accentColor}, 0 0 50px white`,
        }}

      >
        WELCOME
      </h1>
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
            textShadow: `0 0 50px ${accentColor}`,
          }}
          spellCheck="false"
          autoComplete="off"
          outline="none"
        />
      </div>

      <motion.div
        className="flex items-center gap-1  w-full justify-center opacity-70"
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
