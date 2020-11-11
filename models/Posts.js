const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  post: {
    type: String,
    required: true
  },
  private: {
    type: Boolean,
  }
},

);

const PostsCollection = mongoose.model("PostsCollection", PostSchema);

module.exports = PostsCollection;