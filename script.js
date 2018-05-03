//addToQueue(new Command(printString, [1000, "Test String 1", 500]));
//addToQueue(new Command(printNewLine, [1000]));
//addToQueue(new Command(printString, [3000, "Test String 2", 50]));
//addToQueue(new Command(printNewLine, [1000]));
//addToQueue(new Command(printString, [5000, "Test String 3", 5]));
//addToQueue(new Command(printNewLine, [1000]));

for (var i = 1; i <= 50; i++) {
  addToQueue(new Command(printString, [0, "Test String " + i, 5]));
  addToQueue(new Command(printNewLine, [5]));
}

//addToQueue("Sooo... I added support for new lines.");
//addToQueue(newLine);
//addToQueue("And the little arrow thing to make it look more like a console.");
//addToQueue(newLine);
//addToQueue("And I can directly control the delays.");
//addToQueue(newLine);
//addToQueue("So it pauses between lines.");
//addToQueue(newLine);
//addToQueue(newLine);
//addToQueue("This is kinda cool now actually.");
//addToQueue(newLine);
//addToQueue("I wonder what I can build with this...");
//addToQueue(newLine);

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
