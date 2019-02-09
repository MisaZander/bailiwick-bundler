// ./models/Landing.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const LandingSchema = new Schema({
  contentname: {
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
      ahref: {
        type: String
      },
      aval: {
        type: String
      },
      fieldname: {
        type: String,
        required: true
      },
      img: {
        type: String
      },
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
      title: {
        type: String
      }
    }
  ]
});

module.exports = Landing = mongoose.model("Landing", LandingSchema, "contents");
