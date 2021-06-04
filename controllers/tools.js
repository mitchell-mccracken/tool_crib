const express = require('express');
const router = express.Router();

//import model
const Tool = require('../models/tools.js');

//functions
const isAuthenticated = (req , res, next) => {
    if(req.session.currentUser) {
        return next()
    } else {
        res.render('needlogin.ejs');
    }
}


//========================================
//============== ROUTES ==================

// landing page
router.get('/' , (req , res) => {
    res.render('landingpage.ejs');
})

//login page
router.get('/login' , (req , res) => {
    res.render('login.ejs');
})

//index
router.get('/tools' , (req , res) => {
    Tool.find({} , (error , allTools) => {
        if (error) {
            res.send(error)
        } else {
            res.render('index.ejs' , {
                tools: allTools , 
                currentUser: req.session.currentUser
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
            currentUser : req.session.currentUser   
        })
    })
} )

// ===================== UPDATE ==========================
router.put('/tools/:id' , isAuthenticated , (req , res) => {
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
router.post('/tools' , isAuthenticated , (req , res) => {
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
            res.redirect('/tools');
        }
    })
})

// ===================== SHOW ==========================
router.get('/tools/:id' , (req , res) => {
    Tool.findById(req.params.id , (error , selectedTool) => {
        res.render('show.ejs' , {
            tool: selectedTool,
            currentUser: req.session.currentUser 
        })
    })
})

// ===================== DELETE ==========================
router.delete('/tools/:id' , isAuthenticated , (req , res) => {
    Tool.findByIdAndRemove(req.params.id , (error , selectedTool) => {
        res.redirect('/tools')
    })
})


module.exports = router;