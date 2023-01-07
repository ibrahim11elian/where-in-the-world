import React from "react";

function NotFound({ theme }) {
  return (
    <div className="not-found">
      <img
        src={
          theme === "light"
            ? "./images/error-404-light.gif"
            : "./images/error-404-dark.gif"
        }
        alt=""
      />
    </div>
  );
}

export default NotFound;
