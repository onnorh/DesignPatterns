"""
   Singleton Pattern - Simplest pattern of all that ensures only one class
   has only one instance and it is a global property.

   Example - Usually for configuration settings where you don't want to create
   a chaos by having many instances of the same class

   The example below referenced from Python's documentation:
   https://www.python.org/download/releases/2.2/descrintro/#__new__
"""

class Singleton(object):
    def __new__(cls, *args, **kwds):
        it = cls.__dict__.get("__it__")
        if it is not None:
            return it
        cls.__it__ = it = object.__new__(cls)
        it.init(*args, **kwds)
        return it
    def init(self, *args, **kwds):
        pass

class ConfigModule(Singleton):
    def someReallyUsefulFunction(self):
        print "Hello World"

instance1 = ConfigModule()
instance2 = ConfigModule()

assert instance1 is instance2
