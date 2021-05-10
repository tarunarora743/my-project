/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements user authentication ...">
 *
 * Student Name:Aarya Hattangdi
 * Student Number:46346953
 *
 */ 

export {Auth}

const Auth = {
    userData: null,
    authLoginUrl : "auth/local",

    // login - handle user login  
    //      by submitting a POST request to the server API
    //      username - is the input username
    //      password - is the input password
    // when the request is resolved, creates a "userLogin" event
    login: async function(username, password) {
        
        let requestbody = {
            "identifier": username,
            "password": password
        }
    
        const rawResponse = await fetch('/auth/local', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestbody)
         });
         const content = await rawResponse.json();
             
    
          if (rawResponse.status === 200) {
            this.userData = content;
            return rawResponse;
          }else {
              return rawResponse;
          }
   
    }, 

    //getUser - return the user object from userData
    getUser: function() {
        if (this.userData) {
            return this.userData.user;
        } else {
            return null;
        }
    },

    //getJWT - get the JWT from userData
    getJWT: function() {
        if (this.userData) {
            return this.userData.jwt;
        } else {
            return null;
        } 
    }
    
}