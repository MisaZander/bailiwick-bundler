import React from "react";
import spinner from "./spinner.gif";

export default () => {
  return (
    <div>
      <img
        src={spinner}
        alt="Loading..."
        style={{ margin: "auto", display: "block" }}
      />
      <h1 className="text-center">Loading, please wait...</h1>
    </div>
  );
};
