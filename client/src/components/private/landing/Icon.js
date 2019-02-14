import React from "react";
import { Link } from "react-router-dom";

const Icon = props => {
  let button;
  if(props.disabled === "yes"){
    button = <Link to={"/" + props.route}>
          <button className="btn btn-block btn-danger" type="button" disabled>
            {props.buttontext}
          </button>
        </Link>;
  } else {
    button = <Link to={"/" + props.route}>
          <button className="btn btn-block btn-primary" type="button">
            {props.buttontext}
          </button>
        </Link>
  }
  
  return (
    <div className="col-3 card" style={{ width: "250px" }}>
      <i
        className={"fas fa-" + props.icon + " card-img-top text-center my-3"}
        style={{ fontSize: "150px" }}
      />
      <div className="card-body">
        <hr className="my-3" />
        <h4 className="card-title text-center">{props.title}</h4>
        <p className="card-text text-center">{props.description}</p>
      </div>
      <div className="card-footer">
        {button}
      </div>
    </div>
  );
};

export default Icon;
