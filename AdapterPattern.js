"use strict";
/**
  * Adapter Pattern - converts an interface to fit into another interface so
  * that both interfaces can work well together. Like the name suggests, the
  * interface is like an adapter for a 3 pin to 2 pin plug to fit a 2 pin socket.
  *
  * Example - There are different types of payment methods for purchasing a
  * a product. However, the different payment processor may have different method
  * names and different implementation. In this case adapters can be used in
  * this case.
  *
  * Note - There are two types of adapter patterns - Object Adapter and Class Adapter
  *
  */


/**
  * Object Adapter - uses object composition to do the adaptation
  *
  */

class Payment {
    chargeAccount(processor, amount) {
        console.log("Paying through " + processor + ": " + amount);
    }
}

class Paypal {
    constructor(payment) {
        this.payment = payment;
    }

    sendCash(amount) {
        this.payment.chargeAccount("PayPal", amount);
    }
}
class Alipay {
    constructor(payment) {
        this.payment = payment;
    }

    shouFei(amount) {
        this.payment.chargeAccount("AliPay", amount);
    }
}

let paypalPayment = new Paypal(new Payment());
paypalPayment.sendCash(5000);

let alipayPayment = new Alipay(new Payment());
alipayPayment.shouFei(5000);

/**
  * Class Adapter - uses class inheritance to do the adaptation
  * 
  * Note - This pattern uses multiple class inheritances as well, which is not possible
  * in Javascript, we could use mixin to achieve this effect.
  *
  */

class Payment2 {
    chargeAccount(processor, amount) {
        console.log("Paying through " + processor + ": " + amount);
    }
}

class Paypal2 extends Payment2 {
    sendCash(amount) {
        this.chargeAccount("PayPal", amount);
    }
}

class Alipay2 {
    shouFei(amount) {
        this.chargeAccount("AliPay", amount);
    }
}

let paypal2Payment = new Paypal2();
paypal2Payment.sendCash(5000);





