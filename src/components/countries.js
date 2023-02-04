/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect } from "react";
import CountryCard from "./country_card";
import Loading from "./loading";
import NotFound from "./not-found";

function Countries({ countries, loading, setParameter, setQuery }) {
  // fetching all data by default
  useEffect(() => {
    setParameter("/all");
    setQuery("");
  }, []);

  return (
    <div className="country-list container">
      {loading ? (
        <Loading />
      ) : countries.status !== 404 ? (
        countries.map((item, i) => {
          if (item.name.common === "Israel") {
            return;
          }
          return <CountryCard key={i} item={item} />;
        })
      ) : (
        <NotFound />
      )}
    </div>
  );
}

export default Countries;
