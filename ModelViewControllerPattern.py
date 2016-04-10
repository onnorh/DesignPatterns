"""
   Model View Controller Pattern - A compound pattern consisting of Observer, Strategy
   and Composite Patterns. It uses Observer Pattern to keep observers updated yet
   stay decoupled. The controller is the strategy pattern for the view. View gets
   different behaviour from the controller. The view uses composite pattern to update
   its view components.

   Model - Application logic sits here and it provides data and states to the view.

   Controller - No application logic should sit here, t should only implement behaviour
   for the view and translate action to and fro. It sends these actions to the model
   and the model will decide what to do based on its application logic.

   View - It is the display to present the data.

   Example - An MP3 Player is a good example that uses the MVC pattern, the view is
   the interface. When buttons are pressed, the controller will be activated and will
   call the model to manipulate data, state and then update the view accordingly.
"""

class Song:
	def __init__(self, song):
		self.song = song
		self.status = ''

	def play(self):
		self.status = 'Playing: %s' % (self.song)

	def stop(self):
		self.status = 'Song stopped, last song played: %s' % (self.song)
		self.song = ''

	def getStatus(self):
		return self.status

class PlayerModel:
	def __init__(self, volume):
		self.volume = volume
		self.song = ''
		self.viewObservers = []

	def setVolume(self, volume):
		self.volume = volume
		self.updateViews()

	def getVolume(self):
		return self.volume

	def setSong(self, song):
		self.song = song
		self.updateViews()

	def playSong(self):
		self.song.play()
		self.updateViews()

	def stopSong(self):
		self.song.stop()
		self.updateViews()

	def registerViewObserver(self, view):
		self.viewObservers.append(view)

	def removeViewObserver(self, view):
		self.viewObservers.remove(view)

	def updateViews(self):
		for view in self.viewObservers:
			view.update(self)

	def toString(self):
		print 'Song Status: %s\n Volume: %d' % (self.song.getStatus(), self.getVolume())


class PlayerController:
	def __init__(self, model, view):
		self.model = model
		self.view = view

	def openFile(self):
		file = self.view.popupFileDialog()
		self.model.setSong(file)

	def playButtonPressed(self):
		self.model.playSong()

	def stopButtonPressed(self):
		self.model.stopSong()

	def volumeSliderChanged(self):
		# use fake data as there are no view components for this
		volume = 80
		self.model.setVolume(volume)

class PlayerView:
	def __init__(self):
		self.song = ''

	def update(self, model):
		model.toString()

	def popupFileDialog(self):
		return self.song

	def uploadSong(self, song):
		self.song = song

song1 = Song('Imagine - John Lennon')
song2 = Song('It\'s my life - Bon Jovi')

jukeboxDisplay = PlayerView()
jukeboxModel = PlayerModel(50)
jukeboxModel.registerViewObserver(jukeboxDisplay)
jukeboxController = PlayerController(jukeboxModel, jukeboxDisplay)

jukeboxDisplay.uploadSong(song1)
jukeboxController.openFile()
jukeboxController.playButtonPressed()
jukeboxController.stopButtonPressed()
jukeboxController.volumeSliderChanged()


