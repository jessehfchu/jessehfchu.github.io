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
  currentTick = (currentTick + 1) % tickCap;
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
