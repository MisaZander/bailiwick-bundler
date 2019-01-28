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
  body: {
    type: String
  }
});

module.exports = About = mongoose.model("About", AboutSchema);
