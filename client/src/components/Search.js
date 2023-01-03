import React, { useContext } from "react";
import { SearchContext } from "../helper/Context";
import Style from "./Search.module.css";

const Search = () => {
  const [search, setSearch] = useContext(SearchContext);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className={Style.searchBar}>
      <input value={search} onChange={handleSearch} />
      <button onClick={() => setSearch("")} disabled={!search}>
        {" "}
        X{" "}
      </button>
    </div>
  );
};

export default Search;
