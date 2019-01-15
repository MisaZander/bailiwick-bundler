import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getContent } from "../../../actions/contentActions";
import isEmpty from "../../../validation/is-empty";

import Right from "./Right";
import Left from "./Left";
//import mirror from "../../../img/gallery/mirror.png";
//import barber from "../../../img/gallery/Barber.png";
//import Finale from "./Finale";
import Spinner from "../../common/Spinner";
import ServerFault from "../../errors/ServerFault";

class Landing extends Component {
  componentDidMount() {
    this.props.getContent("landing");
  }

  render() {
    const { content, isLoading } = this.props.content;
    let title, blurbs;
    if (isEmpty(content) || isLoading) {
      //console.log("Adjust keep spinning spinning spinning...");
      title = <Spinner />;
    } else {
      if (!isEmpty(content) && !isLoading) {
        //const { content } = this.props.content;
        //console.log(content[0]);
        if (content[0].contentName !== "landing") {
          return <ServerFault />;
        }
        if (!isEmpty(content[0].title)) {
          //console.log("Rendering header");
          title = <h1 className="display-4 text-center">{content[0].title}</h1>;
        }
        //console.log("Assigning blurbs");
        blurbs = content[0].blurbs.map((blurb, index) => {
          return index % 2 === 0 ? (
            <Right key={index + 1} blurb={blurb} />
          ) : (
            <Left key={index + 1} blurb={blurb} />
          );
        });

        //TODO: Finale
      } else {
        //console.log(content.length);
        title = (
          <h4 className="text-center">
            Owner of this site needs to generate some content...
          </h4>
        );
      }
    }

    return (
      <div className="container border border-dark">
        {title}
        {blurbs}
      </div>
    );
  }
} // Landing class

// class Landing extends Component {
//   render() {
//     return (
//       <div className="container border border-dark">
//         <h1 className="display-4 text-center">
//           Your Search for a Dallas Model Ends Here!
//         </h1>
//         <Right
//           title="Need a Dallas Model?"
//           body="Got a spot at an upcoming fashion show you need to fill? Or want to show off a new style? Well look no further!"
//           linkVal="View Gallery"
//           linkA="/gallery"
//           img={mirror}
//         />
//         <Left
//           title="Or an Actress?"
//           body="Bring some real talent to the stage."
//           linkVal="See Some Photos"
//           linkA="/gallery/acting"
//           img={barber}
//         />
//         <Finale />
//       </div>
//     );
//   }
// }

Landing.propTypes = {
  content: PropTypes.object.isRequired,
  getContent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  content: state.content
});

export default connect(
  mapStateToProps,
  { getContent }
)(Landing);
