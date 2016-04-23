"""
   Builder Pattern - Breaking down the creation of an object (usually complex) into smaller
   builds inside a builder. This pattern is useful if you want the creation of the components
   to be separated from the main build as well as hiding the processes from the client.
   The builder is the only one knowing the processes.
  
   Example - To brew a coffee, there are several steps. To make a good coffee you would need a
   barista that knows what he/she is doing. The barista is the builder.
"""

class Coffee:
	def __init__(self):
		self.expresso = 0
		self.milk = 0
		self.water = 0
		self.chocolate = 0

	def __str__(self):
		return 'Coffee: { Expresso: %d, Milk: %d, Water: %d, Chocolate: %d }' % (self.expresso, self.milk, self.water, self.chocolate)

class CoffeeMaker(object):
	def __init__(self):
		self.coffee = Coffee()

	def putExpresso(self, percentage):
		self.coffee.expresso = percentage

	def putMilk(self, percentage):
		self.coffee.milk = percentage

	def putWater(self, percentage):
		self.coffee.water = percentage

	def putChocolate(self, percentage):
		self.coffee.chocolate = percentage

class AmericanoMaker(CoffeeMaker):
	def putExpresso(self):
		super(AmericanoMaker, self).putExpresso(20)

	def putMilk(self):
		super(AmericanoMaker, self).putMilk(0)

	def putWater(self):
		super(AmericanoMaker, self).putWater(80)

	def putChocolate(self):
		super(AmericanoMaker, self).putChocolate(0)

class LatteMaker(CoffeeMaker):
	def putExpresso(self):
		super(LatteMaker, self).putExpresso(25)

	def putMilk(self):
		super(LatteMaker, self).putMilk(75)

	def putWater(self):
		super(LatteMaker, self).putWater(0)

	def putChocolate(self):
		super(LatteMaker, self).putChocolate(0)

class MochaMaker(CoffeeMaker):
	def putExpresso(self):
		super(MochaMaker, self).putExpresso(25)

	def putMilk(self):
		super(MochaMaker, self).putMilk(25)

	def putWater(self):
		super(MochaMaker, self).putWater(0)

	def putChocolate(self):
		super(MochaMaker, self).putChocolate(50)

class Barista:
	def __init__(self, maker):
		self.maker = maker

	def setMaker(self, maker):
		self.maker = maker

	def serveCoffee(self):
		return self.maker.coffee

	def makeCoffee(self):
		self.maker.putExpresso()
		self.maker.putMilk()
		self.maker.putWater()
		self.maker.putChocolate()

americanoMaker = AmericanoMaker()
latteMaker = LatteMaker()
mochaMaker = MochaMaker()

john = Barista(americanoMaker)
john.makeCoffee()
print john.serveCoffee()

john.setMaker(latteMaker)
john.makeCoffee()
print john.serveCoffee()

john.setMaker(mochaMaker)
john.makeCoffee()
print john.serveCoffee()