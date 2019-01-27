// ./routes/api/users.js
//users deals with auth
const express = require("express");
const router = express.Router();
const User = require("../../models/User"); //User model, with mongoose methods included
const crypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

//Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateUpdateInput = require("../../validation/update");
const isEmpty = require("../../validation/is-empty");

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
        const { id, name, userlevel } = user;

        const payload = {
          id,
          name,
          email,
          userlevel
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

//@route GET api/users
//@desc Get the user deets
//@access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    User.findById(req.user.id, "name email userlevel").exec((err, user) => {
      if (err) {
        console.log(err);
        errors.err = err;
        return res.status(500).json(errors);
      } else if (!user) {
        errors.nouser = "User not found";
        return res.status(404).json(errors);
      }
      return res.status(200).json(user);
    });
  }
);

//@route PUT api/users
//@desc Change credentials of a user
//@access Private
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Make sure the first two fields are valid
    let { errors, isValid } = validateUpdateInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { name, email, password, passwordVerify } = req.body;
    let updatedDeets = {
      name,
      email
    };
    User.findOne({ email: email }).exec((err, user) => {
      if (err) {
        errors.err = err;
        return res.status(500).json(errors);
      }

      if (req.user.email !== email) {
        //Requesting an email change
        if (user) {
          //Requesting a change, but email already exists
          errors.email = "Email already in use";
          return res.status(409).json(errors);
        }
        //No need for else above. email already contains requested value
      } else {
        //Email unchanged. Keep it to current token value
        updatedDeets.email = req.user.email;
      }

      if (!isEmpty(password)) {
        updatedDeets.password = password;
        updatedDeets.passwordVerify = passwordVerify;
        let { errors, isValid } = validateRegisterInput(updatedDeets);
        if (!isValid) {
          return res.status(400).json(errors);
        }
        crypt.hash(password, 10, (err, hash) => {
          if (err) {
            throw err;
          }
          updatedDeets.hash = hash;
          User.findByIdAndUpdate(
            req.user.id,
            updatedDeets,
            { new: true, select: "name email userlevel" },
            (err, updUser) => {
              if (err) {
                console.log(err);
                return res.status(500).json(err);
              }
              return res.status(200).json(updUser);
            }
          ); //Update user(/w password)
        }); //hash cb
      } else {
        //If update password
        User.findByIdAndUpdate(
          req.user.id,
          updatedDeets,
          { new: true, select: "name email userlevel" },
          (err, updUser) => {
            if (err) {
              console.log(err);
              return res.status(500).json(err);
            }
            return res.status(200).json(updUser);
          }
        ); //Update user (/wo password)
      }
    }); //Email uniqueness check
  }
); //router.put

module.exports = router;
