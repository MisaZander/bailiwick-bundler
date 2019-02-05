import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Form from "./Form";
import PubNavbar from "../layout/PubNavbar";
import Footer from "../layout/Footer";
import { getContent } from "../../../actions/contentActions";
import isEmpty from "../../../validation/is-empty";

//import ServerFault from "../../errors/ServerFault";
import Spinner from "../../common/Spinner";

class Contact extends Component {
  componentDidMount() {
    this.props.getContent("contact");
  }

  render() {
    const { content, isLoading } = this.props.content;
    let renderables;
    if (isEmpty(content) || isLoading) {
      renderables = <Spinner />;
    } else {
      if (!isEmpty(content) && !isLoading) {
        //Conditially render calling card or form here
        if (content[0].mode === "Calling Card") {
          //TODO: create a CallingCard component
        } else if (content[0].mode === "Anonymous Form") {
          renderables = <Form />;
        }
      } else {
        renderables = (
          <h4 className="text-center">
            Site owner would prefer to remain anonymous
          </h4>
        );
      }
    }

    return (
      <div className="contact-form">
        <PubNavbar />
        <div className="container border border-dark">{renderables}</div>
        <Footer />
      </div>
    );
  }
}

Contact.propTypes = {
  content: PropTypes.object.isRequired,
  getContent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  content: state.content
});

export default connect(
  mapStateToProps,
  { getContent }
)(Contact);
