"""
   Adapter Pattern - converts an interface to fit into another interface so
   that both interfaces can work well together. Like the name suggests, the
   interface is like an adapter for a 3 pin to 2 pin plug to fit a 2 pin socket.

   Example - There are different types of payment methods for purchasing a
   a product. However, the different payment processor may have different method
   names and different implementation. In this case adapters can be used in
   this case.
"""

class Payment:
    def chargeAccount(self, processor, amount):
        print "Paying through " + processor + ": " + str(amount)

class Paypal:
    def __init__(self, payment):
        self.payment = payment

    def sendCash(self, amount):
        self.payment.chargeAccount("PayPal", amount)

class Alipay:
    def __init__(self, payment):
        self.payment = payment

    def shouFei(self, amount):
        self.payment.chargeAccount("AliPay", amount)

paypalPayment = Paypal(Payment())
paypalPayment.sendCash(5000)

alipayPayment = Alipay(Payment())
alipayPayment.shouFei(5000)
