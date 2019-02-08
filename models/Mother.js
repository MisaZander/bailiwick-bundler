const mongose = require("mongoose");
const Schema = mongose.Schema;

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
      ahref: {
        type: String
      },
      aval: {
        type: String
      },
      category: {
        type: String
      },
      event: {
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
      },
      title: {
        type: String
      }
    }
  ]
});

module.exports = MotherOfAllSchemas;
