import React, { useState, useEffect } from "react";
import { storage } from "../../engine/storage";
import { Copy, Trash2, Check, StickyNote } from "lucide-react";

const NotesWidget = () => {
  const [note, setNote] = useState(() => storage.get("widget_notes", ""));
  const [lastEdited, setLastEdited] = useState(() =>
    storage.get("widget_notes_time", "Just now"),
  );
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      storage.set("widget_notes", note);
      const timeString = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setLastEdited(timeString);
      storage.set("widget_notes_time", timeString);
    }, 500);
    return () => clearTimeout(handler);
  }, [note]);

  const handleCopy = () => {
    navigator.clipboard.writeText(note);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    if (window.confirm("Clear note?")) setNote("");
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h4
          style={{ color: "var(--vibe-accent)" }}
          className="font-bold text-sm uppercase tracking-wider flex items-center gap-2"
        >
          <StickyNote size={14} /> Notes
        </h4>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleCopy}
            className="p-1 rounded hover:bg-white/10 text-white/50 hover:text-white transition-colors"
          >
            {copied ? (
              <Check size={12} className="text-green-400" />
            ) : (
              <Copy size={12} />
            )}
          </button>
          <button
            onClick={handleClear}
            className="p-1 rounded hover:bg-red-500/10 text-white/50 hover:text-red-400 transition-colors"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      {/* Text Area */}
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Type something..."
        className="w-full flex-1 bg-transparent resize-none focus:outline-none text-sm leading-relaxed text-white/90 placeholder-white/20 custom-scrollbar selection:bg-[var(--vibe-accent)] selection:text-black"
        style={{ caretColor: "var(--vibe-accent)" }}
        spellCheck={false}
      />

      {/* Footer */}
      <div className="pt-2 border-t border-white/5 mt-1 flex justify-between items-center">
        <span className="text-[10px] text-white/30 font-mono">
          {note.length} chars
        </span>
        <span className="text-[10px] text-white/30 italic">
          Saved {lastEdited}
        </span>
      </div>
    </div>
  );
};

export default NotesWidget;
