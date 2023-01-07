/* eslint-disable array-callback-return */
import React from "react";
import CountryCard from "./country_card";

function Countries({ countries }) {
  return (
    <div className="country-list container">
      {countries.map((item, i) => {
        if (item.name.common === "Israel") {
          return;
        }
        return <CountryCard key={i} item={item} />;
      })}
    </div>
  );
}

export default Countries;
