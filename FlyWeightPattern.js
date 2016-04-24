"use strict";

/**
  * FlyWeight Pattern - Used if there is a need to create a large number of objects. It shares
  * similar objects rather than create individual ones, that in turns use up more memory space.
  *
  * Example - In a christmas tree, there can be a few hundreds to a few thousands of LEDs of
  * different colors on it. Rather than creating new configuration for each LED, FlyWeight
  * can be used here to use the same configuration if both LEDs have the same color,
  * saving memory space and making the process more efficient.
  *
  */

const colors = ["yellow", "red", "blue", "green", "purple", "orange", "cyan", "white"];

class LED {
	constructor(color) {
		this.color = color;
	}
}

class LEDFactory {
	constructor() {
		this.ledTypes = {};
	}

	getLED(color) {
		let ledTypes = this.ledTypes;
		let led;
		if (color in ledTypes) {
			led = ledTypes[color];
		} else {
			led = new LED(color);
			ledTypes[color] = led;
		}
		return led;
	}
}

class ChristmasTree {
	constructor() {
		this.ledFactory = new LEDFactory();
		this.leds = [];
	}

	putLed() {
		let randChoice = Math.floor(Math.random() * colors.length);
		this.leds.push(this.ledFactory.getLED(colors[randChoice]));
	}

}

var xmasTree = new ChristmasTree();

var timeBefore = process.hrtime();
for (var i = 100000; i >= 0; i--) {
	xmasTree.putLed();
}
var timeTaken = process.hrtime(timeBefore)[1]/1000000;

console.log(`Time Taken (With FlyWeight): ${timeTaken}ms`);

var anotherXmasTree = new ChristmasTree();

var timeBefore2 = process.hrtime();

for (var i = 100000; i >= 0; i--) {
	let randChoice = Math.floor(Math.random() * colors.length);
	let led = new LED(colors[randChoice]);
	anotherXmasTree.leds.push(led);
}
var timeTaken2 = process.hrtime(timeBefore2)[1]/1000000;

console.log(`Time Taken (Without FlyWeight): ${timeTaken2}ms`);
