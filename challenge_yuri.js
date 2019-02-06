// Case study 'Software Engineer Practical Challenge'
//   description in file 'Software Engineer Practical Challenge.docx'
// Compute new rovers positions after following sequence of instructions
// Use file given as argument for input
// file: challenge_yuri.js
// author: Yuri Del Vigna Yasuda (ydvigna@yahoo.com.br)

const fs = require('fs');

// Function to print example of expected input file
function printExample() {
  console.log("\n Input example (1 line for grid size and 2 lines per rover):");
  console.log("5 5        (grid size)");
  console.log("1 2 N      (initial position of 1st rover)");
  console.log("LMLMLMLMM  (instructions for 1st rover)");
  console.log("3 3 E      (initial position of 2nd rover)");
  console.log("MMRMMRMRRM (instructions for 2nd rover)");
}

// Function to print the output (new positions of each rover)
function printOutput(rovers_positions) {
  var output = "";
  for (var i = 0; i < rovers_positions.length; i++) {
    output += rovers_positions[i][0] + ' ' + rovers_positions[i][1] + ' ' + rovers_positions[i][2] + '\n';
  }
  return output.trim();
}

// Function to check if value is valid direction
function isDirection(val) {
  if ((val === 'N') || (val === 'S') || (val === 'W') || (val === 'E')) return true;
  else return false;
}

// Function to check if value is valid instruction
function isInstruction(val) {
  if ((val === 'M') || (val === 'L') || (val === 'R')) return true;
  else return false;
}

// Function to update position of rover according to instruction
function updatePosition(position, instruction) {
  if (instruction === 'M') {
    // move forward in rovers facing direction
    switch(position[2]) {
      case 'N': position[1]++; break;
      case 'S': position[1]--; break;
      case 'W': position[0]--; break;
      case 'E': position[0]++; break;
      default: break;
    }
  }
  else if (instruction === 'L') {
    // turn rover 90 degrees left (counter-clockwise)
    switch(position[2]) {
      case 'N': position[2] = 'W'; break;
      case 'S': position[2] = 'E'; break;
      case 'W': position[2] = 'S'; break;
      case 'E': position[2] = 'N'; break;
      default: break;
    }
  }
  else if (instruction === 'R') {
    // turn rover 90 degrees right (clockwise)
    switch(position[2]) {
      case 'N': position[2] = 'E'; break;
      case 'S': position[2] = 'W'; break;
      case 'W': position[2] = 'N'; break;
      case 'E': position[2] = 'S'; break;
      default: break;
    }
  }
  return position;
}

// Function to check if new position is valid
function isPositionValid(rovers_positions, grid_size, rover) {
  // check if rover is inside grid
  if (rovers_positions[rover][0] < 0 || rovers_positions[rover][0] >= grid_size[0] ||
      rovers_positions[rover][1] < 0 || rovers_positions[rover][1] >= grid_size[1])
      return false;
  
  // check if multiple rovers are on same spot
  for (var i = 0; i < rovers_positions.length; i++) {
    if (i != rover && rovers_positions[i][0] == rovers_positions[rover][0] && 
        rovers_positions[i][1] == rovers_positions[rover][1])
        return false;
  }
  return true;
}


// Main function for computing new positions
function computePositions(data, verbose) {
  data = data.split(/\r?\n/); // split the file into lines
  
  // check for empty lines
  for (const line of data) {
    if (!line) {
      if (verbose) console.log("ERROR! File contains empty lines! Please remove them.");
      return -1;
    }
  }

  // check if number of lines are valid
  if (data.length < 3) {
    if (verbose) {
      console.log("ERROR! There must be instructions for at least one rover.");
      printExample();
    }
    return -1;
  }
  if (data.length % 2 == 0) {
    if (verbose) {
      console.log("ERROR! Input instructions invalid. File should have an odd number of lines.");
      printExample();
    }
    return -1;
  }

  if (verbose) console.log(" Input data separated by lines:\n", data);

  grid_size = data[0].split(' '); // split line into values

  // check if grid size entered is valid
  if (grid_size.length != 2 || isNaN(parseInt(grid_size[0])) || isNaN(parseInt(grid_size[1])) || 
      parseInt(grid_size[0]) < 0 || parseInt(grid_size[1]) < 0) {
    if (verbose) {
      console.log("ERROR! Grid size invalid. It should be defined by 2 non-negative numbers.");
      printExample();
    }
    return -1;
  }

  grid_size[0] = parseInt(grid_size[0]) + 1; // x dimension of grid (+1 as it starts at 0)
  grid_size[1] = parseInt(grid_size[1]) + 1; // y dimension of grid (+1 as it starts at 0)
  if (verbose) console.log(" Size of grid:", grid_size[0], grid_size[1]);

  // add position of each rover into array
  var rovers_positions = [];
  var rover = 0;
  for (var i = 1; i < data.length; i+=2) {
    position = data[i].split(' '); // split line into values
  
    // check if initial rover position is parsable
    if (position.length != 3 || isNaN(parseInt(position[0])) || isNaN(parseInt(position[1])) || !isDirection(position[2])) {
      if (verbose) {
        console.log("ERROR! Rover position values invalid. It should be defined by 2 integers and a direction (NSWE).");
        printExample();
      }
      return -1;
    }

    position[0] = parseInt(position[0]); // x coordinate
    position[1] = parseInt(position[1]); // y coordinate
    rovers_positions.push(position);

    // check if initial rover position is valid
    if (!isPositionValid(rovers_positions, grid_size, rover)) {
      if (verbose) console.log("ERROR! Initial rover position invalid. A rover cant be placed on an occupied spot nor outside the grid.");
      return -1;
    }

    rover++;
  }

  if (verbose) console.log(" Positions of rovers:\n", rovers_positions);
  
  // compute new position for the rovers following sequence of instructions
  rover = 0;
  for (var i = 2; i < data.length; i+=2) {
    if (verbose) console.log("\nMoving rover:", rover);
    for (var j = 0; j < data[i].length; j++) {
      // check if instruction is valid
      if (!isInstruction(data[i].charAt(j))) {
        if (verbose) {
          console.log("ERROR! Instruction is invalid. It should be turn (LR) or move (M).");
          printExample();
        }
        return -1;
      }
      
      // update position of rover according to the instruction
      rovers_positions[rover] = updatePosition(rovers_positions[rover], data[i].charAt(j));
      
      // check if new rover position is valid
      if (!isPositionValid(rovers_positions, grid_size, rover)) {
        if (verbose) console.log("ERROR! New position is invalid. A rover cant move towards an occupied spot nor outside the grid.");
        return -1;
      }
      
      if (verbose) console.log("New position of rover", rover, "is [", rovers_positions[rover][0] + ' ' + rovers_positions[rover][1] + ' ' + 
                                rovers_positions[rover][2], "] after instruction", data[i].charAt(j));
            
    }
    
    rover++;
  }

  if (verbose) console.log("\n Final positions of rovers:");
  var output = printOutput(rovers_positions);
  // console.log(output);
  return output;
}


// check if verbose mode is selected
var verbose = false;
if (process.argv.length > 3 && process.argv[3] === "--verbose") {
  verbose = true;
  console.log("Verbose mode ON!");
}

// check if there is argument (filename)
var input;
if (process.argv.length > 2) {
  input = process.argv[2];
  
  if (verbose) console.log(" Reading file:", input);

  // read file synchronously
  var data = fs.readFileSync(input, 'utf8');
  
  // check if file is empty
  if (!data) {
    console.log("ERROR! File is empty. Make sure the file contains the correct data.");
    printExample();
    process.exitCode = 1;
  }
  else {
    // compute new positions of robots
    var output = computePositions(data, verbose);
    if (output == -1) {
      if (!verbose) {
        console.log("ERROR! Something wrong happened while computing positions.");
        console.log("Make sure the input file follows the recommendations or activate verbose mode for more info.");
        printExample();
      }
      process.exitCode = 1;
    }
    else {
      console.log(output);
    }
  }
}
else {
  console.log("ERROR! No file provided! Usage: node .\\challenge_yuri.js <filepath> [--verbose]");
  console.log(" (Ignore error message if running automated tests!)");

  exports.isDirection = isDirection;
  exports.isInstruction = isInstruction;
  exports.updatePosition = updatePosition;
  exports.isPositionValid = isPositionValid;
  exports.computePositions = computePositions;

  process.exitCode = 1;
}
