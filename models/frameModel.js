const { Schema, model, Types } = require('mongoose');

const frameSchema = new Schema({
    type : String,
    text : String,
    background : String,
    heroes : [String],
    answers : [{
        text : String,
        way : String
    }],
    way : String
});

module.exports = {
    Frame : model("frames", frameSchema)
}