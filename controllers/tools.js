const express = require('express');
const router = express.Router();

//import model
const Tool = require('../models/tools.js');



//========================================
//============== ROUTES ==================

// redirect for heroku, I added this becuase my root was originally set up as /tools
router.get('/' , (req , res) => {
    res.redirect('/tools');
})

//login
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
                tools: allTools
            })
        }
    })
})

// ===================== NEW ==========================
router.get('/tools/new' , (req , res) => {
    res.render('new.ejs');
})

// ===================== EDIT ==========================
router.get('/tools/:id/edit' , (req , res) => {
    Tool.findById(req.params.id , (error , foundTool) => {
        res.render('edit.ejs' , {
            tool: foundTool
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
        res.redirect('/tools/')
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
            tool: selectedTool
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