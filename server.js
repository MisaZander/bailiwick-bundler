require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");

// const users = require("./routes/api/users");
// const profile = require("./routes/api/profile");
// const posts = require("./routes/api/posts");

const app = express();

const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Passport middleware
app.use(passport.initialize());

//Passport config (jwt strategy)
require("./config/passport")(passport);

//Use routes
// app.use("/api/users", users);
// app.use("/api/profile", profile);
// app.use("/api/posts", posts);

//If production, serve the build folder
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  //The catch all route
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index/html"));
  });
}

//Connect to Mongo
mongoose
  .connect(
    process.env.MONGOURI,
    { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }
  )
  .then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
  })
  .catch(err => console.log(err));
