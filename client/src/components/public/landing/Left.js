import React, { Component } from "react";
import { Link } from "react-router-dom";

class Left extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-6">
          <img src={this.props.img} alt="" />
        </div>
        <div className="col-6">
          <h3 className="text-center">{this.props.title}</h3>
          <p className="lead text-center">{this.props.body}</p>
          <Link to={this.props.linkA}>
            <button type="button" className="btn btn-block btn-info">
              {this.props.linkVal}
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Left;
