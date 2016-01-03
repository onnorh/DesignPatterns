"use strict";
/**
  * Simple Factory Pattern - decouples object creation to an interface,
  * encapsulating complexity of code into another object and that object's
  * main role is just for generating different types of components
  *
  * Example - User in different locale have different language and currency.
  * A user factory can be used in this case to supervise the creation of
  * the different type of users
  *
  */

class UserFactory {
    createUser(locale) {
        if(locale == "us") {
            return new AmericanUser();
        } else if(locale == "china") {
            return new ChineseUser();
        } else if(locale == "japan") {
            return new JapaneseUser();
        } else if(locale == "uk") {
            return new BritishUser();
        } else if(locale == "australia") {
            return new AustralianUser();
        } else {
            console.log("Please specify a locale");
            return;
        }
    }
}

class User {
    constructor(language, currency) {
        this.language = language;
        this.currency = currency;
    }
    getProfile() {
        return {
            language: this.language,
            currency: this.currency
        }
    }
}

class AmericanUser extends User {
    constructor() {
        super("English", "USD");
    }
}

class ChineseUser extends User {
    constructor() {
        super("Chinese", "RMB");
    }
}

class JapaneseUser extends User {
    constructor() {
        super("Japanese", "JPY");
    }
}

class BritishUser extends User {
    constructor() {
        super("English", "GBP");
    }
}

class AustralianUser extends User {
    constructor() {
        super("English", "AUD");
    }
}

var userFactory = new UserFactory();
var americanUser = userFactory.createUser("us");
console.log(americanUser.getProfile())
