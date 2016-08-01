const assert = require('chai').assert;
const Board = require('../src/scripts/board.js');

describe('Constructor', () => {
  it('Default', () => {
    let b = new Board();

    assert.deepEqual(b.matrix, [ [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],]);
  });

  it('Normal', () => {
    let b = new Board(4, 4);

    assert.deepEqual(b.matrix, [ [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0] ]);
  });

  it('Normal', () => {
    let b = new Board(4, 4);

    assert.deepEqual(b.matrix, [ [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0] ]);
  });
});
