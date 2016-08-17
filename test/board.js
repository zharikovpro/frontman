import chai from 'chai';
const { assert } = chai;

chai.should();

const Board = require('../src/scripts/board.js');

const renderMatrix = (drawing) => {
  const matrix = drawing
    .replace(/ /g, '')
    .split('\n')
    .map(line => line.substr(1, (line.length - 2))
    .split('|'));

  return matrix.map(row => row.map(cell => ((cell === '') ? 0 : 1)));
};

describe('Board', () => {
  describe('constructor()', () => {
    it('Incorrect all parameters', () => {
      (() => new Board('a', 'a')).should.throw(Error);
    });

    it('Incorrect first parameter (string)', () => {
      (() => new Board('bla-bla-bla')).should.throw(Error);
    });

    it('Incorrect two parameter (string)', () => {
      (() => new Board(2, 'bla-bla-bla')).should.throw(Error);
    });

    it('Default', () => {
      const b = new Board();

      assert.deepEqual(b.matrix, [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
      ]);
    });

    it('Normal', () => {
      const b = new Board(4, 4);

      assert.deepEqual(b.matrix, [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]);
    });
  });

  describe('createBall()', () => {
    it('default(random)', () => {
      const b = new Board();

      b.createBall();

      let bells = 0;

      b.matrix.forEach(c => {
        c.forEach(r => {
          if (r !== 0) bells++;
        });
      });

      assert.equal(bells, 1);
    });
  });

  describe('deleteBalls()', () => {
    it('horizontal line', () => {
      const b = new Board(6, 6);

      b.matrix = renderMatrix(`|+|+|+|+|+| |
                               | | | | | | |
                               | | |+| | | |
                               | | | | | | |
                               | | | | | | |
                               | | | | | | |`);

      b.deleteBalls();

      assert.equal(b.score, 5);

      assert.deepEqual(b.matrix, [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ]);
    });

    it('vertical line', () => {
      const b = new Board(9, 6);

      b.matrix = renderMatrix(`| | | | | | |
                               | | | | | | |
                               |+| | | | | |
                               |+| | | | | |
                               |+| | | | | |
                               |+| | | | | |
                               |+| | | | | |
                               |+| | | | | |
                               | | | | | | |`);

      b.deleteBalls();

      assert.equal(b.score, 6);

      assert.deepEqual(b.matrix, [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ]);
    });

    it('mix line', () => {
      const b = new Board(9, 6);

      b.matrix = renderMatrix(`|+|+|+|+|+| |
                               | | | | | | |
                               |+| |+| | | |
                               |+| | | | | |
                               |+| | | | | |
                               |+| | | | | |
                               |+| | | | | |
                               |+| | | | | |
                               | | | | | | |`);

      b.deleteBalls();

      assert.equal(b.score, 11);

      assert.deepEqual(b.matrix, [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ]);
    });
  });
});
