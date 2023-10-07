var form = document.getElementById("expenseform");
var items = document.getElementById("items");
form.addEventListener('submit',addexpense);
items.addEventListener('click',removeItem);


async function addexpense(e){
        e.preventDefault();
        var amount = document.getElementById("amount").value;
        var description = document.getElementById("description").value;
        var category = document.getElementById("category").value;
       


        var myobj = {
            amount : amount,
            description: description,
            category: category
        };

        try{
            const token = localStorage.getItem("token")
            var res = await axios.post("http://localhost:4000/expense/addexpense",myobj,{headers:{"Authoriztion":token}})
                console.log(res);
                showDataToScreen(res.data.newexpense)   
            }         
            catch(err){
                  console.log(err)
            };

            
}

function showDataToScreen(data){
    var category = data.category;
    var description = data.description;
    var amount = data.amount;
    var li =document.createElement("li");
    li.className="delete"
    li.id = data.id;
    li.appendChild(document.createTextNode(amount +"-"+description+"-"+category   ));
    var deletebtn = document.createElement("button");
    deletebtn.className="btn btn-danger btn-sm btn-space delete";
    deletebtn.appendChild(document.createTextNode("Del"));

    li.appendChild(deletebtn);
    items.appendChild(li);
}
window.addEventListener("DOMContentLoaded",async ()=>{
    try{
        const token = localStorage.getItem("token")
        var res =await axios.get("http://localhost:4000/expense/getexpense",{headers:{"Authoriztion":token}})
        for( var i=0;i<res.data.length;i++){
            showDataToScreen(res.data[i]);
        }
    }catch(err){
        console.log(err);
    }


})

async function removeItem(e){
    if(e.target.classList.contains("delete")){
        try{
        var li = e.target.parentElement;
        var expenseId=li.id;
        console.log(li.id);
        var token = localStorage.getItem("token")
        await axios.delete("http://localhost:4000/expense/deleteexpense/"+expenseId,{headers:{"Authoriztion":token}})
        items.removeChild(li);

        }catch(err){
            console.log(err);
        }
        

    }
    
}

document.getElementById('rzr-button1').onclick = async function(e){
console.log("razor");
const token = localStorage.getItem("token");
const response = await axios.get("http://localhost:4000/purchase/premiummembership",{headers:{"Authoriztion":token}})
console.log(response);
var options={
    "key":response.data.key_id,
    "order_id":response.data.order.id,
    "handler":async function(response){
       var result = await axios.post("http://localhost:4000/purchase/updatetransactionstatus",
        {
            order_id:options.order_id,
            payment_id:response.razorpay_payment_id
        },{headers:{"Authoriztion":token}})
        console.log("result"+result);
        alert("You are premium user now");
    }

}

const rzp1 = new Razorpay(options);
rzp1.open();
e.preventDefault();

rzp1.on('payment.failed',function(response){
    console.log(response);
    alert('Something went wrong');

})
}