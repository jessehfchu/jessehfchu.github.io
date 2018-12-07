// Element References
const themeNameID = "txtThemeName";
const eName = document.getElementById(themeNameID);
const themeDescID = "txtThemeDescription";
const eDesc = document.getElementById(themeDescID);
const themeListID = "txtThemeList";
const eList = document.getElementById(themeListID);

// Declare Theme Array
var listThemes = [
  // Character Selection
  {
    name: "A Box Of Chocolates",
    desc: "Everyone chooses Random.",
    list: ""
  },
  {
    name: "Ladies Night",
    desc: "Play only as Female characters.",
    list: ""
  },
  {
    name: "Pokemon Battle",
    desc: "Play only as Pokemon characters.",
    list: ""
  },
  {
    name: "Hyrule Battle",
    desc: "Play only as Zelda characters.",
    list: ""
  },
  {
    name: "Mushroom Kingdom Battle",
    desc: "Play only as Mario characters.",
    list: ""
  },
  {
    name: "Fire Emblem Battle",
    desc: "Play only as Fire Emblem characters.",
    list: ""
  },
  {
    name: "Pick Mii!",
    desc: "Play only as Mii Fighters.",
    list: ""
  },
  {
    name: "Echoing Halls",
    desc: "Play only as Echo characters.",
    list: ""
  },
  {
    name: "The Original!",
    desc: "Play only as characters from Smash 64.",
    list: ""
  },
  {
    name: "Who's The Baddest?",
    desc: "Play only as Villain characters.",
    list: ""
  },
  {
    name: "Edgelords",
    desc: "Play only as characters with swords.",
    list: ""
  },
  {
    name: "Heavyweight Division",
    desc: "Play only as Heavyweight characters.",
    list: "Donkey Kong<br>\
           King K.Rool<br>\
           Bowser<br>\
           King Dedede<br>\
           Ganondorf<br>\
           Charizard<br>\
           Incineroar"
  },
  {
    name: "Let's Trade!",
    desc: "Play as your opponent's main character.",
    list: ""
  },
  {
    name: "House Of Mirrors",
    desc: "Everyone plays as the same character.",
    list: ""
  },
  {
    name: "Put Up Your Dukes!",
    desc: "Play only as unarmed characters.",
    list: ""
  },
  {
    name: "Royal Rumble",
    desc: "Play only as princess characters.",
    list: ""
  },
  {
    name: "We're People Too",
    desc: "Play only as non-human characters.",
    list: ""
  },
  {
    name: "Cameos!",
    desc: "Play only as third-party characters.",
    list: ""
  },
  {
    name: "Shaped Like A Friend",
    desc: "Play only as small & round characters.",
    list: ""
  },
  {
    name: "Is It Movember?",
    desc: "Play only as characters with facial hair.",
    list: ""
  },
  {
    name: "Hat Party",
    desc: "Play only as characters with a hat.",
    list: ""
  },
  {
    name: "Pepto-Bismol",
    desc: "Play only as characters with a pink skin.",
    list: ""
  },
  {
    name: "Crowded Freezer",
    desc: "Everyone plays as Ice Climbers.",
    list: ""
  },
  {
    name: "You're Welcome!",
    desc: "Each player selects another's character.",
    list: ""
  },
  {
    name: "INSERT TITLE HERE",
    desc: "Play only as characters with a title.",
    list: "Captain Falcon<br>\
           Dr. Mario<br>\
           Mr. Game & Watch<br>\
           King Dedede<br>\
           Bowser Jr.<br>\
           King K.Rool"
  },
  // Items
  {
    name: "Pokemon League",
    desc: "Play with Pokeballs and Master Balls on.",
    list: ""
  },
  {
    name: "You're Breakin' Mah Balls",
    desc: "Play with Smash Balls on.",
    list: ""
  },
  {
    name: "Item Frenzy",
    desc: "Play with all items on.",
    list: ""
  },
  {
    name: "Just Because You Try Hard...",
    desc: "Play with Assist Trophies on.",
    list: ""
  },
  // Rules
  {
    name: "Smash Meters",
    desc: "Play with Smash Meters on.",
    list: ""
  },
  {
    name: "Squad Strike",
    desc: "Play Squad Strike mode.",
    list: ""
  },
  {
    name: "Stamina Battle",
    desc: "Play using Stamina mode.",
    list: ""
  },
  {
    name: "Skynet",
    desc: "Team Battle:<br>\
           Humans vs CPUs.",
    list: ""
  },
  {
    name: "Team amiibo",
    desc: "Team Battle:<br>\
           Humans vs amiibos.",
    list: ""
  },
  {
    name: "Good vs Evil",
    desc: "Team Battle: Heros vs Villains.",
    list: "Mario       vs Bowser<br>\
           Donkey Kong vs King K.Rool<br>\
           Link        vs Ganondorf<br>\
           Samus       vs Ridley<br>\
           Kirby       vs King Dedede<br>\
           Fox         vs Wolf<br>\
           Pit         vs Dark Pit"
  },
  {
    name: "You Copycat!",
    desc: "Team Battle: Originals vs Echoes.",
    list: "Samus vs Dark Samus<br>\
           Peach vs Daisy<br>\
           Marth vs Lucina<br>\
           Roy   vs Chrom<br>\
           Pit   vs Dark Pit<br>\
           Ryu   vs Ken<br>\
           Simon vs Richter"
  },
  // Conditions
  {
    name: "The Floor Is Lava",
    desc: "Players must stay on platforms.<br>\
           (SD Penalty)",
    list: ""
  },
  {
    name: "Ready, Aim, Fire!",
    desc: "Players may only use projectile attacks.<br>\
           (SD Penalty)",
    list: ""
  },
  {
    name: "Aerial Ace",
    desc: "Players may only use aerial attacks.<br>\
           (SD Penalty)",
    list: ""
  },
  {
    name: "Concrete Shoes",
    desc: "Players may not jump, except to recover.<br>\
           (SD Penalty)",
    list: ""
  },
  {
    name: "Sleep On The Haters",
    desc: "Everyone plays as Jigglypuff.<br>\
           Players may only KO using Rest.<br>\
           (SD Penalty)",
    list: ""
  },
  {
    name: "NINE!",
    desc: "Everyone plays as Mr. Game & Watch.<br>\
           Players may only use Judge to attack.<br>\
           (SD Penalty)",
    list: ""
  },
  {
    name: "Purple Power",
    desc: "Everyone plays as Olimar.<br>\
           Players may only use Purple Pikmin to attack.<br>\
           (SD Penalty)",
    list: ""
  },
  {
    name: "Throwdown",
    desc: "Players may only KO using Throws.<br>\
           (SD Penalty)",
    list: ""
  },
  {
    name: "Bully",
    desc: "Free-For-All Time Battle:<br>\
           Players compete to KO a Level 1 Olimar CPU.",
    list: ""
  },
  {
    name: "Protecc Doggo",
    desc: "Team Time Battle:<br>\
           Teams compete to KO each other's Level 1 Isabelle CPU.",
    list: ""
  },
  {
    name: "Call Shot",
    desc: "Players must call out their target for each attack.<br>\
           (SD Penalty)",
    list: ""
  },
  {
    name: "Don't Touch The Red Button",
    desc: "Players may not use special attacks, even to recover.<br>\
           (SD Penalty)",
    list: ""
  },
  {
    name: "Never Ask Me For Anything Again",
    desc: "Play Squad Strike mode. Opponents select each other's squads.",
    list: ""
  }
];

function rollTheme() {
  listThemes.shuffle();
  displayTheme();
}

function displayTheme(i = 0) {
  // Determine Speed
  var proportion = i / listThemes.length;
  var delay = 250;
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
  }
}
