import React from "react";
import profilepic from "../../../img/gallery/munroe-3a.jpg";

const CallingCard = props => {
  return (
    <div className="container card card-body">
      <div className="row">
        <div className="col-3 text-center">
          <img src={profilepic} alt="Moi" className="rounded-circle border" />
        </div>
        <div className="col-9 bg-light">
          <h3 className="my-3">{props.deets.name}</h3>
          <p className="lead">Email: {props.deets.email}</p>
          <p>Phone: {props.deets.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default CallingCard;
