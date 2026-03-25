import React from "react";
import { useVibe } from "../../engine/vibeEngine";
import GamingSearch from "./search/GamingSearch";
import SimpleSearch from "./search/SimpleSearch";
import ElegantSearch from "./search/ElegantSearch";

const SEARCHES = { gaming: GamingSearch, simple: SimpleSearch, elegant: ElegantSearch };

const Search = () => {
  const { currentVibe, theme } = useVibe();
  const accentColor = theme?.accent || "#00ffff";
  const Comp = SEARCHES[currentVibe] || SEARCHES.gaming;
  return <Comp accentColor={accentColor} />;
};

export default Search;
