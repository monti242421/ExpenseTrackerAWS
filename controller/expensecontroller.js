const { where } = require('sequelize');
const expenses =require('../models/expenses')
const bcrypt = require('bcrypt');
const User = require('../models/user')
const sequelize = require("../util/database");
const AWS = require("aws-sdk");
require('dotenv').config();

function isStringInvalid(string){
    if(string ==undefined || string.length===0){
        return true
    }else{
        return false
    }
}
var itemsPerPagedefault=5;
var totalItems=20;
exports.getexpense=async(req,res,next)=>{
    try{
        const page = Number(req.params.page) || 1;
        var pagelimit = req.query.pagelimit;
       // console.log(pagelimit);
        if(pagelimit==undefined || pagelimit<5){
            pagelimit=itemsPerPagedefault
        }
        //console.log(pagelimit);
        totalItems = await expenses.count();
        console.log(totalItems)
        var result = await expenses.findAll({
            where:{userId:req.user.dataValues.id},
            offset:(page-1)*Number(pagelimit),
            limit:Number(pagelimit)
        });
        //res.send(result);
        res.json({
            result,
            currentPage:page,
            hasNextPage:Number(pagelimit)*page<totalItems,
            nextPage:page+1,
            hasPreviousPage:page>1,
            previousPage:page-1
        })
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

function uploadToS3(data,filename){
    const BUCKET_NAME = process.env.BUCKET_NAME
    const IAM_USER_KEY=process.env.IAM_USER_KEY
    const IAM_USER_SECRET=process.env.IAM_USER_SECRET

    let s3bucket = new AWS.S3({
        accessKeyId:IAM_USER_KEY,
        secretAccessKey:IAM_USER_SECRET
    })

        var params = {
            Bucket: BUCKET_NAME,
            Key:filename,
            Body:data,
            ACL:'public-read'
        }
        return new Promise((resolve,reject)=>{
            s3bucket.upload(params,(err,s3response)=>{
                if(err){
                    console.log('somethingwentwrong',err)
                    reject(err);
                }else{
                    console.log('success',s3response);
                    resolve(s3response.Location);
                }
            })

        })
        

}

exports.downloadexpense = async (req,res,next)=>{
    try{

    
    console.log("sa00");
    const expenses = await req.user.getExpenses();
    //console.log(expenses);
    const stringifiedExpenses = JSON.stringify(expenses);
    const userid= req.user.id;
    const filename = `Expense${userid}/${new Date()}.txt`
    const fileURL = await uploadToS3(stringifiedExpenses,filename);
    res.status(200).json({fileURL,success:true});
    }catch(err){
        console.log(err);
        res.status(500).json({fileURL:'',success:false,err:err})
    }
}