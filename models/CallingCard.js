const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CallingCardSchema = new Schema({
  contentName: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  }
});

module.exports = CallingCard = mongoose.model(
  "CallingCard",
  CallingCardSchema,
  "contents"
);
