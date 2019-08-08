/* Introduction lines/animation */
addToQueue(new Command(1000, tPrintBlink, ["INITIALIZING", 3, 500]));
addToQueue(new Command(0, tRemoveAll));
addToQueue(new Command(1000, tPrint, ["PLEASE STAND BY", 0, false]));
addToQueue(new Command(500, tPrintLoop, ["...", 5, 50, false]));
addToQueue(new Command(0, tRemoveAll));
addToQueue(new Command(500, tPrint, ["CONNECTING", 0, false]));
addToQueue(new Command(500, tPrintLoop, ["... ", 5, 50, false]));
addToQueue(new Command(500, tPrintBlink, ["CONNECTED", 3, 250, false]));
addToQueue(new Command(0, tRemoveAll));
addToQueue(new Command(500, tPrint, ["AUTHENTICATING", 0, false]));
addToQueue(new Command(500, tPrintLoop, ["... ", 5, 50, false]));
addToQueue(new Command(500, tPrintBlink, ["AUTHENTICATED", 3, 250, false]));
addToQueue(new Command(0, tRemoveAll));
addToQueue(new Command(500, tPrintBlink, ["CONNECTION ESTABLISHED", 3, 500]));
addToQueue(new Command(0, tRemoveAll));

/* Script Variables */
// Current phase of script
let state = 0;
// Confused responses
let rConfused = ["... I don't understand.",
                 "...",
                 "What?",
                 "What do you mean?",
                 "What are you saying?"];

/* Login Sequence */
//addToQueue(new Command(500, tPrint, ["PROJECT L.I.S.A. MAINFRAME", 5]));
addToQueue(new Command(500, tPrint, ["WEB TEST PROJECT", 5]));
addToQueue(new Command(500, tPrint, ["REMOTE ACCESS TERMINAL", 5]));
addToQueue(new Command(0, tNewLine));
addToQueue(new Command(0, tPrint, ["ENTER PASSWORD:", 5]));

/* Script */
function parseInput(input) {
  switch(state) {
    // Login Phase
    case 0:
      addToQueue(new Command(500, tPrint, ["Verifying", 5, false]));
      addToQueue(new Command(500, tPrintLoop, ["...", 3, 50, false]));
      if (input == "password") {
        addToQueue(new Command(500, tPrint, ["PASSWORD ACCEPTED", 0]));
        addToQueue(new Command(0, tNewLine));
        addToQueue(new Command(1000, tPrintBlink, ["Access Granted", 3, 500]));
        addToQueue(new Command(0, tNewLine));
        addToQueue(new Command(1000, tPrint, ["...", 1000, false]));
        addToQueue(new Command(0, tPrint, [" Hello?", 50, false]));
        addToQueue(new Command(2000, tPrint, ["Is somebody there?", 50]));
        state += 1;
      }
      else {
        addToQueue(new Command(500,  tPrintBlink, ["PASSWORD REJECTED", 3, 250]));
        addToQueue(new Command(0, tNewLine));
        addToQueue(new Command(0, tPrint, ["ENTER PASSWORD:", 0]));
      }
      break;
    default:
      rConfused.shuffle();
      addToQueue(new Command(500, tPrint, [rConfused[0], 50]));
  }
  // Newlines for conversation
  if (state != 0) {
    addToQueue(new Command(0, tNewLine));
  }
  // Continue processing
  processQueue();
}
