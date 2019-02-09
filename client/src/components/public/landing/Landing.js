// ./client/src/components/public/landing/Landing.js
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getContent } from "../../../actions/contentActions";
import isEmpty from "../../../validation/is-empty";

import Right from "./Right";
import Left from "./Left";
import Finale from "./Finale";
import PubNavbar from "../layout/PubNavbar";
import Footer from "../layout/Footer";
import Spinner from "../../common/Spinner";
import ServerFault from "../../errors/ServerFault";

class Landing extends Component {
  componentDidMount() {
    this.props.getContent("landing", false);
  }

  render() {
    const { content, isLoading } = this.props.content;
    let title, calltoaction, blurbs, finale;
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
          title = <h1 className="display-4 text-center">{content[0].title}</h1>;
        }
        if (!isEmpty(content[0].calltoaction)) {
          calltoaction = content[0].calltoaction;
        } else {
          calltoaction = "";
        }
        let blurbData = content[0].data.filter(
          datapoint => datapoint.texttype === "blurb"
        );
        blurbs = blurbData.map((blurb, index) => {
          return index % 2 === 0 ? (
            <Right key={blurb.key} blurb={blurb} />
          ) : (
            <Left key={blurb.key} blurb={blurb} />
          );
        });

        let finaleData = content[0].data.filter(
          datapoint => datapoint.texttype === "finisher"
        );
        finale = <Finale finishers={finaleData} calltoaction={calltoaction} />;
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
      <div className="landing">
        <PubNavbar />
        <div className="container border border-dark">
          {title}
          {blurbs}
          {finale}
        </div>
        <Footer />
      </div>
    );
  }
} // Landing class

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
