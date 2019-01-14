const express = require("express");
const router = express.Router();
const Landing = require("../../models/Landing"); //Landing model, with mongoose methods included
const crypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    return res.status(200).json(landing);
  }); //Landing.find.exec()
}); //router.get()

//@route POST /api/content
//@desc Rewrite the landing content
//@access Private
//TODO: Privatize this route
router.post("/", (req, res) => {
  const errors = {};
  //TODO: Call input validator
  const { title, blurbs, calltoaction, finishers } = req.body;

  const newLanding = new Landing({
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
}); //router.post()

module.exports = router;
