import React, {useState} from "react";
import { Search, X, MapPin } from "lucide-react";
import css from "./SearchBar.module.css"



const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query); 
      setQuery('');   
    }
  };

  return (
    <div className={css.searchWrapper}>
      <form onSubmit={handleSubmit}>
        <div className={css.inputGroup}>
          <Search className={css.searchIcon} />
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for any city..." 
            className={css.inputField}
          />
          <button type="submit" style={{display: 'none'}}>Search</button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
