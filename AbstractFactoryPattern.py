"""
   Abstract Factory Pattern - provides an interface for creating families of
   related or dependent objects without specifying their concrete classes. It
   acts like a salesman who creates a generic order form, find clients, take
   orders and send the orders to a group of factories to make the products.

   Example - Say you have online shops that spread out in different regions.
   The shops in different region will sell the same item but different sizing
   and cutting to have the best fit for people in the region.
"""
from abc import ABCMeta, abstractmethod

class Website(object):
    def placeOrder(self, region):
        shop = ""
        if region is "europe":
            shop = EuropeanShop(EuropeanWarehouse())
        elif region is "asia":
            shop = AsianShop(AsianWarehouse())
        return shop

    def getPackage(self, region):
        customerPackage = self.placeOrder(region)
        customerPackage.fetchItem()
        customerPackage.checkItem()
        customerPackage.cleanItem()
        customerPackage.packageItem()

        return customerPackage

class Shop:
    __metaclass__ = ABCMeta

    @abstractmethod
    def fetchItem(self):
        pass

    def checkItem(self):
        print "Checking " + self.sunglass.getType() + " for any defects"
        print "Checking " + self.dress.getType() + " for any defects and hide it"

    def cleanItem(self):
        print "Cleaning up " + self.sunglass.getType() + " using dettol"
        print "Cleaning up " + self.dress.getType() + " using bleach"

    def packageItem(self):
        print "Package " + self.sunglass.getType() + " nicely"
        print "Package " + self.dress.getType() + " nicely"

class EuropeanShop(Shop):
    def __init__(self, warehouse):
        self.warehouse = warehouse
        self.region = "Europe"

    def fetchItem(self):
        print "Getting item from the European Warehouse"
        self.sunglass = self.warehouse.getSunglass()
        self.dress = self.warehouse.getDress()

class AsianShop(Shop):
    def __init__(self, warehouse):
        self.warehouse = warehouse
        self.region = "Asia"

    def fetchItem(self):
        print "Getting item from the Asian Warehouse"
        self.sunglass = self.warehouse.getSunglass()
        self.dress = self.warehouse.getDress()

class Warehouse:
    __metaclass__ = ABCMeta

    @abstractmethod
    def getSunglass(self):
        pass

    def getDress(self):
        pass

class EuropeanWarehouse(Warehouse):
    def getSunglass(self):
        return EuropeanSunglass()

    def getDress(self):
        return EuropeanLimitedEditionDress()

class AsianWarehouse(Warehouse):
    def getSunglass(self):
        return AsianSunglass()

    def getDress(self):
        return AsianLimitedEditionDress()

class Sunglass:
    __metaclass__ = ABCMeta

    @abstractmethod
    def getType(self):
        pass

class EuropeanSunglass(Sunglass):
    def getType(self):
        return "European Sunglass"

class AsianSunglass(Sunglass):
    def getType(self):
        return "Asian Sunglass"

class LimitedEditionDress:
    __metaclass__ = ABCMeta

    @abstractmethod
    def getType(self):
        pass

class EuropeanLimitedEditionDress(LimitedEditionDress):
    def getType(self):
        return "European Really Expensive Limited Edition Dress"

class AsianLimitedEditionDress(LimitedEditionDress):
    def getType(self):
        return "Asian Really Limited Expensive Edition Dress"

website = Website()
website.getPackage("asia")
        
