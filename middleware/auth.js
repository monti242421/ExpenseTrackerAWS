
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { use } = require('../routes/user');

exports.authenticate = async (req,res,next)=>{
    try{
        const token = req.header('Authoriztion')
        console.log(token);
        const user = jwt.verify(token,'secretkeyitcanbeanything');
        console.log(user);
        result = await User.findByPk(user.userId)
        console.log(result.dataValues.id);
        req.user = result;
        next();
    }catch(err){
        console.log(err)
        return res.status(401).json({success:false});
    }
}
