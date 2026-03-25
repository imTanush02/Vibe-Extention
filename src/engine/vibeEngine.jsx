import React, { createContext, useContext, useState, useEffect } from "react";
import { storage } from "./storage";
import { wallpaperStorage } from "../engine/storage";

const VibeContext = createContext();

export const VIBES = {
  GAMING: "gaming",
  SIMPLE: "simple",
};

const DEFAULT_CONFIG = {
  currentVibe: VIBES.GAMING,
  userName: "",
  wallpaper: {
    type: "none",
    url: "",
    settings: {
      blur: 0,
      opacity: 0.8,
    },
  },
  taskbar: {
    position: "bottom",
    visible: true,
    links: [
      {
        id: "yt",
        name: "YouTube",
        url: "https://youtube.com",
        icon: "Youtube",
      },
      {
        id: "gpt",
        name: "ChatGPT",
        url: "https://chat.openai.com",
        icon: "MessageSquare",
      },
      { id: "gh", name: "GitHub", url: "https://github.com", icon: "Github" },
      {
        id: "gem",
        name: "Gemini",
        url: "https://gemini.google.com",
        icon: "Sparkles",
      },
    ],
  },
  theme: {
    accent: "#ffffff",
    bg: "",
    text: "",
  },
  widgets: {
    todo: true,
    timer: false,
    notes: true,
    resources: false,
  },
};

export const VibeProvider = ({ children }) => {
  const [config, setConfig] = useState(() =>
    storage.get("vibe_config", DEFAULT_CONFIG),
  );

  const [resolvedUrl, setResolvedUrl] = useState("");

  const setUserName = (name) => {
    setConfig((prev) => ({ ...prev, userName: name }));
  };

  useEffect(() => {
    // Agar wallpaper custom hai, toh IndexedDB se fetch karo
    if (config.wallpaper.url === "indexeddb_custom") {
      wallpaperStorage.get("current_wallpaper").then((blob) => {
        if (blob) setResolvedUrl(blob);
      });
    } else {
      setResolvedUrl(config.wallpaper.url);
    }
  }, [config.wallpaper.url]);

  const toggleWidget = (widgetId) => {
    setConfig((prev) => ({
      ...prev,
      widgets: { ...prev.widgets, [widgetId]: !prev.widgets[widgetId] },
    }));
  };

  // 1. Persistence Only (Debounced to prevent lag on fast updates like Color Picker)
  useEffect(() => {
    const handler = setTimeout(() => {
      storage.set("vibe_config", config);
    }, 100);
    return () => clearTimeout(handler);
  }, [config]);

  // 2. State Updaters
  const setVibe = (vibe) => {
    setConfig((prev) => ({ ...prev, currentVibe: vibe }));
  };

  const updateWallpaper = (newWallpaper) => {
    setConfig((prev) => ({
      ...prev,
      wallpaper: { ...prev.wallpaper, ...newWallpaper },
    }));
  };

  const updateTaskbar = (newTaskbarConfig) => {
    setConfig((prev) => ({
      ...prev,
      taskbar: { ...prev.taskbar, ...newTaskbarConfig },
    }));
  };

  const updateTheme = (newTheme) => {
    setConfig((prev) => ({
      ...prev,
      theme: { ...prev.theme, ...newTheme },
    }));
  };

  // 3. The "Dynamic Wrapper" Logic
  // We calculate styles here so they are applied to the React Tree, not the DOM root.
  const dynamicStyles = {
    "--vibe-accent": config.theme?.accent || "#ffffff",
    "--vibe-bg": config.theme?.bg || undefined, // undefined lets CSS fallback take over
    "--vibe-text": config.theme?.text || undefined,
  };

  return (
    <VibeContext.Provider
      value={{
        currentVibe: config.currentVibe,
        theme: config.theme,
        wallpaper: {
          ...config.wallpaper,
          url: resolvedUrl || config.wallpaper.url,
        },
        taskbar: config.taskbar,
        setVibe,
        updateTheme,
        updateWallpaper,
        updateTaskbar,
        widgets: config.widgets,
        toggleWidget,
        userName: config.userName,
        setUserName,
      }}
    >
      <div
        className={`vibe-app vibe-${config.currentVibe} min-h-screen text-white transition-colors duration-500`}
        style={dynamicStyles}
      >
        {children}
      </div>
    </VibeContext.Provider>
  );
};

export const useVibe = () => {
  const context = useContext(VibeContext);
  if (!context) {
    throw new Error("useVibe must be used within a VibeProvider");
  }
  return context;
};
