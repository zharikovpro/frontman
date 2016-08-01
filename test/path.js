const assert = require('chai').assert;
const Path = require('../src/scripts/path.js');

describe('Short path', () => {
  it('no path', () => {
    let {matrix, startX, startY, finishX, finishY} = generatePath(`
| A |   | x |   |   |,
|   |   | x |   |   |,
|   |   | x |   |   |,
|   |   | x | B |   |`);

    let path = new Path(matrix);

    assert.equal(path.short(startX, startY, finishX, finishY), null);
  });

  it('there is one path', () => {
    let {matrix, startX, startY, finishX, finishY} = generatePath(`
| A |   |   |   |   |,
| x | x | x | x |   |,
|   |   |   | x |   |,
|   |   |   | x | B |`);

    let path = new Path(matrix);

    assert.deepEqual(path.short(startX, startY, finishX, finishY), [ {x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}, {x: 0, y: 4}, {x: 1, y: 4}, {x: 2, y: 4}, {x: 3, y: 4} ]);
  });

  it('there is one path', () => {
    let {matrix, startX, startY, finishX, finishY} = generatePath(`
| A |   | x |   |   |,
| x |   |   | x |   |,
|   | x |   |   | x |,
|   |   | x |   | B |`);

    let path = new Path(matrix);

    assert.deepEqual(path.short(startX, startY, finishX, finishY), [ {x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 2, y: 2}, {x: 2, y: 3}, {x: 3, y: 3}, {x: 3, y: 4} ]);
  });
});

function generatePath (drawing) {
  var matrixString = "";

  for (let i = 0; i < drawing.length; i++) {
    if (drawing[i] !== '\n') {
      matrixString += drawing[i];
    }
  }

  let startX = null;
  let startY = null;
  let finishX = null;
  let finishY = null;

  let matrix = matrixString.split(',').map(row => {
    return row.substr(1, (row.length - 2)).split('|').map((cell) => {
      let el = cell.substr(1, 1);

      return (el === 'A') ? 'A' : (el === 'B') ? 'B' : (el === ' ') ? 0 : (el === 'x') ? 1 : null;
    });
  });

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 'A') {
        matrix[i][j] = 0;
        startX = i;
        startY = j;
      } else if (matrix[i][j] === 'B') {
        matrix[i][j] = 0;
        finishX = i;
        finishY = j;
      }
      if (startX && startY && finishX && finishY) break;
    }
    if (startX && startY && finishX && finishY) break;
  }

  return {
    matrix,
    startX,
    startY,
    finishX,
    finishY,
  };
}