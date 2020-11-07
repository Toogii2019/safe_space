const mongoose = require("mongoose");
const { UsersCollection, PostsCollection } = require("../models");

mongoose.connect(process.env.DBURI || "mongodb://localhost/lessondb", {
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

  app.post("/api/sign_in", ({body:{email}}, res) => {
    UsersCollection.find({email}) 
    .then(user => {
      console.log(user)
        user.length && res.json(user[0]);
      })
      .catch(err => {
        console.log(ErrorEvent)
        res.json(err);
      });
    });

  app.post("/api/post", ({body}, res) => {
    console.log("Posting");
    console.log(body);
    PostsCollection.create(body) 
    .then(onepost => {
        res.json(onepost);
        })
        .catch(err => {
        res.json(err);
        });
    });
  app.get('/api/posts', (req, res) => {
    PostsCollection.find({})
    .then(posts => {
        res.json(posts);
        })
        .catch(err => {
        res.json(err);
        });
    });
};
