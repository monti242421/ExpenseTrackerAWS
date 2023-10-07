const User = require('../models/user')
const Expenses =require('../models/expenses')
const Sequelize = require("../util/database");

exports.getuserleaderboard= async (req,res,next)=>{
    try{
        const users = await User.findAll();
        const expenses = await Expenses.findAll();

        const userAggerateExpenses={}

        expenses.forEach((expense)=>{
            if(userAggerateExpenses[expense.userId]){
                userAggerateExpenses[expense.userId] =  userAggerateExpenses[expense.userId] + Number(expense.amount);
            }else{
                userAggerateExpenses[expense.userId]=Number(expense.amount);
            }
        })

        var userLeaderboardDetails = [];
        users.forEach((user)=>{
            userLeaderboardDetails.push({name:user.username,total_cost:userAggerateExpenses[user.id] || 0})
        })
        userLeaderboardDetails.sort((a,b)=>b.total_cost-a.total_cost)
        console.log(userLeaderboardDetails);

        res.status(200).json(userLeaderboardDetails)
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}