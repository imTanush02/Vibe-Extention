import React from "react";
import { useVibe } from "../../engine/vibeEngine";
import GamingClock from "./clock/GamingClock";
import SimpleClock from "./clock/SimpleClock";
import ElegantClock from "./clock/ElegantClock";

const CLOCKS = { gaming: GamingClock, simple: SimpleClock, elegant: ElegantClock };

const Clock = () => {
  const { currentVibe, theme } = useVibe();
  const accentColor = theme?.accent || "#00ffff";
  const Comp = CLOCKS[currentVibe] || CLOCKS.gaming;
  return <Comp accentColor={accentColor} />;
};

export default Clock;
