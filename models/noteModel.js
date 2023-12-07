const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    text: {
        type: "String",
        require: true,
    },
    date: {
        type: "Date"
    },
    noteColor: {
        type: "String"
    },
    author: {
        type: "ObjectId",
        ref: "User"
    },



});

module.exports = mongoose.model("Note", noteSchema);