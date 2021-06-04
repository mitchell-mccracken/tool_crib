const bcrypt = require('bcryptjs')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')


sessions.get('/new', (req, res) => {
  res.render('login.ejs', { currentUser: req.session.userName })
})

// on sessions form submit (log in)
sessions.post('/', (req, res) => {

  User.findOne({ userName: req.body.userName }, (err, foundUser) => {
    // Database error
    if (err) {
      console.log(err)
      res.send('oops the db had a problem')
    } else if (!foundUser) {
      // if found user is undefined/null not found etc
      res.send('<a  href="/">Sorry, no user found </a>')
    } else {
      // user is found yay!
      // now let's check if passwords match
      if (bcrypt.compareSync(req.body.userPassword1, foundUser.userPassword1)) {
        // add the user to our session
        req.session.currentUser = foundUser
        // redirect back to our home page
        res.redirect('/tools')
      } else {
        // passwords do not match
        res.send('<a href="/"> password does not match </a>')
      }
    }
  })

})

sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

module.exports = sessions