// Case study 'Software Engineer Practical Challenge'
//   description in file 'Software Engineer Practical Challenge.docx'
// Tests for the script 'challenge_yuri.js' using mocha
// file: test.js
// author: Yuri Del Vigna Yasuda (ydvigna@yahoo.com.br)

var challenge = require('../challenge_yuri');
var assert = require('assert');


describe('Challenge functions', function() {
    describe('#isDirection()', function() {
        it('should return true for valid directions (NSWE)', function() {
            var directions = ['N', 'S', 'W', 'E'];
            for (var i = 0; i < directions.length; i++) {
                var result = challenge.isDirection(directions[i]);
                assert.equal(result, true);
            }  
        });
      
        it('should return false for invalid characters', function() {
            var result = challenge.isDirection('A');
            assert.equal(result, false);
        });
    
        it('should return false for other values', function() {
            var result = challenge.isDirection(5);
            assert.equal(result, false);
        });
      
    });

    describe('#isInstruction()', function() {
        it('should return true for valid instructions (MLR)', function() {
            var instructions = ['M', 'L', 'R'];
            for (var i = 0; i < instructions.length; i++) {
                var result = challenge.isInstruction(instructions[i]);
                assert.equal(result, true);
            }  
        });
      
        it('should return false for invalid characters', function() {
            var result = challenge.isInstruction('A');
            assert.equal(result, false);
        });
    
        it('should return false for other values', function() {
            var result = challenge.isInstruction(5);
            assert.equal(result, false);
        });
      
    });

    describe('#updatePosition()', function() {
        it('should turn 90 degrees counter-clockwise if instruction is L', function() {
            var result = challenge.updatePosition([1, 1, 'N'], 'L');
            assert.deepEqual(result, [1, 1, 'W']);

            result = challenge.updatePosition([1, 1, 'W'], 'L');
            assert.deepEqual(result, [1, 1, 'S']);
            
            result = challenge.updatePosition([1, 1, 'S'], 'L');
            assert.deepEqual(result, [1, 1, 'E']);
            
            result = challenge.updatePosition([1, 1, 'E'], 'L');
            assert.deepEqual(result, [1, 1, 'N']);
        });

        it('should turn 90 degrees clockwise if instruction is R', function() {
            var result = challenge.updatePosition([1, 1, 'N'], 'R');
            assert.deepEqual(result, [1, 1, 'E']);

            result = challenge.updatePosition([1, 1, 'E'], 'R');
            assert.deepEqual(result, [1, 1, 'S']);
            
            result = challenge.updatePosition([1, 1, 'S'], 'R');
            assert.deepEqual(result, [1, 1, 'W']);
            
            result = challenge.updatePosition([1, 1, 'W'], 'R');
            assert.deepEqual(result, [1, 1, 'N']);
        });
        
        describe('If instruction is M move 1 spot in direction rover is facing', function() {
            it('should move up (y+1) if direction is N', function() {
                var result = challenge.updatePosition([1, 1, 'N'], 'M');
                assert.deepEqual(result, [1, 2, 'N']);
            });

            it('should move down (y-1) if direction is S', function() {
                var result = challenge.updatePosition([1, 1, 'S'], 'M');
                assert.deepEqual(result, [1, 0, 'S']);
            });

            it('should move to the left (x-1) if direction is W', function() {
                var result = challenge.updatePosition([1, 1, 'W'], 'M');
                assert.deepEqual(result, [0, 1, 'W']);
            });

            it('should move to the right (x+1) if direction is E', function() {
                var result = challenge.updatePosition([1, 1, 'E'], 'M');
                assert.deepEqual(result, [2, 1, 'E']);
            });
        });
    });

    describe('#isPositionValid()', function() {
        var grid_size = [5,5];
        it('should return true if position of rover is valid', function() {
            var result = challenge.isPositionValid([[1,1,'N'], [2,2,'S']], grid_size, 0);
            assert.equal(result, true);
        });
      
        it('should return false if rover is outside the grid', function() {
            var result = challenge.isPositionValid([[-1,1,'N'], [2,2,'S']], grid_size, 0);
            assert.equal(result, false);

            result = challenge.isPositionValid([[1,-1,'N'], [2,2,'S']], grid_size, 0);
            assert.equal(result, false);
            
            result = challenge.isPositionValid([[1,5,'N'], [2,2,'S']], grid_size, 0);
            assert.equal(result, false);
            
            result = challenge.isPositionValid([[5,1,'N'], [2,2,'S']], grid_size, 0);
            assert.equal(result, false);
        });
    
        it('should return false if rover is on same spot of another rover', function() {
            var result = challenge.isPositionValid([[1,1,'N'], [1,1,'S']], grid_size, 0);
            assert.equal(result, false);
        });
    });
});

describe('Challenge solution', function() {
    var verbose = false;
    it('should pass if test case is correct', function() {
        var data = "5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM";
        var result = challenge.computePositions(data, verbose);
        assert.deepEqual(result, "1 3 N\n5 1 E");
    });

    it('should exit with failure (return -1) if there are empty lines on file', function() {
        var data = "5 5\n\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM";
        var result = challenge.computePositions(data, verbose);
        assert.equal(result, -1);
    });

    it('should exit with failure (return -1) if there arent instructions for at least one rover', function() {
        var data = "5 5\n1 2 N";
        var result = challenge.computePositions(data, verbose);
        assert.equal(result, -1);
    });

    it('should exit with failure (return -1) if there are even number of lines on file', function() {
        var data = "5 5\n1 2 N\nLMLMLMLMM\n3 3 E";
        var result = challenge.computePositions(data, verbose);
        assert.equal(result, -1);
    });

    it('should exit with failure (return -1) if grid size is invalid', function() {
        var data = "5\n1 2 N\nLM"; // missing grid size values
        var result = challenge.computePositions(data, verbose);
        assert.equal(result, -1);

        data = "-1 5\n1 2 N\nLM"; // x negative
        result = challenge.computePositions(data, verbose);
        assert.equal(result, -1);

        data = "5 -1\n1 2 N\nLM"; // y negative
        result = challenge.computePositions(data, verbose);
        assert.equal(result, -1);

        data = "A 5\n1 2 N\nLM"; // x not number
        result = challenge.computePositions(data, verbose);
        assert.equal(result, -1);

        data = "5 A\n1 2 N\nLM"; // y not number
        result = challenge.computePositions(data, verbose);
        assert.equal(result, -1);
    });

    it('should exit with failure (return -1) if rover position values are invalid', function() {
        var data = "5 5\n1 2\nLM"; // missing rover position values
        var result = challenge.computePositions(data, verbose);
        assert.equal(result, -1);

        data = "5 5\nA 2 N\nLM"; // x not number
        result = challenge.computePositions(data, verbose);
        assert.equal(result, -1);

        data = "5 5\n1 A N\nLM"; // y not number
        result = challenge.computePositions(data, verbose);
        assert.equal(result, -1);

        data = "5 5\n1 2 A\nLM"; // direction not valid
        result = challenge.computePositions(data, verbose);
        assert.equal(result, -1);
    });

    it('should exit with failure (return -1) if initial rover position is invalid', function() {
        var data = "5 5\n1 6 N\nLM"; // outside grid
        var result = challenge.computePositions(data, verbose);
        assert.equal(result, -1);

        data = "5 5\n1 2 N\nLM\n1 2 S\nRM"; // occupied spot
        result = challenge.computePositions(data, verbose);
        assert.equal(result, -1);
    });

    it('should exit with failure (return -1) if instruction is invalid', function() {
        var data = "5 5\n1 2 N\nAM";
        var result = challenge.computePositions(data, verbose);
        assert.equal(result, -1);
    });

    it('should exit with failure (return -1) if a rover moves towards an occupied spot or outside the grid', function() {
        var data = "5 5\n1 2 N\nLM\n0 2 S\nRM";
        var result = challenge.computePositions(data, verbose);
        assert.equal(result, -1);

        data = "5 5\n0 2 N\nLM";
        result = challenge.computePositions(data, verbose);
        assert.equal(result, -1);
    });
}); 
