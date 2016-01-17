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
    placeOrder(region) {
        let shop = "";
        if(region === "europe") {
            shop = new EuropeanShop(new EuropeanWarehouse());
        } else if(region === "asia") {
            shop = new AsianShop(new AsianWarehouse());
        }
        return shop;
    }

    getPackage(region) {
        let customerPackage = this.placeOrder(region);
        customerPackage.fetchItem();
        customerPackage.checkItem();
        customerPackage.cleanItem();
        customerPackage.packageItem();

        return customerPackage;
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

    checkItem() {
        console.log(`Checking ${this.sunglass.getType()} for any defects`);
        console.log(`Checking ${this.dress.getType()} for any defects and hide it`);
    }

    cleanItem() {
        console.log(`Cleaning up ${this.sunglass.getType()} using dettol.`);
        console.log(`Cleaning up ${this.dress.getType()} using bleach.`);
    }

    packageItem() {
        console.log(`Package ${this.sunglass.getType()} nicely`);
        console.log(`Package ${this.dress.getType()} nicely`);
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
        this.sunglass = this.warehouse.getSunglass();
        this.dress = this.warehouse.getDress();
    }
}

class AsianShop extends Shop {
    constructor(warehouse) {
        super();
        this.warehouse = warehouse;
        this.region = "Asia";
    }

    fetchItem() {
        console.log("Fetching item from the Asian Warehouse");
        this.sunglass = this.warehouse.getSunglass();
        this.dress = this.warehouse.getDress();
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
    constructor() {
        if(new.target === Sunglass) {
            throw new TypeError("This is an abstract class");
        }
        let _class = this;
        forceRequiredMethods(_class, ["getType"])
    }
}

class EuropeanSunglass {
    getType() {
        return "European Sunglass";
    }
}

class AsianSunglass {
    getType() {
        return "Asian Sunglass";
    }
}

class LimitedEditionDress {
    constructor() {
        if(new.target === LimitedEditionDress) {
            throw new TypeError("This is an abstract class");
        }
        let _class = this;
        forceRequiredMethods(_class, ["getType"])
    }
}

class EuropeanLimitedEditionDress {
    getType() {
        return "European Really Expensive Limited Edition Dress";
    }
}

class AsianLimitedEditionDress {
    getType() {
        return "Asian Really Limited Expensive Edition Dress";
    }
}

let website = new Website();
website.getPackage("asia");
