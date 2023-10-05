const { where } = require('sequelize');
const user = require('../models/user')

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
    var result = await user.create({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    })
        console.log(result.dataValues)
        res.status(201).json({newUserDetail: result.dataValues});
    
    }
    catch(err){
        console.log(err)
        res.status(500).json(err);
    }


}

exports.postSignIn = async (req,res,next)=>{
    try{
        //console.log(req.body)
        var result = await user.findAll({where:{email:req.body.email}})
        if( result==undefined || result.length===0){
            return res.status(400).json({err:"User doesnt exist"})
        }else if(result[0].dataValues.password !=req.body.password){
            return res.status(401).json({err: "Incorrect Password"})
        } else{
            res.status(201).json({userdetail:result[0].dataValues})
        }
        //console.log(result[0].dataValues)
    }catch (err){
    
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