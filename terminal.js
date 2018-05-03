// Constants
const blinkRate = 500;
const terminalElementID = "txtCommandLineDisplay";
const terminalElement = document.getElementById(terminalElementID);
const displayInputElementID = "txtInputDisplay";
const displayInputElement = document.getElementById(displayInputElementID);

// Declare Global Command Queue
var commandQueue = [];

// Declare Global User Input
var userInput = "";

// Bind Event Handlers
window.addEventListener("keydown", function(event) { handleKeyDown(event); });

// Start Timers
//var blinkTerminalTimer = setInterval(blinkTerminalCursor, blinkRate);
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
function tPrint(delay, msg, speed, element = null) {
  if (element == null) {
    element = document.createElement("div");
    terminalElement.appendChild(element);
  }
  if (msg.length > 0) {
    let strArray = Array.from(msg);
    element.innerHTML += strArray.shift();
    setTimeout(tPrint, speed, delay, strArray.join(""), speed, element);
  }
  else {
    setTimeout(processQueue, delay);
  }
}

// Insert a page break
function tNewLine(delay) {
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

// Sync typed input
function syncInput() {
  displayInputElement.innerHTML = "> " + userInput + "█";
}

// Process Key Press
function handleKeyDown(e) {
  addToQueue(new Command(tPrint, [0, "Key: " + e.key, 5]));
}

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
