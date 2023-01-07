import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";
import ClockLoader from "react-spinners/ClockLoader";
import { useFetch } from "./hooks/usefetch";
import Header from "./components/header";
import SearchFilter from "./components/search_filter";
import Countries from "./components/countries";
import ScrollToTop from "react-scroll-to-top";
import NotFound from "./components/not-found";
import Developer from "./components/developer";

const apiUrl = "https://restcountries.com/v3.1";
function App() {
  const [parameter, setParameter] = useState("/all");
  const { loading, countries, setCountries } = useFetch(
    `${apiUrl}${parameter}`
  );
  const [query, setQuery] = useState("");
  // theme state
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // toggle theme, save it to local storage
  const toggleTheme = () => {
    setTheme((curThem) => (curThem = theme === "light" ? "dark" : "light"));
    if (theme === "light") {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  };
  return (
    <div className="App" theme={theme}>
      <Header toggleTheme={toggleTheme} theme={theme} />
      <SearchFilter
        countries={countries}
        setCountries={setCountries}
        query={query}
        setQuery={setQuery}
        setParameter={setParameter}
        parameter={parameter}
      />
      {loading ? (
        <div className="loading">
          <ClockLoader
            color={theme === "light" ? "#202c37" : "#fafafa"}
            loading
            size={100}
            speedMultiplier={2}
          />
        </div>
      ) : countries.status !== 404 ? (
        <Countries countries={countries} />
      ) : (
        <NotFound theme={theme} />
      )}

      <Developer />
      <ScrollToTop
        smooth
        top={700}
        component={<FontAwesomeIcon icon={faAngleDoubleUp} />}
      />
    </div>
  );
}

export default App;
