import React, { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { motion } from "framer-motion";
import SearchPivot, { getSearchUrl } from "./SearchPivot";

const SimpleSearch = () => {
  const [query, setQuery] = useState("");
  const [activeTarget, setActiveTarget] = useState("default");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const url = getSearchUrl(activeTarget);
    window.location.href = `${url}${encodeURIComponent(query)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl font-['Inter']"
    >
      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex items-center gap-2 mb-3">
        <div className="flex-1 flex items-center bg-black/40 backdrop-blur-md rounded-full px-4 py-2.5 gap-3 border border-white/10 shadow-sm">
          <SearchIcon size={18} className="text-white/40 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type here..."
            className="flex-1 bg-transparent text-white/90 text-sm outline-none placeholder-white/30"
          />
        </div>
        <button
          type="submit"
          className="bg-black/10 backdrop-blur-md border border-white/10 text-white/80 text-sm font-medium px-5 py-2.5 rounded-full hover:bg-black/20 transition-colors shadow-sm"
        >
          Search
        </button>
      </form>

      {/* Target Selector */}
      <div className="flex justify-center mt-2">
        <SearchPivot activeId={activeTarget} onChange={setActiveTarget} vibe="simple" />
      </div>
    </motion.div>
  );
};

export default SimpleSearch;
