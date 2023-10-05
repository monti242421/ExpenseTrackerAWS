const user = require('../models/user')

function isStringInvalid(string){
    if(string ==undefined || string.length===0){
        return true
    }else{
        return false
    }
}

exports.getUser=(req,res,next)=>{
    user.findAll().then(users=>{
        res.send(users);
    }).catch(err=>{
        console.log(err)
    });
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