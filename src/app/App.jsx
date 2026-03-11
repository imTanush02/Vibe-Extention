import React, { useState } from "react";
import { useVibe } from "../engine/vibeEngine";
import WidgetLayer from "../components/widgets/WidgetLayer";
import SettingsPanel from "../components/SettingsPanel";
import clsx from "clsx";

import GamingLayout from "../components/layouts/GamingLayout";
import SimpleLayout from "../components/layouts/SimpleLayout";

const LAYOUTS = {
  gaming: GamingLayout,
  simple: SimpleLayout,
};

const App = () => {
  const { wallpaper, currentVibe } = useVibe();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const backgroundStyle =
    wallpaper.type === "none" || !wallpaper.url
      ? {}
      : {
          backgroundImage: `url(${wallpaper.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: `blur(${wallpaper.settings.blur}px) opacity(${wallpaper.settings.opacity})`,
        };

  const Layout = LAYOUTS[currentVibe] || LAYOUTS.gaming;

  return (
    <div
      className={clsx(
        "relative w-full h-screen overflow-hidden p-2 transition-colors duration-700",
        wallpaper.type === "none" && "bg-black",
      )}
    >
      {wallpaper.type !== "none" && (
        <div
          className="absolute inset-0 z-0 transition-all duration-700"
          style={backgroundStyle}
        />
      )}

      <main className="relative z-10 w-full h-full">
        <Layout onOpenSettings={() => setSettingsOpen(true)} />
        <WidgetLayer />
      </main>

      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
};

export default App;
