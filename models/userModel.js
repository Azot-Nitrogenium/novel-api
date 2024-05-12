const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email : String,
    password : String,
    name: String
});

module.exports = {
    userModel : model("users", userSchema)
}