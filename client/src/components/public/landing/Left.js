// ./client/src/components/public/landing/Left.js
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Left extends Component {
  render() {
    const { blurb } = this.props;
    return (
      <div className="w-100">
        <hr />
        <div className="row">
          <div className="col-6">
            <img src={require("../../../img/gallery/" + blurb.img)} alt="" />
          </div>
          <div className="col-6">
            <h3 className="text-center">{blurb.title}</h3>
            <p className="lead text-center">{blurb.text}</p>
            <Link to={blurb.ahref}>
              <button type="button" className="btn btn-block btn-info">
                {blurb.aval}
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Left;
