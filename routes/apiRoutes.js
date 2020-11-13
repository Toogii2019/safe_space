const mongoose = require("mongoose");
const { UsersCollection, PostsCollection, NotificationCollection } = require("../models");
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
        if (!onepost.private) {
          NotificationCollection.create({date: onepost.date, user: onepost.user, event: "Posted Publicly", read: false})
          .then()
        }
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

    app.get('/api/allposts/:nickname', (req, res) => {
      PostsCollection.find({user: req.params.nickname})
      .then(posts => {
          res.json(posts);
          })
          .catch(err => {
          res.json(err);
          });
      });

  app.get('/api/posts/private/:nickname', (req, res) => {
    PostsCollection.find({user: req.params.nickname, private: true})
    .then(posts => {
        res.json(posts);
        })
        .catch(err => {
        res.json(err);
        });
    });

  app.get('/api/posts/public/:nickname', (req, res) => {
    PostsCollection.find({user: req.params.nickname, private: false})
    .then(posts => {
        res.json(posts);
        })
        .catch(err => {
        res.json(err);
        });
    });

    app.get('/api/getpublicnotifications', (req, res) => {
      NotificationCollection.find({})
      .then(notifications => {
          res.json(notifications);
          })
          .catch(err => {
          res.json(err);
          });
      });
    
};
