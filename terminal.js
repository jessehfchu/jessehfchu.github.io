// Constants
const blinkRate = 500;
const terminalElementID = "txtCommandLineDisplay";
const terminalElement = document.getElementById(terminalElementID);
const userInputElementID = "inputUser";
const userInputElement = document.getElementById(userInputElementID);
const displayInputElementID = "txtInputDisplay";
const displayInputElement = document.getElementById(displayInputElementID);

// Declare Global Command Queue
var commandQueue = [];

// Start Timers
var blinkTerminalTimer = setInterval(blinkTerminalCursor, blinkRate);
var blinkInputTimer = setInterval(blinkInputCursor, blinkRate);

// Start Queue Processor
processQueue();

// Command Class
function Command(func, args) {
  this.func = func;
  this.args = args;
}

// Add Command to Queue
function addToQueue(command) {
  commandQueue.push(command);
}

// Execute available Commands, otherwise poll
function processQueue() {
  if (commandQueue.length > 0) {
    let command = commandQueue.shift();
    command.func.apply(this, command.args);
  }
  else {
    setTimeout(processQueue, 10);
  }
}

// Print a string character-by-character
function printString(delay, msg, speed) {
  if (msg.length > 0) {
    let strArray = Array.from(msg);
    let displayed = terminalElement.innerHTML.replace(/█/, "");
    terminalElement.innerHTML = displayed + strArray.shift() + "█";
    setTimeout(printString, speed, delay, strArray.join(""), speed);
  }
  else {
    setTimeout(processQueue, delay);
  }
}

// Insert a page break
function printNewLine(delay) {
  terminalElement.appendChild(document.createElement("br"));
  setTimeout(processQueue, delay);
}

// Blinks Terminal Cursor
function blinkTerminalCursor() {
  if (terminalElement.innerHTML.includes("█")) {
    terminalElement.innerHTML = terminalElement.innerHTML.replace(/█/, "");
  }
  else {
    terminalElement.innerHTML += "█";
  }
}

// Blinks Input Cursor
function blinkInputCursor() {
  if (displayInputElement.innerHTML.includes("█")) {
    displayInputElement.innerHTML = displayInputElement.innerHTML.replace(/█/, "");
  }
  else {
    displayInputElement.innerHTML += "█";
  }
}


// Focuses input
function focusInput() {
  userInputElement.focus();
}

// Sync typed input
function syncInput(input, e) {
  displayInputElement.innerHTML = "> " + userInputElement.value + "█";
}

//http://www.dynamicdrive.com/forums/showthread.php?17450-Emulating-a-terminal-like-caret-with-javascript-and-css
// Test

/*
// Scroll page down
function scrollBottom() {

}

var out = document.getElementById("out");
var c = 0;
var add = setInterval(function() {
    // allow 1px inaccuracy by adding 1
    var isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1;
    console.log(out.scrollHeight - out.clientHeight,  out.scrollTop + 1);
    // scroll to bottom if isScrolledToBotto
    if(isScrolledToBottom)
      out.scrollTop = out.scrollHeight - out.clientHeight;
}, 1000);*/
