# se_challenges
Software engineering challenges

## Challenge 1
code file: challenge_yuri.js  
test file: test.txt  
test scipt (mocha): test.js

### Problem
Compute new robot positions inside a grid according to their initial positions and a sequence of instructions

#### Input
- 1st line: grid size
- next lines (a pair for each robot): initial position and sequence of instructions
- initial positions are (x,y) coordinates and direction (NSWE)
- instructions are M (move forwards), L (turn 90 degrees left), R (turn 90 degrees right)

5 5  
1 2 N  
LMLMLMLMM  
3 3 E  
MMRMMRMRRM

#### Output
1 3 N  
5 1 E

### Assumptions
- the input data must be provided in a text file passed as argument to the program
- the grid to be used by the robots must be at least 1x1
- the input file must have instructions for at least one robot
- all the numbers must be non-negative integers (grid size and initial positions)
- the file must not have empty lines
- the file must have an odd number of lines (1 for grid + 2*n where n is the number of robots)
- the robots initial positions must be valid (inside the grid and no overlaps)
- the valid directions are 'N', 'S', 'W', 'E'
- the valid instructions are 'M', 'L', 'R'
- a robot cannot move towards an occupied position nor outside the grid

If any of these assumptions fails the program prints an error message and exits

### Solution
- check if input file is provided
- read file and split content by lines into an array
- split first line into grid size (integers)
- add robots positions into an array, splitting into (x, y) coordinates and direction
- for each robot, read instructions from left to right and move the robot accordingly
- print final positions

### Usage
`node challenge_yuri.js filepath [--verbose]`  

Examples:  
`node challenge_yuri.js test.txt`  
`node challenge_yuri.js test.txt --verbose`

- 'filepath' is the input text file
- '--verbose' is an optional argument to enable a verbose mode

### Run tests with mocha
Open project folder in terminal and run the commands:  
`npm install --save-dev mocha`  
`npm test`

Test file 'test.js' must be inside folder 'test'.


