const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: String,
  },
  title: {
    type: String,
  },
  post: {
    type: String,
  },
  private: {
    type: Boolean,
  }
},

);

const PostsCollection = mongoose.model("PostsCollection", PostSchema);

module.exports = PostsCollection;