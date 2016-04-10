"use strict";
/**
  * Model View Controller Pattern - A compound pattern consisting of Observer, Strategy
  * and Composite Patterns. It uses Observer Pattern to keep observers updated yet
  * stay decoupled. The controller is the strategy pattern for the view. View gets
  * different behaviour from the controller. The view uses composite pattern to update
  * its view components.
  * 
  * Model - Application logic sits here and it provides data and states to the view.
  *
  * Controller - No application logic should sit here, it should only implement behavior
  * for the view and translates action to and fro. It sends these actions to the model
  * and the model will decide what to do based on its application logic.
  *
  * View - It is the display to present the data.
  *
  * Example - An MP3 Player is a good example that uses the MVC pattern, the view is 
  * the interface. When buttons are pressed, the controller will be activated and will
  * call the model to manipulate data, state and then update the view accordingly.
  *
  */

class Song {
	constructor(song) {
		this.song = song;
		this.status = "";
	}
	play() {
		this.status = `Playing: ${this.song}`;
	}
	stop() {
		this.status = `Song stopped, last song played: ${this.song}`;
		this.song = "";
	}
	getStatus() {
		return this.status;
	}
}

class PlayerModel {
	constructor(volume) {
		this.volume = volume;
		this.song = "";
		this.viewObservers = [];
	}
	setVolume(volume) {
		this.volume = volume;
		this.updateViews();
	}
	getVolume() {
		return this.volume;
	}
	setSong(song) {
		this.song = song;
		this.updateViews();
	}
	playSong() {
		this.song.play();
		this.updateViews();
	}
	stopSong() {
		this.song.stop();
		this.updateViews();
	}
	registerViewObserver(view) {
		this.viewObservers.push(view);
	}
	removeViewObserver(index) {
		this.viewObservers.splice(index, 1);
	}
	updateViews() {
		for(let view of this.viewObservers) {
			view.update(this);
		}
	}
	toString() {
		console.log(`Song Status: ${this.song.getStatus()}\nVolume: ${this.getVolume()}`);
	}

}

class PlayerController {
	constructor(model, view) {
		this.model = model;
		this.view = view;
	}
	openFile() {
		let file = this.view.popupFileDialog();
		this.model.setSong(file);
	}
	playButtonPressed() {
		this.model.playSong();
	}
	stopButtonPressed() {
		this.model.stopSong();
	}
	volumeSliderChanged() {
		//since there is no view components, will have to fake data
		let volume = 80
		this.model.setVolume(volume);
	}
}

class PlayerView {
	constructor() {
		this.song = "";
	}
	update(model) {
		model.toString();
	}

	popupFileDialog() {
		return this.song;
	}

	uploadSong(song) {
		this.song = song;
	}

}

var song1 = new Song("Imagine - John Lennon");
var song2 = new Song("It's my life - Bon Jovi");

var jukeboxDisplay = new PlayerView();
var jukeboxModel = new PlayerModel(50);
jukeboxModel.registerViewObserver(jukeboxDisplay);
var jukeboxController = new PlayerController(jukeboxModel, jukeboxDisplay);

jukeboxDisplay.uploadSong(song1);
jukeboxController.openFile();
jukeboxController.playButtonPressed();
jukeboxController.stopButtonPressed();
jukeboxController.volumeSliderChanged();
