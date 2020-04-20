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
c = ["H", "S", "E", "I"];
d = ["O", "A", "D", "C", "N", "E"];
e = ["P", "N", "O", "A", "C", "T"];
f = ["O", "H", "N", "E"];
g = ["E", "R", "L", "N", "C", "O"];
h = ["E", "R", "O", "I", "M", "L", "H", "T", "P", "S", "A"];

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
