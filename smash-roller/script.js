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
    desc: "Play only as Female characters."
  },
  {
    name: "Pokemon Battle",
    desc: "Play only as Pokemon characters."
  },
  {
    name: "Hyrule Battle",
    desc: "Play only as Zelda characters."
  },
  {
    name: "Mushroom Kingdom Battle",
    desc: "Play only as Mario characters."
  },
  {
    name: "Pick Mii!",
    desc: "Play only as Mii Fighters."
  },
  {
    name: "Echoes",
    desc: "Play only as Echo characters."
  },
  {
    name: "The Original",
    desc: "Play only as characters from Smash 64."
  },
  {
    name: "Who's The Baddest?",
    desc: "Play only as Villain characters."
  },
  {
    name: "Sword Fight",
    desc: "Play only as characters with swords."
  },
  {
    name: "Heavyweight Division",
    desc: "Play only as Heavyweight characters."
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
    desc: "Play only as unarmed characters."
  },
  {
    name: "Cameos!",
    desc: "Play only as third-party characters."
  },
  {
    name: "Shaped Like A Friend",
    desc: "Play only as small & round characters."
  },
  {
    name: "Is It Movember?",
    desc: "Play only as characters with facial hair."
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
    desc: "Play Strike Strike mode."
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
    name: "Team amiibo",
    desc: "Team Battle: Humans vs amiibos."
  },
  {
    name: "Good vs Evil",
    desc: "Team Battle: Heros vs Villains."
  },
  // Conditions
  {
    name: "The Floor Is Lava",
    desc: "Players must stay on platforms. (SD Penalty)"
  },
  {
    name: "Ready, Aim, Fire!",
    desc: "Players may only use projectile attacks. (SD Penalty)"
  },
  {
    name: "Aerial Ace",
    desc: "Players may only use aerial attacks. (SD Penalty)"
  },
  {
    name: "Concrete Shoes",
    desc: "Players may not jump. (SD Penalty)"
  },
  {
    name: "Sleep On The Haters",
    desc: "Everyone plays as Jigglypuff. Only KO with Rest. (SD Penalty)"
  }
];

function rollTheme() {
  listThemes.shuffle();
  eName.style.color = "grey";
  eDesc.style.color = "grey";
  displayTheme();
}

function displayTheme(i = 0) {
  // Determine Speed
  var proportion = i / listThemes.length;
  var delay = 250;
  if (proportion < 0.75) {
    delay = 1500 / listThemes.length;
  }
  else if (proportion < 0.9) {
    delay = 4500 / listThemes.length;
  }
  else if (proportion < 1) {
    delay = 9000 / listThemes.length;
  }
  // Update Display
  if (i < listThemes.length) {
    eName.innerHTML = listThemes[i].name;
    eDesc.innerHTML = listThemes[i].desc;
  }
  else {
    // Flash Selection
    eName.style.color = eName.style.color == "white" ? "grey" : "white";
    eDesc.style.color = eDesc.style.color == "white" ? "grey" : "white";
  }
  if (i < listThemes.length + 6) {
    setTimeout(displayTheme, delay, i+1);
  }
}
