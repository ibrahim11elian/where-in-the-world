import React from "react";

function CountryCard({ item }) {
  return (
    <div className="card">
      <img src={item.flags.png} alt={item.name.common} className="flag" />
      <div className="details">
        <h2 className="name">{item.name.common}</h2>
        <div className="data-type">
          population:
          <span className="data">
            {` ${item.population.toLocaleString("en-US")}`}
          </span>
        </div>
        <div className="data-type">
          region:
          <span className="data"> {item.region}</span>
        </div>
        <div className="data-type">
          capital:
          <span className="data"> {item.capital}</span>
        </div>
      </div>
    </div>
  );
}

export default CountryCard;
