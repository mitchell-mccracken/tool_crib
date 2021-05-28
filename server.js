const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

//import model
const Tool = require('./models/tools.js');

//app config
const app = express();
const PORT = process.env.PORT || 3000;
const mongoURI = process.env.mongoURI || 'mongodb://localhost:27017/toolcrib';

//express middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

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

//========================================
//============== ROUTES ==================

// redirect for heroku, I added this becuase my root was originally set up as /tools
app.get('/' , (req , res) => {
    res.redirect('/tools');
})

//index
app.get('/tools' , (req , res) => {
    Tool.find({} , (error , allTools) => {
        if (error) {
            res.send(error)
        } else {
            res.render('index.ejs' , {
                tools: allTools
            })
        }
    })
})

// ===================== NEW ==========================
app.get('/tools/new' , (req , res) => {
    res.render('new.ejs');
})

// ===================== EDIT ==========================
app.get('/tools/:id/edit' , (req , res) => {
    Tool.findById(req.params.id , (error , foundTool) => {
        res.render('edit.ejs' , {
            tool: foundTool
        })
    })
} )

// ===================== UPDATE ==========================
app.put('/tools/:id' , (req , res) => {
    console.log(req.body);
    if (req.body.newTool === 'on') {
        req.body.newTool = true;
    } else {
        req.body.newTool = false;
    }
    Tool.findByIdAndUpdate(req.params.id, req.body, {new: true} , (error , updatedTool) => {
        res.redirect('/tools/')
    })
})
    

// ===================== CREATE ==========================
app.post('/tools' , (req , res) => {
    // console.log(req.body.notes);
    // res.send(req.body.newTool);
    if (req.body.newTool === 'on') {
        req.body.newTool = true;
    } else {
        req.body.newTool = false;
    }
    Tool.create(req.body , (error , createdTool) => {
        console.log(createdTool);
        if (error) {
            console.log(error);
        } else {
            
            console.log('tool created!!!!');
            res.redirect('/tools');
        }
        
    })
})

// ===================== SHOW ==========================
app.get('/tools/:id' , (req , res) => {
    console.log(req.params.id);
    Tool.findById(req.params.id , (error , selectedTool) => {
        // res.send(selectedTool);
        res.render('show.ejs' , {
            tool: selectedTool
        })
    })
})

// ===================== DELETE ==========================
app.delete('/tools/:id' , (req , res) => {
    Tool.findByIdAndRemove(req.params.id , (error , selectedTool) => {
        res.redirect('/tools')
    })
})




app.listen(PORT , () => {
    console.log('Server is up and running on port ' + PORT)
})