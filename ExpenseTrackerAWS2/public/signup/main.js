var signupForm = document.getElementById("signup");
var username="";
var email="";
var password="";

signupForm.addEventListener('submit',signUp)

async function  signUp(e){
    e.preventDefault();
    username = document.getElementById("username").value;
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    var myobj = {
        username : username,
        email: email,
        password: password
    };
    try{

    var res = await axios.post("http://localhost:4000/user/adduser",myobj)
        alert("SignUpcompleted");
        window.location= '../signin/signin.html';
    }         
    catch(err){
          console.log(err)
          signupForm.appendChild(document.createTextNode(err))         
    };
    
}