"""
   Template Method Pattern - define a set of algorithms while allowing its subclasses
   to override some methods in order to work with a particular object.
  
   Example - The making of caffeine beverages such as tea and coffee have similar
   processes except a few that might need a little tweak. These processes can follow
   a template to reduce code duplication
"""

from abc import abstractmethod

class CaffeineBeverage:
	def boilWater(self):
		print "Boiling Water"

	@abstractmethod
	def brew(self):
		pass

	def pourIntoCup(self):
		print "Pouring boiled water into the cup"

	@abstractmethod
	def addCondiments(self):
		pass

	def decorate(self):
		print "This is an optional method, which is called a hook method. The subclasses can choose whether to call it or not"

class Tea(CaffeineBeverage):
	def brew(self):
		print "Steeping in a tea bag into the cup"

	def addCondiments(self):
		print "Adding lemon into the cup"

class Coffee(CaffeineBeverage):
	def brew(self):
		print "Brewing coffee grinds in the cup"

	def addCondiments(self):
		print "Adding sugar and milk into the cup"

print "----- Tea -----"
tea = Tea()
tea.boilWater()
tea.brew()
tea.pourIntoCup()
tea.addCondiments()

print "----- Coffee -----"
coffee = Coffee()
coffee.boilWater()
coffee.brew()
coffee.pourIntoCup()
coffee.addCondiments()