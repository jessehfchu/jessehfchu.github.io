/* Initialization */

// Constants
const blinkRate = 500;
var inputSymbol = "> "

// Element References
const terminalElementID = "txtCommandLineDisplay";
const terminalElement = document.getElementById(terminalElementID);
const displayInputElementID = "txtInputDisplay";
const displayInputElement = document.getElementById(displayInputElementID);
const hiddenInputElementID = "hiddenInput";
const hiddenInputElement = document.getElementById(hiddenInputElementID);

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
//var blinkTerminalTimer = setInterval(blinkCursor, blinkRate);
var blinkInputTimer = setInterval(blinkCursor, blinkRate, displayInputElement);

// Start Queue Processor
processQueue();



/* Terminal Processor */

// Command Class Definition
function Command(delay, func, args) {
  this.delay = delay;
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
    if (command.delay > 0) {
      // Delayed execution
      setTimeout(execCommand, command.delay, command);
    }
    else {
      // Immediate execution
      execCommand(command);
    }
  }
  else {
    // Poll Queue
    setTimeout(processQueue, 50);
  }
}

// Executes a given command with its arguments
function execCommand(cmd) {
  cmd.func.apply(this, cmd.args);
  scrollBottom();
}



/* Terminal Commands */

// Print a string character-by-character in a span
function tPrint(msg, speed) {
  // Only print if message is not empty
  if (msg.length > 0) {
    // Create a new span element
    let element = document.createElement("span");
    terminalElement.appendChild(element);
    tWrite(msg, speed, element);
  }
  else {
    processQueue();
  }
}

// Print a string character-by-character in a div
function tPrintLine(msg, speed) {
  // Only print if message is not empty
  if (msg.length > 0) {
    // Create a new div element
    let element = document.createElement("div");
    terminalElement.appendChild(element);
    tWrite(msg, speed, element);
  }
  else {
    processQueue();
  }
}

// Writes out message at a given speed to a given element
function tWrite(msg, speed, element) {
  if (msg.length > 0) {
    if (speed > 0) {
      // Type out for non-zero speeds
      let strArray = Array.from(msg);
      element.innerHTML += strArray.shift();
      setTimeout(tWrite, speed, strArray.join(""), speed, element);
    }
    else {
      // Instantly display
      element.innerHTML = msg;
      processQueue();
    }
  }
  // Resume Queue
  else {
    processQueue();
  }
}

// Create a new line
function tNewLine() {
  terminalElement.appendChild(document.createElement("br"));
  processQueue();
}



/* Graphical Functions */

// Keep page scrolled down
function scrollBottom() {
  terminalElement.scrollTop = terminalElement.scrollHeight - terminalElement.clientHeight;
}

// Blinks Cursor at given element
function blinkCursor(element) {
  if (element.innerHTML.includes("█")) {
    element.innerHTML = element.innerHTML.replace(/█/, "");
  }
  else {
    element.innerHTML += "█";
  }
}

// Sync typed input
function syncInput() {
  hiddenInputElement.value = "";
  displayInputElement.innerHTML = inputSymbol + userInput + "█";
}



/* Event Handlers */

// Process Key Down Event
function handleKeyDown(e) {
  if (e.key == "Backspace") {
    userInput = userInput.slice(0, -1);
  }
  syncInput();
}

// Process Key Press Event
function handleKeyPress(e) {
  if (!(document.activeElement === hiddenInputElement) && String(e.key).length == 1) {
    userInput += e.key;
  }
  else if (e.key == "Enter") {
    // Display User Input
    addToQueue(new Command(0, tPrintLine, [inputSymbol + userInput, 0]));
    // Parse User Input
    addToQueue(new Command(0, parseInput, [userInput]));
    userInput = "";
  }
  syncInput();
}

// Process Input Event
function handleInput(e) {
  if ((document.activeElement === hiddenInputElement) && String(e.data).length == 1) {
    userInput += e.data;
  }
  syncInput();
}
