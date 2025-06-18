var express = require('express');
var app = express();

require('dotenv').config();
require('./database/db')




 app.listen(3000,(()=>{
    console.log("server at 3000")
 }))