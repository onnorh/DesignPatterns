"""
   State Pattern - Allows an object to change its behaviour when its internal state
   changes. The object will seem to change its class as well.

   Example - A candy dispenser is commonly found in shopping malls. This machine
   takes in coin as an input and delivers candy as the output. There are states
   involved in this process, hasCoin, noCoin, hasCandy and noCandy states
   Each state implements the same set of methods but uses a different algorithm
   to fit its use case.
"""

class CandyDispenser:
	def __init__(self):
		self.hasCoin = HasCoin(self)
		self.noCoin = NoCoin(self)
		self.hasCandy = HasCandy(self)
		self.noCandy = NoCandy(self)
		self.state = self.noCoin
		self.candyCount = 1

	def getHasCoin(self):
		return self.hasCoin

	def getNoCoin(self):
		return self.noCoin

	def getHasCandy(self):
		return self.hasCandy

	def getNoCandy(self):
		return self.noCandy

	def setState(self, state):
		self.state = state

	def dispense(self):
		self.state.dispense()

	def insertCoin(self):
		self.state.insertCoin()

	def ejectCoin(self):
		self.state.ejectCoin()

	def turnKnob(self):
		self.state.turnKnob()

class State:
	def __init__(self, dispenser):
		self.dispenser = dispenser

	def dispense(self):
		print "You need to implement this method"

	def insertCoin(self):
		print "You need to implement this method"

	def ejectCoin(self):
		print "You need to implement this method"

	def turnKnob(self):
		print "You need to implement this method"

class HasCoin(State):
	def dispense(self):
		print "Nothing happens"

	def insertCoin(self):
		print "You have already got a coin inside"

	def ejectCoin(self):
		print "The machine returns you back your coin"
		self.dispenser.setState(self.dispenser.getNoCoin())

	def turnKnob(self):
		print "Checking whether the machine is left with candies"
		if self.dispenser.candyCount > 0:
			self.dispenser.setState(self.dispenser.getHasCandy())
		else:
			self.dispenser.setState(self.dispenser.getNoCandy())
		self.dispenser.dispense()

class NoCoin(State):
	def dispense(self):
		print "Nothing happens"

	def insertCoin(self):
		print "You inserted a coin"
		self.dispenser.setState(self.dispenser.getHasCoin())

	def ejectCoin(self):
		print "There is no coin for you to eject"

	def turnKnob(self):
		print "Please don't try to cheat the system"

class HasCandy(State):
	def dispense(self):
		print "One candy drop out"
		self.dispenser.candyCount = self.dispenser.candyCount - 1
		print "Candies left: %d" % self.dispenser.candyCount
		self.dispenser.setState(self.dispenser.getNoCoin())

	def insertCoin(self):
		print "Eating your coin, please wait"

	def ejectCoin(self):
		print "Sorry too late, eating your coin now"

	def turnKnob(self):
		print "You can't dispense twice!"

class NoCandy(State):
	def dispense(self):
		print "No more candy left, sorry"
		self.dispenser.setState(self.dispenser.getHasCoin())

	def insertCoin(self):
		print "Your coin is still inside"

	def ejectCoin(self):
		print "The machine returns you back your coin"
		self.dispenser.setState(self.dispenser.getNoCoin())

	def turnKnob(self):
		print "You can't turn the knob yet!"

candyDispenser = CandyDispenser()

candyDispenser.insertCoin()
candyDispenser.insertCoin()
candyDispenser.turnKnob()
candyDispenser.ejectCoin()
candyDispenser.insertCoin()
candyDispenser.turnKnob()
candyDispenser.ejectCoin()