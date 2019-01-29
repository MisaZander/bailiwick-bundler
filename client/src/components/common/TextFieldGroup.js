import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
//import isEmpty from "../../validation/is-empty";
const error = value => (value ? value : undefined);

//I am a functional component. I don't directly alter state
let TextFieldGroup = props => {
  return (
    <Field
      type={props.type}
      name={props.name}
      component={customInput}
      validate={error}
      {...{ props }}
    />
  );
};

const customInput = props => {
  return (
    <div className="form-group">
      {props.label && <label htmlFor={props.name}>{props.label}</label>}
      <input
        type={props.type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": props.errors[props.name]
        })}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
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

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  info: PropTypes.string,
  errors: PropTypes.object,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: "text"
};

//Export currently typed data to the Redux state
TextFieldGroup = reduxForm({
  form: "TFGData",
  enableReinitialize: true
})(TextFieldGroup);

export default connect(
  state => ({
    errors: state.errors
  }),
  {}
)(TextFieldGroup);
