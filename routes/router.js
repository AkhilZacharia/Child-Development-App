const express = require('express');
const router = express.Router();

router.use(express.json());

router.get('/', (req,res)=>{
console.log('hii');
res.send('hiii')
});



module.exports = router;