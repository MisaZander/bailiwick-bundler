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
      title = <Spinner />;
    } else {
      if (!isEmpty(content) && !isLoading) {
        //const { content } = this.props.content;
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
        let blurbRawData = content[0].data.filter(
          datapoint => datapoint.cattype === "blurb"
        );

        let blurbData = [];
        if (!isEmpty(blurbRawData)) {
          blurbRawData.forEach(fragment => {
            if (blurbData.length < fragment.key) {
              blurbData.push({});
            }
            blurbData[fragment.key - 1][
              fragment.cattype + fragment.texttype + fragment.key
            ] = fragment.text;
          });
        }

        blurbs = blurbData.map((blurb, index) => {
          return index % 2 === 0 ? (
            <Right key={index + 1} value={index + 1} blurb={blurb} />
          ) : (
            <Left key={index + 1} value={index + 1} blurb={blurb} />
          );
        });

        let finaleRawData = content[0].data.filter(
          datapoint => datapoint.cattype === "finisher"
        );

        let finaleData = [];
        if (!isEmpty(finaleRawData)) {
          finaleRawData.forEach(fragment => {
            if (finaleData.length < fragment.key) {
              finaleData.push({});
            }
            finaleData[fragment.key - 1][
              fragment.cattype + fragment.texttype + fragment.key
            ] = fragment.text;
          });
        }

        finale = <Finale finishers={finaleData} calltoaction={calltoaction} />;
      } else {
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
