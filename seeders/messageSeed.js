
let mongoose = require("mongoose");
let db = require("../models");

mongoose.connect(process.env.DBURI || "mongodb://localhost/lessondb", {
  useNewUrlParser: true,
  useFindAndModify: false
});


let messagesSeed = [
    {
      source: "user1",
      date: new Date().toDateString().split(" ").slice(1,4).join(" ") + ", " + new Date().toLocaleTimeString(),
      text: "Hello World1",
      destination: "User1",
      sender: 
        {
          name: "sender-1",
          uid: "sender-1-nickname",
          avatar: "https://icon-library.net/icon/iron-man-icon-21.html"
        }
    },
    {
        source: "user2",
        date: new Date().toDateString().split(" ").slice(1,4).join(" ") + ", " + new Date().toLocaleTimeString(),
        text: "Hello World2",
        destination: "User2",
        sender:
          {
            name: "sender-2",
            uid: "sender-2-nickname",
            avatar: "https://icon-library.net/icon/iron-man-icon-21.html"
          }
      },
    {
      source: "user3",
      date: new Date().toDateString().split(" ").slice(1,4).join(" ") + ", " + new Date().toLocaleTimeString(),
      text: "Hello World3",
      destination: "User3",
      sender:
        {
          name: "sender-3",
          uid: "sender-3-nickname",
          avatar: "https://icon-library.net/icon/iron-man-icon-21.html"
        }
    },
]

db.MessagesCollection.deleteMany({})
    .then(() => db.MessagesCollection.collection.insertMany(messagesSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
});