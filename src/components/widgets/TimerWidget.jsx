import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

const TimerWidget = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [totalTime, setTotalTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("focus");
  const [isEditing, setIsEditing] = useState(false);
  const [editMins, setEditMins] = useState("25");
  const [editSecs, setEditSecs] = useState("00");

  const timerRef = useRef(null);
  const minsRef = useRef(null);
  const secsRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(totalTime);
  };

  const setTimerMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    const newTime = newMode === "focus" ? 25 * 60 : 5 * 60;
    setTotalTime(newTime);
    setTimeLeft(newTime);
    setIsEditing(false);
  };

  const startEditing = () => {
    if (isRunning) return;
    setIsEditing(true);
    setEditMins(Math.floor(timeLeft / 60).toString().padStart(2, "0"));
    setEditSecs((timeLeft % 60).toString().padStart(2, "0"));
    setTimeout(() => minsRef.current?.select(), 50);
  };

  const applyTime = () => {
    const m = parseInt(editMins) || 0;
    const s = parseInt(editSecs) || 0;
    const total = Math.max(1, m * 60 + s); // at least 1 second
    setTotalTime(total);
    setTimeLeft(total);
    if (mode !== "custom" && total !== 25 * 60 && total !== 5 * 60) {
      setMode("custom");
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      applyTime();
    } else if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  // Auto-jump: when user types 2 digits in minutes, move to seconds
  const handleMinsChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 2);
    setEditMins(val);
    if (val.length === 2) {
      secsRef.current?.focus();
      secsRef.current?.select();
    }
  };

  const handleSecsChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 2);
    // clamp to 59
    const num = parseInt(val);
    if (!isNaN(num) && num > 59) {
      setEditSecs("59");
    } else {
      setEditSecs(val);
    }
  };

  const displayMins = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const displaySecs = (timeLeft % 60).toString().padStart(2, "0");
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  const inputClass =
    "w-20 bg-white/5 p-2 border border-white/10 rounded-lg text-center text-4xl font-bold text-white outline-none focus:border-[var(--vibe-accent)] focus:bg-white/10 focus:shadow-[0_0_12px_var(--vibe-accent)20] tabular-nums";

  return (
    <div className="flex flex-col items-center justify-between h-full w-[15rem] relative font-['Orbitron']">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[var(--vibe-accent)] shadow-[0_0_10px_var(--vibe-accent)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "linear" }}
        />
      </div>

      {/* Mode Selectors */}
      <div className="flex gap-2 w-full justify-center mb-2 mt-4">
        {["focus", "break"].map((m) => (
          <button
            key={m}
            onClick={() => setTimerMode(m)}
            className={`px-3 py-1 rounded transition-colors text-[10px] font-bold uppercase tracking-widest ${
              mode === m
                ? "bg-[var(--vibe-accent)] text-black"
                : "text-white/40 hover:text-white"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Timer Display */}
      <div className="flex-1 flex items-center justify-center">
        {isEditing ? (
          <div className="flex py-3 items-center gap-2">
            <input
              ref={minsRef}
              type="text"
              inputMode="numeric"
              value={editMins}
              onChange={handleMinsChange}
              onKeyDown={handleKeyDown}
              placeholder="MM"
              className={inputClass}
              maxLength={2}
            />
            <span className="text-4xl font-bold text-white/40">:</span>
            <input
              ref={secsRef}
              type="text"
              inputMode="numeric"
              value={editSecs}
              onChange={handleSecsChange}
              onKeyDown={handleKeyDown}
              onBlur={applyTime}
              placeholder="SS"
              className={inputClass}
              maxLength={2}
            />
            <button
              onClick={applyTime}
              className="ml-2 px-3 py-2 rounded-lg bg-[var(--vibe-accent)] text-black text-[10px] font-bold tracking-wider hover:opacity-90 transition-opacity"
            >
              SET
            </button>
          </div>
        ) : (
          <div
            onClick={startEditing}
            className="flex items-baseline gap-3 py-4 cursor-pointer  select-none group"
          >
            <span
              className="text-5xl tracking-wider font-bold  tabular-nums"
              style={{
                color:  "white",
                textShadow: isRunning ? "0 0 20px var(--vibe-accent)" : "none",
              }}
            >
              {displayMins}:{displaySecs}
            </span>
            
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 w-full justify-center mb-4">
        <button
          onClick={resetTimer}
          className="p-1 rounded-full hover:bg-white/10 text-white/50 hover:text-white "
        >
          <RotateCcw size={20} />
        </button>

        <button
          onClick={toggleTimer}
          className="p-2 rounded-full bg-white/10 hover:bg-[var(--vibe-accent)] hover:text-black  text-white border border-white/10 active:scale-95"
          style={{
            borderColor: isRunning
              ? "var(--vibe-accent)"
              : "rgba(255,255,255,0.1)",
          }}
        >
          {isRunning ? (
            <Pause size={24} fill="currentColor" />
          ) : (
            <Play size={24} fill="currentColor" className="ml-1" />
          )}
        </button>
      </div>
    </div>
  );
};

export default TimerWidget;
