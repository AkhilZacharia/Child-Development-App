const express = require('express');
const router = express.Router();

router.use(express.json());

var questionModel = require('../models/questionModel');
var domainModel = require('../models/domainModel');
var domainComponentModel = require('../models/componentModel');
var ageCategoryModel = require('../models/ageCategoryModel');
var childModel = require('../models/childModel');


router.get('/', (req,res)=>{
console.log('hii');
res.send('hiii')
});

router.post('/newQuestion', async (req,res)=>{
    console.log(req.body);
    
    try {
    let data =  new questionModel(req.body)
    await data.save()
    res.status(200).send({message:'Added'});
    } catch (error) {
        console.log(error);
    }
});

router.post('/newDomain', async (req,res)=>{
    console.log(req.body);
    try {
    let data =  new domainModel(req.body)
    await data.save()
    res.status(200).send({message:'Added'});
    } catch (error) {
        console.log(error);
    }
});

router.post('/newAgeCategory', async (req,res)=>{
    console.log(req.body);
    
    try {
    let data =  new ageCategoryModel(req.body)
    await data.save()
    res.status(200).send({message:'Added'});
    } catch (error) {
        console.log(error);
    }
res.send('added')
});


module.exports = router;