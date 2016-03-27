"use strict";
/**
  * Composite Pattern - treat a group of objects uniformly. It composes objects into
  * tree structures to represent part as well as whole hierarchy.
  *
  * Example - A person can be a single person and a person can have many persons under
  * him/her, for example his/her children. In this case, composite pattern can be
  * used.
  *
  */

class Person {
	constructor(name, age) {
		this.name = name
		this.age = age
		this.children = []
	}
	registerChild(child) {
		this.children.push(child);
	}
	disownChild(index) {
		this.children.splice(index, 1);
	}
	listDescendents() {
		let currentPerson = this;
		return (function recursiveGet(person, level) {
			console.log("|" + "-".repeat(level*2) + " Current Person: " + person.name + ", Level: " + level);
			if (person.children.length > 0) {
				for (let eachDescendent of person.children) {
					recursiveGet(eachDescendent, level + 1);
				}
			} 
		})(currentPerson, 1)
	}
}

console.log("Tim is a person and has two sons, Tom and Teddy");

var tim = new Person("Tim", 65);
var tom = new Person("Tom", 32);
var ted = new Person("Teddy", 28);

tim.registerChild(tom);
tim.registerChild(ted);

console.log("Tom is married and has a daughter, Cheryl");

var cheryl = new Person("Cheryl", 5);
tom.registerChild(cheryl);

console.log("--- Descendents of Tim");
tim.listDescendents();

console.log("--- Descendents of Tom");
tom.listDescendents();

console.log("We forgot to add the great grandfather, Joe");
var joe = new Person("Joe", 90);
joe.registerChild(tim);
joe.listDescendents();


console.log("Teddy gets married and gets a son, Paul");
var paul = new Person("Paul", 1);
ted.registerChild(paul);

console.log("Now the hierarchy gets even bigger");
joe.listDescendents();