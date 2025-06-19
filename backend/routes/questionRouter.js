const express = require('express');
const router = express.Router();

router.use(express.json());

var questionModel = require('../models/questionModel');
// var domainModel = require('../models/domainModel');



router.get('/:id', async (req,res)=>{
let data = await questionModel.find({ age_category_id:req.params.id })
res.send(data)
});


module.exports = router; 