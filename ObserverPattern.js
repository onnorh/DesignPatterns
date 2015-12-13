'use strict';
/**
  * Observer Pattern - Defines a one-to-many relationships where there is a Subject
  * and many Observers. Like the name suggests, the Observers observe the Subject,
  * receive notifications from the Subject when something has changed. This concept
  * is similar to Followers and Following in Twitter.
  *
  * Example - In picture sharing application like Instagram, on your dashboard you
  * find pictures of the users you are following. That user may or may not know
  * you are following him/her. The observer in this case refers to you following a
  * user and the user becomes the subject.
  *
  */

class NotificationData {
    constructor(data) {
        if(this.validData(data)) {
            this.data = data;
        } else {
            this.data = {};
        }
    }
    validData(data) {
        // Data validation before you can return the correct data
        console.log("No need validation")
        // Create your logic if you need validation if not return true
        return true;
    }
}

class Subject {
    constructor(name) {
        // Create a new Array of Observers
        this.observers = [];
        this.name = name;
    }
    addObserver(observer) {
        this.observers.push(observer);
    }
    removeObserver(observer) {
        var index = this.observers.indexOf(observer);
        this.observers.splice(index, 1);
    }
    notifyObservers(notificationData) {
        this.observers.forEach((observer) => observer.update(notificationData));
    }
}

class Observer {
    constructor(name) {
        this.newPosts = [];
        this.isOnline = false;
        this.name = name;
    }
    update() {
        // When notification received, update something
        console.log("Nothing to update over here");
    }
}

class NewPost extends NotificationData {
    validData(data) {
        // Check if data has url and description if not it is not a valid data
        if(data.hasOwnProperty('name') && data.hasOwnProperty('url') && data.hasOwnProperty('description')) {
            return true;
        } else {
            return false;
        }
    }
}

class User extends Subject {
    createPost(url, description) {
        var data = {
            name: this.name,
            url: url,
            description: description
        }
        var newPost = new NewPost(data).data;
        this.notifyObservers(newPost);
    }
}

class Follower extends Observer {
    update(data) {
        // After updating, send out notifications to Followers
        this.newPosts.push(data);
        if(this.isOnline) {
            this.display();
            this.seen();
        }
    }
    seen() {
        this.newPosts = [];
    }
    setOnline(b) {
        this.isOnline = b;
        // Display new data after going online
        this.display();
        this.seen();
    }
    display() {
        console.log(this.name + ":" + JSON.stringify(this.newPosts));
        this.seen();
    }
}

// Initiate a really popular woman
let chloe = new User("Chloe");
// Initiate the Followers
let tom = new Follower("Tom");
let jack = new Follower("Jack");

// Let the guys follow Chloe
chloe.addObserver(tom);
chloe.addObserver(jack);

// Let Tom be offline while Jack be online, so Jack will receive instant notification
jack.setOnline(true);

// Chloe creates a post and Jack will receive updates while Tom has to wait to be online
console.log("Only Jack received the new post");
chloe.createPost("http://www.myselfie.com/selfie1.png", "Selfie taken at home");
console.log("Now Jack received another new post");
chloe.createPost("http://www.mymodelshoot.com/modelshoot1.png", "Model shoot");

console.log("Now Tom goes online");
tom.setOnline(true);

console.log("Now Chloe creates another post and both guys receive it");
chloe.createPost("http://www.ootd.com/ootd.png", "#ootd");

console.log("Chloe finds Tom creepy, removes him, then creates a new post");
chloe.removeObserver(tom);
chloe.createPost("http://www.ootd2.com/ootd2.png", "#ootd");
