const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UsersScema = new Schema({
  nickname: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
},

);

const UsersCollection = mongoose.model("UsersCollection", UsersScema);

module.exports = UsersCollection;