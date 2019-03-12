const express = require("express");
const path = require("path");
const multer = require("multer");
const uuid = require("uuid");

//Set storage engine
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public", "uploads/"),
  filename: function(req, file, cb) {
    cb(null, uuid() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 3000000 //Number of BYTES to limit filesize to, 3MB in this case
  },
  fileFilter: function(req, file, cb) {
    validateFileType(file, cb);
  }
}).array("customFile");

function validateFileType(file, cb) {
  //Allowed extensions
  const filetypes = /jpeg|jpg|png|gif/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb("That's not an image", false);
  }
}

const PORT = process.env.PORT || 8080;

const app = express();

// // Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Routes
app.get("/", (req, res) => res.render("index"));

app.post("/upload", (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.render("index", { error: err });
    } else if (req.files === undefined) {
      return res.render("index", { error: "Please select a file." });
    }
    console.log(req.files); //Req.file contains the data you need to send to Mongo
    return res.render("index", {
      message: "Success!"
    });
  });
});

app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
