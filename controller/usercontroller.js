const { where } = require('sequelize');
const user = require('../models/user')
const expenses =require('../models/expenses')
const bcrypt = require('bcrypt');

function isStringInvalid(string){
    if(string ==undefined || string.length===0){
        return true
    }else{
        return false
    }
}

exports.getUser=async (req,res,next)=>{
    try{
        var result = await user.findAll();
        res.json(result);
    }catch(err){
        console.log(err);
    }
}

exports.addUser= async (req,res,next)=>{
    try{   
    console.log(req.body)

    if(isStringInvalid(req.body.username) || isStringInvalid(req.body.email)||isStringInvalid(req.body.password)){
        return res.status(400).json({err:"Bad Parameters, Missing"});
    }
    const saltrounds=10;
    bcrypt.hash(req.body.password,saltrounds,async (err,hash)=>{
        console.log(err);
        await user.create({
            username:req.body.username,
            email:req.body.email,
            password:hash
        })
       // console.log(result.dataValues)
        res.status(201).json({message:'successfully created new user'});

    })
        
    }
    catch(err){
        console.log(err)
        res.status(500).json(err);
    }


}

exports.postSignIn = async (req,res,next)=>{
    try{
        //console.log(req.body)
        if(isStringInvalid(req.body.email)||isStringInvalid(req.body.password)){
            return res.status(400).json({err:"Bad Parameters, Missing"});
        }

        var result = await user.findAll({where:{email:req.body.email}})
        if( result.length>0){
            bcrypt.compare(req.body.password,result[0].dataValues.password,(err,resultPass)=>{
                if(err){
                    throw new Error("Something Went Wrong");
                }
                if(resultPass===true){
                    res.status(201).json({userdetail:result[0].dataValues})
                } else{
                    return res.status(400).json({err: "Incorrect Password"})
                }
            })
        }else{
            return res.status(404).json({err:"User doesnt exist"})
        }
            
        //console.log(result[0].dataValues)
    }catch (err){
        res.status(500).send(err);
    }
}

exports.deleteUser=(req,res,next)=>{
    console.log(req.params.userId);
    const userID = req.params.userId;
    user.findByPk(userID)
    .then(user=>{
        user.destroy();
        res.send(user)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).send(err);
    });

}
exports.getexpense=async(req,res,next)=>{
    try{
        var result = await expenses.findAll();
        res.send(result);
    }catch(err){
        console.log(err);
    }

}
exports.addexpense=async (req,res,next)=>{

    try{        
    if(isStringInvalid(req.body.amount) || isStringInvalid(req.body.description)||isStringInvalid(req.body.category)){
        return res.status(400).json({err:"Bad Parameters, Missing"});
    }
        console.log(req.body)
        var result = await expenses.create({
            amount:req.body.amount,
            description:req.body.description,
            category:req.body.category
        })
       // console.log(result.dataValues)
        res.status(201).json({newexpense:result.dataValues});
    }catch(err){
        console.log(err)
        res.status(500).json(err);
    }
}