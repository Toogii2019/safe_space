const mongoose = require("mongoose");
const { UsersCollection, PostsCollection } = require("../models");
const bcrypt = require("bcryptjs");

mongoose.connect(process.env.DBURI || "mongodb://localhost/lessondb", {
  useNewUrlParser: true,
  useFindAndModify: false
});


module.exports = function (app) {
  
  app.post("/api/sign_up", ({body}, res) => {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(body.password, salt, function(err, hash) {
        UsersCollection.create({nickname: body.nickname, email: body.email, password: hash}) 
        .then(newUser => {
            res.json(newUser);
          })
          .catch(err => {
            res.json(err);
      });
    });
  })
})

  app.post("/api/sign_in", ({body:{email, password}}, res) => {
    UsersCollection.find({email}) 
    .then(user => {
      bcrypt.compare(password, user[0].password, function(err, authenticated) { 
        if (authenticated) {
          user.length && res.json(user[0]);
        }
        else {
          res.json(null);
        }
      });
      })
      .catch(err => {
        res.json(null);
      });
    });

  app.post("/api/post", ({body}, res) => {
    PostsCollection.create(body) 
    .then(onepost => {
        res.json(onepost);
        })
        .catch(err => {
        res.json(err);
        });
    });

  app.get('/api/posts', (req, res) => {
    PostsCollection.find({private: false})
    .then(posts => {
        res.json(posts);
        })
        .catch(err => {
        res.json(err);
        });
    });

    app.get('/api/allposts/:userEmail', (req, res) => {
      PostsCollection.find({user: req.params.userEmail})
      .then(posts => {
          res.json(posts);
          })
          .catch(err => {
          res.json(err);
          });
      });

  app.get('/api/posts/private/:userEmail', (req, res) => {
    PostsCollection.find({user: req.params.userEmail, private: true})
    .then(posts => {
        res.json(posts);
        })
        .catch(err => {
        res.json(err);
        });
    });

  app.get('/api/posts/public/:userEmail', (req, res) => {
    PostsCollection.find({user: req.params.userEmail, private: false})
    .then(posts => {
        res.json(posts);
        })
        .catch(err => {
        res.json(err);
        });
    });
};
