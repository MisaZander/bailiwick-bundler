const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  //Validator.isEmpty will only pass on empty strings, not null or undef
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isEmail(data.email)) {
    errors.email = "That is NOT valid email syntax.";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Please supply an email.";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Please supply a password";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
