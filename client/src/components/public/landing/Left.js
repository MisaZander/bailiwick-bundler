// ./client/src/components/public/landing/Left.js
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Left extends Component {
  render() {
    const { blurb, value } = this.props;
    return (
      <div className="w-100">
        <hr />
        <div className="row">
          <div className="col-6">
            <img
              src={require("../../../img/gallery/" + blurb["blurbimg" + value])}
              alt=""
            />
          </div>
          <div className="col-6">
            <h3 className="text-center">{blurb["blurbtitle" + value]}</h3>
            <p className="lead text-center">{blurb["blurbtext" + value]}</p>
            <Link to={blurb["blurbahref" + value]}>
              <button type="button" className="btn btn-block btn-info">
                {blurb["blurbaval" + value]}
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Left;
