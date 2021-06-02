const bcrypt = require('bcryptjs')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

// middleware added to hopefully parse the data coming in, this may not be needed
sessions.use(express.urlencoded({ extended: true}));


sessions.get('/new', (req, res) => {
  res.render('login.ejs', { currentUser: req.session.userName })
  console.log('req. session . user name is ==>' + req.session.userName);
})

// on sessions form submit (log in)
sessions.post('/', (req, res) => {
    // res.send(req.body)
  // username is found and password matches
  // successful log in

  // username is not found - who cares about password if you don't have a username that is found?
  // unsuccessful login

  // username found but password doesn't match
  // unsuccessful login

  // some weird thing happened???????

  // Step 1 Look for the username

  User.findOne({ userName: req.body.userName }, (err, foundUser) => {
    // console.log('req dot body dot username  ===> ' + userName)
    // Database error
    console.log(req.body);
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
        // test to see if req.session exists
        console.log('line 48: req dot session is : ====> ' + req.session.currentUser)
        // redirect back to our home page
        res.redirect('/')
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