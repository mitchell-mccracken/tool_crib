const express = require('express');
const router = express.Router();

//import model
const Tool = require('../models/tools.js');


//========================================
//============== ROUTES ==================

// redirect for heroku, I added this becuase my root was originally set up as /tools
router.get('/' , (req , res) => {
    res.render('landingpage.ejs');
})

//login , I don't think I use this route ever
router.get('/login' , (req , res) => {
    res.render('login.ejs');
})

//index
router.get('/tools' , (req , res) => {
    console.log(req.session.currentUser);
    Tool.find({} , (error , allTools) => {
        if (error) {
            res.send(error)
        } else {
            res.render('index.ejs' , {
                tools: allTools , 
                currentUser: req.session.currentUser   //this kept coming back as undefined - this is now fixed
            })
        }
    })
})

// ===================== NEW ==========================
router.get('/tools/new' , (req , res) => {
    res.render('new.ejs' , {
        currentUser: req.session.currentUser
    });
})

// ===================== EDIT ==========================
router.get('/tools/:id/edit' , (req , res) => {
    Tool.findById(req.params.id , (error , foundTool) => {
        res.render('edit.ejs' , {
            tool: foundTool, 
            currentUser : req.session.currentUser   //I am getting an error that currentUser is undefined
        })
    })
} )

// ===================== UPDATE ==========================
router.put('/tools/:id' , (req , res) => {
    console.log(req.body);
    if (req.body.newTool === 'on') {
        req.body.newTool = true;
    } else {
        req.body.newTool = false;
    }
    Tool.findByIdAndUpdate(req.params.id, req.body, {new: true} , (error , updatedTool) => {
        res.redirect(`/tools/${req.params.id}`)
    })
})
    

// ===================== CREATE ==========================
router.post('/tools' , (req , res) => {
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
router.get('/tools/:id' , (req , res) => {
    console.log(req.params.id);
    Tool.findById(req.params.id , (error , selectedTool) => {
        // res.send(selectedTool);
        res.render('show.ejs' , {
            tool: selectedTool,
            currentUser: req.session.currentUser 
        })
    })
})

// ===================== DELETE ==========================
router.delete('/tools/:id' , (req , res) => {
    Tool.findByIdAndRemove(req.params.id , (error , selectedTool) => {
        res.redirect('/tools')
    })
})


module.exports = router;