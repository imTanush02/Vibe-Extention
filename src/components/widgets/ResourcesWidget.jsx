import React, { useState, useEffect } from "react";
import { Cpu, HardDrive, Zap, Activity, Server } from "lucide-react";

const ResourcesWidget = () => {
  const [stats, setStats] = useState({ cpu: 15, ram: 42, ping: 24 });
  const [isBoosting, setIsBoosting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        cpu: Math.min(99, Math.max(5, prev.cpu + (Math.random() * 20 - 10))),
        ram: Math.min(95, Math.max(20, prev.ram + (Math.random() * 10 - 5))),
        ping: Math.floor(Math.random() * 60) + 10,
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleBoost = () => {
    setIsBoosting(true);
    setTimeout(() => {
      setStats((prev) => ({ cpu: 10, ram: 25, ping: prev.ping }));
      setIsBoosting(false);
    }, 800);
  };

  const ProgressBar = ({ label, value, icon: Icon }) => (
    <div className="group w-full">
      <div className="flex justify-between items-end mb-1">
        <div className="flex items-center gap-2 text-xs text-white/70 group-hover:text-white transition-colors">
          <Icon size={12} />
          <span className="font-mono uppercase tracking-wider">{label}</span>
        </div>
        <span className="text-xs font-bold text-white font-mono">
          {Math.round(value)}%
        </span>
      </div>
      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${value}%`,
            backgroundColor: value > 80 ? "#ef4444" : "var(--vibe-accent)",
            boxShadow: `0 0 8px ${value > 80 ? "#ef4444" : "var(--vibe-accent)"}`,
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full w-full justify-between">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h4
          style={{ color: "var(--vibe-accent)" }}
          className="font-bold text-sm uppercase tracking-wider flex items-center gap-2"
        >
          <Activity size={14} /> System
        </h4>
        <div className="flex items-center gap-1 text-[10px] text-white/40 font-mono">
          <Server size={10} /> <span>LOCAL</span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex-1 flex flex-col justify-center gap-4">
        <ProgressBar label="CPU Core" value={stats.cpu} icon={Cpu} />
        <ProgressBar label="Memory" value={stats.ram} icon={HardDrive} />
      </div>

      {/* Footer */}
      <div className="mt-2 pt-2 border-t border-white/5 flex justify-between items-center">
        <div className="flex items-center gap-2 text-xs text-white/50">
          <Activity
            size={12}
            className={stats.ping > 100 ? "text-red-400" : "text-green-400"}
          />
          <span className="font-mono">{stats.ping}ms</span>
        </div>
        <button
          onClick={handleBoost}
          disabled={isBoosting}
          className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all text-[10px] font-bold text-white group disabled:opacity-50"
        >
          <Zap
            size={10}
            className={`transition-transform ${isBoosting ? "scale-125 text-yellow-400" : "group-hover:text-[var(--vibe-accent)]"}`}
            fill={isBoosting ? "currentColor" : "none"}
          />
          {isBoosting ? "..." : "BOOST"}
        </button>
      </div>
    </div>
  );
};

export default ResourcesWidget;
