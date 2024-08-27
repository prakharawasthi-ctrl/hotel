const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/Menu');


// POST method to add a menu item 

router.post('/',async(req,res)=>{
    try{
        const data = req.body;
        const newMenu = new Menu(data)
        const response = await newMenu.save();
        console.log('data saved');
        res.status(200).json(response); 
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal'})
    }
})


// GET method to get the Menu items
router.get('/',async(req,res)=>{
    try{
        const data = await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'})
    }
})
router.get('/:taste',async(req,res)=>{
    try{
        const taste = req.params.taste; 
        if(taste=='chef'||taste=='manager'||taste=='waiter'){
            const response = await Menu.find({taste:taste});
            console.log('response fetched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error:'Invalid work type'})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

module.exports= router