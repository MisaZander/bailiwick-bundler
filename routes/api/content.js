const express = require("express");
const router = express.Router();
const Landing = require("../../models/Landing"); //Landing model, with mongoose methods included
const About = require("../../models/About");
const passport = require("passport");

//@route GET /api/content
//@desc Obtain all the landing content
//@access Public
router.get("/", (req, res) => {
  const errors = {};
  Landing.find().exec((err, landing) => {
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
    const { contentName, title, blurbs, calltoaction, finishers } = req.body;

    const newLanding = new Landing({
      contentName,
      title,
      blurbs,
      calltoaction,
      finishers
    }); //new Landing()

    newLanding.save((err, landing) => {
      if (err) {
        errors.err = err;
        return res.status(400).json(errors);
      }
      return res.status(200).json(landing);
    }); //newLanding.save()
  }
); //router.post()

//@route GET /api/content/about
//@desc Obtain all the about content
//@access Public
router.get("/about", (req, res) => {
  const errors = {};
  About.find().exec((err, about) => {
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
        errors.err = err;
        return res.status(400).json(errors);
      }
      return res.status(200).json(about);
    }); //newAbout.save()
  }
); //router.post()

module.exports = router;
