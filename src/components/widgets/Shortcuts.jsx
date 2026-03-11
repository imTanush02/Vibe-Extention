import React, { useState } from "react";
import { ExternalLink, Globe } from "lucide-react";
import { motion } from "framer-motion";

// Fallback icon map for links without a valid URL
export const iconMap = { Globe, ExternalLink };

/**
 * Get favicon URL for any website using Google's favicon service.
 * Returns a high-quality 64px icon for any domain.
 */
const getFaviconUrl = (url) => {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return null;
  }
};

const ShortcutItem = ({ link, index }) => {
  const [imgError, setImgError] = useState(false);
  const faviconUrl = getFaviconUrl(link.url);

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex flex-col items-center justify-center p-3 hover:bg-white/10 rounded-xl transition-colors duration-200 group relative"
      title={link.name}
    >
      <div className="p-2 bg-white/10 rounded-full mb-1 backdrop-blur-sm border border-white/10">
        {faviconUrl && !imgError ? (
          <img
            src={faviconUrl}
            alt={link.name}
            className="w-5 h-5 rounded-sm"
            onError={() => setImgError(true)}
          />
        ) : (
          <Globe size={20} className="text-white" />
        )}
      </div>
    </motion.a>
  );
};

export default ShortcutItem;
