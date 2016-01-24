"use strict";
/**
  * Command Pattern - encapsulates a request as an object, which provides the
  * client the benefit of having multiple different requests. The request will
  * be executed by another entity that knows how to interact with it.
  *
  * Example - The text editor has a set of commands we sometimes use, the cut,
  * copy, paste and undo. The user does not know how these commands are executed
  * or the algorithims inside it. The user just need to send the command to the
  * text editor and the text editor will handle it for him/her.
  *
  */

function forceRequiredMethods(_class, methods) {
    for (let eachMethod of methods) {
        if(_class[eachMethod] === undefined || typeof _class[eachMethod] !== "function") {
            throw new TypeError(eachMethod + " is required and has to be overriden.");
        }
    }
}

class TextEditor {
    constructor(value) {
        this.value = value;
        this.selection = [0, 0];
        this.clipboard = "";
    }
    copy() {
        this.clipboard = this.value.substring(this.selection[0], this.selection[1]);
        this.selection = [0, 0];
    }
    cut() {
        let valueOutsideSelection = this.valueOutsideSelection();
        this.copy();
        this.value = valueOutsideSelection[0] + valueOutsideSelection[1];
        this.selection = [0, 0];
    }
    paste() {
        let valueOutsideSelection = this.valueOutsideSelection();
        this.value = valueOutsideSelection[0] + this.clipboard + valueOutsideSelection[1];
        this.clipboard = "";
        this.selection = [0, 0];
    }
    valueOutsideSelection() {
        let valueAfterSelection = this.value.substr(this.selection[1]);
        let valueBeforeSelection = this.value.substr(0, this.selection[0]);
        return [valueBeforeSelection, valueAfterSelection];
    }
    currentSettings() {
        return {
            value: this.value,
            clipboard: this.clipboard,
            selection: this.selection
        }
    }
    loadSettings(settings) {
        this.value = settings["value"];
        this.clipboard = settings["clipboard"];
        this.selection = settings["selection"];
    }
}

class Command {
    constructor() {
        if(new.target === Command) {
            throw new TypeError("This is an abstract class");
        }
        let _class = this;
        forceRequiredMethods(_class, ["execute", "undo"]);
    }
}

class CutCommand extends Command {
    constructor(textEditor, selection) {
        super();
        this.textEditor = textEditor;
        this.textEditor.selection = selection;
        this.previousSettings = this.textEditor.currentSettings();
    }
    execute() {
        this.textEditor.cut();
    }
    undo() {
        this.textEditor.loadSettings(this.previousSettings);
    }
}

class CopyCommand extends Command {
    constructor(textEditor, selection) {
        super();
        this.textEditor = textEditor;
        this.textEditor.selection = selection;
        this.previousSettings = this.textEditor.currentSettings();
    }
    execute() {
        this.textEditor.copy();
    }
    undo() {
        this.textEditor.loadSettings(this.previousSettings);
    }
}

class PasteCommand extends Command {
    constructor(textEditor, selection) {
        super();
        this.textEditor = textEditor;
        this.textEditor.selection = selection;
        this.previousSettings = this.textEditor.currentSettings();
    }
    execute() {
        this.textEditor.paste();
    }
    undo() {
        this.textEditor.loadSettings(this.previousSettings);
    }
}

let textFile = new TextEditor("Let's see how this string of words can go with all the commands");

let cutSomeWords = new CutCommand(textFile, [5, 10]);
cutSomeWords.execute();
console.log(textFile);
cutSomeWords.undo();
console.log(textFile);

let copySomeWords = new CopyCommand(textFile, [5, 10]);
console.log(textFile);
copySomeWords.execute();
console.log(textFile);

let pasteSomeWords = new PasteCommand(textFile, [10, 10]);
console.log(textFile);
pasteSomeWords.execute();
console.log(textFile);
