import React, { Component } from "react";
import Photo from "./Photo";
import PubNavbar from "../layout/PubNavbar";
import Footer from "../layout/Footer";

import headshot from "../../../img/gallery/facial.png";

class Gallery extends Component {
  render() {
    return (
      <div className="gallery">
        <PubNavbar />
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
        <Footer />
      </div>
    );
  }
}

export default Gallery;
