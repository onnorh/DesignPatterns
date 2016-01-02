"""
   Decorator Pattern - Adding extra functionalities to an object without affecting
   its structure. Like the name suggests, this pattern is used to add additional
   features to an item. Similar to decorating a christmas tree, topping up with
   christmas lights and other ornaments to look better.

   Example - Your social network account might need certain membership addons to
   to get access to more information or functions. Purchasing the addons is one way
   to equip the membership with more addons but it comes with a cost. The membership
   fee may be increased. Decorator Pattern can be used in this scenario.

"""

class Membership(object):
    def __init__(self, addons, cost):
        self.addons = addons
        self.cost = cost

    def getAddons(self):
        return self.addons

    def getCost(self):
        return self.cost

def addOnPost(func):
    def func_wrapper(self=None):
        _addOns = func(self)
        _addOns.append("CanPost")
        return _addOns

    return func_wrapper

def addCostPost(func):
    def func_wrapper(self=None):
        return func(self) + 0.8
    return func_wrapper

class BronzeMembership(Membership):
    @addOnPost
    def getAddons(self):
        return self.addons

    @addCostPost
    def getCost(self):
        return self.cost

bronzeMember = BronzeMembership(["CanView"], 0.8)
print bronzeMember.getAddons()
print bronzeMember.getCost()
