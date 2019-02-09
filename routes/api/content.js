// ./routes/api/content.js
const express = require("express");
const router = express.Router();
const Landing = require("../../models/Landing"); //Landing model, with mongoose methods included
const About = require("../../models/About");
const Setting = require("../../models/Setting");
const Contact = require("../../models/Contact");
const passport = require("passport");

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
router.post(
  "/about",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    //Are you even allowed to mess with this?
    if (req.user.userlevel === 0) {
      errors.forbidden =
        "You do not have the necessary authority to perform that action";
      return res.status(403).json(errors);
    }
    //TODO: Call input validator
    const { contentName, title, data } = req.body;

    const newAbout = new About({
      contentName,
      title,
      data
    }); //new About()

    newAbout.save((err, about) => {
      if (err) {
        console.log("About saving error", err);
        errors.err = err;
        return res.status(400).json(errors);
      }
      return res.status(200).json(about);
    }); //newAbout.save()
  }
); //router.post()

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
        let { contentName, name, email, phone } = deets[0];
        let newDeetsObj = {
          mode: "Calling Card",
          contentName,
          name,
          email,
          phone
        };
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
router.post(
  "/contact",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    //Are you even allowed to mess with this?
    if (req.user.userlevel < 2) {
      errors.forbidden =
        "You do not have the necessary authority to perform that action";
      return res.status(403).json(errors);
    }
    //TODO: Call input validator
    const { contentName, name, email, phone } = req.body;

    const newContact = new Contact({
      contentName,
      name,
      email,
      phone
    }); //new CallingCard()

    newContact.save((err, card) => {
      if (err) {
        console.log("Calling Card save error", err);
        errors.err = err;
        return res.status(400).json(errors);
      }
      return res.status(200).json(card);
    }); //newCC.save()
  }
); //router.post()

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
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    //Are you even allowed to mess with this?
    if (req.user.userlevel === 0) {
      errors.forbidden =
        "You do not have the necessary authority to perform that action";
      return res.status(403).json(errors);
    }
    //TODO: Call input validator
    const { contentName, title, calltoaction, data } = req.body;

    const newLanding = new Landing({
      contentName,
      title,
      calltoaction,
      data
    }); //new Landing()

    newLanding.save((err, landing) => {
      if (err) {
        console.log("Landing save error", err);
        errors.err = err;
        return res.status(400).json(errors);
      }
      return res.status(200).json(landing);
    }); //newLanding.save()
  }
); //router.post()

module.exports = router;
