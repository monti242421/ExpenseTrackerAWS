const Razorpay = require('razorpay');
const Order = require('../models/orders')

exports.purchasepremium=async(req,res,next)=>{
    try{
        var rzp = new Razorpay({
            key_id:'rzp_test_ymshxTVZbrKr6k',
            key_secret:'LnUsgIaS6LReW9gap0K4yG5n'
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
        const {payment_id,order_id} = req.body;
        console.log(req.body);
        const order = await Order.findOne({where:{orderid:order_id}})
        await order.update({paymentid:payment_id,status:'SUCCESSFUL'})
        await req.user.update({ispremiumuser:true})
        res.status(202).json({success:true,message:"Transaction Successful"})

    }catch(err){
        console.log(err);
        res.status(403).json({message:"something went worng in updation",error:err})
    }
}