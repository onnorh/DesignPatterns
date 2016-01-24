"""
   Command Pattern - encapsulates a request as an object, which provides the
   client the benefit of having multiple different requests. The request will
   be executed by another entity that knows how to interact with it.

   Example - The text editor has a set of commands we sometimes use, the cut,
   copy, paste and undo. The user does not know how these commands are executed
   or the algorithims inside it. The user just need to send the command to the
   text editor and the text editor will handle it for him/her.
"""

from abc import ABCMeta, abstractmethod

class TextEditor:
    def __init__(self, value):
        self.value = value
        self.selection = [0, 0]
        self.clipboard = ""

    def copy(self):
        self.clipboard = self.value[self.selection[0]:self.selection[1]]
        self.selection = [0, 0]

    def cut(self):
        valueBefore, valueAfter = self.valueOutsideSelection()
        self.value = valueBefore + valueAfter
        self.selection = [0, 0]

    def paste(self):
        valueBefore, valueAfter = self.valueOutsideSelection()
        self.value = valueBefore + self.clipboard + valueAfter
        self.clipboard = ""
        self.selection = [0, 0]

    def valueOutsideSelection(self):
        valueAfter = self.value[self.selection[1]:]
        valueBefore = self.value[0:self.selection[0]]
        return valueBefore, valueAfter

    def currentSettings(self):
        return {
            "value": self.value,
            "clipboard": self.clipboard,
            "selection": self.selection
        }

    def loadSettings(self, settings):
        self.value = settings["value"]
        self.clipboard = settings["clipboard"]
        self.selection = settings["selection"]

class Command:
    __metaclass__ = ABCMeta

    @abstractmethod
    def execute(self):
        pass

    @abstractmethod
    def undo(self):
        pass

class CutCommand(Command):
    def __init__(self, textEditor, selection):
        self.textEditor = textEditor
        self.textEditor.selection = selection
        self.previousSettings = self.textEditor.currentSettings()

    def execute(self):
        self.textEditor.cut()

    def undo(self):
        self.textEditor.loadSettings(self.previousSettings)

class CopyCommand(Command):
    def __init__(self, textEditor, selection):
        self.textEditor = textEditor
        self.textEditor.selection = selection
        self.previousSettings = self.textEditor.currentSettings()

    def execute(self):
        self.textEditor.copy()

    def undo(self):
        self.textEditor.loadSettings(self.previousSettings)

class PasteCommand(Command):
    def __init__(self, textEditor, selection):
        self.textEditor = textEditor
        self.textEditor.selection = selection
        self.previousSettings = self.textEditor.currentSettings

    def execute(self):
        self.textEditor.paste()

    def undo(self):
        self.textEditor.loadSettings(self.previousSettings)

textFile = TextEditor("Let's see how this string of words can go with all the commands")

cutSomeWords = CutCommand(textFile, [5, 10])
cutSomeWords.execute()
print textFile.value
cutSomeWords.undo()
print textFile.value

copySomeWords = CopyCommand(textFile, [5, 10])
print textFile.value
copySomeWords.execute()
print textFile.value

pasteSomeWords = PasteCommand(textFile, [10, 10])
print textFile.value
pasteSomeWords.execute()
print textFile.value
