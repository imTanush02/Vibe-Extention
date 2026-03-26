import React, { useState } from "react";
import { useVibe } from "../../../engine/vibeEngine";
import { storage } from "../../../engine/storage";
import TodoWidget from "../TodoWidget";
import TimerWidget from "../TimerWidget";
import NotesWidget from "../NotesWidget";
import ResourcesWidget from "../ResourcesWidget";
import { motion } from "framer-motion";

const SimpleWidgets = () => {
  const { widgets, theme } = useVibe();
  const accentColor = theme?.accent || "#ffffff";

  const defaultPositions = {
    todo: { x: 50, y: 100 },
    timer: { x: 50, y: 400 },
    notes: { x: 400, y: 100 },
    resources: { x: 400, y: 400 },
  };

  const [positions, setPositions] = useState(() =>
    storage.get("widget_positions_simple", defaultPositions),
  );

  const handleDragEnd = (key, info) => {
    const newPos = {
      x: positions[key].x + info.offset.x,
      y: positions[key].y + info.offset.y,
    };
    const updated = { ...positions, [key]: newPos };
    setPositions(updated);
    storage.set("widget_positions_simple", updated);
  };

  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden font-['Inter']">
      {Object.entries(widgets).map(([key, isEnabled]) => {
        if (!isEnabled) return null;

        const ComponentMap = {
          todo: <TodoWidget />,
          timer: <TimerWidget />,
          notes: <NotesWidget />,
          resources: <ResourcesWidget />,
        };

        const labels = {
          todo: "Tasks",
          timer: "Timer",
          notes: "Notes",
          resources: "Resources",
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
              scale: 0.95,
            }}
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
            <div 
              className="backdrop-blur-md rounded-2xl border border-white/10 p-5 overflow-hidden transition-all duration-300 shadow-sm hover:border-white/20"
              style={{ backgroundColor: accentColor + "3A" }}
            >
              {/* Label */}
              <div className="text-[10px] text-white/40 font-medium tracking-wide uppercase mb-3">
                {labels[key]}
              </div>
              {ComponentMap[key]}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SimpleWidgets;
