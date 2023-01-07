import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

function Header({ toggleTheme, theme }) {
  return (
    <div className="header">
      <div className="nav container">
        <div className="logo">where in the world ?</div>
        <div className="switch-theme" onClick={() => toggleTheme()}>
          <div className="theme-icon">
            <FontAwesomeIcon icon={theme === "light" ? faSun : faMoon} />
          </div>
          Dark mode
        </div>
      </div>
    </div>
  );
}

export default Header;
