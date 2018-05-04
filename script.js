addToQueue(new Command(0, tPrint, ["Initializing", 5]));
addToQueue(new Command(500, tPrint, ["...", 500]));
addToQueue(new Command(500, tPrint, [" Complete.", 0]));
addToQueue(new Command(0, tNewLine));
addToQueue(new Command(0, tNewLine));

addToQueue(new Command(1000, tPrint, ["Connecting", 5]));
addToQueue(new Command(500, tPrint, ["...", 500]));
addToQueue(new Command(500, tPrint, [" Connected.", 0]));
addToQueue(new Command(0, tNewLine));
addToQueue(new Command(0, tNewLine));

addToQueue(new Command(500, tPrintLine, ["PROJECT L.I.S.A. MAINFRAME", 5]));
addToQueue(new Command(500, tPrintLine, ["REMOTE ACCESS TERMINAL", 5]));
addToQueue(new Command(0, tNewLine));
addToQueue(new Command(0, tPrintLine, ["ENTER PASSWORD:", 5]));

var loggedIn = false;
var responses = ["... I don't understand.",
                 "...",
                 "What?",
                 "What do you mean?",
                 "What are you saying?"];

function parseInput(input) {
  if (!loggedIn) {
    addToQueue(new Command(500, tPrint, ["Verifying", 5]));
    addToQueue(new Command(500, tPrint, ["...", 500]));
    if (input == "password") {
      loggedIn = true;
      addToQueue(new Command(500, tPrintLine, ["PASSWORD ACCEPTED", 0]));
      addToQueue(new Command(0, tNewLine));
      addToQueue(new Command(500, tPrint, ["Unlocking", 5]));
      addToQueue(new Command(500, tPrint, ["...", 500]));
      addToQueue(new Command(500, tPrint, [" Unlocked.", 0]));
      addToQueue(new Command(0, tNewLine));
      addToQueue(new Command(1000, tPrintLine, ["Access Granted", 5]));
      addToQueue(new Command(0, tNewLine));
      addToQueue(new Command(1000, tPrint, ["...", 1000]));
      addToQueue(new Command(0, tPrint, [" Hello?", 50]));
      addToQueue(new Command(2000, tPrintLine, ["Is somebody there?", 50]));
    }
    else {
      addToQueue(new Command(500,  tPrintLine, ["PASSWORD REJECTED", 0]));
      addToQueue(new Command(0, tNewLine));
      addToQueue(new Command(0, tPrintLine, ["ENTER PASSWORD:", 0]));
    }
  }
  else {
    responses.shuffle();
    addToQueue(new Command(500, tPrintLine, [responses[0], 50]));
  }
  processQueue();
}

//addToQueue(new Command(tPrint, [0, "L.I.S.A. v0.1", 5]));

/*for (var i = 1; i <= 10; i++) {
  addToQueue(new Command(tPrint, [0, "Printing Example ", 5]));
  addToQueue(new Command(tPrintLine, [0, String(i), 5]));
  //addToQueue(new Command(tNewLine, [5]));
}*/

// Bogosort Hello World
var msg = Array.from("Hello World").shuffle();
var attempt = 0;
var highscore = checkMSG(msg);
var closest = msg.join("");

//var bgsHW = setTimeout(rollHW,10);

function rollHW() {
  attempt += 1;
  var check = checkMSG(msg);
  closest = check > highscore ? msg.join("") : closest;
  highscore = check > highscore ? check : highscore;
  addToQueue("Attempt: " + attempt + " " + msg.join("") + "(" + check + ")" + "   Best: " + closest + "(" + highscore + ")");
  addToQueue(newLine)
  if (highscore != 11) {
    msg.shuffle();
    setTimeout(rollHW,10);
    //clearInterval(bgsHW);
  }
  //msg.shuffle();
}

function checkMSG(text) {
  var score = 0;
  score += text[0] == "H" ? 1 : 0;
  score += text[1] == "e" ? 1 : 0;
  score += text[2] == "l" ? 1 : 0;
  score += text[3] == "l" ? 1 : 0;
  score += text[4] == "o" ? 1 : 0;
  score += text[5] == " " ? 1 : 0;
  score += text[6] == "W" ? 1 : 0;
  score += text[7] == "o" ? 1 : 0;
  score += text[8] == "r" ? 1 : 0;
  score += text[9] == "l" ? 1 : 0;
  score += text[10] == "d" ? 1 : 0;
  //score += text[11] == "!" ? 1 : 0;
  return score;
}
