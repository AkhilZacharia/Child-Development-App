const express = require('express');
const router = express.Router();
const mongoose =require('mongoose')
router.use(express.json());

var domainModel = require('../models/domainModel');
var domainComponentModel = require('../models/componentModel');
var ageCategoryModel = require('../models/ageCategoryModel');
var childModel = require('../models/childModel');
var questionModel = require('../models/questionModel');

router.get('/', (req,res)=>{
console.log('hii');
res.send('hiii')
});


router.get('/category', async (req,res)=>{
    try {
    let category = await ageCategoryModel.find() 
    // let domains =  await domainModel.find();
    res.status(200).send(category);
    } catch (error) {
        console.log(error);
    }
});

router.get('/domain_questions/:id', async (req,res)=>{
const domains = await domainModel.find({
  ageCategories: new mongoose.Types.ObjectId(req.params.id)
});
let questions = await questionModel.find({ age_category_id:req.params.id })
res.send({domains,questions})
});



module.exports = router;