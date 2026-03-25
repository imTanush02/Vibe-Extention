import React from "react";
import { useVibe } from "../../engine/vibeEngine";
import GamingGreeting from "./greeting/GamingGreeting";
import SimpleGreeting from "./greeting/SimpleGreeting";
import ElegantGreeting from "./greeting/ElegantGreeting";

const GREETINGS = { gaming: GamingGreeting, simple: SimpleGreeting, elegant: ElegantGreeting };

const Greeting = () => {
  const { currentVibe, userName, setUserName, theme } = useVibe();
  const accentColor = theme?.accent || "#00ffff";
  const Comp = GREETINGS[currentVibe] || GREETINGS.gaming;
  return (
    <div>
      <Comp userName={userName} setUserName={setUserName} accentColor={accentColor} />
    </div>
  );
};

export default Greeting;
