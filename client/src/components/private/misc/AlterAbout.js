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
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import docuparser from "../../../utils/M-RFconverter";

const selector = getFormValues("formData");

class AlterAbout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInitialized: false,
      fields: {}
    };
  }

  componentDidMount() {
    this.props.getContent("about", true);
  }

  componentDidUpdate() {
    if (!isEmpty(this.props.content.content) && !this.state.isInitialized) {
      this.setState({
        isInitialized: true,
        fields: docuparser.MongoToRF(this.props.content.content[0])
      });
    }
  }

  addField = type => {
    //This should tack on a new field to the DB
    //.then() should fetch new content
    let newKey =
      "about" + type + (this.props.content.content[0].data.length + 1);
    let newState = this.state;
    newState.fields[newKey] = "";
    this.setState(newState);
  };

  spliceField = field => {
    //Much like ES6 filter, don't include passed field in new state
    let newState = {},
      oldState = this.state.fields;
    console.log(field);
    console.log(oldState);
    for (let key in oldState) {
      if (oldState.hasOwnProperty(key)) {
        if (key === field) {
          continue; //Wanna splice, skip it
        } else {
          newState[key] = oldState[key];
        }
      }
    }
    console.log(newState);
    this.setState({ fields: newState });
  };

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
    this.props.alterContent("about", newDoc);
    //console.log("Gonda send", newDoc);
  };

  render() {
    const { content, isLoading } = this.props.content;
    let renderables;

    if (isEmpty(content) || isLoading) {
      renderables = <Spinner />;
    } else {
      //Classic "OR" condition
      if (content[0].contentName === "about") {
        //Extra percaution
        const fields = [];
        for (let key in this.state.fields) {
          if (this.state.fields.hasOwnProperty(key)) {
            if (key === "title") {
              continue;
            } else {
              if (key.includes("headline")) {
                fields.push(
                  <div key={parseInt(key.charAt(key.length - 1))}>
                    <TextFieldGroup
                      key={parseInt(key.charAt(key.length - 1))}
                      name={key}
                      type="text"
                      placeholder="Enter a headline..."
                      label="Headline:"
                    />
                    <button
                      type="button"
                      className="btn btn-small btn-danger"
                      onClick={() => this.spliceField(key)}
                    >
                      Delete Headline
                    </button>
                  </div>
                );
              } else if (key.includes("body")) {
                fields.push(
                  <div key={parseInt(key.charAt(key.length - 1))}>
                    <TextAreaFieldGroup
                      key={parseInt(key.charAt(key.length - 1))}
                      name={key}
                      placeholder="Enter body text..."
                      label="Body Paragraph:"
                    />
                    <button
                      type="button"
                      className="btn btn-small btn-danger"
                      onClick={() => this.spliceField(key)}
                    >
                      Delete Body Paragraph
                    </button>
                  </div>
                );
              }
            }
          }
        }

        renderables = (
          <form>
            <h1 className="display-4 text-center">About You</h1>
            <TextFieldGroup
              name="title"
              type="text"
              placeholder="Enter a title for this page..."
              label="Page Title"
            />
            <hr className="my-3" />
            {fields}
            <button
              type="button"
              className="btn btn-lg btn-light"
              onClick={() => this.addField("headline")}
            >
              Add Headline
            </button>
            {"    "}
            <button
              type="button"
              className="btn btn-lg btn-dark"
              onClick={() => this.addField("body")}
            >
              Add Body Paragraph
            </button>
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

AlterAbout.propTypes = {
  auth: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
  getContent: PropTypes.func.isRequired
};

AlterAbout = reduxForm({
  form: "aboutForm"
})(AlterAbout);

export default connect(
  state => ({
    auth: state.auth,
    content: state.content,
    data: selector(state)
  }),
  { alterContent, getContent }
)(AlterAbout);
