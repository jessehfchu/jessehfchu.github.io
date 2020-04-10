imgs = ["../img/CJWFace.png"];
cILoaded = 0;

function iLoad() {
  cILoaded++;
  if (cILoaded == imgs.length) {
    reset();
  }
}

/** Reference to canvas element **/
cCards = document.getElementById("canvasCards");
conCards = cCards.getContext("2d");
cHeader = document.getElementById("canvasHeader");
conHeader = cHeader.getContext("2d");

/** Column Numbers **/
numbers = [
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
  [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
  [31,32,33,34,35,36,37,38,39,40,41,42,43,44,45],
  [46,47,48,49,50,51,52,53,54,55,56,57,58,59,60],
  [61,62,63,64,65,66,67,68,69,70,71,72,73,74,75]
];

// Bingo Cards Array
cards = [];

// Stamp image
iFace = new Image();
iFace.src = imgs[0];
iFace.onload = iLoad;

// Stamp color
stampColors = ["red", "orange", "gold", "green", "blue", "purple", "face"];
cStamp = "red";

// Bingo Card Class
class BingoCard {
  // Randomize on instantiation
  constructor() {
    this.reroll();
  }

  // Randomize Bingo Card
  reroll() {
    this.letters = [];
    numbers.forEach((l, i) => {
      l.shuffle();
      let numbers = [];
      for (let i = 0; i < 5; i++) {
        numbers.push({"number" : l[i], "stamped" : false});
      }
      this.letters.push(numbers);
    });
    this.letters[2][2].number = "FREE";
  }
}

// Reroll all cards
function reset() {
  cards = [];
  for (let i = 0; i < 8; i++) {
    cards.push(new BingoCard());
  }
  draw();
}

// Draw the screen
function draw() {
  // Set canvas sizes
  cHeader.width = window.innerWidth;
  cHeader.height = window.innerHeight * 0.035;
  cCards.width = window.innerWidth;
  cCards.height = window.innerHeight - cHeader.height;

  // Draw Header
  drawHeader();

  // Draw cards
  cards.forEach((card, i) => {
    drawCard(card, i);
  });
}

function drawHeader() {
  let w = cHeader.width;
  let h = cHeader.height;
  // Header background
  conHeader.fillStyle = "black";
  conHeader.fillRect(0, 0, cHeader.width, h);

  // Title
  conHeader.font = "bold 16pt monospace";
  conHeader.textAlign = "left";
  conHeader.textBaseline = "middle";
  conHeader.fillStyle = "white";
  conHeader.fillText("Bingo", h / 4, h / 2);

  // Stamp colors
  for (let i = 0; i < stampColors.length; i++) {
    if (stampColors[i] == "face") {
      conHeader.globalAlpha = stampColors[i] == cStamp ? 1 : 0.6;
      conHeader.drawImage(iFace, w - (stampColors.length * h) + (i * h), 0, iFace.width * h / iFace.height, h);
      conHeader.globalAlpha = 1;
    }
    else {
      conHeader.fillStyle = stampColors[i];
      conHeader.globalAlpha = stampColors[i] == cStamp ? 1 : 0.4;
      conHeader.fillRect(w - (stampColors.length * h) + (i * h), 0, h, h);
      conHeader.globalAlpha = 1;
      conHeader.strokeStyle = "black";
      conHeader.lineWidth = 3;
      conHeader.beginPath();
      conHeader.rect(w - (stampColors.length * h) + (i * h), 0, h, h);
      conHeader.stroke();
    }
  }

  // Refresh Button
  conHeader.fillStyle = "grey";
  conHeader.fillRect((w / 2) - 60, 0, 120, h);
  conHeader.strokeStyle = "darkgrey";
  conHeader.lineWidth = 3;
  conHeader.beginPath();
  conHeader.rect((w / 2) - 60, 0, 120, h);
  conHeader.stroke();

  // Refresh Text
  conHeader.font = "bold 10pt monospace";
  conHeader.textAlign = "center";
  conHeader.textBaseline = "middle";
  conHeader.fillStyle = "white";
  conHeader.fillText("Double-Click", w / 2, h / 4);
  conHeader.fillText("For New Cards", w / 2, h * 3 / 4);
}

// Determine how many rows of cards to display
function rows() {
  return cCards.width > cCards.height ? 2 : 4;
}

// Determine how many columns of cards to display
function columns() {
  return cCards.width > cCards.height ? 4 : 2;
}

function drawCard(card, index) {
  // Determine row and column position
  let r = Math.floor(index / columns());
  let c = index % columns();

  // Determine starting coordinates
  let x = cCards.width * c / columns();
  let y = cCards.height * r / rows();

  // Determine full card dimensions
  let w = cCards.width / columns();
  let h = cCards.height / rows();

  // Card Background
  conCards.globalAlpha = 1;
  conCards.fillStyle = card.letters[2][2].stamped ? (r + c) % 2 == 1 ? "powderblue" : "white" : "grey";
  conCards.fillRect(x, y, w, h);

  // Border
  conCards.strokeStyle = "black";
  conCards.lineWidth = 5;
  conCards.beginPath();
  conCards.moveTo(x, y);
  conCards.lineTo(x + w, y);
  conCards.lineTo(x + w, y + h);
  conCards.lineTo(x, y + h);
  conCards.lineTo(x, y);
  conCards.stroke();

  // Header Grid Line
  conCards.strokeStyle = "black";
  conCards.lineWidth = 3;
  conCards.beginPath();
  conCards.moveTo(x, y + (h / 10));
  conCards.moveTo(x + w, y + (h/ 10));
  conCards.stroke();

  // Number Lines
  conCards.strokeStyle = "black";
  conCards.lineWidth = 1;
  // Vertical Lines
  for (let i = 0; i <= w; i += w / 5) {
    conCards.beginPath();
    conCards.moveTo(x + i, y);
    conCards.lineTo(x + i, y + h);
    conCards.stroke();
  }
  // Horizontal Lines
  for (let i = h / 10; i <= h; i += h * 9 / 50) {
    conCards.beginPath();
    conCards.moveTo(x, y + i);
    conCards.lineTo(x + w, y + i);
    conCards.stroke();
  }

  // Text settings
  let colors = ["mediumblue", "firebrick", "black", "darkgreen", "gold"];
  let charHeader = ["B", "I", "N", "G", "O"];

  // Header Letters
  conCards.font = getHeaderFont();
  conCards.textAlign = "center";
  conCards.textBaseline = "middle";
  conCards.strokeStyle = "black";
  conCards.lineWidth = 1;
  for (let i = 0; i < 5; i++) {
    conCards.fillStyle = card.letters[2][2].stamped ? colors[i] : "black";
    conCards.fillText(charHeader[i], x + (w / 10) + (i * w / 5), y + (h / 18));
    conCards.strokeText(charHeader[i], x + (w / 10) + (i * w / 5), y + (h / 18));
  }

  // Numbers
  conCards.textAlign = "center";
  conCards.textBaseline = "middle";
  conCards.strokeStyle = "black";
  conCards.lineWidth = 1;
  card.letters.forEach((letter, iL) => {
    letter.forEach((number, iN) => {
      conCards.font = number.number == "FREE" ? getFreeFont() : getNumberFont();
      conCards.fillStyle = card.letters[2][2].stamped ? colors[iL] : "black";
      conCards.fillText(number.number, x + (w / 10) + (iL * w / 5), y + (h * 19 / 100) + (iN * h * 9 / 50));
      conCards.strokeText(number.number, x + (w / 10) + (iL * w / 5), y + (h * 19 / 100) + (iN * h * 9 / 50));
    });
  });

  // Stamps
  let rad = Math.min(w * 9 / 100, h * 81 / 1000);
  let d = 2 * rad;
  card.letters.forEach((letter, iL) => {
    letter.forEach((number, iN) => {
      if (number.stamped) {
        if (cStamp == "face") {
          conCards.globalAlpha = 0.6;
          conCards.drawImage(
            iFace,
            x + (w / 10) + (iL * w / 5) - ((iFace.width * d / iFace.height) / 2),
            y + (h * 19 / 100) + (iN * h * 9 / 50) - (d / 2),
            iFace.width * d / iFace.height,
            d
          );
        }
        else {
          conCards.fillStyle = cStamp;
          conCards.globalAlpha = 0.5;
          conCards.beginPath();
          conCards.arc(
            x + (w / 10) + (iL * w / 5),
            y + (h * 19 / 100) + (iN * h * 9 / 50),
            rad,
            0,
            2 * Math.PI
          );
          conCards.fill();
        }
      }
    });
  });
  conCards.globalAlpha = 1;
}

function getHeaderFont() {
  let scale = "";
  if (cCards.width > cCards.height) {
    scale = Math.floor(Math.min(32, cCards.width / 50));
  }
  else {
    scale = Math.floor(Math.min(32, cCards.width / 35));
  }
  return "bold " + scale + "pt monospace";
}

function getNumberFont() {
  let scale = "";
  if (cCards.width > cCards.height) {
    scale = Math.floor(Math.min(24, cCards.width / 65));
  }
  else {
    scale = Math.floor(Math.min(64, cCards.width / 30));
  }
  return "bold " + scale + "pt monospace";
}

function getFreeFont() {
  let scale = "";
  if (cCards.width > cCards.height) {
    scale = Math.floor(Math.min(18, cCards.width / 100));
  }
  else {
    scale = Math.floor(Math.min(36, cCards.width / 35));
  }
  return "bold " + scale + "pt monospace";
}

// Bind Event Handlers
window.addEventListener("resize", draw);

// Stamp toggle on click
cCards.addEventListener("click", function(event) {
  // Get Mouse Coordinates
  let rect = cCards.getBoundingClientRect();
  let mouseX = event.clientX - rect.left;
  let mouseY = event.clientY - rect.top;

  // Determine full card dimensions
  let w = cCards.width / columns();
  let h = cCards.height / rows();

  // Determine card index
  let iCR = Math.floor(mouseY / h);
  let iC = Math.floor(mouseX / w);
  let iL = Math.floor((mouseX % w) / (w / 5));
  let iN = Math.floor(((mouseY % h) - (h / 10)) / (h * 9 / 50));
  // Toggle stamp
  if (iN >= 0) {
    cards[(columns() * iCR) + iC].letters[iL][iN].stamped ^= true;
  }
  draw();
}, false);

// Change stamp color
cHeader.addEventListener("click", function(event) {
  // Get Mouse Coordinates
  let rect = cHeader.getBoundingClientRect();
  let mouseX = event.clientX - rect.left;
  let mouseY = event.clientY - rect.top;

  // Determine color index
  let w = cHeader.width;
  let h = cHeader.height;
  let iColor = Math.floor((mouseX - (w - (stampColors.length * h))) / h);

  // Change stamp
  if ((iColor >= 0) && (iColor < stampColors.length)) {
    cStamp = stampColors[iColor];
  }
  draw();
}, false);

// Refresh cards
cHeader.addEventListener("dblclick", function(event) {
  // Get Mouse Coordinates
  let rect = cHeader.getBoundingClientRect();
  let mouseX = event.clientX - rect.left;
  let mouseY = event.clientY - rect.top;

  // Determine if double click occurred on button
  let w = cHeader.width;

  // Create new cards
  if ((mouseX > ((w / 2) - 60)) && (mouseX < ((w / 2) + 60))) {
    reset();
  }
  draw();
}, false);

// Stamp all instances of a given number
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

// Unstamp all instances of a given number
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
