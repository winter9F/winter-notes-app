const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    text: {
        type: "String",
        require: true,
    },
    date: {
        type: "Date"
    }


});

module.exports = mongoose.model("Note", noteSchema);