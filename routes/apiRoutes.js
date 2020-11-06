const workouts = require("../models/Users");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/lessondb", {
  useNewUrlParser: true,
  useFindAndModify: false
});

module.exports = function (app) {


    app.post("/api/sign_up", (req, res) => {
        console.log("Signing up");
      });
  };