"use strict";
/**
  * Template Method Pattern - define a set of algorithms while allowing its subclasses
  * to override some methods in order to work with a particular object.
  *
  * Example - The making of caffeine beverages such as tea and coffee have similar
  * processes except a few that might need a little tweak. These processes can follow
  * a template to reduce code duplication
  *
  */

function forceRequiredMethods(_class, methods) {
    for (let eachMethod of methods) {
        if(_class[eachMethod] === undefined || typeof _class[eachMethod] !== "function") {
            throw new TypeError(eachMethod + " is required and has to be overriden.");
        }
    }
}

class CaffeineBeverage {
	constructor() {
		let _class = this;
		forceRequiredMethods(_class, ["brew", "addCondiments"])
	}

	boilWater() {
		console.log("Boiling Water")
	}

	pourIntoCup() {
		console.log("Pouring boiled water into the cup");
	}

	decorate() {
		console.log("This is an optional method, which is called a hook method. The subclasses can choose whether to call this method or not");
	}
}

class Tea extends CaffeineBeverage {
	brew() {
		console.log("Steeping in a tea bag into the cup");
	}

	addCondiments() {
		console.log("Adding lemon into the cup");
	}
}

class Coffee extends CaffeineBeverage {
	brew() {
		console.log("Brewing coffee grinds in the cup");
	}

	addCondiments() {
		console.log("Adding sugar and milk into the cup");
	}
}

console.log("----- Tea -----");
var tea = new Tea();
tea.boilWater();
tea.brew();
tea.pourIntoCup();
tea.addCondiments();

console.log("----- Coffee -----");
var coffee = new Coffee();
coffee.boilWater();
coffee.brew();
coffee.pourIntoCup();
coffee.addCondiments();