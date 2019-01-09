import React, { Component } from "react";
import { Link } from "react-router-dom";

class Photo extends Component {
  render() {
    return (
      <div className="card" style={{ width: "30%" }}>
        <img src={this.props.img} alt="" className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title text-center">{this.props.title}</h5>
          <p className="card-text text-center">{this.props.body}</p>
          <Link to={"/gallery/photo/" + this.props.uuid}>
            <button className="btn btn-primary" type="button">
              View
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Photo;
