import React, { useState } from "react";
import { useVibe } from "../../../engine/vibeEngine";
import { storage } from "../../../engine/storage";
import TodoWidget from "../TodoWidget";
import TimerWidget from "../TimerWidget";
import NotesWidget from "../NotesWidget";
import ResourcesWidget from "../ResourcesWidget";
import { motion } from "framer-motion";

const GamingWidgets = () => {
  const { widgets, theme } = useVibe();
  const accentColor = theme?.accent || "#00ffff";

  const defaultPositions = {
    todo: { x: 50, y: 100 },
    timer: { x: 50, y: 400 },
    notes: { x: 400, y: 100 },
    resources: { x: 400, y: 400 },
  };

  const [positions, setPositions] = useState(() =>
    storage.get("widget_positions_gaming", defaultPositions),
  );

  const handleDragEnd = (key, info) => {
    const newPos = {
      x: positions[key].x + info.offset.x,
      y: positions[key].y + info.offset.y,
    };
    const updatedPositions = { ...positions, [key]: newPos };
    setPositions(updatedPositions);
    storage.set("widget_positions_gaming", updatedPositions);
  };

  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
      {Object.entries(widgets).map(([key, isEnabled]) => {
        if (!isEnabled) return null;

        const ComponentMap = {
          todo: <TodoWidget />,
          timer: <TimerWidget />,
          notes: <NotesWidget />,
          resources: <ResourcesWidget />,
        };

        // Specific styling wrappers for Gaming Vibe
        const isMission = key === "todo";
        const isFocus = key === "timer";

        return (
          <motion.div
            key={key}
            drag
            dragMomentum={false}
            initial={{
              x: positions[key].x,
              y: positions[key].y,
              opacity: 0,
              scale: 0.9,
            }}
            // IMPORTANT: animating x/y ensures layout sync, opacity/scale handles entry
            animate={{
              x: positions[key].x,
              y: positions[key].y,
              opacity: 1,
              scale: 1,
            }}
            onDragEnd={(_, info) => handleDragEnd(key, info)}
            whileHover={{ cursor: "grab" }}
            whileDrag={{ cursor: "grabbing", zIndex: 100 }}
            className="absolute pointer-events-auto"
            transition={{ duration: 0.2 }}
          >
            {/* Wrapper to apply the Sci-Fi Border Style */}
            <div className="relative group">
              {/* HUD Labels */}
              {isFocus && (
                <div
                  className="absolute -top-6 left-0 font-['Orbitron'] text-sm tracking-widest opacity-80 pointer-events-none"
                  style={{ color: accentColor }}
                >
                  FOCUS PROTOCOL
                </div>
              )}
              {isMission && (
                <div
                  className="absolute -top-6 right-0 font-['Orbitron'] text-sm tracking-widest opacity-80 pointer-events-none"
                  style={{ color: accentColor }}
                >
                  MISSION OBJECTIVES
                </div>
              )}

              {/* Main Container */}
              <div
                className="backdrop-blur-xl bg-black/40 border border-white/10 p-6 rounded-lg overflow-hidden transition-all duration-300 hover:bg-black/50"
                style={{
                  boxShadow: `0 0 30px -10px ${accentColor}40`,
                  borderLeft: isFocus
                    ? `2px solid ${accentColor}`
                    : "1px solid rgba(255,255,255,0.1)",
                  borderRight: isMission
                    ? `2px solid ${accentColor}`
                    : "1px solid rgba(255,255,255,0.1)",
                  width: key === "todo" ? "20rem" : "auto", // W-80 equivalent
                  minWidth: "200px",
                }}
              >
                {/* Corner Accents (Only for Focus/Mission for now to keep it clean) */}
                {(isFocus || isMission) && (
                  <>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30" />
                  </>
                )}

                {ComponentMap[key]}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default GamingWidgets;
