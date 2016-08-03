const assert = require('chai').assert;
const WavePathFinder = require('../scripts/wave_path_finder.js');

const generateOptions = (drawing) => {
  let start = {};
  let finish = {};
  let steps = [];

  let matrix = drawing.replace(/ /g, '').split('\n');
  matrix = matrix.map(line => line.substr(1, (line.length - 2)).split('|'));

  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix[x].length; y++) {
      const step = parseInt(matrix[x][y], 10);

      if (!isNaN(step)) {
        steps.push({ x, y, step });
      } else if (matrix[x][y] === 'A') {
        start = { x, y };
      } else if (matrix[x][y] === 'B') {
        finish = { x, y };
      }

      matrix[x][y] = (matrix[x][y] === 'x') ? 0 : 1;
    }
  }

  if (steps.length === 0) {
    steps = null;
  } else {
    steps.push({ x: start.x, y: start.y, step: 0 });
    steps.push({ x: finish.x, y: finish.y, step: steps.length });
    steps = steps.sort((a, b) => a.step - b.step).map(step => ({ x: step.x, y: step.y }));
  }

  return {
    matrix,
    startX: start.x,
    startY: start.y,
    finishX: finish.x,
    finishY: finish.y,
    resultPath: steps,
  };
};

const newTest = (drawing) => {
  const { matrix, resultPath, startX, startY, finishX, finishY } = generateOptions(drawing);

  const path = WavePathFinder.findPath(matrix, startX, startY, finishX, finishY);

  assert.deepEqual(path, resultPath);
};

describe('WavePathFinder', () => {
  describe('constructor', () => {
    it('when an correct matrix', () => {
      const { matrix } = generateOptions(`|A| |x| | |
                                          | | |x| | |
                                          | | |x| | |
                                          | | |x|B| |`);

      const path = new WavePathFinder(matrix);

      assert.deepEqual(path.passabilityMatrix, [[1, 1, 0, 1, 1],
                                                [1, 1, 0, 1, 1],
                                                [1, 1, 0, 1, 1],
                                                [1, 1, 0, 1, 1]]);
    });
  });

  describe('findPath', () => {
    it('when there is no path', () => {
      newTest(`|A| |x| | |
               | | |x| | |
               | | |x| | |
               | | |x|B| |`);
    });

    it('when one path from left to right', () => {
      newTest(`|A|1|2|3|4|
               |x|x|x|x|5|
               |x| | |x|6|
               | | | |x|B|`);
    });

    it('when one path from right to left', () => {
      newTest(`|B|6|x| | |
               |x|5|4|x| |
               | |x|3|2|x|
               | | |x|1|A|`);
    });
  });
});
