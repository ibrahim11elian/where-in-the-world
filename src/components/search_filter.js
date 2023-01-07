/* eslint-disable no-useless-escape */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTimes } from "@fortawesome/free-solid-svg-icons";
const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

function SearchFilter({ setQuery, query, setParameter }) {
  const [close, setClose] = useState(false);
  const [error, setError] = useState(false);

  // regular expression to check if the query have special character or not since on country name has special character
  var regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/gi;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query && !regex.test(query)) {
      await setParameter(`/name/${query}`);
      setClose(true);
      document.querySelector(".search-input").style.cssText = "border: none";
    } else {
      setError(true);
      document.querySelector(".search-input").style.cssText =
        "border: 4px solid #f46262";
    }
  };

  const closeSearch = async () => {
    await setParameter(`/all`);
    setClose(false);
    setQuery("");
    setError(false);
    document.querySelector(".search-input").style.cssText = "border: none";
  };

  const handleFilter = async (e) => {
    if (e.target.value === "all") {
      await setParameter(`/all`);
    } else {
      await setParameter(`/region/${e.target.value.toLowerCase()}`);
    }
  };

  return (
    <section className="search-filter container">
      <form action="" className="search" onSubmit={handleSubmit}>
        {error ? (
          <span className="error">please type a valid country name</span>
        ) : null}
        <div className="search-input">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input
            type="text"
            placeholder="Search for country"
            autoComplete="off"
            value={query}
            maxLength={20}
            minLength={3}
            onChange={(e) => {
              setQuery(e.target.value);
              setError(false);
              document.querySelector(".search-input").style.cssText =
                "border: none";
            }}
          />
          {close ? (
            <FontAwesomeIcon
              icon={faTimes}
              className="close-search"
              onClick={closeSearch}
            />
          ) : null}
        </div>
      </form>
      <select
        className="filter"
        name="filter"
        onChange={handleFilter}
        aria-label="filter-by"
      >
        <option value="none" defaultValue hidden>
          Filter by Region
        </option>
        <option value="all">All Region</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </section>
  );
}

export default SearchFilter;
