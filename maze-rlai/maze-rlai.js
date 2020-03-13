/** Maze Structure **/
// Z-Shape
maze = [[0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0]];

/** Value Matrix **/
// Initialize to zero
learned = [[[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
           [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
           [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
           [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
           [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]];

/** Player Starting Position **/
// Top Left
current_state = {row:0, col:0};

/** Reward Position **/
// Bottom Right
reward_state = {row:4, col:4};

/** Action Encoding **/
// North = 0
// East = 1
// South = 2
// West = 3

/** Hyperparameters **/
alpha = 0.1; // Learning Rate
gamma = 0.6 // Discount Rate
epsilon = 0.1 // Exploration Rate

// Return next state based on current state and action
function get_next_state(state, action) {
  let crow = state.row;
  let ccol = state.col;
  switch(action) {
    case 0:
      if (crow == 0 || maze[crow - 1][ccol] == 1) {
        return state;
      }
      else {
        return {row: crow - 1, col: ccol};
      }
      break;
    case 1:
      if (crow == 4 || maze[crow + 1][ccol] == 1) {
        return state;
      }
      else {
        return {row: crow + 1, col: ccol};
      }
      break;
    case 2:
      if (crow == 4 || maze[crow + 1][ccol] == 1) {
        return state;
      }
      else {
        return {row: crow + 1, col: ccol};
      }
      break;
    case 3:
      break;
    default:
      return current_state;
      break;
  }
}

// Get Action
// Get State Max Action
// Get State Max Reward
// Get Next State
// Get Reward

function get_reward(dir) {
  switch (dir) {
    case 0:
      if (current_state.x == 0 || maze[playerx - 1][playery] == 1) {
        hitWall(dir);
      }
      else {
        playerx -= 1;
      }
      break;
    case 1:
      if (playery == 4 || maze[playerx][playery + 1] == 1) {
        hitWall(dir);
      }
      else {
        playery += 1;
      }
      break;
    case 2:
      if (playerx == 4 || maze[playerx + 1][playery] == 1) {
        hitWall(dir);
      }
      else {
        playerx += 1;
      }
      break;
    case 3:
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
