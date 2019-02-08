const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  contentname: {
    type: String,
    required: true
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
      }
    }
  ]
});

module.exports = Contact = mongoose.model("contact", ContactSchema, "contents");
