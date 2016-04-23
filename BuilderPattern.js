"use strict";

/**
  * Builder Pattern - Breaking down the creation of an object (usually complex) into smaller
  * builds inside a builder. This pattern is useful if you want the creation of the components
  * to be separated from the main build as well as hiding the processes from the client.
  * The builder is the only one knowing the processes.
  *
  * Example - To brew a coffee, there are several steps. To make a good coffee you would need a
  * barista that knows what he/she is doing. The barista is the builder.
  *
  */

class Coffee {
	constructor() {
		this.expresso = 0;
		this.milk = 0;
		this.water = 0;
		this.chocolate = 0;
	}
}

class CoffeeMaker {
	constructor() {
		this.coffee = new Coffee();
	}

	putExpresso(percentage) {
		this.coffee.expresso = percentage;
	}

	putMilk(percentage) {
		this.coffee.milk = percentage;
	}

	putWater(percentage) {
		this.coffee.water = percentage;
	}

	putChocolate(percentage) {
		this.coffee.chocolate = percentage;
	}
}

class AmericanoMaker extends CoffeeMaker {
	putExpresso() {
		super.putExpresso(20);
	}
	putMilk() {
		super.putMilk(0);
	}
	putWater() {
		super.putWater(80);
	}
	putChocolate() {
		super.putChocolate(0);
	}
}

class LatteMaker extends CoffeeMaker {
	putExpresso() {
		super.putExpresso(25);
	}
	putMilk() {
		super.putMilk(75);
	}
	putWater() {
		super.putWater(0);
	}
	putChocolate() {
		super.putChocolate(0);
	}
}

class MochaMaker extends CoffeeMaker {
	putExpresso() {
		super.putExpresso(25);
	}
	putMilk() {
		super.putMilk(25);
	}
	putWater() {
		super.putWater(0);
	}
	putChocolate() {
		super.putChocolate(50);
	}
}

class Barista {
	constructor(maker) {
		this.maker = maker;
	}

	setMaker(maker) {
		this.maker = maker;
	}

	serveCoffee() {
		return this.maker.coffee;
	}

	makeCoffee() {
		this.maker.putExpresso();
		this.maker.putMilk();
		this.maker.putWater();
		this.maker.putChocolate();
	}
}

var americanoMaker = new AmericanoMaker();
var latteMaker = new LatteMaker();
var mochaMaker = new MochaMaker();

var john = new Barista(americanoMaker);
john.makeCoffee();
console.log(john.serveCoffee()); 

john.setMaker(latteMaker);
john.makeCoffee();
console.log(john.serveCoffee());

john.setMaker(mochaMaker);
john.makeCoffee();
console.log(john.serveCoffee());
