import React from "react";
import { CloudRain, Droplets, MapPin, Thermometer, Wind } from "lucide-react";
import { motion } from "framer-motion";

const GamingWeather = ({ accentColor }) => {
  // Mock Data
  const weather = {
    temp: 21,
    condition: "MIST",
    humidity: 40,
    feelsLike: 21.1,
    location: "SCTOR-7", // Earth in gaming terms maybe? keeping it simple for now
    wind: "12km/h",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col items-end font-['Orbitron'] select-none"
      style={{ "--accent": accentColor }}
    >
      {/* HUD Header */}
      <div className="flex items-center gap-2 mb-2 opacity-80">
        <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
        <span className="text-xs tracking-widest text-[var(--accent)]">
          ATMOS_SCAN
        </span>
      </div>

      {/* Main Display Box */}
      <div
        className="relative bg-black/60 border border-[var(--accent)] p-4 pr-12 clip-path-polygon"
        style={{
          clipPath: "polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)",
          boxShadow: `0 0 15px -5px ${accentColor}40`,
        }}
      >
        {/* Decorative corner accents */}
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[var(--accent)]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[var(--accent)]" />

        <div className="flex items-start gap-4">
          <div className="flex flex-col">
            <span
              className="text-4xl font-bold text-white tracking-widest"
              style={{ textShadow: `0 0 10px ${accentColor}` }}
            >
              {weather.temp}°
            </span>
            <span className="text-[var(--accent)] text-sm tracking-wider uppercase opacity-80">
              {weather.condition}
            </span>
          </div>

          {/* Icon */}
          <CloudRain size={32} className="text-white opacity-80 mt-1" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4 text-xs tracking-wider text-gray-300">
          <div className="flex items-center gap-2">
            <Droplets size={10} className="text-[var(--accent)]" />
            <span>HUM: {weather.humidity}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Wind size={10} className="text-[var(--accent)]" />
            <span>WND: {weather.wind}</span>
          </div>
          <div className="col-span-2 flex items-center gap-2 border-t border-white/10 pt-2 mt-1">
            <MapPin size={10} className="text-[var(--accent)]" />
            <span className="uppercase">LOC: {weather.location}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GamingWeather;
