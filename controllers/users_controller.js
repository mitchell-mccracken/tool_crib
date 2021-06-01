const bcrypt = require('bcryptjs');
const express = require('express');
const users = express.Router();
const User = require('../models/users.js');


//================= ROUTES ======================
//===============================================

users.get('/new', (req, res) => {
    // res.send('page worked')
    res.render('createlogin.ejs')
    console.log(req.query);
  })

//index
users.get('/' , (req , res) => {
    User.find({} , (error , allUsers) => {
        if (error) {
            res.send(error)
        } else {
            res.send(allUsers)
        }
    })
})
  
users.post('/', (req, res) => {
//overwrite the user password with the hashed password, then pass that in to our database
req.body.userPassword1 = bcrypt.hashSync(req.body.userPassword1, bcrypt.genSaltSync(10))
User.create(req.body, (err, createdUser) => {           // need to handle error handling for re-entering password
    if (err) {
        console.log(err);
    } else {
        console.log('user is created', createdUser)
        console.log(req.body);
        console.log(req.body.userPassword1);
        res.redirect('/users')
        }
    })
})
  
module.exports = users
