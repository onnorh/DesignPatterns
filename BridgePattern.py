"""
   Bridge Pattern - Allows two components to work with each other having own
   interface. 
  
   Example - Gestures and Mouse are different input devices but they shares
   the same set of methods. These methods are sent to two different output 
   devices (Screen and Audio) but with same set of methods. Bridge pattern
   allows any input device to work with any output device
  
   Reference: http://www.dofactory.com/javascript/bridge-design-pattern
"""

from abc import abstractmethod

class InputDevice:
	def __init__(self, output):
		self.output = output

class Gestures(InputDevice):
	def tap(self):
		self.output.click()

	def swipe(self):
		self.output.move()

	def pan(self):
		self.output.drag()

	def pinch(self):
		self.output.zoom()

class Mouse(InputDevice):
	def click(self):
		self.output.click()

	def move(self):
		self.output.move()

	def down(self):
		self.output.drag()

	def wheel(self):
		self.output.zoom()

class OutputDevice:
	@abstractmethod
	def click(self):
		pass

	@abstractmethod
	def move(self):
		pass

	@abstractmethod
	def drag(self):
		pass

	@abstractmethod
	def zoom(self):
		pass

class Screen(OutputDevice):
	def click(self):
		print 'Screen Select'

	def move(self):
		print 'Screen Move'

	def drag(self):
		print 'Screen Drag'

	def zoom(self):
		print 'Screen Zoom'

class Audio(OutputDevice):
	def click(self):
		print 'Sound: Ting'

	def move(self):
		print 'Sound: Swoosh'

	def drag(self):
		print 'Sound: Eeeee'

	def zoom(self):
		print 'Sound: Vrooom'

screen = Screen()
audio = Audio()

hand = Gestures(screen)
mouse = Mouse(audio)

hand.tap()
hand.swipe()
hand.pinch()

mouse.click()
mouse.move()
mouse.wheel()
