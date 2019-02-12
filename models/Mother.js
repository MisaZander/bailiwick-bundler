const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MotherOfAllSchemas = new Schema({
  contentname: {
    type: String,
    required: true
  },
  calltoaction: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  },
  mode: {
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

module.exports = Mother = mongoose.model(
  "Mother",
  MotherOfAllSchemas,
  "contents"
);
