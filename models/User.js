const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String
  },
  hash: {
    type: String,
    required: true
  },
  userlevel: {
    type: Number,
    default: 0
  }
});

module.exports = User = mongoose.model("User", UserSchema);
