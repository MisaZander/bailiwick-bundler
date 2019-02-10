import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Field, reduxForm } from "redux-form";

//I am a functional component. I don't directly alter state
let TextAreaFieldGroup = props => {
  return (
    <Field
      type="textarea"
      name={props.name}
      component={customInput}
      {...{ props }}
    />
  );
};

const customInput = props => {
  return (
    <div className="form-group">
      {props.label && <label htmlFor={props.name}>{props.label}</label>}
      <textarea
        {...props.input}
        className={classnames("form-control form-control-lg", {
          "is-invalid": props.errors[props.name]
        })}
        placeholder={props.placeholder}
        name={props.name}
        rows="10"
        cols="40"
      />
      {props.info && (
        <small className="form-text text-muted">{props.info}</small>
      )}
      {props.errors[props.name] && (
        <div className="invalid-feedback">{props.errors[props.name]}</div>
      )}
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string
};

TextAreaFieldGroup = reduxForm({
  form: "formData",
  enableReinitialize: true,
  destroyOnUnmount: false
})(TextAreaFieldGroup);

export default connect(
  state => ({
    errors: state.errors
  }),
  null
)(TextAreaFieldGroup);
