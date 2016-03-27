"use strict";
/**
  * State Pattern - Allows an object to change its behaviour when its internal state
  * changes. The object will seem to change its class as well.
  *
  * Example - A candy dispenser is commonly found in shopping malls. This machine
  * takes in coin as an input and delivers candy as the output. There are states
  * involved in this process, hasCoin, noCoin, hasCandy and noCandy states.
  * Each state implements the same set of methods but uses a different algorithm
  * to fit its use case.
  *
  */

class CandyDispenser {
	constructor() {
		this.hasCoin = new HasCoin(this);
		this.noCoin = new NoCoin(this);
		this.hasCandy = new HasCandy(this);
		this.noCandy = new NoCandy(this);
		this.state = this.noCoin;
		this.candyCount = 1;
	}

	getHasCoin() {
		return this.hasCoin;
	}

	getNoCoin() {
		return this.noCoin;
	}

	getHasCandy() {
		return this.hasCandy;
	}

	getNoCandy() {
		return this.noCandy;
	}

	setState(state) {
		this.state = state;
	}

	dispense() {
		this.state.dispense();
	}

	insertCoin() {
		this.state.insertCoin();
	}

	ejectCoin() {
		this.state.ejectCoin();
	}

	turnKnob() {
		this.state.turnKnob();
	}
}

class State {
	constructor(dispenser) {
		this.dispenser = dispenser;
	}

	dispense() {
		console.log("You need to implement this method");
	}

	insertCoin() {
		console.log("You need to implement this method");
	}

	ejectCoin() {
		console.log("You need to implement this method");
	}

	turnKnob() {
		console.log("You need to implement this method");
	}
}

class HasCoin extends State {
	dispense() {
		console.log("Nothing happens");
	}

	insertCoin() {
		console.log("You have already got a coin inside");
	}

	ejectCoin() {
		console.log("The machine returns you back your coin");
		this.dispenser.setState(this.dispenser.getNoCoin());
	}

	turnKnob() {
		console.log("Checking if have candy or not");
		if (this.dispenser.candyCount > 0) {
			this.dispenser.setState(this.dispenser.getHasCandy());
		} else {
			this.dispenser.setState(this.dispenser.getNoCandy());
		}
		this.dispenser.dispense();
	}
}

class NoCoin extends State {
	dispense() {
		console.log("Nothing happens");
	}

	insertCoin() {
		console.log("You inserted a coin");
		this.dispenser.setState(this.dispenser.getHasCoin());
	}

	ejectCoin() {
		console.log("There is no coin for you to eject");
	}

	turnKnob() {
		console.log("Please don't try to cheat the system");
	}
}

class HasCandy extends State {
	dispense() {
		console.log("One candy drop out");
		this.dispenser.candyCount = this.dispenser.candyCount - 1;
		console.log(`Candies left: ${this.dispenser.candyCount}`);
		this.dispenser.setState(this.dispenser.getNoCoin());
	}

	insertCoin() {
		console.log("Eating your coin, please wait");
	}

	ejectCoin() {
		console.log("Sorry too late, eating your coin now");
	}

	turnKnob() {
		console.log("You can't dispense twice!");
	}
}

class NoCandy extends State {
	dispense() {
		console.log("No more candy left, sorry");
		this.dispenser.setState(this.dispenser.getHasCoin());
	}

	insertCoin() {
		console.log("Your coin is still inside");
	}

	ejectCoin() {
		console.log("The machine returns you back your coin");
		this.dispenser.setState(this.dispenser.getNoCoin());
	}

	turnKnob() {
		console.log("You can't turn the knob yet!");
	}
}

var candyDispenser = new CandyDispenser();

candyDispenser.insertCoin();
candyDispenser.insertCoin();
candyDispenser.turnKnob();
candyDispenser.ejectCoin();
candyDispenser.insertCoin();
candyDispenser.turnKnob();
candyDispenser.ejectCoin();


