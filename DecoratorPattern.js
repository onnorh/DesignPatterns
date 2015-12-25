"use strict";
/**
  * Decorator Pattern - Adding extra functionalities to an object without affecting
  * its structure. Like the name suggests, this pattern is used to add additional
  * features to an item. Similar to decorating a christmas tree, topping up with
  * christmas lights and other ornaments to look better.
  *
  * Example - Your social network account might need certain membership addons to
  * to get access to more information or functions. Purchasing the addons is one way
  * to equip the membership with more addons but it comes with a cost. The membership
  * fee may be increased. Decorator Pattern can be used in this scenario
  *
  */

class Membership {
    constructor(addons, cost) {
        this.addons = addons;
        this.cost = cost;
    }
    getAddons() {
        return this.addons;
    }
    getCost() {
        return this.cost;
    }
}

let addOnPost = (membership) => {
    let _getAddons = membership.getAddons();
    membership.getAddons = () => {
        let addons = _getAddons;
        addons.push("CanPost")
        return addons;
    }
    let _getCost = membership.getCost();
    membership.getCost = () => {
        return _getCost + 0.99;
    }
}

let addOnAdmin = (membership) => {
    let _getAddons = membership.getAddons();
    membership.getAddons = () => {
        let addons = _getAddons;
        addons.push("IsAdmin");
        return addons;
    }
}


let jack001 = new Membership(["CanView"], 0.8);
console.log(jack001.getCost());
addOnPost(jack001);
console.log(jack001.getCost());
addOnAdmin(jack001);
console.log(jack001.getCost());
console.log(jack001.getAddons());
