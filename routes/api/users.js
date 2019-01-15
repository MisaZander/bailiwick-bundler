// ./routes/api/users.js
//users deals with auth
const express = require("express");
const router = express.Router();
const User = require("../../models/User"); //User model, with mongoose methods included
const crypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//@route POST api/users/resgister
//@desc New user
//@access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      errors.err = err;
      return res.status(500).json(errors);
    }

    if (user) {
      return res.status(409).json({ email: "Email already in use" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        hash: req.body.password
      });

      crypt.hash(newUser.hash, 10, (err, hash) => {
        if (err) {
          throw err;
        }
        newUser.hash = hash; //Change the plain password to a hash
        newUser.save((err, user) => {
          if (err) {
            errors.err = err;
            return res.status(500).json(errors);
          }
          res.status(200).json(user);
        });
      });
    }
  });
});

//@route GET api/users/login
//@desc Login page / Return a token
//@access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (err) {
      errors.err = err;
      return res.status(500).json(errors);
    } else if (!user) {
      errors.email = "Your credentials are bad and you should feel bad.";
      return res.status(404).json(errors);
    }

    //Validate passwerd
    crypt.compare(password, user.hash).then(response => {
      if (response) {
        //The response will be a bool returned
        //return res.status(200).json({ msg: "Oh hello" });
        const { id, name, userLevel } = user;

        const payload = {
          id,
          name,
          userLevel
        };

        //Sign the token
        jwt.sign(
          payload,
          process.env.SECRETORKEY,
          { expiresIn: 60 * 60 }, //60min
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        //While this COULD be errors.password, that would make us weak to brute force
        errors.email = "Your credentials are bad and you should feel bad.";
        return res.status(404).json(errors);
      }
    });
  });
});

module.exports = router;
