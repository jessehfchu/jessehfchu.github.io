/** Reference to canvas element **/
canvas = document.getElementById("canvasCards");
context = canvas.getContext("2d");

// Column Numbers
bNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
iNumbers = [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
nNumbers = [31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];
gNumbers = [46,47,48,49,50,51,52,53,54,55,56,57,58,59,60];
oNumbers = [61,62,63,64,65,66,67,68,69,70,71,72,73,74,75];

// Bingo Cards
cards = [];

// Bingo Card Class
class BingoCard {
  constructor() {
    this.reroll();
  }

  reroll() {
    this.letters = [];
    bNumbers.shuffle();
    this.letters.push([
      {"element" : "b0", "number" : bNumbers[0], "stamped" : false},
      {"element" : "b1", "number" : bNumbers[1], "stamped" : false},
      {"element" : "b2", "number" : bNumbers[2], "stamped" : false},
      {"element" : "b3", "number" : bNumbers[3], "stamped" : false},
      {"element" : "b4", "number" : bNumbers[4], "stamped" : false}
    ]);
    iNumbers.shuffle();
    this.letters.push([
      {"element" : "i0", "number" : iNumbers[0], "stamped" : false},
      {"element" : "i1", "number" : iNumbers[1], "stamped" : false},
      {"element" : "i2", "number" : iNumbers[2], "stamped" : false},
      {"element" : "i3", "number" : iNumbers[3], "stamped" : false},
      {"element" : "i4", "number" : iNumbers[4], "stamped" : false}
    ]);
    nNumbers.shuffle();
    this.letters.push([
      {"element" : "n0", "number" : nNumbers[0], "stamped" : false},
      {"element" : "n1", "number" : nNumbers[1], "stamped" : false},
      {"element" : "n2", "number" : "FREE", "stamped" : false},
      {"element" : "n3", "number" : nNumbers[3], "stamped" : false},
      {"element" : "n4", "number" : nNumbers[4], "stamped" : false}
    ]);
    gNumbers.shuffle();
    this.letters.push([
      {"element" : "g0", "number" : gNumbers[0], "stamped" : false},
      {"element" : "g1", "number" : gNumbers[1], "stamped" : false},
      {"element" : "g2", "number" : gNumbers[2], "stamped" : false},
      {"element" : "g3", "number" : gNumbers[3], "stamped" : false},
      {"element" : "g4", "number" : gNumbers[4], "stamped" : false}
    ]);
    oNumbers.shuffle();
    this.letters.push([
      {"element" : "o0", "number" : oNumbers[0], "stamped" : false},
      {"element" : "o1", "number" : oNumbers[1], "stamped" : false},
      {"element" : "o2", "number" : oNumbers[2], "stamped" : false},
      {"element" : "o3", "number" : oNumbers[3], "stamped" : false},
      {"element" : "o4", "number" : oNumbers[4], "stamped" : false}
    ]);
  }
}

function reset() {
  for (let i = 0; i < 8; i++) {
    cards.push(new BingoCard());
  }
  draw();
}

function draw() {
  // Size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Draw based on orientation
  if (canvas.width > canvas.height) {
    drawLandscape();
  }
  else {
    drawPortrait();
  }
}

function drawLandscape() {
  // White Background
  context.fillStyle = "white";
  context.globalAlpha = 1;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Card Backgrounds
  context.fillStyle = "lightgrey";
  context.fillRect(canvas.width * 1 / 4, canvas.height * 0 / 2, canvas.width * 1 / 4, canvas.height * 1 / 2);
  context.fillRect(canvas.width * 3 / 4, canvas.height * 0 / 2, canvas.width * 1 / 4, canvas.height * 1 / 2);
  context.fillRect(canvas.width * 0 / 4, canvas.height * 1 / 2, canvas.width * 1 / 4, canvas.height * 1 / 2);
  context.fillRect(canvas.width * 2 / 4, canvas.height * 1 / 2, canvas.width * 1 / 4, canvas.height * 1 / 2);

  // Sheet Lines
  context.strokeStyle = "black";
  context.lineWidth = 5;
  // Horizontal Sheet Lines
  for (let i = 0; i <= 2; i++) {
    context.beginPath();
    context.moveTo(canvas.width * 0 / 4, canvas.height * i / 2);
    context.lineTo(canvas.width * 4 / 4, canvas.height * i / 2);
    context.stroke();
  }
  // Vertical Sheet Lines
  for (let i = 0; i <= 4; i++) {
    context.beginPath();
    context.moveTo(canvas.width * i / 4, canvas.height * 0 / 2);
    context.lineTo(canvas.width * i / 4, canvas.height * 2 / 2);
    context.stroke();
  }

  // Header Grid Lines
  context.strokeStyle = "black";
  context.lineWidth = 3;
  for (let i = 0; i <= 1; i++) {
    context.beginPath();
    context.moveTo(canvas.width * 0 / 4, canvas.height * ((i * 10) + 1) / 20);
    context.lineTo(canvas.width * 4 / 4, canvas.height * ((i * 10) + 1) / 20);
    context.stroke();
  }

  // Number Lines
  context.strokeStyle = "black";
  context.lineWidth = 1;
  // Horizontal Lines
  for (let i = 0; i <= 4; i++) {
    context.beginPath();
    context.moveTo(canvas.width * 0 / 4, (canvas.height * 1 / 20) + (canvas.height * i * 9 / 100));
    context.lineTo(canvas.width * 4 / 4, (canvas.height * 1 / 20) + (canvas.height * i * 9 / 100));
    context.stroke();
    context.beginPath();
    context.moveTo(canvas.width * 0 / 4, (canvas.height * 11 / 20) + (canvas.height * i * 9 / 100));
    context.lineTo(canvas.width * 4 / 4, (canvas.height * 11 / 20) + (canvas.height * i * 9 / 100));
    context.stroke();
  }
  // Vertical Lines
  for (let i = 0; i <= 20; i++) {
    context.beginPath();
    context.moveTo(canvas.width * i / 20, (canvas.height * 0 / 20));
    context.lineTo(canvas.width * i / 20, (canvas.height * 20 / 20));
    context.stroke();
  }

  // Headers
  context.font = getHeaderFont();
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "black";
  for (let i = 0; i <= 20; i++) {
    let char = "";
    if ((i % 5) == 0) {
      char = "B";
    }
    else if ((i % 5) == 1) {
      char = "I";
    }
    else if ((i % 5) == 2) {
      char = "N";
    }
    else if ((i % 5) == 3) {
      char = "G";
    }
    else if ((i % 5) == 4) {
      char = "O";
    }
    context.fillText(char, (canvas.width * i / 20) + (canvas.width * 1 / 40), (canvas.height * 1 / 20) - (canvas.height * 1 / 45));
    context.fillText(char, (canvas.width * i / 20) + (canvas.width * 1 / 40), (canvas.height * 11 / 20) - (canvas.height * 1 / 45));
  }

  // Numbers
  context.font = getNumberFont();
  cards.forEach((card, iC) => {
    card.letters.forEach((letter, iL) => {
      letter.forEach((number, iN) => {
        context.fillText(
          number.number,
          (canvas.width * (iC % 4) * 1 / 4) + (canvas.width * iL * 1 / 20) + (canvas.width * 1 / 40),
          (canvas.height * Math.floor(iC/4) * 1 / 2) + (canvas.height * 1 / 20) + (canvas.height * iN * 9 / 100) + (canvas.height * 19 / 400)
        );
      });
    });
  });

  // Stamps
  context.fillStyle = "red";
  context.globalAlpha = 0.5;
  cards.forEach((card, iC) => {
    card.letters.forEach((letter, iL) => {
      letter.forEach((number, iN) => {
        if (number.stamped) {
          context.beginPath();
          context.arc(
            (canvas.width * (iC % 4) * 1 / 4) + (canvas.width * iL * 1 / 20) + (canvas.width * 1 / 40),
            (canvas.height * Math.floor(iC/4) * 1 / 2) + (canvas.height * 1 / 20) + (canvas.height * iN * 9 / 100) + (canvas.height * 9 / 200),
            (canvas.width * 1 / 50),
            0,
            2 * Math.PI
          );
          context.fill();
        }
      });
    });
  });
}

function drawPortrait() {
  // White Background
  context.fillStyle = "white";
  context.globalAlpha = 1;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Card Backgrounds
  context.fillStyle = "lightgrey";
  context.fillRect(canvas.width * 1 / 2, canvas.height * 0 / 4, canvas.width * 1 / 2, canvas.height * 1 / 4);
  context.fillRect(canvas.width * 0 / 2, canvas.height * 1 / 4, canvas.width * 1 / 2, canvas.height * 1 / 4);
  context.fillRect(canvas.width * 1 / 2, canvas.height * 2 / 4, canvas.width * 1 / 2, canvas.height * 1 / 4);
  context.fillRect(canvas.width * 0 / 2, canvas.height * 3 / 4, canvas.width * 1 / 2, canvas.height * 1 / 4);

  // Sheet Lines
  context.strokeStyle = "black";
  context.lineWidth = 5;
  // Horizontal Sheet Lines
  for (let i = 0; i <= 4; i++) {
    context.beginPath();
    context.moveTo(canvas.width * 0 / 4, canvas.height * i / 4);
    context.lineTo(canvas.width * 4 / 4, canvas.height * i / 4);
    context.stroke();
  }
  // Vertical Sheet Lines
  for (let i = 0; i <= 2; i++) {
    context.beginPath();
    context.moveTo(canvas.width * i / 2, canvas.height * 0 / 2);
    context.lineTo(canvas.width * i / 2, canvas.height * 2 / 2);
    context.stroke();
  }

  // Header Grid Lines
  context.strokeStyle = "black";
  context.lineWidth = 3;
  for (let i = 0; i <= 4; i++) {
    context.beginPath();
    context.moveTo(canvas.width * 0 / 4, canvas.height * ((i * 10) + 1) / 40);
    context.lineTo(canvas.width * 4 / 4, canvas.height * ((i * 10) + 1) / 40);
    context.stroke();
  }

  // Number Lines
  context.strokeStyle = "black";
  context.lineWidth = 1;
  // Horizontal Lines
  for (let i = 0; i <= 4; i++) {
    context.beginPath();
    context.moveTo(canvas.width * 0 / 4, (canvas.height * 1 / 40) + (canvas.height * i * 9 / 200));
    context.lineTo(canvas.width * 4 / 4, (canvas.height * 1 / 40) + (canvas.height * i * 9 / 200));
    context.stroke();
    context.beginPath();
    context.moveTo(canvas.width * 0 / 4, (canvas.height * 11 / 40) + (canvas.height * i * 9 / 200));
    context.lineTo(canvas.width * 4 / 4, (canvas.height * 11 / 40) + (canvas.height * i * 9 / 200));
    context.stroke();
    context.beginPath();
    context.moveTo(canvas.width * 0 / 4, (canvas.height * 21 / 40) + (canvas.height * i * 9 / 200));
    context.lineTo(canvas.width * 4 / 4, (canvas.height * 21 / 40) + (canvas.height * i * 9 / 200));
    context.stroke();
    context.beginPath();
    context.moveTo(canvas.width * 0 / 4, (canvas.height * 31 / 40) + (canvas.height * i * 9 / 200));
    context.lineTo(canvas.width * 4 / 4, (canvas.height * 31 / 40) + (canvas.height * i * 9 / 200));
    context.stroke();
  }
  // Vertical Lines
  for (let i = 0; i <= 10; i++) {
    context.beginPath();
    context.moveTo(canvas.width * i / 10, (canvas.height * 0 / 20));
    context.lineTo(canvas.width * i / 10, (canvas.height * 20 / 20));
    context.stroke();
  }

  // Headers
  context.font = getHeaderFont();
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "black";
  for (let i = 0; i <= 10; i++) {
    let char = "";
    if ((i % 5) == 0) {
      char = "B";
    }
    else if ((i % 5) == 1) {
      char = "I";
    }
    else if ((i % 5) == 2) {
      char = "N";
    }
    else if ((i % 5) == 3) {
      char = "G";
    }
    else if ((i % 5) == 4) {
      char = "O";
    }
    context.fillText(char, (canvas.width * i / 10) + (canvas.width * 1 / 20), (canvas.height * 1 / 40) - (canvas.height * 1 / 90));
    context.fillText(char, (canvas.width * i / 10) + (canvas.width * 1 / 20), (canvas.height * 11 / 40) - (canvas.height * 1 / 90));
    context.fillText(char, (canvas.width * i / 10) + (canvas.width * 1 / 20), (canvas.height * 21 / 40) - (canvas.height * 1 / 90));
    context.fillText(char, (canvas.width * i / 10) + (canvas.width * 1 / 20), (canvas.height * 31 / 40) - (canvas.height * 1 / 90));
  }

  // Numbers
  context.font = getNumberFont();
  cards.forEach((card, iC) => {
    card.letters.forEach((letter, iL) => {
      letter.forEach((number, iN) => {
        context.fillText(
          number.number,
          (canvas.width * (iC % 2) * 1 / 2) + (canvas.width * iL * 1 / 10) + (canvas.width * 1 / 20),
          (canvas.height * Math.floor(iC/2) * 1 / 4) + (canvas.height * 1 / 40) + (canvas.height * iN * 9 / 200) + (canvas.height * 19 / 800)
        );
      });
    });
  });

  // Stamps
  context.fillStyle = "red";
  context.globalAlpha = 0.5;
  cards.forEach((card, iC) => {
    card.letters.forEach((letter, iL) => {
      letter.forEach((number, iN) => {
        if (number.stamped) {
          context.beginPath();
          context.arc(
            (canvas.width * (iC % 2) * 1 / 2) + (canvas.width * iL * 1 / 10) + (canvas.width * 1 / 20),
            (canvas.height * Math.floor(iC/2) * 1 / 4) + (canvas.height * 1 / 40) + (canvas.height * iN * 9 / 200) + (canvas.height * 19 / 800),
            (canvas.height * 1 / 60),
            0,
            2 * Math.PI
          );
          context.fill();
        }
      });
    });
  });
}

function getHeaderFont() {
  let scale = "";
  if (canvas.width > canvas.height) {
    scale = Math.floor(Math.min(32, canvas.width / 50));
  }
  else {
    scale = Math.floor(Math.min(32, canvas.width / 35));
  }
  return "bold " + scale + "pt monospace"
}

function getNumberFont() {
  let scale = "";
  if (canvas.width > canvas.height) {
    scale = Math.floor(Math.min(24, canvas.width / 65));
  }
  else {
    scale = Math.floor(Math.min(64, canvas.width / 30));
  }
  return "bold " + scale + "pt monospace"
}

// Bind Event Handlers
window.addEventListener("resize", draw);

// Stamp toggle on click
canvas.addEventListener("click", function(event) {
  // Get Mouse Coordinates
  let rect = canvas.getBoundingClientRect();
  let mouseX = event.clientX - rect.left;
  let mouseY = event.clientY - rect.top;
  if (canvas.width > canvas.height) {
    // Determine card index
    let iCR = Math.floor(mouseY / (canvas.height * 1 / 2));
    console.log("Row: " + iCR);
    let iC = Math.floor(mouseX / (canvas.width * 1 / 4));
    console.log("Card: " + iC);
    let iL = Math.floor((mouseX % (canvas.width * 1 / 4)) / (canvas.width * 1 / 20));
    console.log("Letter: " + iL);
    let iN = Math.floor((mouseY % (canvas.height * 1 / 2) - (canvas.height * 1 / 20)) / (canvas.height * 9 / 100));
    console.log("Number: " + iN);
    // Toggle stamp
    cards[(4 * iCR) + iC].letters[iL][iN].stamped = !cards[(4 * iCR) + iC].letters[iL][iN].stamped;
  }
  else {
    // Determine card index
    let iCR = Math.floor(mouseY / (canvas.height * 1 / 4));
    console.log("Row: " + iCR);
    let iC = Math.floor(mouseX / (canvas.width * 1 / 2));
    console.log("Card: " + iC);
    let iL = Math.floor((mouseX % (canvas.width * 1 / 2)) / (canvas.width * 1 / 10));
    console.log("Letter: " + iL);
    let iN = Math.floor((mouseY % (canvas.height * 1 / 4) - (canvas.height * 1 / 40)) / (canvas.height * 9 / 200));
    console.log("Number: " + iN);
    // Toggle stamp
    cards[(2 * iCR) + iC].letters[iL][iN].stamped = !cards[(2 * iCR) + iC].letters[iL][iN].stamped;
  }
  draw();
}, false);

reset();

function stamp(num) {
  cards.forEach((card, iC) => {
    card.letters.forEach((letter, iL) => {
      letter.forEach((number, iN) => {
        if (number.number == num) {
          number.stamped = true;
        }
      });
    });
  });
  draw();
}

function unstamp(num) {
  cards.forEach((card, iC) => {
    card.letters.forEach((letter, iL) => {
      letter.forEach((number, iN) => {
        if (number.number == num) {
          number.stamped = false;
        }
      });
    });
  });
  draw();
}



/** OLD IMPLEMENTATION **/
// Bind Event Handlers
//document.getElementById("btnCreate").addEventListener("click", createCard);
/**
function createCard() {
  let card = new BingoCard();
  card.letters.forEach((col, i) => {
    col.forEach((num, i) => {
      document.getElementById(num.element).innerHTML = num.number;
    });
  });
}
**/
// Initialize to random
//createCard();
