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
currentState = {row:0, col:0};

/** Reward Position **/
// Bottom Right
rewardState = {row:4, col:4};

/** Action Encoding **/
// North = 0
// East = 1
// South = 2
// West = 3

/** Hyperparameters **/
alpha = 0.1; // Learning Rate
gamma = 0.6 // Discount Rate
epsilon = 0.1 // Exploration Rate

/** Get next state resulting from a state/action pair **/
function getNextState(state, action) {
  let crow = state.row;
  let ccol = state.col;
  switch(action) {
    case 0: // North
      if (crow == 0 || maze[crow - 1][ccol] == 1) { // North edge or invalid
        return state;
      }
      else {
        return {row: crow - 1, col: ccol};
      }
      break;
    case 1: // East
      if (ccol == 4 || maze[crow][ccol + 1] == 1) { // East edge or invalid
        return state;
      }
      else {
        return {row: crow, col: ccol + 1};
      }
      break;
    case 2: // South
      if (crow == 4 || maze[crow + 1][ccol] == 1) { // South edge or invalid
        return state;
      }
      else {
        return {row: crow + 1, col: ccol};
      }
      break;
    case 3: // West
      if (ccol == 0 || maze[crow][ccol - 1] == 1) { // West edge or invalid
        return state;
      }
      else {
        return {row: crow, col: ccol - 1};
      }
      break;
    default:
      return currentState;
      break;
  }
}

/** Select an action based on current state and hyperparameters **/
function getAction(state) {
    if (Math.random() < epsilon) { // Explore
    return Math.floor(Math.random() * 4); // Random action
  }
  else { // Exploit
    return getStateMaxAction(state); // Greedy action
  }
}

/** Return the highest-value action for a given state **/
function getStateMaxAction(state) {
  let crow = state.row;
  let ccol = state.col;
  return learned[crow][ccol].indexOf(Math.max(...learned[crow][ccol]));
}

/** Return the highest-value reward for a given state **/
function getStateMaxReward(state) {
  let crow = state.row;
  let ccol = state.col;
  return Math.max(...learned[crow][ccol]);
}

/** Get the reward associated with a state/action pair **/
function getReward(state, action) {
  let newState = getNextState(state, action);
  if (newState.row == state.row && newState.col == state.col) {
    return -10;
  }
  else if (newState.row == rewardState.row && newState.col == rewardState.col) {
    return 10;
  }
  else {
    return -1;
  }
}

/** Print out the maze to console **/
function drawMaze() {
  for (x=0; x<5; x++) {
    line = "";
    for (y=0; y<5; y++) {
      if (x == currentState.row && y == currentState.col) {
        line += " P";
      }
      else if (x == rewardState.row && y == rewardState.col) {
        line += " O";
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

/** Print out the policy to console **/
function drawPolicy() {
  for (x=0; x<5; x++) {
    line = "";
    for (y=0; y<5; y++) {
      if (x == rewardState.row && y == rewardState.col) {
        line += " O";
      }
      else if (maze[x][y] == 0) {
        let action = getStateMaxAction({row: x, col: y});
        switch (action) {
          case 0:
            line += " ^";
            break;
          case 1:
            line += " >";
            break;
          case 2:
            line += " v";
            break;
          case 3:
            line += " <";
            break;
          default:
            break;
        }
      }
      else {
        line += " X";
      }
    }
    console.log(line);
  }
}

/** Execute one action **/
function step() {
  // Select Action
  let action = getAction(currentState);
  // Determine Next State resulting from Action
  let nextState = getNextState(currentState, action);
  // Get Reward associated with Action
  let reward = getReward(currentState, action);
  // Get Value of Next State
  let nextReward = getStateMaxReward(nextState);
  // Get Current Value of Action
  let currentValue = learned[currentState.row][currentState.col][action];
  // Update Value of Action
  learned[currentState.row][currentState.col][action] = ((1 - alpha) * currentValue) + (alpha * (reward + (gamma * nextReward)));
  // Update State
  currentState = nextState;
  //currentState.row = nextState.row;
  //currentState.col = nextState.col;
}

/** Restart Maze **/
function restart() {
  currentState = {row:0, col:0};
}

function learn(runs = 1000) {
  // Execution Loop
  let steps = 0;
  let wins = 0;
  for (let i = 0; i < runs; i++) {
    while (!((currentState.row == rewardState.row) && (currentState.col == rewardState.col))) {
      step();
      steps++;
    }
    restart();
    wins++;
  }
  console.log(steps + " Learning Steps");
  console.log(wins + " Cycles");
}
