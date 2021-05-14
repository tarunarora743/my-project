/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements main entry point...">
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
    await Model.getPosts();
    await Model.getUsers();
    await Model.getComments();
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
    } else if (hasClass(e.target, 'div')) {
        // .test clicked
        // Do your other thing
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

