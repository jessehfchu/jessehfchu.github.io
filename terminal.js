/* Initialization */

// Constants
const blinkRate = 500;
const terminalElementID = "txtCommandLineDisplay";
const terminalElement = document.getElementById(terminalElementID);
const displayInputElementID = "txtInputDisplay";
const displayInputElement = document.getElementById(displayInputElementID);
const hiddenInputElementID = "hiddenInput";
const hiddenInputElement = document.getElementById(hiddenInputElementID);
const inputSymbol = ">>> "

// Declare Global Command Queue
var commandQueue = [];

// Declare Global User Input
var userInput = "";
syncInput();

// Bind Event Handlers
window.addEventListener("keydown", function(event) { handleKeyDown(event); });
window.addEventListener("keypress", function(event) { handleKeyPress(event); });
hiddenInputElement.addEventListener("input", function(event) { handleInput(event); });

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

// Print a string character-by-character in a span
function tPrint(delay, msg, speed, element = null) {
  // Only print if message is not empty
  if (msg.length > 0) {
    // Create new span element if needed
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

// Print a string character-by-character in a div
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
  displayInputElement.innerHTML = inputSymbol + userInput + "█";
}

// Process Key Down
function handleKeyDown(e) {
  if (e.key == "Backspace") {
    userInput = userInput.slice(0, -1);
  }
  hiddenInputElement.value = "";
  syncInput();
}

// Process Key Press
function handleKeyPress(e) {
  if (!(document.activeElement === hiddenInputElement) && String(e.key).length == 1) {
    userInput += e.key;
  }
  else if (e.key == "Enter") {
    addToQueue(new Command(tPrintLine, [500, inputSymbol + userInput, 0]));
    addToQueue(new Command(parseInput, [0, userInput]));
    userInput = "";
  }
  hiddenInputElement.value = "";
  syncInput();
}

// Process Input
function handleInput(e) {
  if (String(e.data).length == 1) {
    userInput += e.data;
  }
  hiddenInputElement.value = "";
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
