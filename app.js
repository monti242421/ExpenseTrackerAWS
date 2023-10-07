
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();

const sequelize = require('./util/database')

app.use(cors());

const userRoute = require('./routes/user');
const expenseRoute = require('./routes/expenses');
const purchaseRoute = require('./routes/purchase');

const user = require('./models/user');
const expenses = require('./models/expenses');
const order = require('./models/orders');

app.use(bodyParser.json({extended:false}));

expenses.belongsTo(user,{constraints: true, onDelete:'CASCADE'});
user.hasMany(expenses);

user.hasMany(order);
order.belongsTo(user);

app.use(userRoute);
app.use(expenseRoute);
app.use(purchaseRoute);
sequelize.sync();
//sequelize.sync({force:true});
app.listen(4000);