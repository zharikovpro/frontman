const assert = require('chai').assert;
const Path = require('../scripts/path.js');

const generateOptions = (drawing) => {
  const extremePoints = {};

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
      switch (matrix[x][y]) {
        case 'A': {
          extremePoints.start = { x, y };

          matrix[x][y] = 1;
          break;
        }
        case 'B': {
          extremePoints.finish = { x, y };

          matrix[x][y] = 1;
          break;
        }
        case '': matrix[x][y] = 1; break;
        case 'x': matrix[x][y] = 0; break;

        default: {
          if (typeof +matrix[x][y] === 'number') {
            const num = +matrix[x][y];

            resultPath[num] = { x, y };

            matrix[x][y] = 1;
          }
        }
      }
    }
  }

  return {
    matrix,
    startX: extremePoints.start.x,
    startY: extremePoints.start.y,
    finishX: extremePoints.finish.x,
    finishY: extremePoints.finish.y,
    resultPath: (() => {
      if (Object.keys(resultPath).length === 0) return null;

      const result = [];

      resultPath[0] = {
        x: extremePoints.start.x,
        y: extremePoints.start.y,
      };

      resultPath[resultPath.length] = {
        x: extremePoints.finish.x,
        y: extremePoints.finish.y,
      };

      resultPath.forEach(el => {
        result.push({ x: el.x, y: el.y });
      });

      return result;
    })(),
  };
};

describe('Short path', () => {
  it('no path', () => {
    const { matrix, resultPath, startX, startY, finishX, finishY } =
      generateOptions(`| A |   | x |   |   |
                       |   |   | x |   |   |
                       |   |   | x |   |   |
                       |   |   | x | B |   |`);

    const path = new Path(matrix);

    assert.equal(path.short(startX, startY, finishX, finishY), resultPath);
  });

  it('there is one path', () => {
    const { matrix, resultPath, startX, startY, finishX, finishY } =
      generateOptions(`| A | 1 | 2 | 3 | 4 |
                       | x | x | x | x | 5 |
                       | x |   |   | x | 6 |
                       |   |   |   | x | B |`);

    const path = new Path(matrix);

    assert.deepEqual(path.short(startX, startY, finishX, finishY), resultPath);
  });

  it('there is one path', () => {
    const { matrix, resultPath, startX, startY, finishX, finishY }
      = generateOptions(`| A | 1 | x |   |   |
                         | x | 2 | 3 | x |   |
                         |   | x | 4 | 5 | x |
                         |   |   | x | 6 | B |`);

    const path = new Path(matrix);

    assert.deepEqual(path.short(startX, startY, finishX, finishY), resultPath);
  });
});
