import React from "react";
import { Settings, Globe } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";

const getFaviconUrl = (url) => {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return null;
  }
};

const ElegantTaskbar = ({ links, onOpenSettings, accentColor = "#ffffff" }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 px-6 py-2.5 backdrop-blur-2xl bg-black/30 border border-white/10 rounded-2xl"
      style={{
        boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5), inset 0 1px 0 0 rgba(255,255,255,0.1)",
      }}
    >
      <div className="flex items-center gap-2">
        {links.map((link) => {
          const favicon = getFaviconUrl(link.url);
          return (
            <motion.a
              key={link.id}
              href={link.url}
              className="relative group flex items-center justify-center p-2.5 rounded-xl transition-all duration-500 hover:bg-white/5"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {favicon ? (
                <img src={favicon} alt={link.name} className="w-5 h-5 rounded-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
              ) : (
                <Globe size={20} className="text-white/60 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
              )}
              
              {/* Tooltip */}
              <div className="absolute -top-12 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 px-3 py-1.5 rounded-md backdrop-blur-xl bg-black/60 border border-white/10 text-[9px] tracking-[0.2em] uppercase font-[serif] whitespace-nowrap text-white/90 shadow-xl pointer-events-none">
                {link.name}
              </div>
              
              {/* Underglow */}
              <div 
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
              />
            </motion.a>
          );
        })}
      </div>

      <div className="w-[1px] h-6 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-2" />

      <motion.button
        onClick={onOpenSettings}
        className="relative group p-2.5 rounded-xl transition-all duration-500 hover:bg-white/5"
        whileHover={{ scale: 1.05, rotate: 45 }}
        whileTap={{ scale: 0.95 }}
      >
        <Settings size={20} className="text-white/60 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
        <div 
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"
          style={{ backgroundColor: accentColor }}
        />
      </motion.button>
    </motion.div>
  );
};

export default ElegantTaskbar;
