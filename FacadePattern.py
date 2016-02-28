"""
   Facade Pattern - hides complexity to provide a simplified interface. In this case,
   it can be used to create a better experience for API consumers by providing a 
   streamlined function that does many tasks.
  
   Example - You have an API that adds an item to a shopping cart, then have the option
   to checkout. After which, the payment will be charged to the user's account. These
   tasks can be simplified into a single function as one-click buy or quick buy.
   The one-click buy or quick buy function uses the facade pattern and it brings the
   user to the payment page directly with one item only.
"""
from collections import namedtuple
from pprint import pprint

Item = namedtuple("Item", ["label", "price"])
	
class Cart:
	def __init__(self):
		self.items = []
		self.total = 0

	def addItem(self, item):
		self.items.append(item)

	def totalFromItems(self):
		price = 0
		for item in self.items:
			price = price + item.price
		self.total = price
		
	def groupItems(self):
		groups = {}
		for item in self.items:
			if groups.get(item.label):
				groups[item.label]["items"].append(item)
				groups[item.label]["count"] = groups[item.label]["count"] + 1
			else:
				groups[item.label] = {
					"items": [item],
					"unitPrice": item.price,
					"count": 1
				}

		return groups

	def checkOut(self):
		print "Redirecting user to checkout page"

	def addShipping(self, fee):
		self.total = self.total + fee

	def makePayment(self):
		print "Redirecting user to payment page"

	def displayCartInfo(self):
		groups = self.groupItems()
		return {
			"cart": groups,
			"total": self.total
		}

item1 = Item("Green Tea", 6.0)
item2 = Item("Black Tea", 5.0)
cart = Cart()
cart.addItem(item1)
cart.addItem(item1)
cart.addItem(item2)
cart.totalFromItems()
cart.checkOut()
cart.addShipping(2.0)
cart.makePayment()
pprint(cart.displayCartInfo())

"""
   Use facade pattern to simplify the checking out process of one item only
"""

class CartFacade:
	def __init__(self, cart):
		self.cart = cart

	def quickBuy(self, item):
		self.cart.addItem(item)
		self.cart.totalFromItems()
		self.cart.checkOut()
		self.cart.addShipping(2.0)
		self.cart.makePayment()
		pprint(self.cart.displayCartInfo())

print "---- From CartFacade (Reduced to 2 lines of code) ----"
cartFacade = CartFacade(Cart())
cartFacade.quickBuy(item1)