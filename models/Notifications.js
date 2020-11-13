const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  owner: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  event: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    required: true
  },
},

);

const NotificationCollection = mongoose.model("NotificationCollection", NotificationSchema);

module.exports = NotificationCollection;