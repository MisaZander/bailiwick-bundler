const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateUpdateInput(data) {
  let errors = {};

  //Validator.isEmpty will only pass on empty strings, not null or undef
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";

  if (!validator.isEmail(data.email)) {
    errors.email = "That is NOT valid email syntax.";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Please supply an email.";
  }

  if (validator.isEmpty(data.name)) {
    errors.name =
      "A man may have no name in Westeros, but in this website, a name is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
