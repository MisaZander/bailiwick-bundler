const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SettingSchema = new Schema({
  contact: {
    options: [String],
    selected: String
  }
});

module.exports = Setting = mongoose.model("Setting", SettingSchema);
