const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AboutSchema = new Schema({
  contentName: {
    type: String,
    required: true
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

module.exports = About = mongoose.model("About", AboutSchema, "contents");
