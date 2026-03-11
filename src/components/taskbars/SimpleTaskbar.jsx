import React from "react";
import { Settings } from "lucide-react";
import { motion } from "framer-motion";
import { useVibe } from "../../engine/vibeEngine";

const SimpleTaskbar = ({ onOpenSettings }) => {
  const { taskbar } = useVibe();
  const links = taskbar?.links || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 bg-neutral-800/75 backdrop-blur-2xl rounded-2xl px-3 py-2 border border-white/5 font-['Inter']"
    >
      {/* Shortcut icons */}
      {links.map((link) => {
        const faviconUrl = (() => {
          try {
            const domain = new URL(link.url).hostname;
            return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
          } catch {
            return null;
          }
        })();

        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            title={link.name}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/10 transition-all duration-200 group"
          >
            {faviconUrl ? (
              <img
                src={faviconUrl}
                alt={link.name}
                className="w-5 h-5 rounded-sm group-hover:scale-110 transition-transform"
              />
            ) : (
              <span className="text-white/40 text-xs font-bold">
                {link.name.charAt(0).toUpperCase()}
              </span>
            )}
          </a>
        );
      })}

      {/* Divider */}
      {links.length > 0 && (
        <div className="w-px h-5 bg-white/10 mx-1" />
      )}

      {/* Settings */}
      <button
        onClick={onOpenSettings}
        className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/10 transition-all duration-200 group"
      >
        <Settings
          size={17}
          className="text-white/40 group-hover:text-white/70 group-hover:rotate-90 transition-all duration-300"
        />
      </button>
    </motion.div>
  );
};

export default SimpleTaskbar;
