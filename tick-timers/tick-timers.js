/* Element References */
const bar1 = "bar1";
const eBar1 = document.getElementById(bar1);
const bar2 = "bar2";
const eBar2 = document.getElementById(bar2);
const bar3 = "bar3";
const eBar3 = document.getElementById(bar3);

/* Event Handlers */
//eBtn.addEventListener("click", rollTheme);

/* Script Variables */
let currentTick = 0;
let tickRate = 20;
let tickCap = 200;
//let tickRate = 20;
//let tickCap = 86400 * tickRate;

// Start tick timer
let tickTimer = setInterval(tick, Math.floor(1000/tickRate));

function tick() {
  //console.log("Tick: " + currentTick);
  currentTick = (currentTick + 1) % tickCap;
}

function updateBar(name, width) {
  console.log("UPDATE NAME: " + name);
  console.log("UPDATE WIDTH: " + width);
  console.log("UPDATE ELEMENT: " + document.getElementById(name));
  document.getElementById(name).style.width = width;
}

class Bar {
  startTick;
  threshold;

  constructor (element, fillTime) {
    this.element = element;
    this.fillTime = fillTime;
  }

  start() {
    this.startTick = currentTick;
    this.threshold = this.fillTime * tickRate;
    this.timer = setInterval(this.update.bind(this), Math.floor(1000/tickRate));
  }

  update() {
    let progress = (currentTick - this.startTick + tickCap) % tickCap;
    if (progress >= this.threshold) {
      this.startTick = currentTick;
    }
    console.log("CLASS ELEMENT: " + this.element);
    console.log("CLASS FILLTIME: " + this.fillTime);
    console.log("CLASS THRESHOLD: " + this.threshold);
    console.log("CLASS START TICK: " + this.startTick);
    console.log("CURRENT TICK: " + currentTick);
    console.log("CLASS PROGRESS: " + progress);
    this.element.style.width = "" + Math.floor(100 * progress / this.threshold) + "%";
  }

  stop() {
    clearInterval(this.timer);
  }
}

let b1 = new Bar(eBar1, 1);
let b2 = new Bar(eBar2, 2);
let b3 = new Bar(eBar3, 3);

b1.start();
b2.start();
b3.start();

/*
function displayTheme(i = 0) {
  // Determine Speed
  let proportion = i / listThemes.length;
  let delay = 250;
  if (proportion < 0.7) {
    delay = 1000 / listThemes.length;
  }
  else if (proportion < 0.8) {
    delay = 2000 / listThemes.length;
  }
  else if (proportion < 0.9) {
    delay = 4000 / listThemes.length;
  }
  else if (proportion < 1) {
    delay = 8000 / listThemes.length;
  }
  // Update Display
  if (i < listThemes.length) {
    eName.style.color = "grey";
    eDesc.style.color = "grey";
    eList.style.color = "grey";
    eName.innerHTML = listThemes[i].name;
    eDesc.innerHTML = listThemes[i].desc;
    eList.innerHTML = listThemes[i].list;
  }
  else {
    // Flash Selection
    eName.style.color = eName.style.color == "white" ? "grey" : "white";
    eDesc.style.color = eDesc.style.color == "white" ? "grey" : "white";
    eList.style.color = eList.style.color == "white" ? "grey" : "white";
  }
  // Call again
  if (i < listThemes.length + 6) {
    setTimeout(displayTheme, delay, i+1);
  }
  else {
    // Ensure white
    eName.style.color = "white";
    eDesc.style.color = "white";
    eList.style.color = "white";
    eBtn.disabled = false;
  }
}
*/
