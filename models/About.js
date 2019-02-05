const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AboutSchema = new Schema({
  contentName: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String
  },
  data: [
    {
      texttype: {
        type: String
      },
      text: {
        type: String
      },
      key: {
        type: Number,
        unique: true
      }
    }
  ]
});

module.exports = About = mongoose.model("About", AboutSchema, "contents");
