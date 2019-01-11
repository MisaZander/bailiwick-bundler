import React from "react";

const NotFound = () => {
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
        <span className="text-danger">404</span> ERROR
      </h1>
      <h2 className="text-center">YOU HASSLED THE HOFF</h2>
    </div>
  );
};

export default NotFound;
