var signinform = document.getElementById("signin");
var email="";
var password="";

signinform.addEventListener('submit',signin);


async function signin(e){
    e.preventDefault();
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    var myobj = {
        email: email,
        password: password
    };
    console.log(myobj)
    try{

    var res = await axios.post("http://localhost:4000/user/login",myobj)
        
        if(res.status == 201){
            alert("Successfully Logged in");
            console.log(JSON.stringify(res));
            localStorage.setItem('token',res.data.token);
            window.location= 'http://127.0.0.1:5500/Web%20Dev%20Projects/Expense%20Tracker%20AWS%20app/index/index.html?';
        }
        //signinform.appendChild(document.createTextNode(JSON.stringify(res)))
    }         
    catch(err){
        console.log(err)
          console.log(err.response.data[0])
          signinform.appendChild(document.createTextNode(err))         
    };
}

document.getElementById("signup").onclick = function(e){
    window.location= 'http://127.0.0.1:5500/Web%20Dev%20Projects/Expense%20Tracker%20AWS%20app/signup/signup.html';
}


document.getElementById('forgetpassword').onclick = function(e){
    e.preventDefault();
    forgetpasswordform.removeAttribute("hidden"); 
}

var forgetpasswordform=document.getElementById('forgetpasswordform');
forgetpasswordform.addEventListener('submit',sendmail);

async function sendmail(e){
        e.preventDefault();
        var email = document.getElementById("forgetpasswordemail").value;
        var myobj = {
            email: email,
        };
        try{
    
        var res = await axios.post("http://localhost:4000/password/forgotpassword",myobj)
            console.log(res);  
        }         
        catch(err){
              console.log(err)        
        };
 }









