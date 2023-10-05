
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();

const sequelize = require('./util/database')

app.use(cors());

const userRoute = require('./routes/user');

app.use(bodyParser.json({extended:false}));

app.use(userRoute);
sequelize.sync();
app.listen(4000);