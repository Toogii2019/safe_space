const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessagesSchema = new Schema({
    source: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
        
    text: {
        type: String,
        required: true
    },

    destination: {
        type: String,
        required: true,
    },
    sender:
        {
            name: {
                type: String,
                required: true,
            },
            avatar: {
                type: String,
                required: true,
            },
            uid: {
                type: String,
                required: true,
            },
        },
});

const MessagesCollection = mongoose.model("MessagesCollection", MessagesSchema);

module.exports = MessagesCollection;