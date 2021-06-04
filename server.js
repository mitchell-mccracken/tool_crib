const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
require('dotenv').config();     //not sure if this is needed or not
const sessionsController = require('./controllers/sessions_controller.js');


const toolsController = require('./controllers/tools.js');
const userController = require('./controllers/users_controller.js');

//app config
const app = express();
const PORT = process.env.PORT || 3000;
const mongoURI = process.env.mongoURI || 'mongodb://localhost:27017/toolcrib';

//express middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(
    session({
      secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
      resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
      saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
    })
  )

//middleware for delete
app.use(methodOverride('_method'));

// set up mongoose connection
mongoose.connect(mongoURI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
mongoose.connection.once('open', () => {
    console.log('connected to mongo on ' + mongoURI);
});

app.use('/users' , userController);
app.use('/sessions' , sessionsController);
app.use(toolsController);



app.listen(PORT , () => {
    console.log('Server is up and running on port ' + PORT)
})