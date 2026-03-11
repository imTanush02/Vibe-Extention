import React, { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { motion } from "framer-motion";

const SEARCH_TARGETS = [
  { key: "google", name: "Google", url: "https://www.google.com/search?q=" },
  { key: "youtube", name: "YouTube", url: "https://www.youtube.com/results?search_query=", favicon: "https://www.google.com/s2/favicons?domain=youtube.com&sz=32" },
  { key: "images", name: "Images", url: "https://www.google.com/search?tbm=isch&q=", favicon: "https://www.google.com/s2/favicons?domain=images.google.com&sz=32" },
  { key: "reddit", name: "Reddit", url: "https://www.reddit.com/search/?q=", favicon: "https://www.google.com/s2/favicons?domain=reddit.com&sz=32" },
  { key: "wiki", name: "Wikipedia", url: "https://en.wikipedia.org/w/index.php?search=", favicon: "https://www.google.com/s2/favicons?domain=wikipedia.org&sz=32" },
  { key: "quora", name: "Quora", url: "https://www.quora.com/search?q=", favicon: "https://www.google.com/s2/favicons?domain=quora.com&sz=32" },
];

const SimpleSearch = () => {
  const [query, setQuery] = useState("");
  const [activeTarget, setActiveTarget] = useState("google");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const target = SEARCH_TARGETS.find((t) => t.key === activeTarget) || SEARCH_TARGETS[0];
    window.location.href = `${target.url}${encodeURIComponent(query)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl font-['Inter']"
    >
      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex items-center gap-2 mb-3">
        <div className="flex-1 flex items-center bg-neutral-800/80 backdrop-blur-xl rounded-full px-4 py-2.5 gap-3">
          <SearchIcon size={18} className="text-white/30 shrink-0" />
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
          className="bg-neutral-800/80 backdrop-blur-xl text-white/80 text-sm font-medium px-5 py-2.5 rounded-full hover:bg-neutral-700/80 transition-colors"
        >
          Search
        </button>
      </form>

      {/* Search On row */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="bg-neutral-800/80 backdrop-blur-xl rounded-full px-3 py-1.5 text-xs text-white/40 font-medium">
          Search On
        </span>

        {SEARCH_TARGETS.filter((t) => t.key !== "google").map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTarget(t.key)}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-all text-xs font-medium"
            style={{
              backgroundColor: activeTarget === t.key ? "rgba(255,255,255,0.15)" : "rgba(60,60,60,0.7)",
              color: activeTarget === t.key ? "white" : "rgba(255,255,255,0.55)",
            }}
          >
            {t.favicon && (
              <img src={t.favicon} alt="" className="w-3.5 h-3.5 rounded-sm" />
            )}
            {t.name}
            <div
              className="w-2.5 h-2.5 rounded-full border ml-0.5 transition-colors"
              style={{
                borderColor: activeTarget === t.key ? "white" : "rgba(255,255,255,0.2)",
                backgroundColor: activeTarget === t.key ? "white" : "transparent",
              }}
            />
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default SimpleSearch;
