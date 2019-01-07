const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  //Validator.isEmpty will only pass on empty strings, not null or undef
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.passwordVerify = !isEmpty(data.passwordVerify)
    ? data.passwordVerify
    : "";

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be 2-30 chars long";
  }

  if (validator.isEmpty(data.name)) {
    errors.name =
      "A man may have no name in Westeros but in this website, a name is required.";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "That is NOT valid email syntax.";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "How ever will we reach out to you?";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Protect your crap!";
  }

  if (!validator.isLength(data.password, { min: 5, max: 30 })) {
    errors.password = "Password must be 5-30 chars long";
  }

  if (!validator.equals(data.password, data.passwordVerify)) {
    errors.passwordVerify = "The passwords do not match.";
  }

  if (validator.isEmpty(data.passwordVerify)) {
    errors.passwordVerify = "Fill this part in too.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
