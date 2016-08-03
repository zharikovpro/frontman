const assert = require('chai').assert;
const WavePathFinder = require('../scripts/wave_path_finder.js');

const generateOptions = (drawing) => {
  let start = {};
  let finish = {};

  const resultPath = [];

  let tempStr;
  tempStr = '';

  for (let i = 0; i < drawing.length; i++) {
    if (drawing[i] !== ' ') {
      tempStr += drawing[i];
    }
  }

  const matrix = tempStr.split('\n');

  for (let x = 0; x < matrix.length; x++) {
    matrix[x] = matrix[x].substr(1, (matrix[x].length - 2)).split('|');

    for (let y = 0; y < matrix[x].length; y++) {
      if (matrix[x][y] === 'A') {
        start = { x, y };
        matrix[x][y] = 1;
      } else if (matrix[x][y] === 'B') {
        finish = { x, y };
        matrix[x][y] = 1;
      } else if (matrix[x][y] === '') {
        matrix[x][y] = 1;
      } else if (matrix[x][y] === 'x') {
        matrix[x][y] = 0;
      } else {
        const num = parseInt(matrix[x][y], 10);
        matrix[x][y] = 1;
        if (!isNaN(num)) {
          resultPath[num] = { x, y };
        }
      }
    }
  }

  return {
    matrix,
    startX: start.x,
    startY: start.y,
    finishX: finish.x,
    finishY: finish.y,
    resultPath: (() => {
      if (Object.keys(resultPath).length === 0) return null;

      const result = [];

      resultPath[0] = {
        x: start.x,
        y: start.y,
      };

      resultPath[resultPath.length] = {
        x: finish.x,
        y: finish.y,
      };

      resultPath.forEach(el => {
        result.push({ x: el.x, y: el.y });
      });

      return result;
    })(),
  };
};

const newTest = (drawing, method = 'equal') => {
  const { matrix, resultPath, startX, startY, finishX, finishY } = generateOptions(drawing);

  const path = new WavePathFinder(matrix);

  (assert[method])(path.findPath(startX, startY, finishX, finishY), resultPath);
};

describe('WavePathFinder', () => {
  describe('constructor', () => {
    it('when an correct matrix', () => {
      const { matrix } = generateOptions(`| A |   | x |   |   |
                                      |   |   | x |   |   |
                                      |   |   | x |   |   |
                                      |   |   | x | B |   |`);

      const path = new WavePathFinder(matrix);

      assert.deepEqual(path.passabilityMatrix, [[1, 1, 0, 1, 1],
                                                [1, 1, 0, 1, 1],
                                                [1, 1, 0, 1, 1],
                                                [1, 1, 0, 1, 1]]);
    });
  });

  describe('findPath', () => {
    it('when there is no path', () => {
      newTest(`| A |   | x |   |   |
               |   |   | x |   |   |
               |   |   | x |   |   |
               |   |   | x | B |   |`);
    });

    it('when one path from left to right', () => {
      newTest(`| A | 1 | 2 | 3 | 4 |
               | x | x | x | x | 5 |
               | x |   |   | x | 6 |
               |   |   |   | x | B |`, 'deepEqual');
    });

    it('when one path from right to left', () => {
      newTest(`| B | 6 | x |   |   |
               | x | 5 | 4 | x |   |
               |   | x | 3 | 2 | x |
               |   |   | x | 1 | A |`, 'deepEqual');
    });
  });
});
