"""
   Simple Factory Pattern - decouples object creation to an interface,
   encapsulating complexity of code into another object and that object's
   main role is just for generating different types of components

   Example - User in different locale have different language and currency.
   A user factory can be used in this case to supervise the creation of
   the different type of users
"""

class UserFactory(object):
    def createUser(self, locale):
        if locale == "us":
            return AmericanUser()
        elif locale == "china":
            return ChineseUser()
        elif locale == "uk":
            return BritishUser()
        elif locale == "japan":
            return JapaneseUser()
        else:
            print "Please specify a locale"
            return

class User(object):
    def __init__(self, language, currency):
        self.language = language
        self.currency = currency

    def getProfile(self):
        return {
            "language": self.language,
            "currency": self.currency
        }

class AmericanUser(User):
    def __init__(self):
        super(AmericanUser, self).__init__("English", "USD")

class ChineseUser(User):
    def __init__(self):
        super(ChineseUser, self).__init__("Chinese", "RMB")

class BritishUser(User):
    def __init__(self):
        super(BritishUser, self).__init__("English", "GBP")

class JapaneseUser(User):
    def __init__(self):
        super(JapaneseUser, self).__init__("Japanese", "JPY")

userFactory = UserFactory()
americanUser = userFactory.createUser("us")
print americanUser.getProfile()
