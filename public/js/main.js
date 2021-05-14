/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements main entry point. Also implements most of the Event handlers">
 *
 * Student Name: Aarya Hattangdi
 * Student Number:46346953
 *
 */


// function redraw() { 

//     let content = "<h2>API Test</h2><ul>";
//     content += "<li><a href='/#'>Three Posts</a></li>";
//     content += "<li><a href='/#'>Recent Posts</a></li>";
//     content += "<li><a href='/#'>Popular Posts</a></li>";
//     content += "<li><a href='/posts/1'>A Single Post</a></li>"; 
//     content += "</ul>";

//     // update the page
//     document.getElementById("target").innerHTML = content;
// }

// window.onload = function() {
//     redraw();
// };

import {Model} from './model.js'
import {Auth} from './service.js'
import {Views} from './views.js'


window.onload = async function() {
    await makeHomeView();
}





async function  makeHomeView(){
    var recentPostData = [];
     
     recentPostData = await Model.getPosts2();  


     //making 3 random post layout
     var mydata = recentPostData
     document.getElementById("bigdiv").innerHTML =  Views.mainPageView;
     for (var i=0; i<3; i++){
                var index = Math.floor(Math.random() * mydata.length);
                var div1 = document.createElement('div');        // Create an <img> element.
                div1.innerHTML = '<img src='+mydata[index].p_url+'>' + '<a class="caption">'+ mydata[index].p_caption + ' by ' + mydata[index].p_author.username + ' <b>' + mydata[index].p_likes + '</b></a>';                 //giving the image url from data
                document.getElementById('three-images').appendChild(div1);  //appending the image to the div
              }       
     var popularPostData = recentPostData;   
     recentPostData.sort(function(a,b){
      return new Date(b.published_at) - new Date(a.published_at);
     });

     //making recent posts layout
     for (var i=0; i<10; i++){
       var div4 = document.createElement('div');        // Create an <div> element.
       div4.className = "divforposts"
       //div4.innerHTML = '<img src='+recentPostData[i].p_url+'>' + '<a style="padding-bottom: 20px;">'+ recentPostData[i].p_caption + ' by ' + recentPostData[i].p_author.username + ' &nbsp &nbsp &nbsp' + recentPostData[i].published_at.split('T')[0] + ' <span style="color:blue;";><b>' + ' &nbsp' + recentPostData[i].p_likes + '</b></span></a><button class="like" type="button" style="float: right;">Like</button>';
       div4.innerHTML = `<img src=${recentPostData[i].p_url}><div class="divcaption">${recentPostData[i].p_caption} by  ${recentPostData[i].p_author.username} </div><div class="divpublishedat"> ${recentPostData[i].published_at.split('T')[0]}</div> <div class="divlikes">${recentPostData[i].p_likes}</div><button class="like" type="button" name="${recentPostData[i].id}" style="float: right;">Like</button>`;                 //giving the image url from data
       document.getElementById('lefthandsidediv').appendChild(div4);  //appending the element to parent div
     }

     //Making popular posts layout
     popularPostData.sort(function(a,b){
      return b.p_likes - a.p_likes;
     });
 
      for (i=0; i<10; i++){
        var div3 = document.createElement('div');        // Create an <div> element.
        div3.className = "divforposts"
        //div3.innerHTML = '<img src='+popularPostData[i].p_url+'>' + '<a style="padding-bottom: 20px;">'+ popularPostData[i].p_caption + ' by ' + popularPostData[i].p_author.username + ' &nbsp &nbsp &nbsp' + popularPostData[i].published_at.split("T" , 1) + ' <span style="color:blue;";><b>' + ' &nbsp' + popularPostData[i].p_likes + '</b></span></a><button class="like" type="button" style="float: right;">Like</button>';                 //giving the image url from data
        div3.innerHTML = `<img src=${popularPostData[i].p_url}><div class="divcaption">${popularPostData[i].p_caption} by  ${popularPostData[i].p_author.username} </div><div class="divpublishedat"> ${popularPostData[i].published_at.split('T')[0]}</div> <div class="divlikes">${popularPostData[i].p_likes}</div><button class="like" type="button" name="${popularPostData[i].id}" style="float: right;">Like</button>`;            
        document.getElementById('righthandsidediv').appendChild(div3);  //appending the element to parent div
      }
     
    }
   

 //Event listener for click
 document.addEventListener('click', async function (e) {
    if (hasClass(e.target, 'like')) {
        var postId = e.target.name;
        var currentLikes= parseInt(e.target.previousSibling.innerHTML) ;
        var newLikes = currentLikes+1;
        e.target.previousSibling.innerHTML = newLikes;
        await Model.addLike(postId, newLikes);
        makeHomeView();
    } else if (hasClass(e.target, 'delete')) {
        var postId = e.target.name;
        await Model.deletePost(postId, Auth.userData.jwt)
        e.target.parentNode.parentNode.innerHTML = '';


    }else if (hasClass(e.target, 'logout')) {
        
        var targetform = document.getElementById("loginform")
        var targethtml = `<a style="margin-right: 5px;">User :</a>
        <input type="text" name="username" id="username" placeholder="Your username"/>
        <a style="margin-right: 5px;">Password :</a>
        <input type="password" name="password" id="password" placeholder="Your password"/>
        <input type="submit">
        <a id="errorTarget"></a>`

        targetform.innerHTML = targethtml;
        Auth.userData = null;

    }
  }, false);

//function to check element has a particular class
function hasClass(elem, className) {
  return elem.className.split(' ').indexOf(className) > -1;
}




   //Event listener for allposts
   document.getElementById("allposts").addEventListener("click", async function(){
    var postdata = await Model.getPosts2();
    if (postdata.length >0){
      var targetdiv = document.getElementById("bigdiv");
      var div8 = ''      // ******Add a heading for all posts************
      for (var i=0; i<postdata.length; i++){
        div8 += `<div class="divforAllPostsView"><img src="${postdata[i].p_url}"><div class="divcaption">${postdata[i].p_caption} by  ${postdata[i].p_author.username} </div><div class="divcomments">Comments</div></div>`
      }
      document.getElementById("bigdiv").innerHTML =  div8;
      //document.getElementById("bigdiv").innerHTML +="wowzaaa33333"  //change this line later
    }else{
      document.getElementById("bigdiv").innerHTML =  "No data found";
    }
    
  })


  //Event Listener for Home Button
  document.getElementById("home").addEventListener("click", function(){
    makeHomeView();
  })


  //Event listener for myposts
  document.getElementById("myposts").addEventListener("click", function(){
    if (Auth.userData){
      var contentdiv = Views.createPostView;
      for (var i=0; i<Auth.userData.user.posts.length; i++){
        contentdiv += `<div class="divforMyPostsView"><img src="${Auth.userData.user.posts[i].p_url}"><div class="divcaption">${Auth.userData.user.posts[i].p_caption}</div><div class="divcomments">Comments<ul><li>${Auth.userData.user.comment.c_content}</li></ul></div><div class="divdelete"><button name="${Auth.userData.user.posts[i].id}" class="delete" type=button>Delete</button></div></div>` ;
      }
      document.getElementById("bigdiv").innerHTML = `<div class="heading2">My Posts</div>`
      document.getElementById("bigdiv").innerHTML += contentdiv;
      
    }else{
      document.getElementById("bigdiv").innerHTML =  "<b>You have to login first</b>";
    }
  })



 
  
  var formElem = document.getElementById("loginform") 
  formElem.onsubmit = async (e) => {
    e.preventDefault();
    var data = new FormData(formElem);
    const username = data.get("username");
    const password = data.get("password");


    let result = await Auth.login(username, password);

    if (result.status ===200){
      var newLoginLayout = document.getElementById("loginform");
      newLoginLayout.innerHTML = `<a><b>Logged in as ${username} </b></a><input type="button" class="logout" value="Logout" style="float: right;">`
    }else{
      var newLoginFailLayout = document.getElementById("errorTarget");
      var loginFailElement = document.createElement('a');
      //clearing the input form
      document.getElementById("username").value= '';
      document.getElementById("password").value = '';

      newLoginFailLayout.innerHTML = `<b style="color:red;">Login Failed, please try again</b>`;
    }
  }
