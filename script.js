addToQueue(new Command(1000, tPrintBlink, ["INITIALIZING", 3, 500]));
addToQueue(new Command(500, tRemoveLast));
addToQueue(new Command(1000, tPrint, ["PLEASE STAND BY", 0, false]));
addToQueue(new Command(500, tPrint, ["...", 500, false]));
addToQueue(new Command(500, tRemoveLast));
addToQueue(new Command(500, tRemoveLast));
//addToQueue(new Command(0, tNewLine));
//addToQueue(new Command(0, tNewLine));

addToQueue(new Command(500, tPrint, ["CONNECTING", 0, false]));
addToQueue(new Command(500, tPrint, ["...", 500, false]));
addToQueue(new Command(0, tNewLine));
addToQueue(new Command(500, tPrint, ["AUTHENTICATING", 0, false]));
addToQueue(new Command(500, tPrint, ["...", 500, false]));
addToQueue(new Command(0, tNewLine));
addToQueue(new Command(500, tPrintBlink, ["CONNECTION ESTABLISHED", 3, 500]));
addToQueue(new Command(0, tNewLine));

addToQueue(new Command(500, tPrint, ["PROJECT L.I.S.A. MAINFRAME", 5]));
addToQueue(new Command(500, tPrint, ["REMOTE ACCESS TERMINAL", 5]));
addToQueue(new Command(0, tNewLine));
addToQueue(new Command(0, tPrint, ["ENTER PASSWORD:", 5]));

var loggedIn = false;
var responses = ["... I don't understand.",
                 "...",
                 "What?",
                 "What do you mean?",
                 "What are you saying?"];

function parseInput(input) {
  if (!loggedIn) {
    addToQueue(new Command(500, tPrint, ["Verifying", 5, false]));
    addToQueue(new Command(500, tPrint, ["...", 500, false]));
    if (input == "password") {
      loggedIn = true;
      addToQueue(new Command(500, tPrint, ["PASSWORD ACCEPTED", 0]));
      addToQueue(new Command(0, tNewLine));
      addToQueue(new Command(500, tPrint, ["Unlocking", 5, false]));
      addToQueue(new Command(500, tPrint, ["...", 500, false]));
      addToQueue(new Command(500, tPrint, [" Unlocked.", 0, false]));
      addToQueue(new Command(0, tNewLine));
      addToQueue(new Command(1000, tPrint, ["Access Granted", 5]));
      addToQueue(new Command(0, tNewLine));
      addToQueue(new Command(1000, tPrint, ["...", 1000, false]));
      addToQueue(new Command(0, tPrint, [" Hello?", 50, false]));
      addToQueue(new Command(2000, tPrint, ["Is somebody there?", 50]));
    }
    else {
      addToQueue(new Command(500,  tPrint, ["PASSWORD REJECTED", 0]));
      addToQueue(new Command(0, tNewLine));
      addToQueue(new Command(0, tPrint, ["ENTER PASSWORD:", 0]));
    }
  }
  else {
    responses.shuffle();
    addToQueue(new Command(500, tPrint, [responses[0], 50]));
  }
  processQueue();
}

//addToQueue(new Command(tPrint, [0, "L.I.S.A. v0.1", 5]));
