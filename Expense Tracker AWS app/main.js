var form = document.getElementById("mainform");
var blogscontainer = document.getElementById("blogscontainer");
var username="";
var email="";
var password="";

form.addEventListener('submit',postcontent);

async function  postcontent(e){
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

function showDataToScreen(data){
    var blogsdiv =document.createElement("div");
    blogsdiv.className="blogs";
    blogsdiv.id=data.id
    var titleinblog = document.createElement("h2");
    titleinblog.id="titleinblog";
    titleinblog.style="color:white; margin-left: 10px;"
    titleinblog.appendChild(document.createTextNode(data.title));
    

    var openblogbutton = document.createElement("button");
    openblogbutton.className = "btn-right";
    openblogbutton.id="showblog";
    openblogbutton.appendChild(document.createTextNode("+"));

    titleinblog.appendChild(openblogbutton);
    blogsdiv.appendChild(titleinblog);
    //blogsdivEle=blogsdiv;
   // showBlog(blogsdiv,author,content);
   var contentdiv=document.createElement("div")
    contentdiv.className="content";
    contentdiv.setAttribute("hidden","hidden");
    contentdiv.id="divcontent"+data.id
    console.log(contentdiv.id)

   

    var authorinblog = document.createElement("h2");
    authorinblog.id="authorinblog";
    authorinblog.style="color: brown;";
    authorinblog.appendChild(document.createTextNode(data.author));

    contentdiv.appendChild(authorinblog);
    
    var contentinblog = document.createElement("h3");
    contentinblog.id="contentinblog";
    contentinblog.appendChild(document.createTextNode(data.content));
    contentdiv.appendChild(contentinblog);

    var commentsdiv=document.createElement("div")
     commentsdiv.id = "commentsdiv"+data.id;
    var commentForm = document.createElement("form");
    var formlable =document.createElement("label");
    formlable.appendChild(document.createTextNode("Comments"));
    commentForm.appendChild(formlable);
    var forminput = document.createElement("input");
    forminput.type ="text";
    forminput.id="comments"+data.id;
    forminput.placeholder="Write a comment";
    commentForm.appendChild(forminput);
    var commentButton = document.createElement("button");
    commentButton.id="postcomment";
    commentButton.appendChild(document.createTextNode("Post"));
    commentForm.appendChild(commentButton);

    commentsdiv.appendChild(commentForm);

   

    contentdiv.appendChild(commentsdiv);
    blogsdiv.appendChild(contentdiv);
    blogscontainer.appendChild(blogsdiv);
   

}

function showcomments(id,comment,commentid){
    var li = document.createElement("li");  
    li.appendChild(document.createTextNode(comment));
    li.id=commentid;
    var delbutton= document.createElement("button");
    delbutton.id="delete";
    delbutton.appendChild(document.createTextNode("Delete"));
    li.appendChild(delbutton);
    var commentsdiv = document.getElementById("commentsdiv"+id)
    commentsdiv.appendChild(li);
}

// window.addEventListener("DOMContentLoaded",async ()=>{
//     try{

//        var blog = await axios.get("http://localhost:4000/blog")
//         console.log(blog.data)
//         for( var i=0;i<blog.data.length;i++){
//             showDataToScreen(blog.data[i]);
//         }
    
//     }catch(err){
//         console.log(err);
//     }
    
//     try{
//         var comment = await axios.get("http://localhost:4000/blog/comments");
//         console.log(comment.data)
//         for( var i=0;i<comment.data.length;i++){
//             showcomments(comment.data[i].blogId,comment.data[i].comment,comment.data[i].id);
//         }

//     }catch(err){
//         console.log(err);
//     }



// })


// async function openBlog(e){
//     e.preventDefault()
//     if(e.target.id=="showblog"){       
//         var id = e.target.parentElement.parentElement.id;  
//         var contentDiv = document.getElementById("divcontent"+id);
//         console.log(contentDiv.getAttribute("hidden"))
       
//         if(contentDiv.getAttribute("hidden")=="hidden"){
//             contentDiv.removeAttribute("hidden");
//         }else{
//             contentDiv.setAttribute("hidden","hidden");
//         }
         
//     }  
//     if(e.target.id=="postcomment"){
//         var id = e.target.parentElement.parentElement.parentElement.parentElement.id;
//         var comment=document.getElementById("comments"+id).value;
//         var myobj ={
//             comment:comment,
//             blogid:id
//         }
        
//         try {
//             var commentres = await axios.post("http://localhost:4000/blog/comments",myobj)
//             var commentid = commentres.data.newBlogCommentsDetail.id;
//             showcomments(id,comment,commentid);
//         }catch(err){
//             console.log(err);
//         }
        
//     }
//     if(e.target.id=="delete"){
//         var li = e.target.parentElement;
//         try{
//             var deleteres = await axios.delete("http://localhost:4000/blog/comments/"+li.id);
//             li.remove();
//         }catch(err){
//             console.log(err);
//         }
        
//     }
// }



