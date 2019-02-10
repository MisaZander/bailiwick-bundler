module.exports = {
  RFToMongo: reduxFormObj => {
    let newDoc = {};
    newDoc.data = [];
    for (let key in reduxFormObj) {
      if (!isNaN(parseInt(key.charAt(key.length - 1)))) {
        //Add to data if last char is number
        //The last char in a data element will be a number
        let splits = key.split("text"); // ["texttype", "key"];
        newDoc.data.push({
          key: parseInt(splits[1]),
          texttype: splits[0],
          text: reduxFormObj[key]
        });
      } else {
        newDoc[key] = reduxFormObj[key];
      }
    }
    return newDoc;
  },

  MongoToRF: mongoData => {
    console.log(mongoData);
    let formData = {};
    for (let key in mongoData) {
      if (key === "data") {
        mongoData.data.forEach(element => {
          for (var arrKey in element) {
            if (element.hasOwnProperty(arrKey)) {
              if (
                arrKey === "key" ||
                arrKey === "texttype" ||
                arrKey === "_id"
              ) {
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
