"""
   Composite Pattern - treat a group of objects uniformly. It composes objects into
   tree structures to represent part as well as whole hierarchy.

   Example - A person can be a single person and a person can have many persons under
   him/her, for example childrens. In this case, composite pattern can be used.
"""

class Person:
	def __init__(self, name, age):
		self.name = name
		self.age = age
		self.children = []

	def registerChild(self, child):
		self.children.append(child)

	def disownChild(self, index):
		del self.children[index]

	def listDescendents(self):
		currentPerson = self
		def recursiveGet(person, level):
			print "|" + "-"*(level*2) + " Current Person: %s, Level: %d" % (person.name, level)
			if len(person.children) > 0:
				for eachDescendent in person.children:
					recursiveGet(eachDescendent, level + 1)

		recursiveGet(currentPerson, 1)

print "Tim is a person and has two songs, Tom and Teddy"

tim = Person("Tim", 65)
tom = Person("Tom", 32)
ted = Person("Teddy", 28)

tim.registerChild(tom)
tim.registerChild(ted)

print "Tom is married and has a daughter, Cheryl"

cheryl = Person("Cheryl", 5)
tom.registerChild(cheryl)

print "--- Descendents of Tim"
tim.listDescendents()

print "--- Descendents of Tom"
tom.listDescendents()

print "We forgot to add the great grandfather, Joe"
joe = Person("Joe", 90)
joe.registerChild(tim)
joe.listDescendents()

print "Teddy gets married and gets a son, Paul"
paul = Person("Paul", 1)
ted.registerChild(paul)

print "Now the hierarchy gets even larger"
joe.listDescendents()