// ./models/User.js
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
    default: 0,
    get: v => Math.floor(v),
    set: v => Math.floor(v)
  },
  notes: [
    {
      text: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now()
      }
    }
  ]
});

module.exports = User = mongoose.model("User", UserSchema);
