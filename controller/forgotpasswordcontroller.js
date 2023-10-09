var Brevo = require('@getbrevo/brevo');
var client = Brevo.ApiClient.instance;
var apiKey = client.authentications['api-key']
apiKey.apiKey = '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';

var transEmailApi = new Brevo.TransactionalEmailsApi(); 





exports.forgotpassword = async(req,res,next)=>{
    try{
        console.log(req.body.email);
        const sender = {
            email:'monti242421@gmail.com'
        }
        
        const recievers = [
            {
                email:req.body.email
            }
        ]
       var result = await transEmailApi.sendTransacEmail({
            sender,
            to:recievers,
            subject:" Just Testing",
            textContent:"Content"
        })
        console.log(result);
    res.json({message:"forgotpasswordrequest"});
    }catch(err){
        console.log(err);
        res.status(401).json({message:"somethingwentwring"});
    }
    
}