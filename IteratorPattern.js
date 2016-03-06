"use strict";
/**
  * Iterator Pattern - provides a way to access the elements of an aggregate object
  * sequentially without exposing its underlying representation
  *
  * Example - For Javascript, some API may choose to put in a list of items inside 
  * an array, some may choose to put inside a object. If the developer wants to
  * merge the items in an array and items in a object together, there will be a
  * problem to iterate through these items together as there is a different
  * set of functions to access them, iterator pattern solves this issue by
  * wrapping the list of items and access them though a common interface
  *
  */

function forceRequiredMethods(_class, methods) {
    for (let eachMethod of methods) {
        if(_class[eachMethod] === undefined || typeof _class[eachMethod] !== "function") {
            throw new TypeError(eachMethod + " is required and has to be overriden.");
        }
    }
}

class Iterator {
	constructor() {
		let _class = this;
		forceRequiredMethods(_class, ["hasNext", "next"]);
	}
}

class ArrayIterator extends Iterator {
	constructor(items) {
		super();
		this.items = items;
		this.currentIndex = 0;
	}
	next() {
		let item = this.items[this.currentIndex];
		this.currentIndex = this.currentIndex + 1;
		return item;
	}
	hasNext() {
		if (this.currentIndex >= this.items.length) {
			return false;
		} else {
			return true;
		}
	}
}

class ObjectIterator extends Iterator {
	constructor(items) {
		super();
		this.items = items;
		this.indexes = Object.keys(items);
		this.currentIndex = 0;
	}
	next() {
		let itemIndex = this.indexes[this.currentIndex];
		let item = this.items[itemIndex];
		this.currentIndex = this.currentIndex + 1;
		return item;
	}
	hasNext() {
		if (this.currentIndex >= this.indexes.length) {
			return false;
		} else {
			return true;
		}
	}
}

let arrayItems = [1,2,3, {i: 4}];
let objectItems = {
	one: 1,
	two: 2,
	three: 3,
	four: {
		i: 4
	}
}

let arrayIterator = new ArrayIterator(arrayItems);
let objectIterator = new ObjectIterator(objectItems);

while (arrayIterator.hasNext() && objectIterator.hasNext()) {
	console.log(arrayIterator.next());
	console.log(objectIterator.next());
}


