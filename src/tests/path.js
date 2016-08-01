const assert = require('chai').assert;
const Path = require('../scripts/path.js');

const generatePath = (drawing) => {
  let matrixString = '';

  for (let i = 0; i < drawing.length; i++) {
    if (drawing[i] !== '\n') {
      matrixString += drawing[i];
    }
  }

  let startX = null;
  let startY = null;
  let finishX = null;
  let finishY = null;

  const matrix = matrixString.split(',').map((row) => {
    let rows = row.substr(1, (row.length - 2)).split('|');

    rows = rows.map((cell) => {
      const el = cell.substr(1, 1);

      let res;

      if (el === 'A') res = 'A';
      else if (el === 'B') res = 'B';
      else if (el === ' ') res = 1;
      else if (el === 'x') res = 0;

      return res;
    });

    return rows;
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

  return { matrix, startX, startY, finishX, finishY };
};

describe('Short path', () => {
  it('no path', () => {
    const { matrix, startX, startY, finishX, finishY } = generatePath(`
| A |   | x |   |   |,
|   |   | x |   |   |,
|   |   | x |   |   |,
|   |   | x | B |   |`);

    const path = new Path(matrix);

    assert.equal(path.short(startX, startY, finishX, finishY), null);
  });

  it('there is one path', () => {
    const { matrix, startX, startY, finishX, finishY } = generatePath(`
| A |   |   |   |   |,
| x | x | x | x |   |,
|   |   |   | x |   |,
|   |   |   | x | B |`);

    const path = new Path(matrix);

    assert.deepEqual(path.short(startX, startY, finishX, finishY), [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: 3 },
      { x: 0, y: 4 },
      { x: 1, y: 4 },
      { x: 2, y: 4 },
      { x: 3, y: 4 },
    ]);
  });

  it('there is one path', () => {
    const { matrix, startX, startY, finishX, finishY } = generatePath(`
| A |   | x |   |   |,
| x |   |   | x |   |,
|   | x |   |   | x |,
|   |   | x |   | B |`);

    const path = new Path(matrix);

    assert.deepEqual(path.short(startX, startY, finishX, finishY), [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 3 },
      { x: 3, y: 4 },
    ]);
  });
});
