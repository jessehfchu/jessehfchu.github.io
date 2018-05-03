/* Initialization */

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
syncInput();

// Bind Event Handlers
window.addEventListener("keydown", function(event) { handleKeyDown(event); });

// Start Timers
//var blinkTerminalTimer = setInterval(blinkTerminalCursor, blinkRate);
var blinkInputTimer = setInterval(blinkInputCursor, blinkRate);

// Start Queue Processor
processQueue();



/* Terminal Processor */

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
    scrollBottom();
  }
  else {
    setTimeout(processQueue, 50);
  }
}

// Keep page scrolled down
function scrollBottom() {
  terminalElement.scrollTop = terminalElement.scrollHeight - terminalElement.clientHeight;
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



/* Terminal Commands */

// Print a string character-by-character
function tPrint(delay, msg, speed, element = null) {
  // Only print if message is not empty
  if (msg.length > 0) {
    // Create new div element if needed
    if (element == null) {
      element = document.createElement("span");
      terminalElement.appendChild(element);
    }
    // Type out for non-zero speeds
    if (speed > 0) {
      let strArray = Array.from(msg);
      element.innerHTML += strArray.shift();
      setTimeout(tPrint, speed, delay, strArray.join(""), speed, element);
    }
    // Instantly display
    else {
      element.innerHTML = msg;
      setTimeout(processQueue, delay);
    }
  }
  // Resume Queue at string end
  else {
    setTimeout(processQueue, delay);
  }
}

function tPrintLine(delay, msg, speed, element = null) {
  // Only print if message is not empty
  if (msg.length > 0) {
    // Create new div element if needed
    if (element == null) {
      element = document.createElement("div");
      terminalElement.appendChild(element);
    }
    // Type out for non-zero speeds
    if (speed > 0) {
      let strArray = Array.from(msg);
      element.innerHTML += strArray.shift();
      setTimeout(tPrint, speed, delay, strArray.join(""), speed, element);
    }
    // Instantly display
    else {
      element.innerHTML = msg;
      setTimeout(processQueue, delay);
    }
  }
  // Resume Queue at string end
  else {
    setTimeout(processQueue, delay);
  }
}

// Insert a page break
function tNewLine(delay) {
  terminalElement.appendChild(document.createElement("br"));
  setTimeout(processQueue, delay);
}



/* User Input */

// Sync typed input
function syncInput() {
  displayInputElement.innerHTML = ">>> " + userInput + "█";
}

// Process Key Press
function handleKeyDown(e) {
  if (String(e.key).length == 1) {
    userInput += e.key;
  }
  else if (e.key == "Backspace") {
    userInput = userInput.slice(0, -1);
  }
  else if (e.key == "Enter") {
    addToQueue(new Command(tPrintLine, [0, ">>> " + userInput, 0]));
    addToQueue(new Command(parseInput, [500, userInput]));
    userInput = "";
  }
  syncInput();
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
