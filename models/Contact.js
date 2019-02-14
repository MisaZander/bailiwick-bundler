const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  contentName: {
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
      key: {
        type: Number,
        required: true
      },
      text: {
        type: String,
        required: true
      },
      texttype: {
        type: String,
        required: true
      },
      cattype: {
        type: String
      }
    }
  ]
});

module.exports = Contact = mongoose.model("contact", ContactSchema, "contents");
