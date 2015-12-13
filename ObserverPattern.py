"""
   Observer Pattern - Defines a one-to-many relationships where there is a Subject
   and many Observers. Like the name suggests, the Observers observe the Subject,
   receive notifications from the Subject when something has changed. This concept
   is similar to Followers and Following in Twitter.

   Example - In picture sharing application like Instagram, on your dashboard you
   find pictures of the users you are following. That user may or may not know
   you are following him/her. The observer in this case refers to you following a
   user and the user becomes the subject.
"""

class NotificationData(object):
    def __init__(self, data):
        if self.validData(data):
            self.data = data
        else:
            self.data = {}

    def validData(self, data):
        # Data validation before you can return the correct data
        print "No need validation"
        # Place your logic here
        return True;

class Subject(object):
    def __init__(self, name):
        self.observers = []
        self.name = name

    def addObserver(self, observer):
        self.observers.append(observer)

    def removeObserver(self, observer):
        self.observers.remove(observer)

    def notifyObservers(self, notificationData):
        for observer in self.observers:
            observer.update(notificationData)

class Observer(object):
    def __init__(self):
        self.newPosts = []
        self.isOnline = False

    def update(self):
        # When notification received, update something
        print "Nothing to update over here"

class NewPost(NotificationData):
    def validData(self, data):
        if "url" in data and "name" in data and "description" in data:
            return True
        else:
            return false

class User(Subject):
    def __init__(self, name):
        Subject.__init__(self, name)

    def createPost(self, url, description):
        data = {
            "name" : self.name,
            "url" : url,
            "description" : description
        }
        newPost = NewPost(data).data
        self.notifyObservers(newPost)

class Follower(Observer):
    def __init__(self, name):
        self.name = name
        Observer.__init__(self)

    def update(self, data):
        self.newPosts.append(data)
        if self.isOnline:
            self.display()
            self.seen()

    def seen(self):
        del self.newPosts[:]

    def setOnline(self, b):
        self.isOnline = b
        self.display()
        self.seen()

    def display(self):
        print self.name + ": " + str(self.newPosts)
        self.seen()

# Initiate a really popular woman
chloe = User("Chloe")

# Initiate the Followers
tom = Follower("Tom")
jack = Follower("Jack")

# Let the guys follow Chloe
chloe.addObserver(tom)
chloe.addObserver(jack)

# Let guy1 be offline while guy2 be online, guy2 will only receive the instant notifications
jack.setOnline(True)

# Pretty woman creates post and only guy2 will receive the updates
print "Jack receiving the new post only"
chloe.createPost("http://www.selfiemine.com/selfie1.png", "Selfie taken at home")
print "Jack receives another post"
chloe.createPost("http://www.modelshoot.com/chloe.png", "Model shoot")

print "Now Tom goes online and receives updates"
tom.setOnline(True)

print "Now Chloe creates another post and both guys receive it"
chloe.createPost("http://www.ootd.com/ootd.png", "#ootd")

print "Chloe finds Tom creepy, removes him, then creates another new post"
chloe.removeObserver(tom)
chloe.createPost("http://www.ootd2.com/ootd2.png", "#ootd")
