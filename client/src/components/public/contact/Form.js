import React, { Component } from "react";
import TextFieldGroup from "../../common/TextFieldGroup";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { formValueSelector } from "redux-form";

const inputSelector = formValueSelector("TFGData");
const areaSelector = formValueSelector("TAFGData");

class Form extends Component {
  componentWillMount() {}

  onSubmit = e => {
    //Query the API action
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <TextFieldGroup
            label="Name:"
            name="name"
            placeholder="Enter your name (required)..."
          />
          <TextFieldGroup
            label="Email:"
            name="email"
            type="email"
            placeholder="Enter your email (required) ..."
          />
          <TextFieldGroup
            label="Phone Number:"
            name="phone"
            placeholder="(###) ###-#### x#### (recommended field)"
          />
          <TextAreaFieldGroup
            label="Message:"
            name="message"
            placeholder="A message to send..."
          />
          <input
            type="submit"
            value="Send Message"
            className="btn btn-block btn-success mt-4"
          />
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  auth: PropTypes.object.isRequired
};

export default connect(
  state => ({
    auth: state.auth,
    name: inputSelector(state, "name"),
    email: inputSelector(state, "email"),
    phone: inputSelector(state, "phone"),
    message: areaSelector(state, "message")
  }),
  {}
)(Form);
