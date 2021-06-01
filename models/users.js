const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    userName: {type: String, unique: true , require: true},
    userPassword1: {type: String}
})

const User = mongoose.model('User' , userSchema);

module.exports = User;