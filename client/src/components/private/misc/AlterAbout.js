import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { formValueSelector, FieldArray, reduxForm } from "redux-form";

import { getContent } from "../../../actions/contentActions";
import isEmpty from "../../../validation/is-empty";
import PrivNavbar from "../layout/PrivNavbar";
import Spinner from "../../common/Spinner";
import TextFieldGroup from "../../common/TextFieldGroup";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";

//const inputSelector = formValueSelector("TFGData");
//const areaSelector = formValueSelector("TAFGData");

class AlterAbout extends Component {
  componentDidMount() {
    this.props.getContent("about");
  }

  addField = type => {};

  spliceField = key => {};

  commit = () => {
    //Send state data to backend
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
            {renderForm(content[0])}
            {/* Add submit button */}
          </form>
        );
      }
    }

    return (
      <div>
        <PrivNavbar />
        <div className="container border border-dark">{renderables}</div>
      </div>
    );
  }
}

const renderForm = fields => {
  return (
    <div>
      <TextFieldGroup
        name="title"
        type="text"
        placeholder="Enter a title for this page..."
        label="Page Title"
      />
      <hr className="my-3" />
      {fields.data.map(datapoint => {
        if (datapoint.texttype === "headline") {
          return (
            <TextFieldGroup
              key={datapoint.key}
              name={"h" + datapoint.key}
              type="text"
              placeholder="Enter a headline"
              label="Headline:"
            />
          );
        } else if (datapoint.texttype === "body") {
          return (
            <TextAreaFieldGroup
              key={datapoint.key}
              name={"b" + datapoint.key}
              placeholder="Enter body text..."
              label="Body Paragraph:"
            />
          );
        }
        return null;
      })}
    </div>
  );
};

// content[0].data.map(element => {
//   if(element.texttype === "headline") {
//     return <TextFieldGroup key={element.key} name={"h" + element.key} type="text" placeholder="Enter a headline" label="Headline:" />;
//   } else if (element.texttype === "body") {
//     return <TextAreaFieldGroup key={element.key} name={"b" + element.key} placeholder="Enter body text..." label="Body Paragraph:" />;
//   }
//   return null;
// });

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
    content: state.content
  }),
  { getContent }
)(AlterAbout);
