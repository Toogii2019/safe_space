const mongoose = require("mongoose");
const { UsersCollection, PostsCollection } = require("../models");

mongoose.connect("mongodb://localhost/lessondb" || process.env.DBURI, {
  useNewUrlParser: true,
  useFindAndModify: false
});

module.exports = function (app) {
  
  app.post("/api/sign_up", ({body}, res) => {
    console.log("Signing up");
    console.log(body);
    UsersCollection.create(body) 
    .then(newUser => {
        res.json(newUser);
      })
      .catch(err => {
        res.json(err);
      });
    });

  app.post("/api/post", ({body}, res) => {
    console.log("Signing up");

    UsersCollection.create(body) 
    .then(onepost => {
        res.json(onepost);
        })
        .catch(err => {
        res.json(err);
        });
    });
  app.get('/api/posts', (req, res) => {
    UsersCollection.find({})
    .then(posts => {
        res.json(posts);
        })
        .catch(err => {
        res.json(err);
        });
    });
};
