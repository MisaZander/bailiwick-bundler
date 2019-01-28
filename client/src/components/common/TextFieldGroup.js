import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";

//I am a functional component. I don't directly alter state
const TextFieldGroup = ({
  name,
  placeholder,
  label,
  error,
  info,
  type,
  disabled
}) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <Field
        type={type}
        placeholder={placeholder}
        name={name}
        disabled={disabled}
        component={CustomInput}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

const CustomInput = props => (
  <input
    className={classnames("form-control form-control-lg", {
      "is-invalid": props.error
    })}
    placeholder={props.placeholder}
    value={props.value}
    onChange={props.onChange}
    {...props}
  />
);

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: "text"
};

//Export currently typed data to the Redux state
export default reduxForm({
  form: "TFGData",
  enableReinitialize: true
})(TextFieldGroup);
