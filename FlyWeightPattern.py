"""
   FlyWeight Pattern - Used if there is a need to create a large number of objects. It shares
   similar objects rather than create individual ones, that in turns use up more memory space.
  
   Example - In a christmas tree, there can be a few hundreds to a few thousands of LEDs of
   different colors on it. Rather than creating new configuration for each LED, FlyWeight
   can be used here to use the same configuration if both LEDs have the same color,
   saving memory space and making the process more efficient.
"""
import random, timeit

COLORS = ['yellow', 'red', 'blue', 'green', 'purple', 'orange', 'cyan', 'white']

class LED:
	def __init__(self, color):
		self.color = color

class LEDFactory:
	def __init__(self):
		self.ledTypes = {}

	def getLED(self, color):
		ledTypes = self.ledTypes
		if color in ledTypes:
			led = ledTypes[color]
		else:
			led = LED(color)
			ledTypes[color] = led
		return led

class ChristmasTree:
	def __init__(self):
		self.ledFactory = LEDFactory()
		self.leds = []

	def putLED(self):
		randChoice = random.choice(COLORS)
		self.leds.append(self.ledFactory.getLED(randChoice))

xmasTree = ChristmasTree()

timeBefore = timeit.default_timer()

for i in range(0, 100000):
	xmasTree.putLED()

timeTaken = (timeit.default_timer() - timeBefore) * 1000

print 'Time Taken (With FlyWeight): %dms' % timeTaken

anotherXmasTree = ChristmasTree()

timeBefore2 = timeit.default_timer()

for i in range(0, 100000):
	randChoice = random.choice(COLORS)
	led = LED(randChoice)
	anotherXmasTree.leds.append(led)

timeTaken2 = (timeit.default_timer() - timeBefore2) * 1000

print 'Time Taken (Without FlyWeight): %dms' % timeTaken2

