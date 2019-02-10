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

const selector = getFormValues("formData");
//const areaSelector = formValueSelector("TAFGData");

class AlterAbout extends Component {
  componentDidMount() {
    this.props.getContent("about", true);
  }

  addField = type => {
    //This should tack on a new field to the DB
    //.then() should fetch new content
  };

  spliceField = key => {
    //This should splice out a document from data
    //.then() should fetch the new data
  };

  commit = () => {
    this.props.alterContent("about", this.props.data);
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
            {content[0].data.map(datapoint => {
              if (datapoint.texttype === "headline") {
                return (
                  <TextFieldGroup
                    key={datapoint.key}
                    name={datapoint.texttype + "text" + datapoint.key}
                    type="text"
                    placeholder="Enter a headline..."
                    label="Headline:"
                  />
                );
              } else if (datapoint.texttype === "body") {
                return (
                  <TextAreaFieldGroup
                    key={datapoint.key}
                    name={datapoint.texttype + "text" + datapoint.key}
                    placeholder="Enter body text..."
                    label="Body Paragraph:"
                  />
                );
              }
              return null;
            })}
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
