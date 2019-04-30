function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());
    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);

    if (response.status === 'connected') {
        testAPI();
    } else {
        document.getElementById('status').innerHTML = 'Please log ' +
            'into this app.';
    }
}

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}
window.fbAsyncInit = function () {
    FB.init({
        appId: '350787842232436',
        cookie: true,
        xfbml: true,
        version: 'v3.2'
    });
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
};
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/all.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function (response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
    });
}

var user;
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBOTAPzh3loiCEYirwSO08-WxTKZTX_5IQ",
    authDomain: "cache-cow.firebaseapp.com",
    databaseURL: "https://cache-cow.firebaseio.com",
    projectId: "cache-cow",
    storageBucket: "cache-cow.appspot.com",
    messagingSenderId: "538579668620"
};
firebase.initializeApp(config);

var auth = firebase.auth();

$(document).on('submit', '#form-signup', function (event) {
    event.preventDefault();
    var promise = auth.createUserWithEmailAndPassword($('#signup_email').val(), $(
            '#signup_password')
        .val());
    promise.catch(e => console.log(e.message));
});

$(document).on('submit', '#form-signin', function (event) {
    event.preventDefault();
    var promise = auth.signInWithEmailAndPassword($('#signin_email').val(), $(
            '#signin_password')
        .val());
    promise.catch(e => {
        console.log(e.message);
        $('#alert-signin').text(e.message);
        $('#alert-signin').show();
    });
});

$(document).on('click', '#signout', function (event) {
    event.preventDefault();
    var promise = auth.signOut();
    promise.catch(e => console.log(e.message));
});

auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        user = firebaseUser;
    } else {
        user = null;
        console.log('not logged in');
    }
});