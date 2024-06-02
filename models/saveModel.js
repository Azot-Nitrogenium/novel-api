const { Schema, model } = require('mongoose');

const saveSchema = new Schema({
    user : String,
    frame : String
});

module.exports = {
    Save : model("saves", saveSchema)
}