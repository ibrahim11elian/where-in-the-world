import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";
import { useFetch } from "./hooks/usefetch";

import Header from "./components/header";
import SearchFilter from "./components/search_filter";
import Countries from "./components/countries";
import Country from "./components/country";
import ScrollToTop from "react-scroll-to-top";
import Developer from "./components/developer";
import Error from "./components/error";

// base API url
const apiUrl = "https://restcountries.com/v3.1";

function App() {
  const [parameter, setParameter] = useState("/all");
  // search query
  const [query, setQuery] = useState("");
  // theme state
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const { loading, countries } = useFetch(`${apiUrl}${parameter}`);

  // toggle theme, save it to local storage
  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
    if (theme === "light") {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="App" theme={theme}>
      <Header toggleTheme={toggleTheme} theme={theme} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchFilter
                query={query}
                setQuery={setQuery}
                setParameter={setParameter}
              />
              <Countries
                countries={countries}
                loading={loading}
                setParameter={setParameter}
                setQuery={setQuery}
                theme={theme}
              />
            </>
          }
        />

        <Route
          path="/name/:name"
          element={
            <Country
              countries={countries}
              loading={loading}
              setParameter={setParameter}
              apiUrl={apiUrl}
              theme={theme}
            />
          }
        />

        <Route path="/*" element={<Error />} />
      </Routes>

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
