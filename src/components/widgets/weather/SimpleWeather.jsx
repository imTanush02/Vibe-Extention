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

const SimpleWeather = () => {
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
          setCity(geoData.address?.city || geoData.address?.town || geoData.address?.village || "Earth");
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
      <div className="flex items-center gap-3 text-white/40 text-sm font-['Inter']">
        <div className="w-4 h-4 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
        Loading weather...
      </div>
    );
  }

  if (!weather) return null;

  const Icon = WMO_ICONS[weather.code] || Cloud;
  const desc = WMO_DESC[weather.code] || "Unknown";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-4 font-['Inter']"
    >
      {/* Detail Card */}
      <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 min-w-[220px] border border-white/10 shadow-sm">
        <p className="text-white/90 text-sm font-medium mb-3">{desc}</p>

        {/* Humidity bar */}
        <div className="flex items-center gap-2 mb-3">
          <Droplets size={13} className="text-white/40" />
          <span className="text-xs text-white/50">Humidity {weather.humidity}%</span>
          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-white/30 rounded-full transition-all"
              style={{ width: `${weather.humidity}%` }}
            />
          </div>
          <Droplets size={11} className="text-white/25" />
        </div>

        {/* Pills */}
        <div className="flex gap-2">
          <div className="flex items-center gap-1.5 bg-black/20 rounded-full px-3 py-1 border border-white/10">
            <Thermometer size={11} className="text-white/40" />
            <span className="text-xs text-white/70">Feels {weather.feelsLike}°C</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/20 rounded-full px-3 py-1 border border-white/10">
            <MapPin size={11} className="text-white/40" />
            <span className="text-xs text-white/70">{city}</span>
          </div>
        </div>
      </div>

      {/* Temp Circle */}
      <div className="w-28 h-28 rounded-full bg-black/30 backdrop-blur-md border border-white/10 shadow-sm flex flex-col items-center justify-center">
        <span className="text-2xl font-semibold text-white leading-none">
          {weather.temp}
          <span className="text-sm text-white/50">°C</span>
        </span>
        <Icon size={24} className="text-white/50 mt-1" />
      </div>
    </motion.div>
  );
};

export default SimpleWeather;
