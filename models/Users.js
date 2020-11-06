const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UsersScema = new Schema({
  nickname: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
},
{
  toJSON: {
    // include any virtual properties when data is requested
    virtuals: true
  }
}

);

const UsersCollection = mongoose.model("Users", UsersScema);

module.exports = UsersCollection;