import React, { Component } from "react";
import Photo from "./Photo";

import headshot from "../../../img/gallery/facial.png";

class Gallery extends Component {
  render() {
    return (
      <div className="container border border-dark">
        <div className="row">
          <div className="col">
            <Photo
              img={headshot}
              title="Boom! Headshot"
              body="A poorly drawn headshot in MS Paint"
              uuid="afdbac"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Gallery;
