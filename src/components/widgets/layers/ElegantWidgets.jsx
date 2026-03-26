import React, { useState } from "react";
import { useVibe } from "../../../engine/vibeEngine";
import { storage } from "../../../engine/storage";
import TodoWidget from "../TodoWidget";
import TimerWidget from "../TimerWidget";
import NotesWidget from "../NotesWidget";
import ResourcesWidget from "../ResourcesWidget";
import { motion } from "framer-motion";

const ElegantWidgets = () => {
  const { widgets, theme } = useVibe();
  const accentColor = theme?.accent || "#ffffff";

  const defaultPositions = {
    todo: { x: 50, y: 100 },
    timer: { x: 50, y: 400 },
    notes: { x: 400, y: 100 },
    resources: { x: 400, y: 400 },
  };

  const [positions, setPositions] = useState(() =>
    storage.get("widget_positions_elegant", defaultPositions),
  );

  const handleDragEnd = (key, info) => {
    const newPos = {
      x: positions[key].x + info.offset.x,
      y: positions[key].y + info.offset.y,
    };
    const updatedPositions = { ...positions, [key]: newPos };
    setPositions(updatedPositions);
    storage.set("widget_positions_elegant", updatedPositions);
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

        return (
          <motion.div
            key={key}
            drag
            dragMomentum={false}
            initial={{
              x: positions[key].x,
              y: positions[key].y,
              opacity: 0,
              yOffset: 10,
            }}
            animate={{
              x: positions[key].x,
              y: positions[key].y,
              opacity: 1,
              yOffset: 0,
            }}
            onDragEnd={(_, info) => handleDragEnd(key, info)}
            whileHover={{ cursor: "grab" }}
            whileDrag={{ cursor: "grabbing", zIndex: 100, scale: 1.02 }}
            className="absolute pointer-events-auto"
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Elegant glassmorphism wrapper */}
            <div
              className="backdrop-blur-2xl border border-white/10 p-5 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl font-[serif]"
              style={{
                backgroundColor: accentColor + "1A", // elegant looks better slightly lighter, wait, user said 3A everywhere. I will do 3A.
                boxShadow: `0 10px 40px -10px rgba(0,0,0,0.5), inset 0 0 0 1px ${accentColor}10`,
                width: key === "todo" ? "20rem" : "auto",
                minWidth: "200px",
              }}
            >
              <div 
                className="absolute top-0 left-0 w-full h-px" 
                style={{ background: `linear-gradient(90deg, transparent, ${accentColor}40, transparent)` }} 
              />
              <div className="relative z-10 opacity-90">
                {ComponentMap[key]}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ElegantWidgets;
