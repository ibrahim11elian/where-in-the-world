import React from "react";
import ClockLoader from "react-spinners/ClockLoader";

function Loading({ theme }) {
  return (
    <div className="loading">
      <ClockLoader
        color={theme === "light" ? "#202c37" : "#fafafa"}
        loading
        size={100}
        speedMultiplier={2}
      />
    </div>
  );
}

export default Loading;
