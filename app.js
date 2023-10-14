
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const dotenv = require('dotenv')
dotenv.config();

const sequelize = require('./util/database')

app.use(cors());

const userRoute = require('./routes/user');
const forgotpasswordRoute = require('./routes/forgotpassword');
const expenseRoute = require('./routes/expenses');
const purchaseRoute = require('./routes/purchase');
const premiumRoute = require('./routes/premiumfeatures');


const user = require('./models/user');
const expenses = require('./models/expenses');
const order = require('./models/orders');
const forgetpassword = require('./models/forgotpassword');

app.use(bodyParser.json({extended:false}));

expenses.belongsTo(user,{constraints: true, onDelete:'CASCADE'});
user.hasMany(expenses);

user.hasMany(order);
order.belongsTo(user);

user.hasMany(forgetpassword);
forgetpassword.belongsTo(user);

app.use(userRoute);
app.use(forgotpasswordRoute);
app.use(expenseRoute);
app.use(purchaseRoute);
app.use(premiumRoute);
sequelize.sync();
//sequelize.sync({force:true});
app.listen(4000);