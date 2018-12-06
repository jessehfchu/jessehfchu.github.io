// Element References
const themeNameID = "txtThemeName";
const eName = document.getElementById(themeNameID);
const themeDescID = "txtThemeDescription";
const eDesc = document.getElementById(themeDescID);

// Declare Theme Array
var listThemes = [
  // Character Selection
  {
    name: "Random Rumble",
    desc: "Everyone chooses Random."
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
    name: "Hyrule Battle",
    desc: "Play as Zelda characters only."
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
    name: "Echoes",
    desc: "Play as Echo characters only."
  },
  {
    name: "The Original",
    desc: "Play as characters from Smash 64 only."
  },
  {
    name: "Who's The Baddest?",
    desc: "Play as Villain characters only."
  },
  {
    name: "Sword Fight",
    desc: "Play as characters with swords only."
  },
  {
    name: "Heavyweight Division",
    desc: "Play as Heavyweight characters only."
  },
  {
    name: "Let's Trade!",
    desc: "Play as your opponent's main character."
  },
  {
    name: "Mirror Match",
    desc: "Everyone plays as the same character."
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
  },
  // Items
  {
    name: "Pokemon League",
    desc: "Play with Pokeballs and Master Balls on."
  },
  {
    name: "You're Breakin' Mah Balls",
    desc: "Play with Smash Balls on."
  },
  {
    name: "Item Frenzy",
    desc: "Play with all items on."
  },
  // Rules
  {
    name: "Smash Meters",
    desc: "Play with Smash Meters on."
  },
  {
    name: "Squad Strike",
    desc: "Play Strike Strike."
  },
  {
    name: "Stamina Battle",
    desc: "Play using Stamina mode."
  },
  {
    name: "Skynet",
    desc: "Team Battle: Humans vs CPUs."
  },
  {
    name: "Team Amiibo",
    desc: "Team Battle: Humans vs amiibos."
  },
  {
    name: "Good & Evil",
    desc: "Team Battle: Heros vs Villains."
  },
  // Conditions
  {
    name: "The Floor Is Lava",
    desc: "Only aerial attacks are permitted."
  },
  {
    name: "Ready, Aim, Fire!",
    desc: "Only projectile attacks are permitted."
  }
];

function rollTheme() {
  listThemes.shuffle();
  eName.style.color = "grey";
  eDesc.style.color = "grey";
  displayTheme(0);
}

function displayTheme(i) {
  var delay = 1500/listThemes.length;
  if (i < listThemes.length) {
    eName.innerHTML = listThemes[i].name;
    eDesc.innerHTML = listThemes[i].desc;
  }
  else {
    delay = 250;
    eName.style.color = eName.style.color == "white" ? "grey" : "white";
    eDesc.style.color = eDesc.style.color == "white" ? "grey" : "white";
  }
  if (i < listThemes.length + 4) {
    setTimeout(displayTheme, delay, i+1);
  }
}
