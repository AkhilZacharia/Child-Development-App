var express = require('express');
var app = express();

const morgan = require('morgan');
const cors= require('cors');

const routes= require('./routes/router');


require('dotenv').config();
require('./database/db')

app.use(cors());
app.use(morgan('dev'));

app.use("/",routes);

app.listen(process.env.PORT, () => {
    console.log(`Server is active on Port ${process.env.PORT}`);
});