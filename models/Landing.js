// ./models/Landing.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const LandingSchema = new Schema({
  contentName: {
    type: String,
    required: true
  },
  calltoaction: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  data: [
    {
      key: {
        type: Number,
        required: true
      },
      text: {
        type: String,
        required: true
      },
      texttype: {
        type: String
      },
      cattype: {
        type: String
      }
    }
  ]
});

module.exports = Landing = mongoose.model("Landing", LandingSchema, "contents");
