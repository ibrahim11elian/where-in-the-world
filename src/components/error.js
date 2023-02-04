import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="not-found">
      <Link to={"/"}>
        <button className="back-home">back home</button>
      </Link>
    </div>
  );
}

export default Error;
