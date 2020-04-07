// Column Numbers
bNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
iNumbers = [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
nNumbers = [31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];
gNumbers = [46,47,48,49,50,51,52,53,54,55,56,57,58,59,60];
oNumbers = [61,62,63,64,65,66,67,68,69,70,71,72,73,74,75];

// Bind Event Handlers
document.getElementById("btnCreate").addEventListener("click", createCard);

function createCard() {
  bNumbers.shuffle();
  document.getElementById("b0").innerHTML = bNumbers[0];
  document.getElementById("b1").innerHTML = bNumbers[1];
  document.getElementById("b2").innerHTML = bNumbers[2];
  document.getElementById("b3").innerHTML = bNumbers[3];
  document.getElementById("b4").innerHTML = bNumbers[4];
  iNumbers.shuffle();
  document.getElementById("i0").innerHTML = iNumbers[0];
  document.getElementById("i1").innerHTML = iNumbers[1];
  document.getElementById("i2").innerHTML = iNumbers[2];
  document.getElementById("i3").innerHTML = iNumbers[3];
  document.getElementById("i4").innerHTML = iNumbers[4];
  nNumbers.shuffle();
  document.getElementById("n0").innerHTML = nNumbers[0];
  document.getElementById("n1").innerHTML = nNumbers[1];
  //document.getElementById("n2").innerHTML = nNumbers[2];
  document.getElementById("n3").innerHTML = nNumbers[3];
  document.getElementById("n4").innerHTML = nNumbers[4];
  gNumbers.shuffle();
  document.getElementById("g0").innerHTML = gNumbers[0];
  document.getElementById("g1").innerHTML = gNumbers[1];
  document.getElementById("g2").innerHTML = gNumbers[2];
  document.getElementById("g3").innerHTML = gNumbers[3];
  document.getElementById("g4").innerHTML = gNumbers[4];
  oNumbers.shuffle();
  document.getElementById("o0").innerHTML = oNumbers[0];
  document.getElementById("o1").innerHTML = oNumbers[1];
  document.getElementById("o2").innerHTML = oNumbers[2];
  document.getElementById("o3").innerHTML = oNumbers[3];
  document.getElementById("o4").innerHTML = oNumbers[4];
}

// Initialize to random
createCard();
