const { where } = require('sequelize');
const expenses =require('../models/expenses')
const bcrypt = require('bcrypt');
const User = require('../models/user')
const sequelize = require("../util/database");

function isStringInvalid(string){
    if(string ==undefined || string.length===0){
        return true
    }else{
        return false
    }
}

exports.getexpense=async(req,res,next)=>{
    try{
        var result = await expenses.findAll({where:{userId:req.user.dataValues.id}});
        res.send(result);
    }catch(err){
        console.log(err);
    }

}
exports.addexpense=async (req,res,next)=>{
    const t = await sequelize.transaction();
    try{        
        // if(isStringInvalid(req.body.amount) || isStringInvalid(req.body.description)||isStringInvalid(req.body.category)){
        //     return res.status(400).json({err:"Bad Parameters, Missing"});
        // }
        
        var result = await expenses.create({
            amount:req.body.amount,
            description:req.body.description,
            category:req.body.category,
            userId:req.user.dataValues.id

        },{transaction:t})

        const totalExpense = Number(req.user.dataValues.totalExpenses) + Number(req.body.amount);

        await User.update({totalExpenses:totalExpense},{where:{id:req.user.dataValues.id},transaction:t})
        await t.commit();
        res.status(201).json({newexpense:result.dataValues});
    }catch(err){
        await t.rollback();
        console.log(err)
        res.status(500).json(err);
    }
}

exports.deleteexpense=async (req,res,next)=>{
     const expenseid = req.params.expenseid
     console.log(expenseid);
     try{
        var noofrows = await  expenses.destroy({where:{id:expenseid,userId:req.user.dataValues.id}});
        console.log(result);
        if(noofrows==0){
            res.status(404).json({success:false,message:"Expense does not belong to user"}); 
        }else{
            return res.status(204).json({success:true,message:"deleted successfully"})
        }
        
    }catch(err){
        console.log(err)
        res.status(403).json({success:false,message:"failed"});
    }
}