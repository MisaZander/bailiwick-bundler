import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getContent } from "../../../actions/contentActions";
import isEmpty from "../../../validation/is-empty";

import Spinner from "../../common/Spinner";
import ServerFault from "../../errors/ServerFault";

class About extends Component {
  componentDidMount() {
    this.props.getContent("about");
  }

  render() {
    const { content, isLoading } = this.props.content;
    let title, body;

    if (isEmpty(content) || isLoading) {
      title = <Spinner />;
    } else {
      if (!isEmpty(content) && !isLoading) {
        //If wrong document returned
        if (content[0].contentName !== "about") {
          return <ServerFault />;
        }
        //If title is assigned. Must check beforehand or error will be thrown on render
        if (!isEmpty(content[0].title)) {
          title = <h1 className="display-4 text-center">{content[0].title}</h1>;
        }
        //TODO: Render data array
        body = content[0].data.map(element => {
          if (element.texttype === "headline") {
            return <h3 key={element.key}>{element.text}</h3>;
          } else if (element.texttype === "body") {
            return (
              <p className="lead" key={element.key}>
                {element.text}
              </p>
            );
          }
          return null;
        });
      } else {
        //Request site owner generate some content
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
        {body}
      </div>
    );
  }
}

About.propTypes = {
  content: PropTypes.object.isRequired,
  getContent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  content: state.content
});

export default connect(
  mapStateToProps,
  { getContent }
)(About);
