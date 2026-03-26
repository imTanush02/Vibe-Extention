import React, { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import SearchPivot, { getSearchUrl } from "./SearchPivot";

const ElegantSearch = ({ accentColor = "#ffffff" }) => {
  const [query, setQuery] = useState("");
  const [activeTarget, setActiveTarget] = useState("default");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      const url = getSearchUrl(activeTarget);
      window.open(`${url}${encodeURIComponent(query)}`, "_blank");
      setQuery("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex flex-col items-center"
    >
      <form
        onSubmit={handleSearch}
        className="relative w-full flex items-center group max-w-2xl"
      >
        <div 
          className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-700"
          style={{ backgroundColor: accentColor }}
        />
        <div
          className="relative w-full flex items-center backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-full px-6 py-3 transition-all duration-500 hover:bg-white/[0.06] hover:border-white/20"
          style={{
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Search size={18} className="text-white/40 group-focus-within:text-white/80 transition-colors duration-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full bg-transparent border-none outline-none text-white/90 placeholder-white/30 px-4 font-[serif] tracking-[0.1em] text-lg"
            style={{ caretColor: accentColor }}
          />
          <div 
            className="w-1.5 h-1.5 rounded-full transition-all duration-500 scale-0 group-focus-within:scale-100"
            style={{ backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}` }}
          />
        </div>
      </form>

      {/* Target Selector */}
      <div className="mt-2 w-full max-w-2xl flex justify-center">
        <SearchPivot activeId={activeTarget} onChange={setActiveTarget} vibe="elegant" />
      </div>
    </motion.div>
  );
};

export default ElegantSearch;
