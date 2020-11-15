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
            let firstDate = new Date().toDateString().split(" ").slice(1,4).join(" ") + ", " + new Date().toLocaleTimeString()
            NotificationCollection.create({owner: newUser.nickname, date: firstDate, user: "Safe Space", event: "Welcome to Safe Space", read: false})
            .then()
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
    console.log(body.date);
    if (!body.post.private) {
      UsersCollection.find({})
      .then(users => {
        for (let i=0; i<users.length;i++) {
          if (users[i].nickname !== body.user) {
              NotificationCollection.create({owner: users[i].nickname, date: body.date, user: body.user, event: "Posted Publicly", read: false})
              .then()
            }
          }
      })
    }
    
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

    app.get('/api/getpublicnotifications/:nickname', (req, res) => {
      NotificationCollection.find({owner: req.params.nickname})
      .then(notifications => {
          res.json(notifications);
          })
          .catch(err => {
          res.json(err);
          });
      });

    app.put('/api/updatenotification/:nickname/:id', (req, res) => {
      NotificationCollection.updateOne(
        { _id : req.params.id, owner: req.params.nickname },
        { $set: { read : true } }
      )
      .then(notification => {
          res.json(notification);
          })
          .catch(err => {
          res.json(err);
          });
      });

      app.get("/api/getallusers/:nickname", (req, res) => {
        UsersCollection.find(
          {nickname: { $ne: req.params.nickname}}
        ) 
        .then(users => {
            res.json(users)
          })
          .catch(err => {
            res.json(null);
          });
        });      
};
