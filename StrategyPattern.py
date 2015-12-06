"""
   Strategy Pattern - Separating a set of algorithms by encapsulating each of them,
   and making them interchangeable. This concept is similar to a war game where you
   would have different ways of fighting the opponent. You start with the same set
   of resources each game, and then ending the game by defeating the opponent. The
   end goal remains the same throughout all the games.

   Example - You want to log in to a website, the website offers many ways of logging
   on. You may choose to use your Facebook account, Google Plus, LinkedIn. However,
   these require different login mechanism. So let's keep the complexity of each
   mechanism to its own class.

   Note: This pattern is meant to provide different ways of achieving the goal with
   the same starting resources. Therefore, the functions shouldn't contain different
   parameters.
"""

class LoginMethod(object):
    def login(self):
        print "Please choose a login method"

class FacebookLogin(object):
    def login(self):
        print("Logging with Facebook Account...\n"
              "Redirected to Facebook Page for authorisation\n"
              "Successfully logged on")

class GoogleLogin(object):
    def login(self):
        print("Logging with Google Account...\n"
              "Redirected to Google Page for authorisation\n"
              "Google asking for mobile verification\n"
              "Mobile verification successful\n"
              "Successfully logged on")

class LinkedInLogin(object):
    def login(self):
        print("Logging with LinkedIn Account...\n"
              "Redirected to LinkedIn for authorisation\n"
              "Successfully logged on")

class User(object):
    def __init__(self):
        self.loginMethod = LoginMethod()

    def setLoginMethod(self, altLoginMethod):
        self.loginMethod = altLoginMethod

    def performLogin(self):
        self.loginMethod.login()

# This user has no login method defined
user1 = User()
user1.performLogin()

# This user uses Facebook
user2 = User()
user2.setLoginMethod(FacebookLogin())
user2.performLogin()

# This user uses Google
user3 = User()
user3.setLoginMethod(GoogleLogin())
user3.performLogin()
