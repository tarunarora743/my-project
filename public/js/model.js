    export {Model};
/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements ...">
 *
 * Student Name: Aarya Hattangdi
 * Student Number:46346953
 *
 */

/* 
 * Model class to support the FlowTow application
 * this object provides an interface to the web API and a local
 * store of data that the application can refer to.
 * The API generates different events:
 *   "modelUpdated" event when new data has been retrieved from the API
 *   "postAdded" event when a request to add a new post returns
 *   "likeAdded" event when a request to add a new like returns
 *   "commentAdded" event when a request to add a new comment returns 
*/

const Model = {
    postsUrl: '/posts', 
    uploadUrl: '/upload',  
    commentsUrl: '/comments',
    
    //this will hold the post data stored in the model
    data: {
        posts: []
    },

    // updatePosts - retrieve the latest list of posts from the server API
    // when the request is resolved, creates a "modelUpdated" event 
    updatePosts: function() {

    },

    // getPosts - return an array of post objects
    getPosts: function() {
        //before that you may need to sort the posts by their timestamp
        const Http = new XMLHttpRequest();
        const url='http://localhost:1337/posts';
        Http.open("GET", url);
        Http.send();

        Http.onreadystatechange = (e) => {
            this.data.posts = Http.responseText
        }
        return this.data.posts;
    },

    // getPost - return a single post given its id
    getPost: function(postid) {

    },

    setPosts: function(posts) {
        this.data.posts = posts;
    },

    // addPost - add a new post by submitting a POST request to the server API
    // postData is an object containing all fields in the post object (e.g., p_caption)
    // when the request is resolved, creates an "postAdded" event
    addPost: function(postData) {

    },

    // getUserPosts - return just the posts for one user as an array
    getUserPosts: function(userid) {
        
    },

    // addLike - increase the number of likes by 1 
    //      by submitting a PUT request to the server API
    //      postId - is the id of the post
    // when the request is resolved, creates an "likeAdded" event
    addLike: function (postId) {
        
    },

    // addComment - add a comment to a post 
    //      by submitting a POST request to the server API
    //      commentData is an object containing the content of the comment, the author and the postid
    // when the request is resolved, creates an "commentAdded" event
    addComment: function (commentData) {
        
    },

    //getRandomPosts - return N random posts as an array
    getRandomPosts: function(N){
        var myarr = this.getPosts();
        var result = this.getRandom(myarr, N);
        return result;
        
    },

    // getRecentPosts - return the N most recent as an array
    //  posts, ordered by timestamp, most recent first
    getRecentPosts: function(N) {
        var mydata6 = this.getPosts();
        mydata6.sort(function(a,b){
            return new Date(b.published_at) - new Date(a.published_at);  
        });
        return mydata6.slice(0,N);
        
    },

    // getPopularPosts - return the N most popular as an array
    // posts, ordered by the number of likes
    getPopularPosts: function(N) {
        var mydata2 = this.getPosts();
        mydata2.sort(function(a,b){
            return b.p_likes - a.p_likes;
        });
        return mydata2.slice(0,N);
    },

    getRandom: function(arr, n) {
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }

}