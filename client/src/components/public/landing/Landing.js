import React, { Component } from "react";
import Right from "./Right";
import Left from "./Left";
import mirror from "../../../img/gallery/mirror.png";
import barber from "../../../img/gallery/Barber.png";
import Finale from "./Finale";

class Landing extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="display-4 text-center">
          Your Search for a Dallas Model Ends Here!
        </h1>
        <Right
          title="Need a Dallas Model?"
          body="Got a spot at an upcoming fashion show you need to fill? Or want to show off a new style? Well look no further!"
          linkVal="View Gallery"
          linkA="/gallery"
          img={mirror}
        />
        <Left
          title="Or an Actress?"
          body="Bring some real talent to the stage."
          linkVal="See Some Photos"
          linkA="/gallery/acting"
          img={barber}
        />
        <Finale />
      </div>
    );
  }
}

export default Landing;
