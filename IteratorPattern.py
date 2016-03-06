"""
   Iterator Pattern - provides a way to access the elements of an aggregate object
   sequentially without exposing its underlying representation
  
   Example - For Python, some API may choose to put in a list of items inside 
   a list, some may choose to put inside a dictionary. If the developer wants to
   merge the items in a list and items in a dictionary together, there will be a
   problem to iterate through these items together as there is a different
   set of functions to access them, iterator pattern solves this issue by
   wrapping the list of items and access them though a common interface
"""

from abc import abstractmethod

class Iterator:
    @abstractmethod
    def next(self):
        pass

    @abstractmethod
    def hasNext(self):
        pass

class ListIterator(Iterator):
    def __init__(self, items):
        self.items = items
        self.currentIndex = 0

    def next(self):
        item = self.items[self.currentIndex]
        self.currentIndex = self.currentIndex + 1
        return item

    def hasNext(self):
        if self.currentIndex >= len(self.items):
            return False
        else:
            return True

class DictIterator(Iterator):
    def __init__(self, items):
        self.items = items
        self.indexes = items.keys()
        self.currentIndex = 0

    def next(self):
        itemIndex = self.indexes[self.currentIndex]
        item = self.items[itemIndex]
        self.currentIndex = self.currentIndex + 1
        return item

    def hasNext(self):
        if self.currentIndex >= len(self.items):
            return False
        else:
            return True

listItems = [1, 2, 3, {"i": 4}]
dictItems = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": {
        "i": 4
    }
}

listIterator = ListIterator(listItems)
dictIterator = DictIterator(dictItems)

while listIterator.hasNext() and dictIterator.hasNext():
    print listIterator.next()
    print dictIterator.next()