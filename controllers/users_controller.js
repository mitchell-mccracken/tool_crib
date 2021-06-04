const bcrypt = require('bcryptjs');
const express = require('express');
const users = express.Router();
const User = require('../models/users.js');


//================= ROUTES ======================
//===============================================

//create user
users.get('/new', (req, res) => {
    res.render('createlogin.ejs')
  })

//index, I added this so I could see the users that are registered. In a scenario with sensitive data I would want this route to be password controlled or just removed.
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
if ( req.body.userPassword1 === req.body.userPassword2) {
    req.body.userPassword1 = bcrypt.hashSync(req.body.userPassword1, bcrypt.genSaltSync(10))
    User.create(req.body, (err, createdUser) => {           // need to handle error handling for re-entering password
    if (err) {
        console.log(err);
    } else {
        res.redirect('/sessions/new')
            }
        })
} else {
    res.send('Passwords do not match!')
    }
})
  
module.exports = users
