import React from "react";
import { useVibe } from "../../engine/vibeEngine";
import GamingWeather from "./weather/GamingWeather";
import SimpleWeather from "./weather/SimpleWeather";

const WEATHERS = { gaming: GamingWeather, simple: SimpleWeather };

const Weather = () => {
  const { currentVibe, theme } = useVibe();
  const accentColor = theme?.accent || "#00ffff";
  const Comp = WEATHERS[currentVibe] || WEATHERS.gaming;
  return <Comp accentColor={accentColor} />;
};

export default Weather;
