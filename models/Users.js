const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UsersScema = new Schema({
  nickname: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  },
},

);

const UsersCollection = mongoose.model("UsersCollection", UsersScema);

module.exports = UsersCollection;