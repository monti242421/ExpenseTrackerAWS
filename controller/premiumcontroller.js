const User = require('../models/user')
const Expenses =require('../models/expenses')
const Sequelize = require("../util/database");
const sequelize = require('../util/database');

exports.getuserleaderboard= async (req,res,next)=>{
    try{
        const leaderboardofusers = await User.findAll({
            order:[['totalExpenses','DESC']]
        });
        console.log(leaderboardofusers);

        res.status(200).json(leaderboardofusers)
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}