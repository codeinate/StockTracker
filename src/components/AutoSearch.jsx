import { useState, useEffect, useContext } from 'react';
import finnHub from "../apis/finnHub";
import { AppContext } from "../context/AppContext";

export const AutoSearch = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const { addStock } = useContext(AppContext);
  
  const renderDropdown = () => {
    const dropdownClass = search ? "show" : null;
    return (
      <ul className={`dropdown-menu ${dropdownClass}`} id="autoSearchDropdown">
        {
          results.map((result) => {
            return <li 
                     className="dropdown-item" 
                     onClick={() => {
                       addStock(result.symbol)
                       setSearch("");
                     }}
                     key={result.symbol}>{result.description} ({result.symbol})</li>
          })}
      </ul>
    )
  }

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finnHub.get("/search", {
          params: {
            q: search
          }
        });

        setResults(response.data.result);
      } catch (err) {

      }
    }

    if (search.length > 0) {
      fetchData();
    } else {
      setResults([]);
    }

    return () => (isMounted = false)
  }, [search]);

  return <div className="w-50 p-5 rounded mx-auto">
    <div className="form-floating dropdown">
      <input
        style={{ backgroundColor: "rgba(145, 158, 171, 0.04" }}
        id="search"
        type="text"
        className="form-control"
        placeholder="Search"
        autoComplete="off"
        value={search}
        onChange={(e) => setSearch(e.target.value)
        }></input>
      <label htmlFor="search">Search</label>
      {renderDropdown()}
    </div>
  </div>
}