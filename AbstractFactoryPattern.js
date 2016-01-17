"use strict";
/**
  * Abstract Factory Pattern - provides an interface for creating families of
  * related or dependent objects without specifying their concrete classes. It
  * acts like a salesman who creates a generic order form, find clients, take
  * orders and send the orders to a group of factories to make the products.
  *
  * Example - Say you have online shops that spread out in different regions.
  * The shops in different region will sell the same item but different sizing
  * and cutting to have the best fit for people in the region.
  *
  */

function forceRequiredMethods(_class, methods) {
    for (let eachMethod of methods) {
        if(_class[eachMethod] === undefined || typeof _class[eachMethod] !== "function") {
            throw new TypeError(eachMethod + " is required and has to be overriden.");
        }
    }
}

class Website {
    takeOrder() {

    }
}

class Shop {
    constructor() {
        if(new.target === Shop) {
            throw new TypeError("This is an abstract class");
        }
        let _class = this;
        forceRequiredMethods(_class, ["fetchItem"]);
    }
}

class EuropeanShop extends Shop {
    constructor(warehouse) {
        super();
        this.warehouse = warehouse;
        this.region = "Europe";

    }

    fetchItem() {
        console.log("Fetching item from the European Warehouse");
        let sunglass = this.warehouse.getSunglass();
        let dress = this.warehouse.getDress();
    }
}

class AsianShop extends Shop {
    constructor(warehouse) {
        this.warehouse = warehouse;
        this.region = "Asia";
    }

    fetchItem() {
        console.log("Fetching item from the Asian Warehouse");
        let sunglass = this.warehouse.getSunglass();
        let dress = this.warehouse.getDress();
    }
}

class Warehouse {
    constructor() {
        if(new.target === Warehouse) {
            throw new TypeError("This is an abstract class");
        }
        let _class = this;
        forceRequiredMethods(_class, ["getSunglass", "getDress"])
    }
}

class EuropeanWarehouse extends Warehouse {
    getSunglass() {
        return new EuropeanSunglass();
    }
    getDress() {
        return new EuropeanLimitedEditionDress();
    }
}

class AsianWarehouse extends Warehouse {
    getSunglass() {
        return new AsianSunglass();
    }
    getDress() {
        return new AsianLimitedEditionDress();
    }
}

class Sunglass {

}

class EuropeanSunglass {
    put() {
        console.log("Putting on European Sunglass");
    }
}

class AsianSunglass {
    put() {
        console.log("Putting on Asian Sunglass");
    }
}

class LimitedEditionDress {

}

class EuropeanLimitedEditionDress {
    wear() {
        console.log("Wearing European Dress");
    }
}

class AsianLimitedEditionDress {
    wear() {
        console.log("Wearing Asian Dress");
    }
}

let eShop = new EuropeanShop();
