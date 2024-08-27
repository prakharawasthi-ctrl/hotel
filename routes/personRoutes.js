const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

// POST route to add a person
router.post('/',async(req,res)=>{
    try{
        // Assuming the request body contains person data
        const data = req.body;
        // create a new person document using the Mongoose model
        const newPerson = new Person(data);
        // Save the new person to the database
        const response = await newPerson.save()
        console.log('data saved')
        res.status(200).json(response)
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
});

// Get method to get the person 

router.get('/',async(req,res)=>{
    try{
        const data = await Person.find();
        console.log("data fetched");
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }
});

// this colon is responsible for making it a variable
router.get('/:workType',async(req,res)=>{
    try{
        const workType = req.params.workType; 
        if(workType=='chef'||workType=='manager'||workType=='waiter'){
            const response = await Person.find({work:workType});
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

router.put('/:id',async(req,res)=>{
    try{
        const personId = req.params.id;
        //extract the id from URL parameter
        const updatedPersonData = req.body;
        //update data for the person 
        const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new : true, //R eturn the updated documents
            runValidators:true, //Run Mongoose validator
        })
        if(!response){
            return res.status(404).json({error:'Person not found'});
        }
        console.log('data updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})
router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;//extact the person's id from 
        // URL parameter
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error:'Person not found'});
        }
        console.log('data deleted');
        res.status(200).json({message:'person deleted Successfully'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})
module.exports = router
