// ./models/Landing.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const LandingSchema = new Schema({
  title: {
    type: String
  },
  blurbs: [
    {
      title: {
        type: String,
        required: true
      },
      body: {
        type: String,
        required: true
      },
      ahref: {
        type: String,
        required: true
      },
      aval: {
        type: String,
        required: true
      },
      img: {
        type: String,
        required: true
      }
    }
  ],
  calltoaction: {
    type: String
  },
  finishers: [
    {
      body: {
        type: String,
        required: true
      },
      ahref: {
        type: String,
        required: true
      },
      aval: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = Landing = mongoose.model("Landing", LandingSchema);
