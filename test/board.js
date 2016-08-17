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

  describe('deleteBalls()', () => {
    it('horizontal line', () => {
      const b = new Board(6, 6);

      b.createBall([0, 0]);
      b.createBall([0, 1]);
      b.createBall([0, 2]);
      b.createBall([0, 3]);
      b.createBall([0, 4]);
      b.createBall([2, 2]);

      b.deleteBalls();

      console.log(b.score);

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

      b.createBall([2, 0]);
      b.createBall([3, 0]);
      b.createBall([4, 0]);
      b.createBall([5, 0]);
      b.createBall([6, 0]);
      b.createBall([7, 0]);

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

      b.createBall([0, 0]);
      b.createBall([0, 1]);
      b.createBall([0, 2]);
      b.createBall([0, 3]);
      b.createBall([0, 4]);
      b.createBall([2, 2]);
      b.createBall([2, 0]);
      b.createBall([3, 0]);
      b.createBall([4, 0]);
      b.createBall([5, 0]);
      b.createBall([6, 0]);
      b.createBall([7, 0]);

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
