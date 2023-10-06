var form = document.getElementById("expenseform");
var items = document.getElementById("items");
form.addEventListener('submit',addexpense);


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

            var res = await axios.post("http://localhost:4000/expense/addexpense",myobj)
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
    li.id = data.id;
    li.appendChild(document.createTextNode(amount +"-"+description+"-"+category   ));
    var deletebtn = document.createElement("button");
    deletebtn.className="btn btn-danger btn-sm btn-space delete";
    deletebtn.appendChild(document.createTextNode("Del"));

    li.appendChild(deletebtn);
    items.appendChild(li);
}
window.addEventListener("DOMContentLoaded",()=>{
    axios.get("http://localhost:4000/expense/addexpense")
    .then((res)=>{
        //console.log(res.data)
        for( var i=0;i<res.data.length;i++){
            showDataToScreen(res.data[i]);
        }
    
    }).catch(err=>console.log(err));


})

function removeItem(e){
    if(e.target.classList.contains("delete")){
        var li = e.target.parentElement;
        //console.log(li.id);
        items.removeChild(li);
        axios.delete("http://localhost:4000/addexpense/"+li.id)
        .then((res)=>{

        }).catch(err=>console.log(err));

    }
    
}