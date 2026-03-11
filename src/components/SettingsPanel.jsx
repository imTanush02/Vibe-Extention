import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Trash2, Link as LinkIcon, Globe, Gamepad2, Layers } from "lucide-react";
import { useVibe, VIBES } from "../engine/vibeEngine";
import WallpaperManager from "./WallpaperManager";
import clsx from "clsx";

const getFaviconUrl = (url) => {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return null;
  }
};

const SettingsPanel = ({ isOpen, onClose }) => {
  const { updateTheme, theme, widgets, toggleWidget, taskbar, updateTaskbar, currentVibe, setVibe } =
    useVibe();
  const [newLink, setNewLink] = useState({ name: "", url: "" });
  const accent = theme?.accent || "#00ffff";
  const isSimple = currentVibe === VIBES.SIMPLE;

  const handleDeleteLink = (id) => {
    updateTaskbar({ links: taskbar.links.filter((link) => link.id !== id) });
  };

  const handleAddLink = () => {
    if (!newLink.name || !newLink.url) return;
    updateTaskbar({
      links: [
        ...taskbar.links,
        { id: Date.now().toString(), ...newLink },
      ],
    });
    setNewLink({ name: "", url: "" });
  };

  // Vibe-specific style tokens
  const s = isSimple
    ? {
        font: "Inter",
        headerFont: "Inter",
        panelBg: "rgba(28,28,30,0.95)",
        sectionBg: "rgba(255,255,255,0.03)",
        sectionBorder: "rgba(255,255,255,0.06)",
        borderRadius: "16px",
        sectionRadius: "14px",
        inputRadius: "10px",
        itemRadius: "12px",
        btnRadius: "10px",
        clipPath: "none",
      }
    : {
        font: "JetBrains Mono",
        headerFont: "Orbitron",
        panelBg: "rgba(10,10,18,0.95)",
        sectionBg: `${accent}05`,
        sectionBorder: `${accent}15`,
        borderRadius: "0",
        sectionRadius: "0",
        inputRadius: "0",
        itemRadius: "0",
        btnRadius: "0",
        clipPath: "polygon(3% 0, 100% 0, 100% 92%, 97% 100%, 0 100%, 0 8%)",
      };

  const SectionHeader = ({ children }) => (
    <h3
      className="text-[10px] font-bold uppercase tracking-[0.15em] mb-3 flex items-center gap-2"
      style={{ color: accent, fontFamily: s.headerFont }}
    >
      <div
        className="h-3"
        style={{
          backgroundColor: accent,
          width: isSimple ? 3 : 4,
          borderRadius: isSimple ? 2 : 0,
        }}
      />
      {children}
    </h3>
  );

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 backdrop-blur-sm"
            style={{ backgroundColor: isSimple ? "rgba(0,0,0,0.3)" : `${accent}08` }}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="fixed right-0 top-0 h-full w-80 z-50 overflow-y-auto backdrop-blur-2xl border-l"
            style={{
              fontFamily: s.font,
              backgroundColor: s.panelBg,
              borderColor: isSimple ? "rgba(255,255,255,0.06)" : `${accent}15`,
              boxShadow: isSimple ? "0 0 60px rgba(0,0,0,0.5)" : `0 0 40px ${accent}15`,
              borderTopLeftRadius: isSimple ? 20 : 0,
              borderBottomLeftRadius: isSimple ? 20 : 0,
            }}
          >
            {/* Top accent line */}
            {!isSimple && (
              <div
                className="absolute top-0 left-0 w-full h-px"
                style={{
                  background: `linear-gradient(to right, transparent, ${accent}, transparent)`,
                }}
              />
            )}

            {/* Ambient glow */}
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 pointer-events-none"
              style={{ backgroundColor: accent }}
            />

            <div className="relative p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <motion.h2
                  className="text-lg tracking-wide font-bold"
                  style={{ color: isSimple ? "rgba(255,255,255,0.85)" : accent, fontFamily: s.headerFont }}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {isSimple ? "Settings" : "SETTINGS"}
                </motion.h2>
                <motion.button
                  onClick={onClose}
                  className="p-2 transition-all duration-200"
                  style={{
                    color: isSimple ? "rgba(255,255,255,0.4)" : `${accent}80`,
                    borderRadius: isSimple ? 10 : 0,
                  }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: isSimple ? "rgba(255,255,255,0.1)" : `${accent}15`,
                    color: isSimple ? "white" : accent,
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>
              </div>

              <div className="space-y-6">
                {/* ── Vibe Switcher ── */}
                <section>
                  <SectionHeader>Vibe</SectionHeader>
                  <div className="flex gap-2">
                    {[
                      { key: VIBES.GAMING, label: "Gaming", icon: Gamepad2 },
                      { key: VIBES.SIMPLE, label: "Simple", icon: Layers },
                    ].map((v) => {
                      const active = currentVibe === v.key;
                      const Icon = v.icon;
                      return (
                        <button
                          key={v.key}
                          onClick={() => setVibe(v.key)}
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 text-[11px] font-semibold tracking-wide transition-all duration-200 border"
                          style={{
                            fontFamily: s.headerFont,
                            borderRadius: s.btnRadius,
                            borderColor: active
                              ? (isSimple ? "rgba(255,255,255,0.2)" : accent)
                              : (isSimple ? "rgba(255,255,255,0.06)" : `${accent}15`),
                            backgroundColor: active
                              ? (isSimple ? "rgba(255,255,255,0.1)" : `${accent}15`)
                              : (isSimple ? "rgba(255,255,255,0.03)" : `${accent}05`),
                            color: active
                              ? (isSimple ? "white" : accent)
                              : "rgba(255,255,255,0.35)",
                            boxShadow: active && !isSimple ? `0 0 15px ${accent}20` : "none",
                          }}
                        >
                          <Icon size={14} />
                          {isSimple ? v.label : v.label.toUpperCase()}
                        </button>
                      );
                    })}
                  </div>
                </section>

                {/* ── Wallpaper ── */}
                <section
                  className="p-4 border"
                  style={{
                    borderColor: s.sectionBorder,
                    backgroundColor: s.sectionBg,
                    borderRadius: s.sectionRadius,
                    clipPath: isSimple ? "none" : s.clipPath,
                  }}
                >
                  <WallpaperManager />
                </section>

                {/* ── Widgets ── */}
                <section>
                  <SectionHeader>Active Widgets</SectionHeader>
                  <div className="space-y-1.5">
                    {Object.entries(widgets).map(([id, active]) => (
                      <div
                        key={id}
                        className="flex items-center justify-between py-2.5 px-3 transition-all border"
                        style={{
                          backgroundColor: s.sectionBg,
                          borderColor: s.sectionBorder,
                          borderRadius: s.itemRadius,
                        }}
                      >
                        <span
                          className="capitalize text-xs tracking-wider"
                          style={{
                            fontFamily: isSimple ? "Inter" : "Orbitron",
                            color: active ? (isSimple ? "rgba(255,255,255,0.85)" : accent) : "rgba(255,255,255,0.4)",
                            fontWeight: isSimple ? 500 : 700,
                          }}
                        >
                          {id}
                        </span>
                        <button
                          onClick={() => toggleWidget(id)}
                          className="w-9 h-[18px] rounded-full transition-all duration-300 relative"
                          style={{
                            backgroundColor: active
                              ? accent
                              : "rgba(255,255,255,0.08)",
                            boxShadow: active
                              ? `0 0 10px ${accent}60`
                              : "none",
                          }}
                        >
                          <div
                            className={clsx(
                              "w-3.5 h-3.5 bg-white rounded-full transition-all duration-300 absolute top-[1px]",
                              active ? "left-[18px]" : "left-[2px]",
                            )}
                            style={{
                              boxShadow: active
                                ? `0 0 4px ${accent}`
                                : "none",
                            }}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>

                {/* ── Theme ── */}
                <section>
                  <SectionHeader>Accent Color</SectionHeader>
                  <div
                    className="p-4 border space-y-4"
                    style={{
                      borderColor: s.sectionBorder,
                      backgroundColor: s.sectionBg,
                      borderRadius: s.sectionRadius,
                    }}
                  >
                    {/* Color Picker */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-white/40 tracking-wider uppercase">
                        Custom
                      </span>
                      <input
                        type="color"
                        value={accent}
                        onChange={(e) => updateTheme({ accent: e.target.value })}
                        className="w-8 h-8 cursor-pointer bg-transparent border-none"
                        style={{
                          boxShadow: `0 0 0 1px ${accent}40`,
                          borderRadius: isSimple ? 8 : 0,
                        }}
                      />
                    </div>

                    {/* Presets */}
                    <div className="flex gap-2 flex-wrap">
                      {[
                        { name: "Cyan", color: "#00ffff" },
                        { name: "Gold", color: "#d4af37" },
                        { name: "Magenta", color: "#ff00ff" },
                        { name: "Lime", color: "#39ff14" },
                        { name: "Red", color: "#ff3333" },
                        { name: "Blue", color: "#4466ff" },
                        { name: "Orange", color: "#ff6600" },
                        { name: "White", color: "#ffffff" },
                      ].map((p) => (
                        <button
                          key={p.name}
                          onClick={() => updateTheme({ accent: p.color })}
                          className="w-6 h-6 rounded-full transition-all duration-200 hover:scale-125 border"
                          style={{
                            backgroundColor: p.color,
                            borderColor:
                              accent === p.color ? "white" : "transparent",
                            boxShadow:
                              accent === p.color
                                ? `0 0 10px ${p.color}80`
                                : "none",
                          }}
                          title={p.name}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => updateTheme({ accent: "#00ffff" })}
                      className="text-[9px] tracking-wider opacity-40 hover:opacity-70 transition-opacity"
                      style={{ color: accent }}
                    >
                      {isSimple ? "Reset to default" : "RESET TO DEFAULT"}
                    </button>
                  </div>
                </section>

                {/* ── Taskbar Shortcuts ── */}
                <section>
                  <div className="flex justify-between items-end mb-3">
                    <SectionHeader>Shortcuts</SectionHeader>
                    <span
                      className="text-[10px] tabular-nums"
                      style={{
                        fontFamily: isSimple ? "Inter" : "Orbitron",
                        color:
                          taskbar.links.length >= 7
                            ? "#f87171"
                            : `${accent}60`,
                      }}
                    >
                      {taskbar.links.length}/7
                    </span>
                  </div>

                  {/* Existing Shortcuts */}
                  <div className="space-y-1.5 mb-4">
                    {taskbar.links.map((link) => {
                      const favicon = getFaviconUrl(link.url);
                      return (
                        <div
                          key={link.id}
                          className="flex items-center justify-between p-2 border group transition-all duration-200"
                          style={{
                            backgroundColor: s.sectionBg,
                            borderColor: s.sectionBorder,
                            borderRadius: s.itemRadius,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = isSimple ? "rgba(255,255,255,0.15)" : `${accent}40`;
                            e.currentTarget.style.backgroundColor = isSimple ? "rgba(255,255,255,0.06)" : `${accent}10`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = s.sectionBorder;
                            e.currentTarget.style.backgroundColor = s.sectionBg;
                          }}
                        >
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            <div
                              className="p-1 flex items-center justify-center"
                              style={{
                                backgroundColor: isSimple ? "rgba(255,255,255,0.06)" : `${accent}20`,
                                borderRadius: isSimple ? 6 : 0,
                              }}
                            >
                              {favicon ? (
                                <img src={favicon} alt="" className="w-4 h-4 rounded-sm" />
                              ) : (
                                <Globe size={12} className="text-white/70" />
                              )}
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs text-white/80 truncate">
                                {link.name}
                              </span>
                              <span className="text-[9px] text-white/25 truncate">
                                {link.url}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteLink(link.id)}
                            className="p-1 opacity-0 group-hover:opacity-100 text-white/30 hover:text-red-400 transition-all"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Add New */}
                  {taskbar.links.length < 7 ? (
                    <div
                      className="p-3 border space-y-3"
                      style={{
                        borderColor: s.sectionBorder,
                        backgroundColor: s.sectionBg,
                        borderRadius: s.sectionRadius,
                      }}
                    >
                      <p
                        className="text-[9px] font-bold tracking-wider flex items-center gap-1.5"
                        style={{ color: `${accent}80`, fontFamily: s.headerFont }}
                      >
                        <Plus size={11} /> {isSimple ? "Add Shortcut" : "ADD SHORTCUT"}
                      </p>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Name"
                          value={newLink.name}
                          onChange={(e) =>
                            setNewLink({ ...newLink, name: e.target.value })
                          }
                          className="bg-white/[0.03] border px-2.5 py-1.5 text-[11px] text-white/80 outline-none transition-colors"
                          style={{
                            borderColor: isSimple ? "rgba(255,255,255,0.08)" : `${accent}20`,
                            caretColor: accent,
                            borderRadius: s.inputRadius,
                          }}
                          onFocus={(e) =>
                            (e.target.style.borderColor = isSimple ? "rgba(255,255,255,0.2)" : accent)
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = isSimple ? "rgba(255,255,255,0.08)" : `${accent}20`)
                          }
                        />
                        <div className="relative">
                          <LinkIcon
                            size={10}
                            className="absolute left-2.5 top-2 text-white/20"
                          />
                          <input
                            type="text"
                            placeholder="URL"
                            value={newLink.url}
                            onChange={(e) =>
                              setNewLink({ ...newLink, url: e.target.value })
                            }
                            className="w-full bg-white/[0.03] border pl-7 pr-2.5 py-1.5 text-[11px] text-white/80 outline-none transition-colors"
                            style={{
                              borderColor: isSimple ? "rgba(255,255,255,0.08)" : `${accent}20`,
                              caretColor: accent,
                              borderRadius: s.inputRadius,
                            }}
                            onFocus={(e) =>
                              (e.target.style.borderColor = isSimple ? "rgba(255,255,255,0.2)" : accent)
                            }
                            onBlur={(e) =>
                              (e.target.style.borderColor = isSimple ? "rgba(255,255,255,0.08)" : `${accent}20`)
                            }
                          />
                        </div>
                      </div>

                      {/* Favicon Preview */}
                      {newLink.url && getFaviconUrl(newLink.url) && (
                        <div className="flex items-center gap-2">
                          <img
                            src={getFaviconUrl(newLink.url)}
                            alt=""
                            className="w-5 h-5 rounded-sm"
                          />
                          <span className="text-[9px] text-white/30 tracking-wider">
                            {isSimple ? "Icon auto-detected" : "ICON AUTO-DETECTED"}
                          </span>
                        </div>
                      )}

                      <button
                        onClick={handleAddLink}
                        className="w-full py-1.5 text-[10px] font-bold tracking-wider transition-all duration-200 border"
                        style={{
                          fontFamily: s.headerFont,
                          borderRadius: s.btnRadius,
                          borderColor: isSimple ? "rgba(255,255,255,0.1)" : `${accent}40`,
                          color: isSimple ? "white" : accent,
                          backgroundColor: isSimple ? "rgba(255,255,255,0.06)" : `${accent}10`,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = isSimple ? "rgba(255,255,255,0.12)" : accent;
                          e.currentTarget.style.color = isSimple ? "white" : "black";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = isSimple ? "rgba(255,255,255,0.06)" : `${accent}10`;
                          e.currentTarget.style.color = isSimple ? "white" : accent;
                        }}
                      >
                        {isSimple ? "Add" : "ADD"}
                      </button>
                    </div>
                  ) : (
                    <div
                      className="p-2 border border-red-500/20 bg-red-500/5 text-center"
                      style={{ borderRadius: s.sectionRadius }}
                    >
                      <p className="text-[10px] text-red-400/60 tracking-wider"
                        style={{ fontFamily: s.headerFont }}
                      >
                        {isSimple ? "Max limit reached" : "MAX LIMIT REACHED"}
                      </p>
                    </div>
                  )}
                </section>

                {/* ── Footer ── */}
                <div className="pt-4 text-center">
                  <p
                    className="text-[9px] tracking-wider opacity-20"
                    style={{ color: accent, fontFamily: s.headerFont }}
                  >
                    {isSimple ? "Vibe Board v1.0" : "VIBE BOARD v1.0"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SettingsPanel;
