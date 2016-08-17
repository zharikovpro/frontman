import chai from 'chai';
const { assert } = chai;

chai.should();

const Board = require('../src/scripts/board.js');

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
});
