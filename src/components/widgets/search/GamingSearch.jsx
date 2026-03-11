import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import google from "../../../assets/search/google.svg";
import duck from "../../../assets/search/duck.svg";
import brave from "../../../assets/search/brave.svg";
import bing from "../../../assets/search/bing.svg";

const ENGINES = {
  google: {
    name: "Google",
    url: "https://www.google.com/search?q=",
    icon: google,
  },
  bing: { name: "Bing", url: "https://www.bing.com/search?q=", icon: bing },
  duckduckgo: {
    name: "DuckDuckGo",
    url: "https://duckduckgo.com/?q=",
    icon: duck,
  },
  brave: {
    name: "Brave",
    url: "https://search.brave.com/search?q=",
    icon: brave,
  },
};

const GamingSearch = ({ accentColor }) => {
  const [query, setQuery] = useState("");
  const [engineKey, setEngineKey] = useState("google");
  const [isOpen, setIsOpen] = useState(false);

  // Active engine ko derived value ki tarah use karo
  const activeEngine = ENGINES[engineKey];

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `${activeEngine.url}${encodeURIComponent(query)}`;
    }
  };

  // Engine change handler
  const handleEngineChange = (key) => {
    setEngineKey(key);
    setIsOpen(false);
  };

  return (
    <motion.div
      className="w-full relative z-40"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ "--accent": accentColor }}
    >
      <div className="flex items-center gap-2">
        {/* Engine Selector Button */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="h-12 w-12 flex items-center justify-center bg-black/60 border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black transition-colors"
            style={{
              clipPath:
                "polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)",
            }}
          >
            <img
              key={engineKey} // Key add karo force re-render ke liye
              src={activeEngine.icon}
              alt={activeEngine.name}
              className="w-6 h-6 invert dark:invert-0"
              style={{
                filter: "brightness(100) drop-shadow(0 0 2px var(--accent))",
              }}
            />
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-full left-0 mb-2 w-48 bg-black/90 border border-[var(--accent)] p-2 backdrop-blur-xl z-50"
              >
                {Object.entries(ENGINES).map(([key, data]) => (
                  <button
                    key={key}
                    onClick={() => handleEngineChange(key)}
                    className={`flex pointer-events-auto items-center gap-3 w-full p-2 hover:bg-[var(--accent)] hover:text-black font-mono text-sm transition-colors ${
                      engineKey === key
                        ? "text-[var(--accent)] bg-[var(--accent)]/20"
                        : "text-[var(--accent)]"
                    }`}
                  >
                    <img
                      src={data.icon}
                      alt={data.name}
                      className="w-4 h-4 invert"
                    />
                    {data.name}
                    {engineKey === key && (
                      <span className="ml-auto text-xs">✓</span>
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <div className="relative flex-1 group">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="INITIATE SEARCH PROTOCOL..."
              className="w-full h-12 bg-black/40 border-b-[1px] border-t-[1px] border-[var(--accent)] px-4 font-['Orbitron'] text-[var(--accent)] placeholder-[var(--accent)]/50  outline-none  uppercase tracking-wider"
              style={{
                textShadow: "0 0 5px var(--accent)",
              }}
            />
          </div>

          <button
            type="submit"
            className="h-12 px-6 bg-[var(--accent)]/10 border border-[var(--accent)] text-[var(--accent)] font-['Orbitron'] uppercase tracking-widest hover:bg-[var(--accent)] hover:text-black transition-all hover:shadow-[0_0_20px_var(--accent)] active:scale-95"
            style={{
              clipPath:
                "polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)",
            }}
          >
            Execute
          </button>
        </form>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
      )}
    </motion.div>
  );
};

export default GamingSearch;
