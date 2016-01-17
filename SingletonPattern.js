"use strict";

/**
  * Singleton Pattern - Simplest pattern of all that ensures only one class
  * has only one instance and it is a global property.
  *
  * Example - Usually for configuration settings where you don't want to create
  * a chaos by having many instances of the same class
  *
  */

let Singleton = (() => {
    let instance = undefined;

    class ConfigModule {
        someReallyUsefulFunction() {
            console.log("Hello World");
        }
    }

    let getInstance = () => {
        if (!instance) {
            instance = new ConfigModule()
        }
        return instance;
    }

    return {
        getInstance: getInstance
    };
})();

let instance1 = Singleton.getInstance();
let instance2 = Singleton.getInstance();

console.log(instance1 === instance2);
