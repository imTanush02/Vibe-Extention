import React from "react";
import { useVibe } from "../../engine/vibeEngine";
import GamingWidgets from "./layers/GamingWidgets";
import SimpleWidgets from "./layers/SimpleWidgets";
import ElegantWidgets from "./layers/ElegantWidgets";

const WIDGETS = { gaming: GamingWidgets, simple: SimpleWidgets, elegant: ElegantWidgets };

const WidgetLayer = () => {
  const { currentVibe } = useVibe();
  const Comp = WIDGETS[currentVibe] || WIDGETS.gaming;
  return <Comp />;
};

export default WidgetLayer;
