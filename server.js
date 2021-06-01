const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
require('dotenv').config();     //not sure if this is needed or not

//import model
// const Tool = require('./models/tools.js');

const toolsController = require('./controllers/tools.js');
const userController = require('./controllers/users_controller.js');

//app config
const app = express();
const PORT = process.env.PORT || 3000;
const mongoURI = process.env.mongoURI || 'mongodb://localhost:27017/toolcrib';

//express middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(toolsController);
app.use(
    session({
        // secret: 'this is a test',   //I added this to test if my env file is not properly linked
      secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
      resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
      saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
    })
  )
app.use('/users' , userController)

//middleware for delete
app.use(methodOverride('_method'));

// set up mongoose connection
mongoose.connect(mongoURI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});


// user info for session object
app.get('/create-session' , (req , res) => {
    req.session.anyProperty = 'any value';
    // res.send(req.session);
})

// retrieve user information saved on the session object
app.get('/retrieve-session', (req, res) => {
    //any route will work
    if (req.session.anyProperty === 'something you want it to') {
      //test to see if that value exists
      //do something if it's a match
      console.log('it matches! cool')
    } else {
      //do something else if it's not
      console.log('nope, not a match')
    }
    res.redirect('/')
  })



app.listen(PORT , () => {
    console.log('Server is up and running on port ' + PORT)
})