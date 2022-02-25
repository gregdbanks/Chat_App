const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const dotenv = require("dotenv");

const users = require("./routes/api/users");
const messages = require("./routes/api/messages");

dotenv.config({ path: "./config/keys.env" });

const app = express();

// Port that the webserver listens to
const port = process.env.PORT || 5000;

const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

const io = require("socket.io").listen(server);

// Body Parser middleware to parse request bodies
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// CORS middleware
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Successfully Connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Assign socket object to every request
app.use(function (req, res, next) {
  req.io = io;
  next();
});

// Routes
app.use("/api/users", users);
app.use("/api/messages", messages);
