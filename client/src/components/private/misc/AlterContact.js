// ./client/src/components/private/misc/AlterAbout.js
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFormValues, reduxForm } from "redux-form";

import { alterContent, getContent } from "../../../actions/contentActions";
import isEmpty from "../../../validation/is-empty";
import PrivNavbar from "../layout/PrivNavbar";
import Spinner from "../../common/Spinner";
import TextFieldGroup from "../../common/TextFieldGroup";
import docuparser from "../../../utils/M-RFconverter";

const selector = getFormValues("formData");

class AlterContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInitialized: false,
      fields: {}
    };
  }

  componentDidMount() {
    this.props.getContent("contact", true);
  }

  componentDidUpdate() {
    if (!isEmpty(this.props.content.content) && !this.state.isInitialized) {
      this.setState({
        isInitialized: true,
        fields: docuparser.MongoToRF(this.props.content.content[0])
      });
    }
  }

  commit = () => {
    let newDoc = {};
    for (let key in this.props.data) {
      //If property was taken out of state, it will be ignored
      if (this.props.data.hasOwnProperty(key)) {
        if (this.state.fields.hasOwnProperty(key)) {
          newDoc[key] = this.props.data[key];
        } else {
          continue;
        }
      }
    }
    this.props.alterContent("contact", newDoc);
    //console.log("Gonda send", newDoc);
  };

  render() {
    const { content, isLoading } = this.props.content;
    let renderables;

    if (isEmpty(content) || isLoading) {
      renderables = <Spinner />;
    } else {
      //Classic "OR" condition
      if (content[0].contentName === "contact") {
        //Extra percaution
        const fields = [];
        //let index = 0;
        for (let key in this.state.fields) {
          if (this.state.fields.hasOwnProperty(key)) {
            if (key.includes("contact")) {
              fields.push(
                <TextFieldGroup
                  key={parseInt(key.charAt(key.length - 1))}
                  name={key}
                  type="text"
                  placeholder=""
                  label={key.substring(7, key.length - 1)}
                />
              );
            }
          }
        }

        renderables = (
          <form>
            <h1 className="display-4 text-center">About You</h1>
            <hr className="my-3" />
            {fields}
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={this.commit}
            >
              Save Changes
            </button>
          </form>
        ); //renderables = ()
      } // if content = about
    } // if not loading

    return (
      <div>
        <PrivNavbar />
        <div className="container border border-dark">{renderables}</div>
      </div>
    );
  }
}

AlterContact.propTypes = {
  auth: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
  getContent: PropTypes.func.isRequired
};

AlterContact = reduxForm({
  form: "aboutForm"
})(AlterContact);

export default connect(
  state => ({
    auth: state.auth,
    content: state.content,
    data: selector(state)
  }),
  { alterContent, getContent }
)(AlterContact);
