"""
   Factory Method Pattern - A pattern which uses sub classes to generate an
   object. This pattern can be considered a more advanced version of the
   Simple Factory Pattern but it delegates the creation of components to
   the subclasses

   Example - The Super Administrator is considered the Creator in the application
   He/she is able to create an administrator account, an editor account or just
   a normal user account

   In this example I use npm:prompt to get user input
"""

class SuperAdministrator(object):
    def createUser(self):
        return

class AdminCreator(SuperAdministrator):
    def createUser(self):
        return Admin()

class EditorCreator(SuperAdministrator):
    def createUser(self):
        return Editor()

class UserCreator(SuperAdministrator):
    def createUser(self):
        return User()

class User(object):
    def __init__(self, privileges=None):
        # Default CanView
        self.privileges = ["CanView"];
        if privileges:
            self.privileges.extend(privileges)

    def getPrivileges(self):
        return self.privileges

class Admin(User):
    def __init__(self):
        super(Admin, self).__init__(["CanCreate", "CanEdit"])

class Editor(User):
    def __init__(self):
        super(Editor, self).__init__(["CanEdit"])

userType = raw_input("What kind of user do you wish to create? ['admin', 'editor', 'normal']")

if userType == "admin":
    userFactory = AdminCreator()
elif userType == "editor":
    userFactory = EditorCreator()
else:
    userFactory = UserCreator()

user = userFactory.createUser()
print user.getPrivileges()
