const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    username: {type: String, unique: true , require: true},
    password: String
})

const User = mongoose.model('User' , userSchema);

module.exports = User;