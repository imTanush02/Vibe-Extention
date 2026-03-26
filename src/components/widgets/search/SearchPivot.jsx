import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ENGINES = [
  { id: "default", name: "Default", url: "https://www.google.com/search?q=", icon: "https://www.google.com/s2/favicons?domain=google.com&sz=32" },
  { id: "google", name: "Google", url: "https://www.google.com/search?q=", icon: "https://www.google.com/s2/favicons?domain=google.com&sz=32" },
  { id: "duck", name: "Duck", url: "https://duckduckgo.com/?q=", icon: "https://www.google.com/s2/favicons?domain=duckduckgo.com&sz=32" },
  { id: "bing", name: "Bing", url: "https://www.bing.com/search?q=", icon: "https://www.google.com/s2/favicons?domain=bing.com&sz=32" },
  { id: "brave", name: "Brave", url: "https://search.brave.com/search?q=", icon: "https://www.google.com/s2/favicons?domain=brave.com&sz=32" }
];

const PLATFORMS = [
  { id: "youtube", name: "YouTube", url: "https://www.youtube.com/results?search_query=", icon: "https://www.google.com/s2/favicons?domain=youtube.com&sz=32" },
  { id: "images", name: "Images", url: "https://www.google.com/search?tbm=isch&q=", icon: "https://www.google.com/s2/favicons?domain=images.google.com&sz=32" },
  { id: "reddit", name: "Reddit", url: "https://www.reddit.com/search/?q=", icon: "https://www.google.com/s2/favicons?domain=reddit.com&sz=32" },
  { id: "wikipedia", name: "Wikipedia", url: "https://en.wikipedia.org/w/index.php?search=", icon: "https://www.google.com/s2/favicons?domain=wikipedia.org&sz=32" },
  { id: "quora", name: "Quora", url: "https://www.quora.com/search?q=", icon: "https://www.google.com/s2/favicons?domain=quora.com&sz=32" }
];

export const getSearchUrl = (id) => {
  const all = [...ENGINES, ...PLATFORMS];
  const target = all.find(t => t.id === id);
  return target ? target.url : ENGINES[0].url;
};

const SearchPivot = ({ activeId, onChange, vibe = "simple" }) => {
  const [mode, setMode] = useState("with"); // 'with' or 'on'

  const toggleMode = () => setMode(p => (p === "with" ? "on" : "with"));

  const currentList = mode === "with" ? ENGINES : PLATFORMS;

  const isElegant = vibe === "elegant";
  
  const mainFont = isElegant ? "font-[serif] tracking-[0.05em]" : "font-sans";
  const pillFont = isElegant ? "font-[serif] tracking-wider uppercase text-[12px]" : "font-sans text-[14px]";

  return (
    <div className="flex items-center gap-3 mt-6 mb-2">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMode}
        className={`flex items-center justify-center bg-black/60 backdrop-blur-xl border border-white/5 text-white/90 text-[15px] font-medium rounded-3xl shadow-xl hover:bg-black/70 transition-all ${mainFont}`}
        style={{ width: "120px", height: "85px" }}
      >
        {mode === "with" ? "Search With" : "Search On"}
      </motion.button>

      <div className="flex-1 relative h-[85px]">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: 20, filter: "blur(4px)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-wrap gap-2.5 h-full content-between max-w-[400px]"
          >
            {currentList.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onChange(item.id)}
                  className={`flex items-center gap-2.5 backdrop-blur-md border text-white/80 rounded-full pl-3 pr-4 py-2 transition-all shadow-md active:scale-95 ${
                    isElegant 
                      ? "bg-black/30 hover:bg-black/50 border-white/10" 
                      : "bg-black/40 hover:bg-black/60 border-white/5"
                  }`}
                >
                  <img 
                    src={item.icon} 
                    alt="" 
                    className="w-4 h-4 rounded-full opacity-80" 
                    style={{ filter: "grayscale(100%) brightness(1.5)" }} 
                  />
                  <span className={`font-medium ${pillFont}`}>{item.name}</span>
                  <div 
                    className={`ml-1 w-3 h-3 rounded-full border transition-all duration-300 ${
                      isActive 
                        ? (isElegant ? "border-white/70 bg-white/70 shadow-[0_0_12px_rgba(255,255,255,0.6)]" : "border-white/50 bg-white/50 shadow-[0_0_10px_rgba(255,255,255,0.5)]")
                        : (isElegant ? "border-white/30 bg-transparent" : "border-white/20 bg-transparent")
                    }`}
                  />
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchPivot;
