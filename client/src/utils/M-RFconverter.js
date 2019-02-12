export default {
  RFToMongo: (
    reduxFormObj,
    cattypes = ["blurb", "finisher", "about", "contact"]
  ) => {
    let newDoc = {};
    newDoc.data = [];
    for (let key in reduxFormObj) {
      if (!isNaN(parseInt(key.charAt(key.length - 1)))) {
        //Add to data if last char is number
        //The last char in a data element will be a number
        cattypes.forEach(cattype => {
          if (key.includes(cattype)) {
            newDoc.push({
              key: parseInt(key.charAt(key.length - 1)),
              cattype: cattype,
              texttype: key.substring(cattype.length - 1, key.length - 2),
              text: reduxFormObj[key]
            });
          }
        });
      } else {
        newDoc[key] = reduxFormObj[key];
      }
    }
    return newDoc;
  },

  MongoToRF: mongoData => {
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
