const User = require('../models/user')
const Expenses =require('../models/expenses')
const Sequelize = require("../util/database");
const sequelize = require('../util/database');

exports.getuserleaderboard= async (req,res,next)=>{
    try{
        const leaderboardofusers = await User.findAll({
            attributes:['id','username',[sequelize.fn('sum',sequelize.col('expenses.amount')),'total_cost']],
            include: [
                {
                    model:Expenses,
                    attributes:[]
                }
            ],
            group:['User.id'],
            order:[['total_cost','DESC']]
        });
        // const expenses = await Expenses.findAll({
        //     attributes:['userId',[sequelize.fn('sum',sequelize.col('expenses.amount')),'total_cost']],
        //     group:['userId']
        // });

        // const userAggerateExpenses={}

        // expenses.forEach((expense)=>{
        //     if(userAggerateExpenses[expense.userId]){
        //         userAggerateExpenses[expense.userId] =  userAggerateExpenses[expense.userId] + Number(expense.amount);
        //     }else{
        //         userAggerateExpenses[expense.userId]=Number(expense.amount);
        //     }
        // })

        // var userLeaderboardDetails = [];
        // users.forEach((user)=>{
        //     userLeaderboardDetails.push({name:user.username,total_cost:userAggerateExpenses[user.id] || 0})
        // })
        // userLeaderboardDetails.sort((a,b)=>b.total_cost-a.total_cost)
        console.log(leaderboardofusers);

        res.status(200).json(leaderboardofusers)
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}