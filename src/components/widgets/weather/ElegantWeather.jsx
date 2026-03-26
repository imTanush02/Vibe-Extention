import React, { useState, useEffect } from "react";
import {
  Cloud, Sun, CloudRain, CloudSnow, CloudLightning,
  CloudDrizzle, Droplets, MapPin, Thermometer, CloudFog, Wind,
} from "lucide-react";
import { motion } from "framer-motion";

const WMO_ICONS = {
  0: Sun, 1: Sun, 2: Cloud, 3: Cloud,
  45: CloudFog, 48: CloudFog,
  51: CloudDrizzle, 53: CloudDrizzle, 55: CloudDrizzle,
  61: CloudRain, 63: CloudRain, 65: CloudRain,
  71: CloudSnow, 73: CloudSnow, 75: CloudSnow,
  80: CloudRain, 81: CloudRain, 82: CloudRain,
  95: CloudLightning, 96: CloudLightning, 99: CloudLightning,
};

const WMO_DESC = {
  0: "Clear Sky", 1: "Mainly Clear", 2: "Partly Cloudy", 3: "Overcast",
  45: "Fog", 48: "Rime Fog",
  51: "Light Drizzle", 53: "Drizzle", 55: "Heavy Drizzle",
  61: "Light Rain", 63: "Rain", 65: "Heavy Rain",
  71: "Light Snow", 73: "Snow", 75: "Heavy Snow",
  80: "Light Showers", 81: "Showers", 82: "Heavy Showers",
  95: "Thunderstorm", 96: "Thunderstorm + Hail", 99: "Severe Thunderstorm",
};

const ElegantWeather = ({ accentColor }) => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude: lat, longitude: lon } = pos.coords;
          const [weatherRes, geoRes] = await Promise.all([
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relative_humidity_2m,apparent_temperature`),
            fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`),
          ]);
          const weatherData = await weatherRes.json();
          const geoData = await geoRes.json();

          const hourIndex = new Date().getHours();
          setWeather({
            temp: Math.round(weatherData.current_weather.temperature),
            code: weatherData.current_weather.weathercode,
            humidity: weatherData.hourly.relative_humidity_2m[hourIndex],
            feelsLike: Math.round(weatherData.hourly.apparent_temperature[hourIndex]),
            wind: Math.round(weatherData.current_weather.windspeed),
          });
          setCity(geoData.address?.city || geoData.address?.town || geoData.address?.village || "Location");
        } catch {
          setWeather(null);
        }
        setLoading(false);
      },
      () => setLoading(false),
    );
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-3 text-white/40 text-sm font-[serif] tracking-widest italic">
        <div className="w-3 h-3 border border-white/20 border-t-white/60 rounded-full animate-spin" />
        fetching condition...
      </div>
    );
  }

  if (!weather) return null;

  const Icon = WMO_ICONS[weather.code] || Cloud;
  const desc = WMO_DESC[weather.code] || "Unknown";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="flex flex-col items-end gap-2 font-[serif] p-6 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl"
      style={{ backgroundColor: accentColor + "3A" }}
    >
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end">
          <span className="text-white/80 text-xl tracking-widest uppercase font-light">{city}</span>
          <span className="text-white/40 text-xs tracking-[0.2em] uppercase">{desc}</span>
        </div>
        <div className="w-px h-10 bg-white/10" />
        <div className="flex items-center gap-2">
          <span className="text-4xl font-light text-white/90">{weather.temp}°</span>
          <Icon size={24} className="text-white/50" strokeWidth={1.5} />
        </div>
      </div>
      
      <div className="flex gap-4 mt-2 text-xs tracking-widest text-white/30 uppercase">
        <div className="flex items-center gap-1.5">
          <Droplets size={10} /> {weather.humidity}%
        </div>
        <div className="flex items-center gap-1.5">
          <Thermometer size={10} /> Feels {weather.feelsLike}°
        </div>
        <div className="flex items-center gap-1.5" style={{ color: accentColor }}>
          <Wind size={10} /> {weather.wind} km/h
        </div>
      </div>
    </motion.div>
  );
};

export default ElegantWeather;
