const express = require('express');
const router = express.Router();

router.use(express.json());

var questionModel = require('../models/questionModel');
var domainModel = require('../models/domainModel');
var domainComponentModel = require('../models/componentModel');
var ageCategoryModel = require('../models/ageCategoryModel');
var childModel = require('../models/childModel');


router.get('/', (req,res)=>{
res.send('answer')
});

router.post('/fourmonths', async (req,res)=>{
    let normalCalc= (s)=>{
        if ((s>27)&&(s<45)) {
        res.status(200).send({message:'Child is Healthy'});
        } else if ((s<=27)&&(s>=20)) {
            res.status(200).send({
                message:'Child is suspected to have delay in motor milestones.'
            });
        }  else if (s<20) {
            res.status(200).send({
                message:'Child is confirmed to have the delay and need a consultation.'
            });
        } 
         else {
            res.status(200).send({
                message:'Invalid Score.'
            });
        }
    }    

    let splCalc =(p)=>{
        if (p<=9) {
            res.status(200).send({
                message:'The child need consultation.'
            });
        } else if (p<=18) {
            res.status(200).send({
                message:'Parents need to monitor the kid.'
            });
        } 
    }
    try {
    let score1 = req.body.eyecontact;
    let score2 = req.body.socialsmile;
    let score3 = req.body.vocalisingsounds;
    let score4 = req.body.headcontrol;
    let score=score1+score2+score3+score4; //total score in 44
    let splScore=score1+score2+score3; // 3 domains only
    console.log(req.body.score);
    if (score4<=4){
         res.status(200).send({// single domain head control
                message:'Child is suspected to have developmental delay in motor milestones'
            });
    } 
    splCalc(splScore); //first 3 domain
    normalCalc(score);// all domain check

    } catch (error) {
        console.log(error);
    }
});

router.post('/sixmonths', async (req,res)=>{
    console.log(req.body.score);
    try {
    let score = req.body.score;
    if ((score>=5) && (score<9)) {
        res.status(200).send({message:'Child is Healthy'});
    } else if (score==4) {
        res.status(200).send({
            message:'Child is suspected to have delay in motor milestones. Consult your nearby occupational therapist to rule out difficulties and to start early intervention program.'
        });
    } else {
        res.status(200).send({
            message:'Child is having delay in motor milestones.Consult your nearby occupational therapist to rule out difficulties and to start early intervention program.'
        });
    }
    } catch (error) {
        console.log(error);
    }
});




module.exports = router;