import React, { useRef, useState } from "react";
import { useVibe } from "../engine/vibeEngine";
import { Upload, X, Image } from "lucide-react";
import { wallpaperStorage } from "../engine/storage";

const WallpaperManager = () => {
  const { wallpaper, updateWallpaper, theme } = useVibe();
  const accent = theme?.accent || "#00ffff";
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const result = reader.result;
      try {
        await wallpaperStorage.save("current_wallpaper", result);
        updateWallpaper({
          type: file.type.includes("gif") ? "gif" : "image",
          url: "indexeddb_custom",
        });
        setPreview(result);
      } catch (err) {
        console.error("Failed to save to IndexedDB", err);
      }
    };
    reader.readAsDataURL(file);
  };

  const clearWallpaper = () => {
    updateWallpaper({ type: "none", url: "" });
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-3">
      <h3
        className="text-[10px] font-['Orbitron'] font-bold uppercase tracking-[0.2em] flex items-center gap-2"
        style={{ color: accent }}
      >
        <Image size={12} /> Wallpaper
      </h3>

      <input
        type="file"
        accept="image/*,.gif"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        id="wallpaper-upload"
      />

      <div className="flex gap-2">
        <label
          htmlFor="wallpaper-upload"
          className="flex items-center justify-center gap-2 px-3 py-2 cursor-pointer transition-all duration-200 text-xs flex-1 border font-['JetBrains_Mono'] tracking-wider"
          style={{
            borderColor: `${accent}30`,
            color: `${accent}CC`,
            backgroundColor: `${accent}08`,
            clipPath: "polygon(4% 0, 100% 0, 100% 75%, 96% 100%, 0 100%, 0 25%)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = accent;
            e.currentTarget.style.color = "black";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = `${accent}08`;
            e.currentTarget.style.color = `${accent}CC`;
          }}
        >
          <Upload size={14} />
          UPLOAD
        </label>

        {wallpaper.type !== "none" && (
          <button
            onClick={clearWallpaper}
            className="p-2 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors"
            style={{ clipPath: "polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)" }}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {wallpaper.type !== "none" && (
        <div
          className="text-[9px] font-['Orbitron'] tracking-[0.15em] opacity-50"
          style={{ color: accent }}
        >
          STATUS: {wallpaper.type.toUpperCase()} LOADED
        </div>
      )}

      {/* Sliders */}
      <div className="space-y-3 pt-1">
        <div>
          <div className="flex justify-between text-[10px] mb-1.5 font-['JetBrains_Mono']">
            <span className="text-white/40 tracking-wider uppercase">Blur</span>
            <span style={{ color: `${accent}80` }}>{wallpaper.settings.blur}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="20"
            value={wallpaper.settings.blur}
            onChange={(e) =>
              updateWallpaper({
                settings: {
                  ...wallpaper.settings,
                  blur: parseInt(e.target.value),
                },
              })
            }
          />
        </div>

        <div>
          <div className="flex justify-between text-[10px] mb-1.5 font-['JetBrains_Mono']">
            <span className="text-white/40 tracking-wider uppercase">Opacity</span>
            <span style={{ color: `${accent}80` }}>
              {Math.round(wallpaper.settings.opacity * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={wallpaper.settings.opacity}
            onChange={(e) =>
              updateWallpaper({
                settings: {
                  ...wallpaper.settings,
                  opacity: parseFloat(e.target.value),
                },
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default WallpaperManager;
