var express = require('express');
var app = express();

const morgan = require('morgan');
const cors= require('cors');

const routes= require('./routes/router');
const answerRoutes= require('./routes/answerRouter');
const questionRoutes= require('./routes/questionRouter');
const getRoutes= require('./routes/getRouter');


require('dotenv').config();
require('./database/db')

app.use(cors());
app.use(morgan('dev'));

app.use("/",routes);
app.use("/answer",answerRoutes);
app.use("/questions",questionRoutes);
app.use("/get",getRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is active on Port ${process.env.PORT}`);
});