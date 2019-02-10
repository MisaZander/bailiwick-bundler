module.exports = {
  RFToMongo: reduxFormObj => {
    let newDoc = {};
    let index = 1; //An altered doc should probably be rekeyed
    newDoc.data = [];
    for (let key in reduxFormObj) {
      if (!isNaN(parseInt(key.charAt(key.length - 1)))) {
        //Add to data if last char is number
        //The last char in a data element will be a number
        let splits = key.split("text"); // ["texttype", "key"];
        newDoc.data.push({
          key: index,
          texttype: splits[0],
          text: reduxFormObj[key]
        });
        index++;
      } else {
        newDoc[key] = reduxFormObj[key];
      }
    }
    return newDoc;
  },

  MongoToRF: (mongoData, exclusions = ["_id", "key", "texttype"]) => {
    //console.log(mongoData);
    let formData = {};
    for (let key in mongoData) {
      if (key === "data") {
        mongoData.data.forEach(element => {
          for (var arrKey in element) {
            if (element.hasOwnProperty(arrKey)) {
              if (exclusions.indexOf(arrKey) !== -1) {
                continue;
              } else {
                formData[element.texttype + arrKey + element.key] =
                  element[arrKey];
              }
            }
          }
        });
      } else {
        formData[key] = mongoData[key];
      }
    }
    return formData;
  }
};
