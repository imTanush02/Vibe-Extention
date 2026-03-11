import React from "react";
import { useVibe } from "../../engine/vibeEngine";
import GamingSearch from "./search/GamingSearch";
import SimpleSearch from "./search/SimpleSearch";

const SEARCHES = { gaming: GamingSearch, simple: SimpleSearch };

const Search = () => {
  const { currentVibe, theme } = useVibe();
  const accentColor = theme?.accent || "#00ffff";
  const Comp = SEARCHES[currentVibe] || SEARCHES.gaming;
  return <Comp accentColor={accentColor} />;
};

export default Search;
