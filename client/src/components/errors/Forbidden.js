import React from "react";
import { Link } from "react-router-dom";

const Restricted = () => {
  return (
    <div>
      <div className="text-center">
        <img
          src={require("../../img/puppyhoff.jpg")}
          width="299"
          height="282"
          alt="Hoff Hassled"
        />
      </div>
      <h1 className="text-center">
        <span className="text-danger">403</span> ERROR
      </h1>
      <h2 className="text-center">YOU HASSLED THE HOFF</h2>
      <Link to="/">
        <p className="lead text-center">Go Home</p>
      </Link>
    </div>
  );
};

export default Restricted;
