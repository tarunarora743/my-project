/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements view functions...">
 *
 * Student Name: Aarya Hattangdi
 * Student Number: 46346953
 *
 */

export {Views}


const Views = {

singlePostView : ``,

mainPageView : ` <div id="three-images" class="flowtow">
<script>
  var mydata = [];
  
    $(document).ready(function () {
      $.getJSON('js/sample.json', function(data) {
        for(i=0; i<data.length; i++){
          mydata.push(data[i]);
        } 
        for (i=0; i<3; i++){
          var index = Math.floor(Math.random() * mydata.length);
          var div1 = document.createElement('div');        // Create an <img> element.
          div1.innerHTML = '<img src='+mydata[index].p_url+'>' + '<a class="caption">'+ mydata[index].p_caption + ' by ' + mydata[index].p_author + ' <b>' + mydata[index].p_likes + '</b></a>';                 //giving the image url from data
          document.getElementById('three-images').appendChild(div1);  //appending the image to the div
        }
      });
    });          
</script>
</div>

<div id="target">
<div class="containerdiv" id="lefthandsidediv"> <!--This is the left hand side box for recent posts-->
  <h4 style="text-align: center; color: rgb(114, 70, 131);">Recent Posts</h4>
  
  <script> //script for adding images by timestamp.. involves sorting the array of objects with their timestamp
   // var mydata3 = [];
    
      $(document).ready(function () {
        $.ajax({
          url: "http://localhost:1337/posts",
          type: "GET",
          success: function(result){
            var mydata3 = result;
            mydata3.sort(function(a,b){
              
              return new Date(b.published_at) - new Date(a.published_at);
            });
            for (i=0; i<10; i++){
            var div4 = document.createElement('div');        // Create an <div> element.
            div4.className = "divforposts"
            div4.innerHTML = '<img src='+mydata3[i].p_url+'>' + '<a style="padding-bottom: 20px;">'+ mydata3[i].p_caption + ' by ' + mydata3[i].p_author.username + ' &nbsp &nbsp &nbsp' + mydata3[i].published_at.split('T')[0] + ' <span style="color:blue;";><b>' + ' &nbsp' + mydata3[i].p_likes + '</b></span></a><button type="button" style="float: right;">Like</button>';                 //giving the image url from data
            document.getElementById('lefthandsidediv').appendChild(div4);  //appending the element to parent div
            }
          }
          
        });
      });          
  </script>
</div>


<!--This is for popular posts-->
<div class="containerdiv" id="righthandsidediv"> 
  <h4 style="text-align: center; color: rgb(114, 70, 131);">Popular Posts</h4>
  <script> //script for adding images by popularity.. involves sorting the array of objects(posts)
      $(document).ready(function () {
        $.ajax({
          url: "http://localhost:1337/posts",
          type: "GET",
          success: function(result){
            var mydata2 = result;
            //console.log(mydata2);
            mydata2.sort(function(a,b){
            return b.p_likes - a.p_likes;
            });

            for (i=0; i<10; i++){
            var div3 = document.createElement('div');        // Create an <div> element.
            div3.className = "divforposts"
            div3.innerHTML = '<img src='+mydata2[i].p_url+'>' + '<a style="padding-bottom: 20px;">'+ mydata2[i].p_caption + ' by ' + mydata2[i].p_author.username + ' &nbsp &nbsp &nbsp' + mydata2[i].published_at.split("T" , 1) + ' <span style="color:blue;";><b>' + ' &nbsp' + mydata2[i].p_likes + '</b></span></a><button type="button" style="float: right;">Like</button>';                 //giving the image url from data
            document.getElementById('righthandsidediv').appendChild(div3);  //appending the element to parent div
            }
          }
        });
      });          
  </script>
</div>
</div>`
}
