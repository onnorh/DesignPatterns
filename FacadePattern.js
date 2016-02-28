"use strict";
/**
  * Facade Pattern - hides complexity to provide a simplified interface. In this case,
  * it can be used to create a better experience for API consumers by providing a 
  * streamlined function that does many tasks.
  *
  * Example - You have an API that adds an item to a shopping cart, then have the option
  * to checkout. After which, the payment will be charged to the user's account. These
  * tasks can be simplified into a single function as one-click buy or quick buy.
  * The one-click buy or quick buy function uses the facade pattern and it brings the
  * user to the payment page directly with one item only.
  *
  */

class Item {
	constructor(label, price) {
		this.label = label;
		this.price = price;
	}
}

class Cart {
	constructor() {
		this.items = [];
		this.total = 0;
	}

	addItem(item) {
		this.items.push(item);
	}

	totalFromItems() {
		let price = 0;
		this.items.forEach((item) => {
			price = price + item.price;
		})
		this.total = price;
	}

	groupItems() {
		let groups = {}
		this.items.forEach((item) => {
			if(groups[item.label]) {
				groups[item.label]["items"].push(item);
				groups[item.label]["count"] = groups[item.label]["count"] + 1;
			} else {
				groups[item.label] = {
					items: [item],
					unitPrice: item.price,
					count: 1
				};
			}
		})
		return groups;
	}

	checkOut() {
		console.log("Redirecting user to checkout page");
	}

	addShipping(fee) {
		this.total = this.total + fee;
	}

	makePayment() {
		console.log("Redirecting user to payment page");
	}

	displayCartInfo() {
		let groups = this.groupItems();
		return {
			cart: groups,
			total: this.total
		}
	}
}

var item1 = new Item("Green Tea", 6.0);
var item2 = new Item("Black Tea", 5.0);
var cart = new Cart();
cart.addItem(item1);
cart.addItem(item1);
cart.addItem(item2);
cart.totalFromItems();
cart.checkOut();
cart.addShipping(2.0);
cart.makePayment();
console.log(cart.displayCartInfo())

/**
  * Use facade pattern to simplify the checking out process of one item only
  *
  */

class CartFacade {
	constructor(cart) {
		this.cart = cart;
	}

	quickBuy(item) {
		this.cart.addItem(item);
		this.cart.totalFromItems();
		this.cart.checkOut();
		this.cart.addShipping(2.0);
		this.cart.makePayment();
		console.log(this.cart.displayCartInfo());
	}
}

console.log("----- From CartFacade (Reduced to 2 lines of code) -----");
var cartFacade = new CartFacade(new Cart());
cartFacade.quickBuy(item1);
