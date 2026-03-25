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

const ElegantTaskbar = ({ links, onOpenSettings, accentColor }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 backdrop-blur-2xl bg-black/20 border border-white/10 rounded-3xl"
      style={{
        boxShadow: "0 10px 40px -10px rgba(0,0,0,0.5)",
      }}
    >
      <div className="flex items-center gap-3">
        {links.map((link) => {
          const favicon = getFaviconUrl(link.url);
          return (
            <motion.a
              key={link.id}
              href={link.url}
              className="relative group flex items-center justify-center p-2 rounded-2xl transition-all duration-300 hover:bg-white/10"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              {favicon ? (
                <img src={favicon} alt={link.name} className="w-6 h-6 rounded-md opacity-80 group-hover:opacity-100 transition-opacity" />
              ) : (
                <Globe size={24} className="text-white/60 group-hover:text-white transition-colors" />
              )}
              
              {/* Tooltip */}
              <div className="absolute -top-10 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 px-3 py-1 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 text-[10px] tracking-widest uppercase font-[serif] whitespace-nowrap text-white/90">
                {link.name}
              </div>
              
              {/* Underglow */}
              <div 
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
              />
            </motion.a>
          );
        })}
      </div>

      <div className="w-px h-6 bg-white/10 mx-2" />

      <motion.button
        onClick={onOpenSettings}
        className="relative group p-2 rounded-2xl transition-all duration-300 hover:bg-white/10"
        whileHover={{ scale: 1.1, y: -5, rotate: 45 }}
        whileTap={{ scale: 0.95 }}
      >
        <Settings size={22} className="text-white/60 group-hover:text-white transition-colors" />
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity"
          style={{ backgroundColor: accentColor }}
        />
      </motion.button>
    </motion.div>
  );
};

export default ElegantTaskbar;
