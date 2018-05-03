for (var i = 1; i <= 10; i++) {
  addToQueue(new Command(tPrint, [0, "Printing Example " + i, 5]));
  //addToQueue(new Command(tNewLine, [5]));
}

Array.prototype.shuffle = function() {
    var input = this;

    for (var i = input.length-1; i >=0; i--) {

        var randomIndex = Math.floor(Math.random()*(i+1));
        var itemAtIndex = input[randomIndex];

        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
}

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
