import React, { useState } from "react";
import { MapPin } from "lucide-react";
import css from "./SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setQuery("");
    }
  };

  return (
    <div className={css.searchWrapper}>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <div className={css.inputGroup}>
          <MapPin className={css.pinIcon} size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Check the sky in Tokyo, London..."
            className={css.inputField}
          />
          <button type="submit" className={css.exploreBtn}>
            Explore
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;