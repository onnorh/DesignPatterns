"use strict";
/**
  * Factory Method Pattern - A pattern which uses sub classes to generate an
  * object. This pattern can be considered a more advanced version of the
  * Simple Factory Pattern but it delegates the creation of components to
  * the subclasses
  *
  * Example - The Super Administrator is considered the Creator in the application
  * He/she is able to create an administrator account, an editor account or just
  * a normal user account
  *
  * In this example I use npm:prompt to get user input
  */

var prompt = require("prompt");

class SuperAdministrator {
    // SuperAdministrator provides an interface
    createUser() {

    }
}

class AdminCreator extends SuperAdministrator {
    createUser() {
        return new Admin();
    }
}

class EditorCreator extends SuperAdministrator {
    createUser() {
        return new Editor();
    }
}

class UserCreator extends SuperAdministrator {
    createUser() {
        return new User();
    }
}

class User {
    constructor(privileges) {
        //Default CanView
        this.privileges = ["CanView"].concat(privileges)
    }
    getPrivileges() {
        return this.privileges;
    }
}

class Admin extends User {
    constructor() {
        super(["CanCreate", "CanEdit"])
    }
}

class Editor extends User {
    constructor() {
        super(["CanEdit"])
    }
}

prompt.start();

let user;

prompt.get([{
    name: "user_type",
    description: `What kind of user do you wish to create? ["admin", "editor", "normal"]`,
    required: true
}], function(err, result) {
    let userType = result.user_type;
    let userFactory;
    if (userType == "admin") {
        userFactory = new AdminCreator();
    } else if (userType == "editor") {
        userFactory = new EditorCreator();
    } else {
        userFactory = new UserCreator();
    }

    user = userFactory.createUser();
    console.log(user.getPrivileges());
})
