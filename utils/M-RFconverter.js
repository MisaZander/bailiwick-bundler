module.exports = {
  RFToMongo: (
    reduxFormObj,
    cattypes = ["blurb", "finisher", "about", "contact"]
  ) => {
    //console.log("Incoming data", reduxFormObj);
    let newDoc = {};
    newDoc.data = [];
    for (let key in reduxFormObj) {
      if (!isNaN(parseInt(key.charAt(key.length - 1)))) {
        //Add to data if last char is number
        //The last char in a data element will be a number
        cattypes.forEach(cattype => {
          if (key.includes(cattype)) {
            newDoc.data.push({
              key: parseInt(key.charAt(key.length - 1)),
              cattype: cattype,
              texttype: key.substring(cattype.length, key.length - 1),
              text: reduxFormObj[key]
            });
          }
        });
      } else {
        newDoc[key] = reduxFormObj[key];
      }
    }
    //console.log("Outgoing doc", newDoc);
    return newDoc;
  },

  MongoToRF: (mongoData, exclusions = ["_id", "key", "texttype"]) => {
    //console.log(mongoData);
    let formData = {};
    for (let key in mongoData) {
      if (key === "data") {
        mongoData.data.forEach(e => {
          formData[e.cattype + e.texttype + e.key] = e.text;
        });
      } else {
        formData[key] = mongoData[key];
      }
    }
    return formData;
  }
};
