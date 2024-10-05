const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

import UserRouter from "./routes/user.route.js";

//needed this line to properly parse json objects in req
app.use(bodyParser.json());

//cors
//front end and back end deployed to different urls
//needed to avoid cors error
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

//requiring the routes
const aminoAcids = require("./routes/aminoAcids");
const functionalGroups = require("./routes/functionalGroups");
const physics = require("./routes/physics");
const biology = require("./routes/biology");
const webDev = require("./routes/webDev");

//setup of db
const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
    .then(() => {
        console.log('Connected to the database');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });
1
//routes
app.use("/api/user",UserRouter);

//for heroku deployment
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "client/build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

//listen to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("App started on post 5000");
});
