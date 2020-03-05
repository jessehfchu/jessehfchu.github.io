maze = [[0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0]];
playerx = playery = 0;
exitx = exity = 4;

learned = [[{}, {}, {}, {}, {}],
           [{}, {}, {}, {}, {}],
           [{}, {}, {}, {}, {}],
           [{}, {}, {}, {}, {}],
           [{}, {}, {}, {}, {}]];

for (row of learned) {
  for (entry of row) {
    entry["N"] = 0;
    entry["E"] = 0;
    entry["S"] = 0;
    entry["W"] = 0;
  }
}

function move(dir) {
  switch (dir) {
    case "N":
      if (playerx == 0 || maze[playerx - 1][playery] == 1) {
        hitWall(dir);
      }
      else {
        playerx -= 1;
      }
      break;
    case "E":
      if (playery == 4 || maze[playerx][playery + 1] == 1) {
        hitWall(dir);
      }
      else {
        playery += 1;
      }
      break;
    case "S":
      if (playerx == 4 || maze[playerx + 1][playery] == 1) {
        hitWall(dir);
      }
      else {
        playerx += 1;
      }
      break;
    case "W":
      if (playery == 0 || maze[playerx][playery - 1] == 1) {
        hitWall(dir);
      }
      else {
        playery -= 1;
      }
      break;
    default:
      break;
  }
  console.clear();
  drawMaze();
}

function hitWall(dir) {
  learned[playerx][playery][dir] = -10
}

function drawMaze() {
  for (x=0; x<5; x++) {
    line = "";
    for (y=0; y<5; y++) {
      if (x == playerx && y == playery) {
        line += " P";
      }
      else {
        if (maze[x][y] == 0) {
          line += " .";
        }
        else {
          line += " X";
        }
      }
    }
    console.log(line);
  }
}
