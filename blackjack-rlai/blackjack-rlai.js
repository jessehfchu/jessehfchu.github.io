// Element References
const themeNameID = "txtThemeName";
const eName = document.getElementById(themeNameID);
const themeDescID = "txtThemeDescription";
const eDesc = document.getElementById(themeDescID);
const themeListID = "txtThemeList";
const eList = document.getElementById(themeListID);
const btnID = "btnRoll";
const eBtn = document.getElementById(btnID);

a = ["K", "S", "T"];
b = ["T", "P", "O", "G", "R"];
c = ["H", "E", "I"];
d = ["A", "C", "E"];
e = ["N", "A", "C"];
f = ["O", "H"];
g = ["E", "R", "L"];
h = ["E", "R", "I", "M", "S"];

list = [];

a.forEach((la, ia) =>
b.forEach((lb, ib) =>
c.forEach((lc, ic) =>
d.forEach((ld, id) =>
e.forEach((le, ie) =>
f.forEach((lf, iff) =>
g.forEach((lg, ig) =>
h.forEach((lh, ih) => list.push(la+lb+lc+ld+le+lf+lg+lh)))))))));

eDesc.innerHTML = list.join("<br>");
