var signupForm = document.getElementById("signup");
var signinform = document.getElementById("signin");
var username="";
var email="";
var password="";

signinform.addEventListener('submit',signin);
//signupForm.addEventListener('submit',signUp)



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

    var res = await axios.post("http://localhost:4000/user/signup",myobj)
        console.log(res);
       // showDataToScreen(res.data.newBlogDetail)   
    }         
    catch(err){
          console.log(err)
          form.appendChild(document.createTextNode(err))         
    };
    
}

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

    var res = await axios.post("http://localhost:4000/user/signin",myobj)
        console.log(JSON.stringify(res));
        if(res.status == 201){
            alert("login");
        }
        //signinform.appendChild(document.createTextNode(JSON.stringify(res)))
    }         
    catch(err){
        console.log(err)
          console.log(err.response.data[0])
          signinform.appendChild(document.createTextNode(err))         
    };
}





