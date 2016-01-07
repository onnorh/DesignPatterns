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
  */

class SuperAdministrator {
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

let adminCreator = new AdminCreator();
let adminUser = adminCreator.createUser();
console.log(adminUser.getPrivileges());
