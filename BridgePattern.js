"use strict";

/**
  * Bridge Pattern - Allows two components to work with each other having own
  * interface. 
  *
  * Example - Gestures and Mouse are different input devices but they shares
  * the same set of methods. These methods are sent to two different output 
  * devices (Screen and Audio) but with same set of methods. Bridge pattern
  * allows any input device to work with any output device
  *
  * Reference: http://www.dofactory.com/javascript/bridge-design-pattern
  *
  */

function forceRequiredMethods(_class, methods) {
    for (let eachMethod of methods) {
        if(_class[eachMethod] === undefined || typeof _class[eachMethod] !== 'function') {
            throw new TypeError(eachMethod + ' is required and has to be overriden.');
        }
    }
}

class InputDevice {
	constructor(output) {
		this.output = output;
	}
}

class Gestures extends InputDevice {
	tap() {
		this.output.click();
	}

	swipe() {
		this.output.move();
	}

	pan() {
		this.output.drag();
	}

	pinch() {
		this.output.zoom();
	}
}

class Mouse extends InputDevice {
	click() {
		this.output.click();
	}

	move() {
		this.output.move();
	}

	down() {
		this.output.drag();
	}

	wheel() {
		this.output.zoom();
	}
}

class OutputDevice {
	constructor() {
		let _class = this;
		forceRequiredMethods(_class, ['click', 'move', 'drag', 'zoom']);
	}
}

class Screen extends OutputDevice {
	click() {
		console.log('Screen select');
	}

	move() {
		console.log('Screen move');
	}

	drag() {
		console.log('Screen drag');
	}

	zoom() {
		console.log('Screen zoom');
	}
}

class Audio extends OutputDevice {
	click() {
		console.log('Sound: Ting');
	}

	move() {
		console.log('Sound: Swoosh');
	}

	drag() {
		console.log('Sound: Eeeee');
	}

	zoom() {
		console.log('Sound: Vrooom');
	}
}

var screen = new Screen();
var audio = new Audio();

var hand = new Gestures(screen);
var mouse = new Mouse(audio);

hand.tap();
hand.swipe();
hand.pinch();

mouse.click();
mouse.move();
mouse.wheel();