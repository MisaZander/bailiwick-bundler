// ./routes/api/content.js
const express = require("express");
const router = express.Router();
const Landing = require("../../models/Landing"); //Landing model, with mongoose methods included
const About = require("../../models/About");
const Setting = require("../../models/Setting");
const Contact = require("../../models/Contact");
const Mother = require("../../models/Mother");
const passport = require("passport");

const isEmpty = require("../../validation/is-empty");

//@route GET /api/content/about
//@desc Obtain all the about content
//@access Public
router.get("/about", (req, res) => {
  const errors = {};
  About.find({ contentName: "about" }).exec((err, about) => {
    if (err) {
      errors.err = err;
      return res.status(404).json(errors);
    }
    //This returns an array, even if there's a single result
    return res.status(200).json(about);
  }); //About.find.exec()
}); //router.get()

//@route POST /api/content/about
//@desc Rewrite the about content
//@access Private
// router.post(
//   "/about",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const errors = {};

//     //Are you even allowed to mess with this?
//     if (req.user.userlevel === 0) {
//       errors.forbidden =
//         "You do not have the necessary authority to perform that action";
//       return res.status(403).json(errors);
//     }
//     //TODO: Call input validator
//     // const { contentName, title, data } = req.body;

//     // const newAbout = new About({
//     //   contentName,
//     //   title,
//     //   data
//     // }); //new About()

//     //Parse the data into a Mongo friendly format

//     newAbout.save((err, about) => {
//       if (err) {
//         console.log("About saving error", err);
//         errors.err = err;
//         return res.status(400).json(errors);
//       }
//       return res.status(200).json(about);
//     }); //newAbout.save()
//   }
// ); //router.post()

//@route GET /api/content/contact
//@desc Obtain the contact deets
//@access Public
router.get("/contact", (req, res) => {
  const errors = {};
  //Obtain the contact preferences
  Setting.find().exec((err, settingRes) => {
    if (err) {
      console.log(err);
      errors.err = err;
      return res.status(404).json(errors);
    }
    //Calling Card or Form?
    let preference = settingRes[0].contact.selected;
    if (preference === "Calling Card") {
      Contact.find({ contentName: "contact" }).exec((err2, deets) => {
        if (err2) {
          console.log(err2);
          errors.err = err2;
          return res.status(404).json(errors);
        }
        let { contentName, title, mode, data } = deets[0];
        let newDeetsObj = {
          mode,
          contentName,
          title
        };
        data.forEach(datapoint => {
          newDeetsObj[datapoint.texttype] = datapoint.text;
        });
        let newDeets = [];
        newDeets.push(newDeetsObj); //All front end handlers expect an array response
        return res.status(200).send(newDeets);
      }); //Calling Card find()
    } else if (preference === "Anonymous Form") {
      let responseObj = { contentName: "contact", mode: "Anonymous Form" };
      let response = [];
      response.push(responseObj);
      return res.status(200).send(response);
    }
  }); // Setting find
});

//@route POST /api/content/contact
//@desc Update calling card
//@access Private
// router.post(
//   "/contact",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const errors = {};

//     //Are you even allowed to mess with this?
//     if (req.user.userlevel < 2) {
//       errors.forbidden =
//         "You do not have the necessary authority to perform that action";
//       return res.status(403).json(errors);
//     }
//     //TODO: Call input validator
//     const { contentName, name, email, phone } = req.body;

//     const newContact = new Contact({
//       contentName,
//       name,
//       email,
//       phone
//     }); //new CallingCard()

//     newContact.save((err, card) => {
//       if (err) {
//         console.log("Calling Card save error", err);
//         errors.err = err;
//         return res.status(400).json(errors);
//       }
//       return res.status(200).json(card);
//     }); //newCC.save()
//   }
// ); //router.post()

//@route GET /api/content
//@desc Obtain all the landing content
//@access Public
router.get("/", (req, res) => {
  const errors = {};
  Landing.find({ contentName: "landing" }).exec((err, landing) => {
    if (err) {
      errors.err = err;
      return res.status(404).json(errors);
    }
    //This returns an array, even if there's a single result
    return res.status(200).json(landing);
  }); //Landing.find.exec()
}); //router.get()

//@route POST /api/content
//@desc Rewrite the landing content
//@access Private
// router.post(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const errors = {};

//     //Are you even allowed to mess with this?
//     if (req.user.userlevel === 0) {
//       errors.forbidden =
//         "You do not have the necessary authority to perform that action";
//       return res.status(403).json(errors);
//     }
//     //TODO: Call input validator
//     const { contentName, title, calltoaction, data } = req.body;

//     const newLanding = new Landing({
//       contentName,
//       title,
//       calltoaction,
//       data
//     }); //new Landing()

//     newLanding.save((err, landing) => {
//       if (err) {
//         console.log("Landing save error", err);
//         errors.err = err;
//         return res.status(400).json(errors);
//       }
//       return res.status(200).json(landing);
//     }); //newLanding.save()
//   }
// ); //router.post()

//@route POST /api/content/:target
//@desc Rewrite target content
//@access Private
router.put(
  "/:target",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    //Are you even allowed to mess with this?
    if (req.user.userlevel === 0) {
      errors.forbidden =
        "You do not have the necessary authority to perform that action";
      return res.status(403).json(errors);
    }

    //console.log("req.body: ", req.body); //req.body ONLY contains submitted data
    const parsedDocument = docuparser(req.body); //Turn Redux-Form values into a Mongo document
    //return res.status(200).json(parsedDocument);
    Mother.findOneAndUpdate(
      { contentName: req.params.target },
      parsedDocument,
      { new: true }
    ).exec((err, newDoc) => {
      if (err) {
        console.log(err);
        errors.err = err;
        return res.status(500).json(errors);
      }
      console.log("newDoc Response:", newDoc);
      return res.status(200).json(newDoc);
    });

    // //TODO: Call input validator
    // const { contentName, title, calltoaction, data } = req.body;

    // const newLanding = new Landing({
    //   contentName,
    //   title,
    //   calltoaction,
    //   data
    // }); //new Landing()

    // newLanding.save((err, landing) => {
    //   if (err) {
    //     console.log("Landing save error", err);
    //     errors.err = err;
    //     return res.status(400).json(errors);
    //   }
    //   return res.status(200).json(landing);
    // }); //newLanding.save()
  }
); //router.put()

const docuparser = reduxFormObj => {
  console.log("Reduxformobj", reduxFormObj);
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
  console.log("newdoc", newDoc);
  return newDoc;
};

module.exports = router;
