// ./routes/api/content.js
const express = require("express");
const router = express.Router();
const Landing = require("../../models/Landing"); //Landing model, with mongoose methods included
const About = require("../../models/About");
const Setting = require("../../models/Setting");
const Contact = require("../../models/Contact");
const Mother = require("../../models/Mother");
const passport = require("passport");

const docuparser = require("../../utils/M-RFconverter");

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

//@route GET /api/content/contact
//@desc Obtain the contact deets
//@access Public
router.get("/contact", (req, res) => {
  const errors = {};
  Contact.find({ contentName: "contact" }).exec((err, contact) => {
    if (err) {
      errors.err = err;
      return res.status(404).json(errors);
    }
    //This returns an array, even if there's a single result
    return res.status(200).json(contact);
  }); //About.find.exec()
  //Obtain the contact preferences
  // Setting.find().exec((err, settingRes) => {
  //   if (err) {
  //     console.log(err);
  //     errors.err = err;
  //     return res.status(404).json(errors);
  //   }
  //   //Calling Card or Form?
  //   let preference = settingRes[0].contact.selected;
  //   if (preference === "Calling Card") {
  //     Contact.find({ contentName: "contact" }).exec((err2, deets) => {
  //       if (err2) {
  //         console.log(err2);
  //         errors.err = err2;
  //         return res.status(404).json(errors);
  //       }
  //       let { contentName, title, mode, data } = deets[0];
  //       let newDeetsObj = {
  //         mode,
  //         contentName,
  //         title
  //       };
  //       data.forEach(datapoint => {
  //         newDeetsObj[datapoint.texttype] = datapoint.text;
  //       });
  //       let newDeets = [];
  //       newDeets.push(newDeetsObj); //All front end handlers expect an array response
  //       return res.status(200).send(newDeets);
  //     }); //Calling Card find()
  //   } else if (preference === "Anonymous Form") {
  //     let responseObj = { contentName: "contact", mode: "Anonymous Form" };
  //     let response = [];
  //     response.push(responseObj);
  //     return res.status(200).send(response);
  //   }
  // }); // Setting find
});

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

//@route PUT /api/content/:target
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
    const parsedDocument = docuparser.RFToMongo(req.body); //Turn Redux-Form values into a Mongo document

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
      return res.status(200).json(newDoc);
    });
  }
); //router.put()

module.exports = router;
