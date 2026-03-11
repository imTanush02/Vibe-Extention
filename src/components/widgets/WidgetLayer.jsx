import React from "react";
import { useVibe } from "../../engine/vibeEngine";
import GamingWidgets from "./layers/GamingWidgets";
import SimpleWidgets from "./layers/SimpleWidgets";

const WIDGETS = { gaming: GamingWidgets, simple: SimpleWidgets };

const WidgetLayer = () => {
  const { currentVibe } = useVibe();
  const Comp = WIDGETS[currentVibe] || WIDGETS.gaming;
  return <Comp />;
};

export default WidgetLayer;
