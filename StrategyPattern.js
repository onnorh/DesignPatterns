"use strict";
/**
  * Strategy Pattern - Separating a set of algorithms by encapsulating each of them,
  * and making them interchangeable. This concept is similar to a war game where you
  * would have different ways of fighting the opponent. You start with the same set
  * of resources each game, and then ending the game by defeating the opponent. The
  * end goal remains the same throughout all the games.
  *
  * Example - You want to log in to a website, the website offers many ways of logging
  * on. You may choose to use your Facebook account, Google Plus, LinkedIn. However,
  * these require different login mechanism. So let's keep the complexity of each
  * mechanism to its own class.
  *
  * Note: This pattern is meant to provide different ways of achieving the goal with
  * the same starting resources. Therefore, the functions shouldn't contain different
  * parameters.
  */

class LoginMethod {
    login() {
        console.log("Please choose a login method");
    }
}

class FacebookLogin extends LoginMethod {
    login() {
        console.log(`Logging with Facebook Account...
Redirected to Facebook Page to authorise this application
Successfully logged on`);
    }
}

class GoogleLogin extends LoginMethod {
    login() {
        console.log(`Logging with Google Account...
Redirected to Google Page to authorise this application
Google requires mobile verification code
Successfully verified
Successfully logged on`);
    }
}

class LinkedInLogin extends LoginMethod {
    login() {
        console.log(`Logging with LinkedIn Account...
 Redirected to LinkedIn to authorise this application
 Successfully logged on`);
    }
}

class User {
    constructor() {
        // Set the default login method
        this.loginMethod = new LoginMethod();
    }
    setLoginMethod(altLoginMethod) {
        this.loginMethod = altLoginMethod;
    }
    performLogin() {
        this.loginMethod.login();
    }
}

// This user has no login method defined
let user1 = new User();
user1.performLogin();

// This user uses Facebook
let user2 = new User();
user2.setLoginMethod(new FacebookLogin());
user2.performLogin();

// This user uses Google
let user3 = new User();
user3.setLoginMethod(new GoogleLogin());
user3.performLogin();
