/** Reference to canvas element **/
canvas = document.getElementById("canvasMaze");
context = canvas.getContext("2d");

/** Maze Structure **/
mazeRows = 5;
mazeColumns = 5;
maze = createMaze(mazeRows, mazeColumns);

/** Value Matrix **/
policy = initializePolicy(maze);

/** Player Starting Position **/
// Top Left
startRow = 0;
startColumn = 0;
currentState = createState(startRow, startColumn);

/** Goal Position **/
// Bottom Right
goalRow = maze.length - 1;
goalColumn = maze[0].length - 1;
goalState = createState(goalRow, goalColumn);

/** Action Encoding **/
// North = 0
// East = 1
// South = 2
// West = 3

/** Hyperparameters **/
alpha = 0.1; // Learning Rate
gamma = 0.6 // Discount Rate
epsilon = 0.1 // Exploration Rate

/** Create a horizontal zig-zag maze **/
function createMaze(rows, columns) {
  let newMaze = [];
  for (let r = 0; r < rows; r++) {
    let newRow = [];
    // Alternating paths and walls
    for (let c = 0; c < columns; c++) {
      if ((r % 2) == 0) {
        newRow.push(0);
      }
      else {
        newRow.push(1);
      }
    }
    // Remove alternating ends of walls
    if ((r % 4) == 1) {
      newRow[columns - 1] = 0;
    }
    else if ((r % 4) == 3) {
      newRow[0] = 0;
    }
    newMaze.push(newRow);
  }
  // Make sure goal is accessible
  newMaze[rows - 1][columns - 1] = 0;
  return newMaze;
}

/** Create initial zeroed Value Matrix **/
function initializePolicy(maze) {
  let rows = maze.length;
  let columns = maze[0].length;
  let newPolicy = [];
  for (let r = 0; r < rows; r++) {
    let newRow = [];
    // 0 Value for each action
    for (let c = 0; c < columns; c++) {
      newRow.push([0, 0, 0, 0]);
    }
    newPolicy.push(newRow);
  }
  // Make sure goal is accessible
  return newPolicy;
}

/** Returns given coordinates as a state object **/
function createState(row, col) {
  return {row: row, col: col};
}

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
      if (ccol == (maze[0].length - 1) || maze[crow][ccol + 1] == 1) { // East edge or invalid
        return state;
      }
      else {
        return {row: crow, col: ccol + 1};
      }
      break;
    case 2: // South
      if (crow == (maze.length - 1) || maze[crow + 1][ccol] == 1) { // South edge or invalid
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
  return policy[crow][ccol].indexOf(Math.max(...policy[crow][ccol]));
}

/** Return the highest-value reward for a given state **/
function getStateMaxReward(state) {
  let crow = state.row;
  let ccol = state.col;
  return Math.max(...policy[crow][ccol]);
}

/** Get the reward associated with a state/action pair **/
function getReward(state, action) {
  let newState = getNextState(state, action);
  // Invalid move
  if (newState.row == state.row && newState.col == state.col) {
    return -10;
  }
  // Reached Goal
  else if (newState.row == goalState.row && newState.col == goalState.col) {
    return 10;
  }
  // Valid move
  else {
    return -1;
  }
}

/** Print out the maze to console **/
function printMaze(maze) {
  let rows = maze.length;
  let columns = maze[0].length;
  for (let r = 0; r < rows; r++) {
    let line = "";
    for (let c = 0; c < columns; c++) {
      if (r == currentState.row && c == currentState.col) {
        line += " P";
      }
      else if (r == goalState.row && c == goalState.col) {
        line += " O";
      }
      else {
        if (maze[r][c] == 0) {
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
function printPolicy(policy) {
  let rows = maze.length;
  let columns = maze[0].length;
  for (let r = 0; r < rows; r++) {
    let line = "";
    for (let c = 0; c < columns; c++) {
      if (r == goalState.row && c == goalState.col) {
        line += " O";
      }
      else {
        if (maze[r][c] == 0) {
          let action = getStateMaxAction({row: r, col: c});
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
  let currentValue = policy[currentState.row][currentState.col][action];
  // Update Value of Action
  policy[currentState.row][currentState.col][action] = ((1 - alpha) * currentValue) + (alpha * (reward + (gamma * nextReward)));
  // Update State
  currentState = nextState;
}

/** Restart Maze **/
function restart() {
  currentState = createState(startRow, startColumn);
}

function learn(runs = 1000) {
  // Execution Loop
  let steps = 0;
  let wins = 0;
  for (let i = 0; i < runs; i++) {
    while (!((currentState.row == goalState.row) && (currentState.col == goalState.col))) {
      step();
      steps++;
    }
    restart();
    wins++;
  }
  console.log(steps + " Learning Steps");
  console.log(wins + " Cycles");
}

function pageLoop() {
  step();
  if ((currentState.row == goalState.row) && (currentState.col == goalState.col)) {
    restart();
  }
  draw();
}

function draw() {
  // Background
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Determine drawing dimensions
  let rows = maze.length;
  let columns = maze[0].length;
  let xUnit = canvas.width / columns;
  let yUnit = canvas.height / rows;

  // Draw Walls
  context.fillStyle = "grey";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (maze[r][c] == 1) {
        context.fillRect(c * xUnit, r * yUnit, xUnit, yUnit);
      }
    }
  }

  // Draw Policy
  context.strokeStyle = "green";
  context.lineWidth = 1;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (maze[r][c] == 0) {
        let action = getStateMaxAction({row: r, col: c});
        switch (action) {
          case 0:
            context.beginPath();
            context.moveTo(c * xUnit, (r + 1) * yUnit);
            context.lineTo((c + 0.5) * xUnit, r * yUnit);
            context.lineTo((c + 1) * xUnit, (r + 1) * yUnit);
            //context.closePath();
            context.stroke();
            //line += " ^";
            break;
          case 1:
            context.beginPath();
            context.moveTo(c * xUnit, r * yUnit);
            context.lineTo((c + 1) * xUnit, (r + 0.5) * yUnit);
            context.lineTo(c * xUnit, (r + 1) * yUnit);
            //context.closePath();
            context.stroke();
            //line += " >";
            break;
          case 2:
            context.beginPath();
            context.moveTo(c * xUnit, r * yUnit);
            context.lineTo((c + 0.5) * xUnit, (r + 1) * yUnit);
            context.lineTo((c + 1) * xUnit, r * yUnit);
            //context.closePath();
            context.stroke();
            //line += " V";
            break;
          case 3:
            context.beginPath();
            context.moveTo((c + 1) * xUnit, r * yUnit);
            context.lineTo(c * xUnit, (r + 0.5) * yUnit);
            context.lineTo((c + 1) * xUnit, (r + 1) * yUnit);
            //context.closePath();
            context.stroke();
            //line += " <";
            break;
          default:
            break;
        }
      }
    }
  }

  // Draw Goal
  context.fillStyle = "yellow";
  context.fillRect(goalState.col * xUnit, goalState.row * yUnit, xUnit, yUnit);

  // Draw Player
  context.fillStyle = "red";
  context.fillRect(currentState.col * xUnit, currentState.row * yUnit, xUnit, yUnit);
}

// Maze Toggle on click
canvas.addEventListener("click", function(event) {
  // Get Mouse Coordinates
  let rect = canvas.getBoundingClientRect();
  let mouseX = event.clientX - rect.left;
  let mouseY = event.clientY - rect.top;
  // Determine drawing dimensions
  let rows = maze.length;
  let columns = maze[0].length;
  let xUnit = canvas.width / columns;
  let yUnit = canvas.height / rows;
  // Determine State
  let clickX = Math.floor(mouseX / xUnit);
  let clickY = Math.floor(mouseY / yUnit);
  // Toggle if valid
  if ((!((clickX == goalState.col) && (clickY == goalState.row))) && (!((clickX == currentState.col) && (clickY == currentState.row))) && (!((clickX == startColumn) && (clickY == startRow)))) {
    maze[clickY][clickX] = (maze[clickY][clickX] + 1) % 2;
  }
}, false);

learn(10);

setInterval(pageLoop, 50);
