import React from "react";

const ServerFault = () => {
  return (
    <div>
      <div className="text-center">
        <img
          src={require("../../img/fear.png")}
          width="229"
          height="200"
          alt="Fear"
        />
      </div>
      <h1 className="text-center">
        <span className="text-danger">500</span> ERROR
      </h1>
      <h2 className="text-center">WHAT DID YOU DO!?</h2>
    </div>
  );
};

export default ServerFault;
