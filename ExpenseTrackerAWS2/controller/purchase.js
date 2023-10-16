const Razorpay = require('razorpay');
const Order = require('../models/orders')
const usercontroller = require('./usercontroller');

exports.purchasepremium=async(req,res,next)=>{
    try{
        var rzp = new Razorpay({
            key_id:process.env.RZP_KEYID,
            key_secret:process.env.RZP_KEYSECRET
        })
        const amount = 2500;
        rzp.orders.create({amount,currency:"INR"},async (err,order)=>{
            if(err){
                throw new Error(JSON.stringify(err));
            }
            try{

            
           await req.user.createOrder({
                orderid:order.id,
                status:'PENDING'
            })
            return res.status(201).json({
                order,
                key_id:rzp.key_id
            })
        }catch(err){
            throw new Error(err);
        }
        })
        
    }catch(err){
        console.log(err);
        res.status(403).json({message:"something went worng",error:err})
    }
}

exports.updatetransationstatus = async(req,res,next)=>{
    try{
        const userId = req.user.id;
        const {payment_id,order_id} = req.body;
        console.log(req.body);
        const order = await Order.findOne({where:{orderid:order_id}})
        await order.update({paymentid:payment_id,status:'SUCCESSFUL'})
        await req.user.update({ispremiumuser:true})
        res.status(202).json({success:true,message:"Transaction Successful",token:usercontroller.generateAccessToken(userId,undefined,true)})

    }catch(err){
        console.log(err);
        res.status(403).json({message:"something went worng in updation",error:err})
    }
}