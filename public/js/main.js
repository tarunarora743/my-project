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

window.onload = async function() {
    await Model.getPosts();
    console.log("wowza2", await Model.getPosts2());
}


