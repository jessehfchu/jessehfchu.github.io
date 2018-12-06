// Element References
const themeNameID = "txtThemeName";
const eName = document.getElementById(themeNameID);
const themeDescID = "txtThemeDescription";
const eDesc = document.getElementById(themeDescID);

// Declare Theme Array
var listThemes = [
  {
    name: "Random Rumble",
    desc: "Everyone chooses Random."
  },
  {
    name: "Pokemon League",
    desc: "Play with Pokeballs and Master Balls on."
  },
  {
    name: "Ladies Night",
    desc: "Play as Female characters only."
  },
  {
    name: "Pokemon Battle",
    desc: "Play as Pokemon characters only."
  },
  {
    name: "Who's The Baddest?",
    desc: "Play as Villain characters only."
  },
  {
    name: "Smash Meters",
    desc: "Play with Smash Meters on."
  },
  {
    name: "You're Breakin' Mah Balls",
    desc: "Play with Smash Balls on."
  },
  {
    name: "Let's Trade!",
    desc: "Play as your opponent's main character."
  },
  {
    name: "Sword Fight",
    desc: "Play as characters with swords only."
  },
  {
    name: "Echoes",
    desc: "Play as Echo characters only."
  },
  {
    name: "Hyrule Battle",
    desc: "Play as Zelda characters only."
  },
  {
    name: "The Original",
    desc: "Play as characters from Smash 64 only."
  },
  {
    name: "Mushroom Kingdom Battle",
    desc: "Play as Mario characters only."
  },
  {
    name: "Pick Mii!",
    desc: "Play as Mii Fighters only."
  },
  {
    name: "Skynet",
    desc: "Team Battle: Humans vs CPUs."
  },
  {
    name: "Squad Strike",
    desc: "Play Strike Strike."
  },
  {
    name: "Mirror Match",
    desc: "Everyone plays as the same character."
  },
  {
    name: "Stamina Battle",
    desc: "Play using Stamina mode."
  },
  {
    name: "Heavyweight Division",
    desc: "Play as Heavyweight characters only."
  },
  {
    name: "Item Frenzy",
    desc: "Play with all items on."
  },
  {
    name: "Team Amiibo",
    desc: "Team Battle: Humans vs amiibos."
  },
  {
    name: "Good & Evil",
    desc: "Team Battle: Heros vs Villains."
  },
  {
    name: "Fisticuffs",
    desc: "Play as unarmed characters only."
  },
  {
    name: "Cameos!",
    desc: "Play as third-party characters only."
  },
  {
    name: "Shaped Like A Friend",
    desc: "Play as small & round characters only."
  }
];

function rollTheme() {
  listThemes.shuffle();
  eName.style.color = "grey";
  eDesc.style.color = "grey";
  displayTheme(0);
}

function displayTheme(i) {
  if (i < listThemes.length) {
    eName.innerHTML = listThemes[i].name;
    eDesc.innerHTML = listThemes[i].desc;
    setTimeout(displayTheme, 100, i+1);
  }
  else {
    eName.style.color = "white";
    eDesc.style.color = "white";
  }
}
