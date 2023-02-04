/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import Error from "./error";
import Loading from "./loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Country({ countries, setParameter, loading }) {
  // getting the country name form URL parameter
  const { name } = useParams();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
    setParameter(`/alpha/${name.toLowerCase()}`);
  }, [name]);

  return (
    <div className="container">
      {loading ? (
        <Loading />
      ) : countries.status !== 404 ? (
        <CountryPage country={countries} name={name} />
      ) : (
        <Error />
      )}
    </div>
  );
}

// component for country data
function CountryPage({ country, name }) {
  const [borders, setBorder] = useState([]);

  // for fetching the country borders
  const fetchBorders = useCallback(async () => {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/alpha?codes=${country[0].borders}`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchBorders().then((b) => {
      setBorder([...b]);
    });
  }, []);

  return (
    <>
      <Link to={"/"} className="back">
        <button className="back-home" id="back-btn">
          <FontAwesomeIcon icon={faArrowLeft} className="left-arrow" />
          back
        </button>
      </Link>
      <div className="country-info">
        <img
          className="flag"
          src={country[0].flags.svg}
          alt={country[0].name.common}
        />
        <section className="country-data">
          <h1 className="name">{country[0].name.common}</h1>
          <div className="details">
            <div className="data-type">
              native name:
              <span className="data">
                {` ${Object.values(country[0].name.nativeName)[0].common}`}
              </span>
            </div>
            <div className="data-type">
              population:
              <span className="data">
                {` ${country[0].population.toLocaleString("en-US")}`}
              </span>
            </div>
            <div className="data-type">
              region:
              <span className="data"> {country[0].region}</span>
            </div>
            <div className="data-type">
              sub region:
              <span className="data"> {country[0].subregion}</span>
            </div>
            <div className="data-type">
              capital:
              <span className="data"> {country[0].capital}</span>
            </div>
            <div className="data-type">
              top level domain:
              <span className="data"> {country[0].tld[0]}</span>
            </div>
            <div className="data-type">
              currencies:
              <span className="data">
                {` ${Object.values(country[0].currencies)[0].name}`}
              </span>
            </div>
            <div className="data-type">
              languages:
              <span className="data">
                {" "}
                {objectToArray(country[0].languages)}
              </span>
            </div>
          </div>
          <div className="borders">
            <div className="data-type">
              <p>border countries:</p> <Borders borders={borders} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

// country borders component
function Borders({ borders }) {
  return (
    <>
      {borders.length ? (
        <ul className="data">
          {borders.map((b, index) => {
            return (
              <li key={index} className="border">
                <Link to={`/name/${b.cca3}`}>{b.name.common}</Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="no-borders">no borders</div>
      )}
    </>
  );
}

// for converting object to array
const objectToArray = (object) => {
  let result = Object.keys(object).map((key) => object[key]);
  return result.join(", ");
};

export default Country;
